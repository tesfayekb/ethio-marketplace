# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44894986213 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44894986213
- Commit: `3f6e46bc4f6d5de06fbf56955cae5143b8cf725b`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-493828300a3f… (0 read)
- Repeat: 34 of 1434 tests repeated — specs directly changed 5/5, importers of a changed helper 2/108; budget 643 s
- Written (UTC): 2026-11-21T10:50:32.252Z
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
Received: "oklab(0.312 0.006254 0.03342 / 0.096607)"
--- further error 1 ---
Error: premium ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.312 0.034 79.400002)"
Received: "oklab(0.312 0.006254 0.03342 / 0.096607)"

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
| smoke | 2026-11-21T10:38:27.313Z | 3.8 min |
| email | 2026-11-21T10:39:47.654Z | 0.3 min |
| webkit | 2026-11-21T10:39:09.181Z | 10.4 min |
| shard 1 | 2026-11-21T10:39:24.345Z | 5.5 min |
| shard 2 | 2026-11-21T10:37:52.458Z | 5.3 min |
| shard 3 | 2026-11-21T10:38:18.927Z | 6.0 min |
| shard 4 | 2026-11-21T10:38:34.196Z | 5.9 min |
| shard 5 | 2026-11-21T10:38:28.484Z | 6.1 min |
| shard 6 | 2026-11-21T10:38:17.306Z | 6.1 min |
| shard 7 | 2026-11-21T10:38:38.990Z | 7.3 min |
| shard 8 | 2026-11-21T10:38:58.384Z | 7.4 min |
| shard 9 | 2026-11-21T10:38:42.311Z | 7.6 min |
| shard 10 | 2026-11-21T10:38:28.933Z | 5.3 min |
| shard 11 | 2026-11-21T10:38:05.895Z | 5.8 min |
| shard 12 | 2026-11-21T10:39:33.108Z | 6.7 min |
| shard 13 | 2026-11-21T10:42:57.555Z | 4.9 min |
| shard 14 | 2026-11-21T10:40:32.498Z | 6.2 min |
| shard 15 | 2026-11-21T10:38:34.917Z | 7.4 min |
| shard 16 | 2026-11-21T10:37:53.741Z | 5.3 min |
| repeat | 2026-11-21T10:38:33.162Z | 2.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `auth-signout.spec.ts` | 44 | 6.4 min | webkit, shard 9 |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | smoke, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `admin-screening.spec.ts` | 58 | 5.4 min | webkit, shard 14 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.1 min | webkit, shard 10 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 12 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.7 min | shard 15 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `ad-page.spec.ts` | 104 | 4.5 min | webkit, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 4.4 min | shard 8 |
| `photo-pipeline.spec.ts` | 74 | 4.2 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `choice-lists.spec.ts` | 96 | 3.7 min | shard 7 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.7 min | shard 14 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `post-wizard-category.spec.ts` | 52 | 3.5 min | webkit, shard 4 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `dialogs.spec.ts` | 20 | 2.8 min | webkit, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 2.4 min | webkit, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `ad-page-doors.spec.ts` | 90 | 1.4 min | shard 14, repeat |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 1.2 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `shell-bands.spec.ts` | 44 | 0.8 min | smoke, shard 12, repeat |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `submenu.spec.ts` | 34 | 0.7 min | smoke, shard 15, repeat |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 4, repeat |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `menu-rows.spec.ts` | 10 | 0.4 min | smoke, shard 14, repeat |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 16 | 0.2 min | smoke, shard 2, repeat |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `submenu-touch.spec.ts` | 20 | 0.2 min | smoke, shard 13, repeat |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.5 s |
| `auth-signout.spec.ts` › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218) | mobile-360 | 39.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.9 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 34.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.8 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
