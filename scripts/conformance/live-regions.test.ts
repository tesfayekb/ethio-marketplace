import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-929's class (Foundations turn C3; S446, ODN-2, FN-1) — AN ALWAYS-DRAWN LIVE REGION CARRIES
 * aria-live AND NO ROLE. A role of status or alert brings its own live region, so a region drawn
 * before its words arrive (FadingNotice, the shell's on-demand notice) that also carries a role
 * double-speaks in some readers, or adds a second status to the page while it is quiet.
 *
 * The census reads every element in src/ (tests aside) that carries `aria-live`. An element is
 * DRAWN ALWAYS when nothing between it and the function that returns it is a condition — no `?:`,
 * `&&`, `||` or `??`, no `if` around the `return` that draws it — and it is not handed to another
 * component as a prop's value (DataTable's `loadingState` is drawn by DataTable, while loading). It
 * WAITS FOR ITS WORDS when it draws them under a condition (`{shown ? text : ""}`, `{shown && text}`).
 * An element drawn always that waits for its words is INC-929's always-drawn live region: it carries
 * no `role` while it is quiet — a role given only with its words (`role={shown ? liveRole : undefined}`,
 * ActionMessage, AMSG-2) arrives with them. Every other region arrives with its words (a loading caption, the spinner, the
 * impersonation banner), and its role is its own. A recorded exception is a line in live-regions-allowlist.txt
 * keyed `<file>:<line>` | reason | until.
 */

type Finding = { file: string; line: number; what: string };
export type LiveRegion = {
  file: string;
  line: number;
  always: boolean;
  waits: boolean;
  role: boolean;
};

function attributeOf(element: ts.JsxOpeningLikeElement, name: string): ts.JsxAttribute | undefined {
  return element.attributes.properties.find(
    (property): property is ts.JsxAttribute =>
      ts.isJsxAttribute(property) && property.name.getText() === name,
  );
}

/**
 * True when the region carries its role while it is quiet. A role given only with its words
 * (`role={shown ? liveRole : undefined}`, ActionMessage — AMSG-2) is absent while it waits.
 */
function roleWhileQuiet(element: ts.JsxOpeningLikeElement): boolean {
  const role = attributeOf(element, "role");
  if (role === undefined) return false;
  const value = role.initializer;
  if (value === undefined || !ts.isJsxExpression(value) || value.expression === undefined)
    return true;
  const expression = value.expression;
  if (!ts.isConditionalExpression(expression)) return true;
  const absent = (branch: ts.Expression) => ts.isIdentifier(branch) && branch.text === "undefined";
  return !(absent(expression.whenTrue) || absent(expression.whenFalse));
}

/** True when a condition stands between the element and the function that draws it. */
function drawnUnderCondition(node: ts.Node): boolean {
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) {
    if (ts.isFunctionLike(up)) return false;
    if (ts.isConditionalExpression(up) && up.condition !== node) return true;
    if (ts.isIfStatement(up)) return true;
    if (ts.isJsxAttribute(up)) return true;
    if (
      ts.isBinaryExpression(up) &&
      [
        ts.SyntaxKind.AmpersandAmpersandToken,
        ts.SyntaxKind.BarBarToken,
        ts.SyntaxKind.QuestionQuestionToken,
      ].includes(up.operatorToken.kind)
    )
      return true;
    node = up;
  }
  return false;
}

/** True when the element draws some of its words under a condition (`?:`, `&&`, `||`). */
function waitsForWords(element: ts.JsxElement | ts.JsxSelfClosingElement): boolean {
  if (ts.isJsxSelfClosingElement(element)) return false;
  let waits = false;
  const visit = (node: ts.Node) => {
    if (ts.isFunctionLike(node)) return;
    if (
      ts.isJsxExpression(node) &&
      node.expression !== undefined &&
      (ts.isConditionalExpression(node.expression) ||
        (ts.isBinaryExpression(node.expression) &&
          [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken].includes(
            node.expression.operatorToken.kind,
          )))
    )
      waits = true;
    ts.forEachChild(node, visit);
  };
  element.children.forEach(visit);
  return waits;
}

export function liveRegions(files: string[]): LiveRegion[] {
  const regions: LiveRegion[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isJsxOpeningElement(node) && !ts.isJsxSelfClosingElement(node)) return;
      if (attributeOf(node, "aria-live") === undefined) return;
      const element = ts.isJsxOpeningElement(node) ? node.parent : node;
      regions.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        always: !drawnUnderCondition(element),
        waits: waitsForWords(element),
        role: roleWhileQuiet(node),
      });
    });
  }
  return regions;
}

