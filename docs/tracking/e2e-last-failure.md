# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39086460712
- Commit: `2b7b3805d77153a4d477022b572431b149858ace`
- Attempt: 1
- Written (UTC): 2026-10-18T02:08:50.020Z
- Passed: 1907 · Skipped: 128 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

113 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-flpzbq: e<n>e_par_dvkk<n>r → e<n>e_chi_jf<n>ao` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>f<n>e: e<n>e_par_r<n>pzx<n> → e<n>e_chi_px<n>f<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-flpzbq: e<n>e_par_dvkk<n>r → e<n>e_chi_jf<n>ao ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>f<n>e: e<n>e_par_r<n>pzx<n> → e<n>e_chi_px<n>f<n> ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · location row is present on Marketplace and absent on Account ×1

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
| smoke | 2026-10-18T01:27:14.602Z | 18.1 min |
| email | 2026-10-18T01:27:13.397Z | 0.2 min |
| shard 1 | 2026-10-18T01:27:03.954Z | 38.6 min |
| shard 2 | 2026-10-18T01:27:10.611Z | 35.3 min |
| shard 3 | 2026-10-18T01:27:02.727Z | 35.5 min |
| shard 4 | 2026-10-18T01:27:03.041Z | 41.5 min |
| shard 5 | 2026-10-18T01:27:05.759Z | 40.3 min |
| shard 6 | 2026-10-18T01:27:08.473Z | 37.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 25.3 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.5 min | smoke, shard 3, shard 6 |
| `ad-page.spec.ts` | 54 | 19.9 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 62 | 18.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 17.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.7 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 14.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.3 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.3 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.8 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.7 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.7 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 10.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 10.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.1 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 7.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.9 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.9 min | shard 1, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 6.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.6 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.6 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 4.1 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.1 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `ad-page.spec.ts` › AP-44 nothing covers the top bars | desktop-1280 | 57.0 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 54.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.3 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 53.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 52.5 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 51.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 49.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 49.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 47.7 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 44.3 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 43.8 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 43.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 42.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 42.6 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 41.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39086460712-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39086460712-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39086460712-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39086460712-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39086460712-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39086460712-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39086460712-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39086460712-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-44 nothing covers the top bars

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1183 |     // Scroll until the map's box is under the shell's band (the map's top above the band's bottom).
  1184 |     await page.getByTestId("listing-detail-map").scrollIntoViewIfNeeded();
> 1185 |     await expect
       |     ^
  1186 |       .poll(async () => {
  1187 |         await page.mouse.wheel(0, 120);
  1188 |         const map = await box("listing-detail-map");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1185:5
```

Context:

```text
          - listitem [ref=e336]:
            - generic [ref=e337]: About
          - listitem [ref=e338]:
            - generic [ref=e339]: How it works
      - navigation "Help" [ref=e340]:
        - heading "Help" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Safety
          - listitem [ref=e345]:
            - generic [ref=e346]: Contact
      - navigation "Legal" [ref=e347]:
        - heading "Legal" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Terms
          - listitem [ref=e352]:
            - generic [ref=e353]: Privacy
    - paragraph [ref=e355]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-3-r8f41e: e2e_par_r2pzx3 → e2e_chi_px21f4
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
