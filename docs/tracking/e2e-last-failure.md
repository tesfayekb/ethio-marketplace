# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37223754642
- Commit: `fa6a1dfd3f24058a75d9c9b2a7bbd903811633ef`
- Attempt: 1
- Written (UTC): 2026-10-04T18:32:42.582Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

105 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

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
[e2e:teardown] deleted 4 user(s) owned by process 37223754642-email
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
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  142 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (16.4s)
  ✓  143 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (730ms)
  ✓  144 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (888ms)
  ✓  145 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (616ms)
  ✓  146 [desktop-1280] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (10.7s)
  ✓  147 [desktop-1280] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (14.9s)
  ✓  148 [desktop-1280] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.2s)
  ✓  149 [desktop-1280] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (14.5s)
  ✓  150 [desktop-1280] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (17.7s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37223754642-email

  1 passed (11.3s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37223754642-1-2881-3-yduoju@ethio-e2e.invalid)
  ✓  102 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1369:3 › CAT-IE categories import/export › CT-25 an attributes file is refused by identity (3.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37223754642-1-2881-2-bqnyd2@ethio-e2e.invalid)
  ✓  103 [mobile-360] › e2e/admin-countries.spec.ts:78:3 › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow (3.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37223754642-1-2881-3-yduoju@ethio-e2e.invalid)
  ✓  105 [mobile-360] › e2e/admin-countries.spec.ts:130:3 › L2b countries console › CO-3 creation is absent from the header; the countries file is the only creation path (2.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37223754642-1-2881-3-yduoju@ethio-e2e.invalid)
  ✓  104 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1424:3 › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them (10.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37223754642-1-2881-2-bqnyd2@ethio-e2e.invalid)
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

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  140 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:856:3 › POSTING WIZARD — bundle 2 place and contact › PW-119 another seller's visible phone is never carried (21.7s)
  ✓  141 [mobile-360] › e2e/post-wizard-category.spec.ts:908:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further (21.4s)
  ✓  143 [mobile-360] › e2e/post-wizard-category.spec.ts:946:3 › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored (10.8s)
  ✓  142 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:877:3 › POSTING WIZARD — bundle 2 place and contact › PW-121 a phone number in the title or description is flagged at its field (15.7s)
  ✓  144 [mobile-360] › e2e/post-wizard-category.spec.ts:967:3 › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account (10.9s)
  ✓  145 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:908:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (19.1s)
  ✓  146 [mobile-360] › e2e/post-wizard-category.spec.ts:1011:3 › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap (13.3s)
  ✓  147 [mobile-360] › e2e/post-wizard-details.spec.ts:78:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves (14.9s)
  ✓  148 [mobile-360] › e2e/post-wizard-category.spec.ts:1046:3 › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree (15.7s)
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
✓  138 [mobile-360] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (1.1s)
  ✓  139 [mobile-360] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger (828ms)
  ✓  140 [mobile-360] › e2e/shell.spec.ts:823:3 › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e) (7.2s)
  ✓  141 [mobile-360] › e2e/shell.spec.ts:850:3 › mobile chrome › the drawer logo block matches the top bar's divider and height (769ms)
  ✓  142 [mobile-360] › e2e/shell.spec.ts:868:3 › mobile chrome › the rail-collapse toggle does not exist on mobile (580ms)
  ✓  143 [mobile-360] › e2e/shell.spec.ts:877:3 › mobile chrome › no Settings item leaks into the mobile category drawer (857ms)
  ✓  144 [mobile-360] › e2e/shell.spec.ts:886:3 › mobile chrome › search opens a full-width row BELOW the bar (688ms)
  ✓  145 [mobile-360] › e2e/shell.spec.ts:900:3 › mobile chrome › no horizontal overflow and text stays legible at 360 (572ms)
  ✓  146 [mobile-360] › e2e/shell.spec.ts:918:3 › mobile chrome › primary touch targets are at least 44px (853ms)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  102 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1369:3 › CAT-IE categories import/export › CT-25 an attributes file is refused by identity (4.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37223754642-4-3061-3-4bjmoe@ethio-e2e.invalid)
  ✓  103 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1424:3 › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them (13.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37223754642-4-3061-3-4bjmoe@ethio-e2e.invalid)
  ✓  100 [desktop-1280] › e2e/admin-categories-console.spec.ts:815:3 › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes (38.4s)
  ✓  105 [desktop-1280] › e2e/admin-countries.spec.ts:57:3 › L2b countries console › CO-1 gating: a plain user is refused; the roster and its transfer toolbar render for an admin (14.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37223754642-4-3061-2-rdx7mu@ethio-e2e.invalid)
  ✓  104 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1534:3 › CAT-IE categories import/export › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it (21.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37223754642-4-3061-3-4bjmoe@ethio-e2e.invalid)
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
✓  126 [desktop-1280] › e2e/post-wizard-category.spec.ts:797:3 › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71) (21.7s)
  -  129 [desktop-1280] › e2e/post-wizard-category.spec.ts:908:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further
  ✓  128 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:877:3 › POSTING WIZARD — bundle 2 place and contact › PW-121 a phone number in the title or description is flagged at its field (11.6s)
  ✓  130 [desktop-1280] › e2e/post-wizard-category.spec.ts:946:3 › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored (9.2s)
  ✓  132 [desktop-1280] › e2e/post-wizard-category.spec.ts:967:3 › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account (7.9s)
  ✓  131 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:908:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (14.2s)
  ✓  133 [desktop-1280] › e2e/post-wizard-category.spec.ts:1011:3 › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap (10.0s)
  ✓  134 [desktop-1280] › e2e/post-wizard-details.spec.ts:78:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves (10.6s)
  ✓  135 [desktop-1280] › e2e/post-wizard-category.spec.ts:1046:3 › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree (8.4s)
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
✓  145 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (14.8s)
  ✓  147 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (842ms)
  ✓  148 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (819ms)
  ✓  149 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (797ms)
  ✓  150 [desktop-1280] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (10.9s)
  ✓  146 [desktop-1280] › e2e/posting-routes.spec.ts:1084:3 › POSTING ROUTES › PR-24 a seller is named before an ad is published (INC-423) (27.8s)
  ✓  152 [desktop-1280] › e2e/smoke-auth-i18n.spec.ts:18:1 › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out (3.5s)
  ✓  151 [desktop-1280] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (13.6s)
  ✓  153 [desktop-1280] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
