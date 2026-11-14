import { dirname, join } from "node:path";
import ts from "typescript";

import { visitTs } from "./kit";

/**
 * The CI turn (DEC-378 a, INC-1136) — NO SCRATCH ROW MOVES A SHARED VALUE IN A SPLIT LANE. Two
 * workers of one lane share one backend, so a test that moves a value other tests' rows read (a
 * level's rank, the public language list, a job's pause) runs in the serial lane (`@global-state`)
 * or writes through a helper whose placement moves none.
 *
 * The manifest (scripts/conformance/shared-value-tables.txt) names each shared-value table, why
 * its rows are shared, the doors that write it and the sanctioned helpers. A WRITE SITE is a
 * service-client chain `.from("<table>")…insert|update|upsert|delete(` on a manifest table, or an
 * `.rpc("<door>"` for a door the manifest names, in a file under e2e/. The helper is the unit: a
 * write inside a named function outside any test makes that function a writer, and every call to
 * it is a write site at the call (followed through helpers that call helpers). A site passes when
 * its test, or a describe around it, carries `@global-state`, or the function it sits in is a
 * sanctioned helper of the table. Every other site is a finding, keyed
 * `<file>::<test id or function>::<table>` for the allowlist's `key | reason | until`.
 */

export type SharedTable = {
  table: string;
  why: string;
  doors: string[];
  helpers: string[];
  line: number;
};

export type Finding = { file: string; line: number; what: string; key: string };

const WRITES = new Set(["insert", "update", "upsert", "delete"]);
const SERIAL_TAG = "@global-state";
const TEST_MODIFIERS = new Set(["only", "skip", "fixme", "fail"]);
const HOOKS = new Set(["beforeAll", "beforeEach", "afterAll", "afterEach"]);

function items(cell: string): string[] {
  if (cell === "-") return [];
  const out: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of cell) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      out.push(current.trim());
      current = "";
    } else current += char;
  }
  out.push(current.trim());
  return out.map((item) => /^[A-Za-z_$][\w$]*/.exec(item)?.[0] ?? item);
}

export type Manifest = {
  shared: SharedTable[];
  /** Tables with a statement-level trigger whose writes move no shared value. */
  readOnly: Array<{ table: string; why: string; line: number }>;
};

const READ_NOT_SHARED = "read, not shared";

/**
 * The manifest's rows: `table | why | doors | helpers` (four non-empty cells, `-` for none), or
 * `table | read, not shared | why`. Anything else, or a table twice, throws.
 */
export function readManifest(text: string, path: string): Manifest {
  const manifest: Manifest = { shared: [], readOnly: [] };
  const seen = new Set<string>();
  text.split(/\r?\n/).forEach((raw, index) => {
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed.startsWith("#")) return;
    const line = index + 1;
    const cells = raw.split("|").map((cell) => cell.trim());
    const [table = "", second = "", third = "", fourth = ""] = cells;
    const fail = (what: string): never => {
      throw new Error(`${path}:${String(line)} ${what}: ${raw}`);
    };
    if (cells.some((cell) => cell === "") || !/^[a-z_]+$/.test(table)) fail("malformed line");
    if (seen.has(table)) fail("duplicate table");
    seen.add(table);
    if (cells.length === 3 && second === READ_NOT_SHARED)
      manifest.readOnly.push({ table, why: third, line });
    else if (cells.length === 4)
      manifest.shared.push({
        table,
        why: second,
        doors: items(third),
        helpers: items(fourth),
        line,
      });
    else fail("expected `table | why | doors | helpers` or `table | read, not shared | why`");
  });
  return manifest;
}

const STATEMENT_TRIGGER =
  /\bCREATE\s+(?:OR\s+REPLACE\s+)?TRIGGER\s+\w+\s+(?:BEFORE|AFTER|INSTEAD\s+OF)\b[^;]*?\bON\s+public\.(\w+)[^;]*?\bFOR\s+EACH\s+STATEMENT\b/gi;

/**
 * The growth rule: every table a migration gives a statement-level trigger (one authored pattern
 * over the SQL with its `--` comments blanked) is on the manifest, shared or "read, not shared";
 * a "read, not shared" line whose table carries no such trigger is stale.
 */
