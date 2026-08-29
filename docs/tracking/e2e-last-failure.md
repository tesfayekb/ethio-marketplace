# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33235357475
- Commit: `86c56d4dbb2a70cf489c5b8265bde70b3847f309`
- Written (UTC): 2026-08-29T05:16:57.085Z
- Passed: 287 · Skipped: 64 · Failed: 2
- Sources without results: none

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "translations",
+   "approve",
+   "machine",
+ ]
```

Context:

```text
          - listitem [ref=e367]:
            - generic [ref=e368]: ስለ እኛ
          - listitem [ref=e369]:
            - generic [ref=e370]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e371]:
        - heading "እገዛ" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: ደህንነት
          - listitem [ref=e376]:
            - generic [ref=e377]: ያግኙን
      - navigation "ሕጋዊ" [ref=e378]:
        - heading "ሕጋዊ" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: ውሎች
          - listitem [ref=e383]:
            - generic [ref=e384]: ግላዊነት
    - paragraph [ref=e386]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "translations",
+   "approve",
+   "machine",
+ ]
```

Context:

```text
          - listitem [ref=e448]:
            - generic [ref=e449]: ስለ እኛ
          - listitem [ref=e450]:
            - generic [ref=e451]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e452]:
        - heading "እገዛ" [level=2] [ref=e453]
        - list [ref=e454]:
          - listitem [ref=e455]:
            - generic [ref=e456]: ደህንነት
          - listitem [ref=e457]:
            - generic [ref=e458]: ያግኙን
      - navigation "ሕጋዊ" [ref=e459]:
        - heading "ሕጋዊ" [level=2] [ref=e460]
        - list [ref=e461]:
          - listitem [ref=e462]:
            - generic [ref=e463]: ውሎች
          - listitem [ref=e464]:
            - generic [ref=e465]: ግላዊነት
    - paragraph [ref=e467]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
