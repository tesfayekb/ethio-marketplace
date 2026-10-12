# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38231198707 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38231198707
- Commit: `b66a35451f8c7028636d2832d770ca993352657f`
- Attempt: 1
- Written (UTC): 2026-10-12T10:09:04.135Z
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-h<n>ov<n>: e<n>e_par_<n>oq<n>py → e<n>e_chi_fughv<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vn<n>yj: e<n>e_par_ze<n>qrd → e<n>e_chi_vo<n>fl<n>` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-h<n>ov<n>: e<n>e_par_<n>oq<n>py → e<n>e_chi_fughv<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vn<n>yj: e<n>e_par_ze<n>qrd → e<n>e_chi_vo<n>fl<n> ×1

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
| smoke | 2026-10-12T09:39:58.151Z | 18.0 min |
| email | 2026-10-12T09:39:59.294Z | 0.3 min |
| shard 1 | 2026-10-12T09:39:57.366Z | 22.8 min |
| shard 2 | 2026-10-12T09:40:06.658Z | 26.0 min |
| shard 3 | 2026-10-12T09:40:04.525Z | 26.2 min |
| shard 4 | 2026-10-12T09:39:53.621Z | 27.6 min |
| shard 5 | 2026-10-12T09:40:03.595Z | 27.6 min |
| shard 6 | 2026-10-12T09:43:38.422Z | 20.0 min |
| shard 7 | 2026-10-12T09:39:44.964Z | 24.1 min |
| shard 8 | 2026-10-12T09:43:34.425Z | 25.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 27.4 min | shard 4, shard 8 |
| `admin-listings.spec.ts` | 54 | 23.2 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 66 | 22.1 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 20.4 min | smoke, shard 4, shard 8 |
| `admin-screening.spec.ts` | 34 | 16.7 min | shard 2, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 16.4 min | shard 1, shard 5 |
| `post-wizard-category.spec.ts` | 46 | 15.1 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 15.0 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 14.9 min | shard 3, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 4, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 13.6 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 12.0 min | shard 1, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.9 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.7 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 52 | 10.3 min | shard 4, shard 8 |
| `admin-attributes-links.spec.ts` | 32 | 10.1 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 8.8 min | shard 2, shard 6 |
| `admin-locations.spec.ts` | 38 | 8.7 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 8.4 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.3 min | shard 4, shard 8 |
| `feed-screens.spec.ts` | 28 | 7.9 min | shard 3, shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 7.5 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.7 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 6.5 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 6.3 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.2 min | shard 3, shard 7 |
| `feed-index.spec.ts` | 28 | 5.7 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 5.6 min | shard 4, shard 8 |
| `import-security.spec.ts` | 34 | 5.4 min | shard 3, shard 7 |
| `admin-audit.spec.ts` | 14 | 5.2 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 4.1 min | shard 2, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.8 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.4 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.1 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.0 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.3 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 3, shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 4, shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 71.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 67.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 64.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 51.4 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 49.5 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 49.2 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 46.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 45.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 45.3 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 43.6 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 43.6 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | mobile-360 | 43.3 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 42.4 s |
| `admin-listings.spec.ts` › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found | mobile-360 | 42.4 s |
| `post-wizard-category.spec.ts` › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) | mobile-360 | 42.4 s |
