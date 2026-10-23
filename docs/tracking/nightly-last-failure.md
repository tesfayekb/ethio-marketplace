# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40000342471
- Commit: `5319153301591c80bd034da4fdceb6071bafdff9`
- Attempt: 1
- Written (UTC): 2026-10-23T23:56:17.424Z
- Passed: 1995 · Skipped: 98 · Failed: 3
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

408 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 310 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>gz<n>r<n>: e<n>e_par_<n>fzpo → e<n>e_chi_wd<n>frp` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-orh<n>m: e<n>e_par_zlvcib → e<n>e_chi_bj<n>oph` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>gz<n>r<n>: e<n>e_par_<n>fzpo → e<n>e_chi_wd<n>frp ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-orh<n>m: e<n>e_par_zlvcib → e<n>e_chi_bj<n>oph ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 310 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CG-1 a deactivated account is refused at the doors that had no gate @private-ide ×9 · AP-41 the page's remaining lines ×8 · SO-3b reload path: a cleared token means /admin never renders on mount ×8 · CG-2 the three retired doors are closed to a signed-in account ×7 · SO-3 live guard: a same-tab client sign-out evacuates /admin ×7 · AP-40 an address never reveals: only the visitor's own tap does (D201 §14) ×6

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
| nightly | 2026-10-23T18:15:25.608Z | 0.4 min |
| full | 2026-10-23T18:15:51.408Z | 340.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 68 | 19.0 min | full |
| `post-wizard-specs.spec.ts` | 82 | 15.1 min | full |
| `admin-listings.spec.ts` | 62 | 14.2 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 14.1 min | full |
| `ad-page.spec.ts` | 68 | 13.4 min | full |
| `admin-screening.spec.ts` | 52 | 12.4 min | full |
| `posting-routes.spec.ts` | 80 | 10.8 min | full |
| `shell.spec.ts` | 212 | 10.4 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 10.4 min | full |
| `my-listings-ad.spec.ts` | 36 | 9.2 min | full |
| `post-wizard-place.spec.ts` | 38 | 9.0 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 8.3 min | full |
| `legal-certify.spec.ts` | 42 | 8.2 min | full |
| `post-wizard-category.spec.ts` | 48 | 8.0 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.8 min | full |
| `post-wizard-resets.spec.ts` | 34 | 7.7 min | full |
| `admin-translations-governance.spec.ts` | 20 | 7.6 min | full |
| `post-wizard-where.spec.ts` | 32 | 7.5 min | full |
| `feed-screens.spec.ts` | 36 | 6.6 min | full |
| `admin-categories-console.spec.ts` | 34 | 6.6 min | full |
| `admin-attributes-links.spec.ts` | 34 | 6.5 min | full |
| `my-listings-doors.spec.ts` | 28 | 6.3 min | full |
| `admin-translations-console.spec.ts` | 46 | 6.2 min | full |
| `admin-locations.spec.ts` | 38 | 6.2 min | full |
| `admin-users.spec.ts` | 28 | 6.1 min | full |
| `ad-page-doors.spec.ts` | 30 | 6.0 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 5.7 min | full |
| `viewing-place.spec.ts` | 22 | 5.5 min | full |
| `admin-roles.spec.ts` | 26 | 5.3 min | full |
| `import-security.spec.ts` | 36 | 5.0 min | full |
| `legal-admin.spec.ts` | 40 | 4.6 min | full |
| `my-listings-page.spec.ts` | 16 | 4.4 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 4.4 min | full |
| `admin-attributes-import.spec.ts` | 40 | 4.3 min | full |
| `legal-doors.spec.ts` | 34 | 4.3 min | full |
| `auth-signout.spec.ts` | 28 | 3.7 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 3.5 min | full |
| `feed-index.spec.ts` | 30 | 3.3 min | full |
| `admin-countries.spec.ts` | 18 | 2.8 min | full |
| `admin-audit.spec.ts` | 14 | 2.7 min | full |
| `feed-route.spec.ts` | 22 | 2.7 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.6 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.5 min | full |
| `posting-routes-dials.spec.ts` | 18 | 2.1 min | full |
| `admin-shell.spec.ts` | 12 | 1.9 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | full |
| `admin-coverage.spec.ts` | 16 | 1.4 min | full |
| `auth-caller-gates.spec.ts` | 8 | 1.4 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.4 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.3 min | full |
| `legal-accept.spec.ts` | 12 | 1.2 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.9 min | full |
| `phone-frame.spec.ts` | 18 | 0.8 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.8 min | full |
| `legal-history.spec.ts` | 6 | 0.8 min | full |
| `category-image-routes.spec.ts` | 10 | 0.7 min | full |
| `account-saved.spec.ts` | 4 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `admin-services.spec.ts` | 10 | 0.6 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.5 min | full |
| `auth-reset.spec.ts` | 6 | 0.5 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 0.3 min | nightly |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.3 min | full |
| `legal-pages.spec.ts` | 8 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 248.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 43.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 43.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 41.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 40.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 36.4 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 36.4 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 36.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 35.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 33.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 32.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 32.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.1 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40000342471-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 80 (pool 2, fresh 78)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 112 user(s) owned by process 40000342471-nightly
```

## auth-resend-exhaustion.spec.ts › A-3: three resends exhaust the per-visit limit

- Source: `nightly`
- Project: `nightly-mobile-360`

```text
Error: sign-up surfaced an error instead of check-email

expect(received).toBe(expected) // Object.is equality

Expected: ""
Received: "Tick the box to continue."
--- further error 1 ---
Error: sign-up surfaced an error instead of check-email

expect(received).toBe(expected) // Object.is equality

Expected: ""
Received: "Tick the box to continue."

  39 |     // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
  40 |     const alertText = await alertRegion.first().innerText();
> 41 |     expect(alertText, `sign-up surfaced an error instead of check-email`).toBe("");
     |                                                                           ^
  42 |   }
  43 | }
  44 |
    at assertNoSignUpError (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/nightly/auth-resend-exhaustion.spec.ts:41:75)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/nightly/auth-resend-exhaustion.spec.ts:60:3
```

Context: context file not found for `auth-resend-exhaustion-A-3-three-resends-exhaust-the-per-visit-limit-nightly-mobile-360` — Playwright's name `auth-resend-exhaustion-A-3-52f91-exhaust-the-per-visit-limit-nightly-mobile-360`; this run carried 2 context file(s); of the same spec: none

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

## auth-reset.spec.ts › R-2: the reset request answers identically for a real and an unknown address

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('status')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('status')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('status')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('status')


  46 |
  47 |     const status = page.getByRole("status");
> 48 |     await expect(status).toBeVisible({ timeout: 15000 });
     |                          ^
  49 |     answers.push((await status.innerText()).trim());
  50 |   }
  51 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-reset.spec.ts:48:26
```

Context:

```text
          - listitem [ref=e200]:
            - generic [ref=e201]: About
          - listitem [ref=e202]:
            - generic [ref=e203]: Contact
      - navigation "Help" [ref=e204]:
        - heading "Help" [level=2] [ref=e205]
        - list [ref=e206]:
          - listitem [ref=e207]:
            - generic [ref=e208]: Safety
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - link "Terms" [ref=e213] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e214]:
            - link "Privacy" [ref=e215] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

No `[client-error]` lines in the `nightly` log (or no log was uploaded).

## Server errors: full

```text
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/listings/assist HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×5
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
