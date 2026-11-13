# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43423646341 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43423646341
- Commit: `add8f58ddb85e7946e12bedeef920fd19b4c75c3`
- Attempt: 1
- Repeat: 38 of 1443 tests repeated — specs directly changed 2/14, importers of a changed helper 5/99; budget 720 s
- Written (UTC): 2026-11-13T12:39:53.967Z
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
| smoke | 2026-11-13T12:18:57.050Z | 12.7 min |
| email | 2026-11-13T12:19:10.309Z | 0.3 min |
| webkit | 2026-11-13T12:19:30.333Z | 7.9 min |
| shard 1 | 2026-11-13T12:19:11.044Z | 12.4 min |
| shard 2 | 2026-11-13T12:19:19.878Z | 17.3 min |
| shard 3 | 2026-11-13T12:19:38.852Z | 9.7 min |
| shard 4 | 2026-11-13T12:19:15.377Z | 11.6 min |
| shard 5 | 2026-11-13T12:18:36.393Z | 8.3 min |
| shard 6 | 2026-11-13T12:22:19.263Z | 10.9 min |
| shard 7 | 2026-11-13T12:19:18.718Z | 3.8 min |
| shard 8 | 2026-11-13T12:20:10.410Z | 9.0 min |
| shard 9 | 2026-11-13T12:19:39.232Z | 14.8 min |
| shard 10 | 2026-11-13T12:22:27.955Z | 16.9 min |
| shard 11 | 2026-11-13T12:18:58.455Z | 10.6 min |
| shard 12 | 2026-11-13T12:18:58.893Z | 11.0 min |
| shard 13 | 2026-11-13T12:19:13.493Z | 8.4 min |
| shard 14 | 2026-11-13T12:18:55.484Z | 11.5 min |
| shard 15 | 2026-11-13T12:19:02.182Z | 3.7 min |
| shard 16 | 2026-11-13T12:20:59.525Z | 7.7 min |
| repeat | 2026-11-13T12:19:53.712Z | 11.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 18.7 min | smoke, shard 8, shard 16 |
| `admin-screening.spec.ts` | 174 | 12.9 min | webkit, shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 72 | 6.3 min | smoke, shard 3, shard 11 |
| `admin-listings.spec.ts` | 78 | 5.6 min | webkit, shard 2, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 5, shard 13 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 104 | 4.4 min | webkit, shard 1, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.3 min | shard 2, shard 11 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.1 min | shard 6, shard 14 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 5, shard 13 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `admin-categories-images.spec.ts` | 12 | 3.3 min | webkit, shard 2, shard 10, repeat |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.1 min | shard 4, shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 6, shard 14 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 7, shard 15 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `dialogs.spec.ts` | 16 | 2.5 min | webkit, shard 3, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 7, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `mfa-stepup.spec.ts` | 22 | 1.6 min | webkit, shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 7, shard 15 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 2, shard 10 |
| `press.spec.ts` | 22 | 1.0 min | shard 7, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `account-saved.spec.ts` | 12 | 0.4 min | shard 1, shard 9, repeat |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `admin-ai-calls.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `overlays.spec.ts` | 8 | 0.1 min | shard 5, shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `fonts.spec.ts` | 6 | 0.1 min | shard 4, shard 12, repeat |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 6 | 0.1 min | shard 3, repeat |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 32.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
