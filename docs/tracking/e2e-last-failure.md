# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37235400948
- Commit: `722b78faaec821de2f2459af464701d0e582c055`
- Attempt: 1
- Written (UTC): 2026-10-04T21:29:16.252Z
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
| `listing not found` | 2 | shard 6 |
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

- Count: 2 · Sources: shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37235400948-email
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
--- error lines (1) ---
  ✘   63 [mobile-360] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.1s)
--- final 10 lines ---
✓  114 [desktop-1280] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (1.2s)
  -  115 [desktop-1280] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger
  -  116 [desktop-1280] › e2e/shell.spec.ts:823:3 › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e)
  -  117 [desktop-1280] › e2e/shell.spec.ts:850:3 › mobile chrome › the drawer logo block matches the top bar's divider and height
  -  118 [desktop-1280] › e2e/shell.spec.ts:868:3 › mobile chrome › the rail-collapse toggle does not exist on mobile
  -  119 [desktop-1280] › e2e/shell.spec.ts:877:3 › mobile chrome › no Settings item leaks into the mobile category drawer
  -  120 [desktop-1280] › e2e/shell.spec.ts:886:3 › mobile chrome › search opens a full-width row BELOW the bar
  -  121 [desktop-1280] › e2e/shell.spec.ts:900:3 › mobile chrome › no horizontal overflow and text stays legible at 360
  -  122 [desktop-1280] › e2e/shell.spec.ts:918:3 › mobile chrome › primary touch targets are at least 44px
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37235400948-email

  1 passed (9.0s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235400948-1-3055-3-wktjuh@ethio-e2e.invalid)
  ✓   64 [mobile-360] › e2e/admin-audit.spec.ts:97:3 › U3 audit & security › AS-2 filters: an action filter narrows the list (4.9s)
  ✓   65 [mobile-360] › e2e/admin-attributes-library.spec.ts:1127:3 › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it (11.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235400948-1-3055-3-wktjuh@ethio-e2e.invalid)
  ✓   66 [mobile-360] › e2e/admin-audit.spec.ts:135:3 › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it @private-identity (17.7s)
  ✓   67 [mobile-360] › e2e/admin-attributes-library.spec.ts:1215:3 › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers (13.0s)
  ✓   68 [mobile-360] › e2e/admin-audit.spec.ts:162:3 › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded @private-identity (18.5s)
  ✓   69 [mobile-360] › e2e/admin-categories-console.spec.ts:83:3 › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin (16.9s)
  ✓   71 [mobile-360] › e2e/admin-categories-console.spec.ts:101:3 › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows (9.7s)
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
--- error lines (4) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘   57 [mobile-360] › e2e/i18n-bundle.spec.ts:104:3 › STAB-I18N · cached translation bundle › IB-2 publishing a fence language moves the version and the bundle (1.7s)
  ✘  115 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:463:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (34.0s)
  ✘  119 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:463:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (retry #1) (31.7s)
--- final 10 lines ---
✓  120 [mobile-360] › e2e/post-wizard-category.spec.ts:297:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (10.5s)
  ✓  121 [mobile-360] › e2e/post-wizard-category.spec.ts:411:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (11.4s)
  ✘  119 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:463:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (retry #1) (31.7s)
  ✓  122 [mobile-360] › e2e/post-wizard-category.spec.ts:493:3 › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable (12.7s)
  ✓  123 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:487:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (11.4s)
  ✓  124 [mobile-360] › e2e/post-wizard-category.spec.ts:556:3 › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) (18.9s)
  ✓  125 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:527:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (10.9s)
  ✓  127 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:562:3 › POSTING WIZARD — bundle 2 place and contact › PW-122 an empty phone box opens on the country of the item's place (10.3s)
  ✓  126 [mobile-360] › e2e/post-wizard-category.spec.ts:651:3 › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner (13.1s)
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
✓   73 [mobile-360] › e2e/post-wizard-specs.spec.ts:1998:3 › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not (8.2s)
  ✓   74 [mobile-360] › e2e/post-wizard-where.spec.ts:831:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-96 the saved pin keeps its zoom; the dropper reopens at it (8.6s)
  ✓   75 [mobile-360] › e2e/post-wizard-specs.spec.ts:2073:3 › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41) (9.7s)
  ✓   76 [mobile-360] › e2e/post-wizard-where.spec.ts:871:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-101 the location details refuse a phone number and keep a street note (7.3s)
  ✓   78 [mobile-360] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (8.5s)
  ✓   77 [mobile-360] › e2e/post-wizard-specs.spec.ts:2118:3 › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on (10.7s)
  ✓   80 [mobile-360] › e2e/primitives-law.spec.ts:43:5 › display primitives law (test-once responsiveness) › primitives fit and adapt at 360 (962ms)
  ✓   81 [mobile-360] › e2e/primitives-law.spec.ts:43:5 › display primitives law (test-once responsiveness) › primitives fit and adapt at 768 (942ms)
  ✓   82 [mobile-360] › e2e/primitives-law.spec.ts:43:5 › display primitives law (test-once responsiveness) › primitives fit and adapt at 1280 (1.1s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37235400948-4-3108-2-6h0sif@ethio-e2e.invalid)
  ✓   77 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:44:3 › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up (16.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235400948-4-3108-3-h2x06b@ethio-e2e.invalid)
  ✓   78 [desktop-1280] › e2e/admin-categories-console.spec.ts:313:3 › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows (15.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37235400948-4-3108-2-6h0sif@ethio-e2e.invalid)
  ✓   79 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:139:3 › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents (18.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235400948-4-3108-3-h2x06b@ethio-e2e.invalid)
  ✓   81 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:211:3 › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs (4.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235400948-4-3108-3-h2x06b@ethio-e2e.invalid)
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
--- error lines (3) ---
  ✘   62 [desktop-1280] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (619ms)
  ✘  105 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:463:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (30.4s)
  ✘  109 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:463:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (retry #1) (32.3s)
--- final 10 lines ---
✓  108 [desktop-1280] › e2e/post-wizard-category.spec.ts:220:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (7.3s)
  ✓  110 [desktop-1280] › e2e/post-wizard-category.spec.ts:257:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (10.0s)
  ✓  111 [desktop-1280] › e2e/post-wizard-category.spec.ts:297:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (7.8s)
  ✓  112 [desktop-1280] › e2e/post-wizard-category.spec.ts:411:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (8.2s)
  ✘  109 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:463:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (retry #1) (32.3s)
  ✓  113 [desktop-1280] › e2e/post-wizard-category.spec.ts:493:3 › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable (9.8s)
  ✓  114 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:487:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (10.5s)
  ✓  115 [desktop-1280] › e2e/post-wizard-category.spec.ts:556:3 › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) (18.8s)
  ✓  116 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:527:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (12.0s)
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
✓   73 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 768 until lg (856ms)
  ✓   74 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 1280 until lg (894ms)
  ✓   75 [desktop-1280] › e2e/primitives-law.spec.ts:193:3 › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell (984ms)
  ✓   76 [desktop-1280] › e2e/primitives-law.spec.ts:256:3 › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned (1.6s)
  ✓   77 [desktop-1280] › e2e/rbac.spec.ts:34:3 › RBAC client seam › R-1 logged out: no Admin tab and no RBAC request at all (928ms)
  ✓   71 [desktop-1280] › e2e/posting-routes.spec.ts:380:3 › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active (10.1s)
  ✓   78 [desktop-1280] › e2e/rbac.spec.ts:47:3 › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home (6.9s)
  ✓   80 [desktop-1280] › e2e/rbac.spec.ts:61:3 › RBAC client seam › R-3 staff user: Admin tab appears and /admin renders (9.5s)
  ✓   79 [desktop-1280] › e2e/posting-routes.spec.ts:418:3 › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it (14.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
