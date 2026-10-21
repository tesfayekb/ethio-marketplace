# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39556647691 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39556647691
- Commit: `efb378f946cfa0c8be0ca5dcb65108c6185fc452`
- Attempt: 1
- Written (UTC): 2026-10-21T06:52:11.981Z
- Post-test warnings: 42
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (14 of 14 results files read, 14 of 14 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

112 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 15 | shard 1, shard 3, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `listing not found` | 4 | shard 5, shard 6, shard 11 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-gtnfmb: e<n>e_par_<n>cuwt → e<n>e_chi_zt<n>xh<n>` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-vu<n>bbg: e<n>e_par_cswdwo → e<n>e_chi_x<n>j<n>lr` (quiet) | 1 | shard 1 |

Quiet (allowlisted): too many previews ×15 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-gtnfmb: e<n>e_par_<n>cuwt → e<n>e_chi_zt<n>xh<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-vu<n>bbg: e<n>e_par_cswdwo → e<n>e_chi_x<n>j<n>lr ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2 · PW-40 removing the pin clears all four columns ×1 · PW-76 a detail the model pins to one value is filled and hidden, and still revie ×1

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T06:40:34.293Z | 10.7 min |
| email | 2026-10-21T06:41:22.124Z | 0.3 min |
| shard 1 | 2026-10-21T06:41:12.963Z | 9.2 min |
| shard 2 | 2026-10-21T06:40:54.480Z | 10.0 min |
| shard 3 | 2026-10-21T06:41:23.236Z | 4.8 min |
| shard 4 | 2026-10-21T06:41:13.906Z | 6.6 min |
| shard 5 | 2026-10-21T06:41:04.211Z | 5.5 min |
| shard 6 | 2026-10-21T06:40:52.766Z | 5.3 min |
| shard 7 | 2026-10-21T06:41:25.720Z | 9.8 min |
| shard 8 | 2026-10-21T06:41:26.173Z | 10.3 min |
| shard 9 | 2026-10-21T06:40:56.699Z | 6.7 min |
| shard 10 | 2026-10-21T06:40:51.114Z | 6.9 min |
| shard 11 | 2026-10-21T06:41:36.544Z | 7.6 min |
| shard 12 | 2026-10-21T06:41:05.151Z | 4.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.2 min | smoke, shard 6, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 7.0 min | shard 4, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 6.3 min | shard 1, shard 7 |
| `admin-locations.spec.ts` | 38 | 5.3 min | shard 2, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 5.0 min | shard 5, shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 5, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.8 min | shard 2, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 1, shard 7 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 3, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 2, shard 8 |
| `admin-roles.spec.ts` | 26 | 4.7 min | shard 2, shard 8 |
| `photo-pipeline.spec.ts` | 66 | 4.6 min | shard 4, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 1, shard 7 |
| `auth-signout.spec.ts` | 56 | 4.3 min | smoke, shard 3, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.2 min | shard 1, shard 8 |
| `admin-users.spec.ts` | 28 | 4.1 min | shard 2, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 4.1 min | shard 1, shard 7 |
| `admin-listings.spec.ts` | 62 | 4.1 min | shard 2, shard 8 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 6, shard 12 |
| `my-listings-ad.spec.ts` | 36 | 3.9 min | shard 4, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 5, shard 11 |
| `ad-page.spec.ts` | 68 | 3.7 min | shard 1, shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 5, shard 11 |
| `post-wizard-category.spec.ts` | 48 | 3.3 min | shard 4, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 5, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.8 min | shard 1, shard 7 |
| `admin-countries.spec.ts` | 18 | 2.7 min | shard 2, shard 8 |
| `import-security.spec.ts` | 36 | 2.6 min | shard 3, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 7 |
| `legal-certify.spec.ts` | 40 | 2.0 min | shard 3, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 1, shard 8 |
| `legal-admin.spec.ts` | 30 | 1.8 min | shard 3, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | shard 4, shard 10 |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.6 min | shard 1, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `admin-coverage.spec.ts` | 16 | 1.0 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 4, shard 10 |
| `legal-doors.spec.ts` | 32 | 0.8 min | shard 4, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 1, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 4, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `legal-accept.spec.ts` | 8 | 0.5 min | shard 3, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 6, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 9 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 2, shard 8 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 4, shard 10 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3, shard 9 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 6, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `auth-signup.spec.ts` | 4 | 0.2 min | email |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 5, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.5 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 26.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 26.5 s |
