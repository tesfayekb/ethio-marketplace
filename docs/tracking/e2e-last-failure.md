# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36151799951 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36151799951
- Commit: `a1c19d1348660afd7e617e9d28ed106400e64b70`
- Attempt: 1
- Written (UTC): 2026-09-25T15:26:13.685Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow

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
          - listitem [ref=e490]:
            - generic [ref=e491]: About
          - listitem [ref=e492]:
            - generic [ref=e493]: How it works
      - navigation "Help" [ref=e494]:
        - heading "Help" [level=2] [ref=e495]
        - list [ref=e496]:
          - listitem [ref=e497]:
            - generic [ref=e498]: Safety
          - listitem [ref=e499]:
            - generic [ref=e500]: Contact
      - navigation "Legal" [ref=e501]:
        - heading "Legal" [level=2] [ref=e502]
        - list [ref=e503]:
          - listitem [ref=e504]:
            - generic [ref=e505]: Terms
          - listitem [ref=e506]:
            - generic [ref=e507]: Privacy
    - paragraph [ref=e509]: © 2026 ethio.com — All rights reserved.
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
