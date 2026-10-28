# Foundations — turn C1-2: turn C1 completed — a map says its own failures in place, Leaflet's too (INC-956); DEC-281; the posting pages' ceilings (the red first); the records: brief (saved unchanged, 2026-10-28)

```text
FOUNDATIONS — TURN C1-2 (2026-10-28; G0; INC-956, INC-957's instance — DEC-281, INC-955, INC-958, INC-961, INC-962, INC-963; register rows 52, 57 and 64, new; anchors located at 24815c467d781a9b7781d174561258f86231fd05). Turn C1 stopped once (docs/governance/reports/foundations-turn-c1.stop-1.md) and landed Parts A–E at `24815c46` without AP-55, DEC-281 and Part F. This turn completes it, with the supervisor's rulings on the stop's two questions and the red of the landing's own run. FIRST, THE RED ON BASE (§8 — the fix travels first): run 40655391634 on BASE failed in one job only, the first-paint bundle budget — "Per-page budget failed (D234): /my-listings_/$listingId_/edit: 393.2 KiB, /post: 393.1 KiB, /post_/$listingId: 393.1 KiB, over their ceiling of 393 KiB"; every browser test passed (ODE-1 among them: INC-961's fix holds). The ratchet (scripts/route-budgets.mjs: measured + 3 KiB, raised in a commit that says why) had 3 KiB of room on these pages on 2026-10-26 (389.8 KiB); turns 34c–K3 used 2.6 of it and turn C1's pin type and notice outlet 0.7 (the supervisor's measure of the page's chunks: the entry +0.25, the notice outlet's own chunk 0.23, the pin type in the posting's shared chunk +0.22). The three ceilings become 397 (393.2 + 3, rounded up), the measure noted on each line. RULING 1 (the stop's first question): every map says its own failures in place — the still map's and the large map's later downloads (Leaflet, the tile plan; map-preview.tsx :115, map-large.tsx :77) raised the shell's notice while their own chunk's failure is said in place, so at 360 px the dialog showed two messages. They now draw the same failure and Refresh in their box (`MapFailedHere`, map-frame.tsx — one pair of test ids for every still map, `map-failed` / `map-refresh`, one for the large map, `map-large-failed` / `map-large-refresh`), as the pin map already did (PMD-1); CF-RLF-1 now reads the module an in-place call fetches and refuses its shell notices. RULING 2 (the stop's second question): FLAGS drops `no-new-string` — DEC-281 changes one Amharic value (the supervisor's slip S462: the flag forbids any change under src/i18n/locales/). Tier A (turn C1's pin precision rides this landing to main). No migration. No new string key (one Amharic value changes). No package change. AGENTS.md unchanged. No file deleted. Base: dev 24815c467d781a9b7781d174561258f86231fd05 (turn C1's stop 1; CI FAILURE on 24815c46 (run 40655391634, completed 2026-10-28T08:32:21Z): every job green but the first-paint bundle budget — "Per-page budget failed (D234)": /my-listings_/$listingId_/edit 393.2 KiB, /post and /post_/$listingId 393.1 KiB, over their ceiling of 393 KiB (Part B); every browser test passed, ODE-1 among them; main not promoted). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0; B — the posting pages' ceilings (the red's fix), red first; C — the maps' guards, red first; D — the maps say their own failures, green; E — AP-55; F — DEC-281; G — the records; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: 24815c467d781a9b7781d174561258f86231fd05
FLAGS: no-migration, no-package-change, no-agents-change
SCOPE-BEGIN
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/instructions-amendments.md
docs/tracking/incidental-findings.md
e2e/ad-page.spec.ts
public/i18n-usage.json
scripts/conformance/kit.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/resilient-fallbacks.test.ts
scripts/route-budgets.mjs
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-offline.test.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx
src/i18n/locales/am-base.ts
SCOPE-END

THE SYSTEM (G0) — two concerns.
1 — CONCERN: a piece that cannot download says so once, in its place, never with its loading word (register row 52; INC-956) — by its definition, every download the piece makes: its own chunk AND what it fetches when it draws.
MECHANISM: src/lib/resilient-lazy.ts `resilientLazy(…, { inPlace })` and LoadFailedHere (turn C1); now `MapFailedHere({ large })` (src/features/posting/map/map-frame.tsx): LoadFailedHere with the map's one pair of test ids, drawn by the maps' resilientLazy fallbacks (listing-detail.tsx, step-where.tsx) and by the maps themselves when Leaflet or the tile plan cannot download (map-preview.tsx, map-large.tsx: a `failed` state, one `[client-error]` line, the failure over the map's box).
CONSUMERS (grep of 24815c467d781a9b7781d174561258f86231fd05: `grep -rn "reportOnDemandFailure\|LoadFailedHere" src --include=*.ts --include=*.tsx` and every resilientLazy call): the in-place pieces' modules — map-preview.tsx :115 and map-large.tsx :77 (`reportOnDemandFailure` — bypass), map-pin-dropper.tsx :266 (in place since turn 34b-3 — uses); the fallbacks — listing-detail.tsx :77, :86 and step-where.tsx :78 (LoadFailedHere with three different id pairs) — onto MapFailedHere; the shell's other reporters (overlay-facade.tsx :138, :459; use-category-glyphs.ts :46; use-auth.ts :80, :121; i18n/provider.tsx :611, :641; settings.tsx :176; resilient-lazy.ts :34) are no in-place piece's module — unchanged.
COVERED HERE: the two maps' modules and the three fallbacks. LEFT: none.
CONFORMANCE GUARD: CF-RLF-1 (scripts/conformance/resilient-fallbacks.test.ts) widened — an in-place fallback renders LoadFailedHere or a component of src/ that renders it; the module an `inPlace` call fetches (its `import("…")`, directly or through a same-file `loadOnce`) never calls `reportOnDemandFailure` — red on BASE with 3 findings — listing-detail.tsx:55 and step-where.tsx:57 (map-preview.tsx is fetched in place but raises the shell's notice), listing-detail.tsx:61 (map-large.tsx, the same); CF-RLF-2 (planted: a loud in-place module named, a wrapped failure kept); MOF-1/2 (src/features/posting/map/map-offline.test.tsx: Leaflet refused — the still map's and the large map's place say so with Refresh, the shell's notice is not raised) — red on BASE; LDF-1 (its ids); AP-55 (e2e/ad-page.spec.ts — red at 360 in turn C1's stop 1); ODC-1 (scripts/conformance/on-demand-failure.test.ts) widened by the same definition — a file that renders a form of the in-place failure imported from the file that defines it answers a failure through the mechanism, so the maps that now draw MapFailedHere are users, not bypasses (the forms are read by ONE function, `failureFormsByFile` in scripts/conformance/kit.ts, for both censuses); ODC-6 (planted: the form imported answers, another component of the same file does not). ODC-1 and ODC-6 pass on BASE's maps — the widening's red is the supervisor's: Part D's maps without it fail ODC-1 three times (map-large.tsx, map-preview.tsx, listing-detail.tsx: "calls an on-demand loader and answers its failure without the mechanism"). No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: the maps' chunks gain a few lines; no page's first download moves (the supervisor's builds: no page changed by 0.05 KiB or more) · failure modes: the subject — one message, in the map's place, with its one cure · consistency: every map, every download, one component and one id pair · future growth: a new in-place piece's module is read by CF-RLF-1.
2 — CONCERN: a page's first download stays within its measured ceiling (D234's per-page budget, scripts/route-budgets.mjs read by scripts/check-bundle-size.mjs).
MECHANISM: the ratchet — unchanged; three lines raised by its own rule (measured + 3 KiB, rounded up, the measure on the line).
CONSUMERS: the three posting pages over their ceiling in run 40655391634 — raised; every other page — unchanged (the supervisor's builds show no page of this turn moving by 0.05 KiB; the executor's lock-exact build is the proof).
CONFORMANCE GUARD: check-bundle-size.mjs itself (CI's "First-paint bundle budget" job; its shrink rule refuses a ceiling more than 8 KiB above its page). EXCEPTIONS: none.
FIVE LENSES — security: none · performance: the subject — 3.4 KiB added to the posting pages since 2026-10-26 is accepted and named; their next saving lowers the line (the speed study, ACT-021) · failure modes: a page that grows past 397 fails CI · consistency: the ratchet's own rule · future growth: none.
FORWARD-SCAN: the speed study (D234) re-measures every line. REGISTER: rows 52, 57 updated and 64 added (Part G).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-c1-2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `docs/governance/briefs/foundations-turn-c1.md (Foundations turn C1: a pin is whole or absent, its precision known — INC-958; a notice is shown where the person is looking — INC-955; a piece that cannot download says so once, in its place — INC-956; DEC-281; INC-962)` becomes `docs/governance/briefs/foundations-turn-c1-2.md (Foundations turn C1-2: turn C1 completed — a map says its own failures in place, Leaflet's too — INC-956; DEC-281; the posting pages' ceilings; the records)` (everything after it stays, as it is). The roadmap's other lines change in Part G, by the applier — none of its blocks touches line 3. Commit `turn C1-2: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B to G; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md <paths>` with the paths each part names — never retyped, never edited or reflowed by hand. Every file a block writes is already in Prettier's form. A refusal from the applier is a STOP that pastes its line. If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-turn-c1-2.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-c1-2.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Part B (`turn C1-2 part B: the posting pages' ceilings at their measure (the red of run 40655391634)`); Parts C and D together (`turn C1-2 parts C-D: every map says its own failures in place (INC-956)`); Part E (`turn C1-2 part E: AP-55`); Part F (`turn C1-2 part F: DEC-281`); Part G (`turn C1-2 part G: the records of turns C1 and C1-2`); the report. Red first is shown, never committed.
- THE CHECKS run once (DEC-278): after Part G's commit, `bun .claude/hooks/land.ts --checks` (Bash timeout 1800000 ms); the landing then finds them green for the same tree.
- touching e2e/**: the authoring laws (docs/features/e2e-harness.md §Authoring laws, J1–J9) bind; e2e/ad-page.spec.ts changes by the applier only.
- Local runs: the touched unit tests as you go; browser tests at Part E and THE END-TO-END CHECK; no repeat runs (DEC-184). CI runs every test on every commit.
- Amharic (G43): one value changes — am-base.ts `feed.headingIn`, written by the applier. After Part F paste its code points with read-only standard tools (your Bash guard refused `python3 -c` in turn C1; `iconv` and `od`, as you did there, are fine) — expected `U+12E8 U+121B U+1235 U+1273 U+12C8 U+1242 U+12EB U+12CE U+127D` (the value `የ{location} ማስታወቂያዎች`).
- Behaviour contract: (a) every map says a failed download in its own place, once — the large map's dialog shows one message, the still map's box its own — and the shell's notice is no longer raised by any map; (b) the Amharic Home heading is the shorter wording; (c) the posting pages' ceilings are 397 KiB; (d) turn C1's records land. Nothing else changes.
- Knowledge K: K1 the census above is the supervisor's, at 24815c467d781a9b7781d174561258f86231fd05 — re-run `grep -rn "reportOnDemandFailure(" src --include=*.ts --include=*.tsx | grep -v "\.test\." | wc -l` (expected before Part D: 12; after: 10) and paste both. K2 the report lists every on-demand download of an in-place piece outside these lists (file:line; expected: none). K3: the guard lands with its mechanism. K4–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE or named in a part is a STOP. CI on BASE: FAILURE on 24815c46 (run 40655391634, completed 2026-10-28T08:32:21Z): every job green but the first-paint bundle budget — "Per-page budget failed (D234)": /my-listings_/$listingId_/edit 393.2 KiB, /post and /post_/$listingId 393.1 KiB, over their ceiling of 393 KiB (Part B); every browser test passed, ODE-1 among them; main not promoted. Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` and the failing job's three over-budget lines from `git show origin/ci-evidence:docs/tracking/guards-last-failure.md` — they are Part B's subject; any OTHER red is a STOP that names it.

PART B — THE POSTING PAGES' CEILINGS (the red's fix), RED FIRST.
B1. On BASE's tree: `bun run build`, then `node scripts/check-bundle-size.mjs` — RED, shown and not committed: paste its JS and CSS lines and the "Per-page budget failed" lines (expected, as CI read them: the three posting pages at 393.1–393.2 KiB over 393; your build is lock-exact like CI's). Any other page over its ceiling is a STOP that names it with its line.
B2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md scripts/route-budgets.mjs`; `node scripts/check-bundle-size.mjs` — `Bundle budget OK.`; paste its JS line and the three posting pages' lines. Commit Part B.

PART C — THE MAPS' GUARDS, RED FIRST (shown, not committed).
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md scripts/conformance/kit.ts scripts/conformance/on-demand-failure.test.ts scripts/conformance/resilient-fallbacks.test.ts src/features/posting/map/map-offline.test.tsx src/features/posting/preview/listing-detail-map-failed.test.tsx`; then `bunx vitest run scripts/conformance/on-demand-failure.test.ts scripts/conformance/resilient-fallbacks.test.ts src/features/posting/map/map-offline.test.tsx src/features/posting/preview/listing-detail-map-failed.test.tsx` — RED against BASE's maps: paste the totals and each failing test's first line (the supervisor's run: `Test Files  3 failed | 1 passed (4)` and `Tests  4 failed | 7 passed (11)`: CF-RLF-1 (3 findings), MOF-1, MOF-2, LDF-1; ODC-1 to ODC-6 pass).

PART D — EVERY MAP SAYS ITS OWN FAILURES IN PLACE, GREEN.
D1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md src/features/posting/map/map-frame.tsx src/features/posting/map/map-preview.tsx src/features/posting/map/map-large.tsx src/features/posting/preview/listing-detail.tsx src/features/posting/step-where.tsx`; then `bunx vitest run scripts/conformance src/features/posting src/components` — all passed (the supervisor's run: `Test Files  128 passed (128)`, `Tests  758 passed (758)`); `bun run typecheck`; `bun run lint`; `bun run i18n:usage` and `git diff --stat -- docs/generated/i18n-usage.json public/i18n-usage.json` (no change to either map in the supervisor's run — no key is added or removed). Commit Parts C and D.

PART E — AP-55.
E1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md e2e/ad-page.spec.ts`; then `bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-55 "` — GREEN on both projects (its red at 360 is turn C1's stop 1, its red at 1280 turn C1's Part D); paste the count line. When the environment cannot run browsers, say so and go on; CI is the proof. Commit Part E.

PART F — DEC-281.
F1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md src/i18n/locales/am-base.ts`; paste the code points (HOW TO WORK); `bun run i18n:usage` (no change to either map: a value, not a key); `bunx vitest run src/i18n` — all passed. Commit Part F.

PART G — THE RECORDS (turns C1 and C1-2).
G1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1-2.md --dry docs/tracking/incidental-findings.md docs/governance/instructions-amendments.md docs/features/posting.md docs/governance/mechanisms.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/governance/instructions-amendments.md #1` · `EDIT docs/features/posting.md #1` · `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/governance/mechanisms.md #2` · `EDIT docs/governance/mechanisms.md #3` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT docs/_changelog.md #1` · `applied 9 block(s) to 6 file(s)`). `sed -n 3p roadmap.md | cut -c1-80` — names foundations-turn-c1-2.md; `grep -c '^| 64 |' docs/governance/mechanisms.md` — 1; `grep -n '^Numbering: next free INC-96' docs/tracking/incidental-findings.md` — INC-964; `grep -c '^- S46[234] ' docs/governance/instructions-amendments.md` — 3; paste the four. Commit Part G.

THE CHECKS: `bun .claude/hooks/land.ts --checks` (DEC-278; paste its lines); then `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-c1-2.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- supabase package.json bun.lock AGENTS.md .claude .github` (empty); `node scripts/check-bundle-size.mjs` — `Bundle budget OK.` (paste its JS line and the lines of /post, /l/$slug and /). Expected unit totals: 341 files, 2051 tests: 2046 passed and photo.test.ts's five, failing in the supervisor's install on BASE too (not lock-exact); lint 0 errors, 39 warnings.
The hash list (the files as they stand at the end of the turn; roadmap.md is checked by Part G's line):
cb9b7686245e99056351b55945dbc1526b10938e4e93e0c070d4a36a5611bde7  docs/_changelog.md
da7874459008fdfce4e49c75f3bdb46c4974abad82e42312ebbcaa9e3b356a5f  docs/features/posting.md
e81a39cb8a6dd781781b04ed8d5367ea2d5c858152d9e879f7a40f95b6ed86dc  docs/governance/instructions-amendments.md
933650799798978db9acf091659f657827b22fe39f345144d1eab1a1c879795c  docs/governance/mechanisms.md
904ef2627ad27c4b3e913e4dc42eca93e73f0ea9a3e0ef7655a9453bd3262f3c  docs/tracking/incidental-findings.md
14c046f71cf6cc9c976b42cb927a1545281343ef1b1a1756fc0290aac1b32e1f  e2e/ad-page.spec.ts
8c1f17e15a6e165b9cc18533f6d22b3ea9ed1f4c9a661ff49e63a445551fd024  scripts/conformance/kit.ts
e9f34136fb8859d3d4c0357d0d4004959303c58e5629ed8fb578fd2b591afb00  scripts/conformance/on-demand-failure.test.ts
1db7c070ac402190b7752b03ad0f7d977ffd03527fe4d495a36e51da5f18afc9  scripts/conformance/resilient-fallbacks.test.ts
8d96e5b63105d51b88cd29155759427333eac93586916d358635d36574633413  scripts/route-budgets.mjs
56c007fabe57104950f6cc0427f64620eaf5b3d8d24b7c343cf913a2d261ac5b  src/features/posting/map/map-frame.tsx
021d8a8ec0bce13c37d03420f84a922a94281f99079287d27030e46acb2e7d47  src/features/posting/map/map-large.tsx
feedfda92d45fe9c13cdb0a18f38a06605bd66e5452e9c88feb76414dba812fd  src/features/posting/map/map-offline.test.tsx
6e7498758293311b987dde4eb368e5a83c50cd7d20a0b23cba32b3ef883302f2  src/features/posting/map/map-preview.tsx
5a5cb3169f17dc8f58355bebf6368ea09ddf051ca3eef0dffb4b5c191fa1aec2  src/features/posting/preview/listing-detail-map-failed.test.tsx
0823e4e225a3f2afd13b831f41cd10f98a1231e991dcb115967de6b1dd8a6f3a  src/features/posting/preview/listing-detail.tsx
08f14c55b0a05bb3acd9dee91cd3223f9ed4fcff376cb01968187f350a39b44f  src/features/posting/step-where.tsx
e72aab6816b1197c9ae4d4ecad3bd2851a49030ac22b0dcae196dbb98ff8b9a0  src/i18n/locales/am-base.ts

THE END-TO-END CHECK: `bun run e2e:local -- e2e/ad-page.spec.ts e2e/on-demand-failure.spec.ts` — whole, both projects, 0 retries, fake mode; then by id `bun run e2e:local -- --grep "PW-13 |PW-39 |PW-96 |PW-100 |ALS-1 |FS-3 |FS-4 |FS-11 |FS-13"` (the tests that draw a saved pin in the wizard and in My listings, the ad page's place lines and the Home heading — turn C1's THE END-TO-END CHECK, never run). Paste every count line and the server log's `[ssr-error]` count by path. Any red is a STOP with its body. When the environment cannot run browsers, say so with the reason; CI on the landing is the full proof.

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its own final line — "READY · … · on <commit>" — and say so in the report). It reviews turns C1 and C1-2 together (`git diff e1045fb4..HEAD`): turn C1 landed without its review. A BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR inside SCOPE is fixed only when this brief's exact text allows it, otherwise listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-c1-2.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: (1) done or not done by part and step; (2) the file list from `git diff --name-only <START>`; (3) the behaviour contract; (4) the K1 lines; (5) every red-first and green line (B1, B2, C1, D1, E1, F1), the unit totals and the browser count lines; (6) the K2 lines; (7) CF-RLF-1's line and the bundle lines; (8) strings: no new key; the one Amharic value with its code points; (9) "none" for migrations; (10) every departure with its reason; (11) the first six lines of ci-status.md for the last commit you can read; (12) every limit. Commit it (`turn C1-2: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the stop's first question answered by the root — every map says its own failures in place, so the test does not wait for anything; one pair of test ids for every still map and one for the large map; the posting pages' ceilings raised by the ratchet's own rule rather than code moved out of them now (the speed study owns the saving); `no-new-string` dropped for one Amharic value; the reviewer reads turns C1 and C1-2 together.

THE BLOCKS (applied by the parts above; each part names its paths).

EDIT scripts/route-budgets.mjs #1
OLD-BEGIN
  "/my-listings_/$listingId_/edit": { ceiling: 393, public: false }, // 389.8
  "/post": { ceiling: 393, public: false }, // 389.8
  "/post_/$listingId": { ceiling: 393, public: false }, // 389.8
OLD-END
NEW-BEGIN
  "/my-listings_/$listingId_/edit": { ceiling: 397, public: false }, // 393.2 (CI, turn C1)
  "/post": { ceiling: 397, public: false }, // 393.1 (CI, turn C1)
  "/post_/$listingId": { ceiling: 397, public: false }, // 393.1 (CI, turn C1)
NEW-END

EDIT scripts/conformance/kit.ts #1
OLD-BEGIN
    .join("\n");
}
OLD-END
NEW-BEGIN
    .join("\n");
}

/**
 * The in-place failure's forms, by file: each function component that renders LoadFailedHere
 * (src/components/shell/on-demand-notice.tsx) — MapFailedHere, say. Read by the on-demand
 * census (ODC-1: rendering a form imported from its file answers a failure through the
 * mechanism) and by the fallbacks census (CF-RLF-1: a fallback that renders one says so in place).
 */
