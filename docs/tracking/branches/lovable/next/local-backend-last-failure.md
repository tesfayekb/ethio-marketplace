# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 45785976240 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45785976240
- Commit: `3a61224a9d190331f01d6862116d8cdd06c6d02d`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-26T09:17:22.955Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse — Error: [e2e:setup] POST /factors/[account id]/challenge failed (500): {"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure, please check server logs for more information"}

## Flaky bodies (DEC-078)

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse

- Source: `shard 5`
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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:432:24
```

Context: context file not found for `admin-attributes-safety-Bundle-7-attribute-safety-AT-76b-the-link-editor-refuses-a-condition-on-the-upper-question-naming-the-lower-one-and-accepts-the-reverse-desktop-1280` — Playwright's name `admin-attributes-safety-Bu-23ac4-one-and-accepts-the-reverse-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 16 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 16 |
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
| smoke | 2026-11-26T08:52:35.037Z | 7.2 min |
| email | 2026-11-26T08:51:16.529Z | 0.3 min |
| webkit | 2026-11-26T08:56:02.160Z | 11.2 min |
| shard 1 | 2026-11-26T08:52:16.585Z | 6.6 min |
| shard 2 | 2026-11-26T08:52:21.678Z | 11.3 min |
| shard 3 | 2026-11-26T08:52:09.207Z | 7.5 min |
| shard 4 | 2026-11-26T08:52:15.863Z | 11.3 min |
| shard 5 | 2026-11-26T08:51:14.066Z | 20.3 min |
| shard 6 | 2026-11-26T08:51:36.780Z | 15.0 min |
| shard 7 | 2026-11-26T08:52:02.301Z | 11.3 min |
| shard 8 | 2026-11-26T08:53:58.158Z | 13.6 min |
| shard 9 | 2026-11-26T08:52:27.440Z | 11.8 min |
| shard 10 | 2026-11-26T08:52:04.663Z | 24.7 min |
| shard 11 | 2026-11-26T08:52:40.207Z | 6.0 min |
| shard 12 | 2026-11-26T08:51:38.652Z | 5.7 min |
| shard 13 | 2026-11-26T08:52:07.503Z | 13.6 min |
| shard 14 | 2026-11-26T08:52:06.547Z | 20.6 min |
| shard 15 | 2026-11-26T08:51:56.225Z | 15.3 min |
| shard 16 | 2026-11-26T08:51:47.763Z | 13.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 82 | 26.7 min | webkit, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.3 min | shard 15 |
| `admin-screening.spec.ts` | 64 | 21.3 min | webkit, shard 14 |
| `legal-admin.spec.ts` | 44 | 20.4 min | shard 5 |
| `admin-translations-console.spec.ts` | 46 | 19.5 min | smoke, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 17.6 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 17.0 min | shard 2 |
| `admin-attributes-links.spec.ts` | 34 | 16.0 min | shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 15.1 min | shard 14 |
| `admin-locations.spec.ts` | 44 | 14.5 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 13.2 min | smoke, shard 10 |
| `import-security.spec.ts` | 36 | 11.7 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 11.1 min | shard 9 |
| `shell.spec.ts` | 234 | 10.6 min | shard 1 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 9.1 min | smoke, shard 6 |
| `admin-translations-governance.spec.ts` | 20 | 7.3 min | smoke, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 6.9 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.9 min | shard 7 |
| `auth-signout.spec.ts` | 44 | 6.0 min | webkit, shard 9 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `admin-guides.spec.ts` | 14 | 4.9 min | shard 3 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `admin-users.spec.ts` | 28 | 4.3 min | shard 16 |
| `admin-translations-data.spec.ts` | 10 | 4.3 min | shard 8 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.7 min | shard 7 |
| `admin-screening-reject.spec.ts` | 10 | 3.6 min | shard 4 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 11 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 10 |
| `mfa-stepup.spec.ts` | 28 | 3.4 min | webkit, shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `post-wizard-category.spec.ts` | 54 | 2.7 min | webkit, shard 3 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 2 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 13 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.9 min | smoke, shard 9 |
| `admin-services.spec.ts` | 10 | 1.8 min | shard 15 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 6 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 12 |
| `my-listings-page.spec.ts` | 24 | 1.2 min | webkit, shard 10 |
| `press.spec.ts` | 22 | 1.1 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 1.1 min | shard 1 |
| `house-style.spec.ts` | 18 | 1.1 min | shard 7 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 2 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 14 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 14 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 4 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 12 |
| `settings.spec.ts` | 16 | 0.7 min | shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.6 min | shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 15 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 7 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 3 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 3 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 15 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 2 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 11 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 10 |
| `staff-gate.spec.ts` | 4 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 13 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 10 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 13 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.2 min | shard 1 |
| `category-image-routes.spec.ts` | 12 | 0.1 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 4 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 2 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 16 |
| `offline.spec.ts` | 2 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 74.9 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.6 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.5 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | mobile-360 | 59.5 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 59.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.2 s |
| `legal-admin.spec.ts` › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused | desktop-1280 | 58.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 56.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 55.2 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 47.1 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 46.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 46.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 46.4 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | desktop-1280 | 46.1 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | desktop-1280 | 45.5 s |
