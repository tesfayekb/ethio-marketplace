# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39092521982
- Commit: `3765f0478617120dcbc3457621105cd54c5fed55`
- Attempt: 1
- Written (UTC): 2026-10-18T04:25:50.948Z
- Passed: 1912 · Skipped: 129 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-who-alias-ok')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-who-alias-ok')


  522 |     await typeNames();
  523 |
> 524 |     await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
      |                                                         ^
  525 |     await expect(first, "PW-134: the read wiped the first name").toHaveValue("Almaz");
  526 |     await expect(
  527 |       page.getByTestId("post-who-last"),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:524:57
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-134-names-typed-during-the-identity-read-survive-it-and-are-saved-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-7e730-ad-survive-it-and-are-saved-mobile-360`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

114 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 14 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ng<n>uu: e<n>e_par_j<n>jlqh → e<n>e_chi_rftbl<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>xb<n>r: e<n>e_par_p<n>w<n>bi → e<n>e_chi_kab<n>jg` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ng<n>uu: e<n>e_par_j<n>jlqh → e<n>e_chi_rftbl<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>xb<n>r: e<n>e_par_p<n>w<n>bi → e<n>e_chi_kab<n>jg ×1

Off the allowlist:

### listing not found

- Count: 14 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-108 an Other basis names the seller's written unit (INC-371) ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tra ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2

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
| smoke | 2026-10-18T03:42:47.557Z | 16.4 min |
| email | 2026-10-18T03:42:45.437Z | 0.3 min |
| shard 1 | 2026-10-18T03:42:51.060Z | 42.6 min |
| shard 2 | 2026-10-18T03:42:55.580Z | 39.1 min |
| shard 3 | 2026-10-18T03:42:56.968Z | 37.3 min |
| shard 4 | 2026-10-18T03:42:45.811Z | 38.7 min |
| shard 5 | 2026-10-18T03:42:53.955Z | 42.5 min |
| shard 6 | 2026-10-18T03:42:59.303Z | 36.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.9 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 25.1 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 62 | 21.2 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 62 | 19.9 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 18.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 16.9 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 15.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.5 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.3 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.9 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 11.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.0 min | smoke, shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 10.3 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 10.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 8.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 8.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.0 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.4 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.3 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.3 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.1 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 5.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.5 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.0 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `post-wizard-place.spec.ts` › PW-13 review: the preview shows what was answered, and Publish lands in review — never live | desktop-1280 | 75.5 s |
| `post-wizard-place.spec.ts` › PW-13 review: the preview shows what was answered, and Publish lands in review — never live | mobile-360 | 74.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 55.5 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 53.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 53.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 52.9 s |
| `post-wizard-bundle2.spec.ts` › PW-134 names typed during the identity read survive it and are saved | mobile-360 | 51.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 50.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 50.4 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 47.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 46.6 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 43.1 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 42.4 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 41.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 41.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39092521982-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39092521982-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39092521982-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 4, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 39092521982-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39092521982-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39092521982-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39092521982-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39092521982-6
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-location')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-location')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-location')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-location')


  641 |     ).toBeVisible();
  642 |     await expect(sheet.getByTestId("listing-detail-map")).toHaveCount(0);
> 643 |     await expect(sheet.getByTestId("listing-detail-location")).toBeVisible();
      |                                                                ^
  644 |     await expect(sheet.getByTestId("listing-section-nav")).toHaveCount(0);
  645 |     await page.getByTestId("post-preview-close").click();
  646 |     await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:643:64
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-mobile-360`; this run carried 0 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-location')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-location')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-location')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-location')


  641 |     ).toBeVisible();
  642 |     await expect(sheet.getByTestId("listing-detail-map")).toHaveCount(0);
> 643 |     await expect(sheet.getByTestId("listing-detail-location")).toBeVisible();
      |                                                                ^
  644 |     await expect(sheet.getByTestId("listing-section-nav")).toHaveCount(0);
  645 |     await page.getByTestId("post-preview-close").click();
  646 |     await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:643:64
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×9
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
