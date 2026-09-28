# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36388786851 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36388786851
- Commit: `9690a9d3eec4f8ccfc72446d324e9b7267e0b159`
- Attempt: 1
- Written (UTC): 2026-09-28T07:16:27.727Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control — Error: PW-17: the seller's own market's currency is not first
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-17: the seller's own market's currency is not first

expect(received).toBe(expected) // Object.is equality

Expected: "ETB"
Received: "USD"
```

Context:

```text
          - listitem [ref=e204]:
            - generic [ref=e205]: About
          - listitem [ref=e206]:
            - generic [ref=e207]: How it works
      - navigation "Help" [ref=e208]:
        - heading "Help" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - generic [ref=e212]: Safety
          - listitem [ref=e213]:
            - generic [ref=e214]: Contact
      - navigation "Legal" [ref=e215]:
        - heading "Legal" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - generic [ref=e219]: Terms
          - listitem [ref=e220]:
            - generic [ref=e221]: Privacy
    - paragraph [ref=e223]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-desktop-1280`
