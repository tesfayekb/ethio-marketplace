# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36646916552 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36646916552
- Commit: `c7ae8d785c111c430c4e495d6d2419cb51e7c37d`
- Attempt: 1
- Written (UTC): 2026-09-30T00:02:40.330Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-users.spec.ts › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — Error: [INC-113] url: http://127.0.0.1:4173/

## Flaky bodies (DEC-078)

### admin-users.spec.ts › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('activity-user.profile_edit').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('activity-user.profile_edit').first()


[INC-115d] expected activity row: user.profile_edit
[INC-109] url: http://127.0.0.1:4173/admin/users/174a5f0e-f82c-44e0-848e-c5b06a6b9eae
[INC-109] testids: admin-user-detail=1 user-detail-error=0 user-detail-loading=0
[INC-109] queries:
  ["auth-derived","admin","users","detail","174a5f0e-f82c-44e0-848e-c5b06a6b9eae"] status=success error=none dataUpdatedAt=1790725853243 dataLength=non-array
  ["auth-derived","admin","users","activity","174a5f0e-f82c-44e0-848e-c5b06a6b9eae"] status=success error=none dataUpdatedAt=1790725853162 dataLength=0
  ["auth-derived","admin","users","roles"] status=success error=none dataUpdatedAt=1790725853236 dataLength=37
[INC-114] audit_log rows for 174a5f0e-f82c-44e0-848e-c5b06a6b9eae: 1
  action=user.profile_edit entity=profiles:174a5f0e-f82c-44e0-848e-c5b06a6b9eae created_at=2026-09-29T23:50:53.099262+00:00
```

Context:

```text
          - listitem [ref=e150]:
            - generic [ref=e151]: About
          - listitem [ref=e152]:
            - generic [ref=e153]: How it works
      - navigation "Help" [ref=e154]:
        - heading "Help" [level=2] [ref=e155]
        - list [ref=e156]:
          - listitem [ref=e157]:
            - generic [ref=e158]: Safety
          - listitem [ref=e159]:
            - generic [ref=e160]: Contact
      - navigation "Legal" [ref=e161]:
        - heading "Legal" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Terms
          - listitem [ref=e166]:
            - generic [ref=e167]: Privacy
    - paragraph [ref=e169]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"degraded":false,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) · stars: (none) · menu closed (options are portalled)

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "am",
    "en",
    "x-default",
+   "zxb-51de",
  ]
```

Context:

```text
          - listitem [ref=e71]:
            - generic [ref=e72]: About
          - listitem [ref=e73]:
            - generic [ref=e74]: How it works
      - navigation "Help" [ref=e75]:
        - heading "Help" [level=2] [ref=e76]
        - list [ref=e77]:
          - listitem [ref=e78]:
            - generic [ref=e79]: Safety
          - listitem [ref=e80]:
            - generic [ref=e81]: Contact
      - navigation "Legal" [ref=e82]:
        - heading "Legal" [level=2] [ref=e83]
        - list [ref=e84]:
          - listitem [ref=e85]:
            - generic [ref=e86]: Terms
          - listitem [ref=e87]:
            - generic [ref=e88]: Privacy
    - paragraph [ref=e90]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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

- Count: 3 · Sources: shard 3, shard 6

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
| smoke | 2026-09-29T23:47:51.811Z | 9.7 min |
| email | 2026-09-29T23:47:59.982Z | 0.3 min |
| shard 1 | 2026-09-29T23:47:50.743Z | 14.5 min |
| shard 2 | 2026-09-29T23:47:55.926Z | 10.9 min |
| shard 3 | 2026-09-29T23:47:56.643Z | 7.7 min |
| shard 4 | 2026-09-29T23:47:48.375Z | 11.8 min |
| shard 5 | 2026-09-29T23:47:56.493Z | 11.9 min |
| shard 6 | 2026-09-29T23:47:51.844Z | 8.6 min |
| changed | 2026-09-29T23:47:57.334Z | 6.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-place.spec.ts` | 68 | 16.3 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 252 | 13.3 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 8.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 6.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 36 | 5.2 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 5.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 4.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 4.6 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 34 | 4.4 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 4.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 4.3 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 4.1 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 4.0 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 3.9 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 2.4 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 8 | 2.4 min | shard 3, shard 6, changed |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.0 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-image-routes.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.6 s |
| `admin-users.spec.ts` › AU-9 edit: staff edits display name and alias, activity records it | mobile-360 | 39.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 33.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 33.4 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 33.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 31.4 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 31.3 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 29.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 29.6 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 29.2 s |
