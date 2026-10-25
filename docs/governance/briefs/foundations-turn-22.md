# Foundations — turn 22: one UUID shape for the browser and the server (src/lib/uuid.ts); the six form-kit-turn walkers onto the conformance kit — INC-857 closed: brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 22 (2026-10-25; DEC-237; anchors located at a48a2171eac2f3f11432aceaf45696d3b268e62e). Tier B (guards, tests and three client parsers of an id; no screen changes what it shows). No migration. No new string. No package change. AGENTS.md: one phrase (Part D4). Base: dev a48a2171eac2f3f11432aceaf45696d3b268e62e (Foundations turn 21's final commit; its CI run: A1). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the one UUID shape; C — the six walkers onto the kit; D — docs, register, roadmap, changelog.
BASE: a48a2171eac2f3f11432aceaf45696d3b268e62e
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
AGENTS.md
src/lib/uuid.ts
src/lib/schemas/primitives.ts
src/components/shell/location-data.ts
src/components/shell/place-carry.ts
src/features/posting/post-prefill.ts
src/features/posting/post-prefill.test.ts
scripts/conformance/routes.test.ts
scripts/conformance/routes-allowlist.txt
eslint.config.js
scripts/conformance/kit-adoption.test.ts
scripts/conformance/kit-adoption-allowlist.txt
src/look-law.test.ts
scripts/admin-tables.ts
scripts/destructive-red.ts
scripts/list-action-labels.ts
src/features/legal/agree-to-document.test.tsx
src/features/legal/use-legal-gate.test.tsx
SCOPE-END

