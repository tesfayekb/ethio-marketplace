# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39649501608
- Commit: `63242a6baf4de76be3ff4664c1861183335ab1f2`
- Attempt: 1
- Written (UTC): 2026-10-22T00:03:26.840Z
- Passed: 1970 · Skipped: 98 · Failed: 2
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

342 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 243 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-ir<n>dz: e<n>e_par_pi<n>m<n>z → e<n>e_chi_r<n>rwpy` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-u<n>gtrg: e<n>e_par_fv<n>z<n> → e<n>e_chi_<n>xv<n>ad` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-ir<n>dz: e<n>e_par_pi<n>m<n>z → e<n>e_chi_r<n>rwpy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-u<n>gtrg: e<n>e_par_fv<n>z<n> → e<n>e_chi_<n>xv<n>ad ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 243 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): A-5 the Categories group carries its sub-items, expands on a sub-route and gates ×6 · AS-1 gating: a plain user is refused, a moderator reads the log ×6 · AS-2 filters: an action filter narrows the list ×6 · AT-66 the link editor saves and reopens a two-pair condition ×6 · AT-67 catalogue tokens import and are stored unchanged ×6 · AU-2 search and status filter ×6

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
| nightly | 2026-10-21T18:06:07.013Z | 3.6 min |
| full | 2026-10-21T18:09:43.590Z | 353.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 19.5 min | full |
| `post-wizard-specs.spec.ts` | 82 | 15.8 min | full |
| `admin-listings.spec.ts` | 62 | 14.8 min | full |
| `ad-page.spec.ts` | 68 | 14.1 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 14.0 min | full |
| `admin-screening.spec.ts` | 52 | 13.4 min | full |
| `posting-routes.spec.ts` | 80 | 11.2 min | full |
| `shell.spec.ts` | 212 | 11.1 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 11.1 min | full |
| `my-listings-ad.spec.ts` | 36 | 9.5 min | full |
| `post-wizard-place.spec.ts` | 38 | 9.4 min | full |
| `post-wizard-category.spec.ts` | 48 | 9.2 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 8.8 min | full |
| `legal-certify.spec.ts` | 40 | 8.4 min | full |
| `admin-attributes-library.spec.ts` | 42 | 8.4 min | full |
| `post-wizard-resets.spec.ts` | 34 | 8.2 min | full |
| `admin-translations-governance.spec.ts` | 20 | 7.7 min | full |
| `post-wizard-where.spec.ts` | 32 | 7.5 min | full |
| `admin-categories-console.spec.ts` | 34 | 7.0 min | full |
| `admin-attributes-links.spec.ts` | 34 | 6.9 min | full |
| `feed-screens.spec.ts` | 36 | 6.8 min | full |
| `admin-translations-console.spec.ts` | 46 | 6.6 min | full |
| `admin-users.spec.ts` | 28 | 6.5 min | full |
| `admin-locations.spec.ts` | 38 | 6.5 min | full |
| `my-listings-doors.spec.ts` | 28 | 6.3 min | full |
| `ad-page-doors.spec.ts` | 30 | 6.2 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 6.0 min | full |
| `viewing-place.spec.ts` | 22 | 5.7 min | full |
| `admin-roles.spec.ts` | 26 | 5.6 min | full |
| `import-security.spec.ts` | 36 | 5.5 min | full |
| `my-listings-page.spec.ts` | 16 | 4.6 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 4.6 min | full |
| `admin-attributes-import.spec.ts` | 40 | 4.5 min | full |
| `legal-admin.spec.ts` | 36 | 4.1 min | full |
| `auth-signout.spec.ts` | 28 | 4.1 min | full |
| `legal-doors.spec.ts` | 32 | 4.0 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 3.7 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `feed-index.spec.ts` | 30 | 3.4 min | full |
| `admin-countries.spec.ts` | 18 | 3.0 min | full |
| `admin-audit.spec.ts` | 14 | 2.9 min | full |
| `feed-route.spec.ts` | 22 | 2.8 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.6 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | full |
| `admin-shell.spec.ts` | 12 | 2.2 min | full |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | full |
| `posting-routes-dials.spec.ts` | 18 | 2.0 min | full |
| `admin-coverage.spec.ts` | 16 | 1.6 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.4 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `legal-accept.spec.ts` | 8 | 1.1 min | full |
| `phone-frame.spec.ts` | 18 | 1.1 min | full |
| `breadcrumbs.spec.ts` | 6 | 1.1 min | full |
| `posting-routes-identity.spec.ts` | 4 | 1.0 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.8 min | full |
| `legal-history.spec.ts` | 6 | 0.8 min | full |
| `category-image-routes.spec.ts` | 10 | 0.7 min | full |
| `account-saved.spec.ts` | 4 | 0.7 min | full |
| `admin-services.spec.ts` | 10 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.6 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | full |
| `rbac.spec.ts` | 6 | 0.5 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.3 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.3 min | full |
| `legal-pages.spec.ts` | 6 | 0.3 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.2 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 249.4 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 206.1 s |
| `post-wizard-category.spec.ts` › PW-4 a photo is prepared on the device, stored stripped, and removable | desktop-1280 | 52.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 48.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 47.7 s |
| `admin-screening.spec.ts` › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) | mobile-360 | 42.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 41.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 40.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 39.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 36.7 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 36.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 35.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 35.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 35.5 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39649501608-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 76 (pool 2, fresh 74)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 108 user(s) owned by process 39649501608-nightly
```

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `full`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eeeajfumppugrlezibdsivhjnxhykrhfwlcmjpolsykfzdhe","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Eeeajfumppugrlezibdsivhjnxhykrhfwlcmjpolsykfzdhe","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - link "Terms" [ref=e278] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e279]:
            - link "Privacy" [ref=e280] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strings-pseudo-summary')
Expected: visible
Timeout: 240000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 240000ms
  - waiting for getByTestId('strings-pseudo-summary')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('strings-pseudo-summary')
Expected: visible
Timeout: 240000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 240000ms
  - waiting for getByTestId('strings-pseudo-summary')


  1291 |       await page.getByTestId("pseudo-generate-confirm-action").click();
  1292 |       await stepUpIfPrompted(page, secret);
> 1293 |       await expect(page.getByTestId("strings-pseudo-summary")).toBeVisible({ timeout: 240_000 });
       |                                                                ^
  1294 |       await expect(page.getByTestId("strings-pseudo-error")).toHaveCount(0);
  1295 |
  1296 |       const { data: baseRow, error: baseError } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1293:64
```

Context:

```text
          - listitem [ref=e946]:
            - generic [ref=e947]: About
          - listitem [ref=e948]:
            - generic [ref=e949]: Contact
      - navigation "Help" [ref=e950]:
        - heading "Help" [level=2] [ref=e951]
        - list [ref=e952]:
          - listitem [ref=e953]:
            - generic [ref=e954]: Safety
      - navigation "Legal" [ref=e955]:
        - heading "Legal" [level=2] [ref=e956]
        - list [ref=e957]:
          - listitem [ref=e958]:
            - link "Terms" [ref=e959] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e960]:
            - link "Privacy" [ref=e961] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e963]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/alias HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/geo/reverse HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
