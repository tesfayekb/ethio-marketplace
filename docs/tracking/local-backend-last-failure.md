# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 41298434038 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41298434038
- Commit: `043f8aa925ec2d417b8430da069b6d2eea285ebf`
- Attempt: 1
- Written (UTC): 2026-11-01T11:00:14.940Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 840s for the test suite to run
(no place given)
```

```text
Timed out waiting 840s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-01T10:42:58.476Z | 13.7 min |
| email | 2026-11-01T10:42:40.208Z | 0.4 min |
| shard 1 | 2026-11-01T10:42:45.204Z | 12.1 min |
| shard 2 | 2026-11-01T10:42:50.730Z | 16.9 min |
| shard 3 | 2026-11-01T10:42:53.714Z | 9.4 min |
| shard 4 | 2026-11-01T10:46:27.753Z | 10.0 min |
| shard 5 | 2026-11-01T10:42:06.406Z | 8.1 min |
| shard 6 | 2026-11-01T10:42:01.112Z | 10.2 min |
| shard 7 | 2026-11-01T10:45:23.950Z | 3.6 min |
| shard 8 | 2026-11-01T10:42:50.910Z | 8.2 min |
| shard 9 | 2026-11-01T10:43:42.468Z | 9.8 min |
| shard 10 | 2026-11-01T10:43:16.730Z | 15.7 min |
| shard 11 | 2026-11-01T10:42:59.910Z | 11.6 min |
| shard 12 | 2026-11-01T10:42:39.431Z | 10.1 min |
| shard 13 | 2026-11-01T10:43:51.436Z | 11.1 min |
| shard 14 | 2026-11-01T10:42:40.367Z | 11.7 min |
| shard 15 | 2026-11-01T10:43:00.465Z | 2.7 min |
| shard 16 | 2026-11-01T10:42:39.334Z | 8.0 min |
| repeat | 2026-11-01T10:42:27.224Z | 14.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.9 min | smoke, shard 8, shard 16 |
| `post-wizard-place.spec.ts` | 114 | 10.3 min | shard 6, shard 14, repeat |
| `auth-signout.spec.ts` | 68 | 6.5 min | smoke, shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 4, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.0 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 5, shard 13 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 11 |
| `dialogs.spec.ts` | 42 | 4.5 min | shard 3, shard 11, repeat |
| `admin-roles.spec.ts` | 26 | 4.4 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.4 min | shard 2, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 6, shard 14 |
| `admin-audit.spec.ts` | 42 | 4.1 min | shard 1, shard 9, repeat |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.0 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `admin-listings.spec.ts` | 62 | 3.7 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.6 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 3.3 min | shard 5, shard 13 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `choice-lists.spec.ts` | 96 | 3.0 min | shard 3, shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 2.9 min | shard 1, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 7, shard 15 |
| `ad-page.spec.ts` | 78 | 2.6 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.3 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 6, shard 14 |
| `legal-admin.spec.ts` | 42 | 2.0 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 20 | 1.6 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | shard 2, shard 10, repeat |
| `admin-attributes-import.spec.ts` | 40 | 1.3 min | shard 1, shard 9 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `press.spec.ts` | 16 | 0.9 min | shard 7, shard 15 |
| `admin-coverage.spec.ts` | 16 | 0.9 min | shard 2, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 1, shard 9, repeat |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 10 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `admin-ai-calls.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 11 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `overlays.spec.ts` | 8 | 0.1 min | shard 5, shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
