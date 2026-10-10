# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38093041404
- Commit: `7c3953aebb964be8cab2ee3a69f934c220291012`
- Attempt: 1
- Written (UTC): 2026-10-10T23:24:09.657Z
- Passed: 1563 · Skipped: 126 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')


  464 |     await expect(page.getByTestId("country-rail-dialog")).toHaveCount(0);
  465 |     await actionsOf(page, "ET").getByTestId("country-actions-ET-more").click();
> 466 |     await expect(page.getByTestId("country-actions-ET-more-close")).toBeVisible();
      |                                                                     ^
  467 |     await expect(page.getByTestId("country-actions-ET-more-open")).toHaveCount(0);
  468 |     await page.keyboard.press("Escape");
  469 |     await expect(page.getByTestId("country-actions-ET-menu")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:466:69
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: How it works
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
          - listitem [ref=e311]:
            - generic [ref=e312]: Contact
      - navigation "Legal" [ref=e313]:
        - heading "Legal" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Terms
          - listitem [ref=e318]:
            - generic [ref=e319]: Privacy
    - paragraph [ref=e321]: © 2026 ethio.com — All rights reserved.
```
```

### admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-changed-6-lt7r-mpqwr8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-changed-6-lt7r-mpqwr8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-changed-6-lt7r-mpqwr8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-changed-6-lt7r-mpqwr8')


  726 |       // A second undo of the same batch is refused by name.
  727 |       await page.getByTestId("location-import-close").click();
> 728 |       await expect(locationRow(page, `${ANCHOR}/${regionSlug}`)).toBeVisible();
      |                                                                  ^
  729 |     } finally {
  730 |       await destroyLocation(regionSlug);
  731 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:728:66
```

Context:

```text
          - listitem [ref=e962]:
            - generic [ref=e963]: About
          - listitem [ref=e964]:
            - generic [ref=e965]: How it works
      - navigation "Help" [ref=e966]:
        - heading "Help" [level=2] [ref=e967]
        - list [ref=e968]:
          - listitem [ref=e969]:
            - generic [ref=e970]: Safety
          - listitem [ref=e971]:
            - generic [ref=e972]: Contact
      - navigation "Legal" [ref=e973]:
        - heading "Legal" [level=2] [ref=e974]
        - list [ref=e975]:
          - listitem [ref=e976]:
            - generic [ref=e977]: Terms
          - listitem [ref=e978]:
            - generic [ref=e979]: Privacy
    - paragraph [ref=e981]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bkupy: e<n>e_par_vtw<n>f<n> → e<n>e_chi_ez<n>lsl` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ix<n>t: e<n>e_par_a<n>txm<n> → e<n>e_chi_fbqkbw` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bkupy: e<n>e_par_vtw<n>f<n> → e<n>e_chi_ez<n>lsl ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ix<n>t: e<n>e_par_a<n>txm<n> → e<n>e_chi_fbqkbw ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

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
| smoke | 2026-10-10T22:54:06.948Z | 14.3 min |
| email | 2026-10-10T22:54:16.184Z | 0.3 min |
| shard 1 | 2026-10-10T22:54:18.459Z | 29.5 min |
| shard 2 | 2026-10-10T22:54:17.661Z | 25.6 min |
| shard 3 | 2026-10-10T22:54:09.507Z | 20.5 min |
| shard 4 | 2026-10-10T22:54:10.695Z | 27.1 min |
| shard 5 | 2026-10-10T22:54:07.199Z | 24.1 min |
| shard 6 | 2026-10-10T22:54:06.792Z | 20.6 min |
| changed | 2026-10-10T22:54:09.578Z | 9.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 20.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 17.9 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 17.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 76 | 14.7 min | shard 1, shard 4, changed |
| `admin-categories-lifecycle.spec.ts` | 48 | 12.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 46 | 11.4 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.9 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 9.9 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 9.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 9.4 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.0 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 8.4 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 8.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 36 | 8.2 min | shard 1, shard 4, changed |
| `admin-attributes-links.spec.ts` | 30 | 8.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.7 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 30 | 6.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.2 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 5.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.8 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 4.5 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 28 | 3.1 min | shard 1, shard 4, changed |
| `admin-categories-home.spec.ts` | 8 | 2.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 2.1 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | desktop-1280 | 64.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 52.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 44.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 42.0 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | mobile-360 | 38.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 38.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 37.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 36.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 34.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38093041404-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38093041404-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 6, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38093041404-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 38093041404-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38093041404-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 6, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38093041404-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38093041404-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38093041404-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38093041404-changed
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')


  464 |     await expect(page.getByTestId("country-rail-dialog")).toHaveCount(0);
  465 |     await actionsOf(page, "ET").getByTestId("country-actions-ET-more").click();
> 466 |     await expect(page.getByTestId("country-actions-ET-more-close")).toBeVisible();
      |                                                                     ^
  467 |     await expect(page.getByTestId("country-actions-ET-more-open")).toHaveCount(0);
  468 |     await page.keyboard.press("Escape");
  469 |     await expect(page.getByTestId("country-actions-ET-menu")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:466:69
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: How it works
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
          - listitem [ref=e372]:
            - generic [ref=e373]: Contact
      - navigation "Legal" [ref=e374]:
        - heading "Legal" [level=2] [ref=e375]
        - list [ref=e376]:
          - listitem [ref=e377]:
            - generic [ref=e378]: Terms
          - listitem [ref=e379]:
            - generic [ref=e380]: Privacy
    - paragraph [ref=e382]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')


  464 |     await expect(page.getByTestId("country-rail-dialog")).toHaveCount(0);
  465 |     await actionsOf(page, "ET").getByTestId("country-actions-ET-more").click();
> 466 |     await expect(page.getByTestId("country-actions-ET-more-close")).toBeVisible();
      |                                                                     ^
  467 |     await expect(page.getByTestId("country-actions-ET-more-open")).toHaveCount(0);
  468 |     await page.keyboard.press("Escape");
  469 |     await expect(page.getByTestId("country-actions-ET-menu")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:466:69
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: How it works
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
          - listitem [ref=e311]:
            - generic [ref=e312]: Contact
      - navigation "Legal" [ref=e313]:
        - heading "Legal" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Terms
          - listitem [ref=e318]:
            - generic [ref=e319]: Privacy
    - paragraph [ref=e321]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-actions-ET-more-close')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('country-actions-ET-more-close')


  464 |     await expect(page.getByTestId("country-rail-dialog")).toHaveCount(0);
  465 |     await actionsOf(page, "ET").getByTestId("country-actions-ET-more").click();
> 466 |     await expect(page.getByTestId("country-actions-ET-more-close")).toBeVisible();
      |                                                                     ^
  467 |     await expect(page.getByTestId("country-actions-ET-more-open")).toHaveCount(0);
  468 |     await page.keyboard.press("Escape");
  469 |     await expect(page.getByTestId("country-actions-ET-menu")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:466:69
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: How it works
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
          - listitem [ref=e372]:
            - generic [ref=e373]: Contact
      - navigation "Legal" [ref=e374]:
        - heading "Legal" [level=2] [ref=e375]
        - list [ref=e376]:
          - listitem [ref=e377]:
            - generic [ref=e378]: Terms
          - listitem [ref=e379]:
            - generic [ref=e380]: Privacy
    - paragraph [ref=e382]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-37ix7t: e2e_par_a8txm3 → e2e_chi_fbqkbw
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
