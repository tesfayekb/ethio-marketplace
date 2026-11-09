import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-1091 (P-2 (c) c3) — A TEST SELECTS ALL WITH THE CHORD EVERY MACHINE KNOWS.
 * `Control+A` selects a field's text on Linux and Windows only; on macOS it
 * moves the caret to the line's start, so the text typed next lands beside the
 * old value and the test fails on the operator's machine alone. Playwright's
 * `ControlOrMeta+A` is the one chord.
 *
 * The census reads every file under e2e/ for a string literal that names the
 * bare chord (`Control+A`, `Control+a`, `Control+KeyA`). A file with one
 * carries an allowance (`<file> | reason | until`) in select-all-allowlist.txt.
 */

type Finding = { file: string; line: number; what: string };

const BARE_SELECT_ALL = /^Control\+(?:a|A|KeyA)$/;

export function selectAllCensus(files: string[]): { keys: string[]; findings: Finding[] } {
  const findings: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
        BARE_SELECT_ALL.test(node.text)
      )
        findings.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: `presses ${node.text}; select all with ControlOrMeta+A`,
        });
    });
  }
  return { keys: [...new Set(findings.map((hit) => hit.file))].sort(), findings };
}

const ALLOWLIST = "scripts/conformance/select-all-allowlist.txt";

describe("a test selects all with the chord every machine knows (INC-1091)", () => {
  it(
    "SAC-1 no file under e2e/ presses the bare Control+A; the census sees a planted one and passes ControlOrMeta+A",
    () => {
      const dir = "node_modules/.cache/select-all";
      mkdirSync(dir, { recursive: true });
      const spec = `${dir}/sac.spec.ts`;
      try {
        writeFileSync(
          spec,
          'import { test } from "@playwright/test";\ntest("SAC-9 planted", async ({ page }) => {\n  await page.keyboard.press("Control+A");\n  await page.getByTestId("a").press(`Control+a`);\n  await page.keyboard.press("Control+KeyA");\n  await page.keyboard.press("ControlOrMeta+A");\n  await page.keyboard.press("Control+Enter");\n});\n',
        );
        expect(selectAllCensus([spec]).findings.map((hit) => hit.line)).toEqual([3, 4, 5]);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }

      const { keys, findings } = selectAllCensus(walkFiles(["e2e"], { ext: ["ts"] }));
      const allowances = readAllowlist(ALLOWLIST, keys);
      console.log(
        `[SAC-1] files pressing the bare chord: ${keys.length}; presses: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
    },
    TREE_SCAN_MS,
  );
});
