# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39369357700 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39369357700
- Commit: `38b9e6d664b7a72d640053131a53f2cd6a61b051`
- Attempt: 1
- Written (UTC): 2026-10-20T05:17:30.637Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category — Error: expect(received).toBeLessThanOrEqual(expected)

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 24
Received:    72
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 24
Received:    72

  1653 |     expect(
  1654 |       Math.abs(actions.y + actions.height - (headlineBox.y + headlineBox.height)),
> 1655 |     ).toBeLessThanOrEqual(24);
       |       ^
  1656 |     const article = await page.getByTestId("listing-detail").boundingBox();
  1657 |     const sellerBox = await page
  1658 |       .locator('section[data-testid="listing-detail-seller"]')
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1655:7
```

Context:

```text
          - listitem [ref=e282]:
            - generic [ref=e283]: About
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Help" [ref=e286]:
        - heading "Help" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Safety
      - navigation "Legal" [ref=e291]:
        - heading "Legal" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - link "Terms" [ref=e295] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e296]:
            - link "Privacy" [ref=e297] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e299]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

  1184 |     const menuBox = await menuRow.boundingBox();
  1185 |     if (!menuBox) throw new Error("Missing category menu row bounds");
> 1186 |     expect(Math.abs(menuBox.y - rowBox.y)).toBeLessThanOrEqual(1);
       |                                            ^
  1187 |     expect(Math.abs(menuBox.height - rowBox.height)).toBeLessThanOrEqual(1);
  1188 |     await page.mouse.click(tap.x, tap.y);
  1189 |     await expect(page).toHaveURL(new RegExp(`/c/${category.slug}$`));
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1186:44
```

Context:

```text
          - listitem [ref=e423]:
            - generic [ref=e424]: About
          - listitem [ref=e425]:
            - generic [ref=e426]: Contact
      - navigation "Help" [ref=e427]:
        - heading "Help" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: Safety
      - navigation "Legal" [ref=e432]:
        - heading "Legal" [level=2] [ref=e433]
        - list [ref=e434]:
          - listitem [ref=e435]:
            - link "Terms" [ref=e436] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e437]:
            - link "Privacy" [ref=e438] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e440]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

114 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 14 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dc<n>rz: e<n>e_par_<n>cihq<n> → e<n>e_chi_<n>rk<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>m<n>j<n>: e<n>e_par_hrj<n>lt → e<n>e_chi_pkcg<n>u` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dc<n>rz: e<n>e_par_<n>cihq<n> → e<n>e_chi_<n>rk<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>m<n>j<n>: e<n>e_par_hrj<n>lt → e<n>e_chi_pkcg<n>u ×1

Off the allowlist:

### listing not found

- Count: 14 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-51 a dependent detail never renders above the answer it hangs on ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · /settings shows the Account context, and returning shows categories ×1

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
| smoke | 2026-10-20T04:28:39.237Z | 19.8 min |
| email | 2026-10-20T04:28:42.299Z | 0.2 min |
| shard 1 | 2026-10-20T04:28:40.471Z | 43.9 min |
| shard 2 | 2026-10-20T04:28:51.427Z | 48.0 min |
| shard 3 | 2026-10-20T04:28:38.026Z | 36.2 min |
| shard 4 | 2026-10-20T04:28:42.022Z | 45.5 min |
| shard 5 | 2026-10-20T04:28:45.300Z | 48.4 min |
| shard 6 | 2026-10-20T04:29:02.388Z | 40.2 min |
| changed | 2026-10-20T04:28:39.424Z | 7.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 26.8 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.4 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 25.1 min | shard 2, shard 5 |
| `shell.spec.ts` | 424 | 24.9 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 19.5 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 19.0 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 18.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.4 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 16.7 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.2 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 14.9 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 64 | 14.2 min | shard 2, shard 5, changed |
| `feed-screens.spec.ts` | 36 | 13.9 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.7 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 13.5 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 13.0 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 10.2 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 8.9 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.8 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.4 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 36 | 6.9 min | shard 2, shard 5, changed |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.1 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 16 | 3.5 min | shard 2, shard 5, changed |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.9 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.2 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `legal-history.spec.ts` | 6 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 58.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 56.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 55.1 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 54.9 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 53.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 53.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 52.7 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 51.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 51.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 49.8 s |
| `ad-page.spec.ts` › AP-46 Save and Share sit in the title box | mobile-360 | 49.7 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 48.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.1 s |
