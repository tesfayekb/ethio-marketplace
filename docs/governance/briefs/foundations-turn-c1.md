# Foundations — turn C1: the route guard reads a reloaded document as gone (INC-961, the red first); a pin is whole or absent, its precision known (INC-958); a notice is shown where the person is looking (INC-955); a piece that cannot download says so once, in its place (INC-956); DEC-281; INC-962: brief (saved unchanged, 2026-10-28)

```text
FOUNDATIONS — TURN C1 (2026-10-28; G0; INC-961, INC-955, INC-956, INC-957's instance — DEC-281, INC-958, INC-962; register rows 52, 57 and 64, new; anchors located at e1045fb435f97e39f5e983e04b674eb07380b5d5). The cleanup turn's product half, the operator's direction of 2026-10-27 21:26 local: root causes, one mechanism per concern, each with its guard. FIRST, THE RED ON BASE (§8 RED-BOARD READING — the fix travels first): run 40615073357 on BASE failed in lane 13 only — ODE-1 failed on both tries with "apiResponse.text: Response has been disposed". Turn 34c-4 made the route guard (e2e/helpers/route-guard.ts) end a request quietly only when its Page object has closed; ODE-1's own Refresh and the app's one reload for a failed chunk dispose the old document's responses while the Page stays open, so the guard threw (INC-961; its retried pass of run 40610714870 was the same cause). "Gone" is the document: the page closed OR its main frame navigated since the handler began, waiting up to 2 s for the navigation that explains the error; a disposed response on an unmoved, open page still throws. Then three concerns and two small items. (1) A pin is whole or absent and its precision is known (INC-958): the three pin columns travelled as loose fields, five readers filled a missing precision with "exact" (the LESS private side — the ad page's still map, large map and Maps link at listing-detail.tsx :1169, :1179, :1218, :415; the draft's and the edit's prefill at use-draft.ts :673 and use-edit-draft.ts :234), and the maps drew any precision but "approx" as an exact point (map-preview.tsx :64, map-large.tsx :36). One `Pin` value (src/features/posting/map/pin.ts: `PinPrecision`, `readPin`, `NEW_PIN_PRECISION`) now carries it; four readers read it (the draft, the last post, the seller's place, the ad page's document); the maps take a known precision. (2) A notice is shown where the person is looking (INC-955): an open dialog keeps the keyboard inside it, blocks the pointer outside it and paints over the page, so the shell's "didn't load" notice was unseen and unreachable until it closed (the operator's walk of 2026-10-27, line 8). Every modal overlay's content now draws a `NoticeOutlet` (src/components/ui/notice-outlet.tsx over the register src/lib/notice-outlets.ts) and the notice is drawn inside the topmost open one. (3) A piece that cannot download says so once, in its place, never with its loading word (INC-956): the ad page's and the wizard's maps said "Map pin" where they had failed. They now say the failure and Refresh in their box (`inPlace`, LoadFailedHere in MapFrame), inside the large map's dialog too; every resilientLazy fallback must match its way of saying so. (4) DEC-281 — the Amharic Home heading `feed.headingIn` becomes the operator's shorter wording (it fits one line at phone width in the iPhone's font). (5) INC-962 — the nightly's hour check refuses a machine without time-zone files instead of reading New York as UTC (turn K3's reviewer). LEFT, each on its own roadmap line: INC-963 (the pin door's own `coalesce(p_precision, 'exact')` — a migration turn), INC-957's class (the single-line slots in every platform's font), the sign-out landing constant, the test-harness items and the records-owed lines (turns C2 and C3). Tier A (the pin's precision is a privacy field). No migration. No new string (one Amharic value changes). No package change. AGENTS.md unchanged. No file deleted. Base: dev e1045fb435f97e39f5e983e04b674eb07380b5d5 (Foundations turn K3; CI FAILURE on e1045fb4 (run 40615073357, completed 2026-10-28T01:44:35Z): every job green but lane 13 — ODE-1 failed on both tries, "apiResponse.text: Response has been disposed" (INC-961; this turn's Part B); main not promoted). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0; B — the route guard (the red's fix), red first; C — the guards, red first; D — AP-55 red on BASE's app; E — the mechanisms, green; F — the records; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: e1045fb435f97e39f5e983e04b674eb07380b5d5
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/features/posting.md
docs/generated/i18n-usage.json
docs/tracking/incidental-findings.md
e2e/ad-page.spec.ts
e2e/helpers/route-guard.ts
public/i18n-usage.json
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/conformance/notice-outlet.test.ts
scripts/conformance/pin.test.ts
scripts/conformance/resilient-fallbacks.test.ts
src/components/shell/on-demand-notice.test.tsx
src/components/shell/on-demand-notice.tsx
src/components/shell/toolbar-panel.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/dialog.tsx
src/components/ui/drawer.tsx
src/components/ui/notice-outlet.tsx
src/components/ui/sheet.tsx
src/features/ad-page/public-listing.test.ts
src/features/ad-page/public-listing.ts
src/features/my-listings/my-listing-page.tsx
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/pin.test.ts
src/features/posting/map/pin.ts
src/features/posting/posting-service.ts
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-review.tsx
src/features/posting/step-where.tsx
src/features/posting/use-draft.ts
src/features/posting/use-edit-draft.test.ts
src/features/posting/use-edit-draft.ts
src/i18n/locales/am-base.ts
src/lib/notice-outlets.ts
src/routes/l.$slug.tsx
src/test/e2e-route-guard.test.ts
SCOPE-END

THE SYSTEM (G0) — four concerns.
0 — CONCERN: a test's interception ends with its page's document (register row 57; INC-934, INC-961).
MECHANISM: e2e/helpers/route-guard.ts `whilePageLives(handler)` — now with `routeDocumentGone(page, since, waitMs)`: a count of the page's main-frame navigations (one `framenavigated` listener per page, attached on first use) taken when the handler begins; one of Playwright's two "gone" errors ends the request only when the page has closed or that count has moved — now or within GONE_WAIT_MS (2 s).
CONSUMERS (grep of e1045fb435f97e39f5e983e04b674eb07380b5d5: `grep -rn "whilePageLives" e2e --include=*.ts`): e2e/helpers/on-demand.ts :26 (refuseScripts — ODE-1, the supabase door's on-demand tests) and e2e/ad-page-layout.spec.ts :40 (ALS-1) — use; the allowlisted handlers of CF-RG-1 — unchanged.
COVERED HERE: both. LEFT: none.
CONFORMANCE GUARD: RG-4 (src/test/e2e-route-guard.test.ts — a page that reloaded while the handler ran, and one whose navigation comes a moment after the error, end quietly) — red on BASE's guard; RG-5 (a child frame's navigation is not the page's; a reload never excuses the test's own failure); RG-1…3 unchanged; CF-RG-1/2 unchanged; ODE-1 itself (CI).
EXCEPTIONS: none.
FIVE LENSES — security: tests only · performance: a "gone" error on an unmoved, open page waits up to 2 s before it throws (a failing test, once) · failure modes: the subject — a reloaded document's disposed responses end quietly; the test's own failures still throw · consistency: one guard · future growth: none.
1 — CONCERN: a pin is whole or absent, and its precision is known before it is drawn or linked (register row 64, new).
MECHANISM: NONE YET — built in Part E as src/features/posting/map/pin.ts: `PIN_PRECISIONS` = ['exact', 'approx'] (the table's check, 20260919054044 :59–:61), `PinPrecision`, `Pin` {lat, lng, precision}, `readPin(lat, lng, precision, where)` (the pin when all three are present and valid; `null` when all three are absent; otherwise `null` and one `[client-error] <where>: …` line, because the table's check should have made it impossible — never a guessed precision), `NEW_PIN_PRECISION` (a NEW pin's starting choice in the pin map, unchanged; never a saved pin's default).
CONSUMERS (grep of e1045fb435f97e39f5e983e04b674eb07380b5d5: `grep -rn "pinLat\|pinLng\|pinPrecision\|pin_lat\|pin_lng\|pin_precision\|precision" src --include=*.ts --include=*.tsx`, tests and the generated types read too): the readers — posting-service.ts :259–:261 + :441–:443 (the draft), :576–:590 (the last post), :675–:686 (the seller's place), public-listing.ts :146–:148 (the ad page's document) — bypass (loose fields, `string` precision); the guessers — listing-detail.tsx :1169, :1179, :1218 (`?? "exact"`), :415 (anything but "approx" is the exact point for the Maps link), use-draft.ts :673, use-edit-draft.ts :234 (`?? "exact"`) — bypass; the drawers — map-preview.tsx :55/:64, map-large.tsx :28/:36, map-frame.tsx :17 (`string | null`; null drawn exact) — bypass; the carriers — step-review.tsx :173/:721–:723, my-listing-page.tsx :678–:680, step-where.tsx :72, :1845, :1853, map-pin-dropper.tsx :66, :96, :116, savePin / savePlaceText (posting-service.ts :1183, :1244) — `string` precision; the tests — listing-detail.test.tsx :659, :907, listing-detail-map.test.tsx :93, public-listing.test.ts :158, use-edit-draft.test.ts :59; e2e/ad-page.spec.ts :1249–:1267, e2e/helpers/posting.ts :1832–:1834, e2e/legal-certify.spec.ts :1122–:1123 read the stored columns as database truth (G28) — kept.
COVERED HERE: every reader, guesser, drawer, carrier and unit test above. LEFT: the door's own `coalesce(p_precision, 'exact')` (set_listing_pin, 20260919054044 :738 and its redeclarations) — INC-963, a Tier A migration turn; no app caller omits the precision once `savePin` takes a `PinPrecision`.
CONFORMANCE GUARD: CF-PIN-1 (scripts/conformance/pin.test.ts — src/, e2e/ and scripts/: no loose `pinLat` / `pinLng` / `pinPrecision`; no `??` on a name holding a precision, but `NEW_PIN_PRECISION` in the pin map and pin.ts; in src/, no read of the three columns outside `readPin` or a null check) — red on BASE (79 findings — 63 loose fields, 6 guessed precisions, 10 column reads outside readPin; the first names src/features/ad-page/public-listing.test.ts:158 and its loose field pinLat); CF-PIN-2 (planted: four breaches named, two kept reads not); PIN-1…5 (src/features/posting/map/pin.test.ts). No allowlist.
EXCEPTIONS: none (the tests' database-truth reads are outside the rule's src/ by definition, not an allowance).
FIVE LENSES — security: privacy by construction — a pin whose precision is unknown is not drawn and not linked, so an approximate pin can never be shown exact by a missing value; the true coordinates still travel only to the owner and to signed-in buyers (DEC-106, unchanged) · performance: none (a few comparisons per read; pin.ts has no imports) · failure modes: an impossible row is logged once and shown as no pin, never guessed · consistency: one type from the database read to the map's circle · future growth: a new precision is one entry of PIN_PRECISIONS and the table's check, together.
2 — CONCERN: a notice is shown where the person is looking (register row 52; INC-955).
MECHANISM: NONE YET for the overlays — built in Part E: src/lib/notice-outlets.ts (the register: `registerNoticeOutlet(element)` — a ref with React 19's cleanup — and `useTopNoticeOutlet()`, the outlet last in document order: the overlay opened most recently) and src/components/ui/notice-outlet.tsx (`NoticeOutlet`: a polite live region with no role, absolute over the content's foot — no room taken, no grid gap, the pointer passed through but for the notice); src/components/shell/on-demand-notice.tsx draws its notice into the topmost outlet through a portal, or in its own place when no overlay is open.
CONSUMERS (grep of e1045fb435f97e39f5e983e04b674eb07380b5d5 for the content part of a modal primitive: `grep -rn "Primitive.Content\b" src --include=*.tsx`, `<X.Content` of a namespace from dialog-primitive or alert-dialog-primitive or vaul's Drawer): ui/dialog.tsx :49, ui/alert-dialog.tsx :34, ui/sheet.tsx :66, ui/drawer.tsx :38, shell/toolbar-panel.tsx :68 (the phone's panel) — bypass (no outlet); shell/app-rail.tsx :959 — its Root is `modal={false}` (the page beside the phone's menu stays reachable): not modal, not a consumer. Menus, popovers, tooltips and selects close on the first tap outside: not modal surfaces.
COVERED HERE: all five. LEFT: none.
CONFORMANCE GUARD: CF-NO-1 (scripts/conformance/notice-outlet.test.ts — every modal content in src/ draws `<NoticeOutlet />`; a content under a `modal={false}` Root is not read) — red on BASE with 5 findings; CF-NO-2 (planted: two bare contents named, the outlet's and the non-modal one not); ODN-3 (src/components/shell/on-demand-notice.test.tsx: with two overlays open the notice is in the second's outlet, then the first's, then the shell's — red on BASE). No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: none (layout and a portal; no data) · performance: one tiny module in the shell's chunk; the register is a Set and one document-order comparison per change · failure modes: an overlay that unmounts takes its outlet with it (ref cleanup) and the notice returns to the shell's place; the close state is the notice's own, kept across moves · consistency: one notice, one place rule, every modal · future growth: a new modal primitive is named by CF-NO-1 until its content draws the outlet; another shell notice uses the same register.
3 — CONCERN: a piece that cannot download says so once, in its place, never with its loading word (register row 52; INC-956).
MECHANISM: src/lib/resilient-lazy.ts `resilientLazy(fetch, label, fallback, { inPlace })` and LoadFailedHere (src/components/shell/on-demand-notice.tsx) — unchanged; the rule they imply is now held: an `inPlace` fallback draws LoadFailedHere; any other fallback only holds the place (no words of its own) while the shell's notice speaks.
CONSUMERS (grep of e1045fb435f97e39f5e983e04b674eb07380b5d5: `grep -rn "resilientLazy(" src`): shell/breadcrumbs.tsx :49, :54, :59, :64, :69 (PendingCrumb, "—") and :74 (AdTitleCrumb, the ad's own title) — use; step-where.tsx :61 (PinMapUnavailable, in place) — uses; listing-detail.tsx :50 and :55 (MapUnavailable — the loading word "Map pin" with the shell's notice) and step-where.tsx :56 (NoMap — the same) — bypass.
COVERED HERE: the three bypasses — MapPreviewUnavailable, MapLargeUnavailable and NoMap draw LoadFailedHere in MapFrame, `inPlace`; the ad page's Maps link, the same download as the still map, then logs its failure instead of raising a second message. LEFT: none.
CONFORMANCE GUARD: CF-RLF-1 (scripts/conformance/resilient-fallbacks.test.ts — every resilientLazy call in src/ whose fallback is a function of its file) — red on BASE with 3 findings; CF-RLF-2 (planted: three mismatches named, two kept); LDF-1 (src/features/posting/preview/listing-detail-map-failed.test.tsx: the still map's box shows the failure and Refresh, never "Map pin", and the shell's notice is not raised); AP-55 (e2e/ad-page.spec.ts: offline, Enlarge — the large map's place says so and its Refresh is reachable inside the dialog; red on BASE's app in Part C). No allowlist.
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: none (the same fallbacks, other children) · failure modes: the subject — a failed map says the cure where the person is looking, once · consistency: one rule for every on-demand fallback · future growth: a new resilientLazy fallback is judged by CF-RLF-1.
FORWARD-SCAN: INC-959 (the e2e reads of the browser's client) and turn C2's harness work use the same guard; Stage 3's Report button and D131/D210's dialogs are modal contents of ui/dialog.tsx — they take the outlet by construction; INC-963 completes concern 1 at the door. REGISTER: rows 52 and 57 updated, row 64 added (Part F).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-c1.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `docs/governance/briefs/foundations-turn-k3.md (Foundations turn K3: the nightly at 11:30 New York all year — DEC-277; THE CHECKS once per code tree — DEC-278; every CI action with its own deadline — INC-941, DEC-282; a failed backend start names the database's sessions — INC-944; records R7)` becomes `docs/governance/briefs/foundations-turn-c1.md (Foundations turn C1: a pin is whole or absent, its precision known — INC-958; a notice is shown where the person is looking — INC-955; a piece that cannot download says so once, in its place — INC-956; DEC-281; INC-962)` (everything after it stays, as it is). The roadmap's other lines change in Part E, by the applier — none of its blocks touches line 3. Commit `turn C1: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B, C, D, E; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md <paths>` with the paths each part names — never retyped, never edited or reflowed by hand. Every file a block writes is already in Prettier's form. A refusal from the applier is a STOP that pastes its line. If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-turn-c1.md, roadmap.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-c1.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Part B (`turn C1 part B: the route guard reads a reloaded document as gone (INC-961)`); Parts C to E together (`turn C1 parts C-E: a pin is whole or absent; a notice where the person is looking; a failed piece says so in its place; DEC-281; INC-962`); Part F (`turn C1 part F: the records`); the report. Red first is shown, never committed.
- THE CHECKS run once (DEC-278): after Part F's commit, `bun .claude/hooks/land.ts --checks` (Bash timeout 1800000 ms); the landing then finds them green for the same tree.
- touching e2e/**: the authoring laws (docs/features/e2e-harness.md §Authoring laws, J1–J9) bind; e2e/ad-page.spec.ts changes by the applier only.
- Local runs: the touched unit tests as you go; browser tests at Part B (ODE-1), Part D (AP-55 red) and THE END-TO-END CHECK. CI runs every test on every commit.
- Amharic (G43): one value changes — am-base.ts `feed.headingIn`, written by the applier. After Part E paste the value's code points: `grep -o '"feed.headingIn": "[^"]*"' src/i18n/locales/am-base.ts | python3 -c 'import sys; print(" ".join("U+%04X" % ord(c) for c in sys.stdin.read() if ord(c) > 127))'` — expected `U+12E8 U+121B U+1235 U+1273 U+12C8 U+1242 U+12EB U+12CE U+127D`.
- Behaviour contract: (a) a pin is drawn and linked only with its known precision — an approximate pin stays approximate in every map and link, as at BASE for every real row; a row the table's check should forbid is no pin and one logged line; a new pin in the pin map starts at "exact" as at BASE; (b) while a dialog, alert, sheet, drawer or the phone's panel is open, the shell's "didn't load" notice appears over the foot of the topmost one, where it can be read, reached and tapped; otherwise where it was; (c) a map whose code cannot download says "This part of the page didn't load" with Refresh in its own box — on the ad page, inside the large map's dialog and in the wizard's preview — and raises no second notice; the loading word stays the loading word; (d) the Amharic Home heading is the shorter wording; (e) the nightly's hour check exits 2 on a machine that cannot resolve New York's zone. Nothing else changes.
- Knowledge K: K1 the censuses above are the supervisor's, at e1045fb435f97e39f5e983e04b674eb07380b5d5 — re-run `grep -rn "pinLat\|pinLng\|pinPrecision" src e2e scripts --include=*.ts --include=*.tsx | wc -l` (expected before Part E: 55), `grep -rni 'precision ?? "' src --include=*.ts --include=*.tsx | wc -l` (expected: 6) and `grep -rln -E "(Dialog|AlertDialog|Sheet|Drawer)Primitive\.Content\b" src --include=*.tsx | sort` (expected: src/components/shell/app-rail.tsx src/components/shell/toolbar-panel.tsx src/components/ui/alert-dialog.tsx src/components/ui/dialog.tsx src/components/ui/drawer.tsx src/components/ui/sheet.tsx), and paste the three. K2 the report lists every sibling your reading finds outside these lists — a reader of the pin columns, a modal content, a resilientLazy fallback — with file:line (expected: none beyond INC-963). K3: each guard lands with its mechanism. K4–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE or named in a part is a STOP. CI on BASE: FAILURE on e1045fb4 (run 40615073357, completed 2026-10-28T01:44:35Z): every job green but lane 13 — ODE-1 failed on both tries, "apiResponse.text: Response has been disposed" (INC-961; this turn's Part B); main not promoted. Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); a red on BASE is read first in e2e-last-failure.md and guards-last-failure.md, fixed first at its root (G21, G38) and named in the report.

PART B — THE ROUTE GUARD (the red's fix), RED FIRST.
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md src/test/e2e-route-guard.test.ts`; then `bunx vitest run src/test/e2e-route-guard.test.ts` — RED against BASE's guard, shown and not committed: paste the totals (the supervisor's run: `Tests  1 failed | 4 passed (5)` — RG-4: BASE's guard throws "Response has been disposed" on a page whose document reloaded).
B2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md e2e/helpers/route-guard.ts`; then `bunx vitest run src/test/e2e-route-guard.test.ts scripts/conformance/route-guard.test.ts` — all passed (the supervisor's run: 2 files, 7 tests); `bun run typecheck`, `bun run lint`; then `bun run e2e:local -- e2e/on-demand-failure.spec.ts` (whole, both projects, 0 retries) — paste the count line (expected: 2 passed); when the environment cannot run browsers, say so and go on. No repeat run (DEC-184: the repeat proof is the operator's Flake check after the landing). Commit Part B.

PART C — THE GUARDS, RED FIRST (shown, not committed).
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md scripts/conformance/pin.test.ts scripts/conformance/notice-outlet.test.ts scripts/conformance/resilient-fallbacks.test.ts scripts/ci/nightly-hour.test.ts src/components/shell/on-demand-notice.test.tsx src/features/posting/preview/listing-detail-map-failed.test.tsx`; then `bunx vitest run scripts/conformance/pin.test.ts scripts/conformance/notice-outlet.test.ts scripts/conformance/resilient-fallbacks.test.ts scripts/ci/nightly-hour.test.ts src/components/shell/on-demand-notice.test.tsx src/features/posting/preview/listing-detail-map-failed.test.tsx` — RED against BASE's code: paste the totals and each failing test's name and first line (the supervisor's run: `Test Files  6 failed (6)` and `Tests  5 failed | 8 passed (13)`: CF-PIN-1 (79 findings), CF-NO-1 (5: toolbar-panel.tsx:68, alert-dialog.tsx:34, dialog.tsx:49, drawer.tsx:38, sheet.tsx:66), CF-RLF-1 (3: listing-detail.tsx:50 and :55, step-where.tsx:56), NH-6 (BASE's script answers `go=false` with exit 0), LDF-1 (no `listing-map-failed` in the map's box), and on-demand-notice.test.tsx does not load (`@/components/ui/notice-outlet` does not exist on BASE)).

PART D — AP-55 RED ON BASE'S APP (shown, not committed).
D1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md e2e/ad-page.spec.ts`; then `bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-55 "` against BASE's app (Part E not yet applied) — RED on both projects: paste the count line and the first failure line (expected: `listing-map-large-failed` not found — the dialog shows "Map pin"). When the environment cannot run browsers, say so with the reason and go on; CI on the landing is the proof.

PART E — THE MECHANISMS, GREEN.
E1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md scripts/ci/nightly-hour.sh src/components/shell/on-demand-notice.tsx src/components/shell/toolbar-panel.tsx src/components/ui/alert-dialog.tsx src/components/ui/dialog.tsx src/components/ui/drawer.tsx src/components/ui/notice-outlet.tsx src/components/ui/sheet.tsx src/features/ad-page/public-listing.test.ts src/features/ad-page/public-listing.ts src/features/my-listings/my-listing-page.tsx src/features/posting/map/map-frame.tsx src/features/posting/map/map-large.tsx src/features/posting/map/map-pin-dropper.tsx src/features/posting/map/map-preview.tsx src/features/posting/map/pin.test.ts src/features/posting/map/pin.ts src/features/posting/posting-service.ts src/features/posting/preview/listing-detail-map.test.tsx src/features/posting/preview/listing-detail.test.tsx src/features/posting/preview/listing-detail.tsx src/features/posting/step-review.tsx src/features/posting/step-where.tsx src/features/posting/use-draft.ts src/features/posting/use-edit-draft.test.ts src/features/posting/use-edit-draft.ts src/i18n/locales/am-base.ts src/lib/notice-outlets.ts src/routes/l.$slug.tsx`; paste the applier's last line (expected: applied 81 block(s) to 29 file(s)).
E2. `bunx vitest run scripts/conformance src/features/posting src/features/ad-page src/features/my-listings src/components scripts/ci` — all passed (the supervisor's run: `Test Files  147 passed (147)`, `Tests  877 passed (877)`); `bun run typecheck`; `bun run lint`; `bun run i18n:usage` and `git diff --stat -- docs/generated/i18n-usage.json public/i18n-usage.json` (both maps move: `2 files changed, 18 insertions(+), 2 deletions(-)` in the supervisor's run; commit them with the part); the code points line (HOW TO WORK).
E3. `bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-55 "` — GREEN on both projects; paste the count line. Commit Parts C to E.

PART F — THE RECORDS.
F1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-c1.md --dry docs/tracking/incidental-findings.md docs/features/posting.md docs/governance/mechanisms.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/features/posting.md #1` · `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/governance/mechanisms.md #2` · `EDIT docs/governance/mechanisms.md #3` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT docs/_changelog.md #1` · `applied 8 block(s) to 5 file(s)`). `sed -n 3p roadmap.md | cut -c1-80` — names foundations-turn-c1.md; `grep -c '^| 64 |' docs/governance/mechanisms.md` — 1; `grep -n '^Numbering: next free INC-96' docs/tracking/incidental-findings.md` — INC-964; paste the three. Commit Part F.

THE CHECKS: `bun .claude/hooks/land.ts --checks` (DEC-278; paste its lines); then `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-c1.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- supabase package.json bun.lock AGENTS.md .claude .github` (empty); `node scripts/check-bundle-size.mjs` (paste its JS and CSS lines; the first paint grows by the notice register — the supervisor's non-lock-exact build read 208.5 KiB on BASE and 208.8 KiB after the turn against the 207 KiB ceiling (CI's lock-exact build read 205.3 KiB at turn 34c-4); a JS line over 207 KiB in your lock-exact run is a STOP with both lines). Expected unit totals: 340 files, 2046 passed (the supervisor's run, not lock-exact: 2041 passed and photo.test.ts's five, failing on BASE too in its install); lint 0 errors, 39 warnings.
The hash list (the files as they stand at the end of the turn; roadmap.md is checked by Part F's line):
427c8344335e2b4fcdf887e48502e0abeebc6384a7a97c112256a37c7c29dedf  docs/_changelog.md
da7874459008fdfce4e49c75f3bdb46c4974abad82e42312ebbcaa9e3b356a5f  docs/features/posting.md
f84ac0ca94f444e1c68052832ad91a2f6475787047287fb6a3b17710def0c44f  docs/governance/mechanisms.md
3e563fba64549fce508a1753f5c076d8007a0d300852c772d9fb8c1c8d6c577c  docs/tracking/incidental-findings.md
bfbe3d6b9823d992d1cebd5bc0ed12b86578d8928f1e4cd9a861d5da9ccad4cf  e2e/ad-page.spec.ts
c0ba783a7d734e77a5da2069a0fc88c83e92162f3b3314e8d947698841d062fe  e2e/helpers/route-guard.ts
9e12f902fdc2c55b04ceaa611a936a205c377672f9c2e1ff16de10100d250b40  scripts/ci/nightly-hour.sh
2b1d9ca6d2e4935c2969ca2e128fd5d5b8d10a5d7183c87330ec79a90f6bc982  scripts/ci/nightly-hour.test.ts
132d7a9f452168b6aa0db0c1e28cfd41ebb19111b0f5fd1c89bde93b267403d9  scripts/conformance/notice-outlet.test.ts
73e17448810331a960d91e95a6d7c9192e6075c27326ca03f8a6ad55d9a9d617  scripts/conformance/pin.test.ts
45f374cfafa48f4ab75e9b7970dda2cc185c4a6c42fac77ba397b94fd9ac8327  scripts/conformance/resilient-fallbacks.test.ts
22084c3fc8e700475ca9b1847dbf926f7f195a32870d0dda2e0770336d06c8b7  src/components/shell/on-demand-notice.test.tsx
5d85de9baf1939938a31a38072e6c2145392991dbd4677538972718129632638  src/components/shell/on-demand-notice.tsx
8baf7eae066028fdf8dd8374e54400f53ebf22b6bef8f71bbb2faf35fd9a0f66  src/components/shell/toolbar-panel.tsx
0b6ae8e5d3ca516ab13b73dd7c19e61e5eb9a551706de21de42e481d976435c3  src/components/ui/alert-dialog.tsx
7c34a264723cf9519fbd2264432e92389a0d80f93561769a94af98867ce28bf8  src/components/ui/dialog.tsx
5515e06692fa0db2fe8ff5c84935ef27306df03bb3ed230afe3576d078daa793  src/components/ui/drawer.tsx
a7976bdb00cfba1e1e8a3a3919e20e30c6d400cba22f084a99a3b1ce90ce8a39  src/components/ui/notice-outlet.tsx
95b2a22fd2b91a53e1f6d345283791242642168c0bacc45fd3fd1212a7c609a9  src/components/ui/sheet.tsx
24c172167f2df349067de0f90a60c8897b1918c40b663aac149fcd48a0b19370  src/features/ad-page/public-listing.test.ts
79f4e1513d4fc99ee32ceb79c448961b479e1bc33eb71951c3af978fbe4c1538  src/features/ad-page/public-listing.ts
18f57903bcca10511a4f966a754d966ee796426b332a8edb8dfc729ab4cc3b27  src/features/my-listings/my-listing-page.tsx
17fed47de799813a6e7a3ee1c60baffd33f1719cd284ad79fc61056a87a172f9  src/features/posting/map/map-frame.tsx
cf9fa5abffc794d7ec8613bfa14d349bcecd0c2d86407c354d17db835c1b505d  src/features/posting/map/map-large.tsx
29946ef6abac7bc05415053862f4d41f55a7a8cbe5a591b2c15d16c6a288af90  src/features/posting/map/map-pin-dropper.tsx
fc6cb4f78014225ea7469c03ca9062394da5e3c178dbee14b08fdee3bff6508a  src/features/posting/map/map-preview.tsx
8ce1691182165e7d847218eff02666c17d58fe9574f8872b584ff3fd34729370  src/features/posting/map/pin.test.ts
cf2153d5e29a04cae0d3f43c0b18a14be2a6010f6f7d9ba3706ba57a21d6adf0  src/features/posting/map/pin.ts
af9724307e799ce609eedaf37efaafb9c001bf008423b98134a0aa3d6bc8d3aa  src/features/posting/posting-service.ts
05093630c092d0870d1c420e64056f2d46f23a57afb3e75b269f017d5fd04939  src/features/posting/preview/listing-detail-map-failed.test.tsx
51800b9f4926f98ec3f240be7e1493438583342c870ee57988f255bb0dae35b7  src/features/posting/preview/listing-detail-map.test.tsx
356b95d644cffc88d7054ebc8a883bc721cfbc9fc16f40b0478de2f412fcd7a8  src/features/posting/preview/listing-detail.test.tsx
9e0c56f122513fc1b80c7bc716d7d7bbd79660fb81455b85ab3db301c95e524e  src/features/posting/preview/listing-detail.tsx
cf69ed55dc4b9b6b138065fed1807f410c5519de7962fcead790372ea95d8e9d  src/features/posting/step-review.tsx
c8cdcd88be5e237b810089f1b1b04d5eb23d4c155c5382e0fe9987eaee806d20  src/features/posting/step-where.tsx
0ba54e7db774399ece54cf757c2938af1b8219915e99cde7cd796b3ccb8bad43  src/features/posting/use-draft.ts
8aac709723c9e23b7a1b80aa9abfe6ef7dd476f48d451c8e21db10e26a4cc681  src/features/posting/use-edit-draft.test.ts
f1f4bffbd1ac8c8aa32aa22a6c8e5e206615c876f3d4d74d50139500ba11f97d  src/features/posting/use-edit-draft.ts
e72aab6816b1197c9ae4d4ecad3bd2851a49030ac22b0dcae196dbb98ff8b9a0  src/i18n/locales/am-base.ts
380ffea2bd964b9b84e9210f5e4714fd483143b7d9104a0ee886a001491034eb  src/lib/notice-outlets.ts
92c603e0a01c1936b56efdac82beff3233d50afd249fb8ebc06c284da8c1acf2  src/routes/l.$slug.tsx
0b63d0b1c6dab3834a37d664b20a0da679e3a24ca4b78c69da0a1d3c77da5f68  src/test/e2e-route-guard.test.ts

THE END-TO-END CHECK: `bun run e2e:local -- e2e/ad-page.spec.ts` — the changed spec file, whole, both projects, 0 retries, fake mode; then the changed pieces' other doors: `bun run e2e:local -- e2e/on-demand-failure.spec.ts` whole, and by id `bun run e2e:local -- --grep "PW-13 |PW-39 |PW-96 |PW-100 |ALS-1 |FS-3 |FS-4 |FS-11 |FS-13 "` (the tests that draw a saved pin in the wizard and in My listings, or the Home heading). Paste every count line and the server log's `[ssr-error]` count by path. Any red is a STOP with its body. When the environment cannot run browsers, say so with the reason; CI on the landing is the full proof.

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its own final line — "READY · … · on <commit>" — and say so in the report); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR inside SCOPE is fixed only when this brief's exact text allows it, otherwise listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-c1.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: (1) done or not done by part and step; (2) the file list from `git diff --name-only <START>`; (3) the behaviour contract; (4) the K1 lines; (5) every red-first and green line (B1, B2, C1, D1, E2, E3), the unit totals and the browser count lines; (6) the K2 lines; (7) RG-4, CF-PIN-1, CF-NO-1, CF-RLF-1 and NH-6's lines; (8) strings: none new; the one Amharic value with its code points; (9) "none" for migrations; (10) every departure with its reason; (11) the first six lines of ci-status.md for the last commit you can read; (12) every limit. Commit it (`turn C1: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the red's fix first, as its own commit; "gone" is the page's document (closed, or its main frame navigated), with a 2-second wait for the navigation that explains the error; the pin's precision is a closed type and an unknown one means no pin (no map, no link), never a default; a new pin in the pin map still starts at "exact" (unchanged — the seller sees and changes the choice); the notice enters the topmost modal through one outlet per modal content rather than a higher layer number (a higher layer could be seen but not reached or tapped inside a modal); the outlet sits over the content's foot and takes no room; the phone's rail menu, not modal, keeps the shell's notice beside it; an in-place map failure raises no second notice, and the Maps link, the same download, only logs; the ad page's view is computed once per document and language (l.$slug.tsx) so the map's effects follow the pin, not every render.

THE BLOCKS (applied by the parts above; each part names its paths).

EDIT src/test/e2e-route-guard.test.ts #1
OLD-BEGIN
 * whose page has gone ends quietly; every other error is the test's own and throws. Turn 34c-4:
 * "gone" is read from the page itself — the same words on a page still open throw.
 */
OLD-END
NEW-BEGIN
 * whose page has gone ends quietly; every other error is the test's own and throws. Turn 34c-4:
 * "gone" is read from the page itself — the same words on a page still open throw. INC-961
 * (Foundations turn C1): "gone" is the document — a page that reloaded or navigated while the
 * handler ran ends quietly too (ODE-1's Refresh and the app's one reload).
 */
NEW-END
EDIT src/test/e2e-route-guard.test.ts #2
OLD-BEGIN

/** A route whose request's page is closed, or not. */
function routeOn(closed: boolean): Route {
  return {
    request: () => ({ frame: () => ({ page: () => ({ isClosed: () => closed }) }) }),
  } as unknown as Route;
}
OLD-END
NEW-BEGIN

/**
 * A route whose request's page is closed or open; `navigate()` fires the page's main-frame
 * navigation (a reload), and `navigateOnWait` makes the page navigate while the guard waits for it.
 */
function pageAndRoute(closed: boolean, navigateOnWait = false) {
  let listener: ((frame: unknown) => void) | null = null;
  const main = { name: "main" };
  const page = {
    isClosed: () => closed,
    mainFrame: () => main,
    on: (_event: string, handler: (frame: unknown) => void) => {
      listener = handler;
    },
    waitForEvent: async () => {
      if (!navigateOnWait) throw new Error("Timeout 2000ms exceeded while waiting for event");
      listener?.(main);
    },
  };
  const route = { request: () => ({ frame: () => ({ page: () => page }) }) } as unknown as Route;
  return { route, navigate: () => listener?.(main), navigateChild: () => listener?.({}) };
}
function routeOn(closed: boolean): Route {
  return pageAndRoute(closed).route;
}
NEW-END
EDIT src/test/e2e-route-guard.test.ts #3
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("RG-4 a page that reloaded while the handler ran (its document gone, the page still open) ends quietly (INC-961)", async () => {
    const reloaded = pageAndRoute(false);
    await expect(
      whilePageLives(async () => {
        reloaded.navigate();
        throw new Error("apiResponse.text: Response has been disposed");
      })(reloaded.route),
    ).resolves.toBeUndefined();
    const late = pageAndRoute(false, true);
    await expect(
      whilePageLives(async () => {
        throw new Error("route.fetch: Target page, context or browser has been closed");
      })(late.route),
      "the navigation that explains the error may come a moment after it",
    ).resolves.toBeUndefined();
  });

  it("RG-5 a child frame's navigation is not the page's, and a reload never excuses the test's own failure", async () => {
    const child = pageAndRoute(false);
    await expect(
      whilePageLives(async () => {
        child.navigateChild();
        throw new Error("apiResponse.text: Response has been disposed");
      })(child.route),
    ).rejects.toThrow("Response has been disposed");
    const reloaded = pageAndRoute(false);
    await expect(
      whilePageLives(async () => {
        reloaded.navigate();
        throw new Error("the test's own failure");
      })(reloaded.route),
    ).rejects.toThrow("the test's own failure");
  });
});
NEW-END

