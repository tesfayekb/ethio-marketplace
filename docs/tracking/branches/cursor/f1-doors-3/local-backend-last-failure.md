# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43626312389 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43626312389
- Commit: `7b53aae8929656cbc95e8bc69cf59eb4312b005a`
- Attempt: 1
- Repeat: 27 of 65 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s; the time cap left 7 test runs
- Written (UTC): 2026-11-14T18:40:29.173Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 763s for the test suite to run
(no place given)
```

```text
Timed out waiting 763s for the teardown for test suite to run
(no place given)
```

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
| smoke | 2026-11-14T18:27:12.071Z | 4.5 min |
| email | 2026-11-14T18:28:19.713Z | 0.3 min |
| webkit | 2026-11-14T18:26:35.034Z | 8.0 min |
| shard 1 | 2026-11-14T18:26:30.151Z | 5.5 min |
| shard 2 | 2026-11-14T18:27:22.457Z | 7.3 min |
| shard 3 | 2026-11-14T18:26:22.880Z | 5.9 min |
| shard 4 | 2026-11-14T18:27:04.495Z | 6.1 min |
| shard 5 | 2026-11-14T18:26:27.658Z | 6.0 min |
| shard 6 | 2026-11-14T18:28:57.167Z | 6.3 min |
| shard 7 | 2026-11-14T18:27:08.937Z | 6.6 min |
| shard 8 | 2026-11-14T18:27:00.788Z | 6.3 min |
| shard 9 | 2026-11-14T18:27:23.476Z | 6.5 min |
| shard 10 | 2026-11-14T18:34:50.554Z | 4.9 min |
| shard 11 | 2026-11-14T18:26:23.158Z | 5.8 min |
| shard 12 | 2026-11-14T18:31:33.897Z | 7.9 min |
| shard 13 | 2026-11-14T18:26:50.954Z | 4.9 min |
| shard 14 | 2026-11-14T18:26:25.984Z | 5.2 min |
| shard 15 | 2026-11-14T18:26:24.509Z | 6.1 min |
| shard 16 | 2026-11-14T18:32:31.149Z | 7.3 min |
| repeat | 2026-11-14T18:27:08.744Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-translations-console.spec.ts` | 134 | 14.5 min | smoke, shard 8, repeat |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 5.8 min | shard 12 |
| `photo-pipeline.spec.ts` | 74 | 5.6 min | webkit, shard 16 |
| `import-security.spec.ts` | 36 | 5.4 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `admin-categories-console.spec.ts` | 34 | 5.2 min | shard 7 |
| `admin-locations.spec.ts` | 38 | 5.1 min | shard 6 |
| `admin-translations-data.spec.ts` | 30 | 5.0 min | shard 5, repeat |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 9 |
| `admin-listings.spec.ts` | 78 | 5.0 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-screening.spec.ts` | 58 | 4.4 min | webkit, shard 14 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `auth-signout.spec.ts` | 36 | 3.6 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `admin-translations-governance.spec.ts` | 20 | 3.6 min | smoke, shard 16 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `posting-routes.spec.ts` | 80 | 3.3 min | shard 2 |
| `post-wizard-category.spec.ts` | 52 | 3.3 min | webkit, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 6 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.5 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 2.0 min | webkit, shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.3 min | shard 2 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 47.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 37.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
