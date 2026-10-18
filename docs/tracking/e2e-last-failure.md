# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39136152901 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39136152901
- Commit: `c3bbe30db9725dbc163daf08a8b2312c6c548681`
- Attempt: 1
- Written (UTC): 2026-10-18T15:39:53.322Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it — Error: expect(locator).toHaveValue(expected) failed

## Flaky bodies (DEC-078)

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "3ea15207-43be-4521-8500-52cdfe4d451b"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('post-where-city')
Expected: "3ea15207-43be-4521-8500-52cdfe4d451b"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('post-where-city')


  1287 |     await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 15000 });
  1288 |     const city = page.getByTestId("post-where-city");
> 1289 |     await expect(city).toHaveValue(A.cityId, { timeout: 15000 });
       |                        ^
  1290 |
  1291 |     // Another region, no city chosen: Save changes is drawn closed.
  1292 |     await page.getByTestId("post-where-region").selectOption(second.region.id as string);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1289:24
```

Context:

```text
          - listitem [ref=e318]:
            - generic [ref=e319]: About
          - listitem [ref=e320]:
            - generic [ref=e321]: How it works
      - navigation "Help" [ref=e322]:
        - heading "Help" [level=2] [ref=e323]
        - list [ref=e324]:
          - listitem [ref=e325]:
            - generic [ref=e326]: Safety
          - listitem [ref=e327]:
            - generic [ref=e328]: Contact
      - navigation "Legal" [ref=e329]:
        - heading "Legal" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - generic [ref=e333]: Terms
          - listitem [ref=e334]:
            - generic [ref=e335]: Privacy
    - paragraph [ref=e337]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

112 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-x<n>i<n>: e<n>e_par_<n>hsrxi → e<n>e_chi_rng<n>i<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-y<n>pe<n>u: e<n>e_par_hzx<n>f → e<n>e_chi_ujca<n>c` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-x<n>i<n>: e<n>e_par_<n>hsrxi → e<n>e_chi_rng<n>i<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-y<n>pe<n>u: e<n>e_par_hzx<n>f → e<n>e_chi_ujca<n>c ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · exactly one collapse toggle, and the wordmark moves into the bar when collapsed ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1

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
| smoke | 2026-10-18T14:53:54.276Z | 15.8 min |
| email | 2026-10-18T14:54:06.102Z | 0.3 min |
| shard 1 | 2026-10-18T14:54:01.324Z | 45.5 min |
| shard 2 | 2026-10-18T14:54:01.113Z | 42.8 min |
| shard 3 | 2026-10-18T14:53:54.451Z | 30.0 min |
| shard 4 | 2026-10-18T14:53:54.700Z | 41.9 min |
| shard 5 | 2026-10-18T14:54:05.640Z | 37.7 min |
| shard 6 | 2026-10-18T14:54:04.185Z | 35.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 25.8 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 23.4 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 23.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.7 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.2 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 15.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 14.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.1 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 13.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.8 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.0 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 11.9 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.6 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 10.7 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 10.5 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.9 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.5 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.3 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 8.2 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.6 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.3 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 7.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.0 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.5 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.9 min | shard 1, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 63.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 53.2 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 52.2 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 51.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 51.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 48.6 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 47.4 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 47.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 47.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 44.5 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 44.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 44.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 43.6 s |
