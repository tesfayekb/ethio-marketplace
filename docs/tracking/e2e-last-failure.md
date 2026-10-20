# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39392431814 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39392431814
- Commit: `a4dee36c0f82bc86a70a5e15fb7460b28faa8ad1`
- Attempt: 1
- Written (UTC): 2026-10-20T09:31:48.260Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 1
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan — Error: PW-11: the sub-city level never rendered

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-11: the sub-city level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-subcity')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-11: the sub-city level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-subcity')

--- further error 1 ---
Error: PW-11: the sub-city level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-subcity')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-11: the sub-city level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-subcity')


  317 |     // D19 — the sub-city level, with WHOLE-CITY coverage offered first.
  318 |     const subCity = page.getByTestId("post-where-subcity");
> 319 |     await expect(subCity, "PW-11: the sub-city level never rendered").toBeVisible();
      |                                                                       ^
  320 |     await expect(
  321 |       subCity.locator('option[value=""]'),
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-desktop-1280` — Playwright's name `post-wizard-place-POSTING--47508-lace-is-refused-by-the-plan-desktop-1280`; this run carried 0 context file(s); of the same spec: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-k<n>fypz: e<n>e_par_fxehbv → e<n>e_chi_elkbr<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yri<n>: e<n>e_par_s<n>trpm → e<n>e_chi_r<n>tosg` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-k<n>fypz: e<n>e_par_fxehbv → e<n>e_chi_elkbr<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-yri<n>: e<n>e_par_s<n>trpm → e<n>e_chi_r<n>tosg ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · admin tables never overflow horizontally ×1 · no horizontal overflow and text stays legible at 360 ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-100 every category offers the map; after Save the preview shows the pin ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-143 'also my shop or office' saves the place, a new draft opens with it, and  ×1 · PW-146 a saved place with a street line but no pin carries its lines to a new dr ×1

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
| smoke | 2026-10-20T08:42:19.870Z | 20.8 min |
| email | 2026-10-20T08:42:12.359Z | 0.3 min |
| shard 1 | 2026-10-20T08:42:05.148Z | 43.7 min |
| shard 2 | 2026-10-20T08:42:12.466Z | 49.3 min |
| shard 3 | 2026-10-20T08:42:08.516Z | 37.9 min |
| shard 4 | 2026-10-20T08:42:06.739Z | 45.2 min |
| shard 5 | 2026-10-20T08:42:17.179Z | 45.7 min |
| shard 6 | 2026-10-20T08:42:11.354Z | 41.8 min |
| changed | 2026-10-20T08:42:25.014Z | 14.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 636 | 40.4 min | smoke, shard 3, shard 6, changed |
| `ad-page.spec.ts` | 68 | 27.1 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.8 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.9 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 20.3 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 20.0 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 18.4 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 18.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.3 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 15.9 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 14.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.5 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 13.5 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 13.4 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 13.0 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 12.5 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 56 | 11.8 min | shard 2, shard 5, changed |
| `post-wizard-where.spec.ts` | 32 | 11.5 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.8 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 9.0 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.5 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.2 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.6 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.2 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 6.7 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 16 | 4.1 min | shard 2, shard 5, changed |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.2 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.1 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
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
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 84.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 59.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 53.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 52.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 52.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 51.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 51.6 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 50.0 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 49.7 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 48.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 46.6 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 46.2 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 45.2 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | mobile-360 | 44.8 s |