export function triggerFindings(
  migrations: Array<{ path: string; text: string }>,
  manifest: Manifest,
  manifestPath: string,
): Finding[] {
  const named = new Set([...manifest.shared, ...manifest.readOnly].map((row) => row.table));
  const carried = new Set<string>();
  const findings: Finding[] = [];
  for (const { path, text } of migrations) {
    const sql = text.replace(/--[^\n]*/g, (comment) => " ".repeat(comment.length));
    for (const match of sql.matchAll(STATEMENT_TRIGGER)) {
      const table = match[1] ?? "";
      if (carried.has(table)) continue;
      carried.add(table);
      if (named.has(table)) continue;
      findings.push({
        key: `${path}::${table}`,
        file: path,
        line: sql.slice(0, match.index).split("\n").length,
        what: `public.${table} carries a statement-level trigger; the manifest names it neither shared nor "${READ_NOT_SHARED}"`,
      });
    }
  }
  for (const row of manifest.readOnly)
    if (!carried.has(row.table))
      findings.push({
        key: `${manifestPath}::${row.table}`,
        file: manifestPath,
        line: row.line,
        what: `${row.table} is "${READ_NOT_SHARED}" but carries no statement-level trigger (stale)`,
      });
  return findings;
}

function literal(node: ts.Node | undefined): string | null {
  return node !== undefined &&
    (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ? node.text
    : null;
}

/** The table a write chain starts from: the `.from("<table>")` call under it, or null. */
function tableOf(call: ts.CallExpression): string | null {
  let node: ts.Expression = call.expression;
  while (true) {
    if (ts.isPropertyAccessExpression(node)) node = node.expression;
    else if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isPropertyAccessExpression(callee) && callee.name.text === "from")
        return literal(node.arguments[0]);
      node = callee;
    } else if (ts.isParenthesizedExpression(node) || ts.isAwaitExpression(node))
      node = node.expression;
    else return null;
  }
}

/** A `test(…)` call's title, through `test.only` and its kin; null for any other call. */
function testTitle(call: ts.CallExpression): string | null {
  const callee = call.expression;
  const isTest =
    (ts.isIdentifier(callee) && callee.text === "test") ||
    (ts.isPropertyAccessExpression(callee) &&
      ts.isIdentifier(callee.expression) &&
      callee.expression.text === "test" &&
      TEST_MODIFIERS.has(callee.name.text));
  return isTest ? literal(call.arguments[0]) : null;
}

function isDescribe(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return (
    ts.isPropertyAccessExpression(callee) &&
    callee.name.text === "describe" &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === "test"
  );
}

/** True when a test or describe call's title or options carry the serial tag. */
function tagged(call: ts.CallExpression): boolean {
  if (literal(call.arguments[0])?.includes(SERIAL_TAG) === true) return true;
  const options = call.arguments[1];
  if (options === undefined || !ts.isObjectLiteralExpression(options)) return false;
  return options.properties.some(
    (property) =>
      ts.isPropertyAssignment(property) &&
      property.name.getText() === "tag" &&
      property.initializer.getText().includes(SERIAL_TAG),
  );
}

function functionName(node: ts.Node): string | null {
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node))
    return node.name === undefined ? null : node.name.getText();
  if (
    (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
    ts.isVariableDeclaration(node.parent) &&
    ts.isIdentifier(node.parent.name)
  )
    return node.parent.name.text;
  return null;
}

/** A `test.afterEach(…)` call's hook name (and its kin); null for any other call. */
function hookName(call: ts.CallExpression): string | null {
  const callee = call.expression;
  return ts.isPropertyAccessExpression(callee) &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === "test" &&
    HOOKS.has(callee.name.text)
    ? callee.name.text
    : null;
}

type Unit =
  | { kind: "test"; id: string; serial: boolean }
  | { kind: "function"; name: string; serial: boolean }
  | { kind: "top"; name: string; serial: boolean };

/** The unit a node sits in: its test, else its nearest named function, else its hook or file. */
function unitOf(node: ts.Node): Unit {
  let fn: string | null = null;
  let hook: string | null = null;
  let serial = false;
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (fn === null) fn = functionName(at);
    if (!ts.isCallExpression(at)) continue;
    if (fn === null && hook === null) hook = hookName(at);
    const title = testTitle(at);
    if (title !== null) {
      let describedSerial = false;
      for (let up: ts.Node | undefined = at.parent; up !== undefined; up = up.parent)
        if (ts.isCallExpression(up) && isDescribe(up) && tagged(up)) describedSerial = true;
      return {
        kind: "test",
        id: title.split(/\s/)[0] ?? title,
        serial: tagged(at) || describedSerial,
      };
    }
    if (isDescribe(at) && tagged(at)) serial = true;
  }
  return fn === null
    ? { kind: "top", name: hook ?? "(top)", serial }
    : { kind: "function", name: fn, serial };
}

