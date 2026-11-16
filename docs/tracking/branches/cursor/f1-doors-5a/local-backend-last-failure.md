# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43800810345 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43800810345
- Commit: `d172b3f72032c77343f1d5c5fb526b87e5e9e281`
- Attempt: 1
- Repeat: 32 of 144 tests repeated — specs directly changed 3/7, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-16T04:07:51.776Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-16T03:58:28.585Z | 4.3 min |
| email | 2026-11-16T03:56:41.429Z | 0.3 min |
| webkit | 2026-11-16T03:57:20.686Z | 7.5 min |
| shard 1 | 2026-11-16T03:57:18.593Z | 5.4 min |
| shard 2 | 2026-11-16T04:00:34.985Z | 6.8 min |
| shard 3 | 2026-11-16T03:57:38.474Z | 7.4 min |
| shard 4 | 2026-11-16T03:57:07.634Z | 6.0 min |
| shard 5 | 2026-11-16T03:57:11.685Z | 6.1 min |
| shard 6 | 2026-11-16T03:57:24.315Z | 6.9 min |
| shard 7 | 2026-11-16T03:57:10.383Z | 5.3 min |
| shard 8 | 2026-11-16T03:57:06.621Z | 5.5 min |
| shard 9 | 2026-11-16T03:57:17.186Z | 5.5 min |
| shard 10 | 2026-11-16T03:58:56.283Z | 5.3 min |
| shard 11 | 2026-11-16T03:56:48.106Z | 5.7 min |
| shard 12 | 2026-11-16T03:57:18.665Z | 5.9 min |
| shard 13 | 2026-11-16T03:56:54.404Z | 5.4 min |
| shard 14 | 2026-11-16T03:58:33.307Z | 6.1 min |
| shard 15 | 2026-11-16T03:57:10.591Z | 6.2 min |
| shard 16 | 2026-11-16T03:57:27.395Z | 5.3 min |
| repeat | 2026-11-16T03:57:22.013Z | 9.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-users.spec.ts` | 84 | 11.2 min | shard 16, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.6 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.2 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.5 min | shard 4 |
| `admin-locations.spec.ts` | 38 | 5.4 min | shard 6 |
| `admin-listings.spec.ts` | 78 | 5.2 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 58 | 5.0 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `ad-page.spec.ts` | 104 | 4.5 min | webkit, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `admin-monetisation.spec.ts` | 34 | 3.9 min | smoke, shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.7 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `sage-bands.spec.ts` | 76 | 3.4 min | shard 6 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 3.1 min | shard 2 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 3 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.5 min | shard 6 |
| `dialogs.spec.ts` | 20 | 2.5 min | webkit, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 2 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `my-listings-doors.spec.ts` | 84 | 1.6 min | shard 3, repeat |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-guides.spec.ts` | 14 | 1.4 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `auth-caller-gates.spec.ts` | 24 | 1.2 min | shard 5, repeat |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.2 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 37.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 33.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.3 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
