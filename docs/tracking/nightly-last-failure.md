# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38443896121
- Commit: `60f297226c2b5073107f9b6ab1b835a0b8aaf01d`
- Attempt: 1
- Written (UTC): 2026-10-13T22:58:41.182Z
- Passed: 1472 · Skipped: 80 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

588 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>` | 489 | full |
| `digest mismatch` (quiet) | 12 | full |
| `too many previews` (quiet) | 10 | full |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `export_failed permission denied` (quiet) | 4 | full |
| `preview_failed permission denied` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `listing not found` | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>wrdjw: e<n>e_par_<n>o<n>z<n> → e<n>e_chi_n<n>ac<n>` (quiet) | 1 | full |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-wctx<n>i: e<n>e_par_<n>iev<n> → e<n>e_chi_zbxlnf` (quiet) | 1 | full |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · category-images: no GEMINI_API_KEY — fake mode ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-<n>wrdjw: e<n>e_par_<n>o<n>z<n> → e<n>e_chi_n<n>ac<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-nightly-<n>-wctx<n>i: e<n>e_par_<n>iev<n> → e<n>e_chi_zbxlnf ×1

Off the allowlist:

### HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h<n>+rou<n>+srvx.mjs:<n>:<n>

- Count: 489 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-176 removed question, option and list entry never block the draft's later sav ×10 · AU-7 crumb: Home > Admin > Users > <name>, Users navigates back ×9 · CO-1 gating: a plain user is refused; the roster, its toolbar and the header's t ×9 · CO-2 roster: every market renders, the two open ones carry the open tone, search ×9 · MF-7c a no-factor identity is released with the hint @private-identity ×9 · SC-16 a reviewer without a fresh second factor cannot decide ×9

```text
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
```

### listing not found

- Count: 2 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-13T18:29:28.610Z | 3.5 min |
| full | 2026-10-13T18:33:02.308Z | 265.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 18.8 min | full |
| `post-wizard-pricing.spec.ts` | 50 | 18.4 min | full |
| `admin-listings.spec.ts` | 54 | 17.0 min | full |
| `post-wizard-place.spec.ts` | 38 | 12.2 min | full |
| `post-wizard-resets.spec.ts` | 34 | 12.1 min | full |
| `post-wizard-bundle2.spec.ts` | 68 | 11.0 min | full |
| `post-wizard-category.spec.ts` | 48 | 10.2 min | full |
| `admin-screening.spec.ts` | 34 | 9.5 min | full |
| `post-wizard-where.spec.ts` | 32 | 8.6 min | full |
| `shell.spec.ts` | 168 | 7.7 min | full |
| `admin-translations-governance.spec.ts` | 20 | 7.4 min | full |
| `admin-categories-lifecycle.spec.ts` | 50 | 7.3 min | full |
| `admin-attributes-library.spec.ts` | 42 | 7.2 min | full |
| `admin-locations.spec.ts` | 38 | 7.0 min | full |
| `photo-pipeline.spec.ts` | 36 | 6.9 min | full |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | full |
| `admin-categories-console.spec.ts` | 34 | 6.0 min | full |
| `admin-roles.spec.ts` | 26 | 5.7 min | full |
| `posting-routes.spec.ts` | 52 | 5.5 min | full |
| `admin-attributes-links.spec.ts` | 32 | 5.4 min | full |
| `viewing-place.spec.ts` | 22 | 5.3 min | full |
| `admin-users.spec.ts` | 26 | 5.2 min | full |
| `feed-screens.spec.ts` | 28 | 4.9 min | full |
| `admin-attributes-editor.spec.ts` | 34 | 4.7 min | full |
| `import-security.spec.ts` | 36 | 4.3 min | full |
| `admin-attributes-safety.spec.ts` | 16 | 3.7 min | full |
| `admin-attributes-import.spec.ts` | 40 | 3.7 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `posting-routes-catalog.spec.ts` | 18 | 3.2 min | full |
| `auth-signout.spec.ts` | 22 | 2.9 min | full |
| `feed-index.spec.ts` | 28 | 2.8 min | full |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `admin-audit.spec.ts` | 14 | 2.4 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.4 min | full |
| `admin-translations-data.spec.ts` | 8 | 2.0 min | full |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | full |
| `feed-route.spec.ts` | 16 | 1.8 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | full |
| `admin-shell.spec.ts` | 10 | 1.6 min | full |
| `posting-routes-dials.spec.ts` | 14 | 1.3 min | full |
| `admin-coverage.spec.ts` | 16 | 1.3 min | full |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.8 min | full |
| `phone-frame.spec.ts` | 18 | 0.7 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.6 min | full |
| `category-image-routes.spec.ts` | 10 | 0.6 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `settings.spec.ts` | 4 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | full |
| `rbac.spec.ts` | 6 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `auth-reset.spec.ts` | 6 | 0.3 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 240.4 s |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.3 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 91.2 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 66.0 s |
| `post-wizard-specs.spec.ts` › PW-28 a conditional detail appears only when its condition is met | mobile-360 | 64.3 s |
| `post-wizard-category.spec.ts` › PW-29 the photos caption counts against the plan's cap | mobile-360 | 60.4 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | mobile-360 | 60.3 s |
| `post-wizard-pricing.spec.ts` › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) | mobile-360 | 58.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 53.6 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 53.5 s |
| `post-wizard-pricing.spec.ts` › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal | mobile-360 | 51.3 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 48.1 s |
| `post-wizard-pricing.spec.ts` › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12) | mobile-360 | 46.9 s |
| `post-wizard-pricing.spec.ts` › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315) | mobile-360 | 46.5 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 45.7 s |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38443896121-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 68 (pool 2, fresh 66)
[e2e:teardown] transport retries this run: 2 (by method: DELETE 2; by code: ECONNRESET 2; ran out: 0)
[e2e:teardown] deleted 96 user(s) owned by process 38443896121-nightly
```

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "categoryId",
+   "coverPhotoId",
    "id",
    "locationId",
    "locationNameAm",
    "locationNameEn",
    "photosSoon",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "categoryId",
