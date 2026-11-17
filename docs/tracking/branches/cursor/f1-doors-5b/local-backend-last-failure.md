# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44056980617 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44056980617
- Commit: `9d3da88fe90afd90207c66bc0d0c5c0f494f7ba2`
- Attempt: 1
- Repeat: 30 of 52 tests repeated — specs directly changed 3/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-17T09:52:32.000Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 2` · submenu-look.spec.ts › D248 a side panel is the main menu › SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) — Error: SMN-E13 the panel scrolls

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
        - link "e2e-cat-local-2-5-iyp5wb-k14" [ref=e500] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-iyp5wb-k14
          - img [ref=e502]
          - generic [ref=e506]: e2e-cat-local-2-5-iyp5wb-k14
      - listitem [ref=e507]:
        - link "e2e-cat-local-2-5-iyp5wb-k15" [ref=e508] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-iyp5wb-k15
          - img [ref=e510]
          - generic [ref=e514]: e2e-cat-local-2-5-iyp5wb-k15
      - listitem [ref=e515]:
        - link "e2e-cat-local-2-5-iyp5wb-k16" [ref=e516] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-iyp5wb-k16
          - img [ref=e518]
          - generic [ref=e522]: e2e-cat-local-2-5-iyp5wb-k16
      - listitem [ref=e523]:
        - link "e2e-cat-local-2-5-iyp5wb-k17" [ref=e524] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-iyp5wb-k17
          - img [ref=e526]
          - generic [ref=e530]: e2e-cat-local-2-5-iyp5wb-k17
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
| smoke | 2026-11-17T09:38:47.914Z | 3.7 min |
| email | 2026-11-17T09:39:05.532Z | 0.3 min |
| webkit | 2026-11-17T09:40:09.407Z | 8.4 min |
| shard 1 | 2026-11-17T09:39:08.357Z | 5.7 min |
| shard 2 | 2026-11-17T09:39:12.028Z | 5.1 min |
| shard 3 | 2026-11-17T09:39:41.394Z | 6.0 min |
| shard 4 | 2026-11-17T09:38:50.105Z | 5.3 min |
| shard 5 | 2026-11-17T09:38:46.837Z | 6.1 min |
| shard 6 | 2026-11-17T09:39:25.532Z | 6.3 min |
| shard 7 | 2026-11-17T09:40:08.699Z | 5.3 min |
| shard 8 | 2026-11-17T09:38:52.971Z | 5.9 min |
| shard 9 | 2026-11-17T09:39:10.813Z | 5.4 min |
| shard 10 | 2026-11-17T09:44:06.282Z | 7.1 min |
| shard 11 | 2026-11-17T09:39:30.891Z | 7.1 min |
| shard 12 | 2026-11-17T09:41:15.169Z | 5.9 min |
| shard 13 | 2026-11-17T09:39:36.256Z | 5.0 min |
| shard 14 | 2026-11-17T09:39:12.778Z | 5.9 min |
| shard 15 | 2026-11-17T09:39:33.929Z | 7.7 min |
| shard 16 | 2026-11-17T09:39:23.723Z | 6.1 min |
| repeat | 2026-11-17T09:42:43.426Z | 9.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `viewing-place.spec.ts` | 66 | 11.8 min | shard 15, repeat |
| `shell.spec.ts` | 234 | 9.9 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 6.7 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 11 |
| `feed-screens.spec.ts` | 40 | 5.1 min | webkit, shard 5 |
| `admin-locations.spec.ts` | 38 | 5.0 min | shard 6 |
| `admin-translations-console.spec.ts` | 46 | 4.9 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 58 | 4.9 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 15 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4 |
| `ad-page.spec.ts` | 104 | 4.7 min | webkit, shard 13 |
| `photo-pipeline.spec.ts` | 74 | 4.6 min | webkit, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 4.3 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.6 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 8 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `dialogs.spec.ts` | 20 | 3.3 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `sage-bands.spec.ts` | 76 | 3.0 min | shard 6 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `mfa-stepup.spec.ts` | 22 | 2.5 min | webkit, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.0 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `ad-page-doors.spec.ts` | 90 | 1.4 min | shard 14, repeat |
| `my-listings-page.spec.ts` | 20 | 1.2 min | webkit, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `auth-caller-gates.spec.ts` | 24 | 1.1 min | shard 5, repeat |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 33.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.9 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