export function liveRegionFindings(regions: LiveRegion[]): Finding[] {
  return regions
    .filter((region) => region.always && region.waits && region.role)
    .map(({ file, line }) => ({
      file,
      line,
      what: "an always-drawn live region that waits for its words carries a role; aria-live alone (INC-929)",
    }));
}

const ALLOWLIST = "scripts/conformance/live-regions-allowlist.txt";
const files = walkFiles(["src"], { ext: ["tsx"], skipTests: true });
const regions = liveRegions(files);
const findings = liveRegionFindings(regions);
const allowances = readAllowlist(
  ALLOWLIST,
  findings.map((hit) => `${hit.file}:${hit.line}`),
);

describe("an always-drawn live region carries aria-live and no role (INC-929)", () => {
  it(
    "LR-C1 every element in src/ with aria-live that is drawn before its words has no role, or a recorded exception",
    () => {
      const always = regions.filter((region) => region.always && region.waits);
      console.log(
        `[LR-C1] files read: ${files.length}; aria-live elements: ${regions.length}; drawn always, waiting for words: ${always.length}; with a role: ${findings.length}; allowlist: ${allowances.size}`,
      );
      for (const region of regions)
        console.log(
          `[LR-C1] ${region.file}:${region.line} ${region.always ? "always" : "under a condition"}${region.waits ? ", waits for its words" : ""}${region.role ? ", role" : ""}`,
        );
      expect(files.length).toBeGreaterThan(250);
      expect(report(findings.filter((hit) => !allowances.has(`${hit.file}:${hit.line}`)))).toBe("");
      // FN-1's and ODN-2's consumers are read, drawn always, and carry no role.
      for (const pinned of [
        "src/components/ui/fading-notice.tsx",
        "src/components/shell/on-demand-notice.tsx",
      ])
        expect(
          regions
            .filter((region) => region.file === pinned)
            .map((region) => region.always && region.waits && !region.role),
        ).toContain(true);
    },
    TREE_SCAN_MS,
  );

  it("LR-C2 planted: a region drawn before its words with a role fails; aria-live alone, a region drawn with its words, under a condition or handed to a table passes", () => {
    const dir = "node_modules/.cache/live-regions";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/bad.tsx`;
    const good = `${dir}/good.tsx`;
    try {
      writeFileSync(
        bad,
        'export function A({ t, shown }: { t: string; shown: boolean }) {\n  return <p role="status" aria-live="polite">{shown ? t : ""}</p>;\n}\nexport const B = ({ t }: { t: string }) => (\n  <div>\n    <span aria-live="polite" role={"alert"}>\n      <b>{t && t}</b>\n    </span>\n  </div>\n);\n',
      );
      writeFileSync(
        good,
        'export function C({ t, busy }: { t: string; busy: boolean }) {\n  if (busy) return <p role="status" aria-live="polite">{busy ? t : ""}</p>;\n  return (\n    <div>\n      <p aria-live="polite">{busy ? t : ""}</p>\n      {busy && <p role="status" aria-live="polite">{busy ? t : ""}</p>}\n      {busy ? <p role="alert" aria-live="assertive">{t || t}</p> : null}\n      <p role="status" aria-live="polite">{t}</p>\n      <p role={busy ? "status" : undefined} aria-live="polite">{busy ? t : ""}</p>\n      <T loadingState={<p role="status" aria-live="polite">{busy ? t : ""}</p>} />\n    </div>\n  );\n}\n',
      );
      expect(report(liveRegionFindings(liveRegions([bad, good])))).toBe(
        [
          `${bad}:2 an always-drawn live region that waits for its words carries a role; aria-live alone (INC-929)`,
          `${bad}:6 an always-drawn live region that waits for its words carries a role; aria-live alone (INC-929)`,
        ].join("\n"),
      );
      expect(
        liveRegions([good]).map(
          (region) => `${region.line} ${region.always} ${region.waits} ${region.role}`,
        ),
      ).toEqual([
        "2 false true true",
        "5 true true false",
        "6 false true true",
        "7 false true true",
        "8 true false true",
        "9 true true false",
        "10 false true true",
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
