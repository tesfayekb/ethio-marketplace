# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44607286456 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44607286456
- Commit: `c03e3392330cac4d437729d3a6c501237d8fef23`
- Attempt: 1
- Repeat: 26 of 194 tests repeated — specs directly changed 3/10, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-19T20:33:48.342Z
- Post-test warnings: 60
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 2` · submenu-look.spec.ts › D248 a side panel is the main menu › SMN-E13 a panel with one row more than the menu holds keeps the rail's row height, spans the menu and scrolls (D254) — Error: SMN-E13 the panel scrolls
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

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
        - link "e2e-cat-local-2-5-cxywqm-k14" [ref=e458] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-cxywqm-k14
          - img [ref=e460]
          - generic [ref=e464]: e2e-cat-local-2-5-cxywqm-k14
      - listitem [ref=e465]:
        - link "e2e-cat-local-2-5-cxywqm-k15" [ref=e466] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-cxywqm-k15
          - img [ref=e468]
          - generic [ref=e472]: e2e-cat-local-2-5-cxywqm-k15
      - listitem [ref=e473]:
        - link "e2e-cat-local-2-5-cxywqm-k16" [ref=e474] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-cxywqm-k16
          - img [ref=e476]
          - generic [ref=e480]: e2e-cat-local-2-5-cxywqm-k16
      - listitem [ref=e481]:
        - link "e2e-cat-local-2-5-cxywqm-k17" [ref=e482] [cursor=pointer]:
          - /url: /c/e2e-cat-local-2-5-cxywqm-k17
          - img [ref=e484]
          - generic [ref=e488]: e2e-cat-local-2-5-cxywqm-k17
```
```

### legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
--- further error 1 ---
Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

   at global-setup.ts:255

  253 |   const text = await response.text();
  254 |   if (!response.ok) {
> 255 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  256 |   }
  257 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  258 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:255:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:948:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1076:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:247:5
```

Context: context file not found for `legal-admin-Admin-Legal-LGA-1-Legal-cards-facts-and-the-permission-gated-admin-menu-desktop-1280` — Playwright's name `legal-admin-Admin-Legal-LG-5ba05-permission-gated-admin-menu-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>` | 2 | shard 2 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>

- Count: 2 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-19T21:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-19T20:23:49.464Z | 3.7 min |
| email | 2026-11-19T20:23:30.175Z | 0.3 min |
| webkit | 2026-11-19T20:22:45.121Z | 9.2 min |
| shard 1 | 2026-11-19T20:23:27.758Z | 5.5 min |
| shard 2 | 2026-11-19T20:22:18.959Z | 6.0 min |
| shard 3 | 2026-11-19T20:22:25.197Z | 6.7 min |
| shard 4 | 2026-11-19T20:28:07.930Z | 5.3 min |
| shard 5 | 2026-11-19T20:22:07.653Z | 6.2 min |
| shard 6 | 2026-11-19T20:22:45.668Z | 5.7 min |
| shard 7 | 2026-11-19T20:22:07.041Z | 5.1 min |
| shard 8 | 2026-11-19T20:22:07.165Z | 5.6 min |
| shard 9 | 2026-11-19T20:24:57.448Z | 5.4 min |
| shard 10 | 2026-11-19T20:24:41.702Z | 5.4 min |
| shard 11 | 2026-11-19T20:25:41.030Z | 5.7 min |
| shard 12 | 2026-11-19T20:21:52.955Z | 6.2 min |
| shard 13 | 2026-11-19T20:27:55.265Z | 4.9 min |
| shard 14 | 2026-11-19T20:21:45.055Z | 5.6 min |
| shard 15 | 2026-11-19T20:26:53.322Z | 6.2 min |
| shard 16 | 2026-11-19T20:24:05.768Z | 5.6 min |
| repeat | 2026-11-19T20:24:07.906Z | 1.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.3 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 58 | 5.1 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 12 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `ad-page.spec.ts` | 104 | 4.4 min | webkit, shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `photo-pipeline.spec.ts` | 74 | 4.2 min | webkit, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 3 |
| `dialogs.spec.ts` | 20 | 2.7 min | webkit, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 2 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `ad-page-doors.spec.ts` | 90 | 1.3 min | shard 14, repeat |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 12 |
| `press.spec.ts` | 22 | 1.2 min | shard 12 |
| `auth-caller-gates.spec.ts` | 24 | 1.1 min | shard 5, repeat |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `door-refusals.spec.ts` | 42 | 0.3 min | shard 7, repeat |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 48.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 31.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.1 s |
