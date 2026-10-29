import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-995 (Foundations turn CI-1, A5) — A SECTION'S OUTCOME IS SHOWN BESIDE ITS OWN TABLE.
 * INC-570's ActionMessage is placed beside the control that produced it. Admin ›
 * Screening passed each section an `onNotice` callback that fed ONE page message above
 * the listings table, so a section's outcome appeared beside another section's table.
 *
 * The rule: a section — a component whose file draws its own table or card
 * (`<DataTable` or `<PageCard`) — is never handed an `onNotice` callback; it hosts its
 * own ActionMessage. A piece inside a section (the job line inside the held-names
 * section) may report to that section: it draws no table or card of its own. No
 * allowlist.
 */

const ROOT = join(__dirname, "..", "..");
const SECTION_MARK = /<DataTable\b|<PageCard\b/;

/** Exported components whose own file draws a table or a card: the sections. */
function sections(files: string[]): Set<string> {
  const names = new Set<string>();
  for (const file of files) {
    if (!SECTION_MARK.test(readFileSync(file, "utf8"))) continue;
    visitTs(file, (node) => {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
        /^[A-Z]/.test(node.name.text)
      )
        names.add(node.name.text);
    });
  }
  return names;
}

export function sectionNoticeCensus(
  roots: string[],
): Array<{ file: string; line: number; what: string }> {
  const files = walkFiles(roots, { ext: ["tsx"], skipTests: true });
  const known = sections(files);
  const findings: Array<{ file: string; line: number; what: string }> = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isJsxSelfClosingElement(node) && !ts.isJsxOpeningElement(node)) return;
      const tag = node.tagName.getText(source);
      if (!known.has(tag)) return;
      const passes = node.attributes.properties.some(
        (prop) => ts.isJsxAttribute(prop) && prop.name.getText(source) === "onNotice",
      );
      if (!passes) return;
      findings.push({
        file: relative(ROOT, file).split("\\").join("/"),
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `hands section <${tag}> an onNotice callback; the section hosts its own ActionMessage (INC-995)`,
      });
    });
  }
  return findings;
}

describe("a section's outcome is shown beside its own table (INC-995)", () => {
  it(
    "SNC-1 no file under src/ hands a section an onNotice callback",
    () => {
      expect(report(sectionNoticeCensus([join(ROOT, "src")]))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("SNC-2 the planted pre-CI-1 shape (a page feeding a section's outcome to its own message) is caught", () => {
    const dir = join(ROOT, "node_modules/.cache/section-notice-planted");
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "held.tsx"),
      "export function HeldNames(props: { onNotice: (k: string) => void }) {\n  return <PageCard testid=\"x\">{null}</PageCard>;\n}\n",
    );
    writeFileSync(
      join(dir, "inner.tsx"),
      "export function InnerLine(props: { onNotice: (k: string) => void }) {\n  return <p>{null}</p>;\n}\n",
    );
    writeFileSync(
      join(dir, "page.tsx"),
      [
        "export function Page() {",
        "  return (",
        "    <div>",
        "      <ActionMessage text={null} tone=\"done\" />",
        "      <HeldNames onNotice={(k) => k} />",
        "      <InnerLine onNotice={(k) => k} />",
        "    </div>",
        "  );",
        "}",
        "",
      ].join("\n"),
    );
    try {
      const findings = sectionNoticeCensus([dir]);
      expect(findings.map((f) => `${f.file.split("/").pop()}:${f.line}`)).toEqual(["page.tsx:5"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
