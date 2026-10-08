# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37757408597 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37757408597
- Commit: `01c25da16ff6ad9204512a7f471344a3e454165d`
- Attempt: 1
- Written (UTC): 2026-10-08T09:59:45.083Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 2074 stable+own rows against a 2076-row expectation
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) — Error: PW-74 before: a reset fired

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 2074 stable+own rows against a 2076-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2076
Received: 2074
--- further error 1 ---
Error: the CSV export was page-scoped: 2074 stable+own rows against a 2076-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2076
Received: 2074

  782 |         exportedRows,
  783 |         `the CSV export was page-scoped: ${exportedRows} stable+own rows against a ${expectedRows}-row expectation`,
> 784 |       ).toBe(expectedRows);
      |         ^
  785 |       expect(ownLines.length, `TR-29 exported ${ownLines.length} lines for ${key}`).toBe(1);
  786 |
  787 |       // The operator's edit, expressed as the file they would send back.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:784:9
```

Context:

```text
          - listitem [ref=e594]:
            - generic [ref=e595]: About
          - listitem [ref=e596]:
            - generic [ref=e597]: How it works
      - navigation "Help" [ref=e598]:
        - heading "Help" [level=2] [ref=e599]
        - list [ref=e600]:
          - listitem [ref=e601]:
            - generic [ref=e602]: Safety
          - listitem [ref=e603]:
            - generic [ref=e604]: Contact
      - navigation "Legal" [ref=e605]:
        - heading "Legal" [level=2] [ref=e606]
        - list [ref=e607]:
          - listitem [ref=e608]:
            - generic [ref=e609]: Terms
          - listitem [ref=e610]:
            - generic [ref=e611]: Privacy
    - paragraph [ref=e613]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `shard 2`
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

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-74 before: a reset fired

expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-specs-reset')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - PW-74 before: a reset fired with timeout 10000ms
  - waiting for getByTestId('post-specs-reset')
    13 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: PW-74 before: a reset fired

expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-specs-reset')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - PW-74 before: a reset fired with timeout 10000ms
  - waiting for getByTestId('post-specs-reset')
    13 × locator resolved to 1 element
       - unexpected value "1"


  1009 |           page.getByTestId("post-specs-reset"),
  1010 |           `PW-74 ${phase}: a reset fired`,
> 1011 |         ).toHaveCount(0);
       |           ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qi<n>r<n>z: e<n>e_par_<n>vix<n>t → e<n>e_chi_w<n>vwea` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-slsr<n>p: e<n>e_par_u<n>x<n>x → e<n>e_chi_owao<n>u` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qi<n>r<n>z: e<n>e_par_<n>vix<n>t → e<n>e_chi_w<n>vwea ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-slsr<n>p: e<n>e_par_u<n>x<n>x → e<n>e_chi_owao<n>u ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 2, shard 3, shard 5, shard 6

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
| smoke | 2026-10-08T09:34:17.062Z | 16.7 min |
| email | 2026-10-08T09:34:07.594Z | 0.2 min |
| shard 1 | 2026-10-08T09:34:09.658Z | 25.2 min |
| shard 2 | 2026-10-08T09:34:13.359Z | 19.8 min |
| shard 3 | 2026-10-08T09:34:15.356Z | 23.3 min |
| shard 4 | 2026-10-08T09:34:19.144Z | 25.1 min |
| shard 5 | 2026-10-08T09:34:13.142Z | 22.9 min |
| shard 6 | 2026-10-08T09:34:15.332Z | 16.1 min |
| changed | 2026-10-08T09:34:22.503Z | 5.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 492 | 29.7 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 24.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 14.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.8 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 11.7 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.8 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.8 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 10.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.8 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 9.8 min | shard 3, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 9.4 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 7.8 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 36 | 6.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.8 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.1 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.1 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 2.9 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 6 | 1.2 min | smoke, shard 4, shard 6, changed |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 64.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 46.4 s |
| `post-wizard-pricing.spec.ts` › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) | mobile-360 | 46.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 43.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.1 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 43.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 41.8 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 40.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 39.7 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 39.7 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 39.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 38.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 37.7 s |
