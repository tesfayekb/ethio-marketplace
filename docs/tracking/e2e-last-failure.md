# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39021755441
- Commit: `fa93d2a2beb4179241a49e19b56d906779cfc045`
- Attempt: 1
- Written (UTC): 2026-10-17T10:17:57.990Z
- Passed: 1834 · Skipped: 126 · Failed: 14
- Gating failures: 14 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dw<n>zy: e<n>e_par_t<n>l<n>h → e<n>e_chi_<n>la<n>fs` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hawn<n>n: e<n>e_par_cbcwh<n> → e<n>e_chi_f<n>dc<n>` (quiet) | 1 | shard 1 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dw<n>zy: e<n>e_par_t<n>l<n>h → e<n>e_chi_<n>la<n>fs ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hawn<n>n: e<n>e_par_cbcwh<n> → e<n>e_chi_f<n>dc<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · location row is present on Marketplace and absent on Account ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-101 a phone number in a free-text answer is refused at its field ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-14 the feed card links to the ad's page ×1 · AP-8 every ad has a well-formed id of its own ×1

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
| smoke | 2026-10-17T09:39:46.280Z | 15.1 min |
| email | 2026-10-17T09:39:47.370Z | 0.2 min |
| shard 1 | 2026-10-17T09:39:39.499Z | 33.4 min |
| shard 2 | 2026-10-17T09:39:48.371Z | 36.1 min |
| shard 3 | 2026-10-17T09:39:55.158Z | 36.3 min |
| shard 4 | 2026-10-17T09:39:50.985Z | 37.8 min |
| shard 5 | 2026-10-17T09:39:42.762Z | 34.2 min |
| shard 6 | 2026-10-17T09:39:45.731Z | 27.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 23.1 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 21.8 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 18.6 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 18.2 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.3 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.5 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 12.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 12.0 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.9 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.4 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.3 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.2 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 9.6 min | smoke, shard 2, shard 5 |
| `ad-page.spec.ts` | 18 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.7 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 7.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 7.8 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.3 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 6.9 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.1 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.5 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 5.4 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 2.8 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 5 |
| `admin-coverage.spec.ts` | 16 | 1.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | desktop-1280 | 132.6 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | mobile-360 | 125.8 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 88.9 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 73.7 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 61.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 56.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 52.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 49.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 48.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 45.2 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | desktop-1280 | 44.4 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 43.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 43.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39021755441-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39021755441-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39021755441-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39021755441-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39021755441-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39021755441-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39021755441-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39021755441-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  203 |       const counted = await response;
  204 |       expect(counted.status()).toBe(200);
> 205 |       return counted.json();
      |                      ^
  206 |     }
  207 |     async function views() {
  208 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:205:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:215:12
```

Context:

```text
          - listitem [ref=e275]:
            - generic [ref=e276]: About
          - listitem [ref=e277]:
            - generic [ref=e278]: How it works
      - navigation "Help" [ref=e279]:
        - heading "Help" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Safety
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Terms
          - listitem [ref=e291]:
            - generic [ref=e292]: Privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  991 |         "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only),unit_am",
  992 |       );
> 993 |       expect(links.slice(1).split("\r\n")[0]).toBe(
      |                                               ^
  994 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  995 |       );
  996 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:993:47
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  1224 |       const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
  1225 |       const lines = links.slice(1).split("\r\n").filter(Boolean);
> 1226 |       expect(lines[0]).toBe(
       |                        ^
  1227 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  1228 |       );
  1229 |       // ONLY the subtree: every data row's category_slug is parent or child.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1226:24
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: How it works
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
          - listitem [ref=e377]:
            - generic [ref=e378]: Contact
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Terms
          - listitem [ref=e384]:
            - generic [ref=e385]: Privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-62 the export did not echo the order: e2e-cat-cond-zakywu,e2e-cat-cond-zakywu,e2e_attr_ljr9lz,false,false,,e2e-cat-cond-zakywu,,,e2e_attr_7trvlk=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-zakywu,e2e-cat-cond-zakywu,e2e_attr_ljr9lz,false,false,,e2e-cat-cond-zakywu,,,e2e_attr_7trvlk=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-zakywu,e2e-cat-cond-zakywu,e2e_attr_ljr9lz,false,false,,e2e-cat-cond-zakywu,,,e2e_attr_7trvlk=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-zakywu,e2e-cat-cond-zakywu,e2e_attr_ljr9lz,false,false,,e2e-cat-cond-zakywu,,,e2e_attr_7trvlk=pickup,7,"

  1097 |         `${parentKey}=pickup`,
  1098 |       );
