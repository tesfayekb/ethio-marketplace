# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44345618975
- Commit: `6046cce710f5c5ffc1e92a23e465099b7f01e760`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-18T16:46:45.512Z
- Passed: 2327 · Skipped: 259 · Failed: 0
- Gating failures: 0 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: webkit (INFRA: install-chromium-s-system-libraries), shard 7 (INFRA: install-chromium-s-system-libraries)
- Infrastructure: 2 lane(s) died before any test at install-chromium-s-system-libraries — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 2` · submenu-look.spec.ts › D248 a side panel is the main menu › SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) — Error: SMN-E13 the panel scrolls
- FLAKY (passed on retry) · `mobile-360` · source `shard 13` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### submenu-look.spec.ts › D248 a side panel is the main menu › SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254)

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: SMN-E13 the panel scrolls

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: SMN-E13 the panel scrolls

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  258 |     ).toBeLessThanOrEqual(1);
  259 |     expect(Math.abs(state.bottom - grid.last), "SMN-E13 to its last row").toBeLessThanOrEqual(1);
> 260 |     expect(state.overflow, "SMN-E13 the panel scrolls").toBeGreaterThan(0);
      |                                                         ^
  261 |     expect(state.bar, "SMN-E13 with a visible scrollbar").toBeGreaterThan(0);
  262 |   });
  263 | });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/submenu-look.spec.ts:260:57
```

Context:

```text
        - link "e2e-cat-local-2-5-a3c91t-k14" [ref=e500] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-a3c91t-k14
          - img [ref=e502]
          - generic [ref=e506]: e2e-cat-local-2-5-a3c91t-k14
      - listitem [ref=e507]:
        - link "e2e-cat-local-2-5-a3c91t-k15" [ref=e508] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-a3c91t-k15
          - img [ref=e510]
          - generic [ref=e514]: e2e-cat-local-2-5-a3c91t-k15
      - listitem [ref=e515]:
        - link "e2e-cat-local-2-5-a3c91t-k16" [ref=e516] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-a3c91t-k16
          - img [ref=e518]
          - generic [ref=e522]: e2e-cat-local-2-5-a3c91t-k16
      - listitem [ref=e523]:
        - link "e2e-cat-local-2-5-a3c91t-k17" [ref=e524] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-a3c91t-k17
          - img [ref=e526]
          - generic [ref=e530]: e2e-cat-local-2-5-a3c91t-k17
```
```

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart

- Source: `shard 13`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-v…>…</button>
       - unexpected value "unsaved"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-save')
Expected: "saved"
Received: "unsaved"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to <button type="button" data-pressable="" aria-label="Save" data-state="unsaved" aria-pressed="false" data-testid="listing-save" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-v…>…</button>
       - unexpected value "unsaved"


  533 |       return data;
  534 |     };
> 535 |     await expect(heart).toHaveAttribute("data-state", "saved");
      |                         ^
  536 |     await expect(heart).toHaveAttribute("aria-pressed", "true");
  537 |     await expect(page.getByTestId("listing-save-count")).toHaveText("Saved by 1");
```

Context:

