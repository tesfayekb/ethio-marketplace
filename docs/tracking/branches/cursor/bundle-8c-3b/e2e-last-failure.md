# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46145197126 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46145197126
- Commit: `534626ccb1274b5cd4da7cda2b81c2e730ba9b75`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-08b39557d280… (0 read)
- Repeat: 29 of 47 tests repeated — specs directly changed 2/3, importers of a changed helper 0/0; budget 814 s
- Measured lane spread (DEC-375 b): mean 472 s, largest 653 s (lane 2, +38 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T12:51:38.555Z
- Post-test warnings: 62
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `webkit-390` · source `webkit` · sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark) — Error: regular ad: the segment
- FLAKY (passed on retry) · `desktop-1280` · source `shard 16` · choice-lists.spec.ts › choice lists at 1440, light › CL-E10 the account menu's parts equal the other lists' (1440, light) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: regular ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.273 0.024 164.199997)"
Received: "oklab(0.273 -0.023093 0.006535 / 0.096607)"
--- further error 1 ---
Error: regular ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.273 0.024 164.199997)"
Received: "oklab(0.273 -0.023093 0.006535 / 0.096607)"

  283 |             await page.mouse.move(0, 0);
  284 |             await settled(page);
> 285 |             expect(await style(description, "background-color"), `${at}: the segment`).toBe(
      |                                                                                        ^
  286 |               await tokenStyle(
  287 |                 page,
  288 |                 mode,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:285:88
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

### choice-lists.spec.ts › choice lists at 1440, light › CL-E10 the account menu's parts equal the other lists' (1440, light)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('style-row-1-menu')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('style-row-1-menu')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('style-row-1-menu')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('style-row-1-menu')


  394 |         const rowMenu = page.getByTestId("style-row-1-menu");
  395 |         await page.getByTestId("style-row-1-more").click();
> 396 |         await expect(rowMenu).toBeVisible();
      |                               ^
  397 |         const rowParts = await partsOf(rowMenu);
  398 |         await closeMenu(page, rowMenu);
  399 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/choice-lists.spec.ts:396:31
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
```

Context: context file not found for `choice-lists-choice-lists-at-1440-light-CL-E10-the-account-menu-s-parts-equal-the-other-lists-1440-light-desktop-1280` — Playwright's name `choice-lists-choice-lists--7bbbe-the-other-lists-1440-light--desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 9, shard 10 |
| `categories wrongFile` (quiet) | 4 | shard 9, shard 10 |
| `definitions badHeader` (quiet) | 4 | shard 8, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 8, shard 9 |
| `categories file too large` (quiet) | 2 | shard 9 |
| `categories nulByte` (quiet) | 2 | shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 9 |
| `countries badHeader` (quiet) | 2 | shard 9 |
| `countries nulByte` (quiet) | 2 | shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 9 |
| `locations badHeader` (quiet) | 2 | shard 9 |
| `locations file too large` (quiet) | 2 | shard 9 |
| `locations nulByte` (quiet) | 2 | shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 9 |
| `strings badHeader` (quiet) | 2 | shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 9 |
| `strings nulByte` (quiet) | 2 | shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 9 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T12:37:00.398Z | 4.8 min |
| email | 2026-11-28T12:36:46.762Z | 0.3 min |
| webkit | 2026-11-28T12:37:30.647Z | 13.1 min |
| shard 1 | 2026-11-28T12:40:05.621Z | 6.8 min |
| shard 2 | 2026-11-28T12:36:57.793Z | 10.9 min |
| shard 3 | 2026-11-28T12:36:28.580Z | 8.8 min |
| shard 4 | 2026-11-28T12:37:23.602Z | 7.4 min |
| shard 5 | 2026-11-28T12:37:20.841Z | 8.0 min |
| shard 6 | 2026-11-28T12:37:28.853Z | 6.9 min |
| shard 7 | 2026-11-28T12:39:01.662Z | 7.9 min |
| shard 8 | 2026-11-28T12:36:34.162Z | 7.2 min |
| shard 9 | 2026-11-28T12:37:43.040Z | 8.4 min |
| shard 10 | 2026-11-28T12:37:29.044Z | 7.3 min |
| shard 11 | 2026-11-28T12:37:21.826Z | 9.3 min |
| shard 12 | 2026-11-28T12:39:10.344Z | 7.8 min |
| shard 13 | 2026-11-28T12:38:53.507Z | 7.8 min |
| shard 14 | 2026-11-28T12:36:32.323Z | 7.5 min |
| shard 15 | 2026-11-28T12:36:51.918Z | 6.3 min |
| shard 16 | 2026-11-28T12:37:56.407Z | 7.5 min |
| repeat | 2026-11-28T12:36:29.351Z | 10.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-translations-console.spec.ts` | 138 | 15.7 min | smoke, shard 7, repeat |
| `failure-crawl-admin-content.spec.ts` | 22 | 10.0 min | shard 2 |
| `shell.spec.ts` | 234 | 9.3 min | shard 1 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.5 min | shard 5 |
| `admin-listings.spec.ts` | 82 | 7.4 min | webkit, shard 11 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.2 min | shard 3 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.9 min | shard 4 |
| `dialogs.spec.ts` | 36 | 6.2 min | webkit, shard 14 |
| `admin-screening.spec.ts` | 64 | 6.1 min | webkit, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 5.6 min | shard 9 |
| `auth-signout.spec.ts` | 44 | 5.4 min | webkit, shard 8 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 9 |
| `admin-locations.spec.ts` | 44 | 5.2 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 5.1 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 14 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 10 |
| `ad-page.spec.ts` | 104 | 4.7 min | webkit, shard 15 |
| `admin-categories-console.spec.ts` | 34 | 4.7 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 16 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 12 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 14 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.0 min | shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.5 min | smoke, shard 2 |
| `mfa-stepup.spec.ts` | 28 | 3.5 min | webkit, shard 5 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 3 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 3.1 min | shard 16 |
| `admin-attributes-safety.spec.ts` | 18 | 3.0 min | shard 9 |
| `sage-bands.spec.ts` | 76 | 3.0 min | shard 12 |
| `post-wizard-category.spec.ts` | 54 | 3.0 min | webkit, shard 13 |
| `failure-crawl-public.spec.ts` | 26 | 3.0 min | shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 4 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.8 min | webkit, shard 11 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 15 |
| `legal-admin.spec.ts` | 44 | 2.5 min | shard 10 |
| `admin-countries.spec.ts` | 18 | 2.3 min | smoke, shard 8 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 7 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 6 |
| `failure-crawl-member-public.spec.ts` | 14 | 2.1 min | shard 5 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 7 |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 1 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 3 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 15 |
| `admin-guides.spec.ts` | 14 | 1.4 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.4 min | shard 8 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 13 |
| `staff-gate.spec.ts` | 6 | 1.1 min | shard 5 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 6 |
| `press.spec.ts` | 22 | 1.0 min | shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 16 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 4 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 2 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 12 |
| `admin-screening-reject.spec.ts` | 10 | 0.9 min | shard 9 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 1 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 3 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 9 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 12 |
| `settings.spec.ts` | 16 | 0.6 min | shard 15 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 5 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 5 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 7 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 3 |
| `category-image-routes.spec.ts` | 36 | 0.5 min | shard 11, repeat |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 12 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 9 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 7 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 16 |
| `admin-errors.spec.ts` | 4 | 0.3 min | shard 2 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 14 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 14 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 1 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 13 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 6 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 14 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 12 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 2 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 7 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8 |
| `offline.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 9 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 4 |
| `geo.spec.ts` | 10 | 0.0 min | shard 1 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 124.5 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 110.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 102.5 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 77.4 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 72.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 67.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 67.1 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 67.0 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-71 /admin/listings as staff: loads clean and says every failed read | mobile-360 | 60.8 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 57.6 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 56.3 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 54.3 s |
