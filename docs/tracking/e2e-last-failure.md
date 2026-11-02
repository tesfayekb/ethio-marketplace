# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 41376387738 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41376387738
- Commit: `bd97c81cbe05d472890d538ca82f43239eb5c64c`
- Attempt: 1
- Written (UTC): 2026-11-02T02:31:28.552Z
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
| smoke | 2026-11-02T02:15:17.713Z | 13.9 min |
| email | 2026-11-02T02:16:45.854Z | 0.4 min |
| shard 1 | 2026-11-02T02:15:09.280Z | 12.8 min |
| shard 2 | 2026-11-02T02:14:26.118Z | 14.3 min |
| shard 3 | 2026-11-02T02:14:38.410Z | 8.3 min |
| shard 4 | 2026-11-02T02:15:13.592Z | 11.1 min |
| shard 5 | 2026-11-02T02:14:37.842Z | 8.3 min |
| shard 6 | 2026-11-02T02:14:57.492Z | 11.3 min |
| shard 7 | 2026-11-02T02:15:05.338Z | 3.8 min |
| shard 8 | 2026-11-02T02:18:06.981Z | 8.2 min |
| shard 9 | 2026-11-02T02:15:28.654Z | 14.8 min |
| shard 10 | 2026-11-02T02:18:23.654Z | 12.3 min |
| shard 11 | 2026-11-02T02:15:21.158Z | 13.8 min |
| shard 12 | 2026-11-02T02:14:54.644Z | 10.4 min |
| shard 13 | 2026-11-02T02:16:01.123Z | 11.6 min |
| shard 14 | 2026-11-02T02:14:29.706Z | 8.8 min |
| shard 15 | 2026-11-02T02:15:04.978Z | 4.3 min |
| shard 16 | 2026-11-02T02:16:04.427Z | 8.1 min |
| repeat | 2026-11-02T02:14:49.349Z | 4.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.8 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.5 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 112 | 4.8 min | shard 7, shard 15, repeat |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 11 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.3 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-roles.spec.ts` | 26 | 3.9 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.3 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 78 | 3.3 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 4, shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.6 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `dialogs.spec.ts` | 14 | 1.5 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 7, shard 15 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 10 |
| `press.spec.ts` | 16 | 0.9 min | shard 7, shard 15 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `sage-cards.spec.ts` | 28 | 0.5 min | shard 7, shard 15 |
| `admin-categories-images.spec.ts` | 2 | 0.4 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 13 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
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
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