```text
          - listitem [ref=e313]:
            - generic [ref=e314]: About
          - listitem [ref=e315]:
            - generic [ref=e316]: Contact
      - navigation "Help" [ref=e317]:
        - heading "Help" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - generic [ref=e321]: Safety
      - navigation "Legal" [ref=e322]:
        - heading "Legal" [level=2] [ref=e323]
        - list [ref=e324]:
          - listitem [ref=e325]:
            - link "Terms" [ref=e326] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e327]:
            - link "Privacy" [ref=e328] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e330]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (17 of 19 results files read, 17 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit, shard 7

`webkit`, `shard 7`: log unavailable.

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit, shard 7

`webkit`, `shard 7`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit, shard 7

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-18T16:22:11.397Z | 4.3 min |
| email | 2026-11-18T16:27:04.178Z | 0.3 min |
| shard 1 | 2026-11-18T16:22:34.856Z | 6.3 min |
| shard 2 | 2026-11-18T16:24:27.845Z | 5.3 min |
| shard 3 | 2026-11-18T16:25:19.419Z | 5.8 min |
| shard 4 | 2026-11-18T16:24:23.580Z | 5.7 min |
| shard 5 | 2026-11-18T16:24:16.263Z | 6.1 min |
| shard 6 | 2026-11-18T16:23:13.638Z | 5.8 min |
| shard 8 | 2026-11-18T16:27:05.301Z | 5.7 min |
| shard 9 | 2026-11-18T16:25:32.347Z | 5.4 min |
| shard 10 | 2026-11-18T16:24:19.778Z | 5.5 min |
| shard 11 | 2026-11-18T16:22:03.335Z | 6.6 min |
| shard 12 | 2026-11-18T16:23:28.566Z | 6.2 min |
| shard 13 | 2026-11-18T16:21:39.915Z | 5.3 min |
| shard 14 | 2026-11-18T16:31:13.221Z | 5.1 min |
| shard 15 | 2026-11-18T16:22:47.075Z | 7.6 min |
| shard 16 | 2026-11-18T16:28:58.463Z | 5.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 11.0 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 5.0 min | shard 11 |
| `import-security.spec.ts` | 36 | 5.0 min | shard 4 |
| `admin-listings.spec.ts` | 76 | 4.8 min | shard 10 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.7 min | shard 15 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 5 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 12 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `admin-screening.spec.ts` | 54 | 4.2 min | shard 14 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.7 min | shard 12 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `ad-page.spec.ts` | 82 | 3.6 min | shard 13 |
| `photo-pipeline.spec.ts` | 70 | 3.4 min | shard 16 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 4 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `mfa-stepup.spec.ts` | 20 | 2.2 min | shard 15 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `dialogs.spec.ts` | 16 | 1.6 min | shard 10 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `sage-tiers.spec.ts` | 40 | 0.9 min | shard 2 |
| `admin-categories-images.spec.ts` | 4 | 0.9 min | smoke, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `my-listings-page.spec.ts` | 18 | 0.8 min | shard 10 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `house-style.spec.ts` | 12 | 0.6 min | shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `layout.spec.ts` | 10 | 0.2 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.5 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 37.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.0 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.1 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | desktop-1280 | 31.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44345618975-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44345618975-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44345618975-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44345618975-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44345618975-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-6
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44345618975-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44345618975-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44345618975-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44345618975-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44345618975-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44345618975-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44345618975-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44345618975-local-16
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## webkit: no results file

webkit: no results file — the process failed outside test results (setup/teardown/preflight).

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  Get:150 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmfx1 amd64 22.5.4-1 [3124 kB]
  Get:151 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmjpegutils-2.1-0t64 amd64 1:2.1.0+debian-8.1build1 [25.5 kB]
  Get:152 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmodplug1 amd64 1:0.8.9.0-3build1 [166 kB]
  Get:153 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmpcdec6 amd64 2:0.1~r495-2build1 [32.7 kB]
  Get:154 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmpeg2encpp-2.1-0t64 amd64 1:2.1.0+debian-8.1build1 [75.6 kB]
  Get:155 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmplex2-2.1-0t64 amd64 1:2.1.0+debian-8.1build1 [46.1 kB]
  Get:156 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libneon27t64 amd64 0.33.0-1.1build3 [102 kB]
  Get:157 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libnice10 amd64 0.1.21-2build3 [157 kB]
  Get:158 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenal-data all 1:1.23.1-4build1 [161 kB]
  Get:159 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenexr-3-1-30 amd64 3.1.5-5.1build3 [1004 kB]
  Get:160 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenh264-7 amd64 2.4.1+dfsg-1 [409 kB]
  Get:161 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenni2-0 amd64 2.2.0.33+dfsg-18 [370 kB]
  Get:162 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libqrencode4 amd64 4.1.1-1build2 [25.0 kB]
  Get:163 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-common all 0.21.4-1build3 [4962 B]
  Get:164 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-1-0 amd64 0.21.4-1build3 [116 kB]
  Get:165 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsndio7.0 amd64 1.9.0-0.3build3 [29.6 kB]
  Get:166 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsoundtouch1 amd64 2.3.2+ds1-1build1 [60.5 kB]
  Get:167 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libspandsp2t64 amd64 0.0.6+dfsg-2.1build1 [311 kB]
  Get:168 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsrtp2-1 amd64 2.5.0-3build1 [41.9 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```

## shard 7: no results file

shard 7: no results file — the process failed outside test results (setup/teardown/preflight).

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  ci-mirror probe: archive.ubuntu.com → ok
  ci-mirror probe: security.ubuntu.com → ok
  Installing dependencies...
  Switching to root user to install dependencies...
  Get:1 file:/etc/apt/apt-mirrors.txt Mirrorlist [152 B]
  Get:5 https://packages.microsoft.com/ubuntu/24.04/prod noble InRelease [3600 B]
  Get:6 https://packages.microsoft.com/ubuntu/24.04/prod noble/main arm64 Packages [723 kB]
  Get:7 https://packages.microsoft.com/ubuntu/24.04/prod noble/main amd64 Packages [794 kB]
  Get:8 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
  Get:9 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [1198 kB]
  Get:10 http://security.ubuntu.com/ubuntu noble-security/main Translation-en [239 kB]
  Get:11 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [1229 kB]
  Get:12 http://security.ubuntu.com/ubuntu noble-security/universe Translation-en [248 kB]
  Get:13 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [1792 kB]
  Get:14 http://security.ubuntu.com/ubuntu noble-security/restricted Translation-en [414 kB]
  Get:15 http://security.ubuntu.com/ubuntu noble-security/multiverse Translation-en [12.7 kB]
  Ign:2 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble InRelease
  Get:3 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
  Get:4 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```
