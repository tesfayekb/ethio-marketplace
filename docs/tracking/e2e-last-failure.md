# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39006561451
- Commit: `f92441d85c18b849db0769f811e2aaa7aac767fe`
- Attempt: 1
- Written (UTC): 2026-10-17T06:32:07.905Z
- Passed: 1841 · Skipped: 126 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) — Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1227.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1263.5,"width":117,"height":135.75}}

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1227.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1263.5,"width":117,"height":135.75}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1227.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1263.5,"width":117,"height":135.75}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1962 |       firstBox !== null && secondBox !== null && Math.abs(firstBox.y - secondBox.y) < 2,
  1963 |       `the two photos are not on one row: ${JSON.stringify({ firstBox, secondBox })}`,
> 1964 |     ).toBe(true);
       |       ^
  1965 |     await expect(card.getByTestId("listing-photos-hint")).toHaveText(
  1966 |       en["admin.listings.photos.hint"],
  1967 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1964:7
```

Context:

```text
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: How it works
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
          - listitem [ref=e370]:
            - generic [ref=e371]: Contact
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Terms
          - listitem [ref=e377]:
            - generic [ref=e378]: Privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>ilpa: e<n>e_par_jox<n>o → e<n>e_chi_h<n>kalf` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vhgxg<n>: e<n>e_par_<n>sxr<n> → e<n>e_chi_<n>veuz` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>ilpa: e<n>e_par_jox<n>o → e<n>e_chi_h<n>kalf ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vhgxg<n>: e<n>e_par_<n>sxr<n> → e<n>e_chi_<n>veuz ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AL-16 The listing page's door: who reads what, drafts never, a pin and an addres ×1 · RP-2 create: a super admin creates a custom role through step-up ×1

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T05:50:46.664Z | 17.5 min |
| email | 2026-10-17T05:50:35.098Z | 0.2 min |
| shard 1 | 2026-10-17T05:50:51.216Z | 40.8 min |
| shard 2 | 2026-10-17T05:50:32.495Z | 32.7 min |
| shard 3 | 2026-10-17T05:50:40.045Z | 34.9 min |
| shard 4 | 2026-10-17T05:50:34.913Z | 36.6 min |
| shard 5 | 2026-10-17T05:50:34.776Z | 32.7 min |
| shard 6 | 2026-10-17T05:50:42.590Z | 36.7 min |
| changed | 2026-10-17T05:50:37.651Z | 7.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 25.0 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 21.6 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 21.1 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.2 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 18.4 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 15.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.8 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 20 | 14.8 min | shard 1, shard 4, changed |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.8 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 13.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 13.5 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.3 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.2 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 11.2 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 10.5 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 9.5 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 24 | 9.0 min | shard 1, shard 4, changed |
| `admin-attributes-links.spec.ts` | 32 | 9.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 7.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 6.7 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.5 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 5.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 5.5 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 5.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.1 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
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
| `ad-page.spec.ts` › AP-13 Amharic | mobile-360 | 75.8 s |
| `ad-page.spec.ts` › AP-9 a live ad opens at its canonical address, server-rendered | desktop-1280 | 74.0 s |
| `ad-page.spec.ts` › AP-9 a live ad opens at its canonical address, server-rendered | mobile-360 | 66.5 s |
| `ad-page.spec.ts` › AP-12 a sold ad keeps its page for 30 days, marked and unindexed | desktop-1280 | 64.4 s |
| `ad-page.spec.ts` › AP-12 a sold ad keeps its page for 30 days, marked and unindexed | mobile-360 | 61.2 s |
| `ad-page.spec.ts` › AP-13 Amharic | desktop-1280 | 58.8 s |
| `ad-page.spec.ts` › AP-12 a sold ad keeps its page for 30 days, marked and unindexed | mobile-360 | 57.9 s |
| `ad-page.spec.ts` › AP-12 a sold ad keeps its page for 30 days, marked and unindexed | desktop-1280 | 57.8 s |
| `ad-page-doors.spec.ts` › AP-4 the owner reads his own flag and counts; another person is refused | mobile-360 | 53.1 s |
| `ad-page.spec.ts` › AP-13 Amharic | mobile-360 | 52.9 s |
| `ad-page.spec.ts` › AP-13 Amharic | desktop-1280 | 51.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 50.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 50.3 s |
| `ad-page.spec.ts` › AP-9 a live ad opens at its canonical address, server-rendered | mobile-360 | 50.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 49.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39006561451-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39006561451-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39006561451-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39006561451-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39006561451-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39006561451-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39006561451-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39006561451-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39006561451-changed
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-4 the owner reads his own flag and counts; another person is refused

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"

  205 |     const anonymous = await asAnonymous();
  206 |     const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
> 207 |     expect(unsigned.error).toBe("not authenticated");
      |                            ^
  208 |   });
  209 |
  210 |   test("AP-5 only a live ad, or one sold within 30 days, has a page", async () => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:207:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-4-the-owner-reads-his-own-flag-and-counts-another-person-is-refused-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-fd638-s-another-person-is-refused-mobile-360`; this run carried 13 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  29 |     expect(html).toContain(`<title>${ad.title}`);
  30 |     await page.goto(canonical);
> 31 |     await expect(page.getByTestId("ad-page")).toBeVisible();
     |                                               ^
  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
  34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:31:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-12 a sold ad keeps its page for 30 days, marked and unindexed

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  104 |     expect(liveHtml).not.toMatch(/<meta[^>]*name="robots"/);
  105 |     await page.goto(soldPath);
> 106 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  107 |     await expect(page.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.sold"]);
  108 |   });
  109 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:106:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-13 Amharic

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  113 |     const draft = await seed(seller, "draft");
  114 |     await page.goto((await address(live)).canonical);
> 115 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  116 |     await switchLanguage(page, "am");
  117 |     await expect(
  118 |       page
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:115:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-4 the owner reads his own flag and counts; another person is refused

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"

  205 |     const anonymous = await asAnonymous();
  206 |     const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
> 207 |     expect(unsigned.error).toBe("not authenticated");
      |                            ^
  208 |   });
  209 |
  210 |   test("AP-5 only a live ad, or one sold within 30 days, has a page", async () => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:207:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-4-the-owner-reads-his-own-flag-and-counts-another-person-is-refused-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-fd638-s-another-person-is-refused-desktop-1280`; this run carried 13 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  29 |     expect(html).toContain(`<title>${ad.title}`);
  30 |     await page.goto(canonical);
> 31 |     await expect(page.getByTestId("ad-page")).toBeVisible();
     |                                               ^
  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
  34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:31:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-12 a sold ad keeps its page for 30 days, marked and unindexed

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  104 |     expect(liveHtml).not.toMatch(/<meta[^>]*name="robots"/);
  105 |     await page.goto(soldPath);
> 106 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  107 |     await expect(page.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.sold"]);
  108 |   });
  109 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:106:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-13 Amharic

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  113 |     const draft = await seed(seller, "draft");
  114 |     await page.goto((await address(live)).canonical);
