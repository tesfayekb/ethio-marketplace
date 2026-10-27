# Foundations — turn 34f: a late part holds its box, and a test reads a layout whole (INC-940; register rows 60 and 61): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — TURN 34f (2026-10-27; G0; INC-940; anchors located at 0586d7f28089e02d75d6b896a4661edd836df284). AP-36 ("the layout follows the article's width", e2e/ad-page.spec.ts) failed then passed on retry four times in seven days, every time desktop-1280, shard 9, the same body: `e2e/ad-page.spec.ts:960` — `expect(near(item.height, details.height, 1)).toBe(true)`, a box of the Details | Description | Location row of another height than Details, in the first pass at 1280 (runs 40333117660, 40490541290, 40496361455, 40512047787; the flake ledger on ci-evidence). The cause, read in the code: the test waits for two boxes to hold still and then reads nine boxes one by one, while the Location box can still grow — the still map's code is fetched on demand and its place while it loads is one line of text (src/features/posting/preview/listing-detail.tsx :1147), and the map's credit line is an empty paragraph until Leaflet sets it (src/features/posting/map/map-preview.tsx :139) — one line for OpenStreetMap, two for Esri's 75-character credit on a third of the article. Two concerns, one fix each, each with its guard. First: a part of the page that arrives after the first paint holds its box — the still map's places draw its box (MapFrame), its credit lies on the box at its foot, and a census keeps every late part on a reserver or an allowlist line. Second: a test reads a layout whole — layoutBoxes reads every box a test compares in one frame once the layout has stopped moving; the ad page's ten layout tests move onto it, and a census lists every other box read until its file moves (INC-946). Red first for each. Tier B (screens, tests, tooling). No migration. No new string (the frame shows the map's existing word, post.pin.title). No package change. AGENTS.md unchanged. No file deleted. Base: dev 0586d7f28089e02d75d6b896a4661edd836df284 (records turn R5's landing; CI SUCCESS on 0586d7f2 (run 40532962246, completed 16:06:05Z; main promoted; no failing job, no flaky test)). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0; B — the reserver, the tests and the helper, red first (not committed); C — the still map's places onto the reserver, green; D — the ad page's layout tests onto layoutBoxes, red first, then green; E — the records; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: 0586d7f28089e02d75d6b896a4661edd836df284
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/tracking/incidental-findings.md
e2e/ad-page-layout.spec.ts
e2e/ad-page.spec.ts
e2e/helpers/ui.ts
scripts/conformance/holds-its-box.test.ts
scripts/conformance/layout-reads.test.ts
src/features/posting/map/map-frame.test.tsx
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/still-map.ts
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx
SCOPE-END

THE SYSTEM (G0) — two concerns.

