import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, visitTs, walkFiles } from "./kit";

/**
 * INC-915 (Foundations turn 34, ruling 3): an auth action's answer is read where it is called.
 * Every exported async action of src/features/auth/auth-service.ts answers its failure as a value
 * ({ ok: false, … }) and never rejects (ASC-1), so a call whose answer is thrown away — `await
 * requestPasswordReset(email);` as a statement, a bare or `void` call — can show success for an
 * action that failed or never left the browser (F4). The census reads every call of those actions
 * under src/ (tests excepted) and reports each one whose answer is discarded; a deliberate one
 * carries an allowance (`file:action | reason | until`) in auth-answers-allowlist.txt.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SERVICE = join(ROOT, "src", "features", "auth", "auth-service.ts");
const ALLOWLIST = join(dirname(fileURLToPath(import.meta.url)), "auth-answers-allowlist.txt");

type Finding = { file: string; line: number; what: string };

/** The exported async actions of the auth service, by name. */
export function authActions(serviceText: string): string[] {
  return [...codeOf(serviceText).matchAll(/^export\s+async\s+function\s+([A-Za-z0-9_]+)/gm)].map(
    (match) => match[1] ?? "",
  );
}

/** The action a call names (`signOut()` or `authService.signOut()`), or null. */
function calledAction(call: ts.CallExpression, actions: Set<string>): string | null {
  const callee = call.expression;
  if (ts.isIdentifier(callee) && actions.has(callee.text)) return callee.text;
  if (ts.isPropertyAccessExpression(callee) && actions.has(callee.name.text))
    return callee.name.text;
  return null;
}

/** Every call of an action under `roots` whose answer is discarded. */
export function census(
  roots: string[],
  actions: string[],
): { scanned: number; findings: Finding[] } {
  const names = new Set(actions);
  const files = walkFiles(roots, { ext: ["ts", "tsx"], skipTests: true }).filter(
    (file) => file !== SERVICE,
  );
  const findings: Finding[] = [];
  for (const file of files) {
    const rel = relative(ROOT, file).split("\\").join("/");
    visitTs(file, (node, source) => {
      if (!ts.isExpressionStatement(node)) return;
      let expression = node.expression;
      if (ts.isVoidExpression(expression)) expression = expression.expression;
      if (ts.isAwaitExpression(expression)) expression = expression.expression;
      if (!ts.isCallExpression(expression)) return;
      const action = calledAction(expression, names);
      if (action === null) return;
      findings.push({
        file: rel,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `${action}() — its answer is discarded`,
      });
    });
  }
  return { scanned: files.length, findings };
}

const tempRoots: string[] = [];
afterEach(() => {
  while (tempRoots.length) rmSync(tempRoots.pop()!, { recursive: true, force: true });
});

describe("an auth action's answer is read where it is called (INC-915)", () => {
  it("AAN-1 no call under src/ discards an auth action's answer", () => {
    const actions = authActions(readFileSync(SERVICE, "utf8"));
    expect(actions.length).toBeGreaterThanOrEqual(15);
    const { scanned, findings } = census([join(ROOT, "src")], actions);
    expect(scanned).toBeGreaterThanOrEqual(100);
    const allowances = readAllowlist(
      ALLOWLIST,
      findings.map((finding) => `${finding.file}:${finding.what.split("(")[0]}`),
    );
    const breaches = findings.filter(
      (finding) => !allowances.has(`${finding.file}:${finding.what.split("(")[0]}`),
    );
    console.log(`[auth-answers] scanned: ${scanned}, breaches: ${breaches.length}`);
    expect(report(breaches)).toBe("");
  });

  it("AAN-2 a planted call that throws its answer away is reported, in every spelling", () => {
    const temp = mkdtempSync(join(tmpdir(), "auth-answers-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.tsx"),
      [
        "async function a() {",
        "  await requestPasswordReset(email);",
        "  void signOut();",
        "  authService.signOut();",
        "  const kept = await signInWithPassword(c);",
        "  if (!kept.ok) return;",
        "}",
        "",
      ].join("\n"),
    );
    const { findings } = census([temp], ["requestPasswordReset", "signOut", "signInWithPassword"]);
    expect(findings.map((finding) => `${finding.line} ${finding.what}`)).toEqual([
      "2 requestPasswordReset() — its answer is discarded",
      "3 signOut() — its answer is discarded",
      "4 signOut() — its answer is discarded",
    ]);
  });
});
