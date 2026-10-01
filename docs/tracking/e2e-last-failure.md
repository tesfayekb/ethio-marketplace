# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36907680147 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36907680147
- Commit: `2f60049609952c9f08847421aa76a13b3bc34a5c`
- Attempt: 2
- Written (UTC): 2026-10-01T19:16:56.442Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages — Error: reachStep7: no region carried the city e2e-scratch-36907680147-5-5-desktop-1280-1-tr14.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: [e2e:u4d] scratch location cleanup failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

## Flaky bodies (DEC-078)

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: reachStep7: no region carried the city e2e-scratch-36907680147-5-5-desktop-1280-1-tr14.
the market select's value: ET
regions offered (6): Choose one | Addis Ababa | Amhara | Dire Dawa | Oromia | Sidama | Tigray
the tree route when the step opened: status 200, 17 slugs
the tree route now: status 200, 17 slugs, markets (none)
the city e2e-scratch-36907680147-5-5-desktop-1280-1-tr14 in that read: yes
elapsed since the tree wait: 9331 ms

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360`

### admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:u4d] scratch location cleanup failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"
```

Context:

```text
          - listitem [ref=e814]:
            - generic [ref=e815]: About
          - listitem [ref=e816]:
            - generic [ref=e817]: How it works
      - navigation "Help" [ref=e818]:
        - heading "Help" [level=2] [ref=e819]
        - list [ref=e820]:
          - listitem [ref=e821]:
            - generic [ref=e822]: Safety
          - listitem [ref=e823]:
            - generic [ref=e824]: Contact
      - navigation "Legal" [ref=e825]:
        - heading "Legal" [level=2] [ref=e826]
        - list [ref=e827]:
          - listitem [ref=e828]:
            - generic [ref=e829]: Terms
          - listitem [ref=e830]:
            - generic [ref=e831]: Privacy
    - paragraph [ref=e833]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
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

- Count: 6 · Sources: shard 3, shard 6

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
| smoke | 2026-10-01T18:34:38.657Z | 9.0 min |
| email | 2026-10-01T18:34:44.670Z | 0.2 min |
| shard 1 | 2026-10-01T19:04:42.508Z | 11.7 min |
| shard 2 | 2026-10-01T18:34:57.874Z | 11.6 min |
| shard 3 | 2026-10-01T18:34:37.042Z | 8.7 min |
| shard 4 | 2026-10-01T18:35:25.045Z | 12.6 min |
| shard 5 | 2026-10-01T18:34:42.300Z | 11.8 min |
| shard 6 | 2026-10-01T18:35:00.928Z | 10.2 min |
| changed | 2026-10-01T18:35:05.868Z | 2.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 13.1 min | smoke, shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 48 | 8.7 min | shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 52 | 7.7 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 6.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 4.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.8 min | shard 1, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 4.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 4.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 4.5 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 34 | 4.5 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 38 | 4.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 22 | 4.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 3.8 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 3.3 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 2.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 36 | 2.5 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 6 | 0.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 0.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.6 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-image-routes.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
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
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | desktop-1280 | 48.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.9 s |
| `post-wizard-pricing.spec.ts` › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 31.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 30.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 30.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 30.0 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 29.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 28.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 28.6 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 28.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 28.3 s |
