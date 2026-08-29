# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33228312458
- Commit: `daf01e6c134f904a3929139d8aeff6935e2be1e5`
- Written (UTC): 2026-08-29T02:17:57.502Z
- Passed: 286 · Skipped: 64 · Failed: 3
- Sources without results: none

## shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: rail bottom must be min(viewport bottom, footer top)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    28
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች' })
Expected: visible
Error: strict mode violation: getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች' }) resolved to 2 elements:
    1) <h3 class="text-base font-semibold text-foreground">ፈቃዶች</h3> aka getByTestId('role-permissions').locator('h3')
    2) <h4 data-testid="role-resource-heading-permissions" class="mb-2 break-words text-sm font-semibold text-foreground">ፈቃዶች</h4> aka getByTestId('role-resource-heading-permissions')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች' })

```

Context:

```text
          - listitem [ref=e376]:
            - generic [ref=e377]: ስለ እኛ
          - listitem [ref=e378]:
            - generic [ref=e379]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e380]:
        - heading "እገዛ" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - generic [ref=e384]: ደህንነት
          - listitem [ref=e385]:
            - generic [ref=e386]: ያግኙን
      - navigation "ሕጋዊ" [ref=e387]:
        - heading "ሕጋዊ" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - generic [ref=e391]: ውሎች
          - listitem [ref=e392]:
            - generic [ref=e393]: ግላዊነት
    - paragraph [ref=e395]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች' })
Expected: visible
Error: strict mode violation: getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች' }) resolved to 2 elements:
    1) <h3 class="text-base font-semibold text-foreground">ፈቃዶች</h3> aka getByTestId('role-permissions').locator('h3')
    2) <h4 data-testid="role-resource-heading-permissions" class="mb-2 break-words text-sm font-semibold text-foreground">ፈቃዶች</h4> aka getByTestId('role-resource-heading-permissions')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-permissions').getByRole('heading', { name: 'ፈቃዶች' })

```

Context:

```text
          - listitem [ref=e457]:
            - generic [ref=e458]: ስለ እኛ
          - listitem [ref=e459]:
            - generic [ref=e460]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e461]:
        - heading "እገዛ" [level=2] [ref=e462]
        - list [ref=e463]:
          - listitem [ref=e464]:
            - generic [ref=e465]: ደህንነት
          - listitem [ref=e466]:
            - generic [ref=e467]: ያግኙን
      - navigation "ሕጋዊ" [ref=e468]:
        - heading "ሕጋዊ" [level=2] [ref=e469]
        - list [ref=e470]:
          - listitem [ref=e471]:
            - generic [ref=e472]: ውሎች
          - listitem [ref=e473]:
            - generic [ref=e474]: ግላዊነት
    - paragraph [ref=e476]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
