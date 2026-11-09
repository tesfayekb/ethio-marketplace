import ts from "typescript";

import { codeOf, visitTs } from "./kit";
import { lastDeclarations, type LastDeclaration } from "./migration-reader";

/**
 * P-2 (a) ruling 14 item 2 (CF-DOOR-1, INC-1062) — A TEST READS AN ENVELOPE
 * DOOR'S ANSWER, NOT ONLY ITS TRANSPORT. A door that refuses in its body
 * (`{ ok: false, refusals }` / `{ ok: false, reason }`) answers `error` null, so
 * `expect(x.error).toBeNull()` alone passes a refusal as success (LG-29: the
 * fourth publish was refused `noFreeSlot` and the test went on as if live).
 *
 * The doors are DERIVED, never listed: every function whose LAST declaration
 * (the migration reader, the one sql-writes.ts reads; comments blanked) can answer
 * `'ok', false`. The sites are every e2e `.rpc("<door>", …)`, and every door
 * name handed as a literal argument to a plain wrapper function
 * (`rpcResult(page, "<door>", …)`). A site passes when its answer
 * - reaches e2e/helpers/door-answer.ts (`doorAnswer` / `doorRefusal`), or
 * - is read for its `ok` (a statement reading the bound answer names `ok`), or
 * - is asserted to be the door's RAISED refusal (an error asserted present or
 *   by its words: the door said no before it could answer).
 * A site a function returns (`const report = (…) => x.rpc("report_listing", …)`)
 * is judged at that function's callers in the same file. A door name held in a
 * list (`for (const fn of [...]) x.rpc(fn)`) is not read here; it stays a
 * reviewer's law. Allowances `<file>:<line> | reason | until` in
 * door-answers-allowlist.txt.
 */

export type DoorFinding = { file: string; line: number; what: string };

/** The helpers that read a door's answer whole. */
const HELPERS = new Set(["doorAnswer", "doorRefusal"]);

const CAN_REFUSE = /'ok'\s*,\s*false\b/i;
/** `x.ok`, `x["ok"]`, an `{ ok: … }` the answer is matched against, or a helper call. */
const READS_OK = /\.\s*ok\b|\[\s*["']ok["']\s*\]|\bok\s*:|\bdoor(?:Answer|Refusal)\s*\(/;
/** An error asserted present, or by its words (`toContain`, `toMatch`, `toBe("…")`). */
const ASSERTS_RAISE =
  /\berror\b[^;]*?\)\s*\.\s*(?:not\s*\.\s*toBeNull\s*\(|toContain\s*\(|toMatch\s*\(|toBeTruthy\s*\(|toBe\s*\(\s*["'`])/;

/** The envelope doors: functions whose last declaration can answer `'ok', false`. */
export function envelopeDoors(last: Map<string, LastDeclaration>): string[] {
  const doors: string[] = [];
  for (const [fn, declaration] of last) if (CAN_REFUSE.test(declaration.body)) doors.push(fn);
  return doors.sort();
}

/** The envelope doors of the migrations under `root`. */
export function envelopeDoorsOf(root: string): string[] {
  return envelopeDoors(lastDeclarations(root));
}

function statementOf(node: ts.Node): ts.Node {
  let at = node;
  while (at.parent && !ts.isStatement(at)) at = at.parent;
  return at;
}

function scopeOf(node: ts.Node): ts.Node {
  let at = node.parent;
  while (at && !ts.isFunctionLike(at) && !ts.isSourceFile(at)) at = at.parent;
  return at ?? node.getSourceFile();
}

/** The call's result as the code holds it: through `await` and parentheses. */
function heldOf(call: ts.Node): ts.Node {
  let at = call;
  while (ts.isAwaitExpression(at.parent) || ts.isParenthesizedExpression(at.parent)) at = at.parent;
  return at;
}

function boundNames(holder: ts.Node): string[] {
  if (!ts.isVariableDeclaration(holder)) return [];
  if (ts.isIdentifier(holder.name)) return [holder.name.text];
  if (!ts.isObjectBindingPattern(holder.name)) return [];
  return holder.name.elements.flatMap((element) =>
    ts.isIdentifier(element.name) ? [element.name.text] : [],
  );
}

/** The name of the function whose value `node` is returned from, when it has one. */
function wrapperName(node: ts.Node): string | null {
  let at = node.parent;
  while (at && !ts.isFunctionLike(at)) at = at.parent;
  if (!at) return null;
  if (ts.isFunctionDeclaration(at)) return at.name?.text ?? null;
  const holder = at.parent;
  if (holder && ts.isVariableDeclaration(holder) && ts.isIdentifier(holder.name))
    return holder.name.text;
  return null;
}

function callsOf(name: string, source: ts.SourceFile): ts.CallExpression[] {
  const calls: ts.CallExpression[] = [];
  const visit = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === name
    )
      calls.push(node);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return calls;
}

/** Whether the answer of `call` is read whole (see the header); `depth` bounds the wrapper hop. */
function readsAnswer(call: ts.Node, source: ts.SourceFile, depth: number): boolean {
  const held = heldOf(call);
  const holder = held.parent;
  if (
    ts.isCallExpression(holder) &&
    ts.isIdentifier(holder.expression) &&
    HELPERS.has(holder.expression.text) &&
    holder.arguments[0] === held
  )
    return true;
  const texts = [statementOf(held).getText(source)];
  let returned =
    ts.isReturnStatement(holder) || (ts.isArrowFunction(holder) && holder.body === held);
  const names = boundNames(holder);
  if (names.length > 0) {
    const visit = (node: ts.Node) => {
      if (
        ts.isIdentifier(node) &&
        names.includes(node.text) &&
        node.getStart(source) > call.getEnd()
      ) {
        const statement = statementOf(node);
        texts.push(statement.getText(source));
        if (ts.isReturnStatement(statement)) returned = true;
      }
      ts.forEachChild(node, visit);
    };
    visit(scopeOf(call));
  }
  const code = codeOf(texts.join("\n"));
  if (READS_OK.test(code) || ASSERTS_RAISE.test(code)) return true;
  if (!returned || depth > 0) return false;
  const name = wrapperName(held);
  if (name === null) return false;
  const callers = callsOf(name, source);
  return callers.length > 0 && callers.every((caller) => readsAnswer(caller, source, depth + 1));
}

/** Every e2e call of an envelope door whose answer is not read whole, by file and line. */
export function doorAnswerFindings(files: string[], doors: readonly string[]): DoorFinding[] {
  const known = new Set(doors);
  const findings: DoorFinding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isStringLiteralLike(node) || !known.has(node.text)) return;
      const call = node.parent;
      if (!ts.isCallExpression(call)) return;
      const viaRpc =
        ts.isPropertyAccessExpression(call.expression) &&
        call.expression.name.text === "rpc" &&
        call.arguments[0] === node;
      const viaWrapper = ts.isIdentifier(call.expression) && !HELPERS.has(call.expression.text);
      if (!viaRpc && !viaWrapper) return;
      if (readsAnswer(call, source, 0)) return;
      findings.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `${node.text}'s answer is not read for its ok: read it through doorAnswer / doorRefusal (e2e/helpers/door-answer.ts, INC-1062)`,
      });
    });
  }
  return findings;
}
