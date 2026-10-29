import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, sep } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-985 / INC-954 (Foundations turn L-1, B4; register row 16) — ONE FORMATTER PER INTENT, ONE
 * LOCALE MODULE. A date, time, relative time or number a person reads is formatted only by
 * src/lib/format.ts; a locale tag and a code's shape (country, currency) are named only in
 * src/lib/locale.ts (K4). CF-FMT-1 reads src/, e2e/ and scripts/ (unit tests excepted: they may
 * compute an expected value with Intl) and fails on:
 *   - `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat` (constructed or read);
 *   - a `toLocaleString` / `toLocaleDateString` / `toLocaleTimeString` call;
 *   - a literal locale tag (`"am-ET"`, `"en-GB"`, `"en-US"` …);
 *   - the country-code shape `/^[A-Z]{2}$/` or the currency-code shape `/^[A-Z]{3}$/`.
 * A recorded exception is a line in format-allowlist.txt keyed `<file> (<findings>)` | reason | until.
 */
type Finding = { file: string; line: number; what: string };

const HOMES = new Set(["src/lib/format.ts", "src/lib/locale.ts"]);
const INTL = new Set(["DateTimeFormat", "NumberFormat", "RelativeTimeFormat"]);
const TO_LOCALE = new Set(["toLocaleString", "toLocaleDateString", "toLocaleTimeString"]);
const LOCALE_TAG = /^[a-z]{2,3}-[A-Z]{2}$/;
const CODE_SHAPE = /^\/\^\[A-Z\]\{[23]\}\$\/[a-z]*$/;
const RULE = "(INC-985: use src/lib/format.ts / src/lib/locale.ts)";
const ALLOWLIST = "scripts/conformance/format-allowlist.txt";

export function formatFindings(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    if (HOMES.has(name)) continue;
    visitTs(file, (node, source) => {
      const at = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "Intl" &&
        INTL.has(node.name.text)
      )
        found.push({ file: name, line: at(), what: `uses Intl.${node.name.text} ${RULE}` });
      else if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        TO_LOCALE.has(node.expression.name.text)
      )
        found.push({ file: name, line: at(), what: `calls ${node.expression.name.text} ${RULE}` });
      else if (
        (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
        LOCALE_TAG.test(node.text)
      )
        found.push({ file: name, line: at(), what: `names the locale tag "${node.text}" ${RULE}` });
      else if (node.kind === ts.SyntaxKind.RegularExpressionLiteral && CODE_SHAPE.test(node.getText(source)))
        found.push({ file: name, line: at(), what: `re-declares a code's shape ${RULE}` });
    });
  }
  return found;
}

function scanned(root: string): string[] {
  return walkFiles(
    ["src", "e2e", "scripts"].map((dir) => join(root, dir)),
    { ext: ["ts", "tsx", "mjs"], skip: /\.test\.tsx?$|\/fixtures\// },
  );
}

/** The findings that no allowlist line covers, keyed `<file> (<count>)`. */
function uncovered(found: Finding[], allowlist: string): Finding[] {
  const counts = new Map<string, number>();
  for (const finding of found) counts.set(finding.file, (counts.get(finding.file) ?? 0) + 1);
  const keys = [...counts].map(([file, count]) => `${file} (${count})`);
  const allowed = readAllowlist(allowlist, keys);
  return found.filter((finding) => !allowed.has(`${finding.file} (${counts.get(finding.file)})`));
}

describe("one formatter per intent, one locale module (CF-FMT-1)", () => {
  it(
    "CF-FMT-1 no date, number or locale tag is formatted or named outside format.ts / locale.ts",
    () => {
      const root = process.cwd();
      expect(report(uncovered(formatFindings(scanned(root), root), ALLOWLIST))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-FMT-1 planted: each bypass form is caught, the homes are not", () => {
    const root = mkdtempSync(join(tmpdir(), "cf-fmt-1-"));
    try {
      mkdirSync(join(root, "src", "lib"), { recursive: true });
      mkdirSync(join(root, "src", "feature"), { recursive: true });
      mkdirSync(join(root, "e2e"), { recursive: true });
      mkdirSync(join(root, "scripts"), { recursive: true });
      writeFileSync(
        join(root, "src", "feature", "page.tsx"),
        [
          'const a = new Intl.DateTimeFormat("am-ET", { month: "short" });',
          "const b = Intl.NumberFormat.supportedLocalesOf(['en']);",
          "const c = (1).toLocaleString();",
          "const d = /^[A-Z]{2}$/.test(code);",
          "const e = new Intl.RelativeTimeFormat(x);",
        ].join("\n"),
      );
      writeFileSync(
        join(root, "src", "lib", "format.ts"),
        'export const f = new Intl.DateTimeFormat("en-GB");\n',
      );
      writeFileSync(join(root, "src", "lib", "locale.ts"), "export const C = /^[A-Z]{2}$/;\n");
      const found = formatFindings(scanned(root), root).map((f) => `${f.file}:${f.line}`);
      expect(found).toEqual([
        "src/feature/page.tsx:1",
        "src/feature/page.tsx:1",
        "src/feature/page.tsx:2",
        "src/feature/page.tsx:3",
        "src/feature/page.tsx:4",
        "src/feature/page.tsx:5",
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
