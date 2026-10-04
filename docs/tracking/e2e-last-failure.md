# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37228465794
- Commit: `139a44edabc0725d046af3fd0f9b27fabf0d3d03`
- Attempt: 1
- Written (UTC): 2026-10-04T19:43:00.872Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

92 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

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
| `listing not found` | 2 | shard 3, shard 6 |
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

- Count: 2 · Sources: shard 3, shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37228465794-email
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  122 [desktop-1280] › e2e/shell.spec.ts:958:3 › panel-scoped chrome › location row is present on Marketplace and absent on Account (9.0s)
  ✓  123 [desktop-1280] › e2e/shell.spec.ts:1003:3 › marketplace rail is categories only › no Settings item leaks into the category rail (515ms)
  ✓  124 [desktop-1280] › e2e/shell.spec.ts:1019:3 › panel follows the route › /settings shows the Account context, and returning shows categories (9.8s)
  ✓  125 [desktop-1280] › e2e/shell.spec.ts:1047:3 › panel follows the route › top-bar controls are right-aligned at desktop width (541ms)
  ✓  126 [desktop-1280] › e2e/shell.spec.ts:1059:3 › panel follows the route › admin panel is absent for a normal signed-in user (7.1s)
  ✓  127 [desktop-1280] › e2e/shell.spec.ts:1077:3 › panel header band (U0d) › the band sits in the rail directly below the logo cell (541ms)
  ✓  128 [desktop-1280] › e2e/shell.spec.ts:1088:3 › panel header band (U0d) › the desktop rail switcher NAVIGATES to the panel's home (U0e) (7.3s)
  -  129 [desktop-1280] › e2e/shell.spec.ts:1118:3 › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned
  ✓  130 [desktop-1280] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed (9.2s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (5.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37228465794-email

  1 passed (10.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   86 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:801:3 › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op (4.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37228465794-1-3078-2-btpoi4@ethio-e2e.invalid)
  ✓   85 [mobile-360] › e2e/admin-categories-console.spec.ts:464:3 › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer (18.5s)
  -   88 [mobile-360] › e2e/admin-categories-console.spec.ts:514:3 › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll
  -   89 [mobile-360] › e2e/admin-categories-console.spec.ts:589:3 › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin)
  ✓   87 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:856:3 › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo (10.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37228465794-1-3078-2-btpoi4@ethio-e2e.invalid)
  ✓   90 [mobile-360] › e2e/admin-categories-console.spec.ts:630:3 › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards (9.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37228465794-1-3078-3-6uaohn@ethio-e2e.invalid)
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
--- error lines (5) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   38 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (34.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   42 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (retry #1) (35.6s)
--- final 10 lines ---
✓  105 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (19.2s)
  ✓  107 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:190:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (16.5s)
  ✓  108 [mobile-360] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (20.1s)
  ✓  109 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:231:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (15.0s)
  ✓  111 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:270:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (18.3s)
  ✓  110 [mobile-360] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (34.1s)
  ✓  112 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:339:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (17.8s)
  ✓  113 [mobile-360] › e2e/photo-pipeline.spec.ts:267:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (20.7s)
  ✓  114 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:375:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (18.1s)
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   48 [mobile-360] › e2e/post-wizard-specs.spec.ts:1033:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (16.3s)
  ✓   49 [mobile-360] › e2e/post-wizard-where.spec.ts:314:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (19.9s)
  ✓   50 [mobile-360] › e2e/post-wizard-specs.spec.ts:1096:3 › POSTING WIZARD › PW-18 specifications survive a step Back (14.5s)
  ✓   51 [mobile-360] › e2e/post-wizard-where.spec.ts:367:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (16.1s)
  ✓   52 [mobile-360] › e2e/post-wizard-specs.spec.ts:1144:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (18.8s)
  ✓   53 [mobile-360] › e2e/post-wizard-where.spec.ts:401:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (18.4s)
  ✓   54 [mobile-360] › e2e/post-wizard-specs.spec.ts:1170:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (15.8s)
  ✓   55 [mobile-360] › e2e/post-wizard-where.spec.ts:443:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (20.5s)
  ✓   56 [mobile-360] › e2e/post-wizard-specs.spec.ts:1220:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (19.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37228465794-4-3788-2-q89jiy@ethio-e2e.invalid)
  ✓   74 [desktop-1280] › e2e/admin-categories-images.spec.ts:42:3 › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them (20.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37228465794-4-3788-3-kcgu9h@ethio-e2e.invalid)
  ✓   76 [desktop-1280] › e2e/admin-categories-console.spec.ts:282:3 › C2 categories console › CT-4 visibility window: a future window is stored as DB truth (17.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37228465794-4-3788-2-q89jiy@ethio-e2e.invalid)
  ✓   77 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:44:3 › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up (18.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37228465794-4-3788-3-kcgu9h@ethio-e2e.invalid)
  ✓   78 [desktop-1280] › e2e/admin-categories-console.spec.ts:313:3 › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows (17.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37228465794-4-3788-2-q89jiy@ethio-e2e.invalid)
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
✓   96 [desktop-1280] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (31.3s)
  ✓   98 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:339:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (17.4s)
  ✓   99 [desktop-1280] › e2e/photo-pipeline.spec.ts:267:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (17.8s)
  ✓  100 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:375:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (13.1s)
  ✓  101 [desktop-1280] › e2e/photo-pipeline.spec.ts:303:3 › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached (11.3s)
  ✓  102 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:399:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (15.0s)
  ✓  103 [desktop-1280] › e2e/photo-pipeline.spec.ts:329:3 › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over (17.3s)
  ✓  104 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:439:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (14.7s)
  ✓  105 [desktop-1280] › e2e/post-wizard-category.spec.ts:171:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (9.0s)
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
✓   61 [desktop-1280] › e2e/post-wizard-specs.spec.ts:2061:3 › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on (16.4s)
  ✓   63 [desktop-1280] › e2e/primitives-law.spec.ts:43:5 › display primitives law (test-once responsiveness) › primitives fit and adapt at 360 (847ms)
  ✓   64 [desktop-1280] › e2e/primitives-law.spec.ts:43:5 › display primitives law (test-once responsiveness) › primitives fit and adapt at 768 (881ms)
  ✓   65 [desktop-1280] › e2e/primitives-law.spec.ts:43:5 › display primitives law (test-once responsiveness) › primitives fit and adapt at 1280 (915ms)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   66 [desktop-1280] › e2e/primitives-law.spec.ts:110:3 › display primitives law (test-once responsiveness) › L8 rowHref navigates from the table row, the card and the keyboard (1.9s)
  ✓   67 [desktop-1280] › e2e/primitives-law.spec.ts:134:5 › display primitives law (test-once responsiveness) › primitives render their empty state (630ms)
  ✓   62 [desktop-1280] › e2e/posting-routes.spec.ts:338:3 › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) (15.7s)
  ✓   68 [desktop-1280] › e2e/primitives-law.spec.ts:134:5 › display primitives law (test-once responsiveness) › primitives render their loading state (620ms)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
