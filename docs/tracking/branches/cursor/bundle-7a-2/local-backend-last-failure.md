# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45689374949 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45689374949
- Commit: `5661c1eda27a7a410e40eec534ec30f3c4c1237e`
- Attempt: 1
- Repeat: 26 of 26 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 646 s; the time cap left 47 test runs
- Written (UTC): 2026-11-25T20:22:06.883Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): repeat (2)

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 9` · admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 9`
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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:463:24
```

Context: context file not found for `admin-roles-U2-roles-console-RP-12-DEC-017-a-user-baseline-row-badges-instead-of-toggling-a-normal-row-still-toggles-desktop-1280` — Playwright's name `admin-roles-U2-roles-conso-b8514--a-normal-row-still-toggles-desktop-1280`; this run carried 0 context file(s); of the same spec: none

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
| smoke | 2026-11-25T19:57:59.435Z | 6.9 min |
| email | 2026-11-25T20:01:13.227Z | 0.3 min |
| webkit | 2026-11-25T19:58:25.790Z | 10.2 min |
| shard 1 | 2026-11-25T19:57:36.075Z | 5.5 min |
| shard 2 | 2026-11-25T19:58:27.289Z | 12.3 min |
| shard 3 | 2026-11-25T19:57:47.487Z | 7.4 min |
| shard 4 | 2026-11-25T19:57:45.796Z | 11.8 min |
| shard 5 | 2026-11-25T19:57:59.159Z | 8.9 min |
| shard 6 | 2026-11-25T19:57:54.770Z | 15.2 min |
| shard 7 | 2026-11-25T19:58:09.022Z | 23.4 min |
| shard 8 | 2026-11-25T19:57:55.726Z | 20.4 min |
| shard 9 | 2026-11-25T19:58:36.064Z | 11.1 min |
| shard 10 | 2026-11-25T19:58:13.669Z | 21.0 min |
| shard 11 | 2026-11-25T19:57:39.019Z | 6.5 min |
| shard 12 | 2026-11-25T19:57:52.946Z | 6.0 min |
| shard 13 | 2026-11-25T19:58:01.297Z | 12.2 min |
| shard 14 | 2026-11-25T19:57:35.888Z | 20.0 min |
| shard 15 | 2026-11-25T19:58:07.127Z | 15.3 min |
| shard 16 | 2026-11-25T19:58:48.562Z | 6.7 min |
| repeat | 2026-11-25T19:57:34.724Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` | 156 | 34.1 min | shard 15, repeat |
| `admin-listings.spec.ts` | 82 | 26.0 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 64 | 21.1 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.2 min | shard 7 |
| `admin-translations-console.spec.ts` | 46 | 18.9 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.6 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 16.7 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 16.2 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.4 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 15.0 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 13.1 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.6 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 10.9 min | shard 9 |
| `shell.spec.ts` | 234 | 9.7 min | shard 1 |
| `legal-doors.spec.ts` | 34 | 9.7 min | smoke, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 7.1 min | shard 6 |
| `admin-translations-governance.spec.ts` | 20 | 6.1 min | smoke, shard 16 |
| `auth-signout.spec.ts` | 44 | 5.9 min | webkit, shard 9 |
| `feed-screens.spec.ts` | 40 | 4.7 min | webkit, shard 5 |
| `admin-guides.spec.ts` | 14 | 4.7 min | shard 3 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 3 |
| `admin-users.spec.ts` | 28 | 4.5 min | shard 16 |
| `photo-pipeline.spec.ts` | 74 | 4.5 min | webkit, shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.2 min | shard 11 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `ad-page.spec.ts` | 104 | 4.0 min | webkit, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 11 |
| `admin-translations-data.spec.ts` | 10 | 3.8 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.4 min | shard 12 |
| `mfa-stepup.spec.ts` | 28 | 3.2 min | webkit, shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.6 min | webkit, shard 4 |
| `name-check-queue.spec.ts` | 8 | 2.6 min | smoke, shard 9 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 7 |
| `admin-services.spec.ts` | 10 | 2.4 min | shard 2 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.2 min | shard 6 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 2 |
| `sage-tiers.spec.ts` | 52 | 1.3 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `my-listings-levels.spec.ts` | 28 | 1.1 min | shard 16 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 12 |
| `my-listings-doors.spec.ts` | 28 | 1.0 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `overlays.spec.ts` | 8 | 1.0 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 16 |
| `my-listings-page.spec.ts` | 24 | 0.9 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.8 min | shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `user-guides.spec.ts` | 18 | 0.7 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 6 |
| `settings.spec.ts` | 16 | 0.5 min | shard 4 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 9 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 1 |
| `staff-gate.spec.ts` | 4 | 0.4 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 9 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 15 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 12 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 3 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 1 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 7 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 10 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `category-image-routes.spec.ts` | 12 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 14 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 16 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 7 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 8 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 8 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 2 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.8 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 59.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.1 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 58.9 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.6 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 56.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 54.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 49.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 49.3 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.5 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.2 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 46.2 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 46.1 s |
