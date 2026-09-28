# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36398155321 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36398155321
- Commit: `8e0c2ecf3019e18a8841de36e947362ce724d192`
- Attempt: 3
- Written (UTC): 2026-09-28T09:38:53.793Z
- Post-test warnings: 89
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control — Error: PW-17: the seller's own market's currency is not first

## Flaky bodies (DEC-078)

### post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

```

Context:

```text
          - listitem [ref=e150]:
            - generic [ref=e151]: About
          - listitem [ref=e152]:
            - generic [ref=e153]: How it works
      - navigation "Help" [ref=e154]:
        - heading "Help" [level=2] [ref=e155]
        - list [ref=e156]:
          - listitem [ref=e157]:
            - generic [ref=e158]: Safety
          - listitem [ref=e159]:
            - generic [ref=e160]: Contact
      - navigation "Legal" [ref=e161]:
        - heading "Legal" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - generic [ref=e165]: Terms
          - listitem [ref=e166]:
            - generic [ref=e167]: Privacy
    - paragraph [ref=e169]: © 2026 ethio.com — All rights reserved.
```
```

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
          - listitem [ref=e387]:
            - generic [ref=e388]: About
          - listitem [ref=e389]:
            - generic [ref=e390]: How it works
      - navigation "Help" [ref=e391]:
        - heading "Help" [level=2] [ref=e392]
        - list [ref=e393]:
          - listitem [ref=e394]:
            - generic [ref=e395]: Safety
          - listitem [ref=e396]:
            - generic [ref=e397]: Contact
      - navigation "Legal" [ref=e398]:
        - heading "Legal" [level=2] [ref=e399]
        - list [ref=e400]:
          - listitem [ref=e401]:
            - generic [ref=e402]: Terms
          - listitem [ref=e403]:
            - generic [ref=e404]: Privacy
    - paragraph [ref=e406]: © 2026 ethio.com — All rights reserved.
```
```