THE SYSTEM (G0) — two concerns; both close INC-857.
CONCERN 1: an id's UUID shape is judged by one definition, in the browser and on the server alike (OWASP ASVS V5.1.3 — input validated against one positive allowlist).
MECHANISM 1: NONE YET for the browser — the one literal lives in src/lib/schemas/primitives.ts :15, a zod module the browser may import as `type` only (its header :5-:11, MUST_STAY_LAZY, INC-864), so three client files keep their own copies. Built in Part B as NEW src/lib/uuid.ts (no imports at all, so it can never pull zod or the server onto the first paint); primitives.ts imports and re-exports it.
CONSUMERS 1 (grep of a48a2171 for the literal `[0-9a-f]{8}-[0-9a-f]{4}-` under src/, tests excluded — CF-RT-3's own census, scripts/conformance/routes.test.ts :87-:90): src/lib/schemas/primitives.ts :15 (the definition; translate.ts :3 imports it) — uses; src/components/shell/location-data.ts :66 (used :83) — bypasses (a copy); src/components/shell/place-carry.ts :26 (used :44) — bypasses (a copy); src/features/posting/post-prefill.ts :13 (used :19, :20) — bypasses (a copy WITHOUT the `i` flag: an upper-case id is dropped — PF-1 pins it); src/integrations/supabase/previewAuthStorage.ts :48 — the platform's generated file (ESLint-ignored, eslint.config.js :20; INC-087), a v4-only preview-host pattern that is not our shape and cannot be edited.
CONCERN 2: every census guard walks the tree through the conformance kit (register row 28, DEC-244).
MECHANISM 2: scripts/conformance/kit.ts — walkFiles (:6-:26), visitTs (:36-:49).
CONSUMERS 2 (scripts/conformance/kit-adoption-allowlist.txt, the six lines "guard not yet moved (form-kit turn) | INC-857"): src/look-law.test.ts (readdirSync :19, createSourceFile :29) · scripts/admin-tables.ts (readdirSync :110, under src/features) · scripts/destructive-red.ts (readdirSync :166, under src) · scripts/list-action-labels.ts (readdirSync :314, under src) · src/features/legal/agree-to-document.test.tsx (readdirSync :92) · src/features/legal/use-legal-gate.test.tsx (dynamic readdirSync :159-:162, src/routes only) — all bypass.
COVERED HERE: the three client copies onto src/lib/uuid.ts; the six walkers onto kit.ts; INC-857 closed. LEFT: previewAuthStorage.ts stays on the routes allowlist with its own reason (the platform's file, INC-087); the five door-turn walkers (INC-858) are unchanged.
CONFORMANCE GUARDS: CF-RT-3 (routes.test.ts) — the literal lives only in src/lib/uuid.ts (its title and its one excused path change; CF-RT-4's planted fixture already proves the literal is detected); CF-ADOPT-1 (kit-adoption.test.ts) — the census floor 15 → 13 (the census finds 19 files at BASE, 17 of them allowlisted; after this turn 13, 11 allowlisted). Red-first as C1 says.
EXCEPTIONS: src/integrations/supabase/previewAuthStorage.ts — allowlist line (reason above) until INC-087.
FIVE LENSES — security: one positive shape for an id in every layer; a client copy can no longer drift from the server's (post-prefill's case-sensitive copy already had) · performance: uuid.ts has no imports — no first-paint cost; the walkers read the same files as before · failure modes: an upper-case id in /post?category=… or ?place=… is now kept and lower-cased (it used to be dropped silently); everything else answers as before · consistency: one UUID literal under src/; every census on one walk · future growth: a new id parser imports uuid.ts; a new census is one kit file.
FORWARD-SCAN: the form kit (Foundations item 3, next) builds its guard on kit.ts (CF-ADOPT holds it); the door manifest (item 5) retires the INC-858 walkers. REGISTER: docs/governance/mechanisms.md rows 13 and 28.

WHY
- INC-857 was scheduled with the form kit: the three client UUID copies (one already disagrees with the server about letter case) and the six walkers left on the kit-adoption allowlist. Both are mechanical, and both must be gone before the form kit's own census lands.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-22.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-22.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-22.md (Foundations turn 22: one UUID shape; the six walkers onto the kit — INC-857)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 21 (docs/governance/briefs/foundations-turn-21", add `  - [ ] Turn 22 (docs/governance/briefs/foundations-turn-22.md; no migration) — one UUID shape in src/lib/uuid.ts for the browser and the server; the six form-kit-turn walkers onto scripts/conformance/kit.ts; INC-857 closed.` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–D with their tests; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: this turn changes no spec and no helper; a spec change you find necessary is a STOP with the test and line reported.
- Run no stateful git command. Edits with your file-editing tool.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-22.md, roadmap.md, docs/_changelog.md, docs/features/ci-guards.md, docs/features/routes.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-22.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (only if they move). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. After each batch of files: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the batch touched. The routes allowlist lines and the ESLint ignore lines leave in the SAME batch (CF-RT-5 compares them both ways).
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-17 (and at times EXH-11) times out in your sandbox (INC-890; they pass in CI). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each batch touched as you go; THE END-TO-END CHECK's spec, both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: every screen answers as at <START>, with one recorded change — /post?category=<id>&place=<id> keeps an upper-case id and lower-cases it (PF-1, B4) instead of dropping it. Every walker returns the same files as before (the same extensions and skips; only their order may now be walkFiles' sorted order). Each walker's own test passes unchanged.
- Expected results (the supervisor's run of exactly this change in a clone of a48a2171): the whole unit suite green apart from INC-890; `bun run lint` 0 errors, 40 warnings; CF-RT-1…8 and CF-ADOPT-1/2 pass; the kit-adoption census line prints `census: 13 files, allowances: 11, breaches: 0`.
- Knowledge K: K1 the two mechanisms above; K2 the report lists every remaining UUID literal under src/ and every file the kit-adoption census still finds (file:line), allowlisted or not; K3 the guards change in the same batches as their consumers; K4 no literal language or country code; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row; no assertion loosened — PF-1's second line changes because the behaviour changes (B4), and the report says so; red-first as C1 says.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on a48a2171eac2f3f11432aceaf45696d3b268e62e). A red on a48a2171eac2f3f11432aceaf45696d3b268e62e is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part C.

PART B — THE ONE UUID SHAPE (CONCERN 1).
B1. NEW src/lib/uuid.ts, exactly these lines:
/**
 * Foundations turn 22 (INC-857) — THE ONE UUID SHAPE, for the browser and the
 * server alike. No imports: a screen reads it without pulling zod onto the
 * first paint (src/lib/schemas/primitives.ts builds its zod shape from it).
 * CF-RT-3: this literal lives nowhere else under src/.
 */
export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
B2. src/lib/schemas/primitives.ts: add `import { UUID_RE } from "@/lib/uuid";` after the address import (:3); the comment and the definition at :14-:15 become
/** The one UUID shape lives in src/lib/uuid.ts (CF-RT-3); re-exported for the schemas. */
export { UUID_RE };
   — `uuid` (:16) and every other line stay; translate.ts keeps importing UUID_RE from "./primitives".
B3. src/components/shell/location-data.ts (:66) and src/components/shell/place-carry.ts (:26): the local `const UUID_RE = …` line goes and `import { UUID_RE } from "@/lib/uuid";` joins the file's imports; the uses (:83, :44) are unchanged.
B4. src/features/posting/post-prefill.ts: the local `const UUID = …` (:13) and the blank line after it go; `import { UUID_RE } from "@/lib/uuid";` joins the imports; :19-:20 become `if (typeof category === "string" && UUID_RE.test(category)) out.category = category.toLowerCase();` and the same for `place` (an id kept is lower-cased, so the tree lookup that follows still finds it). src/features/posting/post-prefill.test.ts PF-1: its title becomes "PF-1 keeps two uuids in lowercase and drops everything else" and its second expectation becomes `expect(postSearchOf({ category: C.toUpperCase(), place: "not-a-uuid", other: C })).toEqual({ category: C });` (the rest of the file unchanged).
B5. scripts/conformance/routes.test.ts: in RT3_BREACHES (:87-:90) the excused path `"src/lib/schemas/primitives.ts"` becomes `"src/lib/uuid.ts"`, and CF-RT-3's title (:113) ends "lives only in src/lib/uuid.ts". scripts/conformance/routes-allowlist.txt: its INC-857 section — the comment line and the four lines under it — becomes exactly these two lines:
# INC-857 — closed (Foundations turn 22: one UUID shape in src/lib/uuid.ts for the browser and the server)
src/integrations/supabase/previewAuthStorage.ts | the platform's generated file, rewritten on every injection (INC-087): its preview-host project-id pattern :48 is the platform's, not a copy of ours | INC-087
   and eslint.config.js ROUTES-BOUNDARY-IGNORES (:159-:162) keeps one line, `"src/integrations/supabase/previewAuthStorage.ts", // the platform's file (INC-087)` — the same batch.

PART C — THE SIX WALKERS ONTO THE KIT (CONCERN 2).
C1. RED-FIRST: remove the six INC-857 lines from scripts/conformance/kit-adoption-allowlist.txt first and run kit-adoption.test.ts; paste the failing lines (expected: CF-ADOPT-1 reports the six files). Then C2–C7, then set CF-ADOPT-1's floor (:78) to 13 with its comment ending "(INC-856: 20 → 15; INC-857: 19 → 13)", and paste the passing census line.
C2. src/look-law.test.ts: `sourceFiles` (:18-:24) goes; LL-1 walks `walkFiles([resolve("src")], { ext: ["tsx"], skipTests: true, skip: /[\\/]src[\\/]components[\\/]ui$/ })` and visits each file with `visitTs(path, (node, source) => { … })` (the same node tests and finding line as today); the `readdirSync`/`readFileSync` import goes; `import { visitTs, walkFiles } from "../scripts/conformance/kit";`. Prove it still sees a file: plant a temporary src/features/zz-planted.tsx holding `rounded-lg border border-border bg-card`, run LL-1 (red, naming it), delete it.
C3. scripts/admin-tables.ts `readTableSources` (:107-:125): `walkFiles([join(root, "src/features")], { ext: ["tsx"], skipTests: true })` mapped to the same `{ file, text }` object as today (the path relative to root with forward slashes, the file read as UTF-8), sorted as today; `readdirSync` and `statSync` leave the fs import; `import { walkFiles } from "./conformance/kit";`.
C4. scripts/destructive-red.ts `readSources` (:163-:179): the same with root `join(root, "src")`.
C5. scripts/list-action-labels.ts `readTree` (:313-:325): `walkFiles([join(ROOT, "src")], { ext: ["tsx"], skipTests: true })` mapped to `{ file: relative(ROOT, path), text: readFileSync(path, "utf8") }`; the fs import keeps readFileSync and writeFileSync.
C6. src/features/legal/agree-to-document.test.tsx, the census (:89-:104): the matches come from `walkFiles([join(process.cwd(), "src")], { ext: ["ts", "tsx"], skipTests: true })`, filtered by the same two tests and mapped to `relative(process.cwd(), path)`; `readdirSync` leaves the fs import; `import { walkFiles } from "../../../scripts/conformance/kit";`.
C7. src/features/legal/use-legal-gate.test.tsx, the census (:158-:171): `walkFiles([dir], { ext: ["tsx"] })` filtered to files directly in src/routes whose name matches `/^auth.*\.tsx$/` (dirname equals the directory — the kit's walk recurses, the old read did not), then the same line scan; the dynamic import of readdirSync goes and the kit is imported dynamically beside node:fs and node:path.

PART D — DOCS.
D1. docs/features/ci-guards.md, the conformance-kit section: replace exactly
   The allowlist holds the fifteen guard walkers not yet moved (each until its wave's INC) and the six enumerators that are not guards (until DEC-244).
   with
   The allowlist holds the five guard walkers not yet moved (until INC-858, the door turn) and the six enumerators that are not guards (until DEC-244); INC-856 moved four walkers (Foundations turn 2) and INC-857 six (Foundations turn 22).
D2. docs/features/routes.md: replace exactly
   `routes-allowlist.txt` holds 4 exceptions after Foundations turn 20 (the six server functions left; INC-863 closed), down from 10 after
   with
   `routes-allowlist.txt` holds 1 exception after Foundations turn 22 (the platform's generated previewAuthStorage.ts, INC-087; INC-857 closed — one UUID shape in src/lib/uuid.ts), down from 4 after Foundations turn 20 (the six server functions left; INC-863 closed), down from 10 after
D3. docs/governance/mechanisms.md, exactly these three replacements and nothing else (paste the count of each old text first; each occurs once):
   (a) in row 13, replace
   routes-allowlist.txt (4): INC-857, the helper set (INC-861 closed, Foundations turn 19; INC-863 closed, Foundations turn 20)
   with
   routes-allowlist.txt (1): the platform's generated previewAuthStorage.ts (INC-087), the helper set (INC-861 closed, Foundations turn 19; INC-863 closed, Foundations turn 20; INC-857 closed, Foundations turn 22 — one UUID shape, src/lib/uuid.ts)
   (b) in row 28, replace
   kit-adoption-allowlist.txt (11 walkers until their waves; 6 enumerators until DEC-244)
   with
   kit-adoption-allowlist.txt (5 walkers until INC-858; 6 enumerators until DEC-244)
   (c) in row 28, replace
   INC-856 ✓ (the four walkers moved, Foundations turn 2)
   with
   INC-856 ✓ (the four walkers moved, Foundations turn 2); INC-857 ✓ (the six walkers moved, Foundations turn 22)
D4. AGENTS.md — the rule for the new module is exactly this one line's change. Replace exactly this text
   outside calls via `upstream()`; dials only from src/lib/dials.ts
   with
   outside calls via `upstream()`; UUIDs only via src/lib/uuid.ts; dials only from src/lib/dials.ts
   Nothing else in the file changes; paste the file's byte count before and after (expected 5841 → 5873).
D5. docs/_changelog.md one entry "Foundations turn 22 (2026-10-25)"; roadmap.md the turn-22 line `[x]` with the final HEAD, the unit totals and the two counts (routes allowlist 4 → 1, kit-adoption allowlist 17 → 11).

THE CHECKS (in this order): `bun run lint` (paste the error and warning counts); `bun run test:unit` (paste totals and the CF-RT-, CF-ADOPT-, LL-, PF- lines and the kit-adoption census line); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: no change); `bun run format:check` last. THE END-TO-END CHECK (both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/post-wizard-category.spec.ts by `--grep "PW-181 |PW-182 "` and e2e/post-wizard-where.spec.ts by `--grep "PW-180 "` (the invite's ids through post-prefill), and e2e/locations-tree.spec.ts whole (the saved area's ids through location-data); paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-22.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; the red-first lines for CF-ADOPT-1 and LL-1's planted file; the K2 lists (file:line); the allowlist counts before and after; the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```