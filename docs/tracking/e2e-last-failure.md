# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39526592355 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39526592355
- Commit: `c23972471f6aa93047db1799e28094dbb80d381f`
- Attempt: 1
- Written (UTC): 2026-10-21T02:13:57.656Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-laq<n>uv: e<n>e_par_d<n>tm<n>m → e<n>e_chi_ujv<n>ww` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ot<n>d<n>m: e<n>e_par_tdno<n> → e<n>e_chi_btlcxy` (quiet) | 1 | shard 1 |
| `rate limit listing-view:address: Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch() \| at consumeRate (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/user-client-C<n>g<n>-kvl.mjs:<n>:<n>)` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-laq<n>uv: e<n>e_par_d<n>tm<n>m → e<n>e_chi_ujv<n>ww ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ot<n>d<n>m: e<n>e_par_tdno<n> → e<n>e_chi_btlcxy ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-101 a phone number in a free-text answer is refused at its field ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### rate limit listing-view:address: Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch() | at consumeRate (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/user-client-C<n>g<n>-kvl.mjs:<n>:<n>)

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-42 a missing box gives its room to its row ×1 · AT-44 the v2 definition cells commit, export and round-trip unchanged ×1

```text
[WebServer] [ssr-error] /api/listings/view rate limit listing-view:address: Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch() | at consumeRate (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/user-client-C7g3-kvl.mjs:213:23)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T01:20:46.164Z | 21.8 min |
| email | 2026-10-21T01:21:22.140Z | 0.3 min |
| shard 1 | 2026-10-21T01:20:37.111Z | 42.4 min |
| shard 2 | 2026-10-21T01:29:34.718Z | 44.1 min |
| shard 3 | 2026-10-21T01:21:57.134Z | 42.0 min |
| shard 4 | 2026-10-21T01:22:18.094Z | 44.6 min |
| shard 5 | 2026-10-21T01:22:51.804Z | 46.7 min |
| shard 6 | 2026-10-21T01:20:38.586Z | 33.4 min |
| changed | 2026-10-21T01:21:00.853Z | 13.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 136 | 50.1 min | shard 1, shard 4, changed |
| `shell.spec.ts` | 424 | 26.6 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 25.8 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.1 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.1 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 18.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 16.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 16.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.3 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 14.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.5 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 13.2 min | smoke, shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 13.0 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.7 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 36 | 12.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 11.5 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 10.4 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 9.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.9 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 8.9 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 8.2 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 16 | 6.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 28 | 5.4 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.7 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 0.9 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `ad-page.spec.ts` › AP-41 the page's remaining lines | mobile-360 | 52.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 52.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.2 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 47.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 46.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 46.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 45.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 45.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.0 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 44.3 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | mobile-360 | 43.6 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 43.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 43.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 43.0 s |
