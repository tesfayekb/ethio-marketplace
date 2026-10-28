STOP — turn C1 part E: AP-55 is red at mobile-360 with Part E applied (E3) — the still map's Leaflet download raises the shell's notice inside the dialog
DONE: part A; STEP 0; part B (B1, B2); part C (C1, shown red, not committed); part D (D1, shown red, not committed); part E (E1, E2; E3 green on desktop-1280 only)
LEFT: part E (E3 on mobile-360, and e2e/ad-page.spec.ts's AP-55 block — applied, run, and NOT committed: a spec file not fully green is not committed, .claude/rules/20-tests.md); part F; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: (the last landed commit is BASE)
# CI Status (auto-generated — do not edit by hand)

- Commit: `e1045fb435f97e39f5e983e04b674eb07380b5d5` (short `e1045fb`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-28T01:44:35Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40615073357
Two-step check: the reported commit equals BASE (e1045fb4) — current for BASE. The red is lane 13's ODE-1 ("apiResponse.text: Response has been disposed", e2e-last-failure.md, shard 13, desktop-1280) — INC-961, fixed in part B (2a14876).
FILES:
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-c1.md
e2e/helpers/route-guard.ts
public/i18n-usage.json
roadmap.md
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

## The red (E3), with its body

`bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-55 "` against Part E's app (ethio-staging, both projects, 0 retries):

```
  ✓  1 [desktop-1280] › e2e/ad-page.spec.ts:1150:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-55 offline, Enlarge: the large map's place says it did not load and offers Refresh, inside the dialog (9.7s)
  ✘  2 [mobile-360] › e2e/ad-page.spec.ts:1150:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-55 offline, Enlarge: the large map's place says it did not load and offers Refresh, inside the dialog (19.5s)
  1 failed
  1 passed (27.8s)

    Error: expect(locator).toHaveCount(expected) failed
    Locator:  getByTestId('on-demand-failed')
    Expected: 0
    Received: 1
    > 1174 |       await expect(page.getByTestId("on-demand-failed")).toHaveCount(0);
```

Every step before line 1174 passed at 360: the large map's place in the dialog said `common.loadFailed`, no "Map pin", Refresh reachable and focused. The page's client errors at 360:

```
console.error: [client-error] the map failed to load: Failed to fetch dynamically imported module: http://127.0.0.1:4173/assets/leaflet-src-DcPcSViW.js
console.error: [client-error] the large map failed to load TypeError: Failed to fetch dynamically imported module: http://127.0.0.1:4173/assets/map-large-B1SOxK_I.js
```

The failure's page snapshot (error-context.md) shows the dialog "Location" holding BOTH messages: the large map's in-place LoadFailedHere (the alert with Refresh, focused) AND the shell's notice, drawn in the dialog's NoticeOutlet (Refresh and Close).

## The cause (read from the code and the run, not guessed)

- The second line is the large map's own failure: `resilientLazy(…, "the large map", MapLargeUnavailable, { inPlace: true })` — logged only, as the brief intends.
- The first line is a DIFFERENT download: the still map's Leaflet library. `MapPreview` (src/features/posting/map/map-preview.tsx :71–:75) loads Leaflet only when its box nears the screen on the buyer's page (`useNearViewport`, D234 S1), and its catch (:112–:116) calls `reportOnDemandFailure("the map", error)` — the shell's notice.
- At 1280 the still map is near the screen at load, so Leaflet downloads before the test goes offline: green. At 360 the still map is below the fold; clicking "Enlarge map" scrolls it near WHILE OFFLINE, its Leaflet download fails, and the shell's notice is raised — now, by Part E's own design, inside the topmost dialog. The cause is the page's geometry at 360, so the red is expected on every run at that width (one run; no repeat run was made, DEC-184).
- The same pattern sits in map-large.tsx :75–:78 (`reportOnDemandFailure("the large map", error)` when Leaflet fails after the large map's own module arrived).

## Why this is a STOP

Behaviour contract (c) says a map whose code cannot download "raises no second notice", and E3 must be green on both projects. Making it so needs a change no block of the brief makes — either the product (map-preview.tsx's Leaflet catch, and map-large.tsx's, saying so in place instead of reporting to the shell — both files are in SCOPE but the brief's blocks only retype their precision), or AP-55 itself (waiting for the still map's Leaflet before going offline, or scoping the count). HOW TO WORK: "every block is applied ONLY by `bash scripts/brief/apply-blocks.sh` … never retyped, never edited or reflowed by hand"; .claude/rules/00-executor-protocol.md: "These are STOPs: … a departure from the brief's behaviour contract beyond its numbered CHANGEs; … a census hit the brief did not anticipate". K2 siblings found: src/features/posting/map/map-preview.tsx:115 and src/features/posting/map/map-large.tsx:77 (a Leaflet download's failure reported to the shell's notice while the map's place says nothing in place).

QUESTION for the ruling: which side moves — (1) the two Leaflet catches answer in place (the map's box draws LoadFailedHere, logged only), with CF-RLF or a sibling census covering them; or (2) AP-55 waits for the still map's Leaflet (or scrolls it near) before going offline; or another ruling. Its block(s) would be applied as the ruling words them.

## What was committed (green-shaped)

- 6831e81 STEP 0 — brief saved (sha256 1261973e0ae808786811402da71a1d797885e6e0354ed6731b2ed0585190d8d9, 152216 bytes — equal to the carrying message).
- 2a14876 part B — B1 red on BASE's guard: `Tests  1 failed | 4 passed (5)` (RG-4: "promise rejected "Error: apiResponse.text: Response has bee…" instead of resolving"); B2: `Test Files  2 passed (2)`, `Tests  7 passed (7)`; typecheck clean; lint `0 errors, 39 warnings`; `bun run e2e:local -- e2e/on-demand-failure.spec.ts`: `2 passed (28.8s)`, `[ssr-error]` lines 0.
- 7ac1138 parts C–E without e2e/ad-page.spec.ts — E1: `applied 81 block(s) to 29 file(s)`; E2: `Test Files  147 passed (147)`, `Tests  877 passed (877)`; typecheck clean; lint `0 errors, 39 warnings`; i18n maps `2 files changed, 18 insertions(+), 2 deletions(-)` (committed).

## Red-first lines shown (not committed)

- K1: `grep -rn "pinLat\|pinLng\|pinPrecision" src e2e scripts … | wc -l` → 55; `grep -rni 'precision ?? "' src … | wc -l` → 6; modal contents → src/components/shell/app-rail.tsx, src/components/shell/toolbar-panel.tsx, src/components/ui/alert-dialog.tsx, src/components/ui/dialog.tsx, src/components/ui/drawer.tsx, src/components/ui/sheet.tsx (all three as expected).
- C1: `Test Files  6 failed (6)`, `Tests  5 failed | 8 passed (13)` — CF-PIN-1 79 findings (63 loose fields, 6 guessed precisions, 10 column reads; the first `src/features/ad-page/public-listing.test.ts:158 a pin's loose field \`pinLat\``); CF-NO-1 5 (toolbar-panel.tsx:68, alert-dialog.tsx:34, dialog.tsx:49, drawer.tsx:38, sheet.tsx:66); CF-RLF-1 3 (listing-detail.tsx:50, :55, step-where.tsx:56); NH-6 "expected +0 to be 2"; LDF-1 "Unable to find an element by: [data-testid="listing-detail-map"]" (on BASE the `pin` prop does not exist, so the map's box is not drawn at all — the brief expected "no listing-map-failed in the map's box"; red either way); on-demand-notice.test.tsx does not load (`Failed to resolve import "@/components/ui/notice-outlet"`).
- D1: `2 failed` — `getByTestId('listing-map-dialog').getByTestId('listing-map-large-failed')` element(s) not found, both projects.

## Departure so far

- The brief's code-point line (`… | python3 -c '…'`) was refused by the Bash guard ("no inline interpreter code"). The code points were read instead with `tr`/`iconv`/`od` (read-only): `U+12E8 U+121B U+1235 U+1273 U+12C8 U+1242 U+12EB U+12CE U+127D` — equal to the expected line.
- STEP 0's brief file was written by a scratchpad script that read the carrying message from the session transcript (not retyped); its sha256 and byte count equal the message's.
