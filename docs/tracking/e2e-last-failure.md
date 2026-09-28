# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36418421258 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36418421258
- Commit: `de56b6c856fe87a823954f8245278f532554f8d6`
- Attempt: 1
- Written (UTC): 2026-09-28T12:14:16.963Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control — Error: PW-17: the seller's own market's currency is not first

## Flaky bodies (DEC-078)

### post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `desktop-1280`

```text
Error: PW-17: the seller's own market's currency is not first

expect(received).toBe(expected) // Object.is equality

Expected: "ETB"
Received: "USD"
```

Context:

```text
          - listitem [ref=e509]:
            - generic [ref=e510]: About
          - listitem [ref=e511]:
            - generic [ref=e512]: How it works
      - navigation "Help" [ref=e513]:
        - heading "Help" [level=2] [ref=e514]
        - list [ref=e515]:
          - listitem [ref=e516]:
            - generic [ref=e517]: Safety
          - listitem [ref=e518]:
            - generic [ref=e519]: Contact
      - navigation "Legal" [ref=e520]:
        - heading "Legal" [level=2] [ref=e521]
        - list [ref=e522]:
          - listitem [ref=e523]:
            - generic [ref=e524]: Terms
          - listitem [ref=e525]:
            - generic [ref=e526]: Privacy
    - paragraph [ref=e528]: © 2026 ethio.com — All rights reserved.
```
```
