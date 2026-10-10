# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38026670798
- Commit: `12b3a9f55d49b000bdecf4936c6fc4f514dcbc97`
- Attempt: 1
- Written (UTC): 2026-10-10T05:38:04.412Z
- Passed: 1452 · Skipped: 124 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  1525 |       const mark = calls.length;
  1526 |       await page.getByTestId("post-next").click();
> 1527 |       await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
       |                                                     ^
  1528 |       expect(calls.length - mark, `PW-144: pass ${pass} with nothing changed called identity`).toBe(
  1529 |         0,
  1530 |       );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1527:53
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-mobile-360`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')


  1638 |     await expect(page.getByTestId("post-step-7")).toBeVisible();
  1639 |     await page.getByTestId("post-next").click();
> 1640 |     await expect(page.getByTestId("post-step-8")).toBeVisible();
       |                                                   ^
  1641 |     const review = page.locator(
  1642 |       '[data-testid="post-review-section"][data-step="3"] [data-testid="post-review-value"]',
  1643 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1640:51
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>d<n>wh: e<n>e_par_<n>iu<n>zv → e<n>e_chi_<n>xeq<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>lutar: e<n>e_par_a<n>fdwi → e<n>e_chi_<n>vvktb` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>d<n>wh: e<n>e_par_<n>iu<n>zv → e<n>e_chi_<n>xeq<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>lutar: e<n>e_par_a<n>fdwi → e<n>e_chi_<n>vvktb ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-10T05:12:55.017Z | 14.1 min |
| email | 2026-10-10T05:12:53.750Z | 0.2 min |
| shard 1 | 2026-10-10T05:12:54.400Z | 23.1 min |
| shard 2 | 2026-10-10T05:12:52.285Z | 23.6 min |
| shard 3 | 2026-10-10T05:12:57.349Z | 22.0 min |
| shard 4 | 2026-10-10T05:12:50.644Z | 24.9 min |
| shard 5 | 2026-10-10T05:12:54.313Z | 23.1 min |
| shard 6 | 2026-10-10T05:12:57.896Z | 20.7 min |
| changed | 2026-10-10T05:13:02.791Z | 1.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 22.3 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 17.9 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 16.9 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 11.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.1 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.6 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.3 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 10.0 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 9.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.4 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 26 | 6.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.6 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 6.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.4 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.6 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 8 | 3.3 min | shard 3, shard 6, changed |
| `posting-routes-dials.spec.ts` | 14 | 3.3 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 3.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 12 | 2.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.4 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 4, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 1 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-144 leaving the contact step makes one identity call, or none when nothing changed | mobile-360 | 51.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 46.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 45.7 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 43.8 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 41.4 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 40.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 39.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 39.3 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 39.1 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 39.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 38.2 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 38.0 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 36.9 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 36.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38026670798-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38026670798-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 5, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 22 user(s) owned by process 38026670798-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 29 (pool 4, fresh 25)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 33 user(s) owned by process 38026670798-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38026670798-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38026670798-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38026670798-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38026670798-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38026670798-changed
```

## posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null

  141 |         .eq("user_id", user.id)
  142 |         .select("user_id");
> 143 |       expect(result.error, `PR-43: ${Object.keys(patch)[0]} was written directly`).not.toBeNull();
      |                                                                                        ^
  144 |     }
  145 |     expect(await stored()).toEqual(before);
  146 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:143:88
```

Context:

```text
          - listitem [ref=e242]:
            - generic [ref=e243]: About
          - listitem [ref=e244]:
            - generic [ref=e245]: How it works
      - navigation "Help" [ref=e246]:
        - heading "Help" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Safety
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Legal" [ref=e253]:
        - heading "Legal" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Terms
          - listitem [ref=e258]:
            - generic [ref=e259]: Privacy
    - paragraph [ref=e261]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null

  141 |         .eq("user_id", user.id)
  142 |         .select("user_id");
> 143 |       expect(result.error, `PR-43: ${Object.keys(patch)[0]} was written directly`).not.toBeNull();
      |                                                                                        ^
  144 |     }
  145 |     expect(await stored()).toEqual(before);
  146 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:143:88
```

Context:

```text
          - listitem [ref=e282]:
            - generic [ref=e283]: About
          - listitem [ref=e284]:
            - generic [ref=e285]: How it works
      - navigation "Help" [ref=e286]:
        - heading "Help" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Safety
          - listitem [ref=e291]:
            - generic [ref=e292]: Contact
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Terms
          - listitem [ref=e298]:
            - generic [ref=e299]: Privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can

- Source: `changed`
- Project: `mobile-360`

```text
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null

  141 |         .eq("user_id", user.id)
  142 |         .select("user_id");
> 143 |       expect(result.error, `PR-43: ${Object.keys(patch)[0]} was written directly`).not.toBeNull();
      |                                                                                        ^
  144 |     }
  145 |     expect(await stored()).toEqual(before);
  146 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:143:88
```

Context:

```text
          - listitem [ref=e242]:
            - generic [ref=e243]: About
          - listitem [ref=e244]:
            - generic [ref=e245]: How it works
      - navigation "Help" [ref=e246]:
        - heading "Help" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Safety
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Legal" [ref=e253]:
        - heading "Legal" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Terms
          - listitem [ref=e258]:
            - generic [ref=e259]: Privacy
    - paragraph [ref=e261]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: PR-43: display_name was written directly

expect(received).not.toBeNull()

Received: null

  141 |         .eq("user_id", user.id)
  142 |         .select("user_id");
> 143 |       expect(result.error, `PR-43: ${Object.keys(patch)[0]} was written directly`).not.toBeNull();
      |                                                                                        ^
  144 |     }
  145 |     expect(await stored()).toEqual(before);
  146 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:143:88
```

Context:

```text
          - listitem [ref=e282]:
            - generic [ref=e283]: About
          - listitem [ref=e284]:
            - generic [ref=e285]: How it works
      - navigation "Help" [ref=e286]:
        - heading "Help" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Safety
          - listitem [ref=e291]:
            - generic [ref=e292]: Contact
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Terms
          - listitem [ref=e298]:
            - generic [ref=e299]: Privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
