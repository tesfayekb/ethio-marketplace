# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38705855855
- Commit: `565b19bcc86a392e4715a272302f5909d604c451`
- Attempt: 1
- Written (UTC): 2026-10-15T09:18:29.491Z
- Passed: 1866 · Skipped: 126 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove — Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (password) failed: {}
- FLAKY (passed on retry) · `mobile-360` · source `changed` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (password) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (password) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:163:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:929:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-is-ticked-and-a-lone-city-box-offers-no-Remove-desktop-1280` — Playwright's name `post-wizard-place-POSTING--5d9be-e-city-box-offers-no-Remove-desktop-1280`; this run carried 4 context file(s); of the same spec: none

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-mobile-360`; this run carried 4 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>gatm: e<n>e_par_uynng<n> → e<n>e_chi_t<n>o<n>ek` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hquxbq: e<n>e_par_iksdyg → e<n>e_chi_<n>sr<n>c` (quiet) | 1 | shard 1 |
| `Project not specified.` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>gatm: e<n>e_par_uynng<n> → e<n>e_chi_t<n>o<n>ek ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hquxbq: e<n>e_par_iksdyg → e<n>e_chi_<n>sr<n>c ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · /settings shows the Account context, and returning shows categories ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Project not specified.

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-26 option key order and an explicit null preview unchanged ×1 · AT-33 the dependency doors refuse and name what they judged ×1

```text
[WebServer] [ssr-error] /api/feed Project not specified.
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T08:35:15.981Z | 17.2 min |
| email | 2026-10-15T08:35:12.587Z | 0.2 min |
| shard 1 | 2026-10-15T08:35:16.131Z | 42.8 min |
| shard 2 | 2026-10-15T08:35:13.831Z | 39.5 min |
| shard 3 | 2026-10-15T08:35:14.866Z | 38.0 min |
| shard 4 | 2026-10-15T08:35:15.922Z | 39.5 min |
| shard 5 | 2026-10-15T08:35:09.427Z | 40.5 min |
| shard 6 | 2026-10-15T08:35:16.210Z | 30.7 min |
| changed | 2026-10-15T08:35:17.707Z | 36.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 120 | 54.0 min | shard 1, shard 4, changed |
| `my-listings-doors.spec.ts` | 52 | 33.7 min | shard 2, shard 5, changed |
| `my-listings-ad.spec.ts` | 56 | 30.7 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 80 | 26.8 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 22.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.1 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 19.4 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.0 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 28 | 17.6 min | shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.9 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 14.5 min | shard 3, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 44 | 13.5 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.6 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 11.1 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 10.8 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 10.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 10.2 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 10.1 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.3 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.9 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.8 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 7.2 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 6.9 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 6.8 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 16 | 6.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.7 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 3, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 150.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 147.1 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 97.1 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 89.4 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | mobile-360 | 88.1 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | desktop-1280 | 82.3 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 80.4 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | mobile-360 | 80.2 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4) | desktop-1280 | 76.9 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 71.4 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 62.1 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 62.0 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 61.5 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 60.7 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 60.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38705855855-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38705855855-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38705855855-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING failed to delete a9272263-8a2c-4095-8fb1-0697e07b85f4: {} — deferred to the nightly sweep
[e2e:teardown] deleted 37 user(s) owned by process 38705855855-2, 1 deferred to the nightly sweep
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38705855855-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38705855855-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38705855855-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38705855855-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38705855855-changed
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/e3d88917-d901-447d-bc93-9946828e7b12"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/e3d88917-d901-447d-bc93-9946828e7b12"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/e3d88917-d901-447d-bc93-9946828e7b12"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/e3d88917-d901-447d-bc93-9946828e7b12"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "listing not found"

  1038 |       },
  1039 |     });
> 1040 |     expect(judged.error).toBeNull();
       |                          ^
  1041 |     const data = judged.data as Row;
  1042 |     expect(data["ok"]).toBe(false);
  1043 |     expect(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1040:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/bb55b1c2-6b64-4bf7-895a-ac5750d27a5b"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/bb55b1c2-6b64-4bf7-895a-ac5750d27a5b"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/bb55b1c2-6b64-4bf7-895a-ac5750d27a5b"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/bb55b1c2-6b64-4bf7-895a-ac5750d27a5b"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--desktop-1280`; this run carried 4 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/e9bae73a-36a7-424d-9e30-761165f4c79d"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/e9bae73a-36a7-424d-9e30-761165f4c79d"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/e9bae73a-36a7-424d-9e30-761165f4c79d"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/e9bae73a-36a7-424d-9e30-761165f4c79d"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/b76cc57d-44ba-47e4-b1b4-037902720045"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/b76cc57d-44ba-47e4-b1b4-037902720045"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/post\/[0-9a-f-]{36}(?:[?#].*)?$/
Received string:  "http://127.0.0.1:4173/my-listings/b76cc57d-44ba-47e4-b1b4-037902720045"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/my-listings/b76cc57d-44ba-47e4-b1b4-037902720045"


  1003 |     await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
  1004 |     await copy.click();
> 1005 |     await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
       |                        ^
  1006 |     const N = new URL(page.url()).pathname.split("/")[2]!;
  1007 |     expect(N).not.toBe(S);
  1008 |     listingIds.push(N);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1005:24
```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "residencyUnknown"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "residencyUnknown"

  1067 |
  1068 |     const copied = await me.rpc("copy_my_listing", { p_listing_id: X.id });
> 1069 |     expect(copied.error).toBeNull();
       |                          ^
  1070 |     const answer = copied.data as Row;
  1071 |     expect(answer["ok"]).toBe(true);
  1072 |     const N = answer["listing_id"] as string;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1069:26
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--desktop-1280`; this run carried 4 context file(s); of the same spec: none

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
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34136:25) at http://127.0.0.1:4173/assets/index-DlOWmlSk.js:34168:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DlOWmlSk.js:6025:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [posting] schema read failed: TypeError: Failed to fetch
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
[client-error] console.error: [posting] schema read failed: TypeError: Failed to fetch
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/copy_my_listing ({"code":"P0001","details":null,"hint":null,"message":"residencyUnknown"})
console.error: [client-error] gate fetch threw
```
