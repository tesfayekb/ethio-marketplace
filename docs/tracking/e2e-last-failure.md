# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40260842584
- Commit: `ba37841d81e43ec78123c49eb27f6fcd1f849e05`
- Attempt: 1
- Written (UTC): 2026-10-26T03:09:27.733Z
- Passed: 2200 · Skipped: 155 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 6` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-94 a listing card prints its price period — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-94 a listing card prints its price period

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-price"]')
Expected: "day"
Error: strict mode violation: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-price"]') resolved to 2 elements:
    1) <span data-period="day" data-testid="listing-card-price">500 ETB per day</span> aka getByTestId('shell-stack').getByTestId('listing-card-link')
    2) <span data-period="day" data-testid="listing-card-price">500 ETB per day</span> aka locator('section').filter({ hasText: 'All listingse2e-cat-listing-' }).getByTestId('listing-card-price')

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-price"]')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-price"]')
Expected: "day"
Error: strict mode violation: locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-price"]') resolved to 2 elements:
    1) <span data-period="day" data-testid="listing-card-price">500 ETB per day</span> aka getByTestId('shell-stack').getByTestId('listing-card-link')
    2) <span data-period="day" data-testid="listing-card-price">500 ETB per day</span> aka locator('section').filter({ hasText: 'All listingse2e-cat-listing-' }).getByTestId('listing-card-price')

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="[account id]"] [data-testid="listing-card-price"]')


  458 |       `[data-testid="listing-card"][data-listing="${listingId}"] [data-testid="listing-card-price"]`,
  459 |     );
> 460 |     await expect(price).toHaveAttribute("data-period", "day");
      |                         ^
  461 |     await expect(price).toContainText("per day");
  462 |   });
  463 |
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-94-a-listing-card-prints-its-price-period-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-1bbcb-ard-prints-its-price-period-mobile-360`; this run carried 2 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-26T02:57:14.378Z | 11.6 min |
| email | 2026-10-26T02:53:57.263Z | 0.3 min |
| shard 1 | 2026-10-26T02:50:19.955Z | 8.5 min |
| shard 2 | 2026-10-26T02:50:23.938Z | 13.2 min |
| shard 3 | 2026-10-26T02:50:02.406Z | 11.8 min |
| shard 4 | 2026-10-26T02:54:50.362Z | 8.1 min |
| shard 5 | 2026-10-26T02:50:20.979Z | 6.8 min |
| shard 6 | 2026-10-26T02:49:57.615Z | 8.8 min |
| shard 7 | 2026-10-26T02:54:35.571Z | 6.4 min |
| shard 8 | 2026-10-26T02:50:15.963Z | 7.5 min |
| shard 9 | 2026-10-26T02:50:31.677Z | 9.8 min |
| shard 10 | 2026-10-26T02:49:53.646Z | 10.8 min |
| shard 11 | 2026-10-26T02:50:28.491Z | 12.9 min |
| shard 12 | 2026-10-26T02:52:45.098Z | 7.8 min |
| shard 13 | 2026-10-26T02:50:17.025Z | 7.3 min |
| shard 14 | 2026-10-26T02:49:54.659Z | 8.1 min |
| shard 15 | 2026-10-26T02:50:02.544Z | 5.6 min |
| shard 16 | 2026-10-26T02:50:16.458Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 428 | 18.2 min | smoke, shard 8, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.5 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 3, shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 7, shard 15 |
| `admin-roles.spec.ts` | 26 | 4.1 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `auth-signout.spec.ts` | 56 | 4.0 min | smoke, shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `post-wizard-place.spec.ts` | 38 | 3.7 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 76 | 3.0 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 2.8 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 2.7 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 7, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 2.2 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.1 min | shard 6, shard 14 |
| `admin-translations-governance.spec.ts` | 8 | 2.0 min | shard 3, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 3, shard 11 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.3 min | shard 6, shard 14 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40260842584-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 40260842584-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40260842584-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40260842584-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40260842584-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40260842584-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40260842584-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40260842584-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40260842584-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40260842584-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40260842584-local-16
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: TR-31: the delete confirmation is not red

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: TR-31: the delete confirmation is not red

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1185 |       // Bundle 11 A3 (G29, the Reject-red class) — the button that confirms
  1186 |       // the destruction is drawn red.
> 1187 |       await expect
       |       ^
  1188 |         .poll(async () => isRedFill(await fillOf(submit)), {
  1189 |           message: "TR-31: the delete confirmation is not red",
  1190 |         })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1187:7
```

Context:

```text
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - alertdialog "Delete E2E (zzq-3600tr31)?" [ref=e2]:
    - generic [ref=e3]:
      - heading "Delete E2E (zzq-3600tr31)?" [level=2] [ref=e4]
      - paragraph [ref=e5]: This permanently removes the language and everything stored under it. It cannot be undone.
    - paragraph [ref=e6]: 2 interface strings · 0 content names · 0 history entries · 0 translator assignments
    - generic [ref=e7]:
      - generic [ref=e8]: Type zzq-3600tr31 to confirm
      - textbox "Type zzq-3600tr31 to confirm" [active] [ref=e9]: zzq-3600tr31
    - generic [ref=e10]:
      - button "Cancel" [ref=e11] [cursor=pointer]
      - button "Delete language" [ref=e12] [cursor=pointer]
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