> 1099 |       expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);
       |                                                                                ^
  1100 |
  1101 |       // AND THE ROUND TRIP IS A NO-OP (IE-2b).
  1102 |       const preview = await importPost(page, token, { mode: "preview", links });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1099:80
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

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

  1955 |     // D171 — no sideways scroll, the two photos on one row.
  1956 |     await expectNoHorizontalOverflow(page);
> 1957 |     await expect
       |     ^
  1958 |       .poll(() =>
  1959 |         items.evaluateAll((nodes) =>
  1960 |           nodes.every((n) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1957:5
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 10615 ms | category and specifications seeded @ 11633 ms | step 3 reached @ 14800 ms | specifications answered @ 15198 ms | step 6 open @ 21967 ms | tree served @ 22605 ms | place chosen @ 22887 ms | review open @ 28111 ms | review labels read @ 28150 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_ya1qaf_select"]')
Expected: "e2e_post_3_1_ya1qaf_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_ya1qaf_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_3_1_ya1qaf_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_3_1_ya1qaf selecte2e_post_3_1_ya1qaf_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_3_1_ya1qaf_select">e2e_post_3_1_ya1qaf_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_3_1_ya1qaf_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 10615 ms | category and specifications seeded @ 11633 ms | step 3 reached @ 14800 ms | specifications answered @ 15198 ms | step 6 open @ 21967 ms | tree served @ 22605 ms | place chosen @ 22887 ms | review open @ 28111 ms | review labels read @ 28150 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_ya1qaf_select"]')

--- further error 1 ---
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 10615 ms | category and specifications seeded @ 11633 ms | step 3 reached @ 14800 ms | specifications answered @ 15198 ms | step 6 open @ 21967 ms | tree served @ 22605 ms | place chosen @ 22887 ms | review open @ 28111 ms | review labels read @ 28150 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_ya1qaf_select"]')
Expected: "e2e_post_3_1_ya1qaf_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_ya1qaf_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_3_1_ya1qaf_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_3_1_ya1qaf selecte2e_post_3_1_ya1qaf_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_3_1_ya1qaf_select">e2e_post_3_1_ya1qaf_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_3_1_ya1qaf_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 10615 ms | category and specifications seeded @ 11633 ms | step 3 reached @ 14800 ms | specifications answered @ 15198 ms | step 6 open @ 21967 ms | tree served @ 22605 ms | place chosen @ 22887 ms | review open @ 28111 ms | review labels read @ 28150 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_ya1qaf_select"]')


  825 |       buyer.locator(`[data-key="${spec.select.attrKey}"]`),
  826 |       why("PW-30: the buyer preview never rendered the select option's label"),
> 827 |     ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 20 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  837 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
  838 |     // INC-682: the failed send is proven by the aborted poll above; the app's own retry clears the notice at once (INC-679), so its visibility is a race, not a behaviour.
> 839 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
      |                                                   ^
  840 |     // INC-679: the hook's successful retry clears the transport block before Back.
  841 |     await expect(page.getByTestId("post-next-unreachable")).toBeHidden();
  842 |     await toSpecs("back");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:839:51
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 20 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  203 |       const counted = await response;
  204 |       expect(counted.status()).toBe(200);
> 205 |       return counted.json();
      |                      ^
  206 |     }
  207 |     async function views() {
  208 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:205:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:215:12
```

Context:

```text
          - listitem [ref=e276]:
            - generic [ref=e277]: About
          - listitem [ref=e278]:
            - generic [ref=e279]: How it works
      - navigation "Help" [ref=e280]:
        - heading "Help" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Safety
          - listitem [ref=e285]:
            - generic [ref=e286]: Contact
      - navigation "Legal" [ref=e287]:
        - heading "Legal" [level=2] [ref=e288]
        - list [ref=e289]:
          - listitem [ref=e290]:
            - generic [ref=e291]: Terms
          - listitem [ref=e292]:
            - generic [ref=e293]: Privacy
    - paragraph [ref=e295]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  991 |         "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only),unit_am",
  992 |       );
> 993 |       expect(links.slice(1).split("\r\n")[0]).toBe(
      |                                               ^
  994 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  995 |       );
  996 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:993:47
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  1224 |       const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
  1225 |       const lines = links.slice(1).split("\r\n").filter(Boolean);
> 1226 |       expect(lines[0]).toBe(
       |                        ^
  1227 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  1228 |       );
  1229 |       // ONLY the subtree: every data row's category_slug is parent or child.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1226:24
```

Context:

```text
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: How it works
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Legal" [ref=e404]:
        - heading "Legal" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Terms
          - listitem [ref=e409]:
            - generic [ref=e410]: Privacy
    - paragraph [ref=e412]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-62 the export did not echo the order: e2e-cat-cond-0nky0g,e2e-cat-cond-0nky0g,e2e_attr_cnb9lh,false,false,,e2e-cat-cond-0nky0g,,,e2e_attr_x2rdil=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-0nky0g,e2e-cat-cond-0nky0g,e2e_attr_cnb9lh,false,false,,e2e-cat-cond-0nky0g,,,e2e_attr_x2rdil=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-0nky0g,e2e-cat-cond-0nky0g,e2e_attr_cnb9lh,false,false,,e2e-cat-cond-0nky0g,,,e2e_attr_x2rdil=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-0nky0g,e2e-cat-cond-0nky0g,e2e_attr_cnb9lh,false,false,,e2e-cat-cond-0nky0g,,,e2e_attr_x2rdil=pickup,7,"

  1097 |         `${parentKey}=pickup`,
  1098 |       );
> 1099 |       expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);
       |                                                                                ^
  1100 |
  1101 |       // AND THE ROUND TRIP IS A NO-OP (IE-2b).
  1102 |       const preview = await importPost(page, token, { mode: "preview", links });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1099:80
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

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

  1955 |     // D171 — no sideways scroll, the two photos on one row.
  1956 |     await expectNoHorizontalOverflow(page);
