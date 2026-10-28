import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-958 (Foundations turn C1) — A PIN IS WHOLE OR ABSENT, AND ITS PRECISION IS KNOWN. The
 * mechanism is src/features/posting/map/pin.ts: `Pin` (the point and its precision together),
 * `PinPrecision` (the table's 'exact' | 'approx'), `readPin` (the one reader of the three
 * columns: the pin, or null — never a guessed precision) and `NEW_PIN_PRECISION` (the starting
 * choice of a NEW pin in the pin map, never a saved pin's default). The census reads src/, e2e/
 * and scripts/ (this file and the generated database types excepted) and refuses:
 *   1. the loose fields `pinLat`, `pinLng`, `pinPrecision` (a pin travels as one value);
 *   2. a precision filled in with `??` — a literal, or NEW_PIN_PRECISION outside the pin map;
 *   3. in the app (src/), a read of the `pin_lat`, `pin_lng` or `pin_precision` columns from a
 *      row that is neither an argument of readPin nor a presence check (`=== null`,
 *      `!== null`) — tests read the stored columns as database truth (G28), and may.
 * No allowlist: the mechanism has no exception.
 */

type Finding = { file: string; line: number; what: string };

const COLUMNS = new Set(["pin_lat", "pin_lng", "pin_precision"]);
const LOOSE = /\bpin(?:Lat|Lng|Precision)\b/;
const STARTING_CHOICE_AT = new Set([
  "src/features/posting/map/pin.ts",
  "src/features/posting/map/map-pin-dropper.tsx",
]);

/** The column a node reads (`row.pin_lat`, `row["pin_lat"]`), or null. */
function columnRead(node: ts.Node): string | null {
  if (ts.isPropertyAccessExpression(node) && COLUMNS.has(node.name.text)) return node.name.text;
  if (
    ts.isElementAccessExpression(node) &&
    ts.isStringLiteralLike(node.argumentExpression) &&
    COLUMNS.has(node.argumentExpression.text)
  )
    return node.argumentExpression.text;
  return null;
}

/** True when the read is an argument of readPin(…) or compared with null. */
function answered(node: ts.Node): boolean {
  let child: ts.Node = node;
  for (let up = node.parent; up !== undefined; child = up, up = up.parent) {
    if (ts.isCallExpression(up) && up.arguments.some((argument) => argument === child)) {
      const callee = up.expression;
      return ts.isIdentifier(callee) && callee.text === "readPin";
    }
    if (
      ts.isBinaryExpression(up) &&
      [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken].includes(
        up.operatorToken.kind,
      )
    ) {
      const other = up.left === child ? up.right : up.left;
      return other.kind === ts.SyntaxKind.NullKeyword;
    }
    if (!ts.isOptionalChain(up) && !ts.isParenthesizedExpression(up) && !ts.isNonNullExpression(up))
      return false;
  }
  return false;
}

/** The name a `??` fills: the right-most name of its left side. */
function filledName(expression: ts.Expression): string {
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  if (ts.isIdentifier(expression)) return expression.text;
  if (
    ts.isElementAccessExpression(expression) &&
    ts.isStringLiteralLike(expression.argumentExpression)
  )
    return expression.argumentExpression.text;
  return "";
}

export function pinFindings(files: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && LOOSE.test(node.text))
        findings.push({ file, line, what: `a pin's loose field \`${node.text}\` (one Pin value)` });
      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
        /precision/i.test(filledName(node.left))
      ) {
        const right = node.right;
        if (ts.isStringLiteralLike(right) || ts.isNoSubstitutionTemplateLiteral(right))
          findings.push({ file, line, what: `a precision guessed with ?? "${right.text}"` });
        else if (
          ts.isIdentifier(right) &&
          right.text === "NEW_PIN_PRECISION" &&
          !STARTING_CHOICE_AT.has(file)
        )
          findings.push({
            file,
            line,
            what: "a new pin's starting choice used outside the pin map",
          });
      }
      const column = columnRead(node);
      if (column !== null && /(?:^|\/)src\//.test(file) && !answered(node))
        findings.push({ file, line, what: `the \`${column}\` column read outside readPin` });
    });
  }
  return findings;
}

const files = walkFiles(["src", "e2e", "scripts"], {
  ext: ["ts", "tsx"],
  skip: /src[\\/]integrations[\\/]supabase[\\/]types\.ts$|scripts[\\/]conformance[\\/]pin\.test\.ts$/,
}).map((file) => file.split("\\").join("/"));

describe("a pin is whole or absent, its precision known (INC-958)", () => {
  it(
    "CF-PIN-1 no loose pin field, no guessed precision, no pin column read outside readPin",
    () => {
      expect(files.length).toBeGreaterThan(1000);
      expect(report(pinFindings(files))).toBe("");
      expect(files).toContain("src/features/posting/map/pin.ts");
    },
    TREE_SCAN_MS,
  );

  it("CF-PIN-2 a planted file's four breaches are named and its kept reads are not", () => {
    const dir = "node_modules/.cache/pin-census";
    mkdirSync(`${dir}/src`, { recursive: true });
    const file = `${dir}/src/planted.ts`;
    try {
      writeFileSync(
        file,
        [
          "declare const row: Record<string, unknown>;",
          "declare function readPin(a: unknown, b: unknown, c: unknown, w: string): unknown;",
          "declare const NEW_PIN_PRECISION: string;",
          "declare const view: { pin?: { precision?: string } };",
          'export const kept = readPin(row["pin_lat"], row.pin_lng, row["pin_precision"], "kept");',
          'export const present = row["pin_precision"] === null;',
          "export const pinLat = 1;",
          'export const guessed = view.pin?.precision ?? "exact";',
          "export const started = view.pin?.precision ?? NEW_PIN_PRECISION;",
          'export const loose = Number(row["pin_lng"]);',
          "",
        ].join("\n"),
      );
      expect(report(pinFindings([file]))).toBe(
        [
          `${file}:10 the \`pin_lng\` column read outside readPin`,
          `${file}:7 a pin's loose field \`pinLat\` (one Pin value)`,
          `${file}:8 a precision guessed with ?? "exact"`,
          `${file}:9 a new pin's starting choice used outside the pin map`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
