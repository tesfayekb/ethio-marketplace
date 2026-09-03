# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33709508377
- Commit: `1a030c69798c42d7526ae82b15b2d3e096aad0ea`
- Attempt: 2
- Written (UTC): 2026-09-03T03:06:00.511Z
- Passed: 346 · Skipped: 69 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toBeInViewport() failed

Locator:  getByTestId('app-rail').getByTestId('rail-scroll').locator('li').last()
Expected: not in viewport
Received: in viewport
Timeout:  10000ms

Call log:
  - Expect "not toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-scroll').locator('li').last()
    14 × locator resolved to <li>…</li>
       - unexpected value "viewport ratio 0.6590909361839294"

```

Context:

```text
          - listitem [ref=e167]:
            - generic [ref=e168]: About
          - listitem [ref=e169]:
            - generic [ref=e170]: How it works
      - navigation "Help" [ref=e171]:
        - heading "Help" [level=2] [ref=e172]
        - list [ref=e173]:
          - listitem [ref=e174]:
            - generic [ref=e175]: Safety
          - listitem [ref=e176]:
            - generic [ref=e177]: Contact
      - navigation "Legal" [ref=e178]:
        - heading "Legal" [level=2] [ref=e179]
        - list [ref=e180]:
          - listitem [ref=e181]:
            - generic [ref=e182]: Terms
          - listitem [ref=e183]:
            - generic [ref=e184]: Privacy
    - paragraph [ref=e186]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "assets",
+   "restructure",
+ ]
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

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "assets",
+   "restructure",
+ ]
```

Context:

```text
          - listitem [ref=e438]:
            - generic [ref=e439]: ስለ እኛ
          - listitem [ref=e440]:
            - generic [ref=e441]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e442]:
        - heading "እገዛ" [level=2] [ref=e443]
        - list [ref=e444]:
          - listitem [ref=e445]:
            - generic [ref=e446]: ደህንነት
          - listitem [ref=e447]:
            - generic [ref=e448]: ያግኙን
      - navigation "ሕጋዊ" [ref=e449]:
        - heading "ሕጋዊ" [level=2] [ref=e450]
        - list [ref=e451]:
          - listitem [ref=e452]:
            - generic [ref=e453]: ውሎች
          - listitem [ref=e454]:
            - generic [ref=e455]: ግላዊነት
    - paragraph [ref=e457]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toBeInViewport() failed

Locator:  getByTestId('app-rail').getByTestId('rail-scroll').locator('li').last()
Expected: not in viewport
Received: in viewport
Timeout:  10000ms

Call log:
  - Expect "not toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-scroll').locator('li').last()
    14 × locator resolved to <li>…</li>
       - unexpected value "viewport ratio 0.6590909361839294"

```

Context:

```text
          - listitem [ref=e167]:
            - generic [ref=e168]: About
          - listitem [ref=e169]:
            - generic [ref=e170]: How it works
      - navigation "Help" [ref=e171]:
        - heading "Help" [level=2] [ref=e172]
        - list [ref=e173]:
          - listitem [ref=e174]:
            - generic [ref=e175]: Safety
          - listitem [ref=e176]:
            - generic [ref=e177]: Contact
      - navigation "Legal" [ref=e178]:
        - heading "Legal" [level=2] [ref=e179]
        - list [ref=e180]:
          - listitem [ref=e181]:
            - generic [ref=e182]: Terms
          - listitem [ref=e183]:
            - generic [ref=e184]: Privacy
    - paragraph [ref=e186]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
