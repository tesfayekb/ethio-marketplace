# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39152753248
- Commit: `dab2e54beee445f8727c3de73162b748f8149101`
- Attempt: 1
- Written (UTC): 2026-10-18T18:58:31.802Z
- Passed: 1933 · Skipped: 132 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed — Error: PP-15: Remove on a stored photo did not delete it

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    24
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    24

  1629 |       expect(
  1630 |         Math.abs(sellerBox.y + sellerBox.height - (mediaBox.y + mediaBox.height)),
> 1631 |       ).toBeLessThanOrEqual(1);
       |         ^
  1632 |     } else if (article.width >= 672)
  1633 |       expect(
  1634 |         Math.abs(headlineBox.y + headlineBox.height - (mediaBox.y + mediaBox.height)),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1631:9
```

Context:

```text
        - heading "Company" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: About
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Help" [ref=e339]:
        - heading "Help" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Safety
      - navigation "Legal" [ref=e344]:
        - heading "Legal" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic [ref=e348]: Terms
          - listitem [ref=e349]:
            - generic [ref=e350]: Privacy
    - paragraph [ref=e352]: © 2026 ethio.com — All rights reserved.
```
```

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PP-15: Remove on a stored photo did not delete it

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "a3513bb8-4557-4528-9f8e-5a3eaa9fdf90",
+   "40997214-00f7-4ab0-badc-c14b64395fad",
  ]

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PP-15: Remove on a stored photo did not delete it

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "a3513bb8-4557-4528-9f8e-5a3eaa9fdf90",
+   "40997214-00f7-4ab0-badc-c14b64395fad",
  ]

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  735 |     // Remove deletes the other one.
  736 |     await stored.nth(1).getByTestId("post-photo-remove").click();
> 737 |     await expect
      |     ^
  738 |       .poll(order, { message: "PP-15: Remove on a stored photo did not delete it" })
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-15-a-photo-stored-in-an-earlier-visit-can-be-made-the-cover-which-moves-it-first-and-removed-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0fa8a--moves-it-first-and-removed-desktop-1280`; this run carried 7 context file(s); of the same spec: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>nl<n>r: e<n>e_par_d<n>snxn → e<n>e_chi_<n>onrvv` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wg<n>tj<n>: e<n>e_par_twknjp → e<n>e_chi_sps<n>ax` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-u<n>nl<n>r: e<n>e_par_d<n>snxn → e<n>e_chi_<n>onrvv ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wg<n>tj<n>: e<n>e_par_twknjp → e<n>e_chi_sps<n>ax ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1

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
| smoke | 2026-10-18T18:14:11.848Z | 16.4 min |
| email | 2026-10-18T18:14:19.878Z | 0.3 min |
| shard 1 | 2026-10-18T18:14:10.438Z | 44.1 min |
| shard 2 | 2026-10-18T18:14:10.922Z | 41.9 min |
| shard 3 | 2026-10-18T18:14:07.384Z | 34.2 min |
| shard 4 | 2026-10-18T18:14:07.038Z | 42.4 min |
| shard 5 | 2026-10-18T18:14:06.189Z | 39.9 min |
| shard 6 | 2026-10-18T18:14:12.314Z | 39.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 27.5 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 25.2 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 66 | 24.6 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 62 | 20.3 min | shard 1, shard 4 |
| `shell.spec.ts` | 344 | 20.0 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.5 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 80 | 18.8 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.6 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 15.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.1 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.3 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.2 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 11.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.3 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 11.2 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.0 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.7 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 10.5 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 32 | 9.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.4 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.6 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.6 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.0 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.9 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 22 | 6.5 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.6 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.7 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
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
| `photo-pipeline.spec.ts` › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed | desktop-1280 | 77.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 62.4 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 61.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 60.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 57.9 s |
| `photo-pipeline.spec.ts` › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed | mobile-360 | 57.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 54.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 52.7 s |
| `post-wizard-bundle2.spec.ts` › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) | mobile-360 | 49.6 s |
| `admin-listings.spec.ts` › AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note | desktop-1280 | 49.4 s |
| `post-wizard-bundle2.spec.ts` › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) | desktop-1280 | 48.3 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 47.7 s |
| `admin-listings.spec.ts` › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written | mobile-360 | 47.5 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 46.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-28 the import dialog reaches Applied and undoes | desktop-1280 | 46.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39152753248-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39152753248-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39152753248-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39152753248-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39152753248-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39152753248-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39152753248-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39152753248-6
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: About
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Help" [ref=e136]:
        - heading "Help" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Safety
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e144]
        - list [ref=e145]:
          - listitem [ref=e146]:
            - generic [ref=e147]: About
          - listitem [ref=e148]:
            - generic [ref=e149]: Contact
      - navigation "Help" [ref=e150]:
        - heading "Help" [level=2] [ref=e151]
        - list [ref=e152]:
          - listitem [ref=e153]:
            - generic [ref=e154]: Safety
      - navigation "Legal" [ref=e155]:
        - heading "Legal" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Terms
          - listitem [ref=e160]:
            - generic [ref=e161]: Privacy
    - paragraph [ref=e163]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  1012 |     await sellerItem.click();
  1013 |     await expect(sellerItem).toHaveAttribute("aria-current", "true");
> 1014 |     await expect
       |     ^
  1015 |       .poll(async () => {
  1016 |         const heading = await page
  1017 |           .locator('section[data-testid="listing-detail-seller"]')
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1014:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: About
          - listitem [ref=e383]:
            - generic [ref=e384]: Contact
      - navigation "Help" [ref=e385]:
        - heading "Help" [level=2] [ref=e386]
        - list [ref=e387]:
          - listitem [ref=e388]:
            - generic [ref=e389]: Safety
      - navigation "Legal" [ref=e390]:
        - heading "Legal" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Terms
          - listitem [ref=e395]:
            - generic [ref=e396]: Privacy
    - paragraph [ref=e398]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka getByTestId('shell-topbar').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: About
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Help" [ref=e136]:
        - heading "Help" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Safety
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 2 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="footer-home" class="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('footer-home')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })


  26 |   //    name, which holds at every breakpoint, and assert the h1 separately.
  27 |   await page.goto("/");
> 28 |   await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();
     |                                                                               ^
  29 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  30 |   await expectNoHorizontalOverflow(page);
  31 |
```

Context:

```text
        - heading "Company" [level=2] [ref=e144]
        - list [ref=e145]:
          - listitem [ref=e146]:
            - generic [ref=e147]: About
          - listitem [ref=e148]:
            - generic [ref=e149]: Contact
      - navigation "Help" [ref=e150]:
        - heading "Help" [level=2] [ref=e151]
        - list [ref=e152]:
          - listitem [ref=e153]:
            - generic [ref=e154]: Safety
      - navigation "Legal" [ref=e155]:
        - heading "Legal" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Terms
          - listitem [ref=e160]:
            - generic [ref=e161]: Privacy
    - paragraph [ref=e163]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-3-u4nl3r: e2e_par_d2snxn → e2e_chi_5onrvv
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
