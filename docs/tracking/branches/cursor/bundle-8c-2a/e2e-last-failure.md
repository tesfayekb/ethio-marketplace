# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46097467153
- Commit: `f367a4eb836ca95e85ed59dec9e9277ba60b8c7c`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-ad63c908a499… (0 read)
- Repeat: 90 of 1511 tests repeated — specs directly changed 10/11, importers of a changed helper 2/114; budget 829 s
- Measured lane spread (DEC-375 b): mean 449 s, largest 593 s (lane 1, +32 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights
- Written (UTC): 2026-11-28T02:39:00.310Z
- Passed: 3053 · Skipped: 422 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Gating failures

### admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 12`
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
          - listitem [ref=e325]:
            - generic [ref=e326]: About
          - listitem [ref=e327]:
            - generic [ref=e328]: Contact
      - navigation "Help" [ref=e329]:
        - heading "Help" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - generic [ref=e333]: Safety
      - navigation "Legal" [ref=e334]:
        - heading "Legal" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - link "Terms" [ref=e338] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e339]:
            - link "Privacy" [ref=e340] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e342]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 6` · admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row — Error: CO-6: the rail save refused notARoot twice

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 6`
- Project: `mobile-360`

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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-28T02:23:22.259Z | 4.8 min |
| email | 2026-11-28T02:22:50.376Z | 0.3 min |
| webkit | 2026-11-28T02:23:24.406Z | 9.4 min |
| shard 1 | 2026-11-28T02:22:35.198Z | 9.9 min |
| shard 2 | 2026-11-28T02:26:23.210Z | 7.5 min |
| shard 3 | 2026-11-28T02:23:05.173Z | 8.1 min |
| shard 4 | 2026-11-28T02:22:31.881Z | 7.2 min |
| shard 5 | 2026-11-28T02:22:26.062Z | 8.1 min |
| shard 6 | 2026-11-28T02:22:54.206Z | 6.5 min |
| shard 7 | 2026-11-28T02:22:40.540Z | 6.9 min |
| shard 8 | 2026-11-28T02:22:50.229Z | 6.9 min |
| shard 9 | 2026-11-28T02:22:58.751Z | 6.5 min |
| shard 10 | 2026-11-28T02:22:40.081Z | 7.1 min |
| shard 11 | 2026-11-28T02:24:01.528Z | 7.8 min |
| shard 12 | 2026-11-28T02:22:57.287Z | 7.5 min |
| shard 13 | 2026-11-28T02:23:02.184Z | 7.7 min |
| shard 14 | 2026-11-28T02:23:20.534Z | 7.5 min |
| shard 15 | 2026-11-28T02:24:49.090Z | 7.9 min |
| shard 16 | 2026-11-28T02:22:45.121Z | 6.7 min |
| repeat | 2026-11-28T02:25:06.636Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `failure-crawl-admin-content.spec.ts` | 22 | 9.7 min | shard 1 |
| `shell.spec.ts` | 234 | 9.2 min | shard 2 |
| `failure-crawl-member-listings.spec.ts` | 10 | 7.3 min | shard 3 |
| `failure-crawl-admin-catalog.spec.ts` | 18 | 7.0 min | shard 4 |
| `failure-crawl-admin-people.spec.ts` | 14 | 6.8 min | shard 5 |
| `legal-admin.spec.ts` | 132 | 6.6 min | shard 16, repeat |
| `auth-signout.spec.ts` | 44 | 5.9 min | webkit, shard 13 |
| `admin-listings.spec.ts` | 82 | 5.9 min | webkit, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 5.9 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 5.3 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 5.2 min | webkit, shard 12 |
| `admin-translations-console.spec.ts` | 46 | 5.2 min | smoke, shard 10 |
| `admin-locations.spec.ts` | 44 | 5.1 min | shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 15 |
| `dialogs.spec.ts` | 36 | 4.9 min | webkit, shard 15 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.7 min | shard 14 |
| `import-security.spec.ts` | 36 | 4.6 min | shard 9 |
| `legal-certify.spec.ts` | 132 | 4.4 min | shard 9, repeat |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 4.2 min | shard 11 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 8 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 10 |
| `mfa-stepup.spec.ts` | 40 | 3.8 min | webkit, shard 4, repeat |
| `admin-translations-governance.spec.ts` | 20 | 3.7 min | smoke, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6 |
| `my-listings-ad.spec.ts` | 38 | 2.8 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 2.8 min | shard 12 |
| `admin-countries.spec.ts` | 18 | 2.7 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 11 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 3 |
| `failure-crawl-public.spec.ts` | 26 | 2.5 min | shard 9 |
| `post-wizard-category.spec.ts` | 54 | 2.5 min | webkit, shard 13 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 2 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 7 |
| `failure-crawl-member-public.spec.ts` | 14 | 1.9 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `legal-doors.spec.ts` | 102 | 1.8 min | smoke, shard 10, repeat |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 16 |
| `failure-crawl-member-account.spec.ts` | 16 | 1.7 min | shard 1 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 5 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 8 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 3 |
| `press.spec.ts` | 22 | 1.2 min | shard 15 |
| `legal-accept.spec.ts` | 36 | 1.2 min | shard 6, repeat |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5 |
| `auth-caller-gates.spec.ts` | 24 | 1.1 min | shard 6, repeat |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 7 |
| `staff-gate.spec.ts` | 6 | 0.9 min | shard 7 |
| `admin-screening-reject.spec.ts` | 10 | 0.8 min | shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 3 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 1 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 3 |
| `admin-errors.spec.ts` | 12 | 0.7 min | shard 3, repeat |
| `legal-pages.spec.ts` | 30 | 0.7 min | shard 5, repeat |
| `settings.spec.ts` | 16 | 0.7 min | shard 2 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 4 |
| `house-style.spec.ts` | 18 | 0.6 min | shard 4 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 1 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 7 |
| `legal-history.spec.ts` | 18 | 0.5 min | shard 5, repeat |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 15, repeat |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 8 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 12 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 9 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 9 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 10 |
| `shell-bands.spec.ts` | 16 | 0.2 min | smoke, shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `error-reports.spec.ts` | 12 | 0.2 min | shard 10, repeat |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 13 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 10 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 8 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 4 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 2 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `auth-google.spec.ts` | 6 | 0.1 min | shard 6, repeat |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 15 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 5 |
| `offline.spec.ts` | 2 | 0.0 min | shard 6 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 7 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 13 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `failure-crawl-member-listings.spec.ts` › FCR-41 /my-listings/$listingId as member: loads clean and says every failed read | mobile-360 | 280.3 s |
| `failure-crawl-admin-content.spec.ts` › FCR-74 /admin/legal as staff: loads clean and says every failed read | mobile-360 | 123.6 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-56 /admin/places as staff: loads clean and says every failed read | mobile-360 | 108.9 s |
| `failure-crawl-admin-people.spec.ts` › FCR-66 /admin/screening as staff: loads clean and says every failed read | mobile-360 | 98.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-61 /admin/users/$userId as staff: loads clean and says every failed read | mobile-360 | 76.1 s |
| `failure-crawl-admin-catalog.spec.ts` › FCR-51 /admin/attributes as staff: loads clean and says every failed read | mobile-360 | 69.4 s |
| `failure-crawl-admin-people.spec.ts` › FCR-65 /admin/audit as staff: loads clean and says every failed read | mobile-360 | 66.8 s |
| `failure-crawl-admin-people.spec.ts` › FCR-67 /admin/ai as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-77 /admin/translations as staff: loads clean and says every failed read | mobile-360 | 66.0 s |
| `failure-crawl-admin-content.spec.ts` › FCR-76 /admin/legal/edit as staff: loads clean and says every failed read | mobile-360 | 65.9 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 64.7 s |
| `failure-crawl-admin-content.spec.ts` › FCR-72 /admin/listings/$listingId as staff: loads clean and says every failed read | mobile-360 | 57.6 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 56.7 s |
| `failure-crawl-member-listings.spec.ts` › FCR-42 /my-listings/$listingId/edit as member: loads clean and says every failed read | mobile-360 | 56.2 s |
| `failure-crawl-member-listings.spec.ts` › FCR-44 /post/$listingId as member: loads clean and says every failed read | mobile-360 | 56.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 46097467153-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 46097467153-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 46097467153-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 1, fresh 30)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 46097467153-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 46097467153-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 46097467153-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 25 (pool 3, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 46097467153-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 28 user(s) owned by process 46097467153-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 46097467153-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 46097467153-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 46097467153-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 46097467153-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 46097467153-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 23 (pool 2, fresh 21)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 46097467153-local-repeat
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] deleted 2 user(s) owned by process 46097467153-local-repeat
```

## Server errors: shard 12

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).
