import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  PICTURE_SCREENS,
  pictureFitProblems,
  type PictureMeasure,
} from "../../e2e/helpers/pictures";
import {
  FENCE_PREFIXES,
  likeAnywhere,
  likePrefix,
  SCRATCH_PREFIXES,
  type ScratchKind,
} from "../../e2e/helpers/scratch";
import { pattern } from "../lib/pattern";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * Housekeeping turn 2 (INC-1065, INC-1049, INC-1100; ruling 1 Q2, D324 (b)) — A TEST DOES ONE THING
 * ONE WAY, THROUGH THE SHARED E2E HELPER. The helpers: `asPerson`, `asAnonymous`, `asBearer` and
 * `pageDoor` (e2e/helpers/door-callers.ts), `passwordGrant` and `bearerClient` (session.ts),
 * `grantRole` and `grantScratchRole` (users.ts), `signInJobSuperAdmin` (ui.ts), the staff sign-in
 * `signInStaff`, `asStaff`, `staffSession` and `declareStaffFactor` (e2e/helpers/staff-factor.ts, cursor
 * bundle 6), and the account's language (e2e/helpers/account-language.ts).
 * - CF-HELPERS-1: no e2e/*.spec.ts declares its own copy — a local `function`, or a `const` holding
 *   a function, of one of the names below (a `const asAnon = await …` answer is a value, not a copy);
 *   and no spec inserts a role inline (`.from("roles").insert(`, matched across lines; housekeeping
 *   turn 3b, LGA-22) — a scratch role is `grantScratchRole`'s (e2e/helpers/users.ts).
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
 * - CF-HELPERS-8 (the pictures turn, INC-1121): every e2e/*.spec.ts naming a picture screen's test
 *   id (PICTURE_SCREENS, e2e/helpers/pictures.ts) calls `expectPicturesFit` — the drawn pictures
 *   are measured against their frames, never only their attributes.
 * - CF-HELPERS-9 (the pictures turn, ruling 1 answer 4, INC-1123): no e2e/*.spec.ts names a
 *   Playwright project (PROJECT_NAMES) in a string — a spec branches on `layoutOf(page)`
 *   (e2e/helpers/layout.ts), so a new engine at the same width never silently skips its branch.
 * - CF-HELPERS-10 (cursor-bundle-3, INC-1245): no file under e2e/ reads an answer's `data` (or
 *   `count`) and never its `error` — a failed read is a thrown error naming the read, never an
 *   empty list a test then passes over. The sites by definition (droppedErrorFindings): a
 *   destructure `const { data } = …`, a callback's `({ data }) =>`, `(await …).data`, and an
 *   awaited Supabase chain held in a name whose `.data` is read and whose `.error` (or the whole
 *   answer, passed on) never is. The allowlist holds one line a file with its count,
 *   `<file> drops-error (<n>)`, each until INC-1245; a changed count is a new finding and a stale line.
 * - CF-HELPERS-11 (cursor-ci-speed, DEC-488): the node mint (`aal2Session`, e2e/helpers/ui.ts) makes
 *   its first verify request at once — before it, no timer and no awaited call but its own auth
 *   requests (mintWaitFindings). Planted: the mint at 5cfe8b0c2 (its code-step wait).
 * - CF-HELPERS-12 (cursor-ci-speed, INC-1324): in any e2e function, a `signOutViaUi(` followed by a
 *   session write (`injectSession(`, `localStorage.setItem(`) waits `untilSignOutCleared(page)`
 *   (e2e/helpers/session.ts) between them (signOutWriteFindings). Planted: staff-factor.ts at 5cfe8b0c2.
 * - CF-HELPERS-13 (cursor-bundle-8c-2a, INC-1326): no e2e file but `e2e/global-setup.ts` posts the
 *   TOTP factor enrolment (the `"/factors"` path): the pool's mint and the staff helper both enrol
 *   through `enrolTotpFactor` (enrolmentFindings). Planted: staff-factor.ts at 3c9086dc0.
 * - CF-HELPERS-14 (cursor-bundle-8c-2a, INC-1334): outside `e2e/helpers/legal-scratch.ts`, no e2e
 *   file inserts into or deletes from `legal_documents` or `legal_versions`, nor deletes
 *   `legal_acceptances` or `legal_notices` by version: the scratch legal chain is seeded and removed
 *   through the helper (legalChainFindings). Planted: legal-accept.spec.ts at 3c9086dc0. Its second
 *   test holds the two error-report tags the setup's sweep reads (`SCRATCH_PREFIXES.errorReportStaff`,
 *   `errorReportSender`) to the tags the two specs build.
 * - CF-HELPERS-15 (cursor-bundle-8c-2b, INC-1336): no e2e file but `e2e/helpers/layout.ts` defines
 *   `isCardTwin` — the one rule for which twin a table draws; each caller passes its own boundary
 *   (cardTwinFindings). Planted: admin-guides.spec.ts at b355cbe00 (its lines 67 to 70, inline).
 * The page's client read by hand is CF-BC-1's (browser-client.test.ts) — one guard per concern.
 * Allowlist: e2e-helpers-allowlist.txt, `<file> <name> | reason | until`.
 */

