# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37237374049
- Commit: `83da74b2bd6bb3eb475009a679dd02147bfcbc63`
- Attempt: 1
- Written (UTC): 2026-10-04T22:08:50.494Z
- Passed: 1139 · Skipped: 76 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · locations-tree.spec.ts › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves — Error: [e2e:l1c] seeding the region failed: duplicate key value violates unique constraint "locations_parent_slug_unique"

## Flaky bodies (DEC-078)

### locations-tree.spec.ts › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:l1c] seeding the region failed: duplicate key value violates unique constraint "locations_parent_slug_unique"
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-3-a-row-disappears-when-an-ancestor-is-retired-and-the-version-moves-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T21:46:55.027Z | 13.1 min |
| email | 2026-10-04T21:46:57.623Z | 0.2 min |
| shard 1 | 2026-10-04T21:46:48.203Z | 18.3 min |
| shard 2 | 2026-10-04T21:47:02.240Z | 21.4 min |
| shard 3 | 2026-10-04T21:46:59.422Z | 16.6 min |
| shard 4 | 2026-10-04T21:46:52.181Z | 17.7 min |
| shard 5 | 2026-10-04T21:47:01.045Z | 19.7 min |
| shard 6 | 2026-10-04T21:46:50.100Z | 12.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 64 | 16.1 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 15.6 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 54 | 15.4 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 36 | 11.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 44 | 10.6 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 8.6 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.4 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 7.5 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 24 | 7.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.1 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 50 | 7.1 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 32 | 6.8 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 40 | 6.7 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 22 | 5.7 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 34 | 5.4 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.0 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 4.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.7 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.2 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.6 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | desktop-1280 | 75.1 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 68.2 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | mobile-360 | 64.0 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | desktop-1280 | 61.7 s |
| `post-wizard-bundle2.spec.ts` › PW-127 picking a home country only selects; Next refuses until it is confirmed | mobile-360 | 61.3 s |
| `post-wizard-bundle2.spec.ts` › PW-127 picking a home country only selects; Next refuses until it is confirmed | desktop-1280 | 60.6 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 48.3 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | desktop-1280 | 45.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.0 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 37.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 37.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 36.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37237374049-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37237374049-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37237374049-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37237374049-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37237374049-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37237374049-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37237374049-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37237374049-6
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-131: the imitation was not refused on save

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-refusal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-131: the imitation was not refused on save with timeout 20000ms
  - waiting for getByTestId('post-who-alias-refusal')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-131-an-imitating-name-is-refused-when-the-step-is-saved-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-127: confirmed, still held

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-127: confirmed, still held with timeout 20000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-127-picking-a-home-country-only-selects-Next-refuses-until-it-is-confirmed-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-30: the review step never opened
PW-30 step timings: signed in @ 4222 ms | category and specifications seeded @ 4739 ms | step 3 reached @ 6576 ms | specifications answered @ 6820 ms | step 6 open @ 9556 ms | tree served @ 10085 ms | place chosen @ 10368 ms

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-30: the review step never opened
PW-30 step timings: signed in @ 4222 ms | category and specifications seeded @ 4739 ms | step 3 reached @ 6576 ms | specifications answered @ 6820 ms | step 6 open @ 9556 ms | tree served @ 10085 ms | place chosen @ 10368 ms with timeout 20000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-131: the imitation was not refused on save

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-refusal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-131: the imitation was not refused on save with timeout 20000ms
  - waiting for getByTestId('post-who-alias-refusal')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-131-an-imitating-name-is-refused-when-the-step-is-saved-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-127: confirmed, still held

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-127: confirmed, still held with timeout 20000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-127-picking-a-home-country-only-selects-Next-refuses-until-it-is-confirmed-desktop-1280`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-30: the review step never opened
PW-30 step timings: signed in @ 6859 ms | category and specifications seeded @ 8010 ms | step 3 reached @ 9995 ms | specifications answered @ 10206 ms | step 6 open @ 15866 ms | tree served @ 16734 ms | place chosen @ 16991 ms

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-30: the review step never opened
PW-30 step timings: signed in @ 6859 ms | category and specifications seeded @ 8010 ms | step 3 reached @ 9995 ms | specifications answered @ 10206 ms | step 6 open @ 15866 ms | tree served @ 16734 ms | place chosen @ 16991 ms with timeout 20000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-desktop-1280`

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

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
