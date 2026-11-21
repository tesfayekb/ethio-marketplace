/**
 * ACT-023 (the tests and CI turn 2) — A COLUMN'S minWidth IS ONE MIN-WIDTH. Any
 * `minWidth` switches the DataTable off its fixed layout
 * (src/components/shell/data-table.tsx), so a value that is not a min-width —
 * `w-fit`, `max-w-40`, two classes — buys the switch and leaves the width
 * unhonoured: a table cell's max-width is not honoured by table layout
 * (INC-1211's class). Read from each file's syntax tree (TypeScript's parser):
 * every `minWidth:` property's value is one `min-w-*` class — a string, or a
 * choice whose every arm is one — and anything else (a name, a call, a sum) is
 * refused, because what it holds cannot be read.
 *
 * Called by scripts/check-datatable-minwidth.sh (the min-width guard, C3-UX-1d)
 * with the files that declare a minWidth; `<file>:<line>:<the line>` per refusal.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { visitTs } from "./conformance/kit";

const ONE_MIN_WIDTH = /^min-w-\S+$/;

function oneMinWidth(node: ts.Expression): boolean {
  if (ts.isParenthesizedExpression(node)) return oneMinWidth(node.expression);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return ONE_MIN_WIDTH.test(node.text);
  if (ts.isConditionalExpression(node))
    return oneMinWidth(node.whenTrue) && oneMinWidth(node.whenFalse);
  return false;
}

/** The lines of a file whose `minWidth:` value is not one `min-w-*` class. */
export function minWidthBreaches(file: string, text: string): number[] {
  const lines: number[] = [];
  visitTs(
    file,
    (node, source) => {
      if (
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
        node.name.text === "minWidth" &&
        !oneMinWidth(node.initializer)
      )
        lines.push(source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
    },
    text,
  );
  return lines;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  for (const file of process.argv.slice(2)) {
    const text = readFileSync(file, "utf8");
    const all = text.split("\n");
    for (const line of minWidthBreaches(file, text))
      console.log(
        `${file}:${line}:${all[line - 1] ?? ""}  <- ACT-023: a minWidth is exactly one min-w-* class`,
      );
  }
}
