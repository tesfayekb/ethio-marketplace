# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46155648189 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46155648189
- Commit: `6493ccfff2eb2d89a9d4e8c2ac481abf261161a0`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-d5ce1f32f564… (0 read)
- Repeat: nothing to repeat
- Measured lane spread (DEC-375 b): mean 474 s, largest 606 s (lane 1, +28 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T15:05:15.323Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 9, shard 10 |
| `categories wrongFile` (quiet) | 4 | shard 9, shard 10 |
| `definitions badHeader` (quiet) | 4 | shard 7, shard 10 |
| `definitions wrongFile` (quiet) | 4 | shard 7, shard 10 |
| `categories file too large` (quiet) | 2 | shard 10 |
| `categories nulByte` (quiet) | 2 | shard 10 |
| `categories unknownColumn` (quiet) | 2 | shard 10 |
| `countries badHeader` (quiet) | 2 | shard 10 |
| `countries nulByte` (quiet) | 2 | shard 10 |
| `countries tooManyRows` (quiet) | 2 | shard 10 |
| `countries unknownColumn` (quiet) | 2 | shard 10 |
| `countries wrongFile` (quiet) | 2 | shard 10 |
| `definitions nulByte` (quiet) | 2 | shard 10 |
| `definitions tooManyRows` (quiet) | 2 | shard 10 |
| `definitions unknownColumn` (quiet) | 2 | shard 10 |
| `links unknownColumn` (quiet) | 2 | shard 10 |
| `locations badHeader` (quiet) | 2 | shard 10 |
| `locations file too large` (quiet) | 2 | shard 10 |
| `locations nulByte` (quiet) | 2 | shard 10 |
| `locations unknownColumn` (quiet) | 2 | shard 10 |
| `locations wrongFile` (quiet) | 2 | shard 10 |
| `strings badHeader` (quiet) | 2 | shard 10 |
| `strings emptyFile` (quiet) | 2 | shard 10 |
| `strings nulByte` (quiet) | 2 | shard 10 |
| `strings tooManyRows` (quiet) | 2 | shard 10 |
| `strings unknownColumn` (quiet) | 2 | shard 10 |
| `strings wrongFile` (quiet) | 2 | shard 10 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T14:51:23.698Z | 4.4 min |
| email | 2026-11-28T14:51:33.856Z | 0.3 min |
| webkit | 2026-11-28T14:52:13.735Z | 9.7 min |
| shard 1 | 2026-11-28T14:54:33.742Z | 10.1 min |
| shard 2 | 2026-11-28T14:51:20.202Z | 7.9 min |
| shard 3 | 2026-11-28T14:52:12.869Z | 7.9 min |
| shard 4 | 2026-11-28T14:52:48.782Z | 6.4 min |
| shard 5 | 2026-11-28T14:51:43.685Z | 7.1 min |
| shard 6 | 2026-11-28T14:52:22.852Z | 8.2 min |
| shard 7 | 2026-11-28T14:51:43.675Z | 7.0 min |
| shard 8 | 2026-11-28T14:51:49.514Z | 7.4 min |
| shard 9 | 2026-11-28T14:51:42.960Z | 7.2 min |
| shard 10 | 2026-11-28T14:52:50.915Z | 10.0 min |
| shard 11 | 2026-11-28T14:51:46.629Z | 7.6 min |
| shard 12 | 2026-11-28T14:51:42.229Z | 7.5 min |
| shard 13 | 2026-11-28T14:51:22.484Z | 7.3 min |
| shard 14 | 2026-11-28T14:51:53.054Z | 8.5 min |
| shard 15 | 2026-11-28T14:52:00.023Z | 7.3 min |
| shard 16 | 2026-11-28T14:52:09.000Z | 9.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `failure-crawl-admin-content.spec.ts` | 22 | 10.0 min | shard 1 |
| `shell.spec.ts` | 234 | 9.1 min | shard 2 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.8 min | shard 6 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.5 min | shard 3 |
| `import-security.spec.ts` | 36 | 7.3 min | shard 10 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.0 min | shard 5 |
| `admin-listings.spec.ts` | 82 | 6.6 min | webkit, shard 11 |
| `auth-signout.spec.ts` | 44 | 6.3 min | webkit, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 5.7 min | shard 16 |
| `admin-screening.spec.ts` | 64 | 5.4 min | webkit, shard 7 |
| `admin-translations-console.spec.ts` | 46 | 5.4 min | smoke, shard 12 |
| `ad-page.spec.ts` | 104 | 5.3 min | webkit, shard 10 |
| `admin-roles.spec.ts` | 28 | 5.2 min | shard 14 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 5.1 min | shard 10 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 15 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 1 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 4.3 min | webkit, shard 11 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 9 |
| `post-wizard-category.spec.ts` | 54 | 3.9 min | webkit, shard 6 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 12 |
| `mfa-stepup.spec.ts` | 28 | 3.5 min | webkit, shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 3 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 7 |
| `legal-admin.spec.ts` | 44 | 2.9 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 2.9 min | smoke, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.8 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 2.8 min | smoke, shard 6 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 12 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 14 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 5 |
| `admin-translations-data.spec.ts` | 10 | 2.3 min | shard 16 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 2.2 min | shard 16 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 15 |
| `failure-crawl-member-public.spec.ts` | 14 | 2.0 min | shard 3 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 8 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 8 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 7 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 10 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.3 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 4 |
| `press.spec.ts` | 22 | 1.2 min | shard 14 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 1 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 1 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 15 |
| `admin-screening-reject.spec.ts` | 10 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 14 |
| `house-style.spec.ts` | 18 | 0.8 min | shard 3 |
| `staff-gate.spec.ts` | 6 | 0.8 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 2 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 6 |
| `settings.spec.ts` | 16 | 0.6 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 9 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 2 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 15 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 12 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 12 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 7 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 13 |
| `admin-errors.spec.ts` | 4 | 0.3 min | shard 16 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 10 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 7 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 4 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 6 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 5 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 10 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 5 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 7 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 15 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 1 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 7 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 13 |
| `offline.spec.ts` | 2 | 0.0 min | shard 5 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 9 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 12 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 283.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.8 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 113.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 101.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 83.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 75.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 68.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.3 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 65.9 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 65.6 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 61.9 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 59.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 58.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 57.4 s |
