# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45009807393 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45009807393
- Commit: `3f15d3c8e3ad3a29b7a239c7f7e153c93130b7cc`
- Attempt: 1
- Repeat: 32 of 53 tests repeated — specs directly changed 1/3, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-22T10:08:46.557Z
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
| smoke | 2026-11-22T09:58:33.664Z | 4.7 min |
| email | 2026-11-22T09:57:46.338Z | 0.3 min |
| webkit | 2026-11-22T09:58:24.240Z | 9.5 min |
| shard 1 | 2026-11-22T09:58:04.230Z | 5.5 min |
| shard 2 | 2026-11-22T09:57:41.166Z | 5.1 min |
| shard 3 | 2026-11-22T09:57:54.945Z | 6.0 min |
| shard 4 | 2026-11-22T10:00:18.094Z | 7.9 min |
| shard 5 | 2026-11-22T09:58:06.286Z | 6.3 min |
| shard 6 | 2026-11-22T09:58:30.481Z | 5.7 min |
| shard 7 | 2026-11-22T09:58:34.166Z | 7.4 min |
| shard 8 | 2026-11-22T10:00:15.099Z | 5.5 min |
| shard 9 | 2026-11-22T09:57:37.041Z | 6.2 min |
| shard 10 | 2026-11-22T09:58:24.945Z | 5.5 min |
| shard 11 | 2026-11-22T10:01:11.375Z | 6.3 min |
| shard 12 | 2026-11-22T09:59:42.184Z | 5.8 min |
| shard 13 | 2026-11-22T09:57:50.709Z | 4.9 min |
| shard 14 | 2026-11-22T09:58:22.308Z | 6.4 min |
| shard 15 | 2026-11-22T09:58:12.356Z | 6.4 min |
| shard 16 | 2026-11-22T09:58:09.411Z | 5.8 min |
| repeat | 2026-11-22T09:58:26.602Z | 9.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-screening.spec.ts` | 192 | 14.6 min | webkit, shard 14, repeat |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `import-security.spec.ts` | 36 | 7.2 min | shard 4 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 2 |
| `admin-listings.spec.ts` | 82 | 5.3 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `post-wizard-place.spec.ts` | 40 | 4.8 min | shard 11 |
| `admin-locations.spec.ts` | 44 | 4.7 min | shard 6 |
| `post-wizard-where.spec.ts` | 32 | 4.4 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 4.4 min | webkit, shard 16 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `choice-lists.spec.ts` | 96 | 3.8 min | shard 7 |
| `admin-attributes-editor.spec.ts` | 36 | 3.8 min | shard 14 |
| `dialogs.spec.ts` | 28 | 3.8 min | webkit, shard 10 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 3.5 min | webkit, shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `mfa-stepup.spec.ts` | 24 | 2.1 min | webkit, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 2 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 11 |
| `legal-certify.spec.ts` | 44 | 2.0 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `house-style.spec.ts` | 14 | 0.7 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 52.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 48.8 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
