import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { posix } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { failureFormsByFile, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

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
 * declared in the same file. A fallback "says so in place" when it renders LoadFailedHere or a
 * component of src/ that renders it (MapFailedHere, src/features/posting/map/map-failed-here.tsx).
 * Foundations turn C1-2 (turn C1's stop 1) — and a piece fetched IN PLACE answers its own later
 * downloads in place too: the module an `inPlace` call fetches, and the modules of its own folder
 * it imports to any depth (Foundations turn C2, CF-RLF-3), never raise the shell's notice
 * (`reportOnDemandFailure`) — the still map's Leaflet raised it beside the large map's own word
 * (AP-55 at 360). No allowlist.
 */

type Finding = { file: string; line: number; what: string };

function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  return source.statements.find(
    (statement): statement is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(statement) && statement.name?.text === name,
  );
}

/** The components of the files that render LoadFailedHere: the in-place failure's forms. */
export function failureForms(files: string[]): Set<string> {
  const forms = new Set(["LoadFailedHere"]);
  for (const names of failureFormsByFile(files).values()) for (const name of names) forms.add(name);
  return forms;
}

/** The module an `import("…")` inside the fetch names — directly, or through a same-file loadOnce. */
function fetchedModule(source: ts.SourceFile, fetch: ts.Expression): string | null {
  let specifier: string | null = null;
  let viaOnce: string | null = null;
  const visit = (child: ts.Node) => {
    if (
      ts.isCallExpression(child) &&
      child.expression.kind === ts.SyntaxKind.ImportKeyword &&
      child.arguments[0] !== undefined &&
      ts.isStringLiteral(child.arguments[0])
    )
      specifier = child.arguments[0].text;
    if (
      ts.isPropertyAccessExpression(child) &&
      child.name.text === "load" &&
      ts.isIdentifier(child.expression)
    )
      viaOnce = child.expression.text;
    ts.forEachChild(child, visit);
  };
  visit(fetch);
  if (specifier !== null) return specifier;
  if (viaOnce === null) return null;
  const once = viaOnce;
  let found: string | null = null;
  const find = (child: ts.Node) => {
    if (
      ts.isVariableDeclaration(child) &&
      ts.isIdentifier(child.name) &&
      child.name.text === once &&
      child.initializer !== undefined
    )
      found = fetchedModule(source, child.initializer);
    ts.forEachChild(child, find);
  };
  find(source);
  return found;
}

/** The file a relative or "@/" specifier names from `file`, or null. */
function moduleFile(specifier: string, file: string): string | null {
  const base = specifier.startsWith("@/")
    ? `src/${specifier.slice(2)}`
    : specifier.startsWith(".")
      ? posix.normalize(posix.join(posix.dirname(file), specifier))
      : null;
  if (base === null) return null;
  return [`${base}.tsx`, `${base}.ts`].find((candidate) => existsSync(candidate)) ?? null;
}

/**
 * The module of an in-place piece that raises the shell's notice, or null (turn C1-2's MINOR-5,
 * Foundations turn C2). The fetched module is read, and every module it imports or re-exports from
 * its own folder, at any depth — a piece's own later downloads (the map's Leaflet and tile-plan
 * loaders) live beside it, and one level missed a loader the piece reaches through another of its
 * modules. Modules outside the piece's folder are not followed: they are shared plumbing (the
 * overlay facades, resilientLazy, the i18n provider), whose notice answers their own callers.
 */
function raisesNotice(fetched: string): string | null {
  const home = `${posix.dirname(fetched)}/`;
  const queue = [fetched];
  const seen = new Set<string>();
  for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
    if (seen.has(file)) continue;
    seen.add(file);
    let raises = false;
    const from = file;
    visitTs(from, (node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "reportOnDemandFailure"
      )
        raises = true;
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier !== undefined &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const next = moduleFile(node.moduleSpecifier.text, from);
        if (next !== null && next.startsWith(home)) queue.push(next);
      }
    });
    if (raises) return file;
  }
  return null;
}

