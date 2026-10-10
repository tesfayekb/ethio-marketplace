# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38015592524
- Commit: `c4efd3d8d2b6379f3a9755ca3ed257b5c724822f`
- Attempt: 1
- Written (UTC): 2026-10-10T02:32:43.767Z
- Passed: 1466 · Skipped: 123 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dobmyg: e<n>e_par_<n>tnnr<n> → e<n>e_chi_<n>pdsio` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-sa<n>ix<n>: e<n>e_par_dhmotn → e<n>e_chi_<n>whak` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dobmyg: e<n>e_par_<n>tnnr<n> → e<n>e_chi_<n>pdsio ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-sa<n>ix<n>: e<n>e_par_dhmotn → e<n>e_chi_<n>whak ×1

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
| smoke | 2026-10-10T02:05:23.078Z | 13.7 min |
| email | 2026-10-10T02:05:25.357Z | 0.2 min |
| shard 1 | 2026-10-10T02:05:28.769Z | 24.0 min |
| shard 2 | 2026-10-10T02:05:44.683Z | 25.0 min |
| shard 3 | 2026-10-10T02:05:28.310Z | 21.1 min |
| shard 4 | 2026-10-10T02:05:38.102Z | 26.7 min |
| shard 5 | 2026-10-10T02:05:24.520Z | 20.7 min |
| shard 6 | 2026-10-10T02:05:24.284Z | 17.9 min |
| changed | 2026-10-10T02:05:26.746Z | 3.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 20.3 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 17.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 15.6 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 40 | 12.4 min | shard 2, shard 5, changed |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.3 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 46 | 10.8 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 9.8 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 9.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.8 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.8 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 8.6 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.4 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.3 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 5.3 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.9 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 4.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 12 | 2.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 4, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-pricing.spec.ts` › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) | mobile-360 | 47.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 46.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 46.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 42.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 40.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 39.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 38.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 37.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 37.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 37.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 36.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 36.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 35.8 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | mobile-360 | 35.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38015592524-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38015592524-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38015592524-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 38015592524-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38015592524-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38015592524-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38015592524-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38015592524-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38015592524-changed
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')


  346 |     await expect(page.getByTestId("post-step-7")).toBeVisible();
  347 |     await page.getByTestId("post-next").click();
> 348 |     await expect(page.getByTestId("post-step-8")).toBeVisible();
      |                                                   ^
  349 |   }
  350 |
  351 |   const reviewPrice = (page: Page) =>
    at pricingToReview (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:348:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-mobile-360`

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```
