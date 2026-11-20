# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44730229750 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44730229750
- Commit: `a21c955953feb9efabb138a504a9691a491d96ce`
- Attempt: 1
- Repeat: 15 of 15 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-20T12:11:54.372Z
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
| smoke | 2026-11-20T11:49:32.900Z | 3.5 min |
| email | 2026-11-20T11:49:11.501Z | 0.3 min |
| webkit | 2026-11-20T11:49:54.401Z | 8.2 min |
| shard 1 | 2026-11-20T11:49:33.320Z | 5.4 min |
| shard 2 | 2026-11-20T12:05:14.823Z | 6.2 min |
| shard 3 | 2026-11-20T11:53:24.055Z | 6.2 min |
| shard 4 | 2026-11-20T11:49:46.114Z | 6.4 min |
| shard 5 | 2026-11-20T11:59:46.118Z | 6.3 min |
| shard 6 | 2026-11-20T11:49:44.609Z | 5.7 min |
| shard 7 | 2026-11-20T11:49:38.317Z | 6.1 min |
| shard 8 | 2026-11-20T11:58:29.356Z | 7.3 min |
| shard 9 | 2026-11-20T11:51:42.521Z | 6.3 min |
| shard 10 | 2026-11-20T11:50:00.471Z | 6.8 min |
| shard 11 | 2026-11-20T11:49:37.806Z | 5.9 min |
| shard 12 | 2026-11-20T11:49:21.649Z | 6.1 min |
| shard 13 | 2026-11-20T11:49:20.073Z | 4.9 min |
| shard 14 | 2026-11-20T11:49:52.337Z | 5.2 min |
| shard 15 | 2026-11-20T11:50:16.246Z | 6.2 min |
| shard 16 | 2026-11-20T11:49:13.947Z | 5.3 min |
| repeat | 2026-11-20T11:49:50.037Z | 8.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-monetisation.spec.ts` | 154 | 11.8 min | smoke, shard 10, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 6.4 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 6.2 min | shard 2 |
| `import-security.spec.ts` | 36 | 5.7 min | shard 4 |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | smoke, shard 8 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.4 min | shard 3 |
| `admin-roles.spec.ts` | 28 | 4.9 min | shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 4.9 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 4.7 min | shard 11 |
| `admin-screening.spec.ts` | 58 | 4.7 min | webkit, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 4.3 min | shard 8 |
| `ad-page.spec.ts` | 104 | 4.3 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `auth-signout.spec.ts` | 36 | 3.5 min | shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `dialogs.spec.ts` | 20 | 3.3 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.2 min | shard 7 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-category.spec.ts` | 52 | 3.0 min | webkit, shard 4 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.9 min | webkit, shard 2 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `my-listings-page.spec.ts` | 20 | 1.3 min | webkit, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.5 min | shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | desktop-1280 | 29.6 s |
