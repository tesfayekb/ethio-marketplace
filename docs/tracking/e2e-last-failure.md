# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39175444372
- Commit: `3014ac021daa4e0cabea13f89207f0fe45d44d11`
- Attempt: 1
- Written (UTC): 2026-10-19T00:01:23.229Z
- Passed: 1998 · Skipped: 149 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>gnq<n>: e<n>e_par_gnh<n>a → e<n>e_chi_hwulni` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ukpgv<n>: e<n>e_par_<n>kt<n>ys → e<n>e_chi_efnp<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>gnq<n>: e<n>e_par_gnh<n>a → e<n>e_chi_hwulni ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ukpgv<n>: e<n>e_par_<n>kt<n>ys → e<n>e_chi_efnp<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

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
| smoke | 2026-10-18T23:12:21.527Z | 19.7 min |
| email | 2026-10-18T23:12:24.794Z | 0.3 min |
| shard 1 | 2026-10-18T23:12:39.306Z | 48.4 min |
| shard 2 | 2026-10-18T23:12:24.849Z | 44.3 min |
| shard 3 | 2026-10-18T23:12:30.952Z | 33.7 min |
| shard 4 | 2026-10-18T23:12:25.547Z | 44.6 min |
| shard 5 | 2026-10-18T23:12:31.702Z | 46.5 min |
| shard 6 | 2026-10-18T23:12:32.432Z | 40.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 28.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 27.7 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 26.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 408 | 24.7 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.0 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.5 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 17.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 16.6 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.8 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.1 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 14.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 36 | 13.9 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 13.4 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 12.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.2 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.8 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.3 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 9.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 9.0 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.5 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 22 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.9 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 14 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 69.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 60.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 59.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 59.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 58.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 56.7 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 56.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 55.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 54.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 53.0 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 50.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 50.1 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 49.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 49.2 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 47.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39175444372-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39175444372-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39175444372-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39175444372-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39175444372-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39175444372-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39175444372-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39175444372-6
```

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":390,"band":390,"furthest":540,"furthestText":"E2E Effzmkzduxdvlydwybqaydybfvipkgjsesnwmotbahwvjcey","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 390
Received:    540
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":390,"band":390,"furthest":540,"furthestText":"E2E Effzmkzduxdvlydwybqaydybfvipkgjsesnwmotbahwvjcey","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 390
Received:    540

  1841 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1842 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
> 1843 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
       |                                                         ^
  1844 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
  1845 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeLessThanOrEqual(34);
  1846 |     await expect(page.getByTestId("breadcrumb-ad")).toHaveText(title);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1843:57
```

Context:

```text
        - heading "Company" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - generic [ref=e308]: About
          - listitem [ref=e309]:
            - generic [ref=e310]: Contact
      - navigation "Help" [ref=e311]:
        - heading "Help" [level=2] [ref=e312]
        - list [ref=e313]:
          - listitem [ref=e314]:
            - generic [ref=e315]: Safety
      - navigation "Legal" [ref=e316]:
        - heading "Legal" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Terms
          - listitem [ref=e321]:
            - generic [ref=e322]: Privacy
    - paragraph [ref=e324]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    19.2564697265625
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    19.2564697265625

  1092 |     if (!menuBox) throw new Error("Missing opened menu box");
  1093 |     expect(Math.abs(menuBox.width - 256)).toBeLessThanOrEqual(1);
> 1094 |     expect(Math.abs(menuBox.x)).toBeLessThanOrEqual(1);
       |                                 ^
  1095 |
  1096 |     // INC-528 — other tests' scratch categories (slugs "e2e-…") come and go in
  1097 |     // the rail while this test runs; the anchor is a real category.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1094:33
```

Context:

```text
        - heading "Company" [level=2] [ref=e567]
        - list [ref=e568]:
          - listitem [ref=e569]:
            - generic [ref=e570]: About
          - listitem [ref=e571]:
            - generic [ref=e572]: Contact
      - navigation "Help" [ref=e573]:
        - heading "Help" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: Safety
      - navigation "Legal" [ref=e578]:
        - heading "Legal" [level=2] [ref=e579]
        - list [ref=e580]:
          - listitem [ref=e581]:
            - generic [ref=e582]: Terms
          - listitem [ref=e583]:
            - generic [ref=e584]: Privacy
    - paragraph [ref=e586]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RM-2 the menu closes back to the icons

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    43.103271484375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    43.103271484375

  1159 |     expect(closeBox.height).toBeGreaterThanOrEqual(44);
  1160 |     expect(closeBox.width).toBeGreaterThanOrEqual(44);
> 1161 |     expect(Math.abs(closeBox.x + closeBox.width - menuBox.x - menuBox.width)).toBeLessThanOrEqual(
       |                                                                               ^
  1162 |       1,
  1163 |     );
  1164 |     await close.click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1161:79
```

Context:

```text
        - heading "Company" [level=2] [ref=e485]
        - list [ref=e486]:
          - listitem [ref=e487]:
            - generic [ref=e488]: About
          - listitem [ref=e489]:
            - generic [ref=e490]: Contact
      - navigation "Help" [ref=e491]:
        - heading "Help" [level=2] [ref=e492]
        - list [ref=e493]:
          - listitem [ref=e494]:
            - generic [ref=e495]: Safety
      - navigation "Legal" [ref=e496]:
        - heading "Legal" [level=2] [ref=e497]
        - list [ref=e498]:
          - listitem [ref=e499]:
            - generic [ref=e500]: Terms
          - listitem [ref=e501]:
            - generic [ref=e502]: Privacy
    - paragraph [ref=e504]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-ukpgv1: e2e_par_5kt2ys → e2e_chi_efnp49
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
