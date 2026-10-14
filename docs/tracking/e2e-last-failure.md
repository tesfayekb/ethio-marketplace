# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38545090750 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38545090750
- Commit: `08095c33641485f64e7c362a1e3fbf25b30035eb`
- Attempt: 1
- Written (UTC): 2026-10-14T10:49:47.156Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>s<n>ax: e<n>e_par_b<n>q<n> → e<n>e_chi_<n>idevh` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>mxuw: e<n>e_par_<n>r<n>pw → e<n>e_chi_npexnf` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>s<n>ax: e<n>e_par_b<n>q<n> → e<n>e_chi_<n>idevh ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>mxuw: e<n>e_par_<n>r<n>pw → e<n>e_chi_npexnf ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-3 a complete draft publishes to screening and never to active ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-154 {country} in a label and its help reads the market's country in English ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-64 the negotiable toggle stores the flag, shows a badge on review, and a cont ×1 · PW-65 the currency list opens home first and USD second, with symbols (D62-2) ×1

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T10:16:12.686Z | 15.2 min |
| email | 2026-10-14T10:16:10.649Z | 0.2 min |
| shard 1 | 2026-10-14T10:16:22.239Z | 33.1 min |
| shard 2 | 2026-10-14T10:16:12.333Z | 30.3 min |
| shard 3 | 2026-10-14T10:16:13.332Z | 27.2 min |
| shard 4 | 2026-10-14T10:16:12.536Z | 29.2 min |
| shard 5 | 2026-10-14T10:16:16.663Z | 32.9 min |
| shard 6 | 2026-10-14T10:16:23.739Z | 29.2 min |
| changed | 2026-10-14T10:16:19.128Z | 12.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 124 | 44.7 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 80 | 22.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.0 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 18.7 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 18.3 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 56 | 16.5 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 12.4 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.3 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.9 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 48 | 9.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.6 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.4 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 9.1 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 9.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 44 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 6.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.8 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.4 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.5 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 16 | 1.2 min | shard 1, shard 4, changed |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 56.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 52.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 51.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 49.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 47.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 45.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 44.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.5 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 42.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 42.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 42.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 41.4 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 41.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 41.1 s |
