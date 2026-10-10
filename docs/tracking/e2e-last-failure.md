# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38017839254
- Commit: `252215801e7a9f55809569a3191801c1ef853bc5`
- Attempt: 1
- Written (UTC): 2026-10-10T02:57:09.961Z
- Passed: 23 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

91 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hh<n>ald: e<n>e_par_<n>q<n>z → e<n>e_chi_qqcmvx` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wesm<n>i: e<n>e_par_f<n>p<n>qz → e<n>e_chi_zjj<n>mi` (quiet) | 1 | shard 4 |
| `listing not found` | 1 | shard 3 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hh<n>ald: e<n>e_par_<n>q<n>z → e<n>e_chi_qqcmvx ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wesm<n>i: e<n>e_par_f<n>p<n>qz → e<n>e_chi_zjj<n>mi ×1

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-10T02:42:01.980Z | 0.2 min |
| changed | 2026-10-10T02:42:05.957Z | 4.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `feed-screens.spec.ts` | 22 | 8.5 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `feed-screens.spec.ts` › FS-4 nothing in the chosen place: the invitation first, then the wider place | mobile-360 | 31.1 s |
| `feed-screens.spec.ts` › FS-9 four listings in the chosen place: no invitation | mobile-360 | 31.0 s |
| `feed-screens.spec.ts` › FS-9 four listings in the chosen place: no invitation | desktop-1280 | 30.4 s |
| `feed-screens.spec.ts` › FS-3 the page reaches beyond the chosen place, names the wider place, and invites in the chosen one | mobile-360 | 29.7 s |
| `feed-screens.spec.ts` › FS-3 the page reaches beyond the chosen place, names the wider place, and invites in the chosen one | desktop-1280 | 29.1 s |
| `feed-screens.spec.ts` › FS-11 signing out keeps the place this browser chose (INC-532) | desktop-1280 | 27.7 s |
| `feed-screens.spec.ts` › FS-4 nothing in the chosen place: the invitation first, then the wider place | desktop-1280 | 27.5 s |
| `feed-screens.spec.ts` › FS-11 signing out keeps the place this browser chose (INC-532) | mobile-360 | 26.8 s |
| `feed-screens.spec.ts` › FS-10 nothing anywhere: the invitation card comes first, with the category and the place | desktop-1280 | 26.7 s |
| `feed-screens.spec.ts` › FS-7 a card without a photo draws the nearest category picture, else the placeholder | desktop-1280 | 26.3 s |
| `feed-screens.spec.ts` › FS-10 nothing anywhere: the invitation card comes first, with the category and the place | mobile-360 | 26.0 s |
| `feed-screens.spec.ts` › FS-2 20 per page in D108's order; the next page loads only when the end comes into view | desktop-1280 | 25.5 s |
| `feed-screens.spec.ts` › FS-8 the home page invites in the chosen place, naming the place alone | desktop-1280 | 25.0 s |
| `feed-screens.spec.ts` › FS-7 a card without a photo draws the nearest category picture, else the placeholder | mobile-360 | 24.0 s |
| `feed-screens.spec.ts` › FS-2 20 per page in D108's order; the next page loads only when the end comes into view | mobile-360 | 23.0 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38017839254-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38017839254-changed
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-hh4ald: e2e_par_7q922z → e2e_chi_qqcmvx
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-wesm5i: e2e_par_f8p1qz → e2e_chi_zjj9mi
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  187 [desktop-1280] › e2e/shell.spec.ts:2455:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (10.2s)
  ✓  188 [desktop-1280] › e2e/shell.spec.ts:2482:3 › L4b location picker › LS-7 a region code alone selects the region (17.0s)
  ✓  189 [desktop-1280] › e2e/shell.spec.ts:2507:3 › L4b location picker › LS-8 a city name alone selects that city (13.6s)
  ✓  190 [desktop-1280] › e2e/shell.spec.ts:2527:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.5s)
  ✓  191 [desktop-1280] › e2e/shell.spec.ts:2553:3 › L4b location picker › LS-10 a saved area beats the deepest guess (19.1s)
  ✓  192 [desktop-1280] › e2e/shell.spec.ts:2595:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (30.6s)
  ✓  193 [desktop-1280] › e2e/shell.spec.ts:2762:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (11.3s)
  ✓  194 [desktop-1280] › e2e/shell.spec.ts:2799:3 › L4b location picker › LS-13 a second city stops the auto-select at the region (16.9s)
  ✓  195 [desktop-1280] › e2e/shell.spec.ts:2827:1 › password visibility stays inside the full-width field (701ms)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  108 [mobile-360] › e2e/admin-categories-console.spec.ts:691:3 › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size (9.6s)
  ✓  110 [mobile-360] › e2e/admin-categories-console.spec.ts:740:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (9.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38017839254-1-3044-3-ocix1r@ethio-e2e.invalid)
  ✓  109 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:448:3 › C2 categories console › CT-17 create flow: two steps, chained countries + position, image (18.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38017839254-1-3044-2-54uk9b@ethio-e2e.invalid)
  ✓  112 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:822:3 › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op (6.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38017839254-1-3044-2-54uk9b@ethio-e2e.invalid)
  ✓  113 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:877:3 › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo (17.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38017839254-1-3044-2-54uk9b@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-hh4ald: e2e_par_7q922z → e2e_chi_qqcmvx
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined
--- final 10 lines ---
✓  193 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:1494:3 › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed (13.7s)
  ✓  194 [mobile-360] › e2e/post-wizard-details.spec.ts:119:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name (10.5s)
  ✓  195 [mobile-360] › e2e/post-wizard-finder.spec.ts:69:3 › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option (17.0s)
  ✓  196 [mobile-360] › e2e/post-wizard-details.spec.ts:160:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3) (13.6s)
  ✓  197 [mobile-360] › e2e/post-wizard-finder.spec.ts:125:3 › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice (11.5s)
  ✓  198 [mobile-360] › e2e/post-wizard-details.spec.ts:236:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466) (18.5s)
  ✓  199 [mobile-360] › e2e/post-wizard-finder.spec.ts:149:3 › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer (9.8s)
  ✓  201 [mobile-360] › e2e/post-wizard-finder.spec.ts:180:3 › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it (16.9s)
  ✓  200 [mobile-360] › e2e/post-wizard-place.spec.ts:268:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (21.7s)
