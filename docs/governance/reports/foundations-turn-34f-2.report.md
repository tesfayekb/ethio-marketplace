# Turn 34f-2 — turn 34f whole: a late part holds its box, a test reads a layout whole, and the ad page's place names come with the page (INC-940, INC-947)
Base: 0586d7f28089e02d75d6b896a4661edd836df284 · Final commit: 44791c7 · Brief: docs/governance/briefs/foundations-turn-34f-2.md (sha256 b711cbee541e5364752f87eac216516f9d7b454cc2b7d46b278ff2525b647461), continuing docs/governance/briefs/foundations-turn-34f.md (sha256 7f9bfad207162934af763bbdf9c3b9989dcbc50326f07a8a06cf8105faf6bf27)
Review: READY · 0 BLOCKER · 3 MAJOR · 6 MINOR · on 44791c7

## 1. Done / not done, by part and step

Turn 34f (as its stop 1 recorded): Part A, STEP 0 (939bb01), Parts B–C (c8d7c65), Part D (7bf6c4f), Part E (74efae6), THE CHECKS — done. THE END-TO-END CHECK red (ALS-1 on mobile-360, 32 px) → stop 1 (0026bd3, landed). Its end-to-end check, review and report are done here.

Turn 34f-2, all done:
- Part A: `git rev-parse HEAD origin/dev` → `0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d` twice (= BASE); `git diff --name-only BASE..origin/dev` empty; CI SUCCESS on BASE (section 11); e2e-last-failure.md: "last E2E run 40560297547 passed"; guards-last-failure.md: "No failed build/guard jobs in this run."
- STEP 0: brief saved, `sha256sum` b711cbee…7461, `wc -c` 36974 (both as stated); roadmap line 3 edited; commit 6e171d2.
- Part B: blocks applied (`EDIT src/features/ad-page/public-listing.test.ts #1` · `EDIT src/features/posting/preview/listing-detail-map.test.tsx #1` · `applied 2 block(s) to 2 file(s)`); red shown, not committed (section 5).
- Part C: blocks applied (`EDIT src/features/posting/preview/listing-detail.tsx #1` · `#2` · `EDIT src/features/ad-page/public-listing.ts #1` · `applied 3 block(s) to 2 file(s)`); green; parts B–C commit faba99f.
- Part D: dry run and real run printed exactly the 7 expected EDIT lines and `applied 7 block(s) to 5 file(s)`; grep → `5356:## INC-947 — text a page draws fr` · `5360:## INC-948 — PW-30 fails whenever` · `5366:Numbering: next free INC-949.`; `sed -n 3p roadmap.md | cut -c1-80` → `The brief in force: docs/governance/briefs/foundations-turn-34f-2.md (Foundation`; commit 44791c7.
- THE CHECKS, THE END-TO-END CHECK, THE INDEPENDENT REVIEW: done (sections 5, 7).

## 2. Files changed

`git diff --name-only 0586d7f28089e02d75d6b896a4661edd836df284` (plus this report):

```
docs/_changelog.md
docs/features/ad-page.md
docs/features/e2e-harness.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-34f-2.md
docs/governance/briefs/foundations-turn-34f.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-34f-2.report.md
docs/governance/reports/foundations-turn-34f.stop-1.md
docs/tracking/incidental-findings.md
e2e/ad-page-layout.spec.ts
e2e/ad-page.spec.ts
e2e/helpers/ui.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/holds-its-box.test.ts
scripts/conformance/layout-reads-allowlist.txt
scripts/conformance/layout-reads.test.ts
src/features/ad-page/public-listing.test.ts
src/features/ad-page/public-listing.ts
src/features/posting/map/map-frame.test.tsx
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/still-map.ts
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx
```

New files (`git ls-files` lists each; `git ls-tree 0586d7f2 scripts/conformance/` lists none of the four censuses): the two briefs, the stop-1 report, e2e/ad-page-layout.spec.ts, scripts/conformance/holds-its-box{.test.ts,-allowlist.txt}, scripts/conformance/layout-reads{.test.ts,-allowlist.txt}, src/features/posting/map/map-frame{.tsx,.test.tsx}, src/features/posting/map/still-map.ts, and this report.

## 3. Behaviour contract

| Surface | At 0586d7f2 | Now |
| --- | --- | --- |
| Ad page Location box, still map loading or failed | text place, box grows when the map arrives | MapFrame: the still map's box, word and caption from the first paint (turn 34f) |
| Still map's provider credit | a line under the map | on the box at its foot (turn 34f) |
| Wizard pin preview | same as the ad page | MapFrame, same (turn 34f) |
| Ad page title-box place link and Location place line | drawn after the country tree loads | drawn from `placeList` (server document, coverage order) from the first paint (34f-2) |
| Owner's, staff's, wizard's ListingDetail views | names from the tree | unchanged (tree; INC-947) |
| Ad page layout tests (AP-36 … AP-50) | boxes read one by one | boxes read together once still via layoutBoxes; same thresholds (turn 34f) |

