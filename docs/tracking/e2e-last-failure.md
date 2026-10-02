# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37071088977
- Commit: `3497f6ef8c40ed5193a2b6f14308469dc994cb60`
- Attempt: 1
- Written (UTC): 2026-10-02T22:14:41.900Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

5 line(s), 5 message(s): 1 off the allowlist, 4 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 1 | shard 4 |
| `definitions wrongFile` (quiet) | 1 | shard 4 |
| `digest mismatch` (quiet) | 1 | shard 4 |
| `listing not found` | 1 | shard 3 |
| `preview_failed permission denied` (quiet) | 1 | shard 4 |

Quiet (allowlisted): definitions badHeader ×1 · definitions wrongFile ×1 · digest mismatch ×1 · preview_failed permission denied ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 37071088977-email
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
✓    3 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (10.1s)
  ✓    4 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (8.4s)
  ✓    5 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (5.2s)
  ✓    6 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (5.8s)
  ✓    7 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.3s)
  ✓    8 [mobile-360] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (11.6s)
  ✓    9 [mobile-360] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (13.5s)
  ✓   10 [mobile-360] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (14.9s)
  ✓   11 [mobile-360] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (10.6s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.0s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37071088977-email

  1 passed (10.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓    9 [mobile-360] › e2e/admin-attributes-editor.spec.ts:499:3 › C3 attributes console › AT-35 the options expansion reads as labels (7.5s)
  ✓   10 [mobile-360] › e2e/admin-attributes-import.spec.ts:446:3 › C3 attributes console › AT-43 a renamed key is refused and names the key to restore (6.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-1-3120-2-nsbtaq@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071088977-1-3120-3-vx7vbs@ethio-e2e.invalid)
  ✓   12 [mobile-360] › e2e/admin-attributes-import.spec.ts:479:3 › C3 attributes console › AT-21 a changed link commits and the batch undoes (11.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071088977-1-3120-3-vx7vbs@ethio-e2e.invalid)
  ✓   11 [mobile-360] › e2e/admin-attributes-editor.spec.ts:568:3 › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells (16.6s)
  -   14 [mobile-360] › e2e/admin-attributes-editor.spec.ts:657:3 › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-1-3120-2-nsbtaq@ethio-e2e.invalid)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   24 [mobile-360] › e2e/auth-signin-errors.spec.ts:26:1 › B-1: wrong password is rejected and no session is created (1.4s)
  ✓   25 [mobile-360] › e2e/auth-signin-errors.spec.ts:34:1 › B-2: unknown email is rejected and no session is created (1.2s)
  ✓   26 [mobile-360] › e2e/auth-signin-errors.spec.ts:41:1 › B-3: wrong-password and unknown-email are indistinguishable (2.7s)
  ✓   27 [mobile-360] › e2e/auth-signin-errors.spec.ts:60:1 › B-4: unconfirmed account cannot sign in (2.3s)
  ✓   28 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (3.5s)
  ✓   21 [mobile-360] › e2e/admin-users.spec.ts:213:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (25.1s)
  ✓   29 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (8.5s)
  ✓   30 [mobile-360] › e2e/admin-users.spec.ts:260:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (5.8s)
  ✓   31 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (6.0s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    4 [mobile-360] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (21.1s)
  ✓    3 [mobile-360] › e2e/post-wizard-pricing.spec.ts:349:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (24.4s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓    6 [mobile-360] › e2e/post-wizard-pricing.spec.ts:380:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (16.5s)
  ✓    5 [mobile-360] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (22.2s)
  ✓    7 [mobile-360] › e2e/post-wizard-pricing.spec.ts:406:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (19.7s)
  ✓    8 [mobile-360] › e2e/post-wizard-resets.spec.ts:494:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (33.0s)
  ✓    9 [mobile-360] › e2e/post-wizard-pricing.spec.ts:421:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (21.7s)
  ✓   11 [mobile-360] › e2e/post-wizard-pricing.spec.ts:435:3 › POSTING WIZARD › PW-94 a listing card prints its price period (11.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-4-2854-2-btj1u4@ethio-e2e.invalid)
  ✓   24 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (12.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071088977-4-2854-3-wjxacx@ethio-e2e.invalid)
  ✓   26 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1168:3 › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both (8.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-4-2854-2-btj1u4@ethio-e2e.invalid)
  ✓   28 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1266:3 › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies (5.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-4-2854-2-btj1u4@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
  ✓   29 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (2.4s)
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
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-5-3061-2-uyzwfu@ethio-e2e.invalid)
  ✓   17 [desktop-1280] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (28.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071088977-5-3061-3-tx88zn@ethio-e2e.invalid)
  ✓   19 [desktop-1280] › e2e/admin-translations-console.spec.ts:566:3 › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key (12.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-5-3061-2-uyzwfu@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 1a53d9e6-faac-4b4b-b2b8-d489c8231180: []
  ✓   21 [desktop-1280] › e2e/admin-translations-console.spec.ts:687:3 › U4b translations console › TR-13 the placeholder validator flags a machine write too (10.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071088977-5-3061-2-uyzwfu@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 1a53d9e6-faac-4b4b-b2b8-d489c8231180: []
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
PW-72 bodies: []
  ✓    4 [desktop-1280] › e2e/post-wizard-resets.spec.ts:316:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (21.0s)
  ✓    5 [desktop-1280] › e2e/post-wizard-specs.spec.ts:374:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (10.6s)
  ✓    7 [desktop-1280] › e2e/post-wizard-specs.spec.ts:407:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (14.9s)
  ✓    6 [desktop-1280] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (24.1s)
  ✓    8 [desktop-1280] › e2e/post-wizard-specs.spec.ts:468:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (15.2s)
  ✓   10 [desktop-1280] › e2e/post-wizard-specs.spec.ts:493:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (18.8s)
  ✓    9 [desktop-1280] › e2e/post-wizard-resets.spec.ts:494:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (32.4s)
  ✓   11 [desktop-1280] › e2e/post-wizard-specs.spec.ts:514:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (19.4s)
```
