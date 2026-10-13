# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38363785159 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38363785159
- Commit: `961160c892fe7ee260180776268a6fe04719fc4e`
- Attempt: 1
- Written (UTC): 2026-10-13T08:10:11.776Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

181 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 20 | shard 1, shard 2, shard 4, shard 5, changed |
| `too many previews` (quiet) | 20 | shard 2, shard 5, changed |
| `listing not found` | 8 | shard 2, shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `definitions badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `definitions wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories file too large` (quiet) | 4 | shard 2, shard 5, changed |
| `categories nulByte` (quiet) | 4 | shard 2, shard 5, changed |
| `categories unknownColumn` (quiet) | 4 | shard 2, shard 5, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `countries badHeader` (quiet) | 4 | shard 2, shard 5, changed |
| `countries nulByte` (quiet) | 4 | shard 2, shard 5, changed |
| `countries tooManyRows` (quiet) | 4 | shard 2, shard 5, changed |
| `countries unknownColumn` (quiet) | 4 | shard 2, shard 5, changed |
| `countries wrongFile` (quiet) | 4 | shard 2, shard 5, changed |
| `definitions nulByte` (quiet) | 4 | shard 2, shard 5, changed |
| `definitions tooManyRows` (quiet) | 4 | shard 2, shard 5, changed |
| `definitions unknownColumn` (quiet) | 4 | shard 2, shard 5, changed |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `links unknownColumn` (quiet) | 4 | shard 2, shard 5, changed |
| `locations badHeader` (quiet) | 4 | shard 2, shard 5, changed |
| `locations file too large` (quiet) | 4 | shard 2, shard 5, changed |
| `locations nulByte` (quiet) | 4 | shard 2, shard 5, changed |
| `locations unknownColumn` (quiet) | 4 | shard 2, shard 5, changed |
| `locations wrongFile` (quiet) | 4 | shard 2, shard 5, changed |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 4 | shard 2, shard 5, changed |
| `strings emptyFile` (quiet) | 4 | shard 2, shard 5, changed |
| `strings nulByte` (quiet) | 4 | shard 2, shard 5, changed |
| `strings tooManyRows` (quiet) | 4 | shard 2, shard 5, changed |
| `strings unknownColumn` (quiet) | 4 | shard 2, shard 5, changed |
| `strings wrongFile` (quiet) | 4 | shard 2, shard 5, changed |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fxnuem: e<n>e_par_<n>wgbx<n> → e<n>e_chi_<n>e<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nzucum: e<n>e_par_v<n>whzd → e<n>e_chi_lcx<n>iv` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×20 · too many previews ×20 · categories badHeader ×6 · categories wrongFile ×6 · definitions badHeader ×6 · definitions wrongFile ×6 · categories file too large ×4 · categories nulByte ×4 · categories unknownColumn ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · countries badHeader ×4 · countries nulByte ×4 · countries tooManyRows ×4 · countries unknownColumn ×4 · countries wrongFile ×4 · definitions nulByte ×4 · definitions tooManyRows ×4 · definitions unknownColumn ×4 · export_failed permission denied ×4 · links unknownColumn ×4 · locations badHeader ×4 · locations file too large ×4 · locations nulByte ×4 · locations unknownColumn ×4 · locations wrongFile ×4 · preview_failed permission denied ×4 · strings badHeader ×4 · strings emptyFile ×4 · strings nulByte ×4 · strings tooManyRows ×4 · strings unknownColumn ×4 · strings wrongFile ×4 · commit_failed step-up required: no verified factor ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fxnuem: e<n>e_par_<n>wgbx<n> → e<n>e_chi_<n>e<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nzucum: e<n>e_par_v<n>whzd → e<n>e_chi_lcx<n>iv ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 2, shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-162 a refusal left on the price page never stands on specifications, and name ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-175 the price page asks the unit of sale above the quantity ×1 · PW-185 a Next pressed while the contact step is still reading waits for it, then ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-1 gating: a plain user is refused; the roster, its toolbar and the header's t ×1 · CO-2 roster: every market renders, the two open ones carry the open tone, search ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T07:38:36.370Z | 16.1 min |
| email | 2026-10-13T07:38:34.198Z | 0.3 min |
| shard 1 | 2026-10-13T07:38:41.112Z | 31.1 min |
| shard 2 | 2026-10-13T07:38:26.999Z | 27.9 min |
| shard 3 | 2026-10-13T07:38:26.052Z | 24.3 min |
| shard 4 | 2026-10-13T07:38:23.919Z | 28.7 min |
| shard 5 | 2026-10-13T07:38:34.221Z | 31.1 min |
| shard 6 | 2026-10-13T07:38:30.088Z | 21.5 min |
| changed | 2026-10-13T07:38:44.391Z | 4.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 19.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.8 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 72 | 14.8 min | shard 2, shard 5, changed |
| `admin-listings.spec.ts` | 54 | 13.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 12.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 12.4 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 10.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.2 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.1 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 9.4 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 26 | 8.9 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 7.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.4 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 34 | 6.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 42 | 5.7 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.5 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.0 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.2 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.9 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 48.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 46.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 45.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 41.3 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 38.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 37.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.9 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | desktop-1280 | 36.8 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 36.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 36.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 36.4 s |
