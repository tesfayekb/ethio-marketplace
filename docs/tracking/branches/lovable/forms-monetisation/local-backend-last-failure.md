# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 44061994764 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44061994764
- Commit: `a0083b37891af35dac2283d4c61418b7d208f929`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-17T10:22:09.405Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 10` · admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow

- Source: `shard 10`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('monetisation-price-edit-to-day-2026-11-18')


  142 |     await calendar.getByRole("button", { name: en["prim.date.next"] }).click();
  143 |   }
> 144 |   await page.getByTestId(`${testid}-day-${day}`).click();
      |                                                  ^
  145 |   await expect(calendar).toHaveCount(0);
  146 | }
  147 |
    at pickDay (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:144:50)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1095:5
```

Context:

```text
                      - button "Tuesday, 26 January 2027" [ref=e135] [cursor=pointer]: "26"
                    - gridcell "Wednesday, 27 January 2027" [ref=e136]:
                      - button "Wednesday, 27 January 2027" [ref=e137] [cursor=pointer]: "27"
                    - gridcell "Thursday, 28 January 2027" [ref=e138]:
                      - button "Thursday, 28 January 2027" [ref=e139] [cursor=pointer]: "28"
                    - gridcell "Friday, 29 January 2027" [ref=e140]:
                      - button "Friday, 29 January 2027" [ref=e141] [cursor=pointer]: "29"
                    - gridcell "Saturday, 30 January 2027" [ref=e142]:
                      - button "Saturday, 30 January 2027" [ref=e143] [cursor=pointer]: "30"
                  - row "Sunday, 31 January 2027" [ref=e144]:
                    - gridcell "Sunday, 31 January 2027" [ref=e145]:
                      - button "Sunday, 31 January 2027" [ref=e146] [cursor=pointer]: "31"
        - paragraph [ref=e148]: Leave blank for no end.
      - generic [ref=e149]:
        - button "Cancel" [ref=e150] [cursor=pointer]
        - button "Save" [ref=e151] [cursor=pointer]
    - button "Close" [ref=e152] [cursor=pointer]:
      - img [ref=e153]
      - generic [ref=e156]: Close
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
| smoke | 2026-11-17T10:11:15.339Z | 3.2 min |
| email | 2026-11-17T10:12:04.102Z | 0.4 min |
| webkit | 2026-11-17T10:12:34.703Z | 7.4 min |
| shard 1 | 2026-11-17T10:11:27.553Z | 5.5 min |
| shard 2 | 2026-11-17T10:11:49.844Z | 5.4 min |
| shard 3 | 2026-11-17T10:11:53.098Z | 5.9 min |
| shard 4 | 2026-11-17T10:11:38.914Z | 5.5 min |
| shard 5 | 2026-11-17T10:11:55.160Z | 6.1 min |
| shard 6 | 2026-11-17T10:12:59.069Z | 5.9 min |
| shard 7 | 2026-11-17T10:12:09.782Z | 5.1 min |
| shard 8 | 2026-11-17T10:12:18.577Z | 6.3 min |
| shard 9 | 2026-11-17T10:11:30.753Z | 5.4 min |
| shard 10 | 2026-11-17T10:11:50.239Z | 5.4 min |
| shard 11 | 2026-11-17T10:12:31.499Z | 7.4 min |
| shard 12 | 2026-11-17T10:14:18.490Z | 5.9 min |
| shard 13 | 2026-11-17T10:12:23.816Z | 6.2 min |
| shard 14 | 2026-11-17T10:11:45.829Z | 5.2 min |
| shard 15 | 2026-11-17T10:11:53.806Z | 6.3 min |
| shard 16 | 2026-11-17T10:12:33.124Z | 5.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 5.3 min | shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `ad-page.spec.ts` | 104 | 5.1 min | webkit, shard 13 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 5.0 min | shard 11 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-listings.spec.ts` | 78 | 4.9 min | webkit, shard 10 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 4.6 min | shard 13 |
| `admin-screening.spec.ts` | 58 | 4.4 min | webkit, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 16 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.7 min | shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `sage-bands.spec.ts` | 76 | 2.5 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 8 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.8 min | webkit, shard 15 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 7 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-monetisation.spec.ts` › MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow | mobile-360 | 63.1 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 48.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 29.9 s |
