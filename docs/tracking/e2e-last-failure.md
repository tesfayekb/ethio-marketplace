# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38811064295
- Commit: `ea8ac553f6d1d61592eac8cbf337d666cded4f51`
- Attempt: 1
- Written (UTC): 2026-10-15T22:19:17.959Z
- Passed: 1770 · Skipped: 126 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · auth-signout.spec.ts › U0k session policy › SP-3 absolute: continuous activity does not save the session — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 3`
- Project: `mobile-360`

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


  514 |     await page.getByTestId("post-description").fill("e2e listing description");
  515 |     await page.getByTestId("post-next").click();
> 516 |     await expect(page.getByTestId("post-step-6")).toBeVisible();
      |                                                   ^
  517 |   });
  518 |
  519 |   /** DEC-081 — the stored flag, DB truth (J4). */
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:516:51
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-62e66-valid-one-advances-INC-301--mobile-360`; this run carried 9 context file(s); of the same spec: none

### auth-signout.spec.ts › U0k session policy › SP-3 absolute: continuous activity does not save the session

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('session-notice')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('session-notice')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('session-notice')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('session-notice')


  312 |     await expect(page.getByTestId("account-menu")).toHaveCount(0, { timeout: 20000 });
  313 |     await expect(page).toHaveURL(/\/$/);
> 314 |     await expect(page.getByTestId("session-notice")).toBeVisible();
      |                                                      ^
  315 |   });
  316 |
  317 |   test("SP-4 cross-tab: signing out in one tab evacuates the other", async ({ page, context }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:314:54
```

Context:

```text
          - listitem [ref=e236]:
            - generic [ref=e237]: About
          - listitem [ref=e238]:
            - generic [ref=e239]: How it works
      - navigation "Help" [ref=e240]:
        - heading "Help" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Safety
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  146 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  147 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e57e3--seconds-restores-them-D59--desktop-1280`; this run carried 9 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-next')


  179 |   /** D39 — from specifications, Next opens photos; a second Next opens details. */
  180 |   async function nextThroughPhotos(page: import("@playwright/test").Page) {
> 181 |     await page.getByTestId("post-next").click();
      |                                         ^
  182 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
  183 |     await page.getByTestId("post-next").click();
  184 |   }
    at nextThroughPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:181:41)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:568:11
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-356d8-e-and-the-reset-stands-D59--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

114 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 14 | shard 2, shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>g: e<n>e_par_qowm<n>t → e<n>e_chi_ob<n>gj<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ptg<n>b<n>: e<n>e_par_j<n>sz<n> → e<n>e_chi_<n>v<n>vj` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>g: e<n>e_par_qowm<n>t → e<n>e_chi_ob<n>gj<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ptg<n>b<n>: e<n>e_par_j<n>sz<n> → e<n>e_chi_<n>v<n>vj ×1

Off the allowlist:

### listing not found

- Count: 14 · Sources: shard 2, shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-51 a dependent detail never renders above the answer it hangs on ×2 · breadcrumb segments navigate the category path ×1 · PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-s ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T21:36:57.298Z | 18.5 min |
| email | 2026-10-15T21:37:04.543Z | 0.3 min |
| shard 1 | 2026-10-15T21:36:57.507Z | 39.6 min |
| shard 2 | 2026-10-15T21:37:04.281Z | 39.9 min |
| shard 3 | 2026-10-15T21:37:01.197Z | 34.6 min |
| shard 4 | 2026-10-15T21:37:02.905Z | 39.2 min |
| shard 5 | 2026-10-15T21:36:59.450Z | 42.0 min |
| shard 6 | 2026-10-15T21:36:57.255Z | 30.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.4 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 22.8 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 21.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 20.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.8 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 48 | 15.4 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 14.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.9 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 13.6 min | shard 3, shard 5 |
| `admin-screening.spec.ts` | 50 | 13.4 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 30 | 13.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 12.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 11.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 62 | 11.4 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.1 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 9.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.7 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 30 | 9.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 9.2 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.8 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.0 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 2.2 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.5 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 124.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 83.4 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 77.1 s |
| `post-wizard-pricing.spec.ts` › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) | mobile-360 | 68.8 s |
| `auth-signout.spec.ts` › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189) | mobile-360 | 68.4 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 63.9 s |
| `auth-signout.spec.ts` › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189) | desktop-1280 | 62.1 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | mobile-360 | 61.8 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | desktop-1280 | 61.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 60.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 60.4 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 58.9 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | mobile-360 | 58.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 58.4 s |
| `auth-signout.spec.ts` › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189) | mobile-360 | 56.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38811064295-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38811064295-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 38811064295-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38811064295-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38811064295-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38811064295-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 38811064295-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38811064295-6
```

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  415 |
  416 |       await page.reload();
> 417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:417:26
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: How it works
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Legal" [ref=e239]:
        - heading "Legal" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Terms
          - listitem [ref=e244]:
            - generic [ref=e245]: Privacy
    - paragraph [ref=e247]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]
--- further error 1 ---
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]

  421 |         Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
  422 |       );
> 423 |       expect(stored, "SO-8: the session survived the sign-out").toEqual([]);
      |                                                                 ^
  424 |
  425 |       await page.goto("/auth");
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  271 |     await page.goto("/");
  272 |     await waitForHydration(page);
> 273 |     await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                        ^
  274 |     await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  275 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  276 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:273:24
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: How it works
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Legal" [ref=e239]:
        - heading "Legal" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Terms
          - listitem [ref=e244]:
            - generic [ref=e245]: Privacy
    - paragraph [ref=e247]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › D189 deactivated staff › AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  616 |     const before = await admin.rpc("has_permission", pair);
  617 |     expect(before.error, "AU-14: has_permission could not be read").toBeNull();
> 618 |     expect(before.data, "AU-14: the admin role did not grant users:view").toBe(true);
      |                                                                           ^
  619 |
  620 |     await switchUser(page, staff.email, staff.password);
  621 |     const secret = await enrollAndStepUp(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:618:75
```

