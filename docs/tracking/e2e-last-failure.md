# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37232823035
- Commit: `57d04428c1f83acca9bcb7ae61a81f7dd921d365`
- Attempt: 1
- Written (UTC): 2026-10-04T20:44:57.162Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

13 line(s), 6 message(s): 1 off the allowlist, 5 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 2 | shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×3 · definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

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
[e2e:teardown] deleted 4 user(s) owned by process 37232823035-email
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

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

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
✓   52 [mobile-360] › e2e/shell.spec.ts:1118:3 › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned (6.9s)
  -   53 [mobile-360] › e2e/shell.spec.ts:1153:3 › rail scroll regions (U0f) › md+ rail: items scroll, header fixed
  -   54 [mobile-360] › e2e/shell.spec.ts:1199:3 › rail scroll regions (U0f) › footer never covers the rail's Sign out
  -   55 [mobile-360] › e2e/shell.spec.ts:1299:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls
  -   56 [mobile-360] › e2e/shell.spec.ts:1369:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   57 [mobile-360] › e2e/shell.spec.ts:1433:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   58 [mobile-360] › e2e/shell.spec.ts:1460:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (510ms)
  ✓   59 [mobile-360] › e2e/shell.spec.ts:1492:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (528ms)
  ✓   60 [mobile-360] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (5.2s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37232823035-email

  1 passed (10.4s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
  ✘   12 [mobile-360] › e2e/admin-attributes-editor.spec.ts:568:3 › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells (1.0m)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
  ✓   23 [mobile-360] › e2e/admin-attributes-import.spec.ts:1348:3 › C3 attributes console › AT-28 a categories file is refused by identity (2.1s)
  ✓   22 [mobile-360] › e2e/admin-attributes-editor.spec.ts:568:3 › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells (retry #1) (14.1s)
  -   25 [mobile-360] › e2e/admin-attributes-editor.spec.ts:657:3 › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232823035-1-3148-2-e5kmd2@ethio-e2e.invalid)
  ✓   24 [mobile-360] › e2e/admin-attributes-library.spec.ts:46:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (8.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232823035-1-3148-3-s86lky@ethio-e2e.invalid)
  ✓   26 [mobile-360] › e2e/admin-attributes-editor.spec.ts:742:3 › C3 attributes console › AT-49 saving a select definition without edits preserves every stored option field (8.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232823035-1-3148-2-e5kmd2@ethio-e2e.invalid)
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
✓   32 [mobile-360] › e2e/auth-signout.spec.ts:288:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (17.3s)
  ✓   35 [mobile-360] › e2e/auth-signout.spec.ts:304:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (13.1s)
  ✓   34 [mobile-360] › e2e/admin-users.spec.ts:384:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (20.1s)
  ✓   36 [mobile-360] › e2e/auth-signout.spec.ts:327:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (18.4s)
  ✓   38 [mobile-360] › e2e/auth-signout.spec.ts:358:3 › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension) (9.2s)
  ✓   39 [mobile-360] › e2e/category-image-routes.spec.ts:111:3 › C5a — category AI foundation routes › CI-1 unauthenticated callers are refused by both routes (99ms)
  ✓   37 [mobile-360] › e2e/admin-users.spec.ts:412:3 › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes (23.5s)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   40 [mobile-360] › e2e/category-image-routes.spec.ts:119:3 › C5a — category AI foundation routes › CI-2 fake generate returns a PNG payload and writes no storage object (6.4s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓    8 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (32.5s)
  ✓    9 [mobile-360] › e2e/post-wizard-pricing.spec.ts:425:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (22.0s)
  ✓   11 [mobile-360] › e2e/post-wizard-pricing.spec.ts:439:3 › POSTING WIZARD › PW-94 a listing card prints its price period (12.9s)
  ✓   10 [mobile-360] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (41.5s)
  ✓   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:461:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (29.3s)
  ✓   13 [mobile-360] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (18.0s)
  ✓   14 [mobile-360] › e2e/post-wizard-pricing.spec.ts:485:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (17.3s)
  ✓   15 [mobile-360] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (12.8s)
  ✓   16 [mobile-360] › e2e/post-wizard-pricing.spec.ts:537:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (14.3s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232823035-4-3180-2-dopp9r@ethio-e2e.invalid)
  ✓   32 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1307:3 › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record (15.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232823035-4-3180-3-ctiqxa@ethio-e2e.invalid)
  ✓   33 [desktop-1280] › e2e/admin-attributes-library.spec.ts:66:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (16.5s)
  ✓   34 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1413:3 › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets (11.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37232823035-4-3180-2-dopp9r@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37232823035-4-3180-3-ctiqxa@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   36 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1534:3 › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count (11.8s)
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
✓   29 [desktop-1280] › e2e/category-image-routes.spec.ts:111:3 › C5a — category AI foundation routes › CI-1 unauthenticated callers are refused by both routes (97ms)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   30 [desktop-1280] › e2e/category-image-routes.spec.ts:119:3 › C5a — category AI foundation routes › CI-2 fake generate returns a PNG payload and writes no storage object (4.8s)
  ✓   27 [desktop-1280] › e2e/admin-users.spec.ts:384:3 › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it (13.3s)
  ✓   31 [desktop-1280] › e2e/category-image-routes.spec.ts:160:3 › C5a — category AI foundation routes › CI-2b unknown categoryId is an honest 404, never a 502 (3.5s)
  ✓   33 [desktop-1280] › e2e/category-image-routes.spec.ts:176:3 › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp (4.3s)
  ✓   34 [desktop-1280] › e2e/category-image-routes.spec.ts:252:3 › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value (3.5s)
  ✓   35 [desktop-1280] › e2e/category-nav.spec.ts:54:3 › category selection navigates › C-1: clicking a category changes the URL and survives reload (1.4s)
  ✓   36 [desktop-1280] › e2e/category-nav.spec.ts:68:3 › category selection navigates › C-2: the rail highlight follows the URL (1.3s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   15 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not (18.6s)
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:692:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (16.7s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:728:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts (17.4s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:719:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (24.7s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:856:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (16.9s)
  ✓   21 [desktop-1280] › e2e/post-wizard-resets.spec.ts:984:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (16.4s)
  ✓   20 [desktop-1280] › e2e/post-wizard-specs.spec.ts:719:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (18.6s)
  ✓   22 [desktop-1280] › e2e/post-wizard-where.spec.ts:152:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (12.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