/** Without its extension: the form an import's specifier and a file's path share. */
function stem(path: string): string {
  return path.replace(/\.tsx?$/, "");
}

/** The local names under which `source` calls `name` from `definedIn`: itself, or its imports. */
function localNames(source: ts.SourceFile, name: string, definedIn: string): string[] {
  if (source.fileName === definedIn) return [name];
  const names: string[] = [];
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const specifier = literal(statement.moduleSpecifier);
    if (specifier === null || !specifier.startsWith(".")) continue;
    if (stem(join(dirname(source.fileName), specifier)) !== stem(definedIn)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements)
      if ((element.propertyName ?? element.name).text === name) names.push(element.name.text);
  }
  return names;
}

type Site = { file: string; line: number; table: string; unit: Unit; via: string };

function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}

/** Every write site of the manifest's tables in `files`, each finding keyed for the allowlist. */
export function sharedValueFindings(
  files: Array<{ path: string; text: string }>,
  tables: SharedTable[],
): Finding[] {
  const byTable = new Map(tables.map((row) => [row.table, row]));
  const byDoor = new Map(tables.flatMap((row) => row.doors.map((door) => [door, row.table])));
  const parsed = files.flatMap((file) => {
    const calls: ts.CallExpression[] = [];
    const sources = new Set<ts.SourceFile>();
    visitTs(
      file.path,
      (node, source) => {
        sources.add(source);
        if (ts.isCallExpression(node)) calls.push(node);
      },
      file.text,
    );
    return [...sources].map((source) => ({ source, calls }));
  });
  const sites: Site[] = [];
  for (const { source, calls } of parsed) {
    for (const call of calls) {
      if (!ts.isPropertyAccessExpression(call.expression)) continue;
      const method = call.expression.name.text;
      const table = WRITES.has(method)
        ? tableOf(call)
        : method === "rpc"
          ? (byDoor.get(literal(call.arguments[0]) ?? "") ?? null)
          : null;
      if (table !== null && byTable.has(table))
        sites.push({
          file: source.fileName,
          line: lineOf(source, call),
          table,
          unit: unitOf(call),
          via: method === "rpc" ? `rpc ${literal(call.arguments[0]) ?? ""}` : method,
        });
    }
  }

  // The helper is the unit: a writing function's calls are write sites at the call.
  const sanctioned = (table: string, name: string) =>
    byTable.get(table)?.helpers.includes(name) === true;
  const followed = new Set<string>();
  let frontier = sites.filter((site) => site.unit.kind === "function");
  while (frontier.length > 0) {
    const next: Site[] = [];
    for (const site of frontier) {
      if (
        site.unit.kind !== "function" ||
        site.unit.serial ||
        sanctioned(site.table, site.unit.name)
      )
        continue;
      const name = site.unit.name;
      const mark = `${site.file}::${name}::${site.table}`;
      if (followed.has(mark)) continue;
      followed.add(mark);
      for (const { source, calls } of parsed) {
        const names = localNames(source, name, site.file);
        if (names.length === 0) continue;
        for (const call of calls) {
          if (!ts.isIdentifier(call.expression) || !names.includes(call.expression.text)) continue;
          const caller: Site = {
            file: source.fileName,
            line: lineOf(source, call),
            table: site.table,
            unit: unitOf(call),
            via: `${name}()`,
          };
          sites.push(caller);
          next.push(caller);
        }
      }
    }
    frontier = next;
  }

  const findings = new Map<string, Finding>();
  for (const site of sites) {
    const { unit } = site;
    if (unit.serial) continue;
    // A writing function is judged at its calls (followed above), a sanctioned one not at all.
    if (unit.kind === "function") continue;
    const name = unit.kind === "test" ? unit.id : unit.name;
    const key = `${site.file}::${name}::${site.table}`;
    if (findings.has(key)) continue;
    findings.set(key, {
      key,
      file: site.file,
      line: site.line,
      what: `${name} writes ${site.table} (${site.via}) outside @global-state and the manifest's helpers`,
    });
  }
  return [...findings.values()];
}
