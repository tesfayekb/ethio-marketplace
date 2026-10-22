# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39828229581 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39828229581
- Commit: `a413f9522d12ff20bd803a26db42e58620db1354`
- Attempt: 1
- Written (UTC): 2026-10-22T22:51:09.764Z
- Post-test warnings: 6
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

261 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 162 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `listing not found` | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>tlxlb: e<n>e_par_pe<n>dfi → e<n>e_chi_mo<n>i<n>q` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-bxha<n>h: e<n>e_par_q<n>t<n>d → e<n>e_chi_<n>bmsxh` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>tlxlb: e<n>e_par_pe<n>dfi → e<n>e_chi_mo<n>i<n>q ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-bxha<n>h: e<n>e_par_q<n>t<n>d → e<n>e_chi_<n>bmsxh ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 162 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-40 an address never reveals: only the visitor's own tap does (D201 §14) ×6 · AP-41 the page's remaining lines ×6 · MLP-6 My listings on the table blocks: the header, the search, Filters with chip ×6 · MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D ×6 · AS-1 gating: a plain user is refused, a moderator reads the log ×5 · AS-2 filters: an action filter narrows the list ×5

```text
[WebServer] [ssr-error] /api/listings/view HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-22T18:05:40.728Z | 3.5 min |
| full | 2026-10-22T18:09:13.989Z | 281.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 14.2 min | full |
| `admin-listings.spec.ts` | 62 | 11.5 min | full |
| `post-wizard-specs.spec.ts` | 82 | 11.4 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 10.9 min | full |
| `ad-page.spec.ts` | 68 | 10.9 min | full |
| `admin-screening.spec.ts` | 52 | 10.2 min | full |
| `shell.spec.ts` | 212 | 10.0 min | full |
| `posting-routes.spec.ts` | 80 | 8.4 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 8.1 min | full |
| `my-listings-ad.spec.ts` | 36 | 7.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 7.4 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 7.2 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.2 min | full |
| `admin-translations-governance.spec.ts` | 20 | 6.5 min | full |
| `legal-certify.spec.ts` | 40 | 6.4 min | full |
| `post-wizard-category.spec.ts` | 48 | 6.3 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.3 min | full |
| `feed-screens.spec.ts` | 36 | 6.0 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.9 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.9 min | full |
| `post-wizard-resets.spec.ts` | 34 | 5.9 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | full |
| `admin-locations.spec.ts` | 38 | 5.6 min | full |
| `admin-users.spec.ts` | 28 | 5.4 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 5.1 min | full |
| `viewing-place.spec.ts` | 22 | 5.1 min | full |
| `my-listings-doors.spec.ts` | 28 | 5.0 min | full |
| `admin-roles.spec.ts` | 26 | 5.0 min | full |
| `ad-page-doors.spec.ts` | 30 | 4.9 min | full |
| `import-security.spec.ts` | 36 | 4.0 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.9 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.8 min | full |
| `legal-admin.spec.ts` | 40 | 3.6 min | full |
| `my-listings-page.spec.ts` | 16 | 3.5 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `legal-doors.spec.ts` | 34 | 3.4 min | full |
| `auth-signout.spec.ts` | 28 | 3.3 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.7 min | full |
| `feed-index.spec.ts` | 30 | 2.6 min | full |
| `admin-countries.spec.ts` | 18 | 2.6 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.5 min | full |
| `admin-audit.spec.ts` | 14 | 2.4 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.2 min | full |
| `feed-route.spec.ts` | 22 | 2.2 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `admin-shell.spec.ts` | 12 | 1.6 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.6 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.0 min | full |
| `legal-accept.spec.ts` | 8 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.8 min | full |
| `phone-frame.spec.ts` | 18 | 0.8 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.7 min | full |
| `legal-history.spec.ts` | 6 | 0.6 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `account-saved.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `admin-services.spec.ts` | 10 | 0.5 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `legal-pages.spec.ts` | 6 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 205.4 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 197.9 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 35.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 35.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 34.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 33.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 32.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 32.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 31.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 31.5 s |
