# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37864728908
- Commit: `a2b46f66f8adaec3533fcf27ac7d53079a4eb514`
- Attempt: 1
- Written (UTC): 2026-10-09T00:36:33.003Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

86 line(s), 32 message(s): 0 off the allowlist, 32 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
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
| `export_failed permission denied` (quiet) | 2 | shard 1 |
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

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · export_failed permission denied ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

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
[e2e:teardown] deleted 4 user(s) owned by process 37864728908-email
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
[a11y] wizard-5 desktop-1280 serious=0 critical=0
  ✓  100 [desktop-1280] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (15.6s)
  ✓  101 [desktop-1280] › e2e/auth-signout.spec.ts:66:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (9.0s)
  ✓  102 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (7.7s)
  ✓  103 [desktop-1280] › e2e/auth-signout.spec.ts:102:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (7.5s)
  ✓  104 [desktop-1280] › e2e/auth-signout.spec.ts:124:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (9.9s)
  ✓  105 [desktop-1280] › e2e/auth-signout.spec.ts:149:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (8.5s)
  ✓  106 [desktop-1280] › e2e/auth-signout.spec.ts:272:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.6s)
  ✓  107 [desktop-1280] › e2e/auth-signout.spec.ts:285:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (13.4s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (6.8s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37864728908-email

  1 passed (15.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37864728908-1-3029-2-clrqqe@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
  ✓   66 [mobile-360] › e2e/admin-attributes-library.spec.ts:909:3 › C3 attributes console › AT-16 a user without categories:view gets 403 and sees no export control (8.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37864728908-1-3029-3-z2amkt@ethio-e2e.invalid)
  ✓   67 [mobile-360] › e2e/admin-attributes-links.spec.ts:1405:3 › C3 attributes console › AT-67 catalogue tokens import and are stored unchanged (10.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37864728908-1-3029-2-clrqqe@ethio-e2e.invalid)
  ✓   69 [mobile-360] › e2e/admin-attributes-links.spec.ts:1490:3 › C3 attributes console › AT-68 an import naming an unknown category is refused (4.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37864728908-1-3029-2-clrqqe@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  110 [mobile-360] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (42.9s)
  ✓  112 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:466:3 › POSTING WIZARD — bundle 2 place and contact › PW-150 a saved seller name offers no suggestions until its box is cleared (15.4s)
  ✓  114 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:501:3 › POSTING WIZARD — bundle 2 place and contact › PW-151 the account card shows the name and each saved channel with whether buyers see it (10.5s)
  ✓  113 [mobile-360] › e2e/photo-pipeline.spec.ts:267:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (23.5s)
  ✓  115 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:530:3 › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) (19.8s)
  ✓  116 [mobile-360] › e2e/photo-pipeline.spec.ts:303:3 › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached (13.9s)
  ✓  117 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:565:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (16.5s)
  ✓  118 [mobile-360] › e2e/photo-pipeline.spec.ts:329:3 › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over (19.7s)
  ✓  120 [mobile-360] › e2e/post-wizard-category.spec.ts:178:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (10.0s)
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
✓   36 [mobile-360] › e2e/post-wizard-specs.spec.ts:1158:3 › POSTING WIZARD › PW-18 specifications survive a step Back (22.0s)
  ✓   37 [mobile-360] › e2e/post-wizard-resets.spec.ts:1644:3 › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) (25.4s)
  ✓   38 [mobile-360] › e2e/post-wizard-specs.spec.ts:1206:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (20.5s)
  ✓   39 [mobile-360] › e2e/post-wizard-units.spec.ts:62:3 › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic (16.2s)
  ✓   40 [mobile-360] › e2e/post-wizard-specs.spec.ts:1232:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (18.5s)
  ✓   41 [mobile-360] › e2e/post-wizard-units.spec.ts:103:3 › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity (21.3s)
  ✓   42 [mobile-360] › e2e/post-wizard-specs.spec.ts:1282:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (23.3s)
  ✓   43 [mobile-360] › e2e/post-wizard-where.spec.ts:157:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (23.2s)
  ✓   44 [mobile-360] › e2e/post-wizard-specs.spec.ts:1350:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (18.0s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37864728908-4-3033-2-mul1ka@ethio-e2e.invalid)
  ✓   63 [desktop-1280] › e2e/admin-attributes-library.spec.ts:612:3 › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending (6.6s)
  ✓   61 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1283:3 › C3 attributes console › AT-65 a two-pair condition imports, exports and re-imports unchanged (17.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37864728908-4-3033-3-ypqxxg@ethio-e2e.invalid)
  ✓   64 [desktop-1280] › e2e/admin-attributes-library.spec.ts:665:3 › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses (14.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37864728908-4-3033-2-mul1ka@ethio-e2e.invalid)
  ✓   65 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1351:3 › C3 attributes console › AT-66 the link editor saves and reopens a two-pair condition (20.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37864728908-4-3033-3-ypqxxg@ethio-e2e.invalid)
  ✓   66 [desktop-1280] › e2e/admin-attributes-library.spec.ts:788:3 › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety (10.4s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  101 [desktop-1280] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (10.8s)
  ✓  102 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:350:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (15.3s)
  ✓  103 [desktop-1280] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (10.8s)
  ✓  104 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:397:3 › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) (15.2s)
  ✓  105 [desktop-1280] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (20.8s)
  ✓  106 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:466:3 › POSTING WIZARD — bundle 2 place and contact › PW-150 a saved seller name offers no suggestions until its box is cleared (16.2s)
  ✓  108 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:501:3 › POSTING WIZARD — bundle 2 place and contact › PW-151 the account card shows the name and each saved channel with whether buyers see it (9.9s)
  ✓  107 [desktop-1280] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (31.4s)
  ✓  109 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:530:3 › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) (13.7s)
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
✓   51 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:596:3 › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can (16.5s)
  ✓   52 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1856:3 › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray (14.4s)
  ✓   54 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1927:3 › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile (16.9s)
  ✓   53 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:634:3 › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order (34.6s)
  ✓   56 [desktop-1280] › e2e/posting-routes-dials.spec.ts:128:3 › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial (10.8s)
  ✓   55 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1996:3 › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) (16.7s)
  ✓   57 [desktop-1280] › e2e/posting-routes-dials.spec.ts:151:3 › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial (11.0s)
  ✓   58 [desktop-1280] › e2e/post-wizard-specs.spec.ts:2057:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (13.8s)
  ✓   59 [desktop-1280] › e2e/posting-routes-dials.spec.ts:163:3 › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial (10.9s)
```
