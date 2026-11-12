import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { entryOfList, report, TREE_SCAN_MS, typedProgram } from "./kit";

/**
 * Housekeeping turn 4 (concern 2; alerts #434–#436) — a value in inline script or style text is
 * embedded by the one builder, scriptLiteral (src/lib/script-literal.ts). The census reads, under
 * src/ (tests aside), every text that becomes script or style: a `children` of a `scripts: [...]`
 * entry in a route's head(), the `__html` of `dangerouslySetInnerHTML`, the expression children
 * of a `<script>` or `<style>` element, and an interpolation inside an open `<script>` or `<style>`
 * of a template string. Each is a literal, a template whose every interpolation is a
 * `scriptLiteral(…)` call, a `scriptLiteral(…)` call, or a name or a function whose value (or every
 * return) is one of those — followed by the type checker across files. Anything else — a
 * `JSON.stringify(…)`, a raw interpolation — is a finding. No allowlist.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const BUILDER = "scriptLiteral";

type Finding = { file: string; line: number; what: string };

function relPath(file: string): string {
  return relative(ROOT, file).split("\\").join("/");
}

function isBuilderCall(node: ts.Node): boolean {
  return (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === BUILDER
  );
}

/** The declaration a name or a callee stands for, through imports. */
function declarationOf(node: ts.Node, checker: ts.TypeChecker): ts.Declaration | undefined {
  let symbol = checker.getSymbolAtLocation(node);
  if (symbol !== undefined && symbol.flags & ts.SymbolFlags.Alias)
    symbol = checker.getAliasedSymbol(symbol);
  return symbol?.declarations?.[0];
}

/** Why the text `node` builds is not safe script text, or null when it is. */
function unsafe(node: ts.Expression, checker: ts.TypeChecker, depth = 0): string | null {
  if (depth > 6) return "a value the census cannot follow";
  while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) node = node.expression;
  if (ts.isStringLiteralLike(node)) return null;
  if (isBuilderCall(node)) return null;
  if (ts.isTemplateExpression(node)) {
    const raw = node.templateSpans.find((span) => !isBuilderCall(span.expression));
    return raw === undefined ? null : `the interpolation \${${raw.expression.getText()}}`;
  }
  if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
    const declaration = declarationOf(node, checker);
    if (declaration !== undefined && ts.isVariableDeclaration(declaration)) {
      return declaration.initializer === undefined
        ? `${node.getText()}, declared without a value`
        : unsafe(declaration.initializer, checker, depth + 1);
    }
    return `${node.getText()}, not a constant the census can read`;
  }
  if (ts.isCallExpression(node)) {
    const declaration = declarationOf(node.expression, checker);
    const body =
      declaration !== undefined && ts.isFunctionDeclaration(declaration)
        ? declaration.body
        : undefined;
    if (body === undefined) return `the call ${node.expression.getText()}(…)`;
    const returns: ts.Expression[] = [];
    const collect = (child: ts.Node) => {
      if (ts.isFunctionLike(child)) return;
      if (ts.isReturnStatement(child) && child.expression !== undefined)
        returns.push(child.expression);
      ts.forEachChild(child, collect);
    };
    ts.forEachChild(body, collect);
    if (returns.length === 0)
      return `the call ${node.expression.getText()}(…), which returns nothing`;
    for (const value of returns) {
      const why = unsafe(value, checker, depth + 1);
      if (why !== null) return why;
    }
    return null;
  }
  return `the expression ${node.getText().slice(0, 60)}`;
}

/** The interpolations of a template string that sit inside an open <script> or <style>. */
function spansInsideScript(node: ts.TemplateExpression): ts.TemplateSpan[] {
  const inside: ts.TemplateSpan[] = [];
  let text = node.head.text;
  for (const span of node.templateSpans) {
    const lastOpen = [...text.matchAll(/<(script|style)\b/gi)].pop()?.index ?? -1;
    const lastClose = [...text.matchAll(/<\/(script|style)\b/gi)].pop()?.index ?? -1;
    if (lastOpen > lastClose) inside.push(span);
    text += "\u0000" + span.literal.text;
  }
  return inside;
}

