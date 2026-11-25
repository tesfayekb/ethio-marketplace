# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45705204730 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45705204730
- Commit: `3ab1038825031e059f121111731971e4c80758d9`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-60219a57cbdc… (0 read)
- Repeat: 34 of 159 tests repeated — specs directly changed 1/1, importers of a changed helper 2/5; budget 646 s; the time cap left 64 test runs
- Written (UTC): 2026-11-25T22:00:25.156Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · legal-doors.spec.ts › Legal doors › LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### legal-doors.spec.ts › Legal doors › LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule

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
    at aal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:977:23)
    at signInJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1114:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:306:5
```

Context: context file not found for `legal-doors-Legal-doors-LG-2-publish-and-draft-refusals-plain-user-admin-by-role-stale-second-factor-and-every-content-rule-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-9f099-ctor-and-every-content-rule-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 766s for the test suite to run
(no place given)
```

```text
Timed out waiting 766s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

64 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 5 | shard 4, shard 15, repeat |
| `categories wrongFile` (quiet) | 5 | shard 4, shard 15, repeat |
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

Quiet (allowlisted): categories badHeader ×5 · categories wrongFile ×5 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-25T21:35:51.833Z | 7.1 min |
| email | 2026-11-25T21:35:57.369Z | 0.4 min |
| webkit | 2026-11-25T21:35:44.669Z | 10.4 min |
| shard 1 | 2026-11-25T21:36:14.424Z | 6.3 min |
| shard 2 | 2026-11-25T21:36:18.689Z | 12.5 min |
| shard 3 | 2026-11-25T21:39:25.383Z | 7.4 min |
| shard 4 | 2026-11-25T21:35:29.177Z | 12.1 min |
| shard 5 | 2026-11-25T21:37:17.064Z | 9.2 min |
| shard 6 | 2026-11-25T21:36:04.278Z | 15.0 min |
| shard 7 | 2026-11-25T21:35:23.983Z | 24.2 min |
| shard 8 | 2026-11-25T21:38:33.335Z | 20.5 min |
| shard 9 | 2026-11-25T21:35:40.344Z | 11.0 min |
| shard 10 | 2026-11-25T21:35:48.814Z | 20.9 min |
| shard 11 | 2026-11-25T21:35:55.213Z | 6.4 min |
| shard 12 | 2026-11-25T21:36:07.508Z | 8.0 min |
| shard 13 | 2026-11-25T21:36:19.997Z | 13.4 min |
| shard 14 | 2026-11-25T21:35:24.293Z | 20.2 min |
| shard 15 | 2026-11-25T21:36:28.370Z | 15.5 min |
| shard 16 | 2026-11-25T21:36:38.765Z | 7.4 min |
| repeat | 2026-11-25T21:36:58.322Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` | 156 | 34.4 min | shard 15, repeat |
| `admin-listings.spec.ts` | 82 | 26.0 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 64 | 21.3 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.7 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 19.5 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.5 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 17.2 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.6 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 14.9 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 12.9 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.8 min | shard 4 |
| `shell.spec.ts` | 234 | 10.9 min | shard 1 |
| `admin-roles.spec.ts` | 28 | 10.8 min | shard 9 |
| `legal-doors.spec.ts` | 34 | 9.6 min | smoke, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 6.9 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.9 min | shard 6 |
| `admin-translations-governance.spec.ts` | 20 | 6.0 min | smoke, shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 5.8 min | shard 12 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 9 |
| `photo-pipeline.spec.ts` | 74 | 5.1 min | webkit, shard 16 |
| `ad-page.spec.ts` | 104 | 4.9 min | webkit, shard 13 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 3 |
| `admin-users.spec.ts` | 28 | 4.8 min | shard 16 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `dialogs.spec.ts` | 36 | 4.8 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 4.6 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-translations-data.spec.ts` | 10 | 4.0 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 4.0 min | shard 4 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.8 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 2.4 min | smoke, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 2 |
| `admin-services.spec.ts` | 10 | 2.0 min | shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 2 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.4 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `my-listings-doors.spec.ts` | 28 | 1.2 min | shard 11 |
| `house-style.spec.ts` | 18 | 1.2 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 1.1 min | shard 16 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `overlays.spec.ts` | 8 | 0.9 min | shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `staff-gate.spec.ts` | 4 | 0.7 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.7 min | shard 1 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 6 |
| `settings.spec.ts` | 16 | 0.6 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `i18n-coverage.spec.ts` | 42 | 0.5 min | shard 10, repeat |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 7 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 9 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `submenu.spec.ts` | 14 | 0.4 min | smoke, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.4 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 9 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 4 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 7 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 4 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 13 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 10 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 5 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 14 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 6 | 0.1 min | shard 2, repeat |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 7 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 8 |
| `rail-first-paint.spec.ts` | 4 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 61.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 60.1 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.0 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 58.7 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.4 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 55.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.1 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.6 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 46.4 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 46.1 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 45.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 45.7 s |
