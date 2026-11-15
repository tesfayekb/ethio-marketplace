import ts from "typescript";

import { visitTs } from "./kit";

/**
 * INC-942 (F1-4a, CF-DOOR-ARGS) — A DOOR'S NULL ARGUMENT IS TYPED, NEVER CAST.
 * The generated types declare every argument of a database function non-null;
 * a door that takes NULL for "not set" is called through `rpc()` with
 * `DoorArgs<F>` (src/lib/supabase-door.ts), whose every argument may be NULL —
 * the database's declaration answers which NULL it accepts. The census finds
 * the cast that bypassed it: the literal `null` asserted through `unknown` to
 * another type (`null as unknown as string`, `<string><unknown>null`),
 * anywhere under src/. Allowances `<file>:<line> | reason | until` in
 * door-args-allowlist.txt.
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

/** Every cast of `null` through `unknown` in `files` (`planted` serves one file's text). */
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
        if (!castsNull(node)) return;
        const type = assertion(node)?.type.getText(source) ?? "";
        findings.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: `casts null to ${type}; call the door through rpc() with DoorArgs`,
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
