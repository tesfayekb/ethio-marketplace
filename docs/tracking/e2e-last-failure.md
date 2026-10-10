# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38035039212 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38035039212
- Commit: `5b963ca7acc8a1fc09357384019f129ffaafa4b9`
- Attempt: 1
- Written (UTC): 2026-10-10T08:09:14.860Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 2101 stable+own rows against a 2099-row expectation

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: the CSV export was page-scoped: 2101 stable+own rows against a 2099-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2099
Received: 2101
--- further error 1 ---
Error: the CSV export was page-scoped: 2101 stable+own rows against a 2099-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2099
Received: 2101

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
          - listitem [ref=e789]:
            - generic [ref=e790]: About
          - listitem [ref=e791]:
            - generic [ref=e792]: How it works
      - navigation "Help" [ref=e793]:
        - heading "Help" [level=2] [ref=e794]
        - list [ref=e795]:
          - listitem [ref=e796]:
            - generic [ref=e797]: Safety
          - listitem [ref=e798]:
            - generic [ref=e799]: Contact
      - navigation "Legal" [ref=e800]:
        - heading "Legal" [level=2] [ref=e801]
        - list [ref=e802]:
          - listitem [ref=e803]:
            - generic [ref=e804]: Terms
          - listitem [ref=e805]:
            - generic [ref=e806]: Privacy
    - paragraph [ref=e808]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

103 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rvhxon: e<n>e_par_r<n>ns<n> → e<n>e_chi_izu<n>a<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uwrm<n>o: e<n>e_par_bohryh → e<n>e_chi_no<n>dz` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rvhxon: e<n>e_par_r<n>ns<n> → e<n>e_chi_izu<n>a<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uwrm<n>o: e<n>e_par_bohryh → e<n>e_chi_no<n>dz ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

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
| smoke | 2026-10-10T07:38:28.211Z | 17.4 min |
| email | 2026-10-10T07:38:26.650Z | 0.2 min |
| shard 1 | 2026-10-10T07:38:27.733Z | 30.5 min |
| shard 2 | 2026-10-10T07:38:23.467Z | 27.2 min |
| shard 3 | 2026-10-10T07:38:19.544Z | 22.7 min |
| shard 4 | 2026-10-10T07:38:29.836Z | 29.7 min |
| shard 5 | 2026-10-10T07:38:20.471Z | 24.4 min |
| shard 6 | 2026-10-10T07:38:20.615Z | 25.3 min |
| changed | 2026-10-10T07:38:22.854Z | 10.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 31.1 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 24.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 18.1 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 44 | 16.0 min | shard 3, shard 6, changed |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 12.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 46 | 11.9 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.5 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 10.2 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.1 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.1 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 10.0 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 26 | 9.5 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 7.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 5.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.7 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 3.3 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 12 | 3.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 1 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 60.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 57.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 51.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 48.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 47.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 46.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 46.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 44.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 42.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 41.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 41.4 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 39.9 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 39.7 s |
