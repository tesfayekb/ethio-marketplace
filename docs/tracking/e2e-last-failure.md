# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37896645032
- Commit: `326258b108f83951b3ff01021d2da021c7adb5d4`
- Attempt: 2
- Written (UTC): 2026-10-09T07:35:49.030Z
- Passed: 1413 · Skipped: 123 · Failed: 12
- Gating failures: 12 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ek<n>fh<n>: e<n>e_par_cbkiwk → e<n>e_chi_ennrmz` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gwbzp<n>: e<n>e_par_cbpyo<n> → e<n>e_chi_d<n>rr<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ek<n>fh<n>: e<n>e_par_cbkiwk → e<n>e_chi_ennrmz ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-gwbzp<n>: e<n>e_par_cbpyo<n> → e<n>e_chi_d<n>rr<n> ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 2, shard 3, shard 5, shard 6

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
| smoke | 2026-10-09T07:05:35.612Z | 16.5 min |
| email | 2026-10-09T07:05:30.515Z | 0.2 min |
| shard 1 | 2026-10-09T07:05:38.391Z | 29.7 min |
| shard 2 | 2026-10-09T07:05:30.297Z | 23.9 min |
| shard 3 | 2026-10-09T07:05:31.604Z | 21.5 min |
| shard 4 | 2026-10-09T07:05:36.348Z | 29.0 min |
| shard 5 | 2026-10-09T07:05:43.737Z | 23.5 min |
| shard 6 | 2026-10-09T07:05:48.752Z | 22.8 min |
| changed | 2026-10-09T07:05:41.760Z | 5.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 23.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.5 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 16.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.2 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 20 | 12.2 min | shard 1, shard 4, changed |
| `post-wizard-place.spec.ts` | 38 | 11.8 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 11.2 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 11.1 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 11.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 10.3 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 10.2 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.8 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.7 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 7.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 38 | 5.8 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.6 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 5.4 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.4 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 4.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.8 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `phone-frame.spec.ts` | 18 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-2 Approve puts the ad on the site | mobile-360 | 84.2 s |
| `admin-screening.spec.ts` › SC-1 the queue lists an ad waiting for review | mobile-360 | 82.6 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | mobile-360 | 76.4 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | mobile-360 | 66.3 s |
| `admin-screening.spec.ts` › SC-1 the queue lists an ad waiting for review | mobile-360 | 64.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 61.4 s |
| `admin-screening.spec.ts` › SC-2 Approve puts the ad on the site | mobile-360 | 59.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 58.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.0 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 53.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 51.1 s |
| `admin-screening.spec.ts` › SC-2 Approve puts the ad on the site | desktop-1280 | 49.7 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 44.1 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | desktop-1280 | 43.2 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 42.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37896645032-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37896645032-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 37896645032-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 37896645032-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37896645032-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37896645032-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 37896645032-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37896645032-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 6, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37896645032-changed
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-1 the queue lists an ad waiting for review

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-ba56d429-d719-4447-8f85-3dd9fed38b81')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-ba56d429-d719-4447-8f85-3dd9fed38b81')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-ba56d429-d719-4447-8f85-3dd9fed38b81">…</tr>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-ba56d429-d719-4447-8f85-3dd9fed38b81')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-ba56d429-d719-4447-8f85-3dd9fed38b81')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-ba56d429-d719-4447-8f85-3dd9fed38b81">…</tr>
       - unexpected value "hidden"


  120 |     await page.getByTestId("admin-screening-search").fill(title);
  121 |     const row = page.getByTestId(`admin-screening-row-${id}`);
> 122 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  123 |     return row;
  124 |   }
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-954d4999-f8ef-4756-b982-28aaa7adf5e0')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-954d4999-f8ef-4756-b982-28aaa7adf5e0')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-954d4999-f8ef-4756-b982-28aaa7adf5e0">…</tr>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-954d4999-f8ef-4756-b982-28aaa7adf5e0')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-954d4999-f8ef-4756-b982-28aaa7adf5e0')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-954d4999-f8ef-4756-b982-28aaa7adf5e0">…</tr>
       - unexpected value "hidden"


  120 |     await page.getByTestId("admin-screening-search").fill(title);
  121 |     const row = page.getByTestId(`admin-screening-row-${id}`);
> 122 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  123 |     return row;
  124 |   }
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-25ec2a95-b9b5-4d1b-be77-936d0bef077e')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-25ec2a95-b9b5-4d1b-be77-936d0bef077e')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-25ec2a95-b9b5-4d1b-be77-936d0bef077e">…</tr>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-25ec2a95-b9b5-4d1b-be77-936d0bef077e')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-25ec2a95-b9b5-4d1b-be77-936d0bef077e')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-25ec2a95-b9b5-4d1b-be77-936d0bef077e">…</tr>
       - unexpected value "hidden"


  120 |     await page.getByTestId("admin-screening-search").fill(title);
  121 |     const row = page.getByTestId(`admin-screening-row-${id}`);
> 122 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  123 |     return row;
  124 |   }
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-2 moderator fixture: exactly one section (audit), other deep links refused, admin tab still visible

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: moderator section census drifted

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "audit",
+   "screening",
  ]
--- further error 1 ---
Error: moderator section census drifted

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "audit",
+   "screening",
  ]

  192 |     await grantRole(mod.id, "moderator");
  193 |     const perms = await permissionsOfRole("moderator");
> 194 |     expect(expectedSectionIds(perms), "moderator section census drifted").toEqual(["audit"]);
      |                                                                           ^
  195 |
  196 |     await signIn(page, mod.email, mod.password);
  197 |     await waitForHydration(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:194:75
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-2-moderator-fixture-exactly-one-section-audit-other-deep-links-refused-admin-tab-still-visible-mobile-360`

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-52a20dcc-9fcd-439d-9e07-f88287c1c3c7-actions').getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7')
    2) <button type="button" data-testid="admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-52a20dcc-9fcd-439d-9e07-f88287c1c3c7-actions-cell').getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7')

