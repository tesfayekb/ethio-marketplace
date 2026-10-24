import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, walkFiles } from "./kit";

/**
 * INC-852 (Foundations turn 1, D3): a signed-in screen's door-step is
 * requireSignedIn (src/lib/signed-in-route.ts), in ONE place. A route file
 * whose code reads auth.getSession( itself is a breach (signed-in-route.ts is
 * not under src/routes — so: always a breach); a route with ssr: false must
 * import requireSignedIn or carry an allowance. Expected allowances: none.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(dirname(fileURLToPath(import.meta.url)), "signed-in-routes-allowlist.txt");

type Finding = { file: string; line: number; what: string };

function lineOf(code: string, index: number): number {
  return code.slice(0, index).split("\n").length;
}

/** The door-step breaches under a routes root. */
export function census(routesRoot: string): { scanned: number; findings: Finding[] } {
  const files = walkFiles([routesRoot], { ext: ["ts", "tsx"], skipTests: true });
  const findings: Finding[] = [];
  for (const file of files) {
    const code = codeOf(readFileSync(file, "utf8"));
    const rel = relative(ROOT, file).split("\\").join("/");
    const session = code.indexOf("auth.getSession(");
    if (session !== -1) {
      findings.push({ file: rel, line: lineOf(code, session), what: "reads the session itself" });
      continue;
    }
    const ssr = code.indexOf("ssr: false");
    if (ssr !== -1 && !/\brequireSignedIn\b/.test(code))
      findings.push({
        file: rel,
        line: lineOf(code, ssr),
        what: "ssr: false without requireSignedIn",
      });
  }
  return { scanned: files.length, findings };
}

const tempRoots: string[] = [];
afterEach(() => {
  while (tempRoots.length) rmSync(tempRoots.pop()!, { recursive: true, force: true });
});

describe("every signed-in screen's door-step is requireSignedIn (INC-852)", () => {
  it("CF-SIR-1 no route reads the session itself; ssr: false implies requireSignedIn", () => {
    const { scanned, findings } = census(join(ROOT, "src", "routes"));
    expect(scanned).toBeGreaterThanOrEqual(10);
    const allowances = readAllowlist(
      ALLOWLIST,
      findings.map((finding) => finding.file),
    );
    const breaches = findings.filter((finding) => !allowances.has(finding.file));
    console.log(`[signed-in-routes] scanned: ${scanned}, breaches: ${breaches.length}`);
    expect(report(breaches)).toBe("");
  });

  it("CF-SIR-2 a planted route with its own getSession is reported", () => {
    const temp = mkdtempSync(join(tmpdir(), "signed-in-routes-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.tsx"),
      'const { data } = await supabase.auth.getSession();\nif (!data.session) throw new Error("x");\n',
    );
    const { findings } = census(temp);
    expect(findings).toEqual([
      {
        file: relative(ROOT, join(temp, "planted.tsx")).split("\\").join("/"),
        line: 1,
        what: "reads the session itself",
      },
    ]);
  });
});
