# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37086145211 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37086145211
- Commit: `926e44679d467046e479f42cf7039114d8296cdb`
- Attempt: 1
- Written (UTC): 2026-10-03T01:46:51.863Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City wssqx/
Received string:  "Escratch Guess City wjzqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    14 × locator resolved to <button type="button" id="radix-_r_4_" aria-label="City" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" class="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City wjzqx"

```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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

- Count: 8 · Sources: shard 3, shard 6

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
| smoke | 2026-10-03T01:28:40.753Z | 12.9 min |
| email | 2026-10-03T01:28:32.480Z | 0.2 min |
| shard 1 | 2026-10-03T01:28:46.144Z | 17.7 min |
| shard 2 | 2026-10-03T01:29:00.079Z | 12.1 min |
| shard 3 | 2026-10-03T01:28:29.182Z | 14.5 min |
| shard 4 | 2026-10-03T01:28:24.307Z | 13.2 min |
| shard 5 | 2026-10-03T01:28:23.191Z | 12.7 min |
| shard 6 | 2026-10-03T01:28:37.948Z | 13.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 16.1 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 60 | 15.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.9 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 7.9 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 36 | 7.0 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 6.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 6.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 6.4 min | smoke, shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 6.2 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 32 | 6.0 min | shard 3, shard 5 |
| `posting-routes.spec.ts` | 38 | 5.9 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 5.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 5.7 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 22 | 5.5 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.1 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 34 | 4.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 4.7 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 4.3 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 3.7 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 3.3 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.6 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.1 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 36.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 33.0 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.7 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 32.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 32.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 31.6 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 31.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 31.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 31.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 30.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 30.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 29.3 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 28.6 s |
