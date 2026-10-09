# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37863150292
- Commit: `f26f891ebf7040cd2d988eda9a5767db85786f11`
- Attempt: 1
- Written (UTC): 2026-10-09T00:26:28.367Z
- Passed: 321 · Skipped: 74 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 6
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › mobile chrome › the menu closes back to the icons — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### shell.spec.ts › mobile chrome › the menu closes back to the icons

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-rank58-v0d57s')
Expected: "page"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-rank58-v0d57s')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-rank58-v0d57s')
Expected: "page"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-rank58-v0d57s')


  1081 |     );
  1082 |     menu = await openRailScope(page);
> 1083 |     await expect(menu.getByTestId(testid)).toHaveAttribute("aria-current", "page");
       |                                            ^
  1084 |   });
  1085 |
  1086 |   test("the rail-collapse toggle does not exist on mobile", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1083:44
```

Context:

```text
          - listitem [ref=e317]:
            - generic [ref=e318]: About
          - listitem [ref=e319]:
            - generic [ref=e320]: How it works
      - navigation "Help" [ref=e321]:
        - heading "Help" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - generic [ref=e325]: Safety
          - listitem [ref=e326]:
            - generic [ref=e327]: Contact
      - navigation "Legal" [ref=e328]:
        - heading "Legal" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Terms
          - listitem [ref=e333]:
            - generic [ref=e334]: Privacy
    - paragraph [ref=e336]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

100 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 11 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 2, shard 3, shard 5, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories badHeader` (quiet) | 3 | shard 1, shard 2, shard 5 |
| `categories wrongFile` (quiet) | 3 | shard 1, shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 3 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>gdpr: e<n>e_par_fu<n>k<n>t → e<n>e_chi_e<n>j<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zkre<n>: e<n>e_par_<n>yya<n>w → e<n>e_chi_vttexx` (quiet) | 1 | shard 1 |
| `commit_failed step-up required: no verified factor` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×11 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×3 · categories wrongFile ×3 · preview_failed permission denied ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>gdpr: e<n>e_par_fu<n>k<n>t → e<n>e_chi_e<n>j<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zkre<n>: e<n>e_par_<n>yya<n>w → e<n>e_chi_vttexx ×1 · commit_failed step-up required: no verified factor ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 6 · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-09T00:08:58.356Z | 16.5 min |
| email | 2026-10-09T00:09:05.095Z | 0.3 min |
| shard 6 | 2026-10-09T00:08:51.823Z | 15.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 15.1 min | smoke, shard 6 |
| `post-wizard-specs.spec.ts` | 39 | 9.8 min | shard 6 |
| `auth-signout.spec.ts` | 22 | 4.6 min | smoke |
| `post-wizard-where.spec.ts` | 15 | 4.5 min | shard 6 |
| `posting-routes.spec.ts` | 25 | 4.2 min | shard 6 |
| `posting-routes-catalog.spec.ts` | 9 | 2.4 min | shard 6 |
| `posting-routes-dials.spec.ts` | 7 | 1.4 min | shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 3 | 0.5 min | smoke, shard 6 |
| `post-wizard-units.spec.ts` | 2 | 0.5 min | shard 6 |
| `posting-routes-identity.spec.ts` | 1 | 0.3 min | shard 6 |
| `rbac.spec.ts` | 3 | 0.2 min | shard 6 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `shell-table-law.spec.ts` | 1 | 0.1 min | shard 6 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 35.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 33.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 31.3 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 28.5 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 28.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 28.4 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 27.6 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 27.2 s |
| `post-wizard-where.spec.ts` › PW-89 thousand / million: the full amount is stored and shown | desktop-1280 | 24.6 s |
| `post-wizard-specs.spec.ts` › PW-6 the AI assist fills the title and description from the entered details, and both stay editable | desktop-1280 | 24.5 s |
| `posting-routes.spec.ts` › PR-24 a seller is named before an ad is published (INC-423) | desktop-1280 | 23.5 s |
| `post-wizard-specs.spec.ts` › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) | desktop-1280 | 23.3 s |
| `post-wizard-where.spec.ts` › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place | desktop-1280 | 22.7 s |
| `shell.spec.ts` › TR-28 the account carries onto a starless device, and never over a star | desktop-1280 | 22.3 s |
| `posting-routes-catalog.spec.ts` › PR-42 the door reads a padded answer as the value it stores | desktop-1280 | 20.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37863150292-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37863150292-email
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37863150292-6
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-zkre33: e2e_par_9yya2w → e2e_chi_vttexx
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

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-16gdpr: e2e_par_fu1k8t → e2e_chi_e16j24
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

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

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  144 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1918:3 › CAT-IE categories import/export › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it (25.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37863150292-1-2804-2-dcoll9@ethio-e2e.invalid)
  ✓  146 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:2085:3 › CAT-IE categories import/export › CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child (10.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37863150292-1-2804-2-dcoll9@ethio-e2e.invalid)
  ✓  147 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:2181:3 › CAT-IE categories import/export › CT-28 the import dialog reaches Applied and undoes (15.5s)
  ✓  148 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:2264:3 › C2-HOME categories home flag › CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other (4.0s)
