# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39013622206
- Commit: `db18015052357cc00b3f189d6721753d512e411d`
- Attempt: 1
- Written (UTC): 2026-10-17T08:11:34.811Z
- Passed: 1960 · Skipped: 128 · Failed: 15
- Gating failures: 15 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  188 |   async function nextThroughPhotos(page: import("@playwright/test").Page) {
  189 |     await page.getByTestId("post-next").click();
> 190 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  191 |     await page.getByTestId("post-next").click();
  192 |   }
  193 |
    at nextThroughPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:190:51)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1451:5
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-mobile-360` — Playwright's name `post-wizard-specs-POSTING--b6583-er-and-its-default-prefills-mobile-360`; this run carried 10 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

122 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 21 | shard 3, shard 6, changed |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `catalog_find_refresh: canceling statement due to statement timeout` | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>: e<n>e_par_<n>ugl → e<n>e_chi_w<n>dga<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-omnynm: e<n>e_par_<n>zjq<n> → e<n>e_chi_mrx<n>z` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>: e<n>e_par_<n>ugl → e<n>e_chi_w<n>dga<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-omnynm: e<n>e_par_<n>zjq<n> → e<n>e_chi_mrx<n>z ×1

Off the allowlist:

### listing not found

- Count: 21 · Sources: shard 3, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×3 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×3 · LY-6 at 360 the open currency list is above the sticky action bar ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-78 a big model list shows its required mark once the brand is chosen (INC-336 ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### catalog_find_refresh: canceling statement due to statement timeout

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-1 gating: a plain user is refused; the roster, its toolbar and the header's t ×1 · CT-19 a create and a rename commit through the doors and undo ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T07:27:43.451Z | 18.1 min |
| email | 2026-10-17T07:27:32.818Z | 0.2 min |
| shard 1 | 2026-10-17T07:27:29.187Z | 39.7 min |
| shard 2 | 2026-10-17T07:27:30.951Z | 37.1 min |
| shard 3 | 2026-10-17T07:27:36.778Z | 40.3 min |
| shard 4 | 2026-10-17T07:27:33.926Z | 38.5 min |
| shard 5 | 2026-10-17T07:27:36.980Z | 43.7 min |
| shard 6 | 2026-10-17T07:27:34.582Z | 39.3 min |
| changed | 2026-10-17T07:27:37.345Z | 32.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-pricing.spec.ts` | 104 | 42.7 min | shard 3, shard 6, changed |
| `admin-screening.spec.ts` | 104 | 37.7 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 82 | 31.1 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 25.7 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 20.7 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 32 | 20.7 min | shard 1, shard 4, changed |
| `shell.spec.ts` | 336 | 20.3 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 16.8 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 16.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 15.7 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 14.7 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 13.8 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 28 | 8.6 min | shard 1, shard 4, changed |
| `post-wizard-category.spec.ts` | 48 | 8.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.6 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.3 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.7 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.9 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | desktop-1280 | 137.1 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | mobile-360 | 135.9 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | mobile-360 | 132.1 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | desktop-1280 | 128.0 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 110.1 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 97.1 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 97.1 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 94.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 93.2 s |
| `post-wizard-specs.spec.ts` › PW-22 a link's allowed options narrow the picker and its default prefills | mobile-360 | 88.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 88.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 86.0 s |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | desktop-1280 | 72.1 s |
| `my-listings-ad.spec.ts` › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F) | desktop-1280 | 71.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 70.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39013622206-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39013622206-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39013622206-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39013622206-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39013622206-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39013622206-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39013622206-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39013622206-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39013622206-changed
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  35 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  36 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 37 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  38 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  39 |     await expect
```

Context:

```text
          - listitem [ref=e272]:
            - generic [ref=e273]: About
          - listitem [ref=e274]:
            - generic [ref=e275]: How it works
      - navigation "Help" [ref=e276]:
        - heading "Help" [level=2] [ref=e277]
        - list [ref=e278]:
          - listitem [ref=e279]:
            - generic [ref=e280]: Safety
          - listitem [ref=e281]:
            - generic [ref=e282]: Contact
      - navigation "Legal" [ref=e283]:
        - heading "Legal" [level=2] [ref=e284]
        - list [ref=e285]:
          - listitem [ref=e286]:
            - generic [ref=e287]: Terms
          - listitem [ref=e288]:
            - generic [ref=e289]: Privacy
    - paragraph [ref=e291]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  184 |       const counted = await response;
  185 |       expect(counted.status()).toBe(200);
> 186 |       return counted.json();
      |                      ^
  187 |     }
  188 |     async function views() {
  189 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:186:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:196:12
```

Context:

```text
          - listitem [ref=e275]:
            - generic [ref=e276]: About
          - listitem [ref=e277]:
            - generic [ref=e278]: How it works
      - navigation "Help" [ref=e279]:
        - heading "Help" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Safety
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Terms
          - listitem [ref=e291]:
            - generic [ref=e292]: Privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",

  241 |     ].sort();
  242 |     expect(r.body.cards.length).toBeGreaterThan(0);
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-mobile-360` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 10 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  35 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  36 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 37 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  38 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  39 |     await expect
```

Context:

```text
          - listitem [ref=e294]:
            - generic [ref=e295]: About
          - listitem [ref=e296]:
            - generic [ref=e297]: How it works
      - navigation "Help" [ref=e298]:
        - heading "Help" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Safety
          - listitem [ref=e303]:
            - generic [ref=e304]: Contact
      - navigation "Legal" [ref=e305]:
        - heading "Legal" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Terms
          - listitem [ref=e310]:
            - generic [ref=e311]: Privacy
    - paragraph [ref=e313]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  184 |       const counted = await response;
  185 |       expect(counted.status()).toBe(200);
> 186 |       return counted.json();
      |                      ^
  187 |     }
  188 |     async function views() {
  189 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:186:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:196:12
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-5-lt7r-99llbi')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-5-lt7r-99llbi')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-5-lt7r-99llbi')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-4-5-lt7r-99llbi')


  731 |       // A second undo of the same batch is refused by name.
  732 |       await page.getByTestId("location-import-close").click();