export function failureFormsByFile(files: string[]): Map<string, Set<string>> {
  const byFile = new Map<string, Set<string>>();
  for (const file of files) {
    visitTs(file, (node) => {
      if (!ts.isFunctionDeclaration(node) || node.name === undefined) return;
      let renders = false;
      const visit = (child: ts.Node) => {
        if (
          (ts.isJsxSelfClosingElement(child) || ts.isJsxOpeningElement(child)) &&
          child.tagName.getText() === "LoadFailedHere"
        )
          renders = true;
        ts.forEachChild(child, visit);
      };
      ts.forEachChild(node, visit);
      if (!renders) return;
      const forms = byFile.get(file) ?? new Set<string>();
      forms.add(node.name.text);
      byFile.set(file, forms);
    });
  }
  return byFile;
}
NEW-END

EDIT scripts/conformance/on-demand-failure.test.ts #1
OLD-BEGIN
import { ownValue } from "../../src/lib/own-key";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

OLD-END
NEW-BEGIN
import { ownValue } from "../../src/lib/own-key";
import { failureFormsByFile, readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #2
OLD-BEGIN
 * renders an answer imported from on-demand-failure or on-demand-notice (reportOnDemandFailure,
 * refreshPage, LoadFailedHere) — or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. And each CALL handles its own failure (MAJOR 2): its promise
OLD-END
NEW-BEGIN
 * renders an answer imported from on-demand-failure or on-demand-notice (reportOnDemandFailure,
 * refreshPage, LoadFailedHere), or renders a form of the in-place failure imported from the file
 * that defines it (a component that renders LoadFailedHere — MapFailedHere; INC-956, turn C1-2) —
 * or carries an allowance (`file | reason | until`) in
 * on-demand-failure-allowlist.txt. And each CALL handles its own failure (MAJOR 2): its promise
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #3
OLD-BEGIN

/** The definer a module specifier names, from `file`: "@/…" is src/…, "./…" is beside it. */
function definerOf(specifier: string, file: string): string | undefined {
  const base = specifier.startsWith("@/")
OLD-END
NEW-BEGIN

/** The file of `among` a module specifier names, from `file`: "@/…" is src/…, "./…" is beside it. */
function fileNamed(specifier: string, file: string, among: Iterable<string>): string | undefined {
  const base = specifier.startsWith("@/")
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #4
OLD-BEGIN
  if (base === undefined) return undefined;
  return Object.keys(DEFINERS).find((definer) => definer.replace(/\.tsx?$/, "") === base);
}
OLD-END
NEW-BEGIN
  if (base === undefined) return undefined;
  return [...among].find((candidate) => candidate.replace(/\.tsx?$/, "") === base);
}

/** The definer a module specifier names, from `file`. */
function definerOf(specifier: string, file: string): string | undefined {
  return fileNamed(specifier, file, Object.keys(DEFINERS));
}
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #5
OLD-BEGIN
/** Every loader call in `files` that is not answered through the mechanism. */
export function onDemandFailureCensus(files: string[]): {
  consumers: string[];
OLD-END
NEW-BEGIN
/** Every loader call in `files` that is not answered through the mechanism. */
export function onDemandFailureCensus(
  files: string[],
  forms: Map<string, Set<string>> = failureFormsByFile(files),
): {
  consumers: string[];
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #6
OLD-BEGIN
        }
        const definer = definerOf(specifier, file);
OLD-END
NEW-BEGIN
        }
        const formFile = fileNamed(specifier, file, forms.keys());
        if (formFile !== undefined && bindings !== undefined && ts.isNamedImports(bindings))
          for (const element of bindings.elements)
            if (forms.get(formFile)?.has((element.propertyName ?? element.name).text) === true)
              imported.add(element.name.text);
        const definer = definerOf(specifier, file);
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #7
OLD-BEGIN
      }
      // A use is a reference to an answer imported from the mechanism (a call, a handler, a JSX
      // element) — importing the shell's notice to draw it answers nothing.
      if (ts.isIdentifier(node) && imported.has(node.text) && !ts.isImportSpecifier(node.parent))
