# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35497453196
- Commit: `ed3086cb3d258bca7daadc5222a497eaaf704ebb`
- Attempt: 1
- Written (UTC): 2026-09-20T07:53:29.869Z
- Passed: 843 · Skipped: 74 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the location row cascades Country -> Region -> City, city selectable — Error: expect(locator).toBeVisible() failed

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 6`
- Project: `desktop-1280`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-QS-6-0', exact: true })

```

Context:

```text
          - listitem [ref=e276]:
            - generic [ref=e277]: About
          - listitem [ref=e278]:
            - generic [ref=e279]: How it works
      - navigation "Help" [ref=e280]:
        - heading "Help" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Safety
          - listitem [ref=e285]:
            - generic [ref=e286]: Contact
      - navigation "Legal" [ref=e287]:
        - heading "Legal" [level=2] [ref=e288]
        - list [ref=e289]:
          - listitem [ref=e290]:
            - generic [ref=e291]: Terms
          - listitem [ref=e292]:
            - generic [ref=e293]: Privacy
    - paragraph [ref=e295]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
