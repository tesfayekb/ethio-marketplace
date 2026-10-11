# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38137596774 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38137596774
- Commit: `f7638ec8f6bfb07a703d5c1c4fb3c3baa4049575`
- Attempt: 1
- Written (UTC): 2026-10-11T12:31:38.377Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

113 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 4, shard 7, shard 8 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 6 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 6 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 6 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 6 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 6 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 6 |
| `locations file too large` (quiet) | 2 | shard 2, shard 6 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 6 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 6 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 6 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 6 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>qh<n>: e<n>e_par_xq<n>z<n> → e<n>e_chi_<n>ev<n>uz` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>rjvv: e<n>e_par_gaccxo → e<n>e_chi_<n>yvgrw` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>qh<n>: e<n>e_par_xq<n>z<n> → e<n>e_chi_<n>ev<n>uz ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>rjvv: e<n>e_par_gaccxo → e<n>e_chi_<n>yvgrw ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 4, shard 7, shard 8

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
| smoke | 2026-10-11T12:01:21.498Z | 20.0 min |
| email | 2026-10-11T12:01:23.906Z | 0.3 min |
| shard 1 | 2026-10-11T12:01:18.292Z | 27.9 min |
| shard 2 | 2026-10-11T12:01:15.963Z | 26.7 min |
| shard 3 | 2026-10-11T12:01:12.142Z | 24.7 min |
| shard 4 | 2026-10-11T12:01:13.400Z | 28.9 min |
| shard 5 | 2026-10-11T12:01:12.849Z | 26.0 min |
| shard 6 | 2026-10-11T12:01:17.953Z | 26.8 min |
| shard 7 | 2026-10-11T12:01:24.275Z | 27.3 min |
| shard 8 | 2026-10-11T12:01:19.663Z | 30.1 min |
| changed | 2026-10-11T12:01:19.686Z | 26.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 60 | 32.1 min | shard 1, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 31.4 min | shard 4, shard 8 |
| `post-wizard-where.spec.ts` | 64 | 29.8 min | shard 4, shard 8, changed |
| `post-wizard-bundle2.spec.ts` | 66 | 26.5 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.6 min | smoke, shard 4, shard 8 |
| `admin-locations.spec.ts` | 76 | 19.3 min | shard 2, shard 6, changed |
| `post-wizard-pricing.spec.ts` | 50 | 19.0 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 18.7 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 18.1 min | shard 2, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 17.1 min | shard 3, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 16.7 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 48 | 15.4 min | shard 1, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 13.5 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 11.8 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 50 | 11.5 min | shard 4, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 11.2 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 10.1 min | shard 2, shard 6 |
| `feed-index.spec.ts` | 28 | 10.1 min | shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 10.0 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 9.3 min | shard 4, shard 8 |
| `admin-users.spec.ts` | 26 | 9.2 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.9 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 8.8 min | shard 3, shard 7 |
| `admin-translations-console.spec.ts` | 40 | 8.2 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.0 min | shard 2, shard 6 |
| `feed-route.spec.ts` | 16 | 6.8 min | shard 2, shard 6 |
| `admin-shell.spec.ts` | 20 | 6.7 min | shard 2, shard 6, changed |
| `admin-attributes-safety.spec.ts` | 14 | 6.4 min | shard 1, shard 5 |
| `import-security.spec.ts` | 34 | 5.7 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 5.6 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 4.7 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.5 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.6 min | shard 3, shard 7 |
| `admin-categories-home.spec.ts` | 8 | 3.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 3.0 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.9 min | shard 2, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 4, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 2, shard 6 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 6 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 6 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 70.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 68.2 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | mobile-360 | 63.7 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 63.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 61.2 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 59.8 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 59.7 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 59.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 59.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 58.0 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 57.2 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 56.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 56.2 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 56.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 55.7 s |
