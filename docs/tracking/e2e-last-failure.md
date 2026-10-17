# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39028827134
- Commit: `544aeee43b8daa3c0ea2717754bfc292cb6dd3b6`
- Attempt: 1
- Written (UTC): 2026-10-17T12:25:32.613Z
- Passed: 1851 · Skipped: 126 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface — Error: expect(page).toHaveURL(expected) failed

## Flaky bodies (DEC-078)

### auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/auth"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/auth"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/auth"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/auth"


  59 |
  60 | async function expectSignedOutMarketplace(page: Page) {
> 61 |   await expect(page).toHaveURL(/\/$/);
     |                      ^
  62 |   await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  63 |   await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
  64 |   await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toHaveCount(0);
    at expectSignedOutMarketplace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:61:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:101:11
```

Context:

```text
          - listitem [ref=e260]:
            - generic [ref=e261]: About
          - listitem [ref=e262]:
            - generic [ref=e263]: How it works
      - navigation "Help" [ref=e264]:
        - heading "Help" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Safety
          - listitem [ref=e269]:
            - generic [ref=e270]: Contact
      - navigation "Legal" [ref=e271]:
        - heading "Legal" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Terms
          - listitem [ref=e276]:
            - generic [ref=e277]: Privacy
    - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

116 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 16 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>nbs<n>: e<n>e_par_eqwc<n>g → e<n>e_chi_s<n>e<n>t` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>ytll: e<n>e_par_dinq<n>l → e<n>e_chi_tnyg<n>s` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>nbs<n>: e<n>e_par_eqwc<n>g → e<n>e_chi_s<n>e<n>t ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>ytll: e<n>e_par_dinq<n>l → e<n>e_chi_tnyg<n>s ×1

Off the allowlist:

### listing not found

- Count: 16 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-104 a unit settled by the type is held by the price page's unit ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2

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
| smoke | 2026-10-17T11:41:56.138Z | 18.4 min |
| email | 2026-10-17T11:41:42.902Z | 0.2 min |
| shard 1 | 2026-10-17T11:41:44.440Z | 40.2 min |
| shard 2 | 2026-10-17T11:41:53.930Z | 35.1 min |
| shard 3 | 2026-10-17T11:41:55.847Z | 33.6 min |
| shard 4 | 2026-10-17T11:41:48.591Z | 43.4 min |
| shard 5 | 2026-10-17T11:41:44.538Z | 33.8 min |
| shard 6 | 2026-10-17T11:41:55.029Z | 36.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 24.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.9 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.6 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 19.2 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 18.9 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 13.5 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 24 | 13.1 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 13.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.9 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 12.4 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.4 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 11.1 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 10.7 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 10.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.4 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 24 | 9.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 7.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.3 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.0 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 5.5 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 4.7 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 100.7 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 78.5 s |
| `ad-page-doors.spec.ts` › AP-22 a new account is held to five reveals its first day (D201 §6b) | desktop-1280 | 77.5 s |
| `ad-page-doors.spec.ts` › AP-22 a new account is held to five reveals its first day (D201 §6b) | mobile-360 | 67.2 s |
| `ad-page-doors.spec.ts` › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) | desktop-1280 | 59.7 s |
| `ad-page-doors.spec.ts` › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) | desktop-1280 | 57.0 s |
| `ad-page-doors.spec.ts` › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8) | mobile-360 | 53.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 50.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 46.3 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 46.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 45.6 s |
| `ad-page-doors.spec.ts` › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8) | mobile-360 | 45.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39028827134-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39028827134-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39028827134-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39028827134-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39028827134-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39028827134-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39028827134-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39028827134-6
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-3 public_listing answers the public document of a live ad and nothing private

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }

  171 |     });
  172 |     expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
> 173 |     expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
      |                           ^
  174 |     const path = (doc["category"] as Row)["path"] as Row[];
  175 |     expect(Array.isArray(path)).toBe(true);
  176 |     expect(path.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:173:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-3-public_listing-answers-the-public-document-of-a-live-ad-and-nothing-private-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-ac4b9-live-ad-and-nothing-private-mobile-360`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-6 views count once per address and never for the owner; shares count by channel

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }

  295 |     const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
  296 |     expect(read.error).toBeNull();
> 297 |     expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });
      |                                          ^
  298 |
  299 |     const owner = await asPerson(seller);
  300 |     const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:297:42
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-6-views-count-once-per-address-and-never-for-the-owner-shares-count-by-channel-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-267c0-ner-shares-count-by-channel-mobile-360`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-22 a new account is held to five reveals its first day (D201 §6b)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }

  565 |     });
  566 |     expect(sixth.error).toBeNull();
