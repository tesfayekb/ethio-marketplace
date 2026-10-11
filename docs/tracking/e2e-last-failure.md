# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38097283598 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38097283598
- Commit: `e6ef28be4f1f0b28cc0faf097d14d0ac48c3cf9a`
- Attempt: 1
- Written (UTC): 2026-10-11T00:36:25.137Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region — Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"
--- further error 1 ---
Error: [e2e:l4b2] seeding region failed: duplicate key value violates unique constraint "locations_iso_3166_2_unique"

   at helpers/locations.ts:433

  431 |     .single();
  432 |   if (regionError || !region) {
> 433 |     throw new Error(`[e2e:l4b2] seeding region failed: ${regionError?.message ?? "no row"}`);
      |           ^
  434 |   }
  435 |
  436 |   const { data: city, error: cityError } = await supabase
    at seedGuessFixture (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:433:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2485:21
```

Context: context file not found for `shell-L4b-location-picker-LS-7-a-region-code-alone-selects-the-region-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>lwaw: e<n>e_par_ndukn<n> → e<n>e_chi_e<n>f` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tmyll<n>: e<n>e_par_<n>lvhti → e<n>e_chi_<n>k<n>xi<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>lwaw: e<n>e_par_ndukn<n> → e<n>e_chi_e<n>f ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tmyll<n>: e<n>e_par_<n>lvhti → e<n>e_chi_<n>k<n>xi<n> ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-11T00:07:25.791Z | 14.8 min |
| email | 2026-10-11T00:07:32.719Z | 0.3 min |
| shard 1 | 2026-10-11T00:07:29.456Z | 28.7 min |
| shard 2 | 2026-10-11T00:07:26.013Z | 22.1 min |
| shard 3 | 2026-10-11T00:07:31.115Z | 23.6 min |
| shard 4 | 2026-10-11T00:07:25.652Z | 27.6 min |
| shard 5 | 2026-10-11T00:07:30.160Z | 24.7 min |
| shard 6 | 2026-10-11T00:07:38.785Z | 23.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 22.6 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.3 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 16.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 12.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 11.4 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 10.6 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.6 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 9.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.7 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.7 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 7.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.4 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 30 | 6.9 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 6.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.7 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.9 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.4 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.8 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 53.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 45.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 44.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 38.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 37.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 37.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.7 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 37.6 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 37.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.9 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 36.8 s |
