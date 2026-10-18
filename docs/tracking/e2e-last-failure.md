# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39119741206
- Commit: `15bd244e9aa5ca25db23616d24766b0a8ce1aaef`
- Attempt: 1
- Written (UTC): 2026-10-18T11:21:48.577Z
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kf<n>w<n>v: e<n>e_par_s<n>dm<n> → e<n>e_chi_<n>r<n>aah` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>q<n>yk: e<n>e_par_g<n>n<n>g<n> → e<n>e_chi_in<n>t<n>z` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kf<n>w<n>v: e<n>e_par_s<n>dm<n> → e<n>e_chi_<n>r<n>aah ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-t<n>q<n>yk: e<n>e_par_g<n>n<n>g<n> → e<n>e_chi_in<n>t<n>z ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-108 an Other basis names the seller's written unit (INC-371) ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2

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
| smoke | 2026-10-18T10:35:09.642Z | 18.5 min |
| email | 2026-10-18T10:35:03.261Z | 0.2 min |
| shard 1 | 2026-10-18T10:35:01.766Z | 39.8 min |
| shard 2 | 2026-10-18T10:35:04.047Z | 38.8 min |
| shard 3 | 2026-10-18T10:35:03.788Z | 34.2 min |
| shard 4 | 2026-10-18T10:35:06.514Z | 46.3 min |
| shard 5 | 2026-10-18T10:34:59.539Z | 35.9 min |
| shard 6 | 2026-10-18T10:35:12.111Z | 36.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 25.4 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 25.1 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.3 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.7 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.1 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 16.6 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 14.9 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 14.5 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.2 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.9 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 12.6 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 11.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 11.5 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 11.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.2 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.9 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 10.6 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.8 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.5 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.3 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.2 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.6 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.8 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.8 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.8 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
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
| `ad-page.spec.ts` › AP-45 the tabs on a wide screen | desktop-1280 | 75.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 52.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 50.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 49.8 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 49.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 48.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 47.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 46.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 45.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.4 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 44.1 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 43.0 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | mobile-360 | 42.2 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | desktop-1280 | 42.1 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 41.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39119741206-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39119741206-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39119741206-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 4, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 39119741206-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39119741206-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39119741206-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39119741206-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39119741206-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-45 the tabs on a wide screen

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="details"]')
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="details"]')
    14 × locator resolved to <button type="button" aria-current="true" data-target="details" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none borde…>Details</button>
       - unexpected value "true"

--- further error 1 ---
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="details"]')
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="details"]')
    14 × locator resolved to <button type="button" aria-current="true" data-target="details" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none borde…>Details</button>
       - unexpected value "true"


  1487 |         "true",
  1488 |       );
> 1489 |       await expect(bar.locator('[data-target="details"]')).not.toHaveAttribute(
       |                                                                ^
  1490 |         "aria-current",
  1491 |         "true",
```

Context:

```text
          - listitem [ref=e349]:
            - generic [ref=e350]: About
          - listitem [ref=e351]:
            - generic [ref=e352]: How it works
      - navigation "Help" [ref=e353]:
        - heading "Help" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - generic [ref=e357]: Safety
          - listitem [ref=e358]:
            - generic [ref=e359]: Contact
      - navigation "Legal" [ref=e360]:
        - heading "Legal" [level=2] [ref=e361]
        - list [ref=e362]:
          - listitem [ref=e363]:
            - generic [ref=e364]: Terms
          - listitem [ref=e365]:
            - generic [ref=e366]: Privacy
    - paragraph [ref=e368]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-3-t7q1yk: e2e_par_g8n1g1 → e2e_chi_in8t7z
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
