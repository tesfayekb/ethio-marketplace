# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35252497677
- Commit: `09768b22649484aafd6f49ae01af23ae03a017eb`
- Attempt: 1
- Written (UTC): 2026-09-17T17:38:03.813Z
- Passed: 773 · Skipped: 70 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071) — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: TR-12 step 3: the guarded bulk run never resolved for scope zxx-mo (run-state=running progress=900/1592) — [e2e:INC-210] the guarded outcome never arrived within 90000 ms — waited on getByTestId('ai-bulk-summary').or(getByTestId('ai-bulk-error'))
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Test timeout of 180000ms exceeded.

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e824]:
            - generic [ref=e825]: About
          - listitem [ref=e826]:
            - generic [ref=e827]: How it works
      - navigation "Help" [ref=e828]:
        - heading "Help" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Safety
          - listitem [ref=e833]:
            - generic [ref=e834]: Contact
      - navigation "Legal" [ref=e835]:
        - heading "Legal" [level=2] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]:
            - generic [ref=e839]: Terms
          - listitem [ref=e840]:
            - generic [ref=e841]: Privacy
    - paragraph [ref=e843]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: TR-12 step 3: the guarded bulk run never resolved for scope zxx-de (run-state=running progress=600/1585) — [e2e:INC-210] the guarded outcome never arrived within 90000 ms — waited on getByTestId('ai-bulk-summary').or(getByTestId('ai-bulk-error'))

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 90000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e758]:
            - generic [ref=e759]: About
          - listitem [ref=e760]:
            - generic [ref=e761]: How it works
      - navigation "Help" [ref=e762]:
        - heading "Help" [level=2] [ref=e763]
        - list [ref=e764]:
          - listitem [ref=e765]:
            - generic [ref=e766]: Safety
          - listitem [ref=e767]:
            - generic [ref=e768]: Contact
      - navigation "Legal" [ref=e769]:
        - heading "Legal" [level=2] [ref=e770]
        - list [ref=e771]:
          - listitem [ref=e772]:
            - generic [ref=e773]: Terms
          - listitem [ref=e774]:
            - generic [ref=e775]: Privacy
    - paragraph [ref=e777]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
