# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37347110818
- Commit: `77d8c77143605ac8117e7d4561f15d0e11563750`
- Attempt: 1
- Written (UTC): 2026-10-05T17:28:31.213Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

182 line(s), 29 message(s): 1 off the allowlist, 28 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 104 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 8 | shard 2, shard 5 |
| `definitions wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5 |
| `digest mismatch` (quiet) | 6 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions unknownColumn` (quiet) | 4 | shard 2, shard 5 |
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

Quiet (allowlisted): definitions badHeader ×104 · too many previews ×8 · definitions wrongFile ×6 · digest mismatch ×6 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions unknownColumn ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37347110818-email
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
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×36
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×8
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
```

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
[client-error] console.error: [client-error] gate fetch threw ×2
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×6
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×36
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×7
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×3
```

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

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×6
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  139 [desktop-1280] › e2e/shell.spec.ts:1575:3 › U4h device language star › TR-28 the account carries onto a starless device, and never over a star (20.8s)
  ✓  140 [desktop-1280] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.2s)
  ✓  141 [desktop-1280] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (7.6s)
  ✓  142 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (16.8s)
  ✓  143 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (796ms)
  ✓  144 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (806ms)
  ✓  145 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (630ms)
  ✓  146 [desktop-1280] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (10.1s)
  ✓  147 [desktop-1280] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (14.4s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37347110818-email

  1 passed (10.3s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
  ✘    5 [mobile-360] › e2e/admin-attributes-editor.spec.ts:434:3 › C3 attributes console › AT-32 an import creates a parent and its dependent in one pass (2.1s)
  ✘    6 [mobile-360] › e2e/admin-attributes-editor.spec.ts:434:3 › C3 attributes console › AT-32 an import creates a parent and its dependent in one pass (retry #1) (2.1s)
  ✘   13 [mobile-360] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (4.2s)
  ✘   14 [mobile-360] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (retry #1) (3.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘    2 [mobile-360] › e2e/admin-attributes-import.spec.ts:163:3 › C3 attributes console › AT-20 a real-export round trip is a no-op (2.1m)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘   16 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (2.0m)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘   17 [mobile-360] › e2e/admin-attributes-import.spec.ts:163:3 › C3 attributes console › AT-20 a real-export round trip is a no-op (retry #1) (2.1m)
  ✘   19 [mobile-360] › e2e/admin-attributes-import.spec.ts:232:3 › C3 attributes console › AT-26 option key order and an explicit null preview unchanged (3.6s)
  ✘   20 [mobile-360] › e2e/admin-attributes-import.spec.ts:232:3 › C3 attributes console › AT-26 option key order and an explicit null preview unchanged (retry #1) (3.4s)
  ✘   21 [mobile-360] › e2e/admin-attributes-import.spec.ts:289:3 › C3 attributes console › AT-63 a swatch-only definitions file previews as one change (3.7s)
  ✘   22 [mobile-360] › e2e/admin-attributes-import.spec.ts:289:3 › C3 attributes console › AT-63 a swatch-only definitions file previews as one change (retry #1) (2.9s)
  ✘   24 [mobile-360] › e2e/admin-attributes-import.spec.ts:454:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (3.4s)
  ✘   25 [mobile-360] › e2e/admin-attributes-import.spec.ts:454:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (retry #1) (3.5s)
  ✘   26 [mobile-360] › e2e/admin-attributes-import.spec.ts:487:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (5.5s)
  ✘   27 [mobile-360] › e2e/admin-attributes-import.spec.ts:487:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (retry #1) (9.4s)
  ✘   28 [mobile-360] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (4.7s)
  ✘   29 [mobile-360] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (retry #1) (4.9s)
  ✘   30 [mobile-360] › e2e/admin-attributes-import.spec.ts:617:3 › C3 attributes console › AT-44 the v2 definition cells commit, export and round-trip unchanged (3.8s)
  ✘   31 [mobile-360] › e2e/admin-attributes-import.spec.ts:617:3 › C3 attributes console › AT-44 the v2 definition cells commit, export and round-trip unchanged (retry #1) (3.5s)
  ✘   32 [mobile-360] › e2e/admin-attributes-import.spec.ts:720:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (4.0s)
  ✘   33 [mobile-360] › e2e/admin-attributes-import.spec.ts:720:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (retry #1) (4.2s)
  ✘   34 [mobile-360] › e2e/admin-attributes-import.spec.ts:798:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (8.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘   18 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (retry #1) (2.1m)
  ✘   35 [mobile-360] › e2e/admin-attributes-import.spec.ts:798:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (retry #1) (9.8s)
  ✘   37 [mobile-360] › e2e/admin-attributes-import.spec.ts:952:3 › C3 attributes console › AT-22 malformed files and dangerous cells are refused (2.5s)
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37347110818-1-2846-2-ppkmcx@ethio-e2e.invalid)
  ✓   70 [mobile-360] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (12.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37347110818-1-2846-2-ppkmcx@ethio-e2e.invalid)
  ✓   69 [mobile-360] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (31.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37347110818-1-2846-3-ozlahh@ethio-e2e.invalid)
  ✓   71 [mobile-360] › e2e/admin-attributes-library.spec.ts:372:3 › C3 attributes console › AT-8 assign from the library: the link lands and Used by updates (16.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37347110818-1-2846-2-ppkmcx@ethio-e2e.invalid)
  ✓   73 [mobile-360] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (2.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37347110818-1-2846-2-ppkmcx@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×36
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×8
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (11) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘   66 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole (2.7s)
  ✘   70 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole (retry #1) (3.0s)
[client-error] console.error: [client-error] gate fetch threw
  ✘   76 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (2.0s)
  ✘   77 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (retry #1) (2.2s)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×3
  ✘   78 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (10.1s)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×3
  ✘   79 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (retry #1) (9.0s)
--- final 10 lines ---
✓  119 [mobile-360] › e2e/photo-pipeline.spec.ts:303:3 › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached (14.6s)
  ✓  120 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:514:3 › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) (22.1s)
  ✓  121 [mobile-360] › e2e/photo-pipeline.spec.ts:329:3 › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over (26.2s)
  ✓  122 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:549:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (17.7s)
  ✓  123 [mobile-360] › e2e/post-wizard-category.spec.ts:171:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (10.5s)
  ✓  125 [mobile-360] › e2e/post-wizard-category.spec.ts:196:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (14.2s)
  ✓  124 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:573:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (17.4s)
  ✓  126 [mobile-360] › e2e/post-wizard-category.spec.ts:220:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (10.4s)
  ✓  127 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:613:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (14.9s)
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
[client-error] console.error: [client-error] gate fetch threw ×2
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×6
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   32 [mobile-360] › e2e/post-wizard-pricing.spec.ts:964:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (21.4s)
--- final 10 lines ---
PR-14 answer: {"ok":true,"draft_step":5,"listing_id":"ca356823-edb0-4073-9248-bbe59ec983f1","price_currency":"ETB"}
  ✓   85 [mobile-360] › e2e/posting-routes.spec.ts:306:3 › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321) (9.3s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   86 [mobile-360] › e2e/post-wizard-specs.spec.ts:2173:3 › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not (16.7s)
  ✓   87 [mobile-360] › e2e/posting-routes.spec.ts:338:3 › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324) (12.0s)
  ✓   89 [mobile-360] › e2e/posting-routes.spec.ts:380:3 › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active (10.5s)
  ✓   88 [mobile-360] › e2e/post-wizard-specs.spec.ts:2248:3 › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41) (11.9s)
  ✓   90 [mobile-360] › e2e/posting-routes.spec.ts:418:3 › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it (12.0s)
  ✓   91 [mobile-360] › e2e/post-wizard-specs.spec.ts:2293:3 › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on (12.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
  ✘    6 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:434:3 › C3 attributes console › AT-32 an import creates a parent and its dependent in one pass (3.0s)
  ✘    7 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:434:3 › C3 attributes console › AT-32 an import creates a parent and its dependent in one pass (retry #1) (4.8s)
  ✘   14 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (5.4s)
  ✘   15 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (retry #1) (4.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘    3 [desktop-1280] › e2e/admin-attributes-import.spec.ts:163:3 › C3 attributes console › AT-20 a real-export round trip is a no-op (2.1m)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘   17 [desktop-1280] › e2e/admin-attributes-import.spec.ts:163:3 › C3 attributes console › AT-20 a real-export round trip is a no-op (retry #1) (2.1m)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘   18 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (2.1m)
  ✘   19 [desktop-1280] › e2e/admin-attributes-import.spec.ts:232:3 › C3 attributes console › AT-26 option key order and an explicit null preview unchanged (4.1s)
  ✘   21 [desktop-1280] › e2e/admin-attributes-import.spec.ts:232:3 › C3 attributes console › AT-26 option key order and an explicit null preview unchanged (retry #1) (3.7s)
  ✘   22 [desktop-1280] › e2e/admin-attributes-import.spec.ts:289:3 › C3 attributes console › AT-63 a swatch-only definitions file previews as one change (3.4s)
  ✘   23 [desktop-1280] › e2e/admin-attributes-import.spec.ts:289:3 › C3 attributes console › AT-63 a swatch-only definitions file previews as one change (retry #1) (4.1s)
  ✘   25 [desktop-1280] › e2e/admin-attributes-import.spec.ts:454:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (4.6s)
  ✘   26 [desktop-1280] › e2e/admin-attributes-import.spec.ts:454:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (retry #1) (4.2s)
  ✘   27 [desktop-1280] › e2e/admin-attributes-import.spec.ts:487:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (5.7s)
  ✘   28 [desktop-1280] › e2e/admin-attributes-import.spec.ts:487:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (retry #1) (7.4s)
  ✘   29 [desktop-1280] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (4.4s)
  ✘   30 [desktop-1280] › e2e/admin-attributes-import.spec.ts:556:3 › C3 attributes console › AT-69 an imported brand option is in the name table after commit and gone after undo (retry #1) (4.9s)
  ✘   31 [desktop-1280] › e2e/admin-attributes-import.spec.ts:617:3 › C3 attributes console › AT-44 the v2 definition cells commit, export and round-trip unchanged (6.3s)
  ✘   32 [desktop-1280] › e2e/admin-attributes-import.spec.ts:617:3 › C3 attributes console › AT-44 the v2 definition cells commit, export and round-trip unchanged (retry #1) (5.3s)
  ✘   33 [desktop-1280] › e2e/admin-attributes-import.spec.ts:720:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (7.2s)
  ✘   34 [desktop-1280] › e2e/admin-attributes-import.spec.ts:720:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (retry #1) (4.0s)
  ✘   35 [desktop-1280] › e2e/admin-attributes-import.spec.ts:798:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (11.7s)
  ✘   36 [desktop-1280] › e2e/admin-attributes-import.spec.ts:798:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (retry #1) (10.5s)
  ✘   37 [desktop-1280] › e2e/admin-attributes-import.spec.ts:952:3 › C3 attributes console › AT-22 malformed files and dangerous cells are refused (3.5s)
  ✘   38 [desktop-1280] › e2e/admin-attributes-import.spec.ts:952:3 › C3 attributes console › AT-22 malformed files and dangerous cells are refused (retry #1) (3.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request)
  ✘   20 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (retry #1) (2.1m)
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37347110818-4-2855-2-g8u6y2@ethio-e2e.invalid)
  ✓   66 [desktop-1280] › e2e/admin-attributes-library.spec.ts:217:3 › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked (27.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37347110818-4-2855-3-mnvwbm@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
  ✘   68 [desktop-1280] › e2e/admin-attributes-links.spec.ts:539:3 › C3 attributes console › AT-39 empty read-only cells are never reported as edits (retry #1) (7.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37347110818-4-2855-2-g8u6y2@ethio-e2e.invalid)
  ✓   69 [desktop-1280] › e2e/admin-attributes-library.spec.ts:283:3 › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear (21.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37347110818-4-2855-3-mnvwbm@ethio-e2e.invalid)
  ✓   71 [desktop-1280] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (13.2s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×36
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×7
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×3
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (8) ---
  ✘   52 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole (2.6s)
  ✘   54 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole (retry #1) (2.7s)
  ✘   56 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (3.3s)
  ✘   60 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (retry #1) (2.5s)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×3
  ✘   65 [desktop-1280] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (8.0s)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×3
  ✘   66 [desktop-1280] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (retry #1) (6.3s)
--- final 10 lines ---
✓  111 [desktop-1280] › e2e/post-wizard-category.spec.ts:171:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (12.0s)
  ✓  112 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:613:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (19.6s)
  ✓  113 [desktop-1280] › e2e/post-wizard-category.spec.ts:196:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (15.0s)
  ✓  114 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:648:3 › POSTING WIZARD — bundle 2 place and contact › PW-122 an empty phone box opens on the country of the item's place (15.5s)
  ✓  115 [desktop-1280] › e2e/post-wizard-category.spec.ts:220:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (14.9s)
  ✓  117 [desktop-1280] › e2e/post-wizard-category.spec.ts:257:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (11.5s)
  ✓  116 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:668:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (16.7s)
  ✓  118 [desktop-1280] › e2e/post-wizard-category.spec.ts:297:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (13.6s)
  ✓  119 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:696:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (13.6s)
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
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:27 at getResponse (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15468:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:15425:9) at async client (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17473:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17404:20) at async userNext (http://127.0.0.1:4173/assets/index-Drg7BJdP.js:17390:21) ×6
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   88 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 360 until lg (572ms)
  ✓   89 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 768 until lg (573ms)
  ✓   90 [desktop-1280] › e2e/primitives-law.spec.ts:164:5 › display primitives law (test-once responsiveness) › L9 cardUntil=lg keeps cards at 1280 until lg (680ms)
  ✓   91 [desktop-1280] › e2e/primitives-law.spec.ts:193:3 › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell (709ms)
  ✓   92 [desktop-1280] › e2e/primitives-law.spec.ts:256:3 › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned (780ms)
  ✓   93 [desktop-1280] › e2e/rbac.spec.ts:34:3 › RBAC client seam › R-1 logged out: no Admin tab and no RBAC request at all (538ms)
  ✓   80 [desktop-1280] › e2e/posting-routes.spec.ts:706:3 › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city (16.1s)
  ✓   94 [desktop-1280] › e2e/rbac.spec.ts:47:3 › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home (9.1s)
  ✓   95 [desktop-1280] › e2e/posting-routes.spec.ts:743:3 › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001 (11.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```
