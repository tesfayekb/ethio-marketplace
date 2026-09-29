# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36561472744 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36561472744
- Commit: `4de0e33fa9937c780babc58938d3b61310617904`
- Attempt: 1
- Written (UTC): 2026-09-29T11:37:48.826Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned — Error: expect(locator).toBeInViewport() failed

## Flaky bodies (DEC-078)

### shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('dialog').getByTestId('rail-scroll').locator('li').last()
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByRole('dialog').getByTestId('rail-scroll').locator('li').last()
    14 × locator resolved to <li>…</li>
       - unexpected value "viewport ratio 0"

```

Context:

```text
              - generic [ref=e270]: e2e-post-local-0-0eu034
          - listitem [ref=e271]:
            - link "e2e-post-local-0-pzi2z9" [ref=e272] [cursor=pointer]:
              - /url: /c/e2e-post-local-0-pzi2z9
              - img [ref=e273]
              - generic [ref=e276]: e2e-post-local-0-pzi2z9
          - listitem [ref=e277]:
            - link "e2e-cat-1-0-bu7fdp" [ref=e278] [cursor=pointer]:
              - /url: /c/e2e-cat-1-0-bu7fdp
              - img [ref=e279]
              - generic [ref=e283]: e2e-cat-1-0-bu7fdp
          - listitem [ref=e284]:
            - link "e2e-cat-4-1-8kzzgq" [ref=e285] [cursor=pointer]:
              - /url: /c/e2e-cat-4-1-8kzzgq
              - img [ref=e286]
              - generic [ref=e290]: e2e-cat-4-1-8kzzgq
      - button "Sign out" [ref=e292]:
        - img [ref=e293]
        - generic [ref=e296]: Sign out
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

125 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 21 | shard 3, shard 6, changed |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `new row for relation <q> violates check constraint <q>` (quiet) | 4 | shard 3, shard 6, changed |
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
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · new row for relation <q> violates check constraint <q> ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 21 · Sources: shard 3, shard 6, changed

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
| smoke | 2026-09-29T11:25:10.374Z | 10.1 min |
| email | 2026-09-29T11:24:53.423Z | 0.2 min |
| shard 1 | 2026-09-29T11:24:53.985Z | 12.3 min |
| shard 2 | 2026-09-29T11:25:08.993Z | 10.8 min |
| shard 3 | 2026-09-29T11:24:58.189Z | 11.1 min |
| shard 4 | 2026-09-29T11:24:55.613Z | 12.6 min |
| shard 5 | 2026-09-29T11:25:07.512Z | 9.6 min |
| shard 6 | 2026-09-29T11:25:02.326Z | 8.3 min |
| changed | 2026-09-29T11:25:01.857Z | 10.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 104 | 19.2 min | shard 3, shard 6, changed |
| `shell.spec.ts` | 252 | 13.8 min | smoke, shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 52 | 12.7 min | shard 3, shard 5, changed |
| `admin-attributes-library.spec.ts` | 40 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 6.0 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.9 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 5.6 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 5.5 min | shard 3, shard 6, changed |
| `admin-categories-console.spec.ts` | 32 | 5.1 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 5.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.8 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 4.3 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 16 | 4.2 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 4.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 4.0 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 3.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 3.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 1.9 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 0.9 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.8 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 31.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 30.9 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 30.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 29.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 29.3 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 29.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 28.8 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 28.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 27.9 s |
