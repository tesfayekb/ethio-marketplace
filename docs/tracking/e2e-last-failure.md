# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39133362204
- Commit: `509e751854389aab10d152c2f7334792bdfd6314`
- Attempt: 1
- Written (UTC): 2026-10-18T14:52:37.215Z
- Passed: 1917 · Skipped: 130 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rqrrjz: e<n>e_par_sfu<n>sb → e<n>e_chi_<n>dxka` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xb<n>rr<n>: e<n>e_par_<n>o<n>wzs → e<n>e_chi_ufthf<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rqrrjz: e<n>e_par_sfu<n>sb → e<n>e_chi_<n>dxka ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xb<n>rr<n>: e<n>e_par_<n>o<n>wzs → e<n>e_chi_ufthf<n> ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · /settings shows the Account context, and returning shows categories ×1

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
| smoke | 2026-10-18T14:09:40.575Z | 18.0 min |
| email | 2026-10-18T14:09:44.625Z | 0.3 min |
| shard 1 | 2026-10-18T14:09:38.619Z | 42.7 min |
| shard 2 | 2026-10-18T14:09:33.772Z | 37.6 min |
| shard 3 | 2026-10-18T14:09:45.198Z | 38.1 min |
| shard 4 | 2026-10-18T14:09:35.733Z | 40.0 min |
| shard 5 | 2026-10-18T14:09:33.213Z | 37.9 min |
| shard 6 | 2026-10-18T14:09:53.745Z | 38.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 27.4 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.6 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 66 | 23.6 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 20.6 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 19.4 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 18.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 18.5 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 15.9 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 15.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.0 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 11.7 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.6 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.1 min | smoke, shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 10.7 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 10.4 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 10.1 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 9.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 8.7 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 7.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.4 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.4 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.5 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 14 | 6.2 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.8 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.5 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.9 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.1 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-specs.spec.ts` › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer | desktop-1280 | 86.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 74.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 57.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 55.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 53.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 52.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 50.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 46.7 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 46.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 44.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 44.0 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 43.3 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 43.2 s |
| `photo-pipeline.spec.ts` › PP-8 DELETE removes the row and the objects; POST makes a photo the cover | desktop-1280 | 43.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 43.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39133362204-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39133362204-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39133362204-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 4, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 39133362204-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39133362204-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39133362204-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39133362204-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39133362204-6
```

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-157 the ad never moved

expect(received).toBe(expected) // Object.is equality

Expected: "adebfbc4-f004-4998-b270-142d22f4d408"
Received: "be177343-4fe6-48c8-90a8-00ef254d5afa"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-157 the ad never moved

expect(received).toBe(expected) // Object.is equality

Expected: "adebfbc4-f004-4998-b270-142d22f4d408"
Received: "be177343-4fe6-48c8-90a8-00ef254d5afa"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  2613 |     await pointer.click();
  2614 |     await page.getByTestId("post-category-move-yes").click();
> 2615 |     await expect
       |     ^
  2616 |       .poll(async () => (await draftsOf(user.id))[0]?.category_id, {
  2617 |         message: "PW-157 the ad never moved",
  2618 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:2615:5
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-157-a-category-pointer-in-help-text-asks-then-moves-the-ad-and-keeps-the-answer-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--c6d44-the-ad-and-keeps-the-answer-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
