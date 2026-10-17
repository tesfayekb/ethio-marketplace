# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39033067958
- Commit: `874c338c2c99951ee4dd4e52720b9ec035309f30`
- Attempt: 1
- Written (UTC): 2026-10-17T14:02:33.351Z
- Passed: 1868 · Skipped: 126 · Failed: 10
- Gating failures: 10 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bp<n>qe: e<n>e_par_neq<n>s<n> → e<n>e_chi_cgw<n>rc` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>q<n>ed<n>: e<n>e_par_f<n>ud<n>f → e<n>e_chi_gzhifv` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bp<n>qe: e<n>e_par_neq<n>s<n> → e<n>e_chi_cgw<n>rc ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>q<n>ed<n>: e<n>e_par_f<n>ud<n>f → e<n>e_chi_gzhifv ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-104 a unit settled by the type is held by the price page's unit ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · admin tables never overflow horizontally ×1 · location row is present on Marketplace and absent on Account ×1

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
| smoke | 2026-10-17T13:21:30.188Z | 16.9 min |
| email | 2026-10-17T13:21:28.604Z | 0.2 min |
| shard 1 | 2026-10-17T13:21:35.992Z | 40.6 min |
| shard 2 | 2026-10-17T13:21:29.607Z | 35.2 min |
| shard 3 | 2026-10-17T13:21:29.145Z | 32.0 min |
| shard 4 | 2026-10-17T13:21:34.040Z | 40.3 min |
| shard 5 | 2026-10-17T13:21:28.226Z | 36.0 min |
| shard 6 | 2026-10-17T13:21:34.918Z | 36.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 24.1 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 23.7 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 19.7 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.4 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.4 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.6 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 13.0 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.8 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 12.5 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 28 | 12.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 10.8 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 10.4 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 26 | 9.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.1 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 6.7 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.5 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.7 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 2 |
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
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 54.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 53.6 s |
| `ad-page-doors.spec.ts` › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) | desktop-1280 | 50.9 s |
| `ad-page-doors.spec.ts` › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) | mobile-360 | 50.2 s |
| `ad-page-doors.spec.ts` › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) | desktop-1280 | 50.0 s |
| `ad-page-doors.spec.ts` › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) | mobile-360 | 49.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 49.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 47.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 45.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.5 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 42.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 42.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39033067958-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39033067958-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39033067958-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39033067958-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39033067958-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39033067958-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39033067958-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39033067958-6
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  758 |     expect(page2.error).toBeNull();
  759 |     const cards2 = (page2.data as Row)["cards"] as Row[];
> 760 |     expect(cards2).toHaveLength(1);
      |                    ^
  761 |     expect(cards2[0]!["publicId"]).toBe(idA);
  762 |     expect((page2.data as Row)["next"]).toBeNull();
  763 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:760:20
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--mobile-360`; this run carried 8 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"

  854 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
  855 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 856 |       expect(answer.error).toContain("permission denied");
      |                            ^
  857 |     }
  858 |
  859 |     const dialed = await adminClient().from("rate_overrides").insert({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:856:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--mobile-360`; this run carried 8 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-java1a / e2e-cat-exp-tzepjg,e2e-cat-exp-tzepjg,e2e_attr_ruzi0t,true,true,,e2e-cat-exp-java1a,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-java1a,,,,\d+$/
Received string:  "e2e-cat-exp-java1a / e2e-cat-exp-tzepjg,e2e-cat-exp-tzepjg,e2e_attr_ruzi0t,true,true,,e2e-cat-exp-java1a,,,,0,"
--- further error 1 ---
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-java1a / e2e-cat-exp-tzepjg,e2e-cat-exp-tzepjg,e2e_attr_ruzi0t,true,true,,e2e-cat-exp-java1a,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-java1a,,,,\d+$/
Received string:  "e2e-cat-exp-java1a / e2e-cat-exp-tzepjg,e2e-cat-exp-tzepjg,e2e_attr_ruzi0t,true,true,,e2e-cat-exp-java1a,,,,0,"

  1014 |        * R-GATE echoed the last two). Only the order carries a value here.
  1015 |        */
> 1016 |       expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1017 |         new RegExp(`,${parentSlug},,,,\\d+$`),
  1018 |       );
  1019 |       // The parent's own row names ITSELF as the origin.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1016:82
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-5m0c9n / e2e-cat-inh-5m0c9n-child,e2e-cat-inh-5m0c9n-child,e2e_attr_wwjw0m,true,true,1,e2e-cat-inh-5m0c9n,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-5m0c9n,,,,\d+$/
Received string:  "e2e-cat-inh-5m0c9n / e2e-cat-inh-5m0c9n-child,e2e-cat-inh-5m0c9n-child,e2e_attr_wwjw0m,true,true,1,e2e-cat-inh-5m0c9n,,,,0,"
--- further error 1 ---
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-5m0c9n / e2e-cat-inh-5m0c9n-child,e2e-cat-inh-5m0c9n-child,e2e_attr_wwjw0m,true,true,1,e2e-cat-inh-5m0c9n,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-5m0c9n,,,,\d+$/
Received string:  "e2e-cat-inh-5m0c9n / e2e-cat-inh-5m0c9n-child,e2e-cat-inh-5m0c9n-child,e2e_attr_wwjw0m,true,true,1,e2e-cat-inh-5m0c9n,,,,0,"

  1236 |       // The origin is no longer the last cell: the FOUR per-link cells trail it
  1237 |       // (R-GATE added `visible_when` and `display_order`; only the order has a value).
