import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { errorText } from "../../src/lib/error-text";
import { applyBlocks, ApplyRefused, main, parseBlocks, type Allow, type Io } from "./apply-blocks";

/**
 * Register row 58 (Foundations records turn R1) — a brief's FILE and EDIT blocks reach the tree exactly,
 * through scripts/brief/apply-blocks.sh (apply-blocks.ts): in order, all or none. The planted briefs are
 * built line by line, so this file holds no block of its own.
 */
const HERE = dirname(fileURLToPath(import.meta.url));
const fileBlock = (path: string, ...body: string[]) => [
  `FILE-BEGIN ${path}`,
  ...body,
  `FILE-END ${path}`,
];
const editBlock = (path: string, n: number, old: string[], next: string[]) => [
  `EDIT ${path} #${String(n)}`,
  "OLD-BEGIN",
  ...old,
  "OLD-END",
  "NEW-BEGIN",
  ...(next.length === 0 ? [""] : next),
  "NEW-END",
];
const brief = (...blocks: string[][]) =>
  ["# a brief", "", "```text", "prose", ...blocks.flatMap((b) => [...b, ""]), "```", ""].join("\n");

const everywhere: Allow = () => ({ ok: true });
type Memory = Io & { files: Map<string, string>; writes: () => number };
function memory(files: Record<string, string>, allow: Allow = everywhere): Memory {
  const state = new Map(Object.entries(files));
  let writes = 0;
  return {
    files: state,
    writes: () => writes,
    read: (path) => state.get(path) ?? null,
    write: (path, text) => {
      writes += 1;
      state.set(path, text);
    },
    allow,
  };
}

