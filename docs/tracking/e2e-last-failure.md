# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35406279026
- Commit: `bb4ee8679476175bbe07f5c323c3fc19ccabe65b`
- Attempt: 1
- Written (UTC): 2026-09-18T23:46:35.101Z
- Passed: 804 · Skipped: 70 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): none
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else — Error: expect(received).toEqual(expected) // deep equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else — Error: expect(received).toEqual(expected) // deep equality

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-20: the region level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-region')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-20: the region level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-region')

```

Context:

```text
          - listitem [ref=e118]:
            - generic [ref=e119]: About
          - listitem [ref=e120]:
            - generic [ref=e121]: How it works
      - navigation "Help" [ref=e122]:
        - heading "Help" [level=2] [ref=e123]
        - list [ref=e124]:
          - listitem [ref=e125]:
            - generic [ref=e126]: Safety
          - listitem [ref=e127]:
            - generic [ref=e128]: Contact
      - navigation "Legal" [ref=e129]:
        - heading "Legal" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Terms
          - listitem [ref=e134]:
            - generic [ref=e135]: Privacy
    - paragraph [ref=e137]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