Three differences beyond the briefs' wording were found by the review. They are listed under section 10 for a ruling.

## 4. Censuses

Turn 34f (from its stop 1, at BASE): `grep -rn "resilientLazy(\|= lazy(\|<Suspense" src … | grep -v test` → 24 lines (23 sites + the doc comment in src/lib/resilient-lazy.ts:10); `grep -rc "boundingBox()" e2e` → 202 in 19 files (e2e/ad-page.spec.ts 59).

Turn 34f-2 K1 (at BASE, before any change):
```
src/features/posting/preview/preview-sheet.tsx:92:        {body ?? <ListingDetail {...view} />}
src/features/admin-listings/listing-page.tsx:491:              <ListingDetail
src/features/my-listings/my-listing-page.tsx:632:            <ListingDetail
src/routes/l.$slug.tsx:197:      <ListingDetail
---
273:  const places = view.coverage
399:  const query = mapsPlaceQuery(nodes, view.coverage) || places.join(", ");
400:  const placesMaps = webPlaceUrl(query);
401:  const placesApp = appPlaceUrl(query);
794:                    <span data-testid="listing-detail-places">{places.join(", ")}</span>
1137:                <p className="text-sm text-muted-foreground">{places.join(", ")}</p>
```
4 lines and 6 lines, as expected.

## 5. Tests

Turn 34f (from stop 1): Part B red — 3 failed | 3 passed (6): MFR-2, LDM-1, HB-1; ALS-1 red on both projects (Received 196). Part C green — 62 files, 456 tests; ALS-1 2 passed. Part D red — BX-1 failed (1 failed | 1 passed); green 2 passed. Unit 333 files, 2016 tests.

Turn 34f-2:
- B2 red (shown, not committed): `Tests  2 failed | 10 passed (12)` — AV-9 (`AssertionError: expected undefined to deeply equal [ { id: 'b', nameEn: 'Bole' }, …(1) ]`), LDM-2 (`Unable to find an element by: [data-testid="listing-detail-places"]`).
- C2 green: `Test Files  6 passed (6)` · `Tests  67 passed (67)`.
- Unit suite: `Test Files  333 passed (333)` · `Tests  2018 passed (2018)`.
- End-to-end, `bun run e2e:local -- e2e/ad-page-layout.spec.ts e2e/ad-page.spec.ts e2e/post-wizard-where.spec.ts e2e/post-wizard-place.spec.ts`: `Running 148 tests using 2 workers` · `5 skipped` · `143 passed (18.4m)`. `[ssr-error]` lines: 0. ALS-1 ✓ on mobile-360 and desktop-1280. PW-30 ✓ on both projects in this run, against the brief's expectation of red (INC-948; nothing changed for it). The 5 skips are AP-42, AP-45 and AP-50 on mobile-360 and AP-37 and OVW-1 on desktop-1280; stop 1's run also had 5 skipped.
- `bun run e2e:local -- e2e/ad-page-layout.spec.ts`, alone, twice: `2 passed (17.2s)` and `2 passed (16.9s)`; `[ssr-error]` 0 both times. That makes three green ALS-1 runs, one inside the full run.
- ALS-1 and PW-30 bodies: CI's e2e-last-failure.md on BASE has none ("last E2E run 40560297547 passed"). Stop 1's bodies: ALS-1 [mobile-360] `e2e/ad-page-layout.spec.ts:56`: `Expected <= 0.5, Received 32`; PW-30 [both projects] `e2e/post-wizard-place.spec.ts:782` "PW-30: no place was chosen" (`post-where-chosen` data-count 0).
- J-audit: nothing under e2e/ changed in 34f-2 (`git diff 0026bd30 --stat -- … e2e …` empty). Turn 34f's e2e changes were reviewed: scratch seller and ad, afterEach cleanup, no `.first()`, no `waitForTimeout`, and a positive control (`heldCount > 0`).

## 6. K2 — siblings that bypass the mechanism

Greps: the two K1 greps above; `grep -rn placeList src` (only adPageView sets it); the reviewer's `useCountryTree` consumer read. One sibling found outside the brief's lists: `src/features/posting/listing-preview.tsx:107, :114–123` repeats the coverage → `useCountryTree` → `entityName` naming and draws place text after the paint in the wizard (step-review.tsx:656, wizard.tsx:1020). It is out of scope and not touched; it belongs to INC-947's census. The other `useCountryTree` consumers (location-selector :119, app-shell :203, step-where :670, :918) are pickers or the shell, not this concern.

