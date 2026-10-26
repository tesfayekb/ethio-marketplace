import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-914 (Foundations turn 34c) — A SESSION THE BROWSER COULD NOT READ IS UNKNOWN, NEVER SIGNED OUT.
 *
 * `currentSession()` (src/lib/supabase-door.ts) answers `{ session, failed }`; `failed` with its
 * error means the client did not download or its session read threw. A reader that takes only
 * `session` reads that failure as "signed out" — a signed-in visitor shown Sign in, sent to the
 * sign-in page, or answered as a visitor. The census reads every call in the browser tree: its
 * answer is destructured with `failed`, held in a name whose `.failed` the same function reads, or
 * handed to a `.then` callback that reads it so. Anything else is a finding.
 *
 * Turn 34c-5 (INC-933) — and nothing reads the session around the door: a `.auth.getSession()`
 * or `.auth.getUser()` call in the browser tree (src/ but the server's code, its API routes and
 * the generated client) takes the client's answer without the door's `failed`, so it is a
 * finding unless its allowlist line (`<file> <function> | reason | until`) says why.
 */

type Finding = { file: string; line: number; what: string };

const CALLEE = "currentSession";

/** The function (or file) a node sits in. */
function scopeOf(node: ts.Node): ts.Node {
  let up: ts.Node = node;
  while (up.parent !== undefined && !ts.isFunctionLike(up)) up = up.parent;
  return up;
}

/** A binding reads `failed`: `{ failed }`, `{ failed: f }`, or a name whose `.failed` its scope reads. */
function bindingReadsFailed(name: ts.BindingName, scope: ts.Node, source: ts.SourceFile): boolean {
  if (ts.isObjectBindingPattern(name))
    return name.elements.some(
      (element) => (element.propertyName ?? element.name).getText(source) === "failed",
    );
  if (ts.isIdentifier(name)) {
    const held = name.text;
    let read = false;
    const look = (node: ts.Node) => {
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === held &&
        node.name.text === "failed"
      )
        read = true;
      if (!read) ts.forEachChild(node, look);
    };
    look(scope);
    return read;
  }
  return false;
}

export function sessionReadCensus(files: string[]): { calls: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let calls = 0;
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== CALLEE
      )
        return;
      calls += 1;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      let answer: ts.Node = node;
      if (ts.isAwaitExpression(answer.parent)) answer = answer.parent;
      const parent = answer.parent;
      let reads = false;
      if (ts.isVariableDeclaration(parent) && parent.initializer === answer)
        reads = bindingReadsFailed(parent.name, scopeOf(parent), source);
      else if (
        ts.isPropertyAccessExpression(parent) &&
        parent.name.text === "then" &&
        ts.isCallExpression(parent.parent)
      ) {
        const callback = parent.parent.arguments[0];
        const first =
          callback !== undefined &&
          (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))
            ? callback.parameters[0]
            : undefined;
        if (first !== undefined && callback !== undefined)
          reads = bindingReadsFailed(first.name, callback, source);
      }
      if (!reads)
        findings.push({
          file,
          line,
          what: "reads the session without its `failed` (a failed read is unknown, never signed out)",
        });
    });
  }
  return { calls, findings };
}

const domain = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).filter(
  (file) => file !== "src/lib/supabase-door.ts",
);

/** The client's own session and user reads. */
const AROUND = new Set(["getSession", "getUser"]);

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

/** Every `<client>.auth.getSession()` / `<client>.auth.getUser()` call: its place and its key. */
export function sessionBypassCensus(
  files: string[],
): Array<{ file: string; line: number; key: string }> {
  const found: Array<{ file: string; line: number; key: string }> = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return;
      const callee = node.expression;
      if (!AROUND.has(callee.name.text)) return;
      if (
        !ts.isPropertyAccessExpression(callee.expression) ||
        callee.expression.name.text !== "auth"
      )
        return;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      found.push({ file, line, key: `${file} ${functionNameOf(node, source)}` });
    });
  }
  return found;
}

const BYPASS_ALLOWLIST = "scripts/conformance/session-reads-allowlist.txt";

const browser = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:server|integrations|routes[\\/]api)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts");

describe("a session that could not be read is unknown, never signed out (INC-914)", () => {
  it(
    "CF-SESSION-1 every reader of currentSession() reads its `failed`",
    () => {
      const { calls, findings } = sessionReadCensus(domain);
      console.log(
        `[session-reads] currentSession() calls: ${calls}; without failed: ${findings.length}`,
      );
      expect(calls).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "CF-SESSION-3 nothing in the browser tree reads the session or the user around the door but its allowlist lines (INC-933)",
    () => {
      const found = sessionBypassCensus(browser);
      const allowed = readAllowlist(BYPASS_ALLOWLIST, new Set(found.map(({ key }) => key)));
      const findings = found
        .filter(({ key }) => !allowed.has(key))
        .map(({ file, line }) => ({
          file,
          line,
          what: "reads the session around the door — read currentSession() and its `failed`",
        }));
      console.log(
        `[session-reads] files read: ${browser.length}; reads around the door: ${found.length}`,
      );
      expect(browser.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-SESSION-4 the bypass census names planted reads around the door and passes the door's read", () => {
    const dir = "node_modules/.cache/session-bypass";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/sb-reads.ts`;
    try {
      writeFileSync(
        file,
        [
          'import { supabase } from "@/integrations/supabase/client";',
          'import { currentSession } from "@/lib/supabase-door";',
          "export async function a() {",
          "  return (await supabase.auth.getSession()).data.session;",
          "}",
          "export const b = async (client: typeof supabase) => client.auth.getUser();",
          "export async function c() {",
          "  const read = await currentSession();",
          "  await supabase.auth.getUserIdentities();",
          "  return read.failed ? null : read.session;",
          "}",
          "",
        ].join("\n"),
      );
      expect(sessionBypassCensus([file])).toEqual([
        { file, line: 4, key: `${file} a` },
        { file, line: 6, key: `${file} b` },
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-SESSION-2 the census names a planted session-only reader and passes the three ways to read `failed`", () => {
    const dir = "node_modules/.cache/session-reads";
    mkdirSync(dir, { recursive: true });
    const files = {
      destructured: `${dir}/sr-destructured.ts`,
      held: `${dir}/sr-held.ts`,
      then: `${dir}/sr-then.ts`,
      good: `${dir}/sr-good.ts`,
    };
    const head = 'import { currentSession } from "@/lib/supabase-door";\n';
    try {
      writeFileSync(
        files.destructured,
        `${head}export async function a() {\n  const { session } = await currentSession();\n  return session;\n}\n`,
      );
      writeFileSync(
        files.held,
        `${head}export async function b() {\n  const read = await currentSession();\n  return read.session;\n}\n`,
      );
      writeFileSync(
        files.then,
        `${head}export function c() {\n  void currentSession().then(({ session }) => session);\n}\n`,
      );
      writeFileSync(
        files.good,
        `${head}export async function d() {\n  const { session, failed } = await currentSession();\n  const read = await currentSession();\n  if (read.failed) return null;\n  void currentSession().then((answer) => (answer.failed ? null : answer.session));\n  return failed ? null : session;\n}\n`,
      );
      const { calls, findings } = sessionReadCensus(Object.values(files));
      expect(calls).toBe(6);
      expect(report(findings)).toBe(
        [
          `${files.destructured}:3 reads the session without its \`failed\` (a failed read is unknown, never signed out)`,
          `${files.held}:3 reads the session without its \`failed\` (a failed read is unknown, never signed out)`,
          `${files.then}:3 reads the session without its \`failed\` (a failed read is unknown, never signed out)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
