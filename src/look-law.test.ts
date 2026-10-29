import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import ts from "typescript";
import { expect, it } from "vitest";
import { visitTs, walkFiles } from "../scripts/conformance/kit";

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

it("LL-1 cards never carry a plain border", () => {
  const findings: string[] = [];
  for (const path of walkFiles([resolve("src")], {
    ext: ["tsx"],
    skipTests: true,
    skip: /[\\/]src[\\/]components[\\/]ui$/,
  })) {
    // INC-998 — the scan reads only what it needs: a file without both class names cannot
    // carry a plain card border, so it is never parsed (parsing every .tsx outgrew 5 s under load).
    const text = readFileSync(path, "utf8");
    if (!text.includes("bg-card") || !text.includes("border-border")) continue;
    visitTs(path, (node, source) => {
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
    });
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
