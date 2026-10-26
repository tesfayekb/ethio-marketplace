import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-914 (Foundations turn 34c) — A SESSION THE BROWSER COULD NOT READ IS UNKNOWN, NEVER SIGNED OUT.
 *
 * `currentSession()` (src/lib/supabase-door.ts) answers `{ session, failed }`; `failed` with its
 * error means the client did not download or its session read threw. A reader that takes only
 * `session` reads that failure as "signed out" — a signed-in visitor shown Sign in, sent to the
 * sign-in page, or answered as a visitor. The census reads every call in the browser tree: its
 * answer is destructured with `failed`, held in a name whose `.failed` the same function reads, or
 * handed to a `.then` callback that reads it so. Anything else is a finding.
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
