import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { entryOfList, readAllowlist, report, TREE_SCAN_MS, typedProgram } from "./kit";

/**
 * DEC-370 (INC-826) — a link target that comes from data reaches the page only through
 * src/lib/safe-href.ts. The census reads every sink under src/ with the type checker, so a
 * value is followed through state, props and builders:
 *   - a JSX `href`, a `.href =`, `location.assign/replace(…)`, `window.open(…)` and the `href`
 *     of a `links` entry in a route's head() carry a SafeHref (the module's brand), a string
 *     literal type, or null/undefined — anything else is a finding unless its line is in
 *     scripts/conformance/safe-href-allowlist.txt (key | reason | until);
 *   - the router's `href` option (`redirect({ href })`, `navigate({ href })`) is a
 *     `safeReturnPath(…)` call or a string literal — D20, the concern's navigation half;
 *   - `safeHref`'s `{ app: true }` is asked for only by the maps builders, and the brand is
 *     minted (`as SafeHref`) only inside the module.
 * The lint list RESTRICTED_SYNTAX.safeHref refuses a link built at its sink; this census judges
 * every value, built or named.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "safe-href-allowlist.txt");
const MODULE = "src/lib/safe-href.ts";
const APP_CALLER = "src/features/ad-page/maps-links.ts";
const ROUTER_CALLS = new Set(["redirect", "navigate"]);

type Finding = { file: string; line: number; what: string; key: string };

function isBrand(type: ts.Type, checker: ts.TypeChecker): boolean {
  return checker
    .getPropertiesOfType(type)
    .some((p) => p.declarations?.some((d) => relPath(d.getSourceFile().fileName) === MODULE));
}

/** A SafeHref, a string literal type, or a union of those with null/undefined. */
function isSafe(type: ts.Type, checker: ts.TypeChecker): boolean {
  if (type.isUnion() && !isBrand(type, checker))
    return type.types.every((member) => isSafe(member, checker));
  if (type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.StringLiteral))
    return true;
  return isBrand(type, checker);
}

function relPath(file: string): string {
  return relative(ROOT, file).split("\\").join("/");
}

function calleeName(call: ts.CallExpression): string | null {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return null;
}

/** The call an object literal is an argument of, through parentheses and conditionals. */
function argumentOf(node: ts.Node): ts.CallExpression | null {
  let current: ts.Node = node;
  while (ts.isParenthesizedExpression(current.parent) || ts.isConditionalExpression(current.parent))
    current = current.parent;
  const parent = current.parent;
  return ts.isCallExpression(parent) && parent.arguments.some((arg) => arg === current)
    ? parent
    : null;
}

/** Every finding in the program's src/ files (tests, the generated route tree and the
 *  database types aside), and how many sinks were read. */
