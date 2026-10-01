# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36920415994 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36920415994
- Commit: `5f8d0b604ba29efd787a4fdacb1f6cd34c9cdf3d`
- Attempt: 1
- Written (UTC): 2026-10-01T20:33:11.928Z
- Post-test warnings: 8
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-v1kssk-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-v1kssk-card')

[dialog-dump findRow(e2e-cat-1-1-v1kssk)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-1-v1kssk) after create] open dialogs: none
```

Context:

```text
          - listitem [ref=e113]:
            - generic [ref=e114]: About
          - listitem [ref=e115]:
            - generic [ref=e116]: How it works
      - navigation "Help" [ref=e117]:
        - heading "Help" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - generic [ref=e121]: Safety
          - listitem [ref=e122]:
            - generic [ref=e123]: Contact
      - navigation "Legal" [ref=e124]:
        - heading "Legal" [level=2] [ref=e125]
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e128]: Terms
          - listitem [ref=e129]:
            - generic [ref=e130]: Privacy
    - paragraph [ref=e132]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

103 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

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
| smoke | 2026-10-01T20:18:20.027Z | 9.2 min |
| email | 2026-10-01T20:18:36.193Z | 0.2 min |
| shard 1 | 2026-10-01T20:18:20.499Z | 14.5 min |
| shard 2 | 2026-10-01T20:18:28.142Z | 11.9 min |
| shard 3 | 2026-10-01T20:18:20.326Z | 9.5 min |
| shard 4 | 2026-10-01T20:18:29.918Z | 12.9 min |
| shard 5 | 2026-10-01T20:18:43.093Z | 12.1 min |
| shard 6 | 2026-10-01T20:18:32.894Z | 9.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.1 min | smoke, shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.5 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 52 | 7.3 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 34 | 7.1 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 5.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 36 | 5.1 min | shard 1, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 5.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 5.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 5.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 34 | 4.7 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 24 | 4.2 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 24 | 4.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 4.1 min | smoke, shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 4.0 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 3.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 3.5 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 2.5 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 6 | 0.9 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-library.spec.ts` › AT-3 link manager: an attribute is linked to a scratch category and unlinked | mobile-360 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.1 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.8 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 31.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 30.7 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 30.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 29.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 28.7 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 28.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 27.9 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | desktop-1280 | 26.7 s |
