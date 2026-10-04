# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37235098893
- Commit: `2bebb42d84f2c4aa022184080a1d403a40c81d80`
- Attempt: 1
- Written (UTC): 2026-10-04T21:17:49.859Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

12 line(s), 6 message(s): 1 off the allowlist, 5 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 2 | shard 2, shard 4 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 2 | shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×2 · definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 2 · Sources: shard 3, shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37235098893-email
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

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   52 [mobile-360] › e2e/shell.spec.ts:1118:3 › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned (8.0s)
  -   53 [mobile-360] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed
  -   54 [mobile-360] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out
  -   55 [mobile-360] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls
  -   56 [mobile-360] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   57 [mobile-360] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   58 [mobile-360] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (457ms)
  ✓   59 [mobile-360] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (480ms)
  ✓   60 [mobile-360] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (5.7s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.7s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37235098893-email

  1 passed (15.5s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235098893-1-3158-3-ltbqjd@ethio-e2e.invalid)
  ✓   24 [mobile-360] › e2e/admin-attributes-editor.spec.ts:976:3 › C3 attributes console › AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes (13.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37235098893-1-3158-2-r9iprg@ethio-e2e.invalid)
  ✓   25 [mobile-360] › e2e/admin-attributes-import.spec.ts:1168:3 › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both (10.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235098893-1-3158-3-ltbqjd@ethio-e2e.invalid)
  ✓   27 [mobile-360] › e2e/admin-attributes-import.spec.ts:1266:3 › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies (7.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235098893-1-3158-3-ltbqjd@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
  ✓   28 [mobile-360] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (3.1s)
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
✓   51 [mobile-360] › e2e/geo.spec.ts:33:3 › L4a geo guess › GE-2 a cf-ipcountry header is the second source: the country only (92ms)
  ✓   52 [mobile-360] › e2e/geo.spec.ts:54:3 › L4a geo guess › GE-3 a malformed header is no guess at all (112ms)
  ✓   49 [mobile-360] › e2e/category-nav.spec.ts:91:3 › category selection navigates › C-4: /auth is a page — Home > Sign in, no category selected (617ms)
  ✓   53 [mobile-360] › e2e/geo.spec.ts:74:3 › L4a geo guess › GE-4 the visitor-location headers are the deepest source (86ms)
  ✓   55 [mobile-360] › e2e/geo.spec.ts:104:3 › L4a geo guess › GE-5 malformed coordinates fall to the country header (78ms)
  ✓   56 [mobile-360] › e2e/i18n-bundle.spec.ts:72:3 › STAB-I18N · cached translation bundle › IB-1 repeated GETs are identical, validated, and 304 on If-None-Match (930ms)
  ✓   54 [mobile-360] › e2e/category-nav.spec.ts:105:3 › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it (4.8s)
  ✓   58 [mobile-360] › e2e/i18n-coverage.spec.ts:187:3 › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback (612ms)
  ✓   59 [mobile-360] › e2e/i18n-coverage.spec.ts:202:3 › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback (814ms)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   11 [mobile-360] › e2e/post-wizard-pricing.spec.ts:442:3 › POSTING WIZARD › PW-94 a listing card prints its price period (13.3s)
  ✓   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (19.1s)
  ✓   10 [mobile-360] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (36.7s)
  ✓   13 [mobile-360] › e2e/post-wizard-pricing.spec.ts:488:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (14.8s)
  ✓   14 [mobile-360] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (13.4s)
  ✓   16 [mobile-360] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (15.3s)
  ✓   15 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (16.8s)
  ✓   17 [mobile-360] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (14.6s)
  ✓   18 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (22.2s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   30 [desktop-1280] › e2e/admin-attributes-library.spec.ts:46:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (14.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37235098893-4-2877-2-g0zxrg@ethio-e2e.invalid)
  ✓   32 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1307:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (13.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235098893-4-2877-3-lz6ntf@ethio-e2e.invalid)
  ✓   33 [desktop-1280] › e2e/admin-attributes-library.spec.ts:66:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (16.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37235098893-4-2877-2-g0zxrg@ethio-e2e.invalid)
  ✓   34 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1413:3 › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets (12.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37235098893-4-2877-3-lz6ntf@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    6 [desktop-1280] › e2e/admin-translations-data.spec.ts:452:3 › U4b translations console › TR-26 the Data scope approves every machine-filled content name (22.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37235098893-5-3066-2-kvk718@ethio-e2e.invalid)
  ✓    7 [desktop-1280] › e2e/admin-translations-governance.spec.ts:1088:3 › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows (18.7s)
  ✓    8 [desktop-1280] › e2e/admin-translations-data.spec.ts:587:3 › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else (14.9s)
  ✓   10 [desktop-1280] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (10.2s)
  ✓   11 [desktop-1280] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (9.2s)
  ✓    9 [desktop-1280] › e2e/admin-users.spec.ts:185:3 › U1 admin users › AU-1 permission: moderator is refused, admin sees the list (20.8s)
  ✓   12 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (10.1s)
  ✓   13 [desktop-1280] › e2e/admin-users.spec.ts:206:3 › U1 admin users › AU-2 search and status filter (11.6s)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:595:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (13.0s)
  ✓   11 [desktop-1280] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (37.8s)
  ✓   14 [desktop-1280] › e2e/post-wizard-specs.spec.ts:616:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (14.2s)
  ✓   15 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (13.7s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:692:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (15.5s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (16.1s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (13.8s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:719:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (17.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
