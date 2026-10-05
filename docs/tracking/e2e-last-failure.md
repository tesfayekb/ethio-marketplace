# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37253946603
- Commit: `68f1ab9b88e2ea87f54bd931b59d6491c8aa1670`
- Attempt: 1
- Written (UTC): 2026-10-05T02:13:39.262Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 33 message(s): 2 off the allowlist, 31 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `name_folds_rebuild: DELETE requires a WHERE clause` | 44 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 7 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
| `too many previews` (quiet) | 5 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 1 | shard 2 |
| `countries nulByte` (quiet) | 1 | shard 2 |
| `countries tooManyRows` (quiet) | 1 | shard 2 |
| `countries unknownColumn` (quiet) | 1 | shard 2 |
| `countries wrongFile` (quiet) | 1 | shard 2 |
| `locations badHeader` (quiet) | 1 | shard 2 |
| `locations file too large` (quiet) | 1 | shard 2 |
| `locations nulByte` (quiet) | 1 | shard 2 |
| `locations unknownColumn` (quiet) | 1 | shard 2 |
| `locations wrongFile` (quiet) | 1 | shard 2 |
| `strings badHeader` (quiet) | 1 | shard 2 |
| `strings emptyFile` (quiet) | 1 | shard 2 |
| `strings nulByte` (quiet) | 1 | shard 2 |
| `strings tooManyRows` (quiet) | 1 | shard 2 |
| `strings unknownColumn` (quiet) | 1 | shard 2 |
| `strings wrongFile` (quiet) | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×7 · too many previews ×5 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1 · strings badHeader ×1 · strings emptyFile ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist:

### name_folds_rebuild: DELETE requires a WHERE clause

- Count: 44 · Sources: shard 1, shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause
```

### listing not found

- Count: 5 · Sources: shard 3, shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37253946603-email
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
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×10
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×4
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×10
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×4
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×8
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
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
✓   76 [mobile-360] › e2e/shell.spec.ts:2293:3 › L4b location picker › LS-13 a second city stops the auto-select at the region (20.1s)
  ✓   77 [mobile-360] › e2e/smoke-auth-i18n.spec.ts:18:1 › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out (4.9s)
[a11y] home desktop-1280 serious=0 critical=0
[a11y] auth desktop-1280 serious=0 critical=0
  ✓   78 [desktop-1280] › e2e/a11y.spec.ts:58:3 › A11Y SMOKE (DEC-084, gating) › A11Y-1 marketplace home and sign-in @a11y (3.5s)
[a11y] wizard-1 desktop-1280 serious=0 critical=0
[a11y] wizard-3 desktop-1280 serious=0 critical=0
[a11y] wizard-5 desktop-1280 serious=0 critical=0
  ✓   79 [desktop-1280] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (22.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.4s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37253946603-email

  1 passed (13.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (3) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
  ✘   13 [mobile-360] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (9.3s)
  ✘   14 [mobile-360] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (retry #1) (10.1s)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   38 [mobile-360] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (28.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37253946603-1-3063-3-4dpjju@ethio-e2e.invalid)
  ✓   37 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (36.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37253946603-1-3063-2-u3z5p6@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×10
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×4
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   97 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited (16.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37253946603-2-3037-2-gr8bww@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
  ✓   99 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole (2.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37253946603-2-3037-2-gr8bww@ethio-e2e.invalid)
```

```text
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   30 [mobile-360] › e2e/post-wizard-specs.spec.ts:443:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (22.0s)
  ✓   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:943:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (25.9s)
  ✓   32 [mobile-360] › e2e/post-wizard-specs.spec.ts:476:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (17.5s)
  ✓   34 [mobile-360] › e2e/post-wizard-specs.spec.ts:541:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (15.8s)
  ✓   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:964:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (31.0s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:570:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (21.3s)
  ✓   36 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1029:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (24.9s)
  ✓   37 [mobile-360] › e2e/post-wizard-specs.spec.ts:595:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (29.6s)
  ✓   38 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1063:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (27.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
  ✘   14 [desktop-1280] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (7.8s)
  ✘   16 [desktop-1280] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (retry #1) (9.6s)
--- final 10 lines ---
✓   52 [desktop-1280] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (12.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37253946603-4-2859-2-yzkiz9@ethio-e2e.invalid)
  ✓   51 [desktop-1280] › e2e/admin-attributes-links.spec.ts:677:3 › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error (31.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37253946603-4-2859-3-2quqj5@ethio-e2e.invalid)
  ✓   53 [desktop-1280] › e2e/admin-attributes-library.spec.ts:471:3 › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) (21.0s)
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37253946603-4-2859-2-yzkiz9@ethio-e2e.invalid)
  ✓   54 [desktop-1280] › e2e/admin-attributes-links.spec.ts:782:3 › C3 attributes console › AT-60 a links file reorders three links and the posting read follows (24.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37253946603-4-2859-3-2quqj5@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×10
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×4
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: DELETE requires a WHERE clause ×8
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   67 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole (6.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37253946603-5-3035-3-x79bet@ethio-e2e.invalid)
  ✓   66 [desktop-1280] › e2e/mfa-stepup.spec.ts:131:3 › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through @private-identity (15.5s)
  ✓   69 [desktop-1280] › e2e/mfa-stepup.spec.ts:167:3 › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called (6.4s)
  ✓   68 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason (21.0s)
  ✓   70 [desktop-1280] › e2e/mfa-stepup.spec.ts:182:3 › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI (8.6s)
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
  ✓   72 [desktop-1280] › e2e/mfa-stepup.spec.ts:210:3 › U1f step-up authentication › MF-5 unenroll requires a fresh verification @private-identity (7.4s)
  ✓   73 [desktop-1280] › e2e/mfa-stepup.spec.ts:247:3 › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state @private-identity (7.3s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   33 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1201:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (17.4s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   35 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1227:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (19.9s)
  ✓   34 [desktop-1280] › e2e/post-wizard-where.spec.ts:443:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (22.2s)
  ✓   37 [desktop-1280] › e2e/post-wizard-where.spec.ts:516:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-91 location details without a pin are stored in a category without map_pin (20.6s)
  ✓   36 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1277:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (29.1s)
  ✓   38 [desktop-1280] › e2e/post-wizard-where.spec.ts:544:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen (20.7s)
  ✓   39 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1329:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (22.5s)
  ✓   40 [desktop-1280] › e2e/post-wizard-where.spec.ts:593:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-97 the map credit is visible and uncovered on both plans (14.2s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
