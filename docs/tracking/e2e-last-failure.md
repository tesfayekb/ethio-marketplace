# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38227878716 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38227878716
- Commit: `c9e70fa9042397451add2a8c6acb124fa8b5c9c9`
- Attempt: 1
- Written (UTC): 2026-10-12T09:37:31.690Z
- Post-test warnings: 30
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `listing not found` | 9 | shard 3, shard 4, shard 7, shard 8 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ywqia: e<n>e_par_hpeyob → e<n>e_chi_<n>h<n>oyq` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vn<n>aya: e<n>e_par_cgrd<n> → e<n>e_chi_fr<n>ix` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>ywqia: e<n>e_par_hpeyob → e<n>e_chi_<n>h<n>oyq ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vn<n>aya: e<n>e_par_cgrd<n> → e<n>e_chi_fr<n>ix ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T09:09:03.377Z | 19.2 min |
| email | 2026-10-12T09:08:59.446Z | 0.2 min |
| shard 1 | 2026-10-12T09:09:17.974Z | 24.0 min |
| shard 2 | 2026-10-12T09:09:00.638Z | 26.0 min |
| shard 3 | 2026-10-12T09:09:03.459Z | 25.3 min |
| shard 4 | 2026-10-12T09:08:57.731Z | 28.3 min |
| shard 5 | 2026-10-12T09:09:04.130Z | 27.5 min |
| shard 6 | 2026-10-12T09:09:26.177Z | 22.3 min |
| shard 7 | 2026-10-12T09:08:55.679Z | 25.0 min |
| shard 8 | 2026-10-12T09:08:54.592Z | 26.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 28.3 min | shard 4, shard 8 |
| `admin-listings.spec.ts` | 54 | 23.8 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 66 | 21.3 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.3 min | smoke, shard 4, shard 8 |
| `admin-screening.spec.ts` | 34 | 17.8 min | shard 2, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.9 min | shard 1, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.5 min | shard 4, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 14.5 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 14.4 min | shard 3, shard 7 |
| `post-wizard-category.spec.ts` | 46 | 14.0 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 13.4 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 12.8 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 52 | 12.0 min | shard 4, shard 8 |
| `auth-signout.spec.ts` | 44 | 11.0 min | smoke, shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.9 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 10.5 min | shard 3, shard 7 |
| `admin-attributes-links.spec.ts` | 32 | 10.3 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 9.4 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.9 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 8.5 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.2 min | shard 4, shard 8 |
| `admin-translations-console.spec.ts` | 42 | 8.2 min | shard 2, shard 6 |
| `admin-roles.spec.ts` | 26 | 7.0 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.6 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.5 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.4 min | shard 3, shard 7 |
| `import-security.spec.ts` | 34 | 5.8 min | shard 3, shard 7 |
| `viewing-place.spec.ts` | 22 | 5.6 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 14 | 4.9 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 4.3 min | shard 2, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.0 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.7 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.0 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.8 min | shard 3, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 3, shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 63.1 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 61.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 60.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 59.8 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 53.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 53.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 50.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 48.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 47.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.7 s |
| `admin-screening.spec.ts` › SC-2 Approve puts the ad on the site | desktop-1280 | 45.6 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | mobile-360 | 45.2 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 44.5 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 44.2 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 43.7 s |
