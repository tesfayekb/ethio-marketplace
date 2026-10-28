import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS } from "./kit";

/**
 * S431 (Foundations turn C3; G55 — a rule only the supervisor runs is a records debt) — A PLANTED
 * PROOF WRITES ONLY UNDER A SCRATCH DIRECTORY ITS TEST REMOVES. A census proves itself on a planted
 * tree; a tree planted under a path a brief's SCOPE names (src/, e2e/, scripts/) would be read by
 * every other census, or land in a commit.
 *
 * The census reads every scripts/conformance/*.test.ts. Each call that writes a file or a directory
 * (`writeFileSync`, `appendFileSync`, `copyFileSync`'s target, `mkdirSync`) has its path traced back
 * through the file — constants, `join`, template literals, a local helper's parameter to its callers,
 * a local function's return, an object's property — to where it starts: under the OS temp dir
 * (`tmpdir()`, `mkdtempSync`) or under `node_modules/.cache/` (from the root or `process.cwd()`).
 * A path that starts anywhere else, or cannot be traced, is a finding. And the write is removed: the
 * test that writes it calls `rmSync`, or the file removes its scratch in an `afterEach`/`afterAll`.
 * A recorded exception is a line in planted-proofs-allowlist.txt keyed `<file>:<line>`.
 */

type Finding = { file: string; line: number; what: string };
type Start = "temp" | "cache" | "cwd" | "elsewhere";

const WRITES = new Map<string, number>([
  ["writeFileSync", 0],
  ["appendFileSync", 0],
  ["mkdirSync", 0],
  ["copyFileSync", 1],
]);
const HOOKS = new Set(["afterEach", "afterAll"]);
const TESTS = new Set(["it", "test"]);
const CACHE = "node_modules/.cache/";

function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}

/** The test (`it`/`test`, `.each` included) or hook whose callback holds the node. */
function enclosingBlock(node: ts.Node): { kind: "test" | "hook"; body: ts.Node } | undefined {
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) {
    if (!ts.isCallExpression(up)) continue;
    let callee: ts.Expression = up.expression;
    while (ts.isCallExpression(callee) || ts.isPropertyAccessExpression(callee))
      callee = callee.expression;
    if (!ts.isIdentifier(callee)) continue;
    if (TESTS.has(callee.text)) return { kind: "test", body: up };
    if (HOOKS.has(callee.text)) return { kind: "hook", body: up };
  }
  return undefined;
}

function removes(node: ts.Node): boolean {
  let found = false;
  const visit = (child: ts.Node) => {
    if (ts.isCallExpression(child) && calleeName(child) === "rmSync") found = true;
    ts.forEachChild(child, visit);
  };
  visit(node);
  return found;
}

