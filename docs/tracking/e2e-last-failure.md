# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39087833217
- Commit: `795a18435cf0abf33e0f008e4be375333d7ee668`
- Attempt: 1
- Written (UTC): 2026-10-18T02:56:13.472Z
- Passed: 1908 · Skipped: 129 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

[country-dump] at /admin/countries: section false, loading false, error false, step-up false
[country-dump] main: Checking your access…
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

[country-dump] at /admin/countries: section false, loading false, error false, step-up false
[country-dump] main: Checking your access…

   at helpers/countries.ts:180

  178 |   } catch (error) {
  179 |     const reason = error instanceof Error ? error.message : String(error);
> 180 |     throw new Error(`${reason}\n${await rosterDump(page)}`);
      |           ^
```

Context:

```text
          - listitem [ref=e1132]:
            - generic [ref=e1133]: About
          - listitem [ref=e1134]:
            - generic [ref=e1135]: How it works
      - navigation "Help" [ref=e1136]:
        - heading "Help" [level=2] [ref=e1137]
        - list [ref=e1138]:
          - listitem [ref=e1139]:
            - generic [ref=e1140]: Safety
          - listitem [ref=e1141]:
            - generic [ref=e1142]: Contact
      - navigation "Legal" [ref=e1143]:
        - heading "Legal" [level=2] [ref=e1144]
        - list [ref=e1145]:
          - listitem [ref=e1146]:
            - generic [ref=e1147]: Terms
          - listitem [ref=e1148]:
            - generic [ref=e1149]: Privacy
    - paragraph [ref=e1151]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qn<n>l<n>g: e<n>e_par_j<n>cyo → e<n>e_chi_ez<n>wn` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wfx<n>ji: e<n>e_par_x<n>okwj → e<n>e_chi_nbwxnp` (quiet) | 1 | shard 4 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qn<n>l<n>g: e<n>e_par_j<n>cyo → e<n>e_chi_ez<n>wn ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wfx<n>ji: e<n>e_par_x<n>okwj → e<n>e_chi_nbwxnp ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): admin tables never overflow horizontally ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-14 the feed card links to the ad's page ×1 · AP-20 the reveal by public id: the owner gets his channels with no row; a buyer  ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T02:10:25.606Z | 17.2 min |
| email | 2026-10-18T02:10:26.765Z | 0.3 min |
| shard 1 | 2026-10-18T02:10:20.364Z | 40.3 min |
| shard 2 | 2026-10-18T02:10:22.371Z | 38.3 min |
| shard 3 | 2026-10-18T02:10:28.188Z | 30.5 min |
| shard 4 | 2026-10-18T02:10:26.965Z | 45.4 min |
| shard 5 | 2026-10-18T02:10:30.400Z | 41.7 min |
| shard 6 | 2026-10-18T02:10:21.625Z | 34.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 24.5 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 58 | 23.0 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 22.6 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.9 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 17.6 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.4 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 14.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 14.7 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 13.4 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.3 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 13.0 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 12.1 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.9 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 11.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.6 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.4 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.5 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 10.2 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.4 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.0 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.3 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.1 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.9 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.3 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.2 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 116.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 86.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 74.3 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 65.4 s |
| `ad-page.spec.ts` › AP-44 nothing covers the top bars | desktop-1280 | 58.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 57.5 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | desktop-1280 | 55.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 52.6 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | mobile-360 | 52.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 50.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 50.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.1 s |
| `my-listings-page.spec.ts` › MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181) | mobile-360 | 48.8 s |
| `admin-countries.spec.ts` › CO-5 profile round trip: units, currency and order are saved and read back | mobile-360 | 47.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39087833217-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39087833217-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39087833217-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39087833217-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39087833217-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39087833217-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39087833217-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39087833217-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-44 nothing covers the top bars

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1231 |     // Scroll until the map's box is under the shell's band (the map's top above the band's bottom).
  1232 |     await page.getByTestId("listing-detail-map").scrollIntoViewIfNeeded();
> 1233 |     await expect
       |     ^
  1234 |       .poll(async () => {
  1235 |         await page.mouse.wheel(0, 120);
  1236 |         const map = await box("listing-detail-map");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1233:5
```

Context:

```text
          - listitem [ref=e355]:
            - generic [ref=e356]: About
          - listitem [ref=e357]:
            - generic [ref=e358]: How it works
      - navigation "Help" [ref=e359]:
        - heading "Help" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: Safety
          - listitem [ref=e364]:
            - generic [ref=e365]: Contact
      - navigation "Legal" [ref=e366]:
        - heading "Legal" [level=2] [ref=e367]
        - list [ref=e368]:
          - listitem [ref=e369]:
            - generic [ref=e370]: Terms
          - listitem [ref=e371]:
            - generic [ref=e372]: Privacy
    - paragraph [ref=e374]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-3-wfx7ji: e2e_par_x3okwj → e2e_chi_nbwxnp
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
