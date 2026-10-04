# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37226811550
- Commit: `695b315bb6bccd24f205fe4dba1a7b79106214bf`
- Attempt: 1
- Written (UTC): 2026-10-04T19:20:10.044Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories wrongFile` (quiet) | 3 | shard 2, shard 4, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
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
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories wrongFile ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37226811550-email
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
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
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
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  130 [desktop-1280] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed (10.0s)
  ✓  131 [desktop-1280] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out (9.1s)
  ✓  132 [desktop-1280] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls (1.0s)
  ✓  133 [desktop-1280] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail (737ms)
  ✓  134 [desktop-1280] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable (972ms)
  -  135 [desktop-1280] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360
  ✓  136 [desktop-1280] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (566ms)
  ✓  137 [desktop-1280] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (8.6s)
  ✓  138 [desktop-1280] › e2e/shell.spec.ts:1560:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (10.1s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.6s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37226811550-email

  1 passed (14.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226811550-1-2842-3-55we8d@ethio-e2e.invalid)
  ✓   95 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:983:3 › CAT-IE categories import/export › CT-21 unknown parents, cycles, catch-alls and formulas are refused (7.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226811550-1-2842-2-q9clx0@ethio-e2e.invalid)
  ✓   97 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1069:3 › CAT-IE categories import/export › CT-34 own_place is accepted by the import and an unknown token is refused (5.1s)
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
  ✓   98 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1155:3 › CAT-IE categories import/export › CT-22 a categories:view-only operator sees no import control and is refused (10.0s)
  ✓   96 [mobile-360] › e2e/admin-categories-console.spec.ts:815:3 › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes (30.7s)
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (5) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   38 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (32.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   41 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (retry #1) (31.9s)
--- final 10 lines ---
✓  140 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:828:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (10.7s)
  ✓  139 [mobile-360] › e2e/post-wizard-category.spec.ts:797:3 › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71) (20.7s)
  ✓  141 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:856:3 › POSTING WIZARD — bundle 2 place and contact › PW-119 another seller's visible phone is never carried (14.2s)
  ✓  142 [mobile-360] › e2e/post-wizard-category.spec.ts:908:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further (16.3s)
  ✓  143 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:877:3 › POSTING WIZARD — bundle 2 place and contact › PW-121 a phone number in the title or description is flagged at its field (9.6s)
  ✓  144 [mobile-360] › e2e/post-wizard-category.spec.ts:946:3 › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored (7.2s)
  ✓  146 [mobile-360] › e2e/post-wizard-category.spec.ts:967:3 › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account (9.3s)
  ✓  145 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:908:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (15.9s)
  ✓  147 [mobile-360] › e2e/post-wizard-category.spec.ts:1011:3 › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap (8.5s)
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
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   68 [mobile-360] › e2e/post-wizard-specs.spec.ts:1674:3 › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile (13.0s)
  ✓   69 [mobile-360] › e2e/post-wizard-where.spec.ts:831:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-96 the saved pin keeps its zoom; the dropper reopens at it (13.7s)
  ✓   70 [mobile-360] › e2e/post-wizard-specs.spec.ts:1743:3 › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) (17.9s)
  ✓   71 [mobile-360] › e2e/post-wizard-where.spec.ts:871:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-101 the location details refuse a phone number and keep a street note (14.1s)
  ✓   72 [mobile-360] › e2e/post-wizard-specs.spec.ts:1804:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (14.3s)
  ✓   73 [mobile-360] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (14.6s)
  ✓   75 [mobile-360] › e2e/posting-routes.spec.ts:123:3 › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 (11.8s)
  ✓   74 [mobile-360] › e2e/post-wizard-specs.spec.ts:1879:3 › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides (21.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  112 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1880:3 › C2-HOME categories home flag › CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other (6.1s)
  ✓  111 [desktop-1280] › e2e/admin-countries.spec.ts:200:3 › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back (11.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226811550-4-2851-2-p7ed6s@ethio-e2e.invalid)
  ✓  113 [desktop-1280] › e2e/admin-coverage.spec.ts:114:3 › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin (12.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226811550-4-2851-3-knxrma@ethio-e2e.invalid)
  ✓  114 [desktop-1280] › e2e/admin-countries.spec.ts:230:3 › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row (11.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226811550-4-2851-2-p7ed6s@ethio-e2e.invalid)
  ✓  115 [desktop-1280] › e2e/admin-coverage.spec.ts:132:3 › L2b coverage console › CV-2 roster: the free plan renders its three limits and its everywhere state (3.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226811550-4-2851-3-knxrma@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  104 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:439:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (21.2s)
  ✓  105 [desktop-1280] › e2e/post-wizard-category.spec.ts:171:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (10.2s)
  ✓  106 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:474:3 › POSTING WIZARD — bundle 2 place and contact › PW-122 an empty phone box opens on the country of the item's place (16.6s)
  ✓  107 [desktop-1280] › e2e/post-wizard-category.spec.ts:196:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (12.5s)
  ✓  109 [desktop-1280] › e2e/post-wizard-category.spec.ts:220:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (12.6s)
  ✓  108 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:494:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (19.0s)
  ✓  110 [desktop-1280] › e2e/post-wizard-category.spec.ts:257:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (12.0s)
  ✓  111 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:522:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (14.6s)
  ✓  112 [desktop-1280] › e2e/post-wizard-category.spec.ts:297:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (13.4s)
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
✓  127 [desktop-1280] › e2e/posting-routes.spec.ts:785:3 › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086) (17.1s)
  ✓  130 [desktop-1280] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out (8.6s)
  ✓  132 [desktop-1280] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls (1.5s)
  ✓  133 [desktop-1280] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail (1.4s)
  ✓  131 [desktop-1280] › e2e/posting-routes.spec.ts:881:3 › POSTING ROUTES › PR-20 step 5: the counters are server-only; the server path still counts (11.0s)
  ✓  134 [desktop-1280] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable (952ms)
  -  136 [desktop-1280] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360
  ✓  137 [desktop-1280] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (583ms)
  ✓  138 [desktop-1280] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (9.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```
