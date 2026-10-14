# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38640035525
- Commit: `447cbb19d11c297794e8ce1ad2ea3c278d57dde0`
- Attempt: 1
- Written (UTC): 2026-10-14T22:07:36.888Z
- Passed: 1696 · Skipped: 126 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown — Error: [e2e:pool] reaping e2e-pool-s1b-010@ethio-e2e.invalid (rate limits) failed: <html>

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1b-010@ethio-e2e.invalid (rate limits) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s1b-010@ethio-e2e.invalid (rate limits) failed: <html>
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
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:261:21)
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-16-The-listing-page-s-door-who-reads-what-drafts-never-a-pin-and-an-address-named-but-never-shown-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-211bf-dress-named-but-never-shown-mobile-360`; this run carried 6 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>qned: e<n>e_par_zppl<n>r → e<n>e_chi_i<n>vv<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-miczqp: e<n>e_par_xl<n>ciu → e<n>e_chi_rsbvpw` (quiet) | 1 | shard 4 |
| `rate limit photo-links:address: upstream returned an HTML error page (<n>) \| <head><title><n> Bad Gateway</title></head>` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>qned: e<n>e_par_zppl<n>r → e<n>e_chi_i<n>vv<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-miczqp: e<n>e_par_xl<n>ciu → e<n>e_chi_rsbvpw ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-27 edit_listing counts against the revise dial ×1 · PR-41 the door refuses an answer the chosen options do not allow ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### rate limit photo-links:address: upstream returned an HTML error page (<n>) | <head><title><n> Bad Gateway</title></head>

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SC-21 Photo changes on live ads: a seller's additions, edit and removal are list ×1 · TR-scope AI: a translator outside the language gets the structured refusal ×1

```text
[WebServer] [ssr-error] /api/media/photo-links rate limit photo-links:address: upstream returned an HTML error page (502) | <head><title>502 Bad Gateway</title></head>
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T21:31:43.448Z | 15.9 min |
| email | 2026-10-14T21:31:41.385Z | 0.2 min |
| shard 1 | 2026-10-14T21:31:43.129Z | 30.7 min |
| shard 2 | 2026-10-14T21:31:48.074Z | 32.2 min |
| shard 3 | 2026-10-14T21:31:44.008Z | 25.8 min |
| shard 4 | 2026-10-14T21:31:54.787Z | 34.2 min |
| shard 5 | 2026-10-14T21:31:51.944Z | 35.4 min |
| shard 6 | 2026-10-14T21:31:41.333Z | 26.5 min |
| changed | 2026-10-14T21:31:49.607Z | 5.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 22.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 21.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.1 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 58 | 17.3 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 16.4 min | shard 2, shard 5, changed |
| `post-wizard-pricing.spec.ts` | 50 | 15.4 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 13.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 11.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.9 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.9 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.2 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 9.2 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 44 | 8.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.7 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 20 | 8.6 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.7 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.1 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 16 | 4.1 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.2 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 1.0 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 155.7 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 110.0 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 74.9 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 74.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 71.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 69.3 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 69.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 66.7 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 62.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 54.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 52.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 51.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 48.7 s |
| `post-wizard-specs.spec.ts` › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile | desktop-1280 | 48.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38640035525-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38640035525-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38640035525-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38640035525-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38640035525-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38640035525-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38640035525-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38640035525-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38640035525-changed
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-card').getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-continue')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-card').getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-continue')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-card').getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-continue')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-card').getByTestId('my-listing-36382f4b-4ff5-4940-8964-a79ac9f2aecf-continue')


  403 |
  404 |     const cont = twin(page, s.D).getByTestId(`my-listing-${s.D}-continue`);
> 405 |     await expect(cont).toBeVisible({ timeout: 15000 });
      |                        ^
  406 |     await cont.click();
  407 |     await expect(page).toHaveURL(new RegExp(`/post/${s.D}(?:[?#].*)?$`), { timeout: 15000 });
  408 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:405:24
```

Context:

```text
          - listitem [ref=e201]:
            - generic [ref=e202]: About
          - listitem [ref=e203]:
            - generic [ref=e204]: How it works
      - navigation "Help" [ref=e205]:
        - heading "Help" [level=2] [ref=e206]
        - list [ref=e207]:
          - listitem [ref=e208]:
            - generic [ref=e209]: Safety
          - listitem [ref=e210]:
            - generic [ref=e211]: Contact
      - navigation "Legal" [ref=e212]:
        - heading "Legal" [level=2] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]:
            - generic [ref=e216]: Terms
          - listitem [ref=e217]:
            - generic [ref=e218]: Privacy
    - paragraph [ref=e220]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  429 |       const anonymous = await fresh.newPage();
  430 |       await anonymous.goto("/my-listings");
> 431 |       await expect(anonymous).toHaveURL(/\/auth\?return=(?:%2F|\/)my-listings/, {
      |                               ^
  432 |         timeout: 15000,
  433 |       });
  434 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:431:31
```

Context:

```text
          - listitem [ref=e159]:
            - generic [ref=e160]: About
          - listitem [ref=e161]:
            - generic [ref=e162]: How it works
      - navigation "Help" [ref=e163]:
        - heading "Help" [level=2] [ref=e164]
        - list [ref=e165]:
          - listitem [ref=e166]:
            - generic [ref=e167]: Safety
          - listitem [ref=e168]:
            - generic [ref=e169]: Contact
      - navigation "Legal" [ref=e170]:
        - heading "Legal" [level=2] [ref=e171]
        - list [ref=e172]:
          - listitem [ref=e173]:
            - generic [ref=e174]: Terms
          - listitem [ref=e175]:
            - generic [ref=e176]: Privacy
    - paragraph [ref=e178]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    2 × unexpected value "http://127.0.0.1:4173/my-listings"
    17 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    2 × unexpected value "http://127.0.0.1:4173/my-listings"
    17 × unexpected value "http://127.0.0.1:4173/"


  429 |       const anonymous = await fresh.newPage();
  430 |       await anonymous.goto("/my-listings");
> 431 |       await expect(anonymous).toHaveURL(/\/auth\?return=(?:%2F|\/)my-listings/, {
      |                               ^
  432 |         timeout: 15000,
  433 |       });
  434 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:431:31
```

Context:

```text
          - listitem [ref=e192]:
            - generic [ref=e193]: About
          - listitem [ref=e194]:
            - generic [ref=e195]: How it works
      - navigation "Help" [ref=e196]:
        - heading "Help" [level=2] [ref=e197]
        - list [ref=e198]:
          - listitem [ref=e199]:
            - generic [ref=e200]: Safety
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Legal" [ref=e203]:
        - heading "Legal" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Terms
          - listitem [ref=e208]:
            - generic [ref=e209]: Privacy
    - paragraph [ref=e211]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138)

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('my-listing-5ff2c7f2-77de-4c26-ae61-80ce8a5b3073-card').getByTestId('my-listing-5ff2c7f2-77de-4c26-ae61-80ce8a5b3073-continue')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('my-listing-5ff2c7f2-77de-4c26-ae61-80ce8a5b3073-card').getByTestId('my-listing-5ff2c7f2-77de-4c26-ae61-80ce8a5b3073-continue')


  403 |
  404 |     const cont = twin(page, s.D).getByTestId(`my-listing-${s.D}-continue`);
