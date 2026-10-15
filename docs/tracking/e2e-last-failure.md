# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38724240404
- Commit: `cc64a2db38a89f00cf88da98a3834b731e3295a9`
- Attempt: 1
- Written (UTC): 2026-10-15T12:00:22.789Z
- Passed: 1758 · Skipped: 126 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

104 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>spi<n>i: e<n>e_par_zjsmka → e<n>e_chi_<n>rd<n>er` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vhku<n>: e<n>e_par_<n>ex<n>u → e<n>e_chi_a<n>bwif` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>spi<n>i: e<n>e_par_zjsmka → e<n>e_chi_<n>rd<n>er ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vhku<n>: e<n>e_par_<n>ex<n>u → e<n>e_chi_a<n>bwif ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): language toggle renders Amharic (Ge'ez path) ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-33 a region alone never lists itself; its city does (W6 R2) ×1 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×1

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
| smoke | 2026-10-15T11:21:43.503Z | 15.9 min |
| email | 2026-10-15T11:21:53.303Z | 0.4 min |
| shard 1 | 2026-10-15T11:21:44.616Z | 37.0 min |
| shard 2 | 2026-10-15T11:21:40.393Z | 30.1 min |
| shard 3 | 2026-10-15T11:21:41.317Z | 29.7 min |
| shard 4 | 2026-10-15T11:21:32.382Z | 30.3 min |
| shard 5 | 2026-10-15T11:21:44.662Z | 38.2 min |
| shard 6 | 2026-10-15T11:21:43.000Z | 28.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 22.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 21.6 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 18.7 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.7 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 15.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.7 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 26 | 12.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 60 | 11.2 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.2 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 28 | 10.9 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 10.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.6 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.2 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 44 | 9.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.9 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.1 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.8 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 6.8 min | shard 1, shard 5 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.1 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.0 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.5 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.1 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 1.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 55.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 55.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 53.2 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 51.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 48.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.1 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 46.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 46.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 45.3 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 44.8 s |
| `my-listings-doors.spec.ts` › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175) | mobile-360 | 44.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 43.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 42.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 42.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38724240404-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38724240404-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38724240404-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38724240404-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38724240404-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38724240404-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38724240404-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38724240404-6
```

## posting-routes.spec.ts › POSTING ROUTES › PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (734ceffa-da4f-4627-b991-c08fac9e5ff5, 26f5655b-2e52-4d94-b5dc-eac124b4ca31, 1caeaa81-b324-4d3a-ac91-9738ba0038fb, null, e2e pr50 3nbiy3, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 11:48:08.154598+00, 2026-10-15 11:48:08.154598+00, regular, once, null, null, null, {}, null, '3nbiy3':3A 'ad':7B 'e2e':1A,4B 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 11:48:08.154598+00, 2026-10-15 11:48:08.038+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}
--- further error 1 ---
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (734ceffa-da4f-4627-b991-c08fac9e5ff5, 26f5655b-2e52-4d94-b5dc-eac124b4ca31, 1caeaa81-b324-4d3a-ac91-9738ba0038fb, null, e2e pr50 3nbiy3, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 11:48:08.154598+00, 2026-10-15 11:48:08.154598+00, regular, once, null, null, null, {}, null, '3nbiy3':3A 'ad':7B 'e2e':1A,4B 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 11:48:08.154598+00, 2026-10-15 11:48:08.038+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

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

Received: {"code": "23514", "details": "Failing row contains (063f250a-aae2-4a22-a4a7-f38843fea54f, d32926f0-d677-4846-9d96-ac84e9bd205b, c41c1d07-de92-4944-a96a-035719735f36, null, e2e pr50 5x9v30, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 11:46:22.196027+00, 2026-10-15 11:46:22.196027+00, regular, once, null, null, null, {}, null, '5x9v30':3A 'ad':7B 'e2e':1A,4B 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 11:46:22.196027+00, 2026-10-15 11:46:21.475+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}
--- further error 1 ---
Error: PR-50: the submitted ad could not be seeded

expect(received).toBeNull()

Received: {"code": "23514", "details": "Failing row contains (063f250a-aae2-4a22-a4a7-f38843fea54f, d32926f0-d677-4846-9d96-ac84e9bd205b, c41c1d07-de92-4944-a96a-035719735f36, null, e2e pr50 5x9v30, e2e pr50 submitted ad, {}, null, null, fixed, screening, ET, null, null, 2026-10-15 11:46:22.196027+00, 2026-10-15 11:46:22.196027+00, regular, once, null, null, null, {}, null, '5x9v30':3A 'ad':7B 'e2e':1A,4B 'pr50':2A,5B 'submitted':6B, 0, 2026-10-15 11:46:22.196027+00, 2026-10-15 11:46:21.475+00, 0, null, null, null, null, null, f, null, null, null, null, null, null, f, null, f, null, null, null, null, null, null, null, null, null).", "hint": null, "message": "new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

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
          - listitem [ref=e301]:
            - generic [ref=e302]: About
          - listitem [ref=e303]:
            - generic [ref=e304]: How it works
      - navigation "Help" [ref=e305]:
        - heading "Help" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Safety
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Legal" [ref=e312]:
        - heading "Legal" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Terms
          - listitem [ref=e317]:
            - generic [ref=e318]: Privacy
    - paragraph [ref=e320]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-17XlaKiC.js:34136:25) at http://127.0.0.1:4173/assets/index-17XlaKiC.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-17XlaKiC.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-17XlaKiC.js:6025:5) ×2
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
