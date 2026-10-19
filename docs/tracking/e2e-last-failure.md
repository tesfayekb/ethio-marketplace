# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39222119969
- Commit: `ba263b88a8ba51c195fba1125bf55d266a486a4d`
- Attempt: 1
- Written (UTC): 2026-10-19T09:18:44.165Z
- Passed: 2039 · Skipped: 153 · Failed: 12
- Gating failures: 12 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>xh<n>u: e<n>e_par_uuknnz → e<n>e_chi_<n>l<n>m<n>w` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qd<n>dl<n>: e<n>e_par_<n>paatm → e<n>e_chi_yl<n>n<n>w` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>xh<n>u: e<n>e_par_uuknnz → e<n>e_chi_<n>l<n>m<n>w ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qd<n>dl<n>: e<n>e_par_<n>paatm → e<n>e_chi_yl<n>n<n>w ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · admin panel is absent for a normal signed-in user ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×1

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
| smoke | 2026-10-19T08:33:06.582Z | 19.1 min |
| email | 2026-10-19T08:33:03.705Z | 0.3 min |
| shard 1 | 2026-10-19T08:32:52.152Z | 41.0 min |
| shard 2 | 2026-10-19T08:32:55.582Z | 42.3 min |
| shard 3 | 2026-10-19T08:33:00.371Z | 42.1 min |
| shard 4 | 2026-10-19T08:32:55.801Z | 45.4 min |
| shard 5 | 2026-10-19T08:32:50.861Z | 38.8 min |
| shard 6 | 2026-10-19T08:33:00.628Z | 39.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 27.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 25.9 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.9 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 68 | 24.7 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 62 | 21.2 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 20.8 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 18.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 18.4 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 17.5 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.0 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 12.6 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.5 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 12.2 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.1 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.1 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 10.9 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 10.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.1 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.8 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 7.6 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.2 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.1 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.5 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 20 | 5.1 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 4.4 min | shard 3, shard 6 |
| `legal-admin.spec.ts` | 14 | 4.1 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.4 min | shard 3, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.0 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
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
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 62.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 61.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 55.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 52.7 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 47.9 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 47.8 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 45.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 45.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 44.6 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 44.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 44.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.3 s |
| `post-wizard-recent.spec.ts` › PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none | mobile-360 | 43.8 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 43.7 s |
| `post-wizard-pricing.spec.ts` › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) | desktop-1280 | 43.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39222119969-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39222119969-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39222119969-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39222119969-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39222119969-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39222119969-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39222119969-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39222119969-6
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]

  268 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  269 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 270 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  271 |     assertAmharicChrome(labels, "roles permission matrix");
  272 |   });
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - generic [ref=e565]: ስለ እኛ
          - listitem [ref=e566]:
            - generic [ref=e567]: ያግኙን
      - navigation "እገዛ" [ref=e568]:
        - heading "እገዛ" [level=2] [ref=e569]
        - list [ref=e570]:
          - listitem [ref=e571]:
            - generic [ref=e572]: ደህንነት
      - navigation "ሕጋዊ" [ref=e573]:
        - heading "ሕጋዊ" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: ውሎች
          - listitem [ref=e578]:
            - generic [ref=e579]: ግላዊነት
    - paragraph [ref=e581]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## legal-admin.spec.ts › Admin Legal › LGA-2 bilingual draft round trip, preview and first-version publishing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-2-goo69-3-m-b-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-2-goo69-3-m-b-global')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-2-goo69-3-m-b-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-2-goo69-3-m-b-global')


  214 |       );
  215 |       const own = page.getByTestId(`legal-doc-${kind}-global`);
> 216 |       await expect(own).toBeVisible();
      |                         ^
  217 |       await expect(own.getByTestId("legal-in-force")).toContainText("In force");
  218 |       await expect(own).toContainText("Accepted by 0");
  219 |       const profile = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:216:25
```

Context:

```text
        - heading "Company" [level=2] [ref=e359]
        - list [ref=e360]:
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: Contact
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
      - navigation "Legal" [ref=e370]:
        - heading "Legal" [level=2] [ref=e371]
        - list [ref=e372]:
          - listitem [ref=e373]:
            - generic [ref=e374]: Terms
          - listitem [ref=e375]:
            - generic [ref=e376]: Privacy
    - paragraph [ref=e378]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-3 material version prefill, earliest UTC date and scheduled block

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-2-y7tnl-5-m-c-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-2-y7tnl-5-m-c-global')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-2-y7tnl-5-m-c-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-2-y7tnl-5-m-c-global')


  238 |       await gotoReady(page, "/admin/legal");
  239 |       const own = page.getByTestId(`legal-doc-${kind}-global`);
