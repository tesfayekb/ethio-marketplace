# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45847929830 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45847929830
- Commit: `29b0e51619a4b0c16de32c4a8974a6cc42c3705b`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-e9500bc5e7e7… (0 read)
- Repeat: 34 of 1500 tests repeated — specs directly changed 0/0, importers of a changed helper 7/116; budget 656 s; the time cap left 36 test runs
- Written (UTC): 2026-11-26T15:48:48.257Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 776s for the test suite to run
(no place given)
```

```text
Timed out waiting 776s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 16 |
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
| smoke | 2026-11-26T15:23:21.473Z | 6.9 min |
| email | 2026-11-26T15:23:59.179Z | 0.4 min |
| webkit | 2026-11-26T15:23:44.086Z | 11.2 min |
| shard 1 | 2026-11-26T15:23:33.798Z | 5.3 min |
| shard 2 | 2026-11-26T15:23:43.684Z | 10.9 min |
| shard 3 | 2026-11-26T15:23:10.502Z | 7.7 min |
| shard 4 | 2026-11-26T15:24:57.455Z | 11.6 min |
| shard 5 | 2026-11-26T15:24:08.996Z | 20.5 min |
| shard 6 | 2026-11-26T15:23:46.106Z | 15.3 min |
| shard 7 | 2026-11-26T15:23:34.280Z | 10.5 min |
| shard 8 | 2026-11-26T15:23:43.304Z | 14.3 min |
| shard 9 | 2026-11-26T15:23:09.233Z | 11.1 min |
| shard 10 | 2026-11-26T15:23:09.179Z | 24.6 min |
| shard 11 | 2026-11-26T15:27:48.969Z | 6.0 min |
| shard 12 | 2026-11-26T15:23:41.533Z | 5.7 min |
| shard 13 | 2026-11-26T15:25:21.623Z | 12.3 min |
| shard 14 | 2026-11-26T15:23:29.045Z | 20.5 min |
| shard 15 | 2026-11-26T15:25:19.087Z | 15.0 min |
| shard 16 | 2026-11-26T15:23:27.310Z | 13.7 min |
| repeat | 2026-11-26T15:23:24.440Z | 12.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.9 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 21.9 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 21.1 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.4 min | shard 5 |
| `admin-translations-console.spec.ts` | 46 | 19.0 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.8 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 16.7 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.8 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.3 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 14.9 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 54 | 14.7 min | shard 5, repeat |
| `admin-monetisation.spec.ts` | 34 | 13.7 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.6 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 10.9 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 7 |
| `shell.spec.ts` | 234 | 9.1 min | shard 1 |
| `legal-doors.spec.ts` | 34 | 8.9 min | smoke, shard 6 |
| `admin-categories-home.spec.ts` | 30 | 8.1 min | shard 10, repeat |
| `admin-translations-governance.spec.ts` | 20 | 7.2 min | smoke, shard 14 |
| `admin-countries.spec.ts` | 18 | 7.1 min | shard 7 |
| `auth-signout.spec.ts` | 44 | 5.5 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 4 |
| `admin-guides.spec.ts` | 14 | 4.7 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 16 |
| `photo-pipeline.spec.ts` | 74 | 4.1 min | webkit, shard 16 |
| `admin-translations-data.spec.ts` | 10 | 4.1 min | shard 8 |
| `ad-page.spec.ts` | 104 | 4.0 min | webkit, shard 13 |
| `admin-screening-reject.spec.ts` | 10 | 3.9 min | shard 4 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 12 |
| `post-wizard-category.spec.ts` | 54 | 3.0 min | webkit, shard 3 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 6 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.2 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 2.0 min | smoke, shard 9 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 13 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 6 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 13 |
| `admin-services.spec.ts` | 10 | 1.4 min | shard 15 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 15 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 2 |
| `press.spec.ts` | 22 | 1.1 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 4 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.9 min | shard 1 |
| `ad-page-doors.spec.ts` | 90 | 0.9 min | shard 7, repeat |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 11 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 14 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 5 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 7 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 12 |
| `settings.spec.ts` | 16 | 0.6 min | shard 10 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 15 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `page-head.spec.ts` | 4 | 0.5 min | shard 5 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 8 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 3 |
| `account-saved.spec.ts` | 12 | 0.4 min | shard 6, repeat |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 9 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 11 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 16 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 1 |
| `admin-ai-calls.spec.ts` | 6 | 0.2 min | shard 7, repeat |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 2 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 10 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 13 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 14 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 4 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `ad-page-layout.spec.ts` | 6 | 0.1 min | shard 15, repeat |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 2 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 13 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 16 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5 |
| `offline.spec.ts` | 2 | 0.1 min | shard 3 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `fonts.spec.ts` | 6 | 0.0 min | shard 7, repeat |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 60.3 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 60.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 60.0 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 59.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 58.8 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.7 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 51.4 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 46.3 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.3 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.2 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 46.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 45.9 s |
| `admin-monetisation.spec.ts` › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark | mobile-360 | 45.4 s |
