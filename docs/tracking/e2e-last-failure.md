# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37211897860
- Commit: `e5127367080bde2afcd5d9e8c529807a9646fcbb`
- Attempt: 1
- Written (UTC): 2026-10-04T15:28:31.924Z
- Passed: 198 · Skipped: 31 · Failed: 14
- Gating failures: 14 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6, changed |
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

- Count: 6 · Sources: shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

8 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, changed · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T15:10:55.686Z | 14.8 min |
| email | 2026-10-04T15:11:02.015Z | 0.2 min |
| changed | 2026-10-04T15:10:57.937Z | 11.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 40 | 12.7 min | changed |
| `posting-routes.spec.ts` | 48 | 9.1 min | changed |
| `shell.spec.ts` | 126 | 8.0 min | smoke |
| `auth-signout.spec.ts` | 22 | 4.1 min | smoke |
| `a11y.spec.ts` | 4 | 2.3 min | smoke |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | smoke |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 75.5 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 71.9 s |
| `a11y.spec.ts` › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y | desktop-1280 | 71.2 s |
| `a11y.spec.ts` › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y | mobile-360 | 62.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 30.6 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 27.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.3 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 25.9 s |
| `posting-routes.spec.ts` › PR-24 a seller is named before an ad is published (INC-423) | mobile-360 | 25.7 s |
| `posting-routes.spec.ts` › PR-24 a seller is named before an ad is published (INC-423) | desktop-1280 | 25.5 s |
| `posting-routes.spec.ts` › PR-3 a complete draft publishes to screening and never to active | desktop-1280 | 23.7 s |
| `post-wizard-bundle2.spec.ts` › PW-128 a number typed before the phone library arrives is saved only once read | mobile-360 | 23.2 s |
| `posting-routes.spec.ts` › PR-18 the draft route accepts a 5000-character description and refuses 5001 | mobile-360 | 22.9 s |
| `posting-routes.spec.ts` › PR-3 a complete draft publishes to screening and never to active | mobile-360 | 22.7 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | mobile-360 | 22.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37211897860-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37211897860-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 6, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37211897860-changed
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
          - listitem [ref=e112]:
            - generic [ref=e113]: About
          - listitem [ref=e114]:
            - generic [ref=e115]: How it works
      - navigation "Help" [ref=e116]:
        - heading "Help" [level=2] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119]:
            - generic [ref=e120]: Safety
          - listitem [ref=e121]:
            - generic [ref=e122]: Contact
      - navigation "Legal" [ref=e123]:
        - heading "Legal" [level=2] [ref=e124]
        - list [ref=e125]:
          - listitem [ref=e126]:
            - generic [ref=e127]: Terms
          - listitem [ref=e128]:
            - generic [ref=e129]: Privacy
    - paragraph [ref=e131]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e112]:
            - generic [ref=e113]: About
          - listitem [ref=e114]:
            - generic [ref=e115]: How it works
      - navigation "Help" [ref=e116]:
        - heading "Help" [level=2] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119]:
            - generic [ref=e120]: Safety
          - listitem [ref=e121]:
            - generic [ref=e122]: Contact
      - navigation "Legal" [ref=e123]:
        - heading "Legal" [level=2] [ref=e124]
        - list [ref=e125]:
          - listitem [ref=e126]:
            - generic [ref=e127]: Terms
          - listitem [ref=e128]:
            - generic [ref=e129]: Privacy
    - paragraph [ref=e131]: © 2026 ethio.com — All rights reserved.
```
```

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
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: How it works
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
          - listitem [ref=e336]:
            - generic [ref=e337]: Contact
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Terms
          - listitem [ref=e343]:
            - generic [ref=e344]: Privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e358]:
            - generic [ref=e359]: About
          - listitem [ref=e360]:
            - generic [ref=e361]: How it works
      - navigation "Help" [ref=e362]:
        - heading "Help" [level=2] [ref=e363]
        - list [ref=e364]:
          - listitem [ref=e365]:
            - generic [ref=e366]: Safety
          - listitem [ref=e367]:
            - generic [ref=e368]: Contact
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

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×4
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×40
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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×11
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×15
[client-error] console.error: [client-error] gate fetch threw
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: changed

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37211897860-1-3061-3-lz8lzs@ethio-e2e.invalid)
  ✓  124 [mobile-360] › e2e/admin-coverage.spec.ts:300:3 › L2b coverage console › CV-6 geometry: nothing overflows and the editor's controls are on screen (2.7s)
