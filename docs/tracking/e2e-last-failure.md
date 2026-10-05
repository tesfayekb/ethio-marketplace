# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37363017708 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37363017708
- Commit: `ba9a4530a87f2d8bfe9a8d0dc03ec32a1a48eb50`
- Attempt: 3
- Written (UTC): 2026-10-05T21:55:47.120Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

104 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 6 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 2, shard 3, shard 6

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
| smoke | 2026-10-05T21:30:50.509Z | 12.8 min |
| email | 2026-10-05T21:31:38.954Z | 0.2 min |
| shard 1 | 2026-10-05T21:35:53.114Z | 19.5 min |
| shard 2 | 2026-10-05T21:30:51.088Z | 18.0 min |
| shard 3 | 2026-10-05T21:30:53.020Z | 16.6 min |
| shard 4 | 2026-10-05T21:31:48.460Z | 21.2 min |
| shard 5 | 2026-10-05T21:30:57.714Z | 20.3 min |
| shard 6 | 2026-10-05T21:30:43.090Z | 14.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 18.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.2 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 14.6 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 10.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 9.5 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 44 | 8.9 min | shard 3, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.7 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 7.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 46 | 7.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 7.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 6.9 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 6.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 6.1 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 6.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 5.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 20 | 4.8 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 24 | 4.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.6 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.4 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 41.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 37.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 37.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 35.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 35.0 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | desktop-1280 | 34.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 31.2 s |
| `post-wizard-category.spec.ts` › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) | mobile-360 | 30.9 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 30.7 s |
