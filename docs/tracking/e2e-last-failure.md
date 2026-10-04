# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37180571170
- Commit: `5f5fd6b7f249b165ed2cbbbb503f02659caa20e3`
- Attempt: 1
- Written (UTC): 2026-10-04T05:51:36.913Z
- Passed: 38 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal — Error: PW-132: a free Latin name was not confirmed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-132: a free Latin name was not confirmed

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-132: a free Latin name was not confirmed with timeout 10000ms
  - waiting for getByTestId('post-who-alias-ok')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-132-a-non-Latin-seller-name-shows-the-Latin-line-as-the-refusal-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

96 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-04T05:41:51.723Z | 0.2 min |
| changed | 2026-10-04T05:41:38.271Z | 6.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 38 | 11.4 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-132 a non-Latin seller name shows the Latin line as the refusal | mobile-360 | 59.0 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 30.3 s |
| `post-wizard-bundle2.spec.ts` › PW-132 a non-Latin seller name shows the Latin line as the refusal | desktop-1280 | 29.2 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 27.0 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | mobile-360 | 25.5 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | desktop-1280 | 23.0 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | mobile-360 | 20.6 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 19.4 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 19.1 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | desktop-1280 | 18.6 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | desktop-1280 | 17.6 s |
| `post-wizard-bundle2.spec.ts` › PW-122 an empty phone box opens on the country of the item's place | desktop-1280 | 17.6 s |
| `post-wizard-bundle2.spec.ts` › PW-130 a refused seller name offers three free names, claimed on save | desktop-1280 | 17.4 s |
| `post-wizard-bundle2.spec.ts` › PW-128 a number typed before the phone library arrives is saved only once read | desktop-1280 | 17.2 s |
| `post-wizard-bundle2.spec.ts` › PW-121 a phone number in the title or description is flagged at its field | desktop-1280 | 17.0 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37180571170-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37180571170-changed
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
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
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

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
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
  ✓   79 [desktop-1280] › e2e/a11y.spec.ts:65:3 › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y (20.2s)
  ✓   80 [desktop-1280] › e2e/auth-signout.spec.ts:58:3 › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace (12.8s)
  ✓   81 [desktop-1280] › e2e/auth-signout.spec.ts:78:3 › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface (9.6s)
  ✓   82 [desktop-1280] › e2e/auth-signout.spec.ts:90:3 › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin (10.6s)
  ✓   83 [desktop-1280] › e2e/auth-signout.spec.ts:112:3 › U0j sign-out hard reset › SO-3b reload path: a cleared token means /admin never renders on mount (9.5s)
  ✓   84 [desktop-1280] › e2e/auth-signout.spec.ts:137:3 › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI (9.7s)
  ✓   85 [desktop-1280] › e2e/auth-signout.spec.ts:260:3 › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset (12.0s)
  ✓   86 [desktop-1280] › e2e/auth-signout.spec.ts:273:3 › U0k session policy › SP-2 stay signed in extends past the original deadline (16.2s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37180571170-1-2852-2-ln56ne@ethio-e2e.invalid)
  ✓   74 [mobile-360] › e2e/admin-categories-console.spec.ts:282:3 › C2 categories console › CT-4 visibility window: a future window is stored as DB truth (15.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37180571170-1-2852-3-69rxif@ethio-e2e.invalid)
  ✓   75 [mobile-360] › e2e/admin-categories-images.spec.ts:42:3 › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them (19.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37180571170-1-2852-2-ln56ne@ethio-e2e.invalid)
  ✓   76 [mobile-360] › e2e/admin-categories-console.spec.ts:313:3 › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows (14.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37180571170-1-2852-3-69rxif@ethio-e2e.invalid)
  ✓   77 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:44:3 › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up (15.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37180571170-1-2852-2-ln56ne@ethio-e2e.invalid)
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

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  110 [mobile-360] › e2e/photo-pipeline.spec.ts:207:3 › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing (10.5s)
  ✓  111 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:228:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (15.8s)
  ✓  112 [mobile-360] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (19.4s)
  ✓  113 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:265:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (15.2s)
  ✓  115 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:301:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (13.8s)
  ✓  114 [mobile-360] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (25.0s)
  ✓  116 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:325:3 › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal (16.4s)
  ✓  117 [mobile-360] › e2e/photo-pipeline.spec.ts:267:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (18.9s)
  ✓  118 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:365:3 › POSTING WIZARD — bundle 2 place and contact › PW-114 a second phone appears on request and is stored as phone2 (8.7s)
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
✓   39 [mobile-360] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (19.2s)
  ✓   40 [mobile-360] › e2e/post-wizard-where.spec.ts:365:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (21.3s)
  ✓   41 [mobile-360] › e2e/post-wizard-specs.spec.ts:723:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (31.7s)
  ✓   42 [mobile-360] › e2e/post-wizard-where.spec.ts:396:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (20.6s)
  ✓   44 [mobile-360] › e2e/post-wizard-where.spec.ts:431:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (20.7s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓   43 [mobile-360] › e2e/post-wizard-specs.spec.ts:723:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (32.6s)
  ✓   45 [mobile-360] › e2e/post-wizard-where.spec.ts:504:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-91 location details without a pin are stored in a category without map_pin (10.9s)
  ✓   46 [mobile-360] › e2e/post-wizard-specs.spec.ts:972:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (15.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   70 [desktop-1280] › e2e/admin-categories-console.spec.ts:83:3 › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin (16.3s)
  ✓   72 [desktop-1280] › e2e/admin-categories-console.spec.ts:101:3 › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows (9.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37180571170-4-2852-2-apjtj2@ethio-e2e.invalid)
  ✓   71 [desktop-1280] › e2e/admin-audit.spec.ts:191:3 › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller @private-identity (32.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37180571170-4-2852-3-oujbim@ethio-e2e.invalid)
  ✓   73 [desktop-1280] › e2e/admin-categories-console.spec.ts:130:3 › C2 categories console › CT-31 the roster filter groups children under their parent, marks retired rows, and scopes the roster to a subtree (11.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37180571170-4-2852-2-apjtj2@ethio-e2e.invalid)
  ✓   75 [desktop-1280] › e2e/admin-categories-console.spec.ts:250:3 › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up (11.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37180571170-4-2852-2-apjtj2@ethio-e2e.invalid)
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
--- final 10 lines ---
✓  104 [desktop-1280] › e2e/photo-pipeline.spec.ts:329:3 › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over (14.5s)
  ✓  105 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (14.3s)
  ✓  106 [desktop-1280] › e2e/post-wizard-category.spec.ts:168:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (5.6s)
  ✓  107 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:447:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (10.5s)
  ✓  108 [desktop-1280] › e2e/post-wizard-category.spec.ts:193:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (9.4s)
  ✓  109 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:471:3 › POSTING WIZARD — bundle 2 place and contact › PW-125 the phone box keeps digits only and saves the number as read (7.6s)
  ✓  110 [desktop-1280] › e2e/post-wizard-category.spec.ts:217:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (5.4s)
  ✓  112 [desktop-1280] › e2e/post-wizard-category.spec.ts:254:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (6.6s)
  ✓  111 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:497:3 › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed (8.3s)
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
✓   78 [desktop-1280] › e2e/posting-routes.spec.ts:412:3 › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it (13.6s)
  ✓   79 [desktop-1280] › e2e/rbac.spec.ts:61:3 › RBAC client seam › R-3 staff user: Admin tab appears and /admin renders (7.3s)
  ✓   81 [desktop-1280] › e2e/shell-table-law.spec.ts:34:3 › shell table law › admin tables never overflow horizontally (4.3s)
  ✓   82 [desktop-1280] › e2e/shell.spec.ts:142:3 › app shell › mounts with header, rail slot and footer, logged out (977ms)
  ✓   83 [desktop-1280] › e2e/shell.spec.ts:168:3 › app shell › feed renders its empty state (2.2s)
  ✓   80 [desktop-1280] › e2e/posting-routes.spec.ts:439:3 › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps (9.0s)
  ✓   84 [desktop-1280] › e2e/shell.spec.ts:197:3 › app shell › language toggle renders Amharic (Ge'ez path) (1.3s)
  ✓   86 [desktop-1280] › e2e/shell.spec.ts:225:3 › app shell › the vertical stack is ordered: top bar, location row, breadcrumbs, body (618ms)
INC-283: picks resolved region=addis-ababa city=addis-ababa
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
