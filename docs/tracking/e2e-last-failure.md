# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37165089557
- Commit: `d78f6dfca381050d33eaa5d57bbc55d05c66b9a7`
- Attempt: 1
- Written (UTC): 2026-10-04T00:32:55.178Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 line(s), 4 message(s): 1 off the allowlist, 3 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 2 | shard 3 |
| `definitions badHeader` (quiet) | 1 | shard 4 |
| `digest mismatch` (quiet) | 1 | shard 4 |
| `preview_failed permission denied` (quiet) | 1 | shard 4 |

Quiet (allowlisted): definitions badHeader ×1 · digest mismatch ×1 · preview_failed permission denied ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 37165089557-email
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
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
[a11y] wizard-1 mobile-360 serious=0 critical=0
[a11y] wizard-3 mobile-360 serious=0 critical=0
[a11y] wizard-5 mobile-360 serious=0 critical=0
  ✓    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (10.9s)
  ✓    3 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (8.2s)
  ✓    4 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (11.6s)
  ✓    5 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (7.7s)
  ✓    6 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (7.3s)
  ✓    7 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (8.6s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37165089557-email

  1 passed (11.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37165089557-1-3055-3-uagvs3@ethio-e2e.invalid)
  ✓    5 [mobile-360] › e2e/admin-attributes-import.spec.ts:281:3 › C3 attributes console › AT-63 a swatch-only definitions file previews as one change (7.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37165089557-1-3055-3-uagvs3@ethio-e2e.invalid)
  ✓    6 [mobile-360] › e2e/admin-attributes-editor.spec.ts:363:3 › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency (12.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37165089557-1-3055-2-risoi5@ethio-e2e.invalid)
  ✓    7 [mobile-360] › e2e/admin-attributes-import.spec.ts:362:3 › C3 attributes console › AT-64 the links export and the categories export agree on a category's home (14.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37165089557-1-3055-3-uagvs3@ethio-e2e.invalid)
  ✓    8 [mobile-360] › e2e/admin-attributes-editor.spec.ts:434:3 › C3 attributes console › AT-32 an import creates a parent and its dependent in one pass (12.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37165089557-1-3055-2-risoi5@ethio-e2e.invalid)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   24 [mobile-360] › e2e/auth-signin-errors.spec.ts:26:1 › B-1: wrong password is rejected and no session is created (1.5s)
  ✓   25 [mobile-360] › e2e/auth-signin-errors.spec.ts:34:1 › B-2: unknown email is rejected and no session is created (1.3s)
  ✓   26 [mobile-360] › e2e/auth-signin-errors.spec.ts:41:1 › B-3: wrong-password and unknown-email are indistinguishable (2.8s)
  ✓   27 [mobile-360] › e2e/auth-signin-errors.spec.ts:60:1 › B-4: unconfirmed account cannot sign in (1.5s)
  ✓   28 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (2.7s)
  ✓   29 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (8.3s)
  ✓   20 [mobile-360] › e2e/admin-users.spec.ts:213:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (24.4s)
  ✓   30 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (9.3s)
  ✓   31 [mobile-360] › e2e/admin-users.spec.ts:260:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (9.3s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    3 [mobile-360] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (25.8s)
  ✓    4 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (24.9s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓    5 [mobile-360] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (19.1s)
  ✓    6 [mobile-360] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (26.3s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓    7 [mobile-360] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (22.4s)
  ✓    8 [mobile-360] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (32.9s)
  ✓    9 [mobile-360] › e2e/post-wizard-pricing.spec.ts:422:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (21.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   22 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1031:3 › C3 attributes console › AT-23 a categories:view-only operator sees no import control and is refused (7.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37165089557-4-2881-2-bp78ob@ethio-e2e.invalid)
  ✓   21 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:856:3 › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere (15.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37165089557-4-2881-3-8eh1ba@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   23 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1092:3 › C3 attributes console › AT-24 a commit whose bytes changed since the preview is refused (3.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37165089557-4-2881-2-bp78ob@ethio-e2e.invalid)
  ✓   25 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1122:3 › C3 attributes console › AT-25 an invalid option parent is refused (5.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37165089557-4-2881-2-bp78ob@ethio-e2e.invalid)
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
✓    8 [desktop-1280] › e2e/admin-translations-data.spec.ts:587:3 › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else (9.9s)
  ✓   10 [desktop-1280] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (8.7s)
  ✓    9 [desktop-1280] › e2e/admin-users.spec.ts:176:3 › U1 admin users › AU-1 permission: moderator is refused, admin sees the list (17.2s)
  ✓   11 [desktop-1280] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (10.0s)
  ✓   12 [desktop-1280] › e2e/admin-users.spec.ts:197:3 › U1 admin users › AU-2 search and status filter (9.3s)
  ✓   13 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (6.5s)
  ✓   15 [desktop-1280] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (6.7s)
  ✓   16 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (8.6s)
  ✓   14 [desktop-1280] › e2e/admin-users.spec.ts:213:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (23.0s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    5 [desktop-1280] › e2e/post-wizard-specs.spec.ts:375:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (12.7s)
  ✓    6 [desktop-1280] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (20.9s)
  ✓    7 [desktop-1280] › e2e/post-wizard-specs.spec.ts:408:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (12.7s)
  ✓    9 [desktop-1280] › e2e/post-wizard-specs.spec.ts:473:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (11.5s)
  ✓    8 [desktop-1280] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (24.6s)
  ✓   10 [desktop-1280] › e2e/post-wizard-specs.spec.ts:502:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (15.6s)
  ✓   12 [desktop-1280] › e2e/post-wizard-specs.spec.ts:527:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (15.8s)
  ✓   11 [desktop-1280] › e2e/post-wizard-resets.spec.ts:543:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (33.6s)
  ✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:548:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (17.9s)
```
