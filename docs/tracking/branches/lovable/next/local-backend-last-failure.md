# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45139624988 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45139624988
- Commit: `cc90135a40214abf4b2b20a095203fc7bceb6d9e`
- Attempt: 1
- Repeat: 17 of 35 tests repeated — specs directly changed 1/2, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-23T08:48:04.559Z
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
| smoke | 2026-11-23T08:40:11.832Z | 4.0 min |
| email | 2026-11-23T08:37:28.509Z | 0.3 min |
| webkit | 2026-11-23T08:37:31.250Z | 9.3 min |
| shard 1 | 2026-11-23T08:37:59.148Z | 5.4 min |
| shard 2 | 2026-11-23T08:38:27.701Z | 5.3 min |
| shard 3 | 2026-11-23T08:37:56.555Z | 7.4 min |
| shard 4 | 2026-11-23T08:39:04.637Z | 5.3 min |
| shard 5 | 2026-11-23T08:38:06.314Z | 6.1 min |
| shard 6 | 2026-11-23T08:37:51.352Z | 5.7 min |
| shard 7 | 2026-11-23T08:40:40.238Z | 5.4 min |
| shard 8 | 2026-11-23T08:38:12.633Z | 6.2 min |
| shard 9 | 2026-11-23T08:41:18.945Z | 6.3 min |
| shard 10 | 2026-11-23T08:37:50.595Z | 5.7 min |
| shard 11 | 2026-11-23T08:37:24.962Z | 5.9 min |
| shard 12 | 2026-11-23T08:38:40.151Z | 8.1 min |
| shard 13 | 2026-11-23T08:39:24.782Z | 6.2 min |
| shard 14 | 2026-11-23T08:38:35.836Z | 5.3 min |
| shard 15 | 2026-11-23T08:38:37.619Z | 6.5 min |
| shard 16 | 2026-11-23T08:37:26.694Z | 5.3 min |
| repeat | 2026-11-23T08:38:08.068Z | 7.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-console.spec.ts` | 102 | 12.0 min | shard 7, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.2 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 6.0 min | shard 12 |
| `admin-listings.spec.ts` | 82 | 5.8 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `ad-page.spec.ts` | 104 | 5.2 min | webkit, shard 13 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 64 | 4.8 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `admin-locations.spec.ts` | 44 | 4.7 min | shard 6 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 16 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 8 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 3.1 min | shard 3 |
| `admin-translations-governance.spec.ts` | 20 | 2.9 min | smoke, shard 16 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `mfa-stepup.spec.ts` | 28 | 2.4 min | webkit, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 1.6 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `house-style.spec.ts` | 14 | 0.7 min | shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 12 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 31.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 31.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
