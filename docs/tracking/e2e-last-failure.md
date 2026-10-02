# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37075776773
- Commit: `50aa46acb1b9a454af4b819badcedf61cf85dfc8`
- Attempt: 1
- Written (UTC): 2026-10-02T23:12:27.878Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

15 line(s), 7 message(s): 1 off the allowlist, 6 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 1, shard 2, shard 4 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 2 | shard 3 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×3 · commit_failed duplicate key value violates unique constraint <q> ×2 · definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 2 · Sources: shard 3

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
[e2e:teardown] deleted 4 user(s) owned by process 37075776773-email
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
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

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
✓   64 [mobile-360] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (6.9s)
  ✓   65 [mobile-360] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (17.2s)
  ✓   66 [mobile-360] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (724ms)
  ✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (541ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (595ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (9.3s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (15.5s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.8s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (14.8s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.5s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37075776773-email

  1 passed (12.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   34 [mobile-360] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (25.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075776773-1-3082-3-bxqnd9@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   36 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (19.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075776773-1-3082-2-1semsf@ethio-e2e.invalid)
  ✓   38 [mobile-360] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (9.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075776773-1-3082-2-1semsf@ethio-e2e.invalid)
  ✓   37 [mobile-360] › e2e/admin-attributes-library.spec.ts:170:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (24.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075776773-1-3082-3-bxqnd9@ethio-e2e.invalid)
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
✓   55 [mobile-360] › e2e/category-image-routes.spec.ts:160:3 › C5a — category AI foundation routes › CI-2b unknown categoryId is an honest 404, never a 502 (6.2s)
  ✓   54 [mobile-360] › e2e/category-nav.spec.ts:105:3 › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it (6.6s)
  ✓   57 [mobile-360] › e2e/geo.spec.ts:19:3 › L4a geo guess › GE-1 the node runtime has no edge guess: source none, three nulls, no-store (74ms)
  ✓   58 [mobile-360] › e2e/geo.spec.ts:33:3 › L4a geo guess › GE-2 a cf-ipcountry header is the second source: the country only (73ms)
  ✓   59 [mobile-360] › e2e/geo.spec.ts:54:3 › L4a geo guess › GE-3 a malformed header is no guess at all (77ms)
  ✓   60 [mobile-360] › e2e/geo.spec.ts:74:3 › L4a geo guess › GE-4 the visitor-location headers are the deepest source (72ms)
  ✓   61 [mobile-360] › e2e/geo.spec.ts:104:3 › L4a geo guess › GE-5 malformed coordinates fall to the country header (78ms)
  ✓   62 [mobile-360] › e2e/i18n-bundle.spec.ts:72:3 › STAB-I18N · cached translation bundle › IB-1 repeated GETs are identical, validated, and 304 on If-None-Match (2.1s)
  ✓   56 [mobile-360] › e2e/category-image-routes.spec.ts:176:3 › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp (8.7s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   20 [mobile-360] › e2e/post-wizard-specs.spec.ts:211:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (14.9s)
  ✓   22 [mobile-360] › e2e/post-wizard-pricing.spec.ts:634:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (10.9s)
  ✓   23 [mobile-360] › e2e/post-wizard-specs.spec.ts:289:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (18.7s)
  ✓   24 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (20.7s)
  ✓   25 [mobile-360] › e2e/post-wizard-specs.spec.ts:374:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (14.8s)
  ✓   27 [mobile-360] › e2e/post-wizard-specs.spec.ts:407:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (10.9s)
  ✓   26 [mobile-360] › e2e/post-wizard-pricing.spec.ts:688:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from photos reopens details (INC-315) (16.4s)
  ✓   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:714:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (12.8s)
  ✓   28 [mobile-360] › e2e/post-wizard-specs.spec.ts:468:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (14.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
  ✓   37 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1646:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (25.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075776773-4-2977-3-nhkqgi@ethio-e2e.invalid)
  ✓   39 [desktop-1280] › e2e/admin-attributes-links.spec.ts:174:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (12.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075776773-4-2977-3-nhkqgi@ethio-e2e.invalid)
  ✓   38 [desktop-1280] › e2e/admin-attributes-library.spec.ts:170:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (28.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37075776773-4-2977-2-fphkpe@ethio-e2e.invalid)
  ✓   40 [desktop-1280] › e2e/admin-attributes-links.spec.ts:250:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (14.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37075776773-4-2977-3-nhkqgi@ethio-e2e.invalid)
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
✓   35 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (6.3s)
  ✓   36 [desktop-1280] › e2e/admin-users.spec.ts:277:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (8.7s)
  ✓   37 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.1s)
  ✓   38 [desktop-1280] › e2e/admin-users.spec.ts:290:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (20.9s)
  ✓   39 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (13.7s)
  ✓   41 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (12.8s)
  ✓   40 [desktop-1280] › e2e/admin-users.spec.ts:318:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (20.5s)
  ✓   42 [desktop-1280] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (7.1s)
  ✓   43 [desktop-1280] › e2e/admin-users.spec.ts:362:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (7.6s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:701:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (18.5s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:829:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (13.4s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (27.9s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:957:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (13.9s)
  ✓   22 [desktop-1280] › e2e/post-wizard-where.spec.ts:148:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (19.5s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (28.1s)
  ✓   24 [desktop-1280] › e2e/post-wizard-specs.spec.ts:938:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (18.3s)
  ✓   23 [desktop-1280] › e2e/post-wizard-where.spec.ts:199:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (34.8s)
  ✓   25 [desktop-1280] › e2e/post-wizard-specs.spec.ts:996:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (16.6s)
```
