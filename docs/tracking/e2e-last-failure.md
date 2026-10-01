# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36909917591
- Commit: `d5b9740aa859bc87ee0182efe5dc8dffbe4d02a8`
- Attempt: 1
- Written (UTC): 2026-10-01T18:58:46.238Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

32 line(s), 17 message(s): 2 off the allowlist, 15 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `digest mismatch` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `categories badHeader` (quiet) | 1 | shard 2 |
| `categories file too large` (quiet) | 1 | shard 2 |
| `categories nulByte` (quiet) | 1 | shard 2 |
| `categories unknownColumn` (quiet) | 1 | shard 2 |
| `categories wrongFile` (quiet) | 1 | shard 2 |
| `definitions nulByte` (quiet) | 1 | shard 2 |
| `definitions tooManyRows` (quiet) | 1 | shard 2 |
| `definitions unknownColumn` (quiet) | 1 | shard 2 |
| `new row for relation <q> violates check constraint <q>` | 1 | shard 6 |
| `too many previews` (quiet) | 1 | shard 2 |

Quiet (allowlisted): commit_failed duplicate key value violates unique constraint <q> ×4 · category-images: no GEMINI_API_KEY — fake mode ×3 · definitions badHeader ×3 · definitions wrongFile ×3 · digest mismatch ×3 · preview_failed permission denied ×2 · categories badHeader ×1 · categories file too large ×1 · categories nulByte ×1 · categories unknownColumn ×1 · categories wrongFile ×1 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1 · too many previews ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 1 · Sources: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 36909917591-email
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   67 [mobile-360] › e2e/shell.spec.ts:1801:3 › L4b location picker › LS-4 a closed market is not guessed (788ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1820:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (692ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1918:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.6s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1947:3 › L4b location picker › LS-7 a region code alone selects the region (14.8s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1975:3 › L4b location picker › LS-8 a city name alone selects that city (16.2s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:1997:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (16.2s)
  ✓   73 [mobile-360] › e2e/shell.spec.ts:2025:3 › L4b location picker › LS-10 a saved area beats the deepest guess (17.7s)
  ✓   74 [mobile-360] › e2e/shell.spec.ts:2068:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (22.0s)
  ✓   75 [mobile-360] › e2e/shell.spec.ts:2235:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (8.7s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:setup] maintenance skipped (owner: shard 1)
[e2e:setup] state written; setup complete

Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] deleted 4 user(s) owned by process 36909917591-email

  1 passed (11.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (3) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed
  ✘   37 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (16.1s)
  ✘   39 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (retry #1) (15.0s)
--- final 10 lines ---
✘   37 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (16.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-1-2874-2-ujele8@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✘   39 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (retry #1) (15.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-1-2874-2-ujele8@ethio-e2e.invalid)
  ✓   38 [mobile-360] › e2e/admin-attributes-library.spec.ts:217:3 › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked (24.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36909917591-1-2874-3-lg5vb8@ethio-e2e.invalid)
  ✓   40 [mobile-360] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (6.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-1-2874-2-ujele8@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
  ✓   83 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole (3.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36909917591-2-3077-3-ygcofi@ethio-e2e.invalid)
  ✓   82 [mobile-360] › e2e/mfa-stepup.spec.ts:135:3 › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through @private-identity (11.9s)
  ✓   84 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason (9.6s)
  ✓   85 [mobile-360] › e2e/mfa-stepup.spec.ts:171:3 › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called (4.5s)
  ✓   87 [mobile-360] › e2e/mfa-stepup.spec.ts:186:3 › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI (7.4s)
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
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   65 [mobile-360] › e2e/post-wizard-specs.spec.ts:1622:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (6.6s)
  ✓   67 [mobile-360] › e2e/posting-routes.spec.ts:421:3 › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps (5.1s)
  ✓   69 [mobile-360] › e2e/posting-routes.spec.ts:465:3 › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304 (577ms)
  ✓   68 [mobile-360] › e2e/post-wizard-specs.spec.ts:1697:3 › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides (8.8s)
  ✓   71 [mobile-360] › e2e/post-wizard-specs.spec.ts:1759:3 › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not (8.8s)
  ✓   70 [mobile-360] › e2e/posting-routes.spec.ts:488:3 › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached (14.6s)
  ✓   73 [mobile-360] › e2e/posting-routes.spec.ts:521:3 › POSTING ROUTES › PR-8 no bearer is 401 on every posting route (591ms)
  ✓   74 [mobile-360] › e2e/posting-routes.spec.ts:529:3 › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited (3.3s)
  ✓   72 [mobile-360] › e2e/post-wizard-specs.spec.ts:1834:3 › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41) (5.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
  ✘   38 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (10.8s)
  ✘   40 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (retry #1) (13.6s)
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-4-2867-2-hcyjlm@ethio-e2e.invalid)
  ✓   44 [desktop-1280] › e2e/admin-attributes-links.spec.ts:352:3 › C3 attributes console › AT-37 a delete after the file's own unlink is accepted and undone (10.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36909917591-4-2867-3-qhgjts@ethio-e2e.invalid)
  ✓   46 [desktop-1280] › e2e/admin-attributes-links.spec.ts:443:3 › C3 attributes console › AT-38 an inherited echo does not collide with a direct row (9.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36909917591-4-2867-3-qhgjts@ethio-e2e.invalid)
  ✓   45 [desktop-1280] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (12.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-4-2867-2-hcyjlm@ethio-e2e.invalid)
  ✓   47 [desktop-1280] › e2e/admin-attributes-links.spec.ts:538:3 › C3 attributes console › AT-39 empty read-only cells are never reported as edits (5.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36909917591-4-2867-3-qhgjts@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-5-2927-2-53qoaf@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 0b7905f5-4358-42b7-bfc2-f921b300261b: []
  ✓   22 [desktop-1280] › e2e/admin-translations-console.spec.ts:735:3 › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one (21.7s)
  ✓   21 [desktop-1280] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (27.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36909917591-5-2927-3-imqw4i@ethio-e2e.invalid)
  ✓   23 [desktop-1280] › e2e/admin-translations-console.spec.ts:843:3 › U4b translations console › TR-scope AI: a translator outside the language gets the structured refusal (4.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36909917591-5-2927-2-53qoaf@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 0b7905f5-4358-42b7-bfc2-f921b300261b: []
  ✓   24 [desktop-1280] › e2e/admin-translations-governance.spec.ts:1088:3 › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows (16.6s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    5 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:379:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (7.5s)
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
  ✓    6 [desktop-1280] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (10.5s)
  ✓    7 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:404:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (10.0s)
  ✓    9 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:428:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (9.4s)
  ✓    8 [desktop-1280] › e2e/post-wizard-resets.spec.ts:494:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (13.8s)
  ✓   10 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:475:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (8.4s)
  ✓   12 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:513:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (9.1s)
  ✓   11 [desktop-1280] › e2e/post-wizard-resets.spec.ts:542:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (18.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```