> 1238 |       expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1239 |         new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
  1240 |       );
  1241 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1238:82
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: How it works
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
          - listitem [ref=e377]:
            - generic [ref=e378]: Contact
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Terms
          - listitem [ref=e384]:
            - generic [ref=e385]: Privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed
--- further error 1 ---
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed

  2181 |       const old = await supabase.from("user_roles").delete().eq("user_id", buyer.id);
  2182 |       if (old.error)
> 2183 |         throw new Error(`[e2e:al31] clearing scratch grants failed: ${old.error.message}`);
       |               ^
  2184 |       const name = `e2e_listings_role_${token()}`;
  2185 |       const role = await supabase
  2186 |         .from("roles")
    at holder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2183:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2215:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-31-Reports-the-open-count-on-the-row-and-the-reasons-on-the-listing-s-page-for-listings-review-nothing-for-listings-view-alone-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-fab8b-ing-for-listings-view-alone-mobile-360`; this run carried 8 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  758 |     expect(page2.error).toBeNull();
  759 |     const cards2 = (page2.data as Row)["cards"] as Row[];
> 760 |     expect(cards2).toHaveLength(1);
      |                    ^
  761 |     expect(cards2[0]!["publicId"]).toBe(idA);
  762 |     expect((page2.data as Row)["next"]).toBeNull();
  763 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:760:20
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--desktop-1280`; this run carried 8 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"

  854 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
  855 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 856 |       expect(answer.error).toContain("permission denied");
      |                            ^
  857 |     }
  858 |
  859 |     const dialed = await adminClient().from("rate_overrides").insert({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:856:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--desktop-1280`; this run carried 8 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-lb5dqe / e2e-cat-exp-t6tha6,e2e-cat-exp-t6tha6,e2e_attr_awigta,true,true,,e2e-cat-exp-lb5dqe,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-lb5dqe,,,,\d+$/
Received string:  "e2e-cat-exp-lb5dqe / e2e-cat-exp-t6tha6,e2e-cat-exp-t6tha6,e2e_attr_awigta,true,true,,e2e-cat-exp-lb5dqe,,,,0,"
--- further error 1 ---
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-lb5dqe / e2e-cat-exp-t6tha6,e2e-cat-exp-t6tha6,e2e_attr_awigta,true,true,,e2e-cat-exp-lb5dqe,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-lb5dqe,,,,\d+$/
Received string:  "e2e-cat-exp-lb5dqe / e2e-cat-exp-t6tha6,e2e-cat-exp-t6tha6,e2e_attr_awigta,true,true,,e2e-cat-exp-lb5dqe,,,,0,"

  1014 |        * R-GATE echoed the last two). Only the order carries a value here.
  1015 |        */
> 1016 |       expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1017 |         new RegExp(`,${parentSlug},,,,\\d+$`),
  1018 |       );
  1019 |       // The parent's own row names ITSELF as the origin.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1016:82
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-b7m369 / e2e-cat-inh-b7m369-child,e2e-cat-inh-b7m369-child,e2e_attr_z072zi,true,true,1,e2e-cat-inh-b7m369,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-b7m369,,,,\d+$/
Received string:  "e2e-cat-inh-b7m369 / e2e-cat-inh-b7m369-child,e2e-cat-inh-b7m369-child,e2e_attr_z072zi,true,true,1,e2e-cat-inh-b7m369,,,,0,"
--- further error 1 ---
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-b7m369 / e2e-cat-inh-b7m369-child,e2e-cat-inh-b7m369-child,e2e_attr_z072zi,true,true,1,e2e-cat-inh-b7m369,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-b7m369,,,,\d+$/
Received string:  "e2e-cat-inh-b7m369 / e2e-cat-inh-b7m369-child,e2e-cat-inh-b7m369-child,e2e_attr_z072zi,true,true,1,e2e-cat-inh-b7m369,,,,0,"

  1236 |       // The origin is no longer the last cell: the FOUR per-link cells trail it
  1237 |       // (R-GATE added `visible_when` and `display_order`; only the order has a value).
> 1238 |       expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1239 |         new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
  1240 |       );
  1241 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1238:82
```

Context:

```text
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: How it works
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Legal" [ref=e404]:
        - heading "Legal" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Terms
          - listitem [ref=e409]:
            - generic [ref=e410]: Privacy
    - paragraph [ref=e412]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed
--- further error 1 ---
Error: [e2e:al31] clearing scratch grants failed: base user role cannot be removed

  2181 |       const old = await supabase.from("user_roles").delete().eq("user_id", buyer.id);
  2182 |       if (old.error)
> 2183 |         throw new Error(`[e2e:al31] clearing scratch grants failed: ${old.error.message}`);
       |               ^
  2184 |       const name = `e2e_listings_role_${token()}`;
  2185 |       const role = await supabase
  2186 |         .from("roles")
    at holder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2183:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2215:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-31-Reports-the-open-count-on-the-row-and-the-reasons-on-the-listing-s-page-for-listings-review-nothing-for-listings-view-alone-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-fab8b-ing-for-listings-view-alone-desktop-1280`; this run carried 8 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-5-0q2ed2: e2e_par_f6ud9f → e2e_chi_gzhifv
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-5-0bp0qe: e2e_par_neq1s8 → e2e_chi_cgw7rc
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