EDIT e2e/helpers/route-guard.ts #1
OLD-BEGIN
import type { Route } from "@playwright/test";

OLD-END
NEW-BEGIN
import type { Page, Route } from "@playwright/test";

NEW-END
EDIT e2e/helpers/route-guard.ts #2
OLD-BEGIN
 *
 * Turn 34c-4 (turn 34d's reviewer) — the request ends quietly only when its page is in fact closed:
 * "Response has been disposed" on a page that is still open is the test's own failure and throws.
 * The error's words are read through `errorText` (src/lib/error-text.ts, INC-937's rule).
 */

/** The two errors Playwright gives a handler whose page has gone. */
OLD-END
NEW-BEGIN
 *
 * Turn 34c-4 (turn 34d's reviewer) — "gone" is read from the page, not from the error's words:
 * "Response has been disposed" on a page whose document is still the one that asked is the test's
 * own failure and throws. INC-961 (Foundations turn C1) — and "gone" is the DOCUMENT, not only the
 * Page object: a reload or a navigation (the app's one reload for a failed chunk, a test's own
 * Refresh — ODE-1, run 40615073357) disposes the old document's responses while the Page stays
 * open, and turn 34c-4's rule threw there. So a request ends quietly when one of the two errors
 * comes AND its page has closed or its main frame has navigated since the handler began — waiting
 * up to GONE_WAIT_MS for that navigation, because Playwright can report the disposed response a
 * moment before the navigation event. The error's words are read through `errorText`
 * (src/lib/error-text.ts, INC-937's rule).
 */

/** How long a "gone" error waits for the navigation that explains it. */
export const GONE_WAIT_MS = 2_000;

/** The two errors Playwright gives a handler whose page has gone. */
NEW-END
EDIT e2e/helpers/route-guard.ts #3
OLD-BEGIN

/**
 * A route handler that ends when its page has gone (INC-934): one of the two errors, on a page that
 * is closed. Every other error throws.
 */
OLD-END
NEW-BEGIN

/** Each page's main-frame navigations, counted from the first handler that watches it. */
const navigations = new WeakMap<Page, { count: number }>();

/** The page's navigation counter (one listener per page, attached on first use). */
function navigationsOf(page: Page): { count: number } {
  const known = navigations.get(page);
  if (known !== undefined) return known;
  const counter = { count: 0 };
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) counter.count += 1;
  });
  navigations.set(page, counter);
  return counter;
}

