/**
 * INC-555's class at its third occurrence (L1b, L2, L4b: a test that leased
 * three pooled accounts ran past its 60 s budget; DEC-174, bundle 11 turn C5).
 * A pooled lease (`leaseUser`, e2e/helpers/users.ts) resets its seat with about
 * two dozen calls in a row, so the leases a test makes are most of its time.
 * This check reads every .ts file under e2e/ and refuses a test, or a hook,
 * that leases more than LIMIT pooled accounts.
 *
 * How a lease is counted:
 * - `leaseUser` is one lease. Every other function — a helper exported from
 *   e2e/helpers/ (`leaseSeller`) or a file's own (`seller(page)`,
 *   `seedWaiting()`) — counts the leases its body makes, through any depth.
 * - A test counts its body, plus every `beforeEach` of the describes around it.
 *   A `beforeAll` is counted on its own.
 * - A lease inside a loop, or inside a callback to an array method, `poll` or
 *   `toPass`, has no fixed count: it is refused.
 * - Both arms of an `if` count (the check reads text, it does not run it).
 * - The job super admin (`useJobSuperAdmin`) is a worker's standing session,
 *   not a pooled lease, and `createUser` mints a fresh account; neither calls
 *   `leaseUser`, so neither is counted.
 * Run by the unit tests (scripts/e2e-leases.test.ts).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The most pooled accounts one test (or one hook) may lease. */
export const LIMIT = 2;
/** The pooled lease itself. */
export const PRIMITIVE = "leaseUser";
const HELPERS = "e2e/helpers/";
const TEST_NAMES = new Set(["test", "it"]);
const TEST_MODIFIERS = new Set(["only", "skip", "fixme", "fail", "slow"]);
const REPEATING = new Set([
  "map",
  "forEach",
  "flatMap",
  "filter",
  "reduce",
  "some",
  "every",
  "find",
  "poll",
  "toPass",
]);

export type Source = { file: string; text: string };

type Def = { file: string; node: ts.FunctionLikeDeclaration };

function parse(source: Source): ts.SourceFile {
  return ts.createSourceFile(source.file, source.text, ts.ScriptTarget.Latest, true);
}

function isFunctionLike(node: ts.Node): node is ts.FunctionLikeDeclaration {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node)
  );
}

/** Every named function in one file: declarations and `const name = (…) => …`. */
function definitionsIn(file: string, sf: ts.SourceFile): Map<string, Def[]> {
  const out = new Map<string, Def[]>();
  const add = (name: string, node: ts.FunctionLikeDeclaration) =>
    out.set(name, [...(out.get(name) ?? []), { file, node }]);
  const visit = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name) add(node.name.text, node);
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    ) {
      add(node.name.text, node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/** Local names bound by `import { a as b }` → the imported name. */
function importAliases(sf: ts.SourceFile): Map<string, string> {
  const out = new Map<string, string>();
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) {
      out.set(element.name.text, (element.propertyName ?? element.name).text);
    }
  }
  return out;
}

/** The called name of `name(…)`, `await name(…)`; null for a method call. */
function calledName(call: ts.CallExpression): string | null {
  return ts.isIdentifier(call.expression) ? call.expression.text : null;
}

/** A test call: `test("…", fn)`, `it("…", fn)`, `test.only("…", fn)` … */
function isTestCall(call: ts.CallExpression): boolean {
  const callee = call.expression;
  const named =
    (ts.isIdentifier(callee) && TEST_NAMES.has(callee.text)) ||
    (ts.isPropertyAccessExpression(callee) &&
      ts.isIdentifier(callee.expression) &&
      TEST_NAMES.has(callee.expression.text) &&
      TEST_MODIFIERS.has(callee.name.text));
  if (!named) return false;
  const [title] = call.arguments;
  return (
    title !== undefined &&
    (ts.isStringLiteral(title) ||
      ts.isNoSubstitutionTemplateLiteral(title) ||
      ts.isTemplateExpression(title)) &&
    call.arguments.some((arg) => isFunctionLike(arg))
  );
}

/** `test.beforeEach(fn)` / `test.beforeAll(fn)` (also `test.describe.…` is not a hook). */
function hookKind(call: ts.CallExpression): "beforeEach" | "beforeAll" | null {
  const callee = call.expression;
  if (!ts.isPropertyAccessExpression(callee)) return null;
  if (!ts.isIdentifier(callee.expression) || !TEST_NAMES.has(callee.expression.text)) return null;
  const name = callee.name.text;
  return name === "beforeEach" || name === "beforeAll" ? name : null;
}

function isLoop(node: ts.Node): boolean {
  return (
    ts.isForStatement(node) ||
    ts.isForOfStatement(node) ||
    ts.isForInStatement(node) ||
    ts.isWhileStatement(node) ||
    ts.isDoStatement(node)
  );
}

/** A callback handed to a repeating call: `xs.map(cb)`, `expect.poll(cb)`, `.toPass(cb)` is on the expect. */
function isRepeatingCallback(node: ts.Node): boolean {
  const parent = node.parent;
  if (
    !parent ||
    !ts.isCallExpression(parent) ||
    !parent.arguments.includes(node as ts.Expression)
  ) {
    return false;
  }
  const callee = parent.expression;
  return ts.isPropertyAccessExpression(callee) && REPEATING.has(callee.name.text);
}

export class LeaseCounter {
  private readonly helpers = new Map<string, Def[]>();
  private readonly locals = new Map<string, Map<string, Def[]>>();
  private readonly aliases = new Map<string, Map<string, string>>();
  private readonly memo = new Map<ts.Node, number>();
  private readonly busy = new Set<ts.Node>();
  readonly files: { file: string; sf: ts.SourceFile }[] = [];

