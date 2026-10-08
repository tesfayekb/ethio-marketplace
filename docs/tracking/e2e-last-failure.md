# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37744355270
- Commit: `2b6a06ed147e6ece337f3edb84b7fb52680c9987`
- Attempt: 1
- Written (UTC): 2026-10-08T07:44:10.735Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

84 line(s), 31 message(s): 0 off the allowlist, 31 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

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
[e2e:teardown] deleted 4 user(s) owned by process 37744355270-email
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
✓   78 [mobile-360] › e2e/shell.spec.ts:2059:3 › L4b location picker › LS-1 the cascade reaches a sub-city (8.4s)
  ✓   79 [mobile-360] › e2e/shell.spec.ts:2077:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.9s)
  ✓   80 [mobile-360] › e2e/shell.spec.ts:2110:3 › L4b location picker › long location names share one 32px line (12.8s)
  ✓   81 [mobile-360] › e2e/shell.spec.ts:2155:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (1.1s)
  ✓   82 [mobile-360] › e2e/shell.spec.ts:2172:3 › L4b location picker › LS-4 a closed market is not guessed (787ms)
  ✓   83 [mobile-360] › e2e/shell.spec.ts:2191:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (697ms)
  ✓   84 [mobile-360] › e2e/shell.spec.ts:2289:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.7s)
  ✓   85 [mobile-360] › e2e/shell.spec.ts:2318:3 › L4b location picker › LS-7 a region code alone selects the region (15.6s)
  ✓   86 [mobile-360] › e2e/shell.spec.ts:2346:3 › L4b location picker › LS-8 a city name alone selects that city (15.1s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
Running 1 test using 1 worker

  ✓  1 [email-serial] › e2e/auth-signup.spec.ts:121:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.3s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37744355270-email

  1 passed (9.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-1-3068-2-z4gnpu@ethio-e2e.invalid)
  ✓   42 [mobile-360] › e2e/admin-attributes-library.spec.ts:125:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (26.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37744355270-1-3068-3-5mab88@ethio-e2e.invalid)
  ✓   44 [mobile-360] › e2e/admin-attributes-links.spec.ts:444:3 › C3 attributes console › AT-38 an inherited echo does not collide with a direct row (15.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-1-3068-2-z4gnpu@ethio-e2e.invalid)
  ✓   46 [mobile-360] › e2e/admin-attributes-links.spec.ts:539:3 › C3 attributes console › AT-39 empty read-only cells are never reported as edits (9.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-1-3068-2-z4gnpu@ethio-e2e.invalid)
  ✓   45 [mobile-360] › e2e/admin-attributes-library.spec.ts:170:3 › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag (27.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37744355270-1-3068-3-5mab88@ethio-e2e.invalid)
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
✓   95 [mobile-360] › e2e/photo-pipeline.spec.ts:148:3 › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only (20.7s)
  ✓   98 [mobile-360] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (13.5s)
  ✓   97 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:201:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (16.1s)
  ✓   99 [mobile-360] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (12.9s)
  ✓  100 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:242:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (14.8s)
  ✓  101 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (11.9s)
  ✓  102 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:281:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (17.3s)
  ✓  103 [mobile-360] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (21.9s)
  ✓  104 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:350:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (19.7s)
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

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   42 [mobile-360] › e2e/post-wizard-specs.spec.ts:1232:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (12.1s)
  ✓   44 [mobile-360] › e2e/post-wizard-specs.spec.ts:1282:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (15.1s)
  ✓   43 [mobile-360] › e2e/post-wizard-where.spec.ts:208:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (32.0s)
  ✓   45 [mobile-360] › e2e/post-wizard-specs.spec.ts:1350:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (12.8s)
  ✓   46 [mobile-360] › e2e/post-wizard-where.spec.ts:319:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (15.3s)
  ✓   47 [mobile-360] › e2e/post-wizard-specs.spec.ts:1393:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (14.4s)
  ✓   48 [mobile-360] › e2e/post-wizard-where.spec.ts:372:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (13.5s)
  ✓   49 [mobile-360] › e2e/post-wizard-specs.spec.ts:1458:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (15.4s)
  ✓   50 [mobile-360] › e2e/post-wizard-where.spec.ts:406:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (14.9s)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-4-2946-2-5nxgpc@ethio-e2e.invalid)
  ✓   53 [desktop-1280] › e2e/admin-attributes-links.spec.ts:782:3 › C3 attributes console › AT-60 a links file reorders three links and the posting read follows (17.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37744355270-4-2946-3-0uzgho@ethio-e2e.invalid)
  ✓   54 [desktop-1280] › e2e/admin-attributes-library.spec.ts:372:3 › C3 attributes console › AT-8 assign from the library: the link lands and Used by updates (18.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-4-2946-2-5nxgpc@ethio-e2e.invalid)
  ✓   56 [desktop-1280] › e2e/admin-attributes-library.spec.ts:409:3 › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll (6.5s)
  ✓   55 [desktop-1280] › e2e/admin-attributes-links.spec.ts:920:3 › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged (9.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37744355270-4-2946-3-0uzgho@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-4-2946-2-5nxgpc@ethio-e2e.invalid)
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
  ✓   95 [desktop-1280] › e2e/photo-pipeline.spec.ts:174:3 › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat (10.5s)
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓   94 [desktop-1280] › e2e/import-security.spec.ts:792:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (16.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37744355270-5-3081-2-1f5sgl@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
  ✓   97 [desktop-1280] › e2e/import-security.spec.ts:908:3 › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not (2.8s)
  ✓   96 [desktop-1280] › e2e/photo-pipeline.spec.ts:188:3 › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name (11.9s)
  ✓   98 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:201:3 › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number (14.3s)
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

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   35 [desktop-1280] › e2e/post-wizard-where.spec.ts:921:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back (31.4s)
  ✓   38 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:114:3 › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save (14.1s)
  ✓   37 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1282:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (18.2s)
  ✓   39 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:143:3 › POSTING ROUTES — catalogue changes › PR-35 removed held option is released; a required strict question asks again (13.7s)
  ✓   40 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1350:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (14.1s)
  ✓   41 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:184:3 › POSTING ROUTES — catalogue changes › PR-36 new unknown key and new unknown option remain refused (12.2s)
  ✓   42 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1393:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (18.1s)
  ✓   43 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:209:3 › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused (18.2s)
  ✓   44 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1458:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (15.5s)
```