> 405 |     await expect(cont).toBeVisible({ timeout: 15000 });
      |                        ^
  406 |     await cont.click();
  407 |     await expect(page).toHaveURL(new RegExp(`/post/${s.D}(?:[?#].*)?$`), { timeout: 15000 });
  408 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:405:24
```

Context:

```text
          - listitem [ref=e201]:
            - generic [ref=e202]: About
          - listitem [ref=e203]:
            - generic [ref=e204]: How it works
      - navigation "Help" [ref=e205]:
        - heading "Help" [level=2] [ref=e206]
        - list [ref=e207]:
          - listitem [ref=e208]:
            - generic [ref=e209]: Safety
          - listitem [ref=e210]:
            - generic [ref=e211]: Contact
      - navigation "Legal" [ref=e212]:
        - heading "Legal" [level=2] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]:
            - generic [ref=e216]: Terms
          - listitem [ref=e217]:
            - generic [ref=e218]: Privacy
    - paragraph [ref=e220]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    - unexpected value "http://127.0.0.1:4173/my-listings"
    18 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    - unexpected value "http://127.0.0.1:4173/my-listings"
    18 × unexpected value "http://127.0.0.1:4173/"


  429 |       const anonymous = await fresh.newPage();
  430 |       await anonymous.goto("/my-listings");
> 431 |       await expect(anonymous).toHaveURL(/\/auth\?return=(?:%2F|\/)my-listings/, {
      |                               ^
  432 |         timeout: 15000,
  433 |       });
  434 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:431:31
```

Context:

```text
          - listitem [ref=e159]:
            - generic [ref=e160]: About
          - listitem [ref=e161]:
            - generic [ref=e162]: How it works
      - navigation "Help" [ref=e163]:
        - heading "Help" [level=2] [ref=e164]
        - list [ref=e165]:
          - listitem [ref=e166]:
            - generic [ref=e167]: Safety
          - listitem [ref=e168]:
            - generic [ref=e169]: Contact
      - navigation "Legal" [ref=e170]:
        - heading "Legal" [level=2] [ref=e171]
        - list [ref=e172]:
          - listitem [ref=e173]:
            - generic [ref=e174]: Terms
          - listitem [ref=e175]:
            - generic [ref=e176]: Privacy
    - paragraph [ref=e178]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?return=(?:%2F|\/)my-listings/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  429 |       const anonymous = await fresh.newPage();
  430 |       await anonymous.goto("/my-listings");
> 431 |       await expect(anonymous).toHaveURL(/\/auth\?return=(?:%2F|\/)my-listings/, {
      |                               ^
  432 |         timeout: 15000,
  433 |       });
  434 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:431:31
```

Context:

```text
          - listitem [ref=e192]:
            - generic [ref=e193]: About
          - listitem [ref=e194]:
            - generic [ref=e195]: How it works
      - navigation "Help" [ref=e196]:
        - heading "Help" [level=2] [ref=e197]
        - list [ref=e198]:
          - listitem [ref=e199]:
            - generic [ref=e200]: Safety
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Legal" [ref=e203]:
        - heading "Legal" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Terms
          - listitem [ref=e208]:
            - generic [ref=e209]: Privacy
    - paragraph [ref=e211]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
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
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:34100:25) at http://127.0.0.1:4173/assets/index-BDv4A-TU.js:34132:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6025:5)
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
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
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:34100:25) at http://127.0.0.1:4173/assets/index-BDv4A-TU.js:34132:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BDv4A-TU.js:6025:5)
console.error: [client-error] gate fetch threw
```
