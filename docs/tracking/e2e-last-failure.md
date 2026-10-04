# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37210551317
- Commit: `2ff58122e22cf414a498ad538c63ed1c73f541ec`
- Attempt: 2
- Written (UTC): 2026-10-04T15:09:47.013Z
- Passed: 321 · Skipped: 42 · Failed: 38
- Gating failures: 38 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 6, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

104 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 6, changed |
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

- Count: 4 · Sources: shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

8 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 6, changed · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T14:51:07.632Z | 17.6 min |
| email | 2026-10-04T14:51:00.290Z | 0.1 min |
| shard 6 | 2026-10-04T14:50:58.015Z | 18.5 min |
| changed | 2026-10-04T14:50:58.548Z | 12.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 40 | 14.3 min | changed |
| `shell.spec.ts` | 189 | 13.3 min | smoke, shard 6 |
| `post-wizard-specs.spec.ts` | 31 | 13.2 min | shard 6 |
| `posting-routes.spec.ts` | 72 | 12.5 min | shard 6, changed |
| `post-wizard-where.spec.ts` | 14 | 7.5 min | shard 6 |
| `post-wizard-resets.spec.ts` | 9 | 5.6 min | shard 6 |
| `auth-signout.spec.ts` | 22 | 5.1 min | smoke |
| `a11y.spec.ts` | 4 | 2.6 min | smoke |
| `rbac.spec.ts` | 3 | 0.3 min | shard 6 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 3 | 0.2 min | smoke, shard 6 |
| `shell-table-law.spec.ts` | 1 | 0.1 min | shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 80.1 s |
| `a11y.spec.ts` › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y | mobile-360 | 77.6 s |
| `post-wizard-where.spec.ts` › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3 | desktop-1280 | 76.9 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 76.3 s |
| `a11y.spec.ts` › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y | desktop-1280 | 74.4 s |
| `post-wizard-bundle2.spec.ts` › PW-133 contact details are kept on the profile and open the next ad | desktop-1280 | 74.1 s |
| `post-wizard-where.spec.ts` › PW-104 a unit settled by the type is named on step 5 and changed on step 3 | desktop-1280 | 73.5 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 73.4 s |
| `post-wizard-bundle2.spec.ts` › PW-133 contact details are kept on the profile and open the next ad | mobile-360 | 72.0 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 67.2 s |
| `post-wizard-where.spec.ts` › PW-89 thousand / million: the full amount is stored and shown | desktop-1280 | 65.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 62.0 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 61.6 s |
| `post-wizard-specs.spec.ts` › PW-77 the first refused field's label lands below the header (D2, reduce) | desktop-1280 | 59.4 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 59.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 37210551317-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37210551317-email
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37210551317-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 37210551317-changed
```

## a11y.spec.ts › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y

- Source: `smoke`
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

Context: context file not found for `a11y-A11Y-SMOKE-DEC-084-gating-A11Y-2-wizard-steps-1-3-and-5-for-a-scratch-seller-a11y-mobile-360`

## a11y.spec.ts › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y

- Source: `smoke`
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

Context: context file not found for `a11y-A11Y-SMOKE-DEC-084-gating-A11Y-2-wizard-steps-1-3-and-5-for-a-scratch-seller-a11y-desktop-1280`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317)

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

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-72-after-a-category-reset-a-currency-prefill-that-lands-late-never-claims-a-step-the-seller-has-not-re-completed-INC-317-desktop-1280`

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

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

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

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-desktop-1280`

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-79: the title did not take focus

expect(locator).toBeFocused() failed

Locator:  getByTestId('post-title')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - PW-79: the title did not take focus with timeout 10000ms
  - waiting for getByTestId('post-title')
    14 × locator resolved to <input value="" id="post-title" maxlength="120" data-testid="post-title" placeholder="e.g. Samsung fridge, working, one owner" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive ring-1 ring-destructive"/>
       - unexpected value "inactive"

```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-79-clearing-the-title-and-tapping-Next-at-once-still-registers-the-tap-INC-332-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-6: the seller's title never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: "e2e seller's own title"
Received: "e2e-post-6-1-h4iwej e2e assist facts (1)"

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

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

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-70: the refused title did not take focus

