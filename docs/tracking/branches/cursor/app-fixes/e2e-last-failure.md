# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43488341499 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43488341499
- Commit: `27147a26da25fcb7df989d229f0026a6d6d5ce87`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-3fe83d945dc0… (0 read)
- Repeat: 18 of 18 tests repeated — specs directly changed 2/2, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-13T19:20:01.674Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (1)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 1 in the results file; the log's summary says 1

```text
Timed out waiting 763s for the teardown for global teardown to run
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
| smoke | 2026-11-13T19:05:47.554Z | 2.6 min |
| email | 2026-11-13T19:05:37.853Z | 0.4 min |
| webkit | 2026-11-13T19:08:58.408Z | 7.0 min |
| shard 1 | 2026-11-13T19:06:44.054Z | 10.2 min |
| shard 2 | 2026-11-13T19:05:44.336Z | 10.3 min |
| shard 3 | 2026-11-13T19:06:05.675Z | 11.6 min |
| shard 4 | 2026-11-13T19:06:00.369Z | 12.0 min |
| shard 5 | 2026-11-13T19:06:04.761Z | 11.0 min |
| shard 6 | 2026-11-13T19:06:59.022Z | 11.1 min |
| shard 7 | 2026-11-13T19:05:43.506Z | 8.8 min |
| shard 8 | 2026-11-13T19:07:00.726Z | 9.2 min |
| shard 9 | 2026-11-13T19:06:11.297Z | 11.7 min |
| shard 10 | 2026-11-13T19:09:44.031Z | 9.2 min |
| shard 11 | 2026-11-13T19:06:00.009Z | 10.6 min |
| shard 12 | 2026-11-13T19:07:54.908Z | 10.7 min |
| shard 13 | 2026-11-13T19:06:01.373Z | 11.0 min |
| shard 14 | 2026-11-13T19:07:41.188Z | 11.4 min |
| shard 15 | 2026-11-13T19:05:51.723Z | 9.7 min |
| shard 16 | 2026-11-13T19:06:11.477Z | 9.5 min |
| repeat | 2026-11-13T19:06:22.737Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `dialogs.spec.ts` | 80 | 9.8 min | webkit, shard 10, repeat |
| `shell.spec.ts` | 234 | 9.4 min | shard 1 |
| `admin-audit.spec.ts` | 64 | 6.2 min | shard 9, repeat |
| `import-security.spec.ts` | 36 | 5.7 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 2 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `ad-page.spec.ts` | 104 | 4.9 min | webkit, shard 13 |
| `admin-screening.spec.ts` | 58 | 4.8 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 4.6 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `admin-listings.spec.ts` | 78 | 4.3 min | webkit, shard 10 |
| `admin-translations-console.spec.ts` | 46 | 4.2 min | smoke, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `admin-categories-console.spec.ts` | 34 | 3.8 min | shard 7 |
| `admin-users.spec.ts` | 28 | 3.5 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 14 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `auth-signout.spec.ts` | 36 | 3.4 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.3 min | smoke, shard 16 |
| `photo-pipeline.spec.ts` | 74 | 3.3 min | webkit, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 15 |
| `post-wizard-category.spec.ts` | 52 | 3.1 min | webkit, shard 4 |
| `admin-monetisation.spec.ts` | 34 | 2.9 min | shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 2.7 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 2 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.2 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `mfa-stepup.spec.ts` | 22 | 1.5 min | webkit, shard 15 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `legal-admin.spec.ts` | 44 | 1.4 min | shard 7 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.3 min | shard 8 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 13 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 9 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 12 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `press.spec.ts` | 22 | 0.9 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `my-listings-page.spec.ts` | 20 | 0.7 min | webkit, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `sage-shell.spec.ts` | 80 | 0.5 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `layout.spec.ts` | 18 | 0.3 min | webkit, shard 10 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 11 |
| `shell-bands.spec.ts` | 16 | 0.2 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.2 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.6 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 44.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.8 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