> 115 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  116 |     await switchLanguage(page, "am");
  117 |     await expect(
  118 |       page
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:115:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-4 the owner reads his own flag and counts; another person is refused

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"

  205 |     const anonymous = await asAnonymous();
  206 |     const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
> 207 |     expect(unsigned.error).toBe("not authenticated");
      |                            ^
  208 |   });
  209 |
  210 |   test("AP-5 only a live ad, or one sold within 30 days, has a page", async () => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:207:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-4-the-owner-reads-his-own-flag-and-counts-another-person-is-refused-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-fd638-s-another-person-is-refused-mobile-360`; this run carried 13 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-4 the owner reads his own flag and counts; another person is refused

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not authenticated"
Received: "permission denied for function listing_counts"

  205 |     const anonymous = await asAnonymous();
  206 |     const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
> 207 |     expect(unsigned.error).toBe("not authenticated");
      |                            ^
  208 |   });
  209 |
  210 |   test("AP-5 only a live ad, or one sold within 30 days, has a page", async () => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:207:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-4-the-owner-reads-his-own-flag-and-counts-another-person-is-refused-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-fd638-s-another-person-is-refused-desktop-1280`; this run carried 13 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  29 |     expect(html).toContain(`<title>${ad.title}`);
  30 |     await page.goto(canonical);
> 31 |     await expect(page.getByTestId("ad-page")).toBeVisible();
     |                                               ^
  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
  34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:31:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-12 a sold ad keeps its page for 30 days, marked and unindexed

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  104 |     expect(liveHtml).not.toMatch(/<meta[^>]*name="robots"/);
  105 |     await page.goto(soldPath);
> 106 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  107 |     await expect(page.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.sold"]);
  108 |   });
  109 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:106:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-13 Amharic

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  113 |     const draft = await seed(seller, "draft");
  114 |     await page.goto((await address(live)).canonical);
