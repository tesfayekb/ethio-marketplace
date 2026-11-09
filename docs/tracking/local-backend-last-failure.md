# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42587592780
- Commit: `2d5d503262b83a0deeaa58ae9e8d75b20064c05a`
- Attempt: 1
- Written (UTC): 2026-11-09T09:02:34.711Z
- Passed: 2804 · Skipped: 402 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
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
| smoke | 2026-11-09T08:43:21.745Z | 14.0 min |
| email | 2026-11-09T08:43:24.445Z | 0.4 min |
| shard 1 | 2026-11-09T08:43:19.390Z | 12.5 min |
| shard 2 | 2026-11-09T08:43:36.817Z | 18.5 min |
| shard 3 | 2026-11-09T08:43:34.794Z | 8.6 min |
| shard 4 | 2026-11-09T08:43:26.619Z | 12.9 min |
| shard 5 | 2026-11-09T08:43:21.036Z | 11.2 min |
| shard 6 | 2026-11-09T08:43:18.124Z | 11.7 min |
| shard 7 | 2026-11-09T08:43:42.447Z | 4.9 min |
| shard 8 | 2026-11-09T08:42:55.947Z | 7.9 min |
| shard 9 | 2026-11-09T08:45:56.414Z | 14.8 min |
| shard 10 | 2026-11-09T08:44:03.718Z | 16.8 min |
| shard 11 | 2026-11-09T08:43:11.312Z | 11.2 min |
| shard 12 | 2026-11-09T08:46:05.755Z | 12.4 min |
| shard 13 | 2026-11-09T08:43:38.829Z | 10.4 min |
| shard 14 | 2026-11-09T08:43:20.533Z | 13.8 min |
| shard 15 | 2026-11-09T08:43:14.287Z | 3.0 min |
| shard 16 | 2026-11-09T08:43:20.201Z | 8.5 min |
| repeat | 2026-11-09T08:45:02.144Z | 7.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.5 min | smoke, shard 8, shard 16 |
| `admin-monetisation.spec.ts` | 102 | 9.2 min | shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.6 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4, shard 12 |
| `admin-listings.spec.ts` | 76 | 5.1 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.8 min | shard 6, shard 14 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-roles.spec.ts` | 28 | 4.6 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 2, shard 11 |
| `admin-screening.spec.ts` | 54 | 4.4 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.9 min | shard 5, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 3, shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 4, shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `admin-guides.spec.ts` | 42 | 2.9 min | shard 2, shard 10, repeat |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 5, shard 13 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 4, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 2.1 min | shard 5, shard 13 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `mfa-stepup.spec.ts` | 20 | 1.8 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `dialogs.spec.ts` | 14 | 1.5 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 11 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 0.8 min | shard 7, shard 15 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 7, shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `feed-route.spec.ts` | 66 | 0.4 min | shard 3, shard 11, repeat |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `layout.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `shell-bands.spec.ts` | 16 | 0.2 min | shard 8, shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `dark-cards.spec.ts` | 12 | 0.2 min | shard 3, shard 11, repeat |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.1 s |
| `my-listings-promote.spec.ts` › LVP-5 the Reach section: the included reach (not self-serve) named current on a fresh ad; sameReach and lowerReach refused by name with nothing written; a wider reach set free; then nothing wider | desktop-1280 | 35.8 s |
| `my-listings-promote.spec.ts` › LVP-5 the Reach section: the included reach (not self-serve) named current on a fresh ad; sameReach and lowerReach refused by name with nothing written; a wider reach set free; then nothing wider | mobile-360 | 35.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 30.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42587592780-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42587592780-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42587592780-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42587592780-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42587592780-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42587592780-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42587592780-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42587592780-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42587592780-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42587592780-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42587592780-local-repeat
```

## my-listings-promote.spec.ts › MY LISTINGS — Promote: the level sheet and the staff Days field (P-2 (b)) › LVP-5 the Reach section: the included reach (not self-serve) named current on a fresh ad; sameReach and lowerReach refused by name with nothing written; a wider reach set free; then nothing wider

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local5_0_m_dvhay8_in').getByTestId('promote-reach-current-e2e_lvl_r_local5_0_m_dvhay8_in')
Expected: "Current reach"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local5_0_m_dvhay8_in').getByTestId('promote-reach-current-e2e_lvl_r_local5_0_m_dvhay8_in')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local5_0_m_dvhay8_in').getByTestId('promote-reach-current-e2e_lvl_r_local5_0_m_dvhay8_in')
Expected: "Current reach"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local5_0_m_dvhay8_in').getByTestId('promote-reach-current-e2e_lvl_r_local5_0_m_dvhay8_in')


  424 |     await openAdSheet(page, ad);
  425 |     const included = sheet.getByTestId(`promote-reach-${rows.included.key}`);
> 426 |     await expect(included.getByTestId(`promote-reach-current-${rows.included.key}`)).toHaveText(
      |                                                                                      ^
  427 |       en["myListings.promote.reach.current"],
  428 |       { timeout: 15000 },
  429 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-promote.spec.ts:426:86
```

