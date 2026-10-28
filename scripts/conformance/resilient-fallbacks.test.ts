import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-956 (Foundations turn C1) — A PIECE THAT CANNOT DOWNLOAD SAYS SO ONCE, IN THE RIGHT PLACE,
 * NEVER WITH ITS LOADING WORD. `resilientLazy(fetch, label, fallback, { inPlace })`
 * (src/lib/resilient-lazy.ts) answers a failed download in one of two ways, and the fallback
 * must match the way:
 *   - `inPlace: true` — the fallback itself says so: it renders LoadFailedHere (the failure and
 *     its one cure, Refresh), and the shell's notice is not also shown;
 *   - otherwise — the shell's one notice says so, and the fallback only holds the piece's place:
 *     it shows no words of its own (no `t(…)` — a word there is a loading word or a second,
 *     different message) and no LoadFailedHere.
 * The ad page's maps showed the loading word "Map pin" as their failure (the operator's walk of
 * 2026-10-27). The census reads every resilientLazy call under src/ whose fallback is a function
 * declared in the same file. No allowlist.
 */

type Finding = { file: string; line: number; what: string };

function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  return source.statements.find(
    (statement): statement is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(statement) && statement.name?.text === name,
  );
}

function says(node: ts.Node): { words: boolean; failedHere: boolean } {
  let words = false;
  let failedHere = false;
  const visit = (child: ts.Node) => {
    if (
      ts.isCallExpression(child) &&
      ts.isIdentifier(child.expression) &&
      child.expression.text === "t"
    )
      words = true;
    if (
      (ts.isJsxSelfClosingElement(child) || ts.isJsxOpeningElement(child)) &&
      child.tagName.getText() === "LoadFailedHere"
    )
      failedHere = true;
    ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return { words, failedHere };
}

function inPlaceOf(options: ts.Expression | undefined): boolean {
  return (
    options !== undefined &&
    ts.isObjectLiteralExpression(options) &&
    options.properties.some(
      (property) =>
        ts.isPropertyAssignment(property) &&
        property.name.getText() === "inPlace" &&
        property.initializer.kind === ts.SyntaxKind.TrueKeyword,
    )
  );
}

export function fallbackFindings(files: string[]): { calls: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let calls = 0;
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== "resilientLazy"
      )
        return;
      const [, , fallback, options] = node.arguments;
      if (fallback === undefined || !ts.isIdentifier(fallback)) return;
      calls += 1;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      const declared = functionNamed(source, fallback.text);
      if (declared === undefined) {
        findings.push({
          file,
          line,
          what: `${fallback.text}: not a function declared in this file`,
        });
        return;
      }
      const { words, failedHere } = says(declared);
      if (inPlaceOf(options)) {
        if (!failedHere)
          findings.push({
            file,
            line,
            what: `${fallback.text} is in place but draws no LoadFailedHere`,
          });
      } else if (words || failedHere)
        findings.push({
          file,
          line,
          what: `${fallback.text} reports to the shell's notice and also says words of its own${failedHere ? " (LoadFailedHere: use inPlace)" : ""}`,
        });
    });
  }
  return { calls, findings };
}

const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((file) =>
  file.split("\\").join("/"),
);

describe("a piece that cannot download says so once, in the right place (INC-956)", () => {
  it(
    "CF-RLF-1 every resilientLazy fallback matches its way of saying so",
    () => {
      const { calls, findings } = fallbackFindings(files);
      expect(calls).toBeGreaterThanOrEqual(10);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-RLF-2 a planted file's three mismatched fallbacks are named; its two kept ones are not", () => {
    const dir = "node_modules/.cache/resilient-fallbacks";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.tsx`;
    try {
      writeFileSync(
        file,
        [
          "declare function resilientLazy(f: unknown, l: string, c: unknown, o?: unknown): unknown;",
          "declare function t(key: string): string;",
          "declare const LoadFailedHere: (p: { testid: string; refreshTestid: string }) => null;",
          "declare const load: () => Promise<never>;",
          'export const A = resilientLazy(load, "a", Holds);',
          'export const B = resilientLazy(load, "b", Says, { inPlace: true });',
          'export const C = resilientLazy(load, "c", LoadingWord);',
          'export const D = resilientLazy(load, "d", Holds, { inPlace: true });',
          'export const E = resilientLazy(load, "e", Says);',
          "function Holds() { return <span>—</span>; }",
          'function Says() { return <LoadFailedHere testid="x" refreshTestid="y" />; }',
          'function LoadingWord() { return <p>{t("post.pin.title")}</p>; }',
          "",
        ].join("\n"),
      );
      const { calls, findings } = fallbackFindings([file]);
      expect(calls).toBe(5);
      expect(report(findings)).toBe(
        [
          `${file}:7 LoadingWord reports to the shell's notice and also says words of its own`,
          `${file}:8 Holds is in place but draws no LoadFailedHere`,
          `${file}:9 Says reports to the shell's notice and also says words of its own (LoadFailedHere: use inPlace)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
