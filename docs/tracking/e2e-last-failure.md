# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37089566271
- Commit: `7c24107806e65220b95c7656d0ecc3d8459e2970`
- Attempt: 1
- Written (UTC): 2026-10-03T02:36:10.157Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

98 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 11 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 3 | shard 2, shard 4, shard 5 |
| `preview_failed permission denied` (quiet) | 3 | shard 1, shard 4 |
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
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×11 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×3 · preview_failed permission denied ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed step-up required: no verified factor ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 37089566271-email
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
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
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
✓  140 [desktop-1280] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.4s)
  ✓  141 [desktop-1280] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (6.4s)
  ✓  142 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (16.0s)
  ✓  143 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (569ms)
  ✓  144 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (740ms)
  ✓  145 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (529ms)
  ✓  146 [desktop-1280] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.7s)
  ✓  147 [desktop-1280] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (14.5s)
  ✓  148 [desktop-1280] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (14.9s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37089566271-email

  1 passed (10.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   82 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:268:3 › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last (10.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089566271-1-3057-2-egk7we@ethio-e2e.invalid)
  ✓   83 [mobile-360] › e2e/admin-categories-console.spec.ts:464:3 › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer (15.8s)
  -   85 [mobile-360] › e2e/admin-categories-console.spec.ts:514:3 › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll
  -   86 [mobile-360] › e2e/admin-categories-console.spec.ts:589:3 › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin)
  ✓   84 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:395:3 › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor (9.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089566271-1-3057-2-egk7we@ethio-e2e.invalid)
  ✓   87 [mobile-360] › e2e/admin-categories-console.spec.ts:630:3 › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards (5.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089566271-1-3057-3-iu1ugx@ethio-e2e.invalid)
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
✓  141 [mobile-360] › e2e/post-wizard-place.spec.ts:509:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (17.8s)
  ✓  142 [mobile-360] › e2e/post-wizard-category.spec.ts:1294:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (25.3s)
  ✓  143 [mobile-360] › e2e/post-wizard-place.spec.ts:552:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (22.5s)
PW-30 walk: signed in @ 2594 ms | category and specifications seeded @ 3307 ms | step 3 reached @ 5190 ms | specifications answered @ 5379 ms | step 6 open @ 8456 ms | tree served @ 8725 ms | place chosen @ 8848 ms | review open @ 10461 ms | review labels read @ 10483 ms | buyer preview read @ 10581 ms | Amharic review read @ 10979 ms
  ✓  144 [mobile-360] › e2e/post-wizard-place.spec.ts:645:3 › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans (11.8s)
  ✓  145 [mobile-360] › e2e/post-wizard-place.spec.ts:851:3 › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects (11.5s)
  ✓  146 [mobile-360] › e2e/post-wizard-place.spec.ts:886:3 › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove (10.3s)
  ✓  147 [mobile-360] › e2e/post-wizard-place.spec.ts:971:3 › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2) (14.5s)
  ✓  148 [mobile-360] › e2e/post-wizard-place.spec.ts:1017:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (16.6s)
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
✓  147 [mobile-360] › e2e/shell.spec.ts:1118:3 › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned (3.5s)
  -  148 [mobile-360] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed
  -  149 [mobile-360] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out
  -  150 [mobile-360] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls
  -  151 [mobile-360] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -  152 [mobile-360] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓  153 [mobile-360] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (428ms)
  ✓  154 [mobile-360] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (475ms)
  ✓  155 [mobile-360] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (3.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   95 [desktop-1280] › e2e/admin-categories-console.spec.ts:691:3 › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size (7.0s)
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
  ✓   96 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1106:3 › CAT-IE categories import/export › CT-22 a categories:view-only operator sees no import control and is refused (6.0s)
  ✓   97 [desktop-1280] › e2e/admin-categories-console.spec.ts:740:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (6.5s)
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
  ✓   98 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1148:3 › CAT-IE categories import/export › CT-23 a commit without step-up is refused and writes nothing (7.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37089566271-4-2843-2-4ln7zn@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37089566271-4-2843-3-flqutw@ethio-e2e.invalid)
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

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  143 [desktop-1280] › e2e/post-wizard-category.spec.ts:1294:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (12.7s)
  ✓  144 [desktop-1280] › e2e/post-wizard-place.spec.ts:552:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (11.1s)
  ✓  145 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:229:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (7.2s)
PW-30 walk: signed in @ 2668 ms | category and specifications seeded @ 3351 ms | step 3 reached @ 5263 ms | specifications answered @ 5675 ms | step 6 open @ 7529 ms | tree served @ 8023 ms | place chosen @ 8252 ms | review open @ 10415 ms | review labels read @ 10460 ms | buyer preview read @ 10580 ms | Amharic review read @ 11124 ms
  ✓  146 [desktop-1280] › e2e/post-wizard-place.spec.ts:645:3 › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans (11.8s)
  ✓  147 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:349:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (9.0s)
  ✓  149 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:380:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (6.4s)
  ✓  148 [desktop-1280] › e2e/post-wizard-place.spec.ts:851:3 › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects (8.6s)
  ✓  150 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:406:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (5.6s)
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
-  132 [desktop-1280] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360
  ✓  133 [desktop-1280] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (610ms)
  ✓  130 [desktop-1280] › e2e/posting-routes.spec.ts:699:3 › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001 (8.1s)
  ✓  134 [desktop-1280] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (7.1s)
  ✓  136 [desktop-1280] › e2e/shell.spec.ts:1560:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (6.6s)
  ✓  135 [desktop-1280] › e2e/posting-routes.spec.ts:732:3 › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086) (9.4s)
  ✓  138 [desktop-1280] › e2e/smoke-auth-i18n.spec.ts:18:1 › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out (3.4s)
  ✓  137 [desktop-1280] › e2e/shell.spec.ts:1575:3 › U4h device language star › TR-28 the account carries onto a starless device, and never over a star (10.2s)
  ✓  139 [desktop-1280] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.3s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
