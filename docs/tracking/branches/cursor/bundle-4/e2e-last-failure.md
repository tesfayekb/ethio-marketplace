# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45119524740 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45119524740
- Commit: `ac88976d8ace08cd3a17bff9e2d1fbbcd97f1900`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-e9199a2bd677… (0 read)
- Repeat: 14 of 14 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-23T06:01:55.471Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `webkit-390` · source `webkit` · sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark) — Error: premium ad: the segment

## Flaky bodies (DEC-078)

### sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: premium ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.312 0.034 79.400002)"
Received: "oklab(0.312 0.006254 0.03342 / 0.124013)"
--- further error 1 ---
Error: premium ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.312 0.034 79.400002)"
Received: "oklab(0.312 0.006254 0.03342 / 0.124013)"

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
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - link "Terms" [ref=e347]:
              - /url: /terms
          - listitem [ref=e348]:
            - link "Privacy" [ref=e349]:
              - /url: /privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
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
| smoke | 2026-11-23T05:46:32.128Z | 3.9 min |
| email | 2026-11-23T05:46:52.108Z | 0.3 min |
| webkit | 2026-11-23T05:47:42.206Z | 12.1 min |
| shard 1 | 2026-11-23T05:47:01.997Z | 5.4 min |
| shard 2 | 2026-11-23T05:46:38.322Z | 5.3 min |
| shard 3 | 2026-11-23T05:47:05.451Z | 7.8 min |
| shard 4 | 2026-11-23T05:46:46.039Z | 5.3 min |
| shard 5 | 2026-11-23T05:47:17.187Z | 6.6 min |
| shard 6 | 2026-11-23T05:47:15.286Z | 7.2 min |
| shard 7 | 2026-11-23T05:46:49.995Z | 5.3 min |
| shard 8 | 2026-11-23T05:46:55.851Z | 5.6 min |
| shard 9 | 2026-11-23T05:47:14.842Z | 7.8 min |
| shard 10 | 2026-11-23T05:48:29.137Z | 5.8 min |
| shard 11 | 2026-11-23T05:47:34.349Z | 6.9 min |
| shard 12 | 2026-11-23T05:47:00.926Z | 6.0 min |
| shard 13 | 2026-11-23T05:50:05.457Z | 4.9 min |
| shard 14 | 2026-11-23T05:48:06.854Z | 5.2 min |
| shard 15 | 2026-11-23T05:46:48.784Z | 6.4 min |
| shard 16 | 2026-11-23T05:46:56.714Z | 5.4 min |
| repeat | 2026-11-23T05:49:28.545Z | 11.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `mfa-stepup.spec.ts` | 140 | 13.2 min | webkit, shard 15, repeat |
| `shell.spec.ts` | 234 | 9.4 min | shard 1 |
| `auth-signout.spec.ts` | 44 | 6.5 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.5 min | shard 3 |
| `admin-locations.spec.ts` | 44 | 5.7 min | shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `dialogs.spec.ts` | 36 | 5.3 min | webkit, shard 10 |
| `admin-listings.spec.ts` | 82 | 5.2 min | webkit, shard 10 |
| `admin-roles.spec.ts` | 28 | 5.2 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `admin-screening.spec.ts` | 64 | 4.9 min | webkit, shard 14 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `ad-page.spec.ts` | 104 | 4.5 min | webkit, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 13 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 16 |
| `sage-bands.spec.ts` | 76 | 3.6 min | shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-resets.spec.ts` | 34 | 3.2 min | shard 3 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.5 min | webkit, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.3 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `house-style.spec.ts` | 14 | 0.9 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `feed-route.spec.ts` | 22 | 0.3 min | shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.7 s |
| `auth-signout.spec.ts` › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) | mobile-360 | 39.2 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 35.2 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 35.0 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 35.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.6 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.3 s |
