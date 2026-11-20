# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44693235025 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44693235025
- Commit: `44e2be0298415f06bb5873521d27a3dc63a722b7`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-20T07:27:50.914Z
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
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T08:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T07:16:38.012Z | 4.4 min |
| email | 2026-11-20T07:15:50.827Z | 0.3 min |
| webkit | 2026-11-20T07:16:44.716Z | 10.6 min |
| shard 1 | 2026-11-20T07:17:13.306Z | 6.1 min |
| shard 2 | 2026-11-20T07:20:56.392Z | 5.3 min |
| shard 3 | 2026-11-20T07:18:26.136Z | 5.8 min |
| shard 4 | 2026-11-20T07:17:37.415Z | 5.5 min |
| shard 5 | 2026-11-20T07:18:59.184Z | 6.0 min |
| shard 6 | 2026-11-20T07:16:36.557Z | 6.0 min |
| shard 7 | 2026-11-20T07:16:18.472Z | 7.1 min |
| shard 8 | 2026-11-20T07:16:59.647Z | 5.5 min |
| shard 9 | 2026-11-20T07:17:54.969Z | 5.5 min |
| shard 10 | 2026-11-20T07:17:58.614Z | 5.3 min |
| shard 11 | 2026-11-20T07:16:29.043Z | 7.5 min |
| shard 12 | 2026-11-20T07:18:49.466Z | 5.8 min |
| shard 13 | 2026-11-20T07:19:35.886Z | 4.9 min |
| shard 14 | 2026-11-20T07:17:54.409Z | 5.4 min |
| shard 15 | 2026-11-20T07:19:36.401Z | 6.1 min |
| shard 16 | 2026-11-20T07:16:01.069Z | 5.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.3 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 5.5 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 5.4 min | shard 11 |
| `admin-listings.spec.ts` | 78 | 5.1 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 5.0 min | shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 3 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `admin-screening.spec.ts` | 58 | 4.9 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 6 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `ad-page.spec.ts` | 104 | 4.7 min | webkit, shard 13 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `photo-pipeline.spec.ts` | 74 | 4.2 min | webkit, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `choice-lists.spec.ts` | 96 | 3.7 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `dialogs.spec.ts` | 20 | 2.9 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `legal-admin.spec.ts` | 44 | 2.7 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.7 min | webkit, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 1.2 min | webkit, shard 7 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.8 min | shard 11 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.8 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 37.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.6 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 32.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 30.3 s |
