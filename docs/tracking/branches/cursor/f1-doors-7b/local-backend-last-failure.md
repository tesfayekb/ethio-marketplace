# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44669438676 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44669438676
- Commit: `ef7b55059998a92770d6bc2427462f23039a0483`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-20T03:58:38.386Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>` | 2 | shard 2 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>

- Count: 2 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T04:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T03:46:33.305Z | 3.7 min |
| email | 2026-11-20T03:45:02.598Z | 0.3 min |
| webkit | 2026-11-20T03:47:58.880Z | 8.4 min |
| shard 1 | 2026-11-20T03:45:12.122Z | 5.5 min |
| shard 2 | 2026-11-20T03:48:39.283Z | 6.2 min |
| shard 3 | 2026-11-20T03:48:36.476Z | 5.8 min |
| shard 4 | 2026-11-20T03:47:10.517Z | 5.9 min |
| shard 5 | 2026-11-20T03:45:50.970Z | 6.6 min |
| shard 6 | 2026-11-20T03:49:21.787Z | 5.6 min |
| shard 7 | 2026-11-20T03:46:13.435Z | 5.3 min |
| shard 8 | 2026-11-20T03:49:01.205Z | 5.6 min |
| shard 9 | 2026-11-20T03:51:30.905Z | 5.4 min |
| shard 10 | 2026-11-20T03:52:33.439Z | 5.5 min |
| shard 11 | 2026-11-20T03:45:40.690Z | 6.6 min |
| shard 12 | 2026-11-20T03:46:14.018Z | 5.9 min |
| shard 13 | 2026-11-20T03:47:01.571Z | 6.3 min |
| shard 14 | 2026-11-20T03:49:32.082Z | 5.2 min |
| shard 15 | 2026-11-20T03:45:37.075Z | 6.1 min |
| shard 16 | 2026-11-20T03:45:39.658Z | 5.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.1 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 5.7 min | webkit, shard 10 |
| `import-security.spec.ts` | 36 | 5.4 min | shard 4 |
| `ad-page.spec.ts` | 104 | 5.3 min | webkit, shard 13 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 4.9 min | shard 13 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 58 | 4.7 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 4.1 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 2 |
| `dialogs.spec.ts` | 20 | 2.7 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `house-style.spec.ts` | 12 | 0.6 min | shard 11 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
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
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 36.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 31.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
