# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45171123972
- Commit: `701957d63f0ae25fee414e4ec17fb82d1569fe45`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-23T12:33:10.189Z
- Passed: 2598 · Skipped: 360 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 11` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 11`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  710 |     mark("specifications answered");
  711 |     await nextThroughPhotos(page);
> 712 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
      |                                                   ^
  713 |     await page.getByTestId("post-price-mode-free").click();
  714 |     await page.getByTestId("post-next").click();
  715 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:712:51
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 2 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-23T12:10:03.092Z | 4.8 min |
| email | 2026-11-23T12:11:27.550Z | 0.3 min |
| webkit | 2026-11-23T12:23:25.471Z | 9.3 min |
| shard 1 | 2026-11-23T12:11:54.057Z | 5.5 min |
| shard 2 | 2026-11-23T12:10:11.680Z | 5.9 min |
| shard 3 | 2026-11-23T12:10:24.503Z | 7.1 min |
| shard 4 | 2026-11-23T12:10:39.295Z | 7.7 min |
| shard 5 | 2026-11-23T12:13:00.416Z | 6.1 min |
| shard 6 | 2026-11-23T12:10:13.642Z | 5.6 min |
| shard 7 | 2026-11-23T12:12:56.114Z | 5.3 min |
| shard 8 | 2026-11-23T12:13:32.148Z | 5.6 min |
| shard 9 | 2026-11-23T12:13:01.408Z | 6.3 min |
| shard 10 | 2026-11-23T12:12:46.260Z | 5.8 min |
| shard 11 | 2026-11-23T12:14:48.957Z | 6.0 min |
| shard 12 | 2026-11-23T12:10:37.412Z | 5.8 min |
| shard 13 | 2026-11-23T12:11:44.303Z | 4.9 min |
| shard 14 | 2026-11-23T12:12:16.184Z | 5.3 min |
| shard 15 | 2026-11-23T12:18:02.539Z | 6.4 min |
| shard 16 | 2026-11-23T12:12:27.968Z | 6.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `import-security.spec.ts` | 36 | 7.4 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.0 min | shard 3 |
| `admin-listings.spec.ts` | 82 | 5.5 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `admin-users.spec.ts` | 28 | 5.0 min | shard 16 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-screening.spec.ts` | 64 | 4.8 min | webkit, shard 14 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 10 |
| `admin-locations.spec.ts` | 44 | 4.6 min | shard 6 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | smoke, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.6 min | smoke, shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `post-wizard-category.spec.ts` | 52 | 3.5 min | webkit, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.9 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 2 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `mfa-stepup.spec.ts` | 28 | 2.3 min | webkit, shard 15 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `house-style.spec.ts` | 14 | 0.7 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 61.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 54.0 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 52.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.1 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.9 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45171123972-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45171123972-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45171123972-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45171123972-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45171123972-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45171123972-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45171123972-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45171123972-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45171123972-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45171123972-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45171123972-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45171123972-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45171123972-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45171123972-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45171123972-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45171123972-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45171123972-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 2, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45171123972-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 24 user(s) owned by process 45171123972-local-16
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Active"
Received: "Deactivated"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">Deactivated</div>
       - unexpected value "Deactivated"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Active"
Received: "Deactivated"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80">Deactivated</div>
       - unexpected value "Deactivated"


  227 |     await stepUpIfPrompted(page, secret);
  228 |     await expectAal2(page);
> 229 |     await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      |                                                                                   ^
  230 |       en["admin.users.status.active"],
  231 |       { timeout: 15000 },
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
      - navigation "Legal" [ref=e311]:
        - heading "Legal" [level=2] [ref=e312]
        - list [ref=e313]:
          - listitem [ref=e314]:
            - link "Terms" [ref=e315] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e316]:
            - link "Privacy" [ref=e317] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e319]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
```