Call log:
  - waiting for getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7')

--- further error 1 ---
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-52a20dcc-9fcd-439d-9e07-f88287c1c3c7-actions').getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7')
    2) <button type="button" data-testid="admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-52a20dcc-9fcd-439d-9e07-f88287c1c3c7-actions-cell').getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7')

Call log:
  - waiting for getByTestId('admin-screening-approve-52a20dcc-9fcd-439d-9e07-f88287c1c3c7')


  137 |     const { secret } = await useJobSuperAdmin(page);
  138 |     await findRow(page, ad.title, ad.id);
> 139 |     await page.getByTestId(`admin-screening-approve-${ad.id}`).click();
      |                                                                ^
  140 |     await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
  141 |     await page.getByTestId("admin-screening-confirm-go").click();
  142 |     await stepUpIfPrompted(page, secret);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:139:64
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

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b-actions').getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b')
    2) <button type="button" data-testid="admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b-actions-cell').getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b')

Call log:
  - waiting for getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b')

--- further error 1 ---
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b-actions').getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b')
    2) <button type="button" data-testid="admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b-actions-cell').getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b')

Call log:
  - waiting for getByTestId('admin-screening-reject-dc4b2cf5-ede4-448b-bfca-6fdd3b60d27b')


  156 |     const { secret } = await useJobSuperAdmin(page);
  157 |     await findRow(page, ad.title, ad.id);
> 158 |     await page.getByTestId(`admin-screening-reject-${ad.id}`).click();
      |                                                               ^
  159 |     await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
  160 |     await page.getByTestId("admin-screening-confirm-go").click();
  161 |     await stepUpIfPrompted(page, secret);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:158:63
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

## admin-shell.spec.ts › Admin shell (U0) › A-2 moderator fixture: exactly one section (audit), other deep links refused, admin tab still visible

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: moderator section census drifted

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "audit",
+   "screening",
  ]
--- further error 1 ---
Error: moderator section census drifted

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "audit",
+   "screening",
  ]

  192 |     await grantRole(mod.id, "moderator");
  193 |     const perms = await permissionsOfRole("moderator");
