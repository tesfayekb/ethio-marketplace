# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37395201304
- Commit: `35f67a7b01b7361e1d88c116e903ed89641f1bb3`
- Attempt: 1
- Written (UTC): 2026-10-06T00:49:03.175Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

62 line(s), 31 message(s): 1 off the allowlist, 30 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 8 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 6 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `listing not found` | 2 | shard 6 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 1 | shard 2 |
| `countries nulByte` (quiet) | 1 | shard 2 |
| `countries tooManyRows` (quiet) | 1 | shard 2 |
| `countries unknownColumn` (quiet) | 1 | shard 2 |
| `countries wrongFile` (quiet) | 1 | shard 2 |
| `locations badHeader` (quiet) | 1 | shard 2 |
| `locations file too large` (quiet) | 1 | shard 2 |
| `locations nulByte` (quiet) | 1 | shard 2 |
| `locations unknownColumn` (quiet) | 1 | shard 2 |
| `locations wrongFile` (quiet) | 1 | shard 2 |
| `strings badHeader` (quiet) | 1 | shard 2 |
| `strings emptyFile` (quiet) | 1 | shard 2 |
| `strings nulByte` (quiet) | 1 | shard 2 |
| `strings tooManyRows` (quiet) | 1 | shard 2 |
| `strings unknownColumn` (quiet) | 1 | shard 2 |
| `strings wrongFile` (quiet) | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×8 · too many previews ×6 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1 · strings badHeader ×1 · strings emptyFile ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist:

### listing not found

- Count: 2 · Sources: shard 6

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
[e2e:teardown] deleted 4 user(s) owned by process 37395201304-email
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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   68 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (619ms)
  ✓   69 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.0s)
  ✓   70 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (17.6s)
  ✓   71 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (12.8s)
  ✓   72 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (17.5s)
  ✓   73 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (16.1s)
  ✓   74 [mobile-360] › e2e/shell.spec.ts:2089:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (25.0s)
  ✓   75 [mobile-360] › e2e/shell.spec.ts:2256:3 › L4b location picker › LS-12 a market whose every level has one option resolves to the deepest place (9.5s)
  ✓   76 [mobile-360] › e2e/shell.spec.ts:2293:3 › L4b location picker › LS-13 a second city stops the auto-select at the region (14.2s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37395201304-email

  1 passed (14.6s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-1-2863-3-zzupjk@ethio-e2e.invalid)
  ✓   47 [mobile-360] › e2e/admin-attributes-links.spec.ts:597:3 › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link (34.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395201304-1-2863-2-fswh8d@ethio-e2e.invalid)
  ✓   49 [mobile-360] › e2e/admin-attributes-library.spec.ts:283:3 › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear (19.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-1-2863-3-zzupjk@ethio-e2e.invalid)
  ✓   50 [mobile-360] › e2e/admin-attributes-links.spec.ts:677:3 › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error (25.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395201304-1-2863-2-fswh8d@ethio-e2e.invalid)
  ✓   51 [mobile-360] › e2e/admin-attributes-library.spec.ts:330:3 › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) (13.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-1-2863-3-zzupjk@ethio-e2e.invalid)
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
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-2-3142-3-tfvll7@ethio-e2e.invalid)
  ✓  101 [mobile-360] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason (3.7s)
  ✓   99 [mobile-360] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (9.9s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
  ✓  103 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (8.2s)
  ✓  104 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (5.0s)
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓  102 [mobile-360] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (14.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-2-3142-3-tfvll7@ethio-e2e.invalid)
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
✓   33 [mobile-360] › e2e/post-wizard-pricing.spec.ts:964:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (30.6s)
  ✓   35 [mobile-360] › e2e/post-wizard-specs.spec.ts:570:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (19.2s)
  ✓   36 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1029:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (19.7s)
  ✓   37 [mobile-360] › e2e/post-wizard-specs.spec.ts:595:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (16.7s)
  ✓   38 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1063:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (17.0s)
  ✓   39 [mobile-360] › e2e/post-wizard-specs.spec.ts:616:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (14.8s)
  ✓   41 [mobile-360] › e2e/post-wizard-specs.spec.ts:692:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (17.4s)
  ✓   40 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1081:3 › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) (24.9s)
  ✓   43 [mobile-360] › e2e/post-wizard-pricing.spec.ts:1148:3 › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control (8.3s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395201304-4-2847-2-xrogbh@ethio-e2e.invalid)
  ✓   56 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1044:3 › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file (13.3s)
  ✓   57 [desktop-1280] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (8.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-4-2847-3-vtudoo@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395201304-4-2847-2-xrogbh@ethio-e2e.invalid)
  ✓   59 [desktop-1280] › e2e/admin-attributes-library.spec.ts:471:3 › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) (12.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37395201304-4-2847-2-xrogbh@ethio-e2e.invalid)
  ✓   58 [desktop-1280] › e2e/admin-attributes-links.spec.ts:1138:3 › C3 attributes console › AT-40 the import dialog reaches Applied and undoes (16.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-4-2847-3-vtudoo@ethio-e2e.invalid)
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
✓   67 [desktop-1280] › e2e/import-security.spec.ts:339:5 › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole (2.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37395201304-5-2847-3-mvyqdb@ethio-e2e.invalid)
  ✓   66 [desktop-1280] › e2e/mfa-stepup.spec.ts:131:3 › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through @private-identity (11.4s)
  ✓   69 [desktop-1280] › e2e/mfa-stepup.spec.ts:167:3 › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called (4.2s)
  ✓   68 [desktop-1280] › e2e/import-security.spec.ts:414:5 › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason (10.0s)
  ✓   70 [desktop-1280] › e2e/mfa-stepup.spec.ts:182:3 › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI (6.4s)
  ✓   72 [desktop-1280] › e2e/mfa-stepup.spec.ts:210:3 › U1f step-up authentication › MF-5 unenroll requires a fresh verification @private-identity (5.9s)
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
  ✓   73 [desktop-1280] › e2e/mfa-stepup.spec.ts:247:3 › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state @private-identity (8.3s)
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   37 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1277:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (22.3s)
  ✓   38 [desktop-1280] › e2e/post-wizard-where.spec.ts:516:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-91 location details without a pin are stored in a category without map_pin (14.6s)
  ✓   40 [desktop-1280] › e2e/post-wizard-where.spec.ts:544:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen (12.5s)
  ✓   39 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1329:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (18.0s)
  ✓   41 [desktop-1280] › e2e/post-wizard-where.spec.ts:593:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-97 the map credit is visible and uncovered on both plans (15.0s)
  ✓   42 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1372:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (21.5s)
[PW-98 fresh] city={"x":430,"y":274,"width":316,"height":44} tick={"x":430,"y":422,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
  ✓   44 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1437:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (14.9s)
[PW-98 prefilled] city={"x":430,"y":274,"width":316,"height":44} tick={"x":430,"y":422,"width":20,"height":20} line=<div data-testid="post-where-row" data-key="primary" data-item="1" data-red="0" class="space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ms-1 md:ms-6 border-input"><div class="space-y-2"><div class="space-y-1"><label for="post-where-city" class="text-sm font-medium text-foreground">City</label><select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">Choose one</opti
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
