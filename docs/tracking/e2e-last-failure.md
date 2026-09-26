# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36233897095 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36233897095
- Commit: `300c8bf2fec4388aec1f080e2bf2be807f0ac260`
- Attempt: 1
- Written (UTC): 2026-09-26T10:01:52.520Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name — Error: the approved chip never rose above 1094

## Flaky bodies (DEC-078)

### admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e470]:
            - generic [ref=e471]: About
          - listitem [ref=e472]:
            - generic [ref=e473]: How it works
      - navigation "Help" [ref=e474]:
        - heading "Help" [level=2] [ref=e475]
        - list [ref=e476]:
          - listitem [ref=e477]:
            - generic [ref=e478]: Safety
          - listitem [ref=e479]:
            - generic [ref=e480]: Contact
      - navigation "Legal" [ref=e481]:
        - heading "Legal" [level=2] [ref=e482]
        - list [ref=e483]:
          - listitem [ref=e484]:
            - generic [ref=e485]: Terms
          - listitem [ref=e486]:
            - generic [ref=e487]: Privacy
    - paragraph [ref=e489]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: the approved chip never rose above 1094

expect(received).toBeGreaterThan(expected)

Expected: > 1094
Received:   1093

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e523]:
            - generic [ref=e524]: About
          - listitem [ref=e525]:
            - generic [ref=e526]: How it works
      - navigation "Help" [ref=e527]:
        - heading "Help" [level=2] [ref=e528]
        - list [ref=e529]:
          - listitem [ref=e530]:
            - generic [ref=e531]: Safety
          - listitem [ref=e532]:
            - generic [ref=e533]: Contact
      - navigation "Legal" [ref=e534]:
        - heading "Legal" [level=2] [ref=e535]
        - list [ref=e536]:
          - listitem [ref=e537]:
            - generic [ref=e538]: Terms
          - listitem [ref=e539]:
            - generic [ref=e540]: Privacy
    - paragraph [ref=e542]: © 2026 ethio.com — All rights reserved.
```
```
