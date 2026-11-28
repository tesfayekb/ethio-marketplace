# CURSOR BUNDLE 8c-2b — report
Base: b355cbe00 · Final commit: f52f91eb1 · Brief: docs/governance/briefs/cursor-bundle-8c-2b.md (sha256 1bfb1679f4fb5da3618f89c017cd3911ab18f4d13ed29975863e74c521eb0139)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on f52f91e

CI at the start of the turn (the base): `ci-status.md` on ci-evidence for `b355cbe0011991a9a20246b233dcdfcef8c0e906`: Conclusion **FAILURE**, completed 2026-11-28T03:40:31Z, run 46102310512. That red is this turn's Part A (KAU-6, TR-14, CO-6), fixed first.

## 1. Done / not done, by part and step
- STEP 0: done (brief saved by scripted copy, sha256 above equal; `check-go.ts … --at b355cbe00` read "no finding" on the saved brief; `origin/dev` still `b355cbe0011991a9a20246b233dcdfcef8c0e906`, so BASE = HEAD and no stale anchor).
- STEP 1 (census into §2): done.
- STEP 2, Part A — `b3df98d57`: a Field reports to its gate from a layout effect (KAU-6, KAU-13 red first); TR-14 and CO-6 fixed at their causes; both specs' assertions byte for byte.
- STEP 3, Part B — `018ee8a9d`: INC-1340 (one accessor, the route class, the feed), INC-1341 (the pin's refusal), INC-1313 (eight mocks, CF-MOCK-1), INC-1338 (FNC-4), INC-1339 (DOORS-23), S1.10 and S7s6.11 off the allowlist, `wired.test.ts` names CF-MOCK-1, FNC-4, DOORS-23.
- STEP 4, Part C — `02b672163`, amended by `f52f91eb1`: one `isCardTwin(page, boundary)` (INC-1336, CF-HELPERS-15); provider-errors by symbol (INC-1320, PEF-5 re-pointed, PEF-6); CF-BRIEF-25 widened to the `user-cases` item with CF-BRIEF-27 and the template's sentence (S830).
- STEP 5, docs — `a81936fc1`: `user-facing-list.md` (DEC-498's sentence, from the saved brief by script), `e2e-harness.md`, `ci-guards.md`, `forms.md`, and a sentence in `route-client.md`.
- Ceilings — `8a2dab0d9`: `/admin/places` 323 → 324 (§7, §10).
- STEP 6: done, §5 and §12. STEP 7: pushed once; pull request https://github.com/tesfayekb/ethio-marketplace/pull/123. STEP 8: this report.
- Not done: nothing the brief asked for. WebKit and the repeat lane are CI's (§12).

## 2. Files changed  (`git diff --name-only b355cbe00`, 65 paths)
```
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/features/forms.md
docs/features/route-client.md
docs/features/user-facing-list.md
docs/governance/briefs/cursor-bundle-8c-2b.md
docs/governance/go-template.md
docs/tracking/intentional-deletions.txt
e2e/admin-attributes-editor.spec.ts
e2e/admin-attributes-library.spec.ts
e2e/admin-countries.spec.ts
e2e/admin-errors.spec.ts
e2e/admin-guides.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-locations.spec.ts
e2e/admin-monetisation.spec.ts
e2e/admin-screening.spec.ts
e2e/admin-translations-data.spec.ts
e2e/helpers/admin-attributes.ts
e2e/helpers/categories.ts
e2e/helpers/countries.ts
e2e/helpers/layout.ts
e2e/helpers/locations.ts
roadmap.md
scripts/brief/go-laws.ts
scripts/conformance/briefs.test.ts
scripts/conformance/door-words-allowlist.txt
scripts/conformance/door-words.test.ts
scripts/conformance/door-words.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/route-client.test.ts
scripts/conformance/user-facing-allowlist.txt
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/components/forms/field.tsx
src/components/forms/use-form-gate.ts
src/components/marketplace/feed-states.test.tsx
src/components/marketplace/feed.tsx
src/components/shell/failure-notice.census.test.ts
src/features/ad-page/ad-page-refusals.test.ts
src/features/ad-page/ad-page-refusals.ts
src/features/admin-attributes/attributes-page.test.tsx
src/features/admin-countries/country-import-dialog.test.tsx
src/features/admin-locations/location-import-dialog.test.tsx
src/features/admin/users/access-refusals.ts
src/features/feed/use-feed.test.ts
src/features/posting/map/geocode.test.ts
src/features/posting/map/map-pin-dropper-offline.test.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/map/map-pin-gate.test.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/step-where-no-map.test.tsx
src/features/posting/step-where.test.tsx
src/features/posting/step-where.tsx
src/features/seller/use-seller-feed.test.ts
src/lib/error-report-send.test.ts
src/lib/reader-failure.ts
src/lib/refusal.test.ts
src/lib/refusal.ts
src/lib/route-client.test.ts
src/lib/route-client.ts
src/routes/auth-forms.test.tsx
src/test/provider-errors.test.ts
src/test/provider-errors.ts
```
New files (`git ls-files` proof, each tracked): `docs/governance/briefs/cursor-bundle-8c-2b.md`. One file was added and removed inside the branch: `scripts/fixtures/e2e-helpers/admin-guides-b355cbe00.ts.txt` (a whole-file capture of the plant; a path outside the brief's SCOPE, so Part C's amended last commit removes it, with `[intentional-delete]` and a line in `docs/tracking/intentional-deletions.txt`; the plant is now the base's four lines, inline).

### The census (STEP 1), by the brief's items
- **The form gate's reach** (`rg -l "useFormGate" src`, non-test files, 24): `src/features/admin-ai/ai-feature-form.tsx`, `admin-attributes/attribute-dialogs.tsx`, `admin-categories/category-dialogs.tsx`, `admin-countries/country-editor.tsx`, `admin-locations/location-dialogs.tsx`, `location-editor.tsx`, `location-verb-dialogs.tsx`, `admin-monetisation/market-dialog.tsx`, `override-dialog.tsx`, `price-dialog.tsx`, `product-editor.tsx`, `admin/impersonation/impersonation-starter.tsx`, `admin/legal/legal-editor-form.tsx`, `legal-page.tsx`, `legal-publish-dialog.tsx`, `legal-version-view.tsx`, `admin/roles/roles-list.tsx`, `admin/translations/delete-language-dialog.tsx`, `languages-page.tsx`, `admin/users/user-detail.tsx`, `posting/wizard.tsx`, `routes/auth.tsx`, `routes/auth_.reset.tsx`, `routes/settings.tsx`. `rg -l "<Field\b" src` (non-test): 56 files. Every one of them reaches the gate through the one `Field`, which is the only file the gate change touches (`src/components/forms/field.tsx`): a Field now reports in the commit that draws it. A submit that arrived before a Field's report was held open before and is held closed now; no form passes anything else differently. Each form's own tests ran unchanged inside the whole `src` run (§5). The wizard's steps report through `gate.report` from their own effects (`src/features/posting/wizard.tsx:287-298`), not through a Field: not changed (§13).
- **The route's own 400 codes** (`src/routes/api/feed.ts:45-60, 82-84, 153-160`): 404 `unknownCategory`, `unknownPlace`; 400 `badCategory`, `badPlace`, `badSize`, `badCursor`. `src/routes/api/seller.ts:36-41, 102`: 400 `badKey`, `badCursor`, `badSize`; 404 `unknownSeller`. Every one is one camelCase word at a status below 500: a refusal now (RCL-26), the feed's `unknownPlace` also clears the saved place, and the other 400 codes show no Retry. Sentence bodies (`bad request`, `src/server/route.ts:173, 186, 344`) are not a code and stay `malformed` (§13).
- **The pin door's codes** (`set_listing_pin`, newest declaration `supabase/migrations/20261115203900_cf5771ed-622d-47a3-a7b4-cbc76afa1bd6.sql`, lines 62-109, called at `src/features/posting/posting-service.ts:1269-1288`) and the words the sheet now draws, from `src/features/posting/refusal-text.ts` (`DRAFT_REFUSALS`): `notYourListing` (line 55) · `pinNotEditable` (117) · `streetTooLong` (116) · `directionsTooLong` (115) · `contactInNote` (67) · `badLatitude`, `badLongitude`, `badZoom` (111-113, one line `post.refusal.badPinPlace`) · `badPrecision` (114, `post.pin.chooseShow`) · and the dial's `rateLimited` (53). A failure that names no code (network, server) keeps the sheet's own `post.pin.saveFailed`.
- **`use-feed.test.ts`**: the mock is at line 17, the brief says 18; the file is in the eight (the brief's count of eight automock sites: `attributes-page`, `country-import-dialog`, `location-import-dialog`, `use-feed`, `geocode`, `posting-service`, `use-seller-feed`, `error-report-send`; read at `b355cbe00` with `git grep`).
- **`isCardTwin`**: 8 definitions at the base (COUNT run at `b355cbe00`), listed in the brief; 0 now (`rg -n "function isCardTwin|const isCardTwin =" e2e` → only `e2e/helpers/layout.ts:44`). Callers by boundary: 1024 px (`helpers/countries.ts`, `helpers/admin-attributes.ts`, `helpers/locations.ts`, `admin-screening`, `admin-guides`, `admin-monetisation`, and `admin-errors`, `admin-attributes-editor`, `admin-attributes-library`, `admin-locations` through their helpers' `TWIN_BOUNDARY`); 928 px (`helpers/categories.ts`); 1280 px (`admin-listings`).
- **`uf:` ids**: `uf:S1.10` on `src/components/marketplace/feed-states.test.tsx:180` (UFP-5b); `uf:S7s6.11` on `src/features/posting/map/map-pin-gate.test.tsx:133` (PGT-U5). Their two allowlist lines are gone.
- **First download**: §5 (chunk by chunk).

## 3. Behaviour contract — answer tables before → after
| Screen / function | At `b355cbe00` | Now |
|---|---|---|
| Feed, the route answers 404 `unknownPlace` for a saved place | `routeFailure` made it `malformed`; the feed read a `.code` field a route failure never carries, so the clearing at `feed.tsx` never ran and the person kept a failed feed | the code is read by `refusalCode`; the place is cleared, the feed reloads, one line (`failure.placeCleared`) says so (UFP-5b) |
| Feed, the route's own 400 (`badCategory`, `badPlace`, `badSize`, `badCursor`) | class `malformed` → the notice's `server` kind with a Retry that cannot succeed | class `refused` → no Retry (UFP-5, RCL-26); a 400 with no body code stays `malformed` (RCL-26) |
| Pin sheet, a refused `set_listing_pin` | `savePin` returned `false`; the sheet always drew `post.pin.saveFailed` | `savePin` returns `PinAnswer`; the sheet draws the posting family's words for the door's code (PGT-U5); a failure with no code draws `post.pin.saveFailed` and the next save clears the line (PGT-U6) |
| Reset form, a submit dispatched before its Fields reported | the gate had no report, so it passed the blank pair as "nothing missing" (KAU-13 red on the base `Field`) | the gate holds it and refuses per field before any length check (KAU-13); KAU-6 unchanged |
| Every other form | a Field reported in a passive effect | a Field reports in a layout effect: the same report, one task earlier; nothing else differs |
| `refusalCode` (was `ad-page-refusals.ts`) | returned `""` for a failure naming nothing | `refusalCode` in `src/lib/refusal.ts` returns `string \| null` (a typed absence); its callers read `null` |
| `access-refusals.ts` SQLSTATE read | an inline cast of `.code` | `failureSqlstate(error)`, no cast |

## 4. Censuses
- `rg -n "function isCardTwin|const isCardTwin =" e2e` → `e2e/helpers/layout.ts:44` only.
- `rg -n "isCardTwin\(page\)" e2e` → none (every call passes its boundary).
- `git grep -E 'vi\.(do)?[mM]ock\(\s*["\x27](@/lib/route-client|[./]+/route-client)'` at HEAD: 16 sites in `src/` and the planted strings in `scripts/conformance/route-client.test.ts`; each `src/` site spreads `importOriginal`.
- `rg -n "as unknown as|: any\b|@ts-ignore|@ts-expect-error|\.only\(|waitForTimeout|\.first\(\)" ` over the added lines of `git diff b355cbe00 -- src scripts e2e` → none; no added `!` assertion, no `eslint-disable`.
- `rg -n "VITE_|api[_-]?key|secret|password|bearer"` over the added lines → none.

## 5. Tests
**Ids added or changed.** KAU-13 (new, `src/routes/auth-forms.test.tsx`); RCL-26 (new, `src/lib/route-client.test.ts`); RFR-13, RFR-14 (new, `src/lib/refusal.test.ts`, the accessor; they replace ARF-1, removed from `ad-page-refusals.test.ts` with the function it tested); UFP-5 (extended) and UFP-5b (new, `feed-states.test.tsx`); PGT-U5, PGT-U6 (new, `map-pin-gate.test.tsx`; their `onSave` mocks now answer `PinAnswer`); RTW-23 (new, `posting-service.test.ts`, `savePin`'s answer; its first draft's ids RTW-21/22 were taken, TI-1); CF-MOCK-1 (new, `scripts/conformance/route-client.test.ts`); FNC-4, FNC-4b, FNC-4c (new, `failure-notice.census.test.ts`); DOORS-23 (new, `door-words.test.ts`); CF-HELPERS-15 (new, `e2e-helpers.test.ts`; the long CF-HELPERS-1 → 14 census test's title now reads → 15 and `isCardTwin` joined `COPIED_NAMES`); PEF-3 (changed: the source form accepts `<file>#<symbol>` for our own code and rejects `<file>:<line>` for it), PEF-5 (re-pointed to the symbol's body), PEF-6 (new); CF-BRIEF-27 (new, `briefs.test.ts`); `wired.test.ts` names CF-MOCK-1, FNC-4, DOORS-23, CF-HELPERS-15. Assertions that changed shape: PEF-3's source expectations (above), the pin tests' `onSave` return type, the eight mocks' factories (they now spread the module).

**Red-first (this turn, on the base's code).**
- KAU-13 on the base `Field` (`git show b355cbe00:src/components/forms/field.tsx`): `× KAU-13 …` (1 failed | 1 passed | 8 skipped); green on the fix.
- RCL-26 on the base `reader-failure.ts`: `× RCL-26 …` (1 failed | 30 skipped).
- UFP-5b on the base `feed.tsx`: `× UFP-5b …` (1 failed | 1 passed | 7 skipped).
- PGT-U5 and PGT-U6 on the base `map-pin-dropper.tsx`: both `×` (2 failed | 4 skipped).
- Each file was put back from `git show HEAD:<path>`; `git status --short` empty after.
- Guards planted on their base text: CF-MOCK-1 on `use-feed.test.ts` at `b355cbe00` (its line 17, byte for byte); FNC-4 on the place step's two branches at `3c9086dc0`; DOORS-23 on a family that leaves a gone code to its generic; CF-HELPERS-15 on `admin-guides.spec.ts` at `b355cbe00` lines 67–70; PEF-6 on the moved line (forty lines above; the old line-keyed read of `user-client.ts:237` on that file reads `status,` instead of the answer); CF-BRIEF-27 on a case bullet with neither word.

**Totals.** `bunx vitest run src scripts --maxWorkers=3`: 687 files passed, 4501 passed | 1 skipped (4502). Each of the 24 changed test files run alone: all pass (the list is in `/tmp/ethio-scratch/cursor-bundle-8c-2b/changed-tests.txt`). KAU-6 and KAU-13 alone (`-t "KAU-6|KAU-13"`: 2 passed | 8 skipped) and with the whole `src/routes` folder (36 files, 213 tests passed). `bun run typecheck` clean (both projects). `bun run lint` clean (`eslint . --max-warnings 0`).

**`bun run checks`** on the final code tree (`f52f91eb1`), its fast line and last line:
```
checks (fast): 25 PASS · 0 FAIL · 670s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 36 PASS · 0 FAIL · 26 NOT RUN · 745s
```
NOT RUN, each by the script's own reason: scope › Decide whether the lanes run, Index the code tree (the Actions API's artifacts exist only in a GitHub run); build-and-check › Workflow lint (actionlint is a linux/x64 binary; this machine is darwin/arm64); the four `Install dependencies` steps (build-and-check, component-tests, i18n-usage-map, bundle-budget) and e2e-preflight's three install/cache steps (dependencies are installed; a package change is its own turn); secrets-scan (gitleaks, linux/x64 binary); dependency-audit › Install, Audit (the advisory service is not reachable); e2e-preflight › Migration parity preflight (needs the staging credentials, which the script never holds); the six e2e merge steps (they merge the browser lanes' GitHub artifacts); the four promote steps (only CI promotes); semgrep › Upload SARIF and the warning that follows it (GitHub's code-scanning upload). An earlier run of the same command on the tree before the last commit stopped at `No unexplained deletions` (the fixture file added in one commit and removed in the next, which that guard reads as `HEAD^..HEAD`): fixed at its cause (the marker and the deletions line, §10), and the whole command run again.

**Browser runs** (`bun run e2e:local`, `--project=mobile-360 --project=desktop-1280 --retries=0`, ethio-staging, `E2E_*` set; the specs run whole as the brief asks):
- `e2e/admin-translations-data.spec.ts` and `e2e/admin-countries.spec.ts`: 28 passed (2.6m).
- The eight spec files that call `isCardTwin` (`admin-errors`, `admin-attributes-editor`, `admin-guides`, `admin-screening`, `admin-monetisation`, `admin-listings`, `admin-attributes-library`, `admin-locations`): 311 passed | 3 skipped (23.4m), 0 failed. The skips are the specs' own `test.skip` branches (`admin-locations.spec.ts:911, 930` among them).
- Beyond the brief, because their helper (`helpers/categories.ts`) changed: `e2e/admin-categories-console.spec.ts`: 31 passed | 3 skipped (3.0m).
- `[ssr-error]`: `rg -c "ssr-error"` over the three run logs → 0 lines. Logs: `/tmp/ethio-scratch/cursor-bundle-8c-2b/e2e-parta.log`, `e2e-twin.log`, `e2e-cat.log` (read in full by that count and by the pass lines; the operator's to keep or remove).
- J-audit: there is no J-audit script in `scripts/`, `package.json` or the docs (searched); the J laws' guards (`e2e selector self-test`, CF-HELPERS-1…15, `e2e-helpers.test.ts`) ran inside `bun run checks` and `vitest scripts` and passed.

**First download** (build of `b355cbe00` in `/tmp/ethio-scratch/cursor-bundle-8c-2b/base/`, a `git archive` copy; and the final tree; both `bun run build`, gzipped, `node scripts/check-bundle-size.mjs` with its page line at 3 decimals; each page, base → now, KiB): the entry `index-*.js` 147.1 → 147.2 (JS 209.1 → 209.2 of 210); the pages' range is −0.076 … +0.068. Chunk by chunk, gzipped bytes of every chunk whose size moved by 10 B or more (the other 146 chunks that moved did so by 1–9 B each — the renamed chunk addresses in the entry's map and the chunks' import lists, the same few bytes earlier ceilings' lines name; no chunk was added or lost: `dist/.chunk-modules.json` of both builds name the same set of chunks):
```
ad-page-refusals.js                      633 -> 526 B (-107)
admin.monetisation.js                    15749 -> 15734 B (-15)
admin.users_._userId.js                  5095 -> 5067 B (-28)
feed.js                                  3850 -> 3837 B (-13)
index.js                                 150642 -> 150700 B (+58)
map-pin-dropper.js                       4152 -> 4216 B (+64)
posting-service.js                       6507 -> 6527 B (+20)
reader-failure.js                        1425 -> 1447 B (+22)
wizard.js                                64083 -> 64149 B (+66)
```
Causes: `index.js` +58 B — `src/lib/refusal.ts` sits in the entry and gained `refusalCode` and `failureSqlstate`, and the renamed chunk addresses; the entry's module list is the same set. `reader-failure.js` +22 B — `FailureSource` and the route class; it is still its own chunk (it is not in the entry: `dist/.chunk-modules.json` puts `src/lib/reader-failure.ts` in `reader-failure-*.js` only; the weight guards pass). `shared-shell.js` (holds `route-client.ts`) 32325 B on both. `map-pin-dropper.js` +64 B (the refusal state and `draftRefusalText`). `wizard.js` +66 B and `posting-service.js` +20 B (`PinAnswer`, `PIN_NOT_SAVED`, the returned answer). `ad-page-refusals.js` −107 B (the local `refusalCode` left it for `refusal.ts`). `feed.js` −13 B (the inline cast went). `admin.users_._userId.js` −28 B (the inline SQLSTATE cast went). Nothing unexplained. Every page, base → now:
```
/ 228.447 -> 228.477 (+0.030) ceiling 229
/$name 226.367 -> 226.410 (+0.043) ceiling 227
/account 271.460 -> 271.519 (+0.059) ceiling 272
/account_/legal 211.053 -> 211.104 (+0.051) ceiling 212
/account_/legal_/$versionId 212.424 -> 212.475 (+0.051) ceiling 213
/account_/saved 228.769 -> 228.720 (-0.049) ceiling 230
/admin 218.088 -> 218.138 (+0.050) ceiling 219
/admin/ 218.897 -> 218.945 (+0.048) ceiling 220
/admin/ai 314.318 -> 314.363 (+0.045) ceiling 315
/admin/attributes 329.688 -> 329.738 (+0.050) ceiling 331
/admin/audit 302.990 -> 303.023 (+0.033) ceiling 304
/admin/categories 364.138 -> 364.173 (+0.035) ceiling 365
/admin/countries 320.242 -> 320.289 (+0.047) ceiling 321
/admin/errors 245.110 -> 245.173 (+0.063) ceiling 246
/admin/errors_/$group 243.760 -> 243.826 (+0.066) ceiling 245
/admin/images 218.729 -> 218.775 (+0.046) ceiling 220
/admin/impersonation_/$sessionId 246.980 -> 247.013 (+0.033) ceiling 248
/admin/legal 295.537 -> 295.586 (+0.049) ceiling 296
/admin/legal_/$versionId 291.694 -> 291.746 (+0.052) ceiling 293
/admin/legal_/edit 295.358 -> 295.406 (+0.048) ceiling 296
/admin/listings 340.098 -> 340.138 (+0.040) ceiling 341
/admin/listings_/$listingId 340.935 -> 340.859 (-0.076) ceiling 342
/admin/listings_/$listingId_/edit 423.287 -> 423.271 (-0.016) ceiling 424
/admin/locations 282.193 -> 282.246 (+0.053) ceiling 283
/admin/monetisation 324.105 -> 324.140 (+0.035) ceiling 325
/admin/places 322.575 -> 322.621 (+0.046) ceiling 323
/admin/roles 304.425 -> 304.456 (+0.031) ceiling 305
/admin/roles_/$roleId 284.225 -> 284.258 (+0.033) ceiling 285
/admin/screening 360.965 -> 360.891 (-0.074) ceiling 362
/admin/translations 320.823 -> 320.861 (+0.038) ceiling 322
/admin/translations_/$lang 321.851 -> 321.905 (+0.054) ceiling 323
/admin/users 302.187 -> 302.220 (+0.033) ceiling 303
/admin/users_/$userId 303.152 -> 303.164 (+0.012) ceiling 304
/auth 224.814 -> 224.862 (+0.048) ceiling 226
/auth_/callback 210.500 -> 210.558 (+0.058) ceiling 211
/auth_/reset 217.918 -> 217.970 (+0.052) ceiling 219
/c/$slug 228.447 -> 228.477 (+0.030) ceiling 229
/dev/primitives 232.973 -> 233.014 (+0.041) ceiling 234
/dev/style 268.060 -> 268.082 (+0.022) ceiling 269
/dev/tall 209.456 -> 209.511 (+0.055) ceiling 210
/l/$slug 254.428 -> 254.364 (-0.064) ceiling 255
/legal/$kind 213.433 -> 213.489 (+0.056) ceiling 214
/legal/accept 219.104 -> 219.149 (+0.045) ceiling 220
/legal/publishing 214.809 -> 214.877 (+0.068) ceiling 216
/my-listings 315.864 -> 315.904 (+0.040) ceiling 317
/my-listings_/$listingId 326.270 -> 326.219 (-0.051) ceiling 327
/my-listings_/$listingId_/edit 410.861 -> 410.860 (-0.001) ceiling 412
/post 410.840 -> 410.838 (-0.002) ceiling 412
/post_/$listingId 410.804 -> 410.803 (-0.001) ceiling 412
/privacy 213.227 -> 213.276 (+0.049) ceiling 214
/settings 284.049 -> 284.084 (+0.035) ceiling 285
/terms 213.222 -> 213.271 (+0.049) ceiling 214
```
Only `/admin/places` crossed DEC-296's NEAR band (322.575 → 322.621); its ceiling is raised (§7). The check now reads `0 NEAR`.

## 6. K2 — siblings that bypass the mechanism
Greps run: `rg -n "viewportSize\(\)\?*\.width" e2e`; `rg -n "\.code" src/features src/components` for a read of a refusal's code off a failure; `rg -n "useFormGate|reportMissing" src`; `git grep` of the route-client mocks; `rg -n "failed\s*(\?|&&)|\.error\s*(\?|&&)" src --glob "*.tsx"` through FNC-4's own scan.
- Card-twin rule written inline by another name, not through `isCardTwin`: `e2e/admin-services.spec.ts:285, 362` (boundary 1024), `e2e/my-listings-promote.spec.ts:592` (1280), `e2e/admin-categories-console.spec.ts:548` (its own `width < TWIN_BOUNDARY`), `e2e/helpers/categories.ts:71-73` (`bandOnly` reads the width against the boundary): outside the brief's list of callers of the name; CF-HELPERS-15 judges a definition of the name, not a width compared with a number. Left.
- Failure branches that draw their own sentence: the seven FNC-4 allowance lines (§7, §13), each a place FNC-4 found that needs more than the drop-in.
- Gone codes a family leaves to its generic words: the five DOORS-23 lines (§7).
- Route answers whose body is a sentence (`bad request`, `src/server/route.ts:173, 186, 344`): not a code, so not a refusal by RCL-26; they stay `malformed`. Left.

## 7. Allowlists and guards
- `scripts/conformance/user-facing-allowlist.txt`: 131 → 129 lines (S1.10 and S7s6.11 removed; their tests carry `uf:`).
- `scripts/conformance/door-words-allowlist.txt`: 30 → 35 lines. New (each `gone <family> <code> | reason | until`, `until` 2026-12-31): `gone MOVE_REFUSALS ownerDeleted` (`src/features/admin-listings/listing-refusals.ts`), `gone DECISION_REFUSALS notYourListing` (`src/features/admin-screening/use-screening.ts`), `gone IMPORT_REFUSALS parentMissing` and `unknownCountry` (`src/features/admin/import-dialog.tsx`), `gone PROFILE_EDIT_REFUSALS unknownUser` (`src/features/admin/users/admin-users-service.ts`). Each is a family outside Fix B's scope whose words are its stated reason; the lines fall when the family words `failure.gone`.
- `src/components/shell/failure-notice.census.test.ts` `BRANCH_ALLOW`: 7 lines, each `path::<the branch's line> | reason | until` (until 2026-12-31): `listings-page.tsx::{mayReview && reportsQuery.error && (`; `map-pin-dropper.tsx::{state === "failed" && (`; `step-photos.tsx::{item.state === "failed" && …`; `step-specifications.tsx::{held.state === "failed" && (`; `step-where.tsx::{pinState === "failed" && (`, `{(dirState === "failed" || dirState === "rateLimited") && (`, `{(noteState === "failed" || noteState === "rateLimited") && (`.
- `scripts/conformance/e2e-helpers-allowlist.txt`: 48 → 48 (no change).
- `docs/tracking/intentional-deletions.txt`: +1 line (the inline-plant fixture, §2).
- `scripts/route-budgets.mjs`: `/admin/places` 323 → 324, DEC-296's form (`ceilingForLocal(322.621)` = 324), cause on the line; the page was 0.046 KiB larger than the base, which put it inside the 0.3 KiB band. No other page is inside the band (the check's own NEAR list: none).
- Guard self-tests run: `scripts/conformance/route-client.test.ts` (CF-MOCK-1), `failure-notice.census.test.ts` (FNC-4/4b/4c), `door-words.test.ts` (DOORS-23), `e2e-helpers.test.ts` (CF-HELPERS-15), `src/test/provider-errors.test.ts` (PEF-5, PEF-6), `briefs.test.ts` (CF-BRIEF-25, 27 and the check-go planted run), `wired.test.ts`, `test-ids.test.ts`, `budget-band.test.ts`, `bundle-closure.test.ts`, `scripts/check-deletions.sh` (self-test, then the real run). All pass.

## 8. Strings
None. The brief's flag is `no-new-string`; no `t(` key was added or changed (`bun run i18n:usage` changes nothing committed: the maps are built, not committed, since cursor-bundle-8b). The pin sheet reuses `post.refusal.*`, `post.pin.chooseShow` and `post.pin.saveFailed`; the feed reuses `failure.placeCleared`.

## 9. Migrations
None (flag `no-migration`; `git diff --name-only b355cbe00 -- supabase` is empty).

## 10. Departures
- **KAU-6's cause.** The brief names the form gate passing a submit before its Fields report. Confirmed and fixed at the cause: `Field` reported in a passive `useEffect`, so a submit dispatched in the commit that drew the form met a gate with no report. The report is now a `useLayoutEffect` (`src/components/forms/field.tsx`); KAU-13 (red on the base `Field`) dispatches the submit from a MutationObserver before passive effects. No form's behaviour changed beyond "a submit before its Fields reported is held".
- **TR-14's cause** (`e2e/admin-translations-data.spec.ts`, INC-1342). Hypotheses refuted by what I read: the Data scope's own code and the roster were not at fault. The cause, read from the failing CI run's artifact: `createScratchLocation` took the first active region of any kind (`.limit(1).single()`), which could be a scratch region of a test running beside it; that test's `destroyLocation` removes every row below its region by parent, this test's city and its translations with it. The parent is now `regionUnder("ET")`, the harness's one reader of a SEEDED region; the assertions are untouched.
- **CO-6's cause** (`e2e/admin-countries.spec.ts`, INC-1343). The rail dialog lists every active root category and its save sends the whole list; the door refuses the list when an id in it is no longer an active root. A test beside CO-6 that seeds or removes a root category between the dialog's read and the save made it refuse. CO-6 carries `{ tag: "@global-state" }` so the smoke lane runs it at one worker; its body and assertions are byte for byte.
- **Whether a route's 400 class is marked in `routeFailure` or read by `classify`** (DECIDE-AND-NAME): marked. `routeFailure` passes a `"route"` source to `readFailed`, and `classify` reads a code-shaped head at a status below 500 as `refused` only for that source; a door's own answers are unchanged. The accessor is `refusalCode(failure): string | null` (and `failureSqlstate`) in `src/lib/refusal.ts`.
- **The twin export's home and signature**: `isCardTwin(page: Page, boundary: number): boolean` in `e2e/helpers/layout.ts` (the file that already says what layout a page draws). A page with no viewport reads as wide, as every old copy did.
- **The fixture's marker**: `<file>#<symbol>`; PEF-5 reads the symbol's declaration and its body.
- **CF-HELPERS-15's plant is inline**, not a whole-file fixture: I first captured the base's whole file under `scripts/fixtures/e2e-helpers/`, which is not a path in SCOPE; the amended last commit (before any push) removed it and put the base's four lines (67–70) in the test, as `git show` prints them; the finding's line is 2 in that excerpt (line 68 of the file).
- **CF-BRIEF-25's findings keep the id CF-BRIEF-25**; CF-BRIEF-27 is the planted test of the widened law, as the brief says. A `user-cases` item with no bullets is CF-BRIEF-23's to judge, not a finding of the widened law.
- **Test ids**: RTW-21/22 and the first DOORS-23 / CF-MOCK-1 plants collided with ids in use (`scripts/test-ids.test.ts`); renamed RTW-23, merged census and plant into one `it` for DOORS-23 and CF-MOCK-1, named the extra FNC cases FNC-4b/4c.
- **A `docs/features/route-client.md` sentence** (not in the brief's four docs; inside the standing allowance for `docs/features/**`), for RCL-26's class.
- **`e2e/admin-categories-console.spec.ts` run** beyond the brief's list (its helper changed).
- No STOP, no ruling.

## 11. CI
- The base: the first lines of `ci-status.md` for `b355cbe0011991a9a20246b233dcdfcef8c0e906` (read with `git show origin/ci-evidence:docs/tracking/ci-status.md`, the SHA matches `origin/dev`): `Conclusion: FAILURE`, completed 2026-11-28T03:40:31Z, run 46102310512. Its reds (KAU-6 in the component tests, TR-14 and CO-6 in the browser lanes; lane logs and artifacts read from the run) are Part A.
- Logs read for the three reds: the failing job logs and the lane artifacts of that run (downloaded under `/tmp/ethio-scratch/cursor-bundle-8c-2b/`); the logs of lanes that passed were not read.
- This pull request's own runs: one run, https://github.com/tesfayekb/ethio-marketplace/actions/runs/46117003671, on `f52f91eb1e82979806a391522854d27d3af6eae7` (the last code commit; the pull request's head): conclusion SUCCESS, completed 2026-11-28T06:51:26Z; `gh pr checks 123`: 43 pass, 2 skipping (the Lovable branch guard and Promote to main, both skipped by their own conditions), 0 fail, 0 pending. The branch's `ci-status.md` on ci-evidence (`docs/tracking/branches/cursor/bundle-8c-2b/ci-status.md`) names the same commit and run, Conclusion SUCCESS, and reads `Lanes: ran` (no earlier proven code tree to reuse, so every lane ran). No red on this pull request, so no re-run and no fix commit. The lane logs themselves were not read (every check passed); the verdict is the checks'.

## 12. Limits
- WebKit (`webkit-1280`, `webkit-390`), the repeat lane's real time and the merged tree are CI's and the supervisor's; I ran Chromium only (`mobile-360`, `desktop-1280`), on ethio-staging.
- Specs that call `isCardTwin` through a helper only (`admin-countries`, `admin-categories-console` aside) were not run whole locally beyond the lists above; CI's lanes run every spec.
- `bun run checks` NOT RUN steps: listed in §5, each with the script's reason.
- Local numbers: the first-download numbers are from local builds (CI measures about 0.1 KiB more); the ceiling line says so.
- The sandbox refused git hooks in one test (`check-go --at` self-test) when run inside the sandbox; the same tests pass outside it (that is how `bun run checks` runs them).

## 13. Findings
- **FNC-4's seven allowed branches** (§7): `src/features/admin-listings/listings-page.tsx` (`mayReview && reportsQuery.error`: one table-level notice owed), `src/features/posting/map/map-pin-dropper.tsx` (`state === "failed"`: draws the family's words, INC-1341), `src/features/posting/step-photos.tsx` (a failed upload's Retry control), `src/features/posting/step-specifications.tsx` (`held.state === "failed"`: no error to hand the notice), `src/features/posting/step-where.tsx` (`pinState`, `dirState`/`rateLimited`, `noteState`/`rateLimited`: action failures with no error object). To be numbered and planned; until 2026-12-31.
- **DOORS-23's five gone codes** (§7): `ownerDeleted`, `notYourListing` (screening decision), `parentMissing`, `unknownCountry`, `unknownUser` are worded by their families' generic line, which says "failed" where the row is gone (INC-1279's class, second occurrence). Each family is outside this lane's scope.
- **Route sentence 400s** (`src/server/route.ts:173, 186, 344`, `bad request`; `bad query`): a client sees a Retry-able `malformed` for a shape the person's input could fix; they carry no code to read. A route-envelope code for a refused shape would let RCL-26 classify them (a new mechanism, not this lane's).
- **The wizard's steps report to the gate from their own effects** (`src/features/posting/wizard.tsx:287-298`, `reportMissing`), passive like `Field` was: a submit from a step in the commit that drew it has the same window KAU-13 closed for the Field. Not changed (the brief's tolerance: no form changes beyond the Field's report).
- **Inline card-twin rules** (§6): `e2e/admin-services.spec.ts:285, 362`, `e2e/my-listings-promote.spec.ts:592`, `e2e/admin-categories-console.spec.ts:548`, `e2e/helpers/categories.ts:71-73`.
- **A `createScratchLocation` pattern**: `e2e/helpers/posting.ts:269` and `e2e/helpers/locations.ts:282` both exclude scratch regions (`not like`), so no sibling takes "any active region"; none to fix.
- **A rule that misled me**: `bun run checks`' `No unexplained deletions` reads `HEAD^..HEAD`, so a file added and removed inside one branch needs the marker too, while CI's push range nets it out; it cost one rerun.
- Security: none. The route client's refusal detail still travels as data (`failureDetail`), never as a sentence or HTML; a code the accessor cannot read is `null`. Read: `src/lib/refusal.ts` `refusalCode`, `src/lib/route-client.ts` `routeFailure`, `src/features/posting/refusal-text.ts` `draftRefusalText` (it words by key; a code outside the family reads the generic).

## 14. Records
- DEC — DEC-500 (the supervisor's, G17; it amends DEC-499) — Cursor 8c-2b carries three fixes: the red board first (KAU-6, TR-14, CO-6), a refusal or failure as the screen reads it (INC-1340, INC-1341, INC-1313, INC-1338, INC-1339), and the harness's small debts (INC-1336, INC-1320, S830's law, DEC-498 in the list's document). WebKit (INC-1328, DEC-483) moves to Cursor 8c-3, the lane of browser tests. Why: a Cursor lane carries at most three fixes, and the red board goes first (§8).
- DEC — DEC-498 (the supervisor's, G17) — a link is tested on its own screen. A row whose control is a plain link is answered by a component test that checks its role, its name (taken from the catalogue) and where it points; the test never follows the link. A row is Cursor's only when its proof needs the browser past the screen: a server write, a navigation done by code, a sign-in that ends, a download, or a return to the page you came from. (This text is also in `docs/features/user-facing-list.md`.)
- INC — INC-1227 (KAU-6's instance): fixed. Cause: `Field` reported its blank to the gate from a passive effect, after the commit that drew it; a submit dispatched in that window met a gate with no report and passed. Fix: the report is a layout effect inside the commit; KAU-13 red first.
- INC — INC-1342 (TR-14): fixed. Cause: `createScratchLocation` parented onto the first active region of any kind, which could be a scratch region another test removed by parent. Fix: `regionUnder("ET")`, a seeded region.
- INC — INC-1343 (CO-6): fixed. Cause: the rail dialog's save sends every active root category and the door refuses a list holding an id that is no longer an active root; a test beside it that seeds or removes a root category in that window made it refuse. Fix: CO-6 is `@global-state`, run serially.
- INC — INC-1340: fixed. Cause: a route's own coded 400 was classed `malformed` (a Retry that cannot succeed), and the feed read a `.code` field a route failure does not carry, so a gone saved place was never cleared. Fix: `routeFailure` marks its source, a code-shaped body code below 500 is `refused`, the one accessor `refusalCode` (`src/lib/refusal.ts`) serves every reader; RCL-26, UFP-5, UFP-5b, RFR-13, RFR-14.
- INC — INC-1341: fixed. Cause: `savePin` reduced the door's refusal to a boolean, so the sheet always drew the generic line. Fix: `PinAnswer` carries the code; the sheet words it in the posting family's words; PGT-U5, PGT-U6, RTW-23.
- INC — INC-1313: fixed. Cause: eight route-client mocks returned only `{ callRoute … }`, leaving `routeFailure` absent so a failure was built by no real path. Fix: each spreads `importOriginal`; CF-MOCK-1 refuses the next.
- INC — INC-1338: fixed (the census), its hits listed. Cause: FNC judged a file once it drew the notice anywhere, so a second failure branch drawing its own sentence went unseen. Fix: FNC-4 judges each branch; seven branches that need more than the drop-in are allowed, dated 2026-12-31 (§13).
- INC — INC-1339: fixed (the census), its hits listed. Cause: a family's generic line worded a gone code ("could not be saved — try again") where the row is gone (INC-1279's class). Fix: DOORS-23; five codes allowed, dated 2026-12-31 (§13).
- INC — INC-1336: fixed. Cause: eight copies of one rule with one boundary each. Fix: `isCardTwin(page, boundary)` in `e2e/helpers/layout.ts`; CF-HELPERS-15.
- INC — INC-1320: fixed. Cause: `src/test/provider-errors.ts` quoted our own route by file and line, so PEF-5 reddened when the line moved. Fix: `<file>#<symbol>`; PEF-5 re-pointed, PEF-6 planted on a moved line.
- INC — S830's law: landed as CF-BRIEF-27 (CF-BRIEF-25 widened to the `user-cases` item).
- register row — the form gate's row (DEC-339), amended: "a Field reports its blank to its gate from a layout effect, inside the commit that draws it, so a gate holds a submit until its drawn Fields have reported (KAU-13)."
- register row — the route client's row and the failure reader's row, amended: "a route's own answer below 500 with a code-shaped body code is a refusal (`refused`), read through the one accessor `refusalCode` in `src/lib/refusal.ts`; a route answer with no code stays `malformed` (RCL-26); a test's mock of the route client keeps the module's exports (CF-MOCK-1)."
- register row — the failure notice's row and the refusal families' row, amended: "FNC-4 judges each failure branch, not the file; DOORS-23 refuses a gone code a family leaves to its generic words; the pin sheet words `set_listing_pin`'s refusals in the posting family's words."
- register row — a new row: "a table's card twin in tests" → `isCardTwin(page, boundary)`, `e2e/helpers/layout.ts` → CF-HELPERS-15 → exceptions: none.
- changelog — cursor-bundle-8c-2b: the form gate waits for its Fields (KAU-13); a route's own coded 400 is a refusal and the feed clears a gone saved place and shows no Retry for its own codes (INC-1340); the pin sheet words the door's refusal (INC-1341); CF-MOCK-1, FNC-4, DOORS-23, CF-HELPERS-15, PEF-6, CF-BRIEF-27 land; one `isCardTwin`; TR-14 and CO-6 fixed at their causes; `/admin/places` ceiling 323 → 324 (DEC-296).
- roadmap — tick the Cursor 8c-2b line; WebKit (INC-1328, DEC-483) is Cursor 8c-3's.
- slip — none.
