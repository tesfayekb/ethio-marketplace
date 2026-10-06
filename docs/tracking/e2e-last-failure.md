# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37406070726
- Commit: `261cfe68faf9fd10bde334591eded6a97996a9fe`
- Attempt: 1
- Written (UTC): 2026-10-06T03:16:07.175Z
- Passed: 1209 · Skipped: 76 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-editor.spec.ts › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count — Error: [dialog-dump AT-57 the rows never rendered] open dialogs: attribute-edit-dialog opened-by=row-edit
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: PW-30: no place was chosen
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition — Error: [dialog-dump AT-48 coverage never rendered] open dialogs: none
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets — Error: [dialog-dump AT-56 the co-linked number is not on offer] open dialogs: attribute-edit-dialog opened-by=row-edit
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-library.spec.ts › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag — Error: [dialog-dump AT-17 the inherited row never rendered] open dialogs: none

## Flaky bodies (DEC-078)

### admin-attributes-editor.spec.ts › C3 attributes console › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-57 the rows never rendered] open dialogs: attribute-edit-dialog opened-by=row-edit

expect(locator).toHaveText(expected) failed

Locator:  getByTestId('option-count')
Expected: "3 of 3"
Received: "0 of 3"
Timeout:  30000ms

Call log:
  - [dialog-dump AT-57 the rows never rendered] open dialogs: attribute-edit-dialog opened-by=row-edit with timeout 30000ms
  - waiting for getByTestId('option-count')
    34 × locator resolved to <p data-testid="option-count" class="text-xs text-muted-foreground">0 of 3</p>
       - unexpected value "0 of 3"

```

Context:

```text
        - paragraph [ref=e28]: 0 of 3
        - generic [ref=e29]:
          - paragraph [ref=e30]: Options
          - paragraph [ref=e31]: No options yet.
          - button "Add option" [ref=e32] [cursor=pointer]
      - generic [ref=e33]:
        - generic [ref=e34]: Help text
        - textbox "Help text" [ref=e35]
        - paragraph [ref=e36]: 0/240
      - generic [ref=e37]:
        - generic [ref=e38]: Help text (Amharic)
        - textbox "Help text (Amharic)" [ref=e39]
        - paragraph [ref=e40]: 0/240
      - generic [ref=e41]:
        - button "Cancel" [ref=e42] [cursor=pointer]
        - button "Save" [ref=e43] [cursor=pointer]
    - button "Close" [ref=e44] [cursor=pointer]:
      - img [ref=e45]
      - generic [ref=e48]: Close
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 4115 ms | category and specifications seeded @ 4986 ms | step 3 reached @ 6844 ms | specifications answered @ 7054 ms | step 6 open @ 10214 ms | tree served @ 10676 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 4115 ms | category and specifications seeded @ 4986 ms | step 3 reached @ 6844 ms | specifications answered @ 7054 ms | step 6 open @ 10214 ms | tree served @ 10676 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360`

### admin-attributes-editor.spec.ts › C3 attributes console › AT-48 the library's coverage column reads n/N for a select definition

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-48 coverage never rendered] open dialogs: none

expect(locator).toHaveText(expected) failed

Locator: getByRole('table').getByTestId('attribute-coverage-e2e_attr_zruvf2')
Expected: "1/2"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-48 coverage never rendered] open dialogs: none with timeout 20000ms
  - waiting for getByRole('table').getByTestId('attribute-coverage-e2e_attr_zruvf2')

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

### admin-attributes-editor.spec.ts › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-56 the co-linked number is not on offer] open dialogs: attribute-edit-dialog opened-by=row-edit

expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('option-group-flat').getByTestId('option-row-a').getByTestId('option-bounds-add').locator('option[value="e2e_attr_z6om48"]')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - [dialog-dump AT-56 the co-linked number is not on offer] open dialogs: attribute-edit-dialog opened-by=row-edit with timeout 10000ms
  - waiting for getByTestId('option-group-flat').getByTestId('option-row-a').getByTestId('option-bounds-add').locator('option[value="e2e_attr_z6om48"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

Context:

```text
                - paragraph [ref=e59]: The restriction applies wherever this attribute and the list attribute are used together.
                - combobox [ref=e60]:
                  - 'option "Restrict a list (e.g., storage: 64 / 128 / 256 GB)" [selected]'
                  - option "e2e_attr_byjk2y (e2e_attr_byjk2y)"
          - button "Add option" [ref=e61] [cursor=pointer]
      - generic [ref=e62]:
        - generic [ref=e63]: Help text
        - textbox "Help text" [ref=e64]
        - paragraph [ref=e65]: 0/240
      - generic [ref=e66]:
        - generic [ref=e67]: Help text (Amharic)
        - textbox "Help text (Amharic)" [ref=e68]
        - paragraph [ref=e69]: 0/240
      - generic [ref=e70]:
        - button "Cancel" [ref=e71] [cursor=pointer]
        - button "Save" [ref=e72] [cursor=pointer]
    - button "Close" [ref=e73] [cursor=pointer]:
      - img [ref=e74]
      - generic [ref=e77]: Close
