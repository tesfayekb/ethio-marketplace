# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37233192980
- Commit: `3c95a92a3207f855673f7241d87c19c1c991812a`
- Attempt: 1
- Written (UTC): 2026-10-04T20:51:24.883Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

26 line(s), 10 message(s): 1 off the allowlist, 9 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `digest mismatch` (quiet) | 3 | shard 1, shard 4, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 1 | shard 3 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · digest mismatch ×3 · commit_failed duplicate key value violates unique constraint <q> ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
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
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37233192980-email
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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
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
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
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
✓   63 [mobile-360] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (802ms)
  ✓   64 [mobile-360] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (6.6s)
  ✓   65 [mobile-360] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.2s)
  ✓   66 [mobile-360] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (697ms)
  ✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (998ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (536ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (9.6s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (16.3s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (16.1s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.1s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37233192980-email

  1 passed (9.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   34 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1534:3 › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count (11.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233192980-1-2854-2-l5k2qk@ethio-e2e.invalid)
  ✓   35 [mobile-360] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (24.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37233192980-1-2854-3-rttsnq@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   36 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (19.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233192980-1-2854-2-l5k2qk@ethio-e2e.invalid)
  ✓   38 [mobile-360] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (11.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233192980-1-2854-2-l5k2qk@ethio-e2e.invalid)
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
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
  ✓   62 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole (3.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233192980-2-3031-2-6d9zhf@ethio-e2e.invalid)
  ✓   61 [mobile-360] › e2e/i18n-coverage.spec.ts:236:3 › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary (10.3s)
  -   64 [mobile-360] › e2e/layout.spec.ts:18:1 › LY-1 wide pages use most of the desktop content width
  ✓   65 [mobile-360] › e2e/layout.spec.ts:35:1 › LY-2 mobile pages do not overflow (2.6s)
  ✓   66 [mobile-360] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (1.2s)
  ✓   67 [mobile-360] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.2s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   27 [mobile-360] › e2e/post-wizard-specs.spec.ts:443:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (12.6s)
  ✓   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:739:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (10.4s)
  ✓   30 [mobile-360] › e2e/post-wizard-specs.spec.ts:476:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (8.0s)
  ✓   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:940:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (8.0s)
  ✓   32 [mobile-360] › e2e/post-wizard-specs.spec.ts:541:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (6.4s)
  ✓   34 [mobile-360] › e2e/post-wizard-specs.spec.ts:570:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (9.9s)
  ✓   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:961:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (19.2s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:595:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (13.9s)
  ✓   36 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1026:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (16.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   35 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1534:3 › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count (12.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37233192980-4-3058-3-utklib@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   36 [desktop-1280] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (25.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37233192980-4-3058-2-ofodbp@ethio-e2e.invalid)
  ✓   37 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (23.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37233192980-4-3058-3-utklib@ethio-e2e.invalid)
  ✓   39 [desktop-1280] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (13.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37233192980-4-3058-3-utklib@ethio-e2e.invalid)
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
✓   55 [desktop-1280] › e2e/layout.spec.ts:18:1 › LY-1 wide pages use most of the desktop content width (2.7s)
  -   56 [desktop-1280] › e2e/layout.spec.ts:35:1 › LY-2 mobile pages do not overflow
  ✓   57 [desktop-1280] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (1.0s)
  ✓   58 [desktop-1280] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.2s)
  ✓   59 [desktop-1280] › e2e/layout.spec.ts:71:1 › LY-5 Account tab opens the overview and profile card (1.3s)
  ✓   60 [desktop-1280] › e2e/locations-tree.spec.ts:66:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (151ms)
  ✓   61 [desktop-1280] › e2e/locations-tree.spec.ts:94:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (209ms)
  ✓   54 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (13.0s)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
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

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:984:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (20.0s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:719:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (22.5s)
  ✓   22 [desktop-1280] › e2e/post-wizard-where.spec.ts:152:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (18.4s)
  ✓   23 [desktop-1280] › e2e/post-wizard-specs.spec.ts:787:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (28.0s)
  ✓   24 [desktop-1280] › e2e/post-wizard-where.spec.ts:203:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (30.1s)
  ✓   25 [desktop-1280] › e2e/post-wizard-specs.spec.ts:787:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (24.7s)
  ✓   26 [desktop-1280] › e2e/post-wizard-where.spec.ts:314:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (15.6s)
  ✓   27 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1032:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (19.5s)
  ✓   28 [desktop-1280] › e2e/post-wizard-where.spec.ts:367:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (17.0s)
```
