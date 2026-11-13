# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43426917119 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43426917119
- Commit: `db6596e4460e9beb46d718bf8a2293e94d86a3a0`
- Attempt: 1
- Repeat: 38 of 1443 tests repeated — specs directly changed 2/14, importers of a changed helper 5/99; budget 720 s
- Written (UTC): 2026-11-13T13:03:17.840Z
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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-13T12:43:20.391Z | 12.6 min |
| email | 2026-11-13T12:43:43.895Z | 0.3 min |
| webkit | 2026-11-13T12:44:34.504Z | 8.9 min |
| shard 1 | 2026-11-13T12:44:14.028Z | 14.9 min |
| shard 2 | 2026-11-13T12:44:08.132Z | 18.6 min |
| shard 3 | 2026-11-13T12:43:47.029Z | 8.8 min |
| shard 4 | 2026-11-13T12:44:00.606Z | 12.5 min |
| shard 5 | 2026-11-13T12:44:03.155Z | 10.6 min |
| shard 6 | 2026-11-13T12:44:12.721Z | 12.9 min |
| shard 7 | 2026-11-13T12:44:04.046Z | 3.9 min |
| shard 8 | 2026-11-13T12:44:04.147Z | 9.2 min |
| shard 9 | 2026-11-13T12:44:06.419Z | 14.8 min |
| shard 10 | 2026-11-13T12:43:56.471Z | 16.8 min |
| shard 11 | 2026-11-13T12:44:11.998Z | 12.3 min |
| shard 12 | 2026-11-13T12:43:53.860Z | 11.9 min |
| shard 13 | 2026-11-13T12:46:59.716Z | 8.0 min |
| shard 14 | 2026-11-13T12:44:04.775Z | 13.7 min |
| shard 15 | 2026-11-13T12:44:06.449Z | 4.6 min |
| shard 16 | 2026-11-13T12:45:55.031Z | 7.9 min |
| repeat | 2026-11-13T12:46:33.534Z | 13.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.9 min | smoke, shard 8, shard 16 |
| `admin-screening.spec.ts` | 174 | 14.8 min | webkit, shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.4 min | smoke, shard 3, shard 11 |
| `admin-listings.spec.ts` | 78 | 6.0 min | webkit, shard 2, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 5, shard 13 |
| `ad-page.spec.ts` | 104 | 5.3 min | webkit, shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 6, shard 14 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 4, shard 12 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.8 min | shard 2, shard 11 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 1, shard 9 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 74 | 4.1 min | webkit, shard 5, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-categories-images.spec.ts` | 12 | 3.8 min | webkit, shard 2, shard 10, repeat |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 4, shard 12 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3, shard 11 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 5, shard 13 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 7, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `dialogs.spec.ts` | 16 | 2.6 min | webkit, shard 3, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 7, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 22 | 1.9 min | webkit, shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 7, shard 15 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 9 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 2, shard 10 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 12 | 0.6 min | shard 1, shard 9, repeat |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 1, shard 9, repeat |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `fonts.spec.ts` | 6 | 0.1 min | shard 4, shard 12, repeat |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 6 | 0.1 min | shard 3, repeat |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.6 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | webkit-1280 | 35.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.8 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 31.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.8 s |
