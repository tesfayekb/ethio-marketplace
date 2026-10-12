# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38200921488 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38200921488
- Commit: `b6aa7bc5f2ea1b04371ac94348efb5ebe34ab380`
- Attempt: 1
- Written (UTC): 2026-10-12T04:15:57.029Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 4

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · shell.spec.ts › L4b location picker › LS-9 coordinates far from every metro stop at the market — Error: the ET tree never carried e2e-loc-8-1-gs-city-imxtod within 20 s

## Flaky bodies (DEC-078)

### admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-0-z95i69')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-0-z95i69')

[dialog-dump findRow(e2e-cat-5-0-z95i69)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-0-z95i69) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-0-z95i69')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-0-z95i69')

[dialog-dump findRow(e2e-cat-5-0-z95i69)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-0-z95i69) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')


  1256 |     await page.getByTestId("post-price-mode-free").click();
  1257 |     await page.getByTestId("post-next").click();
> 1258 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
       |                                                   ^
  1259 |     await page.getByTestId("post-title").fill("e2e listing title");
  1260 |     await page.getByTestId("post-description").fill("e2e listing description");
  1261 |     await page.getByTestId("post-next").click();
    at openPinAt6 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1258:51)
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-desktop-1280`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  191 |   async function nextThroughPhotos(page: import("@playwright/test").Page) {
  192 |     await page.getByTestId("post-next").click();
> 193 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  194 |     await page.getByTestId("post-next").click();
  195 |   }
  196 |
    at nextThroughPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:193:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-135-at-1280-the-step-list-opens-a-finished-step-with-its-answers-kept-a-step-not-reached-is-not-a-button-bundle-4-step-5-desktop-1280`

### shell.spec.ts › L4b location picker › LS-9 coordinates far from every metro stop at the market

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: the ET tree never carried e2e-loc-8-1-gs-city-imxtod within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-8-1-gs-city-imxtod"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-8-0-ls-region-byinru", "e2e-loc-8-0-ls-region-cbirib", "e2e-loc-8-1-gs-region-3hrt1t", "oromia", "sidama", "tigray", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-8-1-gs-city-imxtod within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-8-1-gs-city-imxtod"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-8-0-ls-region-byinru", "e2e-loc-8-0-ls-region-cbirib", "e2e-loc-8-1-gs-region-3hrt1t", "oromia", "sidama", "tigray", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:482

  480 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  481 |   let seen: string[] = [];
> 482 |   await expect
      |   ^
  483 |     .poll(
  484 |       async () => {
  485 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:482:3)
```

Context: context file not found for `shell-L4b-location-picker-LS-9-coordinates-far-from-every-metro-stop-at-the-market-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 8 | shard 4, shard 7, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kak<n>q: e<n>e_par_hf<n>m → e<n>e_chi_mne<n>xs` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rck<n>c: e<n>e_par_avjqp<n> → e<n>e_chi_y<n>c<n>t` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kak<n>q: e<n>e_par_hf<n>m → e<n>e_chi_mne<n>xs ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rck<n>c: e<n>e_par_avjqp<n> → e<n>e_chi_y<n>c<n>t ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T03:45:23.215Z | 17.8 min |
| email | 2026-10-12T03:45:36.358Z | 0.3 min |
| shard 1 | 2026-10-12T03:45:21.812Z | 21.9 min |
| shard 2 | 2026-10-12T03:45:29.270Z | 26.4 min |
| shard 3 | 2026-10-12T03:45:27.663Z | 26.9 min |
| shard 4 | 2026-10-12T03:45:24.312Z | 26.8 min |
| shard 5 | 2026-10-12T03:45:34.815Z | 28.7 min |
| shard 6 | 2026-10-12T03:45:24.699Z | 21.2 min |
| shard 7 | 2026-10-12T03:45:32.424Z | 29.3 min |
| shard 8 | 2026-10-12T03:45:31.428Z | 30.1 min |
| changed | 2026-10-12T03:45:21.894Z | 7.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 30.3 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 24.9 min | shard 3, shard 7 |
| `admin-listings.spec.ts` | 50 | 22.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.2 min | smoke, shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 17.0 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 16.6 min | shard 3, shard 7 |
| `admin-translations-console.spec.ts` | 84 | 16.4 min | shard 2, shard 6, changed |
| `admin-screening.spec.ts` | 30 | 15.7 min | shard 2, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.6 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 15.4 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 13.6 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 13.0 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 12.2 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 12.1 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 10.7 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.5 min | shard 4, shard 8 |
| `admin-attributes-links.spec.ts` | 32 | 10.3 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.2 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.8 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.6 min | smoke, shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 8.0 min | shard 3, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 7.9 min | shard 4, shard 8 |
| `admin-users.spec.ts` | 26 | 7.8 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 7.7 min | shard 3, shard 7 |
| `feed-index.spec.ts` | 28 | 7.3 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.3 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.2 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 4, shard 8 |
| `admin-translations-governance.spec.ts` | 16 | 6.2 min | shard 2, shard 6, changed |
| `admin-translations-data.spec.ts` | 16 | 6.1 min | shard 2, shard 6, changed |
| `admin-attributes-safety.spec.ts` | 14 | 5.8 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 5.0 min | shard 2, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.5 min | shard 1, shard 5 |
| `admin-audit.spec.ts` | 12 | 4.3 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.7 min | shard 4, shard 8 |
| `admin-shell.spec.ts` | 10 | 3.3 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 3.0 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.4 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 4, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 3, shard 7 |
| `settings.spec.ts` | 4 | 0.9 min | shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.8 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 77.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 64.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 63.7 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 63.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 61.8 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 59.6 s |
| `feed-screens.spec.ts` › FS-10 nothing anywhere: the invitation card comes first, with the category and the place | desktop-1280 | 54.9 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 53.8 s |
| `post-wizard-place.spec.ts` › PW-160 Use my location stays pressed until the pin is moved by hand | desktop-1280 | 53.4 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 53.3 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 53.2 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 51.6 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 51.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 50.9 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | desktop-1280 | 50.7 s |
