# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38458356803
- Commit: `974744fdbb788f992a2008ebc444fa777de51133`
- Attempt: 1
- Written (UTC): 2026-10-13T20:09:47.784Z
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-cvbb<n>c: e<n>e_par_qpl<n>t<n> → e<n>e_chi_rnwrz<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>nb<n>l: e<n>e_par_<n>u<n>xq<n> → e<n>e_chi_g<n>oe` (quiet) | 1 | shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | smoke |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-cvbb<n>c: e<n>e_par_qpl<n>t<n> → e<n>e_chi_rnwrz<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>nb<n>l: e<n>e_par_<n>u<n>xq<n> → e<n>e_chi_g<n>oe ×1

Off the allowlist:

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: smoke
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SO-4 signed-out marketplace carries no gated UI ×1 · SP-1 idle: the warning appears, then the session is hard-reset ×1

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
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
[e2e:teardown] deleted 4 user(s) owned by process 38458356803-email
```

## Server errors: smoke

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-cvbb1c: e2e_par_qpl7t1 → e2e_chi_rnwrz7
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-m6nb1l: e2e_par_5u9xq6 → e2e_chi_g044oe
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
--- error lines (1) ---
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
--- final 10 lines ---
✓  183 [desktop-1280] › e2e/shell.spec.ts:2308:3 › L4b location picker › the location row uses the width-specific label (716ms)
  ✓  184 [desktop-1280] › e2e/shell.spec.ts:2327:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (758ms)
  ✓  185 [desktop-1280] › e2e/shell.spec.ts:2339:3 › L4b location picker › LS-4 a closed market is not guessed (669ms)
  ✓  186 [desktop-1280] › e2e/shell.spec.ts:2353:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (669ms)
  ✓  187 [desktop-1280] › e2e/shell.spec.ts:2453:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.4s)
  ✓  188 [desktop-1280] › e2e/shell.spec.ts:2476:3 › L4b location picker › LS-7 a region code alone selects the region (13.9s)
  ✓  189 [desktop-1280] › e2e/shell.spec.ts:2499:3 › L4b location picker › LS-8 a city name alone selects that city (17.2s)
  ✓  190 [desktop-1280] › e2e/shell.spec.ts:2517:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (14.3s)
  ✓  191 [desktop-1280] › e2e/shell.spec.ts:2539:3 › L4b location picker › LS-10 a saved area beats the deepest guess (18.5s)
