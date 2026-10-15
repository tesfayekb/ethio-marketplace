# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38665855871 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38665855871
- Commit: `86c2d6e8c4004e746a30f4a5e9dfa196f7a4a339`
- Attempt: 1
- Written (UTC): 2026-10-15T02:08:50.361Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

118 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 14 | shard 1, shard 2, shard 4, shard 5, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `preview_failed permission denied` (quiet) | 6 | shard 1, shard 4, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `commit_failed step-up required: no verified factor` (quiet) | 4 | shard 1, shard 4, changed |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-or<n>z: e<n>e_par_tjj<n>d<n> → e<n>e_chi_wc<n>tmv` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>gd<n>: e<n>e_par_yj<n>jgp → e<n>e_chi_ngcfwp` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×14 · too many previews ×10 · categories badHeader ×6 · categories wrongFile ×6 · preview_failed permission denied ×6 · category-images: no GEMINI_API_KEY — fake mode ×5 · commit_failed step-up required: no verified factor ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-or<n>z: e<n>e_par_tjj<n>d<n> → e<n>e_chi_wc<n>tmv ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>gd<n>: e<n>e_par_yj<n>jgp → e<n>e_chi_ngcfwp ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PR-27 edit_listing counts against the revise dial ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-33 a region alone never lists itself; its city does (W6 R2) ×1

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
| smoke | 2026-10-15T01:31:30.153Z | 17.9 min |
| email | 2026-10-15T01:31:34.978Z | 0.3 min |
| shard 1 | 2026-10-15T01:31:27.820Z | 37.0 min |
| shard 2 | 2026-10-15T01:31:22.958Z | 30.1 min |
| shard 3 | 2026-10-15T01:31:22.983Z | 31.9 min |
| shard 4 | 2026-10-15T01:31:26.519Z | 34.3 min |
| shard 5 | 2026-10-15T01:31:21.590Z | 32.3 min |
| shard 6 | 2026-10-15T01:31:32.121Z | 31.8 min |
| changed | 2026-10-15T01:31:40.346Z | 14.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` | 104 | 31.1 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 25.2 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 58 | 20.4 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 20.2 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 19.7 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 19.1 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 40 | 18.9 min | shard 2, shard 5, changed |
| `post-wizard-bundle2.spec.ts` | 68 | 16.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.4 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 12.1 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.4 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.1 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 9.4 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 44 | 9.4 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 9.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 8.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 20 | 7.0 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.9 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 6.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 5.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 5.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 8 | 3.8 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.7 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.7 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 71.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 63.6 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 62.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 55.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 49.8 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 49.5 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 49.5 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 49.4 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 49.0 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | desktop-1280 | 48.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 46.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 45.3 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 45.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.8 s |
