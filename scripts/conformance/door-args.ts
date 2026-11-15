import ts from "typescript";

import { visitTs } from "./kit";

/**
 * INC-942 (F1-4a, widened in F1-4b; CF-DOOR-ARGS) — A DOOR'S ARGUMENT IS TYPED, NEVER CAST.
 * The generated types declare every argument of a database function non-null;
 * a door that takes NULL for "not set" is called through `rpc()` with
 * `DoorArgs<F>` (src/lib/supabase-door.ts), whose every argument may be NULL —
 * the database's declaration answers which NULL it accepts. The census finds
 * the casts that bypassed it, anywhere under src/: the literal `null` asserted
 * through `unknown` to another type (`null as unknown as string`,
 * `<string><unknown>null`); and (F1-4b) a DOOR ARGUMENT asserted through
 * `unknown` — a property the database names `p_…` whose value is cast
 * (`p_batch: batch as unknown as string`), or an object literal holding such a
 * property cast whole (`{ p_a: …, p_b: … } as unknown as Args`). Allowances
 * `<file>:<line> | reason | until` in door-args-allowlist.txt.
 */

export type DoorArgsFinding = { file: string; line: number; what: string };

function unwrap(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isParenthesizedExpression(at)) at = at.expression;
  return at;
}

/** `x as T` or `<T>x`: the asserted expression and the type, or null. */
function assertion(node: ts.Node): { expression: ts.Expression; type: ts.TypeNode } | null {
  if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node))
    return { expression: node.expression, type: node.type };
  return null;
}

/** True when `node` asserts the literal `null` through `unknown` to a type that is not null. */
function castsNull(node: ts.Node): boolean {
  const outer = assertion(node);
  if (outer === null || outer.type.kind === ts.SyntaxKind.UnknownKeyword) return false;
  if (ts.isLiteralTypeNode(outer.type) && outer.type.literal.kind === ts.SyntaxKind.NullKeyword)
    return false;
  const inner = assertion(unwrap(outer.expression));
  return (
    inner !== null &&
    inner.type.kind === ts.SyntaxKind.UnknownKeyword &&
    unwrap(inner.expression).kind === ts.SyntaxKind.NullKeyword
  );
}

/** The assertion's operand when it is a cast through `unknown` to another type, else null. */
function throughUnknown(node: ts.Node): ts.Expression | null {
  const outer = assertion(node);
  if (outer === null || outer.type.kind === ts.SyntaxKind.UnknownKeyword) return null;
  if (ts.isLiteralTypeNode(outer.type) && outer.type.literal.kind === ts.SyntaxKind.NullKeyword)
    return null;
  const inner = assertion(unwrap(outer.expression));
  if (inner === null || inner.type.kind !== ts.SyntaxKind.UnknownKeyword) return null;
  return unwrap(inner.expression);
}

/** True for a property the database names as a door parameter (`p_…`). */
function isDoorParameter(property: ts.ObjectLiteralElementLike): boolean {
  return (
    (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) &&
    (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
    property.name.text.startsWith("p_")
  );
}

/** True when `node` casts a door argument — or a whole argument object — through `unknown`. */
function castsDoorArgument(node: ts.Node): boolean {
  const operand = throughUnknown(node);
  if (operand === null) return false;
  if (ts.isObjectLiteralExpression(operand)) return operand.properties.some(isDoorParameter);
  let up: ts.Node = node;
  while (ts.isParenthesizedExpression(up.parent)) up = up.parent;
  return (
    ts.isPropertyAssignment(up.parent) && isDoorParameter(up.parent) && up.parent.initializer === up
  );
}

/** Every cast of `null` or of a door argument through `unknown` in `files` (`planted` serves one file's text). */
export function doorArgsCensus(
  files: string[],
  planted?: { file: string; text: string },
): { keys: string[]; findings: DoorArgsFinding[] } {
  const findings: DoorArgsFinding[] = [];
  for (const file of files) {
    const text = planted?.file === file ? planted.text : undefined;
    visitTs(
      file,
      (node, source) => {
        const nulled = castsNull(node);
        if (!nulled && !castsDoorArgument(node)) return;
        const type = assertion(node)?.type.getText(source) ?? "";
        findings.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: nulled
            ? `casts null to ${type}; call the door through rpc() with DoorArgs`
            : `casts a door argument to ${type} through unknown; call the door through rpc() with DoorArgs`,
        });
      },
      text,
    );
  }
  return {
    keys: [...new Set(findings.map((hit) => `${hit.file}:${hit.line}`))].sort(),
    findings,
  };
}
