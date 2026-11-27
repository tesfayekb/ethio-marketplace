# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46053768672 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46053768672
- Commit: `6dddb0f39235567c7717ef05941a60527c27ddf0`
- Attempt: 1
- Repeat: 43 of 1561 tests repeated — specs directly changed 1/1, importers of a changed helper 6/123; budget 820 s
- Measured lane spread (DEC-375 b): mean 457 s, largest 563 s (lane 11, +23 %); within the 25 % limit
- Written (UTC): 2026-11-27T19:19:27.425Z
- Post-test warnings: 62
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 16` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('entity-row-location-[account id]-name-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('entity-row-location-[account id]-name-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('entity-row-location-[account id]-name-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('entity-row-location-[account id]-name-card')


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
          - listitem [ref=e345]:
            - generic [ref=e346]: About
          - listitem [ref=e347]:
            - generic [ref=e348]: Contact
      - navigation "Help" [ref=e349]:
        - heading "Help" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - generic [ref=e353]: Safety
      - navigation "Legal" [ref=e354]:
        - heading "Legal" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - link "Terms" [ref=e358] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e359]:
            - link "Privacy" [ref=e360] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e362]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 12, shard 14 |
| `categories wrongFile` (quiet) | 4 | shard 12, shard 14 |
| `definitions badHeader` (quiet) | 4 | shard 14 |
| `definitions wrongFile` (quiet) | 4 | shard 14 |
| `categories file too large` (quiet) | 2 | shard 14 |
| `categories nulByte` (quiet) | 2 | shard 14 |
| `categories unknownColumn` (quiet) | 2 | shard 14 |
| `countries badHeader` (quiet) | 2 | shard 14 |
| `countries nulByte` (quiet) | 2 | shard 14 |
| `countries tooManyRows` (quiet) | 2 | shard 14 |
| `countries unknownColumn` (quiet) | 2 | shard 14 |
| `countries wrongFile` (quiet) | 2 | shard 14 |
| `definitions nulByte` (quiet) | 2 | shard 14 |
| `definitions tooManyRows` (quiet) | 2 | shard 14 |
| `definitions unknownColumn` (quiet) | 2 | shard 14 |
| `links unknownColumn` (quiet) | 2 | shard 14 |
| `locations badHeader` (quiet) | 2 | shard 14 |
| `locations file too large` (quiet) | 2 | shard 14 |
| `locations nulByte` (quiet) | 2 | shard 14 |
| `locations unknownColumn` (quiet) | 2 | shard 14 |
| `locations wrongFile` (quiet) | 2 | shard 14 |
| `strings badHeader` (quiet) | 2 | shard 14 |
| `strings emptyFile` (quiet) | 2 | shard 14 |
| `strings nulByte` (quiet) | 2 | shard 14 |
| `strings tooManyRows` (quiet) | 2 | shard 14 |
| `strings unknownColumn` (quiet) | 2 | shard 14 |
| `strings wrongFile` (quiet) | 2 | shard 14 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-27T19:05:59.328Z | 5.1 min |
| email | 2026-11-27T19:05:45.957Z | 0.3 min |
| webkit | 2026-11-27T19:05:28.950Z | 10.1 min |
| shard 1 | 2026-11-27T19:07:32.663Z | 7.2 min |
| shard 2 | 2026-11-27T19:05:55.427Z | 8.9 min |
| shard 3 | 2026-11-27T19:06:18.920Z | 7.7 min |
| shard 4 | 2026-11-27T19:08:05.919Z | 7.7 min |
| shard 5 | 2026-11-27T19:06:25.217Z | 7.0 min |
| shard 6 | 2026-11-27T19:05:21.627Z | 7.6 min |
| shard 7 | 2026-11-27T19:07:30.972Z | 6.8 min |
| shard 8 | 2026-11-27T19:05:23.860Z | 6.8 min |
| shard 9 | 2026-11-27T19:05:47.558Z | 7.4 min |
| shard 10 | 2026-11-27T19:05:49.826Z | 7.1 min |
| shard 11 | 2026-11-27T19:06:06.767Z | 9.4 min |
| shard 12 | 2026-11-27T19:05:22.357Z | 7.2 min |
| shard 13 | 2026-11-27T19:09:57.216Z | 8.4 min |
| shard 14 | 2026-11-27T19:06:15.696Z | 8.9 min |
| shard 15 | 2026-11-27T19:05:16.533Z | 6.9 min |
| shard 16 | 2026-11-27T19:05:49.685Z | 6.9 min |
| repeat | 2026-11-27T19:06:38.295Z | 12.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-attributes-editor.spec.ts` | 108 | 9.8 min | shard 9, repeat |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `failure-crawl-admin-content.spec.ts` | 18 | 8.8 min | shard 2 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.6 min | shard 3 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.4 min | shard 4 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.8 min | shard 5 |
| `admin-screening.spec.ts` | 64 | 6.3 min | webkit, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 6 |
| `auth-signout.spec.ts` | 44 | 5.9 min | webkit, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.7 min | shard 11 |
| `admin-listings.spec.ts` | 82 | 5.7 min | webkit, shard 12 |
| `feed-screens.spec.ts` | 40 | 5.4 min | webkit, shard 13 |
| `dialogs.spec.ts` | 36 | 5.3 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 44 | 5.2 min | shard 8 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 7 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 10 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 14 |
| `post-wizard-place.spec.ts` | 40 | 4.8 min | shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 15 |
| `admin-users.spec.ts` | 28 | 4.6 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 16 |
| `admin-categories-images.spec.ts` | 18 | 4.6 min | smoke, webkit, shard 5, repeat |
| `ad-page.spec.ts` | 104 | 4.3 min | webkit, shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.6 min | smoke, shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 6 |
| `mfa-stepup.spec.ts` | 28 | 3.3 min | webkit, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 3.1 min | shard 13 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 3 |
| `failure-crawl-public.spec.ts` | 26 | 2.9 min | shard 11 |
| `post-wizard-category.spec.ts` | 54 | 2.8 min | webkit, shard 12 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.5 min | shard 16 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 8 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6 |
| `legal-certify.spec.ts` | 44 | 2.2 min | shard 3 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 8 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.9 min | shard 4 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 1 |
| `staff-gate.spec.ts` | 18 | 1.8 min | shard 1, repeat |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 5 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-guides.spec.ts` | 14 | 1.4 min | shard 10 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 5 |
| `ad-page-doors.spec.ts` | 90 | 1.2 min | shard 9, repeat |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 7 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 15 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 6 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 3 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8 |
| `press.spec.ts` | 22 | 0.9 min | shard 9 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.9 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 16 |
| `admin-screening-reject.spec.ts` | 10 | 0.8 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 11 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 2 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 11 |
| `settings.spec.ts` | 16 | 0.6 min | shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 4 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 2 |
| `my-listings-levels.spec.ts` | 28 | 0.5 min | shard 15 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 4 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 8 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 16 |
| `account-saved.spec.ts` | 12 | 0.4 min | shard 7, repeat |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 12 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 14 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 7 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 15 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 8, repeat |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 3 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 7 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 1 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 6 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 2 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 10 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 2, repeat |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 15 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 14 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 13 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 10 |
| `offline.spec.ts` | 2 | 0.1 min | shard 11 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 6 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 8 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 12 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 283.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.9 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 113.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 99.6 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 75.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 74.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 67.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.4 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 63.6 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 60.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 58.0 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 57.8 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 55.9 s |
