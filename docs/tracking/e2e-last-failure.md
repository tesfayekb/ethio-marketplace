# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38638473242
- Commit: `068bc261e4dfb56c6989dee54db993225e37eca3`
- Attempt: 1
- Written (UTC): 2026-10-14T21:30:24.134Z
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

95 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>kb<n>p: e<n>e_par_chq<n>j → e<n>e_chi_wya<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-z<n>ldw: e<n>e_par_<n>gsru → e<n>e_chi_uv<n>osm` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>kb<n>p: e<n>e_par_chq<n>j → e<n>e_chi_wya<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-z<n>ldw: e<n>e_par_<n>gsru → e<n>e_chi_uv<n>osm ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 38638473242-email
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-z22ldw: e2e_par_84gsru → e2e_chi_uv9osm
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-d1kb4p: e2e_par_chq84j → e2e_chi_wya104
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  185 [desktop-1280] › e2e/shell.spec.ts:2339:3 › L4b location picker › LS-4 a closed market is not guessed (752ms)
  ✓  186 [desktop-1280] › e2e/shell.spec.ts:2353:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (687ms)
  ✓  187 [desktop-1280] › e2e/shell.spec.ts:2453:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (9.9s)
  ✓  188 [desktop-1280] › e2e/shell.spec.ts:2476:3 › L4b location picker › LS-7 a region code alone selects the region (16.2s)
  ✓  189 [desktop-1280] › e2e/shell.spec.ts:2499:3 › L4b location picker › LS-8 a city name alone selects that city (15.9s)
  ✓  190 [desktop-1280] › e2e/shell.spec.ts:2517:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.4s)
  ✓  191 [desktop-1280] › e2e/shell.spec.ts:2539:3 › L4b location picker › LS-10 a saved area beats the deepest guess (19.5s)
  ✓  192 [desktop-1280] › e2e/shell.spec.ts:2577:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (26.3s)
  ✓  193 [desktop-1280] › e2e/shell.spec.ts:2745:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (11.8s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.6s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.4s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38638473242-email

  2 passed (11.6s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  112 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:282:3 › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last (15.6s)
  ✓  113 [mobile-360] › e2e/admin-categories-console.spec.ts:696:3 › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) (12.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-1-2993-2-tt1hnz@ethio-e2e.invalid)
  ✓  115 [mobile-360] › e2e/admin-categories-console.spec.ts:751:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (11.6s)
  ✓  114 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:412:3 › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order (14.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-1-2993-2-tt1hnz@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38638473242-1-2993-3-le7m0m@ethio-e2e.invalid)
  ✓  117 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:515:3 › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor (11.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-1-2993-2-tt1hnz@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-z22ldw: e2e_par_84gsru → e2e_chi_uv9osm
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-2-2845-2-3e9jim@ethio-e2e.invalid)
  ✓  171 [mobile-360] › e2e/photo-pipeline.spec.ts:309:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (18.7s)
  ✓  172 [mobile-360] › e2e/my-listings-doors.spec.ts:830:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) (25.6s)
  ✓  173 [mobile-360] › e2e/photo-pipeline.spec.ts:345:3 › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached (12.0s)
  ✓  174 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:201:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (14.6s)
  ✓  175 [mobile-360] › e2e/photo-pipeline.spec.ts:374:3 › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over (18.8s)
  ✓  176 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:244:3 › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save (13.3s)
  ✓  177 [mobile-360] › e2e/photo-pipeline.spec.ts:447:3 › PHOTO PIPELINE › PP-11 a refused photo holds Next until it is removed; the step says photos are public (12.7s)
  ✓  178 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read (19.7s)
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
✓   79 [mobile-360] › e2e/post-wizard-where.spec.ts:862:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin (14.6s)
  ✓   80 [mobile-360] › e2e/post-wizard-specs.spec.ts:1296:3 › POSTING WIZARD › PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609) (18.8s)
  ✓   81 [mobile-360] › e2e/post-wizard-where.spec.ts:902:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-96 the saved pin keeps its zoom; the dropper reopens at it (14.2s)
  ✓   83 [mobile-360] › e2e/post-wizard-where.spec.ts:953:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-184 the location details refuse a phone number and keep a street note (12.4s)
  ✓   82 [mobile-360] › e2e/post-wizard-specs.spec.ts:1341:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (20.6s)
  ✓   85 [mobile-360] › e2e/post-wizard-specs.spec.ts:1409:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (18.3s)
  ✓   84 [mobile-360] › e2e/post-wizard-where.spec.ts:987:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back (35.5s)
  ✓   86 [mobile-360] › e2e/post-wizard-specs.spec.ts:1452:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (19.9s)
  ✓   87 [mobile-360] › e2e/posting-routes-catalog.spec.ts:114:3 › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save (18.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-4-2814-2-u4l0kt@ethio-e2e.invalid)
  ✓  112 [desktop-1280] › e2e/admin-categories-console.spec.ts:667:3 › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths (12.2s)
  ✓  113 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:412:3 › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order (13.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-4-2814-2-u4l0kt@ethio-e2e.invalid)
  ✓  114 [desktop-1280] › e2e/admin-categories-console.spec.ts:696:3 › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) (11.5s)
  ✓  115 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:515:3 › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor (11.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38638473242-4-2814-2-u4l0kt@ethio-e2e.invalid)
  ✓  116 [desktop-1280] › e2e/admin-categories-console.spec.ts:751:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (12.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38638473242-4-2814-3-k19fpk@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-d1kb4p: e2e_par_chq84j → e2e_chi_wya104
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  147 [desktop-1280] › e2e/photo-pipeline.spec.ts:190:3 › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only (20.0s)
  ✓  148 [desktop-1280] › e2e/my-listings-doors.spec.ts:588:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) (18.9s)
  ✓  149 [desktop-1280] › e2e/photo-pipeline.spec.ts:216:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (11.9s)
  ✓  150 [desktop-1280] › e2e/my-listings-doors.spec.ts:650:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) (21.3s)
  ✓  151 [desktop-1280] › e2e/photo-pipeline.spec.ts:230:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (14.1s)
  ✓  153 [desktop-1280] › e2e/photo-pipeline.spec.ts:249:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (12.1s)
  ✓  152 [desktop-1280] › e2e/my-listings-doors.spec.ts:692:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-7 Renew takes an expired ad only, live at once for the admin's days, with a fresh posting date and the first kept (D174, D175, D176) (19.1s)
  ✓  154 [desktop-1280] › e2e/photo-pipeline.spec.ts:265:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (22.3s)
  ✓  155 [desktop-1280] › e2e/my-listings-doors.spec.ts:728:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-8 The expiry sweep expires full and reduced reach through the state machine, with the system's revision (INC-470, INC-626) (23.0s)
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
✓   78 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1243:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (16.1s)
  ✓   79 [desktop-1280] › e2e/post-wizard-where.spec.ts:862:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin (12.3s)
  ✓   80 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1296:3 › POSTING WIZARD › PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609) (17.3s)
  ✓   81 [desktop-1280] › e2e/post-wizard-where.spec.ts:902:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-96 the saved pin keeps its zoom; the dropper reopens at it (14.7s)
  ✓   82 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1341:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (17.7s)
  ✓   83 [desktop-1280] › e2e/post-wizard-where.spec.ts:953:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-184 the location details refuse a phone number and keep a street note (18.4s)
  ✓   84 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1409:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (19.6s)
  ✓   86 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1452:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (18.9s)
  ✓   85 [desktop-1280] › e2e/post-wizard-where.spec.ts:987:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back (38.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```
