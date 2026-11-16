# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43828673900 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43828673900
- Commit: `6a6290a49485fe0b9a13401d701f3b90e546e56b`
- Attempt: 1
- Repeat: 34 of 1440 tests repeated — specs directly changed 1/1, importers of a changed helper 6/112; budget 643 s
- Written (UTC): 2026-11-16T08:20:59.435Z
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
| smoke | 2026-11-16T08:13:08.712Z | 3.6 min |
| email | 2026-11-16T08:10:05.612Z | 0.3 min |
| webkit | 2026-11-16T08:10:32.726Z | 8.0 min |
| shard 1 | 2026-11-16T08:13:39.676Z | 5.6 min |
| shard 2 | 2026-11-16T08:10:17.561Z | 5.5 min |
| shard 3 | 2026-11-16T08:10:45.445Z | 6.0 min |
| shard 4 | 2026-11-16T08:10:33.780Z | 5.5 min |
| shard 5 | 2026-11-16T08:10:18.568Z | 6.1 min |
| shard 6 | 2026-11-16T08:10:46.615Z | 6.6 min |
| shard 7 | 2026-11-16T08:10:41.735Z | 5.2 min |
| shard 8 | 2026-11-16T08:10:37.581Z | 5.5 min |
| shard 9 | 2026-11-16T08:11:03.840Z | 6.8 min |
| shard 10 | 2026-11-16T08:10:29.372Z | 5.3 min |
| shard 11 | 2026-11-16T08:10:59.443Z | 7.4 min |
| shard 12 | 2026-11-16T08:12:38.881Z | 5.8 min |
| shard 13 | 2026-11-16T08:11:39.133Z | 5.6 min |
| shard 14 | 2026-11-16T08:11:05.814Z | 6.9 min |
| shard 15 | 2026-11-16T08:11:15.330Z | 6.1 min |
| shard 16 | 2026-11-16T08:10:48.996Z | 7.0 min |
| repeat | 2026-11-16T08:11:13.259Z | 9.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-attributes-safety.spec.ts` | 54 | 7.4 min | shard 5, repeat |
| `admin-screening.spec.ts` | 58 | 5.8 min | webkit, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `photo-pipeline.spec.ts` | 74 | 5.4 min | webkit, shard 16 |
| `post-wizard-place.spec.ts` | 40 | 5.3 min | shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `admin-locations.spec.ts` | 38 | 5.2 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 5.2 min | shard 9 |
| `post-wizard-where.spec.ts` | 32 | 5.1 min | shard 11 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 13 |
| `import-security.spec.ts` | 36 | 5.0 min | shard 4 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-listings.spec.ts` | 78 | 4.8 min | webkit, shard 10 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-users.spec.ts` | 28 | 4.6 min | shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `admin-attributes-links.spec.ts` | 34 | 4.3 min | shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 4.2 min | shard 14 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-categories-images.spec.ts` | 14 | 3.9 min | smoke, webkit, shard 12, repeat |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `auth-signout.spec.ts` | 36 | 3.7 min | shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.3 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 12 |
| `sage-bands.spec.ts` | 76 | 3.2 min | shard 6 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `dialogs.spec.ts` | 20 | 2.8 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.5 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `legal-certify.spec.ts` | 44 | 2.3 min | shard 14 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 2.2 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `ad-page-doors.spec.ts` | 90 | 1.6 min | shard 14, repeat |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 4, repeat |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 11, repeat |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `submenu-touch.spec.ts` | 24 | 0.3 min | shard 13, repeat |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.3 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 10, repeat |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.9 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | webkit-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 31.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.1 s |