export const COPIED_NAMES = [
  "asPerson",
  "asStaff",
  "signInStaff",
  "staffSession",
  "declareStaffFactor",
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
  "chooseFilter",
  "chooseInList",
  "seedLegalDocument",
  "seedLegalVersion",
  "destroyLegalKind",
  "destroyLegalChain",
  "deleteLegalVersions",
  "isCardTwin",
];
const HOOKS_DISABLE = /rules-of-hooks/;
const LANGUAGE_WRITE =
  /\.from\(\s*["'`]profiles["'`]\s*\)\s*\.update\(\s*\{[^}]*?\bpreferred_language\b/g;
export const LANGUAGE_HOME = "e2e/helpers/account-language.ts";
const ROLE_INSERT = /\.from\(\s*["'`]roles["'`]\s*\)\s*\.insert\(/g;
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

/** CF-HELPERS-1 — a spec's inline role insert, where `grantScratchRole` makes the scratch role. */
export function roleInsertFindings(specs: string[]): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of specs) {
    const code = codeOf(readFileSync(file, "utf8"));
    for (const match of code.matchAll(ROLE_INSERT))
      findings.push({
        file,
        line: lineAt(code, match.index),
        what: "inserts a role inline: grantScratchRole (e2e/helpers/users.ts)",
        key: `${file} roles.insert`,
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

/** A string's text in a spec, a template's parts joined by `${}` (PICTURE_SCREENS' form). */
function specText(node: ts.Node): string | null {
  if (ts.isStringLiteral(node)) return isModuleName(node) ? null : node.text;
  if (ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node))
    return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join("${}");
  return null;
}

/** CF-HELPERS-8 — a spec naming a picture screen that never measures its pictures. */
export function pictureCheckFindings(
  specFiles: string[],
  screens: readonly string[] = PICTURE_SCREENS,
): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of specFiles) {
    const seen: { named: { id: string; line: number } | null; measures: boolean } = {
      named: null,
      measures: false,
    };
    visitTs(file, (node, source) => {
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "expectPicturesFit"
      )
        seen.measures = true;
      const text = specText(node);
      if (text === null || seen.named !== null) return;
      const id = screens.find((screen) => text.includes(screen));
      if (id !== undefined)
        seen.named = {
          id,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        };
    });
    if (seen.named !== null && !seen.measures) {
      const { id, line } = seen.named;
      findings.push({
        file,
        line,
        what: `names the picture screen ${id} and never calls expectPicturesFit (e2e/helpers/pictures.ts)`,
        key: `${file} expectPicturesFit`,
      });
    }
  }
  return findings;
}

/** The Playwright projects (playwright.config.ts) a spec may not name (CF-HELPERS-9). */
export const PROJECT_NAMES = ["mobile-360", "desktop-1280", "webkit-1280", "webkit-390"];

/** CF-HELPERS-9 — a spec naming a project, the form a branch on the project's name takes. */
export function projectNameFindings(
  specFiles: string[],
  names: readonly string[] = PROJECT_NAMES,
): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of specFiles) {
    visitTs(file, (node, source) => {
      const text = specText(node);
      if (text === null || !names.includes(text)) return;
      findings.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `names the project ${text}: branch on layoutOf(page) (e2e/helpers/layout.ts)`,
        key: `${file} project-name`,
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

/** The client's own verbs: a chain made of one of them is a Supabase answer (CF-HELPERS-10). */
const SUPABASE_VERBS = new Set([
  "from",
  "rpc",
  "schema",
  "storage",
  "auth",
  "functions",
  "select",
  "insert",
  "update",
  "upsert",
  "delete",
  "maybeSingle",
  "single",
  "eq",
  "in",
  "order",
  "limit",
  "range",
]);

/**
 * Whether the awaited expression's own call chain (`supabase.from(…).select(…)`, its callee names,
 * never its arguments' code) holds one of the client's verbs: `Array.from` inside a callback
 * handed to `.evaluate(` is a page read, not an answer.
 */
function isSupabaseChain(awaited: ts.AwaitExpression): boolean {
  return chainHoldsVerb(awaited.expression);
}

function chainHoldsVerb(start: ts.Expression): boolean {
  let node: ts.Expression = start;
  for (;;) {
    if (ts.isConditionalExpression(node))
      return chainHoldsVerb(node.whenTrue) || chainHoldsVerb(node.whenFalse);
    if (
      ts.isCallExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isParenthesizedExpression(node)
    ) {
      node = node.expression;
    } else if (ts.isPropertyAccessExpression(node)) {
      if (SUPABASE_VERBS.has(node.name.text)) return true;
      node = node.expression;
    } else if (ts.isElementAccessExpression(node) || ts.isAsExpression(node)) {
      node = node.expression;
    } else return false;
  }
}

/** The property names an object binding pattern takes (`{ data: rows }` takes `data`). */
function takenKeys(binding: ts.ObjectBindingPattern): string[] {
  return binding.elements.map((element) => (element.propertyName ?? element.name).getText());
}

const takesAnswer = (keys: string[]) =>
  (keys.includes("data") || keys.includes("count")) && !keys.includes("error");

/**
 * CF-HELPERS-10 — every read of an answer's `data` (or `count`) that never reads its `error`.
 * The key is the file with its count of sites, `<file> drops-error (<n>)`, one allowlist line a
 * file (a file that gains or loses a site changes its key).
 */
export function droppedErrorFindings(files: string[]): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of files) {
    const sites: Array<{ line: number; form: string }> = [];
    visitTs(file, (node, source) => {
      const site = (at: ts.Node, form: string) =>
        sites.push({
          line: source.getLineAndCharacterOfPosition(at.getStart(source)).line + 1,
          form,
        });
      // `const { data, … } = …` with no `error` taken.
      if (
        ts.isVariableDeclaration(node) &&
        ts.isObjectBindingPattern(node.name) &&
        node.initializer !== undefined &&
        takesAnswer(takenKeys(node.name))
      )
        site(node, "`data` by destructuring");
      // A callback's first parameter, `({ data }) => …`.
      if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
        const first = node.parameters[0];
        if (
          first !== undefined &&
          ts.isObjectBindingPattern(first.name) &&
          takesAnswer(takenKeys(first.name))
        )
          site(node, "`data` as a callback's parameter");
      }
      // `(await …).data`.
      if (
        ts.isPropertyAccessExpression(node) &&
        (node.name.text === "data" || node.name.text === "count") &&
        ts.isParenthesizedExpression(node.expression) &&
        ts.isAwaitExpression(node.expression.expression)
      )
        site(node, `\`(await …).${node.name.text}\``);
      // `const answer = await <Supabase chain>` whose `.data` is read and `.error` never is.
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer !== undefined &&
        ts.isAwaitExpression(node.initializer) &&
        isSupabaseChain(node.initializer)
      ) {
        const name = node.name.text;
        const scope = node.parent.parent.parent.getText(source);
        const readsData = pattern`\\b${name}\\??\\.(data|count)\\b`.test(scope);
        const readsError = pattern`\\b${name}\\??\\.error\\b|\\b${name}\\b\\s*\\)`.test(scope);
        if (readsData && !readsError) site(node, `\`${name}.data\` held`);
      }
    });
    for (const { line, form } of sites)
      findings.push({
        file,
        line,
        what: `reads ${form} and never its error: read \`error\` and throw with the read's name and its text`,
        key: `${file} drops-error (${sites.length})`,
      });
  }
  return findings;
}

