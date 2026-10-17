# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39046179477
- Commit: `5a3109008c779a13fd7f9ac839c4977592227e32`
- Attempt: 2
- Written (UTC): 2026-10-17T22:06:53.929Z
- Passed: 1895 · Skipped: 127 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5) — Error: expect(received).toBeGreaterThanOrEqual(expected)

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 1427.5
Received:    1423.5
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 1427.5
Received:    1423.5

  818 |       if (article.width < 672) {
  819 |         expect(headline.y).toBeGreaterThanOrEqual(gallery.y + gallery.height);
> 820 |         expect(sellerBox.y).toBeGreaterThanOrEqual(location.y + location.height);
      |                             ^
  821 |       } else if (article.width < 896) {
  822 |         expect(Math.abs(gallery.width - article.width)).toBeLessThanOrEqual(1);
  823 |         expect(main.y).toBeGreaterThanOrEqual(gallery.y + gallery.height);
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:820:29)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:835:5
```

Context:

```text
          - listitem [ref=e296]:
            - generic [ref=e297]: About
          - listitem [ref=e298]:
            - generic [ref=e299]: How it works
      - navigation "Help" [ref=e300]:
        - heading "Help" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Safety
          - listitem [ref=e305]:
            - generic [ref=e306]: Contact
      - navigation "Legal" [ref=e307]:
        - heading "Legal" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Terms
          - listitem [ref=e312]:
            - generic [ref=e313]: Privacy
    - paragraph [ref=e315]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>emykz: e<n>e_par_<n>vqyvv → e<n>e_chi_<n>laxse` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lh<n>v<n>a: e<n>e_par_rwb<n>va → e<n>e_chi_xtdm<n>g` (quiet) | 1 | shard 1 |
| `storage sign: <none> \| at readLinks (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/links-BDLS<n>P-b.mjs:<n>:<n>)` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>emykz: e<n>e_par_<n>vqyvv → e<n>e_chi_<n>laxse ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lh<n>v<n>a: e<n>e_par_rwb<n>va → e<n>e_chi_xtdm<n>g ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×3 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×2 · feed grid reflows without clipping and never overflows ×1 · logo cell sits exactly above the rail and beside the top bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### storage sign: <none> | at readLinks (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/links-BDLS<n>P-b.mjs:<n>:<n>)

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AU-5 seam: a deactivated account cannot write a listing ×1 · SP-3 absolute: continuous activity does not save the session ×1

```text
[WebServer] [ssr-error] /api/media/photo-links storage sign: <none> | at readLinks (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/links-BDLS8P-b.mjs:67:23)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T21:25:05.032Z | 18.0 min |
| email | 2026-10-17T21:25:05.714Z | 0.3 min |
| shard 1 | 2026-10-17T21:24:57.435Z | 39.7 min |
| shard 2 | 2026-10-17T21:25:04.612Z | 41.4 min |
| shard 3 | 2026-10-17T21:24:59.078Z | 31.9 min |
| shard 4 | 2026-10-17T21:24:56.716Z | 36.2 min |
| shard 5 | 2026-10-17T21:25:05.227Z | 41.4 min |
| shard 6 | 2026-10-17T21:25:06.159Z | 35.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.1 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 23.2 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 21.8 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 19.7 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 16.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.6 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 15.4 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 44 | 14.6 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 13.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.8 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 13.4 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.0 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.4 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.2 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 9.6 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.2 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.1 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 7.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.1 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 6.4 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.3 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.0 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone | mobile-360 | 126.1 s |
| `admin-listings.spec.ts` › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone | desktop-1280 | 125.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 56.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 54.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 54.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.1 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 53.5 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 52.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 51.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 51.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.6 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 47.5 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 46.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 46.4 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 45.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39046179477-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39046179477-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39046179477-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39046179477-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39046179477-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39046179477-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39046179477-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39046179477-6
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listings-search')


  2248 |     ]);
  2249 |     await gotoReady(page, "/admin/listings");
> 2250 |     await page.getByTestId("listings-search").fill(ad.id);
       |                                               ^
  2251 |     const row = listingRow(page, ad.id);
  2252 |     await expect(row).toBeVisible();
  2253 |     await expect(row.getByTestId(`listing-row-${ad.id}-reports`)).toHaveText("Reports: 2");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2250:47
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: How it works
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
          - listitem [ref=e311]:
            - generic [ref=e312]: Contact
      - navigation "Legal" [ref=e313]:
        - heading "Legal" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Terms
          - listitem [ref=e318]:
            - generic [ref=e319]: Privacy
    - paragraph [ref=e321]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width: one column, two columns, desktop (D201 §5)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 8
Received:    32
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 8
Received:    32

  826 |       } else {
  827 |         expect(headline.x).toBeGreaterThan(gallery.x + gallery.width);
> 828 |         expect(Math.abs(headline.y - gallery.y)).toBeLessThanOrEqual(8);
      |                                                  ^
  829 |       }
  830 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
  831 |         true,
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:828:50)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:835:5
```

Context:

```text
          - listitem [ref=e309]:
            - generic [ref=e310]: About
          - listitem [ref=e311]:
            - generic [ref=e312]: How it works
      - navigation "Help" [ref=e313]:
        - heading "Help" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Safety
          - listitem [ref=e318]:
            - generic [ref=e319]: Contact
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Terms
          - listitem [ref=e325]:
            - generic [ref=e326]: Privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listings-search')


  2248 |     ]);
  2249 |     await gotoReady(page, "/admin/listings");
> 2250 |     await page.getByTestId("listings-search").fill(ad.id);
       |                                               ^
  2251 |     const row = listingRow(page, ad.id);
  2252 |     await expect(row).toBeVisible();
  2253 |     await expect(row.getByTestId(`listing-row-${ad.id}-reports`)).toHaveText("Reports: 2");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2250:47
```

Context:

```text
          - listitem [ref=e302]:
            - generic [ref=e303]: About
          - listitem [ref=e304]:
            - generic [ref=e305]: How it works
      - navigation "Help" [ref=e306]:
        - heading "Help" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Safety
          - listitem [ref=e311]:
            - generic [ref=e312]: Contact
      - navigation "Legal" [ref=e313]:
        - heading "Legal" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Terms
          - listitem [ref=e318]:
            - generic [ref=e319]: Privacy
    - paragraph [ref=e321]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-lh1v5a: e2e_par_rwb0va → e2e_chi_xtdm0g
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-5emykz: e2e_par_6vqyvv → e2e_chi_2laxse
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
