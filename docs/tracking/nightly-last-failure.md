# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37424519764
- Commit: `d74a1b7ab9daa35248e41c3e64e221cc500e2fa7`
- Attempt: 1
- Written (UTC): 2026-10-06T09:24:09.494Z
- Passed: 1110 · Skipped: 49 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

396 line(s), 36 message(s): 3 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 296 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `listing not found` | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `TypeError: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 296 · Sources: full

```text
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 4 · Sources: full

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### TypeError: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: full

```text
[WebServer] [ssr-error] /api/locations TypeError: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, non-gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-06T06:37:39.664Z | 3.5 min |
| full | 2026-10-06T06:41:13.269Z | 162.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 16.6 min | full |
| `post-wizard-bundle2.spec.ts` | 60 | 13.9 min | full |
| `post-wizard-pricing.spec.ts` | 46 | 7.9 min | full |
| `post-wizard-place.spec.ts` | 38 | 7.4 min | full |
| `post-wizard-category.spec.ts` | 42 | 7.4 min | full |
| `shell.spec.ts` | 126 | 7.0 min | full |
| `admin-attributes-library.spec.ts` | 40 | 6.7 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.9 min | full |
| `post-wizard-resets.spec.ts` | 22 | 5.7 min | full |
| `admin-categories-lifecycle.spec.ts` | 46 | 5.4 min | full |
| `admin-locations.spec.ts` | 36 | 5.2 min | full |
| `post-wizard-where.spec.ts` | 28 | 5.2 min | full |
| `admin-translations-console.spec.ts` | 40 | 5.2 min | full |
| `admin-categories-console.spec.ts` | 32 | 5.0 min | full |
| `photo-pipeline.spec.ts` | 20 | 4.9 min | full |
| `admin-attributes-links.spec.ts` | 30 | 4.7 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 4.7 min | full |
| `import-security.spec.ts` | 34 | 4.6 min | full |
| `admin-users.spec.ts` | 24 | 4.5 min | full |
| `posting-routes.spec.ts` | 50 | 4.4 min | full |
| `admin-roles.spec.ts` | 24 | 4.3 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `admin-attributes-import.spec.ts` | 40 | 3.2 min | full |
| `auth-signout.spec.ts` | 22 | 2.6 min | full |
| `admin-countries.spec.ts` | 16 | 2.2 min | full |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | full |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | full |
| `admin-audit.spec.ts` | 10 | 1.8 min | full |
| `posting-routes-dials.spec.ts` | 14 | 1.2 min | full |
| `admin-shell.spec.ts` | 10 | 1.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.1 min | full |
| `admin-coverage.spec.ts` | 14 | 1.0 min | full |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | full |
| `post-wizard-details.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | full |
| `posting-routes-identity.spec.ts` | 2 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `post-wizard-units.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.3 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 164.9 s |
| `post-wizard-specs.spec.ts` › PW-22 a link's allowed options narrow the picker and its default prefills | desktop-1280 | 38.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 36.2 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 35.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 34.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.0 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 32.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.8 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 31.2 s |
| `post-wizard-bundle2.spec.ts` › PW-143 'also my shop or office' saves the place, a new draft opens with it, and unticking clears it (bundle 4 step 18) | mobile-360 | 30.0 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | mobile-360 | 29.6 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 29.1 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37424519764-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 69 (pool 3, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 37424519764-nightly
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `full`
- Project: `mobile-360`

```text
Error: PW-22: the link's default did not return after a make reset

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_nightly_0_lcd7i1_unit"]')
Expected: "e2e_fold_nightly_0_lcd7i1_pc"
Received: "e2e_fold_nightly_0_lcd7i1_set"
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not return after a make reset with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_nightly_0_lcd7i1_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="ready" data-testid="post-attr-control" data-attr="e2e_fold_nightly_0_lcd7i1_unit" id="post-attr-e2e_fold_nightly_0_lcd7i1_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "e2e_fold_nightly_0_lcd7i1_set"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `full`
- Project: `desktop-1280`

```text
Error: PW-22: the link's default did not return after a make reset

expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_fold_nightly_3_pr6z88_unit"]')
Expected: "e2e_fold_nightly_3_pr6z88_pc"
Received: "e2e_fold_nightly_3_pr6z88_set"
Timeout:  20000ms

Call log:
  - PW-22: the link's default did not return after a make reset with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_fold_nightly_3_pr6z88_unit"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="ready" data-testid="post-attr-control" data-attr="e2e_fold_nightly_3_pr6z88_unit" id="post-attr-e2e_fold_nightly_3_pr6z88_unit" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "e2e_fold_nightly_3_pr6z88_set"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-desktop-1280`

## Server errors: full

```text
[WebServer] [ssr-error] /api/i18n/am HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×5
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×8
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×7
[WebServer] [ssr-error] /api/locations/ET HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×5
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```
