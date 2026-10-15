# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38661744866 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38661744866
- Commit: `f195b870afbe0fc501f5f61be77b05c98b5af32a`
- Attempt: 1
- Written (UTC): 2026-10-15T01:22:18.722Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

115 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 14 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mnn<n>k: e<n>e_par_<n>s<n>p<n> → e<n>e_chi_lvypbi` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xbf<n>l<n>: e<n>e_par_q<n>bb<n>l → e<n>e_chi_<n>nknr<n>` (quiet) | 1 | shard 1 |
| `submit_listing: upstream unavailable (<n>)` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mnn<n>k: e<n>e_par_<n>s<n>p<n> → e<n>e_chi_lvypbi ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xbf<n>l<n>: e<n>e_par_q<n>bb<n>l → e<n>e_chi_<n>nknr<n> ×1

Off the allowlist:

### listing not found

- Count: 14 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×4 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · logo cell sits exactly above the rail and beside the top bar ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### submit_listing: upstream unavailable (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-27 edit_listing counts against the revise dial ×1 · PW-154 {country} in a label and its help reads the market's country in English ×1

```text
[WebServer] [ssr-error] /api/listings/draft submit_listing: upstream unavailable (0)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T00:45:50.497Z | 16.5 min |
| email | 2026-10-15T00:45:53.053Z | 0.3 min |
| shard 1 | 2026-10-15T00:45:45.882Z | 32.3 min |
| shard 2 | 2026-10-15T00:45:54.898Z | 35.7 min |
| shard 3 | 2026-10-15T00:45:44.581Z | 26.5 min |
| shard 4 | 2026-10-15T00:45:44.578Z | 30.7 min |
| shard 5 | 2026-10-15T00:45:50.065Z | 36.1 min |
| shard 6 | 2026-10-15T00:45:44.986Z | 27.2 min |
| changed | 2026-10-15T00:45:41.687Z | 9.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 21.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 21.0 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.2 min | smoke, shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 40 | 18.3 min | shard 2, shard 5, changed |
| `post-wizard-pricing.spec.ts` | 50 | 17.3 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.0 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 58 | 16.9 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 12.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.8 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 10.6 min | shard 2, shard 5, changed |
| `my-listings-ad.spec.ts` | 24 | 10.4 min | shard 2, shard 5, changed |
| `auth-signout.spec.ts` | 44 | 9.9 min | smoke, shard 2, shard 5 |
| `admin-screening.spec.ts` | 44 | 9.5 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 9.2 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 26 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 8.7 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 8.6 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.4 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.2 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 5.0 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 3.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 58.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 58.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 52.5 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 51.4 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 49.3 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 49.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 47.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 47.1 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 46.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 46.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 46.3 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 46.0 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 46.0 s |
