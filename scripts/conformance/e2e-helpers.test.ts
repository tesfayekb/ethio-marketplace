import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  FENCE_PREFIXES,
  likeAnywhere,
  likePrefix,
  SCRATCH_PREFIXES,
  type ScratchKind,
} from "../../e2e/helpers/scratch";
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
 * - CF-HELPERS-3: no e2e/*.spec.ts writes `profiles.preferred_language`; a spec sets it through
 *   the language module (`.from("profiles").update({ … preferred_language`, matched across lines).
 *   The lease (users.ts) and the pooled super admin's reset (ui.ts) write the NULL baseline themselves.
 * - CF-HELPERS-5 (housekeeping turn 3b, INC-1103, DEC-367): no e2e/*.spec.ts calls
 *   `watchAccountLanguage` or `consumeAccountLanguage`, and the page's settled-language attribute
 *   (`data-lang-settled`, the dataset key `langSettled`) is named in src/ only by
 *   src/i18n/provider.tsx (its one home) and that rule's unit test, and in e2e/ only under
 *   e2e/helpers/ — every pick waits for it through `switchLanguage` (e2e/helpers/ui.ts).
 * - CF-HELPERS-6 (housekeeping turn 3b, INC-1104, ruling 1 item 2): every scratch prefix lives in
 *   e2e/helpers/scratch.ts. (a) No literal under e2e/helpers/, nor in e2e/global-setup.ts or
 *   e2e/global-teardown.ts, carries a scratch shape (`e2e-`, `e2e_`, `e2e+`, `e2e.`, `e2e%`,
 *   `E2E-Scratch-`, the fence codes) — a maker or matcher reads the list; the pool's names
 *   (`e2e-pool-`, `e2e_pool_reset`) are never swept and pass. (b) Every LIKE pattern of the two
 *   sweepers (`SWEEPERS`) is `likePrefix(…)` or `likeAnywhere(…)` over a prefix of the list, and
 *   every prefix of the list falls under one the reaper sweeps, but the kinds in `UNSWEPT_KINDS`.
 * - CF-HELPERS-7 (housekeeping turn 3b, ruling 1 item 6, INC-1102's class in the e2e tree): no
 *   file under e2e/helpers/, nor e2e/global-setup.ts or e2e/global-teardown.ts, calls `new RegExp(`
 *   or `RegExp(` — a pattern built from text goes through `matcher` (e2e/helpers/ui.ts, over
 *   scripts/lib/pattern.ts), which escapes every interpolated string.
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
  "grantRole",
  "grantAdmin",
  "scratchHolder",
  "signInAsSuperAdmin",
  "setAmharicAccount",
  "setAccountLanguage",
  "seedAccountLanguage",
  "waitForLanguageSettled",
];
const HOOKS_DISABLE = /rules-of-hooks/;
const LANGUAGE_WRITE =
  /\.from\(\s*["'`]profiles["'`]\s*\)\s*\.update\(\s*\{[^}]*?\bpreferred_language\b/g;
export const LANGUAGE_HOME = "e2e/helpers/account-language.ts";
const WATCH_CALL = /\b(?:watchAccountLanguage|consumeAccountLanguage)\s*\(/;
const SETTLED_NAME = /data-lang-settled|\blangSettled\b/;
export const SETTLED_HOMES = ["src/i18n/provider.tsx", "src/i18n/provider-d239.test.tsx"];
export const SCRATCH_HOME = "e2e/helpers/scratch.ts";
export const SWEEPERS = ["e2e/global-setup.ts", "e2e/helpers/locations.ts"];
const SCRATCH_SHAPE = /(?<![\w-])e2e(?:[-_+.%[](?!\s)|$)|E2E-Scratch-|(?<![A-Za-z])zx[xy](?![a-z])/;
const NEVER_SWEPT = ["e2e-pool-", "e2e_pool_reset"];
/** Kinds no reaper LIKE names, each with why. */
export const UNSWEPT_KINDS: Partial<Record<ScratchKind, string>> = {
  stem: "the real-row filters' complement (`not like e2e%`), never a sweep",
  underscore:
    "attribute keys are reaped by the attribute plan (SCRATCH_KEY over every attribute row) and public names go with their user; the reach rows (`e2e_lvl_r…`, listing_packages) have no sweep — housekeeping-3b report §13",
};
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

