# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33168682192
- Commit: `e160e1fc9f666fdaee0d141913513a7e6744d854`
- Written (UTC): 2026-08-28T11:58:21.004Z
- Passed: 286 · Skipped: 66 · Failed: 1
- Sources without results: none

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByText('ፈቃዶች').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ፈቃዶች').first()
    14 × locator resolved to <span class="truncate md:[html[data-rail=collapsed]_&]:hidden">ሚናዎች እና ፈቃዶች</span>
       - unexpected value "hidden"

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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
