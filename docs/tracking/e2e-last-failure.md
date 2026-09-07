# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34080792528
- Commit: `1870e77077f0cc1be82952042bc83ac74e9f5838`
- Attempt: 2
- Written (UTC): 2026-09-07T04:04:36.228Z
- Passed: 488 · Skipped: 70 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll — Error: window target at 1240

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች', level: 3 })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች', level: 3 })

```

Context:

```text
          - listitem [ref=e412]:
            - generic [ref=e413]: About
          - listitem [ref=e414]:
            - generic [ref=e415]: How it works
      - navigation "Help" [ref=e416]:
        - heading "Help" [level=2] [ref=e417]
        - list [ref=e418]:
          - listitem [ref=e419]:
            - generic [ref=e420]: Safety
          - listitem [ref=e421]:
            - generic [ref=e422]: Contact
      - navigation "Legal" [ref=e423]:
        - heading "Legal" [level=2] [ref=e424]
        - list [ref=e425]:
          - listitem [ref=e426]:
            - generic [ref=e427]: Terms
          - listitem [ref=e428]:
            - generic [ref=e429]: Privacy
    - paragraph [ref=e431]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: last column clipped at 1024

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    273
```

Context:

```text
          - listitem [ref=e765]:
            - generic [ref=e766]: About
          - listitem [ref=e767]:
            - generic [ref=e768]: How it works
      - navigation "Help" [ref=e769]:
        - heading "Help" [level=2] [ref=e770]
        - list [ref=e771]:
          - listitem [ref=e772]:
            - generic [ref=e773]: Safety
          - listitem [ref=e774]:
            - generic [ref=e775]: Contact
      - navigation "Legal" [ref=e776]:
        - heading "Legal" [level=2] [ref=e777]
        - list [ref=e778]:
          - listitem [ref=e779]:
            - generic [ref=e780]: Terms
          - listitem [ref=e781]:
            - generic [ref=e782]: Privacy
    - paragraph [ref=e784]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች', level: 3 })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች', level: 3 })

```

Context:

```text
          - listitem [ref=e500]:
            - generic [ref=e501]: About
          - listitem [ref=e502]:
            - generic [ref=e503]: How it works
      - navigation "Help" [ref=e504]:
        - heading "Help" [level=2] [ref=e505]
        - list [ref=e506]:
          - listitem [ref=e507]:
            - generic [ref=e508]: Safety
          - listitem [ref=e509]:
            - generic [ref=e510]: Contact
      - navigation "Legal" [ref=e511]:
        - heading "Legal" [level=2] [ref=e512]
        - list [ref=e513]:
          - listitem [ref=e514]:
            - generic [ref=e515]: Terms
          - listitem [ref=e516]:
            - generic [ref=e517]: Privacy
    - paragraph [ref=e519]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-9 twins: the library renders one twin only, with no sideways scroll

- Source: `changed`
- Project: `desktop-1280`

```text
Error: last column clipped at 1024

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    273
```

Context:

```text
          - listitem [ref=e765]:
            - generic [ref=e766]: About
          - listitem [ref=e767]:
            - generic [ref=e768]: How it works
      - navigation "Help" [ref=e769]:
        - heading "Help" [level=2] [ref=e770]
        - list [ref=e771]:
          - listitem [ref=e772]:
            - generic [ref=e773]: Safety
          - listitem [ref=e774]:
            - generic [ref=e775]: Contact
      - navigation "Legal" [ref=e776]:
        - heading "Legal" [level=2] [ref=e777]
        - list [ref=e778]:
          - listitem [ref=e779]:
            - generic [ref=e780]: Terms
          - listitem [ref=e781]:
            - generic [ref=e782]: Privacy
    - paragraph [ref=e784]: © 2026 ethio.com — All rights reserved.
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
