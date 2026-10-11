# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38140549121 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38140549121
- Commit: `88c6ed8cc56b99fc6ad762962a2532e4ada0239a`
- Attempt: 2
- Written (UTC): 2026-10-11T14:15:12.975Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 6 |
| `listing not found` | 8 | shard 3, shard 4, shard 7, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fkndae: e<n>e_par_yy<n>cm → e<n>e_chi_<n>rpcr<n>` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-npen<n>x: e<n>e_par_<n>lufqc → e<n>e_chi_g<n>blmt` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-fkndae: e<n>e_par_yy<n>cm → e<n>e_chi_<n>rpcr<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-npen<n>x: e<n>e_par_<n>lufqc → e<n>e_chi_g<n>blmt ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 4, shard 7, shard 8

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
| smoke | 2026-10-11T13:45:03.811Z | 19.2 min |
| email | 2026-10-11T13:45:01.953Z | 0.3 min |
| shard 1 | 2026-10-11T13:45:00.213Z | 28.8 min |
| shard 2 | 2026-10-11T13:44:59.748Z | 26.7 min |
| shard 3 | 2026-10-11T13:44:55.408Z | 25.1 min |
| shard 4 | 2026-10-11T13:44:50.531Z | 27.5 min |
| shard 5 | 2026-10-11T13:44:52.974Z | 26.0 min |
| shard 6 | 2026-10-11T13:44:51.361Z | 23.1 min |
| shard 7 | 2026-10-11T13:44:59.914Z | 26.1 min |
| shard 8 | 2026-10-11T13:45:00.824Z | 29.8 min |
| changed | 2026-10-11T13:45:00.927Z | 12.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 72 | 37.4 min | shard 1, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 30.5 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 26.3 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.0 min | smoke, shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 50 | 18.2 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 17.9 min | shard 3, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 17.3 min | shard 4, shard 8 |
| `admin-screening.spec.ts` | 30 | 17.0 min | shard 2, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 16.8 min | shard 3, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 48 | 14.9 min | shard 1, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 14.1 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 13.3 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.9 min | smoke, shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.8 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 10.7 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.3 min | shard 4, shard 8 |
| `admin-locations.spec.ts` | 38 | 9.4 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.2 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 9.2 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 8.9 min | shard 3, shard 7 |
| `feed-index.spec.ts` | 28 | 8.7 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.6 min | shard 4, shard 8 |
| `admin-users.spec.ts` | 26 | 8.4 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 40 | 8.2 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.7 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 6.5 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 5.8 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 12 | 4.7 min | shard 1, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.3 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.3 min | shard 4, shard 8 |
| `admin-shell.spec.ts` | 10 | 3.5 min | shard 2, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 3.5 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.9 min | shard 3, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 2.9 min | shard 3, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 4, shard 8 |
| `admin-coverage.spec.ts` | 14 | 2.0 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 3, shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 6 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 70.3 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 67.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 67.1 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 66.4 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 64.2 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | mobile-360 | 63.5 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 61.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 61.2 s |
| `admin-listings.spec.ts` › AL-9 Send back to review; the seller reads their own notices and no one else's | mobile-360 | 58.7 s |
| `admin-listings.spec.ts` › AL-9 Send back to review; the seller reads their own notices and no one else's | desktop-1280 | 58.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 57.1 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 55.8 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 55.3 s |
| `admin-listings.spec.ts` › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only | mobile-360 | 53.1 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 52.8 s |