> 1957 |     await expect
       |     ^
  1958 |       .poll(() =>
  1959 |         items.evaluateAll((nodes) =>
  1960 |           nodes.every((n) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1957:5
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7041 ms | category and specifications seeded @ 8619 ms | step 3 reached @ 10430 ms | specifications answered @ 10656 ms | step 6 open @ 14452 ms | tree served @ 15106 ms | place chosen @ 15317 ms | review open @ 19555 ms | review labels read @ 19591 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_f9agl2_select"]')
Expected: "e2e_post_6_1_f9agl2_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_f9agl2_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_6_1_f9agl2_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_6_1_f9agl2 selecte2e_post_6_1_f9agl2_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_6_1_f9agl2_select">e2e_post_6_1_f9agl2_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_6_1_f9agl2_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7041 ms | category and specifications seeded @ 8619 ms | step 3 reached @ 10430 ms | specifications answered @ 10656 ms | step 6 open @ 14452 ms | tree served @ 15106 ms | place chosen @ 15317 ms | review open @ 19555 ms | review labels read @ 19591 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_f9agl2_select"]')

--- further error 1 ---
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7041 ms | category and specifications seeded @ 8619 ms | step 3 reached @ 10430 ms | specifications answered @ 10656 ms | step 6 open @ 14452 ms | tree served @ 15106 ms | place chosen @ 15317 ms | review open @ 19555 ms | review labels read @ 19591 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_f9agl2_select"]')
Expected: "e2e_post_6_1_f9agl2_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_f9agl2_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_6_1_f9agl2_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_6_1_f9agl2 selecte2e_post_6_1_f9agl2_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_6_1_f9agl2_select">e2e_post_6_1_f9agl2_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_6_1_f9agl2_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7041 ms | category and specifications seeded @ 8619 ms | step 3 reached @ 10430 ms | specifications answered @ 10656 ms | step 6 open @ 14452 ms | tree served @ 15106 ms | place chosen @ 15317 ms | review open @ 19555 ms | review labels read @ 19591 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_f9agl2_select"]')


  825 |       buyer.locator(`[data-key="${spec.select.attrKey}"]`),
  826 |       why("PW-30: the buyer preview never rendered the select option's label"),
> 827 |     ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 20 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')


  837 |     await expect.poll(() => aborted, { timeout: 20_000 }).toBe(true);
  838 |     // INC-682: the failed send is proven by the aborted poll above; the app's own retry clears the notice at once (INC-679), so its visibility is a race, not a behaviour.
> 839 |     await expect(page.getByTestId("post-step-4")).toBeVisible();
      |                                                   ^
  840 |     // INC-679: the hook's successful retry clears the transport block before Back.
  841 |     await expect(page.getByTestId("post-next-unreachable")).toBeHidden();
  842 |     await toSpecs("back");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:839:51
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 20 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-8-hawn3n: e2e_par_cbcwh5 → e2e_chi_f00dc0
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: net::ERR_NAME_NOT_RESOLVED
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-9-dw99zy: e2e_par_t8l61h → e2e_chi_0la3fs
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
