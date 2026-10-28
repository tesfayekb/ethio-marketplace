import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * INC-959 (Foundations turn C3) — A TEST REACHES THE BROWSER'S OWN DATABASE CLIENT ONE WAY. The app
 * hands its client to the page in an E2E build, after mount (src/components/app-shell.tsx, the one
 * place that sets `window.__ethioSupabase`); since DEC-261 it arrives on demand, so a synchronous read
 * can find nothing. The mechanism is e2e/helpers/browser-client.ts (`awaitBrowserClient`,
 * `inBrowserClient`, the one `BrowserClient` type).
 *
 * The census reads the code (comments blanked) of every file under e2e/ and every non-test file under
 * src/ for the name `__ethioSupabase`. Outside the mechanism and the app's hook, a file that names it
 * carries an allowance keyed `<file> (<count>)` in browser-client-allowlist.txt — a file that sheds
 * reads must lower its line (the old line goes stale and fails), and none may rise.
 */

const NAME = /__ethioSupabase/g;
export const BROWSER_CLIENT_HOMES = [
  "e2e/helpers/browser-client.ts",
  "src/components/app-shell.tsx",
];

export function browserClientCensus(
  files: string[],
  homes: string[] = BROWSER_CLIENT_HOMES,
): { keys: string[]; findings: Array<{ file: string; line: number; what: string }> } {
  const keys: string[] = [];
  const findings: Array<{ file: string; line: number; what: string }> = [];
  for (const file of files) {
    if (homes.includes(file)) continue;
    const code = codeOf(readFileSync(file, "utf8"));
    const lines = [...code.matchAll(NAME)].map(
      (match) => code.slice(0, match.index).split("\n").length,
    );
    if (lines.length === 0) continue;
    const key = `${file} (${lines.length})`;
    keys.push(key);
    for (const line of lines)
      findings.push({
        file: key,
        line,
        what: "reads the page's client by hand; reach it through e2e/helpers/browser-client.ts",
      });
  }
  return { keys: keys.sort(), findings };
}

const ALLOWLIST = "scripts/conformance/browser-client-allowlist.txt";
const files = [
  ...walkFiles(["e2e"], { ext: ["ts"] }),
  ...walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }),
];
const { keys, findings } = browserClientCensus(files);
const allowances = readAllowlist(ALLOWLIST, keys);

describe("a test reaches the browser's client one way (INC-959)", () => {
  it(
    "CF-BC-1 no file but the helper and the app's hook names __ethioSupabase, or its file has a live allowance holding its count",
    () => {
      console.log(
        `[CF-BC-1] files read: ${files.length}; files naming the client by hand: ${keys.length}; reads: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(files.length).toBeGreaterThan(400);
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
      // The app's hook still hands the client over, and the helper still waits for it.
      expect(codeOf(readFileSync("src/components/app-shell.tsx", "utf8"))).toMatch(
        /\.__ethioSupabase = client;/,
      );
      expect(readFileSync("e2e/helpers/browser-client.ts", "utf8")).toMatch(
        /export async function awaitBrowserClient\(/,
      );
    },
    TREE_SCAN_MS,
  );

  it("CF-BC-2 the census counts a planted read per file, skips comments and the homes, and a stale line fails", () => {
    const dir = "node_modules/.cache/browser-client";
    mkdirSync(dir, { recursive: true });
    const spec = `${dir}/bc.spec.ts`;
    const quiet = `${dir}/bc-quiet.spec.ts`;
    const home = `${dir}/bc-home.ts`;
    const list = `${dir}/allowlist.txt`;
    try {
      writeFileSync(
        spec,
        'const a = (window as any).__ethioSupabase;\n// window.__ethioSupabase in a comment\nconst b = window.__ethioSupabase?.rpc("x");\n',
      );
      writeFileSync(
        quiet,
        "/* window.__ethioSupabase */\nimport { inBrowserClient } from './browser-client';\n",
      );
      writeFileSync(home, "window.__ethioSupabase = client;\n");
      const planted = browserClientCensus([spec, quiet, home], [home]);
      expect(planted.keys).toEqual([`${spec} (2)`]);
      expect(planted.findings.map((hit) => `${hit.file}:${hit.line}`)).toEqual([
        `${spec} (2):1`,
        `${spec} (2):3`,
      ]);
      // A line holding an old count is stale once the file sheds a read.
      writeFileSync(list, `${spec} (3) | planted | INC-959\n`);
      expect(() => readAllowlist(list, planted.keys)).toThrow("stale allowance");
      writeFileSync(list, `${spec} (2) | planted | INC-959\n`);
      expect([...readAllowlist(list, planted.keys).keys()]).toEqual([`${spec} (2)`]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
