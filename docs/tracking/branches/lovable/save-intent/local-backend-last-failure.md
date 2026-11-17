# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44196773583 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44196773583
- Commit: `2df46d96a052ff4d907b50f6665ca506b7888d10`
- Attempt: 1
- Repeat: 0 of 52 tests repeated — specs directly changed 0/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-17T23:40:22.736Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('entity-row-location-[account id]-name')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('entity-row-location-[account id]-name')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('entity-row-location-[account id]-name')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('entity-row-location-[account id]-name')


  197 |       await page.getByTestId("data-search").fill(name);
  198 |       const row = entityRow(page, `location-${id}-name`);
> 199 |       await expect(row).toBeVisible({ timeout: 20000 });
      |                         ^
  200 |
  201 |       await surfaceControl(page, `entity-actions-location-${id}-name-edit`).click();
  202 |       const editor = surfaceControl(page, `entity-editor-location-${id}-name`);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:199:25
```

Context:

```text
          - listitem [ref=e311]:
            - generic [ref=e312]: About
          - listitem [ref=e313]:
            - generic [ref=e314]: Contact
      - navigation "Help" [ref=e315]:
        - heading "Help" [level=2] [ref=e316]
        - list [ref=e317]:
          - listitem [ref=e318]:
            - generic [ref=e319]: Safety
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - link "Terms" [ref=e324] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e325]:
            - link "Privacy" [ref=e326] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 19 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-17T23:32:43.520Z | 3.5 min |
| email | 2026-11-17T23:32:39.556Z | 0.3 min |
| webkit | 2026-11-17T23:25:25.624Z | 10.0 min |
| shard 1 | 2026-11-17T23:25:22.420Z | 6.0 min |
| shard 2 | 2026-11-17T23:25:29.494Z | 6.2 min |
| shard 3 | 2026-11-17T23:33:47.943Z | 6.0 min |
| shard 4 | 2026-11-17T23:25:37.977Z | 6.0 min |
| shard 5 | 2026-11-17T23:25:09.584Z | 6.3 min |
| shard 6 | 2026-11-17T23:29:03.254Z | 5.7 min |
| shard 7 | 2026-11-17T23:29:37.473Z | 5.2 min |
| shard 8 | 2026-11-17T23:24:41.937Z | 5.4 min |
| shard 9 | 2026-11-17T23:31:17.133Z | 5.5 min |
| shard 10 | 2026-11-17T23:25:32.730Z | 6.0 min |
| shard 11 | 2026-11-17T23:25:10.305Z | 6.4 min |
| shard 12 | 2026-11-17T23:25:29.781Z | 6.9 min |
| shard 13 | 2026-11-17T23:26:37.768Z | 6.3 min |
| shard 14 | 2026-11-17T23:30:23.951Z | 5.1 min |
| shard 15 | 2026-11-17T23:25:44.674Z | 6.1 min |
| shard 16 | 2026-11-17T23:25:36.817Z | 7.1 min |
| repeat | 2026-11-17T23:22:30.911Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.1 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 6.0 min | webkit, shard 10 |
| `ad-page.spec.ts` | 156 | 5.8 min | webkit, shard 13, repeat |
| `photo-pipeline.spec.ts` | 74 | 5.6 min | webkit, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 12 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `admin-screening.spec.ts` | 58 | 4.6 min | webkit, shard 14 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `post-wizard-category.spec.ts` | 52 | 3.8 min | webkit, shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `dialogs.spec.ts` | 20 | 3.1 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 2 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 2.4 min | webkit, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 2 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `house-style.spec.ts` | 12 | 0.6 min | shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.8 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 35.7 s |
| `admin-translations-data.spec.ts` › TR-14 the Data scope edits and approves a location name | desktop-1280 | 35.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.1 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 32.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
