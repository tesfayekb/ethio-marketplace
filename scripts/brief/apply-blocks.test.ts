import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it, vi } from "vitest";
import { errorText } from "../../src/lib/error-text";
import { walkFiles } from "../conformance/kit";
import { applyBlocks, ApplyRefused, main, parseBlocks, type Allow, type Io } from "./apply-blocks";

/**
 * Register row 58 (Foundations records turn R1; hardened in records turn R3) — a brief's FILE and EDIT
 * blocks reach the tree exactly, through scripts/brief/apply-blocks.sh (apply-blocks.ts): in order, all or
 * none. The planted briefs are built line by line, so this file holds no block of its own.
 */
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const roots: string[] = [];
const scratch = () => {
  const root = mkdtempSync(join(tmpdir(), "apply-blocks-"));
  roots.push(root);
  return root;
};
afterAll(() => {
  for (const root of roots) rmSync(root, { recursive: true, force: true });
});

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
    writeAll: (texts) => {
      writes += 1;
      for (const [path, text] of texts) state.set(path, text);
    },
    allow,
  };
}
const refusal = (run: () => unknown): string => {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(ApplyRefused);
    return errorText(error);
  }
  return "no refusal";
};

/** Code that names a block marker, other than the applier and this test: a second parser of briefs. */
function secondParsers(files: Array<{ path: string; text: string }>): string[] {
  const own = new Set(["scripts/brief/apply-blocks.ts", "scripts/brief/apply-blocks.test.ts"]);
  return files
    .filter((f) => !own.has(f.path) && /\b(?:OLD|NEW)-BEGIN\b|\bFILE-(?:BEGIN|END)\b/.test(f.text))
    .map((f) => f.path);
}

