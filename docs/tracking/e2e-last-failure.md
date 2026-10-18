# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39167711003
- Commit: `ed6f9d55c32c57d04fa438e9284b048b59c7dc31`
- Attempt: 1
- Written (UTC): 2026-10-18T22:24:50.038Z
- Passed: 1993 · Skipped: 149 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

  3523 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3524 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3525 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3526 |       }
  3527 |       await page.getByTestId("rail-menu-close").click();
  3528 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3525:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3534:3
```

Context:

```text
        - heading "Company" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - generic [ref=e565]: About
          - listitem [ref=e566]:
            - generic [ref=e567]: Contact
      - navigation "Help" [ref=e568]:
        - heading "Help" [level=2] [ref=e569]
        - list [ref=e570]:
          - listitem [ref=e571]:
            - generic [ref=e572]: Safety
      - navigation "Legal" [ref=e573]:
        - heading "Legal" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: Terms
          - listitem [ref=e578]:
            - generic [ref=e579]: Privacy
    - paragraph [ref=e581]: © 2026 ethio.com — All rights reserved.
```
```

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="location"]')
Expected: "true"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="location"]')
    14 × locator resolved to <button type="button" data-target="location" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none border-b-2 px-2 whitespa…>Location</button>
       - unexpected value "null"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="location"]')
Expected: "true"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="location"]')
    14 × locator resolved to <button type="button" data-target="location" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none border-b-2 px-2 whitespa…>Location</button>
       - unexpected value "null"


  1023 |     const locationItem = bar.locator('[data-target="location"]');
  1024 |     await locationItem.click();
