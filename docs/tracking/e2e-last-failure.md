# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38729348738
- Commit: `a7485475eb935d763d3c6e5331887743616496c0`
- Attempt: 1
- Written (UTC): 2026-10-15T12:40:33.329Z
- Passed: 1765 · Skipped: 126 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-screening.spec.ts › ADMIN SCREENING › SC-12 two ticked ads are approved together, after one confirmation that counts them — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-screening.spec.ts › ADMIN SCREENING › SC-12 two ticked ads are approved together, after one confirmation that counts them

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('admin-screening-row-bba714b0-a431-49fe-890d-2bc47b0974f8-card')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('admin-screening-row-bba714b0-a431-49fe-890d-2bc47b0974f8-card')


  622 |     await gotoReady(page, "/admin/screening");
  623 |     await page.getByTestId("admin-screening-search").fill(stem);
> 624 |     await expect(rowOf(page, first.id)).toBeVisible({ timeout: 20000 });
      |                                         ^
  625 |     await expect(rowOf(page, second.id)).toBeVisible();
  626 |     await tickOf(page, first.id).click();
  627 |     await tickOf(page, second.id).click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:624:41
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:34136:25) at http://127.0.0.1:4173/assets/index-CXFzMY-f.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5)
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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xxvgol: e<n>e_par_<n>pcbg → e<n>e_chi_<n>zmuqm` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ym<n>vy: e<n>e_par_au<n>ye<n> → e<n>e_chi_do<n>lxe` (quiet) | 1 | shard 1 |
| `gate fetch failed <n>` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xxvgol: e<n>e_par_<n>pcbg → e<n>e_chi_<n>zmuqm ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ym<n>vy: e<n>e_par_au<n>ye<n> → e<n>e_chi_do<n>lxe ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): feed renders its empty state ×1 · no horizontal overflow and text stays legible at 360 ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-154 {country} in a label and its help reads the market's country in English ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### gate fetch failed <n>

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): C-7: the rail highlight follows the URL ×1 · C-8: Home clears the category ×1

```text
[WebServer] [ssr-error] /__root gate fetch failed 502
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T12:01:43.819Z | 15.2 min |
| email | 2026-10-15T12:01:50.268Z | 0.3 min |
| shard 1 | 2026-10-15T12:01:47.344Z | 34.0 min |
| shard 2 | 2026-10-15T12:01:46.252Z | 32.6 min |
| shard 3 | 2026-10-15T12:01:53.884Z | 29.3 min |
| shard 4 | 2026-10-15T12:01:47.941Z | 32.4 min |
| shard 5 | 2026-10-15T12:01:56.384Z | 38.3 min |
| shard 6 | 2026-10-15T12:01:47.377Z | 29.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 24.0 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 22.4 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.2 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 18.6 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 14.8 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 26 | 12.7 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 48 | 12.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 60 | 11.6 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 28 | 11.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.2 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 10.7 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.0 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.9 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.3 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.0 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 7.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.7 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 6.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 26 | 6.2 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 5.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.7 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.2 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 86.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 59.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 58.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 58.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 55.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 55.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 52.1 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 48.3 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 47.6 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 47.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 46.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 45.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 44.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 44.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 43.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38729348738-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38729348738-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38729348738-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38729348738-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38729348738-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38729348738-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38729348738-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38729348738-6
```

## posting-routes.spec.ts › POSTING ROUTES › PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (8115d5b2-f225-4e04-a97c-a1a4d4fd1b2f, fc3630ec-ad16-4040-83b7-aa78852f2fb2, 6989f4c5-773b-4bb9-a7ca-bd230f06d0aa, null, e2e pr50 e7b5y9, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 12:27:52.68961+00, 2026-10-15 12:27:52.68961+00, regular, once, null, null, null, {}, null, 'ad':7B 'e2e':1A,4B 'e7b5y9':3A 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 12:27:52.68961+00, 2026-10-15 12:27:52.502+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}
--- further error 1 ---
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (8115d5b2-f225-4e04-a97c-a1a4d4fd1b2f, fc3630ec-ad16-4040-83b7-aa78852f2fb2, 6989f4c5-773b-4bb9-a7ca-bd230f06d0aa, null, e2e pr50 e7b5y9, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 12:27:52.68961+00, 2026-10-15 12:27:52.68961+00, regular, once, null, null, null, {}, null, 'ad':7B 'e2e':1A,4B 'e7b5y9':3A 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 12:27:52.68961+00, 2026-10-15 12:27:52.502+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

  1363 |         published_first_at: new Date().toISOString(),
  1364 |       });
> 1365 |       expect(submitted.error, "PR-50: the submitted ad could not be seeded").toBeNull();
       |                                                                              ^
  1366 |
  1367 |       const stored = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
  1368 |       expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1365:78
```

Context:

```text
          - listitem [ref=e235]:
            - generic [ref=e236]: About
          - listitem [ref=e237]:
            - generic [ref=e238]: How it works
      - navigation "Help" [ref=e239]:
        - heading "Help" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Safety
          - listitem [ref=e244]:
            - generic [ref=e245]: Contact
      - navigation "Legal" [ref=e246]:
        - heading "Legal" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Terms
          - listitem [ref=e251]:
            - generic [ref=e252]: Privacy
    - paragraph [ref=e254]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (808a2798-2f9d-424c-be76-3de29b2c8af5, f2e55da1-8d41-48da-ac66-9c7cd8e87cbc, b3a088f6-f691-423a-9dd3-89b90fe783c1, null, e2e pr50 9as0rh, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 12:27:48.619601+00, 2026-10-15 12:27:48.619601+00, regular, once, null, null, null, {}, null, '9as0rh':3A 'ad':7B 'e2e':1A,4B 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 12:27:48.619601+00, 2026-10-15 12:27:48.456+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}
--- further error 1 ---
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (808a2798-2f9d-424c-be76-3de29b2c8af5, f2e55da1-8d41-48da-ac66-9c7cd8e87cbc, b3a088f6-f691-423a-9dd3-89b90fe783c1, null, e2e pr50 9as0rh, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 12:27:48.619601+00, 2026-10-15 12:27:48.619601+00, regular, once, null, null, null, {}, null, '9as0rh':3A 'ad':7B 'e2e':1A,4B 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 12:27:48.619601+00, 2026-10-15 12:27:48.456+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

  1363 |         published_first_at: new Date().toISOString(),
  1364 |       });
> 1365 |       expect(submitted.error, "PR-50: the submitted ad could not be seeded").toBeNull();
       |                                                                              ^
  1366 |
  1367 |       const stored = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
  1368 |       expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1365:78
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: How it works
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
          - listitem [ref=e277]:
            - generic [ref=e278]: Contact
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Terms
          - listitem [ref=e284]:
            - generic [ref=e285]: Privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:34136:25) at http://127.0.0.1:4173/assets/index-CXFzMY-f.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:34136:25) at http://127.0.0.1:4173/assets/index-CXFzMY-f.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CXFzMY-f.js:6025:5)
console.error: [client-error] gate fetch threw
```