[e2e:u2] RP-1 baseline intact: moderator holds no roles:* grant
  ✓  120 [mobile-360] › e2e/admin-locations.spec.ts:219:3 › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down (22.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37211897860-1-3061-2-lplnpa@ethio-e2e.invalid)
  ✓  125 [mobile-360] › e2e/admin-roles.spec.ts:145:3 › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects (13.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37211897860-1-3061-3-lz8lzs@ethio-e2e.invalid)
  ✓  127 [mobile-360] › e2e/admin-roles.spec.ts:178:3 › U2 roles console › RP-2 create: a super admin creates a custom role through step-up (8.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37211897860-1-3061-3-lz8lzs@ethio-e2e.invalid)
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
--- error lines (21) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘  123 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (35.3s)
  ✘  128 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (retry #1) (36.5s)
  ✘  141 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (6.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  139 [mobile-360] › e2e/post-wizard-category.spec.ts:898:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further (23.8s)
  ✘  142 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (retry #1) (8.6s)
  ✘  144 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (11.0s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  143 [mobile-360] › e2e/post-wizard-category.spec.ts:898:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further (retry #1) (21.7s)
  ✘  145 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (retry #1) (9.4s)
  ✘  150 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (11.9s)
  ✘  152 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (retry #1) (15.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  158 [mobile-360] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (25.1s)
  ✘  161 [mobile-360] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (retry #1) (21.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  164 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (22.5s)
  ✘  168 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (retry #1) (23.4s)
  ✘  169 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (17.8s)
  ✘  170 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (16.4s)
--- final 10 lines ---
✓  163 [mobile-360] › e2e/post-wizard-finder.spec.ts:69:3 › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option (17.0s)
  ✓  165 [mobile-360] › e2e/post-wizard-finder.spec.ts:125:3 › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice (5.8s)
  ✓  166 [mobile-360] › e2e/post-wizard-finder.spec.ts:149:3 › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer (4.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  164 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (22.5s)
  ✓  167 [mobile-360] › e2e/post-wizard-finder.spec.ts:180:3 › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it (10.9s)
  ✘  168 [mobile-360] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (retry #1) (23.4s)
  ✘  169 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (17.8s)
  ✘  170 [mobile-360] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (16.4s)
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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×4
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    1 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (22.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    3 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (21.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    4 [mobile-360] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (19.6s)
  ✘    5 [mobile-360] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (retry #1) (24.4s)
  ✘    6 [mobile-360] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (27.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    7 [mobile-360] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (29.5s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    8 [mobile-360] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (28.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    9 [mobile-360] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (retry #1) (30.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   10 [mobile-360] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (28.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   11 [mobile-360] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (29.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   12 [mobile-360] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (retry #1) (27.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   13 [mobile-360] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (retry #1) (31.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   14 [mobile-360] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (27.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   16 [mobile-360] › e2e/post-wizard-pricing.spec.ts:407:3 › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) (retry #1) (32.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   15 [mobile-360] › e2e/post-wizard-resets.spec.ts:543:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (35.5s)
  ✘   17 [mobile-360] › e2e/post-wizard-pricing.spec.ts:422:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (22.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
--- final 10 lines ---
✘   77 [mobile-360] › e2e/post-wizard-where.spec.ts:365:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is named on step 5 and changed on step 3 (retry #1) (28.8s)
  ✓   81 [mobile-360] › e2e/post-wizard-specs.spec.ts:1547:3 › POSTING WIZARD › PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45) (8.6s)
  ✓   83 [mobile-360] › e2e/post-wizard-specs.spec.ts:1600:3 › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray (6.8s)
  ✓   84 [mobile-360] › e2e/post-wizard-specs.spec.ts:1671:3 › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile (8.0s)
  ✘   82 [mobile-360] › e2e/post-wizard-where.spec.ts:396:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (27.0s)
  ✓   85 [mobile-360] › e2e/post-wizard-specs.spec.ts:1740:3 › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44) (8.4s)
  ✓   86 [mobile-360] › e2e/post-wizard-specs.spec.ts:1801:3 › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field (6.7s)
  ✓   88 [mobile-360] › e2e/post-wizard-specs.spec.ts:1876:3 › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides (7.9s)
  ✓   89 [mobile-360] › e2e/post-wizard-specs.spec.ts:1938:3 › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not (7.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×40
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37211897860-4-3111-3-nmjxb7@ethio-e2e.invalid)
  ✓  139 [desktop-1280] › e2e/admin-roles.spec.ts:396:3 › U2 roles console › RP-10 members link preselects the role filter via the URL (12.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37211897860-4-3111-3-nmjxb7@ethio-e2e.invalid)
  ✓  138 [desktop-1280] › e2e/admin-locations.spec.ts:563:3 › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids (21.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37211897860-4-3111-2-ddtwvn@ethio-e2e.invalid)
  ✓  140 [desktop-1280] › e2e/admin-roles.spec.ts:418:3 › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC (8.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37211897860-4-3111-3-nmjxb7@ethio-e2e.invalid)
  ✓  141 [desktop-1280] › e2e/admin-locations.spec.ts:697:3 › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field (8.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37211897860-4-3111-2-ddtwvn@ethio-e2e.invalid)
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
  ✘  105 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (34.2s)
  ✘  111 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:420:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (retry #1) (34.7s)
  ✘  123 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (9.6s)
  ✘  126 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:626:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (retry #1) (11.0s)
  ✘  128 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (11.9s)
  ✘  131 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:652:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (retry #1) (20.3s)
  ✘  135 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (9.9s)
  ✘  137 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:753:3 › POSTING WIZARD — bundle 2 place and contact › PW-118 a draft's own channel is never overwritten by the last post's (retry #1) (9.7s)
  ✘  138 [desktop-1280] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (20.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  141 [desktop-1280] › e2e/post-wizard-category.spec.ts:1295:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (retry #1) (24.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  147 [desktop-1280] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (21.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  151 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (19.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  150 [desktop-1280] › e2e/post-wizard-place.spec.ts:269:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (retry #1) (21.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  152 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:230:3 › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount (retry #1) (18.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  153 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (18.2s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  154 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (19.4s)
  ✘  155 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (18.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  157 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (18.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  156 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (19.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  158 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (retry #1) (17.9s)
--- final 10 lines ---
✘  155 [desktop-1280] › e2e/post-wizard-place.spec.ts:442:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (retry #1) (18.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  157 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (18.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  156 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:350:3 › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages (retry #1) (19.6s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  158 [desktop-1280] › e2e/post-wizard-place.spec.ts:530:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (retry #1) (17.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘  159 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:381:3 › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it (19.0s)
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
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×11
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (30) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    4 [desktop-1280] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (20.5s)
  ✘    3 [desktop-1280] › e2e/post-wizard-specs.spec.ts:290:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (21.8s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    5 [desktop-1280] › e2e/post-wizard-resets.spec.ts:317:3 › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) (retry #1) (23.1s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘    6 [desktop-1280] › e2e/post-wizard-specs.spec.ts:290:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (retry #1) (26.4s)
  ✘    7 [desktop-1280] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (27.7s)
  ✘   10 [desktop-1280] › e2e/post-wizard-resets.spec.ts:373:3 › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) (retry #1) (24.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   13 [desktop-1280] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (28.3s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   15 [desktop-1280] › e2e/post-wizard-specs.spec.ts:548:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (26.4s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   16 [desktop-1280] › e2e/post-wizard-resets.spec.ts:495:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (retry #1) (28.4s)
  ✘   17 [desktop-1280] › e2e/post-wizard-specs.spec.ts:548:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (retry #1) (26.3s)
  ✘   18 [desktop-1280] › e2e/post-wizard-resets.spec.ts:543:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (32.3s)
  ✘   19 [desktop-1280] › e2e/post-wizard-specs.spec.ts:628:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (28.5s)
  ✘   20 [desktop-1280] › e2e/post-wizard-resets.spec.ts:543:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (retry #1) (28.1s)
  ✘   21 [desktop-1280] › e2e/post-wizard-specs.spec.ts:628:3 › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70) (retry #1) (24.7s)
  ✘   24 [desktop-1280] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (27.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   26 [desktop-1280] › e2e/post-wizard-resets.spec.ts:958:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (23.7s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   27 [desktop-1280] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) (retry #1) (31.9s)
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
  ✘   28 [desktop-1280] › e2e/post-wizard-resets.spec.ts:958:3 › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332) (retry #1) (22.4s)
  ✘   29 [desktop-1280] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (29.5s)
  ✘   32 [desktop-1280] › e2e/post-wizard-where.spec.ts:200:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (21.0s)
  ✘   31 [desktop-1280] › e2e/post-wizard-specs.spec.ts:655:5 › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce) (retry #1) (31.0s)
--- final 10 lines ---
✓  161 [desktop-1280] › e2e/posting-routes.spec.ts:866:3 › POSTING ROUTES › PR-20 step 5: the counters are server-only; the server path still counts (4.2s)
  ✓  159 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.6s)
  ✓  163 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (671ms)
  ✓  164 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (659ms)
  ✓  165 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (611ms)
  ✓  162 [desktop-1280] › e2e/posting-routes.spec.ts:898:3 › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private (9.5s)
  ✓  167 [desktop-1280] › e2e/posting-routes.spec.ts:943:3 › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read (4.2s)
  ✓  166 [desktop-1280] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.6s)
  ✓  168 [desktop-1280] › e2e/posting-routes.spec.ts:1008:3 › POSTING ROUTES › PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117) (5.9s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×15
[client-error] console.error: [client-error] gate fetch threw
```
