# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38406458515
- Commit: `53f695190ab54798c6f995512bf4f399ac69a876`
- Attempt: 1
- Written (UTC): 2026-10-13T13:43:49.593Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (0 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

12 line(s), 6 message(s): 1 off the allowlist, 5 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 1 | shard 3 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×3 · definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 38406458515-email
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

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
-   74 [mobile-360] › e2e/shell.spec.ts:1771:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   75 [mobile-360] › e2e/shell.spec.ts:1835:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   76 [mobile-360] › e2e/shell.spec.ts:1862:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (494ms)
  ✓   77 [mobile-360] › e2e/shell.spec.ts:1894:3 › i18n gate is non-blocking (U4f-2) › TR-36 the header renders while the languages read is still in flight (461ms)
  ✓   78 [mobile-360] › e2e/shell.spec.ts:1906:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (10.0s)
  ✓   79 [mobile-360] › e2e/shell.spec.ts:1962:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (10.0s)
  ✓   80 [mobile-360] › e2e/shell.spec.ts:1977:3 › U4h device language star › TR-37 the account carries onto a starless device, and never over a star (19.0s)
  ✓   81 [mobile-360] › e2e/shell.spec.ts:2044:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.5s)
  ✓   82 [mobile-360] › e2e/shell.spec.ts:2172:3 › L4b location picker › LS-1 the cascade reaches a sub-city (6.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (5.0s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.5s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38406458515-email

  2 passed (18.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   37 [mobile-360] › e2e/admin-attributes-import.spec.ts:1739:3 › C3 attributes console › AT-28 a categories file is refused by identity (3.6s)
  ✓   36 [mobile-360] › e2e/admin-attributes-editor.spec.ts:1647:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (23.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38406458515-1-3067-2-2oi9al@ethio-e2e.invalid)
  ✓   38 [mobile-360] › e2e/admin-attributes-library.spec.ts:52:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (20.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38406458515-1-3067-3-lcezld@ethio-e2e.invalid)
  ✓   39 [mobile-360] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (13.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38406458515-1-3067-2-2oi9al@ethio-e2e.invalid)
  ✓   40 [mobile-360] › e2e/admin-attributes-library.spec.ts:72:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (17.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38406458515-1-3067-3-lcezld@ethio-e2e.invalid)
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
✓   48 [mobile-360] › e2e/category-image-routes.spec.ts:111:3 › C5a — category AI foundation routes › CI-1 unauthenticated callers are refused by both routes (63ms)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   49 [mobile-360] › e2e/category-image-routes.spec.ts:119:3 › C5a — category AI foundation routes › CI-2 fake generate returns a PNG payload and writes no storage object (9.7s)
  ✓   50 [mobile-360] › e2e/category-image-routes.spec.ts:160:3 › C5a — category AI foundation routes › CI-2b unknown categoryId is an honest 404, never a 502 (5.3s)
  ✓   51 [mobile-360] › e2e/category-image-routes.spec.ts:176:3 › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp (8.5s)
  ✓   47 [mobile-360] › e2e/admin-users.spec.ts:456:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (29.7s)
  ✓   52 [mobile-360] › e2e/category-image-routes.spec.ts:252:3 › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value (5.8s)
  ✓   54 [mobile-360] › e2e/category-nav.spec.ts:53:3 › category selection navigates › C-6: clicking a category changes the URL and survives reload (1.9s)
  ✓   55 [mobile-360] › e2e/category-nav.spec.ts:67:3 › category selection navigates › C-7: the rail highlight follows the URL (1.7s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   15 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (16.6s)
  ✓   16 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (27.3s)
  ✓   17 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (27.3s)
  ✓   19 [mobile-360] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (21.8s)
  ✓   18 [mobile-360] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (47.6s)
  ✓   20 [mobile-360] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (15.8s)
  ✓   22 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (14.4s)
  ✓   21 [mobile-360] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else (20.6s)
  ✓   23 [mobile-360] › e2e/post-wizard-pricing.spec.ts:700:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (22.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   37 [desktop-1280] › e2e/admin-attributes-editor.spec.ts:1647:3 › C3 attributes console › AT-58 a rank swap within one category imports through the route (24.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38406458515-4-3056-2-tkmcdz@ethio-e2e.invalid)
  ✓   40 [desktop-1280] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (14.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38406458515-4-3056-2-tkmcdz@ethio-e2e.invalid)
  ✓   39 [desktop-1280] › e2e/admin-attributes-library.spec.ts:72:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (17.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38406458515-4-3056-3-hvawpg@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   41 [desktop-1280] › e2e/admin-attributes-links.spec.ts:251:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (15.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38406458515-4-3056-2-tkmcdz@ethio-e2e.invalid)
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
✓   32 [desktop-1280] › e2e/category-image-routes.spec.ts:176:3 › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp (9.8s)
  ✓   34 [desktop-1280] › e2e/category-image-routes.spec.ts:252:3 › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value (7.8s)
  ✓   35 [desktop-1280] › e2e/category-nav.spec.ts:53:3 › category selection navigates › C-6: clicking a category changes the URL and survives reload (2.3s)
  ✓   36 [desktop-1280] › e2e/category-nav.spec.ts:67:3 › category selection navigates › C-7: the rail highlight follows the URL (1.6s)
  ✓   37 [desktop-1280] › e2e/category-nav.spec.ts:77:3 › category selection navigates › C-8: Home clears the category (1.7s)
  ✓   38 [desktop-1280] › e2e/category-nav.spec.ts:94:3 › category selection navigates › C-9: /auth is a page — Home > Sign in, no category selected (1.1s)
  ✓   33 [desktop-1280] › e2e/admin-users.spec.ts:416:3 › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes (22.7s)
  ✓   39 [desktop-1280] › e2e/category-nav.spec.ts:108:3 › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it (7.5s)
  ✓   41 [desktop-1280] › e2e/feed-index.spec.ts:177:3 › FEED INDEX › FE-1 the refresh writes one row per category key and place key (13.6s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   13 [desktop-1280] › e2e/post-wizard-specs.spec.ts:481:3 › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed (13.2s)
  ✓   11 [desktop-1280] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (39.6s)
  ✓   14 [desktop-1280] › e2e/post-wizard-specs.spec.ts:546:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (19.0s)
  ✓   15 [desktop-1280] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else (28.4s)
  ✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:575:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (23.5s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (17.3s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:719:3 › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too (22.5s)
  ✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (22.9s)
  ✓   19 [desktop-1280] › e2e/post-wizard-specs.spec.ts:621:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (23.4s)
```
