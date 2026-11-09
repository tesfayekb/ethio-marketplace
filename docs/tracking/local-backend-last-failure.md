# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42572874016
- Commit: `f6f3ec4019ffc13b6cae73ac54eece0290514f13`
- Attempt: 1
- Written (UTC): 2026-11-09T06:45:29.851Z
- Passed: 2796 · Skipped: 402 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

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
| smoke | 2026-11-09T06:27:36.881Z | 12.4 min |
| email | 2026-11-09T06:28:10.044Z | 0.3 min |
| shard 1 | 2026-11-09T06:28:35.433Z | 14.4 min |
| shard 2 | 2026-11-09T06:27:50.622Z | 16.6 min |
| shard 3 | 2026-11-09T06:28:03.804Z | 8.7 min |
| shard 4 | 2026-11-09T06:28:21.809Z | 12.9 min |
| shard 5 | 2026-11-09T06:28:51.988Z | 11.2 min |
| shard 6 | 2026-11-09T06:28:22.286Z | 13.7 min |
| shard 7 | 2026-11-09T06:27:39.581Z | 3.6 min |
| shard 8 | 2026-11-09T06:30:00.968Z | 9.0 min |
| shard 9 | 2026-11-09T06:28:11.421Z | 13.2 min |
| shard 10 | 2026-11-09T06:29:26.288Z | 15.0 min |
| shard 11 | 2026-11-09T06:28:02.971Z | 9.8 min |
| shard 12 | 2026-11-09T06:31:18.475Z | 12.1 min |
| shard 13 | 2026-11-09T06:28:26.346Z | 8.7 min |
| shard 14 | 2026-11-09T06:28:44.420Z | 13.6 min |
| shard 15 | 2026-11-09T06:29:14.109Z | 4.7 min |
| shard 16 | 2026-11-09T06:28:46.930Z | 8.0 min |
| repeat | 2026-11-09T06:32:14.522Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.7 min | smoke, shard 8, shard 16 |
| `admin-monetisation.spec.ts` | 96 | 14.5 min | shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.1 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 6, shard 14 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 6, shard 14 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.3 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `admin-roles.spec.ts` | 28 | 4.2 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.1 min | shard 2, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 6, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 76 | 3.9 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-screening.spec.ts` | 54 | 3.7 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 3.5 min | shard 3, shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 2, shard 10 |
| `admin-guides.spec.ts` | 42 | 3.0 min | shard 2, shard 10, repeat |
| `ad-page.spec.ts` | 78 | 3.0 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 6, shard 14 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `choice-lists.spec.ts` | 96 | 2.4 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 2.1 min | shard 4, shard 12 |
| `admin-countries.spec.ts` | 18 | 2.0 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 20 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 5, shard 13 |
| `dialogs.spec.ts` | 14 | 1.3 min | shard 3, shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `my-listings-promote.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 12 | 0.6 min | shard 1, shard 9, repeat |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `feed-route.spec.ts` | 66 | 0.5 min | shard 3, shard 11, repeat |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.4 min | shard 2, shard 10 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `dark-cards.spec.ts` | 12 | 0.2 min | shard 3, shard 11, repeat |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | desktop-1280 | 62.6 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | mobile-360 | 62.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 48.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | desktop-1280 | 32.3 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | desktop-1280 | 32.0 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | desktop-1280 | 31.9 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | mobile-360 | 31.9 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | mobile-360 | 31.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42572874016-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42572874016-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42572874016-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42572874016-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42572874016-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42572874016-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42572874016-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42572874016-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42572874016-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42572874016-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42572874016-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42572874016-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42572874016-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42572874016-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42572874016-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42572874016-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42572874016-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42572874016-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42572874016-local-repeat
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_local2_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_local2_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_local10_0_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_local10_0_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_2_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_2_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_4_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_4_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_6_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_6_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
```

## Server errors: shard 10

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
```
