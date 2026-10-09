# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37895282519
- Commit: `ec7794572bfac4d2b691e5b9f5041f3865d51037`
- Attempt: 1
- Written (UTC): 2026-10-09T07:02:38.587Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-agnduy: e<n>e_par_qbcnt<n> → e<n>e_chi_q<n>ffyh` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-biayv<n>: e<n>e_par_rz<n>k → e<n>e_chi_xzltgj` (quiet) | 1 | shard 4 |
| `listing not found` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-agnduy: e<n>e_par_qbcnt<n> → e<n>e_chi_q<n>ffyh ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-biayv<n>: e<n>e_par_rz<n>k → e<n>e_chi_xzltgj ×1

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37895282519-email
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-agnduy: e2e_par_qbcnt7 → e2e_chi_q8ffyh
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

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-biayv1: e2e_par_rz247k → e2e_chi_xzltgj
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

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  180 [desktop-1280] › e2e/shell.spec.ts:2160:3 › L4b location picker › LS-1 the cascade reaches a sub-city (11.0s)
  ✓  181 [desktop-1280] › e2e/shell.spec.ts:2178:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.3s)
  -  182 [desktop-1280] › e2e/shell.spec.ts:2210:3 › L4b location picker › long location names share one 32px line
  ✓  183 [desktop-1280] › e2e/shell.spec.ts:2296:3 › L4b location picker › the location row uses the width-specific label (618ms)
  ✓  184 [desktop-1280] › e2e/shell.spec.ts:2308:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (791ms)
  ✓  185 [desktop-1280] › e2e/shell.spec.ts:2325:3 › L4b location picker › LS-4 a closed market is not guessed (707ms)
  ✓  186 [desktop-1280] › e2e/shell.spec.ts:2344:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (611ms)
  ✓  187 [desktop-1280] › e2e/shell.spec.ts:2438:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (9.9s)
  ✓  188 [desktop-1280] › e2e/shell.spec.ts:2465:3 › L4b location picker › LS-7 a region code alone selects the region (13.5s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (5.0s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37895282519-email

  1 passed (13.4s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-1-2815-3-qelv5d@ethio-e2e.invalid)
  ✓  120 [mobile-360] › e2e/admin-countries.spec.ts:200:3 › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back (13.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-1-2815-3-qelv5d@ethio-e2e.invalid)
  ✓  121 [mobile-360] › e2e/admin-countries.spec.ts:230:3 › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row (13.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-1-2815-3-qelv5d@ethio-e2e.invalid)
  ✓  119 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1043:3 › CAT-IE categories import/export › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in (53.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37895282519-1-2815-2-npjctg@ethio-e2e.invalid)
  ✓  122 [mobile-360] › e2e/admin-countries.spec.ts:337:3 › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back (18.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-1-2815-3-qelv5d@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-agnduy: e2e_par_qbcnt7 → e2e_chi_q8ffyh
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  144 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:679:3 › POSTING WIZARD — bundle 2 place and contact › PW-122 an empty phone box opens on the country of the item's place (18.7s)
  ✓  145 [mobile-360] › e2e/post-wizard-category.spec.ts:304:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (18.5s)
  ✓  146 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:699:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (25.6s)
  ✓  147 [mobile-360] › e2e/post-wizard-category.spec.ts:418:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (21.2s)
  ✓  148 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:727:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (20.3s)
  ✓  149 [mobile-360] › e2e/post-wizard-category.spec.ts:500:3 › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable (26.2s)
  ✓  150 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:751:3 › POSTING WIZARD — bundle 2 place and contact › PW-125 the phone box keeps digits only and saves the number as read (20.9s)
  ✓  152 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:777:3 › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed (22.1s)
  ✓  151 [mobile-360] › e2e/post-wizard-category.spec.ts:563:3 › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) (36.6s)
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
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
  ✓   88 [mobile-360] › e2e/posting-routes-dials.spec.ts:199:3 › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address (31.2s)
  ✓   89 [mobile-360] › e2e/posting-routes-catalog.spec.ts:400:3 › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores (34.5s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  112 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:822:3 › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op (5.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-4-3024-3-ezumbz@ethio-e2e.invalid)
  ✓  111 [desktop-1280] › e2e/admin-categories-console.spec.ts:740:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (11.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37895282519-4-3024-2-mdynga@ethio-e2e.invalid)
  ✓  113 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:877:3 › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo (19.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-4-3024-3-ezumbz@ethio-e2e.invalid)
  ✓  115 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:952:3 › CAT-IE categories import/export › CT-36 a created leaf gets its secondary parents and the undo removes both pointers (19.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37895282519-4-3024-3-ezumbz@ethio-e2e.invalid)
  ✓  114 [desktop-1280] › e2e/admin-categories-console.spec.ts:815:3 › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes (50.0s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-biayv1: e2e_par_rz247k → e2e_chi_xzltgj
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  131 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:699:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (24.6s)
  ✓  133 [desktop-1280] › e2e/post-wizard-category.spec.ts:304:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (19.9s)
  ✓  134 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:727:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (21.4s)
  ✓  135 [desktop-1280] › e2e/post-wizard-category.spec.ts:418:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (20.3s)
  ✓  136 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:751:3 › POSTING WIZARD — bundle 2 place and contact › PW-125 the phone box keeps digits only and saves the number as read (21.9s)
  ✓  137 [desktop-1280] › e2e/post-wizard-category.spec.ts:500:3 › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable (26.5s)
  ✓  138 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:777:3 › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed (22.9s)
  ✓  140 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:831:3 › POSTING WIZARD — bundle 2 place and contact › PW-149 a save refused for another reason shows a message at Next and can be retried (20.3s)
  ✓  139 [desktop-1280] › e2e/post-wizard-category.spec.ts:563:3 › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) (35.1s)
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
--- error lines (1) ---
  ✘   88 [desktop-1280] › e2e/posting-routes-dials.spec.ts:199:3 › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address (22.9s)
--- final 10 lines ---
✓  106 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 360 until lg (1.2s)
  ✓  107 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 768 until lg (968ms)
  ✓  108 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 1280 until lg (888ms)
  ✓  109 [desktop-1280] › e2e/primitives-law.spec.ts:193:3 › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell (1.3s)
  ✓   98 [desktop-1280] › e2e/posting-routes.spec.ts:218:3 › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081) (16.3s)
  ✓  110 [desktop-1280] › e2e/primitives-law.spec.ts:256:3 › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned (1.1s)
  ✓  112 [desktop-1280] › e2e/rbac.spec.ts:34:3 › RBAC client seam › R-1 logged out: no Admin tab and no RBAC request at all (741ms)
  ✓  113 [desktop-1280] › e2e/rbac.spec.ts:47:3 › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home (9.7s)
  ✓  111 [desktop-1280] › e2e/posting-routes.spec.ts:255:3 › POSTING ROUTES › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309) (13.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
