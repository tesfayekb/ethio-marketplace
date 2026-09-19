# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35429049045
- Commit: `8ec3c65ed7ac1e28a3d087537ba5d631367bbbb8`
- Attempt: 1
- Written (UTC): 2026-09-19T07:34:01.288Z
- Passed: 932 · Skipped: 103 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): shard 3, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else — Error: expect(received).toEqual(expected) // deep equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live — Error: reachStep7: no region carried the city addis-ababa
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 73 user(s) owned by process 35429049045-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 55 user(s) owned by process 35429049045-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 42 user(s) owned by process 35429049045-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-11: the market was not prefilled from the edge

expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-where-market')
Expected: "ET"
Received: "QT"
Timeout:  10000ms

Call log:
  - PW-11: the market was not prefilled from the edge with timeout 10000ms
  - waiting for getByTestId('post-where-market')
    14 × locator resolved to <select id="post-where-market" data-testid="post-where-market" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "QT"

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-20: no region carried the city addis-ababa

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: How it works
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
          - listitem [ref=e370]:
            - generic [ref=e371]: Contact
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Terms
          - listitem [ref=e377]:
            - generic [ref=e378]: Privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
