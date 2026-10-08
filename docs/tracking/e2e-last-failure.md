# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37737532508
- Commit: `50a2ab574c1158a8e053c4f05492880823daaab4`
- Attempt: 1
- Written (UTC): 2026-10-08T06:50:55.679Z
- Passed: 918 · Skipped: 102 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 2, shard 3, shard 5, shard 6
- Sources without results: shard 1, shard 4

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-13 a second city stops the auto-select at the region — Error: [e2e:l2b] destroying QN failed at place city 3052bae0-0646-4f34-96c2-1c4a17076342: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-13 a second city stops the auto-select at the region

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [e2e:l2b] destroying QN failed at place city 3052bae0-0646-4f34-96c2-1c4a17076342: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"
--- further error 1 ---
Error: [e2e:l2b] destroying QN failed at place city 3052bae0-0646-4f34-96c2-1c4a17076342: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"

   at helpers/countries.ts:227

  225 |   const supabase = adminClient();
  226 |   const fail = (step: string, message: string) => {
> 227 |     throw new Error(`[e2e:l2b] destroying ${code} failed at ${step}: ${message}`);
      |           ^
  228 |   };
  229 |
  230 |   // CLOSE FIRST: a market that is still open outlives a partial failure as a
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:227:11)
    at destroyCountry (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:252:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2544:7
--- further error 2 ---
Error: [e2e:l2b] destroying QN failed at place city 3052bae0-0646-4f34-96c2-1c4a17076342: update or delete on table "locations" violates foreign key constraint "listing_locations_location_id_fkey" on table "listing_locations"

   at helpers/countries.ts:227

  225 |   const supabase = adminClient();
  226 |   const fail = (step: string, message: string) => {
> 227 |     throw new Error(`[e2e:l2b] destroying ${code} failed at ${step}: ${message}`);
      |           ^
  228 |   };
  229 |
  230 |   // CLOSE FIRST: a market that is still open outlives a partial failure as a
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:227:11)
    at destroyCountry (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/countries.ts:252:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1972:31
```

Context:

```text
          - listitem [ref=e268]:
            - generic [ref=e269]: About
          - listitem [ref=e270]:
            - generic [ref=e271]: How it works
      - navigation "Help" [ref=e272]:
        - heading "Help" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Safety
          - listitem [ref=e277]:
            - generic [ref=e278]: Contact
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Terms
          - listitem [ref=e284]:
            - generic [ref=e285]: Privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-7')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-7')


  977 |     await expectB("resume");
  978 |     await page.getByTestId("post-next").click();
