# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36089842868
- Commit: `b224acb31395c118214c86f271fb4d54c1f75272`
- Attempt: 1
- Written (UTC): 2026-09-25T03:33:54.420Z
- Passed: 1027 · Skipped: 78 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): shard 3, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — TypeError: Cannot read properties of null (reading 'x')

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 78 user(s) owned by process 36089842868-3
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 130 user(s) owned by process 36089842868-changed
```

## post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: LY-6: the sticky action bar covers the open currency list

expect(received).toBe(expected) // Object.is equality

Expected: "post-price-currency-option"
Received: ""
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: How it works
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
          - listitem [ref=e185]:
            - generic [ref=e186]: Contact
      - navigation "Legal" [ref=e187]:
        - heading "Legal" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: Terms
          - listitem [ref=e192]:
            - generic [ref=e193]: Privacy
    - paragraph [ref=e195]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×31
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
