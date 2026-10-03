# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37131636176 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37131636176
- Commit: `9eacb2b89c5cec6878ed5a91524348d9f9594e98`
- Attempt: 1
- Written (UTC): 2026-10-03T15:19:32.435Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 5, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-03T15:01:11.426Z | 12.8 min |
| email | 2026-10-03T15:01:08.863Z | 0.3 min |
| shard 1 | 2026-10-03T15:01:03.483Z | 17.4 min |
| shard 2 | 2026-10-03T15:00:58.506Z | 12.3 min |
| shard 3 | 2026-10-03T15:01:00.499Z | 13.4 min |
| shard 4 | 2026-10-03T15:01:05.641Z | 17.6 min |
| shard 5 | 2026-10-03T15:01:08.186Z | 15.1 min |
| shard 6 | 2026-10-03T15:01:05.878Z | 13.0 min |
| changed | 2026-10-03T15:01:00.379Z | 0.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 15.4 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 62 | 14.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 36 | 7.8 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 7.4 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.4 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 7.0 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 32 | 6.6 min | shard 3, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 6.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 6.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 40 | 6.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 5.9 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 22 | 5.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.3 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 38 | 5.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 22 | 5.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 32 | 5.0 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 4.9 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 4.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.4 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.3 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 16 | 3.1 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.6 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 4 | 1.5 min | shard 1, shard 4, changed |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.9 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 32.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 31.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 31.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 31.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 31.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 30.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 30.3 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 30.0 s |
| `admin-attributes-editor.spec.ts` › AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere | desktop-1280 | 29.2 s |
