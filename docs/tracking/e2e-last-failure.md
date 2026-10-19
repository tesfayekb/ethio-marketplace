# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39207521053
- Commit: `77c81a70ac267ff02e4d11d2ed8380ad7b39fc09`
- Attempt: 1
- Written (UTC): 2026-10-19T06:50:35.047Z
- Passed: 2250 · Skipped: 213 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band — Error: AP-37 seller at 765 ms: current description
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge — Test timeout of 120000ms exceeded.

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AP-37 seller at 765 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]
--- further error 1 ---
Error: AP-37 seller at 765 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]

  1038 |           sample.current,
  1039 |           `AP-37 ${target} at ${sample.elapsed} ms: current ${sample.current.join(",") || "none"}`,
> 1040 |         ).toEqual([target]);
       |           ^
  1041 |       }
  1042 |     };
  1043 |     const sellerItem = bar.locator('[data-target="seller"]');
    at sampleScroll (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1040:11)
```

Context:

```text
        - heading "Company" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: About
          - listitem [ref=e307]:
            - generic [ref=e308]: Contact
      - navigation "Help" [ref=e309]:
        - heading "Help" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: Safety
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - generic [ref=e318]: Terms
          - listitem [ref=e319]:
            - generic [ref=e320]: Privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('language-option-en')


   at helpers/ui.ts:1177

  1175 |   await waitForHydration(page);
  1176 |   await page.getByTestId("language-switcher").click();
> 1177 |   await page.getByTestId(`language-option-${code}`).click();
       |                                                     ^
  1178 |   await expect(page.locator("html")).toHaveAttribute("lang", code, { timeout: 15000 });
  1179 |   /**
  1180 |    * INC-173b — `html[lang]` flips from React state, and the durable record the
    at switchLanguage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1177:53)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:441:7
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:432:5
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e936]
        - list [ref=e937]:
          - listitem [ref=e938]:
            - generic [ref=e939]: ስለ እኛ
          - listitem [ref=e940]:
            - generic [ref=e941]: ያግኙን
      - navigation "እገዛ" [ref=e942]:
        - heading "እገዛ" [level=2] [ref=e943]
        - list [ref=e944]:
          - listitem [ref=e945]:
            - generic [ref=e946]: ደህንነት
      - navigation "ሕጋዊ" [ref=e947]:
        - heading "ሕጋዊ" [level=2] [ref=e948]
        - list [ref=e949]:
          - listitem [ref=e950]:
            - generic [ref=e951]: ውሎች
          - listitem [ref=e952]:
            - generic [ref=e953]: ግላዊነት
    - paragraph [ref=e955]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mo<n>re: e<n>e_par_<n>agq<n>o → e<n>e_chi_<n>l<n>fu<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>r<n>gaa: e<n>e_par_<n>wn<n>r → e<n>e_chi_e<n>ntxh` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mo<n>re: e<n>e_par_<n>agq<n>o → e<n>e_chi_<n>l<n>fu<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>r<n>gaa: e<n>e_par_<n>wn<n>r → e<n>e_chi_e<n>ntxh ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-112 who: a new post opens with the last post's channels, stored on the draft  ×3 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2

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
| smoke | 2026-10-19T06:02:08.923Z | 20.0 min |
| email | 2026-10-19T06:02:17.656Z | 0.3 min |
| shard 1 | 2026-10-19T06:02:17.866Z | 47.9 min |
| shard 2 | 2026-10-19T06:02:10.458Z | 42.0 min |
| shard 3 | 2026-10-19T06:02:14.371Z | 39.0 min |
| shard 4 | 2026-10-19T06:02:09.339Z | 41.6 min |
| shard 5 | 2026-10-19T06:02:22.355Z | 46.2 min |
| shard 6 | 2026-10-19T06:02:16.020Z | 38.0 min |
| changed | 2026-10-19T06:02:47.898Z | 25.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 140 | 42.0 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 636 | 40.7 min | smoke, shard 3, shard 6, changed |
| `ad-page.spec.ts` | 68 | 28.5 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 28.4 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.8 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 32 | 19.0 min | shard 2, shard 5, changed |
| `post-wizard-pricing.spec.ts` | 52 | 18.6 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 17.2 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.6 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 15.3 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 14.6 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 14.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 12.9 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.7 min | smoke, shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 11.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.5 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 9.3 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 30 | 9.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.1 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.1 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.6 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.7 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 12 | 1.9 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 3, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `admin-translations-console.spec.ts` › TR-9 the Amharic runtime still renders after the DB bundle merge | desktop-1280 | 125.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 60.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 59.4 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 59.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 56.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 55.7 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 54.7 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 54.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 54.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 53.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 52.2 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | desktop-1280 | 51.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 51.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.0 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 49.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39207521053-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39207521053-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39207521053-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39207521053-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39207521053-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39207521053-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39207521053-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39207521053-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39207521053-changed
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `smoke`
- Project: `mobile-360`

```text
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484
--- further error 1 ---
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484

  1082 |         metrics.scroll,
  1083 |         `${panel} ${variant}: the rows do not fit yet the box does not scroll`,
> 1084 |       ).toBeGreaterThan(metrics.client);
       |         ^
  1085 |       await box.evaluate((el) => {
  1086 |         el.scrollTop = el.scrollHeight;
  1087 |       });
    at checkVariant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1103:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484
--- further error 1 ---
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484

  1082 |         metrics.scroll,
  1083 |         `${panel} ${variant}: the rows do not fit yet the box does not scroll`,
> 1084 |       ).toBeGreaterThan(metrics.client);
       |         ^
  1085 |       await box.evaluate((el) => {
  1086 |         el.scrollTop = el.scrollHeight;
  1087 |       });
    at checkVariant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1103:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `changed`
- Project: `mobile-360`

```text
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484
--- further error 1 ---
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484

  1082 |         metrics.scroll,
  1083 |         `${panel} ${variant}: the rows do not fit yet the box does not scroll`,
> 1084 |       ).toBeGreaterThan(metrics.client);
       |         ^
  1085 |       await box.evaluate((el) => {
  1086 |         el.scrollTop = el.scrollHeight;
  1087 |       });
    at checkVariant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1103:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
