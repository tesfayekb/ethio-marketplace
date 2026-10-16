# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38921265406 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38921265406
- Commit: `ea9373675f4d3303f7c817bf13754e85b50e75b9`
- Attempt: 1
- Written (UTC): 2026-10-16T15:54:34.463Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 3
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) — Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1255.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1291.5,"width":117,"height":135.75}}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-removed.spec.ts › POSTING WIZARD — removed catalogue answers › PW-176 removed question, option and list entry never block the draft's later saves — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) — Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1283.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1319.5,"width":117,"height":135.75}}

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1255.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1291.5,"width":117,"height":135.75}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1255.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1291.5,"width":117,"height":135.75}}

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

### post-wizard-removed.spec.ts › POSTING WIZARD — removed catalogue answers › PW-176 removed question, option and list entry never block the draft's later saves

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-8')


  125 |
  126 |     await gotoReady(page, `/post/${id}`);
> 127 |     await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  128 |     const summary = page.getByTestId("post-review-summary");
  129 |     for (const key of [specs.text.attrKey, specs.select.attrKey, specs.multi.attrKey]) {
  130 |       await expect(summary, `PW-176: Review printed the raw key ${key}`).not.toContainText(key);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-removed.spec.ts:127:51
```

Context: context file not found for `post-wizard-removed-POSTING-WIZARD-removed-catalogue-answers-PW-176-removed-question-option-and-list-entry-never-block-the-draft-s-later-saves-mobile-360` — Playwright's name `post-wizard-removed-POSTIN-83c43-ock-the-draft-s-later-saves-mobile-360`; this run carried 1 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `changed`
- Project: `mobile-360`

```text
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1283.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1319.5,"width":117,"height":135.75}}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the two photos are not on one row: {"firstBox":{"x":81,"y":1283.5,"width":117,"height":135.75},"secondBox":{"x":210,"y":1319.5,"width":117,"height":135.75}}

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

113 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>l<n>zbr: e<n>e_par_atkupz → e<n>e_chi_<n>awpy` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-i<n>ozie: e<n>e_par_<n>q<n>sv → e<n>e_chi_pjyccz` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>l<n>zbr: e<n>e_par_atkupz → e<n>e_chi_<n>awpy ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-i<n>ozie: e<n>e_par_<n>q<n>sv → e<n>e_chi_pjyccz ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-98 the item tick sits on the city line, fresh and prefilled ×2 · category rows carry DISTINCT icons, not one repeated glyph ×1 · every rail row carries a leading icon on one gutter ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1

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
| smoke | 2026-10-16T15:10:38.436Z | 18.3 min |
| email | 2026-10-16T15:10:33.155Z | 0.2 min |
| shard 1 | 2026-10-16T15:10:39.555Z | 41.3 min |
| shard 2 | 2026-10-16T15:10:31.549Z | 37.4 min |
| shard 3 | 2026-10-16T15:10:32.536Z | 35.2 min |
| shard 4 | 2026-10-16T15:10:39.077Z | 41.2 min |
| shard 5 | 2026-10-16T15:10:39.954Z | 43.6 min |
| shard 6 | 2026-10-16T15:10:32.994Z | 36.4 min |
| changed | 2026-10-16T15:10:56.815Z | 37.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 120 | 52.7 min | shard 1, shard 4, changed |
| `admin-screening.spec.ts` | 104 | 38.0 min | shard 1, shard 4, changed |
| `my-listings-ad.spec.ts` | 64 | 29.7 min | shard 2, shard 5, changed |
| `photo-pipeline.spec.ts` | 66 | 27.4 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 25.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 20.2 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.9 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 84 | 18.8 min | smoke, shard 2, shard 5, changed |
| `post-wizard-pricing.spec.ts` | 50 | 17.4 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 16.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 15.8 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 28 | 15.7 min | shard 2, shard 5, changed |
| `my-listings-doors.spec.ts` | 28 | 15.0 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 62 | 13.6 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.1 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 12.7 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.3 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 10.0 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 9.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.8 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 7.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.8 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.8 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 3.2 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.8 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.6 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 84.9 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 84.6 s |
| `my-listings-ad.spec.ts` › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177) | mobile-360 | 78.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 70.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 65.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 65.0 s |
| `my-listings-ad.spec.ts` › MLA-12 the ad's actions are one bar under the title, its main next step filled (D181) | mobile-360 | 61.1 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 58.7 s |
| `my-listings-ad.spec.ts` › MLA-16 a closed ad's Edit offers Photos coming soon; the tick saves and clears through the door (INC-666) | mobile-360 | 55.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 55.7 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 54.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 54.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 53.8 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 53.8 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 53.3 s |
