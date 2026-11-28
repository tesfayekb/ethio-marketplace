# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46128146011 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46128146011
- Commit: `ba8f16078b44c828c3ce7be241ad8d9ac115535f`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a0fb08345f23… (0 read)
- Repeat: nothing to repeat
- Measured lane spread (DEC-375 b): mean 475 s, largest 600 s (lane 16, +26 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T09:13:28.722Z
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
| `categories badHeader` (quiet) | 4 | shard 10, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 10, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 11, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 11, shard 16 |
| `categories file too large` (quiet) | 2 | shard 11 |
| `categories nulByte` (quiet) | 2 | shard 11 |
| `categories unknownColumn` (quiet) | 2 | shard 11 |
| `countries badHeader` (quiet) | 2 | shard 11 |
| `countries nulByte` (quiet) | 2 | shard 11 |
| `countries tooManyRows` (quiet) | 2 | shard 11 |
| `countries unknownColumn` (quiet) | 2 | shard 11 |
| `countries wrongFile` (quiet) | 2 | shard 11 |
| `definitions nulByte` (quiet) | 2 | shard 11 |
| `definitions tooManyRows` (quiet) | 2 | shard 11 |
| `definitions unknownColumn` (quiet) | 2 | shard 11 |
| `links unknownColumn` (quiet) | 2 | shard 11 |
| `locations badHeader` (quiet) | 2 | shard 11 |
| `locations file too large` (quiet) | 2 | shard 11 |
| `locations nulByte` (quiet) | 2 | shard 11 |
| `locations unknownColumn` (quiet) | 2 | shard 11 |
| `locations wrongFile` (quiet) | 2 | shard 11 |
| `strings badHeader` (quiet) | 2 | shard 11 |
| `strings emptyFile` (quiet) | 2 | shard 11 |
| `strings nulByte` (quiet) | 2 | shard 11 |
| `strings tooManyRows` (quiet) | 2 | shard 11 |
| `strings unknownColumn` (quiet) | 2 | shard 11 |
| `strings wrongFile` (quiet) | 2 | shard 11 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T09:01:20.901Z | 5.5 min |
| email | 2026-11-28T09:00:34.721Z | 0.3 min |
| webkit | 2026-11-28T09:01:13.374Z | 9.6 min |
| shard 1 | 2026-11-28T09:00:29.192Z | 9.9 min |
| shard 2 | 2026-11-28T09:00:28.181Z | 7.8 min |
| shard 3 | 2026-11-28T09:00:39.647Z | 7.5 min |
| shard 4 | 2026-11-28T09:00:26.651Z | 7.6 min |
| shard 5 | 2026-11-28T09:00:27.333Z | 7.1 min |
| shard 6 | 2026-11-28T09:00:52.365Z | 6.9 min |
| shard 7 | 2026-11-28T09:01:12.513Z | 8.7 min |
| shard 8 | 2026-11-28T09:02:09.330Z | 6.6 min |
| shard 9 | 2026-11-28T09:00:18.885Z | 6.1 min |
| shard 10 | 2026-11-28T09:01:20.651Z | 9.0 min |
| shard 11 | 2026-11-28T09:02:28.700Z | 6.9 min |
| shard 12 | 2026-11-28T09:01:12.193Z | 7.4 min |
| shard 13 | 2026-11-28T09:01:17.381Z | 8.1 min |
| shard 14 | 2026-11-28T09:00:16.334Z | 7.4 min |
| shard 15 | 2026-11-28T09:01:09.641Z | 9.7 min |
| shard 16 | 2026-11-28T09:02:23.132Z | 10.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `failure-crawl-admin-content.spec.ts` | 22 | 9.7 min | shard 1 |
| `shell.spec.ts` | 234 | 9.1 min | shard 2 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.3 min | shard 4 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.0 min | shard 5 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.0 min | shard 3 |
| `admin-translations-console.spec.ts` | 46 | 6.3 min | smoke, shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.2 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 5.8 min | shard 15 |
| `admin-roles.spec.ts` | 28 | 5.5 min | shard 13 |
| `admin-categories-console.spec.ts` | 34 | 5.5 min | shard 10 |
| `admin-screening.spec.ts` | 64 | 5.5 min | webkit, shard 14 |
| `dialogs.spec.ts` | 36 | 5.4 min | webkit, shard 16 |
| `auth-signout.spec.ts` | 44 | 5.4 min | webkit, shard 12 |
| `admin-listings.spec.ts` | 82 | 5.2 min | webkit, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 5.1 min | shard 10 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 15 |
| `admin-locations.spec.ts` | 44 | 4.9 min | shard 8 |
| `post-wizard-where.spec.ts` | 32 | 4.8 min | shard 7 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `post-wizard-place.spec.ts` | 40 | 4.7 min | shard 14 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 4.1 min | shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.7 min | smoke, shard 3 |
| `choice-lists.spec.ts` | 96 | 3.7 min | shard 15 |
| `mfa-stepup.spec.ts` | 28 | 3.6 min | webkit, shard 6 |
| `import-security.spec.ts` | 36 | 3.6 min | shard 11 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 11 |
| `posting-routes.spec.ts` | 80 | 3.5 min | shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 3.0 min | shard 13 |
| `post-wizard-category.spec.ts` | 54 | 2.9 min | webkit, shard 12 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 5 |
| `failure-crawl-public.spec.ts` | 26 | 2.6 min | shard 2 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 14 |
| `admin-attributes-import.spec.ts` | 40 | 2.5 min | shard 16 |
| `admin-countries.spec.ts` | 18 | 2.4 min | smoke, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | shard 7 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 6 |
| `admin-categories-home.spec.ts` | 10 | 2.0 min | shard 10 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 9 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 5 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 1 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `press.spec.ts` | 22 | 1.3 min | shard 7 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 4 |
| `my-listings-page.spec.ts` | 24 | 1.2 min | webkit, shard 15 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `house-style.spec.ts` | 18 | 1.1 min | shard 7 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 6 |
| `admin-screening-reject.spec.ts` | 10 | 0.9 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 8 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 2 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 3 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 11 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 10 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 5 |
| `settings.spec.ts` | 16 | 0.6 min | shard 1 |
| `post-wizard-finder.spec.ts` | 8 | 0.6 min | shard 16 |
| `staff-gate.spec.ts` | 6 | 0.5 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 7 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.4 min | smoke, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 10 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 1 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 15 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 3 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 16 |
| `admin-errors.spec.ts` | 4 | 0.2 min | shard 6 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 13 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 2 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 11 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 16 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 10 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 6 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 2 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 3 |
| `offline.spec.ts` | 2 | 0.0 min | shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 13 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 8 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 8 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 122.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 109.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 104.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 78.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 68.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 68.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 68.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 65.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 58.2 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 56.7 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.3 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 52.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 51.3 s |