function says(node: ts.Node, forms: Set<string>): { words: boolean; failedHere: boolean } {
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
      forms.has(child.tagName.getText())
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

export function fallbackFindings(
  files: string[],
  forms: Set<string> = failureForms(files),
): { calls: number; findings: Finding[] } {
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
      const [fetch, , fallback, options] = node.arguments;
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
      const { words, failedHere } = says(declared, forms);
      if (inPlaceOf(options)) {
        if (!failedHere)
          findings.push({
            file,
            line,
            what: `${fallback.text} is in place but draws no LoadFailedHere`,
          });
        const specifier = fetch === undefined ? null : fetchedModule(source, fetch);
        const fetched = specifier === null ? null : moduleFile(specifier, file);
        const raiser = fetched === null ? null : raisesNotice(fetched);
        if (fetched === null)
          findings.push({
            file,
            line,
            what: "an in-place fetch whose module the census cannot read",
          });
        else if (raiser !== null)
          findings.push({
            file,
            line,
            what: `${fetched} is fetched in place but raises the shell's notice${raiser === fetched ? "" : ` through ${raiser}`} (say so in place)`,
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

  it("CF-RLF-2 a planted file's mismatched fallbacks and its loud in-place module are named; its kept ones are not", () => {
    const dir = "node_modules/.cache/resilient-fallbacks";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.tsx`;
    try {
      writeFileSync(`${dir}/quiet.tsx`, "export function Quiet() { return null; }\n");
      writeFileSync(
        `${dir}/loud.tsx`,
        [
          "declare function reportOnDemandFailure(label: string, error: unknown): void;",
          'export function Loud() { reportOnDemandFailure("loud", null); return null; }',
          "",
        ].join("\n"),
      );
      writeFileSync(
        file,
        [
          "declare function resilientLazy(f: unknown, l: string, c: unknown, o?: unknown): unknown;",
          "declare function t(key: string): string;",
          "declare const LoadFailedHere: (p: { testid: string; refreshTestid: string }) => null;",
          "declare const load: () => Promise<never>;",
          'export const A = resilientLazy(load, "a", Holds);',
          'export const B = resilientLazy(() => import("./quiet"), "b", Says, { inPlace: true });',
          'export const C = resilientLazy(load, "c", LoadingWord);',
          'export const D = resilientLazy(() => import("./quiet"), "d", Holds, { inPlace: true });',
          'export const E = resilientLazy(load, "e", Says);',
          'export const F = resilientLazy(() => import("./loud"), "f", Wrapped, { inPlace: true });',
          "function Holds() { return <span>—</span>; }",
          'function Says() { return <LoadFailedHere testid="x" refreshTestid="y" />; }',
          'function LoadingWord() { return <p>{t("post.pin.title")}</p>; }',
          "function Wrapped() { return <Says />; }",
          "",
        ].join("\n"),
      );
      const { calls, findings } = fallbackFindings([file]);
      expect(calls).toBe(6);
      expect(report(findings)).toBe(
        [
          `${file}:10 ${dir}/loud.tsx is fetched in place but raises the shell's notice (say so in place)`,
          `${file}:7 LoadingWord reports to the shell's notice and also says words of its own`,
          `${file}:8 Holds is in place but draws no LoadFailedHere`,
          `${file}:9 Says reports to the shell's notice and also says words of its own (LoadFailedHere: use inPlace)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-RLF-3 an in-place piece's own modules are read at any depth within its folder; shared modules outside it are not (turn C1-2's MINOR-5)", () => {
    const root = "node_modules/.cache/resilient-fallbacks-3";
    const dir = `${root}/piece`;
    mkdirSync(`${dir}/deep`, { recursive: true });
    const file = `${dir}/planted.tsx`;
    const loud = "declare function reportOnDemandFailure(label: string, error: unknown): void;";
    try {
      writeFileSync(
        `${root}/shared.ts`,
        `${loud}\nexport function shared() { reportOnDemandFailure("shared", null); }\n`,
      );
      writeFileSync(
        `${dir}/deep/deeper.ts`,
        `${loud}\nexport function later() { reportOnDemandFailure("later", null); }\n`,
      );
      writeFileSync(`${dir}/deep/loader.ts`, 'export { later } from "./deeper";\n');
      writeFileSync(
        `${dir}/far.tsx`,
        'import { later } from "./deep/loader";\nexport function Far() { later(); return null; }\n',
      );
      writeFileSync(
        `${dir}/near.tsx`,
        'import { shared } from "../shared";\nexport function Near() { shared(); return null; }\n',
      );
      writeFileSync(
        file,
        [
          "declare function resilientLazy(f: unknown, l: string, c: unknown, o?: unknown): unknown;",
          "declare const LoadFailedHere: (p: { testid: string; refreshTestid: string }) => null;",
          'export const G = resilientLazy(() => import("./far"), "g", Says, { inPlace: true });',
          'export const H = resilientLazy(() => import("./near"), "h", Says, { inPlace: true });',
          'function Says() { return <LoadFailedHere testid="x" refreshTestid="y" />; }',
          "",
        ].join("\n"),
      );
      const { calls, findings } = fallbackFindings([file]);
      expect(calls).toBe(2);
      expect(report(findings)).toBe(
        `${file}:3 ${dir}/far.tsx is fetched in place but raises the shell's notice through ${dir}/deep/deeper.ts (say so in place)`,
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
