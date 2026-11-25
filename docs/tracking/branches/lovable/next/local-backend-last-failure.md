# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45673729426 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45673729426
- Commit: `5267b4544ea7f7f409968eb8962c6baddd05a499`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-25T18:49:16.921Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-attributes-library.spec.ts › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 15` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### admin-attributes-library.spec.ts › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth)

- Source: `shard 2`
- Project: `mobile-360`

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
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:598:24
```

Context: context file not found for `admin-attributes-library-C3-attributes-console-AT-10-Used-by-names-the-category-the-attribute-was-assigned-to-DB-truth-mobile-360` — Playwright's name `admin-attributes-library-C-5aeb2-e-was-assigned-to-DB-truth--mobile-360`; this run carried 0 context file(s); of the same spec: none

### admin-categories-lifecycle.spec.ts › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order

- Source: `shard 15`
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
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:481:7
```

Context: context file not found for `admin-categories-lifecycle-C2-categories-console-CT-44-a-second-Move-up-waits-for-the-first-and-lands-from-the-new-order-desktop-1280` — Playwright's name `admin-categories-lifecycle-0405b-nd-lands-from-the-new-order-desktop-1280`; this run carried 0 context file(s); of the same spec: none

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
| smoke | 2026-11-25T18:25:36.912Z | 6.6 min |
| email | 2026-11-25T18:26:27.693Z | 0.3 min |
| webkit | 2026-11-25T18:32:00.236Z | 10.1 min |
| shard 1 | 2026-11-25T18:26:23.820Z | 6.2 min |
| shard 2 | 2026-11-25T18:24:18.194Z | 12.6 min |
| shard 3 | 2026-11-25T18:24:53.991Z | 8.3 min |
| shard 4 | 2026-11-25T18:28:01.844Z | 12.0 min |
| shard 5 | 2026-11-25T18:26:41.420Z | 9.2 min |
| shard 6 | 2026-11-25T18:23:54.510Z | 15.2 min |
| shard 7 | 2026-11-25T18:24:05.161Z | 24.5 min |
| shard 8 | 2026-11-25T18:24:10.797Z | 20.2 min |
| shard 9 | 2026-11-25T18:24:59.634Z | 11.2 min |
| shard 10 | 2026-11-25T18:27:22.195Z | 20.8 min |
| shard 11 | 2026-11-25T18:24:06.934Z | 6.3 min |
| shard 12 | 2026-11-25T18:24:15.889Z | 8.2 min |
| shard 13 | 2026-11-25T18:23:57.675Z | 12.2 min |
| shard 14 | 2026-11-25T18:24:06.582Z | 20.0 min |
| shard 15 | 2026-11-25T18:24:03.219Z | 15.7 min |
| shard 16 | 2026-11-25T18:23:25.230Z | 5.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.4 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.2 min | shard 15 |
| `legal-admin.spec.ts` | 44 | 21.3 min | shard 7 |
| `admin-screening.spec.ts` | 64 | 21.1 min | webkit, shard 14 |
| `admin-translations-console.spec.ts` | 46 | 18.7 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.4 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 17.1 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 16.2 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.4 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 15.0 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 13.1 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.8 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 11.0 min | shard 9 |
| `shell.spec.ts` | 234 | 10.6 min | shard 1 |
| `legal-doors.spec.ts` | 34 | 9.4 min | smoke, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 7.1 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.1 min | shard 3 |
| `post-wizard-specs.spec.ts` | 82 | 5.9 min | shard 12 |
| `auth-signout.spec.ts` | 44 | 5.8 min | webkit, shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 5.3 min | smoke, shard 16 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-guides.spec.ts` | 14 | 4.8 min | shard 3 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 10 |
| `post-wizard-place.spec.ts` | 40 | 4.5 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.5 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 4.3 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-translations-data.spec.ts` | 10 | 4.1 min | shard 5 |
| `ad-page.spec.ts` | 104 | 4.0 min | webkit, shard 13 |
| `admin-categories-home.spec.ts` | 10 | 3.8 min | shard 4 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 16 |
| `mfa-stepup.spec.ts` | 28 | 3.2 min | webkit, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 3 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 4 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 2.5 min | smoke, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-services.spec.ts` | 10 | 2.1 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `press.spec.ts` | 22 | 1.6 min | shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 2 |
| `phone-frame.spec.ts` | 18 | 1.5 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `house-style.spec.ts` | 18 | 1.3 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `overlays.spec.ts` | 8 | 0.9 min | shard 11 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 16 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 16 |
| `user-guides.spec.ts` | 18 | 0.7 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 11 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 1 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 6 |
| `settings.spec.ts` | 16 | 0.5 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 13 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 9 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `staff-gate.spec.ts` | 4 | 0.4 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 9 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `submenu.spec.ts` | 14 | 0.4 min | smoke, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 5 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 3 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 1 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 10 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 10 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 16 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.2 min | shard 12 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 1 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 14 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 10 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 8 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 7 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 2 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 8 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 60.7 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.1 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 58.7 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.4 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.8 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 52.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 49.3 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.5 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.1 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 46.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 45.8 s |
| `admin-monetisation.spec.ts` › MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark | mobile-360 | 45.2 s |
