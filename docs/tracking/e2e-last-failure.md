# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38434521261 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38434521261
- Commit: `7e4db15ec44c889d6b4dc29b6c7eef1170a4cbc4`
- Attempt: 1
- Written (UTC): 2026-10-13T17:33:17.811Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>o<n>b<n>: e<n>e_par_rbnz<n>i → e<n>e_chi_vkczuq` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lq<n>tdm: e<n>e_par_vd<n>krl → e<n>e_chi_d<n>ql<n>h` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>o<n>b<n>: e<n>e_par_rbnz<n>i → e<n>e_chi_vkczuq ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lq<n>tdm: e<n>e_par_vd<n>krl → e<n>e_chi_d<n>ql<n>h ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): feed renders its empty state ×1 · language toggle renders Amharic (Ge'ez path) ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-38 owner's client cannot insert, update or delete coverage; the route can ×1 · PR-41 the door refuses an answer the chosen options do not allow ×1 · PW-140 the title page opens with a title written from the answers, and the selle ×1

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
| smoke | 2026-10-13T16:59:40.284Z | 16.6 min |
| email | 2026-10-13T16:59:34.211Z | 0.2 min |
| shard 1 | 2026-10-13T16:59:56.006Z | 31.5 min |
| shard 2 | 2026-10-13T16:59:37.954Z | 29.1 min |
| shard 3 | 2026-10-13T16:59:44.541Z | 25.8 min |
| shard 4 | 2026-10-13T16:59:41.487Z | 31.3 min |
| shard 5 | 2026-10-13T16:59:34.594Z | 28.1 min |
| shard 6 | 2026-10-13T16:59:40.006Z | 25.6 min |
| changed | 2026-10-13T16:59:55.176Z | 7.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 72 | 24.8 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 21.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.8 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.7 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 16.3 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.7 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.1 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 12.6 min | shard 3, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 11.0 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 10.8 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.3 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.8 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.2 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 34 | 7.3 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 6.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.1 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 42 | 5.8 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.9 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.7 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 47.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 46.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 44.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 41.4 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 41.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 40.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 40.1 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 39.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 39.0 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 38.9 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 38.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 38.4 s |
