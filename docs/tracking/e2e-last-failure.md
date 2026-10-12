# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38240133851
- Commit: `3a26255f91e3414bc8135393a7550310c505f210`
- Attempt: 1
- Written (UTC): 2026-10-12T11:14:43.227Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

86 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories badHeader` (quiet) | 2 | shard 3, shard 7 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `categories wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `export_failed permission denied` (quiet) | 2 | shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>k<n>hb: e<n>e_par_n<n>f<n>t → e<n>e_chi_<n>tmtfw` (quiet) | 1 | shard 5 |
| `listing not found` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · export_failed permission denied ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>k<n>hb: e<n>e_par_n<n>f<n>t → e<n>e_chi_<n>tmtfw ×1

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 4

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38240133851-email
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
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

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

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-5-1-m0k5hb: e2e_par_n3f36t → e2e_chi_5tmtfw
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

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

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 8

No `[ssr-error]` lines in the `shard 8` log (or no log was uploaded).

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   89 [mobile-360] › e2e/shell.spec.ts:2447:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (8.2s)
  ✓   90 [mobile-360] › e2e/shell.spec.ts:2470:3 › L4b location picker › LS-7 a region code alone selects the region (16.0s)
  ✓   91 [mobile-360] › e2e/shell.spec.ts:2493:3 › L4b location picker › LS-8 a city name alone selects that city (15.5s)
  ✓   92 [mobile-360] › e2e/shell.spec.ts:2511:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (17.4s)
  ✓   93 [mobile-360] › e2e/shell.spec.ts:2533:3 › L4b location picker › LS-10 a saved area beats the deepest guess (21.4s)
  ✓   94 [mobile-360] › e2e/shell.spec.ts:2571:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (38.6s)
  ✓   95 [mobile-360] › e2e/shell.spec.ts:2739:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (17.6s)
  ✓   96 [mobile-360] › e2e/shell.spec.ts:2776:3 › L4b location picker › LS-13 a second city stops the auto-select at the region (16.3s)
  ✓   97 [mobile-360] › e2e/shell.spec.ts:2804:1 › password visibility stays inside the full-width field (834ms)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.8s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38240133851-email

  2 passed (16.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   61 [mobile-360] › e2e/admin-attributes-links.spec.ts:1235:3 › C3 attributes console › AT-40 the import dialog reaches Applied and undoes (20.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-1-3032-2-0ms1wx@ethio-e2e.invalid)
  ✓   62 [mobile-360] › e2e/admin-attributes-library.spec.ts:684:3 › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN (9.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-1-3032-3-qlvwmz@ethio-e2e.invalid)
  ✓   64 [mobile-360] › e2e/admin-attributes-library.spec.ts:735:3 › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending (9.1s)
  ✓   63 [mobile-360] › e2e/admin-attributes-links.spec.ts:1380:3 › C3 attributes console › AT-65 a two-pair condition imports, exports and re-imports unchanged (24.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-1-3032-2-0ms1wx@ethio-e2e.invalid)
  ✓   65 [mobile-360] › e2e/admin-attributes-library.spec.ts:788:3 › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses (18.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-1-3032-3-qlvwmz@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   47 [mobile-360] › e2e/admin-screening.spec.ts:266:3 › ADMIN SCREENING › SC-1 the queue lists an ad waiting for review (28.3s)
  ✓   48 [mobile-360] › e2e/admin-listings.spec.ts:954:3 › ADMIN LISTINGS — the console's doors › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review (32.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-2-2883-3-9jkzdp@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-2-2883-2-ra6j3k@ethio-e2e.invalid)
  ✓   49 [mobile-360] › e2e/admin-screening.spec.ts:275:3 › ADMIN SCREENING › SC-2 Approve puts the ad on the site (32.9s)
  ✓   50 [mobile-360] › e2e/admin-listings.spec.ts:1009:3 › ADMIN LISTINGS — the console's doors › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller (31.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-2-2883-3-9jkzdp@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-2-2883-2-ra6j3k@ethio-e2e.invalid)
  ✓   51 [mobile-360] › e2e/admin-screening.spec.ts:294:3 › ADMIN SCREENING › SC-3 Reject keeps the ad off (37.2s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   80 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:244:3 › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save (20.1s)
  ✓   81 [mobile-360] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (20.3s)
  ✓   82 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read (29.2s)
  ✓   83 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (21.3s)
  ✓   85 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (19.9s)
  ✓   84 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:360:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (25.8s)
  ✓   86 [mobile-360] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (21.4s)
  ✓   87 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:399:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (21.1s)
  ✓   89 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:468:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (10.5s)
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

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   33 [mobile-360] › e2e/post-wizard-specs.spec.ts:1037:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (30.2s)
  ✓   34 [mobile-360] › e2e/post-wizard-resets.spec.ts:1560:3 › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays (25.0s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:1095:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (22.9s)
  ✓   36 [mobile-360] › e2e/post-wizard-resets.spec.ts:1644:3 › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) (22.3s)
  ✓   37 [mobile-360] › e2e/post-wizard-specs.spec.ts:1158:3 › POSTING WIZARD › PW-18 specifications survive a step Back (21.4s)
  ✓   38 [mobile-360] › e2e/post-wizard-units.spec.ts:62:3 › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic (19.4s)
  ✓   39 [mobile-360] › e2e/post-wizard-specs.spec.ts:1206:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (22.7s)
  ✓   40 [mobile-360] › e2e/post-wizard-units.spec.ts:103:3 › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity (28.9s)
[WebServer] [ssr-error] /api/listings/draft listing not found
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-5-2810-2-gwin1v@ethio-e2e.invalid)
  ✓   59 [desktop-1280] › e2e/admin-attributes-safety.spec.ts:384:3 › Bundle 7 attribute safety › AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse (25.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-5-2810-3-xsckox@ethio-e2e.invalid)
  ✓   60 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1380:3 › C3 attributes console › AT-65 a two-pair condition imports, exports and re-imports unchanged (25.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-5-2810-2-gwin1v@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-5-1-m0k5hb: e2e_par_n3f36t → e2e_chi_5tmtfw
  ✓   61 [desktop-1280] › e2e/admin-attributes-safety.spec.ts:442:3 › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit (29.1s)
  ✓   62 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1448:3 › C3 attributes console › AT-66 the link editor saves and reopens a two-pair condition (23.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-5-2810-2-gwin1v@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-5-1-m0k5hb: e2e_par_n3f36t → e2e_chi_5tmtfw
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-6-3101-3-p5mso8@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled e7f9eb1a-e305-4703-bb28-220adc903e76: []
  ✓   61 [desktop-1280] › e2e/admin-screening.spec.ts:481:3 › ADMIN SCREENING › SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number (30.5s)
  ✓   62 [desktop-1280] › e2e/admin-translations-console.spec.ts:554:3 › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision (18.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-6-3101-2-joxkrp@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38240133851-6-3101-3-p5mso8@ethio-e2e.invalid)
  ✓   64 [desktop-1280] › e2e/admin-translations-console.spec.ts:620:3 › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key (15.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38240133851-6-3101-2-joxkrp@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled e7f9eb1a-e305-4703-bb28-220adc903e76: []
```

