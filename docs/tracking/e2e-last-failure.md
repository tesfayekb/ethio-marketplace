# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39201099563
- Commit: `d30646b013653baf6d32497c0fd5163c053efe77`
- Attempt: 1
- Written (UTC): 2026-10-19T05:37:44.970Z
- Passed: 2241 · Skipped: 213 · Failed: 13
- Gating failures: 13 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `changed` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-1-my_listings-the-seller-s-own-ads-in-six-groups-newest-change-first-with-their-counts-nobody-else-s-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-3e815--their-counts-nobody-else-s-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gbi<n>d: e<n>e_par_oh<n>gd<n> → e<n>e_chi_sz<n>dql` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-iwwqxs: e<n>e_par_ue<n>o<n> → e<n>e_chi_<n>hfve` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gbi<n>d: e<n>e_par_oh<n>gd<n> → e<n>e_chi_sz<n>dql ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-iwwqxs: e<n>e_par_ue<n>o<n> → e<n>e_chi_<n>hfve ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T04:47:11.185Z | 24.7 min |
| email | 2026-10-19T04:47:01.112Z | 0.2 min |
| shard 1 | 2026-10-19T04:47:02.466Z | 45.6 min |
| shard 2 | 2026-10-19T04:46:57.876Z | 38.2 min |
| shard 3 | 2026-10-19T04:46:56.871Z | 39.1 min |
| shard 4 | 2026-10-19T04:47:08.094Z | 50.3 min |
| shard 5 | 2026-10-19T04:47:10.006Z | 43.1 min |
| shard 6 | 2026-10-19T04:46:58.762Z | 34.7 min |
| changed | 2026-10-19T04:47:01.687Z | 27.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 636 | 44.4 min | smoke, shard 3, shard 6, changed |
| `post-wizard-bundle2.spec.ts` | 140 | 43.4 min | shard 2, shard 5, changed |
| `ad-page.spec.ts` | 68 | 31.6 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 27.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.5 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 32 | 20.1 min | shard 2, shard 5, changed |
| `admin-listings.spec.ts` | 62 | 17.4 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 16.9 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 15.7 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.6 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.8 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 14.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 14.3 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.7 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 13.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.9 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.4 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 11.1 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 10.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.4 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.3 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.0 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.1 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.0 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 3, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 142.6 s |
| `shell.spec.ts` › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping | mobile-360 | 66.7 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 66.1 s |
| `shell.spec.ts` › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping | mobile-360 | 65.5 s |
| `shell.spec.ts` › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping | mobile-360 | 59.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 56.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 54.4 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 53.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 49.6 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 48.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 48.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 47.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 46.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39201099563-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39201099563-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39201099563-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39201099563-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39201099563-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39201099563-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39201099563-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39201099563-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39201099563-changed
```

## shell.spec.ts › mobile chrome › the strip sits under the fixed bar

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1004 |     expect(rows.length).toBeGreaterThan(0);
  1005 |     for (const height of rows) {
> 1006 |       expect(height).toBeGreaterThanOrEqual(31);
       |                      ^
  1007 |       expect(height).toBeLessThanOrEqual(41);
  1008 |     }
  1009 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1006:22
```

Context:

```text
        - heading "Company" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: About
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Help" [ref=e375]:
        - heading "Help" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Safety
      - navigation "Legal" [ref=e380]:
        - heading "Legal" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - generic [ref=e384]: Terms
          - listitem [ref=e385]:
            - generic [ref=e386]: Privacy
    - paragraph [ref=e388]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  getByTestId('strip-scroll').getByRole('listitem')
Expected: not 0
Received: 0
Timeout:  20000ms

Call log:
  - Expect "not toHaveCount" with timeout 20000ms
  - waiting for getByTestId('strip-scroll').getByRole('listitem')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  getByTestId('strip-scroll').getByRole('listitem')
Expected: not 0
Received: 0
Timeout:  20000ms

Call log:
  - Expect "not toHaveCount" with timeout 20000ms
  - waiting for getByTestId('strip-scroll').getByRole('listitem')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1100 |
  1101 |     const strip = page.getByTestId("strip-scroll");
> 1102 |     await expect(strip.getByRole("listitem")).not.toHaveCount(0, { timeout: 20_000 });
       |                                                   ^
  1103 |     await checkVariant(strip, "Admin", "strip", true);
  1104 |     await page
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1237 |     expect(Math.abs(rowBox.y - stripBox.y)).toBeLessThanOrEqual(1);
  1238 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
> 1239 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
       |                           ^
  1240 |     expect(rowBox.height).toBeLessThanOrEqual(41);
  1241 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
  1242 |     const nameBox = await row.locator("[data-cut]").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1239:27
```

