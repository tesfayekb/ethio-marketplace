# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38413170786 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38413170786
- Commit: `cca0920254b009bdc3ae817dc470faeee437bc80`
- Attempt: 1
- Written (UTC): 2026-10-13T15:00:16.729Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listing-row-e5ee3637-e75d-4c13-9d42-ab8d0166b9ea-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listing-row-e5ee3637-e75d-4c13-9d42-ab8d0166b9ea-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listing-row-e5ee3637-e75d-4c13-9d42-ab8d0166b9ea-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listing-row-e5ee3637-e75d-4c13-9d42-ab8d0166b9ea-card')


  1018 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
  1019 |     await page.getByTestId("listings-search").fill(live.id);
> 1020 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
       |                                             ^
  1021 |
  1022 |     await rowMenu(page, live.id, "send_back");
  1023 |     const dialog = page.getByTestId("listings-move-dialog");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1020:45
```

Context:

```text
          - listitem [ref=e315]:
            - generic [ref=e316]: About
          - listitem [ref=e317]:
            - generic [ref=e318]: How it works
      - navigation "Help" [ref=e319]:
        - heading "Help" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Safety
          - listitem [ref=e324]:
            - generic [ref=e325]: Contact
      - navigation "Legal" [ref=e326]:
        - heading "Legal" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Terms
          - listitem [ref=e331]:
            - generic [ref=e332]: Privacy
    - paragraph [ref=e334]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-6')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-6')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-6')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-6')


  1074 |     await page.getByTestId("post-description").fill("e2e listing description");
  1075 |     await page.getByTestId("post-next").click();
> 1076 |     await expect(page.getByTestId("post-step-6")).toBeVisible();
       |                                                   ^
  1077 |
  1078 |     const region = page.getByTestId("post-where-region");
  1079 |     await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1076:51
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-80-a-city-is-required-marked-before-Next-refused-and-scrolled-to-on-Next-cleared-by-a-city-desktop-1280` — Playwright's name `post-wizard-place-POSTING--8f238-o-on-Next-cleared-by-a-city-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fobahh: e<n>e_par_rqp<n>hj → e<n>e_chi_xa<n>oii` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ohvwtb: e<n>e_par_ad<n>cj → e<n>e_chi_<n>oxmok` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fobahh: e<n>e_par_rqp<n>hj → e<n>e_chi_xa<n>oii ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ohvwtb: e<n>e_par_ad<n>cj → e<n>e_chi_<n>oxmok ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tra ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · admin tables never overflow horizontally ×1 · PR-38 owner's client cannot insert, update or delete coverage; the route can ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T14:26:59.664Z | 15.9 min |
| email | 2026-10-13T14:27:03.157Z | 0.2 min |
| shard 1 | 2026-10-13T14:27:10.841Z | 32.3 min |
| shard 2 | 2026-10-13T14:26:56.085Z | 28.4 min |
| shard 3 | 2026-10-13T14:27:06.632Z | 29.9 min |
| shard 4 | 2026-10-13T14:27:09.759Z | 32.7 min |
| shard 5 | 2026-10-13T14:26:56.522Z | 28.4 min |
| shard 6 | 2026-10-13T14:26:59.845Z | 23.0 min |
| changed | 2026-10-13T14:27:05.281Z | 8.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-category.spec.ts` | 96 | 25.4 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 23.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.0 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 17.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 15.2 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.4 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 12.2 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 10.1 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 10.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.3 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.2 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 8.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 34 | 6.9 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.3 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 26 | 6.3 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 28 | 6.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 42 | 5.9 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 32 | 4.1 min | shard 1, shard 4, changed |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.6 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.7 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 0.9 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-143 'also my shop or office' saves the place, a new draft opens with it, and unticking clears it (bundle 4 step 18) | mobile-360 | 87.5 s |
| `admin-listings.spec.ts` › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller | mobile-360 | 71.7 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | desktop-1280 | 68.7 s |
| `admin-listings.spec.ts` › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review | desktop-1280 | 58.4 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 53.8 s |
| `post-wizard-place.spec.ts` › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched | mobile-360 | 52.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 50.7 s |
| `admin-locations.spec.ts` › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope | desktop-1280 | 49.7 s |
| `post-wizard-pricing.spec.ts` › PW-65 the currency list opens home first and USD second, with symbols (D62-2) | desktop-1280 | 48.1 s |
| `posting-routes.spec.ts` › PR-22 step 8: attribute tables leave the browser; categories still read | mobile-360 | 46.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 43.8 s |
| `admin-locations.spec.ts` › LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs | mobile-360 | 43.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.2 s |
