# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38109538933 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38109538933
- Commit: `dfbb8ec03160d6309d8bee4970b9b803be2e554c`
- Attempt: 1
- Written (UTC): 2026-10-11T04:19:48.453Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

120 line(s), 38 message(s): 1 off the allowlist, 37 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 14 | shard 1, shard 2, shard 4, shard 5, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `export_failed permission denied` (quiet) | 8 | shard 1, shard 4, changed |
| `definitions badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `definitions wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `preview_failed permission denied` (quiet) | 6 | shard 1, shard 4, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `listing not found` | 5 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-erpt<n>x: e<n>e_par_<n>c<n>v<n> → e<n>e_chi_bbh<n>ut` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>j<n>r: e<n>e_par_kyi<n>jw → e<n>e_chi_y<n>eor<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-igoeh<n>: e<n>e_par_<n>jod<n> → e<n>e_chi_db<n>y<n>` (quiet) | 1 | changed |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-ncrzdd: e<n>e_par_i<n>wr<n>u → e<n>e_chi_m<n>nka<n>` (quiet) | 1 | changed |

Quiet (allowlisted): digest mismatch ×14 · too many previews ×10 · export_failed permission denied ×8 · definitions badHeader ×6 · definitions wrongFile ×6 · preview_failed permission denied ×6 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-erpt<n>x: e<n>e_par_<n>c<n>v<n> → e<n>e_chi_bbh<n>ut ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>j<n>r: e<n>e_par_kyi<n>jw → e<n>e_chi_y<n>eor<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-igoeh<n>: e<n>e_par_<n>jod<n> → e<n>e_chi_db<n>y<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-changed-<n>-ncrzdd: e<n>e_par_i<n>wr<n>u → e<n>e_chi_m<n>nka<n> ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6

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
| smoke | 2026-10-11T03:49:14.047Z | 17.0 min |
| email | 2026-10-11T03:49:10.237Z | 0.2 min |
| shard 1 | 2026-10-11T03:49:22.061Z | 30.1 min |
| shard 2 | 2026-10-11T03:49:05.107Z | 25.8 min |
| shard 3 | 2026-10-11T03:49:12.280Z | 27.8 min |
| shard 4 | 2026-10-11T03:49:19.431Z | 27.7 min |
| shard 5 | 2026-10-11T03:49:04.939Z | 25.5 min |
| shard 6 | 2026-10-11T03:49:15.776Z | 27.9 min |
| changed | 2026-10-11T03:49:09.715Z | 17.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 29.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 84 | 21.7 min | shard 1, shard 4, changed |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 18.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 68 | 17.6 min | shard 1, shard 4, changed |
| `admin-attributes-import.spec.ts` | 80 | 16.2 min | shard 1, shard 4, changed |
| `post-wizard-resets.spec.ts` | 34 | 15.5 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 14.7 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 12.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 46 | 12.4 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 10.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.9 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.7 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 28 | 10.6 min | shard 1, shard 4, changed |
| `auth-signout.spec.ts` | 44 | 10.0 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 8.1 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 7.9 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 30 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.7 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 6.9 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 38 | 5.8 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.7 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.0 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 16 | 4.9 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.7 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 3.4 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 3.1 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.4 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 55.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 53.3 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 52.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 51.3 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 50.6 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 50.6 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 50.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 49.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 48.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 47.9 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 47.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 45.5 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 45.1 s |
