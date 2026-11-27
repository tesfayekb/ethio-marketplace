# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46051288968 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46051288968
- Commit: `1a1bcd1c31bbdbf009b0029ba0a735a3b463616f`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-fbd77d227a5c… (0 read)
- Repeat: 42 of 1561 tests repeated — specs directly changed 1/1, importers of a changed helper 6/123; budget 793 s
- Measured lane spread (DEC-375 b): mean 453 s, largest 544 s (lane 2, +20 %); within the 25 % limit
- Written (UTC): 2026-11-27T18:57:43.183Z
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
| `categories badHeader` (quiet) | 4 | shard 8, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 5, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 5, shard 8 |
| `categories file too large` (quiet) | 2 | shard 8 |
| `categories nulByte` (quiet) | 2 | shard 8 |
| `categories unknownColumn` (quiet) | 2 | shard 8 |
| `countries badHeader` (quiet) | 2 | shard 8 |
| `countries nulByte` (quiet) | 2 | shard 8 |
| `countries tooManyRows` (quiet) | 2 | shard 8 |
| `countries unknownColumn` (quiet) | 2 | shard 8 |
| `countries wrongFile` (quiet) | 2 | shard 8 |
| `definitions nulByte` (quiet) | 2 | shard 8 |
| `definitions tooManyRows` (quiet) | 2 | shard 8 |
| `definitions unknownColumn` (quiet) | 2 | shard 8 |
| `links unknownColumn` (quiet) | 2 | shard 8 |
| `locations badHeader` (quiet) | 2 | shard 8 |
| `locations file too large` (quiet) | 2 | shard 8 |
| `locations nulByte` (quiet) | 2 | shard 8 |
| `locations unknownColumn` (quiet) | 2 | shard 8 |
| `locations wrongFile` (quiet) | 2 | shard 8 |
| `strings badHeader` (quiet) | 2 | shard 8 |
| `strings emptyFile` (quiet) | 2 | shard 8 |
| `strings nulByte` (quiet) | 2 | shard 8 |
| `strings tooManyRows` (quiet) | 2 | shard 8 |
| `strings unknownColumn` (quiet) | 2 | shard 8 |
| `strings wrongFile` (quiet) | 2 | shard 8 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T18:45:33.168Z | 5.0 min |
| email | 2026-11-27T18:45:07.416Z | 0.3 min |
| webkit | 2026-11-27T18:44:53.992Z | 9.6 min |
| shard 1 | 2026-11-27T18:45:41.609Z | 7.8 min |
| shard 2 | 2026-11-27T18:44:50.439Z | 9.1 min |
| shard 3 | 2026-11-27T18:44:56.659Z | 8.3 min |
| shard 4 | 2026-11-27T18:47:40.654Z | 7.5 min |
| shard 5 | 2026-11-27T18:45:15.441Z | 7.6 min |
| shard 6 | 2026-11-27T18:48:22.677Z | 6.6 min |
| shard 7 | 2026-11-27T18:44:53.218Z | 7.1 min |
| shard 8 | 2026-11-27T18:50:53.463Z | 6.2 min |
| shard 9 | 2026-11-27T18:46:18.735Z | 6.9 min |
| shard 10 | 2026-11-27T18:45:01.061Z | 7.7 min |
| shard 11 | 2026-11-27T18:45:28.011Z | 7.1 min |
| shard 12 | 2026-11-27T18:46:19.062Z | 7.4 min |
| shard 13 | 2026-11-27T18:47:40.060Z | 7.2 min |
| shard 14 | 2026-11-27T18:45:07.870Z | 7.7 min |
| shard 15 | 2026-11-27T18:47:10.409Z | 8.7 min |
| shard 16 | 2026-11-27T18:45:09.383Z | 7.9 min |
| repeat | 2026-11-27T18:45:32.952Z | 10.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-attributes-editor.spec.ts` | 108 | 10.6 min | shard 10, repeat |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `failure-crawl-admin-content.spec.ts` | 18 | 8.5 min | shard 2 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.3 min | shard 4 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.3 min | shard 3 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.7 min | shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 5.9 min | shard 6 |
| `admin-translations-console.spec.ts` | 46 | 5.8 min | smoke, shard 12 |
| `admin-listings.spec.ts` | 82 | 5.6 min | webkit, shard 14 |
| `auth-signout.spec.ts` | 44 | 5.4 min | webkit, shard 5 |
| `admin-locations.spec.ts` | 44 | 5.3 min | shard 10 |
| `admin-screening.spec.ts` | 64 | 5.3 min | webkit, shard 15 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 9 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 16 |
| `dialogs.spec.ts` | 36 | 4.8 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 7 |
| `admin-attributes-links.spec.ts` | 34 | 4.7 min | shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 11 |
| `post-wizard-place.spec.ts` | 40 | 4.5 min | shard 15 |
| `import-security.spec.ts` | 36 | 4.2 min | shard 8 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 9 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 11 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 7 |
| `admin-translations-governance.spec.ts` | 20 | 3.7 min | smoke, shard 1 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | smoke, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 4 |
| `mfa-stepup.spec.ts` | 28 | 3.3 min | webkit, shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 3.0 min | shard 10 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 16 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 3 |
| `post-wizard-category.spec.ts` | 54 | 2.7 min | webkit, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 11 |
| `legal-admin.spec.ts` | 44 | 2.6 min | shard 7 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 12 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.2 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 6 |
| `staff-gate.spec.ts` | 18 | 2.1 min | shard 11, repeat |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 6 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 4 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 3 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 15 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `ad-page-doors.spec.ts` | 90 | 1.5 min | shard 4, repeat |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 5 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 10 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `press.spec.ts` | 22 | 1.2 min | shard 16 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 8 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 1 |
| `admin-screening-reject.spec.ts` | 10 | 0.8 min | shard 2 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 14 |
| `settings.spec.ts` | 16 | 0.6 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 9, repeat |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 1 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 6, repeat |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `page-head.spec.ts` | 4 | 0.2 min | shard 9 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 10, repeat |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 6 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 12 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 13 |
| `auth-google.spec.ts` | 6 | 0.1 min | shard 1, repeat |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 2 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 3 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 6 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 121.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 111.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 100.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 74.8 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 72.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 59.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 59.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 57.1 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.3 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 55.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 53.4 s |
