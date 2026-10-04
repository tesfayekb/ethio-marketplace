# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37169521636
- Commit: `3d56395aefbe98f0226ec6196510f155a870f68f`
- Attempt: 1
- Written (UTC): 2026-10-04T02:09:21.783Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

94 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

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
[e2e:teardown] deleted 4 user(s) owned by process 37169521636-email
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
-  119 [desktop-1280] › e2e/shell.spec.ts:886:3 › mobile chrome › search opens a full-width row BELOW the bar
  -  120 [desktop-1280] › e2e/shell.spec.ts:900:3 › mobile chrome › no horizontal overflow and text stays legible at 360
  -  121 [desktop-1280] › e2e/shell.spec.ts:918:3 › mobile chrome › primary touch targets are at least 44px
  ✓  122 [desktop-1280] › e2e/shell.spec.ts:958:3 › panel-scoped chrome › location row is present on Marketplace and absent on Account (8.6s)
  ✓  123 [desktop-1280] › e2e/shell.spec.ts:1003:3 › marketplace rail is categories only › no Settings item leaks into the category rail (879ms)
  ✓  124 [desktop-1280] › e2e/shell.spec.ts:1019:3 › panel follows the route › /settings shows the Account context, and returning shows categories (8.7s)
  ✓  125 [desktop-1280] › e2e/shell.spec.ts:1047:3 › panel follows the route › top-bar controls are right-aligned at desktop width (714ms)
  ✓  126 [desktop-1280] › e2e/shell.spec.ts:1059:3 › panel follows the route › admin panel is absent for a normal signed-in user (7.9s)
  ✓  127 [desktop-1280] › e2e/shell.spec.ts:1077:3 › panel header band (U0d) › the band sits in the rail directly below the logo cell (768ms)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37169521636-email

  1 passed (9.0s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   69 [mobile-360] › e2e/admin-categories-console.spec.ts:83:3 › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin (16.6s)
  ✓   71 [mobile-360] › e2e/admin-categories-console.spec.ts:101:3 › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows (9.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37169521636-1-2837-3-59unpt@ethio-e2e.invalid)
  ✓   72 [mobile-360] › e2e/admin-categories-console.spec.ts:130:3 › C2 categories console › CT-31 the roster filter groups children under their parent, marks retired rows, and scopes the roster to a subtree (10.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37169521636-1-2837-3-59unpt@ethio-e2e.invalid)
  ✓   70 [mobile-360] › e2e/admin-audit.spec.ts:191:3 › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller @private-identity (32.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37169521636-1-2837-2-ukc8nw@ethio-e2e.invalid)
  ✓   73 [mobile-360] › e2e/admin-categories-console.spec.ts:250:3 › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up (11.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37169521636-1-2837-3-59unpt@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  102 [mobile-360] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (13.5s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
  ✓  106 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (15.0s)
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓  105 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (25.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37169521636-2-3054-3-lk50ni@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
  ✓  108 [mobile-360] › e2e/import-security.spec.ts:908:3 › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not (4.0s)
  ✓  107 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (15.1s)
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
✓   58 [mobile-360] › e2e/post-wizard-where.spec.ts:859:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-101 the location details refuse a phone number and keep a street note (12.4s)
  ✓   59 [mobile-360] › e2e/post-wizard-specs.spec.ts:1269:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (14.8s)
  ✓   60 [mobile-360] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (10.1s)
  ✓   62 [mobile-360] › e2e/posting-routes.spec.ts:123:3 › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 (7.3s)
  ✓   61 [mobile-360] › e2e/post-wizard-specs.spec.ts:1312:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (17.8s)
  ✓   63 [mobile-360] › e2e/posting-routes.spec.ts:151:3 › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) (12.6s)
  ✓   65 [mobile-360] › e2e/posting-routes.spec.ts:218:3 › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081) (11.4s)
  ✓   64 [mobile-360] › e2e/post-wizard-specs.spec.ts:1377:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (18.3s)
  ✓   66 [mobile-360] › e2e/posting-routes.spec.ts:255:3 › POSTING ROUTES › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309) (10.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   70 [desktop-1280] › e2e/admin-categories-console.spec.ts:83:3 › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin (18.9s)
  ✓   72 [desktop-1280] › e2e/admin-categories-console.spec.ts:101:3 › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows (11.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37169521636-4-3111-2-bltrjk@ethio-e2e.invalid)
  ✓   71 [desktop-1280] › e2e/admin-audit.spec.ts:191:3 › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller @private-identity (35.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37169521636-4-3111-3-gzbdtk@ethio-e2e.invalid)
  ✓   73 [desktop-1280] › e2e/admin-categories-console.spec.ts:130:3 › C2 categories console › CT-31 the roster filter groups children under their parent, marks retired rows, and scopes the roster to a subtree (11.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37169521636-4-3111-2-bltrjk@ethio-e2e.invalid)
  ✓   75 [desktop-1280] › e2e/admin-categories-console.spec.ts:250:3 › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up (11.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37169521636-4-3111-2-bltrjk@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓   89 [desktop-1280] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (24.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37169521636-5-3062-3-6erkzp@ethio-e2e.invalid)
  ✓   90 [desktop-1280] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (13.6s)
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
  ✓   91 [desktop-1280] › e2e/import-security.spec.ts:908:3 › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not (3.7s)
  ✓   93 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:187:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (19.2s)
  ✓   92 [desktop-1280] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (23.4s)
  ✓   94 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:228:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (16.4s)
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
PR-14 answer: {"ok":true,"draft_step":5,"listing_id":"b203433d-d73f-4d30-9e8b-574ee173baa7","price_currency":"ETB"}
  ✓   71 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 1280 until lg (1.1s)
  ✓   72 [desktop-1280] › e2e/primitives-law.spec.ts:193:3 › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell (995ms)
  ✓   65 [desktop-1280] › e2e/posting-routes.spec.ts:306:3 › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321) (9.8s)
  ✓   73 [desktop-1280] › e2e/primitives-law.spec.ts:256:3 › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned (1.1s)
  ✓   75 [desktop-1280] › e2e/rbac.spec.ts:34:3 › RBAC client seam › R-1 logged out: no Admin tab and no RBAC request at all (656ms)
  ✓   76 [desktop-1280] › e2e/rbac.spec.ts:47:3 › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home (7.6s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   74 [desktop-1280] › e2e/posting-routes.spec.ts:338:3 › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) (11.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
