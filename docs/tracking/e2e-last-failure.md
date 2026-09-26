# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36248194405 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36248194405
- Commit: `8d620dfc0f074d3f4528544ecdbe87b8e27547be`
- Attempt: 1
- Written (UTC): 2026-09-26T14:35:54.031Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored — Error: reachStep7: no region carried the city e2e-loc-smoke-1-gs-city-bw1ihv.

## Flaky bodies (DEC-078)

### post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `changed`
- Project: `desktop-1280`

```text
Error: reachStep7: no region carried the city e2e-loc-smoke-1-gs-city-bw1ihv.
the market select's value: ET
regions offered (8): Choose one | Addis Ababa | Amhara | Dire Dawa | e2e-loc-changed-2-ls-region-iweztx | e2e-loc-smoke-1-gs-region-ogczhb | Oromia | Sidama | Tigray
the tree route when the step opened: status 200, 18 slugs
the tree route now: status 200, 18 slugs, markets (none)
the city e2e-loc-smoke-1-gs-city-bw1ihv in that read: yes
elapsed since the tree wait: 851 ms

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e410]:
            - generic [ref=e411]: About
          - listitem [ref=e412]:
            - generic [ref=e413]: How it works
      - navigation "Help" [ref=e414]:
        - heading "Help" [level=2] [ref=e415]
        - list [ref=e416]:
          - listitem [ref=e417]:
            - generic [ref=e418]: Safety
          - listitem [ref=e419]:
            - generic [ref=e420]: Contact
      - navigation "Legal" [ref=e421]:
        - heading "Legal" [level=2] [ref=e422]
        - list [ref=e423]:
          - listitem [ref=e424]:
            - generic [ref=e425]: Terms
          - listitem [ref=e426]:
            - generic [ref=e427]: Privacy
    - paragraph [ref=e429]: © 2026 ethio.com — All rights reserved.
```
```
