# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38120714250
- Commit: `7f2db3334dfbf1e4338f22669353d36ff8e0d601`
- Attempt: 1
- Written (UTC): 2026-10-11T07:47:58.849Z
- Passed: 1582 · Skipped: 124 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-bbsqxy')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-bbsqxy')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-bbsqxy')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-bbsqxy')


  199 |     await gotoReady(page, "/admin/roles");
  200 |     const row = roleRow(page, name);
> 201 |     await expect(row).toBeVisible();
      |                       ^
  202 |     await row.click();
  203 |     await expect(page.getByTestId("role-permissions")).toBeVisible();
  204 |     expect(secret.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:201:23
```

Context:

```text
          - listitem [ref=e807]:
            - generic [ref=e808]: About
          - listitem [ref=e809]:
            - generic [ref=e810]: How it works
      - navigation "Help" [ref=e811]:
        - heading "Help" [level=2] [ref=e812]
        - list [ref=e813]:
          - listitem [ref=e814]:
            - generic [ref=e815]: Safety
          - listitem [ref=e816]:
            - generic [ref=e817]: Contact
      - navigation "Legal" [ref=e818]:
        - heading "Legal" [level=2] [ref=e819]
        - list [ref=e820]:
          - listitem [ref=e821]:
            - generic [ref=e822]: Terms
          - listitem [ref=e823]:
            - generic [ref=e824]: Privacy
    - paragraph [ref=e826]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-a<n>osit: e<n>e_par_yj<n>ksd → e<n>e_chi_jsvs<n>v` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bz<n>p<n>: e<n>e_par_lketo<n> → e<n>e_chi_<n>msg<n>f` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-a<n>osit: e<n>e_par_yj<n>ksd → e<n>e_chi_jsvs<n>v ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bz<n>p<n>: e<n>e_par_lketo<n> → e<n>e_chi_<n>msg<n>f ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-11T07:16:31.247Z | 16.5 min |
| email | 2026-10-11T07:16:06.961Z | 0.2 min |
| shard 1 | 2026-10-11T07:16:16.994Z | 31.3 min |
| shard 2 | 2026-10-11T07:16:11.075Z | 29.0 min |
| shard 3 | 2026-10-11T07:16:22.775Z | 25.5 min |
| shard 4 | 2026-10-11T07:16:08.257Z | 31.0 min |
| shard 5 | 2026-10-11T07:16:23.655Z | 28.0 min |
| shard 6 | 2026-10-11T07:16:05.289Z | 25.0 min |
| changed | 2026-10-11T07:16:01.801Z | 10.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 25.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 66 | 19.2 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 15.3 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 52 | 15.0 min | shard 1, shard 4, changed |
| `admin-translations-console.spec.ts` | 80 | 13.2 min | shard 1, shard 4, changed |
| `post-wizard-category.spec.ts` | 46 | 13.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.0 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 12.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 11.4 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.4 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 10.9 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 10.8 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.4 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 9.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.7 min | smoke, shard 2, shard 5 |
| `admin-audit.spec.ts` | 24 | 9.2 min | shard 1, shard 4, changed |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 30 | 8.2 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 7.3 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 16 | 5.9 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 5.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 4.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.1 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 60.0 s |
| `admin-roles.spec.ts` › RP-16 the roles list on the agreed blocks: heading, Create role, Columns, View members | mobile-360 | 59.7 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | desktop-1280 | 59.0 s |
| `admin-roles.spec.ts` › RP-16 the roles list on the agreed blocks: heading, Create role, Columns, View members | mobile-360 | 57.7 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | mobile-360 | 54.1 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | mobile-360 | 53.4 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | desktop-1280 | 52.4 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 50.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 48.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 46.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 45.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.7 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | mobile-360 | 44.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38120714250-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38120714250-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 6, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 38120714250-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38120714250-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38120714250-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 6, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 38120714250-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38120714250-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38120714250-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 20 (pool 6, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 38120714250-changed
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')


  213 |       await expect(page.getByTestId("impersonation-listings-columns")).toBeVisible();
  214 |       // G3a (INC-546) — the listings' footer pages through the door.
> 215 |       await expect(page.getByTestId("impersonation-listings-pagination-range")).toBeVisible();
      |                                                                                 ^
  216 |       await expectNoHorizontalOverflow(page);
  217 |
  218 |       // The banner rides along on an unrelated page (global mount).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:215:81
```

Context:

```text
            - listitem [ref=e247]:
              - generic [ref=e248]: About
            - listitem [ref=e249]:
              - generic [ref=e250]: How it works
        - navigation "Help" [ref=e251]:
          - heading "Help" [level=2] [ref=e252]
          - list [ref=e253]:
            - listitem [ref=e254]:
              - generic [ref=e255]: Safety
            - listitem [ref=e256]:
              - generic [ref=e257]: Contact
        - navigation "Legal" [ref=e258]:
          - heading "Legal" [level=2] [ref=e259]
          - list [ref=e260]:
            - listitem [ref=e261]:
              - generic [ref=e262]: Terms
            - listitem [ref=e263]:
              - generic [ref=e264]: Privacy
      - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-rdv27r-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-rdv27r-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-rdv27r-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-rdv27r-card')


  199 |     await gotoReady(page, "/admin/roles");
  200 |     const row = roleRow(page, name);
> 201 |     await expect(row).toBeVisible();
      |                       ^
  202 |     await row.click();
  203 |     await expect(page.getByTestId("role-permissions")).toBeVisible();
  204 |     expect(secret.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:201:23
```

Context:

```text
          - listitem [ref=e965]:
            - generic [ref=e966]: About
          - listitem [ref=e967]:
            - generic [ref=e968]: How it works
      - navigation "Help" [ref=e969]:
        - heading "Help" [level=2] [ref=e970]
        - list [ref=e971]:
          - listitem [ref=e972]:
            - generic [ref=e973]: Safety
          - listitem [ref=e974]:
            - generic [ref=e975]: Contact
      - navigation "Legal" [ref=e976]:
        - heading "Legal" [level=2] [ref=e977]
        - list [ref=e978]:
          - listitem [ref=e979]:
            - generic [ref=e980]: Terms
          - listitem [ref=e981]:
            - generic [ref=e982]: Privacy
    - paragraph [ref=e984]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-16 the roles list on the agreed blocks: heading, Create role, Columns, View members

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-q0mxd8-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-row-e2e-custom-q0mxd8-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-q0mxd8-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-row-e2e-custom-q0mxd8-card')


  531 |     await expect(page.getByTestId("role-pagination-size")).toHaveValue("25");
  532 |
> 533 |     await expect(roleRow(page, name)).toBeVisible({ timeout: 20000 });
      |                                       ^
  534 |     const actions = page.getByTestId(
  535 |       isMobile(page) ? `role-row-${name}-actions` : `role-row-${name}-actions-cell`,
  536 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:533:39
```

Context:

```text
          - listitem [ref=e965]:
            - generic [ref=e966]: About
          - listitem [ref=e967]:
            - generic [ref=e968]: How it works
      - navigation "Help" [ref=e969]:
        - heading "Help" [level=2] [ref=e970]
        - list [ref=e971]:
          - listitem [ref=e972]:
            - generic [ref=e973]: Safety
          - listitem [ref=e974]:
            - generic [ref=e975]: Contact
      - navigation "Legal" [ref=e976]:
        - heading "Legal" [level=2] [ref=e977]
        - list [ref=e978]:
          - listitem [ref=e979]:
            - generic [ref=e980]: Terms
          - listitem [ref=e981]:
            - generic [ref=e982]: Privacy
    - paragraph [ref=e984]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')


  213 |       await expect(page.getByTestId("impersonation-listings-columns")).toBeVisible();
  214 |       // G3a (INC-546) — the listings' footer pages through the door.
> 215 |       await expect(page.getByTestId("impersonation-listings-pagination-range")).toBeVisible();
      |                                                                                 ^
  216 |       await expectNoHorizontalOverflow(page);
  217 |
  218 |       // The banner rides along on an unrelated page (global mount).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:215:81
```

Context:

```text
            - listitem [ref=e271]:
              - generic [ref=e272]: About
            - listitem [ref=e273]:
              - generic [ref=e274]: How it works
        - navigation "Help" [ref=e275]:
          - heading "Help" [level=2] [ref=e276]
          - list [ref=e277]:
            - listitem [ref=e278]:
              - generic [ref=e279]: Safety
            - listitem [ref=e280]:
              - generic [ref=e281]: Contact
        - navigation "Legal" [ref=e282]:
          - heading "Legal" [level=2] [ref=e283]
          - list [ref=e284]:
            - listitem [ref=e285]:
              - generic [ref=e286]: Terms
            - listitem [ref=e287]:
              - generic [ref=e288]: Privacy
      - paragraph [ref=e290]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-e5ygdj')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-e5ygdj')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-e5ygdj')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-e5ygdj')


  199 |     await gotoReady(page, "/admin/roles");
  200 |     const row = roleRow(page, name);
> 201 |     await expect(row).toBeVisible();
      |                       ^
  202 |     await row.click();
  203 |     await expect(page.getByTestId("role-permissions")).toBeVisible();
  204 |     expect(secret.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:201:23
```

Context:

```text
          - listitem [ref=e807]:
            - generic [ref=e808]: About
          - listitem [ref=e809]:
            - generic [ref=e810]: How it works
      - navigation "Help" [ref=e811]:
        - heading "Help" [level=2] [ref=e812]
        - list [ref=e813]:
          - listitem [ref=e814]:
            - generic [ref=e815]: Safety
          - listitem [ref=e816]:
            - generic [ref=e817]: Contact
      - navigation "Legal" [ref=e818]:
        - heading "Legal" [level=2] [ref=e819]
        - list [ref=e820]:
          - listitem [ref=e821]:
            - generic [ref=e822]: Terms
          - listitem [ref=e823]:
            - generic [ref=e824]: Privacy
    - paragraph [ref=e826]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')


  213 |       await expect(page.getByTestId("impersonation-listings-columns")).toBeVisible();
  214 |       // G3a (INC-546) — the listings' footer pages through the door.
> 215 |       await expect(page.getByTestId("impersonation-listings-pagination-range")).toBeVisible();
      |                                                                                 ^
  216 |       await expectNoHorizontalOverflow(page);
  217 |
  218 |       // The banner rides along on an unrelated page (global mount).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:215:81
```

Context:

```text
            - listitem [ref=e247]:
              - generic [ref=e248]: About
            - listitem [ref=e249]:
              - generic [ref=e250]: How it works
        - navigation "Help" [ref=e251]:
          - heading "Help" [level=2] [ref=e252]
          - list [ref=e253]:
            - listitem [ref=e254]:
              - generic [ref=e255]: Safety
            - listitem [ref=e256]:
              - generic [ref=e257]: Contact
        - navigation "Legal" [ref=e258]:
          - heading "Legal" [level=2] [ref=e259]
          - list [ref=e260]:
            - listitem [ref=e261]:
              - generic [ref=e262]: Terms
            - listitem [ref=e263]:
              - generic [ref=e264]: Privacy
      - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('impersonation-listings-pagination-range')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('impersonation-listings-pagination-range')


  213 |       await expect(page.getByTestId("impersonation-listings-columns")).toBeVisible();
  214 |       // G3a (INC-546) — the listings' footer pages through the door.
> 215 |       await expect(page.getByTestId("impersonation-listings-pagination-range")).toBeVisible();
      |                                                                                 ^
  216 |       await expectNoHorizontalOverflow(page);
  217 |
  218 |       // The banner rides along on an unrelated page (global mount).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:215:81
```

Context:

```text
            - listitem [ref=e271]:
              - generic [ref=e272]: About
            - listitem [ref=e273]:
              - generic [ref=e274]: How it works
        - navigation "Help" [ref=e275]:
          - heading "Help" [level=2] [ref=e276]
          - list [ref=e277]:
            - listitem [ref=e278]:
              - generic [ref=e279]: Safety
            - listitem [ref=e280]:
              - generic [ref=e281]: Contact
        - navigation "Legal" [ref=e282]:
          - heading "Legal" [level=2] [ref=e283]
          - list [ref=e284]:
            - listitem [ref=e285]:
              - generic [ref=e286]: Terms
            - listitem [ref=e287]:
              - generic [ref=e288]: Privacy
      - paragraph [ref=e290]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-y9vx8u-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-y9vx8u-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-y9vx8u-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-y9vx8u-card')


  199 |     await gotoReady(page, "/admin/roles");
  200 |     const row = roleRow(page, name);
> 201 |     await expect(row).toBeVisible();
      |                       ^
  202 |     await row.click();
  203 |     await expect(page.getByTestId("role-permissions")).toBeVisible();
  204 |     expect(secret.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:201:23
```

Context:

```text
          - listitem [ref=e965]:
            - generic [ref=e966]: About
          - listitem [ref=e967]:
            - generic [ref=e968]: How it works
      - navigation "Help" [ref=e969]:
        - heading "Help" [level=2] [ref=e970]
        - list [ref=e971]:
          - listitem [ref=e972]:
            - generic [ref=e973]: Safety
          - listitem [ref=e974]:
            - generic [ref=e975]: Contact
      - navigation "Legal" [ref=e976]:
        - heading "Legal" [level=2] [ref=e977]
        - list [ref=e978]:
          - listitem [ref=e979]:
            - generic [ref=e980]: Terms
          - listitem [ref=e981]:
            - generic [ref=e982]: Privacy
    - paragraph [ref=e984]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-16 the roles list on the agreed blocks: heading, Create role, Columns, View members

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-8xgxzq-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-row-e2e-custom-8xgxzq-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-8xgxzq-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-row-e2e-custom-8xgxzq-card')


  531 |     await expect(page.getByTestId("role-pagination-size")).toHaveValue("25");
  532 |
> 533 |     await expect(roleRow(page, name)).toBeVisible({ timeout: 20000 });
      |                                       ^
  534 |     const actions = page.getByTestId(
  535 |       isMobile(page) ? `role-row-${name}-actions` : `role-row-${name}-actions-cell`,
  536 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:533:39
```

Context:

```text
          - listitem [ref=e965]:
            - generic [ref=e966]: About
          - listitem [ref=e967]:
            - generic [ref=e968]: How it works
      - navigation "Help" [ref=e969]:
        - heading "Help" [level=2] [ref=e970]
        - list [ref=e971]:
          - listitem [ref=e972]:
            - generic [ref=e973]: Safety
          - listitem [ref=e974]:
            - generic [ref=e975]: Contact
      - navigation "Legal" [ref=e976]:
        - heading "Legal" [level=2] [ref=e977]
        - list [ref=e978]:
          - listitem [ref=e979]:
            - generic [ref=e980]: Terms
          - listitem [ref=e981]:
            - generic [ref=e982]: Privacy
    - paragraph [ref=e984]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-a4osit: e2e_par_yj6ksd → e2e_chi_jsvs2v
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-bz2p90: e2e_par_lketo7 → e2e_chi_6msg6f
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:33571:25) at http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:33603:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BQ47F4Iu.js:6025:5) ×2
```