> 240 |       await expect(own).toBeVisible();
      |                         ^
  241 |       await own.getByTestId("legal-new-version").click();
  242 |       await expect(page.getByTestId("legal-field-body-en")).toHaveValue(
  243 |         "## First\nOriginal English",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:240:25
```

Context:

```text
        - heading "Company" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - generic [ref=e361]: About
          - listitem [ref=e362]:
            - generic [ref=e363]: Contact
      - navigation "Help" [ref=e364]:
        - heading "Help" [level=2] [ref=e365]
        - list [ref=e366]:
          - listitem [ref=e367]:
            - generic [ref=e368]: Safety
      - navigation "Legal" [ref=e369]:
        - heading "Legal" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Terms
          - listitem [ref=e374]:
            - generic [ref=e375]: Privacy
    - paragraph [ref=e377]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log

- Source: `shard 2`
- Project: `mobile-360`

```text
TypeError: Cannot read properties of null (reading 'version_id')
--- further error 1 ---
TypeError: Cannot read properties of null (reading 'version_id')

  232 |       const body = globalAnswer.data as Row;
  233 |       expect(
> 234 |         body["version_id"],
      |             ^
  235 |         "the version in force is the published one whose time has come",
  236 |       ).toBe(fixture.publishedId);
  237 |       expect(body["version"]).toBe(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:234:13
```

Context: context file not found for `legal-doors-Legal-doors-LG-1-legal_in_force-answers-the-highest-published-version-whose-time-has-come-global-and-per-country-and-never-the-change-log-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-bcc09-ry-and-never-the-change-log-mobile-360`; this run carried 16 context file(s); of the same spec: `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280`

## legal-doors.spec.ts › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "b8578168-0920-48d6-b750-fb0866710b3b"
Received array: []
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "b8578168-0920-48d6-b750-fb0866710b3b"
Received array: []

  577 |       expect(before.error).toBeNull();
  578 |       const beforeRows = before.data as Row[];
> 579 |       expect(beforeRows.map((r) => r["version_id"])).toContain(fixture.publishedId);
      |                                                      ^
  580 |
  581 |       await caller.rpc("accept_legal", {
  582 |         p_version_ids: [fixture.publishedId],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:579:54
```

Context: context file not found for `legal-doors-Legal-doors-LG-5-my_legal_status-lists-the-version-in-force-until-accepted-again-after-a-material-version-and-scopes-country-documents-to-the-home-country-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-d3b38-cuments-to-the-home-country-mobile-360`; this run carried 16 context file(s); of the same spec: `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280`

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]

  268 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  269 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 270 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  271 |     assertAmharicChrome(labels, "roles permission matrix");
  272 |   });
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e608]
        - list [ref=e609]:
          - listitem [ref=e610]:
            - generic [ref=e611]: ስለ እኛ
          - listitem [ref=e612]:
            - generic [ref=e613]: ያግኙን
      - navigation "እገዛ" [ref=e614]:
        - heading "እገዛ" [level=2] [ref=e615]
        - list [ref=e616]:
          - listitem [ref=e617]:
            - generic [ref=e618]: ደህንነት
      - navigation "ሕጋዊ" [ref=e619]:
        - heading "ሕጋዊ" [level=2] [ref=e620]
        - list [ref=e621]:
          - listitem [ref=e622]:
            - generic [ref=e623]: ውሎች
          - listitem [ref=e624]:
            - generic [ref=e625]: ግላዊነት
    - paragraph [ref=e627]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## legal-admin.spec.ts › Admin Legal › LGA-2 bilingual draft round trip, preview and first-version publishing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-5-jn635-3-d-b-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-5-jn635-3-d-b-global')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-5-jn635-3-d-b-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-5-jn635-3-d-b-global')


  214 |       );
  215 |       const own = page.getByTestId(`legal-doc-${kind}-global`);
> 216 |       await expect(own).toBeVisible();
      |                         ^
  217 |       await expect(own.getByTestId("legal-in-force")).toContainText("In force");
  218 |       await expect(own).toContainText("Accepted by 0");
  219 |       const profile = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:216:25
```

Context:

```text
        - heading "Company" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: About
          - listitem [ref=e409]:
            - generic [ref=e410]: Contact
      - navigation "Help" [ref=e411]:
        - heading "Help" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - generic [ref=e415]: Safety
      - navigation "Legal" [ref=e416]:
        - heading "Legal" [level=2] [ref=e417]
        - list [ref=e418]:
          - listitem [ref=e419]:
            - generic [ref=e420]: Terms
          - listitem [ref=e421]:
            - generic [ref=e422]: Privacy
    - paragraph [ref=e424]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-3 material version prefill, earliest UTC date and scheduled block

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-5-sh74b-8-d-c-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-5-sh74b-8-d-c-global')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-5-sh74b-8-d-c-global')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-5-sh74b-8-d-c-global')


  238 |       await gotoReady(page, "/admin/legal");
  239 |       const own = page.getByTestId(`legal-doc-${kind}-global`);
> 240 |       await expect(own).toBeVisible();
      |                         ^
  241 |       await own.getByTestId("legal-new-version").click();
  242 |       await expect(page.getByTestId("legal-field-body-en")).toHaveValue(
  243 |         "## First\nOriginal English",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:240:25
```

Context:

```text
        - heading "Company" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: About
          - listitem [ref=e408]:
            - generic [ref=e409]: Contact
      - navigation "Help" [ref=e410]:
        - heading "Help" [level=2] [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - generic [ref=e414]: Safety
      - navigation "Legal" [ref=e415]:
        - heading "Legal" [level=2] [ref=e416]
        - list [ref=e417]:
          - listitem [ref=e418]:
            - generic [ref=e419]: Terms
          - listitem [ref=e420]:
            - generic [ref=e421]: Privacy
    - paragraph [ref=e423]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log

- Source: `shard 5`
- Project: `desktop-1280`

```text
TypeError: Cannot read properties of null (reading 'version_id')
--- further error 1 ---
TypeError: Cannot read properties of null (reading 'version_id')

  232 |       const body = globalAnswer.data as Row;
  233 |       expect(
> 234 |         body["version_id"],
      |             ^
  235 |         "the version in force is the published one whose time has come",
  236 |       ).toBe(fixture.publishedId);
  237 |       expect(body["version"]).toBe(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:234:13
```

Context: context file not found for `legal-doors-Legal-doors-LG-1-legal_in_force-answers-the-highest-published-version-whose-time-has-come-global-and-per-country-and-never-the-change-log-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-bcc09-ry-and-never-the-change-log-desktop-1280`; this run carried 16 context file(s); of the same spec: `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280`

## legal-doors.spec.ts › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "351d5ce1-8232-4de4-9d26-3ee231bd8a33"
Received array: []
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "351d5ce1-8232-4de4-9d26-3ee231bd8a33"
Received array: []

  577 |       expect(before.error).toBeNull();
  578 |       const beforeRows = before.data as Row[];
> 579 |       expect(beforeRows.map((r) => r["version_id"])).toContain(fixture.publishedId);
      |                                                      ^
  580 |
  581 |       await caller.rpc("accept_legal", {
  582 |         p_version_ids: [fixture.publishedId],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:579:54
```

Context: context file not found for `legal-doors-Legal-doors-LG-5-my_legal_status-lists-the-version-in-force-until-accepted-again-after-a-material-version-and-scopes-country-documents-to-the-home-country-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-d3b38-cuments-to-the-home-country-desktop-1280`; this run carried 16 context file(s); of the same spec: `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-dc62d--first-after-the-real-kinds-desktop-1280`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""

  684 |       p_settings: { notice_days: 400 },
  685 |     });
> 686 |     expect(badRange.error).toContain("badValue");
      |                            ^
  687 |     const badKey = await staff.rpc("admin_set_legal_settings", { p_settings: { bogus: 1 } });
  688 |     expect(badKey.error).toContain("badValue");
  689 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:686:28
```

Context:

```text
        - heading "Company" [level=2] [ref=e443]
        - list [ref=e444]:
          - listitem [ref=e445]:
            - generic [ref=e446]: About
          - listitem [ref=e447]:
            - generic [ref=e448]: Contact
      - navigation "Help" [ref=e449]:
        - heading "Help" [level=2] [ref=e450]
        - list [ref=e451]:
          - listitem [ref=e452]:
            - generic [ref=e453]: Safety
      - navigation "Legal" [ref=e454]:
        - heading "Legal" [level=2] [ref=e455]
        - list [ref=e456]:
          - listitem [ref=e457]:
            - generic [ref=e458]: Terms
          - listitem [ref=e459]:
            - generic [ref=e460]: Privacy
    - paragraph [ref=e462]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-10 admin_legal_documents lists a scratch document with each version's publisher and acceptance count, newest version first, after the real kinds

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: scratch document returned

expect(received).toBeDefined()

Received: undefined
--- further error 1 ---
Error: scratch document returned

expect(received).toBeDefined()

Received: undefined

  966 |       const documents = answer.data as Row[];
  967 |       const own = documents.find((d) => d["kind"] === kind);
> 968 |       expect(own, "scratch document returned").toBeDefined();
      |                                                ^
  969 |       const versions = own?.["versions"] as Row[];
  970 |       expect(versions.map((v) => v["version"])).toEqual([2, 1]);
  971 |       expect(versions[0]?.["published_by_name"]).toBe(profile.data?.display_name);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:968:48
```

Context:

```text
        - heading "Company" [level=2] [ref=e428]
        - list [ref=e429]:
          - listitem [ref=e430]:
            - generic [ref=e431]: About
          - listitem [ref=e432]:
            - generic [ref=e433]: Contact
      - navigation "Help" [ref=e434]:
        - heading "Help" [level=2] [ref=e435]
        - list [ref=e436]:
          - listitem [ref=e437]:
            - generic [ref=e438]: Safety
      - navigation "Legal" [ref=e439]:
        - heading "Legal" [level=2] [ref=e440]
        - list [ref=e441]:
          - listitem [ref=e442]:
            - generic [ref=e443]: Terms
          - listitem [ref=e444]:
            - generic [ref=e445]: Privacy
    - paragraph [ref=e447]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

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

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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