export const MINT_FILE = "e2e/helpers/ui.ts";
export const MINT_NAME = "aal2Session";
/** The calls the mint may await before its first verify: its own auth requests. */
const MINT_REQUESTS = new Set(["authFetch"]);
const TIMER_CALL = /\b(?:setTimeout|setInterval|waitForTimeout)\s*\(/g;
const AWAITED_CALL = /\bawait\s+(?:new\s+)?([\w.]+)\s*\(/g;

/**
 * CF-HELPERS-11 (cursor-ci-speed, DEC-488) — the node mint makes its first verify request at once:
 * between the function's start and its first `/verify` request, no timer and no awaited call but
 * its own auth requests (a sleeping helper is an awaited call).
 */
export function mintWaitFindings(file: string, text: string, name: string): HelperFinding[] {
  const findings: HelperFinding[] = [];
  const bodies: Array<{ start: number; text: string }> = [];
  visitTs(
    file,
    (node, source) => {
      if (ts.isFunctionDeclaration(node) && node.name?.text === name && node.body !== undefined)
        bodies.push({ start: node.body.getStart(source), text: node.body.getText(source) });
    },
    text,
  );
  const found = bodies[0];
  if (found === undefined)
    return [{ file, line: 1, what: `no function ${name} to read`, key: `${file} ${name}` }];
  const code = codeOf(found.text);
  const verifyAt = code.indexOf("/verify");
  if (verifyAt < 0)
    return [{ file, line: 1, what: `${name} makes no verify request`, key: `${file} ${name}` }];
  const before = code.slice(0, verifyAt);
  const at = (index: number) => lineAt(text, found.start + index);
  for (const match of before.matchAll(TIMER_CALL))
    findings.push({
      file,
      line: at(match.index),
      what: `${name} sets a timer before its first verify request (DEC-488): verify at once`,
      key: `${file} ${name}`,
    });
  for (const match of before.matchAll(AWAITED_CALL)) {
    const callee = match[1] ?? "";
    if (MINT_REQUESTS.has(callee)) continue;
    findings.push({
      file,
      line: at(match.index),
      what: `${name} awaits \`${callee}\` before its first verify request (DEC-488): verify at once`,
      key: `${file} ${name}`,
    });
  }
  return findings;
}

const SIGN_OUT_NAME = /\bsignOutViaUi\s*\(/;
const SESSION_WRITE = /\binjectSession\s*\(|\blocalStorage\s*\.\s*setItem\s*\(/;
const SIGN_OUT_CLEARED = /\buntilSignOutCleared\s*\(/;

/**
 * CF-HELPERS-12 (cursor-ci-speed, INC-1324) — no helper writes a session into a page whose
 * sign-out is still in flight: in the innermost function around a `signOutViaUi(` call, a session
 * write after it (`injectSession(`, `localStorage.setItem(`, nested callbacks included) has
 * `untilSignOutCleared(` between them.
 */
export function signOutWriteFindings(
  files: Array<{ file: string; text: string }>,
): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const { file, text } of files) {
    if (!SIGN_OUT_NAME.test(text)) continue;
    visitTs(
      file,
      (node, source) => {
        if (
          !ts.isCallExpression(node) ||
          !ts.isIdentifier(node.expression) ||
          node.expression.text !== "signOutViaUi"
        )
          return;
        let around: ts.Node | undefined = node.parent;
        while (around !== undefined && !ts.isFunctionLike(around)) around = around.parent;
        if (around === undefined) return;
        const callAt = node.getStart(source);
        const after = codeOf(text.slice(callAt, around.getEnd()));
        const write = SESSION_WRITE.exec(after);
        if (write === null || SIGN_OUT_CLEARED.test(after.slice(0, write.index))) return;
        findings.push({
          file,
          line: lineAt(text, callAt),
          what: "signs the page out through the screen, then writes a session without `untilSignOutCleared(page)` between (INC-1324)",
          key: `${file} sign-out-write`,
        });
      },
      text,
    );
  }
  return findings;
}

export const ENROLMENT_HOME = "e2e/global-setup.ts";
const ENROLMENT_PATH = /["'`]\/factors["'`]/g;

/**
 * CF-HELPERS-13 (cursor-bundle-8c-2a, INC-1326) — one body enrols a TOTP factor: outside
 * `e2e/global-setup.ts` (where `enrolTotpFactor` sits beside `authFetch`), no e2e file names the
 * enrolment's path `"/factors"` (the challenge and verify paths carry the factor's id after it).
 */
export function enrolmentFindings(files: Array<{ file: string; text: string }>): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const { file, text } of files) {
    if (file === ENROLMENT_HOME) continue;
    const code = codeOf(text);
    for (const match of code.matchAll(ENROLMENT_PATH))
      findings.push({
        file,
        line: lineAt(code, match.index),
        what: "posts the factor enrolment itself: import `enrolTotpFactor` (e2e/global-setup.ts)",
        key: `${file} factor-enrolment`,
      });
  }
  return findings;
}

export const CARD_TWIN_HOME = "e2e/helpers/layout.ts";

/**
 * CF-HELPERS-15 (cursor-bundle-8c-2b, INC-1336) — one body says which twin a table draws: outside
 * `e2e/helpers/layout.ts`, no e2e file declares a function (or an arrow held in a name) called
 * `isCardTwin`. The boundary is the table's own and is the caller's argument.
 */
export function cardTwinFindings(files: string[]): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const file of files) {
    if (file === CARD_TWIN_HOME) continue;
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
      if (name === undefined || name.text !== "isCardTwin") return;
      findings.push({
        file,
        line: source.getLineAndCharacterOfPosition(name.getStart(source)).line + 1,
        what: `defines its own isCardTwin: import it from ${CARD_TWIN_HOME} with the table's boundary`,
        key: `${file} isCardTwin`,
      });
    });
  }
  return findings;
}

