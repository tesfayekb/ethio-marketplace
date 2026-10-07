# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37582211006
- Commit: `549cfcfb93247549c6721f8a6f6041f3c34eb505`
- Attempt: 1
- Written (UTC): 2026-10-07T09:39:03.279Z
- Passed: 1170 · Skipped: 49 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

329 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 227 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `listing not found` | 5 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-gr<n>f<n>: e<n>e_par_ox<n>av → e<n>e_chi_iv<n>ppu` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-wkowkz: e<n>e_par_hlwb<n>d → e<n>e_chi_slkl<n>n` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-gr<n>f<n>: e<n>e_par_ox<n>av → e<n>e_chi_iv<n>ppu ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-wkowkz: e<n>e_par_hlwb<n>d → e<n>e_chi_slkl<n>n ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 227 · Sources: full

```text
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 5 · Sources: full

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-07T06:34:53.798Z | 3.5 min |
| full | 2026-10-07T06:38:23.857Z | 180.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 14.9 min | full |
| `post-wizard-bundle2.spec.ts` | 60 | 12.9 min | full |
| `admin-attributes-library.spec.ts` | 40 | 10.2 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 9.3 min | full |
| `admin-attributes-import.spec.ts` | 40 | 8.5 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 8.2 min | full |
| `admin-attributes-links.spec.ts` | 30 | 8.2 min | full |
| `post-wizard-place.spec.ts` | 38 | 8.1 min | full |
| `shell.spec.ts` | 126 | 7.9 min | full |
| `post-wizard-resets.spec.ts` | 34 | 7.3 min | full |
| `post-wizard-category.spec.ts` | 42 | 7.3 min | full |
| `posting-routes.spec.ts` | 50 | 6.0 min | full |
| `admin-categories-console.spec.ts` | 32 | 5.6 min | full |
| `admin-attributes-safety.spec.ts` | 14 | 5.4 min | full |
| `post-wizard-where.spec.ts` | 30 | 5.1 min | full |
| `admin-categories-lifecycle.spec.ts` | 48 | 5.0 min | full |
| `admin-translations-console.spec.ts` | 40 | 4.6 min | full |
| `admin-locations.spec.ts` | 36 | 4.6 min | full |
| `admin-translations-governance.spec.ts` | 20 | 4.2 min | full |
| `admin-roles.spec.ts` | 24 | 3.9 min | full |
| `admin-users.spec.ts` | 24 | 3.8 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `admin-audit.spec.ts` | 10 | 2.6 min | full |
| `import-security.spec.ts` | 34 | 2.4 min | full |
| `auth-signout.spec.ts` | 22 | 2.2 min | full |
| `admin-countries.spec.ts` | 16 | 2.0 min | full |
| `admin-categories-home.spec.ts` | 8 | 1.9 min | full |
| `photo-pipeline.spec.ts` | 20 | 1.8 min | full |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.0 min | full |
| `posting-routes-catalog.spec.ts` | 12 | 0.9 min | full |
| `admin-shell.spec.ts` | 10 | 0.9 min | full |
| `admin-coverage.spec.ts` | 14 | 0.8 min | full |
| `posting-routes-dials.spec.ts` | 14 | 0.8 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `rbac.spec.ts` | 6 | 0.5 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `post-wizard-units.spec.ts` | 2 | 0.3 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `category-image-routes.spec.ts` | 10 | 0.3 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `posting-routes-identity.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.2 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 78.1 s |
| `post-wizard-bundle2.spec.ts` › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) | mobile-360 | 60.8 s |
| `post-wizard-bundle2.spec.ts` › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) | desktop-1280 | 60.7 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 60.1 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 35.2 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | desktop-1280 | 35.0 s |
| `posting-routes.spec.ts` › PR-24 a seller is named before an ad is published (INC-423) | desktop-1280 | 34.8 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | mobile-360 | 34.4 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 33.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.0 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.7 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37582211006-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 69 (pool 3, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 37582211006-nightly
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422)

- Source: `full`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-who-alias-suggestion"][data-name="abebe"]')


  442 |     ).toBe(true);
  443 |     const picked = names[0] ?? "";
> 444 |     await page.locator(`[data-testid="post-who-alias-suggestion"][data-name="${picked}"]`).click();
      |                                                                                            ^
  445 |     await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
  446 |     await expect(page.getByTestId("post-who-alias-suggestions")).toHaveCount(0);
  447 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:444:92
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-147-an-empty-seller-name-box-offers-three-names-from-the-typed-names-a-saved-name-offers-none-until-cleared-bundle-4-step-21-INC-422-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-who-alias-suggestion"][data-name="abebe"]')


  442 |     ).toBe(true);
  443 |     const picked = names[0] ?? "";
> 444 |     await page.locator(`[data-testid="post-who-alias-suggestion"][data-name="${picked}"]`).click();
      |                                                                                            ^
  445 |     await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
  446 |     await expect(page.getByTestId("post-who-alias-suggestions")).toHaveCount(0);
  447 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:444:92
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-147-an-empty-seller-name-box-offers-three-names-from-the-typed-names-a-saved-name-offers-none-until-cleared-bundle-4-step-21-INC-422-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `full`
- Project: `desktop-1280`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  1824 |     });
  1825 |     await control(model).selectOption(m1);
> 1826 |     await expect
       |     ^
  1827 |       .poll(async () => (await attributesOf(listingId))[model], { timeout: 20_000 })
  1828 |       .toBe(m1);
  1829 |     expect(battery in (await attributesOf(listingId)), "PW-153: a settled number was stored").toBe(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1826:5
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-desktop-1280`

## Server errors: full

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×14
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×12
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
