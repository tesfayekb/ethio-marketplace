import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * CF-AUTH-1 (cursor bundle 5, DEC-435) — A PASSWORD IS SET ONLY WITH THE CURRENT ONE, AND THE BROWSER
 * LINKS OR UNLINKS NO SIGN-IN METHOD.
 *
 * `auth.updateUser({ password })` without `current_password` changes a password on the strength of a
 * signed-in session alone — a stolen session then owns the account. Every call in the browser tree
 * that sets a `password` also sends `current_password`, unless its allowlist line
 * (`<file> <function> | reason | until`) says why: a recovery session (the reset link) sets a password
 * without the current one, and the server exempts it. Linking and unlinking a provider from the
 * browser (`linkIdentity`, `unlinkIdentity`) are gone with the Settings buttons (DEC-435); no call
 * of either is allowed, and there is no allowlist for them.
 */

type Finding = { file: string; line: number; key: string; what: string };

const ALLOWLIST = "scripts/conformance/auth-credentials-allowlist.txt";

/** The function a node sits in, as `session-reads.test.ts` names it. */
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

function propertyNames(object: ts.ObjectLiteralExpression): Set<string> {
  const names = new Set<string>();
  for (const property of object.properties) {
    if (ts.isShorthandPropertyAssignment(property)) names.add(property.name.text);
    else if (
      (ts.isPropertyAssignment(property) || ts.isMethodDeclaration(property)) &&
      (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
    )
      names.add(property.name.text);
  }
  return names;
}

/** Every credential call that breaks the law, with its place and its allowlist key. */
export function credentialCensus(files: string[]): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return;
      const callee = node.expression.name.text;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (callee === "linkIdentity" || callee === "unlinkIdentity") {
        found.push({
          file,
          line,
          key: `${file} ${callee}`,
          what: `calls ${callee}() — linking and unlinking a sign-in method is not offered by the browser (DEC-435)`,
        });
        return;
      }
      if (callee !== "updateUser") return;
      const [attributes] = node.arguments;
      // An argument that is not an object literal cannot be read: name it, never pass it quietly.
      if (attributes === undefined || !ts.isObjectLiteralExpression(attributes)) {
        found.push({
          file,
          line,
          key: `${file} ${functionNameOf(node, source)}`,
          what: "calls updateUser() with attributes the census cannot read — pass an object literal",
        });
        return;
      }
      const names = propertyNames(attributes);
      if (names.has("password") && !names.has("current_password"))
        found.push({
          file,
          line,
          key: `${file} ${functionNameOf(node, source)}`,
          what: "sets a password without current_password — send the current one with it",
        });
    });
  }
  return found;
}

const browser = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:server|integrations|routes[\\/]api)(?:[\\/]|$)/,
});

describe("a password is set only with the current one (CF-AUTH-1)", () => {
  it(
    "CF-AUTH-1 every password-setting updateUser() sends current_password but its allowlist lines; no linkIdentity or unlinkIdentity",
    () => {
      const found = credentialCensus(browser);
      const allowed = readAllowlist(
        ALLOWLIST,
        found.filter(({ what }) => what.startsWith("sets a password")).map(({ key }) => key),
      );
      const findings = found.filter(({ key, what }) => {
        // Only the password rule has allowlist lines.
        return !(what.startsWith("sets a password") && allowed.has(key));
      });
      console.log(`[auth-credentials] files read: ${browser.length}; findings: ${findings.length}`);
      expect(browser.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-AUTH-2 the census names planted calls and passes the full one", () => {
    const dir = "node_modules/.cache/auth-credentials";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/ac-calls.ts`;
    try {
      writeFileSync(
        file,
        [
          "declare const auth: any;",
          "export async function bare(password: string) {",
          "  return auth.updateUser({ password });",
          "}",
          "export async function full(password: string, current_password: string) {",
          "  return auth.updateUser({ password, current_password });",
          "}",
          "export async function email(email: string) {",
          "  return auth.updateUser({ email });",
          "}",
          "export async function linked() {",
          '  return auth.linkIdentity({ provider: "google" });',
          "}",
          "export async function unlinked(identity: unknown) {",
          "  return auth.unlinkIdentity(identity);",
          "}",
          "export async function opaque(attributes: object) {",
          "  return auth.updateUser(attributes);",
          "}",
          "",
        ].join("\n"),
      );
      expect(credentialCensus([file]).map(({ line, key }) => ({ line, key }))).toEqual([
        { line: 3, key: `${file} bare` },
        { line: 12, key: `${file} linkIdentity` },
        { line: 15, key: `${file} unlinkIdentity` },
        { line: 18, key: `${file} opaque` },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
