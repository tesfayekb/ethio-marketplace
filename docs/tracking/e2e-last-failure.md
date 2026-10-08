# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37774427456 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37774427456
- Commit: `43307e70de197529daf51c1f37ecf830afe11970`
- Attempt: 1
- Written (UTC): 2026-10-08T12:31:33.828Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 2, shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>wue<n>p: e<n>e_par_kqpcck → e<n>e_chi_<n>islm<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pybzyr: e<n>e_par_zzze<n>a → e<n>e_chi_h<n>ksbf` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>wue<n>p: e<n>e_par_kqpcck → e<n>e_chi_<n>islm<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pybzyr: e<n>e_par_zzze<n>a → e<n>e_chi_h<n>ksbf ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 2, shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-08T12:06:46.772Z | 14.1 min |
| email | 2026-10-08T12:06:56.595Z | 0.3 min |
| shard 1 | 2026-10-08T12:06:40.037Z | 22.9 min |
| shard 2 | 2026-10-08T12:06:51.892Z | 19.2 min |
| shard 3 | 2026-10-08T12:06:54.034Z | 22.0 min |
| shard 4 | 2026-10-08T12:06:52.081Z | 24.3 min |
| shard 5 | 2026-10-08T12:06:45.507Z | 23.8 min |
| shard 6 | 2026-10-08T12:06:56.215Z | 18.2 min |
| changed | 2026-10-08T12:06:43.861Z | 7.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 498 | 28.1 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 24.0 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 14.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.4 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.9 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 30 | 10.5 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 9.6 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 9.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 9.4 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.7 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.9 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 36 | 6.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.5 min | shard 1, shard 5 |
| `import-security.spec.ts` | 34 | 5.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.2 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 20 | 3.8 min | shard 1, shard 4, changed |
| `admin-countries.spec.ts` | 16 | 3.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 36 | 1.6 min | shard 2, shard 5, changed |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 52.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 46.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 40.9 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 40.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 39.7 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 39.0 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 38.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 38.2 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 36.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.5 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 35.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 35.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 34.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | mobile-360 | 34.8 s |
