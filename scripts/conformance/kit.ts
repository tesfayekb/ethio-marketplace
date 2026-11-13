import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import ts from "typescript";

export const TREE_SCAN_MS = 30_000;
export function walkFiles(
  roots: string[],
  opts: { ext: string[]; skipTests?: boolean; skip?: RegExp },
): string[] {
  const files: string[] = [];
  const walk = (path: string) => {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const full = join(path, entry.name);
      if (["node_modules", "dist", ".git", ".output"].includes(entry.name) || opts.skip?.test(full))
        continue;
      if (entry.isDirectory()) walk(full);
      else if (
        opts.ext.includes(extname(full).slice(1)) &&
        !(opts.skipTests && /\.(?:test\.tsx?|spec\.ts)$/.test(full))
      )
        files.push(full);
    }
  };
  roots.forEach(walk);
  return files.sort();
}
export function codeOf(text: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  // One pass, left to right: a string literal is never a comment, and a `/*`
  // inside a `//` comment (e.g. the glob `e2e/*.spec.ts`) opens no block.
  return text.replace(
    /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g,
    (match) => (match.startsWith("//") || match.startsWith("/*") ? blank(match) : match),
  );
}
/** Walks every node of `file` (read from disk, or `text` when a census serves a planted file). */
export function visitTs(
  file: string,
  visit: (node: ts.Node, source: ts.SourceFile) => void,
  text?: string,
): void {
  const source = ts.createSourceFile(
    file,
    text ?? readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const walk = (node: ts.Node) => {
    visit(node, source);
    ts.forEachChild(node, walk);
  };
  walk(source);
}
/**
 * The type-checked program of `root`'s tsconfig.json files — or of one planted file served from
 * memory, resolved against the same options — for a census that follows a value through state,
 * props and imports (DEC-370's CF-HREF, the script-text census).
 */
export function typedProgram(root: string, planted?: { path: string; text: string }): ts.Program {
  const parsed = ts.getParsedCommandLineOfConfigFile(
    join(root, "tsconfig.json"),
    {},
    { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => undefined },
  );
  if (parsed === undefined) throw new Error(`${root}/tsconfig.json did not parse`);
  const options = { ...parsed.options, noEmit: true };
  if (planted === undefined) return ts.createProgram(parsed.fileNames, options);
  const host = ts.createCompilerHost(options);
  const full = join(root, planted.path);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, language, ...rest) =>
    name === full
      ? ts.createSourceFile(name, planted.text, language, true, ts.ScriptKind.TSX)
      : getSourceFile(name, language, ...rest);
  const fileExists = host.fileExists.bind(host);
  host.fileExists = (name) => name === full || fileExists(name);
  return ts.createProgram([full], options, host);
}

/** True when `node` is an entry of a `<property>: [...]` list (a route head's `links`, `scripts`),
 *  through spreads, conditionals and nested lists. */
export function entryOfList(node: ts.Node, property: string): boolean {
  let current: ts.Node = node.parent;
  if (!ts.isArrayLiteralExpression(current)) return false;
  while (
    ts.isArrayLiteralExpression(current) ||
    ts.isSpreadElement(current) ||
    ts.isConditionalExpression(current) ||
    ts.isParenthesizedExpression(current)
  ) {
    if (ts.isPropertyAssignment(current.parent)) return current.parent.name.getText() === property;
    current = current.parent;
  }
  return false;
}

export type Allowance = { key: string; reason: string; until: string; line: number };
export function readAllowlist(path: string, found: Iterable<string>): Map<string, Allowance> {
  const keys = new Set(found);
  const allowances = new Map<string, Allowance>();
  readFileSync(path, "utf8")
    .split(/\r?\n/)
    .forEach((text, index) => {
      if (!text.trim() || text.trim().startsWith("#")) return;
      const cells = text.split("|").map((cell) => cell.trim());
      const line = index + 1;
      const fail = (message: string): never => {
        throw new Error(`${path}:${line} ${message}: ${text}`);
      };
      if (cells.length !== 3 || cells.some((cell) => !cell)) fail("expected three non-empty cells");
      const [key, reason, until] = cells;
      if (/^\d{4}-\d{2}-\d{2}$/.test(until)) {
        const date = new Date(`${until}T00:00:00Z`);
        if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== until)
          fail("invalid until");
        if (until < new Date().toISOString().slice(0, 10)) fail("expired allowance");
      } else if (!/^(?:INC|DEC)-\d+$/.test(until)) fail("invalid until");
      if (allowances.has(key)) fail("duplicate key");
      if (!keys.has(key)) fail("stale allowance");
      allowances.set(key, { key, reason, until, line });
    });
  return allowances;
}
export function report(findings: Array<{ file: string; line: number; what: string }>): string {
  return findings
    .map(({ file, line, what }) => `${file}:${line} ${what}`)
    .sort()
    .join("\n");
}

/**
 * The in-place failure's forms, by file: each function component that renders LoadFailedHere
 * (src/components/shell/on-demand-notice.tsx) — MapFailedHere, say. Read by the on-demand
 * census (ODC-1: rendering a form imported from its file answers a failure through the
 * mechanism) and by the fallbacks census (CF-RLF-1: a fallback that renders one says so in place).
 */
export function failureFormsByFile(files: string[]): Map<string, Set<string>> {
  const byFile = new Map<string, Set<string>>();
  for (const file of files) {
    visitTs(file, (node) => {
      if (!ts.isFunctionDeclaration(node) || node.name === undefined) return;
      let renders = false;
      const visit = (child: ts.Node) => {
        if (
          (ts.isJsxSelfClosingElement(child) || ts.isJsxOpeningElement(child)) &&
          child.tagName.getText() === "LoadFailedHere"
        )
          renders = true;
        ts.forEachChild(child, visit);
      };
      ts.forEachChild(node, visit);
      if (!renders) return;
      const forms = byFile.get(file) ?? new Set<string>();
      forms.add(node.name.text);
      byFile.set(file, forms);
    });
  }
  return byFile;
}
