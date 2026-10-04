# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37183888212
- Commit: `6f4923ee8ecc07a24a2e0873dff50eec0ee1a883`
- Attempt: 1
- Written (UTC): 2026-10-04T06:53:25.870Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

8 line(s), 4 message(s): 0 off the allowlist, 4 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

Off the allowlist: none.

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
[e2e:teardown] deleted 4 user(s) owned by process 37183888212-email
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
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
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
✓   52 [mobile-360] › e2e/shell.spec.ts:1118:3 › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned (8.1s)
  -   53 [mobile-360] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed
  -   54 [mobile-360] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out
  -   55 [mobile-360] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls
  -   56 [mobile-360] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   57 [mobile-360] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   58 [mobile-360] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (430ms)
  ✓   59 [mobile-360] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (477ms)
  ✓   60 [mobile-360] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (5.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.7s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37183888212-email

  1 passed (17.0s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   28 [mobile-360] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (2.9s)
  ✓   25 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1111:3 › C3 attributes console › AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere (25.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37183888212-1-2843-2-tsvk9d@ethio-e2e.invalid)
  ✓   30 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (5.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37183888212-1-2843-2-tsvk9d@ethio-e2e.invalid)
  ✓   29 [mobile-360] › e2e/admin-attributes-library.spec.ts:46:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (16.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37183888212-1-2843-3-tw7ivv@ethio-e2e.invalid)
  ✓   31 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1307:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (13.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37183888212-1-2843-2-tsvk9d@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   28 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (3.4s)
  ✓   29 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (11.8s)
  ✓   26 [mobile-360] › e2e/admin-users.spec.ts:222:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (28.0s)
  ✓   30 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (9.8s)
  ✓   32 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (11.0s)
  ✓   31 [mobile-360] › e2e/admin-users.spec.ts:269:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (11.2s)
  ✓   34 [mobile-360] › e2e/admin-users.spec.ts:286:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (11.1s)
  ✓   33 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (11.4s)
  ✓   36 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.2s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   17 [mobile-360] › e2e/post-wizard-resets.spec.ts:830:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (14.1s)
  ✓   18 [mobile-360] › e2e/post-wizard-pricing.spec.ts:567:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (24.1s)
  ✓   19 [mobile-360] › e2e/post-wizard-resets.spec.ts:958:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (13.4s)
  ✓   20 [mobile-360] › e2e/post-wizard-pricing.spec.ts:601:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (13.9s)
  ✓   21 [mobile-360] › e2e/post-wizard-specs.spec.ts:212:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (18.0s)
  ✓   22 [mobile-360] › e2e/post-wizard-pricing.spec.ts:635:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (12.5s)
  ✓   23 [mobile-360] › e2e/post-wizard-specs.spec.ts:290:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (17.2s)
  ✓   24 [mobile-360] › e2e/post-wizard-pricing.spec.ts:668:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (16.1s)
  ✓   25 [mobile-360] › e2e/post-wizard-specs.spec.ts:375:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (7.4s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   30 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (3.7s)
  ✓   29 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1261:3 › C3 attributes console › AT-54 the import dialog previews a definitions-only run and discards it (6.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37183888212-4-3049-3-u0nz2z@ethio-e2e.invalid)
  ✓   32 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1307:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (17.1s)
  ✓   31 [desktop-1280] › e2e/admin-attributes-library.spec.ts:46:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (18.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37183888212-4-3049-3-u0nz2z@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37183888212-4-3049-2-soufg8@ethio-e2e.invalid)
  ✓   33 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1413:3 › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets (9.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37183888212-4-3049-3-u0nz2z@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   13 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (12.4s)
  ✓   15 [desktop-1280] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (11.9s)
  ✓   16 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (10.7s)
  ✓   14 [desktop-1280] › e2e/admin-users.spec.ts:222:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (27.8s)
  ✓   17 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.9s)
  ✓   18 [desktop-1280] › e2e/admin-users.spec.ts:269:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (11.6s)
  ✓   20 [desktop-1280] › e2e/admin-users.spec.ts:286:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (11.4s)
  ✓   19 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (15.5s)
  ✓   22 [desktop-1280] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (14.2s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:548:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (15.5s)
  ✓   15 [desktop-1280] › e2e/post-wizard-specs.spec.ts:628:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (15.2s)
  ✓   14 [desktop-1280] › e2e/post-wizard-resets.spec.ts:560:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (17.0s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:702:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (15.1s)
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (18.2s)
  ✓   18 [desktop-1280] › e2e/post-wizard-resets.spec.ts:830:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (14.6s)
  ✓   19 [desktop-1280] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (17.7s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:958:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (13.6s)
  ✓   22 [desktop-1280] › e2e/post-wizard-where.spec.ts:149:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (16.3s)
```