OLD-END
NEW-BEGIN
      }
      // A use is a reference to an answer imported from the mechanism, or to a form of the
      // in-place failure imported from its file (a call, a handler, a JSX element) — importing
      // the shell's notice to draw it answers nothing.
      if (ts.isIdentifier(node) && imported.has(node.text) && !ts.isImportSpecifier(node.parent))
NEW-END
EDIT scripts/conformance/on-demand-failure.test.ts #8
OLD-BEGIN

  it("ODC-3 the definers: resilientLazy reports, and every named loader exists over a loadOnce", () => {
OLD-END
NEW-BEGIN

  it("ODC-6 a form of the in-place failure imported from its file answers; another component of that file does not (INC-956)", () => {
    const dir = "node_modules/.cache/on-demand-failure-6";
    mkdirSync(dir, { recursive: true });
    const files = {
      frame: `${dir}/odc-frame.tsx`,
      shown: `${dir}/odc-shown.tsx`,
      other: `${dir}/odc-other.tsx`,
    };
    const head =
      'import { loadLeaflet } from "@/features/posting/map/leaflet";\nimport { useEffect, useState } from "react";\n';
    const caller = (name: string) =>
      `${head}import { ${name} } from "./odc-frame";\nexport function Map() {\n  const [failed, setFailed] = useState(false);\n  useEffect(() => {\n    loadLeaflet().catch(() => setFailed(true));\n  }, []);\n  return failed ? <${name} /> : null;\n}\n`;
    try {
      writeFileSync(
        files.frame,
        'import { LoadFailedHere } from "@/components/shell/on-demand-notice";\nexport function FailedHere() {\n  return <LoadFailedHere testid="f" refreshTestid="r" />;\n}\nexport function Frame() {\n  return <div />;\n}\n',
      );
      writeFileSync(files.shown, caller("FailedHere"));
      writeFileSync(files.other, caller("Frame"));
      const result = onDemandFailureCensus(Object.values(files));
      expect(result.consumers).toEqual([files.shown, files.other]);
      expect(report(result.findings)).toBe(
        `${files.other}:7 calls an on-demand loader and answers its failure without the mechanism`,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ODC-3 the definers: resilientLazy reports, and every named loader exists over a loadOnce", () => {
NEW-END

EDIT scripts/conformance/resilient-fallbacks.test.ts #1
OLD-BEGIN
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

OLD-END
NEW-BEGIN
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { posix } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { failureFormsByFile, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #2
OLD-BEGIN
 * 2026-10-27). The census reads every resilientLazy call under src/ whose fallback is a function
 * declared in the same file. No allowlist.
 */
OLD-END
NEW-BEGIN
 * 2026-10-27). The census reads every resilientLazy call under src/ whose fallback is a function
 * declared in the same file. A fallback "says so in place" when it renders LoadFailedHere or a
 * component of src/ that renders it (MapFailedHere, src/features/posting/map/map-frame.tsx).
 * Foundations turn C1-2 (turn C1's stop 1) — and a piece fetched IN PLACE answers its own later
 * downloads in place too: the module an `inPlace` call fetches never raises the shell's notice
 * (`reportOnDemandFailure`) — the still map's Leaflet raised it beside the large map's own word
 * (AP-55 at 360). No allowlist.
 */
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #3
OLD-BEGIN

function says(node: ts.Node): { words: boolean; failedHere: boolean } {
  let words = false;
OLD-END
NEW-BEGIN

/** The components of the files that render LoadFailedHere: the in-place failure's forms. */
export function failureForms(files: string[]): Set<string> {
  const forms = new Set(["LoadFailedHere"]);
  for (const names of failureFormsByFile(files).values()) for (const name of names) forms.add(name);
  return forms;
}

/** The module an `import("…")` inside the fetch names — directly, or through a same-file loadOnce. */
function fetchedModule(source: ts.SourceFile, fetch: ts.Expression): string | null {
  let specifier: string | null = null;
  let viaOnce: string | null = null;
  const visit = (child: ts.Node) => {
    if (
      ts.isCallExpression(child) &&
      child.expression.kind === ts.SyntaxKind.ImportKeyword &&
      child.arguments[0] !== undefined &&
      ts.isStringLiteral(child.arguments[0])
    )
      specifier = child.arguments[0].text;
    if (
      ts.isPropertyAccessExpression(child) &&
      child.name.text === "load" &&
      ts.isIdentifier(child.expression)
    )
      viaOnce = child.expression.text;
    ts.forEachChild(child, visit);
  };
  visit(fetch);
  if (specifier !== null) return specifier;
  if (viaOnce === null) return null;
  const once = viaOnce;
  let found: string | null = null;
  const find = (child: ts.Node) => {
    if (
      ts.isVariableDeclaration(child) &&
      ts.isIdentifier(child.name) &&
      child.name.text === once &&
      child.initializer !== undefined
    )
      found = fetchedModule(source, child.initializer);
    ts.forEachChild(child, find);
  };
  find(source);
  return found;
}

/** The file a relative or "@/" specifier names from `file`, or null. */
function moduleFile(specifier: string, file: string): string | null {
  const base = specifier.startsWith("@/")
    ? `src/${specifier.slice(2)}`
    : specifier.startsWith(".")
      ? posix.normalize(posix.join(posix.dirname(file), specifier))
      : null;
  if (base === null) return null;
  return [`${base}.tsx`, `${base}.ts`].find((candidate) => existsSync(candidate)) ?? null;
}

function raisesNotice(file: string): boolean {
  let raises = false;
  visitTs(file, (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "reportOnDemandFailure"
    )
      raises = true;
  });
  return raises;
}

function says(node: ts.Node, forms: Set<string>): { words: boolean; failedHere: boolean } {
  let words = false;
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #4
OLD-BEGIN
      (ts.isJsxSelfClosingElement(child) || ts.isJsxOpeningElement(child)) &&
      child.tagName.getText() === "LoadFailedHere"
    )
OLD-END
NEW-BEGIN
      (ts.isJsxSelfClosingElement(child) || ts.isJsxOpeningElement(child)) &&
      forms.has(child.tagName.getText())
    )
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #5
OLD-BEGIN

export function fallbackFindings(files: string[]): { calls: number; findings: Finding[] } {
  const findings: Finding[] = [];
OLD-END
NEW-BEGIN

export function fallbackFindings(
  files: string[],
  forms: Set<string> = failureForms(files),
): { calls: number; findings: Finding[] } {
  const findings: Finding[] = [];
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #6
OLD-BEGIN
        return;
      const [, , fallback, options] = node.arguments;
      if (fallback === undefined || !ts.isIdentifier(fallback)) return;
OLD-END
NEW-BEGIN
        return;
      const [fetch, , fallback, options] = node.arguments;
      if (fallback === undefined || !ts.isIdentifier(fallback)) return;
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #7
OLD-BEGIN
      }
      const { words, failedHere } = says(declared);
      if (inPlaceOf(options)) {
OLD-END
NEW-BEGIN
      }
      const { words, failedHere } = says(declared, forms);
      if (inPlaceOf(options)) {
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #8
OLD-BEGIN
          });
      } else if (words || failedHere)
OLD-END
NEW-BEGIN
          });
        const specifier = fetch === undefined ? null : fetchedModule(source, fetch);
        const fetched = specifier === null ? null : moduleFile(specifier, file);
        if (fetched === null)
          findings.push({
            file,
            line,
            what: "an in-place fetch whose module the census cannot read",
          });
        else if (raisesNotice(fetched))
          findings.push({
            file,
            line,
            what: `${fetched} is fetched in place but raises the shell's notice (say so in place)`,
          });
      } else if (words || failedHere)
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #9
OLD-BEGIN

  it("CF-RLF-2 a planted file's three mismatched fallbacks are named; its two kept ones are not", () => {
    const dir = "node_modules/.cache/resilient-fallbacks";
OLD-END
NEW-BEGIN

  it("CF-RLF-2 a planted file's mismatched fallbacks and its loud in-place module are named; its kept ones are not", () => {
    const dir = "node_modules/.cache/resilient-fallbacks";
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #10
OLD-BEGIN
    try {
      writeFileSync(
OLD-END
NEW-BEGIN
    try {
      writeFileSync(`${dir}/quiet.tsx`, "export function Quiet() { return null; }\n");
      writeFileSync(
        `${dir}/loud.tsx`,
        [
          "declare function reportOnDemandFailure(label: string, error: unknown): void;",
          'export function Loud() { reportOnDemandFailure("loud", null); return null; }',
          "",
        ].join("\n"),
      );
      writeFileSync(
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #11
OLD-BEGIN
          'export const A = resilientLazy(load, "a", Holds);',
          'export const B = resilientLazy(load, "b", Says, { inPlace: true });',
          'export const C = resilientLazy(load, "c", LoadingWord);',
          'export const D = resilientLazy(load, "d", Holds, { inPlace: true });',
          'export const E = resilientLazy(load, "e", Says);',
          "function Holds() { return <span>—</span>; }",
OLD-END
NEW-BEGIN
          'export const A = resilientLazy(load, "a", Holds);',
          'export const B = resilientLazy(() => import("./quiet"), "b", Says, { inPlace: true });',
          'export const C = resilientLazy(load, "c", LoadingWord);',
          'export const D = resilientLazy(() => import("./quiet"), "d", Holds, { inPlace: true });',
          'export const E = resilientLazy(load, "e", Says);',
          'export const F = resilientLazy(() => import("./loud"), "f", Wrapped, { inPlace: true });',
          "function Holds() { return <span>—</span>; }",
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #12
OLD-BEGIN
          'function LoadingWord() { return <p>{t("post.pin.title")}</p>; }',
          "",
OLD-END
NEW-BEGIN
          'function LoadingWord() { return <p>{t("post.pin.title")}</p>; }',
          "function Wrapped() { return <Says />; }",
          "",
NEW-END
EDIT scripts/conformance/resilient-fallbacks.test.ts #13
OLD-BEGIN
      const { calls, findings } = fallbackFindings([file]);
      expect(calls).toBe(5);
      expect(report(findings)).toBe(
        [
          `${file}:7 LoadingWord reports to the shell's notice and also says words of its own`,
OLD-END
NEW-BEGIN
      const { calls, findings } = fallbackFindings([file]);
      expect(calls).toBe(6);
      expect(report(findings)).toBe(
        [
          `${file}:10 ${dir}/loud.tsx is fetched in place but raises the shell's notice (say so in place)`,
          `${file}:7 LoadingWord reports to the shell's notice and also says words of its own`,
NEW-END

FILE-BEGIN src/features/posting/map/map-offline.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * INC-956 (Foundations turn C1-2; turn C1's stop 1) — a map whose own code arrived but whose
 * Leaflet or tile plan cannot download (offline, the still map below the fold at 360 px) says so
 * in its own place, once: the failure and Refresh, never the shell's notice besides — as the pin
 * map already does (PMD-1).
 */
vi.mock("./leaflet", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./leaflet")>();
  return {
    ...actual,
    loadLeaflet: () => Promise.reject(new Error("Failed to fetch dynamically imported module")),
    loadTilePlan: () => Promise.resolve({ plan: actual.OSM_PLAN, reason: null }),
  };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
const reported = vi.hoisted(() => vi.fn());
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({
  reportOnDemandFailure: reported,
  refreshPage: refreshed,
}));

const { MapPreview } = await import("./map-preview");
const { MapLarge } = await import("./map-large");

describe("a map whose library cannot download says so in its place (INC-956)", () => {
  it("MOF-1 the still map shows the failure and Refresh over its box; the shell's notice is not raised", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<MapPreview lat={9.0054} lng={38.7636} precision="approx" />);
    const failed = await screen.findByTestId("map-failed");
    expect(failed.getAttribute("role")).toBe("alert");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.getByTestId("map-refresh").textContent).toContain("common.refreshPage");
    expect(screen.getByTestId("listing-map-circle").parentElement).toContainElement(failed);
    expect(reported).not.toHaveBeenCalled();
    expect(String(errors.mock.calls[0]?.[0])).toMatch(/^\[client-error\] the map failed to load: /);
    errors.mockRestore();
  });

  it("MOF-2 the large map shows the failure and Refresh in its place; the shell's notice is not raised", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<MapLarge lat={9.0054} lng={38.7636} precision="exact" />);
    const failed = await screen.findByTestId("map-large-failed");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.getByTestId("map-large-refresh").textContent).toContain("common.refreshPage");
    expect(reported).not.toHaveBeenCalled();
    expect(String(errors.mock.calls[0]?.[0])).toMatch(
      /^\[client-error\] the large map failed to load: /,
    );
    errors.mockRestore();
  });
});
FILE-END src/features/posting/map/map-offline.test.tsx

EDIT src/features/posting/preview/listing-detail-map-failed.test.tsx #1
OLD-BEGIN
    const failed = await within(map).findByTestId("listing-map-failed");
OLD-END
NEW-BEGIN
    const failed = await within(map).findByTestId("map-failed");
NEW-END
EDIT src/features/posting/preview/listing-detail-map-failed.test.tsx #2
OLD-BEGIN
    expect(within(failed).getByTestId("listing-map-refresh")).toHaveTextContent(
      en["common.refreshPage"],
    );
OLD-END
NEW-BEGIN
    expect(within(failed).getByTestId("map-refresh")).toHaveTextContent(en["common.refreshPage"]);
NEW-END

EDIT src/features/posting/map/map-frame.tsx #1
OLD-BEGIN

import { useI18n } from "@/i18n";
OLD-END
NEW-BEGIN

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { useI18n } from "@/i18n";
NEW-END
EDIT src/features/posting/map/map-frame.tsx #2
OLD-BEGIN

/**
OLD-END
NEW-BEGIN

/**
 * INC-956 (Foundations turns C1, C1-2) — A MAP THAT CANNOT DOWNLOAD SAYS SO WHERE THE MAP IS:
 * the failure and its one cure, Refresh (LoadFailedHere), once — for the map's own chunk (the
 * resilientLazy fallbacks) and for what the map fetches when it draws (Leaflet and the tile plan,
 * map-preview.tsx and map-large.tsx). One pair of test ids for every still map, one for the large
 * map. The loading word ("Map pin") stays the loading place's alone.
 */
export function MapFailedHere({ large = false }: { large?: boolean }) {
  return large ? (
    <LoadFailedHere testid="map-large-failed" refreshTestid="map-large-refresh" />
  ) : (
    <LoadFailedHere testid="map-failed" refreshTestid="map-refresh" />
  );
}

/**
NEW-END

EDIT src/features/posting/map/map-preview.tsx #1
OLD-BEGIN
import { useI18n } from "@/i18n";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { useNearViewport } from "@/lib/use-near-viewport";
OLD-END
NEW-BEGIN
import { useI18n } from "@/i18n";
import { errorText } from "@/lib/error-text";
import { useNearViewport } from "@/lib/use-near-viewport";
NEW-END
EDIT src/features/posting/map/map-preview.tsx #2
OLD-BEGIN
import { APPROX_RADIUS_M } from "./geocode";
import { STILL_MAP_BOX, STILL_MAP_CREDIT, stillMapCaptionKey } from "./still-map";
OLD-END
NEW-BEGIN
import { APPROX_RADIUS_M } from "./geocode";
import { MapFailedHere } from "./map-frame";
import { STILL_MAP_BOX, STILL_MAP_CREDIT, stillMapCaptionKey } from "./still-map";
NEW-END
EDIT src/features/posting/map/map-preview.tsx #3
OLD-BEGIN
  const [credit, setCredit] = useState("");
  // D234 S1 — on the buyer's ad page the map's library, tile plan and tiles wait until
OLD-END
NEW-BEGIN
  const [credit, setCredit] = useState("");
  // INC-956 (Foundations turn C1-2) — Leaflet or the tile plan could not download: the map's
  // place says so (MapFailedHere), once, where the map is — never the shell's notice besides.
  const [failed, setFailed] = useState(false);
  // D234 S1 — on the buyer's ad page the map's library, tile plan and tiles wait until
NEW-END
EDIT src/features/posting/map/map-preview.tsx #4
OLD-BEGIN
        // A map that cannot load leaves the caption below it standing; the page
        // never blanks over a picture (C4). INC-911 — the shell's notice says so.
        reportOnDemandFailure("the map", error);
      });
OLD-END
NEW-BEGIN
        // A map that cannot load leaves the caption below it standing; the page
        // never blanks over a picture (C4). INC-956 — its place says so, in place.
        console.error(`[client-error] the map failed to load: ${errorText(error)}`);
        if (!cancelled) setFailed(true);
      });
NEW-END
EDIT src/features/posting/map/map-preview.tsx #5
OLD-BEGIN
        />
        {credit !== "" && (
OLD-END
NEW-BEGIN
        />
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted p-2">
            <MapFailedHere />
          </div>
        )}
        {credit !== "" && (
NEW-END

EDIT src/features/posting/map/map-large.tsx #1
OLD-BEGIN
import { useI18n } from "@/i18n";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { APPROX_RADIUS_M } from "./geocode";
import { snap } from "./map-preview";
OLD-END
NEW-BEGIN
import { useI18n } from "@/i18n";
import { errorText } from "@/lib/error-text";
import { APPROX_RADIUS_M } from "./geocode";
import { MapFailedHere } from "./map-frame";
import { snap } from "./map-preview";
NEW-END
EDIT src/features/posting/map/map-large.tsx #2
OLD-BEGIN
  const [credit, setCredit] = useState("");
  const approx = precision === "approx";
OLD-END
NEW-BEGIN
  const [credit, setCredit] = useState("");
  // INC-956 — Leaflet or the tile plan could not download: the place says so, once, in place.
  const [failed, setFailed] = useState(false);
  const approx = precision === "approx";
NEW-END
EDIT src/features/posting/map/map-large.tsx #3
OLD-BEGIN
      .catch((error: unknown) => {
        // INC-911 — the large map stays empty; the shell's notice says why.
        reportOnDemandFailure("the large map", error);
      });
OLD-END
NEW-BEGIN
      .catch((error: unknown) => {
        // INC-956 (Foundations turn C1-2) — the large map's place says so, inside its dialog.
        console.error(`[client-error] the large map failed to load: ${errorText(error)}`);
        if (!cancelled) setFailed(true);
      });
NEW-END
EDIT src/features/posting/map/map-large.tsx #4
OLD-BEGIN
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div
OLD-END
NEW-BEGIN
  return (
    <div className="relative flex min-h-0 flex-1 flex-col gap-2">
      {failed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted p-2">
          <MapFailedHere large />
        </div>
      )}
      <div
NEW-END

EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { MapFrame } from "../map/map-frame";
OLD-END
NEW-BEGIN
import { MapFailedHere, MapFrame } from "../map/map-frame";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN
      <LoadFailedHere testid="listing-map-failed" refreshTestid="listing-map-refresh" />
OLD-END
NEW-BEGIN
      <MapFailedHere />
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #3
OLD-BEGIN
      <LoadFailedHere testid="listing-map-large-failed" refreshTestid="listing-map-large-refresh" />
OLD-END
NEW-BEGIN
      <MapFailedHere large />
NEW-END

EDIT src/features/posting/step-where.tsx #1
OLD-BEGIN
import { MapFrame } from "./map/map-frame";
OLD-END
NEW-BEGIN
import { MapFailedHere, MapFrame } from "./map/map-frame";
NEW-END
EDIT src/features/posting/step-where.tsx #2
OLD-BEGIN
      <LoadFailedHere testid="post-where-map-failed" refreshTestid="post-where-map-refresh" />
OLD-END
NEW-BEGIN
      <MapFailedHere />
NEW-END

EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN
  });
  test("AP-40 an address never reveals: only the visitor's own tap does (D201 §14)", async ({
OLD-END
NEW-BEGIN
  });

  /**
   * INC-956 (the operator's walk of 2026-10-27, line 8) — offline, "Enlarge map" opened the dialog
   * and its map's place said "Map pin", the loading word, while the shell's notice waited behind
   * the dialog. The large map whose code cannot download says so inside the dialog, with Refresh
   * the person can reach, and raises no second notice — not even from the still map below the
   * fold at 360 px, whose Leaflet download fails offline too (turn C1's stop 1): every map's
   * place says its own failure (MapFailedHere).
   */
  test("AP-55 offline, Enlarge: the large map's place says it did not load and offers Refresh, inside the dialog", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", { pin: true });
    // The dialog's own code arrives when the browser is idle after the load (DEC-260); the large
    // map's code only when it is asked for — the download this test takes away.
    const overlays = page.waitForResponse((response) =>
      /\/overlays-impl-[^/]+\.js(?:\?|$)/.test(response.url()),
    );
    await gotoReady(page, (await address(ad)).canonical);
    await overlays;
    await page.context().setOffline(true);
    try {
      await page.getByTestId("listing-map-enlarge").click();
      const dialog = page.getByTestId("listing-map-dialog");
      await expect(dialog).toBeVisible();
      const failed = dialog.getByTestId("map-large-failed");
      await expect(failed).toContainText(en["common.loadFailed"]);
      await expect(dialog).not.toContainText(en["post.pin.title"]);
      const refresh = dialog.getByTestId("map-large-refresh");
      await expect(refresh).toHaveText(en["common.refreshPage"]);
      await refresh.focus();
      await expect(refresh, "the person can reach Refresh inside the dialog").toBeFocused();
      await expect(page.getByTestId("on-demand-failed")).toHaveCount(0);
    } finally {
      await page.context().setOffline(false);
    }
  });
  test("AP-40 an address never reveals: only the visitor's own tap does (D201 §14)", async ({
NEW-END

EDIT src/i18n/locales/am-base.ts #1
OLD-BEGIN
  "feed.headingIn": "በ{location} ውስጥ ያሉ ማስታወቂያዎች",
OLD-END
NEW-BEGIN
  "feed.headingIn": "የ{location} ማስታወቂያዎች",
NEW-END

EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-962.
OLD-END
NEW-BEGIN
## INC-962 — the nightly's hour check reads New York as UTC on a machine without time-zone files (2026-10-28; Foundations turn K3's reviewer, MINOR)

Defect: scripts/ci/nightly-hour.sh (turn K3, DEC-277) asks `date` for 11 o'clock in America/New_York; where the time-zone files are missing (Lovable's sandbox at turn K3), `date` answers in UTC without a word, so both schedules would stand down and the nightly would silently never run — the very failure the script exists to refuse (an unreadable input is an error, never a silent skip). GitHub's runners carry the files today. Fix (Foundations turn C1): the script first proves the zone resolves (−05:00 on 2026-01-15, −04:00 on 2026-07-15) and otherwise exits 2 with `::error title=nightly-hour::`; NH-6 proves it with an empty TZDIR. Class: concern "a scheduled job that encodes a local time keeps it" (register row 63). Status (2026-10-28): FIXED in Foundations turn C1.

## INC-963 — the pin door fills a missing precision with 'exact' (2026-10-28; Foundations turn C1's census, K2)

Defect: `set_listing_pin` (20260919054044 :738 and its later redeclarations) writes `lower(btrim(coalesce(p_precision, 'exact')))` — a caller that omits the precision gets the less private pin, the server-side twin of INC-958. Every app caller sends one today (savePin's `PinPrecision`, typed since turn C1), so nothing is drawn wrong. Fix: the door refuses a pin without a precision (a Tier A migration turn, redeclared whole from its live definition, G39), with its proof. Class: concern "a pin's precision is known before it is stored, drawn or linked"; mechanism the pin door and src/features/posting/map/pin.ts. Status (2026-10-28): OPEN — the database turns.

INC-961 (later word, 2026-10-28): the red of run 40615073357 (turn K3's landing, `e1045fb4`): ODE-1 failed on both tries in lane 13 with "apiResponse.text: Response has been disposed" — turn 34c-4's guard threw on a page that was still open because its DOCUMENT had gone (the test's own Refresh, the app's one reload). FIXED in Foundations turn C1, first: "gone" is the page closed or its main frame navigated since the handler began, waiting up to 2 s for the navigation that explains the error (e2e/helpers/route-guard.ts `routeDocumentGone`; RG-4/5, RG-4 red on BASE's guard); a disposed response on an unmoved, open page still throws. Proven by run 40655391634 on `24815c46`: every browser test passed, ODE-1 on every lane.
INC-955 (later word, 2026-10-28): FIXED in Foundations turn C1 — every modal overlay's content (dialog, alert, sheet, drawer, the shell's phone panel) draws a NoticeOutlet (src/components/ui/notice-outlet.tsx over src/lib/notice-outlets.ts), and the shell's notice is drawn inside the topmost open one, where the person can see, reach and tap it (ODN-3; CF-NO-1/2).
INC-956 (later word, 2026-10-28): FIXED in Foundations turns C1 and C1-2 — the ad page's and the wizard's maps say the failure and Refresh in their box (`inPlace`; MapFailedHere in MapFrame, one pair of test ids for every still map and one for the large map; LDF-1), and so do the maps' own later downloads, Leaflet and the tile plan (map-preview.tsx, map-large.tsx — turn C1's stop 1: at 360 px the still map below the fold raised the shell's notice beside the large map's own word; MOF-1/2, AP-55); every resilientLazy fallback matches its way of saying so, and a piece fetched in place never raises the shell's notice (CF-RLF-1/2); the on-demand census counts a map that draws MapFailedHere as a user of the mechanism (ODC-1, ODC-6).
INC-957 (later word, 2026-10-28): the instance FIXED in Foundations turn C1 — DEC-281's heading (am-base.ts, code points checked); the class (the single-line slots at 360 in every platform's font) stays OPEN with the Foundations locale and format work.
INC-958 (later word, 2026-10-28): FIXED in Foundations turn C1 — one `Pin` value (src/features/posting/map/pin.ts: `PinPrecision`, `readPin`, `NEW_PIN_PRECISION`) read in four places (the draft, the last post, the seller's place, the ad page's document); the maps take a known precision; no reader guesses one (PIN-1…5; CF-PIN-1/2). Its census found the draft's and the edit's prefill doing the same, and the maps drawing an unknown precision as exact — all moved; the door's own default is INC-963.

Numbering: next free INC-964.
NEW-END

EDIT docs/governance/instructions-amendments.md #1
OLD-BEGIN
- S461 (G16 addendum — an expected result is produced by running it; 2026-10-28 00:4xZ, found by turn 34c-4's executor) — the brief said the i18n maps would not change; its two new source files moved the maps' `scanned` count (595 → 597), so the executor committed them as a departure. Corrective: a brief that adds a source file under src/ or e2e/ runs `bun run i18n:usage` in the prototype and carries the maps' result.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
OLD-END
NEW-BEGIN
- S461 (G16 addendum — an expected result is produced by running it; 2026-10-28 00:4xZ, found by turn 34c-4's executor) — the brief said the i18n maps would not change; its two new source files moved the maps' `scanned` count (595 → 597), so the executor committed them as a departure. Corrective: a brief that adds a source file under src/ or e2e/ runs `bun run i18n:usage` in the prototype and carries the maps' result.
- S462 (G16 addendum and G58 — a brief's own blocks are checked against its FLAGS; 2026-10-28 08:1xZ, found by land.ts in turn C1) — the brief carried `no-new-string` in FLAGS while its DEC-281 block changed src/i18n/locales/am-base.ts; land.ts refused the landing, and the executor reverted the value to land the stop. The supervisor's check had demanded the flag from the words "No new string" without reading what the flag forbids (any change under src/i18n/locales/). Corrective, in force: check-brief.py --cc refuses a flag that a block's path contradicts (proven on turn C1's brief), and "No new string" is written only when no locale file changes.
- S463 (G16 addendum and §4 — a rehearsal reads every budget the CI reads; 2026-10-28 08:3xZ, found by CI on `24815c46`) — the supervisor's rehearsal ran check-bundle-size.mjs in an install that is not lock-exact; it stopped at the entry's over-budget line and never reached the per-page ceilings (scripts/route-budgets.mjs), so the three posting pages' 0.1–0.2 KiB over 393 KiB went unseen. Corrective: the rehearsal runs the per-page judgement whatever the entry line says and compares each page's change with its last CI value; a page within 0.5 KiB of its ceiling is named in the brief.
- S464 (G0.3 — a census reads the concern by its definition; 2026-10-28 08:1xZ, found by turn C1's executor at mobile-360) — concern 3 ("a piece that cannot download says so once, in its place") was censused as the resilientLazy fallbacks only; the maps' own later downloads (Leaflet, the tile plan) were consumers of the same concern and still raised the shell's notice, so AP-55 saw two messages at 360 px. Corrective: CF-RLF-1 reads the module an in-place call fetches and refuses its shell notices; the census of a "says so in place" concern lists every download the piece makes, not only its own chunk.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
NEW-END

EDIT docs/features/posting.md #1
OLD-BEGIN

**The control** (`src/features/posting/map/map-pin-dropper.tsx`) opens from the
OLD-END
NEW-BEGIN

**One value, whole or absent** (INC-958, Foundations turn C1;
`src/features/posting/map/pin.ts`). The app carries a pin as one `Pin`
(`lat`, `lng`, `precision`), its precision the table's own `'exact' | 'approx'`
(`PinPrecision`). Every read of the columns goes through `readPin`: the pin when
all three are there and valid, otherwise `null` — no map and no Maps link —
with one `[client-error]` line when the table's check should have made that
impossible. No reader fills a missing precision: before turn C1 five did, with
"exact", the less private side. A NEW pin starts at `NEW_PIN_PRECISION` in the
pin map, where the seller sees and changes the choice. CF-PIN-1 refuses a loose
pin field, a `??` on a precision and a column read outside `readPin`.

**The control** (`src/features/posting/map/map-pin-dropper.tsx`) opens from the
NEW-END

EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 51 | The first screen's hydration: the browser hydrates the server's first screen as drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything (D234, DEC-266, INC-913) | `src/client.tsx` (the browser's entry: TanStack Start's own, hydrating after the wait) + `src/lib/hydrate-when-placed.ts` (`whenStreamPlaced`: the document read and no `div[hidden][id^="S:"]` segment waiting; a 1.5 s deadline with a `[client-error]` line) | `src/lib/hydrate-when-placed.test.ts` (HWP-1…6: HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order); `e2e/supabase-door.spec.ts` SBE-3; the weight guard's entry (`scripts/check-marketplace-imports.mjs` walks `src/client.tsx`) | none | a new late boundary or provider is covered by itself | hydration waits for the stream's end and then React's reveal (at most 300 ms after the first frame, 2.3 s at worst when a part lands between 2.0 and 2.3 s) — on a slow listings page up to about 2.3 s, bounded by the first page's 2 s deadline (ruling 3); Foundations turn 34, ruling 2 |
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar, `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3; ODC-5: an empty `catch {}`, a handler that only returns undefined, `.then(ok, undefined)` and `.catch(undefined)` — 34b-3's reviewer, closed in turn 34b-4); ODF-1/2, ODN-1, RLZ-2/3, OVF-9/16/17/18/19/20/21/22, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); a late failure of an older ask tells nobody, and an owner that closed the modal meanwhile hears no stale closing (turn 32b's reviewer; OVF-21/22, turn 34c-3); `useStringsLayers()` offers no retry (turn 34c-3); Foundations turn 34b-2 |
| 53 | The root's server facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load: a navigation never asks the server for them again — offline that read fails and its error view replaces the whole app (DEC-272, INC-927) | `src/routes/__root.tsx` — the root route's `loader` (getSsrLangContext) with `shouldReload: false`; router-core reloads a staying match only when it is invalid, told to, or the navigation is to the same href | RRO-1 (`src/routes/root-reads-once.test.ts`); `e2e/auth-signout.spec.ts` SO-12 (the offline sign-out's move to "/" from "/") | none | a new root fact rides the one loader | a fresh load reads them again (the root error view's Refresh since turn 34c-1; `router.invalidate()` would too); Foundations turn 34w-2 |
OLD-END
NEW-BEGIN
| 51 | The first screen's hydration: the browser hydrates the server's first screen as drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything (D234, DEC-266, INC-913) | `src/client.tsx` (the browser's entry: TanStack Start's own, hydrating after the wait) + `src/lib/hydrate-when-placed.ts` (`whenStreamPlaced`: the document read and no `div[hidden][id^="S:"]` segment waiting; a 1.5 s deadline with a `[client-error]` line) | `src/lib/hydrate-when-placed.test.ts` (HWP-1…6: HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order); `e2e/supabase-door.spec.ts` SBE-3; the weight guard's entry (`scripts/check-marketplace-imports.mjs` walks `src/client.tsx`) | none | a new late boundary or provider is covered by itself | hydration waits for the stream's end and then React's reveal (at most 300 ms after the first frame, 2.3 s at worst when a part lands between 2.0 and 2.3 s) — on a slow listings page up to about 2.3 s, bounded by the first page's 2 s deadline (ruling 3); Foundations turn 34, ruling 2 |
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar — or, while a modal overlay is open, inside the topmost one's `NoticeOutlet` (`src/components/ui/notice-outlet.tsx`; the register `src/lib/notice-outlets.ts`), where the person can reach it (INC-955, Foundations turn C1), `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3; ODC-5: an empty `catch {}`, a handler that only returns undefined, `.then(ok, undefined)` and `.catch(undefined)` — 34b-3's reviewer, closed in turn 34b-4); `scripts/conformance/notice-outlet.test.ts` (CF-NO-1: every modal overlay's content draws a NoticeOutlet; CF-NO-2: planted); `scripts/conformance/resilient-fallbacks.test.ts` (CF-RLF-1: an in-place fallback draws LoadFailedHere, a notice-reporting one says no words of its own — INC-956; CF-RLF-2: planted); ODC-1 reads a form of the in-place failure imported from its file (MapFailedHere) as the mechanism, by the forms `failureFormsByFile` (scripts/conformance/kit.ts) finds for both censuses (ODC-6: planted); ODF-1/2, ODN-1, ODN-3, LDF-1, MOF-1/2, AP-55, RLZ-2/3, OVF-9/16/17/18/19/20/21/22, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); a late failure of an older ask tells nobody, and an owner that closed the modal meanwhile hears no stale closing (turn 32b's reviewer; OVF-21/22, turn 34c-3); `useStringsLayers()` offers no retry (turn 34c-3); Foundations turn 34b-2 |
| 53 | The root's server facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load: a navigation never asks the server for them again — offline that read fails and its error view replaces the whole app (DEC-272, INC-927) | `src/routes/__root.tsx` — the root route's `loader` (getSsrLangContext) with `shouldReload: false`; router-core reloads a staying match only when it is invalid, told to, or the navigation is to the same href | RRO-1 (`src/routes/root-reads-once.test.ts`); `e2e/auth-signout.spec.ts` SO-12 (the offline sign-out's move to "/" from "/") | none | a new root fact rides the one loader | a fresh load reads them again (the root error view's Refresh since turn 34c-1; `router.invalidate()` would too); Foundations turn 34w-2 |
NEW-END
EDIT docs/governance/mechanisms.md #2
OLD-BEGIN
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 144 files hold the 979 non-null and 13 definite-assignment assertions (a `let` or a class field marked `!` before its type, counted since turn 34d) written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (one of Playwright's two "gone" errors on a page that is closed ends the request; every other error throws — turn 34c-4), `pageWentAway(error)` (its words through `errorText`) and `routePageClosed(route)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives by name, or its file's allowlist line holds it at its count; CF-RG-2: planted, a handler behind another wrapper included); RG-1/2/3 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
OLD-END
NEW-BEGIN
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 144 files hold the 979 non-null and 13 definite-assignment assertions (a `let` or a class field marked `!` before its type, counted since turn 34d) written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (one of Playwright's two "gone" errors ends the request when its page has closed or its main frame has navigated since the handler began — the document gone, waiting up to 2 s for the navigation; every other error throws — turn 34c-4, INC-961 in Foundations turn C1; `routeDocumentGone`), `pageWentAway(error)` (its words through `errorText`) and `routePageClosed(route)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives by name, or its file's allowlist line holds it at its count; CF-RG-2: planted, a handler behind another wrapper included); RG-1…5 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
NEW-END
EDIT docs/governance/mechanisms.md #3
OLD-BEGIN
| 63 | A scheduled job that encodes a local time keeps it across the clock changes: GitHub's schedules are UTC only, so a job at a local hour moved by an hour twice a year (governance §10's DST rule; DEC-277 — the nightly at 11:30 New York) | `scripts/ci/nightly-hour.sh <event> <schedule> [<UTC day>]` — the job carries one UTC schedule per offset (15:30 and 16:30 UTC) and its first job (`hour`) lets only the schedule that falls at the wanted local hour on the run's UTC day go on; the schedule that fired (`github.event.schedule`) is judged, never the clock, so a late start never skips both; a dispatched run always goes on; an unreadable schedule is an error, never a silent skip | `scripts/ci/nightly-hour.test.ts` (NH-1…5: summer, winter, both clock-change days, a dispatch, malformed input) | none | a second local-time job reuses the script (today its zone and hour are the nightly's constants — they become arguments with that job) | nightly-e2e.yml (its two test jobs wait on `hour`); Foundations turn K3 |

OLD-END
NEW-BEGIN
| 63 | A scheduled job that encodes a local time keeps it across the clock changes: GitHub's schedules are UTC only, so a job at a local hour moved by an hour twice a year (governance §10's DST rule; DEC-277 — the nightly at 11:30 New York) | `scripts/ci/nightly-hour.sh <event> <schedule> [<UTC day>]` — the job carries one UTC schedule per offset (15:30 and 16:30 UTC) and its first job (`hour`) lets only the schedule that falls at the wanted local hour on the run's UTC day go on; the schedule that fired (`github.event.schedule`) is judged, never the clock, so a late start never skips both; a dispatched run always goes on; an unreadable schedule is an error, never a silent skip | `scripts/ci/nightly-hour.test.ts` (NH-1…5: summer, winter, both clock-change days, a dispatch, malformed input) | none | a second local-time job reuses the script (today its zone and hour are the nightly's constants — they become arguments with that job) | nightly-e2e.yml (its two test jobs wait on `hour`); Foundations turn K3 |
| 64 | A pin is whole or absent, and its precision is known: the three pin columns travel as one value, and no reader fills a missing precision — five readers filled it with "exact", the less private side, and the maps drew an unknown precision as exact (INC-958) | `src/features/posting/map/pin.ts` — `Pin` (lat, lng, precision), `PinPrecision` ('exact' \| 'approx', the table's check), `readPin(lat, lng, precision, where)` (the pin, or null and one `[client-error]` line when the table's check should have made it impossible), `NEW_PIN_PRECISION` (a new pin's starting choice in the pin map only); read by the draft, the last post, the seller's place and the ad page's document | `scripts/conformance/pin.test.ts` (CF-PIN-1: no loose pin field, no `??` on a precision, no pin column read in src/ outside readPin or a null check; CF-PIN-2: planted); `src/features/posting/map/pin.test.ts` (PIN-1…5) | none (tests read the stored columns as database truth, G28) | a new precision is one entry of PIN_PRECISIONS and the table's check, together | the door's own `coalesce(p_precision, 'exact')` is INC-963 (a migration turn); Foundations turn C1 |

NEW-END

EDIT roadmap.md #1
OLD-BEGIN
  - [ ] INC-955 — the shell's on-demand failure notice is drawn under an open dialog and hidden from assistive technology by the modal: the notice in the top layer above any open overlay, outside the modal's hidden region, with a census of every overlay consumer (the cleanup turn).
  - [ ] INC-956 — the maps' download-failure place (MapUnavailable, listing-detail.tsx) says "Map pin": it draws LoadFailedHere inside MapFrame, with a census of every resilientLazy fallback (the cleanup turn).
  - [ ] INC-957 / DEC-281 — the Amharic Home heading `feed.headingIn` becomes "የ{location} ማስታወቂያዎች" (built by script, code points checked — G43; the cleanup turn, with the i18n maps); the class — a census of the single-line slots at 360 in every language and platform font, and/or a wider Ethiopic test font in CI — with the Foundations locale and format work.
  - [ ] INC-958 — a pin is drawn and linked only when its precision is known (listing-detail.tsx :1169, :1179, :1218, :415 default a missing precision to "exact"): typed absence, no map and no link (the cleanup turn).
  - [ ] INC-961 — ODE-1 retried under the route guard's stricter rule (run 40610714870, its third line in seven days): the trace and the guard's two conditions read first, then the cause fixed at its root, never a retry or a loosened match (the cleanup turn, with turn 34c-4's review).
OLD-END
NEW-BEGIN
  - [x] INC-955 — the shell's on-demand failure notice is drawn under an open dialog and hidden from assistive technology by the modal: the notice in the top layer above any open overlay, outside the modal's hidden region, with a census of every overlay consumer (the cleanup turn). — Foundations turn C1 (NoticeOutlet in every modal content; CF-NO-1/2, ODN-3).
  - [x] INC-956 — the maps' download-failure place (MapUnavailable, listing-detail.tsx) says "Map pin": it draws LoadFailedHere inside MapFrame, with a census of every resilientLazy fallback (the cleanup turn). — Foundations turn C1 (LDF-1, AP-55; CF-RLF-1/2).
  - [ ] INC-957 / DEC-281 — the Amharic Home heading `feed.headingIn` becomes "የ{location} ማስታወቂያዎች" (built by script, code points checked — G43; the cleanup turn, with the i18n maps); the class — a census of the single-line slots at 360 in every language and platform font, and/or a wider Ethiopic test font in CI — with the Foundations locale and format work. The instance (DEC-281) landed in Foundations turn C1; the line stays open for the class.
  - [x] INC-958 — a pin is drawn and linked only when its precision is known (listing-detail.tsx :1169, :1179, :1218, :415 default a missing precision to "exact"): typed absence, no map and no link (the cleanup turn). — Foundations turn C1 (one Pin value, readPin; PIN-1…5, CF-PIN-1/2); the door's own default is INC-963.
  - [x] INC-961 — ODE-1 retried under the route guard's stricter rule (run 40610714870, its third line in seven days): the trace and the guard's two conditions read first, then the cause fixed at its root, never a retry or a loosened match (the cleanup turn, with turn 34c-4's review). — Foundations turn C1, first (run 40615073357 failed on it: ODE-1 on both tries); RG-4/5.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Foundations turn K3 (docs/governance/briefs/foundations-turn-k3.md; no migration; Lovable — .github/workflows/\*\* and .claude/\*\* are closed to the Claude Code executor; G0) — DEC-277: the nightly at 11:30 New York all year (two crons, 15:30 and 16:30 UTC; the `hour` job and scripts/ci/nightly-hour.sh, NH-1…5); DEC-278: THE CHECKS once per code tree (`bun .claude/hooks/land.ts --checks`, protocol step 5, EXH-24), the reviewer unchanged; the records owed by turn 34f (`layoutBoxes` in .claude/rules/20-tests.md); INC-941; INC-944's start evidence; the CF-LINT floor; records turn R7 (block S80, INC-955–INC-961, S458–S461, the ticks). LEFT, each on its own line: INC-936 (the red nights read first), INC-938 (a package change), the check-brief rules as conformance tests (the cleanup turn).
OLD-END
NEW-BEGIN
  - [x] Foundations turn K3 (docs/governance/briefs/foundations-turn-k3.md; no migration; Lovable — .github/workflows/\*\* and .claude/\*\* are closed to the Claude Code executor; G0) — DEC-277: the nightly at 11:30 New York all year (two crons, 15:30 and 16:30 UTC; the `hour` job and scripts/ci/nightly-hour.sh, NH-1…5); DEC-278: THE CHECKS once per code tree (`bun .claude/hooks/land.ts --checks`, protocol step 5, EXH-24), the reviewer unchanged; the records owed by turn 34f (`layoutBoxes` in .claude/rules/20-tests.md); INC-941; INC-944's start evidence; the CF-LINT floor; records turn R7 (block S80, INC-955–INC-961, S458–S461, the ticks). LEFT, each on its own line: INC-936 (the red nights read first), INC-938 (a package change), the check-brief rules as conformance tests (the cleanup turn). Landed `e1045fb4`; run 40615073357 FAILURE (01:44:35Z) — every job green but lane 13, where ODE-1 failed on both tries (INC-961, turn 34c-4's guard; fixed first in Foundations turn C1); INC-944's sampler took 9–13 samples on every lane; main not promoted.
  - [ ] INC-963 — the pin door (`set_listing_pin`) refuses a pin without a precision instead of `coalesce(p_precision, 'exact')` — a Tier A migration turn, redeclared whole from the live definition (G39), with its proof.
  - [ ] Foundations turns C1 and C1-2 (docs/governance/briefs/foundations-turn-c1.md, stopped once at `24815c46` — docs/governance/reports/foundations-turn-c1.stop-1.md; docs/governance/briefs/foundations-turn-c1-2.md; no migration; the Claude Code executor; G0) — three concerns: a pin is whole or absent, its precision known (INC-958; src/features/posting/map/pin.ts; CF-PIN-1/2); a notice is shown where the person is looking (INC-955; NoticeOutlet in every modal content; CF-NO-1/2); a piece that cannot download says so once, in the right place (INC-956; CF-RLF-1/2; MOF-1/2; AP-55). With INC-961 first (the route guard reads a reloaded document as gone; RG-4/5), DEC-281 (INC-957's instance) and INC-962 (the nightly's zone check, NH-6).
NEW-END

EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn K3 (2026-10-28; DEC-277, DEC-278, DEC-282, INC-941, INC-944; register rows 37, 59 and 63, new; Lovable) — the nightly starts at 11:30 New York all year: two schedules (15:30 and 16:30 UTC) and an `hour` job (scripts/ci/nightly-hour.sh, NH-1…5) that lets only the one at 11 o'clock New York go on. THE CHECKS run once per code tree: `bun .claude/hooks/land.ts --checks` runs them alone, pushes nothing and caches each green step, and the landing finds them green (EXH-24; the protocol's step 5 and the turn-report skill). Every action a CI step uses declares its own deadline (DEC-282's ceilings until DEC-276's measurement), pip and git's downloads run through the retrying wrapper and the semgrep rules are fetched as the pinned commit only (CF-CID-1's six rules, CF-CID-2's eight planted breaches). A failed backend start writes the database's busy sessions at its last sample (INC-944). CF-LINT-1/2 gain a floor (CF-LINT-4). .claude/rules/20-tests.md names `layoutBoxes`. Records R7: spec-ledger block S80, INC-955–INC-961, S458–S461, bundle 22's turn lines ticked, three launch-gate lines settled. No product code, no migration, no string.
OLD-END
NEW-BEGIN
- Foundations turn K3 (2026-10-28; DEC-277, DEC-278, DEC-282, INC-941, INC-944; register rows 37, 59 and 63, new; Lovable) — the nightly starts at 11:30 New York all year: two schedules (15:30 and 16:30 UTC) and an `hour` job (scripts/ci/nightly-hour.sh, NH-1…5) that lets only the one at 11 o'clock New York go on. THE CHECKS run once per code tree: `bun .claude/hooks/land.ts --checks` runs them alone, pushes nothing and caches each green step, and the landing finds them green (EXH-24; the protocol's step 5 and the turn-report skill). Every action a CI step uses declares its own deadline (DEC-282's ceilings until DEC-276's measurement), pip and git's downloads run through the retrying wrapper and the semgrep rules are fetched as the pinned commit only (CF-CID-1's six rules, CF-CID-2's eight planted breaches). A failed backend start writes the database's busy sessions at its last sample (INC-944). CF-LINT-1/2 gain a floor (CF-LINT-4). .claude/rules/20-tests.md names `layoutBoxes`. Records R7: spec-ledger block S80, INC-955–INC-961, S458–S461, bundle 22's turn lines ticked, three launch-gate lines settled. No product code, no migration, no string.

- Foundations turn C1 (2026-10-28; INC-961 first — the red of turn K3's run; INC-955, INC-956, INC-957's instance — DEC-281, INC-958, INC-962; register rows 52, 57 and 64, new; the Claude Code executor) — first, the route guard reads a reloaded document as gone (ODE-1 failed on both tries in turn K3's run: a disposed response on a page whose document had gone; RG-4/5). Then a pin is one value, whole or absent, its precision the table's own (src/features/posting/map/pin.ts; the draft, the last post, the seller's place and the ad page read it through `readPin`; the maps take a known precision; CF-PIN-1/2). A notice is shown where the person is looking: every modal overlay's content draws a NoticeOutlet and the shell's "didn't load" notice is drawn inside the topmost open one (CF-NO-1/2). A map whose code cannot download says the failure and Refresh in its own box, inside the large map's dialog too (LDF-1, AP-55), and every resilientLazy fallback matches its way of saying so (CF-RLF-1/2). The Amharic Home heading is "የ{location} ማስታወቂያዎች" (DEC-281). The nightly's hour check refuses a machine without time-zone files (INC-962, NH-6). Turn C1-2 (turn C1's stop 1): the maps' own Leaflet and tile-plan downloads say so in place too (MapFailedHere; MOF-1/2; CF-RLF-1 widened: a piece fetched in place never raises the shell's notice); DEC-281 re-applied (C1's FLAGS forbade it — S462); the posting pages' first-download ceilings 393 → 397 KiB (scripts/route-budgets.mjs: CI measured 393.1–393.2 KiB at `24815c46`, the pin type and the notice outlet's 0.7 KiB on the 3 KiB of room the pages had left since 2026-10-26). No migration.
NEW-END
```
