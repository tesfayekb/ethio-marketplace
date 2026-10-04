# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37226022373
- Commit: `2e08cdebd7fc4241bec5e86da87f6001190567c0`
- Attempt: 1
- Written (UTC): 2026-10-04T18:59:50.333Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

21 line(s), 10 message(s): 1 off the allowlist, 9 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 1, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 4, shard 5 |
| `digest mismatch` (quiet) | 3 | shard 1, shard 4, shard 5 |
| `listing not found` | 3 | shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 1 | shard 4 |
| `definitions nulByte` (quiet) | 1 | shard 5 |
| `definitions tooManyRows` (quiet) | 1 | shard 5 |
| `definitions unknownColumn` (quiet) | 1 | shard 5 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×3 · definitions badHeader ×3 · definitions wrongFile ×3 · digest mismatch ×3 · preview_failed permission denied ×2 · commit_failed duplicate key value violates unique constraint <q> ×1 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37226022373-email
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
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

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

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   61 [mobile-360] › e2e/shell.spec.ts:1560:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (9.9s)
  ✓   62 [mobile-360] › e2e/shell.spec.ts:1575:3 › U4h device language star › TR-28 the account carries onto a starless device, and never over a star (16.9s)
  ✓   63 [mobile-360] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.2s)
  ✓   64 [mobile-360] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (6.9s)
  ✓   65 [mobile-360] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.8s)
  ✓   66 [mobile-360] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (934ms)
  ✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (672ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (614ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (9.6s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.5s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37226022373-email

  1 passed (15.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   31 [mobile-360] › e2e/admin-attributes-library.spec.ts:46:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (14.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226022373-1-2855-3-zlztgm@ethio-e2e.invalid)
  ✓   32 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1413:3 › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets (15.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226022373-1-2855-2-jafxls@ethio-e2e.invalid)
  ✓   33 [mobile-360] › e2e/admin-attributes-library.spec.ts:66:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (16.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226022373-1-2855-3-zlztgm@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   34 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1534:3 › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count (10.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226022373-1-2855-2-jafxls@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   30 [mobile-360] › e2e/admin-users.spec.ts:371:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (11.0s)
  ✓   31 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (13.3s)
  ✓   33 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (11.1s)
  ✓   32 [mobile-360] › e2e/admin-users.spec.ts:384:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (22.1s)
  ✓   34 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (9.0s)
  ✓   36 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (13.5s)
  ✓   35 [mobile-360] › e2e/admin-users.spec.ts:412:3 › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes (29.2s)
  ✓   37 [mobile-360] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (15.5s)
  ✓   39 [mobile-360] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (17.1s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   24 [mobile-360] › e2e/post-wizard-pricing.spec.ts:668:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (19.2s)
  ✓   25 [mobile-360] › e2e/post-wizard-specs.spec.ts:386:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (10.1s)
  ✓   26 [mobile-360] › e2e/post-wizard-pricing.spec.ts:689:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315) (11.8s)
  -   28 [mobile-360] › e2e/post-wizard-pricing.spec.ts:713:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)
  ✓   27 [mobile-360] › e2e/post-wizard-specs.spec.ts:419:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (10.6s)
  ✓   30 [mobile-360] › e2e/post-wizard-specs.spec.ts:484:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (8.3s)
  ✓   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:739:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (10.4s)
  ✓   31 [mobile-360] › e2e/post-wizard-specs.spec.ts:513:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (8.7s)
  ✓   32 [mobile-360] › e2e/post-wizard-pricing.spec.ts:940:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (10.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   36 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1534:3 › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count (13.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226022373-4-2838-3-v1992h@ethio-e2e.invalid)
  ✓   35 [desktop-1280] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (24.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226022373-4-2838-2-df4axh@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   37 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (15.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226022373-4-2838-3-v1992h@ethio-e2e.invalid)
  ✓   39 [desktop-1280] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (10.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226022373-4-2838-3-v1992h@ethio-e2e.invalid)
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
✓   53 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason (5.2s)
  ✓   55 [desktop-1280] › e2e/layout.spec.ts:18:1 › LY-1 wide pages use most of the desktop content width (2.2s)
  -   57 [desktop-1280] › e2e/layout.spec.ts:35:1 › LY-2 mobile pages do not overflow
  ✓   58 [desktop-1280] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (1.5s)
  ✓   59 [desktop-1280] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.4s)
  ✓   60 [desktop-1280] › e2e/layout.spec.ts:71:1 › LY-5 Account tab opens the overview and profile card (2.0s)
  ✓   61 [desktop-1280] › e2e/locations-tree.spec.ts:66:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (156ms)
  ✓   62 [desktop-1280] › e2e/locations-tree.spec.ts:94:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (199ms)
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
✓   15 [desktop-1280] › e2e/post-wizard-specs.spec.ts:635:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (23.6s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   16 [desktop-1280] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (19.7s)
  ✓   17 [desktop-1280] › e2e/post-wizard-specs.spec.ts:662:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (24.4s)
  ✓   18 [desktop-1280] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (16.1s)
  ✓   19 [desktop-1280] › e2e/post-wizard-specs.spec.ts:662:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (23.7s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:984:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (17.8s)
  ✓   22 [desktop-1280] › e2e/post-wizard-where.spec.ts:152:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (19.5s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:730:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (28.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
