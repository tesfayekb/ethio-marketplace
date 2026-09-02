# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33574332982
- Commit: `872a361f0ffd498951ef5f0d29d53d7de711c253`
- Attempt: 2
- Written (UTC): 2026-09-02T00:22:11.204Z
- Passed: 346 · Skipped: 68 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 0
Received:    1
```

Context:

```text
          - listitem [ref=e697]:
            - generic [ref=e698]: About
          - listitem [ref=e699]:
            - generic [ref=e700]: How it works
      - navigation "Help" [ref=e701]:
        - heading "Help" [level=2] [ref=e702]
        - list [ref=e703]:
          - listitem [ref=e704]:
            - generic [ref=e705]: Safety
          - listitem [ref=e706]:
            - generic [ref=e707]: Contact
      - navigation "Legal" [ref=e708]:
        - heading "Legal" [level=2] [ref=e709]
        - list [ref=e710]:
          - listitem [ref=e711]:
            - generic [ref=e712]: Terms
          - listitem [ref=e713]:
            - generic [ref=e714]: Privacy
    - paragraph [ref=e716]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
