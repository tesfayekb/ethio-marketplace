# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37251884569 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37251884569
- Commit: `24d401f55c71e0256039284823ece9b94df249a5`
- Attempt: 1
- Written (UTC): 2026-10-05T01:58:05.360Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

113 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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

- Count: 12 · Sources: shard 3, shard 6, changed

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
| smoke | 2026-10-05T01:34:35.383Z | 13.8 min |
| email | 2026-10-05T01:34:44.753Z | 0.3 min |
| shard 1 | 2026-10-05T01:34:34.326Z | 20.7 min |
| shard 2 | 2026-10-05T01:34:41.944Z | 21.9 min |
| shard 3 | 2026-10-05T01:34:39.387Z | 21.1 min |
| shard 4 | 2026-10-05T01:34:46.142Z | 21.5 min |
| shard 5 | 2026-10-05T01:34:41.444Z | 23.1 min |
| shard 6 | 2026-10-05T01:35:12.197Z | 16.1 min |
| changed | 2026-10-05T01:34:35.427Z | 18.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 152 | 41.4 min | shard 3, shard 6, changed |
| `post-wizard-bundle2.spec.ts` | 60 | 17.8 min | shard 2, shard 5 |
| `shell.spec.ts` | 252 | 16.7 min | smoke, shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 60 | 16.2 min | shard 1, shard 4, changed |
| `admin-translations-console.spec.ts` | 76 | 12.1 min | shard 1, shard 4, changed |
| `post-wizard-pricing.spec.ts` | 44 | 11.8 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 11.6 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 11.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 9.6 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 50 | 9.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.3 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 36 | 8.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.1 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 20 | 7.8 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 7.8 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 34 | 5.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 5.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.2 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.4 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 1.0 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
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
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 53.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 43.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 40.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 39.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 38.8 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 38.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 38.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 36.7 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | mobile-360 | 36.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 35.9 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 35.6 s |
