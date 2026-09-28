# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36414969833
- Commit: `18f1b592afbf4a19a16423eafceeb0e6569faf8e`
- Attempt: 1
- Written (UTC): 2026-09-28T11:49:05.637Z
- Passed: 1089 · Skipped: 78 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): shard 2, shard 5, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited — Error: IMPORT-GATE the preview rate limit never engaged
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: PW-61: Undo did not restore the title

## Flaky bodies (DEC-078)

### import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: IMPORT-GATE the preview rate limit never engaged

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

Context:

```text
          - listitem [ref=e791]:
            - generic [ref=e792]: About
          - listitem [ref=e793]:
            - generic [ref=e794]: How it works
      - navigation "Help" [ref=e795]:
        - heading "Help" [level=2] [ref=e796]
        - list [ref=e797]:
          - listitem [ref=e798]:
            - generic [ref=e799]: Safety
          - listitem [ref=e800]:
            - generic [ref=e801]: Contact
      - navigation "Legal" [ref=e802]:
        - heading "Legal" [level=2] [ref=e803]
        - list [ref=e804]:
          - listitem [ref=e805]:
            - generic [ref=e806]: Terms
          - listitem [ref=e807]:
            - generic [ref=e808]: Privacy
    - paragraph [ref=e810]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-61: Undo did not restore the title

expect(received).toBe(expected) // Object.is equality

Expected: "e2e d59 title"
Received: ""

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e477]:
            - generic [ref=e478]: About
          - listitem [ref=e479]:
            - generic [ref=e480]: How it works
      - navigation "Help" [ref=e481]:
        - heading "Help" [level=2] [ref=e482]
        - list [ref=e483]:
          - listitem [ref=e484]:
            - generic [ref=e485]: Safety
          - listitem [ref=e486]:
            - generic [ref=e487]: Contact
      - navigation "Legal" [ref=e488]:
        - heading "Legal" [level=2] [ref=e489]
        - list [ref=e490]:
          - listitem [ref=e491]:
            - generic [ref=e492]: Terms
          - listitem [ref=e493]:
            - generic [ref=e494]: Privacy
    - paragraph [ref=e496]: © 2026 ethio.com — All rights reserved.
```
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 170 user(s) owned by process 36414969833-2
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 163 user(s) owned by process 36414969833-5
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 146 user(s) owned by process 36414969833-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-72 a currency prefill that lands after Back never queues a later step (INC-317)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-72: a late write queued a closed step: [{"step":4,"phase":"photos"},{"step":2,"phase":"next"}]

expect(received).toBeLessThan(expected)

Expected: < 4
Received:   4
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-72-a-currency-prefill-that-lands-after-Back-never-queues-a-later-step-INC-317-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-72 a currency prefill that lands after Back never queues a later step (INC-317)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-72: a late write queued a closed step: [{"step":4,"phase":"photos"},{"step":2,"phase":"next"}]

expect(received).toBeLessThan(expected)

Expected: < 4
Received:   4
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-72-a-currency-prefill-that-lands-after-Back-never-queues-a-later-step-INC-317-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-72 a currency prefill that lands after Back never queues a later step (INC-317)

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-72: a late write queued a closed step: [{"step":4,"phase":"photos"},{"step":2,"phase":"next"}]

expect(received).toBeLessThan(expected)

Expected: < 4
Received:   4
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-72-a-currency-prefill-that-lands-after-Back-never-queues-a-later-step-INC-317-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `changed`
- Project: `mobile-360`

```text
Error: PW-61: Undo did not restore the title

expect(received).toBe(expected) // Object.is equality

Expected: "e2e d59 title"
Received: ""

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e193]:
            - generic [ref=e194]: About
          - listitem [ref=e195]:
            - generic [ref=e196]: How it works
      - navigation "Help" [ref=e197]:
        - heading "Help" [level=2] [ref=e198]
        - list [ref=e199]:
          - listitem [ref=e200]:
            - generic [ref=e201]: Safety
          - listitem [ref=e202]:
            - generic [ref=e203]: Contact
      - navigation "Legal" [ref=e204]:
        - heading "Legal" [level=2] [ref=e205]
        - list [ref=e206]:
          - listitem [ref=e207]:
            - generic [ref=e208]: Terms
          - listitem [ref=e209]:
            - generic [ref=e210]: Privacy
    - paragraph [ref=e212]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-72 a currency prefill that lands after Back never queues a later step (INC-317)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-72: a late write queued a closed step: [{"step":4,"phase":"photos"},{"step":2,"phase":"next"}]

expect(received).toBeLessThan(expected)

Expected: < 4
Received:   4
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-72-a-currency-prefill-that-lands-after-Back-never-queues-a-later-step-INC-317-desktop-1280`

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
[WebServer] [ssr-error] /api/listings/draft listing not found ×26
```

## Client errors: shard 2

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-CvnICkR2.js:13858:39 at getResponse (http://127.0.0.1:4173/assets/index-CvnICkR2.js:13905:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-CvnICkR2.js:13858:15) at async client (http://127.0.0.1:4173/assets/index-CvnICkR2.js:16054:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-CvnICkR2.js:15985:20) at async userNext (http://127.0.0.1:4173/assets/index-CvnICkR2.js:15971:21) ×3
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×21
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×11
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_bp_check"
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check" ×3
[WebServer] [ssr-error] /api/listings/draft listing not found ×48
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