export function plantedProofFindings(files: string[]): Finding[] {
  const program = ts.createProgram(files, {
    noResolve: true,
    noLib: true,
    types: [],
    allowJs: false,
  });
  const checker = program.getTypeChecker();
  const findings: Finding[] = [];

  for (const file of files) {
    const source = program.getSourceFile(file);
    if (source === undefined) continue;
    const calls: ts.CallExpression[] = [];
    const assignments: ts.BinaryExpression[] = [];
    let hookRemoves = false;
    const collect = (node: ts.Node) => {
      if (ts.isCallExpression(node)) {
        calls.push(node);
        if (calleeName(node) === "rmSync" && enclosingBlock(node)?.kind === "hook")
          hookRemoves = true;
      }
      if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken)
        assignments.push(node);
      ts.forEachChild(node, collect);
    };
    collect(source);

    const symbolOf = (node: ts.Node) => checker.getSymbolAtLocation(node);
    const seen = new Set<ts.Node>();

    /** Where a path expression starts. */
    const starts = (expr: ts.Expression): Set<Start> => {
      const out = new Set<Start>();
      if (seen.has(expr)) return out;
      seen.add(expr);
      try {
        const add = (more: Set<Start>) => more.forEach((start) => out.add(start));
        if (ts.isParenthesizedExpression(expr) || ts.isAsExpression(expr))
          add(starts(expr.expression));
        else if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr))
          out.add(expr.text.startsWith(CACHE) ? "cache" : "elsewhere");
        else if (ts.isTemplateExpression(expr)) {
          if (expr.head.text !== "")
            out.add(expr.head.text.startsWith(CACHE) ? "cache" : "elsewhere");
          else add(starts(expr.templateSpans[0].expression));
        } else if (ts.isCallExpression(expr)) {
          const name = calleeName(expr);
          const [first, second] = expr.arguments;
          if (name === "tmpdir") out.add("temp");
          else if (name === "cwd") out.add("cwd");
          else if (name === "mkdtempSync" || name === "dirname") {
            if (first !== undefined) add(starts(first));
          } else if (name === "join" || name === "resolve") {
            // `join(__dirname, "..", "..")` from scripts/conformance/ is the repository's root.
            const args = expr.arguments;
            let next = 1;
            let base: Set<Start>;
            if (first !== undefined && ts.isIdentifier(first) && first.text === "__dirname") {
              while (args[next] !== undefined && args[next].getText(source).slice(1, -1) === "..")
                next += 1;
              base = new Set([next === 3 ? "cwd" : "elsewhere"]);
            } else base = first === undefined ? new Set(["elsewhere"]) : starts(first);
            for (const start of base)
              if (start === "cwd" && args[next] !== undefined) add(starts(args[next]));
              else out.add(start);
          } else add(returnsOf(expr));
        } else if (ts.isIdentifier(expr)) add(valueOf(expr));
        else if (ts.isPropertyAccessExpression(expr))
          add(propertyOf(expr.expression, expr.name.text));
        else out.add("elsewhere");
      } finally {
        seen.delete(expr);
      }
      return out;
    };

    /** A local function's returns, for a call of it. */
    const returnsOf = (call: ts.CallExpression): Set<Start> => {
      const out = new Set<Start>();
      for (const fn of functionsOf(call.expression))
        for (const value of returnValues(fn)) starts(value).forEach((start) => out.add(start));
      if (out.size === 0) out.add("elsewhere");
      return out;
    };

    const functionsOf = (callee: ts.Expression): ts.SignatureDeclaration[] => {
      const declarations = symbolOf(callee)?.declarations ?? [];
      const fns: ts.SignatureDeclaration[] = [];
      for (const declaration of declarations) {
        if (ts.isFunctionDeclaration(declaration)) fns.push(declaration);
        else if (
          ts.isVariableDeclaration(declaration) &&
          declaration.initializer !== undefined &&
          (ts.isArrowFunction(declaration.initializer) ||
            ts.isFunctionExpression(declaration.initializer))
        )
          fns.push(declaration.initializer);
      }
      return fns;
    };

    const returnValues = (fn: ts.SignatureDeclaration): ts.Expression[] => {
      const values: ts.Expression[] = [];
      if (ts.isArrowFunction(fn) && !ts.isBlock(fn.body)) return [fn.body];
      const visit = (node: ts.Node) => {
        if (node !== fn && ts.isFunctionLike(node)) return;
        if (ts.isReturnStatement(node) && node.expression !== undefined)
          values.push(node.expression);
        ts.forEachChild(node, visit);
      };
      ts.forEachChild(fn, visit);
      return values;
    };

    /** Every value a name can hold: its initialiser, its assignments, a parameter's arguments. */
    const valueOf = (name: ts.Identifier, given?: ts.Symbol): Set<Start> => {
      const out = new Set<Start>();
      const symbol = given ?? symbolOf(name);
      const add = (more: Set<Start>) => more.forEach((start) => out.add(start));
      for (const declaration of symbol?.declarations ?? []) {
        if (ts.isVariableDeclaration(declaration)) {
          // A `let` with no value yet, or "" until a hook assigns it, holds what it is assigned.
          const value = declaration.initializer;
          if (value !== undefined && !(ts.isStringLiteral(value) && value.text === ""))
            add(starts(value));
        } else if (ts.isBindingElement(declaration)) {
          const pattern = declaration.parent;
          const holder = pattern.parent;
          const key = (declaration.propertyName ?? declaration.name).getText(source);
          if (ts.isVariableDeclaration(holder) && holder.initializer !== undefined)
            add(propertyOf(holder.initializer, key));
          else out.add("elsewhere");
        } else if (ts.isParameter(declaration)) add(argumentsOf(declaration));
        else out.add("elsewhere");
      }
      for (const assignment of assignments)
        if (ts.isIdentifier(assignment.left) && symbolOf(assignment.left) === symbol)
          add(starts(assignment.right));
      if (out.size === 0) out.add("elsewhere");
      return out;
    };

    /** A local helper's parameter: the arguments its callers in the file pass. */
    const argumentsOf = (parameter: ts.ParameterDeclaration): Set<Start> => {
      const out = new Set<Start>();
      const fn = parameter.parent;
      const index = fn.parameters.indexOf(parameter);
      let name: ts.Node | undefined;
      if (ts.isFunctionDeclaration(fn)) name = fn.name;
      else if (ts.isVariableDeclaration(fn.parent)) name = fn.parent.name;
      const symbol = name === undefined ? undefined : symbolOf(name);
      if (symbol !== undefined)
        for (const call of calls)
          if (symbolOf(call.expression) === symbol) {
            const argument = call.arguments[index];
            if (argument !== undefined) starts(argument).forEach((start) => out.add(start));
          }
      if (out.size === 0) out.add("elsewhere");
      return out;
    };

    /** A property of an object a name or a local function's call holds. */
    const propertyOf = (holder: ts.Expression, key: string): Set<Start> => {
      const out = new Set<Start>();
      const objects: ts.Expression[] = [];
      const gather = (expr: ts.Expression) => {
        if (ts.isObjectLiteralExpression(expr)) objects.push(expr);
        else if (ts.isIdentifier(expr))
          for (const declaration of symbolOf(expr)?.declarations ?? []) {
            if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined)
              gather(declaration.initializer);
          }
        else if (ts.isCallExpression(expr))
          for (const fn of functionsOf(expr.expression)) returnValues(fn).forEach(gather);
      };
      gather(holder);
      for (const object of objects)
        for (const property of (object as ts.ObjectLiteralExpression).properties) {
          if (property.name?.getText(source) !== key) continue;
          if (ts.isPropertyAssignment(property))
            starts(property.initializer).forEach((start) => out.add(start));
          else if (ts.isShorthandPropertyAssignment(property))
            valueOf(property.name, checker.getShorthandAssignmentValueSymbol(property)).forEach(
              (start) => out.add(start),
            );
        }
      if (out.size === 0) out.add("elsewhere");
      return out;
    };

    for (const call of calls) {
      const index = WRITES.get(calleeName(call) ?? "");
      if (index === undefined) continue;
      const target = call.arguments[index];
      if (target === undefined) continue;
      const line = source.getLineAndCharacterOfPosition(call.getStart(source)).line + 1;
      const where = starts(target);
      if (where.has("elsewhere") || where.has("cwd") || where.size === 0)
        findings.push({
          file,
          line,
          what: `writes where it cannot be shown to start under the OS temp dir or ${CACHE}`,
        });
      const block = enclosingBlock(call);
      if (!(block?.kind === "test" && removes(block.body)) && !hookRemoves)
        findings.push({
          file,
          line,
          what: "writes a planted file its test does not remove (no rmSync in the test or an afterEach/afterAll)",
        });
    }
  }
  return findings;
}

