# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37738534821
- Commit: `50a2ab574c1158a8e053c4f05492880823daaab4`
- Attempt: 1
- Written (UTC): 2026-10-08T10:17:55.656Z
- Passed: 1212 · Skipped: 67 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

369 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 270 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
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
| `listing not found` | 2 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>mxtev: e<n>e_par_ghtbc<n> → e<n>e_chi_to<n>c` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-lo<n>zz<n>: e<n>e_par_cffgie → e<n>e_chi_xs<n>vb` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>mxtev: e<n>e_par_ghtbc<n> → e<n>e_chi_to<n>c ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-lo<n>zz<n>: e<n>e_par_cffgie → e<n>e_chi_xs<n>vb ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 270 · Sources: full

```text
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full

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
| nightly | 2026-10-08T06:37:27.388Z | 3.6 min |
| full | 2026-10-08T06:41:05.915Z | 216.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-place.spec.ts` | 38 | 16.4 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 13.7 min | full |
| `post-wizard-specs.spec.ts` | 78 | 12.8 min | full |
| `post-wizard-bundle2.spec.ts` | 60 | 12.6 min | full |
| `post-wizard-category.spec.ts` | 42 | 10.3 min | full |
| `admin-categories-lifecycle.spec.ts` | 48 | 9.0 min | full |
| `admin-categories-console.spec.ts` | 32 | 7.8 min | full |
| `admin-attributes-links.spec.ts` | 30 | 7.6 min | full |
| `shell.spec.ts` | 154 | 7.6 min | full |
| `admin-translations-governance.spec.ts` | 20 | 7.4 min | full |
| `admin-attributes-library.spec.ts` | 40 | 7.3 min | full |
| `post-wizard-resets.spec.ts` | 34 | 7.1 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 6.9 min | full |
| `post-wizard-where.spec.ts` | 30 | 6.1 min | full |
| `admin-locations.spec.ts` | 36 | 5.7 min | full |
| `photo-pipeline.spec.ts` | 20 | 5.7 min | full |
| `admin-translations-console.spec.ts` | 40 | 5.6 min | full |
| `posting-routes.spec.ts` | 50 | 5.5 min | full |
| `admin-users.spec.ts` | 24 | 5.0 min | full |
| `admin-roles.spec.ts` | 24 | 4.7 min | full |
| `admin-attributes-import.spec.ts` | 40 | 4.6 min | full |
| `admin-attributes-safety.spec.ts` | 14 | 4.6 min | full |
| `import-security.spec.ts` | 34 | 4.3 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `posting-routes-catalog.spec.ts` | 18 | 3.1 min | full |
| `auth-signout.spec.ts` | 22 | 3.0 min | full |
| `admin-audit.spec.ts` | 10 | 2.9 min | full |
| `admin-categories-home.spec.ts` | 8 | 2.9 min | full |
| `admin-countries.spec.ts` | 16 | 2.5 min | full |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | full |
| `mfa-stepup.spec.ts` | 18 | 2.0 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | full |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.5 min | full |
| `posting-routes-dials.spec.ts` | 14 | 1.4 min | full |
| `admin-shell.spec.ts` | 10 | 1.4 min | full |
| `admin-coverage.spec.ts` | 14 | 1.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.6 min | full |
| `a11y.spec.ts` | 4 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | full |
| `settings.spec.ts` | 4 | 0.5 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `posting-routes-identity.spec.ts` | 2 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `phone-frame.spec.ts` | 8 | 0.3 min | full |
| `house-style.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 242.6 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 65.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 48.3 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 44.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.5 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | desktop-1280 | 43.1 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 37.0 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | desktop-1280 | 36.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 36.1 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 35.3 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | mobile-360 | 35.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.7 s |
| `admin-categories-home.spec.ts` › CT-40 the delete door's refusals read as words, never as keys | mobile-360 | 32.4 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37738534821-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 69 (pool 3, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 37738534821-nightly
```

## admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-4ys145-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-4ys145-card')

[dialog-dump findRow(e2e-cat-nightly-0-4ys145)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-nightly-0-4ys145) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-4ys145-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-4ys145-card')

[dialog-dump findRow(e2e-cat-nightly-0-4ys145)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-nightly-0-4ys145) after create] open dialogs: none

   at helpers/categories.ts:336

  334 |     await findRow(page, slug);
  335 |   } catch (error) {
> 336 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e201]:
            - generic [ref=e202]: About
          - listitem [ref=e203]:
            - generic [ref=e204]: How it works
      - navigation "Help" [ref=e205]:
        - heading "Help" [level=2] [ref=e206]
        - list [ref=e207]:
          - listitem [ref=e208]:
            - generic [ref=e209]: Safety
          - listitem [ref=e210]:
            - generic [ref=e211]: Contact
      - navigation "Legal" [ref=e212]:
        - heading "Legal" [level=2] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]:
            - generic [ref=e216]: Terms
          - listitem [ref=e217]:
            - generic [ref=e218]: Privacy
    - paragraph [ref=e220]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')


  346 |     await expect(page.getByTestId("post-step-7")).toBeVisible();
  347 |     await page.getByTestId("post-next").click();
> 348 |     await expect(page.getByTestId("post-step-8")).toBeVisible();
      |                                                   ^
  349 |   }
  350 |
  351 |   const reviewPrice = (page: Page) =>
    at pricingToReview (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:348:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-137-Pieces-per-Pack-shows-with-per-pack-and-goes-with-its-value-on-another-unit-the-size-and-terms-lines-read-under-the-price-bundle-4-steps-9-10-mobile-360`

## settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Account menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: 'Account menu' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Account menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: 'Account menu' })


  75 |   // Session intact: the header account menu (the shell's authenticated-branch
  76 |   // control, successor to the old header sign-out button) is still present.
> 77 |   await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toBeVisible();
     |                                                                             ^
  78 |
  79 |   // Correct current password: success feedback.
  80 |   await current.fill(user.password);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/settings.spec.ts:77:77
```

Context:

```text
          - listitem [ref=e203]:
            - generic [ref=e204]: About
          - listitem [ref=e205]:
            - generic [ref=e206]: How it works
      - navigation "Help" [ref=e207]:
        - heading "Help" [level=2] [ref=e208]
        - list [ref=e209]:
          - listitem [ref=e210]:
            - generic [ref=e211]: Safety
          - listitem [ref=e212]:
            - generic [ref=e213]: Contact
      - navigation "Legal" [ref=e214]:
        - heading "Legal" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: Terms
          - listitem [ref=e219]:
            - generic [ref=e220]: Privacy
    - paragraph [ref=e222]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/geo/reverse HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/locations/ET HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/am HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/i18n/am HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×12
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/locations/ET HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
```
