# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37400005274
- Commit: `2e9562e53ab06cfe4db3662e4d768f0c9a5fd934`
- Attempt: 1
- Written (UTC): 2026-10-06T02:00:50.498Z
- Passed: 1101 · Skipped: 45 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: smoke

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back — Test timeout of 180000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record — Test timeout of 180000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-56 the constraint pickers offer only co-linked targets — Error: [dialog-dump AT-56 the co-linked number is not on offer] open dialogs: attribute-edit-dialog opened-by=row-edit
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-library.spec.ts › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it — Error: [dialog-dump AT-19 the inherited row never rendered] open dialogs: none

## Flaky bodies (DEC-078)

### admin-attributes-editor.spec.ts › C3 attributes console › AT-50 per-option labels, aliases and the inactive switch land and read back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 180000ms exceeded.
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

### admin-attributes-editor.spec.ts › C3 attributes console › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 180000ms exceeded.
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

Locator:  getByTestId('option-group-flat').getByTestId('option-row-a').getByTestId('option-bounds-add').locator('option[value="e2e_attr_ycgiy6"]')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - [dialog-dump AT-56 the co-linked number is not on offer] open dialogs: attribute-edit-dialog opened-by=row-edit with timeout 10000ms
  - waiting for getByTestId('option-group-flat').getByTestId('option-row-a').getByTestId('option-bounds-add').locator('option[value="e2e_attr_ycgiy6"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

Context:

```text
                - paragraph [ref=e59]: The restriction applies wherever this attribute and the list attribute are used together.
                - combobox [ref=e60]:
                  - 'option "Restrict a list (e.g., storage: 64 / 128 / 256 GB)" [selected]'
                  - option "e2e_attr_602vwp (e2e_attr_602vwp)"
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

### admin-attributes-library.spec.ts › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-19 the inherited row never rendered] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('attribute-inherited-e2e_attr_zskf8k')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-19 the inherited row never rendered] open dialogs: none with timeout 30000ms
  - waiting for getByRole('table').getByTestId('attribute-inherited-e2e_attr_zskf8k')

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

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: smoke

`smoke`: log unavailable.

103 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 2, shard 3, shard 6 |
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

- Count: 5 · Sources: shard 2, shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-06T01:37:29.997Z | 0.3 min |
| shard 1 | 2026-10-06T01:37:18.895Z | 23.1 min |
| shard 2 | 2026-10-06T01:37:17.634Z | 17.6 min |
| shard 3 | 2026-10-06T01:37:25.272Z | 16.7 min |
| shard 4 | 2026-10-06T01:37:18.256Z | 21.3 min |
| shard 5 | 2026-10-06T01:37:26.156Z | 17.4 min |
| shard 6 | 2026-10-06T01:37:21.320Z | 14.8 min |
| changed | 2026-10-06T01:37:18.169Z | 1.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 20.9 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 19.7 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 60 | 13.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 8.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 126 | 8.4 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 44 | 8.4 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 7.1 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 7.1 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 20 | 6.9 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 6.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 28 | 5.1 min | shard 3, shard 6, changed |
| `admin-translations-console.spec.ts` | 38 | 4.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 4.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 3.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 22 | 3.5 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.8 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 1.9 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.1 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `post-wizard-units.spec.ts` | 2 | 0.3 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 4, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-editor.spec.ts` › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere | mobile-360 | 361.4 s |
| `admin-attributes-editor.spec.ts` › AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record | desktop-1280 | 194.4 s |
| `admin-attributes-editor.spec.ts` › AT-50 per-option labels, aliases and the inactive switch land and read back | desktop-1280 | 192.2 s |
| `admin-attributes-library.spec.ts` › AT-12 an approved am attribute label renders in am and falls back to EN | mobile-360 | 53.0 s |
| `admin-attributes-library.spec.ts` › AT-19 an inherited row has no write verb and the write RPCs refuse it | desktop-1280 | 44.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 37.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 35.0 s |
| `admin-attributes-editor.spec.ts` › AT-56 the constraint pickers offer only co-linked targets | desktop-1280 | 35.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.2 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 33.8 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 33.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 32.9 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37400005274-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37400005274-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37400005274-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37400005274-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37400005274-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37400005274-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37400005274-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37400005274-changed
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere

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

## admin-attributes-library.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-12 the row never rendered in am] open dialogs: none

expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_zkmhv0-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-12 the row never rendered in am] open dialogs: none with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('attribute-row-e2e_attr_zkmhv0-card')

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

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
