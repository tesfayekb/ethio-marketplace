# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38209410930 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38209410930
- Commit: `0386cd694b7cfba755000e7a5b2e73c411508044`
- Attempt: 1
- Written (UTC): 2026-10-12T06:18:35.103Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 3`
- Project: `mobile-360`

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

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-mobile-360`

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('attribute-remove-holders')
Expected: "1 listings there hold an answer to it. They will stop showing it; no seller is blocked."
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-holders')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('attribute-remove-holders')
Expected: "1 listings there hold an answer to it. They will stop showing it; no seller is blocked."
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-holders')


  170 |         .getByTestId(`attribute-actions-${held}-more-remove`)
  171 |         .click();
> 172 |       await expect(page.getByTestId("attribute-remove-holders")).toHaveText(
      |                                                                  ^
  173 |         fill(en["admin.attributes.remove.holders"], { count: 1 }),
  174 |         { timeout: 20000 },
  175 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:172:66
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Remove from a category — e2e_held_5mdil5" [ref=e2]:
    - heading "Remove from a category — e2e_held_5mdil5" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Remove from a category — e2e_held_5mdil5
      - paragraph [ref=e6]: The attribute stays in the library; only this category stops asking for it.
      - generic [ref=e7]:
        - generic [ref=e8]: Category
        - combobox "Category" [ref=e9]:
          - option "Choose a category" [selected]
          - option "e2e-cat-5-1-l4frtx (e2e-cat-5-1-l4frtx)"
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Remove from category" [ref=e12] [cursor=pointer]
    - button "Close" [active] [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 7`
- Project: `desktop-1280`

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


  326 |     await specControl(page, basis.identityKey).selectOption(basis.identityValue);
  327 |     await nextThroughPhotos(page);
> 328 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
      |                                                   ^
  329 |     await expect(page.getByTestId("post-price-basis")).toHaveAttribute("data-options", "1", {
  330 |       timeout: 20_000,
  331 |     });
    at reachPricingWithBasis (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:328:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

109 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 8 | shard 3, shard 4, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>r<n>kq<n>: e<n>e_par_<n>n<n>dh<n> → e<n>e_chi_dvnzfj` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nh<n>f<n>q: e<n>e_par_klc<n>cc → e<n>e_chi_<n>ssryz` (quiet) | 1 | shard 1 |
| `name_folds_rebuild: canceling statement due to statement timeout` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>r<n>kq<n>: e<n>e_par_<n>n<n>dh<n> → e<n>e_chi_dvnzfj ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nh<n>f<n>q: e<n>e_par_klc<n>cc → e<n>e_chi_<n>ssryz ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 4, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### name_folds_rebuild: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import name_folds_rebuild: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T05:47:45.118Z | 18.6 min |
| email | 2026-10-12T05:47:46.729Z | 0.2 min |
| shard 1 | 2026-10-12T05:47:48.587Z | 25.7 min |
| shard 2 | 2026-10-12T05:47:44.470Z | 27.7 min |
| shard 3 | 2026-10-12T05:47:44.770Z | 29.1 min |
| shard 4 | 2026-10-12T05:47:40.253Z | 29.2 min |
| shard 5 | 2026-10-12T05:47:50.045Z | 29.5 min |
| shard 6 | 2026-10-12T05:47:52.242Z | 22.1 min |
| shard 7 | 2026-10-12T05:47:49.706Z | 30.4 min |
| shard 8 | 2026-10-12T05:47:47.107Z | 30.2 min |
| changed | 2026-10-12T05:47:51.651Z | 17.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 108 | 59.7 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 31.7 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 26.7 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.4 min | smoke, shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 17.1 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 16.9 min | shard 2, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 16.6 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.9 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 15.0 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 14.8 min | shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 50 | 14.3 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 14.0 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 13.4 min | shard 1, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 11.4 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.9 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 50 | 10.9 min | shard 4, shard 8 |
| `admin-attributes-links.spec.ts` | 32 | 10.7 min | shard 1, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 10.1 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.0 min | shard 2, shard 6 |
| `admin-users.spec.ts` | 26 | 8.9 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.7 min | shard 4, shard 8 |
| `photo-pipeline.spec.ts` | 20 | 8.7 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 42 | 8.1 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 7.8 min | shard 3, shard 7 |
| `admin-attributes-safety.spec.ts` | 14 | 7.3 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 28 | 7.2 min | shard 2, shard 6 |
| `admin-roles.spec.ts` | 26 | 6.9 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 5.3 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 4.9 min | shard 2, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.1 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.6 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.4 min | shard 3, shard 7 |
| `admin-shell.spec.ts` | 10 | 3.1 min | shard 2, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.6 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 4, shard 8 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.8 min | shard 2, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 4, shard 8 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 3, shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | desktop-1280 | 79.2 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 67.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 61.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 59.3 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 58.7 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 57.2 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 57.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 56.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 56.2 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 56.1 s |
| `admin-listings.spec.ts` › AL-25 Edit refuses an enforcer without a second factor, and writes nothing | mobile-360 | 55.4 s |
| `admin-listings.spec.ts` › AL-25 Edit refuses an enforcer without a second factor, and writes nothing | desktop-1280 | 54.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.6 s |
| `admin-listings.spec.ts` › AL-25 Edit refuses an enforcer without a second factor, and writes nothing | mobile-360 | 54.1 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 52.9 s |
