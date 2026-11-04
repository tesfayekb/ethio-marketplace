# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 41769782764 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41769782764
- Commit: `ad34712c6840096b70326639c2d5812971a5c7ab`
- Attempt: 1
- Written (UTC): 2026-11-04T04:13:06.216Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
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
| smoke | 2026-11-04T03:56:52.495Z | 12.9 min |
| email | 2026-11-04T03:56:12.511Z | 0.4 min |
| shard 1 | 2026-11-04T03:56:04.444Z | 14.7 min |
| shard 2 | 2026-11-04T03:56:02.423Z | 16.3 min |
| shard 3 | 2026-11-04T03:55:47.707Z | 10.8 min |
| shard 4 | 2026-11-04T03:56:13.345Z | 10.4 min |
| shard 5 | 2026-11-04T03:59:39.491Z | 12.1 min |
| shard 6 | 2026-11-04T03:55:49.577Z | 10.9 min |
| shard 7 | 2026-11-04T03:56:48.489Z | 4.8 min |
| shard 8 | 2026-11-04T03:56:24.158Z | 8.2 min |
| shard 9 | 2026-11-04T03:55:31.531Z | 12.1 min |
| shard 10 | 2026-11-04T03:57:09.014Z | 14.3 min |
| shard 11 | 2026-11-04T03:55:59.975Z | 12.2 min |
| shard 12 | 2026-11-04T03:55:52.408Z | 11.7 min |
| shard 13 | 2026-11-04T03:55:58.461Z | 8.9 min |
| shard 14 | 2026-11-04T03:55:52.894Z | 10.5 min |
| shard 15 | 2026-11-04T03:56:43.374Z | 4.5 min |
| shard 16 | 2026-11-04T03:55:54.407Z | 7.4 min |
| repeat | 2026-11-04T03:56:12.525Z | 6.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.4 min | smoke, shard 8, shard 16 |
| `user-guides.spec.ts` | 126 | 6.7 min | shard 8, shard 16, repeat |
| `auth-signout.spec.ts` | 72 | 6.5 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 5, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `admin-listings.spec.ts` | 76 | 4.6 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 54 | 4.2 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 8, shard 16 |
| `post-wizard-place.spec.ts` | 38 | 3.7 min | shard 6, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.2 min | shard 2, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 7, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3, shard 11 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 5, shard 13 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.6 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `dialogs.spec.ts` | 14 | 1.5 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 1.1 min | shard 7, shard 15 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-guides.spec.ts` | 12 | 0.9 min | shard 2, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 28 | 0.5 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 13 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 11 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `submenu.spec.ts` | 14 | 0.2 min | shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.3 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
