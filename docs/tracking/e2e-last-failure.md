# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38343868418 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38343868418
- Commit: `4959bbc4f9e0784fd542a4f790cea131a5c502ec`
- Attempt: 1
- Written (UTC): 2026-10-13T04:29:18.425Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

110 line(s), 38 message(s): 1 off the allowlist, 37 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>h<n>: e<n>e_par_ptooqv → e<n>e_chi_la<n>ria` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>ohb: e<n>e_par_sqfovu → e<n>e_chi_fmutqo` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-<n>dspol: e<n>e_par_dylkc<n> → e<n>e_chi_lze<n>d<n>` (quiet) | 1 | changed |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-o<n>dys: e<n>e_par_noiybo → e<n>e_chi_a<n>coi<n>` (quiet) | 1 | changed |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>h<n>: e<n>e_par_ptooqv → e<n>e_chi_la<n>ria ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>ohb: e<n>e_par_sqfovu → e<n>e_chi_fmutqo ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-<n>dspol: e<n>e_par_dylkc<n> → e<n>e_chi_lze<n>d<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-o<n>dys: e<n>e_par_noiybo → e<n>e_chi_a<n>coi<n> ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-13T03:56:55.443Z | 15.0 min |
| email | 2026-10-13T03:56:58.307Z | 0.2 min |
| shard 1 | 2026-10-13T03:56:57.683Z | 29.5 min |
| shard 2 | 2026-10-13T03:56:58.261Z | 27.2 min |
| shard 3 | 2026-10-13T03:57:04.197Z | 27.7 min |
| shard 4 | 2026-10-13T03:57:03.174Z | 31.9 min |
| shard 5 | 2026-10-13T03:56:59.180Z | 27.6 min |
| shard 6 | 2026-10-13T03:56:56.493Z | 28.4 min |
| changed | 2026-10-13T03:57:12.748Z | 16.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 27.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.9 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 44 | 18.0 min | shard 2, shard 5, changed |
| `post-wizard-bundle2.spec.ts` | 68 | 17.7 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 16.1 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 32 | 14.5 min | shard 1, shard 4, changed |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 13.9 min | shard 3, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 13.7 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 11.5 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.3 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.9 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.8 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 36 | 8.3 min | shard 1, shard 4, changed |
| `admin-users.spec.ts` | 26 | 8.2 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 34 | 7.0 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 42 | 5.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.7 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 28 | 4.8 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 2.8 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.8 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 4 | 2.3 min | shard 3, shard 6, changed |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | desktop-1280 | 115.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 68.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 57.7 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 54.0 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 51.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.3 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 49.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 48.2 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 48.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 47.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 47.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 46.8 s |
| `post-wizard-specs.spec.ts` › PW-77 the first refused field's label lands below the header (D2, no-preference) | desktop-1280 | 44.5 s |
| `photo-pipeline.spec.ts` › PP-8 DELETE removes the row and the objects; POST makes a photo the cover | desktop-1280 | 44.0 s |
