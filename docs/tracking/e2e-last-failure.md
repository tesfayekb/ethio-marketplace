# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42562258710
- Commit: `f7baa4063553326c5e7c8a91494d7cbae7e98102`
- Attempt: 1
- Written (UTC): 2026-11-09T04:54:21.548Z
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
| smoke | 2026-11-09T04:34:38.783Z | 13.8 min |
| email | 2026-11-09T04:34:09.475Z | 0.3 min |
| shard 1 | 2026-11-09T04:34:06.999Z | 13.5 min |
| shard 2 | 2026-11-09T04:34:27.758Z | 19.1 min |
| shard 3 | 2026-11-09T04:34:40.188Z | 9.8 min |
| shard 4 | 2026-11-09T04:34:05.235Z | 10.2 min |
| shard 5 | 2026-11-09T04:34:16.216Z | 9.3 min |
| shard 6 | 2026-11-09T04:33:46.371Z | 10.9 min |
| shard 7 | 2026-11-09T04:36:55.353Z | 3.2 min |
| shard 8 | 2026-11-09T04:33:44.784Z | 8.0 min |
| shard 9 | 2026-11-09T04:35:09.927Z | 15.3 min |
| shard 10 | 2026-11-09T04:34:10.881Z | 15.6 min |
| shard 11 | 2026-11-09T04:34:23.029Z | 12.5 min |
| shard 12 | 2026-11-09T04:34:25.323Z | 13.0 min |
| shard 13 | 2026-11-09T04:34:34.653Z | 9.8 min |
| shard 14 | 2026-11-09T04:35:10.794Z | 13.4 min |
| shard 15 | 2026-11-09T04:36:01.668Z | 4.5 min |
| shard 16 | 2026-11-09T04:33:51.326Z | 7.7 min |
| repeat | 2026-11-09T04:34:25.159Z | 9.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.9 min | smoke, shard 8, shard 16 |
| `admin-listings.spec.ts` | 228 | 14.5 min | shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.8 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 5, shard 13 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.8 min | shard 2, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 2, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 4, shard 12 |
| `admin-screening.spec.ts` | 54 | 4.2 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 4.0 min | shard 4, shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 3.7 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `admin-monetisation.spec.ts` | 32 | 3.4 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 78 | 3.3 min | shard 1, shard 9 |
| `choice-lists.spec.ts` | 96 | 3.2 min | shard 3, shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.6 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 7, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-guides.spec.ts` | 14 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `dialogs.spec.ts` | 14 | 1.7 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 9 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `sage-tiers.spec.ts` | 40 | 0.9 min | shard 7, shard 15 |
| `my-listings-promote.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `submenu.spec.ts` | 14 | 0.2 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.2 min | shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-guides.spec.ts` › AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not | mobile-360 | 46.5 s |
| `admin-guides.spec.ts` › AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not | desktop-1280 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.8 s |
| `my-listings-ad.spec.ts` › MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline | desktop-1280 | 35.2 s |
| `my-listings-ad.spec.ts` › MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline | mobile-360 | 33.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42562258710-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42562258710-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42562258710-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42562258710-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42562258710-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42562258710-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42562258710-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42562258710-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42562258710-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42562258710-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42562258710-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42562258710-local-repeat
```

## admin-guides.spec.ts › Admin › the Guide on every block (P-1c, D313) › AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
    14 × locator resolved to 3 elements
       - unexpected value "3"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
    14 × locator resolved to 3 elements
       - unexpected value "3"


  161 |     // Monetisation: four Guides on the page; a product's open row brings its two inner tables' Guides.
  162 |     await openConsole(page);
> 163 |     await expect(guideControls(page)).toHaveCount(4);
      |                                       ^
  164 |     const level = productToggle(page, await firstLevel());
  165 |     await level.click();
```

Context:

```text
          - listitem [ref=e743]:
            - generic [ref=e744]: About
          - listitem [ref=e745]:
            - generic [ref=e746]: Contact
      - navigation "Help" [ref=e747]:
        - heading "Help" [level=2] [ref=e748]
        - list [ref=e749]:
          - listitem [ref=e750]:
            - generic [ref=e751]: Safety
      - navigation "Legal" [ref=e752]:
        - heading "Legal" [level=2] [ref=e753]
        - list [ref=e754]:
          - listitem [ref=e755]:
            - link "Terms" [ref=e756] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e757]:
            - link "Privacy" [ref=e758] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e760]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-photos-count')
Expected: "0 of 8"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('post-photos-count')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-photos-count')
Expected: "0 of 8"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('post-photos-count')


  1429 |     await page.locator('[data-testid="post-review-edit"][data-step="2"]').click();
  1430 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 15000 });
