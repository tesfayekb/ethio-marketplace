# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37479890827 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37479890827
- Commit: `a505f0d6809b6920f5c3d76b592aac71b9cdbf85`
- Attempt: 1
- Written (UTC): 2026-10-06T14:59:21.042Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

104 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 5, shard 6 |
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

- Count: 6 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-06T14:34:22.940Z | 15.8 min |
| email | 2026-10-06T14:34:12.961Z | 0.1 min |
| shard 1 | 2026-10-06T14:34:24.122Z | 23.0 min |
| shard 2 | 2026-10-06T14:34:29.424Z | 20.9 min |
| shard 3 | 2026-10-06T14:34:21.342Z | 19.2 min |
| shard 4 | 2026-10-06T14:34:20.189Z | 24.7 min |
| shard 5 | 2026-10-06T14:34:13.082Z | 21.3 min |
| shard 6 | 2026-10-06T14:34:16.694Z | 18.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 24.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 18.8 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 16.4 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 12.6 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 32 | 12.4 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 50 | 11.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 11.4 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 42 | 10.5 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 48 | 10.4 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 9.7 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 9.5 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.4 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 7.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.9 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.2 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.2 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 51.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 49.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | desktop-1280 | 43.7 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 42.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 42.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 40.2 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | desktop-1280 | 39.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 39.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 38.1 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 37.7 s |
| `admin-attributes-editor.spec.ts` › AT-58 a rank swap within one category imports through the route | desktop-1280 | 37.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 36.0 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 34.9 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 34.6 s |
