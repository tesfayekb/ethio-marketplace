# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46131049264 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46131049264
- Commit: `a1619ad6d8f7db877569989426fcefed8774c7c1`
- Attempt: 1
- Repeat: nothing to repeat
- Measured lane spread (DEC-375 b): mean 450 s, largest 618 s (lane 1, +37 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T09:49:24.751Z
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
| `categories badHeader` (quiet) | 4 | shard 8, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 8, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 8, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 8, shard 16 |
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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T09:38:01.004Z | 4.5 min |
| email | 2026-11-28T09:40:02.622Z | 0.4 min |
| webkit | 2026-11-28T09:37:43.317Z | 9.9 min |
| shard 1 | 2026-11-28T09:38:12.442Z | 10.3 min |
| shard 2 | 2026-11-28T09:38:27.506Z | 10.1 min |
| shard 3 | 2026-11-28T09:37:41.872Z | 7.4 min |
| shard 4 | 2026-11-28T09:37:46.910Z | 7.3 min |
| shard 5 | 2026-11-28T09:38:07.378Z | 7.1 min |
| shard 6 | 2026-11-28T09:38:29.554Z | 6.7 min |
| shard 7 | 2026-11-28T09:37:47.086Z | 6.7 min |
| shard 8 | 2026-11-28T09:38:00.638Z | 7.1 min |
| shard 9 | 2026-11-28T09:37:45.710Z | 6.9 min |
| shard 10 | 2026-11-28T09:40:48.661Z | 8.1 min |
| shard 11 | 2026-11-28T09:38:05.916Z | 6.9 min |
| shard 12 | 2026-11-28T09:38:12.293Z | 6.9 min |
| shard 13 | 2026-11-28T09:38:48.161Z | 8.1 min |
| shard 14 | 2026-11-28T09:37:40.110Z | 6.8 min |
| shard 15 | 2026-11-28T09:38:49.969Z | 7.3 min |
| shard 16 | 2026-11-28T09:38:09.518Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.5 min | shard 2 |
| `failure-crawl-admin-content.spec.ts` | 22 | 9.5 min | shard 1 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 3 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.0 min | shard 5 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.0 min | shard 4 |
| `auth-signout.spec.ts` | 44 | 6.0 min | webkit, shard 13 |
| `admin-listings.spec.ts` | 82 | 5.9 min | webkit, shard 15 |
| `admin-translations-console.spec.ts` | 46 | 5.8 min | smoke, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 8 |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 2 |
| `admin-screening.spec.ts` | 64 | 5.4 min | webkit, shard 14 |
| `admin-roles.spec.ts` | 28 | 5.3 min | shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 6 |
| `dialogs.spec.ts` | 36 | 5.2 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 16 |
| `admin-locations.spec.ts` | 44 | 4.8 min | shard 15 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 10 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 14 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 12 |
| `import-security.spec.ts` | 36 | 3.6 min | shard 8 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 12 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 12 |
| `mfa-stepup.spec.ts` | 28 | 3.1 min | webkit, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 4 |
| `post-wizard-category.spec.ts` | 54 | 2.9 min | webkit, shard 6 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 9 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 11 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 3 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.3 min | smoke, shard 14 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 13 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 1 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 7 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 3 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 15 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 10 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 16 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 5 |
| `press.spec.ts` | 22 | 1.4 min | shard 2 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 9 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 1 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 5 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 4 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 16 |
| `admin-screening-reject.spec.ts` | 10 | 0.9 min | shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 2 |
| `staff-gate.spec.ts` | 6 | 0.8 min | shard 4 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 11 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 3 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 10 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 16 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 8 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 6 |
| `settings.spec.ts` | 16 | 0.6 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 7 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 9 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 14 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 14 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 5 |
| `admin-errors.spec.ts` | 4 | 0.2 min | shard 1 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `rbac.spec.ts` | 6 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 6 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 14 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 10 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 11 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 1 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 8 |
| `offline.spec.ts` | 2 | 0.1 min | shard 11 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 2 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 13 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 277.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 122.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 109.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 102.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 78.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 69.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 69.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 69.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.5 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 64.6 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 58.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 57.0 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 55.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-75 /admin/legal/$versionId as staff: loads clean and says every failed read | mobile-360 | 52.1 s |