> 979 |     await expect(page.getByTestId("post-step-7")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  980 |     await page.getByTestId("post-back").click();
  981 |     await expectB("after Back");
  982 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:979:51
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 2, shard 3, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jotzsb: e<n>e_par_lymmt<n> → e<n>e_chi_<n>m<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jxulls: e<n>e_par_hv<n>sqe → e<n>e_chi_rra<n>xd` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jotzsb: e<n>e_par_lymmt<n> → e<n>e_chi_<n>m<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jxulls: e<n>e_par_hv<n>sqe → e<n>e_chi_rra<n>xd ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 2, shard 3, shard 5, shard 6 · unavailable: shard 1, shard 4

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-08T06:27:02.579Z | 12.8 min |
| email | 2026-10-08T06:27:22.583Z | 0.1 min |
| shard 2 | 2026-10-08T06:26:54.009Z | 18.4 min |
| shard 3 | 2026-10-08T06:27:54.825Z | 22.6 min |
| shard 5 | 2026-10-08T06:26:54.966Z | 20.6 min |
| shard 6 | 2026-10-08T06:28:03.278Z | 20.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 24.1 min | shard 3, shard 6 |
| `shell.spec.ts` | 308 | 17.2 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 13.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 13.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 12.4 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.8 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 30 | 11.4 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 50 | 9.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 9.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 6.9 min | smoke, shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.2 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 4.8 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.7 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 12 | 2.7 min | shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.8 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 4 | 1.1 min | shard 5 |
| `settings.spec.ts` | 4 | 1.0 min | shard 3 |
| `posting-routes-identity.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 8 | 0.2 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 3 | 0.2 min | smoke, shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 75.9 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 46.5 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 44.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 43.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 41.0 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | mobile-360 | 39.1 s |
| `settings.spec.ts` › S-3 (U-4): wrong current password is rejected; correct one rotates the password | mobile-360 | 38.9 s |
| `posting-routes-catalog.spec.ts` › PR-42 the door reads a padded answer as the value it stores | mobile-360 | 37.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 36.6 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 36.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 36.1 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 34.8 s |
| `post-wizard-where.spec.ts` › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place | mobile-360 | 34.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 34.0 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 33.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37737532508-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37737532508-email
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 37737532508-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37737532508-3
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37737532508-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37737532508-6
```

## settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Account menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: 'Account menu' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Account menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: 'Account menu' })


  75 |   // Session intact: the header account menu (the shell's authenticated-branch
  76 |   // control, successor to the old header sign-out button) is still present.
> 77 |   await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toBeVisible();
     |                                                                             ^
  78 |
  79 |   // Correct current password: success feedback.
  80 |   await current.fill(user.password);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/settings.spec.ts:77:77
```

Context:

```text
          - listitem [ref=e203]:
            - generic [ref=e204]: About
          - listitem [ref=e205]:
            - generic [ref=e206]: How it works
      - navigation "Help" [ref=e207]:
        - heading "Help" [level=2] [ref=e208]
        - list [ref=e209]:
          - listitem [ref=e210]:
            - generic [ref=e211]: Safety
          - listitem [ref=e212]:
            - generic [ref=e213]: Contact
      - navigation "Legal" [ref=e214]:
        - heading "Legal" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: Terms
          - listitem [ref=e219]:
            - generic [ref=e220]: Privacy
    - paragraph [ref=e222]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-jxulls: e2e_par_hv3sqe → e2e_chi_rra9xd
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-jotzsb: e2e_par_lymmt7 → e2e_chi_5104m9
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  193 [mobile-360] › e2e/admin-translations-console.spec.ts:339:3 › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge (3.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37737532508-1-3034-3-ubsxuu@ethio-e2e.invalid)
  ✓  192 [mobile-360] › e2e/admin-translations-data.spec.ts:587:3 › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else (8.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37737532508-1-3034-2-jjokrq@ethio-e2e.invalid)
  ✓  195 [mobile-360] › e2e/admin-translations-governance.spec.ts:457:3 › U4g bulk approval, order and orphans › TR-20m mobile exposes both reorder controls for the parked fence (2.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37737532508-1-3034-2-jjokrq@ethio-e2e.invalid)
  ✓  194 [mobile-360] › e2e/admin-translations-console.spec.ts:408:3 › U4b translations console › TR-10 translator card proves both permission states (13.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37737532508-1-3034-3-ubsxuu@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 0da15e6a-b493-4e95-b09a-3050ec4a244e: []
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-jxulls: e2e_par_hv3sqe → e2e_chi_rra9xd
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37737532508-4-3161-2-glnvra@ethio-e2e.invalid)
  ✓  192 [desktop-1280] › e2e/admin-translations-data.spec.ts:452:3 › U4b translations console › TR-26 the Data scope approves every machine-filled content name (17.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37737532508-4-3161-3-jsqypi@ethio-e2e.invalid)
  ✓  195 [desktop-1280] › e2e/admin-translations-data.spec.ts:587:3 › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else (7.3s)
  ✓  194 [desktop-1280] › e2e/admin-translations-console.spec.ts:408:3 › U4b translations console › TR-10 translator card proves both permission states (12.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37737532508-4-3161-2-glnvra@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 3b16c041-1c3b-4b2d-b10c-d9f65f49e55f: []
  ✓  196 [desktop-1280] › e2e/admin-translations-console.spec.ts:500:3 › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision (14.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37737532508-4-3161-2-glnvra@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-jotzsb: e2e_par_lymmt7 → e2e_chi_5104m9
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```
