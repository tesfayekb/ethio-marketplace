import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * DEC-279 (Foundations turn C2) — A SIGN-OUT LANDS ON ONE PAGE, NAMED ONCE: `SIGN_OUT_LANDING`
 * (src/lib/sign-out-landing.ts). The census reads the browser tree (src/, tests aside) for the three
 * forms that send a person to the landing page with a literal "/":
 * - `location.replace("/")` / `location.assign("/")` (the hard reset's full load, DEC-268/DEC-271);
 * - a call handed `{ to: "/", replace: true }` (`navigate`, after the purge or a gated page's kick);
 * - `routesById["/"]` (the page the shell fetches ahead, DEC-279).
 * Each is a finding unless its allowlist line (`<file> <function> | reason | until`) says why.
 */

type Found = { file: string; line: number; key: string; what: string };

const ALLOWLIST = "scripts/conformance/sign-out-landing-allowlist.txt";

/** The name of the function a node sits in (its declaration, or the variable an arrow is held in). */
function functionNameOf(node: ts.Node, source: ts.SourceFile): string {
  for (let up = node.parent; up !== undefined; up = up.parent) {
    if ((ts.isFunctionDeclaration(up) || ts.isMethodDeclaration(up)) && up.name !== undefined)
      return up.name.getText(source);
    if (
      ts.isVariableDeclaration(up) &&
      ts.isIdentifier(up.name) &&
      up.initializer !== undefined &&
      (ts.isArrowFunction(up.initializer) || ts.isFunctionExpression(up.initializer))
    )
      return up.name.text;
  }
  return "(module)";
}

const isRoot = (node: ts.Node | undefined) =>
  node !== undefined && ts.isStringLiteralLike(node) && node.text === "/";

/** `{ to: "/", replace: true }` — the object literal's own properties, read by name. */
function replacesToRoot(node: ts.Node): boolean {
  if (!ts.isObjectLiteralExpression(node)) return false;
  let to = false;
  let replace = false;
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = property.name.getText();
    if (name === "to" && isRoot(property.initializer)) to = true;
    if (name === "replace" && property.initializer.kind === ts.SyntaxKind.TrueKeyword)
      replace = true;
  }
  return to && replace;
}

export function signOutLandingCensus(files: string[]): Found[] {
  const found: Found[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const at = (what: string) =>
        found.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          key: `${file} ${functionNameOf(node, source)}`,
          what,
        });
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        if (
          ts.isPropertyAccessExpression(callee) &&
          (callee.name.text === "replace" || callee.name.text === "assign") &&
          /(?:^|\.)location$/.test(callee.expression.getText(source)) &&
          isRoot(node.arguments[0])
        )
          at(`location.${callee.name.text}("/") — land on SIGN_OUT_LANDING`);
        else if (node.arguments.some(replacesToRoot))
          at('{ to: "/", replace: true } — land on SIGN_OUT_LANDING');
      } else if (
        ts.isElementAccessExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "routesById" &&
        isRoot(node.argumentExpression)
      )
        at('routesById["/"] — fetch routesById[SIGN_OUT_LANDING] ahead');
    });
  }
  return found;
}

const browser = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:server|integrations|routes[\\/]api)(?:[\\/]|$)/,
});

describe("a sign-out lands on one page, named once (DEC-279)", () => {
  it(
    'CF-SOL-1 no literal "/" in a location.replace/assign, a { to, replace: true } call or the page fetched ahead, but its allowlist lines',
    () => {
      const found = signOutLandingCensus(browser);
      const allowed = readAllowlist(ALLOWLIST, new Set(found.map(({ key }) => key)));
      const findings = found.filter(({ key }) => !allowed.has(key));
      console.log(
        `[sign-out-landing] files read: ${browser.length}; literal landings: ${found.length}; allowed: ${allowed.size}`,
      );
      expect(browser.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
      // The page fetched ahead is the landing itself.
      expect(readFileSync("src/components/app-shell.tsx", "utf8")).toContain(
        "routesById[SIGN_OUT_LANDING]",
      );
    },
    TREE_SCAN_MS,
  );

  it("CF-SOL-2 the census names each planted form and passes the constant", () => {
    const dir = "node_modules/.cache/sign-out-landing";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/sol-planted.ts`;
    try {
      writeFileSync(
        file,
        [
          'import { SIGN_OUT_LANDING } from "@/lib/sign-out-landing";',
          "declare const navigate: (to: { to: string; replace?: boolean }) => Promise<void>;",
          "declare const router: { routesById: Record<string, unknown> };",
          "export function hard() {",
          '  window.location.replace("/");',
          "}",
          "export const assign = () => location.assign('/');",
          "export async function purge() {",
          '  await navigate({ to: "/", replace: true });',
          "}",
          'export const ahead = () => router.routesById["/"];',
          "export async function good() {",
          "  window.location.replace(SIGN_OUT_LANDING);",
          "  await navigate({ to: SIGN_OUT_LANDING, replace: true });",
          '  await navigate({ to: "/", replace: false });',
          '  await navigate({ to: "/auth", replace: true });',
          "  return router.routesById[SIGN_OUT_LANDING];",
          "}",
          "",
        ].join("\n"),
      );
      expect(signOutLandingCensus([file]).map(({ line, key }) => ({ line, key }))).toEqual([
        { line: 5, key: `${file} hard` },
        { line: 7, key: `${file} assign` },
        { line: 9, key: `${file} purge` },
        { line: 11, key: `${file} ahead` },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