> 733 |       await expect(locationRow(page, `${ANCHOR}/${regionSlug}`)).toBeVisible();
      |                                                                  ^
  734 |     } finally {
  735 |       await destroyLocation(regionSlug);
  736 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:733:66
```

Context:

```text
          - listitem [ref=e1001]:
            - generic [ref=e1002]: About
          - listitem [ref=e1003]:
            - generic [ref=e1004]: How it works
      - navigation "Help" [ref=e1005]:
        - heading "Help" [level=2] [ref=e1006]
        - list [ref=e1007]:
          - listitem [ref=e1008]:
            - generic [ref=e1009]: Safety
          - listitem [ref=e1010]:
            - generic [ref=e1011]: Contact
      - navigation "Legal" [ref=e1012]:
        - heading "Legal" [level=2] [ref=e1013]
        - list [ref=e1014]:
          - listitem [ref=e1015]:
            - generic [ref=e1016]: Terms
          - listitem [ref=e1017]:
            - generic [ref=e1018]: Privacy
    - paragraph [ref=e1020]: © 2026 ethio.com — All rights reserved.
```
```

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -13,10 +13,11 @@
    "priceNegotiable",
    "pricePeriod",
    "priceUnit",
    "priceUnitText",
    "priceWas",
+   "publicId",
    "publishedAt",
    "reserved",
    "soldWord",
    "step",
    "tier",

  241 |     ].sort();
  242 |     expect(r.body.cards.length).toBeGreaterThan(0);
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-desktop-1280` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 10 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  35 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  36 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 37 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  38 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  39 |     await expect
```

Context:

```text
          - listitem [ref=e272]:
            - generic [ref=e273]: About
          - listitem [ref=e274]:
            - generic [ref=e275]: How it works
      - navigation "Help" [ref=e276]:
        - heading "Help" [level=2] [ref=e277]
        - list [ref=e278]:
          - listitem [ref=e279]:
            - generic [ref=e280]: Safety
          - listitem [ref=e281]:
            - generic [ref=e282]: Contact
      - navigation "Legal" [ref=e283]:
        - heading "Legal" [level=2] [ref=e284]
        - list [ref=e285]:
          - listitem [ref=e286]:
            - generic [ref=e287]: Terms
          - listitem [ref=e288]:
            - generic [ref=e289]: Privacy
    - paragraph [ref=e291]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  184 |       const counted = await response;
  185 |       expect(counted.status()).toBe(200);
> 186 |       return counted.json();
      |                      ^
  187 |     }
  188 |     async function views() {
  189 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:186:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:196:12
```

Context:

```text
          - listitem [ref=e275]:
            - generic [ref=e276]: About
          - listitem [ref=e277]:
            - generic [ref=e278]: How it works
      - navigation "Help" [ref=e279]:
        - heading "Help" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Safety
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Terms
          - listitem [ref=e291]:
            - generic [ref=e292]: Privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('gallery-thumb')
Expected: 2
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('gallery-thumb')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  35 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  36 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
> 37 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
     |                                                     ^
  38 |     await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
  39 |     await expect
```

Context:

```text
          - listitem [ref=e294]:
            - generic [ref=e295]: About
          - listitem [ref=e296]:
            - generic [ref=e297]: How it works
      - navigation "Help" [ref=e298]:
        - heading "Help" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Safety
          - listitem [ref=e303]:
            - generic [ref=e304]: Contact
      - navigation "Legal" [ref=e305]:
        - heading "Legal" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Terms
          - listitem [ref=e310]:
            - generic [ref=e311]: Privacy
    - paragraph [ref=e313]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  184 |       const counted = await response;
  185 |       expect(counted.status()).toBe(200);
> 186 |       return counted.json();
      |                      ^
  187 |     }
  188 |     async function views() {
  189 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:186:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:196:12
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 10 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-omnynm: e2e_par_5zjq95 → e2e_chi_mrx37z
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×11
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-m49731: e2e_par_665ugl → e2e_chi_w9dga0
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
```