export function census(program: ts.Program): { sinks: number; findings: Finding[] } {
  const checker = program.getTypeChecker();
  const findings: Finding[] = [];
  let sinks = 0;
  for (const source of program.getSourceFiles()) {
    const file = relPath(source.fileName);
    if (
      !file.startsWith("src/") ||
      /\.test\.tsx?$/.test(file) ||
      file === "src/routeTree.gen.ts" ||
      file.startsWith("src/integrations/supabase/")
    )
      continue;
    const lineOf = (node: ts.Node) =>
      source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
    const judge = (sink: string, value: ts.Expression) => {
      sinks += 1;
      if (isSafe(checker.getTypeAtLocation(value), checker)) return;
      const text = value.getText(source).replace(/\s+/g, " ");
      findings.push({
        file,
        line: lineOf(value),
        what: `${sink} takes ${text}, which is not a SafeHref (src/lib/safe-href.ts)`,
        key: `${file} ${sink} ${text}`,
      });
    };
    const visit = (node: ts.Node) => {
      if (ts.isJsxAttribute(node) && node.name.getText(source) === "href") {
        const init = node.initializer;
        if (init !== undefined && ts.isJsxExpression(init) && init.expression !== undefined)
          judge("href", init.expression);
        else sinks += 1;
      } else if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(node.left) &&
        (node.left.name.text === "href" || node.left.name.text === "location")
      ) {
        judge(`.${node.left.name.text} =`, node.right);
      } else if (ts.isCallExpression(node) && node.arguments.length > 0) {
        const callee = node.expression;
        if (
          ts.isPropertyAccessExpression(callee) &&
          ((/(^|\.)location$/.test(callee.expression.getText(source)) &&
            (callee.name.text === "assign" || callee.name.text === "replace")) ||
            (callee.expression.getText(source) === "window" && callee.name.text === "open"))
        )
          judge(`${callee.getText(source)}()`, node.arguments[0]);
        if (calleeName(node) === "safeHref" && node.arguments.length > 1 && file !== APP_CALLER)
          findings.push({
            file,
            line: lineOf(node),
            what: `safeHref's second argument is the maps builders' alone (${APP_CALLER})`,
            key: `${file} safeHref options`,
          });
      } else if (ts.isObjectLiteralExpression(node)) {
        for (const property of node.properties) {
          if (property.name?.getText(source) !== "href") continue;
          const call = argumentOf(node);
          const value = ts.isPropertyAssignment(property) ? property.initializer : null;
          if (call !== null && ROUTER_CALLS.has(calleeName(call) ?? "")) {
            sinks += 1;
            const ok =
              value !== null &&
              (ts.isStringLiteralLike(value) ||
                (ts.isCallExpression(value) && calleeName(value) === "safeReturnPath"));
            if (!ok)
              findings.push({
                file,
                line: lineOf(property),
                what: "the router's href option takes safeReturnPath(…) or a string literal (D20)",
                key: `${file} router href ${property.getText(source).replace(/\s+/g, " ")}`,
              });
          } else if (entryOfList(node, "links") && value !== null) judge("links href", value);
        }
      } else if (
        (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) &&
        node.type.getText(source) === "SafeHref" &&
        file !== MODULE
      ) {
        findings.push({
          file,
          line: lineOf(node),
          what: `a SafeHref is minted only inside ${MODULE}`,
          key: `${file} as SafeHref`,
        });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return { sinks, findings };
}

/** About two thirds of the 29 sinks at housekeeping turn 4: a census that reads (almost) no sink
 *  fails by its floor. */
const SINK_FLOOR = 20;

const PLANTED = [
  'import { redirect } from "@tanstack/react-router";',
  'import { safeHref, type SafeHref } from "@/lib/safe-href";',
  'import { safeReturnPath } from "@/lib/return-path";',
  "export function Planted({ id, a }: { id: string; a: HTMLAnchorElement }) {",
  "  const raw = `/l/${id}`;",
  "  a.href = raw;",
  "  window.location.assign(raw);",
  "  window.open(raw);",
  "  const minted = raw as SafeHref;",
  '  const app = safeHref("comgooglemaps://?q=x", { app: true });',
  "  const head = { links: [{ rel: 'canonical', href: raw }] };",
  "  const go = () => redirect({ href: raw });",
  "  const fine = safeHref(raw);",
  "  const back = () => redirect({ href: safeReturnPath(raw) });",
  "  return (",
  "    <>",
  "      <a href={raw}>x</a>",
  "      {fine !== null && <a href={fine}>x</a>}",
  '      <a href="/terms">x</a>',
  "      <a href={minted ?? app ?? undefined}>{String(head)}{String(go)}{String(back)}</a>",
  "    </>",
  "  );",
  "}",
  "",
].join("\n");

describe("a data-derived link reaches the page only through safe-href.ts (DEC-370)", () => {
  const tree = census(typedProgram(ROOT));
  const allowed = readAllowlist(
    ALLOWLIST,
    tree.findings.map((f) => f.key),
  );

  it(
    "CF-HREF-1 every href, .href, location and head-link sink takes a SafeHref or a literal, and the router's href a safeReturnPath",
    () => {
      expect(tree.sinks).toBeGreaterThan(SINK_FLOOR);
      expect(
        report(tree.findings.filter((f) => !allowed.has(f.key) && !/safeHref|minted/.test(f.what))),
      ).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-HREF-2 the app scheme is the maps builders' alone and the brand is minted only in the module", () => {
    expect(report(tree.findings.filter((f) => /safeHref's second|minted/.test(f.what)))).toBe("");
  });

  it(
    "CF-HREF-3 a planted bypass of each kind is found, and the mechanism's own forms are not",
    () => {
      const planted = census(
        typedProgram(ROOT, { path: "src/features/planted-safe-href.tsx", text: PLANTED }),
      );
      expect(
        planted.findings.map((f) => `${f.line} ${f.key.split(" ").slice(1).join(" ")}`),
      ).toEqual([
        "6 .href = raw",
        "7 window.location.assign() raw",
        "8 window.open() raw",
        "9 as SafeHref",
        "10 safeHref options",
        "11 links href raw",
        "12 router href href: raw",
        "17 href raw",
      ]);
    },
    TREE_SCAN_MS,
  );
});
