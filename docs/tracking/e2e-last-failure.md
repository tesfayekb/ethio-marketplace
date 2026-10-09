# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37888575321 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37888575321
- Commit: `41b46aa6373473886fdee4dd5a0145f082003d6d`
- Attempt: 2
- Written (UTC): 2026-10-09T05:59:31.273Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 2076 stable+own rows against a 2077-row expectation

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 2076 stable+own rows against a 2077-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2077
Received: 2076
--- further error 1 ---
Error: the CSV export was page-scoped: 2076 stable+own rows against a 2077-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 2077
Received: 2076

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
          - listitem [ref=e621]:
            - generic [ref=e622]: About
          - listitem [ref=e623]:
            - generic [ref=e624]: How it works
      - navigation "Help" [ref=e625]:
        - heading "Help" [level=2] [ref=e626]
        - list [ref=e627]:
          - listitem [ref=e628]:
            - generic [ref=e629]: Safety
          - listitem [ref=e630]:
            - generic [ref=e631]: Contact
      - navigation "Legal" [ref=e632]:
        - heading "Legal" [level=2] [ref=e633]
        - list [ref=e634]:
          - listitem [ref=e635]:
            - generic [ref=e636]: Terms
          - listitem [ref=e637]:
            - generic [ref=e638]: Privacy
    - paragraph [ref=e640]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 5, shard 6, changed |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>cxka<n>: e<n>e_par_n<n>c<n> → e<n>e_chi_<n>h<n>bzp` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>uqvl: e<n>e_par_owbsoo → e<n>e_chi_v<n>u<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>cxka<n>: e<n>e_par_n<n>c<n> → e<n>e_chi_<n>h<n>bzp ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>uqvl: e<n>e_par_owbsoo → e<n>e_chi_v<n>u<n> ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 5, shard 6, changed

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
| smoke | 2026-10-09T05:31:10.921Z | 16.1 min |
| email | 2026-10-09T05:30:55.113Z | 0.2 min |
| shard 1 | 2026-10-09T05:31:03.016Z | 28.1 min |
| shard 2 | 2026-10-09T05:31:04.300Z | 23.6 min |
| shard 3 | 2026-10-09T05:30:58.516Z | 22.2 min |
| shard 4 | 2026-10-09T05:30:52.970Z | 25.4 min |
| shard 5 | 2026-10-09T05:31:01.509Z | 24.2 min |
| shard 6 | 2026-10-09T05:30:54.772Z | 20.2 min |
| changed | 2026-10-09T05:31:38.373Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 24.3 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 100 | 21.5 min | shard 3, shard 6, changed |
| `shell.spec.ts` | 336 | 18.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 17.9 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 56 | 16.8 min | shard 2, shard 5, changed |
| `post-wizard-resets.spec.ts` | 34 | 13.6 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 12.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 11.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 11.1 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 10.6 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.0 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.8 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 7.0 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.5 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 38 | 5.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.8 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 4, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 50.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 45.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 44.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 42.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 42.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 40.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 39.3 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 39.1 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 39.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 39.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 38.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 38.5 s |
