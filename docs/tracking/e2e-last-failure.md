# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37090622834
- Commit: `56300e85898f4a0213057d7fd59bdbeb627fcaf7`
- Attempt: 1
- Written (UTC): 2026-10-03T02:48:41.934Z
- Passed: 15 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

52 line(s), 21 message(s): 1 off the allowlist, 20 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 6 | shard 3 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 3 | shard 2, shard 5 |
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
| `strings badHeader` (quiet) | 1 | shard 5 |
| `strings nulByte` (quiet) | 1 | shard 5 |
| `strings tooManyRows` (quiet) | 1 | shard 5 |
| `strings unknownColumn` (quiet) | 1 | shard 5 |
| `strings wrongFile` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×6 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · too many previews ×3 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · strings badHeader ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3

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
| email | 2026-10-03T02:42:22.323Z | 0.1 min |
| changed | 2026-10-03T02:43:00.083Z | 1.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 14 | 3.0 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 16.6 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 16.6 s |
| `post-wizard-bundle2.spec.ts` › PW-118 a draft's own channel is never overwritten by the last post's | desktop-1280 | 15.2 s |
| `post-wizard-bundle2.spec.ts` › PW-118 a draft's own channel is never overwritten by the last post's | mobile-360 | 15.0 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | mobile-360 | 14.6 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | mobile-360 | 14.3 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | desktop-1280 | 14.3 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | desktop-1280 | 14.3 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | desktop-1280 | 12.5 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | mobile-360 | 12.3 s |
| `post-wizard-bundle2.spec.ts` › PW-115 without own_place the last post's pin, directions and details carry over | mobile-360 | 10.0 s |
| `post-wizard-bundle2.spec.ts` › PW-115 without own_place the last post's pin, directions and details carry over | desktop-1280 | 9.1 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | desktop-1280 | 8.1 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | mobile-360 | 7.7 s |
| `auth-signup.spec.ts` › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle | email-serial | 3.2 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37090622834-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37090622834-changed
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
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
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
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
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
✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (592ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (525ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (12.0s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (16.7s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.3s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.5s)
  ✓   73 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (16.4s)
  ✓   74 [mobile-360] › e2e/shell.spec.ts:2089:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (29.9s)
  ✓   75 [mobile-360] › e2e/shell.spec.ts:2256:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (6.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   36 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (19.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090622834-1-2841-2-w1el55@ethio-e2e.invalid)
  ✓   38 [mobile-360] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (8.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090622834-1-2841-2-w1el55@ethio-e2e.invalid)
  ✓   37 [mobile-360] › e2e/admin-attributes-library.spec.ts:170:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (24.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090622834-1-2841-3-7vlchp@ethio-e2e.invalid)
  ✓   39 [mobile-360] › e2e/admin-attributes-links.spec.ts:250:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (9.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090622834-1-2841-2-w1el55@ethio-e2e.invalid)
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
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
  ✓   82 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole (2.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090622834-2-3049-2-scn7ww@ethio-e2e.invalid)
  ✓   81 [mobile-360] › e2e/mfa-stepup.spec.ts:114:3 › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor @private-identity (5.4s)
  ✓   83 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason (8.5s)
  ✓   84 [mobile-360] › e2e/mfa-stepup.spec.ts:131:3 › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through @private-identity (10.1s)
  ✓   86 [mobile-360] › e2e/mfa-stepup.spec.ts:167:3 › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called (3.5s)
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
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

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   33 [mobile-360] › e2e/post-wizard-where.spec.ts:148:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (16.4s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (12.6s)
  ✓   37 [mobile-360] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (13.5s)
  ✓   36 [mobile-360] › e2e/post-wizard-where.spec.ts:199:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (27.1s)
  ✓   39 [mobile-360] › e2e/post-wizard-where.spec.ts:313:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3 (11.3s)
  ✓   38 [mobile-360] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (21.9s)
  ✓   40 [mobile-360] › e2e/post-wizard-where.spec.ts:364:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (10.0s)
  ✓   42 [mobile-360] › e2e/post-wizard-where.spec.ts:395:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (13.3s)
  ✓   41 [mobile-360] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (22.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090622834-4-3061-2-voaku1@ethio-e2e.invalid)
  ✓   49 [desktop-1280] › e2e/admin-attributes-links.spec.ts:676:3 › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error (23.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090622834-4-3061-3-ommjm9@ethio-e2e.invalid)
  ✓   51 [desktop-1280] › e2e/admin-attributes-library.spec.ts:471:3 › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) (11.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090622834-4-3061-2-voaku1@ethio-e2e.invalid)
  ✓   52 [desktop-1280] › e2e/admin-attributes-links.spec.ts:781:3 › C3 attributes console › AT-60 a links file reorders three links and the posting read follows (12.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090622834-4-3061-3-ommjm9@ethio-e2e.invalid)
  ✓   54 [desktop-1280] › e2e/admin-attributes-links.spec.ts:919:3 › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged (6.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090622834-4-3061-3-ommjm9@ethio-e2e.invalid)
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
--- error lines (1) ---
  ✘   62 [desktop-1280] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (602ms)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
  ✓   73 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE translations › IG-1 translations: malformed, foreign, oversized and unreadable files are refused whole (3.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090622834-5-3058-3-vapqvx@ethio-e2e.invalid)
  ✓   74 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE translations › IG-2 translations: dangerous cells refuse their own row and name the reason (2.7s)
  ✓   72 [desktop-1280] › e2e/mfa-stepup.spec.ts:210:3 › U1f step-up authentication › MF-5 unenroll requires a fresh verification @private-identity (7.0s)
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
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   25 [desktop-1280] › e2e/post-wizard-specs.spec.ts:996:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (11.4s)
  ✓   26 [desktop-1280] › e2e/post-wizard-where.spec.ts:313:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3 (14.6s)
  ✓   27 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1059:3 › POSTING WIZARD › PW-18 specifications survive a step Back (12.3s)
  ✓   28 [desktop-1280] › e2e/post-wizard-where.spec.ts:364:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (13.9s)
  ✓   29 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1107:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (13.0s)
  ✓   30 [desktop-1280] › e2e/post-wizard-where.spec.ts:395:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (17.3s)
  ✓   31 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1133:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (12.1s)
  ✓   32 [desktop-1280] › e2e/post-wizard-where.spec.ts:430:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (16.5s)
  ✓   33 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1183:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (14.5s)
```