```

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.7s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.4s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38458356803-email

  2 passed (15.8s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  115 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:282:3 › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last (15.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38458356803-1-2861-2-nsdafv@ethio-e2e.invalid)
  ✓  116 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:412:3 › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order (12.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38458356803-1-2861-2-nsdafv@ethio-e2e.invalid)
  ✓  114 [mobile-360] › e2e/admin-categories-console.spec.ts:826:3 › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes (35.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38458356803-1-2861-3-bxxtye@ethio-e2e.invalid)
  ✓  117 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:515:3 › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor (10.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38458356803-1-2861-2-nsdafv@ethio-e2e.invalid)
  ✓  118 [mobile-360] › e2e/admin-categories-console.spec.ts:1070:3 › C2 categories console › CT-43 the row's actions: Edit, a red Delete only when retired, the menu's verbs, a dialog that closes back to the table (12.9s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-cvbb1c: e2e_par_qpl7t1 → e2e_chi_rnwrz7
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  156 [mobile-360] › e2e/mfa-stepup.spec.ts:247:3 › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state @private-identity (7.1s)
  ✓  158 [mobile-360] › e2e/mfa-stepup.spec.ts:275:3 › U1f-4 step-up freshness › MF-7 a verification older than the window re-prompts @private-identity (11.1s)
  ✓  157 [mobile-360] › e2e/photo-pipeline.spec.ts:157:3 › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only (22.9s)
  ✓  159 [mobile-360] › e2e/mfa-stepup.spec.ts:323:3 › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing @private-identity (9.4s)
  ✓  161 [mobile-360] › e2e/mfa-stepup.spec.ts:355:3 › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint @private-identity (4.6s)
  ✓  160 [mobile-360] › e2e/photo-pipeline.spec.ts:183:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (15.5s)
  ✓  162 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:201:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (16.5s)
  ✓  163 [mobile-360] › e2e/photo-pipeline.spec.ts:197:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (13.6s)
  ✓  164 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:244:3 › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save (14.5s)
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
--- error lines (30) ---
  ✘    2 [mobile-360] › e2e/post-wizard-pricing.spec.ts:233:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (22.0s)
  ✘    3 [mobile-360] › e2e/post-wizard-pricing.spec.ts:233:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (26.7s)
  ✘    5 [mobile-360] › e2e/post-wizard-pricing.spec.ts:355:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (29.5s)
  ✘    7 [mobile-360] › e2e/post-wizard-pricing.spec.ts:355:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (27.3s)
  ✘    8 [mobile-360] › e2e/post-wizard-resets.spec.ts:205:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks (28.8s)
  ✘    9 [mobile-360] › e2e/post-wizard-pricing.spec.ts:386:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (26.2s)
  ✘   11 [mobile-360] › e2e/post-wizard-pricing.spec.ts:386:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (retry #1) (25.5s)
  ✘   10 [mobile-360] › e2e/post-wizard-resets.spec.ts:205:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks (retry #1) (28.5s)
  ✘   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:412:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (21.3s)
  ✘   13 [mobile-360] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (23.8s)
  ✘   14 [mobile-360] › e2e/post-wizard-pricing.spec.ts:412:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (retry #1) (21.6s)
  ✘   15 [mobile-360] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (retry #1) (23.9s)
  ✘   16 [mobile-360] › e2e/post-wizard-pricing.spec.ts:427:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (22.8s)
  ✘   18 [mobile-360] › e2e/post-wizard-pricing.spec.ts:427:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (retry #1) (26.9s)
  ✘   19 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (23.3s)
  ✘   21 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (retry #1) (25.3s)
  ✘   22 [mobile-360] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (23.6s)
  ✘   23 [mobile-360] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (22.4s)
  ✘   24 [mobile-360] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (retry #1) (22.6s)
  ✘   26 [mobile-360] › e2e/post-wizard-pricing.spec.ts:488:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (19.3s)
  ✘   27 [mobile-360] › e2e/post-wizard-pricing.spec.ts:488:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (retry #1) (20.9s)
  ✘   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (20.9s)
  ✘   30 [mobile-360] › e2e/post-wizard-resets.spec.ts:719:3 › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too (20.6s)
  ✘   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (retry #1) (26.6s)
  ✘   32 [mobile-360] › e2e/post-wizard-resets.spec.ts:719:3 › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too (retry #1) (25.1s)
  ✘   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (25.5s)
  ✘   34 [mobile-360] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (26.8s)
  ✘   35 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (retry #1) (27.5s)
  ✘   36 [mobile-360] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (retry #1) (26.8s)
  ✘   37 [mobile-360] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (23.5s)
--- final 10 lines ---
✘   62 [mobile-360] › e2e/post-wizard-pricing.spec.ts:876:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (18.6s)
  ✘   63 [mobile-360] › e2e/post-wizard-resets.spec.ts:1571:3 › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays (22.0s)
  ✘   64 [mobile-360] › e2e/post-wizard-pricing.spec.ts:876:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (retry #1) (18.6s)
  ✘   65 [mobile-360] › e2e/post-wizard-resets.spec.ts:1571:3 › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays (retry #1) (22.0s)
  ✘   66 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1077:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (20.0s)
  ✓   67 [mobile-360] › e2e/post-wizard-resets.spec.ts:1655:3 › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) (18.6s)
  ✘   68 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1077:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (retry #1) (23.1s)
  ✘   69 [mobile-360] › e2e/post-wizard-specs.spec.ts:224:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (22.7s)
  ✘   70 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1098:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (22.7s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38458356803-4-2845-2-ki59cx@ethio-e2e.invalid)
  ✓  113 [desktop-1280] › e2e/admin-categories-console.spec.ts:667:3 › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths (11.0s)
  ✓  114 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:515:3 › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor (10.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38458356803-4-2845-2-ki59cx@ethio-e2e.invalid)
  ✓  115 [desktop-1280] › e2e/admin-categories-console.spec.ts:696:3 › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) (11.2s)
  ✓  117 [desktop-1280] › e2e/admin-categories-console.spec.ts:751:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (9.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38458356803-4-2845-3-rcxaqs@ethio-e2e.invalid)
  ✓  116 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:561:3 › C2 categories console › CT-17 create flow: two steps, chained countries + position, image (18.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38458356803-4-2845-2-ki59cx@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-m6nb1l: e2e_par_5u9xq6 → e2e_chi_g044oe
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  145 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:244:3 › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save (11.6s)
  ✓  146 [desktop-1280] › e2e/photo-pipeline.spec.ts:183:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (8.9s)
  ✓  148 [desktop-1280] › e2e/photo-pipeline.spec.ts:197:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (10.1s)
  ✓  147 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:314:3 › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read (18.5s)
  ✓  149 [desktop-1280] › e2e/photo-pipeline.spec.ts:216:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (14.7s)
  ✓  150 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:365:3 › POSTING WIZARD — bundle 2 place and contact › PW-186 a pin saved while the directions save is unanswered keeps both (14.7s)
  ✓  152 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:434:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (14.5s)
  ✓  151 [desktop-1280] › e2e/photo-pipeline.spec.ts:232:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (17.4s)
  ✓  153 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:473:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (15.8s)
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
--- error lines (30) ---
  ✘    2 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:233:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (21.9s)
  ✘    3 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:233:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (27.6s)
  ✘    5 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:355:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (28.5s)
  ✘    7 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:355:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (26.9s)
  ✘    8 [desktop-1280] › e2e/post-wizard-resets.spec.ts:205:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks (28.4s)
  ✘    9 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:386:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (25.7s)
  ✘   11 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:386:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (retry #1) (24.1s)
  ✘   10 [desktop-1280] › e2e/post-wizard-resets.spec.ts:205:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks (retry #1) (26.1s)
  ✘   12 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:412:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (23.0s)
  ✘   14 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:412:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (retry #1) (19.3s)
  ✘   15 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:427:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (22.8s)
  ✘   13 [desktop-1280] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (1.2m)
  ✘   16 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:427:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (retry #1) (27.6s)
  ✘   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (retry #1) (27.2s)
  ✘   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:369:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (23.2s)
  ✘   20 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (23.5s)
  ✘   21 [desktop-1280] › e2e/post-wizard-resets.spec.ts:369:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (retry #1) (21.3s)
  ✘   22 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (retry #1) (20.7s)
  ✘   23 [desktop-1280] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (19.4s)
  ✘   24 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:488:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (19.0s)
  ✘   25 [desktop-1280] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (retry #1) (23.3s)
  ✘   26 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:488:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (retry #1) (22.0s)
  ✘   27 [desktop-1280] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (21.9s)
  ✘   28 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (22.4s)
  ✘   29 [desktop-1280] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (retry #1) (26.6s)
  ✘   30 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (retry #1) (24.9s)
  ✘   31 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else (23.9s)
  ✘   32 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (25.1s)
  ✘   33 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else (retry #1) (25.7s)
  ✘   34 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (retry #1) (27.6s)
--- final 10 lines ---
✘   60 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1351:3 › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent (22.9s)
  ✘   61 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:850:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5) (retry #1) (18.9s)
  -   63 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:876:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar
  ✘   62 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1351:3 › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent (retry #1) (21.2s)
  ✘   64 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1077:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (22.7s)
  ✓   65 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1421:3 › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not (20.2s)
  ✘   66 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1077:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (retry #1) (21.0s)
  ✘   67 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1507:3 › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer (24.4s)
  ✘   68 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1098:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (23.9s)
```