## 7. Allowlists and guards

- `[HB-1] late parts: 13; outside the mechanism: 11; allowlist: 11`
- `[BX-1] tests and helpers reading boxes by themselves: 68; reads: 142; allowlist: 68`
- scripts/conformance/holds-its-box-allowlist.txt: 0 (absent at BASE) → 11; scripts/conformance/layout-reads-allowlist.txt: 0 (absent) → 68 (`grep -cvE '^\s*(#|$)'`); 34f-2 changed neither.
- The two censuses: `Test Files  2 passed (2)` · `Tests  5 passed (5)`.
- Hash list: all 8 lines OK.
- `git diff 0026bd30 --stat -- supabase e2e package.json bun.lock AGENTS.md .claude .github`: empty.
- Lint: `✖ 39 problems (0 errors, 39 warnings)`. Typecheck: clean. i18n:usage: `1736 keys across 595 files`, no change. Build: exit 0. format:check: "All matched files use Prettier code style!".
- check-bundle-size: `JS: 205.1 KiB / 207 KiB — ok` · `CSS: 20.5 KiB / 40 KiB — ok`. These are the same two lines stop 1 recorded on turn 34f's tree and on a BASE build. `/l/$slug` is `245.5 / 247 KiB`.

## 8. Strings

None. `git diff --stat 0586d7f2 -- src/i18n` is empty. `git diff --stat 0026bd30 -- docs/generated/i18n-usage.json public/i18n-usage.json src/i18n` is empty. Turn 34f's map changes are usage maps only.

## 9. Migrations

None (`git diff --stat -- supabase` empty).

## 10. Departures

- Turn 34f stop 1: ALS-1 was red on mobile-360 at 32 px. It was ruled by brief 34f-2 (place names from the document). Neither of stop 1's options (a) or (b) was taken.
- Turn 34f: the two i18n usage maps landed in the B–C commit c8d7c65, not in Part E, because the map guard regenerated them during Part B (recorded in stop 1).
- PW-30 passed in this turn's full run, against the brief's expectation of red. This is reported only; INC-948's text, imported as written, is unchanged.
- The review's three MAJOR findings. Each comes from the supervisor's block text, so none is fixed here and each is for a ruling:
  1. **The large map's failure state changed.** MapLarge's fallback, MapUnavailable (listing-detail.tsx :55–77), now draws MapFrame (the 192 px box and its caption) inside the large-map dialog instead of one line of text. Brief 34f said "no behaviour changes" for that allowance.
  2. **Places the tree hides are now named.** `places.list` (20261017105751 :157–166) joins listing_locations to locations with no `is_active` filter, which I confirmed by reading it. `get_location_tree` (20260915190024 :47–63) keeps only active places under active ancestors. So the ad page can now name a coverage place that has since been deactivated, which the tree hid. Brief 34f-2 said "the same names as before"; this holds only while every coverage place is active. No test covers it.
  3. **The Maps link appears earlier, with a different href at first.** The title-box Maps link (`listing-places-maps`, :404) now renders from the first paint with a names-only query ("Bole, Addis Ababa"). It switches to the ancestor-path query when the tree arrives, and stays names-only if the tree fails. Before, the link appeared only after the tree. AP-41 passes once the tree has loaded.
- The review's six MINOR findings, not fixed (the brief's exact text does not allow it), for a ruling:
  - the usage-maps commit placement (above);
  - a new `view.pinPrecision ?? "exact"` in the Suspense fallback (listing-detail.tsx :1170), copying the existing defaults at :1179 and :1218;
  - the listing-preview.tsx sibling (section 6);
  - some AP-36 and AP-41 `expect.poll` assertions became one-shot reads after layoutBoxes, none looser;
  - HB-1 passes every consumer, not every finding, to `readAllowlist`, so a stale allowance whose part now holds its box would not fail;
  - the comment at e2e/post-wizard-where.spec.ts:931 still says the credit is "as text under the map" (outside scope).

## 11. CI

Two-step read of `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`. The commit is 0026bd30, the last landed commit, which is this turn's BASE:
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d` (short `0026bd3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-27T18:54:35Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40560297547
```
This landing's run has not completed.

## 12. Limits

- The browser runs were local against ethio-staging, in fake mode. CI on the temporary backends is the full proof.
- PW-30's cause was not read (INC-948). It passed once here, which does not show the cause is gone.
- The review's MAJOR 2 (inactive coverage places) was confirmed by reading the SQL only. No database was queried, and I did not check whether any live ad's coverage holds an inactive place.
- The operator's Flake check (turn 34f's judge) is not mine to run.