expect(locator).toBeFocused() failed

Locator:  getByTestId('post-title')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - PW-70: the refused title did not take focus with timeout 10000ms
  - waiting for getByTestId('post-title')
    14 × locator resolved to <input value="" id="post-title" maxlength="120" data-testid="post-title" placeholder="e.g. Samsung fridge, working, one owner" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive ring-1 ring-destructive"/>
       - unexpected value "inactive"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-70-a-strict-refusal-focuses-the-first-refused-field-D70-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-77: the refused title did not take focus

expect(locator).toBeFocused() failed

Locator:  getByTestId('post-title')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - PW-77: the refused title did not take focus with timeout 10000ms
  - waiting for getByTestId('post-title')
    14 × locator resolved to <input value="" id="post-title" maxlength="120" data-testid="post-title" placeholder="e.g. Samsung fridge, working, one owner" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive ring-1 ring-destructive"/>
       - unexpected value "inactive"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-no-preference-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-77: the refused title did not take focus

expect(locator).toBeFocused() failed

Locator:  getByTestId('post-title')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - PW-77: the refused title did not take focus with timeout 10000ms
  - waiting for getByTestId('post-title')
    14 × locator resolved to <input value="" id="post-title" maxlength="120" data-testid="post-title" placeholder="e.g. Samsung fridge, working, one owner" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive ring-1 ring-destructive"/>
       - unexpected value "inactive"

```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-reduce-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

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

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-desktop-1280`

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

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

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-desktop-1280`

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

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3

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

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-88-a-step-3-answer-s-fact-and-narrowing-reach-the-unit-asked-on-step-3-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3

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

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-104-a-unit-settled-by-the-type-is-named-on-step-5-and-changed-on-step-3-desktop-1280`

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown

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
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: How it works
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
          - listitem [ref=e294]:
            - generic [ref=e295]: Contact
      - navigation "Legal" [ref=e296]:
        - heading "Legal" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Terms
          - listitem [ref=e301]:
            - generic [ref=e302]: Privacy
    - paragraph [ref=e304]: © 2026 ethio.com — All rights reserved.
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

## posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller is named before an ad is published (INC-423)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"required"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "alias", "reason": "required"}
Received array: [{"field": "listingId", "reason": "required"}]
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-24-a-seller-is-named-before-an-ad-is-published-INC-423-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-in-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-in-review')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-115-without-own_place-the-last-post-s-pin-directions-and-details-carry-over-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-116-an-own_place-category-never-carries-the-last-post-s-pin-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-118-a-draft-s-own-channel-is-never-overwritten-by-the-last-post-s-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-133: the profile does not hold the phone

expect(received).toBe(expected) // Object.is equality

Expected: "+251911234567"
Received: ""

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-133-contact-details-are-kept-on-the-profile-and-open-the-next-ad-mobile-360`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-in-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-in-review')

```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-115-without-own_place-the-last-post-s-pin-directions-and-details-carry-over-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-116-an-own_place-category-never-carries-the-last-post-s-pin-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-118-a-draft-s-own-channel-is-never-overwritten-by-the-last-post-s-desktop-1280`

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-133: the profile does not hold the phone

expect(received).toBe(expected) // Object.is equality

Expected: "+251911234567"
Received: ""

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-133-contact-details-are-kept-on-the-profile-and-open-the-next-ad-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `changed`
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

- Source: `changed`
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

## posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller is named before an ad is published (INC-423)

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"required"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "alias", "reason": "required"}
Received array: [{"field": "listingId", "reason": "required"}]
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-24-a-seller-is-named-before-an-ad-is-published-INC-423-mobile-360`

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"home_country_code","reason":"required"},{"field":"alias","reason":"required"},{"field":"first_name","reason":"required"},{"field":"last_name","reason":"required"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: How it works
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
          - listitem [ref=e294]:
            - generic [ref=e295]: Contact
      - navigation "Legal" [ref=e296]:
        - heading "Legal" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Terms
          - listitem [ref=e301]:
            - generic [ref=e302]: Privacy
    - paragraph [ref=e304]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "price_amount", "reason": "required"}]
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

## posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller is named before an ad is published (INC-423)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"required"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "alias", "reason": "required"}
Received array: [{"field": "listingId", "reason": "required"}]
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-24-a-seller-is-named-before-an-ad-is-published-INC-423-desktop-1280`

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×4
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×5
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×39
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×3
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×13
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓  141 [mobile-360] › e2e/admin-locations.spec.ts:818:3 › L2a locations console › LT-9b roster shape, card twin: the edit icon sits inline beside the path line (2.5s)
  ✓  138 [mobile-360] › e2e/admin-roles.spec.ts:372:3 › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match (12.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-1-3147-2-ffov5f@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-1-3147-3-v7vram@ethio-e2e.invalid)
  ✓  142 [mobile-360] › e2e/admin-locations.spec.ts:844:3 › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline (3.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-1-3147-2-ffov5f@ethio-e2e.invalid)
  ✓  144 [mobile-360] › e2e/admin-locations.spec.ts:888:3 › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one (2.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37210551317-1-3147-2-ffov5f@ethio-e2e.invalid)
  ✓  145 [mobile-360] › e2e/admin-locations.spec.ts:935:3 › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country (3.1s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (25) ---
  ✘    6 [mobile-360] › e2e/admin-translations-data.spec.ts:452:3 › U4b translations console › TR-26 the Data scope approves every machine-filled content name (583ms)
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘  124 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (36.5s)
  ✘  129 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (retry #1) (35.7s)
  ✘  141 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (11.8s)
  ✘  143 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (retry #1) (11.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  142 [mobile-360] › e2e/post-wizard-category.spec.ts:898:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further (24.1s)
  ✘  144 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (12.6s)
  ✘  146 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (retry #1) (10.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  145 [mobile-360] › e2e/post-wizard-category.spec.ts:898:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further (retry #1) (25.5s)
  ✘  150 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (11.2s)
  ✘  152 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (retry #1) (10.8s)
  ✘  158 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:829:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (33.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  160 [mobile-360] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (23.3s)
  ✘  162 [mobile-360] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (retry #1) (22.2s)
  ✘  161 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:829:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (retry #1) (32.7s)
  ✘  167 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (21.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  170 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (retry #1) (20.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  171 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (17.8s)
  ✘  172 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (16.7s)
--- final 10 lines ---
✓  166 [mobile-360] › e2e/post-wizard-finder.spec.ts:125:3 › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice (6.9s)
  ✓  168 [mobile-360] › e2e/post-wizard-finder.spec.ts:149:3 › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer (5.6s)
  ✓  169 [mobile-360] › e2e/post-wizard-finder.spec.ts:180:3 › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it (11.6s)
  ✘  167 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (21.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  170 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (retry #1) (20.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  171 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (17.8s)
  ✘  172 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (16.7s)
```

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×5
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    1 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (24.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    3 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (21.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    4 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (22.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    5 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (retry #1) (26.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    6 [mobile-360] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (28.1s)
  ✘    7 [mobile-360] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (33.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    8 [mobile-360] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (35.3s)
  ✘    9 [mobile-360] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (retry #1) (31.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   10 [mobile-360] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (33.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   11 [mobile-360] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (29.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (retry #1) (29.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   13 [mobile-360] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (retry #1) (29.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   14 [mobile-360] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (32.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   15 [mobile-360] › e2e/post-wizard-resets.spec.ts:543:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (35.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   16 [mobile-360] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (retry #1) (32.8s)
  ✘   17 [mobile-360] › e2e/post-wizard-resets.spec.ts:543:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (retry #1) (26.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
--- final 10 lines ---
✓   78 [mobile-360] › e2e/post-wizard-specs.spec.ts:1312:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (8.9s)
  ✘   75 [mobile-360] › e2e/post-wizard-where.spec.ts:365:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (31.2s)
  ✓   79 [mobile-360] › e2e/post-wizard-specs.spec.ts:1377:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (9.9s)
  ✓   81 [mobile-360] › e2e/post-wizard-specs.spec.ts:1547:3 › POSTING WIZARD › PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45) (9.3s)
  ✓   82 [mobile-360] › e2e/post-wizard-specs.spec.ts:1600:3 › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray (7.1s)
  ✘   80 [mobile-360] › e2e/post-wizard-where.spec.ts:365:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (retry #1) (29.1s)
  ✓   83 [mobile-360] › e2e/post-wizard-specs.spec.ts:1671:3 › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile (6.8s)
  ✓   85 [mobile-360] › e2e/post-wizard-specs.spec.ts:1740:3 › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) (9.1s)
  ✓   86 [mobile-360] › e2e/post-wizard-specs.spec.ts:1801:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (6.7s)
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×39
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘  151 [desktop-1280] › e2e/admin-locations.spec.ts:975:3 › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope (21.8s)
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-4-3071-3-kletwv@ethio-e2e.invalid)
  ✓  161 [desktop-1280] › e2e/admin-translations-console.spec.ts:157:3 › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER (7.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-4-3071-3-kletwv@ethio-e2e.invalid)
  ✓  162 [desktop-1280] › e2e/admin-translations-console.spec.ts:177:3 › U4b translations console › TR-5 filters live in the URL and survive a reload (2.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-4-3071-3-kletwv@ethio-e2e.invalid)
  ✓  163 [desktop-1280] › e2e/admin-translations-console.spec.ts:203:3 › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication (2.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37210551317-4-3071-3-kletwv@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 92dde34a-faed-45c2-928c-c5bc4d84b4e6: []
  ✓  164 [desktop-1280] › e2e/admin-translations-console.spec.ts:261:3 › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts (6.8s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
  ✘    8 [desktop-1280] › e2e/admin-translations-data.spec.ts:587:3 › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else (567ms)
  ✘  105 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (31.4s)
  ✘  110 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (retry #1) (33.9s)
  ✘  123 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (10.8s)
  ✘  125 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (retry #1) (11.0s)
  ✘  128 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (12.8s)
  ✘  130 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (retry #1) (13.2s)
  ✘  135 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (14.6s)
  ✘  137 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (retry #1) (10.9s)
  ✘  140 [desktop-1280] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (24.7s)
  ✘  143 [desktop-1280] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (retry #1) (22.0s)
  ✘  142 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:829:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (30.3s)
  ✘  145 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:829:3 › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad (retry #1) (33.3s)
  ✘  148 [desktop-1280] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (26.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  152 [desktop-1280] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (retry #1) (26.0s)
  ✘  153 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (20.4s)
  ✘  154 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (19.9s)
  ✘  155 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (19.5s)
  ✘  156 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (18.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  157 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (20.9s)
  ✘  158 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (17.0s)
  ✘  159 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (17.2s)
  ✘  160 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (retry #1) (19.2s)
  ✘  161 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (18.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  162 [desktop-1280] › e2e/post-wizard-place.spec.ts:574:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (17.0s)
  ✘  163 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (retry #1) (17.1s)
  ✘  164 [desktop-1280] › e2e/post-wizard-place.spec.ts:574:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (retry #1) (16.6s)
--- final 10 lines ---
✘  159 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (17.2s)
  ✘  160 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (retry #1) (19.2s)
  ✘  161 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (18.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  162 [desktop-1280] › e2e/post-wizard-place.spec.ts:574:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (17.0s)
  ✘  163 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (retry #1) (17.1s)
  ✘  164 [desktop-1280] › e2e/post-wizard-place.spec.ts:574:3 › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live (retry #1) (16.6s)
  ✘  165 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (16.1s)
  ✘  167 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (retry #1) (15.8s)
```

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×3
```
