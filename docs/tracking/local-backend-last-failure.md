# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42200467397
- Commit: `e5ef934f56f8f0880582f05ce316d1c64f31b933`
- Attempt: 1
- Written (UTC): 2026-11-06T10:36:33.440Z
- Passed: 2583 · Skipped: 332 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 11` · choice-lists.spec.ts › choice lists at 1440, dark › CL-E4 the row-actions menu (1440, dark) — Error: expect(received).toEqual(expected) // deep equality

## Flaky bodies (DEC-078)

### choice-lists.spec.ts › choice lists at 1440, dark › CL-E4 the row-actions menu (1440, dark)

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   "matrix3d(0.95, 0, 0, 0, 0, 0.95, 0, 0, 0, 0, 0.95, 0, 0, 8, 0, 1)",
+   "matrix3d(0.95565, 0, 0, 0, 0, 0.95565, 0, 0, 0, 0, 0.95565, 0, 0, 7.09599, 0, 1)",
+   "matrix3d(0.967276, 0, 0, 0, 0, 0.967276, 0, 0, 0, 0, 0.967276, 0, 0, 5.23577, 0, 1)",
+   "matrix3d(0.978793, 0, 0, 0, 0, 0.978793, 0, 0, 0, 0, 0.978793, 0, 0, 3.3931, 0, 1)",
+ ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   "matrix3d(0.95, 0, 0, 0, 0, 0.95, 0, 0, 0, 0, 0.95, 0, 0, 8, 0, 1)",
+   "matrix3d(0.95565, 0, 0, 0, 0, 0.95565, 0, 0, 0, 0, 0.95565, 0, 0, 7.09599, 0, 1)",
+   "matrix3d(0.967276, 0, 0, 0, 0, 0.967276, 0, 0, 0, 0, 0.967276, 0, 0, 5.23577, 0, 1)",
+   "matrix3d(0.978793, 0, 0, 0, 0, 0.978793, 0, 0, 0, 0, 0.978793, 0, 0, 3.3931, 0, 1)",
+ ]

  112 |   await expect(panel).toBeVisible();
  113 |   await expectSettled(panel);
> 114 |   expect((await scales(page, panel)).filter(hasScale)).toEqual([]);
      |                                                        ^
  115 |   // A nested TooltipTrigger also writes data-state. aria-expanded belongs to
  116 |   // the list trigger itself, and OPEN_CONTROL deliberately supports it.
  117 |   await expect(control).toHaveAttribute("aria-expanded", "true");
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
```

Context: context file not found for `choice-lists-choice-lists-at-1440-dark-CL-E4-the-row-actions-menu-1440-dark-desktop-1280` — Playwright's name `choice-lists-choice-lists--b86c9-row-actions-menu-1440-dark--desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-06T10:12:56.309Z | 0.4 min |
| shard 1 | 2026-11-06T10:12:59.575Z | 14.8 min |
| shard 2 | 2026-11-06T10:12:54.545Z | 14.9 min |
| shard 3 | 2026-11-06T10:12:46.483Z | 9.9 min |
| shard 4 | 2026-11-06T10:12:39.762Z | 12.7 min |
| shard 5 | 2026-11-06T10:12:53.979Z | 9.4 min |
| shard 6 | 2026-11-06T10:12:13.006Z | 11.0 min |
| shard 7 | 2026-11-06T10:12:03.322Z | 3.4 min |
| shard 8 | 2026-11-06T10:13:25.734Z | 8.4 min |
| shard 9 | 2026-11-06T10:12:28.304Z | 12.5 min |
| shard 10 | 2026-11-06T10:21:49.307Z | 14.2 min |
| shard 11 | 2026-11-06T10:22:07.990Z | 11.4 min |
| shard 12 | 2026-11-06T10:12:43.095Z | 12.8 min |
| shard 13 | 2026-11-06T10:13:51.158Z | 8.3 min |
| shard 14 | 2026-11-06T10:12:58.358Z | 13.3 min |
| shard 15 | 2026-11-06T10:23:20.507Z | 3.8 min |
| shard 16 | 2026-11-06T10:12:45.039Z | 8.3 min |
| repeat | 2026-11-06T10:13:10.710Z | 7.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 228 | 11.6 min | shard 2, shard 10, repeat |
| `shell.spec.ts` | 234 | 9.7 min | shard 8, shard 16 |
| `import-security.spec.ts` | 36 | 5.5 min | shard 4, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 5, shard 13 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.4 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.3 min | shard 2, shard 11 |
| `admin-roles.spec.ts` | 28 | 4.2 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.2 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 54 | 3.8 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 4, shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 2, shard 10 |
| `auth-signout.spec.ts` | 36 | 3.3 min | shard 3, shard 11 |
| `choice-lists.spec.ts` | 96 | 3.2 min | shard 3, shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.6 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 6, shard 14 |
| `admin-monetisation.spec.ts` | 34 | 2.3 min | shard 2, shard 10 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 7, shard 15 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 4, shard 12 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `mfa-stepup.spec.ts` | 20 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `dialogs.spec.ts` | 14 | 1.5 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `admin-guides.spec.ts` | 14 | 0.9 min | shard 2, shard 10 |
| `sage-ad-page.spec.ts` | 18 | 0.8 min | shard 7, shard 15 |
| `sage-tiers.spec.ts` | 40 | 0.8 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `my-listings-levels.spec.ts` | 26 | 0.6 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 7, shard 15 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 6, shard 14 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `layout.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `settings.spec.ts` | 9 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 7, shard 15 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 37.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.5 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42200467397-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42200467397-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42200467397-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42200467397-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42200467397-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42200467397-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42200467397-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42200467397-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42200467397-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42200467397-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42200467397-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42200467397-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42200467397-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42200467397-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42200467397-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42200467397-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42200467397-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42200467397-local-repeat
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
