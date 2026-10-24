import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, walkFiles } from "./kit";

/**
 * DEC-244 (Foundations turn 1, C4): every census guard walks the tree through
 * scripts/conformance/kit.ts. The census is import/call-based — an import of
 * readdirSync/readdir/opendirSync/glob/globSync, or a call of createSourceFile(
 * — never a bare word. A hit is the kit itself, a file that imports the kit,
 * or carries an allowance (kit-adoption-allowlist.txt, reason + until).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(dirname(fileURLToPath(import.meta.url)), "kit-adoption-allowlist.txt");

const IMPORT_STATEMENT = /import[\s\S]*?from\s*["'][^"']*["']/g;
const ENUMERATOR = /\b(?:readdirSync|opendirSync|readdir|globSync|glob)\b/;
const KIT_IMPORT = /from\s*["'][^"']*conformance\/kit["']/;

type Finding = { file: string; line: number; what: string };

function lineOf(code: string, index: number): number {
  return code.slice(0, index).split("\n").length;
}

/** Every enumerator import or createSourceFile( call under the roots. */
export function census(roots: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of walkFiles(roots, { ext: ["ts", "tsx", "mjs"] })) {
    const code = codeOf(readFileSync(file, "utf8"));
    const rel = relative(ROOT, file).split("\\").join("/");
    for (const match of code.matchAll(IMPORT_STATEMENT)) {
      if (ENUMERATOR.test(match[0]))
        findings.push({
          file: rel,
          line: lineOf(code, match.index),
          what: "imports a tree enumerator",
        });
    }
    for (const match of code.matchAll(/createSourceFile\(/g))
      findings.push({ file: rel, line: lineOf(code, match.index), what: "calls createSourceFile(" });
  }
  return findings;
}

/** A hit is excused when its file is the kit or imports it. */
function excused(file: string): boolean {
  if (file === "scripts/conformance/kit.ts") return true;
  return KIT_IMPORT.test(codeOf(readFileSync(join(ROOT, file), "utf8")));
}

const tempRoots: string[] = [];
afterEach(() => {
  while (tempRoots.length) rmSync(tempRoots.pop()!, { recursive: true, force: true });
});

describe("every tree walker goes through the conformance kit (DEC-244)", () => {
  it("CF-ADOPT-1 the census holds: kit, kit importers or allowances, nothing else", () => {
    const findings = census(["scripts", "src", "e2e"].map((dir) => join(ROOT, dir)));
    const found = new Set(findings.map((finding) => finding.file));
    expect(found.size).toBeGreaterThanOrEqual(20);
    const allowances = readAllowlist(ALLOWLIST, found);
    const breaches = findings.filter(
      (finding) => !excused(finding.file) && !allowances.has(finding.file),
    );
    console.log(
      `[kit-adoption] census: ${found.size} files, allowances: ${allowances.size}, breaches: ${breaches.length}`,
    );
    expect(report(breaches)).toBe("");
  });

  it("CF-ADOPT-2 a planted walker under a temp root is reported", () => {
    const temp = mkdtempSync(join(tmpdir(), "kit-adoption-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.ts"),
      'import { readdirSync } from "node:fs";\nreaddirSync(".");\n',
    );
    const findings = census([temp]);
    expect(findings).toEqual([
      { file: relative(ROOT, join(temp, "planted.ts")).split("\\").join("/"), line: 1, what: "imports a tree enumerator" },
    ]);
  });
});