export const LEGAL_HOME = "e2e/helpers/legal-scratch.ts";
const LEGAL_CHAIN_WRITE =
  /\.from\(\s*["'`]legal_(?:documents|versions)["'`]\s*\)\s*\.(?:insert|upsert|delete)\s*\(/g;
const LEGAL_VERSION_DELETE =
  /\.from\(\s*["'`]legal_(?:acceptances|notices)["'`]\s*\)\s*\.delete\s*\(\s*\)\s*\.(?:in|eq)\s*\(\s*["'`]version_id["'`]/g;

/**
 * CF-HELPERS-14 (cursor-bundle-8c-2a, INC-1334) — one helper seeds and removes the scratch legal
 * chain: outside `e2e/helpers/legal-scratch.ts`, no e2e file inserts into, upserts into or deletes
 * from `legal_documents` or `legal_versions`, nor deletes `legal_acceptances` or `legal_notices` by
 * version (a delete by user is the pool's reset, not the chain). The keys are RESTRICT, so the
 * order of a removal is the helper's law, and the helper refuses a kind without the scratch prefix.
 */
export function legalChainFindings(files: Array<{ file: string; text: string }>): HelperFinding[] {
  const findings: HelperFinding[] = [];
  for (const { file, text } of files) {
    if (file === LEGAL_HOME) continue;
    const code = codeOf(text);
    for (const found of [
      ...code.matchAll(LEGAL_CHAIN_WRITE),
      ...code.matchAll(LEGAL_VERSION_DELETE),
    ])
      findings.push({
        file,
        line: lineAt(code, found.index),
        what: `writes the scratch legal chain itself: seed and remove through ${LEGAL_HOME}`,
        key: `${file} legal-chain`,
      });
  }
  return findings.sort((a, b) => a.line - b.line);
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
    "CF-HELPERS-1 → CF-HELPERS-3, CF-HELPERS-5 → CF-HELPERS-15 no spec declares a helper's copy, no file disables rules-of-hooks, no spec writes preferred_language but through the language module, no spec arms the language watch and only the homes name the settled attribute, no harness file writes a scratch prefix or sweeps but through the list, no harness file builds a RegExp by hand, every spec naming a picture screen measures its pictures, no spec names a project, no e2e file reads an answer's data and never its error but on the allowlist, the node mint verifies at once, no sign-out through the screen is followed by a session write before the store cleared, only the setup's one body posts the factor enrolment, only the legal helper seeds or removes the scratch legal chain, and only the layout helper defines the card twin",
    () => {
      const files = e2eFiles();
      const findings = [
        ...copyFindings(specs(), COPIED_NAMES),
        ...roleInsertFindings(specs()),
        ...hooksDisableFindings(files),
        ...languageWriteFindings(specs()),
        ...watchCallFindings(specs()),
        ...settledNameFindings([...files, ...walkFiles(["src"], { ext: ["ts", "tsx"] })]),
        ...scratchLiteralFindings(harnessFiles(files)),
        ...sweepReading(SWEEPERS).findings,
        ...regexpSiteFindings(harnessFiles(files)),
        ...pictureCheckFindings(specs()),
        ...projectNameFindings(specs()),
        ...droppedErrorFindings(files),
        ...mintWaitFindings(MINT_FILE, readFileSync(MINT_FILE, "utf8"), MINT_NAME),
        ...signOutWriteFindings(files.map((file) => ({ file, text: readFileSync(file, "utf8") }))),
        ...enrolmentFindings(files.map((file) => ({ file, text: readFileSync(file, "utf8") }))),
        ...legalChainFindings(files.map((file) => ({ file, text: readFileSync(file, "utf8") }))),
        ...cardTwinFindings(files),
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
          "  await adminClient()",
          '    .from("roles")',
          "    .insert({ name: roleName, display_name: roleName, priority: 1 });",
          "});",
          "async function chooseFilter() {}",
          "async function chooseInList() {}",
          "",
        ].join("\n"),
      );
      expect(roleInsertFindings([spec]).map((f) => f.line)).toEqual([13]);
      expect(copyFindings([spec], COPIED_NAMES).map((f) => [f.line, f.key])).toEqual([
        [2, `${spec} asPerson`],
        [4, `${spec} rpcResult`],
        [5, `${spec} scratchHolder`],
        [16, `${spec} chooseFilter`],
        [17, `${spec} chooseInList`],
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
          'await grantScratchRole(seller.id, [["legal", "view"]], roles);',
          'await adminClient().from("roles").delete().in("id", [...roles]);',
          "",
        ].join("\n"),
      );
      expect(copyFindings([clean], COPIED_NAMES)).toEqual([]);
      expect(roleInsertFindings([clean])).toEqual([]);
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

  it("planted: CF-HELPERS-8 and CF-HELPERS-9 find a picture screen never measured and a project's name, and pass the helpers", () => {
    const dir = mkdtempSync(join(tmpdir(), "e2e-helpers-pictures-"));
    try {
      const bare = join(dir, "bare.spec.ts");
      writeFileSync(
        bare,
        [
          'import { test } from "./fixtures";',
          "test('t', async ({ page }, testInfo) => {",
          '  test.skip(testInfo.project.name !== "desktop-1280", "one width");',
          "  await page.getByTestId(`my-listing-${id}-picture`).waitFor();",
          "  const wide = testInfo.project.name === 'webkit-1280';",
          "  const tag = `scratch-${testInfo.project.name}`;",
          "});",
          "",
        ].join("\n"),
      );
      const measured = join(dir, "measured.spec.ts");
      writeFileSync(
        measured,
        [
          'import { test } from "./fixtures";',
          'import { layoutOf } from "./helpers/layout";',
          'import { expectPicturesFit } from "./helpers/pictures";',
          "test('t', async ({ page }) => {",
          '  test.skip(layoutOf(page) !== "desktop", "one layout");',
          '  await expectPicturesFit(page, page.getByTestId("gallery-main"));',
          "});",
          "",
        ].join("\n"),
      );
      expect(pictureCheckFindings([bare, measured]).map((f) => [f.line, f.key])).toEqual([
        [4, `${bare} expectPicturesFit`],
      ]);
      expect(projectNameFindings([bare, measured]).map((f) => [f.line, f.key])).toEqual([
        [3, `${bare} project-name`],
        [5, `${bare} project-name`],
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("planted: CF-HELPERS-10 finds each form of a read that drops its error, keys a file by its count, and passes a read of the error", () => {
    const dir = mkdtempSync(join(tmpdir(), "e2e-helpers-dropped-"));
    try {
      const dropping = join(dir, "dropping.spec.ts");
      writeFileSync(
        dropping,
        [
          "export async function plants(supabase: Client, page: Page) {",
          '  const { data } = await supabase.from("t").select("id");',
          '  const { count } = await supabase.from("t").select("id", { count: "exact" });',
          '  const rows = (await supabase.rpc("f")).data;',
          '  const held = await supabase.from("t").select("id");',
          "  void held.data;",
          '  await supabase.from("t").select("id").then(({ data: rows2 }) => rows2);',
          "}",
          "",
        ].join("\n"),
      );
      const reading = join(dir, "reading.spec.ts");
      writeFileSync(
        reading,
        [
          "export async function reads(supabase: Client, answerOf: (x: unknown) => void) {",
          '  const { data, error } = await supabase.from("t").select("id");',
          "  if (error) throw new Error(`reads: ${error.message}`);",
          '  const held = await supabase.from("t").select("id");',
          "  if (held.error) throw new Error(held.error.message);",
          "  void held.data;",
          '  const passed = await supabase.from("t").select("id");',
          "  void passed.data;",
          "  answerOf(passed);",
          '  const { other } = await supabase.from("t").select("id");',
          '  const { data: shaped, error: refused } = await supabase.rpc("f");',
          "  void [data, other, shaped, refused];",
          "}",
          "",
        ].join("\n"),
      );
      expect(droppedErrorFindings([dropping, reading]).map((f) => [f.line, f.key])).toEqual([
        [2, `${dropping} drops-error (5)`],
        [3, `${dropping} drops-error (5)`],
        [4, `${dropping} drops-error (5)`],
        [5, `${dropping} drops-error (5)`],
        [7, `${dropping} drops-error (5)`],
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("planted: CF-HELPERS-11 refuses the mint at 5cfe8b0c2 (its code-step wait) and a timer before the first verify, and passes the mint today", () => {
    const base = readFileSync("scripts/fixtures/e2e-helpers/aal2-session-5cfe8b0c2.ts.txt", "utf8");
    const planted = mintWaitFindings(MINT_FILE, base, MINT_NAME);
    expect(planted.map((f) => f.what)).toEqual([
      "aal2Session awaits `untilUnusedStep` before its first verify request (DEC-488): verify at once",
    ]);
    const timer = base.replace(
      "  let verified",
      "  setTimeout(() => undefined, 1);\n  let verified",
    );
    expect(mintWaitFindings(MINT_FILE, timer, MINT_NAME).map((f) => f.what)).toContain(
      "aal2Session sets a timer before its first verify request (DEC-488): verify at once",
    );
    expect(
      mintWaitFindings(MINT_FILE, "export async function other() {}\n", MINT_NAME).map(
        (f) => f.what,
      ),
    ).toEqual(["no function aal2Session to read"]);
    expect(mintWaitFindings(MINT_FILE, readFileSync(MINT_FILE, "utf8"), MINT_NAME)).toEqual([]);
  });

  it("planted: CF-HELPERS-12 refuses staff-factor.ts at 5cfe8b0c2 (a session written after the sign-out with no wait), and passes the helper today", () => {
    const base = readFileSync("scripts/fixtures/e2e-helpers/staff-factor-5cfe8b0c2.ts.txt", "utf8");
    const file = "e2e/helpers/staff-factor.ts";
    expect(signOutWriteFindings([{ file, text: base }]).map((f) => [f.line, f.key])).toEqual([
      [155, `${file} sign-out-write`],
    ]);
    expect(signOutWriteFindings([{ file, text: readFileSync(file, "utf8") }])).toEqual([]);
    const formOnly = [
      "export async function switchPersona(page: Page) {",
      "  await signOutViaUi(page);",
      "  await signIn(page, email, password);",
      "}",
    ].join("\n");
    expect(signOutWriteFindings([{ file: "e2e/planted.spec.ts", text: formOnly }])).toEqual([]);
  });

  it("planted: CF-HELPERS-13 refuses staff-factor.ts at 3c9086dc0 (an enrolment body of its own), and passes every e2e file today", () => {
    const base = readFileSync("scripts/fixtures/e2e-helpers/staff-factor-3c9086dc0.ts.txt", "utf8");
    const file = "e2e/helpers/staff-factor.ts";
    expect(enrolmentFindings([{ file, text: base }]).map((f) => [f.line, f.key])).toEqual([
      [80, `${file} factor-enrolment`],
    ]);
    const home = { file: ENROLMENT_HOME, text: 'await authFetch("/factors", { method: "POST" });' };
    expect(enrolmentFindings([home])).toEqual([]);
    const challenge = { file, text: "await authFetch(`/factors/${id}/challenge`, init);" };
    expect(enrolmentFindings([challenge])).toEqual([]);
    const commented = { file, text: '// authFetch("/factors", init)\n' };
    expect(enrolmentFindings([commented])).toEqual([]);
    for (const path of e2eFiles())
      expect(enrolmentFindings([{ file: path, text: readFileSync(path, "utf8") }]), path).toEqual(
        [],
      );
  });

  it("planted: CF-HELPERS-14 refuses legal-accept.spec.ts at 3c9086dc0 (its own seed and destroy), and passes every e2e file today", () => {
    const base = readFileSync("scripts/fixtures/e2e-helpers/legal-accept-3c9086dc0.ts.txt", "utf8");
    const file = "e2e/legal-accept.spec.ts";
    expect(legalChainFindings([{ file, text: base }]).map((f) => [f.line, f.key])).toEqual(
      [50, 54, 57, 60, 74, 90].map((line) => [line, `${file} legal-chain`]),
    );
    const home = {
      file: LEGAL_HOME,
      text: 'await client.from("legal_documents").delete().in("id", ids);',
    };
    expect(legalChainFindings([home])).toEqual([]);
    const byUser = { file, text: 'await c.from("legal_acceptances").delete().eq("user_id", id);' };
    expect(legalChainFindings([byUser]), "a delete by user is the pool's reset").toEqual([]);
    const reads = {
      file,
      text: 'await c.from("legal_versions").select("id").eq("document_id", d);',
    };
    expect(legalChainFindings([reads]), "a read is not the chain").toEqual([]);
    const commented = { file, text: '// c.from("legal_versions").delete().in("id", ids)\n' };
    expect(legalChainFindings([commented])).toEqual([]);
    const noticeByVersion = {
      file,
      text: 'await c.from("legal_notices").delete().in("version_id", ids);',
    };
    expect(legalChainFindings([noticeByVersion]).map((f) => f.line)).toEqual([1]);
    for (const path of e2eFiles())
      expect(legalChainFindings([{ file: path, text: readFileSync(path, "utf8") }]), path).toEqual(
        [],
      );
  });

  it("planted: CF-HELPERS-15 refuses admin-guides.spec.ts at b355cbe00 (its own isCardTwin), and passes every e2e file today", () => {
    // e2e/admin-guides.spec.ts at b355cbe00, lines 67 to 70, as `git show` prints them.
    const base = [
      "const TWIN_BOUNDARY = 1024;",
      "function isCardTwin(page: Page) {",
      "  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;",
      "}",
      "",
    ].join("\n");
    const dir = mkdtempSync(join(tmpdir(), "cf-helpers-15-"));
    try {
      const planted = join(dir, "admin-guides.spec.ts");
      writeFileSync(planted, base);
      expect(cardTwinFindings([planted]).map((f) => [f.line, f.key])).toEqual([
        [2, `${planted} isCardTwin`],
      ]);
      const arrow = join(dir, "arrow.spec.ts");
      writeFileSync(
        arrow,
        "const isCardTwin = (page: Page) => (page.viewportSize()?.width ?? 1280) < 1280;\n",
      );
      expect(cardTwinFindings([arrow]).map((f) => f.line)).toEqual([1]);
      const caller = join(dir, "caller.spec.ts");
      writeFileSync(
        caller,
        'import { isCardTwin } from "./helpers/layout";\nconst card = isCardTwin(page, 1024);\n',
      );
      expect(cardTwinFindings([caller]), "a caller is not a definition").toEqual([]);
      expect(cardTwinFindings([CARD_TWIN_HOME]), "the helper is the one body").toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    expect(cardTwinFindings(e2eFiles())).toEqual([]);
  });

  it("CF-HELPERS-14 the setup's error-report sweep reads the tags the two specs build", () => {
    const tag = (path: string) => {
      const text = readFileSync(path, "utf8");
      const found = /`\$\{SCRATCH_PREFIXES\.dash\}(erb|erep)`/.exec(text);
      return found === null ? null : `${SCRATCH_PREFIXES.dash}${found[1]}`;
    };
    expect(tag("e2e/admin-errors.spec.ts")).toBe(SCRATCH_PREFIXES.errorReportStaff);
    expect(tag("e2e/error-reports.spec.ts")).toBe(SCRATCH_PREFIXES.errorReportSender);
  });

  it("CF-HELPERS-8 the geometry check: INC-1121's 80 × 480 drawn box in an 80 × 60 frame fails with its sizes; fitting pictures pass", () => {
    const frame = { left: 0, top: 0, width: 80, height: 60 };
    const picture = (over: Partial<PictureMeasure>): PictureMeasure => ({
      testId: "my-listing-x-picture",
      src: "https://x.example/card.jpg",
      loaded: true,
      natural: { width: 360, height: 480 },
      content: frame,
      fit: "cover",
      position: "50% 50%",
      frame: { fit: "cover", box: frame },
      ...over,
    });
    const fits = (pictures: PictureMeasure[], failed: string[] = [], atLeast = 1) =>
      pictureFitProblems({ pictures, failed }, atLeast);

    const sliver = fits([picture({ content: { left: 0, top: 0, width: 80, height: 480 } })]);
    expect(sliver).toEqual([
      "my-listing-x-picture: the image's box overflows its frame — natural 360×480, drawn 80×480, frame 80×60 (https://x.example/card.jpg)",
      "my-listing-x-picture: a cropped picture does not fill its frame — natural 360×480, drawn 80×480, frame 80×60 (https://x.example/card.jpg)",
    ]);
    expect(fits([picture({})])).toEqual([]);

    // A whole picture: a square in a 4:3 box touches top and bottom; drawn wide it fails.
    const contain = { fit: "contain", frame: { fit: "contain", box: frame } };
    expect(fits([picture({ ...contain, natural: { width: 512, height: 512 } })])).toEqual([]);
    expect(
      fits([picture({ ...contain, fit: "fill", natural: { width: 512, height: 512 } })]).map(
        (line) => line.split(" — ")[0],
      ),
    ).toEqual([
      "my-listing-x-picture: drawn with object-fit fill, its frame says contain",
      "my-listing-x-picture: a whole picture is drawn out of its ratio",
    ]);
    // The QR's padding: the content box inside the frame, the picture whole inside it.
    const padded = { left: 9, top: 9, width: 182, height: 182 };
    const qr = { left: 1, top: 1, width: 198, height: 198 };
    expect(
      fits([
        picture({
          fit: "contain",
          natural: { width: 200, height: 200 },
          content: padded,
          frame: { fit: "contain", box: qr },
        }),
      ]),
    ).toEqual([]);
    // The gallery's object-top: a wide photo at the top of its 4:3 frame still fits.
    expect(
      fits([picture({ ...contain, natural: { width: 1600, height: 900 }, position: "50% 0%" })]),
    ).toEqual([]);

    expect(fits([picture({ loaded: false, natural: { width: 0, height: 0 } })])[0]).toMatch(
      /^my-listing-x-picture: never loaded — /,
    );
    expect(fits([picture({ frame: null })])[0]).toMatch(/drawn outside Picture/);
    expect(fits([], ["gallery-main"])).toEqual([
      "0 picture(s) measured, at least 1 expected",
      "gallery-main: the failed-load state is showing",
    ]);
    expect(fits([], [], 0)).toEqual([]);
  });
});
