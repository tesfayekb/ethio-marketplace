# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37936102913
- Commit: `78fbfde0aab6df4947c5921965b3bc1873bba145`
- Attempt: 1
- Written (UTC): 2026-10-09T13:49:02.559Z
- Passed: 1621 · Skipped: 173 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried — Error: [e2e:pool] reaping e2e-pool-s2b-010@ethio-e2e.invalid (impersonation (actor_id)) failed: <html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) — Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (base role read) failed: <html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2b-010@ethio-e2e.invalid (impersonation (actor_id)) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2b-010@ethio-e2e.invalid (impersonation (actor_id)) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:289:22)
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-mobile-360`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (base role read) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (base role read) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:298:19)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-108-an-Other-basis-names-the-seller-s-written-unit-INC-371-mobile-360`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

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


  346 |     await expect(page.getByTestId("post-step-7")).toBeVisible();
  347 |     await page.getByTestId("post-next").click();
> 348 |     await expect(page.getByTestId("post-step-8")).toBeVisible();
      |                                                   ^
  349 |   }
  350 |
  351 |   const reviewPrice = (page: Page) =>
    at pricingToReview (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:348:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-mobile-360`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pt<n>: e<n>e_par_kvnjbt → e<n>e_chi_y<n>ji<n>r` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>jqhf: e<n>e_par_<n>dlulj → e<n>e_chi_<n>cd<n>lb` (quiet) | 1 | shard 1 |
| `upstream returned an HTML error page (<n>)` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pt<n>: e<n>e_par_kvnjbt → e<n>e_chi_y<n>ji<n>r ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>jqhf: e<n>e_par_<n>dlulj → e<n>e_chi_<n>cd<n>lb ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 2

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-09T13:21:35.941Z | 15.8 min |
| email | 2026-10-09T13:21:34.129Z | 0.3 min |
| shard 1 | 2026-10-09T13:21:28.662Z | 27.1 min |
| shard 2 | 2026-10-09T13:21:27.011Z | 25.2 min |
| shard 3 | 2026-10-09T13:21:33.357Z | 22.5 min |
| shard 4 | 2026-10-09T13:21:32.705Z | 27.1 min |
| shard 5 | 2026-10-09T13:21:34.998Z | 25.8 min |
| shard 6 | 2026-10-09T13:21:26.777Z | 19.1 min |
| changed | 2026-10-09T13:21:40.606Z | 20.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 128 | 40.6 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 504 | 29.6 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 21.9 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 48 | 12.3 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 11.8 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 11.7 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 10.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 10.5 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.2 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 30 | 9.8 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.6 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.5 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 8.7 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 8.7 min | shard 2, shard 5, changed |
| `admin-attributes-editor.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.7 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.6 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 36 | 6.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 6.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.9 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.7 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 2.9 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 10 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | mobile-360 | 70.2 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | desktop-1280 | 67.4 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | desktop-1280 | 67.3 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | mobile-360 | 67.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 55.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 44.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 43.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 43.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 41.9 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 40.9 s |
| `post-wizard-category.spec.ts` › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step | desktop-1280 | 40.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 40.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 39.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37936102913-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37936102913-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 37936102913-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 37936102913-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37936102913-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37936102913-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 37936102913-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37936102913-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37936102913-changed
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-mobile-360`

## shell.spec.ts › mobile chrome › the menu closes back to the icons

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-1-0-kmwyli')
Expected: "page"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-1-0-kmwyli')

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-1-0-kmwyli')
Expected: "page"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('rail-category-e2e-cat-1-0-kmwyli')


  1082 |     );
  1083 |     menu = await openRailScope(page);
> 1084 |     await expect(menu.getByTestId(testid)).toHaveAttribute("aria-current", "page");
       |                                            ^
  1085 |   });
  1086 |
  1087 |   test("the rail-collapse toggle does not exist on mobile", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:44
```

Context:

```text
          - listitem [ref=e378]:
            - generic [ref=e379]: About
          - listitem [ref=e380]:
            - generic [ref=e381]: How it works
      - navigation "Help" [ref=e382]:
        - heading "Help" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - generic [ref=e386]: Safety
          - listitem [ref=e387]:
            - generic [ref=e388]: Contact
      - navigation "Legal" [ref=e389]:
        - heading "Legal" [level=2] [ref=e390]
        - list [ref=e391]:
          - listitem [ref=e392]:
            - generic [ref=e393]: Terms
          - listitem [ref=e394]:
            - generic [ref=e395]: Privacy
    - paragraph [ref=e397]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')

--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  335 |       page.getByTestId("post-where-details-failed"),
  336 |       "PW-179: the failed read was not shown",
> 337 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  338 |
  339 |     await savePinOnMap(page, 120, 90);
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-desktop-1280`

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: net::ERR_NAME_NOT_RESOLVED
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found) ×4
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
```