/** CF-HELPERS-5 — a spec arming the account-language watch itself. */
export function watchCallFindings(specs: string[]): HelperFinding[] {
  return specs.flatMap((file) =>
    codeOf(readFileSync(file, "utf8"))
      .split("\n")
      .flatMap((text, index) =>
        WATCH_CALL.test(text)
          ? [
              {
                file,
                line: index + 1,
                what: "arms the account-language watch itself: switchLanguage waits (DEC-367)",
                key: `${file} watch`,
              },
            ]
          : [],
      ),
  );
}

/** CF-HELPERS-5 — the settled-language attribute named outside its homes. */
export function settledNameFindings(files: string[]): HelperFinding[] {
  return files
    .filter((file) => !SETTLED_HOMES.includes(file) && !file.startsWith("e2e/helpers/"))
    .flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .flatMap((text, index) =>
          SETTLED_NAME.test(text)
            ? [
                {
                  file,
                  line: index + 1,
                  what: "names data-lang-settled outside src/i18n/provider.tsx and e2e/helpers/ (DEC-367)",
                  key: `${file} data-lang-settled`,
                },
              ]
            : [],
        ),
    );
}

/** CF-HELPERS-7 — a RegExp built by hand where the harness has `matcher`. */
export function regexpSiteFindings(files: string[]): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        (ts.isNewExpression(node) || ts.isCallExpression(node)) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "RegExp"
      ) {
        const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
        findings.push({
          file,
          line,
          what: "builds a RegExp by hand: use matcher (e2e/helpers/ui.ts)",
          key: `${file} RegExp`,
        });
      }
    });
  }
  return findings;
}

function isModuleName(node: ts.StringLiteral): boolean {
  const parent = node.parent;
  return (
    ts.isImportDeclaration(parent) ||
    ts.isExportDeclaration(parent) ||
    ts.isExternalModuleReference(parent) ||
    (ts.isCallExpression(parent) && parent.expression.kind === ts.SyntaxKind.ImportKeyword)
  );
}

function literalText(node: ts.Node): string | null {
  if (ts.isStringLiteral(node)) return isModuleName(node) ? null : node.text;
  if (
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateHead(node) ||
    ts.isTemplateMiddle(node) ||
    ts.isTemplateTail(node) ||
    ts.isRegularExpressionLiteral(node)
  )
    return node.text;
  return null;
}

/** CF-HELPERS-6 (a) — a scratch shape written outside the list. */
export function scratchLiteralFindings(files: string[]): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of files) {
    if (file === SCRATCH_HOME) continue;
    visitTs(file, (node, source) => {
      const text = literalText(node);
      if (text === null) return;
      const rest = NEVER_SWEPT.reduce((left, name) => left.split(name).join(""), text);
      if (!SCRATCH_SHAPE.test(rest)) return;
      findings.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `writes a scratch prefix (${JSON.stringify(text)}): read it from ${SCRATCH_HOME}`,
        key: `${file} scratch`,
      });
    });
  }
  return findings;
}

const LIKE_BUILDERS = new Set(["likePrefix", "likeAnywhere"]);
const FENCE_KINDS = (Object.keys(SCRATCH_PREFIXES) as ScratchKind[]).filter((kind) =>
  (Object.values(FENCE_PREFIXES) as string[]).includes(SCRATCH_PREFIXES[kind]),
);

function isScratchKind(name: string): name is ScratchKind {
  return Object.prototype.hasOwnProperty.call(SCRATCH_PREFIXES, name);
}

function kindOf(node: ts.Expression): ScratchKind | null {
  return ts.isPropertyAccessExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === "SCRATCH_PREFIXES" &&
    isScratchKind(node.name.text)
    ? node.name.text
    : null;
}