  constructor(sources: Source[]) {
    for (const source of sources) {
      const sf = parse(source);
      this.files.push({ file: source.file, sf });
      const defs = definitionsIn(source.file, sf);
      this.locals.set(source.file, defs);
      this.aliases.set(source.file, importAliases(sf));
      if (source.file.startsWith(HELPERS)) {
        for (const [name, list] of defs)
          this.helpers.set(name, [...(this.helpers.get(name) ?? []), ...list]);
      }
    }
  }

  /** The leases one call makes. */
  private callWeight(file: string, call: ts.CallExpression): number {
    const local = calledName(call);
    return local === null ? 0 : this.nameWeight(file, local);
  }

  /** The leases a call of `local` makes in `file`; a name with two definitions counts the larger. */
  nameWeight(file: string, local: string): number {
    const own = this.locals.get(file)?.get(local);
    const name = this.aliases.get(file)?.get(local) ?? local;
    if (name === PRIMITIVE && (!own || file.startsWith(HELPERS))) return 1;
    if (own) return Math.max(0, ...own.map((def) => this.bodyWeight(def.file, def.node)));
    const defs = this.helpers.get(name) ?? [];
    return Math.max(0, ...defs.map((def) => this.bodyWeight(def.file, def.node)));
  }

  /** The leases a function's body makes; a nested named function counts where it is called. */
  bodyWeight(file: string, fn: ts.FunctionLikeDeclaration): number {
    const cached = this.memo.get(fn);
    if (cached !== undefined) return cached;
    if (this.busy.has(fn)) return 0;
    this.busy.add(fn);
    let total = 0;
    const visit = (node: ts.Node, repeating: boolean) => {
      if (node !== fn && isFunctionLike(node)) {
        const named =
          ts.isFunctionDeclaration(node) ||
          (node.parent !== undefined && ts.isVariableDeclaration(node.parent));
        if (named) return;
        repeating = repeating || isRepeatingCallback(node);
      }
      const inLoop = repeating || (isLoop(node) && node !== fn);
      if (ts.isCallExpression(node)) {
        const weight = this.callWeight(file, node);
        if (weight > 0) total += repeating ? Number.POSITIVE_INFINITY : weight;
      }
      ts.forEachChild(node, (child) => visit(child, inLoop));
    };
    if (fn.body) visit(fn.body, false);
    this.busy.delete(fn);
    this.memo.set(fn, total);
    return total;
  }
}

function lineOf(sf: ts.SourceFile, node: ts.Node): number {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}

function titleOf(call: ts.CallExpression, sf: ts.SourceFile): string {
  const title = call.arguments[0]!;
  const text =
    ts.isStringLiteral(title) || ts.isNoSubstitutionTemplateLiteral(title)
      ? title.text
      : title.getText(sf);
  return text.split(/\s/)[0] ?? text;
}

export type Count = { file: string; line: number; what: string; leases: number };

/** Every test's and every beforeAll's leases. */
export function counts(sources: Source[]): Count[] {
  const counter = new LeaseCounter(sources);
  const out: Count[] = [];
  for (const { file, sf } of counter.files) {
    if (file.startsWith(HELPERS)) continue;
    const fnWeight = (call: ts.CallExpression): number => {
      const fn = [...call.arguments].reverse().find((arg) => isFunctionLike(arg));
      if (fn && isFunctionLike(fn)) return counter.bodyWeight(file, fn);
      const first = call.arguments[0];
      return first && ts.isIdentifier(first) ? counter.nameWeight(file, first.text) : 0;
    };
    const visit = (node: ts.Node, inherited: number) => {
      let around = inherited;
      // The beforeEach hooks of a block apply to every test in it.
      if (ts.isBlock(node) || ts.isSourceFile(node)) {
        for (const statement of node.statements) {
          if (
            ts.isExpressionStatement(statement) &&
            ts.isCallExpression(statement.expression) &&
            hookKind(statement.expression) === "beforeEach"
          ) {
            around += fnWeight(statement.expression);
          }
        }
      }
      if (ts.isCallExpression(node) && isTestCall(node)) {
        out.push({
          file,
          line: lineOf(sf, node),
          what: titleOf(node, sf),
          leases: around + fnWeight(node),
        });
        return;
      }
      if (ts.isCallExpression(node) && hookKind(node) === "beforeAll") {
        out.push({ file, line: lineOf(sf, node), what: "beforeAll", leases: fnWeight(node) });
        return;
      }
      ts.forEachChild(node, (child) => visit(child, around));
    };
    visit(sf, 0);
  }
  return out;
}

/** Every test and hook over the limit: "<file>:<line> <id> leases N pooled accounts (limit 2)". */
export function check(sources: Source[]): string[] {
  return counts(sources)
    .filter((count) => count.leases > LIMIT)
    .map((count) => {
      const leases = Number.isFinite(count.leases)
        ? `leases ${count.leases} pooled accounts`
        : "leases pooled accounts in a loop";
      return `${count.file}:${count.line} ${count.what} ${leases} (limit ${LIMIT})`;
    });
}

export function readE2e(root = ROOT): Source[] {
  const out: Source[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".ts")) {
        out.push({
          file: relative(root, full).split("\\").join("/"),
          text: readFileSync(full, "utf8"),
        });
      }
    }
  };
  walk(join(root, "e2e"));
  return out;
}
