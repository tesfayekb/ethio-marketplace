# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37397148951
- Commit: `eebdf1ebe1632041dcfb51b6a54184487fc886d9`
- Attempt: 1
- Written (UTC): 2026-10-06T01:29:24.662Z
- Passed: 1209 · Skipped: 76 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

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

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

104 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 6 |
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

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 2, shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-06T01:05:34.596Z | 14.2 min |
| email | 2026-10-06T01:05:38.941Z | 0.2 min |
| shard 1 | 2026-10-06T01:05:39.651Z | 23.5 min |
| shard 2 | 2026-10-06T01:05:32.409Z | 20.3 min |
| shard 3 | 2026-10-06T01:05:34.649Z | 17.6 min |
| shard 4 | 2026-10-06T01:06:09.062Z | 21.2 min |
| shard 5 | 2026-10-06T01:05:34.541Z | 22.0 min |
| shard 6 | 2026-10-06T01:05:44.507Z | 20.0 min |
| changed | 2026-10-06T01:05:39.316Z | 3.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 26.0 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 18.1 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 16.9 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 46 | 11.4 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 11.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 11.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 10.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 24 | 10.1 min | shard 3, shard 6, changed |
| `post-wizard-where.spec.ts` | 28 | 10.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 9.4 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 8.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 8.8 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 20 | 8.6 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 8.4 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 44 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.7 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 24 | 6.9 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 6.2 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.0 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 5.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.2 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.2 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.6 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 58.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 53.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 48.0 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 45.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 45.0 s |
| `posting-routes-dials.spec.ts` › PR-32 relist_listing counts against the revise dial | desktop-1280 | 44.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 43.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 43.1 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 39.8 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 39.5 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 39.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 37.4 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 36.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37397148951-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37397148951-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37397148951-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37397148951-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37397148951-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37397148951-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37397148951-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37397148951-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37397148951-changed
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: second edit_listing: {"data":null,"error":"edit_listing takes a published listing; a draft writes through submit_listing"}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: second transition_listing: {"data":null,"error":"new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-31 mark_sold counts against the revise dial

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: second mark_sold: {"data":null,"error":"illegal transition: draft -> sold"}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: second relist_listing: {"data":null,"error":"illegal transition: draft -> screening"}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: second edit_listing: {"data":null,"error":"edit_listing takes a published listing; a draft writes through submit_listing"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: second transition_listing: {"data":null,"error":"new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-31 mark_sold counts against the revise dial

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: second mark_sold: {"data":null,"error":"illegal transition: draft -> sold"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: second relist_listing: {"data":null,"error":"illegal transition: draft -> screening"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second edit_listing: {"data":null,"error":"edit_listing takes a published listing; a draft writes through submit_listing"}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second transition_listing: {"data":null,"error":"new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-31 mark_sold counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second mark_sold: {"data":null,"error":"illegal transition: draft -> sold"}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial

- Source: `changed`
- Project: `mobile-360`

```text
Error: second relist_listing: {"data":null,"error":"illegal transition: draft -> screening"}

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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second edit_listing: {"data":null,"error":"edit_listing takes a published listing; a draft writes through submit_listing"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second transition_listing: {"data":null,"error":"new row for relation \"listings\" violates check constraint \"listings_place_unless_draft\""}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-31 mark_sold counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second mark_sold: {"data":null,"error":"illegal transition: draft -> sold"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial

- Source: `changed`
- Project: `desktop-1280`

```text
Error: second relist_listing: {"data":null,"error":"illegal transition: draft -> screening"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×16
console.error: [client-error] gate fetch threw
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×16
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×32
```
