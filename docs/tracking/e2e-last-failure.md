# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33550797429
- Commit: `07f2bb6802bb369045b972e5a7f0e6d9db715cf1`
- Attempt: 2
- Written (UTC): 2026-09-01T19:49:17.615Z
- Passed: 366 · Skipped: 68 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: expect(received).toBeGreaterThan(expected)

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

Context:

```text
          - listitem [ref=e686]:
            - generic [ref=e687]: About
          - listitem [ref=e688]:
            - generic [ref=e689]: How it works
      - navigation "Help" [ref=e690]:
        - heading "Help" [level=2] [ref=e691]
        - list [ref=e692]:
          - listitem [ref=e693]:
            - generic [ref=e694]: Safety
          - listitem [ref=e695]:
            - generic [ref=e696]: Contact
      - navigation "Legal" [ref=e697]:
        - heading "Legal" [level=2] [ref=e698]
        - list [ref=e699]:
          - listitem [ref=e700]:
            - generic [ref=e701]: Terms
          - listitem [ref=e702]:
            - generic [ref=e703]: Privacy
    - paragraph [ref=e705]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

Context:

```text
          - listitem [ref=e462]:
            - generic [ref=e463]: About
          - listitem [ref=e464]:
            - generic [ref=e465]: How it works
      - navigation "Help" [ref=e466]:
        - heading "Help" [level=2] [ref=e467]
        - list [ref=e468]:
          - listitem [ref=e469]:
            - generic [ref=e470]: Safety
          - listitem [ref=e471]:
            - generic [ref=e472]: Contact
      - navigation "Legal" [ref=e473]:
        - heading "Legal" [level=2] [ref=e474]
        - list [ref=e475]:
          - listitem [ref=e476]:
            - generic [ref=e477]: Terms
          - listitem [ref=e478]:
            - generic [ref=e479]: Privacy
    - paragraph [ref=e481]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
