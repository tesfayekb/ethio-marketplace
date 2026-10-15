# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38782705639
- Commit: `eee5d6cdc11ee8a3a5febf5daa8532784d2b511f`
- Attempt: 1
- Written (UTC): 2026-10-15T23:18:46.254Z
- Passed: 1635 · Skipped: 80 · Failed: 7
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

935 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 836 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>mvm: e<n>e_par_brgc<n>l → e<n>e_chi_o<n>qn<n>` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-qbo<n>g: e<n>e_par_<n>yl<n> → e<n>e_chi_fvw<n>q<n>` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>mvm: e<n>e_par_brgc<n>l → e<n>e_chi_o<n>qn<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-qbo<n>g: e<n>e_par_<n>yl<n> → e<n>e_chi_fvw<n>q<n> ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 836 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AU-7 crumb: Home > Admin > Users > <name>, Users navigates back ×21 · AU-3 detail: reason required, deactivate, audit row, reactivate ×19 · AU-6 negative: a base user cannot call the status RPC ×17 · MF-7b cancelling the prompt releases the caller and writes nothing @private-iden ×16 · RP-1 gating: moderator refused, admin sees the list, signed-out deep link redire ×16 · RP-2 create: a super admin creates a custom role through step-up ×16

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
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
| nightly | 2026-10-15T18:06:30.185Z | 3.6 min |
| full | 2026-10-15T18:10:04.315Z | 308.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 20.7 min | full |
| `admin-screening.spec.ts` | 50 | 17.8 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 13.3 min | full |
| `post-wizard-specs.spec.ts` | 80 | 13.3 min | full |
| `post-wizard-bundle2.spec.ts` | 68 | 11.7 min | full |
| `admin-listings.spec.ts` | 60 | 11.7 min | full |
| `post-wizard-place.spec.ts` | 38 | 11.4 min | full |
| `my-listings-doors.spec.ts` | 28 | 10.5 min | full |
| `post-wizard-category.spec.ts` | 48 | 10.1 min | full |
| `my-listings-ad.spec.ts` | 30 | 9.7 min | full |
| `post-wizard-resets.spec.ts` | 34 | 9.2 min | full |
| `admin-translations-console.spec.ts` | 46 | 8.2 min | full |
| `admin-translations-governance.spec.ts` | 20 | 8.0 min | full |
| `import-security.spec.ts` | 36 | 7.9 min | full |
| `shell.spec.ts` | 168 | 7.6 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 7.6 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.5 min | full |
| `admin-locations.spec.ts` | 38 | 7.2 min | full |
| `posting-routes.spec.ts` | 60 | 6.6 min | full |
| `post-wizard-where.spec.ts` | 32 | 6.6 min | full |
| `admin-categories-console.spec.ts` | 34 | 6.0 min | full |
| `feed-screens.spec.ts` | 30 | 5.9 min | full |
| `my-listings-page.spec.ts` | 14 | 5.9 min | full |
| `admin-roles.spec.ts` | 26 | 5.6 min | full |
| `admin-attributes-links.spec.ts` | 32 | 5.6 min | full |
| `admin-users.spec.ts` | 26 | 5.5 min | full |
| `viewing-place.spec.ts` | 22 | 5.3 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 4.8 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 4.1 min | full |
| `feed-index.spec.ts` | 30 | 4.0 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.8 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `feed-route.spec.ts` | 22 | 3.4 min | full |
| `auth-signout.spec.ts` | 22 | 3.1 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 3.1 min | full |
| `admin-shell.spec.ts` | 10 | 3.0 min | full |
| `admin-countries.spec.ts` | 18 | 2.6 min | full |
| `admin-audit.spec.ts` | 14 | 2.5 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.5 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | full |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | full |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.7 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.6 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | full |
| `admin-coverage.spec.ts` | 16 | 1.3 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `admin-services.spec.ts` | 10 | 0.9 min | full |
| `category-image-routes.spec.ts` | 10 | 0.8 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.8 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | full |
| `phone-frame.spec.ts` | 18 | 0.7 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.6 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `layout.spec.ts` | 10 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 248.7 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.5 s |
| `post-wizard-resets.spec.ts` › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) | desktop-1280 | 61.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 60.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 60.4 s |
| `admin-shell.spec.ts` › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible | desktop-1280 | 60.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 59.8 s |
| `admin-screening.spec.ts` › SC-24 Photos to review: a failed photo on a live ad is listed with its reason, and Allow shows it to buyers (D178) | desktop-1280 | 57.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 55.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.8 s |
| `post-wizard-place.spec.ts` › PW-33 a region alone never lists itself; its city does (W6 R2) | desktop-1280 | 53.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 48.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 48.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 47.4 s |
| `admin-screening.spec.ts` › SC-21 Photo changes on live ads: a seller's additions, edit and removal are listed with their warnings and marked reviewed (D154 B5) | desktop-1280 | 45.6 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38782705639-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 68 (pool 2, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 38782705639-nightly
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-nightly-9c9zwk"
Received: "e2e-screen-nightly-95g0al"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-nightly-95g0al</h2>
       - unexpected value "e2e-screen-nightly-95g0al"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-nightly-9c9zwk"
