# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46117003671 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46117003671
- Commit: `ce1d058901d7bc718ebe7810526e11e3dde3a32f`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-29456e7b9a82… (0 read)
- Repeat: 43 of 1511 tests repeated — specs directly changed 7/20, importers of a changed helper 1/105; budget 862 s
- Measured lane spread (DEC-375 b): mean 465 s, largest 620 s (lane 2, +33 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T06:51:19.278Z
- Post-test warnings: 62
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 13, shard 16 |
| `categories wrongFile` (quiet) | 4 | shard 13, shard 16 |
| `definitions badHeader` (quiet) | 4 | shard 13, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 13, shard 16 |
| `categories file too large` (quiet) | 2 | shard 13 |
| `categories nulByte` (quiet) | 2 | shard 13 |
| `categories unknownColumn` (quiet) | 2 | shard 13 |
| `countries badHeader` (quiet) | 2 | shard 13 |
| `countries nulByte` (quiet) | 2 | shard 13 |
| `countries tooManyRows` (quiet) | 2 | shard 13 |
| `countries unknownColumn` (quiet) | 2 | shard 13 |
| `countries wrongFile` (quiet) | 2 | shard 13 |
| `definitions nulByte` (quiet) | 2 | shard 13 |
| `definitions tooManyRows` (quiet) | 2 | shard 13 |
| `definitions unknownColumn` (quiet) | 2 | shard 13 |
| `links unknownColumn` (quiet) | 2 | shard 13 |
| `locations badHeader` (quiet) | 2 | shard 13 |
| `locations file too large` (quiet) | 2 | shard 13 |
| `locations nulByte` (quiet) | 2 | shard 13 |
| `locations unknownColumn` (quiet) | 2 | shard 13 |
| `locations wrongFile` (quiet) | 2 | shard 13 |
| `strings badHeader` (quiet) | 2 | shard 13 |
| `strings emptyFile` (quiet) | 2 | shard 13 |
| `strings nulByte` (quiet) | 2 | shard 13 |
| `strings tooManyRows` (quiet) | 2 | shard 13 |
| `strings unknownColumn` (quiet) | 2 | shard 13 |
| `strings wrongFile` (quiet) | 2 | shard 13 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T06:35:31.230Z | 4.6 min |
| email | 2026-11-28T06:34:49.020Z | 0.3 min |
| webkit | 2026-11-28T06:35:43.348Z | 13.1 min |
| shard 1 | 2026-11-28T06:35:04.978Z | 6.9 min |
| shard 2 | 2026-11-28T06:35:33.616Z | 10.3 min |
| shard 3 | 2026-11-28T06:34:58.311Z | 7.2 min |
| shard 4 | 2026-11-28T06:38:18.125Z | 7.4 min |
| shard 5 | 2026-11-28T06:35:38.858Z | 7.8 min |
| shard 6 | 2026-11-28T06:35:20.316Z | 6.6 min |
| shard 7 | 2026-11-28T06:35:45.417Z | 8.2 min |
| shard 8 | 2026-11-28T06:35:52.662Z | 8.7 min |
| shard 9 | 2026-11-28T06:35:38.180Z | 7.5 min |
| shard 10 | 2026-11-28T06:35:20.241Z | 6.8 min |
| shard 11 | 2026-11-28T06:35:26.538Z | 6.9 min |
| shard 12 | 2026-11-28T06:35:18.317Z | 7.6 min |
| shard 13 | 2026-11-28T06:38:17.338Z | 7.8 min |
| shard 14 | 2026-11-28T06:36:14.008Z | 7.6 min |
| shard 15 | 2026-11-28T06:38:12.636Z | 9.6 min |
| shard 16 | 2026-11-28T06:35:23.528Z | 6.9 min |
| repeat | 2026-11-28T06:37:24.087Z | 13.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-attributes-editor.spec.ts` | 108 | 10.5 min | shard 7, repeat |
| `failure-crawl-admin-content.spec.ts` | 22 | 10.1 min | shard 2 |
| `shell.spec.ts` | 234 | 9.2 min | shard 1 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.2 min | shard 5 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 4 |
| `admin-countries.spec.ts` | 54 | 7.1 min | smoke, shard 14, repeat |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.0 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | shard 8 |
| `dialogs.spec.ts` | 36 | 6.3 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 6.3 min | smoke, shard 7 |
| `admin-listings.spec.ts` | 82 | 6.2 min | webkit, shard 11 |
| `admin-locations.spec.ts` | 44 | 5.9 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 5.6 min | webkit, shard 6 |
| `auth-signout.spec.ts` | 44 | 5.5 min | webkit, shard 9 |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 5.5 min | shard 15 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 13 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 14 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 16 |
| `admin-users.spec.ts` | 28 | 4.6 min | shard 14 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 12 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 9 |
| `mfa-stepup.spec.ts` | 28 | 3.6 min | webkit, shard 3 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 6 |
| `sage-bands.spec.ts` | 76 | 3.3 min | shard 15 |
| `post-wizard-category.spec.ts` | 54 | 3.2 min | webkit, shard 2 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 3.0 min | shard 7 |
| `admin-monetisation.spec.ts` | 34 | 3.0 min | smoke, shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.8 min | webkit, shard 14 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 13 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 11 |
| `failure-crawl-member-account.spec.ts` | 16 | 2.2 min | shard 8 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 10 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 4 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 1 |
| `admin-shell.spec.ts` | 12 | 1.9 min | shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 3 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 16 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 16 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 1.1 min | webkit, shard 14 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 9 |
| `auth-caller-gates.spec.ts` | 24 | 1.1 min | shard 13, repeat |
| `press.spec.ts` | 22 | 1.1 min | shard 11 |
| `legal-accept.spec.ts` | 36 | 1.0 min | shard 4, repeat |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 3 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 1 |
| `admin-screening-reject.spec.ts` | 10 | 0.9 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.9 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 6 |
| `staff-gate.spec.ts` | 6 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 10 |
| `legal-doors.spec.ts` | 38 | 0.7 min | smoke, shard 6, repeat |
| `admin-errors.spec.ts` | 12 | 0.7 min | shard 10, repeat |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 11 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 2 |
| `settings.spec.ts` | 16 | 0.6 min | shard 10 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 2 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 8 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 1 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 16 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 8 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 7 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 14 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 1 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `page-head.spec.ts` | 4 | 0.2 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 2 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 14 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `error-reports.spec.ts` | 12 | 0.2 min | shard 6, repeat |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 11 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 5 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 14 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 2 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 5, repeat |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 10 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 15 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 11 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7 |
| `offline.spec.ts` | 2 | 0.0 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 278.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 126.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 104.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 80.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 71.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 70.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 68.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 67.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 67.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 61.2 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 55.8 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 55.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 55.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-78 /admin/translations/$lang as staff: loads clean and says every failed read | mobile-360 | 51.6 s |