const ALLOWLIST = "scripts/conformance/planted-proofs-allowlist.txt";
const files = readdirSync("scripts/conformance")
  .filter((name) => name.endsWith(".test.ts"))
  .map((name) => `scripts/conformance/${name}`)
  .sort();

describe("a planted proof writes only under a scratch directory its test removes (S431)", () => {
  it(
    "PPF-1 every write in scripts/conformance/*.test.ts starts under the OS temp dir or node_modules/.cache/ and is removed",
    () => {
      const findings = plantedProofFindings(files);
      const allowances = readAllowlist(
        ALLOWLIST,
        findings.map((hit) => `${hit.file}:${hit.line}`),
      );
      console.log(
        `[PPF-1] test files read: ${files.length}; findings: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(files.length).toBeGreaterThan(20);
      expect(report(findings.filter((hit) => !allowances.has(`${hit.file}:${hit.line}`)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("PPF-2 planted: a write under src/ or the root, an untraced path and a write left behind fail; temp and cache writes removed pass", () => {
    const dir = "node_modules/.cache/planted-proofs";
    mkdirSync(dir, { recursive: true });
    const bad = join(dir, "bad.test.ts");
    const good = join(dir, "good.test.ts");
    try {
      writeFileSync(
        bad,
        [
          'import { mkdirSync, rmSync, writeFileSync } from "node:fs";',
          'import { join } from "node:path";',
          "const ROOT = process.cwd();",
          'it("ZZ-1", () => {',
          '  writeFileSync("src/planted.ts", "x");',
          '  mkdirSync(join(ROOT, "e2e/planted"), { recursive: true });',
          '  rmSync("src/planted.ts");',
          "});",
          "export function away(path: string) {",
          '  writeFileSync(path, "x");',
          "}",
          'it("ZZ-2", () => {',
          '  writeFileSync("node_modules/.cache/kept/x.ts", "x");',
          "});",
          "",
        ].join("\n"),
      );
      writeFileSync(
        good,
        [
          'import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";',
          'import { tmpdir } from "node:os";',
          'import { join } from "node:path";',
          "const roots: string[] = [];",
          "function root() {",
          '  const path = mkdtempSync(join(tmpdir(), "zz-"));',
          "  roots.push(path);",
          "  return path;",
          "}",
          "afterEach(() => roots.splice(0).forEach((path) => rmSync(path, { recursive: true })));",
          "function put(base: string, name: string) {",
          '  writeFileSync(join(base, name), "x");',
          "}",
          'it("ZZ-3", () => {',
          '  put(root(), "a.ts");',
          "  const files = { a: `${root()}/b.ts` };",
          '  writeFileSync(files.a, "x");',
          "});",
          'it("ZZ-4", () => {',
          '  const dir = join(process.cwd(), "node_modules/.cache/zz");',
          "  mkdirSync(`${dir}/deep`, { recursive: true });",
          "  try {",
          '    writeFileSync(join(dir, "deep/c.ts"), "x");',
          "  } finally {",
          "    rmSync(dir, { recursive: true, force: true });",
          "  }",
          "});",
          "",
        ].join("\n"),
      );
      const where = `writes where it cannot be shown to start under the OS temp dir or ${CACHE}`;
      const kept =
        "writes a planted file its test does not remove (no rmSync in the test or an afterEach/afterAll)";
      expect(report(plantedProofFindings([bad, good]))).toBe(
        [
          `${bad}:10 ${kept}`,
          `${bad}:10 ${where}`,
          `${bad}:13 ${kept}`,
          `${bad}:5 ${where}`,
          `${bad}:6 ${where}`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
