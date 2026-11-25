import ts from "typescript";
import { visitTs } from "./kit";

/**
 * CF-NUM-1 (LAW-NUM-1, cursor bundle 6) — A READ'S NUMBER IS NEVER INVENTED. A read that has not
 * answered, or failed, has no count: `?? 0` of a read's value, handed to a result count, a pager's
 * `total`, a stat tile's `value` or a service's `total`, draws a "0" the database never said. The
 * caller passes `undefined` (the pager and the filters' footer take it) or draws the tile's loading
 * and failed states.
 *
 * The forms found: (a) a JSX attribute `resultCount`, `total` or `totalCount`, and the `value` of a
 * `<StatCard>`, whose expression is `x ?? 0` (parentheses and `Number(…)` looked through); (b) an
 * object property `total`, `totalCount` or `resultCount` whose initializer is the same.
 */

export type NumberFinding = { file: string; line: number; what: string };
export type NumberFile = { file: string; text: string };

const COUNT_NAMES = new Set(["resultCount", "total", "totalCount"]);
const PLAIN = "invents a zero for a read that has not answered (`?? 0`)";

/** The expression with parentheses and a `Number(…)` call looked through. */
function bare(expression: ts.Expression): ts.Expression {
  let current = expression;
  for (;;) {
    if (ts.isParenthesizedExpression(current)) current = current.expression;
    else if (
      ts.isCallExpression(current) &&
      ts.isIdentifier(current.expression) &&
      current.expression.text === "Number" &&
      current.arguments.length === 1 &&
      current.arguments[0] !== undefined
    )
      current = current.arguments[0];
    else return current;
  }
}

function isZeroFallback(expression: ts.Expression | undefined): boolean {
  if (expression === undefined) return false;
  const value = bare(expression);
  return (
    ts.isBinaryExpression(value) &&
    value.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
    ts.isNumericLiteral(value.right) &&
    value.right.text === "0"
  );
}

function enclosingElementName(attribute: ts.JsxAttribute): string | undefined {
  const opening = attribute.parent.parent;
  return ts.isJsxOpeningLikeElement(opening) ? opening.tagName.getText() : undefined;
}

export function readNumberFindings(files: readonly NumberFile[]): NumberFinding[] {
  const findings: NumberFinding[] = [];
  for (const { file, text } of files) {
    visitTs(
      file,
      (node, source) => {
        let hit: ts.Node | undefined;
        if (ts.isJsxAttribute(node) && node.initializer !== undefined) {
          const name = node.name.getText();
          const tile = name === "value" && enclosingElementName(node) === "StatCard";
          if ((COUNT_NAMES.has(name) || tile) && ts.isJsxExpression(node.initializer)) {
            if (isZeroFallback(node.initializer.expression)) hit = node;
          }
        } else if (
          ts.isPropertyAssignment(node) &&
          ts.isIdentifier(node.name) &&
          COUNT_NAMES.has(node.name.text) &&
          isZeroFallback(node.initializer)
        )
          hit = node;
        if (hit !== undefined)
          findings.push({
            file,
            line: source.getLineAndCharacterOfPosition(hit.getStart(source)).line + 1,
            what: PLAIN,
          });
      },
      text,
    );
  }
  return findings;
}
