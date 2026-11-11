import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * Housekeeping turn 2 (INC-1065, INC-1049, INC-1100; ruling 1 Q2, D324 (b)) — A TEST DOES ONE THING
 * ONE WAY, THROUGH THE SHARED E2E HELPER. The helpers: `asPerson`, `asAnonymous`, `asBearer` and
 * `pageDoor` (e2e/helpers/door-callers.ts), `passwordGrant` and `bearerClient` (session.ts),
 * `grantRole` and `grantScratchRole` (users.ts), `signInJobSuperAdmin` (ui.ts), and the account's
 * language (e2e/helpers/account-language.ts).
 * - CF-HELPERS-1: no e2e/*.spec.ts declares its own copy — a local `function`, or a `const` holding
 *   a function, of one of the names below (a `const asAnon = await …` answer is a value, not a copy).
 * - CF-HELPERS-2: no e2e file disables `rules-of-hooks`: a harness helper is named by its verb,
 *   never `use…`.
 * - CF-HELPERS-3: no e2e file but the language module writes `profiles.preferred_language`
 *   (`.from("profiles").update({ … preferred_language`, matched across lines).
 * The page's client read by hand is CF-BC-1's (browser-client.test.ts) — one guard per concern.
 * Allowlist: e2e-helpers-allowlist.txt, `<file> <name> | reason | until`.
 */

export const COPIED_NAMES = [
  "asPerson",
  "asAnonymous",
  "asAnon",
  "rpcResult",
  "rpcFromBrowser",
  "rpcAsPage",
  "doorError",
  "clientReady",
  "restBase",
  "answerOf",
  "bearerClient",
];
const HOOKS_DISABLE = /rules-of-hooks/;
const LANGUAGE_WRITE =
  /\.from\(\s*["'`]profiles["'`]\s*\)\s*\.update\(\s*\{[^}]*?\bpreferred_language\b/g;
export const LANGUAGE_HOME = "e2e/helpers/account-language.ts";
const ALLOWLIST = "scripts/conformance/e2e-helpers-allowlist.txt";

type HelperFinding = { file: string; line: number; what: string; key: string };

function lineAt(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}

/** CF-HELPERS-1 — the spec's own declarations of a shared helper's name. */
export function copyFindings(specs: string[], names: readonly string[]): HelperFinding[] {
  const wanted = new Set(names);
  const findings: HelperFinding[] = [];
  for (const file of specs) {
    visitTs(file, (node, source) => {
      let name: ts.Identifier | undefined;
      if (ts.isFunctionDeclaration(node)) name = node.name;
      else if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer !== undefined &&
        (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
      )
        name = node.name;
      if (name === undefined || !wanted.has(name.text)) return;
      findings.push({
        file,
        line: source.getLineAndCharacterOfPosition(name.getStart(source)).line + 1,
        what: `declares its own ${name.text}: import the shared helper`,
        key: `${file} ${name.text}`,
      });
    });
  }
  return findings;
}

/** CF-HELPERS-2 — a `rules-of-hooks` disable (the helper's name is the cause). */
export function hooksDisableFindings(files: string[]): HelperFinding[] {
  return files.flatMap((file) =>
    readFileSync(file, "utf8")
      .split("\n")
      .flatMap((text, index) =>
        HOOKS_DISABLE.test(text)
          ? [
              {
                file,
                line: index + 1,
                what: "disables rules-of-hooks: name the harness helper by its verb",
                key: `${file} rules-of-hooks`,
              },
            ]
          : [],
      ),
  );
}

/** CF-HELPERS-3 — a direct write of the account's language outside the language module. */
export function languageWriteFindings(files: string[], home = LANGUAGE_HOME): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of files) {
    if (file === home) continue;
    const code = codeOf(readFileSync(file, "utf8"));
    for (const match of code.matchAll(LANGUAGE_WRITE))
      findings.push({
        file,
        line: lineAt(code, match.index),
        what: `writes profiles.preferred_language: use ${home}`,
        key: `${file} preferred_language`,
      });
  }
  return findings;
}

const e2eFiles = () => walkFiles(["e2e"], { ext: ["ts"] });
const specs = () => e2eFiles().filter((file) => /^e2e\/[^/]+\.spec\.ts$/.test(file));

describe("a test does one thing one way, through the shared e2e helper", () => {
  it(
    "CF-HELPERS-1 → CF-HELPERS-3 no spec declares a helper's copy, no file disables rules-of-hooks, no file but the language module writes preferred_language",
    () => {
      const files = e2eFiles();
      const findings = [...copyFindings(specs(), COPIED_NAMES)];
      const allowances = readAllowlist(
        ALLOWLIST,
        findings.map((f) => f.key),
      );
      console.log(
        `[e2e-helpers] e2e files: ${files.length}; findings: ${findings.length}; allowances: ${allowances.size}`,
      );
      expect(files.length).toBeGreaterThan(100);
      expect(report(findings.filter((f) => !allowances.has(f.key)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("planted: CF-HELPERS-1 → CF-HELPERS-3 each find their planted copy, disable and write", () => {
    const dir = mkdtempSync(join(tmpdir(), "e2e-helpers-"));
    try {
      const spec = join(dir, "planted.spec.ts");
      writeFileSync(
        spec,
        [
          'import { test } from "@playwright/test";',
          "async function asPerson() {}",
          "test('t', async () => {",
          "  const rpcResult = () => null;",
          "  // eslint-disable-next-line react-hooks/rules-of-hooks -- planted",
          "  await adminClient()",
          '    .from("profiles")',
          "    .update({",
          "      preferred_language: 'am' })",
          '    .eq("id", "x");',
          "});",
          "",
        ].join("\n"),
      );
      expect(copyFindings([spec], COPIED_NAMES).map((f) => [f.line, f.key])).toEqual([
        [2, `${spec} asPerson`],
        [4, `${spec} rpcResult`],
      ]);
      expect(hooksDisableFindings([spec]).map((f) => f.line)).toEqual([5]);
      expect(languageWriteFindings([spec]).map((f) => f.line)).toEqual([7]);
      expect(languageWriteFindings([spec], spec)).toEqual([]);
      const clean = join(dir, "clean.spec.ts");
      writeFileSync(
        clean,
        [
          'import { asPerson } from "./helpers/door-callers";',
          "const seller = await asPerson(person);",
          "const asAnon = await seller.rpc('x');",
          'await adminClient().from("profiles").update({ display_name: "x" });',
          "",
        ].join("\n"),
      );
      expect(copyFindings([clean], COPIED_NAMES)).toEqual([]);
      expect(hooksDisableFindings([clean])).toEqual([]);
      expect(languageWriteFindings([clean])).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
