# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37232748558
- Commit: `6b056127f32e2a7b36ba287bf7a613964ec941b0`
- Attempt: 1
- Written (UTC): 2026-10-04T20:39:06.704Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): none
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: email

`email`: log unavailable.

## Accessibility (DEC-084, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: email

`email`: log unavailable.

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

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
  ✓    1 [mobile-360] › e2e/a11y.spec.ts:58:3 › A11Y SMOKE (DEC-084, gating) › A11Y-1 marketplace home and sign-in @a11y (2.6s)
[a11y] wizard-1 mobile-360 serious=0 critical=0
[a11y] wizard-3 mobile-360 serious=0 critical=0
[a11y] wizard-5 mobile-360 serious=0 critical=0
  ✓    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (12.7s)
  ✓    3 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (12.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
[e2e:setup] healed 0 stale EN rows (INC-175)
[e2e:setup] reaped 26 stale scratch rows
[e2e:setup] state written; setup complete

Running 181 tests using 2 workers, shard 1 of 6

[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232748558-1-3056-3-vymuzy@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232748558-1-3056-2-wv45cr@ethio-e2e.invalid)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   17 [mobile-360] › e2e/auth-signin-errors.spec.ts:34:1 › B-2: unknown email is rejected and no session is created (1.2s)
  ✓   18 [mobile-360] › e2e/auth-signin-errors.spec.ts:41:1 › B-3: wrong-password and unknown-email are indistinguishable (2.5s)
  ✓   19 [mobile-360] › e2e/auth-signin-errors.spec.ts:60:1 › B-4: unconfirmed account cannot sign in (1.8s)
  ✓   20 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (2.6s)
  ✓   12 [mobile-360] › e2e/admin-users.spec.ts:222:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (18.4s)
  ✓   21 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (9.3s)
  ✓   22 [mobile-360] › e2e/admin-users.spec.ts:269:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (8.1s)
  ✓   24 [mobile-360] › e2e/admin-users.spec.ts:286:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (6.0s)
  ✓   23 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (6.5s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:setup] pooled super admin slot 1: fe73980f-4983-4f5e-9881-a5bbc768bff0 (e2e+37232748558-3-3080-3-vsvhir@ethio-e2e.invalid, factor 05349b02-bb38-4b6e-9ff5-c9290c323aa5)
[e2e:setup] identity pool size = 2 (E2E_WORKERS=2)
[e2e:setup] maintenance skipped (owner: shard 1)
[e2e:setup] state written; setup complete

Running 185 tests using 2 workers, shard 3 of 6

  ✓    1 [mobile-360] › e2e/post-wizard-pricing.spec.ts:229:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (12.2s)
  ✓    2 [mobile-360] › e2e/post-wizard-resets.spec.ts:205:3 › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name (14.4s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    4 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:258:3 › C3 attributes console › AT-33 the dependency doors refuse and name what they judged (7.9s)
  ✓    3 [desktop-1280] › e2e/admin-attributes-import.spec.ts:155:3 › C3 attributes console › AT-20 a real-export round trip is a no-op (13.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232748558-4-3057-2-dxkflr@ethio-e2e.invalid)
  ✓    6 [desktop-1280] › e2e/admin-attributes-import.spec.ts:224:3 › C3 attributes console › AT-26 option key order and an explicit null preview unchanged (5.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232748558-4-3057-2-dxkflr@ethio-e2e.invalid)
  ✓    5 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:363:3 › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency (14.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232748558-4-3057-3-atzfdl@ethio-e2e.invalid)
  ✓    7 [desktop-1280] › e2e/admin-attributes-import.spec.ts:281:3 › C3 attributes console › AT-63 a swatch-only definitions file previews as one change (7.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232748558-4-3057-2-dxkflr@ethio-e2e.invalid)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232748558-5-3024-3-ncwumk@ethio-e2e.invalid)
  ✓    1 [desktop-1280] › e2e/admin-translations-data.spec.ts:186:3 › U4b translations console › TR-14 the Data scope edits and approves a location name (14.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232748558-5-3024-2-dukrbz@ethio-e2e.invalid)
  ✓    3 [desktop-1280] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (22.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232748558-5-3024-3-ncwumk@ethio-e2e.invalid)
  ✓    4 [desktop-1280] › e2e/admin-translations-data.spec.ts:276:3 › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one (21.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232748558-5-3024-2-dukrbz@ethio-e2e.invalid)
  ✓    5 [desktop-1280] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (28.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232748558-5-3024-3-ncwumk@ethio-e2e.invalid)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    3 [desktop-1280] › e2e/post-wizard-specs.spec.ts:307:3 › POSTING WIZARD › PW-145 an over-limit options read says so under its control, and a second open loads the list (6.9s)
PW-72 bodies: []
  ✓    4 [desktop-1280] › e2e/post-wizard-resets.spec.ts:313:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (10.8s)
  ✓    5 [desktop-1280] › e2e/post-wizard-specs.spec.ts:358:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (7.9s)
  ✓    6 [desktop-1280] › e2e/post-wizard-resets.spec.ts:369:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (9.9s)
  ✓    7 [desktop-1280] › e2e/post-wizard-specs.spec.ts:443:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (7.3s)
  ✓    9 [desktop-1280] › e2e/post-wizard-specs.spec.ts:476:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (10.8s)
  ✓    8 [desktop-1280] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (19.8s)
  ✓   10 [desktop-1280] › e2e/post-wizard-specs.spec.ts:541:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (8.6s)
```
