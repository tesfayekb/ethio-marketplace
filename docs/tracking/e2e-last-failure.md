# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37167434354
- Commit: `d3be2df2741c6a850c85303871c501031a754e35`
- Attempt: 1
- Written (UTC): 2026-10-04T01:39:15.760Z
- Passed: 985 · Skipped: 74 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: shard 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos — Error: upload 1: {"error":"server error"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed

## Flaky bodies (DEC-078)

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `shard 3`
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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-mobile-360`

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: upload 1: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-desktop-1280`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

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

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-desktop-1280`

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City vqdxqx/
Received string:  "Escratch Guess City iibrqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    14 × locator resolved to <button type="button" id="radix-_r_4_" aria-label="City" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" class="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City iibrqx"

```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 2, shard 3, shard 6, changed |
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
| `storage put default/<uuid>/<uuid>/<uuid>/cover.png: Gateway Timeout \| at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-ubrXB<n>.mjs:<n>:<n>)` | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 2, shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### storage put default/<uuid>/<uuid>/<uuid>/cover.png: Gateway Timeout | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-ubrXB<n>.mjs:<n>:<n>)

- Count: 1 · Sources: shard 5

```text
[WebServer] [ssr-error] /api/upload/photo storage put default/4ed39b68-a77a-4639-bf1b-c2dcb5338903/c3692df0-4cb8-4362-834d-cea114196887/f8b7b3ed-3601-4e0e-83e5-f988121ffeed/cover.png: Gateway Timeout | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-ubrXB250.mjs:4065:23)
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 3, shard 4, shard 5, shard 6, changed · unavailable: shard 2

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T01:17:53.735Z | 14.3 min |
| email | 2026-10-04T01:17:51.053Z | 0.1 min |
| shard 1 | 2026-10-04T01:18:07.165Z | 19.6 min |
| shard 3 | 2026-10-04T01:17:53.039Z | 17.0 min |
| shard 4 | 2026-10-04T01:17:52.229Z | 18.6 min |
| shard 5 | 2026-10-04T01:17:56.090Z | 21.0 min |
| shard 6 | 2026-10-04T01:17:50.642Z | 14.5 min |
| changed | 2026-10-04T01:18:05.515Z | 14.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-place.spec.ts` | 54 | 19.9 min | shard 5, changed |
| `post-wizard-specs.spec.ts` | 62 | 18.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 17.0 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 45 | 12.9 min | shard 5, changed |
| `admin-attributes-library.spec.ts` | 40 | 11.0 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 32 | 9.5 min | shard 3, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 9.3 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.8 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 40 | 7.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 33 | 7.0 min | smoke, shard 5 |
| `posting-routes.spec.ts` | 44 | 6.9 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 22 | 6.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 5.2 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 34 | 5.2 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 10 | 4.8 min | shard 5 |
| `admin-translations-console.spec.ts` | 36 | 4.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.6 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 20 | 4.1 min | shard 5 |
| `import-security.spec.ts` | 17 | 3.9 min | shard 5 |
| `admin-users.spec.ts` | 11 | 3.4 min | shard 5 |
| `admin-audit.spec.ts` | 10 | 3.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 9 | 1.4 min | shard 5 |
| `admin-translations-data.spec.ts` | 4 | 1.4 min | shard 5 |
| `admin-translations-governance.spec.ts` | 4 | 1.4 min | shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.3 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 4 | 0.9 min | shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 5 | 0.7 min | shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `locations-tree.spec.ts` | 4 | 0.6 min | shard 5 |
| `post-wizard-details.spec.ts` | 2 | 0.5 min | shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 4 | 0.3 min | shard 5 |
| `i18n-bundle.spec.ts` | 2 | 0.3 min | shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `category-nav.spec.ts` | 5 | 0.2 min | shard 5 |
| `layout.spec.ts` | 5 | 0.2 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `geo.spec.ts` | 5 | 0.0 min | shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 110.8 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 77.5 s |
| `post-wizard-place.spec.ts` › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged | mobile-360 | 60.4 s |
| `post-wizard-pricing.spec.ts` › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal | mobile-360 | 59.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 57.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 56.5 s |
| `post-wizard-place.spec.ts` › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged | desktop-1280 | 52.0 s |
| `post-wizard-place.spec.ts` › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged | desktop-1280 | 50.8 s |
| `post-wizard-pricing.spec.ts` › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages | desktop-1280 | 46.4 s |
| `post-wizard-pricing.spec.ts` › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal | desktop-1280 | 45.7 s |
| `post-wizard-pricing.spec.ts` › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) | desktop-1280 | 44.1 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 40.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 40.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 40.0 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | desktop-1280 | 38.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37167434354-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37167434354-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37167434354-1
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37167434354-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37167434354-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37167434354-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37167434354-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37167434354-changed
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "911234567"
Received: "91 123 4567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="91 123 4567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "91 123 4567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-desktop-1280`

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-desktop-1280`

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

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

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-desktop-1280`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "911234567"
Received: "91 123 4567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="91 123 4567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "91 123 4567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `changed`
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

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-who-value-phone')
Expected: "911234567"
Received: "91 123 4567"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('post-who-value-phone')
    14 × locator resolved to <input dir="ltr" inputmode="tel" value="91 123 4567" placeholder="911234567" id="post-who-value-phone" autocomplete="tel-national" data-testid="post-who-value-phone" class="min-w-0 grow rounded-e-md bg-transparent px-3 py-2 text-base text-foreground focus-visible:outline-none"/>
       - unexpected value "91 123 4567"

```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-desktop-1280`

## Server errors: shard 2

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×3
```

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/upload/photo storage put default/4ed39b68-a77a-4639-bf1b-c2dcb5338903/c3692df0-4cb8-4362-834d-cea114196887/f8b7b3ed-3601-4e0e-83e5-f988121ffeed/cover.png: Gateway Timeout | at putObject (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-ubrXB250.mjs:4065:23)
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×6
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (7) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  157 [mobile-360] › e2e/post-wizard-place.spec.ts:547:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (25.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  158 [mobile-360] › e2e/post-wizard-place.spec.ts:547:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (retry #1) (23.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  172 [mobile-360] › e2e/post-wizard-place.spec.ts:1420:3 › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) (25.2s)
--- final 10 lines ---
✓  165 [mobile-360] › e2e/post-wizard-place.spec.ts:1148:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (15.8s)
  ✓  166 [mobile-360] › e2e/post-wizard-place.spec.ts:1187:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (13.8s)
  ✓  167 [mobile-360] › e2e/post-wizard-place.spec.ts:1254:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (10.8s)
  ✓  168 [mobile-360] › e2e/post-wizard-place.spec.ts:1287:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (11.8s)
  ✓  169 [mobile-360] › e2e/post-wizard-place.spec.ts:1321:3 › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point (14.2s)
  ✓  170 [mobile-360] › e2e/post-wizard-place.spec.ts:1358:3 › POSTING WIZARD › PW-40 removing the pin clears all four columns (10.8s)
  ✓  171 [mobile-360] › e2e/post-wizard-place.spec.ts:1382:3 › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling (19.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  172 [mobile-360] › e2e/post-wizard-place.spec.ts:1420:3 › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) (25.2s)
```

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×3
```
