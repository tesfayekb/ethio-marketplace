# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38235379780 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38235379780
- Commit: `6a9b0dda4e620a6059aaaee62e8d17c86bdb526d`
- Attempt: 1
- Written (UTC): 2026-10-12T10:50:01.279Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 6 | shard 3, shard 4, shard 7, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>jghfa: e<n>e_par_qn<n>jjy → e<n>e_chi_b<n>q<n>oy` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>qi<n>u: e<n>e_par_rw<n>of<n> → e<n>e_chi_bi<n>asx` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>jghfa: e<n>e_par_qn<n>jjy → e<n>e_chi_b<n>q<n>oy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>qi<n>u: e<n>e_par_rw<n>of<n> → e<n>e_chi_bi<n>asx ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T10:20:40.551Z | 18.9 min |
| email | 2026-10-12T10:20:37.041Z | 0.2 min |
| shard 1 | 2026-10-12T10:20:47.600Z | 25.4 min |
| shard 2 | 2026-10-12T10:20:37.587Z | 26.5 min |
| shard 3 | 2026-10-12T10:20:40.641Z | 28.1 min |
| shard 4 | 2026-10-12T10:20:39.609Z | 29.1 min |
| shard 5 | 2026-10-12T10:20:37.942Z | 27.2 min |
| shard 6 | 2026-10-12T10:20:38.247Z | 21.1 min |
| shard 7 | 2026-10-12T10:20:42.727Z | 26.6 min |
| shard 8 | 2026-10-12T10:20:39.602Z | 28.1 min |
| changed | 2026-10-12T10:20:36.425Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 32.0 min | smoke, shard 4, shard 8, changed |
| `post-wizard-specs.spec.ts` | 78 | 29.7 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 24.8 min | shard 3, shard 7 |
| `admin-listings.spec.ts` | 54 | 24.5 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 34 | 17.2 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 44 | 16.5 min | shard 4, shard 8, changed |
| `post-wizard-resets.spec.ts` | 34 | 16.2 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 15.7 min | shard 3, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.1 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 14.3 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 13.6 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 13.6 min | shard 1, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 12.3 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 12.1 min | shard 3, shard 7 |
| `posting-routes.spec.ts` | 52 | 11.1 min | shard 4, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 10.9 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.8 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.7 min | smoke, shard 2, shard 6 |
| `admin-locations.spec.ts` | 38 | 9.9 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.7 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.6 min | shard 4, shard 8 |
| `photo-pipeline.spec.ts` | 20 | 8.2 min | shard 3, shard 7 |
| `admin-users.spec.ts` | 26 | 8.1 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 8.0 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 7.0 min | shard 3, shard 7 |
| `admin-roles.spec.ts` | 26 | 6.9 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.5 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 28 | 6.4 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 16 | 6.0 min | shard 2, shard 6, changed |
| `admin-audit.spec.ts` | 14 | 5.1 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 4.6 min | shard 2, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 4.4 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.4 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 3.1 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 3.0 min | shard 4, shard 8 |
| `admin-shell.spec.ts` | 10 | 2.8 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.6 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.4 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.8 min | shard 3, shard 7 |
| `settings.spec.ts` | 4 | 0.8 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 70.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 62.9 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 54.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 54.2 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 52.5 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | mobile-360 | 51.9 s |
| `admin-listings.spec.ts` › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found | mobile-360 | 50.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 50.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 48.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 47.6 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 47.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 47.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 47.0 s |
| `feed-screens.spec.ts` › FS-10 nothing anywhere: the invitation card comes first, with the category and the place | mobile-360 | 46.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 46.6 s |
