# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38134773102
- Commit: `fe7ebe2bd2ab8e1eac573e8516529105d8746c0a`
- Attempt: 1
- Written (UTC): 2026-10-11T11:44:22.983Z
- Passed: 1567 · Skipped: 124 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Error: [e2e:l2a] no anchor in QU: no row

## Flaky bodies (DEC-078)

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: [e2e:l2a] no anchor in QU: no row
--- further error 1 ---
Error: [e2e:l2a] no anchor in QU: no row

   at helpers/locations.ts:314

  312 |     .maybeSingle();
  313 |   if (error || !data) {
> 314 |     throw new Error(`[e2e:l2a] no anchor in ${countryCode}: ${error?.message ?? "no row"}`);
      |           ^
  315 |   }
  316 |   return data;
  317 | }
    at anchorOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:314:11)
    at seedScratchChain (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:343:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:999:15
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

113 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 4, shard 7, shard 8 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 5, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 6 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 6 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 6 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 6 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 6 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 6 |
| `locations file too large` (quiet) | 2 | shard 2, shard 6 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 6 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 6 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 6 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 6 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 6 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 6 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>zivl: e<n>e_par_usg<n>df → e<n>e_chi_uczq<n>d` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tx<n>cuw: e<n>e_par_emsy<n>c → e<n>e_chi_fhyfjm` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>zivl: e<n>e_par_usg<n>df → e<n>e_chi_uczq<n>d ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tx<n>cuw: e<n>e_par_emsy<n>c → e<n>e_chi_fhyfjm ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-11T11:14:49.707Z | 17.6 min |
| email | 2026-10-11T11:15:03.493Z | 0.3 min |
| shard 1 | 2026-10-11T11:15:03.340Z | 27.8 min |
| shard 2 | 2026-10-11T11:14:58.092Z | 27.3 min |
| shard 3 | 2026-10-11T11:14:56.223Z | 26.1 min |
| shard 4 | 2026-10-11T11:14:47.134Z | 26.8 min |
| shard 5 | 2026-10-11T11:14:52.756Z | 27.6 min |
| shard 6 | 2026-10-11T11:15:00.857Z | 26.2 min |
| shard 7 | 2026-10-11T11:14:59.449Z | 26.3 min |
| shard 8 | 2026-10-11T11:14:52.287Z | 29.2 min |
| changed | 2026-10-11T11:14:51.164Z | 10.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 29.2 min | shard 4, shard 8 |
| `admin-listings.spec.ts` | 48 | 27.8 min | shard 1, shard 5, changed |
| `post-wizard-bundle2.spec.ts` | 66 | 26.6 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.1 min | smoke, shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 50 | 19.7 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 19.0 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 17.9 min | shard 2, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 17.1 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 16.6 min | shard 3, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 48 | 15.6 min | shard 1, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 13.0 min | shard 4, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 13.0 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 11.7 min | shard 4, shard 8 |
| `admin-locations.spec.ts` | 38 | 10.8 min | shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.7 min | shard 1, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 10.5 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 30 | 10.4 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 10.2 min | smoke, shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 10.1 min | shard 3, shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 9.8 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 28 | 9.7 min | shard 2, shard 6 |
| `feed-screens.spec.ts` | 28 | 9.6 min | shard 2, shard 6 |
| `admin-users.spec.ts` | 26 | 8.7 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 40 | 8.5 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.2 min | shard 4, shard 8 |
| `admin-roles.spec.ts` | 26 | 7.4 min | shard 2, shard 6 |
| `feed-route.spec.ts` | 16 | 6.5 min | shard 2, shard 6 |
| `admin-shell.spec.ts` | 20 | 6.5 min | shard 2, shard 6, changed |
| `import-security.spec.ts` | 34 | 5.9 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 4, shard 8 |
| `admin-attributes-safety.spec.ts` | 14 | 5.8 min | shard 1, shard 5 |
| `admin-audit.spec.ts` | 12 | 4.4 min | shard 1, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.8 min | shard 4, shard 8 |
| `admin-categories-home.spec.ts` | 8 | 3.2 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 3.0 min | shard 3, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.8 min | shard 3, shard 7 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 4, shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.9 min | shard 2, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 4, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 6 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 4, shard 8 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `category-nav.spec.ts` | 10 | 0.7 min | shard 2, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 6 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-11 All listings page with listings:view alone: the public name, never the e-mail | desktop-1280 | 106.4 s |
| `admin-listings.spec.ts` › AL-11 All listings page with listings:view alone: the public name, never the e-mail | mobile-360 | 106.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 69.3 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 67.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 66.4 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | mobile-360 | 64.3 s |
| `admin-listings.spec.ts` › AL-11 All listings page with listings:view alone: the public name, never the e-mail | mobile-360 | 63.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 63.3 s |
| `admin-listings.spec.ts` › AL-11 All listings page with listings:view alone: the public name, never the e-mail | desktop-1280 | 62.7 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 62.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 60.8 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | desktop-1280 | 60.0 s |
| `admin-screening.spec.ts` › SC-4 only a reviewer with a fresh second factor decides | desktop-1280 | 59.4 s |
| `admin-listings.spec.ts` › AL-3 Edit refuses the person who may not edit: no permission, a reviewer, no second factor | mobile-360 | 58.2 s |
| `admin-screening.spec.ts` › SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | desktop-1280 | 53.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38134773102-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38134773102-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 7, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38134773102-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 27 (pool 5, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38134773102-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 4, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38134773102-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38134773102-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 7, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38134773102-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 21 (pool 5, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 24 user(s) owned by process 38134773102-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 4, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38134773102-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38134773102-8
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 8, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38134773102-changed
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view alone: the public name, never the e-mail

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  841 |     await signInViaSession(page, viewer.email, viewer.password);
  842 |     await gotoReady(page, "/admin/listings");
> 843 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  844 |     await page.getByTestId("listings-search").fill(live.id);
  845 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
  846 |     await expect(listingRow(page, live.id)).toContainText(seller.alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:843:55
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view alone: the public name, never the e-mail

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  841 |     await signInViaSession(page, viewer.email, viewer.password);
  842 |     await gotoReady(page, "/admin/listings");
> 843 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  844 |     await page.getByTestId("listings-search").fill(live.id);
  845 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
  846 |     await expect(listingRow(page, live.id)).toContainText(seller.alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:843:55
```

Context:

```text
          - listitem [ref=e391]:
            - generic [ref=e392]: About
          - listitem [ref=e393]:
            - generic [ref=e394]: How it works
      - navigation "Help" [ref=e395]:
        - heading "Help" [level=2] [ref=e396]
        - list [ref=e397]:
          - listitem [ref=e398]:
            - generic [ref=e399]: Safety
          - listitem [ref=e400]:
            - generic [ref=e401]: Contact
      - navigation "Legal" [ref=e402]:
        - heading "Legal" [level=2] [ref=e403]
        - list [ref=e404]:
          - listitem [ref=e405]:
            - generic [ref=e406]: Terms
          - listitem [ref=e407]:
            - generic [ref=e408]: Privacy
    - paragraph [ref=e410]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view alone: the public name, never the e-mail

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  841 |     await signInViaSession(page, viewer.email, viewer.password);
  842 |     await gotoReady(page, "/admin/listings");
> 843 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  844 |     await page.getByTestId("listings-search").fill(live.id);
  845 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
  846 |     await expect(listingRow(page, live.id)).toContainText(seller.alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:843:55
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view alone: the public name, never the e-mail

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  841 |     await signInViaSession(page, viewer.email, viewer.password);
  842 |     await gotoReady(page, "/admin/listings");
> 843 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  844 |     await page.getByTestId("listings-search").fill(live.id);
  845 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
  846 |     await expect(listingRow(page, live.id)).toContainText(seller.alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:843:55
```

Context:

```text
          - listitem [ref=e391]:
            - generic [ref=e392]: About
          - listitem [ref=e393]:
            - generic [ref=e394]: How it works
      - navigation "Help" [ref=e395]:
        - heading "Help" [level=2] [ref=e396]
        - list [ref=e397]:
          - listitem [ref=e398]:
            - generic [ref=e399]: Safety
          - listitem [ref=e400]:
            - generic [ref=e401]: Contact
      - navigation "Legal" [ref=e402]:
        - heading "Legal" [level=2] [ref=e403]
        - list [ref=e404]:
          - listitem [ref=e405]:
            - generic [ref=e406]: Terms
          - listitem [ref=e407]:
            - generic [ref=e408]: Privacy
    - paragraph [ref=e410]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-10zivl: e2e_par_usg5df → e2e_chi_uczq2d
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:34065:25) at http://127.0.0.1:4173/assets/index-Bwt43pP0.js:34097:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:5120:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6025:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6016:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6024:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6016:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6024:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6016:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6024:5)
console.error: [client-error] gate fetch threw
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-5-0-tx0cuw: e2e_par_emsy4c → e2e_chi_fhyfjm
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:34065:25) at http://127.0.0.1:4173/assets/index-Bwt43pP0.js:34097:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:5120:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6025:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6016:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6024:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6016:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6024:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6016:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Bwt43pP0.js:6024:5) ×3
```
