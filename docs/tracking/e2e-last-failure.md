# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36931994260 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36931994260
- Commit: `b26bb0b30e07b9cb2736ae9581d2e5a407d2c5bd`
- Attempt: 1
- Written (UTC): 2026-10-01T22:13:28.874Z
- Post-test warnings: 16
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-attributes-editor.spec.ts › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
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

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

102 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

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
| `listing not found` | 2 | shard 3, shard 6 |
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

- Count: 2 · Sources: shard 3, shard 6

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
| smoke | 2026-10-01T21:58:17.478Z | 11.4 min |
| email | 2026-10-01T21:58:12.497Z | 0.2 min |
| shard 1 | 2026-10-01T21:58:13.395Z | 14.6 min |
| shard 2 | 2026-10-01T21:58:24.848Z | 13.5 min |
| shard 3 | 2026-10-01T21:58:10.781Z | 11.3 min |
| shard 4 | 2026-10-01T21:58:19.635Z | 14.7 min |
| shard 5 | 2026-10-01T21:58:09.555Z | 11.9 min |
| shard 6 | 2026-10-01T21:58:06.198Z | 11.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 14.4 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 10.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.0 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 6.7 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 6.0 min | smoke, shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 5.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 5.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 24 | 5.2 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 22 | 5.2 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 5.1 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 36 | 5.0 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 34 | 4.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 4.6 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 4.4 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.3 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 36 | 4.0 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 3.9 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 3.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 6 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.0 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.0 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-image-routes.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-editor.spec.ts` › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells | desktop-1280 | 76.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 37.6 s |
| `post-wizard-resets.spec.ts` › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) | mobile-360 | 35.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 34.4 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 32.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 31.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 31.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 31.0 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 30.4 s |
