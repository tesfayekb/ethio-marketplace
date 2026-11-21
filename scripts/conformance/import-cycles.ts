/**
 * CF-CYCLE (the tests and CI turn 2, INC-1193) — THE IMPORT CYCLE CENSUS over `src/i18n/` and its
 * importers. A module that reads another's binding at its top level (`provider.tsx`'s
 * `enBase as …`) throws "Cannot access … before initialization" when the two sit on one import
 * cycle and the other has not finished evaluating; a dev server's module runner shows it where a
 * production bundle may not. The census builds `src/`'s runtime import graph from TypeScript's
 * parser — static `import` and `export … from`, type-only forms dropped (an `import type`, or a
 * clause whose every name is `type`), `@/` read as `src/` — finds its strongly connected
 * components (Tarjan), and refuses every one holding a module of `src/i18n/` or a module that
 * imports one, naming its shortest cycle by `file:line`. A dynamic `import()` evaluates after its
 * importer, so it is no edge here. An import used only as a type without the `type` word stays an
 * edge: the census is stricter than the bundler, never looser.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import ts from "typescript";
import { visitTs } from "./kit";

export type Edge = { to: string; line: number };
export type Graph = Map<string, Edge[]>;

function isTypeOnlyImport(node: ts.ImportDeclaration): boolean {
  const clause = node.importClause;
  if (clause === undefined) return false;
  if (clause.isTypeOnly) return true;
  const named = clause.namedBindings;
  return (
    clause.name === undefined &&
    named !== undefined &&
    ts.isNamedImports(named) &&
    named.elements.length > 0 &&
    named.elements.every((element) => element.isTypeOnly)
  );
}

function isTypeOnlyExport(node: ts.ExportDeclaration): boolean {
  if (node.isTypeOnly) return true;
  const named = node.exportClause;
  return (
    named !== undefined &&
    ts.isNamedExports(named) &&
    named.elements.length > 0 &&
    named.elements.every((element) => element.isTypeOnly)
  );
}

/** The file a specifier names under `src/`, or null for a package or a file that does not exist. */
export function resolveImport(root: string, from: string, spec: string): string | null {
  const bare = spec.replace(/\?.*$/, "");
  let base: string;
  if (bare.startsWith("@/")) base = join(root, "src", bare.slice(2));
  else if (bare.startsWith(".")) base = join(dirname(from), bare);
  else return null;
  for (const candidate of [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
  ])
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  return null;
}

/** One file's runtime imports: each resolved target and the line that imports it. */
export function edgesOf(root: string, file: string, text = readFileSync(file, "utf8")): Edge[] {
  const edges: Edge[] = [];
  visitTs(
    file,
    (statement, source) => {
      if (statement.parent !== source) return;
      let spec: string | undefined;
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        !isTypeOnlyImport(statement)
      )
        spec = statement.moduleSpecifier.text;
      else if (
        ts.isExportDeclaration(statement) &&
        statement.moduleSpecifier !== undefined &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        !isTypeOnlyExport(statement)
      )
        spec = statement.moduleSpecifier.text;
      if (spec === undefined) return;
      const to = resolveImport(root, file, spec);
      if (to === null) return;
      edges.push({
        to,
        line: source.getLineAndCharacterOfPosition(statement.getStart(source)).line + 1,
      });
    },
    text,
  );
  return edges;
}

/** Tarjan's strongly connected components with more than one file, or one file importing itself. */
export function cycleComponents(graph: Graph): string[][] {
  let next = 0;
  const index = new Map<string, number>();
  const low = new Map<string, number>();
  const stack: string[] = [];
  const onStack = new Set<string>();
  const found: string[][] = [];
  const visit = (file: string) => {
    index.set(file, next);
    low.set(file, next);
    next += 1;
    stack.push(file);
    onStack.add(file);
    for (const { to } of graph.get(file) ?? []) {
      if (!graph.has(to)) continue;
      if (!index.has(to)) {
        visit(to);
        low.set(file, Math.min(low.get(file) ?? 0, low.get(to) ?? 0));
      } else if (onStack.has(to)) {
        low.set(file, Math.min(low.get(file) ?? 0, index.get(to) ?? 0));
      }
    }
    if (low.get(file) !== index.get(file)) return;
    const component: string[] = [];
    for (;;) {
      const top = stack.pop();
      if (top === undefined) break;
      onStack.delete(top);
      component.push(top);
      if (top === file) break;
    }
    const selfLoop = (graph.get(file) ?? []).some((edge) => edge.to === file);
    if (component.length > 1 || selfLoop) found.push(component.sort());
  };
  for (const file of [...graph.keys()].sort()) if (!index.has(file)) visit(file);
  return found;
}

/** The shortest cycle through `start` inside its component, as `file:line → …` hops. */
export function shortestCycle(graph: Graph, component: string[], start: string): Edge[] {
  const inside = new Set(component);
  const back = new Map<string, { from: string; edge: Edge }>();
  const queue = [start];
  for (let at = 0; at < queue.length; at += 1) {
    const file = queue[at];
    if (file === undefined) break;
    for (const edge of graph.get(file) ?? []) {
      if (!inside.has(edge.to)) continue;
      if (edge.to === start) {
        const path: Edge[] = [edge];
        let cursor = file;
        while (cursor !== start) {
          const step = back.get(cursor);
          if (step === undefined) break;
          path.unshift(step.edge);
          cursor = step.from;
        }
        return path;
      }
      if (back.has(edge.to) || edge.to === start) continue;
      back.set(edge.to, { from: file, edge });
      queue.push(edge.to);
    }
  }
  return [];
}

/** `src/`'s runtime import graph, from the given files (planted texts served by `texts`). */
export function importGraph(root: string, files: string[], texts?: Map<string, string>): Graph {
  const graph: Graph = new Map();
  for (const file of files) graph.set(file, edgesOf(root, file, texts?.get(file)));
  return graph;
}

export type CycleFinding = { key: string; what: string };

/**
 * The census: every cycle that holds a module of `scope` (src/i18n/) or a module importing one,
 * keyed by its first such module (an allowlist line's key), its shortest cycle as the words.
 */
export function cycleFindings(root: string, graph: Graph, scope = "src/i18n/"): CycleFinding[] {
  const rel = (file: string) => relative(root, file).split("\\").join("/");
  const inScope = new Set([...graph.keys()].filter((file) => rel(file).startsWith(scope)));
  const watched = new Set(inScope);
  for (const [file, edges] of graph)
    if (edges.some((edge) => inScope.has(edge.to))) watched.add(file);
  const findings: CycleFinding[] = [];
  for (const component of cycleComponents(graph)) {
    const start = component.find((file) => watched.has(file));
    if (start === undefined) continue;
    const hops = shortestCycle(graph, component, start);
    let from = start;
    const parts: string[] = [];
    for (const hop of hops) {
      parts.push(`${rel(from)}:${hop.line} → ${rel(hop.to)}`);
      from = hop.to;
    }
    findings.push({
      key: rel(start),
      what: `a cycle of ${component.length} module(s): ${parts.join("; ")}`,
    });
  }
  return findings;
}

/** The census's own form of a source file: `src/**` .ts and .tsx, tests and declarations left out. */
export function isCensusSource(file: string): boolean {
  return /\.(ts|tsx)$/.test(file) && !/\.(test|spec)\.tsx?$/.test(file) && !file.endsWith(".d.ts");
}
