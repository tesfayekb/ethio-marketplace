# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43484667160 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43484667160
- Commit: `ddfc6fb0802c880ae6a527dfffc575ee7a63bb5e`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-da35e72b7b7e… (0 read)
- Repeat: 18 of 18 tests repeated — specs directly changed 2/2, importers of a changed helper 0/0; budget 643 s; the time cap left 2 test runs
- Written (UTC): 2026-11-13T19:00:46.697Z
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
| smoke | 2026-11-13T18:42:05.935Z | 0.3 min |
| email | 2026-11-13T18:42:41.561Z | 0.4 min |
| webkit | 2026-11-13T18:43:12.545Z | 10.4 min |
| shard 1 | 2026-11-13T18:42:26.928Z | 9.8 min |
| shard 2 | 2026-11-13T18:42:16.299Z | 9.2 min |
| shard 3 | 2026-11-13T18:42:51.111Z | 11.8 min |
| shard 4 | 2026-11-13T18:43:07.031Z | 10.6 min |
| shard 5 | 2026-11-13T18:43:00.889Z | 10.8 min |
| shard 6 | 2026-11-13T18:42:57.220Z | 11.5 min |
| shard 7 | 2026-11-13T18:42:48.172Z | 9.9 min |
| shard 8 | 2026-11-13T18:43:57.803Z | 11.6 min |
| shard 9 | 2026-11-13T18:42:26.018Z | 10.4 min |
| shard 10 | 2026-11-13T18:42:13.839Z | 9.3 min |
| shard 11 | 2026-11-13T18:45:04.919Z | 12.3 min |
| shard 12 | 2026-11-13T18:42:44.000Z | 11.4 min |
| shard 13 | 2026-11-13T18:42:49.292Z | 9.9 min |
| shard 14 | 2026-11-13T18:46:35.982Z | 11.2 min |
| shard 15 | 2026-11-13T18:44:40.147Z | 11.6 min |
| shard 16 | 2026-11-13T18:43:31.660Z | 12.6 min |
| repeat | 2026-11-13T18:47:13.846Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `dialogs.spec.ts` | 80 | 9.5 min | webkit, shard 10, repeat |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `admin-audit.spec.ts` | 64 | 6.8 min | shard 9, repeat |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 4 |
| `photo-pipeline.spec.ts` | 74 | 5.1 min | webkit, shard 16 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.0 min | shard 2 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `admin-screening.spec.ts` | 58 | 4.9 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 6 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 12 |
| `admin-listings.spec.ts` | 78 | 4.6 min | webkit, shard 10 |
| `admin-users.spec.ts` | 28 | 4.3 min | shard 16 |
| `admin-roles.spec.ts` | 28 | 4.2 min | shard 9 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 15 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 8 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 2.7 min | shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 2.6 min | webkit, shard 11 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `mfa-stepup.spec.ts` | 22 | 2.0 min | webkit, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 1.9 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 8 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 16 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 14 |
| `legal-admin.spec.ts` | 44 | 1.7 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | webkit, shard 12 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 9 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 8 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 5 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `settings.spec.ts` | 9 | 0.2 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 38.2 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 35.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.0 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.2 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
