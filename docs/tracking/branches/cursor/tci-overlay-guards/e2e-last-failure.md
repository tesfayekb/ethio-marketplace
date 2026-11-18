# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44349776301 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44349776301
- Commit: `ba763909951df787130f39ae8b51f3c1660e0435`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-34e97ae39b71… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-18T17:22:50.316Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 15` · mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect.toBeVisible: Target page, context or browser has been closed

  135 |
  136 |     await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
> 137 |     await expect(page.getByTestId("step-up-settings-link")).toBeVisible();
      |                                                             ^
  138 |     expect(await statusChangeCount(target.id)).toBe(0);
  139 |   });
  140 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:137:61
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-3-no-factor-the-modal-explains-and-the-RPC-is-never-called-desktop-1280` — Playwright's name `mfa-stepup-U1f-step-up-aut-0f945-and-the-RPC-is-never-called-desktop-1280`; this run carried 0 context file(s); of the same spec: none

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
| smoke | 2026-11-18T16:52:43.719Z | 3.6 min |
| email | 2026-11-18T16:52:50.773Z | 0.3 min |
| webkit | 2026-11-18T17:13:50.437Z | 7.9 min |
| shard 1 | 2026-11-18T16:59:47.750Z | 5.4 min |
| shard 2 | 2026-11-18T16:57:50.657Z | 5.3 min |
| shard 3 | 2026-11-18T16:53:56.396Z | 5.9 min |
| shard 4 | 2026-11-18T16:53:28.970Z | 5.6 min |
| shard 5 | 2026-11-18T16:53:19.105Z | 6.1 min |
| shard 6 | 2026-11-18T16:50:47.310Z | 5.6 min |
| shard 7 | 2026-11-18T17:00:05.079Z | 5.4 min |
| shard 8 | 2026-11-18T16:53:22.751Z | 5.5 min |
| shard 9 | 2026-11-18T16:54:35.564Z | 5.5 min |
| shard 10 | 2026-11-18T16:54:11.098Z | 5.9 min |
| shard 11 | 2026-11-18T16:59:11.093Z | 5.8 min |
| shard 12 | 2026-11-18T16:54:10.703Z | 5.9 min |
| shard 13 | 2026-11-18T16:56:45.531Z | 5.1 min |
| shard 14 | 2026-11-18T16:56:25.689Z | 5.1 min |
| shard 15 | 2026-11-18T16:53:01.496Z | 6.8 min |
| shard 16 | 2026-11-18T16:53:16.812Z | 5.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 6.1 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 58 | 4.6 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.2 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.6 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `mfa-stepup.spec.ts` | 22 | 3.2 min | webkit, shard 15 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 2.9 min | smoke, shard 16 |
| `dialogs.spec.ts` | 20 | 2.8 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.4 min | shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `mfa-stepup.spec.ts` › MF-3 no factor: the modal explains and the RPC is never called | desktop-1280 | 73.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 31.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 31.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 30.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.7 s |
