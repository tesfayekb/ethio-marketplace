# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45894289368 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45894289368
- Commit: `53a2eee3fc892d18063dca5f7d73280235e618a7`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-b73d37a70d60… (0 read)
- Repeat: 38 of 58 tests repeated — specs directly changed 5/7, importers of a changed helper 0/0; budget 793 s; the time cap left 76 test runs
- Written (UTC): 2026-11-26T21:24:00.333Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 913s for the test suite to run
(no place given)
```

```text
Timed out waiting 913s for the teardown for test suite to run
(no place given)
```

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
| smoke | 2026-11-26T20:56:58.668Z | 6.8 min |
| email | 2026-11-26T20:57:16.334Z | 0.3 min |
| webkit | 2026-11-26T20:57:37.424Z | 10.5 min |
| shard 1 | 2026-11-26T20:57:30.731Z | 12.0 min |
| shard 2 | 2026-11-26T20:57:14.136Z | 10.8 min |
| shard 3 | 2026-11-26T20:57:18.715Z | 8.7 min |
| shard 4 | 2026-11-26T20:58:32.468Z | 7.5 min |
| shard 5 | 2026-11-26T21:00:47.362Z | 17.8 min |
| shard 6 | 2026-11-26T20:57:53.869Z | 19.1 min |
| shard 7 | 2026-11-26T20:57:18.588Z | 16.3 min |
| shard 8 | 2026-11-26T20:57:57.880Z | 13.0 min |
| shard 9 | 2026-11-26T21:00:11.096Z | 9.4 min |
| shard 10 | 2026-11-26T20:57:05.206Z | 18.2 min |
| shard 11 | 2026-11-26T20:57:26.680Z | 25.8 min |
| shard 12 | 2026-11-26T20:57:24.160Z | 14.6 min |
| shard 13 | 2026-11-26T20:57:53.296Z | 11.3 min |
| shard 14 | 2026-11-26T20:59:31.722Z | 18.7 min |
| shard 15 | 2026-11-26T20:57:38.415Z | 16.6 min |
| shard 16 | 2026-11-26T20:57:06.815Z | 12.2 min |
| repeat | 2026-11-26T20:57:26.540Z | 15.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.1 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 23.0 min | shard 11 |
| `admin-screening.spec.ts` | 64 | 21.3 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 20.9 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.3 min | smoke, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 17.3 min | shard 5 |
| `failure-crawl-admin-content.spec.ts` | 54 | 17.0 min | shard 2, repeat |
| `admin-attributes-library.spec.ts` | 42 | 17.0 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 15.3 min | shard 10 |
| `admin-locations.spec.ts` | 44 | 14.6 min | shard 10 |
| `failure-crawl-admin-catalog.spec.ts` | 54 | 14.1 min | shard 4, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.4 min | smoke, shard 6 |
| `import-security.spec.ts` | 36 | 11.6 min | shard 8 |
| `admin-roles.spec.ts` | 28 | 11.0 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 9.6 min | smoke, shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 11 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `admin-attributes-safety.spec.ts` | 18 | 7.4 min | shard 11 |
| `failure-crawl-member-listings.spec.ts` | 30 | 7.2 min | shard 3, repeat |
| `admin-countries.spec.ts` | 18 | 6.9 min | shard 8 |
| `failure-crawl-admin-people.spec.ts` | 42 | 6.7 min | shard 5, repeat |
| `admin-translations-governance.spec.ts` | 20 | 5.9 min | smoke, shard 1 |
| `dialogs.spec.ts` | 36 | 5.8 min | webkit, shard 9 |
| `ad-page.spec.ts` | 104 | 5.7 min | webkit, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 5.3 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 5 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.8 min | shard 15 |
| `admin-guides.spec.ts` | 14 | 4.8 min | shard 2 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 13 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.4 min | shard 7 |
| `admin-screening-reject.spec.ts` | 10 | 4.2 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 4.0 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7 |
| `photo-pipeline.spec.ts` | 74 | 3.6 min | webkit, shard 12 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 3 |
| `post-wizard-category.spec.ts` | 54 | 3.3 min | webkit, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 3.1 min | shard 9 |
| `mfa-stepup.spec.ts` | 28 | 3.0 min | webkit, shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 4 |
| `failure-crawl-public.spec.ts` | 26 | 2.4 min | shard 12 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 10 |
| `choice-lists.spec.ts` | 96 | 2.4 min | shard 3 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 16 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 6 |
| `admin-services.spec.ts` | 10 | 1.9 min | shard 1 |
| `failure-crawl-member-account.spec.ts` | 48 | 1.8 min | shard 15, repeat |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 14 |
| `name-check-queue.spec.ts` | 8 | 1.7 min | smoke, shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.2 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 12 |
| `my-listings-doors.spec.ts` | 28 | 1.1 min | shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.1 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 8 |
| `page-head.spec.ts` | 4 | 1.0 min | shard 9 |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | shard 10 |
| `press.spec.ts` | 22 | 0.9 min | shard 16 |
| `staff-gate.spec.ts` | 4 | 0.8 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 11 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 14 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 12 |
| `overlays.spec.ts` | 8 | 0.5 min | shard 6 |
| `settings.spec.ts` | 16 | 0.5 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 4 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 12 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 3 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 4 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 8 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 14 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 15 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 10 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 13 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 2 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 15 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 7 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 9 |
| `offline.spec.ts` | 2 | 0.0 min | shard 11 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 277.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 137.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 122.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 109.0 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 106.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 98.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 74.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 69.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 67.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 66.1 s |