> 1431 |     await expect(page.getByTestId("post-photos-count")).toHaveText(
       |                                                         ^
  1432 |       en["post.photos.count"].replace("{count}", "0").replace("{max}", String(own.data)),
  1433 |       { timeout: 15000 },
  1434 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1431:57
```

Context:

```text
          - listitem [ref=e284]:
            - generic [ref=e285]: About
          - listitem [ref=e286]:
            - generic [ref=e287]: Contact
      - navigation "Help" [ref=e288]:
        - heading "Help" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Safety
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - link "Terms" [ref=e297] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e298]:
            - link "Privacy" [ref=e299] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-193 an ad at nationwide reach has room for a second city and says no city limit

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"
--- further error 1 ---
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"

   at helpers/listing-seed.ts:275

  273 |   const columns = options.select ? `id,tier,${options.select}` : "id,tier";
  274 |   const { data, error } = await write.select(columns).maybeSingle();
> 275 |   if (error) throw new Error(`[e2e:${options.tag}] updating the listing failed: ${error.message}`);
      |                    ^
  276 |   return data === null ? null : seededOf(data, options.tag);
  277 | }
  278 |
    at updateListingRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/listing-seed.ts:275:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1286:5
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-193-an-ad-at-nationwide-reach-has-room-for-a-second-city-and-says-no-city-limit-mobile-360` — Playwright's name `post-wizard-place-POSTING--6485b-city-and-says-no-city-limit-mobile-360`; this run carried 8 context file(s); of the same spec: none

## admin-guides.spec.ts › Admin › the Guide on every block (P-1c, D313) › AG-1 every admin section draws; every table's toolbar holds exactly one Guide whose frame carries the anchor; no Guide points at a frame the page has not

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
    14 × locator resolved to 3 elements
       - unexpected value "3"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid$="-guide"][aria-haspopup="dialog"]')
    14 × locator resolved to 3 elements
       - unexpected value "3"


  161 |     // Monetisation: four Guides on the page; a product's open row brings its two inner tables' Guides.
  162 |     await openConsole(page);
> 163 |     await expect(guideControls(page)).toHaveCount(4);
      |                                       ^
  164 |     const level = productToggle(page, await firstLevel());
  165 |     await level.click();
```

Context:

```text
          - listitem [ref=e674]:
            - generic [ref=e675]: About
          - listitem [ref=e676]:
            - generic [ref=e677]: Contact
      - navigation "Help" [ref=e678]:
        - heading "Help" [level=2] [ref=e679]
        - list [ref=e680]:
          - listitem [ref=e681]:
            - generic [ref=e682]: Safety
      - navigation "Legal" [ref=e683]:
        - heading "Legal" [level=2] [ref=e684]
        - list [ref=e685]:
          - listitem [ref=e686]:
            - link "Terms" [ref=e687] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e688]:
            - link "Privacy" [ref=e689] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e691]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-19 INC-1080: an ad on a level opens its Edit's photo box at the ad's own cap, never the schema's baseline

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-photos-count')
Expected: "0 of 8"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('post-photos-count')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-photos-count')
Expected: "0 of 8"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('post-photos-count')


  1429 |     await page.locator('[data-testid="post-review-edit"][data-step="2"]').click();
  1430 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 15000 });
> 1431 |     await expect(page.getByTestId("post-photos-count")).toHaveText(
       |                                                         ^
  1432 |       en["post.photos.count"].replace("{count}", "0").replace("{max}", String(own.data)),
  1433 |       { timeout: 15000 },
  1434 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1431:57
```

Context:

```text
          - listitem [ref=e336]:
            - generic [ref=e337]: About
          - listitem [ref=e338]:
            - generic [ref=e339]: Contact
      - navigation "Help" [ref=e340]:
        - heading "Help" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Safety
      - navigation "Legal" [ref=e345]:
        - heading "Legal" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - link "Terms" [ref=e349] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e350]:
            - link "Privacy" [ref=e351] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e353]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-193 an ad at nationwide reach has room for a second city and says no city limit

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"
--- further error 1 ---
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"

   at helpers/listing-seed.ts:275

  273 |   const columns = options.select ? `id,tier,${options.select}` : "id,tier";
  274 |   const { data, error } = await write.select(columns).maybeSingle();
> 275 |   if (error) throw new Error(`[e2e:${options.tag}] updating the listing failed: ${error.message}`);
      |                    ^
  276 |   return data === null ? null : seededOf(data, options.tag);
  277 | }
  278 |
    at updateListingRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/listing-seed.ts:275:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1286:5
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-193-an-ad-at-nationwide-reach-has-room-for-a-second-city-and-says-no-city-limit-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6485b-city-and-says-no-city-limit-desktop-1280`; this run carried 8 context file(s); of the same spec: none

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 10

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 12

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).
