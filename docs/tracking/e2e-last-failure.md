# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37229297461
- Commit: `31f1f208a62482f8d181aac829b3b4d5c5e9507b`
- Attempt: 1
- Written (UTC): 2026-10-04T19:49:34.210Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 line(s), 7 message(s): 1 off the allowlist, 6 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 3 | shard 3, shard 6 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | shard 4 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 1 | shard 4 |
| `definitions wrongFile` (quiet) | 1 | shard 4 |
| `digest mismatch` (quiet) | 1 | shard 4 |
| `preview_failed permission denied` (quiet) | 1 | shard 4 |

Quiet (allowlisted): definitions badHeader ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed duplicate key value violates unique constraint <q> ×1 · definitions wrongFile ×1 · digest mismatch ×1 · preview_failed permission denied ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 37229297461-email
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
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

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

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   60 [mobile-360] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (6.5s)
  ✓   61 [mobile-360] › e2e/shell.spec.ts:1560:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (11.3s)
  ✓   62 [mobile-360] › e2e/shell.spec.ts:1575:3 › U4h device language star › TR-28 the account carries onto a starless device, and never over a star (15.9s)
  ✓   63 [mobile-360] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.3s)
  ✓   64 [mobile-360] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (5.7s)
  ✓   65 [mobile-360] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (14.9s)
  ✓   66 [mobile-360] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (679ms)
  ✓   67 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (738ms)
  ✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (587ms)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.6s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37229297461-email

  1 passed (16.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37229297461-1-3072-2-jzigsi@ethio-e2e.invalid)
  ✓   16 [mobile-360] › e2e/admin-attributes-import.spec.ts:651:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (13.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37229297461-1-3072-3-ge0edc@ethio-e2e.invalid)
  ✓   17 [mobile-360] › e2e/admin-attributes-editor.spec.ts:796:3 › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back (15.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37229297461-1-3072-2-jzigsi@ethio-e2e.invalid)
  ✓   18 [mobile-360] › e2e/admin-attributes-import.spec.ts:729:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (16.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37229297461-1-3072-3-ge0edc@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
  ✓   20 [mobile-360] › e2e/admin-attributes-import.spec.ts:883:3 › C3 attributes console › AT-22 malformed files and dangerous cells are refused (12.5s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (5) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   38 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (34.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   41 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (retry #1) (33.1s)
--- final 10 lines ---
✓   37 [mobile-360] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (17.4s)
  ✓   39 [mobile-360] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (15.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   38 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (34.9s)
  ✓   40 [mobile-360] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (15.1s)
  ✓   42 [mobile-360] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (10.3s)
  ✓   43 [mobile-360] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (17.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   41 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (retry #1) (33.1s)
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
-   28 [mobile-360] › e2e/post-wizard-pricing.spec.ts:713:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)
  ✓   27 [mobile-360] › e2e/post-wizard-specs.spec.ts:419:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (11.1s)
  ✓   29 [mobile-360] › e2e/post-wizard-pricing.spec.ts:739:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (9.3s)
  ✓   30 [mobile-360] › e2e/post-wizard-specs.spec.ts:484:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (10.1s)
  ✓   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:940:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (10.6s)
  ✓   32 [mobile-360] › e2e/post-wizard-specs.spec.ts:513:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (8.8s)
  ✓   34 [mobile-360] › e2e/post-wizard-specs.spec.ts:538:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (6.1s)
  ✓   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:961:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (11.2s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:559:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (6.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37229297461-4-3074-3-sbzbft@ethio-e2e.invalid)
  ✓   41 [desktop-1280] › e2e/admin-attributes-library.spec.ts:217:3 › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked (22.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37229297461-4-3074-2-pfxfss@ethio-e2e.invalid)
  ✓   43 [desktop-1280] › e2e/admin-attributes-links.spec.ts:443:3 › C3 attributes console › AT-38 an inherited echo does not collide with a direct row (9.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37229297461-4-3074-3-sbzbft@ethio-e2e.invalid)
  ✓   45 [desktop-1280] › e2e/admin-attributes-links.spec.ts:538:3 › C3 attributes console › AT-39 empty read-only cells are never reported as edits (4.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37229297461-4-3074-3-sbzbft@ethio-e2e.invalid)
  ✓   44 [desktop-1280] › e2e/admin-attributes-library.spec.ts:283:3 › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear (16.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37229297461-4-3074-2-pfxfss@ethio-e2e.invalid)
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
✓   18 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (13.1s)
  ✓   19 [desktop-1280] › e2e/admin-users.spec.ts:286:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (9.7s)
  ✓   20 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (15.5s)
  ✓   21 [desktop-1280] › e2e/admin-users.spec.ts:299:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (24.1s)
  ✓   22 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (14.1s)
  ✓   24 [desktop-1280] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (14.3s)
  ✓   23 [desktop-1280] › e2e/admin-users.spec.ts:327:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (22.6s)
  ✓   26 [desktop-1280] › e2e/admin-users.spec.ts:371:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (10.3s)
  ✓   25 [desktop-1280] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (18.3s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:559:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (20.4s)
  ✓   15 [desktop-1280] › e2e/post-wizard-specs.spec.ts:635:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (18.8s)
  ✓   14 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (21.8s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (19.3s)
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:662:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (24.1s)
  ✓   18 [desktop-1280] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (17.7s)
  ✓   19 [desktop-1280] › e2e/post-wizard-specs.spec.ts:662:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (22.2s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:984:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (18.9s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:730:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (26.2s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
