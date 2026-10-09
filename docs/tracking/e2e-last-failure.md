# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37996982043
- Commit: `1f6b4180820fa149e38cc9d4464801a46ba670d9`
- Attempt: 1
- Written (UTC): 2026-10-09T22:32:42.482Z
- Passed: 1540 · Skipped: 124 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

104 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ggamww: e<n>e_par_<n>pya<n>s → e<n>e_chi_ti<n>e<n>n` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xsxpa<n>: e<n>e_par_x<n>uttk → e<n>e_chi_l<n>d<n>s<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ggamww: e<n>e_par_<n>pya<n>s → e<n>e_chi_ti<n>e<n>n ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xsxpa<n>: e<n>e_par_x<n>uttk → e<n>e_chi_l<n>d<n>s<n> ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

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
| smoke | 2026-10-09T22:03:34.434Z | 16.0 min |
| email | 2026-10-09T22:03:50.297Z | 0.3 min |
| shard 1 | 2026-10-09T22:03:52.609Z | 28.5 min |
| shard 2 | 2026-10-09T22:03:33.492Z | 24.3 min |
| shard 3 | 2026-10-09T22:03:34.913Z | 21.4 min |
| shard 4 | 2026-10-09T22:03:42.566Z | 28.5 min |
| shard 5 | 2026-10-09T22:03:48.066Z | 25.7 min |
| shard 6 | 2026-10-09T22:03:40.716Z | 22.4 min |
| changed | 2026-10-09T22:03:33.116Z | 16.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-where.spec.ts` | 64 | 26.2 min | shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 78 | 23.8 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 92 | 23.4 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 336 | 18.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 18.0 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 40 | 13.2 min | shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 48 | 13.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 11.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.6 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.3 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 9.3 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.2 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 8.7 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 6.1 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 6.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.7 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 5.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 5.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.8 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.2 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 12 | 2.7 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.2 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 14 | 1.7 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 106.4 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 96.2 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 95.3 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 93.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 63.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 61.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 50.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 46.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 44.9 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 44.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 42.6 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 40.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 40.4 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 40.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37996982043-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37996982043-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 37996982043-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 37996982043-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37996982043-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 5, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 37996982043-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 37996982043-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37996982043-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 37996982043-changed
```

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "c1f8733c-5bbd-4c25-92e3-27c955a57730"
Received: "ceb80bbf-3fa7-4d1c-ab9f-495506ca1e2a"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "c1f8733c-5bbd-4c25-92e3-27c955a57730"
Received: "ceb80bbf-3fa7-4d1c-ab9f-495506ca1e2a"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  309 |     await page.getByTestId("post-next").click();
  310 |     await expect(page.getByTestId("post-step-7")).toBeVisible({ timeout: 20_000 });
> 311 |     await expect
      |     ^
  312 |       .poll(async () => (await coverageOf(listingId)).locationId, {
  313 |         message: "PW-180: the item place is not the invite's city",
  314 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:311:5
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-180-D119-a-new-post-from-an-invite-opens-the-place-step-on-the-invite-s-place-ahead-of-the-seller-s-last-post-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "13c34d8c-3ae6-43cd-acbc-3a0cc06ef030"
Received: "d7db0ca2-5e26-4585-9e70-0c74f9f5ca0c"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "13c34d8c-3ae6-43cd-acbc-3a0cc06ef030"
Received: "d7db0ca2-5e26-4585-9e70-0c74f9f5ca0c"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  309 |     await page.getByTestId("post-next").click();
  310 |     await expect(page.getByTestId("post-step-7")).toBeVisible({ timeout: 20_000 });
> 311 |     await expect
      |     ^
  312 |       .poll(async () => (await coverageOf(listingId)).locationId, {
  313 |         message: "PW-180: the item place is not the invite's city",
  314 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:311:5
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-180-D119-a-new-post-from-an-invite-opens-the-place-step-on-the-invite-s-place-ahead-of-the-seller-s-last-post-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "743bfd58-cd69-4f8f-8b4a-0e926b56e9e8"
Received: "cc2c7e6b-a138-4fec-b8c6-3ab81192cec5"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "743bfd58-cd69-4f8f-8b4a-0e926b56e9e8"
Received: "cc2c7e6b-a138-4fec-b8c6-3ab81192cec5"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  309 |     await page.getByTestId("post-next").click();
  310 |     await expect(page.getByTestId("post-step-7")).toBeVisible({ timeout: 20_000 });
> 311 |     await expect
      |     ^
  312 |       .poll(async () => (await coverageOf(listingId)).locationId, {
  313 |         message: "PW-180: the item place is not the invite's city",
  314 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:311:5
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-180-D119-a-new-post-from-an-invite-opens-the-place-step-on-the-invite-s-place-ahead-of-the-seller-s-last-post-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "0478f748-1ddb-40f8-8dff-05714a3aca2e"
Received: "0ed04c2c-fb96-40ef-a479-e1adc27cd340"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-180: the item place is not the invite's city

expect(received).toBe(expected) // Object.is equality

Expected: "0478f748-1ddb-40f8-8dff-05714a3aca2e"
Received: "0ed04c2c-fb96-40ef-a479-e1adc27cd340"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  309 |     await page.getByTestId("post-next").click();
  310 |     await expect(page.getByTestId("post-step-7")).toBeVisible({ timeout: 20_000 });
> 311 |     await expect
      |     ^
  312 |       .poll(async () => (await coverageOf(listingId)).locationId, {
  313 |         message: "PW-180: the item place is not the invite's city",
  314 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:311:5
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-180-D119-a-new-post-from-an-invite-opens-the-place-step-on-the-invite-s-place-ahead-of-the-seller-s-last-post-desktop-1280`

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```
