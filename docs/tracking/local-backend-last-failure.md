# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40309910746 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40309910746
- Commit: `bb4a1ebb2d0b77becb84805947fec9967da21bef`
- Attempt: 1
- Written (UTC): 2026-10-26T11:13:20.313Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 14` · post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step — Error: PW-54: draft_step 3 without photos must open photos

## Flaky bodies (DEC-078)

### post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: PW-54: draft_step 3 without photos must open photos

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-54: draft_step 3 without photos must open photos with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: PW-54: draft_step 3 without photos must open photos

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-54: draft_step 3 without photos must open photos with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  775 |     const opensAt = async (id: string, testId: string, why: string) => {
  776 |       await gotoReady(page, `/post/${id}`);
> 777 |       await expect(page.getByTestId(testId), why).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  778 |     };
  779 |
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Error: TypeError: Failed to fetch at readOwnPrivate (http://127.0.0.1:4173/assets/posting-service-Cdu65Cr0.js:281:9) at async readDraft (http://127.0.0.1:4173/assets/posting-service-Cdu65Cr0.js:293:14) at async beforeLoad (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:23213:17) at async contextualize (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:11981:19) at async executeClientLane (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:12457:19) at async runClientTransaction (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:12697:17)
[client-error] console.error: Error: TypeError: Failed to fetch at readOwnPrivate (http://127.0.0.1:4173/assets/posting-service-Cdu65Cr0.js:281:9) at async readDraft (http://127.0.0.1:4173/assets/posting-service-Cdu65Cr0.js:293:14) at async beforeLoad (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:23213:17) at async contextualize (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:11981:19) at async executeClientLane (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:12457:19) at async runClientTransaction (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:12697:17)
[client-error] console.error: Error: TypeError: Failed to fetch at readOwnPrivate (http://127.0.0.1:4173/assets/posting-service-Cdu65Cr0.js:281:9) at async readDraft (http://127.0.0.1:4173/assets/posting-service-Cdu65Cr0.js:293:14) at async beforeLoad (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:23213:17) at async contextualize (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:11981:19) at async executeClientLane (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:12457:19) at async runClientTransaction (http://127.0.0.1:4173/assets/index-PfX-FSZP.js:12697:17)
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-26T10:51:21.892Z | 12.0 min |
| email | 2026-10-26T10:59:36.159Z | 0.3 min |
| shard 1 | 2026-10-26T10:48:29.369Z | 7.9 min |
| shard 2 | 2026-10-26T11:00:44.269Z | 11.1 min |
| shard 3 | 2026-10-26T11:00:10.837Z | 12.7 min |
| shard 4 | 2026-10-26T10:51:16.417Z | 8.0 min |
| shard 5 | 2026-10-26T10:48:13.285Z | 5.1 min |
| shard 6 | 2026-10-26T11:02:02.406Z | 10.0 min |
| shard 7 | 2026-10-26T10:59:33.793Z | 6.0 min |
| shard 8 | 2026-10-26T10:52:15.975Z | 7.7 min |
| shard 9 | 2026-10-26T10:48:29.850Z | 10.4 min |
| shard 10 | 2026-10-26T10:48:47.767Z | 13.9 min |
| shard 11 | 2026-10-26T10:53:25.430Z | 13.1 min |
| shard 12 | 2026-10-26T10:50:35.954Z | 8.0 min |
| shard 13 | 2026-10-26T10:53:34.603Z | 7.5 min |
| shard 14 | 2026-10-26T10:50:46.168Z | 10.9 min |
| shard 15 | 2026-10-26T10:49:27.920Z | 7.0 min |
| shard 16 | 2026-10-26T10:48:38.161Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 428 | 18.5 min | smoke, shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.8 min | shard 7, shard 15 |
| `import-security.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.2 min | smoke, shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 62 | 3.3 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.3 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `post-wizard-category.spec.ts` | 48 | 3.0 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 76 | 3.0 min | shard 1, shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.4 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 2.0 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 10 | 0.4 min | shard 8, shard 16 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 5, shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.0 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.8 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 31.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