```
```

### admin-attributes-library.spec.ts › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-17 the inherited row never rendered] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('attribute-row-e2e_attr_zuwnmg')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-17 the inherited row never rendered] open dialogs: none with timeout 30000ms
  - waiting for getByRole('table').getByTestId('attribute-row-e2e_attr_zuwnmg')

```

Context:

```text
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: How it works
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

103 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 5, shard 6 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-06T02:51:38.322Z | 14.3 min |
| email | 2026-10-06T02:51:33.338Z | 0.2 min |
| shard 1 | 2026-10-06T02:52:11.297Z | 23.6 min |
| shard 2 | 2026-10-06T02:51:28.655Z | 19.3 min |
| shard 3 | 2026-10-06T02:51:30.943Z | 15.5 min |
| shard 4 | 2026-10-06T02:51:24.884Z | 19.8 min |
| shard 5 | 2026-10-06T02:51:30.704Z | 20.0 min |
| shard 6 | 2026-10-06T02:51:28.498Z | 14.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 19.6 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 17.3 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 15.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 12.4 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 40 | 11.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 10.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.7 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 8.8 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 8.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.1 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 8.0 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 44 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 7.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 6.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 20 | 6.3 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 6.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.7 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.0 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.9 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.8 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.3 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.8 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-editor.spec.ts` › AT-56 the constraint pickers offer only co-linked targets | mobile-360 | 206.9 s |
| `admin-attributes-library.spec.ts` › AT-36 a secondary parent confers nothing, a primary parent confers | desktop-1280 | 82.0 s |
| `admin-attributes-editor.spec.ts` › AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count | mobile-360 | 55.7 s |
| `admin-attributes-library.spec.ts` › AT-17 an inherited row names its origin and clears the child's card flag | desktop-1280 | 47.2 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 46.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 39.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 34.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.4 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 34.0 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | mobile-360 | 33.9 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | mobile-360 | 33.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 33.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37406070726-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37406070726-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37406070726-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37406070726-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37406070726-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37406070726-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37406070726-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37406070726-6
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 180000ms exceeded.
```

Context:

```text
          - listitem [ref=e112]:
            - generic [ref=e113]: About
          - listitem [ref=e114]:
            - generic [ref=e115]: How it works
      - navigation "Help" [ref=e116]:
        - heading "Help" [level=2] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119]:
            - generic [ref=e120]: Safety
          - listitem [ref=e121]:
            - generic [ref=e122]: Contact
      - navigation "Legal" [ref=e123]:
        - heading "Legal" [level=2] [ref=e124]
        - list [ref=e125]:
          - listitem [ref=e126]:
            - generic [ref=e127]: Terms
          - listitem [ref=e128]:
            - generic [ref=e129]: Privacy
    - paragraph [ref=e131]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-36 a primary parent conferred nothing] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('attribute-inherited-e2e_attr_yx108m')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-36 a primary parent conferred nothing] open dialogs: none with timeout 30000ms
  - waiting for getByRole('table').getByTestId('attribute-inherited-e2e_attr_yx108m')

```

Context:

```text
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: How it works
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
