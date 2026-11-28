# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46152482494 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46152482494
- Commit: `eb11c1e77c271b455fbecf66314e10487cb67703`
- Attempt: 1
- Repeat: nothing to repeat
- Measured lane spread (DEC-375 b): mean 476 s, largest 600 s (lane 14, +26 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T14:16:46.994Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 2` · legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx2-n4ha5-2-d-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx2-n4ha5-2-d-card-global').getByTestId('legal-view-inforce')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx2-n4ha5-2-d-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx2-n4ha5-2-d-card-global').getByTestId('legal-view-inforce')


  1043 |       await gotoReady(page, "/admin/legal");
  1044 |       const translatedCard = page.getByTestId(`legal-doc-${kind}-global`);
> 1045 |       await expect(translatedCard.getByTestId("legal-view-inforce")).toBeVisible();
       |                                                                      ^
  1046 |       // J6 — another worker's scratch language may still be offered; nothing this test wrote,
  1047 |       // and no language the product ships, is. The control names every missing language.
  1048 |       const translate = translatedCard.getByTestId("legal-translate-inforce");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1045:70
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: Contact
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
      - navigation "Legal" [ref=e185]:
        - heading "Legal" [level=2] [ref=e186]
        - list [ref=e187]:
          - listitem [ref=e188]:
            - link "Terms" [ref=e189] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e190]:
            - link "Privacy" [ref=e191] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e193]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 9, shard 11 |
| `categories wrongFile` (quiet) | 4 | shard 9, shard 11 |
| `definitions badHeader` (quiet) | 4 | shard 6, shard 11 |
| `definitions wrongFile` (quiet) | 4 | shard 6, shard 11 |
| `categories file too large` (quiet) | 2 | shard 11 |
| `categories nulByte` (quiet) | 2 | shard 11 |
| `categories unknownColumn` (quiet) | 2 | shard 11 |
| `countries badHeader` (quiet) | 2 | shard 11 |
| `countries nulByte` (quiet) | 2 | shard 11 |
| `countries tooManyRows` (quiet) | 2 | shard 11 |
| `countries unknownColumn` (quiet) | 2 | shard 11 |
| `countries wrongFile` (quiet) | 2 | shard 11 |
| `definitions nulByte` (quiet) | 2 | shard 11 |
| `definitions tooManyRows` (quiet) | 2 | shard 11 |
| `definitions unknownColumn` (quiet) | 2 | shard 11 |
| `links unknownColumn` (quiet) | 2 | shard 11 |
| `locations badHeader` (quiet) | 2 | shard 11 |
| `locations file too large` (quiet) | 2 | shard 11 |
| `locations nulByte` (quiet) | 2 | shard 11 |
| `locations unknownColumn` (quiet) | 2 | shard 11 |
| `locations wrongFile` (quiet) | 2 | shard 11 |
| `strings badHeader` (quiet) | 2 | shard 11 |
| `strings emptyFile` (quiet) | 2 | shard 11 |
| `strings nulByte` (quiet) | 2 | shard 11 |
| `strings tooManyRows` (quiet) | 2 | shard 11 |
| `strings unknownColumn` (quiet) | 2 | shard 11 |
| `strings wrongFile` (quiet) | 2 | shard 11 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T14:05:04.038Z | 4.4 min |
| email | 2026-11-28T14:05:51.962Z | 0.4 min |
| webkit | 2026-11-28T14:04:36.641Z | 9.3 min |
| shard 1 | 2026-11-28T14:04:47.128Z | 9.4 min |
| shard 2 | 2026-11-28T14:05:09.114Z | 7.5 min |
| shard 3 | 2026-11-28T14:05:09.691Z | 7.1 min |
| shard 4 | 2026-11-28T14:05:21.442Z | 8.4 min |
| shard 5 | 2026-11-28T14:05:20.729Z | 8.5 min |
| shard 6 | 2026-11-28T14:05:06.981Z | 6.6 min |
| shard 7 | 2026-11-28T14:05:22.091Z | 8.8 min |
| shard 8 | 2026-11-28T14:05:01.958Z | 6.7 min |
| shard 9 | 2026-11-28T14:07:46.426Z | 7.0 min |
| shard 10 | 2026-11-28T14:07:03.254Z | 9.2 min |
| shard 11 | 2026-11-28T14:05:07.950Z | 8.1 min |
| shard 12 | 2026-11-28T14:07:47.699Z | 7.1 min |
| shard 13 | 2026-11-28T14:05:26.293Z | 7.4 min |
| shard 14 | 2026-11-28T14:05:22.640Z | 10.0 min |
| shard 15 | 2026-11-28T14:05:01.333Z | 7.6 min |
| shard 16 | 2026-11-28T14:04:57.870Z | 7.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `failure-crawl-admin-content.spec.ts` | 22 | 9.3 min | shard 1 |
| `shell.spec.ts` | 234 | 9.2 min | shard 2 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 7.2 min | shard 7 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.2 min | shard 5 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 6.9 min | shard 3 |
| `admin-screening.spec.ts` | 64 | 6.7 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 44 | 6.3 min | webkit, shard 14 |
| `admin-listings.spec.ts` | 82 | 5.6 min | webkit, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 5.6 min | shard 14 |
| `dialogs.spec.ts` | 36 | 5.4 min | webkit, shard 14 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 11 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 9 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.9 min | shard 15 |
| `admin-roles.spec.ts` | 28 | 4.9 min | shard 8 |
| `admin-locations.spec.ts` | 44 | 4.8 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 15 |
| `admin-users.spec.ts` | 28 | 4.5 min | shard 13 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.4 min | shard 16 |
| `photo-pipeline.spec.ts` | 74 | 4.4 min | webkit, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 10 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.0 min | webkit, shard 4 |
| `post-wizard-category.spec.ts` | 54 | 3.8 min | webkit, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.8 min | shard 9 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 13 |
| `mfa-stepup.spec.ts` | 28 | 3.7 min | webkit, shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 11 |
| `post-wizard-resets.spec.ts` | 34 | 3.4 min | shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 6 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 12 |
| `choice-lists.spec.ts` | 96 | 3.0 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.9 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 2.7 min | shard 2 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.3 min | smoke, shard 1 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 2.0 min | shard 5 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.8 min | shard 16 |
| `admin-guides.spec.ts` | 14 | 1.8 min | shard 14 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.8 min | shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 3 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 6 |
| `admin-shell.spec.ts` | 12 | 1.6 min | shard 5 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 5 |
| `press.spec.ts` | 22 | 1.5 min | shard 10 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 16 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 1 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 11 |
| `admin-screening-reject.spec.ts` | 10 | 1.0 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 1.0 min | shard 10 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 4 |
| `staff-gate.spec.ts` | 6 | 0.9 min | shard 7 |
| `house-style.spec.ts` | 18 | 0.9 min | shard 13 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 3 |
| `settings.spec.ts` | 16 | 0.9 min | shard 7 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 1 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 3 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 8 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 2 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 9 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 13 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 4 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `admin-errors.spec.ts` | 4 | 0.3 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6 |
| `category-image-routes.spec.ts` | 12 | 0.3 min | shard 10 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 14 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 6 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 2 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 1 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 11 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 12 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 4 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 11 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 6 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 10 |
| `offline.spec.ts` | 2 | 0.0 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 8 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 7 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 16 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 104.7 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 81.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 71.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 69.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 69.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 65.8 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 56.2 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 56.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 50.2 s |
| `failure-crawl-admin-content.spec.ts` › FCR-79 /admin/errors as staff: loads clean and says every failed read | mobile-360 | 49.9 s |
