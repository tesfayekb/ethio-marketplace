# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39147828324
- Commit: `114537ea66ef094c8b5c056ab954d538009740a7`
- Attempt: 1
- Written (UTC): 2026-10-18T18:12:54.692Z
- Passed: 2007 · Skipped: 130 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed

## Flaky bodies (DEC-078)

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "fa17ce10-d0ba-410c-a722-7d9459f4f02a"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "fa17ce10-d0ba-410c-a722-7d9459f4f02a"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1287 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1288 |     const city = page.getByTestId("post-where-city");
> 1289 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1290 |
  1291 |     // Another region, no city chosen: Save changes is drawn closed.
  1292 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1289:24
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: How it works
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
          - listitem [ref=e275]:
            - generic [ref=e276]: Contact
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Terms
          - listitem [ref=e282]:
            - generic [ref=e283]: Privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6, changed |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>z<n>o: e<n>e_par_<n>ko<n>rv → e<n>e_chi_x<n>mfes` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qav<n>je: e<n>e_par_<n>gco<n>k → e<n>e_chi_vkj<n>g<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>z<n>o: e<n>e_par_<n>ko<n>rv → e<n>e_chi_x<n>mfes ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qav<n>je: e<n>e_par_<n>gco<n>k → e<n>e_chi_vkj<n>g<n> ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×6 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · /settings shows the Account context, and returning shows categories ×1

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
| smoke | 2026-10-18T17:23:48.775Z | 18.6 min |
| email | 2026-10-18T17:23:49.033Z | 0.3 min |
| shard 1 | 2026-10-18T17:23:53.210Z | 48.6 min |
| shard 2 | 2026-10-18T17:23:43.543Z | 36.0 min |
| shard 3 | 2026-10-18T17:23:48.513Z | 39.2 min |
| shard 4 | 2026-10-18T17:23:41.322Z | 40.9 min |
| shard 5 | 2026-10-18T17:23:53.809Z | 45.6 min |
| shard 6 | 2026-10-18T17:23:48.188Z | 35.8 min |
| changed | 2026-10-18T17:23:52.365Z | 11.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `posting-routes.spec.ts` | 160 | 39.7 min | shard 3, shard 6, changed |
| `ad-page.spec.ts` | 66 | 28.1 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.4 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 20.4 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 20.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.7 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 17.5 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.9 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 14.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.5 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 13.3 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.9 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 12.0 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.7 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.6 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 10.3 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.4 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.9 min | shard 1, shard 5 |
| `import-security.spec.ts` | 36 | 7.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.1 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 14 | 7.0 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 6.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.7 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.7 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
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
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 62.7 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 56.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 52.8 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 51.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 51.4 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 50.7 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 48.7 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 48.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 47.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 47.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 45.8 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | mobile-360 | 45.6 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | mobile-360 | 45.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39147828324-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39147828324-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39147828324-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39147828324-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39147828324-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39147828324-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39147828324-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39147828324-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39147828324-changed
```

## posting-routes.spec.ts › POSTING ROUTES › PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]

  1610 |
  1611 |   function expectPasses(answer: { reasons: string[]; raw: string }) {
> 1612 |     for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
       |                                                                                ^
  1613 |   }
  1614 |
  1615 |   test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    at expectPasses (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1612:80)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1665:7
```

Context:

```text
          - listitem [ref=e262]:
            - generic [ref=e263]: About
          - listitem [ref=e264]:
            - generic [ref=e265]: How it works
      - navigation "Help" [ref=e266]:
        - heading "Help" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Safety
          - listitem [ref=e271]:
            - generic [ref=e272]: Contact
      - navigation "Legal" [ref=e273]:
        - heading "Legal" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Terms
          - listitem [ref=e278]:
            - generic [ref=e279]: Privacy
    - paragraph [ref=e281]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]

  1610 |
  1611 |   function expectPasses(answer: { reasons: string[]; raw: string }) {
> 1612 |     for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
       |                                                                                ^
  1613 |   }
  1614 |
  1615 |   test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    at expectPasses (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1612:80)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1665:7
```

Context:

```text
          - listitem [ref=e343]:
            - generic [ref=e344]: About
          - listitem [ref=e345]:
            - generic [ref=e346]: How it works
      - navigation "Help" [ref=e347]:
        - heading "Help" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Safety
          - listitem [ref=e352]:
            - generic [ref=e353]: Contact
      - navigation "Legal" [ref=e354]:
        - heading "Legal" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - generic [ref=e358]: Terms
          - listitem [ref=e359]:
            - generic [ref=e360]: Privacy
    - paragraph [ref=e362]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]

  1610 |
  1611 |   function expectPasses(answer: { reasons: string[]; raw: string }) {
> 1612 |     for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
       |                                                                                ^
  1613 |   }
  1614 |
  1615 |   test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    at expectPasses (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1612:80)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1665:7
```

Context:

```text
          - listitem [ref=e262]:
            - generic [ref=e263]: About
          - listitem [ref=e264]:
            - generic [ref=e265]: How it works
      - navigation "Help" [ref=e266]:
        - heading "Help" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: Safety
          - listitem [ref=e271]:
            - generic [ref=e272]: Contact
      - navigation "Legal" [ref=e273]:
        - heading "Legal" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Terms
          - listitem [ref=e278]:
            - generic [ref=e279]: Privacy
    - paragraph [ref=e281]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}

expect(received).not.toContain(expected) // indexOf

Expected value: not "aliasReserved"
Received array:     ["aliasReserved"]

  1610 |
  1611 |   function expectPasses(answer: { reasons: string[]; raw: string }) {
> 1612 |     for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
       |                                                                                ^
  1613 |   }
  1614 |
  1615 |   test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    at expectPasses (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1612:80)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1665:7
```

Context:

```text
          - listitem [ref=e343]:
            - generic [ref=e344]: About
          - listitem [ref=e345]:
            - generic [ref=e346]: How it works
      - navigation "Help" [ref=e347]:
        - heading "Help" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Safety
          - listitem [ref=e352]:
            - generic [ref=e353]: Contact
      - navigation "Legal" [ref=e354]:
        - heading "Legal" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - generic [ref=e358]: Terms
          - listitem [ref=e359]:
            - generic [ref=e360]: Privacy
    - paragraph [ref=e362]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