> 1025 |     await expect(locationItem).toHaveAttribute("aria-current", "true");
       |                                ^
  1026 |     await expect
  1027 |       .poll(async () => {
```

Context:

```text
        - heading "Company" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - generic [ref=e347]: Terms
          - listitem [ref=e348]:
            - generic [ref=e349]: Privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>w<n>k<n>: e<n>e_par_rqrab<n> → e<n>e_chi_<n>qhll` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-znrseq: e<n>e_par_blj<n>x<n> → e<n>e_chi_<n>o<n>gi<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>w<n>k<n>: e<n>e_par_rqrab<n> → e<n>e_chi_<n>qhll ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-znrseq: e<n>e_par_blj<n>x<n> → e<n>e_chi_<n>o<n>gi<n> ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · every rail row carries a leading icon on one gutter (retry #1) ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-101 a phone number in a free-text answer is refused at its field ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

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
| smoke | 2026-10-18T21:34:54.098Z | 22.5 min |
| email | 2026-10-18T21:34:54.403Z | 0.3 min |
| shard 1 | 2026-10-18T21:34:46.299Z | 43.4 min |
| shard 2 | 2026-10-18T21:34:52.232Z | 46.0 min |
| shard 3 | 2026-10-18T21:34:55.612Z | 43.2 min |
| shard 4 | 2026-10-18T21:34:52.795Z | 49.7 min |
| shard 5 | 2026-10-18T21:34:58.010Z | 46.4 min |
| shard 6 | 2026-10-18T21:34:50.190Z | 37.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 29.2 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 27.8 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 27.8 min | shard 1, shard 4 |
| `shell.spec.ts` | 408 | 26.5 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 19.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.4 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 19.3 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 17.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 14.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.2 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 13.9 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 13.5 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.9 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 12.6 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.7 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 9.4 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.9 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.8 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 7.5 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 22 | 7.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.0 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 3.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.2 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 74.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 71.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 67.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 58.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 58.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 57.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 56.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 55.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 52.1 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 51.9 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 51.4 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 51.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 51.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 50.4 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 48.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39167711003-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39167711003-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39167711003-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39167711003-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39167711003-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39167711003-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39167711003-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39167711003-6
```

## shell.spec.ts › corner-block grid › every rail row carries a leading icon on one gutter

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  689 |     const rows = rail.locator("li > a, li > button, li > span[aria-disabled]");
  690 |     const count = await rows.count();
> 691 |     expect(count).toBeGreaterThan(0);
      |                   ^
  692 |
  693 |     const starts = new Set<number>();
  694 |     for (let i = 0; i < count; i += 1) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:691:19
```

Context:

```text
        - heading "Company" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: Terms
          - listitem [ref=e150]:
            - generic [ref=e151]: Privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › PK-1 the forced peek opens without focus, folds, and does not repeat

- Source: `smoke`
- Project: `mobile-360`

```text
Error: INC-741: the peek never showed

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: INC-741: the peek never showed

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate

  3443 |       );
  3444 |     await gotoReady(page, "/");
> 3445 |     await expect
       |     ^
  3446 |       .poll(async () => (await readRecord()).shownAt !== null, {
  3447 |         timeout: 5000,
  3448 |         message: "INC-741: the peek never showed",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3445:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Terms
          - listitem [ref=e242]:
            - generic [ref=e243]: Privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":390,"band":390,"furthest":510,"furthestText":"E2E Ebjnjepbvmeysccyntxmdklnjlnffuljwjabfbucfltwnvvu","crumbHeight":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 390
Received:    510
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":390,"band":390,"furthest":510,"furthestText":"E2E Ebjnjepbvmeysccyntxmdklnjlnffuljwjabfbucfltwnvvu","crumbHeight":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 390
Received:    510

  1822 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1823 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
> 1824 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
       |                                                         ^
  1825 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
  1826 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeLessThanOrEqual(34);
  1827 |     await expect(page.getByTestId("breadcrumb-ad")).toHaveText(title);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1824:57
```

Context:

```text
        - heading "Company" [level=2] [ref=e311]
        - list [ref=e312]:
          - listitem [ref=e313]:
            - generic [ref=e314]: About
          - listitem [ref=e315]:
            - generic [ref=e316]: Contact
      - navigation "Help" [ref=e317]:
        - heading "Help" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - generic [ref=e321]: Safety
      - navigation "Legal" [ref=e322]:
        - heading "Legal" [level=2] [ref=e323]
        - list [ref=e324]:
          - listitem [ref=e325]:
            - generic [ref=e326]: Terms
          - listitem [ref=e327]:
            - generic [ref=e328]: Privacy
    - paragraph [ref=e330]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › PK-1 the forced peek opens without focus, folds, and does not repeat

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: INC-741: the peek never showed

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: INC-741: the peek never showed

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate

  3443 |       );
  3444 |     await gotoReady(page, "/");
> 3445 |     await expect
       |     ^
  3446 |       .poll(async () => (await readRecord()).shownAt !== null, {
  3447 |         timeout: 5000,
  3448 |         message: "INC-741: the peek never showed",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3445:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Terms
          - listitem [ref=e242]:
            - generic [ref=e243]: Privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: marketplace rail categories: no category rows rendered

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: marketplace rail categories: no category rows rendered

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  182 |   const catalogue = labels.filter((row) => !isScratchSlug(row.slug));
  183 |
> 184 |   expect(catalogue.length, `${where}: no category rows rendered`).toBeGreaterThan(0);
      |                                                                   ^
  185 |   const english = catalogue.filter((row) => !ALLOW.has(row.label) && LATIN_ONLY.test(row.label));
  186 |   // INC-361 — the message names the slug of each English label.
  187 |   expect(
    at assertAmharicCategories (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:184:67)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:201:7
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: ስለ እኛ
          - listitem [ref=e331]:
            - generic [ref=e332]: ያግኙን
      - navigation "እገዛ" [ref=e333]:
        - heading "እገዛ" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: ደህንነት
      - navigation "ሕጋዊ" [ref=e338]:
        - heading "ሕጋዊ" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: ውሎች
          - listitem [ref=e343]:
            - generic [ref=e344]: ግላዊነት
    - paragraph [ref=e346]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › corner-block grid › every rail row carries a leading icon on one gutter

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  689 |     const rows = rail.locator("li > a, li > button, li > span[aria-disabled]");
  690 |     const count = await rows.count();
> 691 |     expect(count).toBeGreaterThan(0);
      |                   ^
  692 |
  693 |     const starts = new Set<number>();
  694 |     for (let i = 0; i < count; i += 1) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:691:19
```

Context:

```text
        - heading "Company" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: Terms
          - listitem [ref=e150]:
            - generic [ref=e151]: Privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-4-znrseq: e2e_par_blj9x1 → e2e_chi_4o5gi4
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
