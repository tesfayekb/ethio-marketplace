# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37597701231
- Commit: `518da704ed5854a76ccb682a5a4d2427dc4497e0`
- Attempt: 1
- Written (UTC): 2026-10-07T09:26:24.698Z
- Passed: 370 · Skipped: 33 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 2, changed
- Sources without results: shard 1, shard 3, shard 4, shard 5, shard 6

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2) — Error: the ET tree never carried e2e-loc-2-1-ls-city-gzgn34 within 20 s
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: the ET tree never carried e2e-loc-2-1-ls-city-gzgn34 within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-2-1-ls-city-gzgn34"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "oromia", "sidama", "tigray", "adama", "addis-ababa", "bahir-dar", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-2-1-ls-city-gzgn34 within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-2-1-ls-city-gzgn34"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "oromia", "sidama", "tigray", "adama", "addis-ababa", "bahir-dar", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:452

  450 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  451 |   let seen: string[] = [];
> 452 |   await expect
      |   ^
  453 |     .poll(
  454 |       async () => {
  455 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:452:3)
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-mobile-360`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-6')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-6')


  514 |     await page.getByTestId("post-description").fill("e2e listing description");
  515 |     await page.getByTestId("post-next").click();
> 516 |     await expect(page.getByTestId("post-step-6")).toBeVisible();
      |                                                   ^
  517 |   });
  518 |
  519 |   /** DEC-081 — the stored flag, DB truth (J4). */
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:516:51
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 2, shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
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
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ld<n>n<n>i: e<n>e_par_vt<n>xjg → e<n>e_chi_nwma<n>v` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>evc: e<n>e_par_<n>s<n>x → e<n>e_chi_<n>ioc<n>m` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ld<n>n<n>i: e<n>e_par_vt<n>xjg → e<n>e_chi_nwma<n>v ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>evc: e<n>e_par_<n>s<n>x → e<n>e_chi_<n>ioc<n>m ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 2, changed · unavailable: shard 1, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-07T09:02:29.401Z | 13.3 min |
| email | 2026-10-07T09:02:26.039Z | 0.2 min |
| shard 2 | 2026-10-07T09:02:41.462Z | 23.4 min |
| changed | 2026-10-07T09:02:23.351Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-where.spec.ts` | 30 | 11.1 min | changed |
| `shell.spec.ts` | 126 | 8.5 min | smoke |
| `post-wizard-place.spec.ts` | 19 | 7.8 min | shard 2 |
| `post-wizard-pricing.spec.ts` | 25 | 7.6 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 30 | 7.2 min | shard 2 |
| `auth-signout.spec.ts` | 33 | 6.4 min | smoke, shard 2 |
| `post-wizard-category.spec.ts` | 21 | 4.5 min | shard 2 |
| `admin-users.spec.ts` | 12 | 3.7 min | shard 2 |
| `import-security.spec.ts` | 17 | 2.5 min | shard 2 |
| `photo-pipeline.spec.ts` | 10 | 2.5 min | shard 2 |
| `admin-translations-governance.spec.ts` | 4 | 1.5 min | shard 2 |
| `post-wizard-finder.spec.ts` | 4 | 1.1 min | shard 2 |
| `post-wizard-details.spec.ts` | 4 | 1.1 min | shard 2 |
| `mfa-stepup.spec.ts` | 9 | 1.0 min | shard 2 |
| `i18n-bundle.spec.ts` | 9 | 1.0 min | shard 2, changed |
| `category-image-routes.spec.ts` | 5 | 0.6 min | shard 2 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 2 |
| `i18n-coverage.spec.ts` | 4 | 0.4 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-nav.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | smoke |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `layout.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 5 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-place.spec.ts` › PW-33 a region alone never lists itself; its city does (W6 R2) | mobile-360 | 93.0 s |
| `post-wizard-pricing.spec.ts` › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) | mobile-360 | 84.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 54.3 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 42.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 40.8 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 39.2 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 38.6 s |
| `post-wizard-where.spec.ts` › PW-90 two boxes, a red border per unfilled level, the plan in one line | mobile-360 | 36.4 s |
| `post-wizard-where.spec.ts` › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place | desktop-1280 | 35.2 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 33.5 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 33.3 s |
| `admin-users.spec.ts` › AU-1 permission: moderator is refused, admin sees the list | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 32.0 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | mobile-360 | 31.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37597701231-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37597701231-email
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37597701231-2
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37597701231-changed
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-ld2n2i: e2e_par_vt6xjg → e2e_chi_nwma5v
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-u18evc: e2e_par_67s67x → e2e_chi_5ioc6m
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘  138 [mobile-360] › e2e/admin-locations.spec.ts:103:3 › L2a locations console › LT-1 gating: a plain user is refused; the roster and transfer toolbar render for an admin (1.0m)
--- final 10 lines ---
✓  172 [mobile-360] › e2e/admin-locations.spec.ts:1122:3 › L2a locations console › LT-14 market state and whole-country parent follow the selected market (2.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37597701231-1-2993-3-9bydos@ethio-e2e.invalid)
  ✓  173 [mobile-360] › e2e/admin-locations.spec.ts:1153:3 › L2a locations console › OV-1 overview totals, links and group breadcrumbs (2.3s)
  ✓  171 [mobile-360] › e2e/admin-roles.spec.ts:396:3 › U2 roles console › RP-10 members link preselects the role filter via the URL (14.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37597701231-1-2993-2-msxsj7@ethio-e2e.invalid)
  ✓  174 [mobile-360] › e2e/admin-shell.spec.ts:84:3 › Admin shell (U0) › A-1 admin fixture: gated section nav, section page + breadcrumb, deep link (10.4s)
  ✓  175 [mobile-360] › e2e/admin-roles.spec.ts:418:3 › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC (9.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37597701231-1-2993-2-msxsj7@ethio-e2e.invalid)
  ✓  176 [mobile-360] › e2e/admin-shell.spec.ts:181:3 › Admin shell (U0) › A-2 moderator fixture: exactly one section (audit), other deep links refused, admin tab still visible (8.3s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-ld2n2i: e2e_par_vt6xjg → e2e_chi_nwma5v
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  186 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (15.1s)
  ✓  187 [mobile-360] › e2e/posting-routes.spec.ts:785:3 › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086) (14.0s)
  ✓  188 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.8s)
  ✓  189 [mobile-360] › e2e/posting-routes.spec.ts:881:3 › POSTING ROUTES › PR-20 step 5: the counters are server-only; the server path still counts (10.6s)
  ✓  190 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (16.7s)
  ✓  191 [mobile-360] › e2e/posting-routes.spec.ts:913:3 › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private (20.2s)
  ✓  193 [mobile-360] › e2e/posting-routes.spec.ts:958:3 › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read (6.6s)
  ✓  192 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (16.9s)
  ✓  194 [mobile-360] › e2e/posting-routes.spec.ts:1023:3 › POSTING ROUTES › PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117) (12.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘  120 [desktop-1280] › e2e/admin-countries.spec.ts:140:3 › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away (57.0s)
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37597701231-4-3147-3-xfo5mw@ethio-e2e.invalid)
  ✓  149 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:2181:3 › CAT-IE categories import/export › CT-28 the import dialog reaches Applied and undoes (18.6s)
  ✓  150 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:2264:3 › C2-HOME categories home flag › CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other (5.6s)