export function census(program: ts.Program): { sinks: number; findings: Finding[] } {
  const checker = program.getTypeChecker();
  const findings: Finding[] = [];
  let sinks = 0;
  for (const source of program.getSourceFiles()) {
    const file = relPath(source.fileName);
    if (
      !file.startsWith("src/") ||
      /\.test\.tsx?$/.test(file) ||
      file === "src/routeTree.gen.ts" ||
      file.startsWith("src/integrations/supabase/")
    )
      continue;
    const judge = (sink: string, value: ts.Expression) => {
      sinks += 1;
      const why = unsafe(value, checker);
      if (why === null) return;
      findings.push({
        file,
        line: source.getLineAndCharacterOfPosition(value.getStart(source)).line + 1,
        what: `${sink}: ${why} is not built by ${BUILDER} (src/lib/script-literal.ts)`,
      });
    };
    const visit = (node: ts.Node) => {
      if (ts.isObjectLiteralExpression(node) && entryOfList(node, "scripts")) {
        for (const property of node.properties)
          if (ts.isPropertyAssignment(property) && property.name.getText(source) === "children")
            judge("a head script", property.initializer);
      } else if (
        ts.isJsxAttribute(node) &&
        node.name.getText(source) === "dangerouslySetInnerHTML" &&
        node.initializer !== undefined &&
        ts.isJsxExpression(node.initializer) &&
        node.initializer.expression !== undefined &&
        ts.isObjectLiteralExpression(node.initializer.expression)
      ) {
        for (const property of node.initializer.expression.properties)
          if (ts.isPropertyAssignment(property) && property.name.getText(source) === "__html")
            judge("dangerouslySetInnerHTML", property.initializer);
      } else if (
        ts.isJsxElement(node) &&
        /^(script|style)$/.test(node.openingElement.tagName.getText(source))
      ) {
        for (const child of node.children)
          if (ts.isJsxExpression(child) && child.expression !== undefined)
            judge(`<${node.openingElement.tagName.getText(source)}>`, child.expression);
      } else if (ts.isTemplateExpression(node)) {
        for (const span of spansInsideScript(node)) {
          if (isBuilderCall(span.expression)) {
            sinks += 1;
            continue;
          }
          judge("script text in a string", span.expression);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return { sinks, findings };
}

/** The four sinks at housekeeping turn 4 (the theme script, the ad's structured data, the rail
 *  script, the spinner's style): a census that reads fewer has lost its definition. */
const SINK_FLOOR = 4;

const PLANTED = [
  'import { scriptLiteral } from "@/lib/script-literal";',
  "const name = String(Date.now());",
  "const RAW = `var n=${JSON.stringify(name)};`;",
  "const SAFE = `var n=${scriptLiteral(name)};`;",
  "function css(color: string) {",
  "  return `.x{color:${color}}`;",
  "}",
  "export const head = { scripts: [{ children: RAW }, { children: SAFE }] };",
  "export const page = `<p>${name}</p><script>var n=${name};</script>`;",
  "export function Planted() {",
  "  return (",
  "    <>",
  "      <script dangerouslySetInnerHTML={{ __html: `var n=${name};` }} />",
  "      <style>{css(name)}</style>",
  '      <style>{".y{color:red}"}</style>',
  "    </>",
  "  );",
  "}",
  "",
].join("\n");

describe("a value in inline script text is embedded by scriptLiteral", () => {
  it(
    "CF-SCRIPT-3 every head script, dangerouslySetInnerHTML, <script>/<style> child and script region of a string under src/ is built by scriptLiteral or is a literal",
    () => {
      const tree = census(typedProgram(ROOT));
      expect(tree.sinks).toBeGreaterThanOrEqual(SINK_FLOOR);
      expect(report(tree.findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-SCRIPT-4 a planted JSON.stringify, raw interpolation and unbuilt style are each found; the builder's forms are not",
    () => {
      const planted = census(
        typedProgram(ROOT, { path: "src/features/planted-script-text.tsx", text: PLANTED }),
      );
      expect(planted.findings.map((f) => `${f.line} ${f.what.split(" is not built")[0]}`)).toEqual([
        "8 a head script: the interpolation ${JSON.stringify(name)}",
        "9 script text in a string: the call String(…)",
        "13 dangerouslySetInnerHTML: the interpolation ${name}",
        "14 <style>: the interpolation ${color}",
      ]);
      expect(planted.sinks).toBe(6);
    },
    TREE_SCAN_MS,
  );
});