/**
 * Whether the document that made the route's request is gone: its page has closed, or its main
 * frame has navigated since `since` — now, or within GONE_WAIT_MS.
 */
export async function routeDocumentGone(
  page: Page,
  since: number,
  waitMs: number = GONE_WAIT_MS,
): Promise<boolean> {
  const counter = navigationsOf(page);
  if (page.isClosed() || counter.count !== since) return true;
  await page.waitForEvent("framenavigated", { timeout: waitMs }).then(
    () => undefined,
    () => undefined,
  );
  return page.isClosed() || counter.count !== since;
}

/**
 * A route handler that ends when its page's document has gone (INC-934, INC-961): one of the two
 * errors, on a page that has closed or navigated since the handler began. Every other error throws.
 */
NEW-END
EDIT e2e/helpers/route-guard.ts #4
OLD-BEGIN
  return async (route) => {
    try {
OLD-END
NEW-BEGIN
  return async (route) => {
    const page = route.request().frame().page();
    const since = navigationsOf(page).count;
    try {
NEW-END
EDIT e2e/helpers/route-guard.ts #5
OLD-BEGIN
    } catch (error) {
      if (pageWentAway(error) && routePageClosed(route)) return;
      throw error;
OLD-END
NEW-BEGIN
    } catch (error) {
      if (pageWentAway(error) && (await routeDocumentGone(page, since))) return;
      throw error;
NEW-END

FILE-BEGIN scripts/conformance/pin.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-958 (Foundations turn C1) — A PIN IS WHOLE OR ABSENT, AND ITS PRECISION IS KNOWN. The
 * mechanism is src/features/posting/map/pin.ts: `Pin` (the point and its precision together),
 * `PinPrecision` (the table's 'exact' | 'approx'), `readPin` (the one reader of the three
 * columns: the pin, or null — never a guessed precision) and `NEW_PIN_PRECISION` (the starting
 * choice of a NEW pin in the pin map, never a saved pin's default). The census reads src/, e2e/
 * and scripts/ (this file and the generated database types excepted) and refuses:
 *   1. the loose fields `pinLat`, `pinLng`, `pinPrecision` (a pin travels as one value);
 *   2. a precision filled in with `??` — a literal, or NEW_PIN_PRECISION outside the pin map;
 *   3. in the app (src/), a read of the `pin_lat`, `pin_lng` or `pin_precision` columns from a
 *      row that is neither an argument of readPin nor a presence check (`=== null`,
 *      `!== null`) — tests read the stored columns as database truth (G28), and may.
 * No allowlist: the mechanism has no exception.
 */

type Finding = { file: string; line: number; what: string };

const COLUMNS = new Set(["pin_lat", "pin_lng", "pin_precision"]);
const LOOSE = /\bpin(?:Lat|Lng|Precision)\b/;
const STARTING_CHOICE_AT = new Set([
  "src/features/posting/map/pin.ts",
  "src/features/posting/map/map-pin-dropper.tsx",
]);

/** The column a node reads (`row.pin_lat`, `row["pin_lat"]`), or null. */
function columnRead(node: ts.Node): string | null {
  if (ts.isPropertyAccessExpression(node) && COLUMNS.has(node.name.text)) return node.name.text;
  if (
    ts.isElementAccessExpression(node) &&
    ts.isStringLiteralLike(node.argumentExpression) &&
    COLUMNS.has(node.argumentExpression.text)
  )
    return node.argumentExpression.text;
  return null;
}

/** True when the read is an argument of readPin(…) or compared with null. */
function answered(node: ts.Node): boolean {
  let child: ts.Node = node;
  for (let up = node.parent; up !== undefined; child = up, up = up.parent) {
    if (ts.isCallExpression(up) && up.arguments.some((argument) => argument === child)) {
      const callee = up.expression;
      return ts.isIdentifier(callee) && callee.text === "readPin";
    }
    if (
      ts.isBinaryExpression(up) &&
      [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken].includes(
        up.operatorToken.kind,
      )
    ) {
      const other = up.left === child ? up.right : up.left;
      return other.kind === ts.SyntaxKind.NullKeyword;
    }
    if (!ts.isOptionalChain(up) && !ts.isParenthesizedExpression(up) && !ts.isNonNullExpression(up))
      return false;
  }
  return false;
}

/** The name a `??` fills: the right-most name of its left side. */
function filledName(expression: ts.Expression): string {
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  if (ts.isIdentifier(expression)) return expression.text;
  if (
    ts.isElementAccessExpression(expression) &&
    ts.isStringLiteralLike(expression.argumentExpression)
  )
    return expression.argumentExpression.text;
  return "";
}

export function pinFindings(files: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && LOOSE.test(node.text))
        findings.push({ file, line, what: `a pin's loose field \`${node.text}\` (one Pin value)` });
      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
        /precision/i.test(filledName(node.left))
      ) {
        const right = node.right;
        if (ts.isStringLiteralLike(right) || ts.isNoSubstitutionTemplateLiteral(right))
          findings.push({ file, line, what: `a precision guessed with ?? "${right.text}"` });
        else if (
          ts.isIdentifier(right) &&
          right.text === "NEW_PIN_PRECISION" &&
          !STARTING_CHOICE_AT.has(file)
        )
          findings.push({
            file,
            line,
            what: "a new pin's starting choice used outside the pin map",
          });
      }
      const column = columnRead(node);
      if (column !== null && /(?:^|\/)src\//.test(file) && !answered(node))
        findings.push({ file, line, what: `the \`${column}\` column read outside readPin` });
    });
  }
  return findings;
}

const files = walkFiles(["src", "e2e", "scripts"], {
  ext: ["ts", "tsx"],
  skip: /src[\\/]integrations[\\/]supabase[\\/]types\.ts$|scripts[\\/]conformance[\\/]pin\.test\.ts$/,
}).map((file) => file.split("\\").join("/"));

describe("a pin is whole or absent, its precision known (INC-958)", () => {
  it(
    "CF-PIN-1 no loose pin field, no guessed precision, no pin column read outside readPin",
    () => {
      expect(files.length).toBeGreaterThan(1000);
      expect(report(pinFindings(files))).toBe("");
      expect(files).toContain("src/features/posting/map/pin.ts");
    },
    TREE_SCAN_MS,
  );

  it("CF-PIN-2 a planted file's four breaches are named and its kept reads are not", () => {
    const dir = "node_modules/.cache/pin-census";
    mkdirSync(`${dir}/src`, { recursive: true });
    const file = `${dir}/src/planted.ts`;
    try {
      writeFileSync(
        file,
        [
          "declare const row: Record<string, unknown>;",
          "declare function readPin(a: unknown, b: unknown, c: unknown, w: string): unknown;",
          "declare const NEW_PIN_PRECISION: string;",
          "declare const view: { pin?: { precision?: string } };",
          'export const kept = readPin(row["pin_lat"], row.pin_lng, row["pin_precision"], "kept");',
          'export const present = row["pin_precision"] === null;',
          "export const pinLat = 1;",
          'export const guessed = view.pin?.precision ?? "exact";',
          "export const started = view.pin?.precision ?? NEW_PIN_PRECISION;",
          'export const loose = Number(row["pin_lng"]);',
          "",
        ].join("\n"),
      );
      expect(report(pinFindings([file]))).toBe(
        [
          `${file}:10 the \`pin_lng\` column read outside readPin`,
          `${file}:7 a pin's loose field \`pinLat\` (one Pin value)`,
          `${file}:8 a precision guessed with ?? "exact"`,
          `${file}:9 a new pin's starting choice used outside the pin map`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/pin.test.ts

FILE-BEGIN scripts/conformance/notice-outlet.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-955 (Foundations turn C1) — A NOTICE IS SHOWN WHERE THE PERSON IS LOOKING. A modal overlay
 * (a dialog, an alert, a sheet, a drawer, the shell's phone panels) keeps the keyboard inside it,
 * blocks the pointer outside it and paints over the page, so the shell's notices are drawn inside
 * the topmost open one's NoticeOutlet (src/components/ui/notice-outlet.tsx). The census reads
 * every browser file under src/ (tests excepted) for the content part of a modal primitive — the
 * `Content` of a namespace imported from dialog-primitive or alert-dialog-primitive (Radix's
 * dialog, ui/sheet.tsx and the shell's panels use the first) or of vaul's `Drawer` — and refuses
 * one that does not render `<NoticeOutlet />` inside it. A content whose Root says
 * `modal={false}` is not modal (the phone's rail menu: the page beside it stays reachable) and is
 * not read. Menus, popovers, tooltips and selects are not modal surfaces a notice must enter:
 * they close on the first tap outside. No allowlist.
 */

type Finding = { file: string; line: number; what: string };

const MODAL_MODULES = /(?:^|\/)(?:dialog-primitive|alert-dialog-primitive)$/;

/** The local names in a file that stand for a modal primitive's namespace. */
function modalNamespaces(source: ts.SourceFile): Set<string> {
  const names = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue;
    const from = statement.moduleSpecifier.text;
    const bindings = statement.importClause?.namedBindings;
    if (MODAL_MODULES.test(from) && bindings !== undefined && ts.isNamespaceImport(bindings))
      names.add(bindings.name.text);
    if (from === "vaul" && bindings !== undefined && ts.isNamedImports(bindings))
      for (const element of bindings.elements)
        if ((element.propertyName ?? element.name).text === "Drawer") names.add(element.name.text);
  }
  return names;
}

function tagOf(node: ts.JsxElement | ts.JsxSelfClosingElement): string {
  const tag = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName;
  return tag.getText();
}

/** True when an enclosing `*.Root` element says modal={false}. */
function underNonModalRoot(node: ts.Node): boolean {
  for (let up = node.parent; up !== undefined; up = up.parent) {
    if (!ts.isJsxElement(up) || !tagOf(up).endsWith(".Root")) continue;
    return up.openingElement.attributes.properties.some(
      (attribute) =>
        ts.isJsxAttribute(attribute) &&
        attribute.name.getText() === "modal" &&
        attribute.initializer !== undefined &&
        ts.isJsxExpression(attribute.initializer) &&
        attribute.initializer.expression?.kind === ts.SyntaxKind.FalseKeyword,
    );
  }
  return false;
}

function rendersOutlet(node: ts.Node): boolean {
  let found = false;
  const visit = (child: ts.Node) => {
    if (found) return;
    if (ts.isJsxSelfClosingElement(child) && child.tagName.getText() === "NoticeOutlet")
      found = true;
    else ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return found;
}

/** Every modal content in the files, and the ones that draw no NoticeOutlet. */
export function outletFindings(files: string[]): { contents: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let contents = 0;
  for (const file of files) {
    let namespaces: Set<string> | null = null;
    visitTs(file, (node, source) => {
      namespaces ??= modalNamespaces(source);
      if (!ts.isJsxElement(node) && !ts.isJsxSelfClosingElement(node)) return;
      const [space, part] = tagOf(node).split(".");
      if (part !== "Content" || space === undefined || !namespaces.has(space)) return;
      if (underNonModalRoot(node)) return;
      contents += 1;
      if (!ts.isJsxElement(node) || !rendersOutlet(node))
        findings.push({
          file,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          what: `<${tagOf(node)}> draws no <NoticeOutlet /> (the shell's notices cannot reach it)`,
        });
    });
  }
  return { contents, findings };
}

const files = walkFiles(["src"], { ext: ["tsx"], skipTests: true }).map((file) =>
  file.split("\\").join("/"),
);

describe("a notice is shown where the person is looking (INC-955)", () => {
  it(
    "CF-NO-1 every modal overlay's content draws a NoticeOutlet",
    () => {
      const { contents, findings } = outletFindings(files);
      console.log(`[notice-outlet] modal contents: ${contents}`);
      expect(contents).toBeGreaterThanOrEqual(5);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-NO-2 a planted file's two bare contents are named; its outlet and non-modal ones are not", () => {
    const dir = "node_modules/.cache/notice-outlet";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.tsx`;
    try {
      writeFileSync(
        file,
        [
          'import * as Modal from "./dialog-primitive";',
          'import { Drawer as Pull } from "vaul";',
          "declare const NoticeOutlet: () => null;",
          "export const kept = (",
          "  <Modal.Root>",
          "    <Modal.Content>",
          "      <p>kept</p>",
          "      <NoticeOutlet />",
          "    </Modal.Content>",
          "  </Modal.Root>",
          ");",
          "export const side = (",
          "  <Modal.Root modal={false}>",
          "    <Modal.Content />",
          "  </Modal.Root>",
          ");",
          "export const bare = <Modal.Content><p>bare</p></Modal.Content>;",
          "export const pulled = <Pull.Content />;",
          "",
        ].join("\n"),
      );
      const { contents, findings } = outletFindings([file]);
      expect(contents).toBe(3);
      expect(report(findings)).toBe(
        [
          `${file}:17 <Modal.Content> draws no <NoticeOutlet /> (the shell's notices cannot reach it)`,
          `${file}:18 <Pull.Content> draws no <NoticeOutlet /> (the shell's notices cannot reach it)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/notice-outlet.test.ts

FILE-BEGIN scripts/conformance/resilient-fallbacks.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-956 (Foundations turn C1) — A PIECE THAT CANNOT DOWNLOAD SAYS SO ONCE, IN THE RIGHT PLACE,
 * NEVER WITH ITS LOADING WORD. `resilientLazy(fetch, label, fallback, { inPlace })`
 * (src/lib/resilient-lazy.ts) answers a failed download in one of two ways, and the fallback
 * must match the way:
 *   - `inPlace: true` — the fallback itself says so: it renders LoadFailedHere (the failure and
 *     its one cure, Refresh), and the shell's notice is not also shown;
 *   - otherwise — the shell's one notice says so, and the fallback only holds the piece's place:
 *     it shows no words of its own (no `t(…)` — a word there is a loading word or a second,
 *     different message) and no LoadFailedHere.
 * The ad page's maps showed the loading word "Map pin" as their failure (the operator's walk of
 * 2026-10-27). The census reads every resilientLazy call under src/ whose fallback is a function
 * declared in the same file. No allowlist.
 */

type Finding = { file: string; line: number; what: string };

function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  return source.statements.find(
    (statement): statement is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(statement) && statement.name?.text === name,
  );
}

function says(node: ts.Node): { words: boolean; failedHere: boolean } {
  let words = false;
  let failedHere = false;
  const visit = (child: ts.Node) => {
    if (
      ts.isCallExpression(child) &&
      ts.isIdentifier(child.expression) &&
      child.expression.text === "t"
    )
      words = true;
    if (
      (ts.isJsxSelfClosingElement(child) || ts.isJsxOpeningElement(child)) &&
      child.tagName.getText() === "LoadFailedHere"
    )
      failedHere = true;
    ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return { words, failedHere };
}

function inPlaceOf(options: ts.Expression | undefined): boolean {
  return (
    options !== undefined &&
    ts.isObjectLiteralExpression(options) &&
    options.properties.some(
      (property) =>
        ts.isPropertyAssignment(property) &&
        property.name.getText() === "inPlace" &&
        property.initializer.kind === ts.SyntaxKind.TrueKeyword,
    )
  );
}

export function fallbackFindings(files: string[]): { calls: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let calls = 0;
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== "resilientLazy"
      )
        return;
      const [, , fallback, options] = node.arguments;
      if (fallback === undefined || !ts.isIdentifier(fallback)) return;
      calls += 1;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      const declared = functionNamed(source, fallback.text);
      if (declared === undefined) {
        findings.push({
          file,
          line,
          what: `${fallback.text}: not a function declared in this file`,
        });
        return;
      }
      const { words, failedHere } = says(declared);
      if (inPlaceOf(options)) {
        if (!failedHere)
          findings.push({
            file,
            line,
            what: `${fallback.text} is in place but draws no LoadFailedHere`,
          });
      } else if (words || failedHere)
        findings.push({
          file,
          line,
          what: `${fallback.text} reports to the shell's notice and also says words of its own${failedHere ? " (LoadFailedHere: use inPlace)" : ""}`,
        });
    });
  }
  return { calls, findings };
}

const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((file) =>
  file.split("\\").join("/"),
);

describe("a piece that cannot download says so once, in the right place (INC-956)", () => {
  it(
    "CF-RLF-1 every resilientLazy fallback matches its way of saying so",
    () => {
      const { calls, findings } = fallbackFindings(files);
      expect(calls).toBeGreaterThanOrEqual(10);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-RLF-2 a planted file's three mismatched fallbacks are named; its two kept ones are not", () => {
    const dir = "node_modules/.cache/resilient-fallbacks";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/planted.tsx`;
    try {
      writeFileSync(
        file,
        [
          "declare function resilientLazy(f: unknown, l: string, c: unknown, o?: unknown): unknown;",
          "declare function t(key: string): string;",
          "declare const LoadFailedHere: (p: { testid: string; refreshTestid: string }) => null;",
          "declare const load: () => Promise<never>;",
          'export const A = resilientLazy(load, "a", Holds);',
          'export const B = resilientLazy(load, "b", Says, { inPlace: true });',
          'export const C = resilientLazy(load, "c", LoadingWord);',
          'export const D = resilientLazy(load, "d", Holds, { inPlace: true });',
          'export const E = resilientLazy(load, "e", Says);',
          "function Holds() { return <span>—</span>; }",
          'function Says() { return <LoadFailedHere testid="x" refreshTestid="y" />; }',
          'function LoadingWord() { return <p>{t("post.pin.title")}</p>; }',
          "",
        ].join("\n"),
      );
      const { calls, findings } = fallbackFindings([file]);
      expect(calls).toBe(5);
      expect(report(findings)).toBe(
        [
          `${file}:7 LoadingWord reports to the shell's notice and also says words of its own`,
          `${file}:8 Holds is in place but draws no LoadFailedHere`,
          `${file}:9 Says reports to the shell's notice and also says words of its own (LoadFailedHere: use inPlace)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/resilient-fallbacks.test.ts

EDIT scripts/ci/nightly-hour.test.ts #1
OLD-BEGIN

function run(args: string[], output?: string) {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GITHUB_OUTPUT;
OLD-END
NEW-BEGIN

function run(args: string[], output?: string, extra: NodeJS.ProcessEnv = {}) {
  const env: NodeJS.ProcessEnv = { ...process.env, ...extra };
  delete env.GITHUB_OUTPUT;
NEW-END
EDIT scripts/ci/nightly-hour.test.ts #2
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("NH-6 a machine that cannot resolve New York's zone is an error, never a silent stand-down (INC-962)", () => {
    const dir = mkdtempSync(join(tmpdir(), "nh-zones-"));
    try {
      // TZDIR names where the time-zone files are; an empty one is a machine without them.
      const result = run(["schedule", SUMMER, "2026-07-15"], undefined, { TZDIR: dir });
      expect(result.code).toBe(2);
      expect(result.out).toContain("::error title=nightly-hour::the America/New_York time zone");
      expect(result.out).not.toContain("go=");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
NEW-END

EDIT src/components/shell/on-demand-notice.test.tsx #1
OLD-BEGIN
const { OnDemandNotice } = await import("./on-demand-notice");
const { reportOnDemandFailure } = await import("@/lib/on-demand-failure");
OLD-END
NEW-BEGIN
const { OnDemandNotice } = await import("./on-demand-notice");
const { NoticeOutlet } = await import("@/components/ui/notice-outlet");
const { reportOnDemandFailure } = await import("@/lib/on-demand-failure");
NEW-END
EDIT src/components/shell/on-demand-notice.test.tsx #2
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });

  it("ODN-3 while an overlay is open the notice is drawn inside its outlet (the topmost of two), and back in the shell when it closes", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const page = (overlays: number) => (
      <>
        <OnDemandNotice />
        {overlays >= 1 ? (
          <div data-testid="first-overlay">
            <NoticeOutlet />
          </div>
        ) : null}
        {overlays >= 2 ? (
          <div data-testid="second-overlay">
            <NoticeOutlet />
          </div>
        ) : null}
      </>
    );
    const { rerender } = render(page(2));
    act(() => {
      reportOnDemandFailure("the large map", new Error("offline"));
    });
    const inSecond = screen.getByTestId("second-overlay");
    expect(inSecond.querySelector("[data-testid='on-demand-failed']")).not.toBeNull();
    expect(screen.getAllByTestId("on-demand-failed")).toHaveLength(1);
    const outlet = inSecond.querySelector("[data-notice-outlet]");
    expect(outlet?.getAttribute("aria-live")).toBe("polite");
    expect(outlet?.getAttribute("role")).toBeNull();
    rerender(page(1));
    expect(
      screen.getByTestId("first-overlay").querySelector("[data-testid='on-demand-failed']"),
    ).not.toBeNull();
    rerender(page(0));
    const shown = screen.getByTestId("on-demand-failed");
    expect(shown.closest("[data-notice-outlet]")).toBeNull();
    fireEvent.click(screen.getByTestId("on-demand-close"));
    expect(screen.queryByTestId("on-demand-failed")).toBeNull();
    errors.mockRestore();
  });
});
NEW-END

FILE-BEGIN src/features/posting/preview/listing-detail-map-failed.test.tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { ListingDetail, type ListingDetailView } from "./listing-detail";

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
// INC-956 — the maps' code cannot download (offline): both imports fail.
vi.mock("../map/map-preview", () => {
  throw new Error("offline: the map's code did not download");
});
vi.mock("../map/map-large", () => {
  throw new Error("offline: the large map's code did not download");
});
const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  reportOnDemandFailure: reported,
}));

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
 * INC-956 (the operator's walk of 2026-10-27, line 8) — offline, the ad page's map said "Map pin",
 * its loading word, where it had failed. A map whose code cannot download says the failure and
 * offers Refresh in its own box, and does not also raise the shell's notice.
 */
describe("a map that cannot download says so in its box (INC-956)", () => {
  it("LDF-1 the still map's box shows the failure and Refresh, never the loading word, and the shell's notice is not raised", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        pin={{ lat: 9.0054, lng: 38.7636, precision: "approx" }}
      />,
    );
    const map = screen.getByTestId("listing-detail-map");
    const failed = await within(map).findByTestId("listing-map-failed");
    expect(failed).toHaveTextContent(en["common.loadFailed"]);
    expect(within(failed).getByTestId("listing-map-refresh")).toHaveTextContent(
      en["common.refreshPage"],
    );
    expect(map).not.toHaveTextContent(en["post.pin.title"]);
    expect(within(map).getByTestId("map-frame")).toContainElement(failed);
    expect(reported).not.toHaveBeenCalled();
    expect(
      errors.mock.calls.some((call) => String(call[0]).startsWith("[client-error] the map")),
    ).toBe(true);
    errors.mockRestore();
  });
});
FILE-END src/features/posting/preview/listing-detail-map-failed.test.tsx

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
   * the person can reach, and raises no second notice.
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
      const failed = dialog.getByTestId("listing-map-large-failed");
      await expect(failed).toContainText(en["common.loadFailed"]);
      await expect(dialog).not.toContainText(en["post.pin.title"]);
      const refresh = dialog.getByTestId("listing-map-large-refresh");
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

EDIT scripts/ci/nightly-hour.sh #1
OLD-BEGIN
# (workflow_dispatch) always goes on. Prints "go=true|false" (and writes it to $GITHUB_OUTPUT
# when GitHub provides one); a cron it cannot read is an error (exit 2), never a silent skip.
set -euo pipefail
OLD-END
NEW-BEGIN
# (workflow_dispatch) always goes on. Prints "go=true|false" (and writes it to $GITHUB_OUTPUT
# when GitHub provides one); a cron it cannot read, or a New York zone this machine cannot
# resolve (INC-962), is an error (exit 2), never a silent skip.
set -euo pipefail
NEW-END
EDIT scripts/ci/nightly-hour.sh #2
OLD-BEGIN
fi
if ! [[ "$cron" =~ ^([0-9]{1,2})\ ([0-9]{1,2})\ \*\ \*\ \*$ ]]; then
OLD-END
NEW-BEGIN
fi
# INC-962 — the zone must resolve: on a machine without the time-zone files `date` reads
# America/New_York as UTC without a word, and both schedules would stand down silently.
if [ "$(TZ=America/New_York date -d 2026-01-15T12:00:00Z +%z 2>/dev/null)" != "-0500" ] ||
  [ "$(TZ=America/New_York date -d 2026-07-15T12:00:00Z +%z 2>/dev/null)" != "-0400" ]; then
  echo "::error title=nightly-hour::the America/New_York time zone does not resolve on this machine (no time-zone files?)" >&2
  exit 2
fi
if ! [[ "$cron" =~ ^([0-9]{1,2})\ ([0-9]{1,2})\ \*\ \*\ \*$ ]]; then
NEW-END

EDIT src/components/shell/on-demand-notice.tsx #1
OLD-BEGIN
import { useEffect, useState } from "react";

OLD-END
NEW-BEGIN
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

NEW-END
EDIT src/components/shell/on-demand-notice.tsx #2
OLD-BEGIN
import { refreshPage, useOnDemandFailures } from "@/lib/on-demand-failure";
import { cn } from "@/lib/utils";
OLD-END
NEW-BEGIN
import { refreshPage, useOnDemandFailures } from "@/lib/on-demand-failure";
import { useTopNoticeOutlet } from "@/lib/notice-outlets";
import { cn } from "@/lib/utils";
NEW-END
EDIT src/components/shell/on-demand-notice.tsx #3
OLD-BEGIN
 * role: an empty role="status" on every page answered a page's own getByRole("status") too
 * (the reset screen's R-2 and R-4, CI on turn 34b-2's landing).
 */
OLD-END
NEW-BEGIN
 * role: an empty role="status" on every page answered a page's own getByRole("status") too
 * (the reset screen's R-2 and R-4, CI on turn 34b-2's landing). INC-955 — while a dialog, sheet,
 * drawer or alert is open, the notice is drawn inside the topmost one's NoticeOutlet
 * (src/lib/notice-outlets.ts), where the person can see, reach and tap it; the shell's
 * own region stays, empty, for when the overlay closes.
 */
NEW-END
EDIT src/components/shell/on-demand-notice.tsx #4
OLD-BEGIN
  }, [failures]);
  const shown = failures > closedAt;
  return (
OLD-END
NEW-BEGIN
  }, [failures]);
  const outlet = useTopNoticeOutlet();
  const notice =
    failures > closedAt ? (
      <div
        data-testid="on-demand-failed"
        className={cn(
          CARD_SURFACE,
          "pointer-events-auto flex max-w-md items-center gap-3 px-3 py-2 text-sm text-foreground",
        )}
      >
        <span>{t("common.loadFailed")}</span>
        <Button
          variant="link"
          size="touch"
          data-testid="on-demand-refresh"
          className="shrink-0 px-2"
          onClick={refreshPage}
        >
          {t("common.refreshPage")}
        </Button>
        <Button
          variant="ghost"
          size="touch"
          data-testid="on-demand-close"
          aria-label={t("common.close")}
          className="w-11 shrink-0 p-0"
          onClick={() => setClosedAt(failures)}
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    ) : null;
  return (
NEW-END
EDIT src/components/shell/on-demand-notice.tsx #5
OLD-BEGIN
    >
      {shown ? (
        <div
          data-testid="on-demand-failed"
          className={cn(
            CARD_SURFACE,
            "pointer-events-auto flex max-w-md items-center gap-3 px-3 py-2 text-sm text-foreground",
          )}
        >
          <span>{t("common.loadFailed")}</span>
          <Button
            variant="link"
            size="touch"
            data-testid="on-demand-refresh"
            className="shrink-0 px-2"
            onClick={refreshPage}
          >
            {t("common.refreshPage")}
          </Button>
          <Button
            variant="ghost"
            size="touch"
            data-testid="on-demand-close"
            aria-label={t("common.close")}
            className="w-11 shrink-0 p-0"
            onClick={() => setClosedAt(failures)}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
OLD-END
NEW-BEGIN
    >
      {notice !== null && outlet !== null ? createPortal(notice, outlet) : notice}
    </div>
NEW-END

EDIT src/components/shell/toolbar-panel.tsx #1
OLD-BEGIN
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
OLD-END
NEW-BEGIN
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NoticeOutlet } from "@/components/ui/notice-outlet";
import { useIsMobile } from "@/hooks/use-mobile";
NEW-END
EDIT src/components/shell/toolbar-panel.tsx #2
OLD-BEGIN
            ) : null}
          </DialogPrimitive.Content>
OLD-END
NEW-BEGIN
            ) : null}
            {/* INC-955 — the shell's notices are drawn here while this panel is open. */}
            <NoticeOutlet />
          </DialogPrimitive.Content>
NEW-END

EDIT src/components/ui/alert-dialog.tsx #1
OLD-BEGIN
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
OLD-END
NEW-BEGIN
import { cn } from "@/lib/utils";
import { NoticeOutlet } from "./notice-outlet";
import { buttonVariants } from "@/components/ui/button";
NEW-END
EDIT src/components/ui/alert-dialog.tsx #2
OLD-BEGIN
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
OLD-END
NEW-BEGIN
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
NEW-END
EDIT src/components/ui/alert-dialog.tsx #3
OLD-BEGIN
      {...props}
    />
  </AlertDialogPortal>
OLD-END
NEW-BEGIN
      {...props}
    >
      {children}
      {/* INC-955 — the shell's notices are drawn here while this alert is open. */}
      <NoticeOutlet />
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
NEW-END

EDIT src/components/ui/dialog.tsx #1
OLD-BEGIN
import { cn } from "@/lib/utils";

OLD-END
NEW-BEGIN
import { cn } from "@/lib/utils";
import { NoticeOutlet } from "./notice-outlet";

NEW-END
EDIT src/components/ui/dialog.tsx #2
OLD-BEGIN
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
OLD-END
NEW-BEGIN
        {children}
        {/* INC-955 — the shell's notices are drawn here while this dialog is open. */}
        <NoticeOutlet />
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
NEW-END

EDIT src/components/ui/drawer.tsx #1
OLD-BEGIN
import { cn } from "@/lib/utils";

OLD-END
NEW-BEGIN
import { cn } from "@/lib/utils";
import { NoticeOutlet } from "./notice-outlet";

NEW-END
EDIT src/components/ui/drawer.tsx #2
OLD-BEGIN
      {children}
    </DrawerPrimitive.Content>
OLD-END
NEW-BEGIN
      {children}
      {/* INC-955 — the shell's notices are drawn here while this drawer is open. */}
      <NoticeOutlet />
    </DrawerPrimitive.Content>
NEW-END

FILE-BEGIN src/components/ui/notice-outlet.tsx
import { registerNoticeOutlet } from "@/lib/notice-outlets";

/**
 * INC-955 — the place inside a modal overlay's content where the shell's notices are drawn while
 * it is open (the mechanism: src/lib/notice-outlets.ts). Absolute over the content's foot, so it
 * takes no room and adds no gap; it passes the pointer through but for the notice itself; a
 * polite live region from its first paint, with no role (ODN-2).
 */
export function NoticeOutlet() {
  // React 19's ref cleanup: the outlet leaves the register when its element unmounts.
  return (
    <div
      ref={registerNoticeOutlet}
      aria-live="polite"
      data-notice-outlet=""
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-3"
    />
  );
}
FILE-END src/components/ui/notice-outlet.tsx

EDIT src/components/ui/sheet.tsx #1
OLD-BEGIN
import { cn } from "@/lib/utils";

OLD-END
NEW-BEGIN
import { cn } from "@/lib/utils";
import { NoticeOutlet } from "./notice-outlet";

NEW-END
EDIT src/components/ui/sheet.tsx #2
OLD-BEGIN
        {children}
      </SheetPrimitive.Content>
OLD-END
NEW-BEGIN
        {children}
        {/* INC-955 — the shell's notices are drawn here while this sheet is open. */}
        <NoticeOutlet />
      </SheetPrimitive.Content>
NEW-END

EDIT src/features/ad-page/public-listing.test.ts #1
OLD-BEGIN
      pinLat: null,
      pinLng: null,
      pinPrecision: null,
OLD-END
NEW-BEGIN
      pin: null,
NEW-END

EDIT src/features/ad-page/public-listing.ts #1
OLD-BEGIN
import { shapeDeal, shapePostingSchema } from "@/features/posting/schema-shape";
import type { ListingDetailView } from "@/features/posting/preview/listing-detail";
OLD-END
NEW-BEGIN
import { shapeDeal, shapePostingSchema } from "@/features/posting/schema-shape";
import { readPin } from "@/features/posting/map/pin";
import type { ListingDetailView } from "@/features/posting/preview/listing-detail";
NEW-END
EDIT src/features/ad-page/public-listing.ts #2
OLD-BEGIN
    sellerMemberSince: doc.seller.member_since,
    pinLat: doc.places.pin?.lat ?? null,
    pinLng: doc.places.pin?.lng ?? null,
    pinPrecision: doc.places.pin?.precision ?? null,
    pinZoom: doc.places.pin?.zoom ?? null,
OLD-END
NEW-BEGIN
    sellerMemberSince: doc.seller.member_since,
    // INC-958 — the document's pin whole or absent; a precision it does not carry is no pin.
    pin: readPin(
      doc.places.pin?.lat,
      doc.places.pin?.lng,
      doc.places.pin?.precision,
      "the ad page's pin",
    ),
    pinZoom: doc.places.pin?.zoom ?? null,
NEW-END

EDIT src/features/my-listings/my-listing-page.tsx #1
OLD-BEGIN
              pinLat={draft.draft.pinLat}
              pinLng={draft.draft.pinLng}
              pinPrecision={draft.draft.pinPrecision}
OLD-END
NEW-BEGIN
              pin={draft.draft.pin}
NEW-END

EDIT src/features/posting/map/map-frame.tsx #1
OLD-BEGIN
import { STILL_MAP_BOX, stillMapCaptionKey } from "./still-map";

OLD-END
NEW-BEGIN
import { STILL_MAP_BOX, stillMapCaptionKey } from "./still-map";
import type { PinPrecision } from "./pin";

NEW-END
EDIT src/features/posting/map/map-frame.tsx #2
OLD-BEGIN
}: {
  precision: string | null;
  audience?: "seller" | "buyer";
OLD-END
NEW-BEGIN
}: {
  precision: PinPrecision;
  audience?: "seller" | "buyer";
NEW-END

EDIT src/features/posting/map/map-large.tsx #1
OLD-BEGIN
} from "./leaflet";

OLD-END
NEW-BEGIN
} from "./leaflet";
import type { PinPrecision } from "./pin";

NEW-END
EDIT src/features/posting/map/map-large.tsx #2
OLD-BEGIN
  lng: number;
  precision: string | null;
  zoom?: number | null;
OLD-END
NEW-BEGIN
  lng: number;
  precision: PinPrecision;
  zoom?: number | null;
NEW-END

EDIT src/features/posting/map/map-pin-dropper.tsx #1
OLD-BEGIN
import { insideOutline } from "./outline";

OLD-END
NEW-BEGIN
import { insideOutline } from "./outline";
import { NEW_PIN_PRECISION, type PinPrecision } from "./pin";

NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #2
OLD-BEGIN
  lng: number;
  precision: string;
  street: string | null;
OLD-END
NEW-BEGIN
  lng: number;
  precision: PinPrecision;
  street: string | null;
NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #3
OLD-BEGIN
    lng: number;
    precision: string;
    zoom: number;
OLD-END
NEW-BEGIN
    lng: number;
    precision: PinPrecision;
    zoom: number;
NEW-END
EDIT src/features/posting/map/map-pin-dropper.tsx #4
OLD-BEGIN
  );
  const [precision, setPrecision] = useState<string>(saved?.precision ?? "exact");
  const [tile, setTile] = useState<TileKind>("street");
OLD-END
NEW-BEGIN
  );
  // INC-958 — a saved pin keeps its own precision; only a NEW pin starts at NEW_PIN_PRECISION.
  const [precision, setPrecision] = useState<PinPrecision>(saved?.precision ?? NEW_PIN_PRECISION);
  const [tile, setTile] = useState<TileKind>("street");
NEW-END

EDIT src/features/posting/map/map-preview.tsx #1
OLD-BEGIN
} from "./leaflet";

OLD-END
NEW-BEGIN
} from "./leaflet";
import type { PinPrecision } from "./pin";

NEW-END
EDIT src/features/posting/map/map-preview.tsx #2
OLD-BEGIN
  lng: number;
  precision: string | null;
  /** Part L — the saved zoom for an exact pin; an approximate pin keeps 13 (privacy). */
OLD-END
NEW-BEGIN
  lng: number;
  precision: PinPrecision;
  /** Part L — the saved zoom for an exact pin; an approximate pin keeps 13 (privacy). */
NEW-END

FILE-BEGIN src/features/posting/map/pin.test.ts
import { afterEach, describe, expect, it, vi } from "vitest";

import { isPinPrecision, NEW_PIN_PRECISION, PIN_PRECISIONS, readPin } from "./pin";

/**
 * INC-958 — a pin is whole or absent, and its precision is known: readPin gives the pin only when
 * all three columns hold a value the table allows; anything else is no pin, logged when it should
 * have been impossible — never an "exact" guessed for a missing precision.
 */
describe("a pin is whole or absent, its precision known (INC-958)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("PIN-1 three valid columns are the pin (numbers, or the numeric strings PostgREST sends)", () => {
    expect(readPin(9.0054, 38.7636, "approx", "test")).toEqual({
      lat: 9.0054,
      lng: 38.7636,
      precision: "approx",
    });
    expect(readPin("9.0054", "38.7636", "exact", "test")).toEqual({
      lat: 9.0054,
      lng: 38.7636,
      precision: "exact",
    });
  });

  it("PIN-2 no pin at all is null, quietly", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(readPin(null, null, null, "test")).toBeNull();
    expect(readPin(undefined, undefined, undefined, "test")).toBeNull();
    expect(errors).not.toHaveBeenCalled();
  });

  it("PIN-3 a point without its precision is NO pin (never an exact one), and says so once", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(readPin(9.0054, 38.7636, null, "the ad page's pin")).toBeNull();
    expect(errors).toHaveBeenCalledTimes(1);
    expect(String(errors.mock.calls[0]?.[0])).toMatch(
      /^\[client-error\] the ad page's pin: a pin without a known precision or point is not drawn/,
    );
  });

  it("PIN-4 a precision the table does not allow, or a broken point, is no pin and is logged", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(readPin(9.0054, 38.7636, "EXACT", "test")).toBeNull();
    expect(readPin(9.0054, 38.7636, "near", "test")).toBeNull();
    expect(readPin("", 38.7636, "exact", "test")).toBeNull();
    expect(readPin(Number.NaN, 38.7636, "exact", "test")).toBeNull();
    expect(readPin(9.0054, null, "approx", "test")).toBeNull();
    expect(errors).toHaveBeenCalledTimes(5);
  });

  it("PIN-5 the precisions are the table's two, and a new pin's starting choice is one of them", () => {
    expect(PIN_PRECISIONS).toEqual(["exact", "approx"]);
    expect(PIN_PRECISIONS.every(isPinPrecision)).toBe(true);
    expect(isPinPrecision(null)).toBe(false);
    expect(isPinPrecision(NEW_PIN_PRECISION)).toBe(true);
  });
});
FILE-END src/features/posting/map/pin.test.ts

FILE-BEGIN src/features/posting/map/pin.ts
/**
 * INC-958 (Foundations turn C1) — A PIN IS WHOLE OR ABSENT, AND ITS PRECISION IS KNOWN.
 *
 * A listing's map pin is three columns — `pin_lat`, `pin_lng`, `pin_precision` — that the door
 * (`set_listing_pin`) writes together and the table's check (listings_pin_precision_check,
 * 20260919054044 :59–:61) keeps together: no pin, or a pin whose precision is 'exact' or
 * 'approx'. The app read them as three loose fields, and five readers filled a missing
 * precision with "exact" — the LESS private side (the ad page's still map, large map and Maps
 * link; the draft's and the edit's prefill), while the maps themselves drew anything but
 * "approx" as an exact point. One type now carries the three together (`Pin`), its precision
 * is the closed union the table allows (`PinPrecision`), and every read of the columns goes
 * through `readPin`: all three present and valid, or `null` (typed absence — no map, no link).
 * A value the table should never hold is logged as a `[client-error]` (F4), never guessed.
 * scripts/conformance/pin.test.ts refuses the loose fields and any guessed precision.
 */

/** The precisions the table allows, in the order a seller is offered them. */
export const PIN_PRECISIONS = ["exact", "approx"] as const;
export type PinPrecision = (typeof PIN_PRECISIONS)[number];

/** A saved pin: its point and how precisely buyers may see it. */
export interface Pin {
  lat: number;
  lng: number;
  precision: PinPrecision;
}

/**
 * The precision a NEW pin starts at in the pin map, before the seller chooses (the pin map shows
 * the choice beside the map; unchanged from the pin map's first version, U6-C1-R3b-4). Never a
 * default for a SAVED pin: a saved pin's precision is read, or the pin is absent.
 */
export const NEW_PIN_PRECISION: PinPrecision = "exact";

export function isPinPrecision(value: unknown): value is PinPrecision {
  return value === "exact" || value === "approx";
}

/** A finite coordinate, from a number or a numeric string (PostgREST sends numerics as either). */
function coordinate(value: unknown): number | null {
  const number =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return value !== null && value !== "" && Number.isFinite(number) ? number : null;
}

/**
 * The pin a row's three columns hold: all three present and valid → the pin; all three absent →
 * `null`; anything else (a half-written pin, a precision the table does not allow) → `null`, and
 * one `[client-error]` line naming `where`, because the table's check should have made it impossible.
 */
export function readPin(lat: unknown, lng: unknown, precision: unknown, where: string): Pin | null {
  const latitude = coordinate(lat);
  const longitude = coordinate(lng);
  if (latitude !== null && longitude !== null && isPinPrecision(precision))
    return { lat: latitude, lng: longitude, precision };
  const absent = (value: unknown) => value === null || value === undefined;
  if (!(absent(lat) && absent(lng) && absent(precision)))
    console.error(
      `[client-error] ${where}: a pin without a known precision or point is not drawn (lat ${String(latitude !== null)}, lng ${String(longitude !== null)}, precision ${isPinPrecision(precision) ? "known" : "unknown"})`,
    );
  return null;
}
FILE-END src/features/posting/map/pin.ts

EDIT src/features/posting/posting-service.ts #1
OLD-BEGIN
import { createDoorQueue, type DoorQueue } from "./door-queue";
import type { CategoryFacts, DoorAnswer, Refusal } from "./types";
OLD-END
NEW-BEGIN
import { createDoorQueue, type DoorQueue } from "./door-queue";
import { readPin, type Pin, type PinPrecision } from "./map/pin";
import type { CategoryFacts, DoorAnswer, Refusal } from "./types";
NEW-END
EDIT src/features/posting/posting-service.ts #2
OLD-BEGIN
   * and the buyer preview read ONE source and cannot disagree about a pin.
   */
  pinLat: number | null;
  pinLng: number | null;
  pinPrecision: string | null;
  /** Part L — the zoom the pin was saved at (3–20), or null. */
OLD-END
NEW-BEGIN
   * and the buyer preview read ONE source and cannot disagree about a pin.
   * INC-958 — one value, whole or absent (map/pin.ts `readPin`).
   */
  pin: Pin | null;
  /** Part L — the zoom the pin was saved at (3–20), or null. */
NEW-END
EDIT src/features/posting/posting-service.ts #3
OLD-BEGIN
          : { messages: true },
      pinLat: numOrNull(own["pin_lat"]),
      pinLng: numOrNull(own["pin_lng"]),
      pinPrecision: data.pin_precision,
      pinZoom: typeof data.pin_zoom === "number" ? data.pin_zoom : null,
OLD-END
NEW-BEGIN
          : { messages: true },
      pin: readPin(own["pin_lat"], own["pin_lng"], data.pin_precision, "the draft's pin"),
      pinZoom: typeof data.pin_zoom === "number" ? data.pin_zoom : null,
NEW-END
EDIT src/features/posting/posting-service.ts #4
OLD-BEGIN
  lng: number;
  precision: string;
  zoom: number | null;
OLD-END
NEW-BEGIN
  lng: number;
  precision: PinPrecision;
  zoom: number | null;
NEW-END
EDIT src/features/posting/posting-service.ts #5
OLD-BEGIN
    const own = last.pin_precision === null ? null : await readOwnPrivate(last.id);
    const lat = own === null ? null : numOrNull(own["pin_lat"]);
    const lng = own === null ? null : numOrNull(own["pin_lng"]);
    const pin: LastPin | null =
      lat === null || lng === null || last.pin_precision === null
        ? null
        : {
            lat,
            lng,
            precision: last.pin_precision,
            zoom: last.pin_zoom ?? null,
OLD-END
NEW-BEGIN
    const own = last.pin_precision === null ? null : await readOwnPrivate(last.id);
    // INC-958 — the pin whole or absent; an unreadable private row is no prefill, as before.
    const read =
      own === null
        ? null
        : readPin(own["pin_lat"], own["pin_lng"], last.pin_precision, "the last post's pin");
    const pin: LastPin | null =
      read === null
        ? null
        : {
            ...read,
            zoom: last.pin_zoom ?? null,
NEW-END
EDIT src/features/posting/posting-service.ts #6
OLD-BEGIN
  locationId: string;
  pin: { lat: number; lng: number; precision: string; zoom: number | null } | null;
  street: string | null;
OLD-END
NEW-BEGIN
  locationId: string;
  pin: (Pin & { zoom: number | null }) | null;
  street: string | null;
NEW-END
EDIT src/features/posting/posting-service.ts #7
OLD-BEGIN
  if (row === null || typeof row["location_id"] !== "string") return null;
  const lat = numOrNull(row["pin_lat"]);
  const lng = numOrNull(row["pin_lng"]);
  const precision = typeof row["pin_precision"] === "string" ? row["pin_precision"] : null;
  const text = (key: string) => (typeof row[key] === "string" ? (row[key] as string) : null);
OLD-END
NEW-BEGIN
  if (row === null || typeof row["location_id"] !== "string") return null;
  const pin = readPin(row["pin_lat"], row["pin_lng"], row["pin_precision"], "the seller's place");
  const text = (key: string) => (typeof row[key] === "string" ? (row[key] as string) : null);
NEW-END
EDIT src/features/posting/posting-service.ts #8
OLD-BEGIN
    locationId: row["location_id"],
    pin:
      lat === null || lng === null || precision === null
        ? null
        : { lat, lng, precision, zoom: numOrNull(row["pin_zoom"]) },
    street: text("street_address"),
OLD-END
NEW-BEGIN
    locationId: row["location_id"],
    pin: pin === null ? null : { ...pin, zoom: numOrNull(row["pin_zoom"]) },
    street: text("street_address"),
NEW-END
EDIT src/features/posting/posting-service.ts #9
OLD-BEGIN
  lng: number,
  precision: string,
  text: PlaceText,
OLD-END
NEW-BEGIN
  lng: number,
  precision: PinPrecision,
  text: PlaceText,
NEW-END
EDIT src/features/posting/posting-service.ts #10
OLD-BEGIN
  text: PlaceText,
  pin: { lat: number; lng: number; precision: string } | null,
): Promise<"saved" | "contactInNote" | "rateLimited" | "failed"> {
OLD-END
NEW-BEGIN
  text: PlaceText,
  pin: Pin | null,
): Promise<"saved" | "contactInNote" | "rateLimited" | "failed"> {
NEW-END

EDIT src/features/posting/preview/listing-detail-map.test.tsx #1
OLD-BEGIN
        pinLat={9.0054}
        pinLng={38.7636}
        pinPrecision="approx"
OLD-END
NEW-BEGIN
        pin={{ lat: 9.0054, lng: 38.7636, precision: "approx" }}
NEW-END

EDIT src/features/posting/preview/listing-detail.test.tsx #1
OLD-BEGIN
    <ListingDetail {...BASE} actor="buyer" pinLat={9.0054} pinLng={38.7636} pinPrecision="exact" />,
OLD-END
NEW-BEGIN
    <ListingDetail
      {...BASE}
      actor="buyer"
      pin={{ lat: 9.0054, lng: 38.7636, precision: "exact" }}
    />,
NEW-END
EDIT src/features/posting/preview/listing-detail.test.tsx #2
OLD-BEGIN
        pinLat={8.9876543}
        pinLng={38.7612345}
        pinPrecision="exact"
OLD-END
NEW-BEGIN
        pin={{ lat: 8.9876543, lng: 38.7612345, precision: "exact" }}
NEW-END

EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
import { CARD_SURFACE } from "@/components/layout/surface";
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { resilientLazy } from "@/lib/resilient-lazy";
OLD-END
NEW-BEGIN
import { CARD_SURFACE } from "@/components/layout/surface";
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";
import { resilientLazy } from "@/lib/resilient-lazy";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN
import { ownValue } from "@/lib/own-key";
import { MapFrame } from "../map/map-frame";

OLD-END
NEW-BEGIN
import { ownValue } from "@/lib/own-key";
import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { MapFrame } from "../map/map-frame";
import type { Pin, PinPrecision } from "../map/pin";

NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #3
OLD-BEGIN
 * the pin snap share the one download, src/lib/load-once.ts), and both maps are
 * resilientLazy: a map that cannot download shows its word, never the route's
 * error screen.
 */
OLD-END
NEW-BEGIN
 * the pin snap share the one download, src/lib/load-once.ts), and both maps are
 * resilientLazy: a map that cannot download says so in its own place, never the route's
 * error screen. INC-956 — in place (`inPlace`): the failure and its one cure, Refresh
 * (LoadFailedHere), where the person is looking — inside the large map's dialog too, where the
 * shell's notice could not be reached; the loading word ("Map pin") is the Suspense
 * fallback's alone.
 */
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #4
OLD-BEGIN
  "the map",
  MapUnavailable,
);
OLD-END
NEW-BEGIN
  "the map",
  MapPreviewUnavailable,
  { inPlace: true },
);
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #5
OLD-BEGIN
  "the large map",
  MapUnavailable,
);

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
OLD-END
NEW-BEGIN
  "the large map",
  MapLargeUnavailable,
  { inPlace: true },
);

type MapPlaceProps = { precision: PinPrecision; audience?: "seller" | "buyer" };

/**
 * INC-956 — a map's place when its code cannot download: the failure and Refresh, in the still
 * map's box (INC-940 — the place holds the map's size, so nothing around it moves).
 */
function MapPreviewUnavailable({ precision, audience }: MapPlaceProps) {
  return (
    <MapFrame precision={precision} {...(audience === undefined ? {} : { audience })}>
      <LoadFailedHere testid="listing-map-failed" refreshTestid="listing-map-refresh" />
    </MapFrame>
  );
}

/** INC-956 — the large map's place, inside its dialog, when its code cannot download. */
function MapLargeUnavailable({ precision, audience }: MapPlaceProps) {
  return (
    <MapFrame precision={precision} {...(audience === undefined ? {} : { audience })}>
      <LoadFailedHere testid="listing-map-large-failed" refreshTestid="listing-map-large-refresh" />
    </MapFrame>
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #6
OLD-BEGIN
   * component can carry the true coordinates without revealing them.
   */
  pinLat?: number | null;
  pinLng?: number | null;
  pinPrecision?: string | null;
  /** Part L — the saved zoom; an approximate pin ignores it. */
OLD-END
NEW-BEGIN
   * component can carry the true coordinates without revealing them.
   * INC-958 — whole or absent (map/pin.ts): no pin, no map and no Maps link.
   */
  pin?: Pin | null;
  /** Part L — the saved zoom; an approximate pin ignores it. */
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #7
OLD-BEGIN
  const showSections = view.actor === "buyer";
  const hasPin = typeof view.pinLat === "number" && typeof view.pinLng === "number";
  // Turn 23 — the Location box and its tab exist only for a place of the
OLD-END
NEW-BEGIN
  const showSections = view.actor === "buyer";
  const pin = view.pin ?? null;
  const hasPin = pin !== null;
  // Turn 23 — the Location box and its tab exist only for a place of the
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #8
OLD-BEGIN
    setMapMaps(null);
    const lat = view.pinLat;
    const lng = view.pinLng;
    if (typeof lat !== "number" || typeof lng !== "number") return;
    if (view.pinPrecision !== "approx") {
      // Google's Maps URLs require the comma between lat and lng as %2C.
OLD-END
NEW-BEGIN
    setMapMaps(null);
    if (pin === null) return;
    const { lat, lng } = pin;
    if (pin.precision === "exact") {
      // Google's Maps URLs require the comma between lat and lng as %2C.
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #9
OLD-BEGIN
    // Keep the still-map module off the marketplace's first-paint graph.
    // INC-911 — a failed download is reported to the shell's one notice (the map beside it,
    // the same download, shows its own word in place).
    MAP_PREVIEW.load().then(
OLD-END
NEW-BEGIN
    // Keep the still-map module off the marketplace's first-paint graph.
    // INC-956 — a failed download is logged only: the map beside the link is the same download
    // and says so in its own place (one message, where the person is looking).
    MAP_PREVIEW.load().then(
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #10
OLD-BEGIN
      },
      (error: unknown) => reportOnDemandFailure("the map's links", error),
    );
OLD-END
NEW-BEGIN
      },
      (error: unknown) =>
        console.error(`[client-error] the map's links failed to load: ${errorText(error)}`),
    );
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #11
OLD-BEGIN
    };
  }, [view.pinLat, view.pinLng, view.pinPrecision]);
  const Title = view.actor === "buyer" ? "h1" : "h2";
OLD-END
NEW-BEGIN
    };
  }, [pin]);
  const Title = view.actor === "buyer" ? "h1" : "h2";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #12
OLD-BEGIN

              {hasPin && typeof view.pinLat === "number" && typeof view.pinLng === "number" && (
                <div className="relative isolate" data-testid="listing-detail-map">
OLD-END
NEW-BEGIN

              {pin !== null && (
                <div className="relative isolate" data-testid="listing-detail-map">
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #13
OLD-BEGIN
                      <MapFrame
                        precision={view.pinPrecision ?? "exact"}
                        {...(view.actor === "buyer" ? { audience: "buyer" as const } : {})}
OLD-END
NEW-BEGIN
                      <MapFrame
                        precision={pin.precision}
                        {...(view.actor === "buyer" ? { audience: "buyer" as const } : {})}
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #14
OLD-BEGIN
                    <MapPreview
                      lat={view.pinLat}
                      lng={view.pinLng}
                      precision={view.pinPrecision ?? "exact"}
                      zoom={view.pinZoom ?? null}
OLD-END
NEW-BEGIN
                    <MapPreview
                      lat={pin.lat}
                      lng={pin.lng}
                      precision={pin.precision}
                      zoom={view.pinZoom ?? null}
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #15
OLD-BEGIN
                          <MapLarge
                            lat={view.pinLat}
                            lng={view.pinLng}
                            precision={view.pinPrecision ?? "exact"}
                            zoom={view.pinZoom ?? null}
OLD-END
NEW-BEGIN
                          <MapLarge
                            lat={pin.lat}
                            lng={pin.lng}
                            precision={pin.precision}
                            zoom={view.pinZoom ?? null}
NEW-END

EDIT src/features/posting/step-review.tsx #1
OLD-BEGIN
import type { DraftValues } from "./use-draft";
import type { DealLists, Refusal } from "./types";
OLD-END
NEW-BEGIN
import type { DraftValues } from "./use-draft";
import type { PinPrecision } from "./map/pin";
import type { DealLists, Refusal } from "./types";
NEW-END
EDIT src/features/posting/step-review.tsx #2
OLD-BEGIN
    lng: number;
    precision: string;
    street: string | null;
OLD-END
NEW-BEGIN
    lng: number;
    precision: PinPrecision;
    street: string | null;
NEW-END
EDIT src/features/posting/step-review.tsx #3
OLD-BEGIN
            sellerMemberSince: line?.memberSince ?? null,
            pinLat: pin?.lat ?? null,
            pinLng: pin?.lng ?? null,
            pinPrecision: pin?.precision ?? null,
            pinZoom: pin?.zoom ?? null,
OLD-END
NEW-BEGIN
            sellerMemberSince: line?.memberSince ?? null,
            // INC-958 — the held pin itself (one value, the same object while it is unchanged).
            pin: pin ?? null,
            pinZoom: pin?.zoom ?? null,
NEW-END

EDIT src/features/posting/step-where.tsx #1
OLD-BEGIN
import { MapFrame } from "./map/map-frame";
import type { Refusal } from "./types";
OLD-END
NEW-BEGIN
import { MapFrame } from "./map/map-frame";
import type { PinPrecision } from "./map/pin";
import type { Refusal } from "./types";
NEW-END
EDIT src/features/posting/step-where.tsx #2
OLD-BEGIN
 * seller who never asks for a pin never downloads one. D234 S3 (INC-897) — both
 * are resilientLazy: a preview that cannot download shows the map's word in its
 * box (INC-940: map-frame.tsx), and the pin map offers "Try again", which reloads
 * the page (the draft is saved).
 */
OLD-END
NEW-BEGIN
 * seller who never asks for a pin never downloads one. D234 S3 (INC-897) — both
 * are resilientLazy: a preview that cannot download says so in its box (INC-940:
 * map-frame.tsx; INC-956: the failure and Refresh, never the loading word), and the pin
 * map offers "Try again", which reloads the page (the draft is saved).
 */
NEW-END
EDIT src/features/posting/step-where.tsx #3
OLD-BEGIN
  NoMap,
);
OLD-END
NEW-BEGIN
  NoMap,
  { inPlace: true },
);
NEW-END
EDIT src/features/posting/step-where.tsx #4
OLD-BEGIN
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
OLD-END
NEW-BEGIN
/**
 * The pin preview's place when its map cannot download: the failure and Refresh, in the still
 * map's box (INC-940 — the place holds the map's size, so the step below it never moves; INC-956
 * — never the loading word).
 */
function NoMap({ precision }: { precision: PinPrecision }) {
  return (
    <MapFrame precision={precision}>
      <LoadFailedHere testid="post-where-map-failed" refreshTestid="post-where-map-refresh" />
    </MapFrame>
NEW-END
EDIT src/features/posting/step-where.tsx #5
OLD-BEGIN
                  fallback={
                    <MapFrame precision={pin.precision ?? null}>
                      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
OLD-END
NEW-BEGIN
                  fallback={
                    <MapFrame precision={pin.precision}>
                      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
NEW-END
EDIT src/features/posting/step-where.tsx #6
OLD-BEGIN
                    lng={pin.lng}
                    precision={pin.precision ?? null}
                    zoom={pin.zoom ?? null}
OLD-END
NEW-BEGIN
                    lng={pin.lng}
                    precision={pin.precision}
                    zoom={pin.zoom ?? null}
NEW-END

EDIT src/features/posting/use-draft.ts #1
OLD-BEGIN

import { readDraft, saveDraft, type DraftBody, type DraftPhotoRow } from "./posting-service";
OLD-END
NEW-BEGIN

import type { PinPrecision } from "./map/pin";
import { readDraft, saveDraft, type DraftBody, type DraftPhotoRow } from "./posting-service";
NEW-END
EDIT src/features/posting/use-draft.ts #2
OLD-BEGIN
  lng: number;
  precision: string;
  street: string | null;
OLD-END
NEW-BEGIN
  lng: number;
  precision: PinPrecision;
  street: string | null;
NEW-END
EDIT src/features/posting/use-draft.ts #3
OLD-BEGIN
        setPhotosSoon(found.draft.photosSoon);
        setPin(
          found.draft.pinLat === null || found.draft.pinLng === null
            ? null
            : {
                lat: found.draft.pinLat,
                lng: found.draft.pinLng,
                precision: found.draft.pinPrecision ?? "exact",
                street: found.draft.streetAddress,
OLD-END
NEW-BEGIN
        setPhotosSoon(found.draft.photosSoon);
        // INC-958 — the saved pin as read, whole or absent; its precision is never guessed.
        setPin(
          found.draft.pin === null
            ? null
            : {
                ...found.draft.pin,
                street: found.draft.streetAddress,
NEW-END

EDIT src/features/posting/use-edit-draft.test.ts #1
OLD-BEGIN
    pinLat: 9.01,
    pinLng: 38.75,
    pinPrecision: "exact",
OLD-END
NEW-BEGIN
    pin: { lat: 9.01, lng: 38.75, precision: "exact" },
NEW-END

EDIT src/features/posting/use-edit-draft.ts #1
OLD-BEGIN
          setStatus(found.draft.status);
          setPin(
            found.draft.pinLat === null || found.draft.pinLng === null
              ? null
              : {
                  lat: found.draft.pinLat,
                  lng: found.draft.pinLng,
                  precision: found.draft.pinPrecision ?? "exact",
                  street: found.draft.streetAddress,
OLD-END
NEW-BEGIN
          setStatus(found.draft.status);
          // INC-958 — the saved pin as read, whole or absent; its precision is never guessed.
          setPin(
            found.draft.pin === null
              ? null
              : {
                  ...found.draft.pin,
                  street: found.draft.streetAddress,
NEW-END

EDIT src/i18n/locales/am-base.ts #1
OLD-BEGIN
  "feed.headingIn": "በ{location} ውስጥ ያሉ ማስታወቂያዎች",
OLD-END
NEW-BEGIN
  "feed.headingIn": "የ{location} ማስታወቂያዎች",
NEW-END

FILE-BEGIN src/lib/notice-outlets.ts
import { useSyncExternalStore } from "react";

/**
 * INC-955 (Foundations turn C1) — A NOTICE IS SHOWN WHERE THE PERSON IS LOOKING.
 *
 * An open dialog, sheet, drawer or alert keeps the keyboard inside itself, blocks the pointer
 * outside it and paints over the page (every one at z-50 — the last to mount wins, INC-124), so
 * a notice drawn by the shell while one is open could be neither seen, reached nor tapped (the
 * operator's walk of 2026-10-27: the map's "didn't load" notice appeared only after the dialog
 * closed). Every overlay surface therefore renders one `NoticeOutlet` inside its content, and the
 * shell's notices (src/components/shell/on-demand-notice.tsx) are drawn into the TOPMOST open
 * outlet — inside the overlay's focus scope and pointer area — or in the shell's own place when
 * no overlay is open. The outlet sits over the foot of the overlay's content (absolute, so it
 * takes no room and adds no gap; every overlay content is a fixed box, its containing block),
 * passing the pointer through but for the notice itself. Each outlet is a polite live region
 * from its first paint (a live region
 * must exist before its words arrive), with no role (an empty status would answer a page's own
 * getByRole("status") — ODN-2). scripts/conformance/notice-outlet.test.ts names every overlay
 * content that lacks one.
 */

const outlets = new Set<HTMLElement>();
const listeners = new Set<() => void>();
let top: HTMLElement | null = null;

/** The outlet painted last on the page: the one in the overlay opened most recently. */
function topmost(): HTMLElement | null {
  let last: HTMLElement | null = null;
  for (const outlet of outlets) {
    if (!outlet.isConnected) continue;
    if (last === null || last.compareDocumentPosition(outlet) & Node.DOCUMENT_POSITION_FOLLOWING)
      last = outlet;
  }
  return last;
}

function changed(): void {
  const next = topmost();
  if (next === top) return;
  top = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * An overlay's outlet, as its element's ref: registered while the element is on the page; the
 * returned cleanup (React 19) unregisters it. React types a callback ref with `null` too.
 */
export function registerNoticeOutlet(element: HTMLElement | null): (() => void) | undefined {
  if (element === null) return undefined;
  outlets.add(element);
  changed();
  return () => {
    outlets.delete(element);
    changed();
  };
}

/** The topmost open overlay's outlet, or null when no overlay is open (and on the server). */
export function useTopNoticeOutlet(): HTMLElement | null {
  return useSyncExternalStore(
    subscribe,
    () => top,
    () => null,
  );
}
FILE-END src/lib/notice-outlets.ts

EDIT src/routes/l.$slug.tsx #1
OLD-BEGIN
import { useCallback, useEffect, useRef, useState } from "react";
OLD-END
NEW-BEGIN
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
NEW-END
EDIT src/routes/l.$slug.tsx #2
OLD-BEGIN
  const view = adPageView(doc, language);
OLD-END
NEW-BEGIN
  // INC-958 — one view (and one pin) per document and language, so the map effects run once.
  const view = useMemo(() => adPageView(doc, language), [doc, language]);
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

INC-961 (later word, 2026-10-28): the red of run 40615073357 (turn K3's landing, `e1045fb4`): ODE-1 failed on both tries in lane 13 with "apiResponse.text: Response has been disposed" — turn 34c-4's guard threw on a page that was still open because its DOCUMENT had gone (the test's own Refresh, the app's one reload). FIXED in Foundations turn C1, first: "gone" is the page closed or its main frame navigated since the handler began, waiting up to 2 s for the navigation that explains the error (e2e/helpers/route-guard.ts `routeDocumentGone`; RG-4/5, RG-4 red on BASE's guard); a disposed response on an unmoved, open page still throws.
INC-955 (later word, 2026-10-28): FIXED in Foundations turn C1 — every modal overlay's content (dialog, alert, sheet, drawer, the shell's phone panel) draws a NoticeOutlet (src/components/ui/notice-outlet.tsx over src/lib/notice-outlets.ts), and the shell's notice is drawn inside the topmost open one, where the person can see, reach and tap it (ODN-3; CF-NO-1/2).
INC-956 (later word, 2026-10-28): FIXED in Foundations turn C1 — the ad page's and the wizard's maps say the failure and Refresh in their box (`inPlace`, LoadFailedHere in MapFrame; LDF-1, AP-55), and every resilientLazy fallback matches its way of saying so (CF-RLF-1/2).
INC-957 (later word, 2026-10-28): the instance FIXED in Foundations turn C1 — DEC-281's heading (am-base.ts, code points checked); the class (the single-line slots at 360 in every platform's font) stays OPEN with the Foundations locale and format work.
INC-958 (later word, 2026-10-28): FIXED in Foundations turn C1 — one `Pin` value (src/features/posting/map/pin.ts: `PinPrecision`, `readPin`, `NEW_PIN_PRECISION`) read in four places (the draft, the last post, the seller's place, the ad page's document); the maps take a known precision; no reader guesses one (PIN-1…5; CF-PIN-1/2). Its census found the draft's and the edit's prefill doing the same, and the maps drawing an unknown precision as exact — all moved; the door's own default is INC-963.

Numbering: next free INC-964.
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
| 52 | A piece fetched on demand whose download fails tells the person and offers the one cure, a refresh — the browser keeps a failed module download for the page's life, so asking again cannot help (INC-911, INC-918) | `src/lib/on-demand-failure.ts` (`reportOnDemandFailure(label, error)`: one `[client-error] <label> failed to load: …` line and the shell's notice; `refreshPage`) + `src/components/shell/on-demand-notice.tsx` (`OnDemandNotice`, drawn once by the shell above the phone's bar — or, while a modal overlay is open, inside the topmost one's `NoticeOutlet` (`src/components/ui/notice-outlet.tsx`; the register `src/lib/notice-outlets.ts`), where the person can reach it (INC-955, Foundations turn C1), `common.loadFailed` with Refresh and Close; `LoadFailedHere`, the same words and Refresh in a piece's own place) — `resilientLazy` reports for every component it fetches (`{ inPlace: true }` when its fallback says so: the pin map); the overlay facades report a menu's and a dialog's code, and a modal's owner hears `onUnavailable` (the step-up gate: StepUpUnavailable); the sign-in screen's actions answer `common.loadFailed` in place | `scripts/conformance/on-demand-failure.test.ts` (ODC-1: every caller of a definer's loader — imported under any name or through a namespace — or of a same-file loadOnce answers through the mechanism or has its allowlist line, and each call handles its own failure (a handler, or an await inside a try; a do-nothing handler only as a warm-up beside a call that handles it; resilientLazy's own calls; a factory judged by the loader it returns); ODC-2: planted silent, exported and drawing-only callers; ODC-3: the definers; ODC-4: planted aliased, namespaced and mention-only callers, a warm-up, a lazy component and a factory — 34b-2's reviewer, MAJORs 1–2, closed in turn 34b-3; ODC-5: an empty `catch {}`, a handler that only returns undefined, `.then(ok, undefined)` and `.catch(undefined)` — 34b-3's reviewer, closed in turn 34b-4); `scripts/conformance/notice-outlet.test.ts` (CF-NO-1: every modal overlay's content draws a NoticeOutlet; CF-NO-2: planted); `scripts/conformance/resilient-fallbacks.test.ts` (CF-RLF-1: an in-place fallback draws LoadFailedHere, a notice-reporting one says no words of its own — INC-956; CF-RLF-2: planted); ODF-1/2, ODN-1, ODN-3, LDF-1, AP-55, RLZ-2/3, OVF-9/16/17/18/19/20/21/22, SUG-1, ASC-1, PMD-1, PLF-1, DF-6, SLG-3; `e2e/on-demand-failure.spec.ts` (ODE-1), SBE-4/5 | `scripts/conformance/on-demand-failure-allowlist.txt` (four for good: the E2E client hand-off; the sign-in screen's in-place answer, INC-915; its head start; a route loader's error screen; the ten consumers of turn 34b-2's lines moved onto it in turn 34b-3) | a new loader joins DEFINERS and its callers are enumerated by themselves; a new piece answers with one call or one element | the shell's notice is one polite live region, shown again by a later failure; a piece that says so in place does not also report; the tab's one reload for a stale chunk (INC-640) runs first, at a page's first failure only (INC-922); a late failure of an older ask tells nobody, and an owner that closed the modal meanwhile hears no stale closing (turn 32b's reviewer; OVF-21/22, turn 34c-3); `useStringsLayers()` offers no retry (turn 34c-3); Foundations turn 34b-2 |
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
  - [ ] Foundations turn C1 (docs/governance/briefs/foundations-turn-c1.md; no migration; the Claude Code executor; G0) — three concerns: a pin is whole or absent, its precision known (INC-958; src/features/posting/map/pin.ts; CF-PIN-1/2); a notice is shown where the person is looking (INC-955; NoticeOutlet in every modal content; CF-NO-1/2); a piece that cannot download says so once, in the right place (INC-956; CF-RLF-1/2; AP-55). With INC-961 first (the route guard reads a reloaded document as gone; RG-4/5), DEC-281 (INC-957's instance) and INC-962 (the nightly's zone check, NH-6).
NEW-END

EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn K3 (2026-10-28; DEC-277, DEC-278, DEC-282, INC-941, INC-944; register rows 37, 59 and 63, new; Lovable) — the nightly starts at 11:30 New York all year: two schedules (15:30 and 16:30 UTC) and an `hour` job (scripts/ci/nightly-hour.sh, NH-1…5) that lets only the one at 11 o'clock New York go on. THE CHECKS run once per code tree: `bun .claude/hooks/land.ts --checks` runs them alone, pushes nothing and caches each green step, and the landing finds them green (EXH-24; the protocol's step 5 and the turn-report skill). Every action a CI step uses declares its own deadline (DEC-282's ceilings until DEC-276's measurement), pip and git's downloads run through the retrying wrapper and the semgrep rules are fetched as the pinned commit only (CF-CID-1's six rules, CF-CID-2's eight planted breaches). A failed backend start writes the database's busy sessions at its last sample (INC-944). CF-LINT-1/2 gain a floor (CF-LINT-4). .claude/rules/20-tests.md names `layoutBoxes`. Records R7: spec-ledger block S80, INC-955–INC-961, S458–S461, bundle 22's turn lines ticked, three launch-gate lines settled. No product code, no migration, no string.
OLD-END
NEW-BEGIN
- Foundations turn K3 (2026-10-28; DEC-277, DEC-278, DEC-282, INC-941, INC-944; register rows 37, 59 and 63, new; Lovable) — the nightly starts at 11:30 New York all year: two schedules (15:30 and 16:30 UTC) and an `hour` job (scripts/ci/nightly-hour.sh, NH-1…5) that lets only the one at 11 o'clock New York go on. THE CHECKS run once per code tree: `bun .claude/hooks/land.ts --checks` runs them alone, pushes nothing and caches each green step, and the landing finds them green (EXH-24; the protocol's step 5 and the turn-report skill). Every action a CI step uses declares its own deadline (DEC-282's ceilings until DEC-276's measurement), pip and git's downloads run through the retrying wrapper and the semgrep rules are fetched as the pinned commit only (CF-CID-1's six rules, CF-CID-2's eight planted breaches). A failed backend start writes the database's busy sessions at its last sample (INC-944). CF-LINT-1/2 gain a floor (CF-LINT-4). .claude/rules/20-tests.md names `layoutBoxes`. Records R7: spec-ledger block S80, INC-955–INC-961, S458–S461, bundle 22's turn lines ticked, three launch-gate lines settled. No product code, no migration, no string.

- Foundations turn C1 (2026-10-28; INC-961 first — the red of turn K3's run; INC-955, INC-956, INC-957's instance — DEC-281, INC-958, INC-962; register rows 52, 57 and 64, new; the Claude Code executor) — first, the route guard reads a reloaded document as gone (ODE-1 failed on both tries in turn K3's run: a disposed response on a page whose document had gone; RG-4/5). Then a pin is one value, whole or absent, its precision the table's own (src/features/posting/map/pin.ts; the draft, the last post, the seller's place and the ad page read it through `readPin`; the maps take a known precision; CF-PIN-1/2). A notice is shown where the person is looking: every modal overlay's content draws a NoticeOutlet and the shell's "didn't load" notice is drawn inside the topmost open one (CF-NO-1/2). A map whose code cannot download says the failure and Refresh in its own box, inside the large map's dialog too (LDF-1, AP-55), and every resilientLazy fallback matches its way of saying so (CF-RLF-1/2). The Amharic Home heading is "የ{location} ማስታወቂያዎች" (DEC-281). The nightly's hour check refuses a machine without time-zone files (INC-962, NH-6). No migration; no new string.
NEW-END
```