ONE — CONCERN: a part of the page that arrives after the first paint (a `resilientLazy` or `lazy` component, anything behind `<Suspense>`) holds its box from the first paint: its place while it loads and when it cannot download is the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2 predictable layout; Core Web Vitals cumulative layout shift).
MECHANISM: NONE YET — built in Part B as src/features/posting/map/still-map.ts (`STILL_MAP_BOX`, `STILL_MAP_CREDIT`, `stillMapCaptionKey` — the still map's box, its credit's place on the box and its caption, which the map itself draws from in Part C) and src/features/posting/map/map-frame.tsx (`MapFrame`, the reserver: the box with the map's word in it, and the caption). Two files because a module that exports constants beside a component adds a react-refresh lint warning; neither is fetched on demand (they carry no map code), both ride the ad page's and the wizard's own chunks — the entry's static closure is unchanged (the supervisor's build: the first-paint JS identical to BASE's).
CONSUMERS (grep of 0586d7f28089e02d75d6b896a4661edd836df284 for `resilientLazy(`, `lazy(` and `<Suspense` across src/; tests and SQL carry none): src/features/posting/preview/listing-detail.tsx :49 MapPreview (resilientLazy, fallback MapUnavailable — a text line) and :1147 its Suspense (a text line) — bypasses; :54 MapLarge and :1186 its Suspense — the dialog's fixed height; src/features/posting/step-where.tsx :54 MapPreview (fallback NoMap — nothing) and :1833 its Suspense (`fallback={null}`) — bypasses; :59 MapPinDropper and :1903 its Suspense — a fixed full-screen sheet; src/components/shell/breadcrumbs.tsx :49, :54, :59, :64, :69, :74 and the Suspense sites :147, :311, :315, :319, :323, :411 — the crumb bar's one line; src/components/marketplace/feed.tsx :327 (an Await that renders nothing); src/routes/index.tsx :34 and src/routes/c.$slug.tsx :39 (the feeds' spinner). The census's count: 13 late parts.
COVERED HERE: both MapPreview sites (Part C). LEFT: the feeds' spinners — INC-945 (with the QueryState mechanism); every other site is an allowance with its reason (below).
CONFORMANCE GUARD: scripts/conformance/holds-its-box.test.ts — HB-1 enumerates every resilientLazy/lazy binding and every Suspense in src/ (tests and src/server/ excepted), keyed `<file>#<name>`, and fails when a place holds no reserver (directly, or through a function of the same file that renders one) and the key has no live allowance; the two MapPreview keys may never be allowlisted. HB-2 plants a text place, an empty place and a silent download and passes a reserver; HB-3 checks the reservers exist and each allowance is reasoned and dated. Allowlist scripts/conformance/holds-its-box-allowlist.txt (`<file>#<name> | reason | until`, read by kit.ts readAllowlist: a stale or expired line fails). Lands in Part B, the same turn as the mechanism.
EXCEPTIONS: the eleven allowlist lines — six crumbs (PendingCrumb or the ad's title crumb: one line of the crumb bar, whose height does not change), MapLarge (a dialog of fixed height), MapPinDropper (a fixed full-screen sheet), the feed's cover preload (renders nothing), the home and category feeds (INC-945). No behaviour changes for any of them.
FIVE LENSES — security: none (layout; the credit stays plain text — INC-354, F2) · performance: no new download; the first paint unchanged; the frame is a box · failure modes: a map that cannot download shows its word in the box (the page's size is the same either way) · consistency: one box, one caption rule and one credit place for the map and both of its places; MFR-2 proves the map and its frame draw the same shape · future growth: a new late part is either a reserver's consumer or an allowlist line with its reason; a new reserver is a name in RESERVERS.
FORWARD-SCAN: the QueryState mechanism (the roadmap's Foundations list) will add the feeds' reserver and retire INC-945's two lines; the Picture mechanism carries images' boxes (not this census: an image is not a lazy component). REGISTER: row 60 added (Part E).

TWO — CONCERN: a test reads a layout whole, once it has stopped moving — every box it compares from one frame, so two boxes never come from either side of a change (INC-384, `settled(page)`, is the animation half).
MECHANISM: NONE YET — built in Part B as `layoutBoxes(targets)` in e2e/helpers/ui.ts (Locators in, LayoutBoxes out): `settled(page)` first; then each poll reads every target in ONE `page.evaluate` (getBoundingClientRect, the coordinates boundingBox() gives), again two animation frames later, and returns the boxes only when the two reads agree and every target is drawn; the poll's value names the boxes still moving or missing, so a timeout says which; each target must match one element (`elementHandle()`), so a box inside a card, a tab by its position or a list's items are read as the test names them.
CONSUMERS (grep of 0586d7f28089e02d75d6b896a4661edd836df284 for `.boundingBox()` under e2e/): 202 reads — e2e/ad-page.spec.ts (59 reads in AP-36, AP-37, AP-41, AP-42, AP-44, AP-45, AP-46, AP-47, AP-48, AP-50 — bypasses, Part D), and 142 reads in 68 tests and file helpers in 18 other files (40 of the keys in e2e/shell.spec.ts) — bypasses, LEFT.
COVERED HERE: e2e/ad-page.spec.ts whole (Part D). LEFT: the 68 keys — INC-946 (file by file).
CONFORMANCE GUARD: scripts/conformance/layout-reads.test.ts — BX-1 enumerates every `.boundingBox()` call under e2e/, keyed by its test (`<file>#<leading id>`, else the title) or, outside a test, its function (`<file>#fn:<name>`), and fails on a key without a live allowance; e2e/ad-page.spec.ts may carry none. BX-2 plants a read in a test, in a describe's helper and at the top level, and passes a layoutBoxes test. Allowlist scripts/conformance/layout-reads-allowlist.txt (68 lines, until INC-946). Lands in Part D's first step, red against BASE's ad-page.spec.ts, then green.
EXCEPTIONS: none beyond the allowlist.
FIVE LENSES — security: none · performance: one evaluate per poll instead of one round trip per box (fewer calls) · failure modes: a box that never stops moving or never draws fails the poll with its name (never a stale read) · consistency: one way to read boxes · future growth: any number of targets per call.
FORWARD-SCAN: none. REGISTER: row 61 added (Part E).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34f.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `(Foundations records turn R5: the fix of turn 34e's first run — a package install runs once, the browser install's deadlines measured (INC-943, DEC-276) — then the handover: instructions v1.15, the handoff and the running record — G41, G53)` becomes `docs/governance/briefs/foundations-turn-34f.md (Foundations turn 34f: a late part holds its box and a test reads a layout whole — INC-940; register rows 60 and 61)` (everything after it stays, as it is). The roadmap's other lines change in Part E, by the applier — none of its blocks touches line 3. Commit `turn 34f: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B, C, D, E; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f.md <paths>` with the paths each part names — never retyped, never edited or reflowed by hand. Every file a block writes is already in Prettier's form (the supervisor ran the pinned Prettier on the finished files; THE CHECKS' format:check proves it). A refusal from the applier is a STOP that pastes its line. Before applying, check that no block's OLD or NEW text touches roadmap line 3 (S454). If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-turn-34f.md, roadmap.md, docs/_changelog.md, docs/features/ad-page.md, docs/features/e2e-harness.md, docs/governance/mechanisms.md, scripts/conformance/holds-its-box-allowlist.txt, scripts/conformance/layout-reads-allowlist.txt, docs/generated/i18n-usage.json, public/i18n-usage.json (both written by `bun run i18n:usage`, never by hand: the map's new call sites of post.pin.title move them) and docs/governance/reports/foundations-turn-34f.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Parts B and C together (`turn 34f parts B-C: the still map holds its box (MapFrame, still-map.ts) and its census`); Part D (`turn 34f part D: the ad page's layout tests read their boxes through layoutBoxes, and its census`); Part E (`turn 34f part E: register rows 60 and 61, INC-945, INC-946, INC-940's fix, the docs`); the report. Red first is shown, never committed.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. Spec files are edited ONLY by the applier's blocks (20-tests.md: by hand, never by search-and-replace — the supervisor wrote them by hand; the assertions are byte for byte the same apart from where each box comes from: G38, nothing loosened).
- Local runs: the touched unit tests as you go and the unit suite whole at THE CHECKS; browser tests only at the two red-first runs (Parts B and D name them) and THE END-TO-END CHECK. CI runs every test on every commit.
- Behaviour contract: the ad page's Location box and the wizard's pin preview draw the still map's box from the first paint (its word in the box while the code downloads or when it cannot, its caption under it); the provider's credit lies on the map's box at its foot instead of under it; nothing else on any screen changes. The ad page's layout tests assert what they asserted, from boxes read together once still.
- Knowledge K: K1 the census above is the supervisor's, at 0586d7f28089e02d75d6b896a4661edd836df284 — re-run the two greps (`grep -rn "resilientLazy(\|= lazy(\|<Suspense" src --include=*.tsx --include=*.ts | grep -v test` and `grep -rc "boundingBox()" e2e | grep -v ':0$'`) and paste their counts; HB-1's and BX-1's log lines print the census's own counts (expected: `[HB-1] late parts: 13; outside the mechanism: 11; allowlist: 11` and `[BX-1] tests and helpers reading boxes by themselves: 68; reads: 142; allowlist: 68`). K2 the report lists every sibling the censuses or your reading find outside these lists (expected: none). K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE or named in a part is a STOP. CI on BASE: SUCCESS on 0586d7f2 (run 40532962246, completed 16:06:05Z; main promoted; no failing job, no flaky test). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); read e2e-last-failure.md and guards-last-failure.md only if it is not SUCCESS on BASE — then a red is fixed first at its root (G21, G38) and named in the report.

PART B — THE RESERVER, THE TESTS AND THE HELPER, RED FIRST (applied, shown red, NOT committed).
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f.md src/features/posting/map/still-map.ts src/features/posting/map/map-frame.tsx src/features/posting/map/map-frame.test.tsx src/features/posting/preview/listing-detail-map.test.tsx scripts/conformance/holds-its-box.test.ts scripts/conformance/holds-its-box-allowlist.txt e2e/helpers/ui.ts e2e/ad-page-layout.spec.ts`.
B2. RED, against BASE's still map and its places (shown, not committed): `bunx vitest run src/features/posting/map/map-frame.test.tsx src/features/posting/preview/listing-detail-map.test.tsx scripts/conformance/holds-its-box.test.ts` — paste the totals and the failing ids (the supervisor's runs: MFR-2 fails — BASE's map draws its box without the credit's wrapper and its credit as a paragraph in the flow; LDM-1 fails — `Unable to find an element by: [data-testid="map-frame"]`; HB-1 fails with four lines, `src/features/posting/preview/listing-detail.tsx#MapPreview:1147` and `:49`, `src/features/posting/step-where.tsx#MapPreview:1833` and `:54`; MFR-1, HB-2, HB-3 pass). Then `bun run e2e:local -- e2e/ad-page-layout.spec.ts` — RED on BASE's product (expected: ALS-1 fails on both projects at the height comparison: the Location box grows when the map's three downloads are let go); paste its count lines and the failure's first line. When the environment cannot run browsers, say so with the reason and go on — the supervisor's runs are unit-only for this.

PART C — THE STILL MAP'S PLACES ONTO THE RESERVER, GREEN.
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f.md src/features/posting/map/map-preview.tsx src/features/posting/preview/listing-detail.tsx src/features/posting/step-where.tsx`.
C2. `bunx vitest run src/features/posting scripts/conformance/holds-its-box.test.ts` — all passed (the supervisor's rehearsal: 62 files, 456 tests, all passed; HB-1's line as in HOW TO WORK); `bun run e2e:local -- e2e/ad-page-layout.spec.ts` — GREEN on both projects (when browsers run); paste both. `bun run typecheck`, `bun run lint`. Commit Parts B and C.

PART D — THE AD PAGE'S LAYOUT TESTS ONTO layoutBoxes, RED FIRST, THEN GREEN.
D1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f.md scripts/conformance/layout-reads.test.ts scripts/conformance/layout-reads-allowlist.txt`; then `bunx vitest run scripts/conformance/layout-reads.test.ts` — RED against BASE's e2e/ad-page.spec.ts, shown and not committed: paste the totals and the first finding line (the supervisor's run: BX-1 fails, its first line `e2e/ad-page.spec.ts#AP-36:861 reads a box by itself; compare boxes through layoutBoxes (e2e/helpers/ui.ts)`; BX-2 passes).
D2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f.md e2e/ad-page.spec.ts`; `grep -c "boundingBox()" e2e/ad-page.spec.ts` prints 0; `bunx vitest run scripts/conformance/layout-reads.test.ts` — 2 passed; `bun run typecheck`, `bun run lint`. Commit Part D.

PART E — THE RECORDS.
E1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f.md --dry docs/governance/mechanisms.md docs/features/e2e-harness.md docs/features/ad-page.md docs/tracking/incidental-findings.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/features/e2e-harness.md #1` · `EDIT docs/features/ad-page.md #1` · `EDIT docs/features/ad-page.md #2` · `EDIT docs/tracking/incidental-findings.md #1` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT docs/_changelog.md #1` · `applied 8 block(s) to 6 file(s)`). `bun run i18n:usage` (both maps move: the map's word's new call sites; commit them as written). `grep -n '^## INC-945 \|^## INC-946 \|^Numbering: next free INC-947' docs/tracking/incidental-findings.md | cut -c1-40` — three lines, in that order; `grep -n '^| 60 |\|^| 61 |' docs/governance/mechanisms.md | cut -c1-12` — two lines; `sed -n 3p roadmap.md | cut -c1-80` — names foundations-turn-34f.md; paste all three. Commit Part E.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34f.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- supabase package.json bun.lock AGENTS.md .claude .github` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings, BASE's count); `bun run typecheck`; `bun run test:unit` (paste totals; the supervisor's install is not lock-exact — the lockfile resolves to the platform's private cache, INC-420 — and there src/routes/api/upload/photo.test.ts's five tests fail on BASE as on this tree, so its count is no measure: expected on yours all passed, eight tests more than BASE); `bun run i18n:usage` (no further change); `bun run build`; `node scripts/check-bundle-size.mjs` (the first paint's JS the same as BASE's — paste both lines; the supervisor's build showed the entry closure unchanged); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn; roadmap.md and the two generated maps are checked by Part E's lines and by i18n:usage instead):
3c82669b86aae696f6308b472fb613f6b7ea2b7c8157d52a581216c2b6363762  docs/_changelog.md
6f8fa894834feb25e9d4f2fd736faf25eac602d85fd28595473bb60fe2e2f30b  docs/features/ad-page.md
7303fa429ad26a385e4a9f9d62e0e8a49a36b92d867ef666e2518b993402fb07  docs/features/e2e-harness.md
de0e22644c9edeb1156b9f44ed48e8c4e1059d0d8b28230e6f88a17653cfcfbf  docs/governance/mechanisms.md
5a4237cdc174e0bb6f58689d17b0d8576611fcd40f14475bf56f5614be601532  docs/tracking/incidental-findings.md
f719d7456716f4f4e90a9354531d212eb046be105eae91b621bf6303ec787a9b  e2e/ad-page-layout.spec.ts
085475df4a4e623ae62ecca66f1f9bf6ec89d4706551e85667ed8fc92d8fd51b  e2e/ad-page.spec.ts
9579d2f439ce1274eed8dbf5d013d1507c3c459cd5e2e6c215bbaea26d995619  e2e/helpers/ui.ts
a26dcce69ce681bd7731fcc799df928b6570ff69e45638170d2e32961b36fdcc  scripts/conformance/holds-its-box-allowlist.txt
28fc7e821f492456dca6bf840168da85875a30da9c2bb8276087f06580ef07ec  scripts/conformance/holds-its-box.test.ts
07d281a13fd029e8e74d1a2f0379ec4a620620298b2902347321aca14ce74a19  scripts/conformance/layout-reads-allowlist.txt
17fc588e7258843609d215f281715a1f40019a99faa12e4ed9d315560a3d2ac1  scripts/conformance/layout-reads.test.ts
42b2aa077aeb176406757855d755beddcffac935748be3174836a6b1f1bd7e7f  src/features/posting/map/map-frame.test.tsx
6ce3fad623cad76218f973a57ce0a576f3080b33c693e93a526672bbb4efaf4a  src/features/posting/map/map-frame.tsx
4d918dd774bec0433f04984aff5482b2030ec7f7be884e368d83a5779cb97ef5  src/features/posting/map/map-preview.tsx
2d8b7dfdcb0e9633c5dda9457782bb8ec3b3d526aef1894e7b4cfe9036aac123  src/features/posting/map/still-map.ts
723f907c2516d576ade50a5864bcfa4b79f1e6a9a8a713b2611908d8fa940d8b  src/features/posting/preview/listing-detail-map.test.tsx
ff18adacdc1b6dfd83c744cc0da434663018905200b40a33268159aefedd11ae  src/features/posting/preview/listing-detail.tsx
3caeb3f5e7dda9d72865a1347dc67504bdae3846e0bfe4fd7ea906de90fdc4fc  src/features/posting/step-where.tsx

THE END-TO-END CHECK: `bun run e2e:local -- e2e/ad-page-layout.spec.ts e2e/ad-page.spec.ts e2e/post-wizard-where.spec.ts e2e/post-wizard-place.spec.ts` — the two spec files this turn changed or added, whole, and the two that exercise the still map's changed places (the wizard's pin preview; the wizard's preview sheet) — both projects, 0 retries, fake mode; paste every count line and the server log's `[ssr-error]` count by path. When the environment cannot run browsers, say so with the reason; CI on the landing is the full proof.

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR inside SCOPE is fixed when this brief's exact text allows it, otherwise listed under Departures for a ruling; the imported record text (Part E) is never changed here. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34f.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract (3); K1's two greps and the census lines (4); B2's and D1's red lines, C2's and D2's green, the unit totals and the browser count lines (5); the K2 lines (6); HB-1, BX-1 and both allowlists' counts 0 → 11 and 0 → 68 (7); "none" for strings with the check that proves it (8); "none" for migrations (9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12); the reviewer's last line. Commit it (`turn 34f: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the provider's credit lies on the still map's box at its foot (a band inside its border, plain text, the map attributions' usual place) instead of under it — the only way a credit of unknown length takes no room; the frame shows the map's existing word "Map pin" in a muted box while the map loads; the large map and the pin map are allowlisted (fixed overlays), as are the crumbs and the feed's preload; the feeds' spinners wait for the QueryState mechanism (INC-945); the 68 other box reads move file by file (INC-946); the new browser test sits in its own file (e2e/ad-page.spec.ts already carries 38 tests, over the harness's ~25); the turn is 34f, not 35 (turns 35–37 are the speed turns' numbers); the executor is Claude Code (a screens-and-tests turn, G59). The judge of INC-940 (frozen before any result): the operator's Flake check on dev's head after this landing — specs `e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts`, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8 — with no failure, and no AP-36 line in the flake ledger over the next 20 CI runs on dev; otherwise INC-940 stays open and its new body is read first.

THE BLOCKS (applied by the parts above; each part names its paths).

FILE-BEGIN src/features/posting/map/still-map.ts
import type { MessageKey } from "@/i18n/types";

/**
 * INC-940 — THE STILL MAP HOLDS ITS BOX FROM THE FIRST PAINT. The still map's code is fetched on
 * demand (src/features/posting/preview/listing-detail.tsx, src/features/posting/step-where.tsx)
 * and, on the buyer's page, its library waits until its box nears the screen (D234 S1), so the
 * map and its credit arrive after the page has painted. Its place while it loads, its place when it
 * cannot download (MapFrame, map-frame.tsx), and the map itself draw the same box and the same
 * caption from this one module;
 * the provider's credit, whose length only the tile plan knows (one line for OpenStreetMap, two for
 * Esri on a narrow card), is drawn ON the map's box at its foot, as map attributions are, so it
 * takes no room in the page. Nothing around the map moves when it arrives. This file and
 * map-frame.tsx are not fetched on demand: they carry no map code, only the box.
 */

/** The still map's box: the map draws into it, and its places draw it empty. */
export const STILL_MAP_BOX = "isolate h-48 w-full overflow-hidden rounded-md border border-border";

/** The provider's credit: a band across the still map's foot, inside its border, above its panes. */
export const STILL_MAP_CREDIT =
  "absolute inset-x-px bottom-px z-10 rounded-b-md bg-background/80 px-2 py-0.5 text-end text-xs text-muted-foreground";

/** The caption under the still map: the buyer's words for an approximate pin, the seller's always. */
export function stillMapCaptionKey(
  audience: "seller" | "buyer",
  approx: boolean,
): MessageKey | null {
  if (audience === "buyer") return approx ? "adPage.map.approx" : null;
  return approx ? "post.pin.previewApprox" : "post.pin.previewExact";
}
FILE-END src/features/posting/map/still-map.ts

FILE-BEGIN src/features/posting/map/map-frame.tsx
import type { ReactNode } from "react";

import { useI18n } from "@/i18n";

import { STILL_MAP_BOX, stillMapCaptionKey } from "./still-map";

/**
 * INC-940 — the still map's place while it loads or when it cannot download (the reserver of
 * scripts/conformance/holds-its-box.test.ts): the still map's box and caption from still-map.ts,
 * the module the map itself draws them from.
 */
export function MapFrame({
  precision,
  audience = "seller",
  children,
}: {
  precision: string | null;
  audience?: "seller" | "buyer";
  children?: ReactNode;
}) {
  const { t } = useI18n();
  const caption = stillMapCaptionKey(audience, precision === "approx");
  return (
    <div className="space-y-1" data-testid="map-frame">
      <div className="relative">
        <div className={`${STILL_MAP_BOX} flex items-center justify-center bg-muted p-2`}>
          {children}
        </div>
      </div>
      {caption !== null && <p className="text-xs text-muted-foreground">{t(caption)}</p>}
    </div>
  );
}
FILE-END src/features/posting/map/map-frame.tsx

FILE-BEGIN src/features/posting/map/map-frame.test.tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { MapFrame } from "./map-frame";
import { STILL_MAP_BOX, STILL_MAP_CREDIT, stillMapCaptionKey } from "./still-map";
import { MapPreview } from "./map-preview";

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
// The map's library and tile plan never arrive: the component is read as it stands before them.
vi.mock("./leaflet", async (original) => ({
  ...(await original<typeof import("./leaflet")>()),
  loadLeaflet: () => new Promise(() => undefined),
  loadTilePlan: () => new Promise(() => undefined),
}));

const CASES = [
  { audience: "buyer", precision: "exact" },
  { audience: "buyer", precision: "approx" },
  { audience: "seller", precision: "exact" },
  { audience: "seller", precision: "approx" },
] as const;

/**
 * The still map's shape in the page's flow: its box's classes inside the wrapper the credit is
 * drawn on, the caption's words, and how many blocks it stacks.
 */
function shapeOf(root: Element) {
  const [wrapper, caption] = Array.from(root.children);
  const box = wrapper?.firstElementChild;
  return {
    wrapper: wrapper?.getAttribute("class"),
    box: box
      ?.getAttribute("class")
      ?.split(" ")
      .filter((name) => STILL_MAP_BOX.split(" ").includes(name)),
    caption: caption?.textContent ?? null,
    blocks: root.children.length,
  };
}

describe("the still map holds its box from the first paint (INC-940)", () => {
  it("MFR-1 the frame draws the still map's box and the caption its audience reads, and no credit in the flow", () => {
    for (const { audience, precision } of CASES) {
      const { unmount } = render(
        <MapFrame precision={precision} audience={audience}>
          word
        </MapFrame>,
      );
      const frame = screen.getByTestId("map-frame");
      const shape = shapeOf(frame);
      expect(shape.box).toEqual(STILL_MAP_BOX.split(" "));
      expect(shape.wrapper).toBe("relative");
      const key = stillMapCaptionKey(audience, precision === "approx");
      expect(shape.caption).toBe(key === null ? null : ownValue(en, key));
      expect(frame.firstElementChild).toHaveTextContent("word");
      expect(within(frame).queryByTestId("listing-map-credit")).toBeNull();
      unmount();
    }
    expect(stillMapCaptionKey("buyer", false)).toBeNull();
    // The credit is drawn on the box, out of the flow, whatever its length.
    expect(STILL_MAP_CREDIT.split(" ")).toEqual(expect.arrayContaining(["absolute", "bottom-px"]));
  });

  it("MFR-2 the map itself, before its library arrives, draws the same box and caption as its frame, its credit not yet drawn", () => {
    for (const { audience, precision } of CASES) {
      const framed = render(<MapFrame precision={precision} audience={audience} />);
      const want = shapeOf(screen.getByTestId("map-frame"));
      framed.unmount();
      const drawn = render(
        <MapPreview lat={9.0054} lng={38.7636} precision={precision} audience={audience} />,
      );
      const root = drawn.container.firstElementChild;
      if (root === null) throw new Error("MFR-2: the map drew nothing");
      const got = shapeOf(root);
      expect(got).toEqual(want);
      expect(screen.queryByTestId("listing-map-credit")).toBeNull();
      drawn.unmount();
    }
  });
});
FILE-END src/features/posting/map/map-frame.test.tsx

FILE-BEGIN src/features/posting/preview/listing-detail-map.test.tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { ListingDetail, type ListingDetailView } from "./listing-detail";
import { STILL_MAP_BOX } from "../map/still-map";

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@/components/shell/location-data", async (original) => ({
  ...(await original<typeof import("@/components/shell/location-data")>()),
  useCountryTree: vi.fn(() => ({ loadedCountry: null, nodes: [] })),
}));
vi.mock("../catalog-scope", () => ({
  useCatalogScope: () => ({ country: "country", categoryPath: () => null, moveTo: null }),
}));
vi.mock("../use-photo-links", () => ({
  usePhotoLinks: (photos: readonly { id: string }[]) =>
    Object.fromEntries(
      photos
        .filter((photo) => photo.id === "ld-18-photo")
        .map((photo) => [photo.id, { card: "https://cdn.example/scratch.jpg" }]),
    ),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, search, children, ...rest }: Record<string, unknown>) => (
    <a
      href={`${String(to)}?return=${String((search as { return?: string })?.return ?? "")}`}
      {...rest}
    >
      {children as never}
    </a>
  ),
}));
// INC-940 — the still map's code arrives only when the test lets it: its places are read first.
const download = vi.hoisted(() => {
  let release = () => undefined as void;
  const arrived = new Promise<void>((resolve) => {
    release = resolve;
  });
  return { arrived, release: () => release() };
});
vi.mock("../map/map-preview", async () => {
  await download.arrived;
  return {
    MapPreview: () => <div data-testid="listing-map-pin" />,
    snap: (value: number) => Math.round(value / 0.01) * 0.01,
  };
});
vi.mock("../map/map-large", () => ({ MapLarge: () => null }));

const BASE: ListingDetailView = {
  actor: "owner",
  title: "Scratch ad",
  description: "",
  priceMode: "contact",
  priceAmount: null,
  priceCurrency: null,
  pricePeriod: null,
  attributes: {},
  definitions: [],
  attributeOptions: {},
  photos: [],
  illustrationUrl: null,
  coverage: [],
  country: null,
  contactPref: {
    phone: { show: true, value: "+251911000001" },
    telegram: { show: true, value: "@scratch" },
    phone2: { show: false, value: "+251911000002" },
  },
  sellerAlias: null,
  sellerBusinessName: null,
};

/**
 * INC-940 (AP-36's four retried passes): the Location box measured one height before the still
 * map's code arrived and another after it. While the code downloads, the map's place is the still
 * map's box and its caption, so the box does not grow when the map arrives.
 */
describe("the ad page's map holds its box while its code downloads (INC-940)", () => {
  it("LDM-1 the Location box shows the still map's box and caption until the map arrives, then the map", async () => {
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        pinLat={9.0054}
        pinLng={38.7636}
        pinPrecision="approx"
      />,
    );
    const map = screen.getByTestId("listing-detail-map");
    const frame = within(map).getByTestId("map-frame");
    const [wrapper, caption] = Array.from(frame.children);
    const box = wrapper?.firstElementChild;
    expect(box).toHaveClass(...STILL_MAP_BOX.split(" "));
    expect(box).toHaveTextContent(en["post.pin.title"]);
    expect(caption).toHaveTextContent(en["adPage.map.approx"]);
    download.release();
    expect(await within(map).findByTestId("listing-map-pin")).toBeInTheDocument();
    expect(within(map).queryByTestId("map-frame")).toBeNull();
  });
});
FILE-END src/features/posting/preview/listing-detail-map.test.tsx

FILE-BEGIN scripts/conformance/holds-its-box.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-940 (Foundations turn 34f) — A PART FETCHED AFTER THE FIRST PAINT HOLDS ITS BOX FROM THE
 * FIRST PAINT. A piece of the page whose code or data arrives late (a `resilientLazy` or `lazy`
 * component, anything behind `<Suspense>`) draws, while it waits and when it cannot download, a
 * place the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2's
 * predictable layout; Core Web Vitals' cumulative layout shift). The mechanism is the reserving
 * frame — today MapFrame (src/features/posting/map/map-frame.tsx), which draws the still map's box
 * and caption from the same module the map draws them from (src/features/posting/map/still-map.ts).
 *
 * The census reads every browser file (tests excepted) for each `resilientLazy(…)` / `lazy(…)`
 * binding and each `<Suspense fallback={…}>`. A consumer is keyed `<file>#<name>`: the lazy
 * binding's name, or the tag of the Suspense's first child element. Each of its places — the
 * resilientLazy fallback and every Suspense fallback around it — holds its box: it renders a
 * RESERVER, directly or through a function of the same file that does. Otherwise the consumer
 * carries an allowance (`<file>#<name> | reason | until`) in holds-its-box-allowlist.txt. What the
 * census does not judge: whether a reserver's size equals what it reserves for — MFR-2 proves that
 * for MapFrame, and ALS-1 on the built page.
 */

type Finding = { file: string; line: number; what: string };

/** The components whose rendering holds a late part's box. */
export const RESERVERS = ["MapFrame"] as const;

const LAZY_CALLS = new Set(["resilientLazy", "lazy"]);

function rendersReserver(text: string): boolean {
  return RESERVERS.some((name) => new RegExp(`<${name}[\\s/>]`).test(text));
}

/** The text of the function `name` declares in `source` (a declaration or a const arrow), if any. */
function functionText(source: ts.SourceFile, name: string): string | undefined {
  let found: string | undefined;
  const walk = (node: ts.Node) => {
    if (found !== undefined) return;
    if (ts.isFunctionDeclaration(node) && node.name?.text === name) found = node.getText(source);
    else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    )
      found = node.initializer.getText(source);
    ts.forEachChild(node, walk);
  };
  walk(source);
  return found;
}

/** Whether a fallback expression holds its box: a reserver, or a same-file function that renders one. */
function holds(expression: ts.Expression | undefined, source: ts.SourceFile): boolean {
  if (expression === undefined) return false;
  if (ts.isIdentifier(expression)) {
    const body = functionText(source, expression.text);
    return body !== undefined && rendersReserver(body);
  }
  const text = expression.getText(source);
  if (rendersReserver(text)) return true;
  if (ts.isJsxSelfClosingElement(expression) || ts.isJsxElement(expression)) {
    const tag = (
      ts.isJsxSelfClosingElement(expression) ? expression : expression.openingElement
    ).tagName.getText(source);
    const body = functionText(source, tag);
    return body !== undefined && rendersReserver(body);
  }
  return false;
}

function firstChildTag(element: ts.JsxElement, source: ts.SourceFile): string {
  for (const child of element.children) {
    if (ts.isJsxSelfClosingElement(child)) return child.tagName.getText(source);
    if (ts.isJsxElement(child)) return child.openingElement.tagName.getText(source);
  }
  return "(no element child)";
}

export function holdsItsBoxCensus(files: string[]): { consumers: string[]; findings: Finding[] } {
  const consumers = new Set<string>();
  const findings: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const line = () => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        LAZY_CALLS.has(node.expression.text) &&
        ts.isVariableDeclaration(node.parent) &&
        ts.isIdentifier(node.parent.name)
      ) {
        const key = `${file}#${node.parent.name.text}`;
        consumers.add(key);
        if (node.expression.text === "resilientLazy" && !holds(node.arguments[2], source))
          findings.push({
            file: key,
            line: line(),
            what: "its place when it cannot download does not hold its box",
          });
        return;
      }
      if (ts.isJsxElement(node) && node.openingElement.tagName.getText(source) === "Suspense") {
        const key = `${file}#${firstChildTag(node, source)}`;
        consumers.add(key);
        const fallback = node.openingElement.attributes.properties.find(
          (property): property is ts.JsxAttribute =>
            ts.isJsxAttribute(property) && property.name.getText(source) === "fallback",
        );
        const value =
          fallback?.initializer !== undefined && ts.isJsxExpression(fallback.initializer)
            ? fallback.initializer.expression
            : undefined;
        if (!holds(value, source))
          findings.push({
            file: key,
            line: line(),
            what: "its place while it loads does not hold its box",
          });
      }
    });
  }
  return { consumers: [...consumers].sort(), findings };
}

const ALLOWLIST = "scripts/conformance/holds-its-box-allowlist.txt";
const BROWSER = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).filter(
  (file) => !/(?:^|\/)(?:test|server)\//.test(file) && !file.endsWith(".d.ts"),
);
const { consumers, findings } = holdsItsBoxCensus(BROWSER);
const allowances = readAllowlist(ALLOWLIST, consumers);

