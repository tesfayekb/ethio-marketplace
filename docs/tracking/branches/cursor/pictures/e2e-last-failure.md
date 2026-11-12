# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43319295611
- Commit: `a0c67164fecd68deb1d6fe45d666f428cce8f405`
- Attempt: 1
- Lanes: ran — not docs-only: .github/workflows/local-backend-proof.yml is not a record (50 of 65 paths; diff base 77cdacf62cfdb1c5e9eb4de4d6e167ffcdfe83b2, push base c20a844dd9d2012752f85a0b6b1830d6034a9f30)
- Repeat: 38 of 1430 tests repeated — specs directly changed 3/14, importers of a changed helper 0/99; budget 720 s; the time cap left 6 test runs
- Written (UTC): 2026-11-12T23:01:45.516Z
- Passed: 2802 · Skipped: 414 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 840s for the test suite to run
(no place given)
```

```text
Timed out waiting 840s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-12T22:26:04.428Z | 12.4 min |
| email | 2026-11-12T22:26:15.780Z | 0.4 min |
| shard 1 | 2026-11-12T22:26:19.529Z | 13.6 min |
| shard 2 | 2026-11-12T22:30:26.711Z | 18.8 min |
| shard 3 | 2026-11-12T22:26:17.621Z | 8.7 min |
| shard 4 | 2026-11-12T22:26:36.867Z | 12.7 min |
| shard 5 | 2026-11-12T22:30:16.894Z | 7.9 min |
| shard 6 | 2026-11-12T22:26:35.312Z | 13.0 min |
| shard 7 | 2026-11-12T22:26:22.542Z | 4.5 min |
| shard 8 | 2026-11-12T22:26:35.390Z | 9.0 min |
| shard 9 | 2026-11-12T22:26:38.851Z | 14.4 min |
| shard 10 | 2026-11-12T22:27:35.329Z | 13.8 min |
| shard 11 | 2026-11-12T22:26:20.098Z | 11.5 min |
| shard 12 | 2026-11-12T22:26:20.507Z | 12.3 min |
| shard 13 | 2026-11-12T22:26:46.791Z | 10.4 min |
| shard 14 | 2026-11-12T22:26:12.790Z | 11.6 min |
| shard 15 | 2026-11-12T22:29:04.958Z | 4.1 min |
| shard 16 | 2026-11-12T22:27:28.421Z | 8.3 min |
| repeat | 2026-11-12T22:26:48.861Z | 14.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.8 min | smoke, shard 8, shard 16 |
| `admin-screening.spec.ts` | 170 | 13.1 min | shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.3 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 5, shard 13 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4, shard 12 |
| `dialogs.spec.ts` | 42 | 4.8 min | shard 3, shard 11, repeat |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 11 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 76 | 4.4 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 70 | 3.6 min | shard 5, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 4, shard 12 |
| `ad-page.spec.ts` | 82 | 3.4 min | shard 1, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 7, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 3, shard 11 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 5, shard 13 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.1 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `mfa-stepup.spec.ts` | 20 | 1.8 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `admin-categories-images.spec.ts` | 10 | 1.5 min | shard 2, shard 10, repeat |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 2, shard 10 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 36.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43319295611-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43319295611-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 43319295611-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 43319295611-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43319295611-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43319295611-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43319295611-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 43319295611-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43319295611-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43319295611-local-16
```

No failed tests were recorded in the JSON reporter output.
