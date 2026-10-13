# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38356216404
- Commit: `f6027a224192bce1ffc51f23b27cf5148eb2f485`
- Attempt: 1
- Written (UTC): 2026-10-13T06:37:31.997Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (0 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

90 line(s), 38 message(s): 4 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 8 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 8 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 3 | shard 3, shard 6 |
| `listing not found` | 3 | shard 3, shard 6 |
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
| `gate fetch threw The operation timed out.` | 2 | shard 2, shard 3 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `TimeoutError: The operation timed out.` | 2 | shard 2, shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>a<n>: e<n>e_par_cagyim → e<n>e_chi_<n>wa<n>zu` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rssp<n>y: e<n>e_par_hi<n>zh<n> → e<n>e_chi_<n>lcj<n>` (quiet) | 1 | shard 1 |
| `links unknownColumn` (quiet) | 1 | shard 5 |
| `locations badHeader` (quiet) | 1 | shard 5 |
| `locations file too large` (quiet) | 1 | shard 5 |
| `locations nulByte` (quiet) | 1 | shard 5 |
| `locations unknownColumn` (quiet) | 1 | shard 5 |
| `locations wrongFile` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×8 · too many previews ×8 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>a<n>: e<n>e_par_cagyim → e<n>e_chi_<n>wa<n>zu ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rssp<n>y: e<n>e_par_hi<n>zh<n> → e<n>e_chi_<n>lcj<n> ×1 · links unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1

Off the allowlist:

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 3 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-42 Amharic catalog text falls back field by field ×2 · PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays  ×2 · PW-183 under Amharic a year reads with its Ethiopian years, the same on the pick ×1 · PW-96 the saved pin keeps its zoom; the dropper reopens at it ×1

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### listing not found

- Count: 3 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-32 model-dependent details reset on a model change, seller-only details survi ×1 · PW-79 clearing the title and tapping Next at once still registers the tap (INC-3 ×1 · R-8 staff user: Admin tab appears and /admin renders ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### gate fetch threw The operation timed out.

- Count: 2 · Sources: shard 2, shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): @private-identity IG-3 categories: a changed file cannot be committed and previe ×1 · PP-6 another seller's listing is a 403 ×1 · PR-37 coverage first appearance is stored once, renumbered in either order ×1 · PW-154 {country} in a label and its help reads the market's country in English ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw The operation timed out.
```

### TimeoutError: The operation timed out.

- Count: 2 · Sources: shard 2, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): no account fixtures fit ×1 · PR-2 an incomplete step is the door's own refusal, at status 200 ×1 · PR-38 owner's client cannot insert, update or delete coverage; the route can ×1 · super admin routes fit ×1

```text
[WebServer] [ssr-error] /api/locations TimeoutError: The operation timed out.
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
[e2e:teardown] deleted 4 user(s) owned by process 38356216404-email
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-rssp3y: e2e_par_hi7zh5 → e2e_chi_57lcj6
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/locations TimeoutError: The operation timed out.
[WebServer] [ssr-error] /__root gate fetch threw The operation timed out.
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /__root gate fetch threw The operation timed out.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-13a885: e2e_par_cagyim → e2e_chi_6wa3zu
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
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n TimeoutError: The operation timed out.
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  183 [desktop-1280] › e2e/shell.spec.ts:2308:3 › L4b location picker › the location row uses the width-specific label (751ms)
  ✓  184 [desktop-1280] › e2e/shell.spec.ts:2327:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (836ms)
  ✓  185 [desktop-1280] › e2e/shell.spec.ts:2339:3 › L4b location picker › LS-4 a closed market is not guessed (768ms)
  ✓  186 [desktop-1280] › e2e/shell.spec.ts:2353:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (689ms)
  ✓  187 [desktop-1280] › e2e/shell.spec.ts:2453:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (8.5s)
  ✓  188 [desktop-1280] › e2e/shell.spec.ts:2476:3 › L4b location picker › LS-7 a region code alone selects the region (15.7s)
  ✓  189 [desktop-1280] › e2e/shell.spec.ts:2499:3 › L4b location picker › LS-8 a city name alone selects that city (16.3s)
  ✓  190 [desktop-1280] › e2e/shell.spec.ts:2517:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (14.4s)
  ✓  191 [desktop-1280] › e2e/shell.spec.ts:2539:3 › L4b location picker › LS-10 a saved area beats the deepest guess (19.9s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.4s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38356216404-email

  2 passed (15.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  108 [mobile-360] › e2e/admin-categories-console.spec.ts:635:3 › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards (12.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38356216404-1-3065-3-d6eyku@ethio-e2e.invalid)
  ✓  109 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:147:3 › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents (20.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38356216404-1-3065-2-afvfyd@ethio-e2e.invalid)
  ✓  110 [mobile-360] › e2e/admin-categories-console.spec.ts:667:3 › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths (12.2s)
  ✓  111 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:225:3 › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs (4.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38356216404-1-3065-2-afvfyd@ethio-e2e.invalid)
  ✓  112 [mobile-360] › e2e/admin-categories-console.spec.ts:696:3 › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) (13.1s)
  ✓  113 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:282:3 › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last (16.1s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-rssp3y: e2e_par_hi7zh5 → e2e_chi_57lcj6
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (5) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘  112 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole (11.6s)
  ✘  111 [mobile-360] › e2e/feed-screens.spec.ts:419:3 › FEED SCREENS › FS-9 four listings in the chosen place: no invitation (34.0s)
[WebServer] [ssr-error] /api/locations TimeoutError: The operation timed out.
  ✘  116 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited (4.2m)
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38356216404-2-3065-3-omsjwz@ethio-e2e.invalid)
  ✓  156 [mobile-360] › e2e/photo-pipeline.spec.ts:251:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (26.0s)
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
  ✓  161 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-countries › IG-1 locations-countries: malformed, foreign, oversized and unreadable files are refused whole (2.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38356216404-2-3065-3-omsjwz@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/locations TimeoutError: The operation timed out.
[WebServer] [ssr-error] /__root gate fetch threw The operation timed out.
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (4) ---
  ✘   65 [mobile-360] › e2e/post-wizard-where.spec.ts:438:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (21.8s)
  ✘   64 [mobile-360] › e2e/post-wizard-specs.spec.ts:792:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (49.3s)
  ✘   66 [mobile-360] › e2e/post-wizard-where.spec.ts:438:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (retry #1) (1.1m)
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
--- final 10 lines ---
✓  105 [mobile-360] › e2e/post-wizard-specs.spec.ts:2325:3 › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on (8.1s)
[WebServer] [ssr-error] /__root gate fetch threw The operation timed out.
  ✓  107 [mobile-360] › e2e/post-wizard-specs.spec.ts:2384:3 › POSTING WIZARD › PW-154 {country} in a label and its help reads the market's country in English (10.3s)
  ✓  106 [mobile-360] › e2e/posting-routes-catalog.spec.ts:549:3 › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order (13.7s)
  ✓  108 [mobile-360] › e2e/post-wizard-specs.spec.ts:2406:3 › POSTING WIZARD › PW-155 {country} reads the country in Amharic (13.0s)
  ✓  109 [mobile-360] › e2e/posting-routes-catalog.spec.ts:596:3 › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can (14.3s)
  ✓  110 [mobile-360] › e2e/post-wizard-specs.spec.ts:2427:3 › POSTING WIZARD › PW-156 with no place, market or confirmed home, {country} reads the fallback words (10.5s)
  ✓  112 [mobile-360] › e2e/post-wizard-specs.spec.ts:2464:3 › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer (14.4s)
  ✓  111 [mobile-360] › e2e/posting-routes-catalog.spec.ts:634:3 › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order (21.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /__root gate fetch threw The operation timed out.
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38356216404-4-3063-2-lmwuwt@ethio-e2e.invalid)
  ✓  106 [desktop-1280] › e2e/admin-categories-console.spec.ts:519:3 › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll (21.9s)
  ✓  107 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:147:3 › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents (19.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38356216404-4-3063-2-lmwuwt@ethio-e2e.invalid)
  ✓  109 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:225:3 › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs (6.2s)
  ✓  108 [desktop-1280] › e2e/admin-categories-console.spec.ts:594:3 › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin) (13.9s)
  -  111 [desktop-1280] › e2e/admin-categories-console.spec.ts:635:3 › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38356216404-4-3063-3-m3dj9d@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38356216404-4-3063-2-lmwuwt@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-13a885: e2e_par_cagyim → e2e_chi_6wa3zu
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  156 [desktop-1280] › e2e/photo-pipeline.spec.ts:271:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (15.6s)
  ✓  158 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:693:3 › POSTING WIZARD — bundle 2 place and contact › PW-151 the account card shows the name and each saved channel with whether buyers see it (7.2s)
  ✓  159 [desktop-1280] › e2e/photo-pipeline.spec.ts:307:3 › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached (11.0s)
  ✓  160 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:722:3 › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) (16.1s)
  ✓  161 [desktop-1280] › e2e/photo-pipeline.spec.ts:333:3 › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over (16.8s)
  ✓  162 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:757:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (14.1s)
  ✓  163 [desktop-1280] › e2e/photo-pipeline.spec.ts:406:3 › PHOTO PIPELINE › PP-11 a refused photo holds Next until it is removed; the step says photos are public (11.1s)
  ✓  164 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:781:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (11.7s)
  ✓  165 [desktop-1280] › e2e/photo-pipeline.spec.ts:458:3 › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires (15.0s)
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
--- error lines (5) ---
  ✘   61 [desktop-1280] › e2e/post-wizard-where.spec.ts:615:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen (31.6s)
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
  ✘   60 [desktop-1280] › e2e/post-wizard-specs.spec.ts:2068:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (1.2m)
[WebServer] [ssr-error] /api/i18n TimeoutError: The operation timed out.
--- final 10 lines ---
-  159 [desktop-1280] › e2e/shell.spec.ts:1114:3 › mobile chrome › search opens a full-width row BELOW the bar
  -  160 [desktop-1280] › e2e/shell.spec.ts:1128:3 › mobile chrome › no horizontal overflow and text stays legible at 360
  -  161 [desktop-1280] › e2e/shell.spec.ts:1146:3 › mobile chrome › primary touch targets are at least 44px
  -  162 [desktop-1280] › e2e/shell.spec.ts:1187:3 › mobile chrome › the bottom bar, signed out
  -  163 [desktop-1280] › e2e/shell.spec.ts:1208:3 › mobile chrome › the bottom bar, signed in
  -  164 [desktop-1280] › e2e/shell.spec.ts:1230:3 › mobile chrome › the posting wizard keeps the frame
  -  165 [desktop-1280] › e2e/shell.spec.ts:1253:5 › mobile chrome › My listings works from /account (INC-501)
  -  166 [desktop-1280] › e2e/shell.spec.ts:1253:5 › mobile chrome › My listings works from /settings (INC-501)
  -  167 [desktop-1280] › e2e/shell.spec.ts:1262:3 › mobile chrome › nothing hides under the bar
```

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/i18n TimeoutError: The operation timed out.
[WebServer] [ssr-error] /api/listings/draft listing not found
```
