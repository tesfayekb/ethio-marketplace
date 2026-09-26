# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36230326302 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36230326302
- Commit: `4a8ee66c635a9d06a80bcb3182544378e9876420`
- Attempt: 1
- Written (UTC): 2026-09-26T08:57:57.597Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — Error: INC-282: feed-empty had no box (detached or hidden)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: INC-282: feed-empty had no box (detached or hidden)
```

Context:

```text
          - listitem [ref=e282]:
            - generic [ref=e283]: About
          - listitem [ref=e284]:
            - generic [ref=e285]: How it works
      - navigation "Help" [ref=e286]:
        - heading "Help" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Safety
          - listitem [ref=e291]:
            - generic [ref=e292]: Contact
      - navigation "Legal" [ref=e293]:
        - heading "Legal" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Terms
          - listitem [ref=e298]:
            - generic [ref=e299]: Privacy
    - paragraph [ref=e301]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ai-bulk-summary')
Expected: visible
Timeout: 150000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 150000ms
  - waiting for getByTestId('ai-bulk-summary')

```

Context:

```text
          - listitem [ref=e775]:
            - generic [ref=e776]: About
          - listitem [ref=e777]:
            - generic [ref=e778]: How it works
      - navigation "Help" [ref=e779]:
        - heading "Help" [level=2] [ref=e780]
        - list [ref=e781]:
          - listitem [ref=e782]:
            - generic [ref=e783]: Safety
          - listitem [ref=e784]:
            - generic [ref=e785]: Contact
      - navigation "Legal" [ref=e786]:
        - heading "Legal" [level=2] [ref=e787]
        - list [ref=e788]:
          - listitem [ref=e789]:
            - generic [ref=e790]: Terms
          - listitem [ref=e791]:
            - generic [ref=e792]: Privacy
    - paragraph [ref=e794]: © 2026 ethio.com — All rights reserved.
```
```
