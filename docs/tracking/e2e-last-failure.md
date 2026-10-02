# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36955499123
- Commit: `d42f4223b45bfb5c159dcfca145db7fb356bf8f5`
- Attempt: 1
- Written (UTC): 2026-10-02T02:28:34.737Z
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
[e2e:teardown] deleted 4 user(s) owned by process 36955499123-email
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
-   51 [mobile-360] › e2e/shell.spec.ts:1088:3 › panel header band (U0d) › the desktop rail switcher NAVIGATES to the panel's home (U0e)
  ✓   52 [mobile-360] › e2e/shell.spec.ts:1118:3 › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned (3.6s)
  -   53 [mobile-360] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed
  -   54 [mobile-360] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out
  -   55 [mobile-360] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls
  -   56 [mobile-360] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   57 [mobile-360] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   58 [mobile-360] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (550ms)
  ✓   59 [mobile-360] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (508ms)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:setup] state written; setup complete

Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.2s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] deleted 4 user(s) owned by process 36955499123-email

  1 passed (10.6s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36955499123-1-3092-3-enqyf2@ethio-e2e.invalid)
  ✓   23 [mobile-360] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (10.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-1-3092-2-6j2v8p@ethio-e2e.invalid)
  ✓   25 [mobile-360] › e2e/admin-attributes-import.spec.ts:1168:3 › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both (7.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36955499123-1-3092-3-enqyf2@ethio-e2e.invalid)
  ✓   27 [mobile-360] › e2e/admin-attributes-import.spec.ts:1266:3 › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies (5.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36955499123-1-3092-3-enqyf2@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
  ✓   28 [mobile-360] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (2.9s)
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
✓   17 [mobile-360] › e2e/auth-reset.spec.ts:34:1 › R-2: the reset request answers identically for a real and an unknown address (4.8s)
  ✓   18 [mobile-360] › e2e/admin-users.spec.ts:197:3 › U1 admin users › AU-2 search and status filter (9.1s)
  ✓   19 [mobile-360] › e2e/auth-reset.spec.ts:57:1 › R-3: a recovery link sets a new password, and the old one stops working (9.2s)
  ✓   21 [mobile-360] › e2e/auth-reset.spec.ts:89:1 › R-4: recovery leaves an email identity in place (truth-model read-back) (4.1s)
  ✓   22 [mobile-360] › e2e/auth-reset.spec.ts:113:1 › R-5: a reset URL with no recovery session says so instead of showing a form (1.5s)
  ✓   23 [mobile-360] › e2e/auth-reset.spec.ts:129:1 › R-4: the reset request is throttled after one submit (1.1s)
  ✓   24 [mobile-360] › e2e/auth-signin-errors.spec.ts:26:1 › B-1: wrong password is rejected and no session is created (1.6s)
  ✓   25 [mobile-360] › e2e/auth-signin-errors.spec.ts:34:1 › B-2: unknown email is rejected and no session is created (1.3s)
  ✓   26 [mobile-360] › e2e/auth-signin-errors.spec.ts:41:1 › B-3: wrong-password and unknown-email are indistinguishable (3.4s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   13 [mobile-360] › e2e/post-wizard-resets.spec.ts:559:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (9.9s)
  ✓   14 [mobile-360] › e2e/post-wizard-pricing.spec.ts:547:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (7.6s)
  ✓   15 [mobile-360] › e2e/post-wizard-resets.spec.ts:701:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (9.1s)
  ✓   16 [mobile-360] › e2e/post-wizard-pricing.spec.ts:581:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (6.4s)
  ✓   17 [mobile-360] › e2e/post-wizard-resets.spec.ts:829:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (9.8s)
  ✓   18 [mobile-360] › e2e/post-wizard-pricing.spec.ts:614:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (16.1s)
  ✓   19 [mobile-360] › e2e/post-wizard-resets.spec.ts:957:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (10.5s)
  ✓   20 [mobile-360] › e2e/post-wizard-pricing.spec.ts:635:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from photos reopens details (INC-315) (9.9s)
  ✓   21 [mobile-360] › e2e/post-wizard-specs.spec.ts:211:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (8.1s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-4-2857-2-k5ygwq@ethio-e2e.invalid)
  ✓   25 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (11.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36955499123-4-2857-3-twdbsk@ethio-e2e.invalid)
  ✓   26 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1168:3 › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both (9.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-4-2857-2-k5ygwq@ethio-e2e.invalid)
  ✓   28 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1266:3 › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies (7.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-4-2857-2-k5ygwq@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
  ✓   29 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (2.8s)
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
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-5-2854-2-aczhsy@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 5d18b226-a575-4f70-9173-b40195341569: []
  ✓   17 [desktop-1280] › e2e/admin-translations-governance.spec.ts:721:3 › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back (26.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+36955499123-5-2854-3-y1s2yr@ethio-e2e.invalid)
  ✓   18 [desktop-1280] › e2e/admin-translations-console.spec.ts:500:3 › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision (15.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-5-2854-2-aczhsy@ethio-e2e.invalid)
  ✓   20 [desktop-1280] › e2e/admin-translations-console.spec.ts:566:3 › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key (11.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+36955499123-5-2854-2-aczhsy@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 5d18b226-a575-4f70-9173-b40195341569: []
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    5 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:379:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (16.5s)
  ✓    6 [desktop-1280] › e2e/post-wizard-resets.spec.ts:372:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (18.7s)
  ✓    7 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:404:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (17.3s)
  ✓    8 [desktop-1280] › e2e/post-wizard-resets.spec.ts:494:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (22.2s)
  ✓    9 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:428:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (14.0s)
  ✓   11 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:475:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (14.4s)
  ✓   10 [desktop-1280] › e2e/post-wizard-resets.spec.ts:542:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (26.3s)
  ✓   12 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:513:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (18.5s)
  ✓   13 [desktop-1280] › e2e/post-wizard-resets.spec.ts:559:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (12.6s)
```
