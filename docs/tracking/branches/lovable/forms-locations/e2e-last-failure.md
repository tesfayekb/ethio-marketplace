# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43849416511 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43849416511
- Commit: `8bdfe235751ddf6cf38bd9827d85c3ed347930c6`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-1792f370f61d… (0 read)
- Repeat: 19 of 19 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s; the time cap left 16 test runs
- Written (UTC): 2026-11-16T10:49:55.483Z
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
| smoke | 2026-11-16T10:33:37.280Z | 3.4 min |
| email | 2026-11-16T10:34:01.866Z | 0.3 min |
| webkit | 2026-11-16T10:34:31.785Z | 9.1 min |
| shard 1 | 2026-11-16T10:34:04.213Z | 5.4 min |
| shard 2 | 2026-11-16T10:36:08.030Z | 5.4 min |
| shard 3 | 2026-11-16T10:33:52.508Z | 5.6 min |
| shard 4 | 2026-11-16T10:33:22.028Z | 5.7 min |
| shard 5 | 2026-11-16T10:33:48.534Z | 6.1 min |
| shard 6 | 2026-11-16T10:33:26.702Z | 5.5 min |
| shard 7 | 2026-11-16T10:33:40.163Z | 5.2 min |
| shard 8 | 2026-11-16T10:33:29.895Z | 5.6 min |
| shard 9 | 2026-11-16T10:33:29.653Z | 5.7 min |
| shard 10 | 2026-11-16T10:33:21.588Z | 5.2 min |
| shard 11 | 2026-11-16T10:34:08.194Z | 6.8 min |
| shard 12 | 2026-11-16T10:33:20.659Z | 5.8 min |
| shard 13 | 2026-11-16T10:33:40.673Z | 4.9 min |
| shard 14 | 2026-11-16T10:37:38.352Z | 5.7 min |
| shard 15 | 2026-11-16T10:33:49.669Z | 6.2 min |
| shard 16 | 2026-11-16T10:34:10.338Z | 7.2 min |
| repeat | 2026-11-16T10:36:08.581Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-locations.spec.ts` | 152 | 16.8 min | shard 6, repeat |
| `shell.spec.ts` | 234 | 9.4 min | shard 1 |
| `photo-pipeline.spec.ts` | 74 | 5.6 min | webkit, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 5.5 min | webkit, shard 10 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 3 |
| `admin-screening.spec.ts` | 58 | 4.8 min | webkit, shard 14 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `ad-page.spec.ts` | 104 | 4.6 min | webkit, shard 13 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `auth-signout.spec.ts` | 36 | 3.2 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `admin-monetisation.spec.ts` | 34 | 2.9 min | smoke, shard 10 |
| `dialogs.spec.ts` | 20 | 2.7 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 14 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `house-style.spec.ts` | 12 | 0.6 min | shard 11 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 33.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
