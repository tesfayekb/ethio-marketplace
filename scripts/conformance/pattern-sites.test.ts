import { readFileSync } from "node:fs";
import { relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, walkFiles } from "./kit";

/**
 * CF-PATTERN-4 (housekeeping turn 2 Part D, INC-1102) — a repository script builds a RegExp from
 * text only through scripts/lib/pattern.ts. Every `new RegExp(` or `RegExp(` under scripts/ (tests
 * excluded) is in that module or counted on scripts/conformance/pattern-sites-allowlist.txt
 * (`<file> (<sites>)`, a count only falls); the reviewed-site marker for Semgrep's
 * detect-non-literal-regexp sits on pattern.ts's one site and nowhere else but an allowlisted file;
 * and `authored` (a pattern its author wrote as text, compiled as written) is imported by the
 * brief laws alone.
 */

const HELPER = "scripts/lib/pattern.ts";
const REVIEWED = "Reviewed (DEC-153): every interpolated part is escaped by literal() above";
const MARKER = "nosemgrep: detect-non-literal-regexp";
const AUTHORED_CALLERS = ["scripts/brief/go-laws.ts"];

type Census = { sites: number[]; markers: number[]; authored: boolean };

function censusOf(file: string, text: string): Census {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sites: number[] = [];
  let authored = false;
  const lineOf = (node: ts.Node) =>
    source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const walk = (node: ts.Node) => {
    if (
      (ts.isNewExpression(node) || ts.isCallExpression(node)) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "RegExp"
    )
      sites.push(lineOf(node));
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      /(?:^|\/)lib\/pattern$/.test(node.moduleSpecifier.text) &&
      node.importClause?.namedBindings !== undefined &&
      ts.isNamedImports(node.importClause.namedBindings) &&
      node.importClause.namedBindings.elements.some(
        (e) => (e.propertyName ?? e.name).text === "authored",
      )
    )
      authored = true;
    ts.forEachChild(node, walk);
  };
  walk(source);
  const markers = text.split("\n").flatMap((line, i) => (line.includes(MARKER) ? [i + 1] : []));
  return { sites, markers, authored };
}

type Finding = { file: string; line: number; what: string };

/** The findings of one file, given the allowlist's keys. */
function findingsOf(file: string, census: Census, text: string, allowed: Set<string>): Finding[] {
  const findings: Finding[] = [];
  if (census.authored && !AUTHORED_CALLERS.includes(file))
    findings.push({
      file,
      line: 1,
      what: "imports authored (only the brief laws compile a pattern as written)",
    });
  if (file === HELPER) {
    const lines = text.split("\n");
    if (census.sites.length !== 1)
      findings.push({ file, line: 1, what: `holds ${census.sites.length} RegExp sites, not one` });
    for (const site of census.sites) {
      const above = lines.slice(Math.max(0, site - 3), site - 1).join("\n");
      if (!above.includes(REVIEWED) || !above.includes(MARKER))
        findings.push({
          file,
          line: site,
          what: "the one site lacks DEC-153's reviewed-site form",
        });
    }
    if (census.markers.length !== 1)
      findings.push({ file, line: 1, what: `carries the marker ${census.markers.length} times` });
    return findings;
  }
  const key = `${file} (${census.sites.length})`;
  if (census.sites.length > 0 && !allowed.has(key))
    for (const line of census.sites)
      findings.push({ file, line, what: "builds a RegExp outside scripts/lib/pattern.ts" });
  if (census.markers.length > 0 && !allowed.has(key))
    for (const line of census.markers)
      findings.push({ file, line, what: "carries the reviewed-site marker outside pattern.ts" });
  return findings;
}

describe("every RegExp a script builds goes through scripts/lib/pattern.ts (CF-PATTERN-4)", () => {
  const files = walkFiles(["scripts"], { ext: ["ts", "mjs", "js", "cjs"], skipTests: true }).map(
    (file) => relative(process.cwd(), file).split("\\").join("/"),
  );
  const rows = files.map((file) => {
    const text = readFileSync(file, "utf8");
    return { file, text, census: censusOf(file, text) };
  });
  const found = rows
    .filter(
      (row) =>
        row.file !== HELPER && (row.census.sites.length > 0 || row.census.markers.length > 0),
    )
    .map((row) => `${row.file} (${row.census.sites.length})`);
  const allowed = new Set(
    readAllowlist("scripts/conformance/pattern-sites-allowlist.txt", found).keys(),
  );

  it("CF-PATTERN-4 no script builds a RegExp, carries the marker or compiles a pattern as written outside the helper without its line; a planted bypass of each is reported", () => {
    const findings = rows.flatMap((row) => findingsOf(row.file, row.census, row.text, allowed));
    console.log(
      `[pattern-sites] files: ${rows.length}, outside the helper: ${found.length} (${allowed.size} allowlisted)`,
    );
    expect(rows.some((row) => row.file === HELPER)).toBe(true);
    expect(report(findings)).toBe("");

    const planted = [
      'import { authored } from "../lib/pattern";',
      "// nosemgrep: detect-non-literal-regexp",
      "export const rx = new RegExp(name);",
      "export const ry = RegExp(`^${name}$`);",
    ].join("\n");
    const file = "scripts/planted.ts";
    const census = censusOf(file, planted);
    expect(census).toEqual({ sites: [3, 4], markers: [2], authored: true });
    expect(findingsOf(file, census, planted, new Set()).map((f) => `${f.line} ${f.what}`)).toEqual([
      "1 imports authored (only the brief laws compile a pattern as written)",
      "3 builds a RegExp outside scripts/lib/pattern.ts",
      "4 builds a RegExp outside scripts/lib/pattern.ts",
      "2 carries the reviewed-site marker outside pattern.ts",
    ]);
    const helper = "const a = 1;\nexport const rx = new RegExp(source, flags);";
    expect(
      findingsOf(HELPER, censusOf(HELPER, helper), helper, new Set()).map((f) => f.what),
    ).toEqual(["the one site lacks DEC-153's reviewed-site form", "carries the marker 0 times"]);
  });
});
