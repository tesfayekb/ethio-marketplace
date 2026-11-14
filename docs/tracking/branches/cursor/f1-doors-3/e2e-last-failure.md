# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43609766468 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43609766468
- Commit: `c1a8bdb595b60dbdd0ab83eabf3d5110397d6a02`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-585b4a730591… (0 read)
- Repeat: 27 of 65 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-14T15:38:55.947Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 13` · submenu-touch.spec.ts › SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's — Error: SMN-E3 a panel row is at most the rail's (D248)

## Flaky bodies (DEC-078)

### submenu-touch.spec.ts › SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: SMN-E3 a panel row is at most the rail's (D248)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 42.5
Received:    44.265625
--- further error 1 ---
Error: SMN-E3 a panel row is at most the rail's (D248)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 42.5
Received:    44.265625

  63 |     .evaluate((el) => (el.closest("li") ?? el).getBoundingClientRect().height);
  64 |   for (const height of panelRows) {
> 65 |     expect(height, "SMN-E3 a panel row is at most the rail's (D248)").toBeLessThanOrEqual(
     |                                                                       ^
  66 |       railRow + 1,
  67 |     );
  68 |     expect(height, "SMN-E3 a panel row keeps the 32 px floor (D248)").toBeGreaterThanOrEqual(31.5);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/submenu-touch.spec.ts:65:71
```

Context:

```text
        - link "Printers & Office Electronics" [ref=e371] [cursor=pointer]:
          - /url: /c/printers-office
          - img [ref=e373]
          - generic [ref=e378]: Printers & Office Electronics
      - listitem [ref=e379]:
        - link "Accessories & Parts" [ref=e380] [cursor=pointer]:
          - /url: /c/electronics-accessories
          - img [ref=e382]
          - generic [ref=e387]: Accessories & Parts
      - listitem [ref=e388]:
        - link "Repair & Maintenance" [ref=e389] [cursor=pointer]:
          - /url: /c/repair-maintenance
          - img [ref=e391]
          - generic [ref=e396]: Repair & Maintenance
      - listitem [ref=e397]:
        - link "Other Electronics" [ref=e398] [cursor=pointer]:
          - /url: /c/other-electronics
          - img [ref=e400]
          - generic [ref=e405]: Other Electronics
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

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
| smoke | 2026-11-14T15:25:34.307Z | 4.1 min |
| email | 2026-11-14T15:25:34.956Z | 0.4 min |
| webkit | 2026-11-14T15:26:01.273Z | 9.8 min |
| shard 1 | 2026-11-14T15:24:45.574Z | 5.4 min |
| shard 2 | 2026-11-14T15:24:50.550Z | 5.2 min |
| shard 3 | 2026-11-14T15:27:50.958Z | 6.0 min |
| shard 4 | 2026-11-14T15:25:05.137Z | 6.0 min |
| shard 5 | 2026-11-14T15:24:50.238Z | 6.1 min |
| shard 6 | 2026-11-14T15:26:39.213Z | 5.7 min |
| shard 7 | 2026-11-14T15:24:54.691Z | 5.3 min |
| shard 8 | 2026-11-14T15:25:40.242Z | 7.5 min |
| shard 9 | 2026-11-14T15:25:24.489Z | 5.9 min |
| shard 10 | 2026-11-14T15:25:25.733Z | 6.4 min |
| shard 11 | 2026-11-14T15:25:44.575Z | 7.2 min |
| shard 12 | 2026-11-14T15:25:21.740Z | 6.6 min |
| shard 13 | 2026-11-14T15:25:06.722Z | 5.2 min |
| shard 14 | 2026-11-14T15:29:03.734Z | 5.6 min |
| shard 15 | 2026-11-14T15:29:08.668Z | 6.2 min |
| shard 16 | 2026-11-14T15:25:16.889Z | 6.3 min |
| repeat | 2026-11-14T15:25:59.045Z | 12.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-translations-console.spec.ts` | 134 | 14.2 min | smoke, shard 8, repeat |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 6.5 min | webkit, shard 10 |
| `admin-translations-data.spec.ts` | 30 | 5.7 min | shard 5, repeat |
| `import-security.spec.ts` | 36 | 5.5 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 5.3 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 5.1 min | webkit, shard 16 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 13 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 12 |
| `admin-screening.spec.ts` | 58 | 4.8 min | webkit, shard 14 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 9 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 4.5 min | shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `post-wizard-where.spec.ts` | 32 | 4.3 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.5 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.3 min | shard 9 |
| `dialogs.spec.ts` | 20 | 3.2 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 2.7 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.6 min | webkit, shard 11 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 9 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 1.0 min | smoke, shard 8 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 48.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.8 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 36.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 33.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 30.2 s |
