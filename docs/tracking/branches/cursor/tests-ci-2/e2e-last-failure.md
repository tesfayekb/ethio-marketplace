# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44900066596 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44900066596
- Commit: `6fa954a0e430614b7cd6addc06b9bbf346398505`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-ced03e56e8ca… (0 read)
- Repeat: 34 of 1459 tests repeated — specs directly changed 5/5, importers of a changed helper 4/108; budget 643 s
- Written (UTC): 2026-11-21T11:52:12.124Z
- Post-test warnings: 61
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 12` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 12`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  1085 |       await assertKept("before");
  1086 |       await nextThroughPhotos(page);
> 1087 |       await expect(page.getByTestId("post-step-4")).toBeVisible();
       |                                                     ^
  1088 |       for (const step of [2, 3]) {
  1089 |         await page.getByTestId("post-back").click();
  1090 |         await expect(page.getByTestId(`post-step-${step}`)).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1087:53
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--4c4ed-r-INC-329-small-model-list--mobile-360`; this run carried 0 context file(s); of the same spec: none

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
| smoke | 2026-11-21T11:42:00.009Z | 4.1 min |
| email | 2026-11-21T11:41:33.845Z | 0.3 min |
| webkit | 2026-11-21T11:42:15.965Z | 8.0 min |
| shard 1 | 2026-11-21T11:43:14.396Z | 5.5 min |
| shard 2 | 2026-11-21T11:42:04.024Z | 5.3 min |
| shard 3 | 2026-11-21T11:42:09.865Z | 6.7 min |
| shard 4 | 2026-11-21T11:41:44.720Z | 5.4 min |
| shard 5 | 2026-11-21T11:42:48.946Z | 6.4 min |
| shard 6 | 2026-11-21T11:41:58.174Z | 5.6 min |
| shard 7 | 2026-11-21T11:42:13.705Z | 6.5 min |
| shard 8 | 2026-11-21T11:41:57.220Z | 5.7 min |
| shard 9 | 2026-11-21T11:42:33.383Z | 7.6 min |
| shard 10 | 2026-11-21T11:42:06.886Z | 5.4 min |
| shard 11 | 2026-11-21T11:42:07.971Z | 5.9 min |
| shard 12 | 2026-11-21T11:42:32.378Z | 5.9 min |
| shard 13 | 2026-11-21T11:42:10.745Z | 5.5 min |
| shard 14 | 2026-11-21T11:43:30.540Z | 5.3 min |
| shard 15 | 2026-11-21T11:45:11.671Z | 6.1 min |
| shard 16 | 2026-11-21T11:43:50.422Z | 5.2 min |
| repeat | 2026-11-21T11:42:28.126Z | 3.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `auth-signout.spec.ts` | 44 | 6.4 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.8 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.5 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `admin-categories-console.spec.ts` | 34 | 5.2 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 9 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `admin-translations-console.spec.ts` | 46 | 4.9 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 58 | 4.7 min | webkit, shard 14 |
| `ad-page.spec.ts` | 104 | 4.7 min | webkit, shard 13 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 4.5 min | shard 12 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 16 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.5 min | smoke, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 3 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 5 |
| `dialogs.spec.ts` | 20 | 2.4 min | webkit, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.4 min | shard 7 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `admin-audit.spec.ts` | 16 | 1.9 min | shard 9 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `admin-guides.spec.ts` | 14 | 1.3 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `shell-bands.spec.ts` | 48 | 0.8 min | smoke, shard 12, repeat |
| `submenu.spec.ts` | 42 | 0.8 min | smoke, shard 15, repeat |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 4, repeat |
| `submenu-look.spec.ts` | 36 | 0.5 min | smoke, shard 2, repeat |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `menu-rows.spec.ts` | 18 | 0.5 min | smoke, shard 14, repeat |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `submenu-touch.spec.ts` | 24 | 0.2 min | smoke, shard 13, repeat |
| `admin-ai-calls.spec.ts` | 6 | 0.2 min | shard 11, repeat |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 10, repeat |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-google.spec.ts` | 6 | 0.1 min | shard 16, repeat |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 65.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.2 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 34.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 32.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
