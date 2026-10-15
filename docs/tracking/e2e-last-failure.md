# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38746460753
- Commit: `f0aed96041238de3ff03b935b4917b3ba04a73d6`
- Attempt: 1
- Written (UTC): 2026-10-15T14:58:10.822Z
- Passed: 1767 · Skipped: 126 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed — Error: [e2e:reap] pointers of e2e-post-3-0-6zuzfv failed: <html>

## Flaky bodies (DEC-078)

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:reap] pointers of e2e-post-3-0-6zuzfv failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:reap] pointers of e2e-post-3-0-6zuzfv failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/posting.ts:227

  225 |  */
  226 | export function reapStep(label: string, error: { message: string } | null): void {
> 227 |   if (error) throw new Error(`[e2e:reap] ${label} failed: ${error.message}`);
      |                    ^
  228 | }
  229 |
  230 | export async function destroyPostableCategory(slug: string): Promise<void> {
    at reapStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:227:20)
    at destroyPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:245:3)
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-93-a-number-outside-its-range-is-refused-as-it-is-typed-mobile-360` — Playwright's name `post-wizard-specs-POSTING--9aa14-e-is-refused-as-it-is-typed-mobile-360`; this run carried 4 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-sr<n>wj: e<n>e_par_ob<n>exo → e<n>e_chi_kx<n>xzt` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-v<n>dydq: e<n>e_par_zf<n>s<n> → e<n>e_chi_<n>lv<n>rb` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-sr<n>wj: e<n>e_par_ob<n>exo → e<n>e_chi_kx<n>xzt ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-v<n>dydq: e<n>e_par_zf<n>s<n> → e<n>e_chi_<n>lv<n>rb ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-161 a number's unit reads in English, and in Amharic under Amharic ×2 · category rows carry DISTINCT icons, not one repeated glyph ×1 · every rail row carries a leading icon on one gutter ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-39 recent categories are caller-only published leaves in count/date/id order ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

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
| smoke | 2026-10-15T14:19:04.698Z | 15.4 min |
| email | 2026-10-15T14:19:09.183Z | 0.3 min |
| shard 1 | 2026-10-15T14:19:04.776Z | 37.8 min |
| shard 2 | 2026-10-15T14:19:04.316Z | 35.4 min |
| shard 3 | 2026-10-15T14:19:04.131Z | 32.1 min |
| shard 4 | 2026-10-15T14:19:07.989Z | 36.4 min |
| shard 5 | 2026-10-15T14:19:02.021Z | 38.7 min |
| shard 6 | 2026-10-15T14:19:12.738Z | 31.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 24.7 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 24.1 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 21.0 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.1 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 16.8 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 30 | 15.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 13.1 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 48 | 12.7 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 60 | 12.4 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 12.3 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 10.9 min | shard 3, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.6 min | smoke, shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 6.6 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.4 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187) | mobile-360 | 144.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187) | desktop-1280 | 138.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 58.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 57.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 53.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 51.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 51.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 50.3 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 49.9 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 49.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 48.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 48.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 46.2 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 46.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 45.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38746460753-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38746460753-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38746460753-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38746460753-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38746460753-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38746460753-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38746460753-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38746460753-6
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-edit-place-box').getByTestId('post-where-add-region')


  1113 |       await expect(place.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
  1114 |       // C2 sits in a region of its own: its row comes with a region box first.
> 1115 |       await place.getByTestId("post-where-add-region").click();
       |                                                        ^
  1116 |       await place.getByTestId("post-where-row-region").selectOption(second.region.id as string);
  1117 |       await place.getByTestId("post-where-row-city").selectOption(second.city.id as string);
  1118 |       await expect(place.getByTestId("post-where-row-city")).toHaveValue(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1115:56
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
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

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--mobile-360`; this run carried 4 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-edit-place-box').getByTestId('post-where-add-region')


  1113 |       await expect(place.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
  1114 |       // C2 sits in a region of its own: its row comes with a region box first.
> 1115 |       await place.getByTestId("post-where-add-region").click();
       |                                                        ^
  1116 |       await place.getByTestId("post-where-row-region").selectOption(second.region.id as string);
  1117 |       await place.getByTestId("post-where-row-city").selectOption(second.city.id as string);
  1118 |       await expect(place.getByTestId("post-where-row-city")).toHaveValue(second.city.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1115:56
```

Context:

```text
          - listitem [ref=e422]:
            - generic [ref=e423]: About
          - listitem [ref=e424]:
            - generic [ref=e425]: How it works
      - navigation "Help" [ref=e426]:
        - heading "Help" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - generic [ref=e430]: Safety
          - listitem [ref=e431]:
            - generic [ref=e432]: Contact
      - navigation "Legal" [ref=e433]:
        - heading "Legal" [level=2] [ref=e434]
        - list [ref=e435]:
          - listitem [ref=e436]:
            - generic [ref=e437]: Terms
          - listitem [ref=e438]:
            - generic [ref=e439]: Privacy
    - paragraph [ref=e441]: © 2026 ethio.com — All rights reserved.
```
```

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

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--desktop-1280`; this run carried 4 context file(s); of the same spec: none

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
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:34181:25) at http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) ×2
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
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:34181:25) at http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:34181:25) at http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cgy-WOp_.js:6025:5)
console.error: [client-error] gate fetch threw
```
