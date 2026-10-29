import { existsSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * G55 (Foundations turn C3) — the supervisor's agents-line check, carried by the repository.
 * AGENTS.md is the constitution every agent reads, and the platform keeps it inside a byte budget
 * after its LOVABLE block (5,120 bytes — S326, INC-735). Two rules:
 * - its bytes after `<!-- LOVABLE:END -->` stay inside the budget, or a recorded exception
 *   `AGENTS.md (<bytes>) | reason | until` in agents-lines-allowlist.txt holds today's count (a file
 *   that grows or shrinks makes the line stale, and it fails);
 * - every file a line points to exists: a path under src/, e2e/, scripts/, docs/, supabase/,
 *   public/, .claude/ or .github/ (a glob or a placeholder aside), and a bare file name such as
 *   `signed-in-route.ts` names a file somewhere in the repository.
 * The rule that a brief landing a mechanism carries its AGENTS.md line stays the supervisor's check
 * on the brief (a brief is not in the tree until STEP 0); land.ts enforces the brief's
 * no-agents-change flag.
 */

type Finding = { file: string; line: number; what: string };

export const AGENTS_BUDGET = 5_120;
const END = "<!-- LOVABLE:END -->";
const PATH =
  /(?:^|[\s(`'"[])\/?((?:src|e2e|scripts|docs|supabase|public|\.claude|\.github)\/[^\s`'",;()[\]]*)/g;
const BARE =
  /(?:^|[\s(`'"])([a-z0-9][\w.-]*\.(?:ts|tsx|mjs|sh|md|txt|css|json|sql|yml))(?=[\s)`'",;:]|$)/g;

/** The bytes AGENTS.md holds after its LOVABLE block. */
export function bytesAfterBlock(text: string): number {
  const at = text.indexOf(END);
  return Buffer.byteLength(at < 0 ? text : text.slice(at + END.length), "utf8");
}

export function agentsLineFindings(
  text: string,
  exists: (path: string) => boolean,
  names: Set<string>,
  file = "AGENTS.md",
): Finding[] {
  const findings: Finding[] = [];
  text.split("\n").forEach((content, index) => {
    const line = index + 1;
    for (const match of content.matchAll(PATH)) {
      const path = (match[1] ?? "").replace(/[.:]+$/, "");
      if (/[*<>{}]/.test(path)) continue;
      if (!exists(path.replace(/\/$/, "")))
        findings.push({ file, line, what: `points to ${path}, which does not exist` });
    }
    for (const match of content.matchAll(BARE)) {
      const name = match[1] ?? "";
      if (!names.has(name))
        findings.push({ file, line, what: `names ${name}, which no file in the repository is` });
    }
  });
  return findings;
}

const ALLOWLIST = "scripts/conformance/agents-lines-allowlist.txt";

/**
 * Foundations turn A1 (the D1 follow-up) — a bare name AGENTS.md cites that lives only off this
 * branch (a ci-evidence file CI writes) is held by an allowlist line `names <file> | reason | until`
 * in the same file as AGL-2's budget line, so both tests read every key the file can hold and a
 * line neither needs is stale.
 */
function nameKey(finding: Finding): string {
  const match = /^names (\S+),/.exec(finding.what);
  return match ? `names ${match[1]}` : `${finding.file}:${finding.line} ${finding.what}`;
}

function allowlistKeys(text: string, findings: Finding[]): string[] {
  const bytes = bytesAfterBlock(text);
  return [...findings.map(nameKey), ...(bytes > AGENTS_BUDGET ? [`AGENTS.md (${bytes})`] : [])];
}

describe("AGENTS.md stays inside its budget and points only to files that exist (G55)", () => {
  it(
    "AGL-1 every path and file name AGENTS.md points to exists",
    () => {
      const text = readFileSync("AGENTS.md", "utf8");
      const files = walkFiles(
        ["src", "e2e", "scripts", "docs", "supabase", "public", ".claude", ".github"],
        {
          ext: ["ts", "tsx", "mjs", "sh", "md", "txt", "css", "json", "sql", "yml"],
        },
      );
      const names = new Set([...files.map((path) => basename(path)), "AGENTS.md", "package.json"]);
      const pointers = [...text.matchAll(PATH)].length + [...text.matchAll(BARE)].length;
      console.log(
        `[AGL-1] AGENTS.md lines: ${text.split("\n").length}; pointers read: ${pointers}`,
      );
      expect(pointers).toBeGreaterThan(40);
      const findings = agentsLineFindings(text, existsSync, names);
      const allowances = readAllowlist(ALLOWLIST, allowlistKeys(text, findings));
      expect(report(findings.filter((f) => !allowances.has(nameKey(f))))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("AGL-2 AGENTS.md after its LOVABLE block stays inside the 5,120-byte budget, or a recorded exception holds its count", () => {
    const bytes = bytesAfterBlock(readFileSync("AGENTS.md", "utf8"));
    const findings = bytes > AGENTS_BUDGET ? [`AGENTS.md (${bytes})`] : [];
    const text = readFileSync("AGENTS.md", "utf8");
    const names = new Set(
      walkFiles(["src", "e2e", "scripts", "docs", "supabase", "public", ".claude", ".github"], {
        ext: ["ts", "tsx", "mjs", "sh", "md", "txt", "css", "json", "sql", "yml"],
      }).map((path) => basename(path)),
    );
    names.add("AGENTS.md");
    names.add("package.json");
    const allowances = readAllowlist(
      ALLOWLIST,
      allowlistKeys(text, agentsLineFindings(text, existsSync, names)),
    );
    console.log(
      `[AGL-2] AGENTS.md after the LOVABLE block: ${bytes} bytes; budget ${AGENTS_BUDGET}`,
    );
    expect(findings.filter((key) => !allowances.has(key))).toEqual([]);
  });

  it("AGL-3 planted: a missing path, a missing bare name and a block over budget are each found; globs, placeholders and real files pass", () => {
    const text = [
      "<!-- LOVABLE:BEGIN -->",
      "> platform text",
      END,
      "- Routes: `defineRoute` (src/server/route.ts); doors via door.ts; the gone src/lib/gone.ts.",
      "- Specs: e2e/*.spec.ts and docs/features/<name>.md; the missing (vanished.ts).",
      "- Folders: src/server/ai/ and /docs/conventions.md.",
    ].join("\n");
    const real = new Set(["src/server/route.ts", "src/server/ai", "docs/conventions.md"]);
    expect(
      report(
        agentsLineFindings(
          text,
          (path) => real.has(path),
          new Set(["route.ts", "door.ts", "conventions.md"]),
          "planted",
        ),
      ),
    ).toBe(
      [
        "planted:4 points to src/lib/gone.ts, which does not exist",
        "planted:5 names vanished.ts, which no file in the repository is",
      ].join("\n"),
    );
    expect(bytesAfterBlock(`x${END}${"é".repeat(2_561)}`)).toBe(5_122);
    expect(bytesAfterBlock(`x${END}${"é".repeat(2_561)}`)).toBeGreaterThan(AGENTS_BUDGET);
  });
});
