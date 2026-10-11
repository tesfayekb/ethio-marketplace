# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38123872191 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38123872191
- Commit: `232bfc02ca5509b2931a9f93c516fad36b72f989`
- Attempt: 1
- Written (UTC): 2026-10-11T08:43:20.899Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

104 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>p<n>: e<n>e_par_<n>m<n>oa<n> → e<n>e_chi_coepfc` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jzwfk<n>: e<n>e_par_uqmcol → e<n>e_chi_kgvjo<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>p<n>: e<n>e_par_<n>m<n>oa<n> → e<n>e_chi_coepfc ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jzwfk<n>: e<n>e_par_uqmcol → e<n>e_chi_kgvjo<n> ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 2, shard 3, shard 5, shard 6

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
| smoke | 2026-10-11T08:11:49.167Z | 17.8 min |
| email | 2026-10-11T08:11:32.847Z | 0.2 min |
| shard 1 | 2026-10-11T08:11:47.375Z | 31.2 min |
| shard 2 | 2026-10-11T08:11:42.114Z | 25.2 min |
| shard 3 | 2026-10-11T08:11:39.728Z | 24.3 min |
| shard 4 | 2026-10-11T08:11:35.524Z | 31.1 min |
| shard 5 | 2026-10-11T08:11:46.101Z | 28.5 min |
| shard 6 | 2026-10-11T08:11:32.452Z | 23.0 min |
| changed | 2026-10-11T08:11:40.780Z | 10.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 24.6 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 66 | 18.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 80 | 13.7 min | shard 1, shard 4, changed |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 12.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 46 | 12.5 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 52 | 12.3 min | shard 1, shard 4, changed |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 11.0 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.3 min | smoke, shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 9.8 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.8 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 9.5 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.5 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 24 | 8.9 min | shard 1, shard 4, changed |
| `admin-attributes-import.spec.ts` | 40 | 8.7 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 8.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 30 | 7.1 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 6.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.8 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.8 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 16 | 5.5 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 5.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 26 | 4.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.9 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 61.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 51.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 44.2 s |
| `feed-screens.spec.ts` › FS-13 each wider place is headed in its own name: the region, then the country (D127) | desktop-1280 | 41.7 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | desktop-1280 | 41.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 40.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 40.0 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 39.9 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 39.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 39.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 39.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 39.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 38.7 s |