[e2e:u2] RP-1 baseline intact: moderator holds no roles:* grant
  ✓  145 [mobile-360] › e2e/admin-locations.spec.ts:328:3 › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree (36.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37863150292-1-2804-3-xqclwj@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-zkre33: e2e_par_9yya2w → e2e_chi_vttexx
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  188 [mobile-360] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (12.0s)
  ✓  187 [mobile-360] › e2e/post-wizard-place.spec.ts:1060:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (30.6s)
  ✓  189 [mobile-360] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (12.1s)
  ✓  191 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (9.7s)
  ✓  190 [mobile-360] › e2e/post-wizard-place.spec.ts:1156:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (17.4s)
  ✓  192 [mobile-360] › e2e/post-wizard-pricing.spec.ts:700:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (15.1s)
  ✓  193 [mobile-360] › e2e/post-wizard-place.spec.ts:1199:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (13.6s)
  ✓  194 [mobile-360] › e2e/post-wizard-pricing.spec.ts:721:3 › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315) (10.8s)
  ✓  195 [mobile-360] › e2e/post-wizard-place.spec.ts:1274:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (9.9s)
```

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

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  166 [mobile-360] › e2e/shell.spec.ts:1137:3 › mobile chrome › primary touch targets are at least 44px (991ms)
  ✓  167 [mobile-360] › e2e/shell.spec.ts:1181:3 › mobile chrome › the bottom bar, signed out (767ms)
  ✓  168 [mobile-360] › e2e/shell.spec.ts:1202:3 › mobile chrome › the bottom bar, signed in (1.3s)
  ✓  160 [mobile-360] › e2e/posting-routes.spec.ts:706:3 › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city (11.4s)
  ✓  169 [mobile-360] › e2e/shell.spec.ts:1224:3 › mobile chrome › the posting wizard keeps the frame (1.3s)
  ✓  171 [mobile-360] › e2e/shell.spec.ts:1247:5 › mobile chrome › My listings works from /account (INC-501) (1.2s)
  ✓  172 [mobile-360] › e2e/shell.spec.ts:1247:5 › mobile chrome › My listings works from /settings (INC-501) (1.2s)
  ✓  173 [mobile-360] › e2e/shell.spec.ts:1256:3 › mobile chrome › nothing hides under the bar (686ms)
  ✓  174 [mobile-360] › e2e/shell.spec.ts:1281:3 › mobile chrome › the menu says who is signed in (1.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37863150292-4-3061-2-wgpaa2@ethio-e2e.invalid)
  ✓  120 [desktop-1280] › e2e/admin-countries.spec.ts:140:3 › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away (24.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37863150292-4-3061-3-ff4c3o@ethio-e2e.invalid)
  ✓  121 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1127:3 › CAT-IE categories import/export › CT-37 undoing a category delete restores its attribute links or names the skipped ones (19.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37863150292-4-3061-2-wgpaa2@ethio-e2e.invalid)
  ✓  122 [desktop-1280] › e2e/admin-countries.spec.ts:200:3 › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back (11.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37863150292-4-3061-3-ff4c3o@ethio-e2e.invalid)
  ✓  123 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:1260:3 › CAT-IE categories import/export › CT-35 an imported category name is in the name table after commit and gone after undo (9.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37863150292-4-3061-2-wgpaa2@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-16gdpr: e2e_par_fu1k8t → e2e_chi_e16j24
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  188 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:700:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (24.5s)
--- final 10 lines ---
✓  183 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (10.3s)
  ✓  185 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (11.9s)
  ✓  184 [desktop-1280] › e2e/post-wizard-place.spec.ts:1156:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (19.8s)
  ✓  186 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (8.1s)
  ✓  187 [desktop-1280] › e2e/post-wizard-place.spec.ts:1199:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (13.9s)
  ✓  189 [desktop-1280] › e2e/post-wizard-place.spec.ts:1274:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (9.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  188 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:700:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (24.5s)
  ✓  190 [desktop-1280] › e2e/post-wizard-place.spec.ts:1307:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (10.3s)
```

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```
