# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37219293513
- Commit: `09dd1674064650b0a7f2e7b09f62964980ce844a`
- Attempt: 1
- Written (UTC): 2026-10-04T17:30:04.883Z
- Passed: 1059 · Skipped: 75 · Failed: 58
- Gating failures: 58 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

105 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
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

- Count: 5 · Sources: shard 3, shard 6

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
| smoke | 2026-10-04T17:08:28.129Z | 12.4 min |
| email | 2026-10-04T17:08:26.179Z | 0.2 min |
| shard 1 | 2026-10-04T17:08:18.539Z | 18.0 min |
| shard 2 | 2026-10-04T17:08:21.176Z | 17.5 min |
| shard 3 | 2026-10-04T17:08:21.723Z | 21.3 min |
| shard 4 | 2026-10-04T17:08:23.804Z | 18.7 min |
| shard 5 | 2026-10-04T17:08:21.184Z | 17.1 min |
| shard 6 | 2026-10-04T17:08:20.513Z | 20.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 62 | 33.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 15.2 min | smoke, shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 28 | 14.0 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 40 | 11.4 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 10.2 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 36 | 9.6 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 9.4 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 48 | 8.4 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 40 | 8.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.4 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 32 | 7.2 min | shard 3, shard 5 |
| `auth-signout.spec.ts` | 44 | 7.1 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 6.3 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 6.1 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 5.7 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 5.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 5.1 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 4.2 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.1 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 3.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 2.7 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-category.spec.ts` › PW-48 a catch-all leaf can be chosen and its listing lands in review | desktop-1280 | 83.8 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | mobile-360 | 79.2 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 77.9 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 74.4 s |
| `post-wizard-category.spec.ts` › PW-48 a catch-all leaf can be chosen and its listing lands in review | mobile-360 | 73.7 s |
| `post-wizard-where.spec.ts` › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page | mobile-360 | 71.4 s |
| `post-wizard-specs.spec.ts` › PW-75 the required mark is uniform across steps (D72) | desktop-1280 | 71.0 s |
| `post-wizard-where.spec.ts` › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page | desktop-1280 | 69.8 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 67.1 s |
| `post-wizard-specs.spec.ts` › PW-75 the required mark is uniform across steps (D72) | mobile-360 | 67.1 s |
| `post-wizard-specs.spec.ts` › PW-28 a conditional detail appears only when its condition is met | desktop-1280 | 66.5 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | mobile-360 | 65.6 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 65.3 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 65.1 s |
| `post-wizard-where.spec.ts` › PW-104 a unit settled by the type is held by the price page's unit | desktop-1280 | 64.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37219293513-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37219293513-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37219293513-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37219293513-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37219293513-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37219293513-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37219293513-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37219293513-6
```

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-54: details did not follow

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-54: details did not follow with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-27: the strip would not go back to a step already done

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-27: the strip would not go back to a step already done with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-27-the-mobile-strip-walks-back-to-a-step-already-done-and-no-further-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-48: publishing into a catch-all leaf did not land on the in-review screen

expect(locator).toBeVisible() failed

Locator: getByTestId('post-in-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-48: publishing into a catch-all leaf did not land on the in-review screen with timeout 20000ms
  - waiting for getByTestId('post-in-review')

```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-mobile-360`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-by-name-mobile-360`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-73-the-door-s-currency-fill-is-mirrored-so-Undo-restores-a-complete-price-INC-321-mobile-360`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-mobile-360`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-79-clearing-the-title-and-tapping-Next-at-once-still-registers-the-tap-INC-332-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-70-a-strict-refusal-focuses-the-first-refused-field-D70-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-no-preference-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-reduce-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-75-the-required-mark-is-uniform-across-steps-D72-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-mobile-360`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-84-a-new-post-opens-on-the-seller-s-own-last-post-never-another-seller-s-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-control"][data-attr="e2e_muu307sujxh1sp_quantity"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_muu307sujxh1sp_quantity"]')

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-88-a-step-3-answer-s-fact-and-narrowing-reach-the-unit-asked-on-the-price-page-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-104: the price page does not hold the settled unit