Received: "e2e-screen-nightly-95g0al"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-nightly-95g0al</h2>
       - unexpected value "e2e-screen-nightly-95g0al"


  1401 |     );
  1402 |     await expect(sheet.getByTestId("admin-screening-edit-panel")).toHaveCount(0);
> 1403 |     await expect(sheet.getByTestId("listing-detail-title")).toHaveText(corrected);
       |                                                             ^
  1404 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "screening" });
  1405 |
```

Context:

```text
          - heading "Description" [level=3] [ref=e314]
          - paragraph [ref=e315]: e2e scratch listing for the screening queue
        - generic [ref=e316]:
          - generic [ref=e317]:
            - heading "Seller" [level=3] [ref=e318]
            - paragraph [ref=e319]: eseller_kgzizzup
          - generic [ref=e320]:
            - heading "Contact the seller" [level=4] [ref=e321]
            - list [ref=e322]:
              - listitem [ref=e323]:
                - generic [ref=e324]: Messages on ethio.com
        - paragraph [ref=e327]: The map of this place opens with the listing.
      - generic [ref=e328]:
        - status [ref=e329]: "Saved. The seller is told what changed: Title."
        - button "Edit" [ref=e330] [cursor=pointer]
        - link "Open the ad's page" [ref=e331] [cursor=pointer]:
          - /url: /admin/listings/10dfcdda-fe28-47d9-9c7b-7c8facf1b164
        - button "Approve" [ref=e332] [cursor=pointer]
        - button "Reject" [ref=e333] [cursor=pointer]
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-nightly-jf3aqs"
Received: "e2e-screen-nightly-m6q6er"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-nightly-m6q6er</h2>
       - unexpected value "e2e-screen-nightly-m6q6er"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-nightly-jf3aqs"
Received: "e2e-screen-nightly-m6q6er"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-nightly-m6q6er</h2>
       - unexpected value "e2e-screen-nightly-m6q6er"


  1401 |     );
  1402 |     await expect(sheet.getByTestId("admin-screening-edit-panel")).toHaveCount(0);
> 1403 |     await expect(sheet.getByTestId("listing-detail-title")).toHaveText(corrected);
       |                                                             ^
  1404 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "screening" });
  1405 |
```

Context:

```text
          - heading "Description" [level=3] [ref=e338]
          - paragraph [ref=e339]: e2e scratch listing for the screening queue
        - generic [ref=e340]:
          - generic [ref=e341]:
            - heading "Seller" [level=3] [ref=e342]
            - paragraph [ref=e343]: eseller_uqgaipnd
          - generic [ref=e344]:
            - heading "Contact the seller" [level=4] [ref=e345]
            - list [ref=e346]:
              - listitem [ref=e347]:
                - generic [ref=e348]: Messages on ethio.com
        - paragraph [ref=e351]: The map of this place opens with the listing.
      - generic [ref=e352]:
        - status [ref=e353]: "Saved. The seller is told what changed: Title."
        - button "Edit" [ref=e354] [cursor=pointer]
        - link "Open the ad's page" [ref=e355] [cursor=pointer]:
          - /url: /admin/listings/c267f621-82ff-4d61-9cdc-25c5a3e871ec
        - button "Approve" [ref=e356] [cursor=pointer]
        - button "Reject" [ref=e357] [cursor=pointer]
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin$/
Received string:  "http://127.0.0.1:4173/admin/screening"

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    3 × unexpected value "http://127.0.0.1:4173/admin/screening"


  242 |       await page.goto(path);
  243 |       await waitForHydration(page);
> 244 |       await expect(page).toHaveURL(/\/admin$/);
      |                          ^
  245 |       await expect(page.getByTestId("admin-access-notice")).toBeVisible({ timeout: 15000 });
  246 |     }
  247 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:244:26
