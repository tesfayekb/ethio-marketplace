# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38343489204
- Commit: `227e748034f13543533bfe542f501d5a51d464df`
- Attempt: 1
- Written (UTC): 2026-10-13T03:55:36.276Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

4 line(s), 4 message(s): 1 off the allowlist, 3 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 1 | shard 4 |
| `digest mismatch` (quiet) | 1 | shard 4 |
| `listing not found` | 1 | shard 3 |
| `preview_failed permission denied` (quiet) | 1 | shard 4 |

Quiet (allowlisted): definitions badHeader ×1 · digest mismatch ×1 · preview_failed permission denied ×1

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

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
[e2e:teardown] deleted 4 user(s) owned by process 38343489204-email
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

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

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
✓    3 [mobile-360] › e2e/auth-signout.spec.ts:66:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (10.4s)
  ✓    4 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (8.9s)
  ✓    5 [mobile-360] › e2e/auth-signout.spec.ts:102:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (8.7s)
  ✓    6 [mobile-360] › e2e/auth-signout.spec.ts:124:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (10.9s)
  ✓    7 [mobile-360] › e2e/auth-signout.spec.ts:149:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.2s)
  ✓    8 [mobile-360] › e2e/auth-signout.spec.ts:272:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (11.1s)
  ✓    9 [mobile-360] › e2e/auth-signout.spec.ts:285:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (13.4s)
  ✓   10 [mobile-360] › e2e/auth-signout.spec.ts:300:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (29.8s)
  ✓   11 [mobile-360] › e2e/auth-signout.spec.ts:316:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (11.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.6s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.4s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38343489204-email

  2 passed (11.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    9 [mobile-360] › e2e/admin-attributes-import.spec.ts:371:3 › C3 attributes console › AT-64 the links export and the categories export agree on a category's home (40.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38343489204-1-3068-3-mbubf9@ethio-e2e.invalid)
  ✓   10 [mobile-360] › e2e/admin-attributes-editor.spec.ts:568:3 › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells (28.7s)
  -   12 [mobile-360] › e2e/admin-attributes-editor.spec.ts:657:3 › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38343489204-1-3068-2-kzfcgx@ethio-e2e.invalid)
  ✓   11 [mobile-360] › e2e/admin-attributes-import.spec.ts:455:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (15.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38343489204-1-3068-3-mbubf9@ethio-e2e.invalid)
  ✓   13 [mobile-360] › e2e/admin-attributes-editor.spec.ts:742:3 › C3 attributes console › AT-49 saving a select definition without edits preserves every stored option field (14.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38343489204-1-3068-2-kzfcgx@ethio-e2e.invalid)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   31 [mobile-360] › e2e/admin-users.spec.ts:273:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (6.8s)
  ✓   32 [mobile-360] › e2e/auth-signout.spec.ts:102:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (7.9s)
  ✓   33 [mobile-360] › e2e/admin-users.spec.ts:290:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (8.1s)
  ✓   34 [mobile-360] › e2e/auth-signout.spec.ts:124:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (7.9s)
  ✓   36 [mobile-360] › e2e/auth-signout.spec.ts:149:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (8.1s)
  ✓   35 [mobile-360] › e2e/admin-users.spec.ts:303:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (22.5s)
  ✓   37 [mobile-360] › e2e/auth-signout.spec.ts:272:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (10.2s)
  ✓   39 [mobile-360] › e2e/auth-signout.spec.ts:285:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (15.0s)
  ✓   38 [mobile-360] › e2e/admin-users.spec.ts:331:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (19.2s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   10 [mobile-360] › e2e/post-wizard-pricing.spec.ts:441:3 › POSTING WIZARD › PW-94 a listing card prints its price period (16.4s)
PW-72 bodies: []
  ✓   11 [mobile-360] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (25.0s)
  ✓   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (27.0s)
  ✓   14 [mobile-360] › e2e/post-wizard-pricing.spec.ts:488:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (16.3s)
  ✓   13 [mobile-360] › e2e/post-wizard-resets.spec.ts:369:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (24.3s)
  ✓   15 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (14.5s)
  ✓   16 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (25.4s)
  ✓   17 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (21.9s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38343489204-4-3060-3-getrf2@ethio-e2e.invalid)
  ✓   31 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1308:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (13.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38343489204-4-3060-2-pkwr3q@ethio-e2e.invalid)
  ✓   32 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1504:3 › C3 attributes console › AT-70 a direct rank held twice in the end state is refused as rankClash (13.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38343489204-4-3060-3-getrf2@ethio-e2e.invalid)
  ✓   33 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1414:3 › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets (11.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38343489204-4-3060-2-pkwr3q@ethio-e2e.invalid)
  ✓   34 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1615:3 › C3 attributes console › AT-71 removing an option value still in use is refused as optionInUse (10.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38343489204-4-3060-3-getrf2@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   16 [desktop-1280] › e2e/auth-signout.spec.ts:149:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (12.4s)
  ✓   15 [desktop-1280] › e2e/admin-users.spec.ts:226:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (29.8s)
  ✓   17 [desktop-1280] › e2e/auth-signout.spec.ts:272:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (13.2s)
  ✓   18 [desktop-1280] › e2e/admin-users.spec.ts:273:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (9.4s)
  ✓   19 [desktop-1280] › e2e/auth-signout.spec.ts:285:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (14.5s)
  ✓   20 [desktop-1280] › e2e/admin-users.spec.ts:290:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (10.9s)
  ✓   21 [desktop-1280] › e2e/auth-signout.spec.ts:300:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (12.5s)
  ✓   23 [desktop-1280] › e2e/auth-signout.spec.ts:316:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (7.8s)
  ✓   22 [desktop-1280] › e2e/admin-users.spec.ts:303:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (21.0s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    8 [desktop-1280] › e2e/post-wizard-specs.spec.ts:358:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (21.9s)
  ✓   10 [desktop-1280] › e2e/post-wizard-specs.spec.ts:448:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (18.2s)
  ✓    9 [desktop-1280] › e2e/post-wizard-resets.spec.ts:369:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (33.0s)
  ✓   11 [desktop-1280] › e2e/post-wizard-specs.spec.ts:481:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (12.5s)
  ✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:546:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (11.7s)
  ✓   14 [desktop-1280] › e2e/post-wizard-specs.spec.ts:575:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (14.0s)
  ✓   12 [desktop-1280] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (43.2s)
  ✓   15 [desktop-1280] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (12.3s)
  ✓   17 [desktop-1280] › e2e/post-wizard-specs.spec.ts:621:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (17.1s)
```