Context:

```text
        - heading "Company" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
      - navigation "Legal" [ref=e405]:
        - heading "Legal" [level=2] [ref=e406]
        - list [ref=e407]:
          - listitem [ref=e408]:
            - generic [ref=e409]: Terms
          - listitem [ref=e410]:
            - generic [ref=e411]: Privacy
    - paragraph [ref=e413]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › primary touch targets are at least 44px

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1457 |     const stripRowBox = await firstStripRow.boundingBox();
  1458 |     if (!stripRowBox) throw new Error("Missing strip category");
> 1459 |     expect(stripRowBox.height).toBeGreaterThanOrEqual(31);
       |                                ^
  1460 |     expect(stripRowBox.height).toBeLessThanOrEqual(41);
  1461 |
  1462 |     // Category rows inside the opened menu share the strip's fitted height.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1459:32
```

Context:

```text
        - heading "Company" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: About
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Help" [ref=e278]:
        - heading "Help" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Safety
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

## shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    33.171875
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    33.171875

  3808 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3809 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3810 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3811 |       }
  3812 |       await page.getByTestId("rail-menu-close").click();
  3813 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3810:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3819:3
```

Context:

```text
        - heading "Company" [level=2] [ref=e420]
        - list [ref=e421]:
          - listitem [ref=e422]:
            - generic [ref=e423]: About
          - listitem [ref=e424]:
            - generic [ref=e425]: Contact
      - navigation "Help" [ref=e426]:
        - heading "Help" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - generic [ref=e430]: Safety
      - navigation "Legal" [ref=e431]:
        - heading "Legal" [level=2] [ref=e432]
        - list [ref=e433]:
          - listitem [ref=e434]:
            - generic [ref=e435]: Terms
          - listitem [ref=e436]:
            - generic [ref=e437]: Privacy
    - paragraph [ref=e439]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the strip sits under the fixed bar

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1004 |     expect(rows.length).toBeGreaterThan(0);
  1005 |     for (const height of rows) {
> 1006 |       expect(height).toBeGreaterThanOrEqual(31);
       |                      ^
  1007 |       expect(height).toBeLessThanOrEqual(41);
  1008 |     }
  1009 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1006:22
```

Context:

```text
        - heading "Company" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: About
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Help" [ref=e375]:
        - heading "Help" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Safety
      - navigation "Legal" [ref=e380]:
        - heading "Legal" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - generic [ref=e384]: Terms
          - listitem [ref=e385]:
            - generic [ref=e386]: Privacy
    - paragraph [ref=e388]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  getByTestId('strip-scroll').getByRole('listitem')
Expected: not 0
Received: 0
Timeout:  20000ms

Call log:
  - Expect "not toHaveCount" with timeout 20000ms
  - waiting for getByTestId('strip-scroll').getByRole('listitem')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  getByTestId('strip-scroll').getByRole('listitem')
Expected: not 0
Received: 0
Timeout:  20000ms

Call log:
  - Expect "not toHaveCount" with timeout 20000ms
  - waiting for getByTestId('strip-scroll').getByRole('listitem')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1100 |
  1101 |     const strip = page.getByTestId("strip-scroll");
> 1102 |     await expect(strip.getByRole("listitem")).not.toHaveCount(0, { timeout: 20_000 });
       |                                                   ^
  1103 |     await checkVariant(strip, "Admin", "strip", true);
  1104 |     await page
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1237 |     expect(Math.abs(rowBox.y - stripBox.y)).toBeLessThanOrEqual(1);
  1238 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
> 1239 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
       |                           ^
  1240 |     expect(rowBox.height).toBeLessThanOrEqual(41);
  1241 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
  1242 |     const nameBox = await row.locator("[data-cut]").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1239:27
```

Context:

