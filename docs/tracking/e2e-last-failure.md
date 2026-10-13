# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38347100745
- Commit: `28832d59fecabdd3d4b623c16fc819319dac31c2`
- Attempt: 1
- Written (UTC): 2026-10-13T04:42:07.176Z
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

15 line(s), 6 message(s): 1 off the allowlist, 5 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 3 | shard 3 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3

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
[e2e:teardown] deleted 4 user(s) owned by process 38347100745-email
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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
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
-   73 [mobile-360] › e2e/shell.spec.ts:1701:3 › desktop layout laws (U0g) › L1/L2: the top band and the rail stay put while content scrolls
  -   74 [mobile-360] › e2e/shell.spec.ts:1771:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   75 [mobile-360] › e2e/shell.spec.ts:1835:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   76 [mobile-360] › e2e/shell.spec.ts:1862:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (692ms)
  ✓   77 [mobile-360] › e2e/shell.spec.ts:1894:3 › i18n gate is non-blocking (U4f-2) › TR-36 the header renders while the languages read is still in flight (705ms)
  ✓   78 [mobile-360] › e2e/shell.spec.ts:1906:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (11.7s)
  ✓   79 [mobile-360] › e2e/shell.spec.ts:1962:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (12.2s)
  ✓   80 [mobile-360] › e2e/shell.spec.ts:1977:3 › U4h device language star › TR-37 the account carries onto a starless device, and never over a star (18.1s)
  ✓   81 [mobile-360] › e2e/shell.spec.ts:2044:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (2.8s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.8s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.5s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38347100745-email

  2 passed (11.3s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38347100745-1-3066-2-cz9h9x@ethio-e2e.invalid)
  ✓   43 [mobile-360] › e2e/admin-attributes-library.spec.ts:131:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (27.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38347100745-1-3066-3-7a7wh6@ethio-e2e.invalid)
  ✓   44 [mobile-360] › e2e/admin-attributes-links.spec.ts:444:3 › C3 attributes console › AT-38 an inherited echo does not collide with a direct row (15.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38347100745-1-3066-2-cz9h9x@ethio-e2e.invalid)
  ✓   46 [mobile-360] › e2e/admin-attributes-links.spec.ts:539:3 › C3 attributes console › AT-39 empty read-only cells are never reported as edits (8.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38347100745-1-3066-2-cz9h9x@ethio-e2e.invalid)
  ✓   45 [mobile-360] › e2e/admin-attributes-library.spec.ts:176:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (28.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38347100745-1-3066-3-7a7wh6@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓   51 [mobile-360] › e2e/category-image-routes.spec.ts:176:3 › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp (12.0s)
  ✓   52 [mobile-360] › e2e/category-image-routes.spec.ts:252:3 › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value (7.1s)
  ✓   53 [mobile-360] › e2e/category-nav.spec.ts:53:3 › category selection navigates › C-6: clicking a category changes the URL and survives reload (1.9s)
  ✓   54 [mobile-360] › e2e/category-nav.spec.ts:67:3 › category selection navigates › C-7: the rail highlight follows the URL (2.0s)
  ✓   55 [mobile-360] › e2e/category-nav.spec.ts:77:3 › category selection navigates › C-8: Home clears the category (2.1s)
  ✓   56 [mobile-360] › e2e/category-nav.spec.ts:94:3 › category selection navigates › C-9: /auth is a page — Home > Sign in, no category selected (676ms)
  ✓   57 [mobile-360] › e2e/category-nav.spec.ts:108:3 › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it (5.9s)
  ✓   50 [mobile-360] › e2e/admin-users.spec.ts:456:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (35.6s)
  ✓   59 [mobile-360] › e2e/admin-users.spec.ts:519:3 › U1 admin users › AU-11 own row: no edit form on your own record (10.3s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   26 [mobile-360] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (19.6s)
  ✓   28 [mobile-360] › e2e/post-wizard-resets.spec.ts:982:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (19.3s)
[pw162] mobile-360 a: summary=none photos=true | c: summary=none photos=true | d: summary=none photos=true
  ✓   27 [mobile-360] › e2e/post-wizard-pricing.spec.ts:753:3 › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) (32.5s)
  -   30 [mobile-360] › e2e/post-wizard-pricing.spec.ts:850:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)
  ✓   29 [mobile-360] › e2e/post-wizard-resets.spec.ts:1106:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (14.3s)
  ✓   31 [mobile-360] › e2e/post-wizard-pricing.spec.ts:876:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar (11.0s)
  ✓   32 [mobile-360] › e2e/post-wizard-resets.spec.ts:1151:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (12.9s)
  ✓   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1077:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (15.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   39 [desktop-1280] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (17.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38347100745-4-3069-2-ccw7rg@ethio-e2e.invalid)
  ✓   40 [desktop-1280] › e2e/admin-attributes-library.spec.ts:72:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (18.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38347100745-4-3069-3-vfhzjy@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   41 [desktop-1280] › e2e/admin-attributes-links.spec.ts:251:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (19.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38347100745-4-3069-2-ccw7rg@ethio-e2e.invalid)
  ✓   43 [desktop-1280] › e2e/admin-attributes-links.spec.ts:353:3 › C3 attributes console › AT-37 a delete after the file's own unlink is accepted and undone (14.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38347100745-4-3069-2-ccw7rg@ethio-e2e.invalid)
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
✓   34 [desktop-1280] › e2e/category-image-routes.spec.ts:252:3 › C5a — category AI foundation routes › CI-3 suggest-icon returns an allowlisted value (10.1s)
  ✓   36 [desktop-1280] › e2e/category-nav.spec.ts:53:3 › category selection navigates › C-6: clicking a category changes the URL and survives reload (1.7s)
  ✓   37 [desktop-1280] › e2e/category-nav.spec.ts:67:3 › category selection navigates › C-7: the rail highlight follows the URL (3.1s)
  ✓   38 [desktop-1280] › e2e/category-nav.spec.ts:77:3 › category selection navigates › C-8: Home clears the category (2.4s)
  ✓   39 [desktop-1280] › e2e/category-nav.spec.ts:94:3 › category selection navigates › C-9: /auth is a page — Home > Sign in, no category selected (660ms)
  ✓   40 [desktop-1280] › e2e/category-nav.spec.ts:108:3 › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it (8.8s)
  ✓   35 [desktop-1280] › e2e/admin-users.spec.ts:456:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (36.3s)
  ✓   41 [desktop-1280] › e2e/feed-index.spec.ts:177:3 › FEED INDEX › FE-1 the refresh writes one row per category key and place key (24.4s)
  ✓   42 [desktop-1280] › e2e/admin-users.spec.ts:519:3 › U1 admin users › AU-11 own row: no edit form on your own record (12.0s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:719:3 › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too (28.0s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (21.3s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (26.5s)
  ✓   20 [desktop-1280] › e2e/post-wizard-specs.spec.ts:621:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (28.5s)
  ✓   21 [desktop-1280] › e2e/post-wizard-resets.spec.ts:982:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (20.9s)
  ✓   22 [desktop-1280] › e2e/post-wizard-specs.spec.ts:697:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (24.8s)
  ✓   23 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1106:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (23.8s)
  ✓   24 [desktop-1280] › e2e/post-wizard-specs.spec.ts:724:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (23.9s)
  ✓   25 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1151:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (17.1s)
```
