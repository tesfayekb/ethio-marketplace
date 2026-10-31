import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-ONE-LINE-1 (turn B2, DEC-314, §5) — ONE LINE WITH ONE SLOT. A line built from a sentence
 * with one slot (the feed heading's place) reads ONE_LINE_SLOT (src/components/ui/one-line-slot.tsx):
 * the fixed words whole, only the slot cuts. The census refuses:
 *  1. an element around a <OneLineSlot> that lets the line break (`wrap-anywhere`, `break-words`,
 *     `break-all`, `whitespace-normal`): it would wrap the fixed words;
 *  2. the mechanism's own file letting its line break (outside CutText, which it calls);
 *  3. the feed heading (`data-testid="feed-heading"`) drawing its place without <OneLineSlot>.
 * No allowlist: a slot line that breaks is fixed, never excused.
 */
type Finding = { file: string; line: number; what: string };

const BREAKS = /(?<![\w-])(wrap-anywhere|break-words|break-all|whitespace-normal)(?![\w-])/;
const MECHANISM = "src/components/ui/one-line-slot.tsx";

function classText(attrs: ts.JsxAttributes, source: ts.SourceFile): string {
  for (const prop of attrs.properties) {
    if (ts.isJsxAttribute(prop) && prop.name.getText(source) === "className" && prop.initializer)
      return prop.initializer.getText(source);
  }
  return "";
}

function attrText(attrs: ts.JsxAttributes, name: string, source: ts.SourceFile): string {
  for (const prop of attrs.properties) {
    if (ts.isJsxAttribute(prop) && prop.name.getText(source) === name && prop.initializer)
      return prop.initializer.getText(source);
  }
  return "";
}

export function oneLineFindings(files: Array<{ name: string; text: string }>): Finding[] {
  const findings: Finding[] = [];
  for (const { name, text } of files) {
    if (name === MECHANISM) {
      codeOf(text)
        .split("\n")
        .forEach((line, index) => {
          const hit = BREAKS.exec(line);
          if (hit) findings.push({ file: name, line: index + 1, what: `the slot line breaks ("${hit[1]}")` });
        });
      continue;
    }
    if (!text.includes("OneLineSlot") && !text.includes("feed-heading")) continue;
    const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node: ts.Node) => {
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === "OneLineSlot") {
        for (let up = node.parent; up !== undefined; up = up.parent) {
          if (ts.isJsxElement(up)) {
            const hit = BREAKS.exec(classText(up.openingElement.attributes, source));
            if (hit) {
              const line = source.getLineAndCharacterOfPosition(up.getStart(source)).line + 1;
              findings.push({ file: name, line, what: `an element around OneLineSlot breaks the line ("${hit[1]}")` });
            }
          }
        }
      }
      if (
        ts.isJsxElement(node) &&
        attrText(node.openingElement.attributes, "data-testid", source) === '"feed-heading"' &&
        !node.getText(source).includes("<OneLineSlot")
      ) {
        const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
        findings.push({ file: name, line, what: "the feed heading draws its place without OneLineSlot" });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return findings;
}

describe("CF-ONE-LINE-1 — a sentence with one slot stays on one line; only the slot cuts (§5)", () => {
  it(
    "the tree",
    () => {
      const files = walkFiles(["src"], { ext: ["tsx"], skipTests: true }).map((name) => ({
        name: name.split("\\").join("/"),
        text: readFileSync(name, "utf8"),
      }));
      expect(files.some((f) => f.name === MECHANISM)).toBe(true);
      expect(report(oneLineFindings(files))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("OL-3: a planted wrap-anywhere heading around the slot fails", () => {
    const found = oneLineFindings([
      {
        name: "src/x.tsx",
        text: `const a = <h1 className="text-xl wrap-anywhere"><OneLineSlot sentence="In {p}" slot="{p}" text="Addis" /></h1>;`,
      },
    ]);
    expect(report(found)).toContain('breaks the line ("wrap-anywhere")');
  });

  it("OL-3b: the mechanism's own line breaking fails", () => {
    const found = oneLineFindings([
      { name: MECHANISM, text: `export const ONE_LINE_SLOT = "flex break-words";` },
    ]);
    expect(report(found)).toContain('the slot line breaks ("break-words")');
  });

  it("OL-3c: a feed heading without the slot fails", () => {
    const found = oneLineFindings([
      {
        name: "src/x.tsx",
        text: `const a = <h1 data-testid="feed-heading" className="text-xl">{label}</h1>;`,
      },
    ]);
    expect(report(found)).toContain("without OneLineSlot");
  });

  it("a clean slot heading passes", () => {
    const found = oneLineFindings([
      {
        name: "src/x.tsx",
        text: `const a = <h1 data-testid="feed-heading" className="min-w-0"><OneLineSlot sentence="In {p}" slot="{p}" text="Addis" /></h1>;`,
      },
    ]);
    expect(found).toEqual([]);
  });
});
