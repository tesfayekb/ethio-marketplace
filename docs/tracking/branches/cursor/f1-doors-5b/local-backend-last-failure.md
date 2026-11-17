# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44069383485 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44069383485
- Commit: `b56b222ecf55d79a490e61921e392c1582dbbedf`
- Attempt: 1
- Repeat: 30 of 52 tests repeated — specs directly changed 3/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-17T11:10:35.884Z
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
| smoke | 2026-11-17T10:59:12.219Z | 3.2 min |
| email | 2026-11-17T10:59:53.961Z | 0.4 min |
| webkit | 2026-11-17T11:00:19.703Z | 7.1 min |
| shard 1 | 2026-11-17T11:04:01.347Z | 6.2 min |
| shard 2 | 2026-11-17T11:00:12.434Z | 7.3 min |
| shard 3 | 2026-11-17T10:59:49.160Z | 5.9 min |
| shard 4 | 2026-11-17T10:59:47.831Z | 5.3 min |
| shard 5 | 2026-11-17T11:00:15.967Z | 6.6 min |
| shard 6 | 2026-11-17T10:59:24.341Z | 5.9 min |
| shard 7 | 2026-11-17T11:00:15.781Z | 6.7 min |
| shard 8 | 2026-11-17T11:01:31.309Z | 7.5 min |
| shard 9 | 2026-11-17T11:00:06.574Z | 6.1 min |
| shard 10 | 2026-11-17T10:59:50.113Z | 4.9 min |
| shard 11 | 2026-11-17T10:59:26.627Z | 6.3 min |
| shard 12 | 2026-11-17T11:00:04.697Z | 7.9 min |
| shard 13 | 2026-11-17T10:59:24.318Z | 4.9 min |
| shard 14 | 2026-11-17T10:59:59.715Z | 7.0 min |
| shard 15 | 2026-11-17T11:02:10.758Z | 7.3 min |
| shard 16 | 2026-11-17T11:01:28.018Z | 6.6 min |
| repeat | 2026-11-17T11:00:12.394Z | 9.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `viewing-place.spec.ts` | 66 | 11.7 min | shard 15, repeat |
| `shell.spec.ts` | 234 | 10.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 7.0 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 5.9 min | shard 12 |
| `admin-translations-console.spec.ts` | 46 | 5.8 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 58 | 5.5 min | webkit, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 5.2 min | shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.1 min | webkit, shard 10 |
| `photo-pipeline.spec.ts` | 74 | 4.9 min | webkit, shard 16 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `admin-roles.spec.ts` | 28 | 4.8 min | shard 9 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.5 min | shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 4.4 min | shard 8 |
| `admin-users.spec.ts` | 28 | 4.4 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 4.2 min | shard 14 |
| `my-listings-ad.spec.ts` | 38 | 4.1 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 7 |
| `auth-signout.spec.ts` | 36 | 3.4 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 3.3 min | shard 2 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `admin-monetisation.spec.ts` | 34 | 2.8 min | smoke, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.5 min | webkit, shard 4 |
| `legal-admin.spec.ts` | 44 | 2.5 min | shard 7 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 6 |
| `legal-certify.spec.ts` | 44 | 2.5 min | shard 14 |
| `dialogs.spec.ts` | 20 | 2.5 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `mfa-stepup.spec.ts` | 22 | 2.2 min | webkit, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `phone-frame.spec.ts` | 18 | 1.5 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `ad-page-doors.spec.ts` | 90 | 1.4 min | shard 14, repeat |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `auth-caller-gates.spec.ts` | 24 | 1.2 min | shard 5, repeat |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 15 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.3 min | shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 31.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
