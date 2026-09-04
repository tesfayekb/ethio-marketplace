# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33841072694
- Commit: `fff4c8778e182a303629541c1b1bf50e4f97d16d`
- Attempt: 2
- Written (UTC): 2026-09-04T06:02:17.370Z
- Passed: 450 · Skipped: 74 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-image-accepted-badge')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-image-accepted-badge')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-image-accepted-badge')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-image-accepted-badge')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-image-accepted-badge')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-image-accepted-badge')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-image-accepted-badge')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-image-accepted-badge')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
