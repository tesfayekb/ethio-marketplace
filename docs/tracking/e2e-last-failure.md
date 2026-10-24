# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40079535915 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40079535915
- Commit: `79f002d6f3896f588bc2767d849f43c0c2d93025`
- Attempt: 1
- Written (UTC): 2026-10-24T09:07:05.844Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

109 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 17 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `listing not found` | 4 | shard 7, shard 15 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 2, shard 10 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 6, shard 14 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>btvrh: e<n>e_par_w<n>mnvt → e<n>e_chi_<n>kpz<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-up<n>xtj: e<n>e_par_<n>s<n>bvh → e<n>e_chi_buctpw` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×17 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>btvrh: e<n>e_par_w<n>mnvt → e<n>e_chi_<n>kpz<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-up<n>xtj: e<n>e_par_<n>s<n>bvh → e<n>e_chi_buctpw ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 7, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-24T08:52:24.104Z | 12.0 min |
| email | 2026-10-24T08:51:52.650Z | 0.3 min |
| shard 1 | 2026-10-24T08:54:42.448Z | 11.1 min |
| shard 2 | 2026-10-24T08:53:25.293Z | 11.6 min |
| shard 3 | 2026-10-24T08:52:05.472Z | 13.4 min |
| shard 4 | 2026-10-24T08:51:50.878Z | 5.8 min |
| shard 5 | 2026-10-24T08:54:34.739Z | 5.5 min |
| shard 6 | 2026-10-24T08:52:12.043Z | 10.1 min |
| shard 7 | 2026-10-24T08:52:06.795Z | 6.5 min |
| shard 8 | 2026-10-24T08:51:50.143Z | 7.0 min |
| shard 9 | 2026-10-24T08:52:13.672Z | 10.0 min |
| shard 10 | 2026-10-24T08:52:23.587Z | 13.8 min |
| shard 11 | 2026-10-24T08:52:15.579Z | 13.2 min |
| shard 12 | 2026-10-24T08:52:36.241Z | 6.8 min |
| shard 13 | 2026-10-24T08:53:49.577Z | 5.4 min |
| shard 14 | 2026-10-24T08:52:28.820Z | 11.0 min |
| shard 15 | 2026-10-24T08:51:42.768Z | 5.5 min |
| shard 16 | 2026-10-24T08:52:25.962Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.1 min | smoke, shard 8, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.8 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 7, shard 15 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.5 min | shard 6, shard 14 |
| `admin-screening.spec.ts` | 52 | 4.4 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.4 min | shard 3, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.3 min | smoke, shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.0 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-listings.spec.ts` | 62 | 3.6 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 68 | 3.2 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 2.8 min | shard 5, shard 13 |
| `my-listings-ad.spec.ts` | 36 | 2.8 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 1, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 7, shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 2.0 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 3, shard 11 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `my-listings-page.spec.ts` | 16 | 0.6 min | shard 5, shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 8, shard 15 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 5, shard 13 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.1 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 27.4 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 24.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 24.6 s |
