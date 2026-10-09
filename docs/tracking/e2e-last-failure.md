# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37887141677
- Commit: `dc990588454e98be8ee131c87c6ae16f653b9eff`
- Attempt: 1
- Written (UTC): 2026-10-09T05:15:58.995Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

73 line(s), 30 message(s): 0 off the allowlist, 30 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 8 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 8 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 1 | shard 2 |
| `locations file too large` (quiet) | 1 | shard 2 |
| `locations nulByte` (quiet) | 1 | shard 2 |
| `locations unknownColumn` (quiet) | 1 | shard 2 |
| `locations wrongFile` (quiet) | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×8 · too many previews ×8 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1

Off the allowlist: none.

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
[e2e:teardown] deleted 4 user(s) owned by process 37887141677-email
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
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
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
-   74 [mobile-360] › e2e/shell.spec.ts:1766:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail
  -   75 [mobile-360] › e2e/shell.spec.ts:1830:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable
  ✓   76 [mobile-360] › e2e/shell.spec.ts:1857:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360 (579ms)
  ✓   77 [mobile-360] › e2e/shell.spec.ts:1889:3 › i18n gate is non-blocking (U4f-2) › TR-18 the header renders while the languages read is still in flight (527ms)
  ✓   78 [mobile-360] › e2e/shell.spec.ts:1901:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (8.1s)
  ✓   79 [mobile-360] › e2e/shell.spec.ts:1957:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (8.3s)
  ✓   80 [mobile-360] › e2e/shell.spec.ts:1972:3 › U4h device language star › TR-28 the account carries onto a starless device, and never over a star (17.4s)
  ✓   81 [mobile-360] › e2e/shell.spec.ts:2039:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.0s)
  ✓   82 [mobile-360] › e2e/shell.spec.ts:2160:3 › L4b location picker › LS-1 the cascade reaches a sub-city (7.3s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (5.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37887141677-email

  1 passed (10.1s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   41 [mobile-360] › e2e/admin-attributes-links.spec.ts:251:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (12.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-1-3009-2-qjpk0w@ethio-e2e.invalid)
  ✓   43 [mobile-360] › e2e/admin-attributes-links.spec.ts:353:3 › C3 attributes console › AT-37 a delete after the file's own unlink is accepted and undone (12.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-1-3009-2-qjpk0w@ethio-e2e.invalid)
  ✓   42 [mobile-360] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (26.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887141677-1-3009-3-ewrlbd@ethio-e2e.invalid)
  ✓   44 [mobile-360] › e2e/admin-attributes-links.spec.ts:444:3 › C3 attributes console › AT-38 an inherited echo does not collide with a direct row (12.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-1-3009-2-qjpk0w@ethio-e2e.invalid)
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
--- error lines (11) ---
  ✘   40 [mobile-360] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (16.3s)
  ✘   53 [mobile-360] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (retry #1) (18.4s)
  ✘   58 [mobile-360] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (17.0s)
  ✘   62 [mobile-360] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (retry #1) (21.0s)
  ✘   65 [mobile-360] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (29.4s)
  ✘   66 [mobile-360] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (retry #1) (21.2s)
  ✘   70 [mobile-360] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (18.2s)
  ✘   71 [mobile-360] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (retry #1) (9.7s)
  ✘   75 [mobile-360] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (10.7s)
  ✘   79 [mobile-360] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (retry #1) (10.2s)
  ✘   81 [mobile-360] › e2e/feed-index.spec.ts:355:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (10.9s)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
  ✓   82 [mobile-360] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole (2.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-2-3081-2-p4nywu@ethio-e2e.invalid)
  ✓   83 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason (2.6s)
  ✘   81 [mobile-360] › e2e/feed-index.spec.ts:355:3 › FEED INDEX › FE-11 a city moved to another region is re-indexed by the sweep (10.9s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓   84 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (13.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-2-3081-2-p4nywu@ethio-e2e.invalid)
```

```text
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
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   18 [mobile-360] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (27.7s)
  ✓   20 [mobile-360] › e2e/post-wizard-specs.spec.ts:621:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (23.4s)
  ✓   19 [mobile-360] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (29.3s)
  ✓   21 [mobile-360] › e2e/post-wizard-specs.spec.ts:697:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (17.8s)
  ✓   22 [mobile-360] › e2e/post-wizard-resets.spec.ts:971:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (14.5s)
  ✓   23 [mobile-360] › e2e/post-wizard-specs.spec.ts:724:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (19.1s)
  ✓   24 [mobile-360] › e2e/post-wizard-resets.spec.ts:1095:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (18.4s)
  ✓   26 [mobile-360] › e2e/post-wizard-resets.spec.ts:1140:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (15.3s)
  ✓   25 [mobile-360] › e2e/post-wizard-specs.spec.ts:724:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (19.6s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-4-2812-2-ppfkhp@ethio-e2e.invalid)
  ✓   49 [desktop-1280] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (30.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887141677-4-2812-3-5eyhkj@ethio-e2e.invalid)
  ✓   50 [desktop-1280] › e2e/admin-attributes-library.spec.ts:283:3 › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear (16.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-4-2812-2-ppfkhp@ethio-e2e.invalid)
  ✓   52 [desktop-1280] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (10.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-4-2812-2-ppfkhp@ethio-e2e.invalid)
  ✓   51 [desktop-1280] › e2e/admin-attributes-links.spec.ts:677:3 › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error (23.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37887141677-4-2812-3-5eyhkj@ethio-e2e.invalid)
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
--- error lines (9) ---
  ✘   26 [desktop-1280] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (18.2s)
  ✘   37 [desktop-1280] › e2e/feed-index.spec.ts:259:3 › FEED INDEX › FE-6 a listing written active is indexed by itself (retry #1) (14.3s)
  ✘   42 [desktop-1280] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (15.7s)
  ✘   48 [desktop-1280] › e2e/feed-index.spec.ts:268:3 › FEED INDEX › FE-7 leaving active removes the rows and returning restores them (retry #1) (18.1s)
  ✘   51 [desktop-1280] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (14.0s)
  ✘   53 [desktop-1280] › e2e/feed-index.spec.ts:282:3 › FEED INDEX › FE-8 the tier sets the rank (retry #1) (19.0s)
  ✘   55 [desktop-1280] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (18.4s)
  ✘   58 [desktop-1280] › e2e/feed-index.spec.ts:297:3 › FEED INDEX › FE-9 an extra place removed or added changes the rows (retry #1) (25.7s)
  ✘   61 [desktop-1280] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (21.0s)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
  ✓   64 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE locations-countries › IG-1 locations-countries: malformed, foreign, oversized and unreadable files are refused whole (2.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37887141677-5-2880-2-5ww55k@ethio-e2e.invalid)
  ✘   61 [desktop-1280] › e2e/feed-index.spec.ts:316:3 › FEED INDEX › FE-10 a category surfaced under a new parent is re-indexed by the sweep (21.0s)
  ✓   65 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-countries › IG-2 locations-countries: dangerous cells refuse their own row and name the reason (3.0s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
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
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   16 [desktop-1280] › e2e/post-wizard-specs.spec.ts:575:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (32.6s)
  ✓   17 [desktop-1280] › e2e/post-wizard-resets.spec.ts:719:3 › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too (29.4s)
  ✓   18 [desktop-1280] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (22.5s)
  ✓   20 [desktop-1280] › e2e/post-wizard-specs.spec.ts:621:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (21.2s)
  ✓   19 [desktop-1280] › e2e/post-wizard-resets.spec.ts:842:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (31.3s)
  ✓   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:697:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (18.9s)
  ✓   22 [desktop-1280] › e2e/post-wizard-resets.spec.ts:971:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (17.3s)
  ✓   23 [desktop-1280] › e2e/post-wizard-specs.spec.ts:724:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (18.7s)
  ✓   24 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1095:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (16.9s)
```
