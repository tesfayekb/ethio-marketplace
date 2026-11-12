# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43236871102 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43236871102
- Commit: `76a7fdea7ae8e700cf191edc9d99d8a28bdff6e8`
- Attempt: 1
- Lanes: ran — not docs-only: no commit within 10 first-parent commits of dac564c4a189110f7600f0db51a193d02733523a ran its lanes green
- Repeat: 38 of 1393 tests repeated — specs directly changed 5/53, importers of a changed helper 0/60; budget 720 s
- Written (UTC): 2026-11-12T14:45:28.533Z
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
| smoke | 2026-11-12T14:28:28.186Z | 13.9 min |
| email | 2026-11-12T14:28:21.970Z | 0.3 min |
| shard 1 | 2026-11-12T14:29:00.876Z | 14.8 min |
| shard 2 | 2026-11-12T14:28:03.959Z | 16.6 min |
| shard 3 | 2026-11-12T14:28:41.869Z | 9.7 min |
| shard 4 | 2026-11-12T14:27:53.648Z | 11.3 min |
| shard 5 | 2026-11-12T14:30:15.726Z | 10.4 min |
| shard 6 | 2026-11-12T14:28:18.218Z | 11.8 min |
| shard 7 | 2026-11-12T14:28:27.874Z | 4.5 min |
| shard 8 | 2026-11-12T14:28:05.511Z | 8.0 min |
| shard 9 | 2026-11-12T14:27:54.822Z | 12.2 min |
| shard 10 | 2026-11-12T14:28:34.893Z | 16.0 min |
| shard 11 | 2026-11-12T14:28:27.742Z | 12.2 min |
| shard 12 | 2026-11-12T14:28:05.219Z | 10.7 min |
| shard 13 | 2026-11-12T14:28:48.282Z | 10.0 min |
| shard 14 | 2026-11-12T14:28:31.698Z | 12.7 min |
| shard 15 | 2026-11-12T14:30:22.662Z | 4.4 min |
| shard 16 | 2026-11-12T14:28:21.201Z | 7.5 min |
| repeat | 2026-11-12T14:28:55.589Z | 9.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.0 min | smoke, shard 8, shard 16 |
| `admin-attributes-editor.spec.ts` | 108 | 10.0 min | shard 1, shard 9, repeat |
| `auth-signout.spec.ts` | 72 | 6.8 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 4, shard 12 |
| `admin-listings.spec.ts` | 76 | 4.7 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.7 min | shard 6, shard 14 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 2, shard 11 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 54 | 4.1 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 3.9 min | shard 5, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 8, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.2 min | shard 2, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.1 min | shard 3, shard 11 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 4, shard 12 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 7, shard 15 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `dialogs.spec.ts` | 14 | 1.6 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `legal-admin.spec.ts` | 44 | 1.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 90 | 1.5 min | shard 1, shard 9, repeat |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | shard 2, shard 10, repeat |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 20 | 1.4 min | shard 4, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.3 min | shard 4, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 2, shard 10 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 18 | 1.0 min | shard 3, shard 11, repeat |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 1, shard 9, repeat |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `submenu.spec.ts` | 14 | 0.2 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