Context:

```text
            - generic [ref=e35]: Not available
          - listitem [ref=e36]:
            - generic [ref=e37]:
              - generic [ref=e38]: Worldwide
              - generic [ref=e39]: 30 days · Free while the launch runs
            - generic [ref=e40]: Not available
          - listitem [ref=e41]:
            - generic [ref=e42]:
              - generic [ref=e43]: E2E reach e2e_lvl_r_local5_0_m_dvhay8_lo
              - generic [ref=e44]: 10 days · Free while the launch runs
            - generic [ref=e45]: Not available
          - listitem [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]: E2E reach e2e_lvl_r_local5_0_m_dvhay8_up
              - generic [ref=e49]: 40 days · Free while the launch runs
            - button "Choose reach" [ref=e50] [cursor=pointer]
    - button "Close" [active] [ref=e51] [cursor=pointer]:
      - img [ref=e52]
      - generic [ref=e55]: Close
```
```

## my-listings-promote.spec.ts › MY LISTINGS — Promote: the level sheet and the staff Days field (P-2 (b)) › LVP-5 the Reach section: the included reach (not self-serve) named current on a fresh ad; sameReach and lowerReach refused by name with nothing written; a wider reach set free; then nothing wider

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local1_0_d_ppavzo_in').getByTestId('promote-reach-current-e2e_lvl_r_local1_0_d_ppavzo_in')
Expected: "Current reach"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local1_0_d_ppavzo_in').getByTestId('promote-reach-current-e2e_lvl_r_local1_0_d_ppavzo_in')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local1_0_d_ppavzo_in').getByTestId('promote-reach-current-e2e_lvl_r_local1_0_d_ppavzo_in')
Expected: "Current reach"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('promote-sheet').getByTestId('promote-reach-e2e_lvl_r_local1_0_d_ppavzo_in').getByTestId('promote-reach-current-e2e_lvl_r_local1_0_d_ppavzo_in')


  424 |     await openAdSheet(page, ad);
  425 |     const included = sheet.getByTestId(`promote-reach-${rows.included.key}`);
> 426 |     await expect(included.getByTestId(`promote-reach-current-${rows.included.key}`)).toHaveText(
      |                                                                                      ^
  427 |       en["myListings.promote.reach.current"],
  428 |       { timeout: 15000 },
  429 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-promote.spec.ts:426:86
```

Context:

```text
            - generic [ref=e34]: Not available
          - listitem [ref=e35]:
            - generic [ref=e36]:
              - generic [ref=e37]: Worldwide
              - generic [ref=e38]: 30 days · Free while the launch runs
            - generic [ref=e39]: Not available
          - listitem [ref=e40]:
            - generic [ref=e41]:
              - generic [ref=e42]: E2E reach e2e_lvl_r_local1_0_d_ppavzo_lo
              - generic [ref=e43]: 10 days · Free while the launch runs
            - generic [ref=e44]: Not available
          - listitem [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]: E2E reach e2e_lvl_r_local1_0_d_ppavzo_up
              - generic [ref=e48]: 40 days · Free while the launch runs
            - button "Choose reach" [ref=e49] [cursor=pointer]
    - button "Close" [active] [ref=e50] [cursor=pointer]:
      - img [ref=e51]
      - generic [ref=e54]: Close
```
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).