describe("a part fetched after the first paint holds its box (INC-940)", () => {
  it(
    "HB-1 every lazy part's places hold its box through a reserver, or the part has a live allowance",
    () => {
      console.log(
        `[HB-1] late parts: ${consumers.length}; outside the mechanism: ${new Set(findings.map((hit) => hit.file)).size}; allowlist: ${allowances.size}`,
      );
      expect(consumers.length).toBeGreaterThanOrEqual(13);
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
      // The mechanism's own consumers stay on it: they are never allowlisted.
      for (const key of [
        "src/features/posting/preview/listing-detail.tsx#MapPreview",
        "src/features/posting/step-where.tsx#MapPreview",
      ]) {
        expect(consumers).toContain(key);
        expect(allowances.has(key)).toBe(false);
      }
    },
    TREE_SCAN_MS,
  );

  it("HB-2 the census sees a planted text place, an empty place and a silent download, and passes a reserver", () => {
    const dir = "node_modules/.cache/holds-its-box";
    mkdirSync(dir, { recursive: true });
    const text = `${dir}/hb-text.tsx`;
    const empty = `${dir}/hb-empty.tsx`;
    const silent = `${dir}/hb-silent.tsx`;
    const good = `${dir}/hb-good.tsx`;
    try {
      writeFileSync(
        text,
        'import { Suspense, lazy } from "react";\nconst Map = lazy(() => import("./map"));\nexport const A = () => (\n  <Suspense fallback={<p>Map pin</p>}>\n    <Map />\n  </Suspense>\n);\n',
      );
      writeFileSync(
        empty,
        'import { Suspense } from "react";\nimport { Feed } from "./feed";\nexport const B = () => (\n  <Suspense fallback={null}>\n    <Feed />\n  </Suspense>\n);\n',
      );
      writeFileSync(
        silent,
        'import { resilientLazy } from "@/lib/resilient-lazy";\nfunction Nothing() {\n  return null;\n}\nexport const Map = resilientLazy(() => import("./map"), "the map", Nothing);\n',
      );
      writeFileSync(
        good,
        'import { Suspense } from "react";\nimport { resilientLazy } from "@/lib/resilient-lazy";\nimport { MapFrame } from "./map-frame";\nfunction Word() {\n  return <MapFrame precision={null}>x</MapFrame>;\n}\nconst Map = resilientLazy(() => import("./map"), "the map", Word);\nexport const C = () => (\n  <Suspense fallback={<Word />}>\n    <Map />\n  </Suspense>\n);\nexport const D = () => (\n  <Suspense fallback={<MapFrame precision="exact" />}>\n    <Map />\n  </Suspense>\n);\n',
      );
      const result = holdsItsBoxCensus([text, empty, silent, good]);
      expect(result.consumers).toEqual(
        [`${empty}#Feed`, `${good}#Map`, `${silent}#Map`, `${text}#Map`].sort(),
      );
      expect(report(result.findings)).toBe(
        [
          `${empty}#Feed:4 its place while it loads does not hold its box`,
          `${silent}#Map:5 its place when it cannot download does not hold its box`,
          `${text}#Map:4 its place while it loads does not hold its box`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("HB-3 every reserver exists, and the allowlist's lines are live, reasoned and dated", () => {
    const frame = readFileSync("src/features/posting/map/map-frame.tsx", "utf8");
    for (const name of RESERVERS) expect(frame).toMatch(new RegExp(`export function ${name}\\(`));
    for (const allowance of allowances.values()) {
      expect(allowance.reason.length).toBeGreaterThan(20);
      expect(allowance.until).toMatch(/^(?:\d{4}-\d{2}-\d{2}|INC-\d+|DEC-\d+)$/);
    }
  });
});
FILE-END scripts/conformance/holds-its-box.test.ts

FILE-BEGIN scripts/conformance/holds-its-box-allowlist.txt
# INC-940 (Foundations turn 34f): a part fetched after the first paint whose places do not hold its box through a reserver (scripts/conformance/holds-its-box.test.ts RESERVERS; src/features/posting/map/map-frame.tsx). <file>#<name> | <reason> | <until>
src/components/marketplace/feed.tsx#Await | a preload of the first cards' covers: it renders nothing whether loaded or not, so it holds no box to keep | 2027-04-27
src/components/shell/breadcrumbs.tsx#AdCrumbs | the ad's trail shows the ad's own title crumb (AdTitleCrumb) while its category path loads: one line of the crumb bar, whose height does not change | 2027-04-27
src/components/shell/breadcrumbs.tsx#AdminLanguageCrumb | a crumb waiting for its name draws PendingCrumb ("—") in the crumb bar's one line, whose height does not change | 2027-04-27
src/components/shell/breadcrumbs.tsx#AdminListingCrumb | a crumb waiting for its name draws PendingCrumb ("—") in the crumb bar's one line, whose height does not change | 2027-04-27
src/components/shell/breadcrumbs.tsx#AdminRoleCrumb | a crumb waiting for its name draws PendingCrumb ("—") in the crumb bar's one line, whose height does not change | 2027-04-27
src/components/shell/breadcrumbs.tsx#AdminUserCrumb | a crumb waiting for its name draws PendingCrumb ("—") in the crumb bar's one line, whose height does not change | 2027-04-27
src/components/shell/breadcrumbs.tsx#MyListingCrumb | a crumb waiting for its name draws PendingCrumb ("—") in the crumb bar's one line, whose height does not change | 2027-04-27
src/features/posting/preview/listing-detail.tsx#MapLarge | the large map opens in a dialog of fixed height (h-[90dvh], md:h-[70vh]): its place while it loads moves nothing on the page | 2027-04-27
src/features/posting/step-where.tsx#MapPinDropper | the pin map opens as a fixed full-screen sheet over the step; the one line it shows while it downloads is covered as the sheet opens | 2027-04-27
src/routes/c.$slug.tsx#Feed | the category feed's place while its first page streams is a spinner, not the cards' shape — the QueryState mechanism's work | INC-945
src/routes/index.tsx#Feed | the home feed's place while its first page streams is a spinner, not the cards' shape — the QueryState mechanism's work | INC-945
FILE-END scripts/conformance/holds-its-box-allowlist.txt

EDIT e2e/helpers/ui.ts #1
OLD-BEGIN

/** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
OLD-END
NEW-BEGIN

/** A box as Playwright's boundingBox() gives it: viewport pixels of the main frame. */
export type LayoutBox = { x: number; y: number; width: number; height: number };

/**
 * INC-940 — A LAYOUT IS READ WHOLE, ONCE IT HAS STOPPED MOVING. Every box a test compares is read
 * in ONE frame (one page.evaluate over every target), after settled(page), and the read is taken
 * again two animation frames later; the boxes are returned only when the two reads agree and every
 * target is drawn. A box read one by one can come from before a late part arrived and its
 * neighbour from after it (AP-36: the Location box grew between two reads when the still map's
 * code arrived). Targets are Locators, so a box inside a card, a tab by its position or a list's
 * items read as the test names them; each must match exactly one element. The poll's value names
 * the boxes still moving or missing, so a timeout says which.
 */
export async function layoutBoxes<K extends string>(
  targets: Readonly<Record<K, Locator>>,
  { timeout = 10_000 }: { timeout?: number } = {},
): Promise<Record<K, LayoutBox>> {
  const entries = Object.entries(targets) as Array<[K, Locator]>;
  const firstEntry = entries[0];
  if (firstEntry === undefined) throw new Error("layoutBoxes: no targets");
  const page = firstEntry[1].page();
  await settled(page);
  let boxes: Record<K, LayoutBox> | null = null;
  await expect
    .poll(
      async () => {
        const handles = await Promise.all(entries.map(([, locator]) => locator.elementHandle()));
        try {
          const read = await page.evaluate(async (elements) => {
            const take = () =>
              elements.map((element) => {
                if (element === null || element.getClientRects().length === 0) return null;
                if (getComputedStyle(element).visibility === "hidden") return null;
                const rect = element.getBoundingClientRect();
                return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
              });
            const before = take();
            await new Promise<void>((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
            );
            return { before, after: take() };
          }, handles);
          const missing = entries.filter((_, index) => read.after[index] === null);
          const moving = entries.filter(
            (_, index) => JSON.stringify(read.before[index]) !== JSON.stringify(read.after[index]),
          );
          if (missing.length > 0 || moving.length > 0)
            return `missing: ${missing.map(([name]) => name).join(", ") || "none"}; moving: ${moving.map(([name]) => name).join(", ") || "none"}`;
          boxes = Object.fromEntries(
            entries.map(([name], index) => [name, read.after[index]]),
          ) as Record<K, LayoutBox>;
          return "settled";
        } finally {
          await Promise.all(handles.map((handle) => handle?.dispose()));
        }
      },
      { timeout, message: "every box drawn and still over two frames (INC-940)" },
    )
    .toBe("settled");
  if (boxes === null) throw new Error("layoutBoxes: the boxes settled but were not kept");
  return boxes;
}

/** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
NEW-END

FILE-BEGIN e2e/ad-page-layout.spec.ts
import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { adminClient } from "./helpers/users";
import { whilePageLives } from "./helpers/route-guard";
import { gotoReady, layoutBoxes } from "./helpers/ui";
import { listingPath } from "../src/features/ad-page/address";

/**
 * INC-940 (Foundations turn 34f) — THE MAP'S PLACE HOLDS ITS BOX. AP-36 retried four times on
 * desktop-1280 when the Details | Description | Location row measured one height before the still
 * map arrived and another after it: the map's code, its library and its credit came after the page
 * had painted. Here the map's three downloads (its component, Leaflet and Leaflet's source) are held
 * until the Location box has been read, then let go; the box, and the row it stretches, keep their
 * height when the map is drawn (src/features/posting/map/map-frame.tsx).
 */
const MAP_CODE = /\/assets\/(?:map-preview|leaflet|leaflet-src)-[^/]*\.js(?:\?|$)/;

/** Scratch ads only; the maker's afterEach also reaps photos on a timed-out test. */
test.describe("AD PAGE — a late part holds its box (INC-940)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  test("ALS-1 the Location box keeps its height when the still map arrives", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", { pin: true });
    const exact = await adminClient()
      .from("listings")
      .update({ pin_precision: "exact", pin_show_lat: 8.9876543, pin_show_lng: 38.7612345 })
      .eq("id", ad.id);
    expect(exact.error).toBeNull();
    let release = () => undefined as void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    let heldCount = 0;
    await page.route(
      MAP_CODE,
      whilePageLives(async (route) => {
        heldCount += 1;
        await held;
        await route.fallback();
      }),
    );
    await gotoReady(page, listingPath(ad.title, await publicIdOf(ad.id)));
    const location = page.getByTestId("listing-detail-location");
    await location.scrollIntoViewIfNeeded();
    const targets = { location, safety: page.getByTestId("listing-safety") };
    const before = await layoutBoxes(targets);
    expect(heldCount, "the map's code was asked for and held").toBeGreaterThan(0);
    release();
    // The map is drawn: Leaflet opened it at its zoom (map-preview.tsx sets data-zoom with the credit).
    await expect(page.getByTestId("listing-map-pin")).toHaveAttribute("data-zoom", /\d/);
    const after = await layoutBoxes(targets);
    expect(Math.abs(after.location.height - before.location.height)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(after.safety.y - before.safety.y)).toBeLessThanOrEqual(0.5);
  });
});
FILE-END e2e/ad-page-layout.spec.ts

EDIT src/features/posting/map/map-preview.tsx #1
OLD-BEGIN
import { APPROX_RADIUS_M } from "./geocode";
import {
OLD-END
NEW-BEGIN
import { APPROX_RADIUS_M } from "./geocode";
import { STILL_MAP_BOX, STILL_MAP_CREDIT, stillMapCaptionKey } from "./still-map";
import {
NEW-END
EDIT src/features/posting/map/map-preview.tsx #2
OLD-BEGIN
  const approx = precision === "approx";
  // Part H2 — the plan in force's credit, drawn as text (never Leaflet's markup control).
OLD-END
NEW-BEGIN
  const approx = precision === "approx";
  const caption = stillMapCaptionKey(audience, approx);
  // Part H2 — the plan in force's credit, drawn as text (never Leaflet's markup control).
NEW-END
EDIT src/features/posting/map/map-preview.tsx #3
OLD-BEGIN
    <div className="space-y-1">
      <div
        ref={boxRef}
        className="isolate h-48 w-full overflow-hidden rounded-md border border-border"
        data-testid={approx ? "listing-map-circle" : "listing-map-pin"}
        data-precision={approx ? "approx" : "exact"}
        aria-label={t(
          audience === "buyer"
            ? approx
              ? "adPage.map.approx"
              : "adPage.map.label"
            : approx
              ? "post.pin.previewApprox"
              : "post.pin.previewExact",
        )}
      />
      <p className="text-end text-xs text-muted-foreground" data-testid="listing-map-credit">
        {credit}
      </p>
      {audience === "buyer" ? (
        approx ? (
          <p className="text-xs text-muted-foreground" data-testid="listing-map-caption">
            {t("adPage.map.approx")}
          </p>
        ) : null
      ) : (
        <p className="text-xs text-muted-foreground" data-testid="listing-map-caption">
          {t(approx ? "post.pin.previewApprox" : "post.pin.previewExact")}
        </p>
OLD-END
NEW-BEGIN
    <div className="space-y-1">
      {/* INC-940 — the credit lies on the box at its foot, so its length never moves the page. */}
      <div className="relative">
        <div
          ref={boxRef}
          className={STILL_MAP_BOX}
          data-testid={approx ? "listing-map-circle" : "listing-map-pin"}
          data-precision={approx ? "approx" : "exact"}
          aria-label={t(
            audience === "buyer"
              ? approx
                ? "adPage.map.approx"
                : "adPage.map.label"
              : approx
                ? "post.pin.previewApprox"
                : "post.pin.previewExact",
          )}
        />
        {credit !== "" && (
          <p className={STILL_MAP_CREDIT} data-testid="listing-map-credit">
            {credit}
          </p>
        )}
      </div>
      {caption !== null && (
        <p className="text-xs text-muted-foreground" data-testid="listing-map-caption">
          {t(caption)}
        </p>
NEW-END

EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
import { ownValue } from "@/lib/own-key";

OLD-END
NEW-BEGIN
import { ownValue } from "@/lib/own-key";
import { MapFrame } from "../map/map-frame";

NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN

/** What a map's place shows while it loads, or in its place: the map's own word. */
function MapUnavailable() {
  const { t } = useI18n();
  return <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>;
}
OLD-END
NEW-BEGIN

/**
 * What a map's place shows when it cannot download: the map's own word, in the still map's box
 * (INC-940 — the place holds the map's size, so nothing around it moves).
 */
function MapUnavailable({
  precision,
  audience,
}: {
  precision: string | null;
  audience?: "seller" | "buyer";
}) {
  const { t } = useI18n();
  return (
    <MapFrame precision={precision} {...(audience === undefined ? {} : { audience })}>
      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
    </MapFrame>
  );
}
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #3
OLD-BEGIN
                    fallback={
                      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
                    }
OLD-END
NEW-BEGIN
                    fallback={
                      <MapFrame
                        precision={view.pinPrecision ?? "exact"}
                        {...(view.actor === "buyer" ? { audience: "buyer" as const } : {})}
                      >
                        <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
                      </MapFrame>
                    }
NEW-END

EDIT src/features/posting/step-where.tsx #1
OLD-BEGIN
import { DETAILS_MAX, sanitizeDetails } from "./map/location-details";
import type { Refusal } from "./types";
OLD-END
NEW-BEGIN
import { DETAILS_MAX, sanitizeDetails } from "./map/location-details";
import { MapFrame } from "./map/map-frame";
import type { Refusal } from "./types";
NEW-END
EDIT src/features/posting/step-where.tsx #2
OLD-BEGIN
 * seller who never asks for a pin never downloads one. D234 S3 (INC-897) — both
 * are resilientLazy: a preview that cannot download shows nothing, and the pin
 * map offers "Try again", which reloads the page (the draft is saved).
 */
OLD-END
NEW-BEGIN
 * seller who never asks for a pin never downloads one. D234 S3 (INC-897) — both
 * are resilientLazy: a preview that cannot download shows the map's word in its
 * box (INC-940: map-frame.tsx), and the pin map offers "Try again", which reloads
 * the page (the draft is saved).
 */
NEW-END
EDIT src/features/posting/step-where.tsx #3
OLD-BEGIN

/** The pin preview's place when its map cannot download: nothing, as while it loads. */
function NoMap() {
  return null;
}
OLD-END
NEW-BEGIN

/**
 * The pin preview's place when its map cannot download: the map's word in the still map's box, as
 * while it loads (INC-940 — the place holds the map's size, so the step below it never moves).
 */
function NoMap({ precision }: { precision: string | null }) {
  const { t } = useI18n();
  return (
    <MapFrame precision={precision}>
      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
    </MapFrame>
  );
}
NEW-END
EDIT src/features/posting/step-where.tsx #4
OLD-BEGIN
              <div data-testid="post-where-pin-preview">
                <Suspense fallback={null}>
                  <MapPreview
OLD-END
NEW-BEGIN
              <div data-testid="post-where-pin-preview">
                <Suspense
                  fallback={
                    <MapFrame precision={pin.precision ?? null}>
                      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
                    </MapFrame>
                  }
                >
                  <MapPreview
NEW-END

FILE-BEGIN scripts/conformance/layout-reads.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-940 (Foundations turn 34f) — A TEST READS A LAYOUT WHOLE, ONCE IT HAS STOPPED MOVING. Boxes
 * read one by one can straddle a change (AP-36's four retried passes: the Location box grew between
 * two reads when the still map's code arrived). The mechanism is layoutBoxes (e2e/helpers/ui.ts):
 * every box a test compares in one frame, after settled(page), returned only when two reads two
 * frames apart agree.
 *
 * The census reads every file under e2e/ for a call of `.boundingBox()`. Each is keyed by the test
 * it sits in (`<file>#<id>`: the title's leading id such as AP-36, else the whole title) or, outside
 * any test, by the function it sits in (`<file>#fn:<name>`). A key with a read carries an allowance
 * (`<key> | reason | until`) in layout-reads-allowlist.txt; the mechanism itself reads by
 * getBoundingClientRect inside one evaluate and is not a call of `.boundingBox()`.
 */

type Finding = { file: string; line: number; what: string };

const TEST_CALLS = new Set(["test", "it"]);

function titleOf(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  const name = ts.isIdentifier(callee)
    ? callee.text
    : ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression)
      ? callee.expression.text
      : undefined;
  if (name === undefined || !TEST_CALLS.has(name)) return undefined;
  if (
    ts.isPropertyAccessExpression(callee) &&
    !["only", "skip", "fixme", "fail"].includes(callee.name.text)
  )
    return undefined;
  const first = call.arguments[0];
  if (
    first !== undefined &&
    (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first))
  )
    return first.text;
  return undefined;
}

function keyOf(node: ts.Node, file: string): string {
  let fn: string | undefined;
  for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) {
    if (ts.isCallExpression(up)) {
      const title = titleOf(up);
      if (title !== undefined) {
        const id = /^([A-Z][A-Za-z0-9]*-\d+[a-z]?)\b/.exec(title);
        return `${file}#${id?.[1] ?? title}`;
      }
    }
    if (fn === undefined) {
      if (ts.isFunctionDeclaration(up) && up.name !== undefined) fn = up.name.text;
      else if (
        (ts.isArrowFunction(up) || ts.isFunctionExpression(up)) &&
        ts.isVariableDeclaration(up.parent) &&
        ts.isIdentifier(up.parent.name)
      )
        fn = up.parent.name.text;
    }
  }
  return `${file}#fn:${fn ?? "(top level)"}`;
}

export function layoutReadsCensus(files: string[]): { keys: string[]; findings: Finding[] } {
  const findings: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "boundingBox"
      )
        findings.push({
          file: keyOf(node, file),
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: "reads a box by itself; compare boxes through layoutBoxes (e2e/helpers/ui.ts)",
        });
    });
  }
  return { keys: [...new Set(findings.map((hit) => hit.file))].sort(), findings };
}

const ALLOWLIST = "scripts/conformance/layout-reads-allowlist.txt";
const { keys, findings } = layoutReadsCensus(walkFiles(["e2e"], { ext: ["ts"] }));
const allowances = readAllowlist(ALLOWLIST, keys);

describe("a test reads a layout whole, once it has stopped moving (INC-940)", () => {
  it(
    "BX-1 every box read in e2e/ is a layoutBoxes read, or its test has a live allowance",
    () => {
      console.log(
        `[BX-1] tests and helpers reading boxes by themselves: ${keys.length}; reads: ${findings.length}; allowlist: ${allowances.size}`,
      );
      expect(report(findings.filter((hit) => !allowances.has(hit.file)))).toBe("");
      // The file moved onto the mechanism stays on it.
      expect(keys.filter((key) => key.startsWith("e2e/ad-page.spec.ts#"))).toEqual([]);
      expect(readFileSync("e2e/helpers/ui.ts", "utf8")).toMatch(
        /export async function layoutBoxes</,
      );
    },
    TREE_SCAN_MS,
  );

  it("BX-2 the census sees a planted read in a test, in a describe's helper and at the top, and passes layoutBoxes", () => {
    const dir = "node_modules/.cache/layout-reads";
    mkdirSync(dir, { recursive: true });
    const spec = `${dir}/bx.spec.ts`;
    const good = `${dir}/bx-good.spec.ts`;
    try {
      writeFileSync(
        spec,
        'import { test } from "@playwright/test";\nconst top = async (l: any) => l.boundingBox();\ntest.describe("d", () => {\n  const box = async (l: any) => l.boundingBox();\n  test("BX-9 a planted test", async ({ page }) => {\n    await page.getByTestId("a").boundingBox();\n    await box(page);\n  });\n  test.skip("a titled test without an id", async ({ page }) => {\n    await page.getByTestId("b").boundingBox();\n  });\n});\nvoid top;\n',
      );
      writeFileSync(
        good,
        'import { test } from "@playwright/test";\nimport { layoutBoxes } from "../../../e2e/helpers/ui";\ntest("BX-8 good", async ({ page }) => {\n  await layoutBoxes({ a: page.getByTestId("a"), b: page.getByTestId("b") });\n});\n',
      );
      const result = layoutReadsCensus([spec, good]);
      expect(result.keys).toEqual(
        [
          `${spec}#BX-9`,
          `${spec}#a titled test without an id`,
          `${spec}#fn:box`,
          `${spec}#fn:top`,
        ].sort(),
      );
      expect(result.findings.map((hit) => `${hit.file}:${hit.line}`).sort()).toEqual(
        [
          `${spec}#BX-9:6`,
          `${spec}#a titled test without an id:10`,
          `${spec}#fn:box:4`,
          `${spec}#fn:top:2`,
        ].sort(),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/layout-reads.test.ts

FILE-BEGIN scripts/conformance/layout-reads-allowlist.txt
# INC-940 (Foundations turn 34f): a test or e2e helper that reads a box by itself with .boundingBox() instead of layoutBoxes (e2e/helpers/ui.ts) — each moves onto layoutBoxes file by file (INC-946); e2e/ad-page.spec.ts moved in this turn. <file>#<test id or title, or fn:<helper>> | <reason> | <until>
e2e/admin-categories-console.spec.ts#CT-8 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/admin-locations.spec.ts#LT-8 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/admin-shell.spec.ts#IN-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/feed-screens.spec.ts#FS-12 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/house-style.spec.ts#HS-3 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/house-style.spec.ts#HS-4 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/my-listings-ad.spec.ts#MLA-12 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/my-listings-ad.spec.ts#fn:expectPhoneRowUsable | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/phone-frame.spec.ts#fn:checkFrame | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/photo-pipeline.spec.ts#PP-22 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/photo-pipeline.spec.ts#PP-23 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/photo-pipeline.spec.ts#PP-28 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-bundle2.spec.ts#PW-147 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-bundle2.spec.ts#PW-148 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-bundle2.spec.ts#fn:expectPhoneRowUsable | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/post-wizard-category.spec.ts#PW-141 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-category.spec.ts#PW-3 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-category.spec.ts#PW-52 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-place.spec.ts#PW-80 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-place.spec.ts#fn:expectPhoneRowUsable | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/post-wizard-recent.spec.ts#PW-171 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-resets.spec.ts#PW-79 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-units.spec.ts#PW-175 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-where.spec.ts#PW-88 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-where.spec.ts#PW-99 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/post-wizard-where.spec.ts#fn:tickOnCityLine | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/primitives-law.spec.ts#L11 wide columns hide below xl and the first column stays pinned | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell-table-law.spec.ts#admin tables never overflow horizontally | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#B21SC-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#B21SC-2 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#BK-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#FT-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#FV-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#FV-2 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#L3: the footer spans the full width beneath the fixed rail | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#PN-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#RM-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#RM-2 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#RM-3 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#SB-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#SR-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#TB-1 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#TB-2 | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#every rail row carries a leading icon on one gutter | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#exactly one collapse toggle, and the wordmark moves into the bar when collapsed | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#fn:bottomOf | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/shell.spec.ts#fn:expectTapTarget | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/shell.spec.ts#fn:rowPair | a helper of its file that reads a box by itself; it moves with its file's tests | INC-946
e2e/shell.spec.ts#logo cell sits exactly above the rail and beside the top bar | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#long location names share one 32px line | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#md+ rail: items scroll, header fixed | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#menu: items scroll, menu fixed, identity pinned | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#nothing hides under the bar | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#password visibility stays inside the full-width field | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#primary touch targets are at least 44px | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#tablets get the persistent rail and the FULL controls | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the band sits in the rail directly below the logo cell | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the bar and the band stay while the page scrolls | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the bottom bar, signed out | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the feed body is centred with equal left and right gutters | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the lockup's second line spans the wordmark exactly | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the menu opens in place | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the posting wizard keeps the frame | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the rail collapses to icons, shows a tooltip, and remembers the choice | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the strip sits under the fixed bar | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the top bar is ONE band: logo-cell height AND background, location row separate | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#the vertical stack is ordered: top bar, breadcrumbs, location row, body | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
e2e/shell.spec.ts#top-bar controls are right-aligned at desktop width | reads its boxes one by one; it moves onto layoutBoxes with its file | INC-946
FILE-END scripts/conformance/layout-reads-allowlist.txt

EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN
  gotoReady,
  signInViaSession,
OLD-END
NEW-BEGIN
  gotoReady,
  layoutBoxes,
  signInViaSession,
NEW-END
EDIT e2e/ad-page.spec.ts #2
OLD-BEGIN
        .toBe(true);
      let previous = "";
      await expect
        .poll(async () => {
          const boxes = await Promise.all([
            page.getByTestId("listing-detail-media").boundingBox(),
            page.getByTestId("listing-detail-headline").boundingBox(),
          ]);
          const current = JSON.stringify(boxes);
          const settled = boxes.every(Boolean) && current === previous;
          previous = current;
          return settled;
        })
        .toBe(true);
      const article = await page.getByTestId("listing-detail").boundingBox();
      const media = await page.getByTestId("listing-detail-media").boundingBox();
      const headline = await page.getByTestId("listing-detail-headline").boundingBox();
      const nav = await page.getByTestId("listing-section-nav").boundingBox();
      const details = await page.getByTestId("listing-detail-specs").boundingBox();
      const description = await page.locator("#ad-description").boundingBox();
      const sellerBox = await page
        .locator('section[data-testid="listing-detail-seller"]')
        .boundingBox();
      const location = await page.getByTestId("listing-detail-location").boundingBox();
      const safety = await page.getByTestId("listing-safety").boundingBox();
      if (
        !article ||
        !media ||
        !headline ||
        !nav ||
        !details ||
        !description ||
        !sellerBox ||
        !location ||
        !safety
      )
        throw new Error("AP-36 missing layout boxes");
      const near = (a: number, b: number, tolerance: number) => Math.abs(a - b) <= tolerance;
OLD-END
NEW-BEGIN
        .toBe(true);
      // INC-940 — every box in one settled read (four retried passes: the row's boxes were read one
      // by one while the Location box grew as the still map's code arrived).
      const { article, media, headline, nav, details, description, sellerBox, location, safety } =
        await layoutBoxes({
          article: page.getByTestId("listing-detail"),
          media: page.getByTestId("listing-detail-media"),
          headline: page.getByTestId("listing-detail-headline"),
          nav: page.getByTestId("listing-section-nav"),
          details: page.getByTestId("listing-detail-specs"),
          description: page.locator("#ad-description"),
          sellerBox: page.locator('section[data-testid="listing-detail-seller"]'),
          location: page.getByTestId("listing-detail-location"),
          safety: page.getByTestId("listing-safety"),
        });
      const near = (a: number, b: number, tolerance: number) => Math.abs(a - b) <= tolerance;
NEW-END
EDIT e2e/ad-page.spec.ts #3
OLD-BEGIN
        await page.getByTestId("listing-safety").scrollIntoViewIfNeeded();
        const stuckNav = await page.getByTestId("listing-section-nav").boundingBox();
        const band = await page.getByTestId("shell-subband").boundingBox();
        if (!stuckNav || !band) throw new Error("AP-36 sticky boxes missing");
        expect(Math.abs(stuckNav.y - band.y - band.height)).toBeLessThanOrEqual(8);
OLD-END
NEW-BEGIN
        await page.getByTestId("listing-safety").scrollIntoViewIfNeeded();
        const { stuckNav, band } = await layoutBoxes({
          stuckNav: page.getByTestId("listing-section-nav"),
          band: page.getByTestId("shell-subband"),
        });
        expect(Math.abs(stuckNav.y - band.y - band.height)).toBeLessThanOrEqual(8);
NEW-END
EDIT e2e/ad-page.spec.ts #4
OLD-BEGIN
    await sampleScroll("seller", 600);
    await expect
      .poll(async () => {
        const seller = await page
          .locator('section[data-testid="listing-detail-seller"]')
          .boundingBox();
        const nav = await bar.boundingBox();
        return seller && nav ? seller.y - nav.y - nav.height : -1;
      })
      .toBeGreaterThanOrEqual(0);
    const locationItem = bar.locator('[data-target="location"]');
OLD-END
NEW-BEGIN
    await sampleScroll("seller", 600);
    // INC-940 — the card and the bar in one settled read.
    const atSeller = await layoutBoxes({
      card: page.locator('section[data-testid="listing-detail-seller"]'),
      nav: bar,
    });
    expect(atSeller.card.y - atSeller.nav.y - atSeller.nav.height).toBeGreaterThanOrEqual(0);
    const locationItem = bar.locator('[data-target="location"]');
NEW-END
EDIT e2e/ad-page.spec.ts #5
OLD-BEGIN
    await sampleScroll("location", 600);
    await expect
      .poll(async () => {
        const heading = await page
          .getByTestId("listing-detail-location")
          .getByRole("heading")
          .boundingBox();
        const nav = await bar.boundingBox();
        return heading && nav ? heading.y - nav.y - nav.height : -1;
      })
      .toBeGreaterThanOrEqual(0);
    await expect
      .poll(async () => {
        const nav = await bar.boundingBox();
        const band = await page.getByTestId("shell-subband").boundingBox();
        return nav && band ? Math.abs(nav.y - band.y - band.height) : 100;
      })
      .toBeLessThanOrEqual(8);
    // Turn 23: a sold ad without a pin has no Location box and no tab.
OLD-END
NEW-BEGIN
    await sampleScroll("location", 600);
    // INC-940 — the heading, the bar and the sub-band in one settled read.
    const atLocation = await layoutBoxes({
      heading: page.getByTestId("listing-detail-location").getByRole("heading"),
      nav: bar,
      band: page.getByTestId("shell-subband"),
    });
    expect(atLocation.heading.y - atLocation.nav.y - atLocation.nav.height).toBeGreaterThanOrEqual(
      0,
    );
    expect(
      Math.abs(atLocation.nav.y - atLocation.band.y - atLocation.band.height),
    ).toBeLessThanOrEqual(8);
    // Turn 23: a sold ad without a pin has no Location box and no tab.
NEW-END
EDIT e2e/ad-page.spec.ts #6
OLD-BEGIN
    await expect(toggle).toHaveText(en["adPage.description.more"]);
    const folded = await text.boundingBox();
    if (!folded) throw new Error("AP-41 folded description missing");
    await toggle.click();
OLD-END
NEW-BEGIN
    await expect(toggle).toHaveText(en["adPage.description.more"]);
    // INC-940 — the text's box read settled, folded and then open.
    const folded = (await layoutBoxes({ text })).text;
    await toggle.click();
NEW-END
EDIT e2e/ad-page.spec.ts #7
OLD-BEGIN
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect
      .poll(async () => (await text.boundingBox())?.height ?? 0)
      .toBeGreaterThan(folded.height);
    await toggle.click();
OLD-END
NEW-BEGIN
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect((await layoutBoxes({ text })).text.height).toBeGreaterThan(folded.height);
    await toggle.click();
NEW-END
EDIT e2e/ad-page.spec.ts #8
OLD-BEGIN
    await gotoReady(page, (await address(ad)).canonical);
    const box = async (id: string) => {
      const found = await page.getByTestId(id).boundingBox();
      if (!found) throw new Error(`AP-44 ${id} missing`);
      return found;
    };
    /** The element at a bar's centre must be INSIDE that bar, never inside the map. */
OLD-END
NEW-BEGIN
    await gotoReady(page, (await address(ad)).canonical);
    // INC-940 — each step's two boxes in one settled read, after the wheel's scroll has stopped.
    const pair = (moving: string, bar: string) =>
      layoutBoxes({ moving: page.getByTestId(moving), bar: page.getByTestId(bar) });
    /** The element at a bar's centre must be INSIDE that bar, never inside the map. */
NEW-END
EDIT e2e/ad-page.spec.ts #9
OLD-BEGIN
        await page.mouse.wheel(0, 120);
        const map = await box("listing-detail-map");
        const band = await box("shell-band");
        return map.y < band.y + band.height;
      })
OLD-END
NEW-BEGIN
        await page.mouse.wheel(0, 120);
        const { moving, bar } = await pair("listing-detail-map", "shell-band");
        return moving.y < bar.y + bar.height;
      })
NEW-END
EDIT e2e/ad-page.spec.ts #10
OLD-BEGIN
        await page.mouse.wheel(0, 120);
        const enlarge = await box("listing-map-enlarge");
        const nav = await box("listing-section-nav");
        return enlarge.y < nav.y + nav.height;
      })
OLD-END
NEW-BEGIN
        await page.mouse.wheel(0, 120);
        const { moving, bar } = await pair("listing-map-enlarge", "listing-section-nav");
        return moving.y < bar.y + bar.height;
      })
NEW-END
EDIT e2e/ad-page.spec.ts #11
OLD-BEGIN
      await expect(page.getByTestId("listing-detail-specs")).toBeVisible();
      let previous = "";
      await expect
        .poll(async () => {
          const current = JSON.stringify(
            await Promise.all([
              page.getByTestId("listing-detail-specs").boundingBox(),
              page.locator('section[data-testid="listing-detail-seller"]').boundingBox(),
            ]),
          );
          const stable = previous === current;
          previous = current;
          return stable;
        })
        .toBe(true);
      const article = await page.getByTestId("listing-detail").boundingBox();
      if (!article) throw new Error("AP-42 article missing");
      if (article.width < 896) throw new Error("AP-42 article under 896 on desktop-1280");
      const details = await page.getByTestId("listing-detail-specs").boundingBox();
      const sellerBox = await page
        .locator('section[data-testid="listing-detail-seller"]')
        .boundingBox();
      if (!details || !sellerBox) throw new Error("AP-42 boxes missing");
      if (ad.id === live.id) {
        // DEC-197 — no description and no pin: Details alone across the row,
OLD-END
NEW-BEGIN
      await expect(page.getByTestId("listing-detail-specs")).toBeVisible();
      // INC-940 — every box the branch compares, in one settled read.
      const shared = {
        article: page.getByTestId("listing-detail"),
        details: page.getByTestId("listing-detail-specs"),
        sellerBox: page.locator('section[data-testid="listing-detail-seller"]'),
      };
      if (ad.id === live.id) {
        const { article, details, safetyBox } = await layoutBoxes({
          ...shared,
          safetyBox: page.getByTestId("listing-safety"),
        });
        if (article.width < 896) throw new Error("AP-42 article under 896 on desktop-1280");
        // DEC-197 — no description and no pin: Details alone across the row,
NEW-END
EDIT e2e/ad-page.spec.ts #12
OLD-BEGIN
        expect(Math.abs(details.width - article.width)).toBeLessThanOrEqual(1);
        const safetyBox = await page.getByTestId("listing-safety").boundingBox();
        if (!safetyBox) throw new Error("AP-42 live safety missing");
        expect(Math.abs(safetyBox.width - article.width)).toBeLessThanOrEqual(1);
OLD-END
NEW-BEGIN
        expect(Math.abs(details.width - article.width)).toBeLessThanOrEqual(1);
        expect(Math.abs(safetyBox.width - article.width)).toBeLessThanOrEqual(1);
NEW-END
EDIT e2e/ad-page.spec.ts #13
OLD-BEGIN
        // Description | Location in thirds; no safety box.
        const description = await page.locator("#ad-description").boundingBox();
        const location = await page.getByTestId("listing-detail-location").boundingBox();
        if (!description || !location) throw new Error("AP-42 sold boxes missing");
        await expect(page.getByTestId("listing-safety")).toHaveCount(0);
        for (const item of [details, description, location])
OLD-END
NEW-BEGIN
        // Description | Location in thirds; no safety box.
        await expect(page.getByTestId("listing-safety")).toHaveCount(0);
        const { article, details, sellerBox, description, location } = await layoutBoxes({
          ...shared,
          description: page.locator("#ad-description"),
          location: page.getByTestId("listing-detail-location"),
        });
        if (article.width < 896) throw new Error("AP-42 article under 896 on desktop-1280");
        for (const item of [details, description, location])
NEW-END
EDIT e2e/ad-page.spec.ts #14
OLD-BEGIN
    await expect(page.getByTestId("listing-detail-location")).toHaveCount(0);
    const articleBox = await page.getByTestId("listing-detail").boundingBox();
    const sellerCard = await page
      .locator('section[data-testid="listing-detail-seller"]')
      .boundingBox();
    const safety = await page.getByTestId("listing-safety").boundingBox();
    if (!articleBox || !sellerCard || !safety) throw new Error("AP-42 no-pin boxes missing");
    expect(Math.abs(safety.width - articleBox.width)).toBeLessThanOrEqual(1);
OLD-END
NEW-BEGIN
    await expect(page.getByTestId("listing-detail-location")).toHaveCount(0);
    const { articleBox, sellerCard, safety } = await layoutBoxes({
      articleBox: page.getByTestId("listing-detail"),
      sellerCard: page.locator('section[data-testid="listing-detail-seller"]'),
      safety: page.getByTestId("listing-safety"),
    });
    expect(Math.abs(safety.width - articleBox.width)).toBeLessThanOrEqual(1);
NEW-END
EDIT e2e/ad-page.spec.ts #15
OLD-BEGIN
    await expect(bar.locator('[data-testid="listing-section-nav-item"]:visible')).toHaveCount(3);
    const settle = async () => {
      let previous = "";
      await expect
        .poll(async () => {
          const current = JSON.stringify(
            await Promise.all([
              bar.boundingBox(),
              page.locator('section[data-testid="listing-detail-seller"]').boundingBox(),
            ]),
          );
          const stable = previous === current && current !== "null";
          previous = current;
          return stable;
        })
        .toBe(true);
    };
    const tap = async (target: string, card: string) => {
OLD-END
NEW-BEGIN
    await expect(bar.locator('[data-testid="listing-section-nav-item"]:visible')).toHaveCount(3);
    // INC-940 — the tap's scroll has stopped when the bar and the seller card hold still.
    const settle = () =>
      layoutBoxes({
        nav: bar,
        seller: page.locator('section[data-testid="listing-detail-seller"]'),
      });
    const tap = async (target: string, card: string) => {
NEW-END
EDIT e2e/ad-page.spec.ts #16
OLD-BEGIN
      }
      const heading = await page.locator(card).getByRole("heading").boundingBox();
      const nav = await bar.boundingBox();
      if (!heading || !nav) throw new Error(`AP-45 ${target} boxes missing`);
      expect(heading.y).toBeGreaterThanOrEqual(nav.y + nav.height);
OLD-END
NEW-BEGIN
      }
      const { heading, nav } = await layoutBoxes({
        heading: page.locator(card).getByRole("heading"),
        nav: bar,
      });
      expect(heading.y).toBeGreaterThanOrEqual(nav.y + nav.height);
NEW-END
EDIT e2e/ad-page.spec.ts #17
OLD-BEGIN
      .toBe(true);
    const media = await page.getByTestId("listing-detail-media").boundingBox();
    const sellerBox = await page
      .locator('section[data-testid="listing-detail-seller"]')
      .boundingBox();
    if (!media || !sellerBox) throw new Error("AP-50 boxes missing");
    // The media card grows to the right column: its bottom meets the seller
OLD-END
NEW-BEGIN
      .toBe(true);
    // INC-940 — the four boxes in one settled read.
    const { media, sellerBox, img, allAds } = await layoutBoxes({
      media: page.getByTestId("listing-detail-media"),
      sellerBox: page.locator('section[data-testid="listing-detail-seller"]'),
      img: page.getByTestId("gallery-main").locator("img"),
      allAds: page.getByTestId("listing-seller-all-ads"),
    });
    // The media card grows to the right column: its bottom meets the seller
NEW-END
EDIT e2e/ad-page.spec.ts #18
OLD-BEGIN
    );
    const img = await page.getByTestId("gallery-main").locator("img").boundingBox();
    if (!img) throw new Error("AP-50 photo missing");
    expect(img.y).toBeGreaterThanOrEqual(media.y);
OLD-END
NEW-BEGIN
    );
    expect(img.y).toBeGreaterThanOrEqual(media.y);
NEW-END
EDIT e2e/ad-page.spec.ts #19
OLD-BEGIN
    // The seller's-page link sits in the card's lower half.
    const allAds = await page.getByTestId("listing-seller-all-ads").boundingBox();
    if (!allAds) throw new Error("AP-50 seller link missing");
    expect(allAds.y).toBeGreaterThanOrEqual(sellerBox.y + sellerBox.height / 2);
OLD-END
NEW-BEGIN
    // The seller's-page link sits in the card's lower half.
    expect(allAds.y).toBeGreaterThanOrEqual(sellerBox.y + sellerBox.height / 2);
NEW-END
EDIT e2e/ad-page.spec.ts #20
OLD-BEGIN
    await expect(page.getByTestId("listing-share-open")).toHaveText(en["adPage.share.open"]);
    let previous = "";
    await expect
      .poll(async () => {
        const current = JSON.stringify(
          await Promise.all([
            page.getByTestId("listing-detail-actions").boundingBox(),
            headline.boundingBox(),
            media.boundingBox(),
            page.locator('section[data-testid="listing-detail-seller"]').boundingBox(),
          ]),
        );
        const stable = previous === current;
        previous = current;
        return stable;
      })
      .toBe(true);
    const actions = await page.getByTestId("listing-detail-actions").boundingBox();
    const headlineBox = await headline.boundingBox();
    const mediaBox = await media.boundingBox();
    if (!actions || !headlineBox || !mediaBox) throw new Error("AP-46 boxes missing");
    expect(
OLD-END
NEW-BEGIN
    await expect(page.getByTestId("listing-share-open")).toHaveText(en["adPage.share.open"]);
    // INC-940 — the five boxes in one settled read.
    const { actions, headlineBox, mediaBox, article, sellerBox } = await layoutBoxes({
      actions: page.getByTestId("listing-detail-actions"),
      headlineBox: headline,
      mediaBox: media,
      article: page.getByTestId("listing-detail"),
      sellerBox: page.locator('section[data-testid="listing-detail-seller"]'),
    });
    expect(
NEW-END
EDIT e2e/ad-page.spec.ts #21
OLD-BEGIN
    ).toBeLessThanOrEqual(24);
    const article = await page.getByTestId("listing-detail").boundingBox();
    const sellerBox = await page
      .locator('section[data-testid="listing-detail-seller"]')
      .boundingBox();
    if (!article || !sellerBox) throw new Error("AP-46 article or seller missing");
    // DEC-199 — the last check depends on the width: below 920 px the title
OLD-END
NEW-BEGIN
    ).toBeLessThanOrEqual(24);
    // DEC-199 — the last check depends on the width: below 920 px the title
NEW-END
EDIT e2e/ad-page.spec.ts #22
OLD-BEGIN
    await expect(bar.locator('[data-testid="listing-section-nav-item"]:visible')).toHaveCount(4);
    const nav = await bar.boundingBox();
    if (!nav) throw new Error("AP-47 nav missing");
    const overflow = await bar.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const items = await bar.locator('[data-testid="listing-section-nav-item"]:visible').all();
    for (const item of items) {
      const box = await item.boundingBox();
      if (!box) throw new Error("AP-47 item missing");
      expect(box.x).toBeGreaterThanOrEqual(nav.x - 1);
      expect(box.x + box.width).toBeLessThanOrEqual(nav.x + nav.width + 1);
    }
OLD-END
NEW-BEGIN
    await expect(bar.locator('[data-testid="listing-section-nav-item"]:visible')).toHaveCount(4);
    const overflow = await bar.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    // INC-940 — the bar and every visible item in one settled read.
    const items = await bar.locator('[data-testid="listing-section-nav-item"]:visible').all();
    const read = await layoutBoxes({
      nav: bar,
      ...Object.fromEntries(items.map((item, index) => [`item${index}`, item])),
    });
    for (const [name, box] of Object.entries(read)) {
      if (name === "nav") continue;
      expect(box.x).toBeGreaterThanOrEqual(read.nav.x - 1);
      expect(box.x + box.width).toBeLessThanOrEqual(read.nav.x + read.nav.width + 1);
    }
NEW-END
EDIT e2e/ad-page.spec.ts #23
OLD-BEGIN
      await expect(page.getByTestId("gallery-strip-back")).toHaveCount(0);
      const stripBox = await strip.boundingBox();
      const moreBox = await more.boundingBox();
      if (!stripBox || !moreBox) throw new Error("AP-48 strip boxes missing");
      expect(
        Math.abs(moreBox.y + moreBox.height - (stripBox.y + stripBox.height)),
      ).toBeLessThanOrEqual(1);
OLD-END
NEW-BEGIN
      await expect(page.getByTestId("gallery-strip-back")).toHaveCount(0);
      // INC-940 — each comparison's boxes in one settled read.
      const before = await layoutBoxes({ strip, more });
      expect(
        Math.abs(before.more.y + before.more.height - (before.strip.y + before.strip.height)),
      ).toBeLessThanOrEqual(1);
NEW-END
EDIT e2e/ad-page.spec.ts #24
OLD-BEGIN
      await expect.poll(async () => strip.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
      const backBox = await page.getByTestId("gallery-strip-back").boundingBox();
      if (!backBox) throw new Error("AP-48 back box missing");
      expect(Math.abs(backBox.y - stripBox.y)).toBeLessThanOrEqual(1);
    } else {
OLD-END
NEW-BEGIN
      await expect.poll(async () => strip.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
      const after = await layoutBoxes({ strip, back: page.getByTestId("gallery-strip-back") });
      expect(Math.abs(after.back.y - after.strip.y)).toBeLessThanOrEqual(1);
    } else {
NEW-END
EDIT e2e/ad-page.spec.ts #25
OLD-BEGIN
    await expect(page.getByTestId("gallery-count")).toHaveText("10 / 10");
    const stripBox = await strip.boundingBox();
    const tenthBox = await strip.getByTestId("gallery-thumb").nth(9).boundingBox();
    if (!stripBox || !tenthBox) throw new Error("AP-48 tenth thumbnail missing");
    expect(tenthBox.x).toBeGreaterThanOrEqual(stripBox.x - 1);
OLD-END
NEW-BEGIN
    await expect(page.getByTestId("gallery-count")).toHaveText("10 / 10");
    const { stripBox, tenthBox } = await layoutBoxes({
      stripBox: strip,
      tenthBox: strip.getByTestId("gallery-thumb").nth(9),
    });
    expect(tenthBox.x).toBeGreaterThanOrEqual(stripBox.x - 1);
NEW-END
EDIT e2e/ad-page.spec.ts #26
OLD-BEGIN
    });
    const rowBox = await row.boundingBox();
    const firstBox = await row.getByTestId("gallery-thumb").nth(0).boundingBox();
    if (!rowBox || !firstBox) throw new Error("AP-48 viewer row missing");
    expect(firstBox.x).toBeGreaterThanOrEqual(rowBox.x - 1);
OLD-END
NEW-BEGIN
    });
    const { rowBox, firstBox } = await layoutBoxes({
      rowBox: row,
      firstBox: row.getByTestId("gallery-thumb").nth(0),
    });
    expect(firstBox.x).toBeGreaterThanOrEqual(rowBox.x - 1);
