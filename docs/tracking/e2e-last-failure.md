# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36799233790
- Commit: `5432ea61f76789424c5429b83b72aea5b6cef4ff`
- Attempt: 1
- Written (UTC): 2026-10-01T01:07:07.080Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

No `[ssr-error]` lines in any source (all 8 logs read).

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 36799233790-email
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

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

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
[a11y] home mobile-360 serious=0 critical=0
[a11y] auth mobile-360 serious=0 critical=0
  ✓    1 [mobile-360] › e2e/a11y.spec.ts:58:3 › A11Y SMOKE (DEC-084, gating) › A11Y-1 marketplace home and sign-in @a11y (2.8s)
[a11y] wizard-1 mobile-360 serious=0 critical=0
[a11y] wizard-3 mobile-360 serious=0 critical=0
[a11y] wizard-5 mobile-360 serious=0 critical=0
  ✓    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (10.7s)
  ✓    3 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (4.5s)
  ✓    4 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (3.5s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:setup] maintenance skipped (owner: shard 1)
[e2e:setup] state written; setup complete

Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.5s)
[e2e:teardown] deleted 4 user(s) owned by process 36799233790-email

  1 passed (12.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed
--- final 10 lines ---
✓    8 [mobile-360] › e2e/admin-attributes-import.spec.ts:362:3 › C3 attributes console › AT-64 the links export and the categories export agree on a category's home (3.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-1-3092-3-9518c9@ethio-e2e.invalid)
  ✓    9 [mobile-360] › e2e/admin-attributes-editor.spec.ts:499:3 › C3 attributes console › AT-35 the options expansion reads as labels (2.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36799233790-1-3092-2-qswnj1@ethio-e2e.invalid)
  ✓   10 [mobile-360] › e2e/admin-attributes-import.spec.ts:446:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (2.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-1-3092-3-9518c9@ethio-e2e.invalid)
  ✓   12 [mobile-360] › e2e/admin-attributes-import.spec.ts:479:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (2.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-1-3092-3-9518c9@ethio-e2e.invalid)
  ✓   13 [mobile-360] › e2e/admin-attributes-import.spec.ts:548:3 › C3 attributes console › AT-44 the v2 definition cells commit, export and round-trip unchanged (2.8s)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 153 tests using 2 workers, shard 2 of 6

[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-2-3136-3-zpkssb@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36799233790-2-3136-2-zvxchj@ethio-e2e.invalid)
  ✓    2 [mobile-360] › e2e/admin-translations-governance.spec.ts:457:3 › U4g bulk approval, order and orphans › TR-20m mobile exposes both reorder controls for the parked fence (4.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-2-3136-3-zpkssb@ethio-e2e.invalid)
  ✓    1 [mobile-360] › e2e/admin-translations-data.spec.ts:186:3 › U4b translations console › TR-14 the Data scope edits and approves a location name (16.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36799233790-2-3136-2-zvxchj@ethio-e2e.invalid)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    2 [mobile-360] › e2e/post-wizard-resets.spec.ts:204:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (6.7s)
  ✓    1 [mobile-360] › e2e/post-wizard-pricing.spec.ts:228:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (7.3s)
PW-72 bodies: []
  ✓    3 [mobile-360] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (9.5s)
  ✓    4 [mobile-360] › e2e/post-wizard-pricing.spec.ts:348:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (9.5s)
  ✓    6 [mobile-360] › e2e/post-wizard-pricing.spec.ts:379:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (6.4s)
  ✓    5 [mobile-360] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (9.7s)
  ✓    7 [mobile-360] › e2e/post-wizard-pricing.spec.ts:404:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (11.1s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    2 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:192:3 › C3 attributes console › AT-31 a dependent definition cascades in the editor (9.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-4-3141-3-pbvxse@ethio-e2e.invalid)
  ✓    4 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:258:3 › C3 attributes console › AT-33 the dependency doors refuse and name what they judged (7.3s)
  ✓    3 [desktop-1280] › e2e/admin-attributes-import.spec.ts:155:3 › C3 attributes console › AT-20 a real-export round trip is a no-op (11.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36799233790-4-3141-2-ei5kbd@ethio-e2e.invalid)
  ✓    6 [desktop-1280] › e2e/admin-attributes-import.spec.ts:224:3 › C3 attributes console › AT-26 option key order and an explicit null preview unchanged (5.4s)
  ✓    5 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:363:3 › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency (8.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36799233790-4-3141-2-ei5kbd@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-4-3141-3-pbvxse@ethio-e2e.invalid)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    5 [desktop-1280] › e2e/admin-translations-console.spec.ts:141:3 › U4b translations console › TR-3 the strings page lists keys with source and status (3.4s)
  ✓    4 [desktop-1280] › e2e/admin-shell.spec.ts:181:3 › Admin shell (U0) › A-2 moderator fixture: exactly one section (audit), other deep links refused, admin tab still visible (4.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-5-2982-3-ythlxy@ethio-e2e.invalid)
  ✓    7 [desktop-1280] › e2e/admin-shell.spec.ts:238:3 › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071) (3.3s)
  ✓    8 [desktop-1280] › e2e/admin-shell.spec.ts:257:3 › Admin shell (U0) › A-3 regular user: /admin still redirects home (2.7s)
  ✓    6 [desktop-1280] › e2e/admin-translations-console.spec.ts:157:3 › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER (8.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-5-2982-3-ythlxy@ethio-e2e.invalid)
  ✓   10 [desktop-1280] › e2e/admin-translations-console.spec.ts:177:3 › U4b translations console › TR-5 filters live in the URL and survive a reload (4.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36799233790-5-2982-3-ythlxy@ethio-e2e.invalid)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:setup] state written; setup complete

Running 153 tests using 2 workers, shard 6 of 6

  ✓    1 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:228:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (8.9s)
  ✓    2 [desktop-1280] › e2e/post-wizard-resets.spec.ts:204:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (11.0s)
PW-72 bodies: []
  ✓    3 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:348:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (14.8s)
  ✓    4 [desktop-1280] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (14.1s)
```
