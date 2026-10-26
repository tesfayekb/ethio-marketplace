import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * The executor's platform rule: "Never use TypeScript non-null assertions (`!`) — narrow with an
 * early-return guard or optional chaining instead. Sole exception: process.env['X']! reads inside
 * server handlers." The census counts every non-null assertion in the code the executor writes
 * (src/ but the generated client in src/integrations/, scripts/, e2e/, the kit's .claude/hooks/),
 * a `process.env` read excepted. A file may hold no more than its allowlist line says — the line's
 * key carries the count, so a file that sheds assertions must lower its line (a stale line fails)
 * and a file that gains one is named. The kit holds none (turn K2 took out its 22).
 */

type Finding = { file: string; line: number; what: string };

/** `process.env.X!` and `process.env["X"]!` — the rule's one exception. */
function isEnvRead(node: ts.Expression): boolean {
  const target = ts.isPropertyAccessExpression(node)
    ? node.expression
    : ts.isElementAccessExpression(node)
      ? node.expression
      : null;
  return (
    target !== null &&
    ts.isPropertyAccessExpression(target) &&
    ts.isIdentifier(target.expression) &&
    target.expression.text === "process" &&
    target.name.text === "env"
  );
}

/** Each file's non-null assertions, by line. */
export function nonNullCensus(files: string[]): Map<string, number[]> {
  const sites = new Map<string, number[]>();
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isNonNullExpression(node) || isEnvRead(node.expression)) return;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      sites.set(file, [...(sites.get(file) ?? []), line]);
    });
  }
  return sites;
}

/** The census's keys: `<file> (<count>)` for every file that holds an assertion. */
export function nonNullKeys(sites: Map<string, number[]>): string[] {
  return [...sites].map(([file, lines]) => `${file} (${lines.length})`);
}

const ALLOWLIST = "scripts/conformance/non-null-allowlist.txt";

const domain = walkFiles(["src", "scripts", "e2e", ".claude/hooks"], {
  ext: ["ts", "tsx"],
  skip: /^src[\\/]integrations(?:[\\/]|$)/,
});

describe("no new non-null assertion (the executor's platform rule; turn K2)", () => {
  it(
    "CF-NN-1 every file holds no more non-null assertions than its allowlist line, and the kit none",
    () => {
      const sites = nonNullCensus(domain);
      const keys = nonNullKeys(sites);
      const allowed = readAllowlist(ALLOWLIST, keys);
      const findings: Finding[] = [];
      for (const [file, lines] of sites) {
        if (allowed.has(`${file} (${lines.length})`) && !file.startsWith(".claude/")) continue;
        for (const line of lines)
          findings.push({
            file,
            line,
            what: `uses a non-null assertion (${lines.length} in the file) — narrow with a guard or optional chaining`,
          });
      }
      const total = [...sites.values()].reduce((sum, lines) => sum + lines.length, 0);
      console.log(`[non-null] files read: ${domain.length}; assertions: ${total} in ${sites.size}`);
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-NN-2 the census names planted assertions and passes a guard, optional chaining and an environment read", () => {
    const dir = "node_modules/.cache/non-null";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/nn-bad.ts`;
    const good = `${dir}/nn-good.ts`;
    try {
      // The mark is spelled by its code so this file's own text carries none (the brief checker reads it).
      const bang = String.fromCharCode(33);
      writeFileSync(
        bad,
        `export function f(a: { b?: string }, list: string[]) {\n  const head = list[0]${bang};\n  return a.b${bang}.length + head.length;\n}\n`,
      );
      writeFileSync(
        good,
        `export function g(a: { b?: string }, list: string[]) {\n  const head = list[0];\n  if (head === undefined) return 0;\n  const key = process.env["E2E_KEY"]${bang};\n  return (a.b?.length ?? 0) + head.length + key.length;\n}\n`,
      );
      const sites = nonNullCensus([bad, good]);
      expect([...sites]).toEqual([[bad, [2, 3]]]);
      expect(nonNullKeys(sites)).toEqual([`${bad} (2)`]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
