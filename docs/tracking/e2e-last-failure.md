# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37090325216
- Commit: `8579c078c708c7d7a29cf2a431032486ca4edffb`
- Attempt: 1
- Written (UTC): 2026-10-03T02:41:07.036Z
- Passed: 11 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

8 line(s), 5 message(s): 1 off the allowlist, 4 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | shard 5 |
| `listing not found` | 1 | shard 3 |

Quiet (allowlisted): definitions badHeader ×2 · digest mismatch ×2 · preview_failed permission denied ×2 · category-images: no GEMINI_API_KEY — fake mode ×1

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

5 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-03T02:37:26.035Z | 0.2 min |
| changed | 2026-10-03T02:37:19.090Z | 0.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 10 | 1.5 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 12.5 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 12.1 s |
| `post-wizard-bundle2.spec.ts` › PW-115 without own_place the last post's pin, directions and details carry over | mobile-360 | 9.1 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | mobile-360 | 8.0 s |
| `post-wizard-bundle2.spec.ts` › PW-115 without own_place the last post's pin, directions and details carry over | desktop-1280 | 8.0 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | desktop-1280 | 7.9 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | desktop-1280 | 7.8 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | desktop-1280 | 7.7 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | mobile-360 | 7.7 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | mobile-360 | 6.9 s |
| `auth-signup.spec.ts` › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle | email-serial | 4.3 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37090325216-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37090325216-changed
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

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

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

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
-   35 [mobile-360] › e2e/shell.spec.ts:751:3 › tablet chrome (md = 768px) › the top bar is ONE band: logo-cell height AND background, location row separate
  ✓   36 [mobile-360] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (1.2s)
  ✓   37 [mobile-360] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger (978ms)
  ✓   38 [mobile-360] › e2e/shell.spec.ts:823:3 › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e) (8.6s)
  ✓   39 [mobile-360] › e2e/shell.spec.ts:850:3 › mobile chrome › the drawer logo block matches the top bar's divider and height (903ms)
  ✓   40 [mobile-360] › e2e/shell.spec.ts:868:3 › mobile chrome › the rail-collapse toggle does not exist on mobile (1.2s)
  ✓   41 [mobile-360] › e2e/shell.spec.ts:877:3 › mobile chrome › no Settings item leaks into the mobile category drawer (840ms)
  ✓   42 [mobile-360] › e2e/shell.spec.ts:886:3 › mobile chrome › search opens a full-width row BELOW the bar (713ms)
  ✓   43 [mobile-360] › e2e/shell.spec.ts:900:3 › mobile chrome › no horizontal overflow and text stays legible at 360 (673ms)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   22 [mobile-360] › e2e/admin-attributes-import.spec.ts:1092:3 › C3 attributes console › AT-24 a commit whose bytes changed since the preview is refused (4.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090325216-1-2856-3-ljdzqi@ethio-e2e.invalid)
  ✓   24 [mobile-360] › e2e/admin-attributes-import.spec.ts:1122:3 › C3 attributes console › AT-25 an invalid option parent is refused (6.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090325216-1-2856-3-ljdzqi@ethio-e2e.invalid)
  ✓   23 [mobile-360] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (13.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090325216-1-2856-2-szulez@ethio-e2e.invalid)
  ✓   25 [mobile-360] › e2e/admin-attributes-import.spec.ts:1168:3 › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both (11.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090325216-1-2856-3-ljdzqi@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   36 [mobile-360] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (8.3s)
  ✓   35 [mobile-360] › e2e/admin-users.spec.ts:290:3 › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered (21.2s)
  ✓   37 [mobile-360] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (9.3s)
  ✓   38 [mobile-360] › e2e/admin-users.spec.ts:318:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (15.0s)
  ✓   39 [mobile-360] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (12.9s)
  ✓   40 [mobile-360] › e2e/admin-users.spec.ts:362:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (5.5s)
  ✓   41 [mobile-360] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (10.5s)
  ✓   43 [mobile-360] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (8.0s)
  ✓   42 [mobile-360] › e2e/admin-users.spec.ts:375:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (15.0s)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   17 [mobile-360] › e2e/post-wizard-resets.spec.ts:829:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (15.1s)
  ✓   19 [mobile-360] › e2e/post-wizard-resets.spec.ts:957:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (11.5s)
  ✓   18 [mobile-360] › e2e/post-wizard-pricing.spec.ts:566:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (21.4s)
  ✓   21 [mobile-360] › e2e/post-wizard-pricing.spec.ts:600:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (9.9s)
  ✓   20 [mobile-360] › e2e/post-wizard-specs.spec.ts:211:3 › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it (13.9s)
  ✓   22 [mobile-360] › e2e/post-wizard-pricing.spec.ts:634:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (7.5s)
  ✓   23 [mobile-360] › e2e/post-wizard-specs.spec.ts:289:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (13.9s)
  ✓   24 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (19.2s)
  ✓   25 [mobile-360] › e2e/post-wizard-specs.spec.ts:374:3 › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field (12.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
  ✓   25 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1092:3 › C3 attributes console › AT-24 a commit whose bytes changed since the preview is refused (4.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090325216-4-3069-2-2hz2x8@ethio-e2e.invalid)
  ✓   26 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1122:3 › C3 attributes console › AT-25 an invalid option parent is refused (6.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090325216-4-3069-2-2hz2x8@ethio-e2e.invalid)
  ✓   27 [desktop-1280] › e2e/admin-attributes-import.spec.ts:1168:3 › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both (10.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37090325216-4-3069-2-2hz2x8@ethio-e2e.invalid)
  ✓   24 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1111:3 › C3 attributes console › AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere (26.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37090325216-4-3069-3-3sozr7@ethio-e2e.invalid)
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
✓   24 [desktop-1280] › e2e/admin-users.spec.ts:318:3 › U1 admin users › AU-5 seam: a deactivated account cannot write a listing (15.3s)
  ✓   25 [desktop-1280] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (16.0s)
  ✓   26 [desktop-1280] › e2e/admin-users.spec.ts:362:3 › U1 admin users › AU-6 negative: a base user cannot call the status RPC (6.1s)
  ✓   27 [desktop-1280] › e2e/auth-signout.spec.ts:358:3 › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension) (7.5s)
  ✓   29 [desktop-1280] › e2e/category-image-routes.spec.ts:111:3 › C5a — category AI foundation routes › CI-1 unauthenticated callers are refused by both routes (88ms)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   30 [desktop-1280] › e2e/category-image-routes.spec.ts:119:3 › C5a — category AI foundation routes › CI-2 fake generate returns a PNG payload and writes no storage object (6.1s)
  ✓   28 [desktop-1280] › e2e/admin-users.spec.ts:375:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (14.1s)
  ✓   31 [desktop-1280] › e2e/category-image-routes.spec.ts:160:3 › C5a — category AI foundation routes › CI-2b unknown categoryId is an honest 404, never a 502 (4.8s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   14 [desktop-1280] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (18.2s)
  ✓   15 [desktop-1280] › e2e/post-wizard-resets.spec.ts:559:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (21.0s)
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:621:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (18.1s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:701:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (16.0s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:829:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (12.1s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (23.3s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:957:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (11.5s)
  ✓   22 [desktop-1280] › e2e/post-wizard-where.spec.ts:148:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (15.1s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:689:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (27.4s)
```