expect(locator).toHaveValue(expected) failed

Locator: locator('[data-testid="post-attr-control"][data-attr="unit_of_sale-e2e_muu31pc2gryv8q"]')
Expected: "per_kg"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-104: the price page does not hold the settled unit with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="unit_of_sale-e2e_muu31pc2gryv8q"]')

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-104-a-unit-settled-by-the-type-is-held-by-the-price-page-s-unit-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-89-thousand-million-the-full-amount-is-stored-and-shown-mobile-360`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-98-the-item-tick-sits-on-the-city-line-fresh-and-prefilled-mobile-360`

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"home_country_code","reason":"required"},{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "price_amount", "reason": "required"}]
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-54: details did not follow

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-54: details did not follow with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-48: publishing into a catch-all leaf did not land on the in-review screen

expect(locator).toBeVisible() failed

Locator: getByTestId('post-in-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-48: publishing into a catch-all leaf did not land on the in-review screen with timeout 20000ms
  - waiting for getByTestId('post-in-review')

```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-desktop-1280`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-by-name-desktop-1280`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-73-the-door-s-currency-fill-is-mirrored-so-Undo-restores-a-complete-price-INC-321-desktop-1280`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-desktop-1280`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-79-clearing-the-title-and-tapping-Next-at-once-still-registers-the-tap-INC-332-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-70-a-strict-refusal-focuses-the-first-refused-field-D70-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-no-preference-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-reduce-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-75-the-required-mark-is-uniform-across-steps-D72-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-22-a-link-s-allowed-options-narrow-the-picker-and-its-default-prefills-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-9-an-option-s-facts-prefill-the-siblings-they-name-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-5')

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-84-a-new-post-opens-on-the-seller-s-own-last-post-never-another-seller-s-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-control"][data-attr="e2e_muu2zv4wck3w4j_quantity"]')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_muu2zv4wck3w4j_quantity"]')

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-88-a-step-3-answer-s-fact-and-narrowing-reach-the-unit-asked-on-the-price-page-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-104: the price page does not hold the settled unit

expect(locator).toHaveValue(expected) failed

Locator: locator('[data-testid="post-attr-control"][data-attr="unit_of_sale-e2e_muu31f6f4ep42w"]')
Expected: "per_kg"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-104: the price page does not hold the settled unit with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="unit_of_sale-e2e_muu31f6f4ep42w"]')

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-104-a-unit-settled-by-the-type-is-held-by-the-price-page-s-unit-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-89-thousand-million-the-full-amount-is-stored-and-shown-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-98 the item tick sits on the city line, fresh and prefilled

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-98-the-item-tick-sits-on-the-city-line-fresh-and-prefilled-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"home_country_code","reason":"required"},{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e316]:
            - generic [ref=e317]: About
          - listitem [ref=e318]:
            - generic [ref=e319]: How it works
      - navigation "Help" [ref=e320]:
        - heading "Help" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Safety
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Legal" [ref=e327]:
        - heading "Legal" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Terms
          - listitem [ref=e332]:
            - generic [ref=e333]: Privacy
    - paragraph [ref=e335]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "price_amount", "reason": "required"}]
```

Context:

```text
          - listitem [ref=e243]:
            - generic [ref=e244]: About
          - listitem [ref=e245]:
            - generic [ref=e246]: How it works
      - navigation "Help" [ref=e247]:
        - heading "Help" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Safety
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
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

## shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City ybjqx/
Received string:  "Escratch Guess City hrtzuqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    14 × locator resolved to <button type="button" id="radix-_r_4_" aria-label="City" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" class="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City hrtzuqx"

```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-desktop-1280`

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

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×21
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×3
console.error: [client-error] gate fetch threw
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×22
```
