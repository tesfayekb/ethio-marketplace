# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45005911704 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45005911704
- Commit: `64b51fec4455c241a12e21e50198e103c7786ad7`
- Attempt: 1
- Repeat: 29 of 50 tests repeated — specs directly changed 1/3, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-22T09:22:20.913Z
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
| smoke | 2026-11-22T09:10:07.845Z | 4.6 min |
| email | 2026-11-22T09:09:56.556Z | 0.3 min |
| webkit | 2026-11-22T09:10:32.124Z | 8.8 min |
| shard 1 | 2026-11-22T09:10:25.324Z | 5.5 min |
| shard 2 | 2026-11-22T09:11:40.203Z | 7.2 min |
| shard 3 | 2026-11-22T09:10:15.818Z | 5.7 min |
| shard 4 | 2026-11-22T09:10:19.023Z | 5.8 min |
| shard 5 | 2026-11-22T09:09:55.933Z | 6.1 min |
| shard 6 | 2026-11-22T09:10:41.222Z | 6.6 min |
| shard 7 | 2026-11-22T09:13:39.180Z | 5.3 min |
| shard 8 | 2026-11-22T09:13:14.437Z | 5.7 min |
| shard 9 | 2026-11-22T09:12:05.465Z | 7.6 min |
| shard 10 | 2026-11-22T09:10:32.892Z | 5.3 min |
| shard 11 | 2026-11-22T09:10:11.110Z | 6.1 min |
| shard 12 | 2026-11-22T09:10:09.455Z | 5.9 min |
| shard 13 | 2026-11-22T09:10:20.678Z | 5.1 min |
| shard 14 | 2026-11-22T09:09:56.104Z | 5.3 min |
| shard 15 | 2026-11-22T09:10:57.277Z | 7.5 min |
| shard 16 | 2026-11-22T09:10:15.428Z | 6.0 min |
| repeat | 2026-11-22T09:10:07.133Z | 9.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-screening.spec.ts` | 174 | 13.6 min | webkit, shard 14, repeat |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | shard 2 |
| `auth-signout.spec.ts` | 44 | 6.3 min | webkit, shard 9 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4 |
| `admin-locations.spec.ts` | 38 | 5.2 min | shard 6 |
| `admin-listings.spec.ts` | 78 | 5.1 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 3 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.8 min | shard 15 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `ad-page.spec.ts` | 104 | 4.4 min | webkit, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 11 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `dialogs.spec.ts` | 28 | 3.6 min | webkit, shard 10 |
| `posting-routes.spec.ts` | 80 | 3.3 min | shard 2 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `sage-bands.spec.ts` | 76 | 3.2 min | shard 6 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `mfa-stepup.spec.ts` | 24 | 2.7 min | webkit, shard 15 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.5 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `house-style.spec.ts` | 14 | 0.6 min | shard 11 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `overlays.spec.ts` | 8 | 0.3 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.4 s |
| `auth-signout.spec.ts` › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) | mobile-360 | 39.1 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 34.3 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.9 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