> 115 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  116 |     await switchLanguage(page, "am");
  117 |     await expect(
  118 |       page
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:115:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-9 a live ad opens at its canonical address, server-rendered

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  29 |     expect(html).toContain(`<title>${ad.title}`);
  30 |     await page.goto(canonical);
> 31 |     await expect(page.getByTestId("ad-page")).toBeVisible();
     |                                               ^
  32 |     await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  33 |     await expect(page.getByTestId("listing-detail-price")).toContainText("100");
  34 |     await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:31:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-12 a sold ad keeps its page for 30 days, marked and unindexed

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  104 |     expect(liveHtml).not.toMatch(/<meta[^>]*name="robots"/);
  105 |     await page.goto(soldPath);
> 106 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  107 |     await expect(page.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.sold"]);
  108 |   });
  109 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:106:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-13 Amharic

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ad-page')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('ad-page')


  113 |     const draft = await seed(seller, "draft");
  114 |     await page.goto((await address(live)).canonical);
> 115 |     await expect(page.getByTestId("ad-page")).toBeVisible();
      |                                               ^
  116 |     await switchLanguage(page, "am");
  117 |     await expect(
  118 |       page
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:115:47
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-5-vhgxg1: e2e_par_12sxr7 → e2e_chi_61veuz
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: TypeError: Cannot read properties of null (reading 'lat') at adPageView (http://127.0.0.1:4173/assets/l._slug-BSbQk_fR.js:49:26) at AdPage (http://127.0.0.1:4173/assets/l._slug-BSbQk_fR.js:76:8) at renderWithHooks (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:2890:21) at updateFunctionComponent (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:4266:15) at beginWork (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:4656:19) at performUnitOfWork (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6630:14) at workLoopSync (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6534:36) at renderRootSync (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6518:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6276:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:7084:3) ×12
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-4-d7ilpa: e2e_par_jox70o → e2e_chi_h1kalf
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Client errors: shard 4

```text
[client-error] console.error: TypeError: Cannot read properties of null (reading 'lat') at adPageView (http://127.0.0.1:4173/assets/l._slug-BSbQk_fR.js:49:26) at AdPage (http://127.0.0.1:4173/assets/l._slug-BSbQk_fR.js:76:8) at renderWithHooks (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:2890:21) at updateFunctionComponent (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:4266:15) at beginWork (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:4656:19) at performUnitOfWork (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6630:14) at workLoopSync (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6534:36) at renderRootSync (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6518:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6276:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:7084:3) ×12
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: TypeError: Cannot read properties of null (reading 'lat') at adPageView (http://127.0.0.1:4173/assets/l._slug-BSbQk_fR.js:49:26) at AdPage (http://127.0.0.1:4173/assets/l._slug-BSbQk_fR.js:76:8) at renderWithHooks (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:2890:21) at updateFunctionComponent (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:4266:15) at beginWork (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:4656:19) at performUnitOfWork (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6630:14) at workLoopSync (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6534:36) at renderRootSync (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6518:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:6276:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-DHRtmkdL.js:7084:3) ×24
```
