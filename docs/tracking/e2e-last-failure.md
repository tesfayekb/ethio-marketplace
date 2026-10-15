# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38775325452
- Commit: `eee5d6cdc11ee8a3a5febf5daa8532784d2b511f`
- Attempt: 1
- Written (UTC): 2026-10-15T17:50:24.138Z
- Passed: 1772 · Skipped: 126 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>n<n>jg: e<n>e_par_p<n>qjdz → e<n>e_chi_<n>y<n>lww` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qnxsa<n>: e<n>e_par_tvtod<n> → e<n>e_chi_xcp<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>n<n>jg: e<n>e_par_p<n>qjdz → e<n>e_chi_<n>y<n>lww ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qnxsa<n>: e<n>e_par_tvtod<n> → e<n>e_chi_xcp<n> ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · no Settings item leaks into the mobile category menu ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-101 a phone number in a free-text answer is refused at its field ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

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
| smoke | 2026-10-15T17:13:32.722Z | 14.5 min |
| email | 2026-10-15T17:14:22.472Z | 0.4 min |
| shard 1 | 2026-10-15T17:13:38.365Z | 36.4 min |
| shard 2 | 2026-10-15T17:13:28.404Z | 31.7 min |
| shard 3 | 2026-10-15T17:13:31.921Z | 33.9 min |
| shard 4 | 2026-10-15T17:13:31.314Z | 36.1 min |
| shard 5 | 2026-10-15T17:13:24.286Z | 34.2 min |
| shard 6 | 2026-10-15T17:13:44.675Z | 29.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 24.3 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.9 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 20.7 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 18.6 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 16.5 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 50 | 14.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 60 | 12.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 11.8 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 11.5 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.8 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 30 | 10.1 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 10.1 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.2 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.7 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 7.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 26 | 6.1 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 5.4 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 4.4 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 61.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 55.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 53.1 s |
| `admin-screening.spec.ts` › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188) | desktop-1280 | 53.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 51.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.9 s |
| `admin-screening.spec.ts` › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188) | mobile-360 | 48.6 s |
| `admin-listings.spec.ts` › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169) | desktop-1280 | 47.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 46.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.6 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | mobile-360 | 43.3 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 43.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 42.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38775325452-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38775325452-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38775325452-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38775325452-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38775325452-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38775325452-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38775325452-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38775325452-6
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-1-znnwoz"
Received: "e2e-screen-1-fctj5v"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-1-fctj5v</h2>
       - unexpected value "e2e-screen-1-fctj5v"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-1-znnwoz"
Received: "e2e-screen-1-fctj5v"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-1-fctj5v</h2>
       - unexpected value "e2e-screen-1-fctj5v"


  1401 |     );
  1402 |     await expect(sheet.getByTestId("admin-screening-edit-panel")).toHaveCount(0);
> 1403 |     await expect(sheet.getByTestId("listing-detail-title")).toHaveText(corrected);
       |                                                             ^
  1404 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "screening" });
  1405 |
```

Context:

```text
          - heading "Description" [level=3] [ref=e314]
          - paragraph [ref=e315]: e2e scratch listing for the screening queue
        - generic [ref=e316]:
          - generic [ref=e317]:
            - heading "Seller" [level=3] [ref=e318]
            - paragraph [ref=e319]: eseller_yqsfkqke
          - generic [ref=e320]:
            - heading "Contact the seller" [level=4] [ref=e321]
            - list [ref=e322]:
              - listitem [ref=e323]:
                - generic [ref=e324]: Messages on ethio.com
        - paragraph [ref=e327]: The map of this place opens with the listing.
      - generic [ref=e328]:
        - status [ref=e329]: "Saved. The seller is told what changed: Title."
        - button "Edit" [ref=e330] [cursor=pointer]
        - link "Open the ad's page" [ref=e331] [cursor=pointer]:
          - /url: /admin/listings/31a34e12-9a0d-4535-b702-aae5e6bfb78f
        - button "Approve" [ref=e332] [cursor=pointer]
        - button "Reject" [ref=e333] [cursor=pointer]
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-4-4uc4gq"
Received: "e2e-screen-4-xxqvql"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-4-xxqvql</h2>
       - unexpected value "e2e-screen-4-xxqvql"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-4-4uc4gq"
Received: "e2e-screen-4-xxqvql"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-4-xxqvql</h2>
       - unexpected value "e2e-screen-4-xxqvql"


  1401 |     );
  1402 |     await expect(sheet.getByTestId("admin-screening-edit-panel")).toHaveCount(0);
> 1403 |     await expect(sheet.getByTestId("listing-detail-title")).toHaveText(corrected);
       |                                                             ^
  1404 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "screening" });
  1405 |
```

Context:

```text
          - heading "Description" [level=3] [ref=e338]
          - paragraph [ref=e339]: e2e scratch listing for the screening queue
        - generic [ref=e340]:
          - generic [ref=e341]:
            - heading "Seller" [level=3] [ref=e342]
            - paragraph [ref=e343]: eseller_twqpqqqp
          - generic [ref=e344]:
            - heading "Contact the seller" [level=4] [ref=e345]
            - list [ref=e346]:
              - listitem [ref=e347]:
                - generic [ref=e348]: Messages on ethio.com
        - paragraph [ref=e351]: The map of this place opens with the listing.
      - generic [ref=e352]:
        - status [ref=e353]: "Saved. The seller is told what changed: Title."
        - button "Edit" [ref=e354] [cursor=pointer]
        - link "Open the ad's page" [ref=e355] [cursor=pointer]:
          - /url: /admin/listings/926fd0d3-0db7-4bc6-922c-3e443fdfbd2f
        - button "Approve" [ref=e356] [cursor=pointer]
        - button "Reject" [ref=e357] [cursor=pointer]
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-qnxsa0: e2e_par_tvtod7 → e2e_chi_xcp270
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:34181:25) at http://127.0.0.1:4173/assets/index-CbFvrlPg.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5)
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-22n2jg: e2e_par_p8qjdz → e2e_chi_0y6lww
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
