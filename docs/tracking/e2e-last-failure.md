# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35473797629
- Commit: `94ee44435d77daed335d9ac657dd13ba114233bb`
- Attempt: 1
- Written (UTC): 2026-09-19T22:49:22.039Z
- Passed: 927 · Skipped: 105 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 3, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live — Error: reachStep7: no region carried the city addis-ababa

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 80 user(s) owned by process 35473797629-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING failed to delete 12874562-ebf9-4f17-98eb-c09f9cb135ab: fetch failed — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete e340ad78-2e72-4c9c-9ef7-f2df8281330c: fetch failed — deferred to the nightly sweep
[e2e:teardown] WARNING failed to delete 2cd71fb1-c88b-4004-b047-5cfc15921cb1: fetch failed — deferred to the nightly sweep
[e2e:teardown] deleted 56 user(s) owned by process 35473797629-6, 3 deferred to the nightly sweep
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 20 user(s) owned by process 35473797629-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: reachStep7: no region carried the city addis-ababa

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e167]:
            - generic [ref=e168]: About
          - listitem [ref=e169]:
            - generic [ref=e170]: How it works
      - navigation "Help" [ref=e171]:
        - heading "Help" [level=2] [ref=e172]
        - list [ref=e173]:
          - listitem [ref=e174]:
            - generic [ref=e175]: Safety
          - listitem [ref=e176]:
            - generic [ref=e177]: Contact
      - navigation "Legal" [ref=e178]:
        - heading "Legal" [level=2] [ref=e179]
        - list [ref=e180]:
          - listitem [ref=e181]:
            - generic [ref=e182]: Terms
          - listitem [ref=e183]:
            - generic [ref=e184]: Privacy
    - paragraph [ref=e186]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: reachStep7: no region carried the city addis-ababa

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×8
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/i18n Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
