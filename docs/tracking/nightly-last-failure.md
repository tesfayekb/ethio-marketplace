# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38118416612
- Commit: `6e0555891f5dbd1a0d2afbfd7a5bab1d7c0a8ef5`
- Attempt: 1
- Written (UTC): 2026-10-11T10:48:08.540Z
- Passed: 1381 · Skipped: 78 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

647 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 548 | full |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>arlbp: e<n>e_par_dewni<n> → e<n>e_chi_wuual<n>` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-txp<n>: e<n>e_par_<n>w<n> → e<n>e_chi_boelns` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>arlbp: e<n>e_par_dewni<n> → e<n>e_chi_wuual<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-txp<n>: e<n>e_par_<n>w<n> → e<n>e_chi_boelns ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 548 · Sources: full

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
| nightly | 2026-10-11T06:58:40.311Z | 3.5 min |
| full | 2026-10-11T07:02:12.069Z | 225.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.6 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 12.4 min | full |
| `post-wizard-specs.spec.ts` | 78 | 11.8 min | full |
| `post-wizard-where.spec.ts` | 32 | 11.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 10.3 min | full |
| `post-wizard-bundle2.spec.ts` | 66 | 9.1 min | full |
| `post-wizard-resets.spec.ts` | 34 | 8.8 min | full |
| `posting-routes.spec.ts` | 50 | 8.7 min | full |
| `shell.spec.ts` | 168 | 7.7 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.3 min | full |
| `admin-attributes-links.spec.ts` | 30 | 7.2 min | full |
| `admin-categories-console.spec.ts` | 34 | 7.1 min | full |
| `admin-screening.spec.ts` | 30 | 7.0 min | full |
| `admin-locations.spec.ts` | 38 | 6.5 min | full |
| `post-wizard-category.spec.ts` | 46 | 6.0 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 5.7 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.5 min | full |
| `admin-roles.spec.ts` | 26 | 5.4 min | full |
| `admin-translations-console.spec.ts` | 40 | 5.4 min | full |
| `viewing-place.spec.ts` | 22 | 5.0 min | full |
| `admin-users.spec.ts` | 26 | 4.6 min | full |
| `feed-screens.spec.ts` | 28 | 4.5 min | full |
| `admin-attributes-safety.spec.ts` | 14 | 4.3 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 4.1 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `import-security.spec.ts` | 34 | 3.3 min | full |
| `admin-countries.spec.ts` | 18 | 3.2 min | full |
| `admin-categories-home.spec.ts` | 8 | 3.1 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.0 min | full |
| `photo-pipeline.spec.ts` | 20 | 2.7 min | full |
| `admin-audit.spec.ts` | 12 | 2.6 min | full |
| `auth-signout.spec.ts` | 22 | 2.5 min | full |
| `posting-routes-dials.spec.ts` | 14 | 2.3 min | full |
| `feed-index.spec.ts` | 28 | 2.2 min | full |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.5 min | full |
| `admin-shell.spec.ts` | 10 | 1.4 min | full |
| `feed-route.spec.ts` | 16 | 1.4 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.4 min | full |
| `admin-coverage.spec.ts` | 14 | 1.4 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.9 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.8 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `phone-frame.spec.ts` | 18 | 0.6 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.5 min | full |
| `category-image-routes.spec.ts` | 10 | 0.5 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.3 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `category-nav.spec.ts` | 10 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 205.1 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 144.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 59.3 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 57.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 56.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 46.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 45.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.3 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 44.6 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 43.9 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 41.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 41.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | mobile-360 | 41.3 s |
| `posting-routes-catalog.spec.ts` › PR-42 the door reads a padded answer as the value it stores | desktop-1280 | 38.2 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38118416612-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 69 (pool 3, fresh 66)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 38118416612-nightly
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-w0itiw-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-w0itiw-card')

[dialog-dump findRow(e2e-cat-nightly-0-w0itiw)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-nightly-0-w0itiw) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-w0itiw-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-nightly-0-w0itiw-card')

[dialog-dump findRow(e2e-cat-nightly-0-w0itiw)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-nightly-0-w0itiw) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×8
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×5
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×4
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
