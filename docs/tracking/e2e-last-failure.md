# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36657436473 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36657436473
- Commit: `825a77942ccd27d3bc330408e9e0b34e7ea7b7c4`
- Attempt: 1
- Written (UTC): 2026-09-30T02:10:57.791Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached — Error: the dial never refused within 32 calls
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Error: [e2e:l2b] destroying XP failed at place country fc396d40-c84f-4a06-8275-0a04456368ac: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

## Flaky bodies (DEC-078)

### posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: the dial never refused within 32 calls

expect(received).not.toBeNull()

Received: null
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] destroying XP failed at place country fc396d40-c84f-4a06-8275-0a04456368ac: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"
```

Context: context file not found for `shell-L4b-location-picker-LS-11-picking-a-second-market-renders-its-own-tree-and-saves-its-own-node-desktop-1280`

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
| smoke | 2026-09-30T01:57:03.637Z | 10.0 min |
| email | 2026-09-30T01:57:10.919Z | 0.3 min |
| shard 1 | 2026-09-30T01:56:54.074Z | 13.4 min |
| shard 2 | 2026-09-30T01:56:57.477Z | 10.4 min |
| shard 3 | 2026-09-30T01:56:55.708Z | 7.9 min |
| shard 4 | 2026-09-30T01:57:11.725Z | 13.5 min |
| shard 5 | 2026-09-30T01:57:07.477Z | 10.4 min |
| shard 6 | 2026-09-30T01:57:03.851Z | 9.3 min |
| changed | 2026-09-30T01:57:07.131Z | 1.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.8 min | smoke, shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 52 | 8.1 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 6.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 5.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 4.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.9 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.9 min | shard 1, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.8 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 4.5 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 4.5 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 40 | 4.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 4.2 min | smoke, shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.1 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 4.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 4.0 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 3.3 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 2.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 12 | 2.5 min | shard 2, shard 5, changed |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 1.9 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.0 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 36.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.6 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 31.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 31.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 30.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 29.8 s |
| `admin-attributes-library.spec.ts` › AT-5 delete: refused while linked, accepted once unlinked | mobile-360 | 27.5 s |
| `post-wizard-finder.spec.ts` › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option | desktop-1280 | 27.3 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 26.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 26.4 s |
