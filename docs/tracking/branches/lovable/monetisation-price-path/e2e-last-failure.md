# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44561243305 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44561243305
- Commit: `bb7eab03653b46245fcbad0b4c82b1a7bb907a8f`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-fffe599ec458… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-19T16:18:03.475Z
- Post-test warnings: 57
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
        - link "e2e-cat-local-2-5-b02yd0-k14" [ref=e458] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-b02yd0-k14
          - img [ref=e460]
          - generic [ref=e464]: e2e-cat-local-2-5-b02yd0-k14
      - listitem [ref=e465]:
        - link "e2e-cat-local-2-5-b02yd0-k15" [ref=e466] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-b02yd0-k15
          - img [ref=e468]
          - generic [ref=e472]: e2e-cat-local-2-5-b02yd0-k15
      - listitem [ref=e473]:
        - link "e2e-cat-local-2-5-b02yd0-k16" [ref=e474] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-b02yd0-k16
          - img [ref=e476]
          - generic [ref=e480]: e2e-cat-local-2-5-b02yd0-k16
      - listitem [ref=e481]:
        - link "e2e-cat-local-2-5-b02yd0-k17" [ref=e482] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-b02yd0-k17
          - img [ref=e484]
          - generic [ref=e488]: e2e-cat-local-2-5-b02yd0-k17
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
| smoke | 2026-11-19T16:05:41.190Z | 4.3 min |
| email | 2026-11-19T16:08:55.242Z | 0.3 min |
| webkit | 2026-11-19T16:06:38.440Z | 10.5 min |
| shard 1 | 2026-11-19T16:07:39.105Z | 6.2 min |
| shard 2 | 2026-11-19T16:10:29.156Z | 5.2 min |
| shard 3 | 2026-11-19T16:07:32.132Z | 5.9 min |
| shard 4 | 2026-11-19T16:08:41.997Z | 5.4 min |
| shard 5 | 2026-11-19T16:05:17.170Z | 6.6 min |
| shard 6 | 2026-11-19T16:05:43.943Z | 6.1 min |
| shard 7 | 2026-11-19T16:05:37.053Z | 7.2 min |
| shard 8 | 2026-11-19T16:05:07.076Z | 6.3 min |
| shard 9 | 2026-11-19T16:10:45.774Z | 5.9 min |
| shard 10 | 2026-11-19T16:05:15.020Z | 7.1 min |
| shard 11 | 2026-11-19T16:06:56.790Z | 5.7 min |
| shard 12 | 2026-11-19T16:05:05.495Z | 6.6 min |
| shard 13 | 2026-11-19T16:05:25.739Z | 6.5 min |
| shard 14 | 2026-11-19T16:04:17.035Z | 4.9 min |
| shard 15 | 2026-11-19T16:10:20.035Z | 6.2 min |
| shard 16 | 2026-11-19T16:04:53.438Z | 5.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.6 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 6.5 min | webkit, shard 10 |
| `ad-page.spec.ts` | 104 | 6.3 min | webkit, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 2 |
| `feed-screens.spec.ts` | 40 | 5.3 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 5.2 min | smoke, shard 8 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 12 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 9 |
| `admin-screening.spec.ts` | 58 | 4.7 min | webkit, shard 14 |
| `photo-pipeline.spec.ts` | 74 | 4.6 min | webkit, shard 16 |
| `admin-monetisation.spec.ts` | 34 | 4.4 min | smoke, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.8 min | shard 7 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 3.7 min | shard 8 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `dialogs.spec.ts` | 20 | 3.5 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `auth-signout.spec.ts` | 36 | 3.3 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.0 min | shard 14 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.8 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 8 |
| `mfa-stepup.spec.ts` | 22 | 1.9 min | webkit, shard 15 |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `my-listings-page.spec.ts` | 20 | 1.3 min | webkit, shard 10 |
| `legal-certify.spec.ts` | 44 | 1.3 min | shard 14 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 1.1 min | webkit, shard 7 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `layout.spec.ts` | 18 | 0.7 min | webkit, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.5 min | shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 43.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 37.0 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 31.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
