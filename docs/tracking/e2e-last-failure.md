# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38738693239
- Commit: `fa009bfac50d4bdaf0ce46dda67a418a162a7b51`
- Attempt: 1
- Written (UTC): 2026-10-15T13:35:51.882Z
- Passed: 1766 · Skipped: 126 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-11 edit_my_listing: amounts and picked answers apply at once; words and a refused ad's edit go to review (D177) — Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (listings) failed: <html>

## Flaky bodies (DEC-078)

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-11 edit_my_listing: amounts and picked answers apply at once; words and a refused ad's edit go to review (D177)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (listings) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (listings) failed: <html>
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
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:259:23)
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-11-edit_my_listing-amounts-and-picked-answers-apply-at-once-words-and-a-refused-ad-s-edit-go-to-review-D177-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-d5fb4-d-s-edit-go-to-review-D177--desktop-1280`; this run carried 2 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>sclib: e<n>e_par_acaxh<n> → e<n>e_chi_h<n>trv<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vyxk<n>a: e<n>e_par_<n>knef<n> → e<n>e_chi_cdv<n>qk` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>sclib: e<n>e_par_acaxh<n> → e<n>e_chi_h<n>trv<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vyxk<n>a: e<n>e_par_<n>knef<n> → e<n>e_chi_cdv<n>qk ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · logo cell sits exactly above the rail and beside the top bar ×1 · PR-37 coverage first appearance is stored once, renumbered in either order ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T12:58:57.830Z | 15.3 min |
| email | 2026-10-15T12:59:09.611Z | 0.3 min |
| shard 1 | 2026-10-15T12:58:57.438Z | 36.5 min |
| shard 2 | 2026-10-15T12:58:52.424Z | 31.1 min |
| shard 3 | 2026-10-15T12:58:59.707Z | 31.4 min |
| shard 4 | 2026-10-15T12:59:02.009Z | 32.3 min |
| shard 5 | 2026-10-15T12:58:55.720Z | 35.8 min |
| shard 6 | 2026-10-15T12:58:54.330Z | 26.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 21.8 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 21.6 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 20.0 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.1 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 15.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.8 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 60 | 12.5 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 12.1 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 48 | 11.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 11.2 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 11.2 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.5 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.4 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 28 | 9.9 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 9.0 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.2 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.2 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.1 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 6.3 min | shard 1, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 5.5 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.3 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.5 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 2.9 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 60.0 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 54.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 53.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 53.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 49.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 48.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 45.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 44.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 43.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 42.9 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 42.0 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 41.7 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 41.5 s |
| `my-listings-doors.spec.ts` › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187) | mobile-360 | 41.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38738693239-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38738693239-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38738693239-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38738693239-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38738693239-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38738693239-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38738693239-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38738693239-6
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16 · scratch 1: e2e-cat-4-0-o7iznr@15
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16 · scratch 1: e2e-cat-4-0-o7iznr@15
[ct18-dump] preview: 14 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":11}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":15}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":13}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":5}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":14}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":9}
[ct18-dump]   sent: commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump]   now:  commercial-equipment/construction-tools,construction-tools,commercial-equipment,Tools & Site Machinery,የግንባታ መሳሪያዎች,4,true,true,false,true,,once,true,,Drill,,,,construction,0,
[ct18-dump] electronics · display_order · file {"display_order":2}
[ct18-dump]   sent: electronics,electronics,,Electronics,ኤሌክትሮኒክስ,2,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump]   now:  electronics,electronics,,Electronics,ኤሌክትሮኒክስ,1,true,false,false,true,,once,true,,Laptop,,,,,0,
[ct18-dump] fashion · display_order · file {"display_order":3}
[ct18-dump]   sent: babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump]   now:  babies-kids/kids-clothing,kids-clothing,babies-kids,Kids & Baby Clothing,የልጆች ልብስ,2,true,true,false,true,,once,true,,Shirt,,,,fashion,0,
[ct18-dump] home-garden · display_order · file {"display_order":4}
[ct18-dump]   sent: home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,4,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump]   now:  home-garden,home-garden,,Home & Garden,ቁሳቁሶችና መሳሪያዎች,3,true,false,false,true,,once,true,,Home,,,,,0,
[ct18-dump] pets-animals · display_order · file {"display_order":12}
[ct18-dump]   sent: agriculture-farming/livestock,livestock,agriculture-farming,Livestock & Poultry,ከብቶች,2,true,true,false,true,,once,true,,Beef,,,,pets-animals,0,
[ct18-dump]   now:  agriculture-farming/livestock,livestock,agriculture-farming,Livestock & Poultry,ከብቶች,2,true,true,false,true,,once,true,,Beef,,,,pets-animals,0,
[ct18-dump] (4 more changed rows not printed)

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused
[ct18-dump] at export: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16 · scratch 1: e2e-cat-4-0-o7iznr@15
[ct18-dump] now: roots: real 16 at 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16 · scratch 1: e2e-cat-4-0-o7iznr@15
[ct18-dump] preview: 14 changed row(s) in its answer
[ct18-dump] agriculture-farming · display_order · file {"display_order":11}
[ct18-dump]   sent: agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,11,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump]   now:  agriculture-farming,agriculture-farming,,Agriculture & Farming,ግብርና እና እርሻ,10,true,false,false,true,,once,true,,Tractor,,,,,0,
[ct18-dump] automotive · display_order · file {"display_order":15}
[ct18-dump]   sent: automotive,automotive,,Automotive,አውቶሞቲቭ,15,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump]   now:  automotive,automotive,,Automotive,አውቶሞቲቭ,14,false,true,false,true,,once,true,,Car,,,,,0,
[ct18-dump] babies-kids · display_order · file {"display_order":13}
[ct18-dump]   sent: babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,13,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump]   now:  babies-kids,babies-kids,,Babies & Kids,ህጻናት እና ልጆች,12,true,false,false,true,,once,true,,Baby,,,,,0,
[ct18-dump] beauty-personal-care · display_order · file {"display_order":5}
[ct18-dump]   sent: beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,5,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump]   now:  beauty-personal-care,beauty-personal-care,,Beauty & Personal Care,መዋቢያዎችና የግል እንክብካቤ ምርቶች,4,true,false,false,true,,once,true,,Sparkles,,,,,0,
[ct18-dump] commercial-equipment · display_order · file {"display_order":14}
[ct18-dump]   sent: commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,14,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump]   now:  commercial-equipment,commercial-equipment,,Commercial Equipment,የንግድ መሳሪያዎች,13,true,false,false,true,,once,true,,Factory,,,,,0,
[ct18-dump] construction · display_order · file {"display_order":9}
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 14 changed · 0 retired · 0 reactivated · 0 deleted · 139 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
+   ],
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--mobile-360`; this run carried 2 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
+   ],
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  -  2
+ Received  + 13

  Object {
-   "review": false,
-   "status": "active",
+   "ok": false,
+   "refusals": Array [
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:city",
+     },
+     Object {
+       "detail": "2",
+       "field": "coverage",
+       "reason": "coverageExceedsPlan:region",
+     },
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--desktop-1280`; this run carried 2 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-3sclib: e2e_par_acaxh0 → e2e_chi_h4trv7
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

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

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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
