# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33553656980
- Commit: `fbbe930d5ce69fd53e54b322d74306bf7745960a`
- Attempt: 1
- Written (UTC): 2026-09-01T20:17:28.468Z
- Passed: 366 · Skipped: 69 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-testid^=\'entity-status-\']').first()
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('[data-testid^=\'entity-status-\']').first()
    21 × locator resolved to <div data-testid="entity-status-category-bb57e37d-5050-41aa-9ad4-75a0d4ef4ca8-name" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Machine</div>
       - unexpected value "hidden"

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
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-testid^=\'entity-status-\']').first()
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('[data-testid^=\'entity-status-\']').first()
    22 × locator resolved to <div data-testid="entity-status-category-bb57e37d-5050-41aa-9ad4-75a0d4ef4ca8-name" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Machine</div>
       - unexpected value "hidden"

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

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
