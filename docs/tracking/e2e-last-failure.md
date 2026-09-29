# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36585975894 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36585975894
- Commit: `d25b5d794f5f23d1b1a83dc32355a4e8b0b5864d`
- Attempt: 1
- Written (UTC): 2026-09-29T15:07:53.038Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback — Error: marketplace rail categories: category labels still in English

## Flaky bodies (DEC-078)

### i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: marketplace rail categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Construction Material",
+   "Travel & Accommodation",
+ ]
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: ስለ እኛ
          - listitem [ref=e291]:
            - generic [ref=e292]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e293]:
        - heading "እገዛ" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: ደህንነት
          - listitem [ref=e298]:
            - generic [ref=e299]: ያግኙን
      - navigation "ሕጋዊ" [ref=e300]:
        - heading "ሕጋዊ" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: ውሎች
          - listitem [ref=e305]:
            - generic [ref=e306]: ግላዊነት
    - paragraph [ref=e308]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

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
| `listing not found` | 4 | shard 3, shard 6 |
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

- Count: 4 · Sources: shard 3, shard 6

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
| smoke | 2026-09-29T14:54:24.100Z | 9.5 min |
| email | 2026-09-29T14:54:29.548Z | 0.2 min |
| shard 1 | 2026-09-29T14:54:22.436Z | 12.2 min |
| shard 2 | 2026-09-29T14:54:39.997Z | 10.8 min |
| shard 3 | 2026-09-29T14:54:22.786Z | 8.6 min |
| shard 4 | 2026-09-29T14:54:31.087Z | 13.0 min |
| shard 5 | 2026-09-29T14:54:22.248Z | 10.3 min |
| shard 6 | 2026-09-29T14:54:30.301Z | 7.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.3 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 8.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 5.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.6 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 5.4 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 4.6 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 4.5 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 24 | 4.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.3 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 28 | 4.3 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 4.1 min | smoke, shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 4.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 3.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 3.1 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 32 | 1.9 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 0.9 min | shard 1, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.8 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.0 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 31.2 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 28.9 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 27.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 26.9 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 26.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 26.4 s |
| `admin-attributes-links.spec.ts` › AT-59 the link editor's Save reflects change, saved and error | desktop-1280 | 25.3 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 25.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 24.6 s |