```text
        - heading "Company" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
      - navigation "Legal" [ref=e405]:
        - heading "Legal" [level=2] [ref=e406]
        - list [ref=e407]:
          - listitem [ref=e408]:
            - generic [ref=e409]: Terms
          - listitem [ref=e410]:
            - generic [ref=e411]: Privacy
    - paragraph [ref=e413]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › primary touch targets are at least 44px

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1457 |     const stripRowBox = await firstStripRow.boundingBox();
  1458 |     if (!stripRowBox) throw new Error("Missing strip category");
> 1459 |     expect(stripRowBox.height).toBeGreaterThanOrEqual(31);
       |                                ^
  1460 |     expect(stripRowBox.height).toBeLessThanOrEqual(41);
  1461 |
  1462 |     // Category rows inside the opened menu share the strip's fitted height.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1459:32
```

Context:

```text
        - heading "Company" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: About
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Help" [ref=e278]:
        - heading "Help" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Safety
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

## shell.spec.ts › mobile chrome › the strip sits under the fixed bar

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1004 |     expect(rows.length).toBeGreaterThan(0);
  1005 |     for (const height of rows) {
> 1006 |       expect(height).toBeGreaterThanOrEqual(31);
       |                      ^
  1007 |       expect(height).toBeLessThanOrEqual(41);
  1008 |     }
  1009 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1006:22
```

Context:

```text
        - heading "Company" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: About
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Help" [ref=e375]:
        - heading "Help" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Safety
      - navigation "Legal" [ref=e380]:
        - heading "Legal" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - generic [ref=e384]: Terms
          - listitem [ref=e385]:
            - generic [ref=e386]: Privacy
    - paragraph [ref=e388]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  getByTestId('strip-scroll').getByRole('listitem')
Expected: not 0
Received: 0
Timeout:  20000ms

Call log:
  - Expect "not toHaveCount" with timeout 20000ms
  - waiting for getByTestId('strip-scroll').getByRole('listitem')
    24 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).not.toHaveCount(expected) failed

Locator:  getByTestId('strip-scroll').getByRole('listitem')
Expected: not 0
Received: 0
Timeout:  20000ms

Call log:
  - Expect "not toHaveCount" with timeout 20000ms
  - waiting for getByTestId('strip-scroll').getByRole('listitem')
    24 × locator resolved to 0 elements
       - unexpected value "0"


  1100 |
  1101 |     const strip = page.getByTestId("strip-scroll");
> 1102 |     await expect(strip.getByRole("listitem")).not.toHaveCount(0, { timeout: 20_000 });
       |                                                   ^
  1103 |     await checkVariant(strip, "Admin", "strip", true);
  1104 |     await page
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1237 |     expect(Math.abs(rowBox.y - stripBox.y)).toBeLessThanOrEqual(1);
  1238 |     expect(Math.abs(rowBox.height - stripBox.height)).toBeLessThanOrEqual(1);
> 1239 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
       |                           ^
  1240 |     expect(rowBox.height).toBeLessThanOrEqual(41);
  1241 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
  1242 |     const nameBox = await row.locator("[data-cut]").boundingBox();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1239:27
```

Context:

```text
        - heading "Company" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
      - navigation "Legal" [ref=e405]:
        - heading "Legal" [level=2] [ref=e406]
        - list [ref=e407]:
          - listitem [ref=e408]:
            - generic [ref=e409]: Terms
          - listitem [ref=e410]:
            - generic [ref=e411]: Privacy
    - paragraph [ref=e413]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › primary touch targets are at least 44px

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 31
Received:    24

  1457 |     const stripRowBox = await firstStripRow.boundingBox();
  1458 |     if (!stripRowBox) throw new Error("Missing strip category");
> 1459 |     expect(stripRowBox.height).toBeGreaterThanOrEqual(31);
       |                                ^
  1460 |     expect(stripRowBox.height).toBeLessThanOrEqual(41);
  1461 |
  1462 |     // Category rows inside the opened menu share the strip's fitted height.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1459:32
```

Context:

```text
        - heading "Company" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: About
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Help" [ref=e278]:
        - heading "Help" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Safety
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

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-Di7Z7s4e.js:83:25) at http://127.0.0.1:4173/assets/feed-Di7Z7s4e.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) ×2
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 3

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-Di7Z7s4e.js:83:25) at http://127.0.0.1:4173/assets/feed-Di7Z7s4e.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5)
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-Di7Z7s4e.js:83:25) at http://127.0.0.1:4173/assets/feed-Di7Z7s4e.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BP0S6QIb.js:6028:5)
console.error: [client-error] gate fetch threw
```