[e2e:u2] RP-1 baseline intact: moderator holds no roles:* grant
  ✓  148 [desktop-1280] › e2e/admin-locations.spec.ts:328:3 › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree (38.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37597701231-4-3147-2-zn9acp@ethio-e2e.invalid)
  ✓  151 [desktop-1280] › e2e/admin-roles.spec.ts:145:3 › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects (18.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37597701231-4-3147-3-xfo5mw@ethio-e2e.invalid)
  ✓  152 [desktop-1280] › e2e/admin-locations.spec.ts:402:3 › L2a locations console › LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address (16.5s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-u18evc: e2e_par_67s67x → e2e_chi_5ioc6m
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (3) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  171 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:464:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (1.2m)
  ✘  172 [desktop-1280] › e2e/post-wizard-place.spec.ts:1010:3 › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2) (1.1m)
--- final 10 lines ---
✓  192 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:850:3 › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5) (20.9s)
  -  194 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:876:3 › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar
  ✓  195 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1077:3 › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9) (13.8s)
  ✓  193 [desktop-1280] › e2e/post-wizard-place.spec.ts:1435:3 › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling (23.8s)
  ✓  196 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1098:3 › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) (17.0s)
  ✓  197 [desktop-1280] › e2e/post-wizard-place.spec.ts:1473:3 › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) (17.7s)
  ✓  199 [desktop-1280] › e2e/post-wizard-place.spec.ts:1657:3 › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336) (9.8s)
  ✓  198 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1163:3 › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9) (12.7s)
  ✓  200 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:1197:3 › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9) (7.2s)
```

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   90 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:374:3 › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order (1.0m)
--- final 10 lines ---
✓  175 [desktop-1280] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.2s)
  ✓  174 [desktop-1280] › e2e/posting-routes.spec.ts:706:3 › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city (15.6s)
  ✓  176 [desktop-1280] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (7.3s)
  ✓  177 [desktop-1280] › e2e/posting-routes.spec.ts:743:3 › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001 (9.8s)
  ✓  178 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (14.4s)
  ✓  180 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (1.0s)
  ✓  181 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (806ms)
  ✓  182 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (801ms)
  ✓  179 [desktop-1280] › e2e/posting-routes.spec.ts:785:3 › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086) (10.5s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