describe("the block applier (register row 58)", () => {
  it("BA-1 reads FILE and EDIT blocks in the order written; a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order is refused", () => {
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
    expect(refusal(() => parseBlocks(brief(runOn, editBlock("a.txt", 2, ["x"], ["y"]))))).toBe(
      "EDIT a.txt #1: malformed — a block marker inside its OLD or NEW text",
    );
    const lastNeverEnds = ["EDIT a.txt #1", "OLD-BEGIN", "x", "OLD-END", "NEW-BEGIN", "y"];
    expect(refusal(() => parseBlocks(brief(fileBlock("ok.txt", "z"), lastNeverEnds)))).toBe(
      'malformed — the marker "EDIT a.txt #1" on line 9 belongs to no whole block',
    );
    expect(refusal(() => parseBlocks(brief(["FILE-BEGIN b.txt", "text"])))).toBe(
      'malformed — the marker "FILE-BEGIN b.txt" on line 5 belongs to no whole block',
    );
    const twice = brief(editBlock("a.txt", 1, ["a"], ["b"]), editBlock("a.txt", 1, ["b"], ["c"]));
    expect(refusal(() => parseBlocks(twice))).toBe(
      "EDIT a.txt #1: out of order — the path's next EDIT is #2",
    );
    const gap = brief(editBlock("a.txt", 1, ["a"], ["b"]), editBlock("a.txt", 3, ["b"], ["c"]));
    expect(refusal(() => parseBlocks(gap))).toBe(
      "EDIT a.txt #3: out of order — the path's next EDIT is #2",
    );
    expect(refusal(() => parseBlocks(brief(editBlock("b.txt", 2, ["a"], ["b"]))))).toBe(
      "EDIT b.txt #2: out of order — the path's next EDIT is #1",
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
    expect(io.writes()).toBe(1);
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
      const message = refusal(() => applyBlocks(parseBlocks(b), io, only));
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

  it("BA-4 the command line writes the tree, writes nothing on --dry, a refusal, a file it cannot stage or a directory at a target, keeps an edited file's mode, and asks for a brief", () => {
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const err = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    try {
      const root = scratch();
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
      // docs/a.md is a file, so docs/a.md/x.md cannot be staged: docs/ok.md, staged first, is not written either.
      writeFileSync(
        join(root, "d.md"),
        brief(fileBlock("docs/ok.md", "ok"), fileBlock("docs/a.md/x.md", "x")),
      );
      expect(main(["d.md"], root, everywhere)).toBe(1);
      expect(existsSync(join(root, "docs/ok.md"))).toBe(false);
      expect(existsSync(join(root, "docs/ok.md.apply-blocks-staged"))).toBe(false);
      // A directory standing at a FILE block's path is refused before anything is placed.
      mkdirSync(join(root, "docs/dir"));
      writeFileSync(
        join(root, "e.md"),
        brief(fileBlock("docs/ok.md", "ok"), fileBlock("docs/dir", "x")),
      );
      expect(main(["e.md"], root, everywhere)).toBe(1);
      expect(existsSync(join(root, "docs/ok.md"))).toBe(false);
      expect(existsSync(join(root, "docs/ok.md.apply-blocks-staged"))).toBe(false);
      // An edited script keeps its mode: an executable stays executable.
      writeFileSync(join(root, "docs/run.sh"), "echo one\n");
      chmodSync(join(root, "docs/run.sh"), 0o755);
      writeFileSync(
        join(root, "f.md"),
        brief(editBlock("docs/run.sh", 1, ["echo one"], ["echo two"])),
      );
      expect(main(["f.md"], root, everywhere)).toBe(0);
      expect(readFileSync(join(root, "docs/run.sh"), "utf8")).toBe("echo two\n");
      expect(statSync(join(root, "docs/run.sh")).mode & 0o777).toBe(0o755);
      expect(main([], root, everywhere)).toBe(2);
    } finally {
      out.mockRestore();
      err.mockRestore();
    }
  });

  it("BA-5 the wrapper runs the applier with its arguments under the kit's scopeVerdict: before a brief is in force only the standing allowance may change", () => {
    const root = scratch();
    writeFileSync(
      join(root, "b.md"),
      brief(fileBlock("docs/features/x.md", "allowed"), fileBlock("src/x.ts", "scoped")),
    );
    const wrapper = (...args: string[]) =>
      spawnSync("bash", [join(HERE, "apply-blocks.sh"), ...args], {
        cwd: root,
        env: { ...process.env, CLAUDE_PROJECT_DIR: root },
        encoding: "utf8",
      });
    const refused = wrapper("b.md");
    expect(refused.status).toBe(1);
    expect(refused.stderr).toContain("FILE src/x.ts: src/x.ts: no brief in force yet");
    expect(existsSync(join(root, "docs/features/x.md"))).toBe(false);
    const applied = wrapper("b.md", "docs/features/x.md");
    expect(applied.status).toBe(0);
    expect(applied.stdout).toContain("applied 1 block(s) to 1 file(s)");
    expect(readFileSync(join(root, "docs/features/x.md"), "utf8")).toBe("allowed\n");
  });

  it("BA-6 the applier is the one parser of brief blocks: no other code names a block marker, EDIT or FILE (planted second parsers are named)", () => {
    expect(
      secondParsers([
        { path: "scripts/brief/apply-blocks.ts", text: "OLD-BEGIN" },
        { path: "scripts/other.ts", text: 'const at = brief.indexOf("NEW-BEGIN");' },
        { path: "scripts/files-only.ts", text: 'const end = text.indexOf("FILE-END " + path);' },
        { path: "src/x.ts", text: "no markers" },
      ]),
    ).toEqual(["scripts/other.ts", "scripts/files-only.ts"]);
    const files = walkFiles(
      ["src", "e2e", "scripts", ".claude"].map((d) => join(ROOT, d)),
      { ext: ["ts", "tsx", "mjs", "js", "cjs", "sh"] },
    ).map((file) => ({
      path: relative(ROOT, file).split(sep).join("/"),
      text: readFileSync(file, "utf8"),
    }));
    expect(files.length).toBeGreaterThan(500);
    expect(secondParsers(files)).toEqual([]);
  });
});
