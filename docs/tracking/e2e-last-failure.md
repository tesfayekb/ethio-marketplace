# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38342999419
- Commit: `304017ca132b017856d08e791e0aa6dc48451b7a`
- Attempt: 1
- Written (UTC): 2026-10-13T03:50:25.068Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

14 line(s), 6 message(s): 1 off the allowlist, 5 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 2 | shard 1, shard 4 |
| `definitions wrongFile` (quiet) | 2 | shard 1, shard 4 |
| `digest mismatch` (quiet) | 2 | shard 1, shard 4 |
| `listing not found` | 2 | shard 3 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×2 · definitions wrongFile ×2 · digest mismatch ×2 · preview_failed permission denied ×2

Off the allowlist:

### listing not found

- Count: 2 · Sources: shard 3

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
[e2e:teardown] deleted 4 user(s) owned by process 38342999419-email
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
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
✓   81 [mobile-360] › e2e/shell.spec.ts:2044:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.5s)
  ✓   82 [mobile-360] › e2e/shell.spec.ts:2172:3 › L4b location picker › LS-1 the cascade reaches a sub-city (6.2s)
  ✓   83 [mobile-360] › e2e/shell.spec.ts:2190:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (17.0s)
  ✓   84 [mobile-360] › e2e/shell.spec.ts:2222:3 › L4b location picker › long location names share one 32px line (14.5s)
  ✓   85 [mobile-360] › e2e/shell.spec.ts:2308:3 › L4b location picker › the location row uses the width-specific label (671ms)
  ✓   86 [mobile-360] › e2e/shell.spec.ts:2327:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (755ms)
  ✓   87 [mobile-360] › e2e/shell.spec.ts:2339:3 › L4b location picker › LS-4 a closed market is not guessed (1.6s)
  ✓   88 [mobile-360] › e2e/shell.spec.ts:2353:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (751ms)
  ✓   89 [mobile-360] › e2e/shell.spec.ts:2453:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (8.7s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 2 tests using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:123:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.6s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:160:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.8s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38342999419-email

  2 passed (13.9s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38342999419-1-2855-2-qwnqvs@ethio-e2e.invalid)
  ✓   45 [mobile-360] › e2e/admin-attributes-links.spec.ts:444:3 › C3 attributes console › AT-38 an inherited echo does not collide with a direct row (8.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38342999419-1-2855-2-qwnqvs@ethio-e2e.invalid)
  ✓   46 [mobile-360] › e2e/admin-attributes-links.spec.ts:539:3 › C3 attributes console › AT-39 empty read-only cells are never reported as edits (4.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38342999419-1-2855-2-qwnqvs@ethio-e2e.invalid)
  ✓   44 [mobile-360] › e2e/admin-attributes-library.spec.ts:176:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (24.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38342999419-1-2855-3-huouax@ethio-e2e.invalid)
  ✓   47 [mobile-360] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (29.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38342999419-1-2855-2-qwnqvs@ethio-e2e.invalid)
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
✓   59 [mobile-360] › e2e/admin-users.spec.ts:537:3 › U1 admin users › AU-13 the users list on the agreed blocks: heading, toolbar, pills, Columns, page size (8.2s)
  ✓   60 [mobile-360] › e2e/feed-index.spec.ts:177:3 › FEED INDEX › FE-1 the refresh writes one row per category key and place key (7.2s)
  ✓   61 [mobile-360] › e2e/feed-route.spec.ts:138:3 › FEED ROUTE › FR-1 a page lists premium, then featured, then regular, newest first in each (8.4s)
  ✓   62 [mobile-360] › e2e/feed-index.spec.ts:199:3 › FEED INDEX › FE-2 a listing that is not active gets no rows (8.9s)
  ✓   63 [mobile-360] › e2e/feed-route.spec.ts:148:3 › FEED ROUTE › FR-2 a category's page holds its whole branch (9.0s)
  ✓   64 [mobile-360] › e2e/feed-index.spec.ts:206:3 › FEED INDEX › FE-3 deleting a listing removes its rows (9.3s)
  ✓   65 [mobile-360] › e2e/feed-route.spec.ts:156:3 › FEED ROUTE › FR-3 the chosen place comes first, then the wider place (9.6s)
  ✓   66 [mobile-360] › e2e/feed-index.spec.ts:213:3 › FEED INDEX › FE-4 the check reads one listing's rows (11.3s)
  ✓   68 [mobile-360] › e2e/feed-index.spec.ts:242:3 › FEED INDEX › FE-5 browsers cannot read the index or call its functions (458ms)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   15 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (22.0s)
  ✓   16 [mobile-360] › e2e/post-wizard-resets.spec.ts:500:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (34.4s)
  ✓   17 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (33.1s)
  ✓   19 [mobile-360] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (23.5s)
  ✓   18 [mobile-360] › e2e/post-wizard-resets.spec.ts:558:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (46.9s)
  ✓   20 [mobile-360] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (16.7s)
  ✓   22 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (12.7s)
  ✓   21 [mobile-360] › e2e/post-wizard-resets.spec.ts:586:3 › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else (17.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38342999419-4-3055-3-odmah8@ethio-e2e.invalid)
  ✓   48 [desktop-1280] › e2e/admin-attributes-library.spec.ts:223:3 › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked (21.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38342999419-4-3055-3-odmah8@ethio-e2e.invalid)
  ✓   47 [desktop-1280] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (32.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38342999419-4-3055-2-sktnnl@ethio-e2e.invalid)
  ✓   50 [desktop-1280] › e2e/admin-attributes-links.spec.ts:675:3 › C3 attributes console › AT-80 a second card tick waits for the first and both attributes stay on the card (13.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38342999419-4-3055-2-sktnnl@ethio-e2e.invalid)
  ✓   49 [desktop-1280] › e2e/admin-attributes-library.spec.ts:289:3 › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear (19.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38342999419-4-3055-3-odmah8@ethio-e2e.invalid)
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
✓   35 [desktop-1280] › e2e/category-nav.spec.ts:53:3 › category selection navigates › C-6: clicking a category changes the URL and survives reload (2.6s)
  ✓   37 [desktop-1280] › e2e/category-nav.spec.ts:67:3 › category selection navigates › C-7: the rail highlight follows the URL (2.2s)
  ✓   38 [desktop-1280] › e2e/category-nav.spec.ts:77:3 › category selection navigates › C-8: Home clears the category (2.3s)
  ✓   39 [desktop-1280] › e2e/category-nav.spec.ts:94:3 › category selection navigates › C-9: /auth is a page — Home > Sign in, no category selected (918ms)
  ✓   40 [desktop-1280] › e2e/category-nav.spec.ts:108:3 › category selection navigates › C-5: the rail follows root pointer order, and a pointer reorder reaches it (5.5s)
  ✓   41 [desktop-1280] › e2e/feed-index.spec.ts:177:3 › FEED INDEX › FE-1 the refresh writes one row per category key and place key (11.5s)
  ✓   36 [desktop-1280] › e2e/admin-users.spec.ts:456:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (29.8s)
  ✓   42 [desktop-1280] › e2e/feed-index.spec.ts:199:3 › FEED INDEX › FE-2 a listing that is not active gets no rows (11.1s)
  ✓   43 [desktop-1280] › e2e/admin-users.spec.ts:519:3 › U1 admin users › AU-11 own row: no edit form on your own record (7.7s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (22.0s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:697:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (21.0s)
  ✓   22 [desktop-1280] › e2e/post-wizard-resets.spec.ts:982:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (15.8s)
  ✓   23 [desktop-1280] › e2e/post-wizard-specs.spec.ts:724:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (18.8s)
  ✓   24 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1106:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (14.9s)
  ✓   25 [desktop-1280] › e2e/post-wizard-specs.spec.ts:724:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (14.9s)
  ✓   26 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1151:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (15.1s)
  ✓   28 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1274:3 › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them (15.4s)
  ✓   27 [desktop-1280] › e2e/post-wizard-specs.spec.ts:792:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (17.0s)
```