Context: context file not found for `admin-users-D189-deactivated-staff-AU-14-a-deactivated-staff-account-holds-no-permission-the-staff-door-refuses-it-and-has_permission-answers-false-D189-mobile-360` — Playwright's name `admin-users-D189-deactivat-6a5ce-mission-answers-false-D189--mobile-360`; this run carried 9 context file(s); of the same spec: none

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  415 |
  416 |       await page.reload();
> 417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:417:26
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: How it works
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Legal" [ref=e239]:
        - heading "Legal" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Terms
          - listitem [ref=e244]:
            - generic [ref=e245]: Privacy
    - paragraph [ref=e247]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  271 |     await page.goto("/");
  272 |     await waitForHydration(page);
> 273 |     await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                        ^
  274 |     await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  275 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  276 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:273:24
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: How it works
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
          - listitem [ref=e266]:
            - generic [ref=e267]: Contact
      - navigation "Legal" [ref=e268]:
        - heading "Legal" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Terms
          - listitem [ref=e273]:
            - generic [ref=e274]: Privacy
    - paragraph [ref=e276]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › D189 deactivated staff › AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  616 |     const before = await admin.rpc("has_permission", pair);
  617 |     expect(before.error, "AU-14: has_permission could not be read").toBeNull();
> 618 |     expect(before.data, "AU-14: the admin role did not grant users:view").toBe(true);
      |                                                                           ^
  619 |
  620 |     await switchUser(page, staff.email, staff.password);
  621 |     const secret = await enrollAndStepUp(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:618:75
```

Context: context file not found for `admin-users-D189-deactivated-staff-AU-14-a-deactivated-staff-account-holds-no-permission-the-staff-door-refuses-it-and-has_permission-answers-false-D189-desktop-1280` — Playwright's name `admin-users-D189-deactivat-6a5ce-mission-answers-false-D189--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  415 |
  416 |       await page.reload();
> 417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:417:26
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:34181:25) at http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5)
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-f5194g: e2e_par_qowm0t → e2e_chi_ob5gj2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:34181:25) at http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5)
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:34181:25) at http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D5wyz-Xf.js:6025:5)
console.error: [client-error] gate fetch threw
```
