# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43305919223 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43305919223
- Commit: `50783a30ef18689b9b362d82397e1a3de4650b8c`
- Attempt: 1
- Lanes: ran — not docs-only: scripts/conformance/briefs-allowlist.txt is not a record (1 of 25 paths; diff base 6457836f3ed9d73fcb74a60866fb63de907be825, push base 6457836f3ed9d73fcb74a60866fb63de907be825)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-12T21:24:07.963Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-12T21:04:08.693Z | 13.0 min |
| email | 2026-11-12T21:04:57.565Z | 0.4 min |
| shard 1 | 2026-11-12T21:03:52.555Z | 12.5 min |
| shard 2 | 2026-11-12T21:04:44.572Z | 18.6 min |
| shard 3 | 2026-11-12T21:08:47.621Z | 8.9 min |
| shard 4 | 2026-11-12T21:08:06.273Z | 11.6 min |
| shard 5 | 2026-11-12T21:04:58.749Z | 11.0 min |
| shard 6 | 2026-11-12T21:04:34.526Z | 13.4 min |
| shard 7 | 2026-11-12T21:04:40.236Z | 4.8 min |
| shard 8 | 2026-11-12T21:04:31.862Z | 8.6 min |
| shard 9 | 2026-11-12T21:04:29.636Z | 13.5 min |
| shard 10 | 2026-11-12T21:04:44.222Z | 15.2 min |
| shard 11 | 2026-11-12T21:04:23.420Z | 12.3 min |
| shard 12 | 2026-11-12T21:04:34.692Z | 12.8 min |
| shard 13 | 2026-11-12T21:06:54.241Z | 8.5 min |
| shard 14 | 2026-11-12T21:04:33.894Z | 13.4 min |
| shard 15 | 2026-11-12T21:04:37.797Z | 4.4 min |
| shard 16 | 2026-11-12T21:04:23.068Z | 8.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.3 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 72 | 6.5 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.2 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 6, shard 14 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.8 min | shard 2, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 54 | 4.3 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 76 | 4.2 min | shard 2, shard 10 |
| `admin-monetisation.spec.ts` | 34 | 4.0 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.7 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 3.7 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.0 min | shard 1, shard 9 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.9 min | shard 7, shard 15 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.6 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.6 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `dialogs.spec.ts` | 14 | 1.6 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.4 min | shard 1, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.2 min | shard 7, shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 1.1 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `sage-cards.spec.ts` | 28 | 0.5 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
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
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 48.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 36.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
