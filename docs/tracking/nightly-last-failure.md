# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38031284786
- Commit: `270ee85f5fa0097e75a60d08165a3a13208ebca0`
- Attempt: 1
- Written (UTC): 2026-10-10T09:36:32.296Z
- Passed: 1322 · Skipped: 78 · Failed: 2
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

363 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 264 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-a<n>uird: e<n>e_par_r<n>e<n>nz → e<n>e_chi_by<n>dm<n>` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-bchjme: e<n>e_par_<n>y<n>tbn → e<n>e_chi_<n>slph<n>` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-a<n>uird: e<n>e_par_r<n>e<n>nz → e<n>e_chi_by<n>dm<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-bchjme: e<n>e_par_<n>y<n>tbn → e<n>e_chi_<n>slph<n> ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 264 · Sources: full

```text
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full

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
| nightly | 2026-10-10T06:33:20.978Z | 3.5 min |
| full | 2026-10-10T06:36:51.420Z | 179.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 14.0 min | full |
| `admin-translations-governance.spec.ts` | 20 | 8.3 min | full |
| `post-wizard-resets.spec.ts` | 34 | 7.9 min | full |
| `admin-categories-lifecycle.spec.ts` | 48 | 7.9 min | full |
| `shell.spec.ts` | 168 | 7.2 min | full |
| `post-wizard-where.spec.ts` | 32 | 7.2 min | full |
| `post-wizard-bundle2.spec.ts` | 64 | 6.9 min | full |
| `feed-screens.spec.ts` | 26 | 6.9 min | full |
| `admin-users.spec.ts` | 24 | 6.5 min | full |
| `admin-attributes-library.spec.ts` | 40 | 5.7 min | full |
| `admin-locations.spec.ts` | 36 | 5.7 min | full |
| `admin-translations-console.spec.ts` | 40 | 5.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 5.6 min | full |
| `feed-index.spec.ts` | 28 | 5.5 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 5.1 min | full |
| `post-wizard-category.spec.ts` | 46 | 4.6 min | full |
| `admin-roles.spec.ts` | 24 | 4.5 min | full |
| `admin-categories-console.spec.ts` | 32 | 4.4 min | full |
| `auth-signout.spec.ts` | 22 | 4.0 min | full |
| `admin-attributes-links.spec.ts` | 30 | 3.9 min | full |
| `import-security.spec.ts` | 34 | 3.7 min | full |
| `posting-routes.spec.ts` | 50 | 3.7 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 3.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `feed-route.spec.ts` | 16 | 3.0 min | full |
| `admin-attributes-safety.spec.ts` | 14 | 2.8 min | full |
| `admin-countries.spec.ts` | 16 | 2.6 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | full |
| `admin-screening.spec.ts` | 12 | 2.5 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.4 min | full |
| `admin-attributes-import.spec.ts` | 40 | 2.3 min | full |
| `photo-pipeline.spec.ts` | 20 | 2.1 min | full |
| `admin-categories-home.spec.ts` | 8 | 1.8 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `admin-audit.spec.ts` | 10 | 1.5 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.3 min | full |
| `posting-routes-dials.spec.ts` | 14 | 1.2 min | full |
| `category-image-routes.spec.ts` | 10 | 1.2 min | full |
| `admin-coverage.spec.ts` | 14 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-removed.spec.ts` | 4 | 0.9 min | full |
| `admin-shell.spec.ts` | 10 | 0.9 min | full |
| `phone-frame.spec.ts` | 18 | 0.8 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.7 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.7 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | full |
| `category-nav.spec.ts` | 10 | 0.5 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `house-style.spec.ts` | 12 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.2 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `auth-callback.spec.ts` | 4 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 249.2 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 203.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.3 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 41.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 40.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 36.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 36.4 s |
| `admin-categories-images.spec.ts` › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state | desktop-1280 | 36.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 33.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.9 s |
| `post-wizard-resets.spec.ts` › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold | mobile-360 | 32.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.0 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | desktop-1280 | 31.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 31.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 30.9 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38031284786-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 69 (pool 3, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 38031284786-nightly
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-4 only a reviewer with a fresh second factor decides

- Source: `full`
- Project: `desktop-1280`

```text
Error: SC-4 scratch role failed: canceling statement due to statement timeout
--- further error 1 ---
Error: SC-4 scratch role failed: canceling statement due to statement timeout

  217 |       .select("id")
  218 |       .single();
> 219 |     if (roleError || !role) throw new Error(`SC-4 scratch role failed: ${roleError?.message}`);
      |                                   ^
  220 |     roles.push(role.id as string);
  221 |     const { data: perms } = await supabase
  222 |       .from("permissions")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:219:35
```

Context:

```text
          - listitem [ref=e359]:
            - generic [ref=e360]: About
          - listitem [ref=e361]:
            - generic [ref=e362]: How it works
      - navigation "Help" [ref=e363]:
        - heading "Help" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - generic [ref=e367]: Safety
          - listitem [ref=e368]:
            - generic [ref=e369]: Contact
      - navigation "Legal" [ref=e370]:
        - heading "Legal" [level=2] [ref=e371]
        - list [ref=e372]:
          - listitem [ref=e373]:
            - generic [ref=e374]: Terms
          - listitem [ref=e375]:
            - generic [ref=e376]: Privacy
    - paragraph [ref=e378]: © 2026 ethio.com — All rights reserved.
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


  1231 |       await page.getByTestId("pseudo-generate-confirm-action").click();
  1232 |       await stepUpIfPrompted(page, secret);
> 1233 |       await expect(page.getByTestId("strings-pseudo-summary")).toBeVisible({ timeout: 240_000 });
       |                                                                ^
  1234 |       await expect(page.getByTestId("strings-pseudo-error")).toHaveCount(0);
  1235 |
  1236 |       const { data: baseRow, error: baseError } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1233:64
```

Context:

```text
          - listitem [ref=e879]:
            - generic [ref=e880]: About
          - listitem [ref=e881]:
            - generic [ref=e882]: How it works
      - navigation "Help" [ref=e883]:
        - heading "Help" [level=2] [ref=e884]
        - list [ref=e885]:
          - listitem [ref=e886]:
            - generic [ref=e887]: Safety
          - listitem [ref=e888]:
            - generic [ref=e889]: Contact
      - navigation "Legal" [ref=e890]:
        - heading "Legal" [level=2] [ref=e891]
        - list [ref=e892]:
          - listitem [ref=e893]:
            - generic [ref=e894]: Terms
          - listitem [ref=e895]:
            - generic [ref=e896]: Privacy
    - paragraph [ref=e898]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/catalog/find HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: full

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:33543:25) at http://127.0.0.1:4173/assets/index-DvJRU-TM.js:33575:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:5122:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6027:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6018:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6026:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6018:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6026:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6018:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DvJRU-TM.js:6026:5) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
console.error: [client-error] gate fetch threw
```
