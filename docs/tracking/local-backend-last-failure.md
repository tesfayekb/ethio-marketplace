# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39526592327 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39526592327
- Commit: `c23972471f6aa93047db1799e28094dbb80d381f`
- Attempt: 1
- Written (UTC): 2026-10-21T01:39:00.115Z
- Post-test warnings: 39
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (13 of 13 results files read, 13 of 13 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

114 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 16 | shard 1, shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 5 | shard 5, shard 6, shard 11 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 7, shard 8 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 8 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 9 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 9 |
| `locations file too large` (quiet) | 2 | shard 3, shard 9 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 5, shard 11 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 9 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>q<n>ob<n>: e<n>e_par_dp<n>b<n>q → e<n>e_chi_<n>eukg<n>` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-irqljt: e<n>e_par_<n>yjjj<n> → e<n>e_chi_d<n>lwx<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): too many previews ×16 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>q<n>ob<n>: e<n>e_par_dp<n>b<n>q → e<n>e_chi_<n>eukg<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-irqljt: e<n>e_par_<n>yjjj<n> → e<n>e_chi_d<n>lwx<n> ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T01:21:37.163Z | 11.9 min |
| shard 1 | 2026-10-21T01:22:00.377Z | 16.5 min |
| shard 2 | 2026-10-21T01:21:40.141Z | 14.8 min |
| shard 3 | 2026-10-21T01:21:52.010Z | 9.6 min |
| shard 4 | 2026-10-21T01:21:35.532Z | 9.2 min |
| shard 5 | 2026-10-21T01:22:26.265Z | 11.0 min |
| shard 6 | 2026-10-21T01:21:43.877Z | 8.5 min |
| shard 7 | 2026-10-21T01:21:41.237Z | 14.1 min |
| shard 8 | 2026-10-21T01:21:21.515Z | 15.7 min |
| shard 9 | 2026-10-21T01:22:25.795Z | 10.8 min |
| shard 10 | 2026-10-21T01:21:37.009Z | 11.5 min |
| shard 11 | 2026-10-21T01:21:53.993Z | 13.2 min |
| shard 12 | 2026-10-21T01:21:43.150Z | 7.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.3 min | smoke, shard 6, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 4, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 5, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 3, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 5, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 1, shard 7 |
| `auth-signout.spec.ts` | 56 | 4.2 min | smoke, shard 3, shard 9 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 8 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 2, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 7 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 6, shard 12 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.8 min | shard 1, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 5, shard 11 |
| `admin-listings.spec.ts` | 62 | 3.5 min | shard 2, shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 5, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 4, shard 10 |
| `photo-pipeline.spec.ts` | 66 | 3.4 min | shard 4, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 7 |
| `ad-page.spec.ts` | 68 | 3.1 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 5, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 7 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 4, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 11 |
| `import-security.spec.ts` | 36 | 2.4 min | shard 3, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | shard 2, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 4, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 7 |
| `legal-admin.spec.ts` | 28 | 1.1 min | shard 3, shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 26 | 1.1 min | shard 3, shard 9 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 8 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.7 min | shard 4, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 7 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 4, shard 10 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 6, shard 12 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3, shard 9 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 8 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 5, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 5, shard 11 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 36.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 25.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.4 s |
