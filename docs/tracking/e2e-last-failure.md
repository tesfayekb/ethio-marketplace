# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 37901886344 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37901886344
- Commit: `b987d837b04de8883b0d44eadfc37a52e9e0a844`
- Attempt: 1
- Written (UTC): 2026-10-09T08:26:41.181Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name — Error: [e2e:b1] listing default/f9572958-7ef5-4fb4-8598-e12060deb88d/87036394-e301-4cb0-87cd-36cbca1d932d failed: Service Unavailable

## Flaky bodies (DEC-078)

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:b1] listing default/f9572958-7ef5-4fb4-8598-e12060deb88d/87036394-e301-4cb0-87cd-36cbca1d932d failed: Service Unavailable
--- further error 1 ---
Error: [e2e:b1] listing default/f9572958-7ef5-4fb4-8598-e12060deb88d/87036394-e301-4cb0-87cd-36cbca1d932d failed: Service Unavailable

   at helpers/photos.ts:257

  255 |     limit: 100,
  256 |   });
> 257 |   if (error) throw new Error(`[e2e:b1] listing ${prefix} failed: ${error.message}`);
      |                    ^
  258 |   const keys: string[] = [];
  259 |   for (const dir of photoDirs ?? []) {
  260 |     const { data: files } = await supabase.storage.from(BUCKET).list(`${prefix}/${dir.name}`, {
    at objectsUnder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/photos.ts:257:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:204:12
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-4-a-variant-over-its-size-dial-is-refused-by-name-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>k<n>v<n>b: e<n>e_par_prdz<n>s → e<n>e_chi_ov<n>nqx` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pwmn<n>b: e<n>e_par_a<n>ckw → e<n>e_chi_<n>qvsmu` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>k<n>v<n>b: e<n>e_par_prdz<n>s → e<n>e_chi_ov<n>nqx ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pwmn<n>b: e<n>e_par_a<n>ckw → e<n>e_chi_<n>qvsmu ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-09T07:57:17.273Z | 14.8 min |
| email | 2026-10-09T07:57:36.074Z | 0.3 min |
| shard 1 | 2026-10-09T07:57:15.330Z | 25.3 min |
| shard 2 | 2026-10-09T07:57:24.489Z | 25.1 min |
| shard 3 | 2026-10-09T07:57:27.577Z | 24.7 min |
| shard 4 | 2026-10-09T07:57:36.251Z | 28.7 min |
| shard 5 | 2026-10-09T07:57:18.945Z | 25.3 min |
| shard 6 | 2026-10-09T07:57:20.647Z | 21.9 min |
| changed | 2026-10-09T07:57:23.663Z | 2.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 25.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 17.9 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.6 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 12.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 12.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 11.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.8 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.8 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 10.0 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.1 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.2 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 8.0 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.5 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.3 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 36 | 6.9 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.9 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 20 | 6.8 min | shard 1, shard 4, changed |
| `admin-translations-console.spec.ts` | 38 | 5.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 5.0 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.5 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 3.3 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.8 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
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
| `photo-pipeline.spec.ts` › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only | mobile-360 | 69.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 51.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.8 s |
| `photo-pipeline.spec.ts` › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only | desktop-1280 | 48.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 47.5 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 46.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 44.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 44.3 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 44.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.9 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 43.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.1 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 43.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 42.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 40.8 s |
