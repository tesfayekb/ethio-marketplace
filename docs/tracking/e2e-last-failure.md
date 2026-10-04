# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37170105972 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37170105972
- Commit: `bd056a6ae098f178d6ce7b1b0a7b96891f0c8f62`
- Attempt: 1
- Written (UTC): 2026-10-04T02:32:31.766Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on CO-4: countries.is_active = true for XW
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-editor.spec.ts › C3 attributes console › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on CO-4: countries.is_active = true for XW

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e110]:
            - generic [ref=e111]: About
          - listitem [ref=e112]:
            - generic [ref=e113]: How it works
      - navigation "Help" [ref=e114]:
        - heading "Help" [level=2] [ref=e115]
        - list [ref=e116]:
          - listitem [ref=e117]:
            - generic [ref=e118]: Safety
          - listitem [ref=e119]:
            - generic [ref=e120]: Contact
      - navigation "Legal" [ref=e121]:
        - heading "Legal" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Terms
          - listitem [ref=e126]:
            - generic [ref=e127]: Privacy
    - paragraph [ref=e129]: © 2026 ethio.com — All rights reserved.
```
```

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 5, shard 6, changed |
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

- Count: 7 · Sources: shard 3, shard 5, shard 6, changed

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
| smoke | 2026-10-04T02:10:45.719Z | 13.4 min |
| email | 2026-10-04T02:10:40.721Z | 0.2 min |
| shard 1 | 2026-10-04T02:10:34.657Z | 19.4 min |
| shard 2 | 2026-10-04T02:10:49.660Z | 20.7 min |
| shard 3 | 2026-10-04T02:10:37.525Z | 18.4 min |
| shard 4 | 2026-10-04T02:10:41.128Z | 20.7 min |
| shard 5 | 2026-10-04T02:11:16.743Z | 20.9 min |
| shard 6 | 2026-10-04T02:10:36.183Z | 14.9 min |
| changed | 2026-10-04T02:10:33.128Z | 13.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-place.spec.ts` | 72 | 22.4 min | shard 2, shard 5, changed |
| `post-wizard-bundle2.spec.ts` | 72 | 20.2 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 62 | 19.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.5 min | smoke, shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 11.3 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 9.6 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 40 | 9.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.1 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 44 | 9.0 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 8.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 32 | 8.4 min | shard 3, shard 5 |
| `import-security.spec.ts` | 34 | 8.1 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 7.6 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 22 | 6.7 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 6.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 34 | 5.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 4.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 3.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.3 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.8 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-editor.spec.ts` › AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells | desktop-1280 | 77.3 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 57.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 45.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.8 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 42.4 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 39.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.8 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 37.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 36.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 36.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 35.4 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 35.2 s |
