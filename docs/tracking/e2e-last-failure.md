# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36391560866 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36391560866
- Commit: `1f7e086992da0cd7cccef0e4bc45f9cd74c42a77`
- Attempt: 2
- Written (UTC): 2026-09-28T07:50:14.539Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: undefined
```

Context:

```text
          - listitem [ref=e129]:
            - generic [ref=e130]: About
          - listitem [ref=e131]:
            - generic [ref=e132]: How it works
      - navigation "Help" [ref=e133]:
        - heading "Help" [level=2] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]:
            - generic [ref=e137]: Safety
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Legal" [ref=e140]:
        - heading "Legal" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Terms
          - listitem [ref=e145]:
            - generic [ref=e146]: Privacy
    - paragraph [ref=e148]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-4')

```

Context:

```text
          - listitem [ref=e166]:
            - generic [ref=e167]: About
          - listitem [ref=e168]:
            - generic [ref=e169]: How it works
      - navigation "Help" [ref=e170]:
        - heading "Help" [level=2] [ref=e171]
        - list [ref=e172]:
          - listitem [ref=e173]:
            - generic [ref=e174]: Safety
          - listitem [ref=e175]:
            - generic [ref=e176]: Contact
      - navigation "Legal" [ref=e177]:
        - heading "Legal" [level=2] [ref=e178]
        - list [ref=e179]:
          - listitem [ref=e180]:
            - generic [ref=e181]: Terms
          - listitem [ref=e182]:
            - generic [ref=e183]: Privacy
    - paragraph [ref=e185]: © 2026 ethio.com — All rights reserved.
```
```
