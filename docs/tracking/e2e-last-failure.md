# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38266101610 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38266101610
- Commit: `74503dfd1a3f5a661621049c02d0d92c113afeec`
- Attempt: 1
- Written (UTC): 2026-10-12T15:28:08.472Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 5, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gre<n>g<n>: e<n>e_par_<n>q<n>qr<n> → e<n>e_chi_<n>ot<n>mm` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uhelaf: e<n>e_par_zjurw<n> → e<n>e_chi_<n>vl<n>o<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gre<n>g<n>: e<n>e_par_<n>q<n>qr<n> → e<n>e_chi_<n>ot<n>mm ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uhelaf: e<n>e_par_zjurw<n> → e<n>e_chi_<n>vl<n>o<n> ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 5, shard 6, changed

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
| smoke | 2026-10-12T14:54:02.696Z | 17.5 min |
| email | 2026-10-12T14:53:58.176Z | 0.2 min |
| shard 1 | 2026-10-12T14:53:58.494Z | 33.8 min |
| shard 2 | 2026-10-12T14:53:55.135Z | 30.9 min |
| shard 3 | 2026-10-12T14:53:59.666Z | 31.2 min |
| shard 4 | 2026-10-12T14:53:48.018Z | 30.1 min |
| shard 5 | 2026-10-12T14:53:49.268Z | 28.2 min |
| shard 6 | 2026-10-12T14:53:57.975Z | 28.1 min |
| changed | 2026-10-12T14:54:04.580Z | 25.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 156 | 52.4 min | shard 3, shard 6, changed |
| `shell.spec.ts` | 504 | 30.6 min | smoke, shard 3, shard 6, changed |
| `post-wizard-resets.spec.ts` | 68 | 26.8 min | shard 3, shard 6, changed |
| `post-wizard-bundle2.spec.ts` | 68 | 19.9 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 54 | 17.8 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 14.7 min | shard 3, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 13.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 12.4 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 11.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.1 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.8 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 9.1 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 8.3 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 26 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 34 | 7.1 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 6.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 28 | 6.4 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 5.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 16 | 3.7 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 2.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 58.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 52.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 49.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 48.3 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 45.9 s |
| `admin-categories-home.spec.ts` › CT-40 the delete door's refusals read as words, never as keys | mobile-360 | 45.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 45.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 43.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 42.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 42.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 42.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 41.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 40.7 s |
