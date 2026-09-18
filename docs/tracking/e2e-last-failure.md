# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35353612829
- Commit: `50f8815b2ead01db72c87d6e88f38cee6a23ed06`
- Attempt: 1
- Written (UTC): 2026-09-18T14:13:19.395Z
- Passed: 811 · Skipped: 70 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): shard 3, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan — Error: PW-11: the scratch region never reached the picker

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 64 user(s) owned by process 35353612829-3
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 29 user(s) owned by process 35353612829-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-11: the scratch region never reached the picker

expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('post-where-region').locator('option[value="199d602a-f27b-46b7-8053-1bff7a46c31d"]')
Expected: 1
Received: 0
Timeout:  20000ms

Call log:
  - PW-11: the scratch region never reached the picker with timeout 20000ms
  - waiting for getByTestId('post-where-region').locator('option[value="199d602a-f27b-46b7-8053-1bff7a46c31d"]')
    24 × locator resolved to 0 elements
       - unexpected value "0"

```

Context:

```text
          - listitem [ref=e113]:
            - generic [ref=e114]: About
          - listitem [ref=e115]:
            - generic [ref=e116]: How it works
      - navigation "Help" [ref=e117]:
        - heading "Help" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - generic [ref=e121]: Safety
          - listitem [ref=e122]:
            - generic [ref=e123]: Contact
      - navigation "Legal" [ref=e124]:
        - heading "Legal" [level=2] [ref=e125]
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e128]: Terms
          - listitem [ref=e129]:
            - generic [ref=e130]: Privacy
    - paragraph [ref=e132]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
