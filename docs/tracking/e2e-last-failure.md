# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37075278210
- Commit: `efb7d9e0a26eeada76f972d4f63e7ecb54777a53`
- Attempt: 1
- Written (UTC): 2026-10-02T23:06:01.296Z
- Passed: 29 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

27 line(s), 10 message(s): 1 off the allowlist, 9 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `digest mismatch` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `listing not found` | 2 | shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · digest mismatch ×3 · commit_failed duplicate key value violates unique constraint <q> ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 2 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-02T22:59:38.224Z | 0.2 min |
| changed | 2026-10-02T22:59:33.778Z | 4.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-where.spec.ts` | 28 | 7.8 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 37.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 31.8 s |
| `post-wizard-where.spec.ts` › PW-99 the place boxes step in; every select stays at least 200 px | desktop-1280 | 26.0 s |
| `post-wizard-where.spec.ts` › PW-90 two boxes, a red border per unfilled level, the plan in one line | mobile-360 | 24.1 s |
| `post-wizard-where.spec.ts` › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3 | mobile-360 | 22.6 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | mobile-360 | 21.6 s |
| `post-wizard-where.spec.ts` › PW-99 the place boxes step in; every select stays at least 200 px | mobile-360 | 21.0 s |
| `post-wizard-where.spec.ts` › PW-89 thousand / million: the full amount is stored and shown | desktop-1280 | 20.9 s |
| `post-wizard-where.spec.ts` › PW-104 a unit settled by the type is named on step 5 and changed on step 3 | mobile-360 | 20.5 s |
| `post-wizard-where.spec.ts` › PW-90 two boxes, a red border per unfilled level, the plan in one line | desktop-1280 | 20.4 s |
| `post-wizard-where.spec.ts` › PW-104 a unit settled by the type is named on step 5 and changed on step 3 | desktop-1280 | 19.9 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 16.9 s |
| `post-wizard-where.spec.ts` › PW-89 thousand / million: the full amount is stored and shown | mobile-360 | 16.5 s |
| `post-wizard-where.spec.ts` › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3 | desktop-1280 | 14.0 s |
| `post-wizard-where.spec.ts` › PW-91 location details without a pin are stored in a category without map_pin | desktop-1280 | 12.5 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37075278210-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37075278210-changed
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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
✓   65 [mobile-360] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (14.2s)
  ✓   66 [mobile-360] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (758ms)
  ✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (823ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (658ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (8.3s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (16.4s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (14.8s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.1s)
  ✓   73 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (19.0s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075278210-1-2836-3-olmixa@ethio-e2e.invalid)
  ✓   46 [mobile-360] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (10.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075278210-1-2836-3-olmixa@ethio-e2e.invalid)
  ✓   45 [mobile-360] › e2e/admin-attributes-links.spec.ts:596:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (28.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075278210-1-2836-2-lkazbn@ethio-e2e.invalid)
  ✓   47 [mobile-360] › e2e/admin-attributes-library.spec.ts:372:3 › C3 attributes console › AT-8 assign from the library: the link lands and Used by updates (17.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075278210-1-2836-3-olmixa@ethio-e2e.invalid)
  ✓   49 [mobile-360] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (2.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075278210-1-2836-3-olmixa@ethio-e2e.invalid)
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
✓   72 [mobile-360] › e2e/layout.spec.ts:35:1 › LY-2 mobile pages do not overflow (3.0s)
  ✓   73 [mobile-360] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (2.1s)
  ✓   74 [mobile-360] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.1s)
  ✓   75 [mobile-360] › e2e/layout.spec.ts:71:1 › LY-5 Account tab opens the overview and profile card (1.6s)
  ✓   76 [mobile-360] › e2e/locations-tree.spec.ts:66:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (407ms)
  ✓   77 [mobile-360] › e2e/locations-tree.spec.ts:94:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (420ms)
  ✓   70 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (13.6s)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   78 [mobile-360] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (31.2s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   36 [mobile-360] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (11.8s)
  ✓   35 [mobile-360] › e2e/post-wizard-where.spec.ts:199:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (27.8s)
  ✓   37 [mobile-360] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (11.8s)
  ✓   38 [mobile-360] › e2e/post-wizard-where.spec.ts:313:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3 (10.6s)
  ✓   40 [mobile-360] › e2e/post-wizard-where.spec.ts:364:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (9.7s)
  ✓   39 [mobile-360] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (23.0s)
  ✓   41 [mobile-360] › e2e/post-wizard-where.spec.ts:395:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (12.0s)
  ✓   42 [mobile-360] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (21.3s)
  ✓   43 [mobile-360] › e2e/post-wizard-where.spec.ts:430:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (17.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075278210-4-3046-3-gaepjb@ethio-e2e.invalid)
  ✓   55 [desktop-1280] › e2e/admin-attributes-library.spec.ts:561:3 › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN (5.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075278210-4-3046-2-ui6ziy@ethio-e2e.invalid)
  ✓   57 [desktop-1280] › e2e/admin-attributes-library.spec.ts:612:3 › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending (4.1s)
  ✓   56 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1043:3 › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file (11.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075278210-4-3046-3-gaepjb@ethio-e2e.invalid)
  ✓   58 [desktop-1280] › e2e/admin-attributes-library.spec.ts:665:3 › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses (8.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075278210-4-3046-2-ui6ziy@ethio-e2e.invalid)
  ✓   60 [desktop-1280] › e2e/admin-attributes-library.spec.ts:788:3 › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety (6.0s)
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
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075278210-5-2851-2-47tpyk@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
  ✓   70 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole (2.7s)
  ✓   65 [desktop-1280] › e2e/i18n-bundle.spec.ts:104:3 › STAB-I18N · cached translation bundle › IB-2 publishing a fence language moves the version and the bundle (15.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075278210-5-2851-2-47tpyk@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   28 [desktop-1280] › e2e/post-wizard-where.spec.ts:364:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (13.8s)
  ✓   30 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1133:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (12.2s)
  ✓   31 [desktop-1280] › e2e/post-wizard-where.spec.ts:395:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (15.8s)
  ✓   32 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1183:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (12.5s)
  ✓   33 [desktop-1280] › e2e/post-wizard-where.spec.ts:430:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (18.5s)
  ✓   34 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1235:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (12.5s)
  ✓   35 [desktop-1280] › e2e/post-wizard-where.spec.ts:503:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-91 location details without a pin are stored in a category without map_pin (8.6s)
  ✓   36 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1278:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (14.6s)
  ✓   37 [desktop-1280] › e2e/post-wizard-where.spec.ts:531:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen (9.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
