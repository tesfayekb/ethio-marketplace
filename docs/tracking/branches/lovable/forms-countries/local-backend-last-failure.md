# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43743803112 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43743803112
- Commit: `c9b6732b68351cb5d6b7e35201c27c6c1d6880f4`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-15T18:09:40.453Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · one-line-slots-admin.spec.ts › OLS-6 the first admin tables stay one line — Error: expect(locator).toHaveCount(expected) failed

## Flaky bodies (DEC-078)

### one-line-slots-admin.spec.ts › OLS-6 the first admin tables stay one line

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('menu')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByRole('menu')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('menu')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByRole('menu')
    14 × locator resolved to 1 element
       - unexpected value "1"


  37 |     );
  38 |   await page.keyboard.press("Escape");
> 39 |   await expect(page.getByRole("menu")).toHaveCount(0);
     |                                        ^
  40 |   expect(languages, "the switcher lists the public languages").toContain("en");
  41 |   return languages;
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - link:
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - group [ref=e2]:
      - menuitemradio "English" [checked] [ref=e3]:
        - img [ref=e6]
        - generic [ref=e9]: English
      - menuitemradio "አማርኛ" [ref=e10]:
        - generic [ref=e13]: አማርኛ
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-15T17:59:12.902Z | 4.4 min |
| email | 2026-11-15T17:58:44.985Z | 0.3 min |
| webkit | 2026-11-15T17:59:00.095Z | 8.0 min |
| shard 1 | 2026-11-15T17:59:28.797Z | 5.8 min |
| shard 2 | 2026-11-15T17:59:20.215Z | 7.4 min |
| shard 3 | 2026-11-15T17:59:15.009Z | 7.0 min |
| shard 4 | 2026-11-15T18:02:46.201Z | 6.4 min |
| shard 5 | 2026-11-15T17:59:12.117Z | 6.6 min |
| shard 6 | 2026-11-15T17:59:05.511Z | 6.6 min |
| shard 7 | 2026-11-15T17:58:45.620Z | 5.6 min |
| shard 8 | 2026-11-15T18:00:42.953Z | 5.4 min |
| shard 9 | 2026-11-15T17:58:32.993Z | 5.5 min |
| shard 10 | 2026-11-15T17:59:07.159Z | 7.0 min |
| shard 11 | 2026-11-15T17:58:20.729Z | 5.7 min |
| shard 12 | 2026-11-15T17:58:26.278Z | 6.0 min |
| shard 13 | 2026-11-15T17:58:23.369Z | 4.9 min |
| shard 14 | 2026-11-15T17:59:34.488Z | 5.3 min |
| shard 15 | 2026-11-15T17:59:50.928Z | 7.0 min |
| shard 16 | 2026-11-15T18:00:40.157Z | 7.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.1 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 7.2 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 7.0 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.8 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.7 min | shard 4 |
| `photo-pipeline.spec.ts` | 74 | 5.6 min | webkit, shard 16 |
| `admin-locations.spec.ts` | 38 | 5.1 min | shard 6 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 7 |
| `admin-screening.spec.ts` | 58 | 4.5 min | webkit, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.3 min | shard 15 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 4.0 min | smoke, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-translations-governance.spec.ts` | 20 | 3.5 min | smoke, shard 16 |
| `posting-routes.spec.ts` | 80 | 3.4 min | shard 2 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-category.spec.ts` | 52 | 3.2 min | webkit, shard 4 |
| `sage-bands.spec.ts` | 76 | 3.2 min | shard 6 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `dialogs.spec.ts` | 20 | 3.0 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.9 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.5 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 2.0 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 7 |
| `sage-tiers.spec.ts` | 52 | 2.0 min | webkit, shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 1.2 min | webkit, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 11 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 15 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu-look.spec.ts` | 12 | 0.3 min | shard 2 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 52.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.3 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 44.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 33.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 32.0 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.4 s |