> 567 |     expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
      |                        ^
  568 |     const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
  569 |     const midnight = new Date();
  570 |     midnight.setUTCHours(24, 0, 0, 0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:567:24
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-22-a-new-account-is-held-to-five-reveals-its-first-day-D201-6b-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6db67-als-its-first-day-D201-§6b--mobile-360`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  635 |     expect(page2.error).toBeNull();
  636 |     const cards2 = (page2.data as Row)["cards"] as Row[];
> 637 |     expect(cards2).toHaveLength(1);
      |                    ^
  638 |     expect(cards2[0]!["publicId"]).toBe(idA);
  639 |     expect((page2.data as Row)["next"]).toBeNull();
  640 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:637:20
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--mobile-360`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"

  731 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
  732 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 733 |       expect(answer.error).toContain("permission denied");
      |                            ^
  734 |     }
  735 |
  736 |     const dialed = await adminClient().from("rate_overrides").insert({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:733:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--mobile-360`; this run carried 9 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-97vhbe / e2e-cat-exp-t6sxhw,e2e-cat-exp-t6sxhw,e2e_attr_axdf9f,true,true,,e2e-cat-exp-97vhbe,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-97vhbe,,,,\d+$/
Received string:  "e2e-cat-exp-97vhbe / e2e-cat-exp-t6sxhw,e2e-cat-exp-t6sxhw,e2e_attr_axdf9f,true,true,,e2e-cat-exp-97vhbe,,,,0,"
--- further error 1 ---
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-97vhbe / e2e-cat-exp-t6sxhw,e2e-cat-exp-t6sxhw,e2e_attr_axdf9f,true,true,,e2e-cat-exp-97vhbe,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-97vhbe,,,,\d+$/
Received string:  "e2e-cat-exp-97vhbe / e2e-cat-exp-t6sxhw,e2e-cat-exp-t6sxhw,e2e_attr_axdf9f,true,true,,e2e-cat-exp-97vhbe,,,,0,"

  1014 |        * R-GATE echoed the last two). Only the order carries a value here.
  1015 |        */
> 1016 |       expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1017 |         new RegExp(`,${parentSlug},,,,\\d+$`),
  1018 |       );
  1019 |       // The parent's own row names ITSELF as the origin.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1016:82
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-m4yg0f / e2e-cat-inh-m4yg0f-child,e2e-cat-inh-m4yg0f-child,e2e_attr_i2v9rc,true,true,1,e2e-cat-inh-m4yg0f,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-m4yg0f,,,,\d+$/
Received string:  "e2e-cat-inh-m4yg0f / e2e-cat-inh-m4yg0f-child,e2e-cat-inh-m4yg0f-child,e2e_attr_i2v9rc,true,true,1,e2e-cat-inh-m4yg0f,,,,0,"
--- further error 1 ---
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-m4yg0f / e2e-cat-inh-m4yg0f-child,e2e-cat-inh-m4yg0f-child,e2e_attr_i2v9rc,true,true,1,e2e-cat-inh-m4yg0f,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-m4yg0f,,,,\d+$/
Received string:  "e2e-cat-inh-m4yg0f / e2e-cat-inh-m4yg0f-child,e2e-cat-inh-m4yg0f-child,e2e_attr_i2v9rc,true,true,1,e2e-cat-inh-m4yg0f,,,,0,"

  1236 |       // The origin is no longer the last cell: the FOUR per-link cells trail it
  1237 |       // (R-GATE added `visible_when` and `display_order`; only the order has a value).
> 1238 |       expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1239 |         new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
  1240 |       );
  1241 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1238:82
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: How it works
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
          - listitem [ref=e377]:
            - generic [ref=e378]: Contact
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Terms
          - listitem [ref=e384]:
            - generic [ref=e385]: Privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"

  545 |     const pPublicId = (await listingTruth(p.id))["public_id"] as string;
  546 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
> 547 |     expect(reached.error).toBeNull();
      |                           ^
  548 |     expect((reached.data as Row)["ok"]).toBe(true);
  549 |
  550 |     const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:547:27
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 9 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  773 |         await page.getByTestId("post-back").click();
  774 |         try {
> 775 |           await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                         ^
  776 |         } catch (error) {
  777 |           const ui = await page.evaluate(() => {
  778 |             const next = document.querySelector('[data-testid="post-next"]');
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:775:57)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-3 public_listing answers the public document of a live ad and nothing private

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }

  171 |     });
  172 |     expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
> 173 |     expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
      |                           ^
  174 |     const path = (doc["category"] as Row)["path"] as Row[];
  175 |     expect(Array.isArray(path)).toBe(true);
  176 |     expect(path.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:173:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-3-public_listing-answers-the-public-document-of-a-live-ad-and-nothing-private-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-ac4b9-live-ad-and-nothing-private-desktop-1280`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-6 views count once per address and never for the owner; shares count by channel

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }

  295 |     const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
  296 |     expect(read.error).toBeNull();
> 297 |     expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });
      |                                          ^
  298 |
  299 |     const owner = await asPerson(seller);
  300 |     const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:297:42
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-6-views-count-once-per-address-and-never-for-the-owner-shares-count-by-channel-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-267c0-ner-shares-count-by-channel-desktop-1280`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-22 a new account is held to five reveals its first day (D201 §6b)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }

  565 |     });
  566 |     expect(sixth.error).toBeNull();
> 567 |     expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
      |                        ^
  568 |     const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
  569 |     const midnight = new Date();
  570 |     midnight.setUTCHours(24, 0, 0, 0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:567:24
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-22-a-new-account-is-held-to-five-reveals-its-first-day-D201-6b-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6db67-als-its-first-day-D201-§6b--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  635 |     expect(page2.error).toBeNull();
  636 |     const cards2 = (page2.data as Row)["cards"] as Row[];
> 637 |     expect(cards2).toHaveLength(1);
      |                    ^
  638 |     expect(cards2[0]!["publicId"]).toBe(idA);
  639 |     expect((page2.data as Row)["next"]).toBeNull();
  640 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:637:20
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"

  731 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
  732 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 733 |       expect(answer.error).toContain("permission denied");
      |                            ^
  734 |     }
  735 |
  736 |     const dialed = await adminClient().from("rate_overrides").insert({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:733:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-f4v57h / e2e-cat-exp-52pqcl,e2e-cat-exp-52pqcl,e2e_attr_onnph5,true,true,,e2e-cat-exp-f4v57h,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-f4v57h,,,,\d+$/
Received string:  "e2e-cat-exp-f4v57h / e2e-cat-exp-52pqcl,e2e-cat-exp-52pqcl,e2e_attr_onnph5,true,true,,e2e-cat-exp-f4v57h,,,,0,"
--- further error 1 ---
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-f4v57h / e2e-cat-exp-52pqcl,e2e-cat-exp-52pqcl,e2e_attr_onnph5,true,true,,e2e-cat-exp-f4v57h,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-f4v57h,,,,\d+$/
Received string:  "e2e-cat-exp-f4v57h / e2e-cat-exp-52pqcl,e2e-cat-exp-52pqcl,e2e_attr_onnph5,true,true,,e2e-cat-exp-f4v57h,,,,0,"

  1014 |        * R-GATE echoed the last two). Only the order carries a value here.
  1015 |        */
> 1016 |       expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1017 |         new RegExp(`,${parentSlug},,,,\\d+$`),
  1018 |       );
  1019 |       // The parent's own row names ITSELF as the origin.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1016:82
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-320bk5 / e2e-cat-inh-320bk5-child,e2e-cat-inh-320bk5-child,e2e_attr_ovj9lj,true,true,1,e2e-cat-inh-320bk5,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-320bk5,,,,\d+$/
Received string:  "e2e-cat-inh-320bk5 / e2e-cat-inh-320bk5-child,e2e-cat-inh-320bk5-child,e2e_attr_ovj9lj,true,true,1,e2e-cat-inh-320bk5,,,,0,"
--- further error 1 ---
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-320bk5 / e2e-cat-inh-320bk5-child,e2e-cat-inh-320bk5-child,e2e_attr_ovj9lj,true,true,1,e2e-cat-inh-320bk5,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-320bk5,,,,\d+$/
Received string:  "e2e-cat-inh-320bk5 / e2e-cat-inh-320bk5-child,e2e-cat-inh-320bk5-child,e2e_attr_ovj9lj,true,true,1,e2e-cat-inh-320bk5,,,,0,"

  1236 |       // The origin is no longer the last cell: the FOUR per-link cells trail it
  1237 |       // (R-GATE added `visible_when` and `display_order`; only the order has a value).
> 1238 |       expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1239 |         new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
  1240 |       );
  1241 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1238:82
```

Context:

```text
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: How it works
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Legal" [ref=e404]:
        - heading "Legal" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Terms
          - listitem [ref=e409]:
            - generic [ref=e410]: Privacy
    - paragraph [ref=e412]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"

  545 |     const pPublicId = (await listingTruth(p.id))["public_id"] as string;
  546 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
> 547 |     expect(reached.error).toBeNull();
      |                           ^
  548 |     expect((reached.data as Row)["ok"]).toBe(true);
  549 |
  550 |     const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:547:27
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  773 |         await page.getByTestId("post-back").click();
  774 |         try {
> 775 |           await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                         ^
  776 |         } catch (error) {
  777 |           const ui = await page.evaluate(() => {
  778 |             const next = document.querySelector('[data-testid="post-next"]');
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:775:57)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 9 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-11-t8ytll: e2e_par_dinq4l → e2e_chi_tnyg5s
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

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×9
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-11-j3nbs4: e2e_par_eqwc3g → e2e_chi_s4e82t
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

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

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