+   "coverPhotoId",
    "id",
    "locationId",
    "locationNameAm",
    "locationNameEn",
    "photosSoon",

  236 |     ].sort();
  237 |     expect(r.body.cards.length).toBeGreaterThan(0);
> 238 |     for (const card of r.body.cards) expect(Object.keys(card).sort()).toEqual(keys);
      |                                                                       ^
  239 |   });
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-desktop-1280` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `full`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "services",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "services",
+ ]

  262 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  263 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 264 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  265 |     assertAmharicChrome(labels, "roles permission matrix");
  266 |   });
  267 | });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:264:82
```

Context:

```text
          - listitem [ref=e550]:
            - generic [ref=e551]: ስለ እኛ
          - listitem [ref=e552]:
            - generic [ref=e553]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e554]:
        - heading "እገዛ" [level=2] [ref=e555]
        - list [ref=e556]:
          - listitem [ref=e557]:
            - generic [ref=e558]: ደህንነት
          - listitem [ref=e559]:
            - generic [ref=e560]: ያግኙን
      - navigation "ሕጋዊ" [ref=e561]:
        - heading "ሕጋዊ" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - generic [ref=e565]: ውሎች
          - listitem [ref=e566]:
            - generic [ref=e567]: ግላዊነት
    - paragraph [ref=e569]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `full`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "services",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "services",
+ ]

  262 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  263 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 264 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  265 |     assertAmharicChrome(labels, "roles permission matrix");
  266 |   });
  267 | });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:264:82
```

Context:

```text
          - listitem [ref=e574]:
            - generic [ref=e575]: ስለ እኛ
          - listitem [ref=e576]:
            - generic [ref=e577]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e578]:
        - heading "እገዛ" [level=2] [ref=e579]
        - list [ref=e580]:
          - listitem [ref=e581]:
            - generic [ref=e582]: ደህንነት
          - listitem [ref=e583]:
            - generic [ref=e584]: ያግኙን
      - navigation "ሕጋዊ" [ref=e585]:
        - heading "ሕጋዊ" [level=2] [ref=e586]
        - list [ref=e587]:
          - listitem [ref=e588]:
            - generic [ref=e589]: ውሎች
          - listitem [ref=e590]:
            - generic [ref=e591]: ግላዊነት
    - paragraph [ref=e593]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `full`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-mobile-360` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-mobile-360`; this run carried 3 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-4')


  1389 |     await expect(charging).toHaveCount(0);
  1390 |     await nextThroughPhotos(page);
> 1391 |     await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
       |                                                   ^
  1392 |     await expect
  1393 |       .poll(async () => Object.keys(await attributesOf(listingId)).includes(set.charging.attrKey), {
  1394 |         message: "PW-28: an unasked answer reached the draft",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1391:51
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360` — Playwright's name `post-wizard-specs-POSTING--25a96-y-when-its-condition-is-met-mobile-360`; this run carried 3 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `full`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"category_id","reason":"categoryNotPostable"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  137 |       { token, country: "ET" },
  138 |     );
> 139 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  140 |     const listingId = String(draft.payload["listing_id"] ?? "");
  141 |     const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
  142 |     expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    at publishedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:139:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:274:19
```

Context:

```text
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: How it works
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
          - listitem [ref=e321]:
            - generic [ref=e322]: Contact
      - navigation "Legal" [ref=e323]:
        - heading "Legal" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Terms
          - listitem [ref=e328]:
            - generic [ref=e329]: Privacy
    - paragraph [ref=e331]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×6
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/i18n/en HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/locations HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×2
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
[WebServer] [ssr-error] /api/categories/tree HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /_serverFn/258c9c7bac445f06c5cae8ffb133bc2397d933b01bc93414f1bfb742fbc80ef2 HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20
[WebServer] [ssr-error] /api/feed HTTPError: The operation was aborted. @/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_libs/h3+rou3+srvx.mjs:544:20 ×3
```

## Client errors: full

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:34085:25) at http://127.0.0.1:4173/assets/index-CuWm1w7n.js:34117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CuWm1w7n.js:6025:5) ×2
```
