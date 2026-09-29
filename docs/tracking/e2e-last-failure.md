# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36642555497 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36642555497
- Commit: `eda023d3384fee19856ab2b1c75e6166308b72d8`
- Attempt: 1
- Written (UTC): 2026-09-29T23:15:10.108Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 1952 stable+own rows against a 1953-row expectation

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: the CSV export was page-scoped: 1952 stable+own rows against a 1953-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 1953
Received: 1952
```

Context:

```text
          - listitem [ref=e758]:
            - generic [ref=e759]: About
          - listitem [ref=e760]:
            - generic [ref=e761]: How it works
      - navigation "Help" [ref=e762]:
        - heading "Help" [level=2] [ref=e763]
        - list [ref=e764]:
          - listitem [ref=e765]:
            - generic [ref=e766]: Safety
          - listitem [ref=e767]:
            - generic [ref=e768]: Contact
      - navigation "Legal" [ref=e769]:
        - heading "Legal" [level=2] [ref=e770]
        - list [ref=e771]:
          - listitem [ref=e772]:
            - generic [ref=e773]: Terms
          - listitem [ref=e774]:
            - generic [ref=e775]: Privacy
    - paragraph [ref=e777]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `listing not found` | 4 | shard 3, shard 6, changed |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
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
| `new row for relation <q> violates check constraint <q>` (quiet) | 2 | shard 3, shard 6 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · new row for relation <q> violates check constraint <q> ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-09-29T22:58:48.430Z | 10.3 min |
| email | 2026-09-29T22:58:55.383Z | 0.2 min |
| shard 1 | 2026-09-29T22:58:47.910Z | 16.0 min |
| shard 2 | 2026-09-29T22:58:50.728Z | 11.0 min |
| shard 3 | 2026-09-29T22:58:43.224Z | 8.1 min |
| shard 4 | 2026-09-29T22:58:40.955Z | 11.9 min |
| shard 5 | 2026-09-29T22:58:39.196Z | 10.1 min |
| shard 6 | 2026-09-29T22:58:47.298Z | 9.0 min |
| changed | 2026-09-29T22:58:51.503Z | 5.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-place.spec.ts` | 68 | 15.2 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 252 | 13.9 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 8.7 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 6.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 36 | 5.2 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 5.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 4.9 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 4.8 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 4.2 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 4.1 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 40 | 3.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 3.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 3.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.6 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 2.6 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 8 | 2.5 min | shard 3, shard 6, changed |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 0.9 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | mobile-360 | 58.9 s |
| `admin-roles.spec.ts` › RP-8 Amharic + no horizontal overflow | mobile-360 | 45.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.8 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | desktop-1280 | 32.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 31.8 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 31.7 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 31.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 30.9 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 30.5 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 29.8 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 29.1 s |
