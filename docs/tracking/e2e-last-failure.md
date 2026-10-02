# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37071546597
- Commit: `3b3a0a89fb418791766b5fe6d2edf9660d674e87`
- Attempt: 1
- Written (UTC): 2026-10-02T22:21:05.907Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5 · unavailable: shard 6

`shard 6`: log unavailable.

5 line(s), 3 message(s): 0 off the allowlist, 3 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 1 | shard 4 |

Quiet (allowlisted): definitions badHeader ×2 · preview_failed permission denied ×2 · digest mismatch ×1

Off the allowlist: none.

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5 · unavailable: shard 6

`shard 6`: log unavailable.

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37071546597-email
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
  ✓    2 [mobile-360] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (10.7s)
  ✓    3 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (6.6s)
  ✓    4 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (7.1s)
  ✓    5 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (6.2s)
  ✓    6 [mobile-360] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (6.5s)
  ✓    7 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.1s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.5s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37071546597-email

  1 passed (13.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   17 [mobile-360] › e2e/admin-attributes-import.spec.ts:729:3 › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins (7.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071546597-1-3078-3-wunyyk@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
  ✓   18 [mobile-360] › e2e/admin-attributes-editor.spec.ts:796:3 › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back (11.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-1-3078-2-1rvdad@ethio-e2e.invalid)
  ✓   19 [mobile-360] › e2e/admin-attributes-import.spec.ts:883:3 › C3 attributes console › AT-22 malformed files and dangerous cells are refused (6.4s)
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
  ✓   21 [mobile-360] › e2e/admin-attributes-import.spec.ts:1031:3 › C3 attributes console › AT-23 a categories:view-only operator sees no import control and is refused (6.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071546597-1-3078-3-wunyyk@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   26 [mobile-360] › e2e/auth-signin-errors.spec.ts:41:1 › B-3: wrong-password and unknown-email are indistinguishable (2.1s)
  ✓   27 [mobile-360] › e2e/auth-signin-errors.spec.ts:60:1 › B-4: unconfirmed account cannot sign in (1.5s)
  ✓   28 [mobile-360] › e2e/auth-signin-errors.spec.ts:79:1 › B-5: one sign-in after a 12h-expired prior session lands with a session (2.4s)
  ✓   20 [mobile-360] › e2e/admin-users.spec.ts:213:3 › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate (19.3s)
  ✓   29 [mobile-360] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (6.5s)
  ✓   30 [mobile-360] › e2e/admin-users.spec.ts:260:3 › U1 admin users › AU-7 crumb: Home > Admin > Users > <name>, Users navigates back (5.6s)
  ✓   31 [mobile-360] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (5.5s)
  ✓   32 [mobile-360] › e2e/admin-users.spec.ts:277:3 › U1 admin users › AU-8 own row: status controls are not offered on your own record (5.2s)
  ✓   33 [mobile-360] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (5.9s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   17 [mobile-360] › e2e/post-wizard-pricing.spec.ts:566:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (12.6s)
  ✓   18 [mobile-360] › e2e/post-wizard-resets.spec.ts:829:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (8.6s)
  ✓   19 [mobile-360] › e2e/post-wizard-pricing.spec.ts:600:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (8.3s)
  ✓   20 [mobile-360] › e2e/post-wizard-resets.spec.ts:957:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (7.4s)
  ✓   21 [mobile-360] › e2e/post-wizard-pricing.spec.ts:634:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (5.4s)
  ✓   22 [mobile-360] › e2e/post-wizard-specs.spec.ts:211:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (8.3s)
  ✓   23 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (11.6s)
  ✓   24 [mobile-360] › e2e/post-wizard-specs.spec.ts:289:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (10.1s)
  ✓   25 [mobile-360] › e2e/post-wizard-pricing.spec.ts:688:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from photos reopens details (INC-315) (10.1s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   22 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1031:3 › C3 attributes console › AT-23 a categories:view-only operator sees no import control and is refused (7.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-4-3062-2-i3mgfr@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   24 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1092:3 › C3 attributes console › AT-24 a commit whose bytes changed since the preview is refused (3.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-4-3062-2-i3mgfr@ethio-e2e.invalid)
  ✓   23 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (11.6s)
  ✓   25 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1122:3 › C3 attributes console › AT-25 an invalid option parent is refused (4.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-4-3062-2-i3mgfr@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071546597-4-3062-3-fht0vc@ethio-e2e.invalid)
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
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-5-3043-2-i0xdnq@ethio-e2e.invalid)
  ✓   20 [desktop-1280] › e2e/admin-translations-console.spec.ts:566:3 › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key (9.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-5-3043-2-i0xdnq@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled fa5176fb-a3da-4e17-bcc9-3060d98c038c: []
  ✓   21 [desktop-1280] › e2e/admin-translations-console.spec.ts:687:3 › U4b translations console › TR-13 the placeholder validator flags a machine write too (8.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37071546597-5-3043-2-i0xdnq@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled fa5176fb-a3da-4e17-bcc9-3060d98c038c: []
  ✓   19 [desktop-1280] › e2e/admin-translations-governance.spec.ts:940:3 › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows (28.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37071546597-5-3043-3-6bmnkr@ethio-e2e.invalid)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