/** The kinds a loop variable runs over: `for (const p of [SCRATCH_PREFIXES.k, …])` or the fence list. */
function loopKinds(name: ts.Identifier): ScratchKind[] | null {
  for (let at: ts.Node | undefined = name.parent; at !== undefined; at = at.parent) {
    if (!ts.isForOfStatement(at) || !ts.isVariableDeclarationList(at.initializer)) continue;
    const declared = at.initializer.declarations.some(
      (declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name.text,
    );
    if (!declared) continue;
    if (ts.isIdentifier(at.expression) && at.expression.text === "FENCE_PREFIX_LIST")
      return FENCE_KINDS;
    if (!ts.isArrayLiteralExpression(at.expression)) return null;
    const kinds = at.expression.elements.map((element) => kindOf(element));
    return kinds.every((kind) => kind !== null) ? kinds.filter((kind) => kind !== null) : null;
  }
  return null;
}

function likeArgument(node: ts.CallExpression): ts.Expression | null {
  if (!ts.isPropertyAccessExpression(node.expression)) return null;
  const method = node.expression.name.text;
  if (method === "like" || method === "ilike") return node.arguments[1] ?? null;
  const operator = node.arguments[1];
  if (
    method === "not" &&
    operator !== undefined &&
    ts.isStringLiteral(operator) &&
    (operator.text === "like" || operator.text === "ilike")
  )
    return node.arguments[2] ?? null;
  return null;
}

/** CF-HELPERS-6 (b) — each sweeper's LIKE patterns: the kinds they sweep, and every other form. */
export function sweepReading(files: string[]): {
  kinds: Set<ScratchKind>;
  findings: HelperFinding[];
} {
  const kinds = new Set<ScratchKind>();
  const findings: HelperFinding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isCallExpression(node)) return;
      const argument = likeArgument(node);
      if (argument === null) return;
      const line = source.getLineAndCharacterOfPosition(argument.getStart(source)).line + 1;
      const prefix =
        ts.isCallExpression(argument) &&
        ts.isIdentifier(argument.expression) &&
        LIKE_BUILDERS.has(argument.expression.text)
          ? argument.arguments[0]
          : undefined;
      const named =
        prefix === undefined
          ? null
          : ts.isIdentifier(prefix)
            ? loopKinds(prefix)
            : [kindOf(prefix)].filter((kind) => kind !== null);
      if (named === null || named.length === 0) {
        findings.push({
          file,
          line,
          what: `sweeps by a LIKE that is not likePrefix/likeAnywhere over ${SCRATCH_HOME}'s list`,
          key: `${file} like`,
        });
        return;
      }
      for (const kind of named) kinds.add(kind);
    });
  }
  return { kinds, findings };
}

/** The list's kinds no swept prefix covers (a swept prefix covers every name it begins). */
export function unsweptKinds(swept: ReadonlySet<ScratchKind>): ScratchKind[] {
  return (Object.keys(SCRATCH_PREFIXES) as ScratchKind[]).filter(
    (kind) =>
      ![...swept].some((sweptKind) =>
        SCRATCH_PREFIXES[kind].startsWith(SCRATCH_PREFIXES[sweptKind]),
      ),
  );
}

type LikeToken = { any: true } | { one: true } | { char: string };

/** LIKE's own reading of a pattern: `\` escapes, `%` is any run, `_` any one character. */
export function likeMatches(likePattern: string, text: string): boolean {
  const tokens: LikeToken[] = [];
  for (let index = 0; index < likePattern.length; index += 1) {
    const char = likePattern.charAt(index);
    if (char === "\\") {
      index += 1;
      tokens.push({ char: likePattern.charAt(index) });
    } else if (char === "%") tokens.push({ any: true });
    else if (char === "_") tokens.push({ one: true });
    else tokens.push({ char });
  }
  const from = (token: number, at: number): boolean => {
    const next = tokens[token];
    if (next === undefined) return at === text.length;
    if ("any" in next) {
      for (let end = at; end <= text.length; end += 1) if (from(token + 1, end)) return true;
      return false;
    }
    if (at >= text.length) return false;
    if ("one" in next || next.char === text.charAt(at)) return from(token + 1, at + 1);
    return false;
  };
  return from(0, 0);
}

