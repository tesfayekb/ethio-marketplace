# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37263481492
- Commit: `8d059e753f28236fce2315ed37a072243c82fbe0`
- Attempt: 1
- Written (UTC): 2026-10-05T04:34:48.373Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

84 line(s), 32 message(s): 0 off the allowlist, 32 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 9 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
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
| `links unknownColumn` (quiet) | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×9 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · links unknownColumn ×1

Off the allowlist: none.

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
[e2e:teardown] deleted 4 user(s) owned by process 37263481492-email
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
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
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
[a11y] home desktop-1280 serious=0 critical=0
[a11y] auth desktop-1280 serious=0 critical=0
  ✓   78 [desktop-1280] › e2e/a11y.spec.ts:58:3 › A11Y SMOKE (DEC-084, gating) › A11Y-1 marketplace home and sign-in @a11y (3.0s)
[a11y] wizard-1 desktop-1280 serious=0 critical=0
[a11y] wizard-3 desktop-1280 serious=0 critical=0
[a11y] wizard-5 desktop-1280 serious=0 critical=0
  ✓   79 [desktop-1280] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (12.7s)
  ✓   80 [desktop-1280] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (7.4s)
  ✓   81 [desktop-1280] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (9.6s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37263481492-email

  1 passed (8.6s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37263481492-1-3054-2-wnygzj@ethio-e2e.invalid)
  ✓   49 [mobile-360] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (3.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-1-3054-3-ipviwi@ethio-e2e.invalid)
  ✓   51 [mobile-360] › e2e/admin-attributes-library.spec.ts:471:3 › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) (11.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-1-3054-3-ipviwi@ethio-e2e.invalid)
  ✓   50 [mobile-360] › e2e/admin-attributes-links.spec.ts:677:3 › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error (24.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37263481492-1-3054-2-wnygzj@ethio-e2e.invalid)
  ✓   52 [mobile-360] › e2e/admin-attributes-library.spec.ts:503:3 › C3 attributes console › AT-11 remove from category unlinks it and the chip disappears (DB truth) (20.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-1-3054-3-ipviwi@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  101 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason (2.1s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
  ✓  102 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (9.3s)
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓  103 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (14.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-2-3097-3-djdee0@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
  ✓  105 [mobile-360] › e2e/import-security.spec.ts:908:3 › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not (3.6s)
  ✓  104 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (11.0s)
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
✓   24 [mobile-360] › e2e/post-wizard-pricing.spec.ts:671:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (28.8s)
  ✓   27 [mobile-360] › e2e/post-wizard-pricing.spec.ts:692:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315) (29.5s)
  -   28 [mobile-360] › e2e/post-wizard-pricing.spec.ts:716:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)
  ✓   26 [mobile-360] › e2e/post-wizard-specs.spec.ts:358:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (36.4s)
  ✓   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:742:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (20.6s)
  ✓   30 [mobile-360] › e2e/post-wizard-specs.spec.ts:443:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (19.2s)
  ✓   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:943:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (19.0s)
  ✓   32 [mobile-360] › e2e/post-wizard-specs.spec.ts:476:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (15.1s)
  ✓   34 [mobile-360] › e2e/post-wizard-specs.spec.ts:541:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (13.7s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-4-3058-3-ctm8xg@ethio-e2e.invalid)
  ✓   47 [desktop-1280] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (15.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37263481492-4-3058-2-hdh8fu@ethio-e2e.invalid)
  ✓   49 [desktop-1280] › e2e/admin-attributes-library.spec.ts:372:3 › C3 attributes console › AT-8 assign from the library: the link lands and Used by updates (20.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37263481492-4-3058-2-hdh8fu@ethio-e2e.invalid)
  ✓   48 [desktop-1280] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (34.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-4-3058-3-ctm8xg@ethio-e2e.invalid)
  ✓   50 [desktop-1280] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (10.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37263481492-4-3058-2-hdh8fu@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
  ✓   88 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole (3.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37263481492-5-2869-3-5kvzyi@ethio-e2e.invalid)
  ✓   89 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason (3.2s)
  ✓   87 [desktop-1280] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (13.4s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
```

```text
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   23 [desktop-1280] › e2e/post-wizard-specs.spec.ts:787:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (39.2s)
  ✓   24 [desktop-1280] › e2e/post-wizard-where.spec.ts:152:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (32.7s)
  ✓   25 [desktop-1280] › e2e/post-wizard-specs.spec.ts:787:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (38.1s)
  ✓   26 [desktop-1280] › e2e/post-wizard-where.spec.ts:203:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (47.1s)
  ✓   27 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1032:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (21.4s)
  ✓   28 [desktop-1280] › e2e/post-wizard-where.spec.ts:314:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (19.4s)
  ✓   29 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1090:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (17.3s)
  ✓   31 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1153:3 › POSTING WIZARD › PW-18 specifications survive a step Back (19.2s)
  ✓   30 [desktop-1280] › e2e/post-wizard-where.spec.ts:367:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (20.5s)
```
