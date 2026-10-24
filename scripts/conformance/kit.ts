import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import ts from "typescript";

export const TREE_SCAN_MS = 30_000;
export function walkFiles(roots: string[], opts: { ext: string[]; skipTests?: boolean; skip?: RegExp }): string[] {
  const files: string[] = [];
  const walk = (path: string) => {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const full = join(path, entry.name);
      if (["node_modules", "dist", ".git", ".output"].includes(entry.name) || opts.skip?.test(full)) continue;
      if (entry.isDirectory()) walk(full);
      else if (opts.ext.includes(extname(full).slice(1)) && !(opts.skipTests && /\.(?:test\.tsx?|spec\.ts)$/.test(full))) files.push(full);
    }
  };
  roots.forEach(walk);
  return files.sort();
}
export function codeOf(text: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  return text.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/(^|[^:"'`\\])(\/\/.*)$/gm, (_m, lead: string, rest: string) => lead + blank(rest));
}
export function visitTs(file: string, visit: (node: ts.Node, source: ts.SourceFile) => void): void {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const walk = (node: ts.Node) => { visit(node, source); ts.forEachChild(node, walk); };
  walk(source);
}
export type Allowance = { key: string; reason: string; until: string; line: number };
export function readAllowlist(path: string, found: Iterable<string>): Map<string, Allowance> {
  const keys = new Set(found);
  const allowances = new Map<string, Allowance>();
  readFileSync(path, "utf8").split(/\r?\n/).forEach((text, index) => {
    if (!text.trim() || text.trim().startsWith("#")) return;
    const cells = text.split("|").map((cell) => cell.trim());
    const line = index + 1;
    const fail = (message: string): never => { throw new Error(`${path}:${line} ${message}: ${text}`); };
    if (cells.length !== 3 || cells.some((cell) => !cell)) fail("expected three non-empty cells");
    const [key, reason, until] = cells;
    if (/^\d{4}-\d{2}-\d{2}$/.test(until)) {
      const date = new Date(`${until}T00:00:00Z`);
      if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== until) fail("invalid until");
      if (until < new Date().toISOString().slice(0,10)) fail("expired allowance");
    } else if (!/^(?:INC|DEC)-\d+$/.test(until)) fail("invalid until");
    if (allowances.has(key)) fail("duplicate key");
    if (!keys.has(key)) fail("stale allowance");
    allowances.set(key, { key, reason, until, line });
  });
  return allowances;
}
export function report(findings: Array<{ file: string; line: number; what: string }>): string {
  return findings.map(({ file, line, what }) => `${file}:${line} ${what}`).sort().join("\n");
}
