import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import ts from "typescript";
import { expect, it } from "vitest";

/** D135 / G29: a card lifts by its shadow, never a plain one-pixel border. */
function plainCardBorder(value: string): boolean {
  const classes = value.split(/\s+/).map((part) => part.replace(/^(?:md:|lg:|xl:)/, ""));
  return (
    classes.includes("bg-card") &&
    classes.some((part) => part.startsWith("rounded-")) &&
    classes.includes("border") &&
    classes.includes("border-border") &&
    !classes.includes("border-dashed")
  );
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) return path === resolve("src/components/ui") ? [] : sourceFiles(path);
    return entry.name.endsWith(".tsx") && !entry.name.endsWith(".test.tsx") ? [path] : [];
  });
}

it("LL-1 cards never carry a plain border", () => {
  const findings: string[] = [];
  for (const path of sourceFiles(resolve("src"))) {
    const source = ts.createSourceFile(
      path,
      readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node: ts.Node) {
      if (
        ts.isStringLiteral(node) ||
        ts.isNoSubstitutionTemplateLiteral(node) ||
        ts.isTemplateExpression(node)
      ) {
        const value = ts.isTemplateExpression(node)
          ? [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" ")
          : node.text;
        if (plainCardBorder(value)) {
          const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
          findings.push(`${relative(process.cwd(), path)}:${line + 1}`);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  expect(
    findings,
    `${findings.length} sites in ${new Set(findings.map((site) => site.split(":")[0])).size} files\n${findings.join("\n")}`,
  ).toEqual([]);
});

it("LL-2 the look-law matcher distinguishes surfaces and state borders", () => {
  expect(plainCardBorder("rounded-lg border border-border bg-card p-4")).toBe(true);
  expect(plainCardBorder("md:rounded-lg md:border md:border-border md:bg-card")).toBe(true);
  expect(plainCardBorder("rounded-card bg-card shadow-card")).toBe(false);
  expect(plainCardBorder("rounded-card border-2 border-gold bg-gold/15")).toBe(false);
  expect(plainCardBorder("mt-4 rounded-card border border-dashed border-border bg-card p-6")).toBe(
    false,
  );
});
