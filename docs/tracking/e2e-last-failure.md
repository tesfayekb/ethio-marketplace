# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38351995076 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38351995076
- Commit: `4cb2c5898b1ceb9035f068dc5bc9213597db0790`
- Attempt: 1
- Written (UTC): 2026-10-13T06:11:48.755Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

120 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 14 | shard 1, shard 2, shard 4, shard 5, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `preview_failed permission denied` (quiet) | 6 | shard 1, shard 4, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `commit_failed step-up required: no verified factor` (quiet) | 4 | shard 1, shard 4, changed |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>m<n>gy: e<n>e_par_psu<n>b → e<n>e_chi_qbfsis` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-djim<n>: e<n>e_par_dikwdi → e<n>e_chi_zytloe` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×14 · too many previews ×10 · categories badHeader ×6 · categories wrongFile ×6 · preview_failed permission denied ×6 · category-images: no GEMINI_API_KEY — fake mode ×5 · commit_failed step-up required: no verified factor ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>m<n>gy: e<n>e_par_psu<n>b → e<n>e_chi_qbfsis ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-djim<n>: e<n>e_par_dikwdi → e<n>e_chi_zytloe ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-99 the place boxes step in; every select stays at least 200 px ×2 · language toggle renders Amharic (Ge'ez path) ×1 · PR-42 the door reads a padded answer as the value it stores ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

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
| smoke | 2026-10-13T05:38:49.623Z | 15.9 min |
| email | 2026-10-13T05:38:50.214Z | 0.2 min |
| shard 1 | 2026-10-13T05:38:48.479Z | 29.5 min |
| shard 2 | 2026-10-13T05:38:53.143Z | 30.7 min |
| shard 3 | 2026-10-13T05:38:55.105Z | 25.4 min |
| shard 4 | 2026-10-13T05:39:01.549Z | 32.5 min |
| shard 5 | 2026-10-13T05:38:50.902Z | 30.4 min |
| shard 6 | 2026-10-13T05:38:50.412Z | 25.0 min |
| changed | 2026-10-13T05:39:04.185Z | 14.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` | 100 | 27.2 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 78 | 23.4 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.6 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 52 | 17.8 min | shard 2, shard 5, changed |
| `admin-listings.spec.ts` | 54 | 14.8 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 12.8 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.5 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 11.2 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 11.0 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.0 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.6 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.3 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 9.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 20 | 7.7 min | shard 1, shard 4, changed |
| `admin-locations.spec.ts` | 38 | 7.1 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 16 | 6.7 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 34 | 6.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 5.8 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.9 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.3 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 56.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 45.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 43.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 41.7 s |
| `feed-screens.spec.ts` › FS-13 each wider place is headed in its own name: the region, then the country (D127) | desktop-1280 | 40.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 39.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 39.5 s |
| `admin-attributes-safety.spec.ts` › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does | desktop-1280 | 39.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 38.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 37.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 37.9 s |
