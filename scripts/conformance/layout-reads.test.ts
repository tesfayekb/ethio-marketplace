import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-940 (Foundations turn 34f) — A TEST READS A LAYOUT WHOLE, ONCE IT HAS STOPPED MOVING. Boxes
 * read one by one can straddle a change (AP-36's four retried passes: the Location box grew between
 * two reads when the still map's code arrived). The mechanism is layoutBoxes (e2e/helpers/ui.ts):
 * every box a test compares in one frame, after settled(page), returned only when two reads two
 * frames apart agree.
 *
 * The census reads every file under e2e/ for a call of `.boundingBox()`. Each is keyed by the test
 * it sits in (`<file>#<id>`: the title's leading id such as AP-36, else the whole title) or, outside
 * any test, by the function it sits in (`<file>#fn:<name>`). A key with a read carries an allowance
 * (`<key> | reason | until`) in layout-reads-allowlist.txt; the mechanism itself reads by
 * getBoundingClientRect inside one evaluate and is not a call of `.boundingBox()`.
 */

type Finding = { file: string; line: number; what: string };

const TEST_CALLS = new Set(["test", "it"]);

function titleOf(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  const name = ts.isIdentifier(callee)
    ? callee.text
    : ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression)
      ? callee.expression.text
      : undefined;
  if (name === undefined || !TEST_CALLS.has(name)) return undefined;
  if (
    ts.isPropertyAccessExpression(callee) &&
    !["only", "skip", "fixme", "fail"].includes(callee.name.text)
  )
    return undefined;
  const first = call.arguments[0];
  if (
    first !== undefined &&
    (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first))
  )
    return first.text;
  return undefined;
}

function keyOf(node: ts.Node, file: string): string {
  let fn: string | undefined;
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) {
    if (ts.isCallExpression(up)) {
      const title = titleOf(up);
      if (title !== undefined) {
        const id = /^([A-Z][A-Za-z0-9]*-\d+[a-z]?)\b/.exec(title);
        return `${file}#${id?.[1] ?? title}`;
      }
    }
    if (fn === undefined) {
      if (ts.isFunctionDeclaration(up) && up.name !== undefined) fn = up.name.text;
      else if (
        (ts.isArrowFunction(up) || ts.isFunctionExpression(up)) &&
        ts.isVariableDeclaration(up.parent) &&
        ts.isIdentifier(up.parent.name)
      )
        fn = up.parent.name.text;
    }
  }
  return `${file}#fn:${fn ?? "(top level)"}`;
}

export function layoutReadsCensus(files: string[]): { keys: string[]; findings: Finding[] } {
  const findings: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "boundingBox"
      )
        findings.push({
          file: keyOf(node, file),
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: "reads a box by itself; compare boxes through layoutBoxes (e2e/helpers/ui.ts)",
        });
    });
  }
  return { keys: [...new Set(findings.map((hit) => hit.file))].sort(), findings };
}

const ALLOWLIST = "scripts/conformance/layout-reads-allowlist.txt";
const { keys, findings } = layoutReadsCensus(walkFiles(["e2e"], { ext: ["ts"] }));
const allowances = readAllowlist(ALLOWLIST, keys);

describe("a test reads a layout whole, once it has stopped moving (INC-940)", () => {
  it(
    "BX-1 every box read in e2e/ is a layoutBoxes read, or its test has a live allowance",
    () => {
      console.log(
        `[BX-1] tests and helpers reading boxes by themselves: ${keys.length}; reads: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
      // The file moved onto the mechanism stays on it.
      expect(keys.filter((key) => key.startsWith("e2e/ad-page.spec.ts#"))).toEqual([]);
      expect(readFileSync("e2e/helpers/ui.ts", "utf8")).toMatch(
        /export async function layoutBoxes</,
      );
    },
    TREE_SCAN_MS,
  );

  it("BX-2 the census sees a planted read in a test, in a describe's helper and at the top, and passes layoutBoxes", () => {
    const dir = "node_modules/.cache/layout-reads";
    mkdirSync(dir, { recursive: true });
    const spec = `${dir}/bx.spec.ts`;
    const good = `${dir}/bx-good.spec.ts`;
    try {
      writeFileSync(
        spec,
        'import { test } from "@playwright/test";\nconst top = async (l: any) => l.boundingBox();\ntest.describe("d", () => {\n  const box = async (l: any) => l.boundingBox();\n  test("BX-9 a planted test", async ({ page }) => {\n    await page.getByTestId("a").boundingBox();\n    await box(page);\n  });\n  test.skip("a titled test without an id", async ({ page }) => {\n    await page.getByTestId("b").boundingBox();\n  });\n});\nvoid top;\n',
      );
      writeFileSync(
        good,
        'import { test } from "@playwright/test";\nimport { layoutBoxes } from "../../../e2e/helpers/ui";\ntest("BX-8 good", async ({ page }) => {\n  await layoutBoxes({ a: page.getByTestId("a"), b: page.getByTestId("b") });\n});\n',
      );
      const result = layoutReadsCensus([spec, good]);
      expect(result.keys).toEqual(
        [
          `${spec}#BX-9`,
          `${spec}#a titled test without an id`,
          `${spec}#fn:box`,
          `${spec}#fn:top`,
        ].sort(),
      );
      expect(result.findings.map((hit) => `${hit.file}:${hit.line}`).sort()).toEqual(
        [
          `${spec}#BX-9:6`,
          `${spec}#a titled test without an id:10`,
          `${spec}#fn:box:4`,
          `${spec}#fn:top:2`,
        ].sort(),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