NEW-END

EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's; a package install runs once — INC-943, DEC-276); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside; the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, outside calls, installs, package installs run once and backend starts; CF-CID-2: planted); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |

OLD-END
NEW-BEGIN
| 59 | Every CI job and every outside call carries a deadline: a step with none held a run for an hour (lane 16's browser install, run 40397087967) and a job with none runs to GitHub's 360 minutes; the temporary backend's fixed ports sit inside Linux's ephemeral range, so an outgoing connection could hold one (lanes 16, 8, 7, 10: "address already in use") (INC-935, DEC-275) | `scripts/ci/with-deadline.sh <seconds> <tries> -- <command>` (coreutils `timeout` on the command's process group; a failed or overdue try retried after 10 s as a `ci-retry` warning; the last try's code is the step's; a package install runs once — INC-943, DEC-276); `timeout-minutes` on every job (but the one that calls the lanes' reusable workflow) and on every step that reaches outside; the lanes' first step `sysctl net.ipv4.ip_local_reserved_ports=54320-54329`, and a failed start writes who held the ports into its evidence | `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1: every workflow's jobs, outside calls, installs, package installs run once and backend starts; CF-CID-2: planted); `scripts/ci/with-deadline.test.ts` (WDL-1…4) | none — the nightly's 360 minutes is GitHub's own ceiling for its full serial suite (its length is the nightly's own concern) | a new workflow, job or install is named by CF-CID-1 until it carries its deadline | ci.yml, local-backend-proof.yml, nightly-e2e.yml, flake-check.yml, guard-proof.yml, feed-bench.yml, ci-status-report.yml, zap-baseline.yml since turn 34e; Foundations turn 34e |
| 60 | A part of the page that arrives after the first paint (a `resilientLazy` or `lazy` component, anything behind `<Suspense>`) holds its box from the first paint: its place while it loads and when it cannot download is the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2 predictable layout; Core Web Vitals CLS) — AP-36's four retried passes, the Location box growing as the still map arrived (INC-940) | `src/features/posting/map/map-frame.tsx` `MapFrame` (the reserver) over `src/features/posting/map/still-map.ts` (`STILL_MAP_BOX`, `STILL_MAP_CREDIT`, `stillMapCaptionKey`), which the still map (`map-preview.tsx`) draws from; the provider's credit lies on the box at its foot | `scripts/conformance/holds-its-box.test.ts` — HB-1 enumerates every resilientLazy/lazy binding and every Suspense in src/ (13 at turn 34f), HB-2 plants a text place, an empty place and a silent download; `src/features/posting/map/map-frame.test.tsx` MFR-1/2 (the frame and the map draw the same box and caption); `src/features/posting/preview/listing-detail-map.test.tsx` LDM-1; `e2e/ad-page-layout.spec.ts` ALS-1 (the built page: the Location box keeps its height when the map's three downloads are let go) | `scripts/conformance/holds-its-box-allowlist.txt` (`<file>#<name> | reason | until`): the crumbs (one line of the crumb bar), the large map and the pin map (fixed overlays), the feed's cover preload (renders nothing), the home and category feeds' spinner (INC-945 — the QueryState mechanism) | a new reserver is a name in RESERVERS; a late part is a census key | turn 34f; the images' boxes are the Picture mechanism's (roadmap) |
| 61 | A test reads a layout whole, once it has stopped moving: every box a test compares is read in one frame after `settled(page)`, and kept only when a read two frames later agrees, so boxes read one by one never straddle a change (INC-940; INC-384 is its animation half) | `e2e/helpers/ui.ts` `layoutBoxes(targets)` (Locators in, `LayoutBox`es out; one `page.evaluate` over every element; the poll names the boxes still moving or missing) | `scripts/conformance/layout-reads.test.ts` — BX-1 enumerates every `.boundingBox()` call under e2e/ keyed by its test id (or title) or its helper, BX-2 plants a read in a test, in a describe's helper and at the top level | `scripts/conformance/layout-reads-allowlist.txt` — 68 keys in 18 files (`until INC-946`); e2e/ad-page.spec.ts moved in turn 34f and stays off the list | one call per comparison, any number of boxes | turn 34f; the allowlist shrinks file by file (INC-946) |

NEW-END

EDIT docs/features/e2e-harness.md #1
OLD-BEGIN
- INC-384: no box is read while an animation runs; a helper that opens an overlay ends with `settled(page)` (e2e/helpers/ui.ts).

OLD-END
NEW-BEGIN
- INC-384: no box is read while an animation runs; a helper that opens an overlay ends with `settled(page)` (e2e/helpers/ui.ts).
- INC-940: boxes a test compares are read together, once the layout has stopped moving — `layoutBoxes({ name: locator, … })` (e2e/helpers/ui.ts) reads every box in one frame after `settled(page)` and returns them only when a read two frames later agrees; never `.boundingBox()` one by one (the census scripts/conformance/layout-reads.test.ts; its allowlist shrinks file by file under INC-946).

NEW-END

EDIT docs/features/ad-page.md #1
OLD-BEGIN

Turn 34: GML-1…GML-4, LD-24.
OLD-END
NEW-BEGIN

Foundations turn 34f (INC-940): ALS-1 (e2e/ad-page-layout.spec.ts), LDM-1, MFR-1, MFR-2; AP-36, AP-37, AP-41, AP-42, AP-44, AP-45, AP-46, AP-47, AP-48 and AP-50 changed (their boxes read through layoutBoxes).
Turn 34: GML-1…GML-4, LD-24.
NEW-END
EDIT docs/features/ad-page.md #2
OLD-BEGIN
Foundations turn 7 (INC-862 T3): the feed/seller/options boundary, cursor, cache and explicit answer changes are recorded in [routes.md](routes.md).
OLD-END
NEW-BEGIN
Foundations turn 7 (INC-862 T3): the feed/seller/options boundary, cursor, cache and explicit answer changes are recorded in [routes.md](routes.md).

Foundations turn 34f (INC-940): the still map holds its box from the first paint. Its place while its code downloads and when it cannot download is MapFrame (src/features/posting/map/map-frame.tsx) — the still map's box with its word and its caption, drawn from the same module the map draws from (still-map.ts) — and the provider's credit lies on the box at its foot, so the Details | Description | Location row keeps its height when the map, its library and its credit arrive (AP-36 retried four times while the Location box grew between two reads). The census scripts/conformance/holds-its-box.test.ts keeps every late part on a reserver or on its allowlist.
NEW-END

EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-945.
OLD-END
NEW-BEGIN
## INC-945 — the home and category feeds hold no box while their first page streams (2026-10-27; Foundations turn 34f's census, HB-1)

Defect: src/routes/index.tsx :34 and src/routes/c.$slug.tsx :39 wrap the feed in `<Suspense>` whose place is a centred spinner (`py-12`), not the cards' shape, so when the first page arrives the page below the spinner moves (a layout shift on the two busiest pages, at first paint when the stream is slow). Found by the census of every part that arrives after the first paint (scripts/conformance/holds-its-box.test.ts), which lists both on its allowlist until this incident. Fix: the feed's place is the cards' own shape (a skeleton of the first row drawn from the card's sizes), with the QueryState mechanism (the roadmap's Foundations list), and both allowlist lines removed. Class: concern "a part that arrives after the first paint holds its box" — mechanism the reserver of register row 60 (MapFrame today; a feed reserver to come). Status (2026-10-27): OPEN.

## INC-946 — 68 tests and helpers in 18 files read boxes one by one (2026-10-27; Foundations turn 34f's census, BX-1)

Defect: every `.boundingBox()` call under e2e/ outside e2e/ad-page.spec.ts — 142 reads in 68 tests and file helpers (40 of them in e2e/shell.spec.ts) — reads a box by itself, so two boxes a test compares can come from either side of a change (AP-36's four retried passes, INC-940). Found by the census scripts/conformance/layout-reads.test.ts, whose allowlist names each until this incident. Fix: each file's reads move onto `layoutBoxes` (e2e/helpers/ui.ts), one file per turn or folded into the turn that next edits the file, its lines leaving the allowlist; the spec edits by hand, assertions unchanged (G38). Class: concern "a test reads a layout whole, once it has stopped moving" — mechanism `layoutBoxes`, register row 61. Status (2026-10-27): OPEN.

INC-940 (AP-36): FIXED in Foundations turn 34f — the cause, read in the four bodies (all `e2e/ad-page.spec.ts:960`, a box of the Details | Description | Location row of a different height from Details, desktop-1280, the first pass at 1280): the row was read box by box while the Location box grew, the still map's code arriving after the page painted (its place a one-line word) and its credit's line empty until Leaflet set it (one line for OpenStreetMap, two for Esri on a third of the article). The still map's places now hold its box (MapFrame over still-map.ts; the credit on the box at its foot — register row 60, HB-1) and the ad page's ten layout tests read their boxes through `layoutBoxes` (register row 61, BX-1); ALS-1 holds the map's three downloads and proves the Location box keeps its height. Its judge (frozen before the run): the operator's Flake check on dev's head with specs `e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts`, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8 shows no failure, and no AP-36 line reaches the flake ledger in the next 20 CI runs on dev; otherwise it stays open and its new body is read first.

Numbering: next free INC-947.
NEW-END

EDIT roadmap.md #1
OLD-BEGIN
  - [ ] INC-944 — lane 7's backend start deadlocked applying 20261007033719 (`DROP POLICY … ON public.locations`) against a second database session: on its next occurrence the start's evidence names that session (the sessions read before the CLI stops its containers, or the start re-run once with `--debug`), then the cause fixed at its root — never retried away (G38).
  - [ ] INC-837 — the caller-gates allowlist's `until INC-837` lines retired with the Foundations doors part (the expiry G55 requires).
OLD-END
NEW-BEGIN
  - [ ] INC-944 — lane 7's backend start deadlocked applying 20261007033719 (`DROP POLICY … ON public.locations`) against a second database session: on its next occurrence the start's evidence names that session (the sessions read before the CLI stops its containers, or the start re-run once with `--debug`), then the cause fixed at its root — never retried away (G38).
  - [ ] INC-945 — the home and category feeds' place while their first page streams is the cards' shape, not a spinner (src/routes/index.tsx :34, src/routes/c.$slug.tsx :39): with the QueryState mechanism; both lines leave scripts/conformance/holds-its-box-allowlist.txt
  - [ ] INC-946 — the 68 tests and helpers in 18 files that read boxes one by one move onto layoutBoxes (e2e/helpers/ui.ts), file by file or with the turn that next edits the file; each leaves scripts/conformance/layout-reads-allowlist.txt (40 of them in e2e/shell.spec.ts)
  - [ ] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f)
  - [ ] INC-837 — the caller-gates allowlist's `until INC-837` lines retired with the Foundations doors part (the expiry G55 requires).
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [x] Turn 34e (docs/governance/briefs/foundations-turn-34e.md; no migration; Lovable; DEC-275) — INC-935: every CI job and every outside call carries a deadline — scripts/ci/with-deadline.sh (a deadline per try, one loud retry) on every install, `timeout-minutes` on every job and every step that reaches outside, the lanes reserve the temporary backend's ports (54320–54329) from the kernel's ephemeral range before any connection (the four "address already in use" lanes of 10-24 → 10-26); CF-CID-1/2, WDL-1…4; register row 59; DEC-240's lint step gates again (INC-846 fixed). Final HEAD a308c6b3; FAILURE — lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943), lane 7 to a start deadlock (INC-944); every test that ran passed.
  - [ ] Records turn R5 (docs/governance/briefs/foundations-records-r5.md; no migration; Lovable; G41, G53) — the fix first: INC-943 (DEC-276) — the browser's system libraries (`bunx playwright install-deps chromium`) once with 1500 s and its download (`bunx playwright install chromium`) 900 s a try with one retry, in all five installs; the certificate tools' package install once; CF-CID-1's fifth rule (a package install runs once) and CF-CID-2's planted breach; then the handover: instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md, delivered for installation) with its amendment record and moved text; S455 and S456; docs/governance/handoffs/2026-10-27-foundations-handover.md and the running record 2026-10-23 → 2026-10-27; INC-941 → INC-944 and the later word on INC-940 and INC-935 ("Numbering: next free INC-945."); system-state.md's position; block S78; the owed roadmap lines below INC-939's.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [x] Turn 34e (docs/governance/briefs/foundations-turn-34e.md; no migration; Lovable; DEC-275) — INC-935: every CI job and every outside call carries a deadline — scripts/ci/with-deadline.sh (a deadline per try, one loud retry) on every install, `timeout-minutes` on every job and every step that reaches outside, the lanes reserve the temporary backend's ports (54320–54329) from the kernel's ephemeral range before any connection (the four "address already in use" lanes of 10-24 → 10-26); CF-CID-1/2, WDL-1…4; register row 59; DEC-240's lint step gates again (INC-846 fixed). Final HEAD a308c6b3; FAILURE — lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943), lane 7 to a start deadlock (INC-944); every test that ran passed.
  - [x] Records turn R5 (docs/governance/briefs/foundations-records-r5.md; no migration; Lovable; G41, G53) — the fix first: INC-943 (DEC-276) — the browser's system libraries (`bunx playwright install-deps chromium`) once with 1500 s and its download (`bunx playwright install chromium`) 900 s a try with one retry, in all five installs; the certificate tools' package install once; CF-CID-1's fifth rule (a package install runs once) and CF-CID-2's planted breach; then the handover: instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md, delivered for installation) with its amendment record and moved text; S455 and S456; docs/governance/handoffs/2026-10-27-foundations-handover.md and the running record 2026-10-23 → 2026-10-27; INC-941 → INC-944 and the later word on INC-940 and INC-935 ("Numbering: next free INC-945."); system-state.md's position; block S78; the owed roadmap lines below INC-939's. Final HEAD 0586d7f2; CI run 40532962246: SUCCESS (main promoted; DEC-276's judge: run 1 of 20, no install step failed by its deadline).
  - [ ] Turn 34f (docs/governance/briefs/foundations-turn-34f.md; no migration; the Claude Code executor; G0) — INC-940 (AP-36's four retried passes): a part of the page that arrives after the first paint holds its box — MapFrame (src/features/posting/map/map-frame.tsx) over still-map.ts, the still map's places on the ad page and in the wizard, the provider's credit on the box at its foot; the census scripts/conformance/holds-its-box.test.ts (HB-1…HB-3, register row 60); a test reads a layout whole — layoutBoxes (e2e/helpers/ui.ts), the ad page's ten layout tests moved onto it, the census scripts/conformance/layout-reads.test.ts (BX-1, BX-2, register row 61); MFR-1, MFR-2, LDM-1, ALS-1 (e2e/ad-page-layout.spec.ts). Its judge: the operator's Flake check (specs e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8) with no failure, and no AP-36 flake line in the next 20 CI runs.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END

EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations records turn R5 (2026-10-27; G41, G53; INC-943, DEC-276) — first, the fix of turn 34e's first run: the browser's system libraries install once with 1500 s and its download 900 s a try with one retry, in all five browser installs, and the certificate tools' package install once — a package install cut off part-way cannot be repeated (CF-CID-1's fifth rule; the deadlines measured from 371 lane runs). Then the handover: the supervisor's instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md — v1.14 with 57 recorded moves and the rules G56–G59; its amendment record and the moved text in docs/governance/instructions-amendments.md), slips S455 and S456, the handoff (docs/governance/handoffs/2026-10-27-foundations-handover.md) and the running record of 2026-10-23 → 2026-10-27 beside it, INC-941 → INC-944 in the incident ledger ("Numbering: next free INC-945."), block S78, system-state.md's position and the owed roadmap lines. Nothing in the product changes.
OLD-END
NEW-BEGIN
- Foundations records turn R5 (2026-10-27; G41, G53; INC-943, DEC-276) — first, the fix of turn 34e's first run: the browser's system libraries install once with 1500 s and its download 900 s a try with one retry, in all five browser installs, and the certificate tools' package install once — a package install cut off part-way cannot be repeated (CF-CID-1's fifth rule; the deadlines measured from 371 lane runs). Then the handover: the supervisor's instructions v1.15 (docs/governance/claude-supervisor-instructions-v1.15.md — v1.14 with 57 recorded moves and the rules G56–G59; its amendment record and the moved text in docs/governance/instructions-amendments.md), slips S455 and S456, the handoff (docs/governance/handoffs/2026-10-27-foundations-handover.md) and the running record of 2026-10-23 → 2026-10-27 beside it, INC-941 → INC-944 in the incident ledger ("Numbering: next free INC-945."), block S78, system-state.md's position and the owed roadmap lines. Nothing in the product changes.

- Foundations turn 34f (2026-10-27; INC-940; register rows 60 and 61) — a part of the page that arrives after the first paint holds its box: the still map's place while its code downloads and when it cannot download is MapFrame (src/features/posting/map/map-frame.tsx), the still map's box and caption drawn from the module the map draws from (still-map.ts), and the provider's credit lies on the box at its foot; the ad page and the wizard's pin preview use it; the census scripts/conformance/holds-its-box.test.ts keeps every late part on a reserver or its allowlist (the feeds' spinners: INC-945). A test reads a layout whole: layoutBoxes (e2e/helpers/ui.ts) reads every compared box in one frame once it has stopped moving; the ad page's ten layout tests use it; the census scripts/conformance/layout-reads.test.ts lists the rest until they move (INC-946). New tests: MFR-1, MFR-2, LDM-1, ALS-1, HB-1…HB-3, BX-1, BX-2.
NEW-END
```