const e2eFiles = () => walkFiles(["e2e"], { ext: ["ts"] });
const harnessFiles = (files: string[]) =>
  files.filter(
    (file) =>
      file.startsWith("e2e/helpers/") ||
      file === "e2e/global-setup.ts" ||
      file === "e2e/global-teardown.ts",
  );
const specs = () => e2eFiles().filter((file) => /^e2e\/[^/]+\.spec\.ts$/.test(file));

describe("a test does one thing one way, through the shared e2e helper", () => {
  it(
    "CF-HELPERS-1 → CF-HELPERS-3, CF-HELPERS-5 → CF-HELPERS-7 no spec declares a helper's copy, no file disables rules-of-hooks, no spec writes preferred_language but through the language module, no spec arms the language watch and only the homes name the settled attribute, no harness file writes a scratch prefix or sweeps but through the list, no harness file builds a RegExp by hand",
    () => {
      const files = e2eFiles();
      const findings = [
        ...copyFindings(specs(), COPIED_NAMES),
        ...hooksDisableFindings(files),
        ...languageWriteFindings(specs()),
        ...watchCallFindings(specs()),
        ...settledNameFindings([...files, ...walkFiles(["src"], { ext: ["ts", "tsx"] })]),
        ...scratchLiteralFindings(harnessFiles(files)),
        ...sweepReading(SWEEPERS).findings,
        ...regexpSiteFindings(harnessFiles(files)),
      ];
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

  it("CF-HELPERS-6 the reaper's patterns match a name under every prefix it sweeps, LIKE's `_` is escaped, and every prefix of the list is swept but the named kinds", () => {
    const { kinds, findings } = sweepReading(["e2e/global-setup.ts"]);
    expect(findings).toEqual([]);
    expect(kinds.has("role"), "INC-1104: grantScratchRole's prefix is swept").toBe(true);
    expect(unsweptKinds(kinds).sort()).toEqual(Object.keys(UNSWEPT_KINDS).sort());
    for (const kind of kinds) {
      const prefix = SCRATCH_PREFIXES[kind];
      expect(likeMatches(likePrefix(prefix), `${prefix}run-1`), kind).toBe(true);
      expect(likeMatches(likeAnywhere(prefix), `x-${prefix}run-1`), kind).toBe(true);
      expect(likeMatches(likePrefix(prefix), `x${prefix}`), kind).toBe(false);
    }
    expect(likePrefix(SCRATCH_PREFIXES.role)).toBe("e2e\\_scratch\\_role\\_%");
    expect(likeMatches(likePrefix(SCRATCH_PREFIXES.role), "e2eXscratchXroleXab")).toBe(false);
    expect(likeMatches("e2e_scratch_role_%", "e2eXscratchXroleXab"), "unescaped").toBe(true);
    expect(
      likeMatches(likePrefix(SCRATCH_PREFIXES.dash), "e2e_scratch_role_ab"),
      "INC-1104: `e2e-%` never matched a scratch role",
    ).toBe(false);
  });

  it("planted: CF-HELPERS-1 → CF-HELPERS-3, CF-HELPERS-5 → CF-HELPERS-7 each find their planted copy, disable, write, watch, attribute and RegExp", () => {
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
          "  const scratchHolder = async function () {};",
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
        [5, `${spec} scratchHolder`],
      ]);
      expect(hooksDisableFindings([spec]).map((f) => f.line)).toEqual([6]);
      expect(languageWriteFindings([spec]).map((f) => f.line)).toEqual([8]);
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
      const helper = join(dir, "planted-helper.ts");
      writeFileSync(
        helper,
        [
          'import { matcher } from "./ui";',
          "export const a = new RegExp(`^${label}$`);",
          "export const b = RegExp(label, 'i');",
          "export const c = matcher('i')`^${label}$`;",
          "export const d = /^literal$/;",
          "",
        ].join("\n"),
      );
      expect(regexpSiteFindings([helper]).map((f) => f.line)).toEqual([2, 3]);
      expect(regexpSiteFindings([clean])).toEqual([]);
      const waits = join(dir, "waits.spec.ts");
      writeFileSync(
        waits,
        [
          'import { watchAccountLanguage } from "./helpers/ui";',
          "const account = watchAccountLanguage(page);",
          "await consumeAccountLanguage (page);",
          'await expect(page.locator("html")).toHaveAttribute("data-lang-settled", "1");',
          'document.documentElement.dataset["langSettled"] = "1";',
          "// switchLanguage waits for the page",
          "",
        ].join("\n"),
      );
      expect(watchCallFindings([waits]).map((f) => f.line)).toEqual([2, 3]);
      expect(settledNameFindings([waits]).map((f) => f.line)).toEqual([4, 5]);
      expect(
        settledNameFindings([...SETTLED_HOMES, "e2e/helpers/ui.ts"]),
        "the homes may name it",
      ).toEqual([]);
      expect(watchCallFindings([clean])).toEqual([]);
      expect(
        harnessFiles([
          "e2e/helpers/x.ts",
          "e2e/global-setup.ts",
          "e2e/global-teardown.ts",
          "e2e/x.spec.ts",
        ]),
      ).toEqual(["e2e/helpers/x.ts", "e2e/global-setup.ts", "e2e/global-teardown.ts"]);
      const maker = join(dir, "planted-maker.ts");
      writeFileSync(
        maker,
        [
          'import { likePrefix, SCRATCH_PREFIXES } from "./scratch";',
          'import migrationPreflight from "../scripts/e2e-migration-preflight";',
          "export const a = `e2e_scratch_role_${letters}`;",
          'export const b = "e2e-cat-";',
          "export const c = `e2e+${id}@x`;",
          "export const d = /(^|-)e2e[_-]/;",
          'export const e = "E2E-Scratch-QM";',
          'export const f = ["zxx", "zxy-mo"];',
          'export const g = "e2e%";',
          "export const pool = `e2e-pool-${lane}`;",
          'export const reason = "e2e_pool_reset";',
          'export const tag = "[e2e:setup] e2e scratch listing";',
          "export const h = `${SCRATCH_PREFIXES.role}${letters}`;",
          'export const words = ["maintenance_prune_e2e_audit", "__ethio-e2e-injected"];',
          'export const prose = "scratch reviews go with their e2e- document";',
          "export const proof = `default/e2e-proof-${id}`;",
          "",
        ].join("\n"),
      );
      expect(scratchLiteralFindings([maker]).map((f) => f.line)).toEqual([
        3, 4, 5, 6, 7, 8, 8, 9, 16,
      ]);
      expect(scratchLiteralFindings([SCRATCH_HOME]), "the list is the home").toEqual([]);
      const sweeper = join(dir, "planted-sweeper.ts");
      writeFileSync(
        sweeper,
        [
          'await db.from("roles").select("id").like("name", "e2e-%");',
          'await db.from("roles").select("id").not("slug", "like", `${p}%`);',
          'await db.from("roles").select("id").ilike("name", likePrefix("e2e_"));',
          'await db.from("a").select("id").like("slug", likePrefix(SCRATCH_PREFIXES.dash));',
          'await db.from("a").select("id").not("slug", "like", likeAnywhere(SCRATCH_PREFIXES.user));',
          "for (const prefix of [SCRATCH_PREFIXES.dash, SCRATCH_PREFIXES.role])",
          '  await db.from("roles").select("id").like("name", likePrefix(prefix));',
          "for (const prefix of FENCE_PREFIX_LIST)",
          '  await db.from("t").delete().like("lang_code", likePrefix(prefix));',
          "for (const prefix of names)",
          '  await db.from("t").delete().like("lang_code", likePrefix(prefix));',
          'await db.from("t").select("id").eq("slug", "e2e-x").not("id", "in", "(1)");',
          "",
        ].join("\n"),
      );
      const reading = sweepReading([sweeper]);
      expect(reading.findings.map((f) => f.line)).toEqual([1, 2, 3, 11]);
      expect([...reading.kinds].sort()).toEqual(
        ["dash", "fenceApprove", "fenceBulk", "role", "user"].sort(),
      );
      expect(unsweptKinds(new Set(["dash"]))).toContain("role");
      expect(unsweptKinds(new Set(["dash"]))).not.toContain("category");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
