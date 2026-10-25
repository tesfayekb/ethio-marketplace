# Foundations — turn 21: one list per lint concern, composed by every block (INC-891); the outside call's success line at info (INC-892); the abort-log reading (INC-893, read-only): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 21 (2026-10-25; DEC-237; turn 20's report and the supervisor's verification; anchors located at 88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba). Tier A (the guards over every route and server file; the one outside call). No migration. No new string. No package change. AGENTS.md: no change. Base: dev 88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba (Foundations turn 20's final commit; its CI run: A1). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the lint lists and their guard (INC-891); C — the outside call's log level (INC-892); D — docs, register, roadmap, changelog; E — the abort-log reading (INC-893, read-only).
BASE: 88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
eslint.config.js
scripts/conformance/lint-rules.test.ts
src/server/upstream.ts
src/server/upstream.test.ts
SCOPE-END

THE SYSTEM (G0)
CONCERN: a lint rule that guards a concern reaches every file the concern owes; no later config block silently drops it (OWASP ASVS V14.1 — build-time security controls that cannot be bypassed by configuration order).
MECHANISM: NONE YET — built in Part B as `RESTRICTED_SYNTAX` in eslint.config.js: one list per `no-restricted-syntax` concern (typedClient DEC-025, caughtError INC-815, routeBoundary DEC-237, specLint DEC-027), each list its concern's one definition; every block that sets `no-restricted-syntax` composes the lists its files owe. Why: ESLint flat config REPLACES a rule's options for a file — the last matching block that sets `no-restricted-syntax` wins whole. The route-boundary block (eslint.config.js :99-:138 at BASE, files src/routes/** and src/server/**) therefore drops the src-wide block's INC-815 selector (:69-:73) and DEC-025 selector (:64-:68) for every route and server file it covers: 121 of the 814 tracked src files at BASE have no INC-815 selector in their computed config (the supervisor's census with ESLint 9.39.4 `calculateConfigForFile`). Turn 20 moved the six route files into that block, which is why src/routes/__root.tsx:185's INC-815 disable became "unused" (lint warning 41 at BASE). No live bypass today: `instanceof Error` in src/routes/** and src/server/** (tests excluded) is 2 lines — src/routes/__root.tsx:186 and src/server/answer.ts:139 — both carrying their disable.
CONSUMERS (grep of 88bfbc1b for `"no-restricted-syntax"` in eslint.config.js — every block that sets the rule): :62 the src-wide block (files src/**/*.{ts,tsx}: DEC-025 + INC-815, inline) — becomes the lists; :83 the INC-815 exemption block (files src/**/*.test.{ts,tsx} and src/lib/lovable-error-reporting.ts: a hand-restated copy of DEC-025's selector) — becomes the list; :117 the route-boundary block (four selectors, inline; DEC-025 and INC-815 dropped) — bypasses, becomes typedClient + caughtError + routeBoundary; :144 the spec-lint block (files e2e/**/*.ts, three selectors, inline) — becomes the list. The guard over the route-boundary block's ignores (CF-RT-5) is unchanged.
COVERED HERE: all four blocks onto the lists; INC-891 closed. LEFT: none.
CONFORMANCE GUARD: NEW scripts/conformance/lint-rules.test.ts on the kit (walkFiles, TREE_SCAN_MS): CF-LINT-1 every tracked file under src/ that ESLint does not ignore carries, in its computed config (`ESLint#calculateConfigForFile`), every selector of every list the owed table gives it — typedClient for every file, caughtError for every file except `*.test.ts(x)` and src/lib/lovable-error-reporting.ts; CF-LINT-2 every e2e/**/*.ts carries specLint; CF-LINT-3 (the planted breach) `ESLint#lintText` of a function returning `e instanceof Error` reports the INC-815 message at src/features/planted-lint.ts, src/routes/planted-lint.tsx and src/server/planted-lint.ts and does not at src/features/planted-lint.test.ts, and `missingLists(["caughtError"], [])` names caughtError. No allowlist: the owed table's two exemptions are INC-815's own rule, not exceptions.
EXCEPTIONS: none.
FIVE LENSES — security: INC-815's guard reaches every route and server file again (121 files), and a future block cannot drop a concern's selectors without CF-LINT-1 failing · performance: lint config only, nothing at runtime; CF-LINT-1/2 compute about 900 configs in about a second (supervisor's run); C moves a success log line from error to info — no cost change · failure modes: a block that forgets a list fails CF-LINT-1 with the file and the list named; the upstream log keeps every non-2xx/3xx answer and every timeout at console.error · consistency: one definition per selector list; the DEC-025 selector's second hand copy (the exemption block) is retired · future growth: a new lint concern is one list and one owed-table line; a new block composes the lists its files owe.
FORWARD-SCAN: the locale/format mechanism (Foundations item 6) adds lint selectors for Intl sites and pinned locales — it becomes one more list here, owed by every src file; the form kit's lint (Foundations item 3) the same. REGISTER: docs/governance/mechanisms.md — NEW row 38 (this mechanism); row 15's guard column names CF-LINT.

WHY
- A guard that silently stops applying is worse than no guard: the route-boundary block, added in Foundations turn 2, switched INC-815's caught-error rule off for every route and server file, and nothing noticed until turn 20 left an unused disable behind.
- Since turn 20 the root layout's language read runs through upstream(), so every server-rendered page now writes one error-level log line for a successful read (INC-892).
- Turn 20's smoke run logged abort stacks with "status 500" before `[client-aborted]` at sign-out (INC-893); the cause is unread.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-21.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-21.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-21.md (Foundations turn 21: one list per lint concern — INC-891; the outside call's success line at info — INC-892)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 20 (docs/governance/briefs/foundations-turn-20", add `  - [ ] Turn 21 (docs/governance/briefs/foundations-turn-21.md; no migration) — one list per no-restricted-syntax concern in eslint.config.js, composed by every block, CF-LINT-1…3 (INC-891); upstream()'s success line at info (INC-892); the abort-log reading (INC-893).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–E with their tests; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: this turn changes no spec and no helper; a spec change you find necessary is a STOP with the test and line reported.
- Run no stateful git command. Edits with your file-editing tool.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-21.md, roadmap.md, docs/_changelog.md, docs/features/ci-guards.md, docs/features/routes.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-21.report.md (your completion report, as in turn 20), docs/generated/i18n-usage.json and public/i18n-usage.json (only if they move). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. After each batch of files: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the batch touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-17 times out in your sandbox (INC-890; it passes in CI). Do not change, skip or work around it; paste its failure line under limits. Every other test must pass.
- Local runs: the unit suite whole after Part B, after Part C and at THE CHECKS; THE END-TO-END CHECK's spec, both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: lint findings stay exactly as at <START> except that src/routes/__root.tsx:185's disable is used again (expected `bun run lint`: 0 errors, 40 warnings — the supervisor's run of this exact config); no app behaviour changes except upstream()'s log level for an answer below 400.
- Knowledge K: K1 the mechanism above; K2 the report lists every block in eslint.config.js that sets `no-restricted-syntax` and every other rule key set in more than one block for the same files (file:line), composed or not; K3 the guard lands with the mechanism (Part B); K4 no literal language or country code; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row; no assertion loosened; red-first for the guard as B2 says.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on 88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba). A red on 88bfbc1b0e42990be0e22c60b72a5fc31a3dcfba is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part C.

PART B — THE LINT LISTS AND THEIR GUARD (INC-891).
B1. eslint.config.js: directly above `export default tseslint.config(` (:8), add exactly this block (then one blank line):
/**
 * Foundations turn 21 (INC-891) — ONE LIST PER LINT CONCERN. Flat config
 * REPLACES a rule's options for a file: a later block that sets
 * `no-restricted-syntax` drops every selector an earlier block gave the same
 * file. Each list below is its concern's one definition; every block composes
 * the lists its files owe, and scripts/conformance/lint-rules.test.ts
 * (CF-LINT-1…3) checks every file under src/ and e2e/ against the owed table.
 */
export const RESTRICTED_SYNTAX = {
  // DEC-025 — typed clients: every file under src/.
  typedClient: [<the selector object now at :64-:68, moved unchanged>],
  // INC-815 — a caught error is read with errorText: every file under src/
  // except the tests and the platform's lovable-error-reporting.ts.
  caughtError: [<the selector object now at :69-:73, moved unchanged>],
  // DEC-237 — the route boundary: src/routes/** and src/server/** outside the
  // block's ignores (CF-RT-5 keeps those equal to routes-allowlist.txt).
  routeBoundary: [<the four selector objects now at :119-:135, moved unchanged, in order>],
  // DEC-027 — spec lint: every e2e/**/*.ts.
  specLint: [<the three selector objects now at :146-:157, moved unchanged, in order>],
};
B2. NEW scripts/conformance/lint-rules.test.ts as CONFORMANCE GUARD says, exporting `owedLists(file)` (the owed table: `e2e/` → ["specLint"]; a `*.test.ts(x)` file or src/lib/lovable-error-reporting.ts → ["typedClient"]; every other src file → ["typedClient", "caughtError"]) and `missingLists(owed, selectors)` (the owed lists any of whose selectors is absent), importing `RESTRICTED_SYNTAX` from "../../eslint.config.js" and the walk from ./kit; each test under TREE_SCAN_MS; the file's header comment names INC-891. RED-FIRST: with B1 saved and the four blocks still inline, run it and paste the failing lines — expected: CF-LINT-1 fails listing 121 files (each "typedClient, caughtError"), CF-LINT-2 passes, CF-LINT-3 fails on the route file. Then B3.
B3. The four blocks compose the lists, their inline selector objects removed: :62 → `"no-restricted-syntax": ["error", ...RESTRICTED_SYNTAX.typedClient, ...RESTRICTED_SYNTAX.caughtError]`; :83 → `"no-restricted-syntax": ["error", ...RESTRICTED_SYNTAX.typedClient]`; :117 → `"no-restricted-syntax": ["error", ...RESTRICTED_SYNTAX.typedClient, ...RESTRICTED_SYNTAX.caughtError, ...RESTRICTED_SYNTAX.routeBoundary]`; :144 → `"no-restricted-syntax": ["error", ...RESTRICTED_SYNTAX.specLint]`. Every comment, `files`, `ignores` (ROUTES-BOUNDARY-IGNORES included) and other rule stays. Run `bunx prettier --write eslint.config.js`, then paste `sha256sum eslint.config.js` — the supervisor's build of exactly this change prints 622d60afda68dce1992d6dee8180563f7ebb55c6d90ab059d69705109c3e8727; a difference is not a STOP: paste `git diff <START> -- eslint.config.js` in the report. Then CF-LINT-1…3 and CF-RT-1…8 pass, and `bun run lint` shows 0 errors, 40 warnings (paste both counts and confirm no warning remains at src/routes/__root.tsx:185).

PART C — THE OUTSIDE CALL'S LOG LEVEL (INC-892).
C1. src/server/upstream.ts :32 — replace exactly this line
   console.error(`[upstream] ${opts.label} ${response.status} ${Date.now() - started}ms`);
   with exactly these four lines (same indentation)
   const line = `[upstream] ${opts.label} ${response.status} ${Date.now() - started}ms`;
   // INC-892: an answer below 400 is information, a 4xx or 5xx an error; a timeout stays an error.
   if (response.status < 400) console.info(line);
   else console.error(line);
   The timeout line (:40) and everything else stay.
C2. src/server/upstream.test.ts: NEW UPS-4 — a 200 answer logs exactly one console.info line containing "[upstream] provider 200" and no console.error line; a 404 answer logs one console.error line containing "[upstream] provider 404" and no console.info line (spies on both, the existing afterEach restores them). UPS-1…3 unchanged. Red-first: paste UPS-4 failing against the old line (run it before C1 is saved), then passing.

PART D — DOCS.
D1. docs/features/ci-guards.md: at the end of the section "## INC-815 — lint refuses `instanceof Error` on a caught error" (before "## Turn 30 (2026-10-23)"), add a paragraph "INC-891 (Foundations turn 21) — one list per lint concern": flat config replaces a rule's options per file, so the route-boundary block had dropped INC-815's (and DEC-025's) selector for every route and server file since Foundations turn 2 (121 files); `RESTRICTED_SYNTAX` in eslint.config.js holds each concern's one list (typedClient, caughtError, routeBoundary, specLint), every block composes the lists its files owe, and scripts/conformance/lint-rules.test.ts CF-LINT-1…3 checks every file's computed config against the owed table and lints a planted breach at a screen, a route and a server path.
D2. docs/features/routes.md: at the end of the section "## The boundary's order" add one sentence: "upstream() logs one line per call — `[upstream] <label> <status> <ms>` at info for an answer below 400, at error for a 4xx, a 5xx or a timeout (INC-892, Foundations turn 21)".
D3. docs/governance/mechanisms.md, exactly these five replacements and nothing else (each old text occurs once; paste the count of each before replacing):
   (a) in row 13 (the row that begins "| 13 | A route's authority"), replace
   defineRoute + `createServerFn().validator(<schema>)` / `src/lib/schemas/server-fns.ts` (the caller before the read, INC-865; `refuseAs`; auth none and per-route badShape)
   with
   defineRoute (the caller before the read, INC-865; `refuseAs`; auth none and per-route badShape) + `createServerFn().validator(<schema>)` / `src/lib/schemas/server-fns.ts`
   (b) in row 15, replace
   the ESLint rule of INC-815 (no `instanceof Error` on a caught error)
   with
   the ESLint rule of INC-815 (no `instanceof Error` on a caught error), reaching every file it owes (CF-LINT-1…3, row 38)
   (c) directly after row 37 (the row that begins "| 37 | An executor's work"), add this line
   | 38 | A lint concern's rule reaches every file it owes — no later block drops it (INC-891) | `RESTRICTED_SYNTAX` in `eslint.config.js` — one list per concern (typedClient DEC-025, caughtError INC-815, routeBoundary DEC-237, specLint DEC-027), composed by every block that sets `no-restricted-syntax` | `scripts/conformance/lint-rules.test.ts` CF-LINT-1…3 (each file's computed config against the owed table; a planted `instanceof Error` refused at a screen, a route and a server path) | the owed table's two caughtError exemptions: test files and `src/lib/lovable-error-reporting.ts` (INC-815) | a new concern is one list and one owed-table line; a new block composes the lists its files owe | Foundations turn 21 |
   (d) replace
   - AI: GWC census landed with `aiCall` (rows 11, 12); one existing provider call remains explicitly allowlisted until INC-876.
   with
   - AI: GWC census landed with `aiCall` (rows 11, 12); the AI allowlist is empty since Foundations turn 19 (INC-876 ✓).
   (e) replace
   INC-853/INC-854 owed (the e2e-helpers wave of the kit adoption).
   with
   INC-853/INC-854 owed (the e2e-helpers wave of the kit adoption); INC-891 ✓ (CF-LINT-1…3, Foundations turn 21).
D4. docs/_changelog.md one entry "Foundations turn 21 (2026-10-25)"; roadmap.md the turn-21 line `[x]` with the final HEAD, the unit totals, the lint counts and Part E's one-line finding.

PART E — THE ABORT-LOG READING (INC-893; read-only — no file changes for it).
E1. During THE END-TO-END CHECK's smoke run, keep the whole output. Paste: (a) for the first two `[client-aborted]` lines, every server-log line from that request's first line to the `[client-aborted]` line (at most 40 lines each); (b) the first complete stack that carries "status 500" — every frame; (c) the file and function that writes it: grep its first message line in node_modules/@tanstack, node_modules/srvx, node_modules/h3 (each that exists) and src/, and paste the hits with file:line; (d) whether the `/_serverFn/` request's lines differ from the `/api/` ones, and how. No fix; the supervisor classifies it.

THE CHECKS (in this order): `bun run lint` (paste the error and warning counts); `bun run test:unit` (paste totals and the CF-LINT-, CF-RT-, UPS- lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: no change); `bun run format:check` last. THE END-TO-END CHECK (both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/smoke-auth-i18n.spec.ts whole; paste every count line, the server log's `[ssr-error]` count by path, the `[upstream]` lines' levels as seen, and Part E.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-21.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; the red-first lines for CF-LINT and UPS-4; eslint.config.js's sha256 (and its diff if it differs); the lint counts before and after; the K2 list (file:line); Part E's four answers; the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```
