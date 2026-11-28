# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 46098160058 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46098160058
- Commit: `72d289e75ba2874b9cbfee62c6115899b8bd215c`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-81ba490c0e08… (0 read)
- Repeat: nothing to repeat
- Measured lane spread (DEC-375 b): mean 475 s, largest 607 s (lane 2, +28 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T02:48:43.219Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: CO-6: the rail save refused notARoot twice
- FLAKY (passed on retry) · `mobile-360` · source `shard 12` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: CO-6: the rail save refused notARoot twice
--- further error 1 ---
Error: CO-6: the rail save refused notARoot twice

  338 |           await saveSwap(pair[0]);
  339 |           if ((await outcome(pair[0], pair[1])) === "notARoot") {
> 340 |             throw new Error("CO-6: the rail save refused notARoot twice");
      |                   ^
  341 |           }
  342 |         }
  343 |         // Relative, never absolute: a sibling's scratch root may cascade away.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:340:19
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notARoot", "refusals": [{"reason": "notARoot"}]})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notARoot", "refusals": [{"reason": "notARoot"}]})
```

Context:

```text
              - button "Move down" [ref=e67] [cursor=pointer]: ↓
            - listitem [ref=e68]:
              - generic [ref=e69]: 14. Babies & Kids
              - button "Move up" [ref=e70] [cursor=pointer]: ↑
              - button "Move down" [ref=e71] [cursor=pointer]: ↓
            - listitem [ref=e72]:
              - generic [ref=e73]: 15. Commercial Equipment
              - button "Move up" [ref=e74] [cursor=pointer]: ↑
              - button "Move down" [disabled]: ↓
          - alert [ref=e75]: Only a root category can be ordered on the rail.
      - generic:
        - img
        - generic: More below
    - generic [ref=e76]:
      - button "Reset order" [ref=e77] [cursor=pointer]
      - button "Save order" [ref=e78] [cursor=pointer]
    - button "Close" [ref=e79] [cursor=pointer]:
      - img [ref=e80]
      - generic [ref=e83]: Close
```
```

### admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 12`
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

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 9, shard 16 |
| `categories wrongFile` (quiet) | 4 | shard 9, shard 16 |
| `definitions badHeader` (quiet) | 4 | shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 9, shard 12 |
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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T02:36:29.218Z | 5.0 min |
| email | 2026-11-28T02:32:42.129Z | 0.3 min |
| webkit | 2026-11-28T02:36:43.775Z | 9.1 min |
| shard 1 | 2026-11-28T02:35:36.857Z | 9.7 min |
| shard 2 | 2026-11-28T02:37:36.216Z | 10.1 min |
| shard 3 | 2026-11-28T02:32:55.281Z | 8.1 min |
| shard 4 | 2026-11-28T02:36:03.636Z | 7.6 min |
| shard 5 | 2026-11-28T02:33:20.553Z | 8.5 min |
| shard 6 | 2026-11-28T02:37:18.280Z | 6.4 min |
| shard 7 | 2026-11-28T02:33:49.137Z | 6.7 min |
| shard 8 | 2026-11-28T02:35:35.174Z | 6.4 min |
| shard 9 | 2026-11-28T02:33:30.680Z | 6.9 min |
| shard 10 | 2026-11-28T02:33:57.850Z | 8.9 min |
| shard 11 | 2026-11-28T02:32:55.029Z | 7.6 min |
| shard 12 | 2026-11-28T02:33:32.301Z | 9.1 min |
| shard 13 | 2026-11-28T02:35:26.526Z | 7.9 min |
| shard 14 | 2026-11-28T02:35:19.637Z | 7.3 min |
| shard 15 | 2026-11-28T02:33:37.600Z | 7.2 min |
| shard 16 | 2026-11-28T02:37:36.131Z | 8.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.6 min | shard 2 |
| `failure-crawl-admin-content.spec.ts` | 22 | 9.6 min | shard 1 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.4 min | shard 4 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.3 min | shard 3 |
| `failure-crawl-admin-people.spec.ts` | 14 | 7.0 min | shard 5 |
| `admin-screening.spec.ts` | 64 | 6.5 min | webkit, shard 12 |
| `admin-translations-console.spec.ts` | 46 | 6.1 min | smoke, shard 10 |
| `auth-signout.spec.ts` | 44 | 6.0 min | webkit, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.9 min | shard 7 |
| `admin-attributes-links.spec.ts` | 34 | 5.3 min | shard 12 |
| `admin-listings.spec.ts` | 82 | 5.3 min | webkit, shard 6 |
| `admin-roles.spec.ts` | 28 | 5.1 min | shard 15 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 16 |
| `import-security.spec.ts` | 36 | 5.0 min | shard 9 |
| `ad-page.spec.ts` | 104 | 4.8 min | webkit, shard 5 |
| `admin-locations.spec.ts` | 44 | 4.8 min | shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.8 min | shard 16 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.6 min | shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 14 |
| `admin-users.spec.ts` | 28 | 4.5 min | shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 15 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-monetisation.spec.ts` | 34 | 4.4 min | smoke, shard 10 |
| `posting-routes.spec.ts` | 80 | 4.0 min | shard 2 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 13 |
| `admin-translations-governance.spec.ts` | 20 | 3.7 min | smoke, shard 5 |
| `photo-pipeline.spec.ts` | 74 | 3.6 min | webkit, shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 9 |
| `mfa-stepup.spec.ts` | 28 | 3.1 min | webkit, shard 4 |
| `legal-admin.spec.ts` | 44 | 3.0 min | shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 6 |
| `my-listings-ad.spec.ts` | 38 | 2.9 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 2.7 min | shard 12 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 13 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 12 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 9 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 3 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.4 min | webkit, shard 2 |
| `admin-audit.spec.ts` | 16 | 2.2 min | shard 16 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 14 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 10 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 1 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 5 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 9 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 8 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5 |
| `press.spec.ts` | 22 | 1.0 min | shard 15 |
| `settings.spec.ts` | 16 | 1.0 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 7 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 11 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 10 |
| `house-style.spec.ts` | 18 | 0.9 min | shard 4 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 4 |
| `admin-screening-reject.spec.ts` | 10 | 0.8 min | shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 3 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 1 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 4 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 3 |
| `staff-gate.spec.ts` | 6 | 0.7 min | shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.6 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 7 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 1 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 9 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 13 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 8 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 11 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 10 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `rbac.spec.ts` | 6 | 0.3 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 13 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 6 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `admin-errors.spec.ts` | 4 | 0.2 min | shard 3 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `page-head.spec.ts` | 4 | 0.2 min | shard 9 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 10 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 16 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 8 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 8 |
| `error-reports.spec.ts` | 4 | 0.1 min | shard 10 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 15 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 14 |
| `offline.spec.ts` | 2 | 0.0 min | shard 6 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 6 |
| `geo.spec.ts` | 10 | 0.0 min | shard 7 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 13 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.2 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 111.2 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 101.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 79.0 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 73.1 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 69.6 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 67.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 66.5 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 65.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 64.7 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 56.6 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 56.5 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.3 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-55 /admin/locations as staff: loads clean and says every failed read | mobile-360 | 54.3 s |
