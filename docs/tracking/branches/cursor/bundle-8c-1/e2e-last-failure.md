# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46081846257 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46081846257
- Commit: `ac3aaa46a35b0f071da8f9beac9949ab18465d57`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-4f4678cbd2e7… (0 read)
- Repeat: 42 of 62 tests repeated — specs directly changed 1/1, importers of a changed helper 5/7; budget 841 s; the time cap left 84 test runs
- Measured lane spread (DEC-375 b): mean 454 s, largest 616 s (lane 2, +36 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-27T23:42:45.767Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 961s for the test suite to run
(no place given)
```

```text
Timed out waiting 961s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 11, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 11, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 14, shard 15 |
| `definitions wrongFile` (quiet) | 4 | shard 14, shard 15 |
| `categories file too large` (quiet) | 2 | shard 15 |
| `categories nulByte` (quiet) | 2 | shard 15 |
| `categories unknownColumn` (quiet) | 2 | shard 15 |
| `countries badHeader` (quiet) | 2 | shard 15 |
| `countries nulByte` (quiet) | 2 | shard 15 |
| `countries tooManyRows` (quiet) | 2 | shard 15 |
| `countries unknownColumn` (quiet) | 2 | shard 15 |
| `countries wrongFile` (quiet) | 2 | shard 15 |
| `definitions nulByte` (quiet) | 2 | shard 15 |
| `definitions tooManyRows` (quiet) | 2 | shard 15 |
| `definitions unknownColumn` (quiet) | 2 | shard 15 |
| `links unknownColumn` (quiet) | 2 | shard 15 |
| `locations badHeader` (quiet) | 2 | shard 15 |
| `locations file too large` (quiet) | 2 | shard 15 |
| `locations nulByte` (quiet) | 2 | shard 15 |
| `locations unknownColumn` (quiet) | 2 | shard 15 |
| `locations wrongFile` (quiet) | 2 | shard 15 |
| `strings badHeader` (quiet) | 2 | shard 15 |
| `strings emptyFile` (quiet) | 2 | shard 15 |
| `strings nulByte` (quiet) | 2 | shard 15 |
| `strings tooManyRows` (quiet) | 2 | shard 15 |
| `strings unknownColumn` (quiet) | 2 | shard 15 |
| `strings wrongFile` (quiet) | 2 | shard 15 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T23:23:18.578Z | 4.3 min |
| email | 2026-11-27T23:23:54.223Z | 0.4 min |
| webkit | 2026-11-27T23:28:10.699Z | 11.2 min |
| shard 1 | 2026-11-27T23:23:08.273Z | 7.3 min |
| shard 2 | 2026-11-27T23:24:43.211Z | 10.3 min |
| shard 3 | 2026-11-27T23:23:22.614Z | 7.4 min |
| shard 4 | 2026-11-27T23:23:04.197Z | 7.3 min |
| shard 5 | 2026-11-27T23:23:02.986Z | 7.4 min |
| shard 6 | 2026-11-27T23:22:59.726Z | 7.4 min |
| shard 7 | 2026-11-27T23:25:34.877Z | 6.8 min |
| shard 8 | 2026-11-27T23:22:47.241Z | 6.6 min |
| shard 9 | 2026-11-27T23:23:17.116Z | 6.6 min |
| shard 10 | 2026-11-27T23:23:56.837Z | 8.7 min |
| shard 11 | 2026-11-27T23:23:51.188Z | 8.2 min |
| shard 12 | 2026-11-27T23:23:12.649Z | 7.5 min |
| shard 13 | 2026-11-27T23:22:57.680Z | 8.3 min |
| shard 14 | 2026-11-27T23:23:04.617Z | 6.5 min |
| shard 15 | 2026-11-27T23:23:02.266Z | 7.1 min |
| shard 16 | 2026-11-27T23:23:44.181Z | 7.8 min |
| repeat | 2026-11-27T23:25:39.983Z | 16.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `failure-crawl-admin-content.spec.ts` | 66 | 18.4 min | shard 2, repeat |
| `failure-crawl-admin-catalog.spec.ts` | 54 | 14.0 min | shard 3, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-listings.spec.ts` | 82 | 7.3 min | webkit, shard 10 |
| `failure-crawl-member-listings.spec.ts` | 30 | 7.2 min | shard 4, repeat |
| `failure-crawl-admin-people.spec.ts` | 42 | 6.8 min | shard 5, repeat |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 6 |
| `admin-locations.spec.ts` | 44 | 5.7 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 5.6 min | webkit, shard 7 |
| `auth-signout.spec.ts` | 44 | 5.4 min | webkit, shard 9 |
| `admin-translations-console.spec.ts` | 46 | 5.2 min | smoke, shard 13 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 15 |
| `dialogs.spec.ts` | 36 | 5.2 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 12 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 16 |
| `admin-roles.spec.ts` | 28 | 4.9 min | shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 4.4 min | shard 10 |
| `ad-page.spec.ts` | 104 | 4.3 min | webkit, shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 12 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 8 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 7 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 5 |
| `mfa-stepup.spec.ts` | 28 | 3.2 min | webkit, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 7 |
| `failure-crawl-public.spec.ts` | 26 | 2.8 min | shard 10 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 12 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 16 |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | shard 11 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 15 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 8 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 3 |
| `failure-crawl-member-public.spec.ts` | 14 | 2.2 min | shard 10 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 4 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.7 min | shard 11 |
| `failure-crawl-member-account.spec.ts` | 48 | 1.6 min | shard 4, repeat |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 1 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 3 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 14 |
| `admin-shell.spec.ts` | 12 | 1.5 min | shard 13 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 7 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 1 |
| `press.spec.ts` | 22 | 1.0 min | shard 14 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 2 |
| `admin-screening-reject.spec.ts` | 10 | 0.9 min | shard 16 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 4 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 9 |
| `house-style.spec.ts` | 18 | 0.8 min | shard 1 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 4 |
| `staff-gate.spec.ts` | 6 | 0.7 min | shard 5 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 2 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 9 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 7 |
| `legal-accept.spec.ts` | 12 | 0.6 min | shard 11 |
| `settings.spec.ts` | 16 | 0.6 min | shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 2 |
| `admin-errors.spec.ts` | 12 | 0.3 min | shard 14, repeat |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 10 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 16 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 14 |
| `submenu.spec.ts` | 14 | 0.2 min | smoke, shard 3 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 13 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 8 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 10 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 1 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 6 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 9 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 3 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 1 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 15 |
| `offline.spec.ts` | 2 | 0.0 min | shard 8 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 6 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 6 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 12 |
| `geo.spec.ts` | 10 | 0.0 min | shard 7 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 279.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 124.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 99.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 75.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 71.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 68.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 67.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 67.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 67.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.3 s |
