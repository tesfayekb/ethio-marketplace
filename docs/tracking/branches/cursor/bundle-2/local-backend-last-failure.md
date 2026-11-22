# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45003217164 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45003217164
- Commit: `e3dbd11877191428b10b280c6a11f03829d6e2fd`
- Attempt: 1
- Repeat: 34 of 1470 tests repeated — specs directly changed 3/16, importers of a changed helper 1/97; budget 643 s
- Written (UTC): 2026-11-22T08:48:55.715Z
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
| smoke | 2026-11-22T08:39:10.469Z | 3.5 min |
| email | 2026-11-22T08:39:09.140Z | 0.3 min |
| webkit | 2026-11-22T08:39:06.569Z | 7.7 min |
| shard 1 | 2026-11-22T08:38:48.251Z | 5.4 min |
| shard 2 | 2026-11-22T08:39:40.997Z | 7.5 min |
| shard 3 | 2026-11-22T08:39:32.732Z | 7.7 min |
| shard 4 | 2026-11-22T08:38:58.501Z | 5.4 min |
| shard 5 | 2026-11-22T08:39:22.658Z | 6.3 min |
| shard 6 | 2026-11-22T08:42:37.533Z | 5.6 min |
| shard 7 | 2026-11-22T08:39:18.827Z | 5.2 min |
| shard 8 | 2026-11-22T08:39:22.342Z | 5.5 min |
| shard 9 | 2026-11-22T08:39:01.071Z | 6.3 min |
| shard 10 | 2026-11-22T08:39:46.841Z | 7.0 min |
| shard 11 | 2026-11-22T08:39:02.785Z | 6.0 min |
| shard 12 | 2026-11-22T08:41:52.594Z | 5.9 min |
| shard 13 | 2026-11-22T08:41:01.065Z | 5.4 min |
| shard 14 | 2026-11-22T08:39:20.410Z | 5.3 min |
| shard 15 | 2026-11-22T08:40:03.429Z | 7.4 min |
| shard 16 | 2026-11-22T08:39:13.380Z | 5.9 min |
| repeat | 2026-11-22T08:39:30.001Z | 8.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-console.spec.ts` | 102 | 12.1 min | shard 7, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 7.0 min | shard 2 |
| `admin-listings.spec.ts` | 82 | 6.5 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.4 min | shard 3 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 4.9 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.7 min | shard 15 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 44 | 4.6 min | shard 6 |
| `ad-page.spec.ts` | 104 | 4.5 min | webkit, shard 13 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `photo-pipeline.spec.ts` | 74 | 4.3 min | webkit, shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 11 |
| `posting-routes.spec.ts` | 80 | 3.5 min | shard 2 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 3.1 min | shard 3 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `dialogs.spec.ts` | 20 | 3.0 min | webkit, shard 10 |
| `mfa-stepup.spec.ts` | 24 | 2.6 min | webkit, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 11 |
| `sage-tiers.spec.ts` | 52 | 2.0 min | webkit, shard 2 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.5 min | shard 2 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `my-listings-page.spec.ts` | 24 | 1.3 min | webkit, shard 10 |
| `ad-page-doors.spec.ts` | 90 | 1.3 min | shard 14, repeat |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `legal-accept.spec.ts` | 12 | 0.6 min | shard 2 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 11, repeat |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 10, repeat |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.5 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 29.7 s |
