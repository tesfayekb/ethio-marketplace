# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35377429162
- Commit: `ca996c1045306cf7236e7cfc66593261d1d96fb9`
- Attempt: 1
- Written (UTC): 2026-09-18T18:11:56.585Z
- Passed: 798 · Skipped: 70 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `smoke`
- Project: `mobile-360`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-QT-smoke-0', exact: true })

```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).