> 194 |     expect(expectedSectionIds(perms), "moderator section census drifted").toEqual(["audit"]);
      |                                                                           ^
  195 |
  196 |     await signIn(page, mod.email, mod.password);
  197 |     await waitForHydration(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:194:75
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-2-moderator-fixture-exactly-one-section-audit-other-deep-links-refused-admin-tab-still-visible-desktop-1280`

## admin-screening.spec.ts › ADMIN SCREENING › SC-1 the queue lists an ad waiting for review

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-38a3cf4e-d580-430a-898a-9c7eeeb5a06f')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-38a3cf4e-d580-430a-898a-9c7eeeb5a06f')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-38a3cf4e-d580-430a-898a-9c7eeeb5a06f">…</tr>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-38a3cf4e-d580-430a-898a-9c7eeeb5a06f')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-38a3cf4e-d580-430a-898a-9c7eeeb5a06f')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-38a3cf4e-d580-430a-898a-9c7eeeb5a06f">…</tr>
       - unexpected value "hidden"


  120 |     await page.getByTestId("admin-screening-search").fill(title);
  121 |     const row = page.getByTestId(`admin-screening-row-${id}`);
> 122 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  123 |     return row;
  124 |   }
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-b40c6e4b-75ff-4924-a2be-29fa0a990856')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-b40c6e4b-75ff-4924-a2be-29fa0a990856')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-b40c6e4b-75ff-4924-a2be-29fa0a990856">…</tr>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-b40c6e4b-75ff-4924-a2be-29fa0a990856')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-b40c6e4b-75ff-4924-a2be-29fa0a990856')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-b40c6e4b-75ff-4924-a2be-29fa0a990856">…</tr>
       - unexpected value "hidden"


  120 |     await page.getByTestId("admin-screening-search").fill(title);
  121 |     const row = page.getByTestId(`admin-screening-row-${id}`);
> 122 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  123 |     return row;
  124 |   }
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-59487c19-3435-434c-a3c3-6a631f910640')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-59487c19-3435-434c-a3c3-6a631f910640')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-59487c19-3435-434c-a3c3-6a631f910640">…</tr>
       - unexpected value "hidden"

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('admin-screening-row-59487c19-3435-434c-a3c3-6a631f910640')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-screening-row-59487c19-3435-434c-a3c3-6a631f910640')
    21 × locator resolved to <tr class="border-b border-border last:border-0" data-testid="admin-screening-row-59487c19-3435-434c-a3c3-6a631f910640">…</tr>
       - unexpected value "hidden"


  120 |     await page.getByTestId("admin-screening-search").fill(title);
  121 |     const row = page.getByTestId(`admin-screening-row-${id}`);
> 122 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  123 |     return row;
  124 |   }
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `changed`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-b2a393a9-9dca-41c4-b251-2284d182c5ee-actions').getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee')
    2) <button type="button" data-testid="admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-b2a393a9-9dca-41c4-b251-2284d182c5ee-actions-cell').getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee')

Call log:
  - waiting for getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee')

--- further error 1 ---
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-b2a393a9-9dca-41c4-b251-2284d182c5ee-actions').getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee')
    2) <button type="button" data-testid="admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-button hover:bg-primary…>Approve</button> aka getByTestId('admin-screening-row-b2a393a9-9dca-41c4-b251-2284d182c5ee-actions-cell').getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee')

Call log:
  - waiting for getByTestId('admin-screening-approve-b2a393a9-9dca-41c4-b251-2284d182c5ee')


  137 |     const { secret } = await useJobSuperAdmin(page);
  138 |     await findRow(page, ad.title, ad.id);
> 139 |     await page.getByTestId(`admin-screening-approve-${ad.id}`).click();
      |                                                                ^
  140 |     await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
  141 |     await page.getByTestId("admin-screening-confirm-go").click();
  142 |     await stepUpIfPrompted(page, secret);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:139:64
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

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `changed`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-a10d766e-1e76-42b1-ba8c-139cb97c1bbf-actions').getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf')
    2) <button type="button" data-testid="admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-a10d766e-1e76-42b1-ba8c-139cb97c1bbf-actions-cell').getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf')

Call log:
  - waiting for getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf')

--- further error 1 ---
Error: locator.click: Error: strict mode violation: getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf') resolved to 2 elements:
    1) <button type="button" data-testid="admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-a10d766e-1e76-42b1-ba8c-139cb97c1bbf-actions').getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf')
    2) <button type="button" data-testid="admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:…>Reject</button> aka getByTestId('admin-screening-row-a10d766e-1e76-42b1-ba8c-139cb97c1bbf-actions-cell').getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf')

Call log:
  - waiting for getByTestId('admin-screening-reject-a10d766e-1e76-42b1-ba8c-139cb97c1bbf')


  156 |     const { secret } = await useJobSuperAdmin(page);
  157 |     await findRow(page, ad.title, ad.id);
> 158 |     await page.getByTestId(`admin-screening-reject-${ad.id}`).click();
      |                                                               ^
  159 |     await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
  160 |     await page.getByTestId("admin-screening-confirm-go").click();
  161 |     await stepUpIfPrompted(page, secret);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:158:63
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

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-gwbzp4: e2e_par_cbpyo2 → e2e_chi_d3rr39
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-ek4fh5: e2e_par_cbkiwk → e2e_chi_ennrmz
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
