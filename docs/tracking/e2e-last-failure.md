# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39182441962
- Commit: `1b21dbeba9f9f029b2624877bc4c0302e986fde8`
- Attempt: 1
- Written (UTC): 2026-10-19T01:38:41.609Z
- Passed: 1999 · Skipped: 149 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `catalog_find_refresh: canceling statement due to statement timeout` | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>fw<n>y: e<n>e_par_y<n>hin → e<n>e_chi_<n>oy<n>gy` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-l<n>wk<n>q: e<n>e_par_<n>e<n>s<n> → e<n>e_chi_rg<n>xwc` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>fw<n>y: e<n>e_par_y<n>hin → e<n>e_chi_<n>oy<n>gy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-l<n>wk<n>q: e<n>e_par_<n>e<n>s<n> → e<n>e_chi_rg<n>xwc ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-99 the place boxes step in; every select stays at least 200 px ×2 · feed grid reflows without clipping and never overflows ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### catalog_find_refresh: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-6 rail order: two roots are stored in position order, and the reset removes e ×1 · CO-7 transfer: the markets file round-trips through the header's Import and the  ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T00:52:11.370Z | 20.5 min |
| email | 2026-10-19T00:52:13.291Z | 0.3 min |
| shard 1 | 2026-10-19T00:52:04.620Z | 40.2 min |
| shard 2 | 2026-10-19T00:52:17.089Z | 42.4 min |
| shard 3 | 2026-10-19T00:52:13.136Z | 41.5 min |
| shard 4 | 2026-10-19T00:52:24.271Z | 46.0 min |
| shard 5 | 2026-10-19T00:52:06.061Z | 40.4 min |
| shard 6 | 2026-10-19T00:52:14.234Z | 32.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 26.2 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 25.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 408 | 24.9 min | smoke, shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 24.4 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 62 | 18.2 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.1 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 17.1 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 16.9 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 14.8 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.6 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.3 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.3 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 12.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.9 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.8 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.6 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 10.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.2 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.0 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.0 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.9 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.8 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 2.0 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.0 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 83.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 62.2 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | mobile-360 | 58.4 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 56.9 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 55.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 54.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 53.0 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 49.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 48.6 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 48.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 48.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 47.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 47.4 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 46.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39182441962-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39182441962-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39182441962-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39182441962-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39182441962-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39182441962-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39182441962-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39182441962-6
```

## shell.spec.ts › app shell › FT-1 the footer brand and three link columns fit every width

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    20
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    20

  570 |       expect(
  571 |         Math.abs(taglineBox.x + taglineBox.width / 2 - (wordmark.x + wordmark.width / 2)),
> 572 |       ).toBeLessThanOrEqual(1);
      |         ^
  573 |       expect(taglineBox.y).toBeGreaterThanOrEqual(wordmark.y + wordmark.height);
  574 |     } else {
  575 |       await expect(brand).toBeHidden();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:572:9
```

Context:

```text
        - heading "Company" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: About
          - listitem [ref=e139]:
            - generic [ref=e140]: Contact
      - navigation "Help" [ref=e141]:
        - heading "Help" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Safety
      - navigation "Legal" [ref=e146]:
        - heading "Legal" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Terms
          - listitem [ref=e151]:
            - generic [ref=e152]: Privacy
    - paragraph [ref=e154]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › FT-1 the footer brand and three link columns fit every width

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    20
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    20

  570 |       expect(
  571 |         Math.abs(taglineBox.x + taglineBox.width / 2 - (wordmark.x + wordmark.width / 2)),
> 572 |       ).toBeLessThanOrEqual(1);
      |         ^
  573 |       expect(taglineBox.y).toBeGreaterThanOrEqual(wordmark.y + wordmark.height);
  574 |     } else {
  575 |       await expect(brand).toBeHidden();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:572:9
```

Context:

```text
        - heading "Company" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: About
          - listitem [ref=e139]:
            - generic [ref=e140]: Contact
      - navigation "Help" [ref=e141]:
        - heading "Help" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Safety
      - navigation "Legal" [ref=e146]:
        - heading "Legal" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Terms
          - listitem [ref=e151]:
            - generic [ref=e152]: Privacy
    - paragraph [ref=e154]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
