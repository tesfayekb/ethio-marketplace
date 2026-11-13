# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 43463527584 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43463527584
- Commit: `c5d0248c532df5772ab3cbb3777b33c0abcba4ff`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-e4a84e9b91f5… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-13T16:50:10.002Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `webkit-390` · source `webkit` · sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark) — Error: regular ad: the segment

## Flaky bodies (DEC-078)

### sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: regular ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.273 0.024 164.199997)"
Received: "oklab(0.273 -0.023093 0.006535 / 0.067405)"
--- further error 1 ---
Error: regular ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.273 0.024 164.199997)"
Received: "oklab(0.273 -0.023093 0.006535 / 0.067405)"

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
| smoke | 2026-11-13T16:34:50.889Z | 0.4 min |
| email | 2026-11-13T16:35:09.380Z | 0.4 min |
| webkit | 2026-11-13T16:35:10.318Z | 9.6 min |
| shard 1 | 2026-11-13T16:35:08.148Z | 10.9 min |
| shard 2 | 2026-11-13T16:35:21.011Z | 12.1 min |
| shard 3 | 2026-11-13T16:35:11.195Z | 11.5 min |
| shard 4 | 2026-11-13T16:35:00.514Z | 10.6 min |
| shard 5 | 2026-11-13T16:35:17.599Z | 10.9 min |
| shard 6 | 2026-11-13T16:35:28.751Z | 11.8 min |
| shard 7 | 2026-11-13T16:35:20.908Z | 11.9 min |
| shard 8 | 2026-11-13T16:35:04.340Z | 9.9 min |
| shard 9 | 2026-11-13T16:35:27.745Z | 11.2 min |
| shard 10 | 2026-11-13T16:34:42.749Z | 9.2 min |
| shard 11 | 2026-11-13T16:36:08.303Z | 10.6 min |
| shard 12 | 2026-11-13T16:35:11.628Z | 10.8 min |
| shard 13 | 2026-11-13T16:35:23.601Z | 9.8 min |
| shard 14 | 2026-11-13T16:35:34.257Z | 11.3 min |
| shard 15 | 2026-11-13T16:37:28.602Z | 11.5 min |
| shard 16 | 2026-11-13T16:37:27.537Z | 10.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.0 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 5.9 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4 |
| `admin-listings.spec.ts` | 78 | 4.9 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 6 |
| `admin-screening.spec.ts` | 58 | 4.8 min | webkit, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.7 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 9 |
| `ad-page.spec.ts` | 104 | 4.5 min | webkit, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `admin-translations-console.spec.ts` | 44 | 4.3 min | shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 4.1 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.3 min | shard 9 |
| `choice-lists.spec.ts` | 96 | 3.3 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 2 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 2.7 min | shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `dialogs.spec.ts` | 16 | 2.3 min | webkit, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 2.0 min | webkit, shard 15 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 16 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 1.4 min | shard 8 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | webkit, shard 12 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 13 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 9 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `my-listings-page.spec.ts` | 20 | 0.8 min | webkit, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 5 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 8 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 32.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
