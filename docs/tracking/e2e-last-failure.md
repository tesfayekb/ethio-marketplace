# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37226463359
- Commit: `989f58d093af41d12f72b273e5534ec27ed6a121`
- Attempt: 1
- Written (UTC): 2026-10-04T19:05:03.034Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

4 line(s), 2 message(s): 1 off the allowlist, 1 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 2 | shard 3 |

Quiet (allowlisted): definitions badHeader ×2

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
[e2e:teardown] deleted 4 user(s) owned by process 37226463359-email
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
-   29 [mobile-360] › e2e/shell.spec.ts:580:3 › corner-block grid › every rail row carries a leading icon on one gutter
  -   30 [mobile-360] › e2e/shell.spec.ts:600:3 › corner-block grid › category rows carry DISTINCT icons, not one repeated glyph
  -   31 [mobile-360] › e2e/shell.spec.ts:618:3 › corner-block grid › the rail collapses to icons, shows a tooltip, and remembers the choice
  -   32 [mobile-360] › e2e/shell.spec.ts:672:3 › corner-block grid › exactly one collapse toggle, and the wordmark moves into the bar when collapsed
  -   33 [mobile-360] › e2e/shell.spec.ts:710:3 › corner-block grid › the rail sign-out is absent for a logged-out visitor
  -   34 [mobile-360] › e2e/shell.spec.ts:721:3 › tablet chrome (md = 768px) › tablets get the persistent rail and the FULL controls
  -   35 [mobile-360] › e2e/shell.spec.ts:751:3 › tablet chrome (md = 768px) › the top bar is ONE band: logo-cell height AND background, location row separate
  ✓   36 [mobile-360] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (1.4s)
  ✓   37 [mobile-360] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger (1.1s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37226463359-email

  1 passed (8.4s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226463359-1-3037-3-rdvlr1@ethio-e2e.invalid)
  ✓   16 [mobile-360] › e2e/admin-attributes-editor.spec.ts:742:3 › C3 attributes console › AT-49 saving a select definition without edits preserves every stored option field (11.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226463359-1-3037-2-zlpssv@ethio-e2e.invalid)
  ✓   17 [mobile-360] › e2e/admin-attributes-import.spec.ts:729:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (12.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226463359-1-3037-3-rdvlr1@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
  ✓   18 [mobile-360] › e2e/admin-attributes-editor.spec.ts:796:3 › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back (12.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226463359-1-3037-2-zlpssv@ethio-e2e.invalid)
  ✓   19 [mobile-360] › e2e/admin-attributes-import.spec.ts:883:3 › C3 attributes console › AT-22 malformed files and dangerous cells are refused (10.2s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   26 [mobile-360] › e2e/auth-signin-errors.spec.ts:41:1 › B-3: wrong-password and unknown-email are indistinguishable (2.9s)
  ✓   27 [mobile-360] › e2e/auth-signin-errors.spec.ts:60:1 › B-4: unconfirmed account cannot sign in (2.1s)
  ✓   28 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (2.6s)
  ✓   19 [mobile-360] › e2e/admin-users.spec.ts:327:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (32.6s)
  ✓   29 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (12.6s)
  ✓   30 [mobile-360] › e2e/admin-users.spec.ts:371:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (10.4s)
  ✓   31 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (8.8s)
  ✓   33 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (9.7s)
  ✓   32 [mobile-360] › e2e/admin-users.spec.ts:384:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (17.1s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:461:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (27.4s)
  ✓   11 [mobile-360] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (41.7s)
  ✓   13 [mobile-360] › e2e/post-wizard-pricing.spec.ts:485:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (18.4s)
  ✓   14 [mobile-360] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (14.1s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   15 [mobile-360] › e2e/post-wizard-pricing.spec.ts:537:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (14.2s)
  ✓   16 [mobile-360] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (13.6s)
  ✓   18 [mobile-360] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (11.2s)
  ✓   17 [mobile-360] › e2e/post-wizard-pricing.spec.ts:571:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (19.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226463359-4-3067-3-vlggur@ethio-e2e.invalid)
  ✓   17 [desktop-1280] › e2e/admin-attributes-import.spec.ts:651:3 › C3 attributes console › AT-45 spelled-out option defaults are a no-op and a bad option is named (13.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226463359-4-3067-2-8teyv9@ethio-e2e.invalid)
  ✓   18 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:796:3 › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back (15.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37226463359-4-3067-3-vlggur@ethio-e2e.invalid)
  ✓   19 [desktop-1280] › e2e/admin-attributes-import.spec.ts:729:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (17.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37226463359-4-3067-2-8teyv9@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
  ✓   20 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:856:3 › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere (22.6s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   19 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (13.5s)
  ✓   22 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (11.7s)
  ✓   21 [desktop-1280] › e2e/admin-users.spec.ts:299:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (17.6s)
  ✓   23 [desktop-1280] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (6.9s)
  ✓   24 [desktop-1280] › e2e/admin-users.spec.ts:327:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (15.8s)
  ✓   26 [desktop-1280] › e2e/admin-users.spec.ts:371:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (4.9s)
  ✓   25 [desktop-1280] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (15.7s)
  ✓   28 [desktop-1280] › e2e/auth-signout.spec.ts:358:3 › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension) (7.4s)
  ✓   29 [desktop-1280] › e2e/category-image-routes.spec.ts:111:3 › C5a — category AI foundation routes › CI-1 unauthenticated callers are refused by both routes (121ms)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    9 [desktop-1280] › e2e/post-wizard-specs.spec.ts:484:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (18.6s)
  ✓    8 [desktop-1280] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (42.9s)
  ✓   10 [desktop-1280] › e2e/post-wizard-specs.spec.ts:513:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (19.8s)
  ✓   12 [desktop-1280] › e2e/post-wizard-specs.spec.ts:538:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (15.8s)
  ✓   11 [desktop-1280] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (38.8s)
  ✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:559:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (13.8s)
  ✓   14 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (16.5s)
  ✓   15 [desktop-1280] › e2e/post-wizard-specs.spec.ts:635:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (13.5s)
  ✓   16 [desktop-1280] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (13.7s)
```