```

Context:

```text
          - listitem [ref=e164]:
            - generic [ref=e165]: About
          - listitem [ref=e166]:
            - generic [ref=e167]: How it works
      - navigation "Help" [ref=e168]:
        - heading "Help" [level=2] [ref=e169]
        - list [ref=e170]:
          - listitem [ref=e171]:
            - generic [ref=e172]: Safety
          - listitem [ref=e173]:
            - generic [ref=e174]: Contact
      - navigation "Legal" [ref=e175]:
        - heading "Legal" [level=2] [ref=e176]
        - list [ref=e177]:
          - listitem [ref=e178]:
            - generic [ref=e179]: Terms
          - listitem [ref=e180]:
            - generic [ref=e181]: Privacy
    - paragraph [ref=e183]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

[e2e:l4c] sync route (admin_sync_ui_keys) → 200 {"orphaned": 0, "am_seeded": 0, "languages": 14, "keys_added": 0, "en_upserted": 2507, "orphans_restored": 0, "keys_added_per_lang": {"am": 2507, "om": 2507, "ti": 2507, "zxa": 2507, "zxx": 2507, "zxy": 2507, "zxx-d": 2507, "zxx-m": 2507, "zxy-d": 2507, "zxy-m": 2507, "zxx-de": 2507, "zxx-mo": 2507, "zxy-de": 2507, "zxy-mo": 2507}}
user 1b6bc06d-e358-4c5a-b821-5483f0457de2
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translations-sync-done')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('translations-sync-done')

[e2e:l4c] sync route (admin_sync_ui_keys) → 200 {"orphaned": 0, "am_seeded": 0, "languages": 14, "keys_added": 0, "en_upserted": 2507, "orphans_restored": 0, "keys_added_per_lang": {"am": 2507, "om": 2507, "ti": 2507, "zxa": 2507, "zxx": 2507, "zxy": 2507, "zxx-d": 2507, "zxx-m": 2507, "zxy-d": 2507, "zxy-m": 2507, "zxx-de": 2507, "zxx-mo": 2507, "zxy-de": 2507, "zxy-mo": 2507}}
user 1b6bc06d-e358-4c5a-b821-5483f0457de2

  101 |     await assertion();
  102 |   } catch (error) {
> 103 |     throw new Error(
      |           ^
  104 |       `${error instanceof Error ? error.message : String(error)}\n[e2e:l4c] ${await evidence()}`,
  105 |     );
```

Context:

```text
          - listitem [ref=e918]:
            - generic [ref=e919]: About
          - listitem [ref=e920]:
            - generic [ref=e921]: How it works
      - navigation "Help" [ref=e922]:
        - heading "Help" [level=2] [ref=e923]
        - list [ref=e924]:
          - listitem [ref=e925]:
            - generic [ref=e926]: Safety
          - listitem [ref=e927]:
            - generic [ref=e928]: Contact
      - navigation "Legal" [ref=e929]:
        - heading "Legal" [level=2] [ref=e930]
        - list [ref=e931]:
          - listitem [ref=e932]:
            - generic [ref=e933]: Terms
          - listitem [ref=e934]:
            - generic [ref=e935]: Privacy
    - paragraph [ref=e937]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e919]:
            - generic [ref=e920]: About
          - listitem [ref=e921]:
            - generic [ref=e922]: How it works
      - navigation "Help" [ref=e923]:
        - heading "Help" [level=2] [ref=e924]
        - list [ref=e925]:
          - listitem [ref=e926]:
            - generic [ref=e927]: Safety
          - listitem [ref=e928]:
            - generic [ref=e929]: Contact
      - navigation "Legal" [ref=e930]:
        - heading "Legal" [level=2] [ref=e931]
        - list [ref=e932]:
          - listitem [ref=e933]:
            - generic [ref=e934]: Terms
          - listitem [ref=e935]:
            - generic [ref=e936]: Privacy
    - paragraph [ref=e938]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `full`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-snightlyb-000@ethio-e2e.invalid (factors) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-snightlyb-000@ethio-e2e.invalid (factors) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:355:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:163:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1016:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-desktop-1280` — Playwright's name `post-wizard-place-POSTING--775f8-itself-its-city-does-W6-R2--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  146 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  147 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-72-after-a-category-reset-a-currency-prefill-that-lands-late-never-claims-a-step-the-seller-has-not-re-completed-INC-317-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-6e167-s-not-re-completed-INC-317--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## Server errors: full

```text
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×8
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×5
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×5
```

## Client errors: full

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:34181:25) at http://127.0.0.1:4173/assets/index-CbFvrlPg.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) ×2
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-CbFvrlPg.js:15424:27 at getResponse (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:15467:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:15424:9) at async client (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:17472:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:17403:20) at async userNext (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:17389:21) ×3
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:34181:25) at http://127.0.0.1:4173/assets/index-CbFvrlPg.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CbFvrlPg.js:6025:5)
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: [posting] schema read failed: TypeError: Failed to fetch
console.error: [client-error] gate fetch threw
```
