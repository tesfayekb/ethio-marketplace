# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39259975344 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39259975344
- Commit: `ed84f925a17159cb9a0d3433b5f8fb2dace537c3`
- Attempt: 1
- Written (UTC): 2026-10-19T14:16:06.999Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 2
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer — Error: {"error":"server error"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category — Error: expect(received).toBeLessThanOrEqual(expected)

## Flaky bodies (DEC-078)

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  1141 |     for (const name of ["gps.jpg", "meta.png", "meta.webp"] as const) {
  1142 |       const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
> 1143 |       expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
       |                                                                 ^
  1144 |     }
  1145 |     const rows = await photoRowsOf(listingId);
  1146 |     expect(rows, "PP-22: three photos were uploaded").toHaveLength(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1143:65
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-22-the-buyer-s-preview-is-a-gallery-thumbnails-arrows-a-swipe-and-a-full-screen-viewer-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-5eb1a-pe-and-a-full-screen-viewer-mobile-360`; this run carried 1 context file(s); of the same spec: none

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
          - listitem [ref=e654]:
            - generic [ref=e655]: About
          - listitem [ref=e656]:
            - generic [ref=e657]: Contact
      - navigation "Help" [ref=e658]:
        - heading "Help" [level=2] [ref=e659]
        - list [ref=e660]:
          - listitem [ref=e661]:
            - generic [ref=e662]: Safety
      - navigation "Legal" [ref=e663]:
        - heading "Legal" [level=2] [ref=e664]
        - list [ref=e665]:
          - listitem [ref=e666]:
            - link "Terms" [ref=e667] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e668]:
            - link "Privacy" [ref=e669] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e671]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

113 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ao<n>ko<n>: e<n>e_par_s<n>mr<n> → e<n>e_chi_w<n>x<n>ih` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dbhfmq: e<n>e_par_jm<n>ajh → e<n>e_chi_er<n>ap<n>` (quiet) | 1 | shard 4 |
| `storage put default/<uuid>/<uuid>/<uuid>/cover.jpg: <none> \| at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/links-CXrrS<n>eO.mjs:<n>:<n>)` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ao<n>ko<n>: e<n>e_par_s<n>mr<n> → e<n>e_chi_w<n>x<n>ih ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dbhfmq: e<n>e_par_jm<n>ajh → e<n>e_chi_er<n>ap<n> ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### storage put default/<uuid>/<uuid>/<uuid>/cover.jpg: <none> | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/links-CXrrS<n>eO.mjs:<n>:<n>)

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-s ×1 · PW-124 the phone box shows an example and a length hint per country ×1

```text
[WebServer] [ssr-error] /api/upload/photo storage put default/6152d8f3-96e9-489a-b848-649165c042e8/275dc00c-c511-4ed1-8556-c2a98523404d/a452e0f3-0d65-409a-8b26-c2f2f08c448e/cover.jpg: <none> | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/links-CXrrS4eO.mjs:149:23)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T13:26:29.349Z | 20.6 min |
| email | 2026-10-19T13:26:36.630Z | 0.3 min |
| shard 1 | 2026-10-19T13:26:31.360Z | 46.6 min |
| shard 2 | 2026-10-19T13:26:31.085Z | 45.0 min |
| shard 3 | 2026-10-19T13:26:25.577Z | 36.9 min |
| shard 4 | 2026-10-19T13:26:40.595Z | 49.0 min |
| shard 5 | 2026-10-19T13:26:39.636Z | 47.3 min |
| shard 6 | 2026-10-19T13:26:31.671Z | 38.7 min |
| changed | 2026-10-19T13:26:37.600Z | 13.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 636 | 41.3 min | smoke, shard 3, shard 6, changed |
| `ad-page.spec.ts` | 68 | 30.3 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 26.0 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.6 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 17.8 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 17.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.3 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.1 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 14.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 36 | 14.2 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.9 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 13.0 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 12.9 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.4 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `legal-certify.spec.ts` | 32 | 11.2 min | shard 2, shard 5, changed |
| `admin-categories-console.spec.ts` | 34 | 10.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.7 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 9.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 9.3 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 8.5 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.2 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.6 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.5 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 28 | 6.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `legal-admin.spec.ts` | 16 | 3.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.6 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 61.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 55.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 53.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 52.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.3 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | desktop-1280 | 49.8 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 49.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 48.9 s |
| `admin-attributes-safety.spec.ts` › AT-82 a single-pick question made multi-pick: every ad's answer becomes a one-answer list in the same change; other questions and other changes are untouched (INC-632) | desktop-1280 | 48.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.8 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 45.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 45.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 45.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.9 s |