```

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  101 [mobile-360] › e2e/posting-routes.spec.ts:306:3 › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321) (12.3s)
  ✓  112 [mobile-360] › e2e/primitives-law.spec.ts:193:3 › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell (710ms)
  ✓  114 [mobile-360] › e2e/primitives-law.spec.ts:256:3 › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned (724ms)
  ✓  115 [mobile-360] › e2e/rbac.spec.ts:34:3 › RBAC client seam › R-1 logged out: no Admin tab and no RBAC request at all (487ms)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓  116 [mobile-360] › e2e/rbac.spec.ts:47:3 › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home (10.4s)
  ✓  113 [mobile-360] › e2e/posting-routes.spec.ts:338:3 › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) (14.8s)
  ✓  117 [mobile-360] › e2e/rbac.spec.ts:61:3 › RBAC client seam › R-3 staff user: Admin tab appears and /admin renders (10.8s)
  ✓  119 [mobile-360] › e2e/settings.spec.ts:21:1 › S-1: unauthenticated /settings lands on /auth (657ms)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  110 [desktop-1280] › e2e/admin-categories-console.spec.ts:691:3 › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size (10.6s)
  ✓  111 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:822:3 › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op (7.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38017839254-4-2807-2-ixyd18@ethio-e2e.invalid)
  ✓  112 [desktop-1280] › e2e/admin-categories-console.spec.ts:740:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (11.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38017839254-4-2807-3-lhpso4@ethio-e2e.invalid)
  ✓  113 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:877:3 › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo (18.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38017839254-4-2807-2-ixyd18@ethio-e2e.invalid)
  ✓  115 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:952:3 › CAT-IE categories import/export › CT-36 a created leaf gets its secondary parents and the undo removes both pointers (20.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38017839254-4-2807-2-ixyd18@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-wesm5i: e2e_par_f8p1qz → e2e_chi_zjj9mi
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  138 [desktop-1280] › e2e/post-wizard-category.spec.ts:206:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (11.4s)
  ✓  139 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:683:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (14.6s)
  ✓  140 [desktop-1280] › e2e/post-wizard-category.spec.ts:230:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (11.5s)
  ✓  141 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:707:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (14.8s)
  ✓  142 [desktop-1280] › e2e/post-wizard-category.spec.ts:267:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (12.1s)
  ✓  144 [desktop-1280] › e2e/post-wizard-category.spec.ts:307:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (16.5s)
  ✓  143 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:747:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (18.5s)
  ✓  146 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:797:3 › POSTING WIZARD — bundle 2 place and contact › PW-122 an empty phone box opens on the country of the item's place (18.5s)
  ✓  145 [desktop-1280] › e2e/post-wizard-category.spec.ts:421:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (19.9s)
```

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   90 [desktop-1280] › e2e/posting-routes-dials.spec.ts:199:3 › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address (14.6s)
  ✓   89 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:400:3 › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores (22.6s)
  ✓   91 [desktop-1280] › e2e/posting-routes-identity.spec.ts:40:3 › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked (18.3s)
  ✓   92 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:549:3 › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order (16.1s)
  ✓   93 [desktop-1280] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (10.7s)
  ✓   95 [desktop-1280] › e2e/posting-routes.spec.ts:123:3 › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 (11.7s)
  ✓   94 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:596:3 › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can (19.8s)
  ✓   96 [desktop-1280] › e2e/posting-routes.spec.ts:151:3 › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) (15.2s)
  ✓   98 [desktop-1280] › e2e/posting-routes.spec.ts:218:3 › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081) (15.1s)
```
