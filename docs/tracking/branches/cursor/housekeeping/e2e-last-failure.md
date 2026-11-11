# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43116753764
- Commit: `1959f77644333211b4f80955a773e5de9c25ce8b`
- Attempt: 1
- Lanes: ran — not docs-only: .github/workflows/ci-status-report.yml is not a record (40 of 48 paths; diff base 8511aeed96f5ca9c2cba453176ab4b6fbe757a85, push base 8511aeed96f5ca9c2cba453176ab4b6fbe757a85)
- Written (UTC): 2026-11-11T23:26:54.163Z
- Passed: 2598 · Skipped: 334 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

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

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-11T23:09:42.509Z | 0.4 min |
| shard 1 | 2026-11-11T23:08:31.726Z | 12.1 min |
| shard 2 | 2026-11-11T23:08:41.030Z | 14.7 min |
| shard 3 | 2026-11-11T23:08:53.358Z | 8.7 min |
| shard 4 | 2026-11-11T23:08:24.883Z | 10.5 min |
| shard 5 | 2026-11-11T23:09:17.559Z | 10.3 min |
| shard 6 | 2026-11-11T23:10:07.449Z | 14.2 min |
| shard 7 | 2026-11-11T23:09:07.895Z | 4.6 min |
| shard 8 | 2026-11-11T23:09:14.491Z | 8.6 min |
| shard 9 | 2026-11-11T23:09:13.117Z | 13.9 min |
| shard 10 | 2026-11-11T23:09:10.071Z | 16.7 min |
| shard 11 | 2026-11-11T23:08:28.550Z | 10.2 min |
| shard 12 | 2026-11-11T23:08:47.402Z | 12.4 min |
| shard 13 | 2026-11-11T23:09:29.073Z | 9.8 min |
| shard 14 | 2026-11-11T23:09:10.464Z | 13.4 min |
| shard 15 | 2026-11-11T23:08:52.839Z | 4.4 min |
| shard 16 | 2026-11-11T23:09:11.820Z | 8.4 min |
| repeat | 2026-11-11T23:09:20.870Z | 10.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.9 min | shard 8, shard 16 |
| `admin-attributes-editor.spec.ts` | 108 | 9.9 min | shard 1, shard 9, repeat |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 5, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 5.4 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.2 min | shard 1, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 76 | 4.2 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.1 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 54 | 4.0 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 6, shard 14 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.6 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.3 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 4, shard 12 |
| `posting-routes.spec.ts` | 80 | 3.1 min | shard 6, shard 14 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 3, shard 11 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 7, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 5, shard 13 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 3, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `ad-page-doors.spec.ts` | 90 | 1.5 min | shard 1, shard 9, repeat |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | shard 2, shard 10, repeat |
| `dialogs.spec.ts` | 14 | 1.4 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-ad-page.spec.ts` | 18 | 1.1 min | shard 7, shard 15 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `admin-guides.spec.ts` | 14 | 0.9 min | shard 2, shard 10 |
| `breadcrumbs.spec.ts` | 18 | 0.9 min | shard 3, shard 11, repeat |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 1, shard 9, repeat |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43116753764-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43116753764-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43116753764-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 43116753764-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 43116753764-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43116753764-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43116753764-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43116753764-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43116753764-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43116753764-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43116753764-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43116753764-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 43116753764-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43116753764-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43116753764-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43116753764-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43116753764-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 2, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 43116753764-local-repeat
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

- Failed step: `outbound-calls-guard` (outcome failure) — ::error::Outbound-calls guard failed (INC-981); the lines are in local-backend-proof.md

```text
Outbound-calls guard FAIL: allowlist: the CLI pin is unreadable
Outbound-calls guard FAIL: allowlist: supabase_functions.http_request() expired (CLI 2.120.0, pin CLI unknown)
Outbound-calls guard FAIL: supabase_functions.http_request(): calls net.* outside job_call
Step outbound-calls-guard: outcome failure
  Outbound-calls guard FAIL: allowlist: the CLI pin is unreadable
  Outbound-calls guard FAIL: allowlist: supabase_functions.http_request() expired (CLI 2.120.0, pin CLI unknown)
  Outbound-calls guard FAIL: supabase_functions.http_request(): calls net.* outside job_call
  ::error::Outbound-calls guard failed (INC-981); the lines are in local-backend-proof.md
```

```text
(no log tail was uploaded for this source)
```