## shard 7: no results file

shard 7: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   76 [desktop-1280] › e2e/photo-pipeline.spec.ts:148:3 › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only (28.9s)
  ✓   79 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:201:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (21.5s)
  ✓   80 [desktop-1280] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (22.3s)
  ✓   81 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:244:3 › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save (25.5s)
  ✓   82 [desktop-1280] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (19.4s)
  ✓   83 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read (28.9s)
  ✓   84 [desktop-1280] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (19.4s)
  ✓   85 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:360:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (21.7s)
  ✓   86 [desktop-1280] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (32.4s)
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

## shard 8: no results file

shard 8: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   36 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1158:3 › POSTING WIZARD › PW-18 specifications survive a step Back (19.8s)
  ✓   37 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1644:3 › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) (24.5s)
  ✓   38 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1206:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (26.2s)
  ✓   39 [desktop-1280] › e2e/post-wizard-units.spec.ts:62:3 › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic (21.9s)
  ✓   40 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1232:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (20.9s)
  ✓   41 [desktop-1280] › e2e/post-wizard-units.spec.ts:103:3 › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity (28.1s)
  ✓   42 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1282:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (29.8s)
  ✓   43 [desktop-1280] › e2e/post-wizard-where.spec.ts:157:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (26.8s)
  ✓   44 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1350:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (21.8s)
```