describe("the block applier (register row 58)", () => {
  it("BA-1 reads FILE and EDIT blocks in the order written; a block inside a FILE block is that file's text; a block that runs into the next is refused", () => {
    const inner = editBlock("b.txt", 1, ["x"], ["y"]);
    const blocks = parseBlocks(
      brief(
        fileBlock("a.txt", "one", "two"),
        editBlock("a.txt", 1, ["two"], []),
        fileBlock("c.md", ...inner),
      ),
    );
    expect(blocks).toEqual([
      { kind: "file", path: "a.txt", text: "one\ntwo\n" },
      { kind: "edit", path: "a.txt", n: 1, old: "two", next: "" },
      { kind: "file", path: "c.md", text: `${inner.join("\n")}\n` },
    ]);
    const runOn = ["EDIT a.txt #1", "OLD-BEGIN", "two", "OLD-END", "NEW-BEGIN", "NEW-END"];
    expect(() => parseBlocks(brief(runOn, editBlock("a.txt", 2, ["x"], ["y"])))).toThrow(
      "EDIT a.txt #1: malformed — a block marker inside its OLD or NEW text",
    );
  });

  it("BA-2 applies every block in order — a FILE, then EDITs on the text it left — or only the paths named", () => {
    const blocks = parseBlocks(
      brief(
        fileBlock("new.ts", "export const a = 1;", "export const b = 2;"),
        editBlock("new.ts", 1, ["export const b = 2;"], ["export const b = 3;"]),
        editBlock("old.md", 1, ["alpha"], ["alpha", "beta"]),
        editBlock("old.md", 2, ["beta"], ["gamma"]),
      ),
    );
    const io = memory({ "old.md": "# t\nalpha\nend\n" });
    expect(applyBlocks(blocks, io)).toEqual([
      "FILE new.ts (40 bytes)",
      "EDIT new.ts #1",
      "EDIT old.md #1",
      "EDIT old.md #2",
      "applied 4 block(s) to 2 file(s)",
    ]);
    expect(Object.fromEntries(io.files)).toEqual({
      "old.md": "# t\nalpha\ngamma\nend\n",
      "new.ts": "export const a = 1;\nexport const b = 3;\n",
    });
    const some = memory({ "old.md": "# t\nalpha\nend\n" });
    applyBlocks(blocks, some, ["old.md"]);
    expect(Object.fromEntries(some.files)).toEqual({ "old.md": "# t\nalpha\ngamma\nend\n" });
  });

  it("BA-3 one refusal writes nothing: an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a named path with no block", () => {
    const refuses = (
      b: string,
      files: Record<string, string>,
      only: string[] = [],
      allow: Allow = everywhere,
    ) => {
      const io = memory(files, allow);
      let message = "";
      try {
        applyBlocks(parseBlocks(b), io, only);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplyRefused);
        message = errorText(error);
      }
      expect(io.writes()).toBe(0);
      expect(Object.fromEntries(io.files)).toEqual(files);
      return message;
    };
    const first = fileBlock("ok.txt", "fine");
    expect(refuses(brief(first, editBlock("a.md", 1, ["gone"], ["x"])), { "a.md": "here\n" })).toBe(
      "EDIT a.md #1: its OLD text is found 0 times in the file (exactly once is required)",
    );
    expect(
      refuses(brief(first, editBlock("a.md", 1, ["twice"], ["x"])), { "a.md": "twice twice\n" }),
    ).toBe("EDIT a.md #1: its OLD text is found 2 times in the file (exactly once is required)");
    expect(refuses(brief(first, editBlock("none.md", 1, ["a"], ["b"])), {})).toBe(
      "EDIT none.md #1: the file does not exist",
    );
    expect(refuses(brief(first, fileBlock("../out.txt", "x")), {})).toBe(
      "FILE ../out.txt: the path is not inside the repository",
    );
    expect(refuses(brief(fileBlock("/etc/x", "x")), {})).toBe(
      "FILE /etc/x: the path is not inside the repository",
    );
    const outOfScope: Allow = (path) =>
      path === "ok.txt"
        ? { ok: true }
        : { ok: false, reason: `${path} is outside the brief's SCOPE` };
    expect(refuses(brief(first, fileBlock("src/x.ts", "x")), {}, [], outOfScope)).toBe(
      "FILE src/x.ts: src/x.ts is outside the brief's SCOPE",
    );
    expect(refuses(brief(first), {}, ["other.txt"])).toBe("the brief has no block for other.txt");
    expect(refuses("# no blocks\n", {})).toBe("the brief has no FILE or EDIT block");
  });

  it("BA-4 the command line writes the tree, writes nothing on --dry or a refusal, and asks for a brief", () => {
    const root = mkdtempSync(join(tmpdir(), "apply-blocks-"));
    mkdirSync(join(root, "docs"), { recursive: true });
    writeFileSync(join(root, "docs/a.md"), "start\n");
    writeFileSync(
      join(root, "b.md"),
      brief(
        fileBlock("docs/sub/new.md", "made"),
        editBlock("docs/a.md", 1, ["start"], ["changed"]),
      ),
    );
    expect(main(["b.md", "--dry"], root, everywhere)).toBe(0);
    expect(existsSync(join(root, "docs/sub/new.md"))).toBe(false);
    expect(readFileSync(join(root, "docs/a.md"), "utf8")).toBe("start\n");
    expect(main(["b.md"], root, everywhere)).toBe(0);
    expect(readFileSync(join(root, "docs/sub/new.md"), "utf8")).toBe("made\n");
    expect(readFileSync(join(root, "docs/a.md"), "utf8")).toBe("changed\n");
    writeFileSync(
      join(root, "c.md"),
      brief(fileBlock("docs/c.md", "c"), editBlock("docs/a.md", 1, ["start"], ["x"])),
    );
    expect(main(["c.md"], root, everywhere)).toBe(1);
    expect(existsSync(join(root, "docs/c.md"))).toBe(false);
    expect(main([], root, everywhere)).toBe(2);
  });

  it("BA-5 the wrapper runs apply-blocks.ts with its arguments, and the command line's scope is the kit's scopeVerdict", () => {
    const wrapper = readFileSync(join(HERE, "apply-blocks.sh"), "utf8");
    expect(wrapper).toContain('exec bun "$(dirname "$0")/apply-blocks.ts" "$@"');
    expect(wrapper).toContain("set -euo pipefail");
    const source = readFileSync(join(HERE, "apply-blocks.ts"), "utf8");
    expect(source).toContain(
      'import { PROJECT_DIR, scopeVerdict } from "../../.claude/hooks/lib";',
    );
    expect(source).toContain("allow: Allow = scopeVerdict");
  });
});
