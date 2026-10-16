# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38840310039
- Commit: `e34c88ac2542baeb0b4ecd10a4296ae18a4fea60`
- Attempt: 1
- Written (UTC): 2026-10-16T03:06:45.467Z
- Passed: 1779 · Skipped: 126 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-route.spec.ts › FEED ROUTE › FR-1 a page lists premium, then featured, then regular, newest first in each — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) — Error: expect(locator).toHaveCount(expected) failed

## Flaky bodies (DEC-078)

### feed-route.spec.ts › FEED ROUTE › FR-1 a page lists premium, then featured, then regular, newest first in each

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  46 |   const branches: string[][] = [];
  47 |
> 48 |   test.afterEach(async () => {
     |        ^
  49 |     for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
  50 |     for (const slug of regions.splice(0)) await destroyLocation(slug);
  51 |     for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-route.spec.ts:48:8
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-1-a-page-lists-premium-then-featured-then-regular-newest-first-in-each-mobile-360` — Playwright's name `feed-route-FEED-ROUTE-FR-1-dfb9a-egular-newest-first-in-each-mobile-360`; this run carried 1 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-photo-editor')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('post-photo-editor')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-photo-editor')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('post-photo-editor')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1569 |     await expect(box).toHaveAttribute("data-box", "0.0000,0.0000,0.8000,1.0000");
  1570 |     await editor.getByTestId("post-photo-editor-save").click();
> 1571 |     await expect(editor).toHaveCount(0);
       |                          ^
  1572 |     await expect
  1573 |       .poll(async () => (await photoRowsOf(listingId))[0]?.width, {
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-27-Edit-turns-a-photo-and-crops-the-cover-each-saved-in-its-place-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-24fb0-saved-in-its-place-D154-B2--mobile-360`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fv<n>tu<n>: e<n>e_par_g<n>wxc<n> → e<n>e_chi_<n>l<n>k<n>n` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-giu<n>om: e<n>e_par_<n>kga<n>k → e<n>e_chi_e<n>fab<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fv<n>tu<n>: e<n>e_par_g<n>wxc<n> → e<n>e_chi_<n>l<n>k<n>n ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-giu<n>om: e<n>e_par_<n>kga<n>k → e<n>e_chi_e<n>fab<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · /settings shows the Account context, and returning shows categories ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-137 Pieces per Pack shows with per pack and goes, with its value, on another  ×1 · PW-175 the price page asks the unit of sale above the quantity ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T02:26:23.155Z | 14.2 min |
| email | 2026-10-16T02:26:17.770Z | 0.4 min |
| shard 1 | 2026-10-16T02:26:17.600Z | 40.1 min |
| shard 2 | 2026-10-16T02:26:17.915Z | 34.6 min |
| shard 3 | 2026-10-16T02:26:21.802Z | 29.9 min |
| shard 4 | 2026-10-16T02:26:28.795Z | 31.4 min |
| shard 5 | 2026-10-16T02:26:20.542Z | 35.1 min |
| shard 6 | 2026-10-16T02:26:22.171Z | 27.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.4 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 22.8 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 18.3 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 18.0 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 50 | 16.5 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 14.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 12.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 62 | 11.1 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 30 | 10.9 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 10.6 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.0 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 48 | 9.0 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.1 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 6.9 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 5.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 5.8 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 30 | 5.5 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 3.3 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 2.0 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-callback.spec.ts` | 4 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2) | mobile-360 | 138.4 s |
| `feed-route.spec.ts` › FR-1 a page lists premium, then featured, then regular, newest first in each | mobile-360 | 130.1 s |
| `admin-attributes-editor.spec.ts` › AT-56 the constraint pickers offer only co-linked targets | mobile-360 | 127.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 116.5 s |
| `admin-screening.spec.ts` › SC-13 Preview as buyer shows the public name, then the methods shown one per row; Show number puts the number in its row with no second factor and logs it | mobile-360 | 86.9 s |
| `admin-screening.spec.ts` › SC-16 a reviewer without a fresh second factor cannot decide | mobile-360 | 65.9 s |
| `admin-screening.spec.ts` › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 64.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 57.0 s |
| `admin-screening.spec.ts` › SC-7 a reviewer reads the preview's facts: the ad's country, the methods shown and the public name, never a value | mobile-360 | 56.7 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 56.5 s |
| `admin-translations-data.spec.ts` › TR-34 the Data roster names each row's identity and changes nothing else | mobile-360 | 55.2 s |
| `admin-screening.spec.ts` › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158) | mobile-360 | 55.0 s |
| `admin-attributes-import.spec.ts` › AT-78 a links file sets the allowed options and the default, and the export echoes both | mobile-360 | 54.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 53.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38840310039-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38840310039-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 38840310039-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38840310039-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38840310039-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38840310039-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 38840310039-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38840310039-6
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-13 Preview as buyer shows the public name, then the methods shown one per row; Show number puts the number in its row with no second factor and logs it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('admin-screening-row-922844b4-1557-4dd7-8979-aa0342411131-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('admin-screening-row-922844b4-1557-4dd7-8979-aa0342411131-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('admin-screening-row-922844b4-1557-4dd7-8979-aa0342411131-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('admin-screening-row-922844b4-1557-4dd7-8979-aa0342411131-card')


  251 |     await page.getByTestId("admin-screening-search").fill(title);
  252 |     const row = rowOf(page, id);
> 253 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  254 |     return row;
  255 |   }
  256 |
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:253:23)
```

Context:

```text
          - listitem [ref=e273]:
            - generic [ref=e274]: About
          - listitem [ref=e275]:
            - generic [ref=e276]: How it works
      - navigation "Help" [ref=e277]:
        - heading "Help" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Safety
          - listitem [ref=e282]:
            - generic [ref=e283]: Contact
      - navigation "Legal" [ref=e284]:
        - heading "Legal" [level=2] [ref=e285]
        - list [ref=e286]:
          - listitem [ref=e287]:
            - generic [ref=e288]: Terms
          - listitem [ref=e289]:
            - generic [ref=e290]: Privacy
    - paragraph [ref=e292]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-giu5om: e2e_par_9kga1k → e2e_chi_e5fab2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
