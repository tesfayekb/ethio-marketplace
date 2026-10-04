# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37227771204
- Commit: `d0b05bbc8d4cb196de2b812d7e869c94462802d7`
- Attempt: 1
- Written (UTC): 2026-10-04T19:30:19.714Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

82 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 9 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 8 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 3 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `export_failed permission denied` (quiet) | 2 | shard 4 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 1 | shard 2 |
| `locations badHeader` (quiet) | 1 | shard 2 |
| `locations file too large` (quiet) | 1 | shard 2 |
| `locations nulByte` (quiet) | 1 | shard 2 |
| `locations unknownColumn` (quiet) | 1 | shard 2 |
| `locations wrongFile` (quiet) | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×9 · too many previews ×8 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · export_failed permission denied ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · links unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37227771204-email
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
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
[a11y] wizard-5 desktop-1280 serious=0 critical=0
  ✓   79 [desktop-1280] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (18.6s)
  ✓   80 [desktop-1280] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (9.0s)
  ✓   81 [desktop-1280] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (10.3s)
  ✓   82 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (10.6s)
  ✓   83 [desktop-1280] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (9.9s)
  ✓   84 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (8.5s)
  ✓   85 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.1s)
  ✓   86 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (14.4s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37227771204-email

  1 passed (10.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   53 [mobile-360] › e2e/admin-attributes-library.spec.ts:561:3 › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN (8.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37227771204-1-2843-3-ps5tvy@ethio-e2e.invalid)
  ✓   54 [mobile-360] › e2e/admin-attributes-library.spec.ts:612:3 › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending (6.0s)
  ✓   52 [mobile-360] › e2e/admin-attributes-links.spec.ts:781:3 › C3 attributes console › AT-60 a links file reorders three links and the posting read follows (19.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37227771204-1-2843-2-tm1fie@ethio-e2e.invalid)
  ✓   55 [mobile-360] › e2e/admin-attributes-library.spec.ts:665:3 › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses (13.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37227771204-1-2843-3-ps5tvy@ethio-e2e.invalid)
  ✓   56 [mobile-360] › e2e/admin-attributes-links.spec.ts:919:3 › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged (11.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37227771204-1-2843-2-tm1fie@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (6) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   37 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (32.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
  ✘   41 [mobile-360] › e2e/admin-users.spec.ts:452:3 › U1 admin users › AU-12 edit: a reserved name needs a reason of ten characters (retry #1) (32.4s)
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37227771204-2-3045-2-xhqbeg@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
  ✓  105 [mobile-360] › e2e/import-security.spec.ts:908:3 › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not (3.6s)
  ✓  104 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (13.0s)
  ✓  106 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:190:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (12.4s)
  ✓  107 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (11.9s)
  ✓  108 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:231:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (15.9s)
  ✓  109 [mobile-360] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (19.9s)
  ✓  110 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:270:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (14.1s)
```

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:961:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (36.2s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:559:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (22.8s)
  ✓   36 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1026:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (24.5s)
  ✓   37 [mobile-360] › e2e/post-wizard-specs.spec.ts:635:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (20.3s)
  ✓   38 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1060:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (18.5s)
  ✓   39 [mobile-360] › e2e/post-wizard-specs.spec.ts:662:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (23.2s)
  ✓   40 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1078:3 › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) (31.6s)
  ✓   41 [mobile-360] › e2e/post-wizard-specs.spec.ts:662:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (21.8s)
  ✓   42 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1145:3 › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control (16.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   65 [desktop-1280] › e2e/admin-audit.spec.ts:135:3 › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it @private-identity (20.5s)
  ✓   67 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1127:3 › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it (11.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37227771204-4-3063-2-lwtzj8@ethio-e2e.invalid)
  ✓   68 [desktop-1280] › e2e/admin-audit.spec.ts:162:3 › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded @private-identity (17.6s)
  ✓   69 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1215:3 › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers (14.5s)
  ✓   71 [desktop-1280] › e2e/admin-categories-console.spec.ts:83:3 › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin (14.4s)
  ✓   72 [desktop-1280] › e2e/admin-categories-console.spec.ts:101:3 › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows (7.7s)
  ✓   70 [desktop-1280] › e2e/admin-audit.spec.ts:191:3 › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller @private-identity (28.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37227771204-4-3063-3-mqsi87@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   63 [desktop-1280] › e2e/locations-tree.spec.ts:104:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (1.5s)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
  ✓   83 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-countries › IG-1 locations-countries: malformed, foreign, oversized and unreadable files are refused whole (2.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37227771204-5-3081-2-w6sljo@ethio-e2e.invalid)
  ✓   84 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-countries › IG-2 locations-countries: dangerous cells refuse their own row and name the reason (2.9s)
  ✓   81 [desktop-1280] › e2e/photo-pipeline.spec.ts:110:3 › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) (18.5s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   47 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1674:3 › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile (12.0s)
  ✓   48 [desktop-1280] › e2e/post-wizard-where.spec.ts:871:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-101 the location details refuse a phone number and keep a street note (12.5s)
  ✓   49 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1743:3 › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) (18.7s)
  ✓   50 [desktop-1280] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (12.4s)
  ✓   52 [desktop-1280] › e2e/posting-routes.spec.ts:123:3 › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 (9.3s)
  ✓   51 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1804:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (14.5s)
  ✓   53 [desktop-1280] › e2e/posting-routes.spec.ts:151:3 › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) (11.6s)
  ✓   54 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1879:3 › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides (17.8s)
  ✓   55 [desktop-1280] › e2e/posting-routes.spec.ts:218:3 › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081) (10.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
