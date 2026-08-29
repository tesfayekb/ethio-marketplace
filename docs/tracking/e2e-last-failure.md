# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33241376354
- Commit: `769e3e61f0d02781c19fda65954da72530be2844`
- Written (UTC): 2026-08-29T07:49:48.032Z
- Passed: 304 · Skipped: 67 · Failed: 2
- Sources without results: none

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: mobile drawer: keys fell back to English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "admin.translations.collapse => \"Close\"",
+ ]
```

Context:

```text
          - link "ህጻናት እና ልጆች" [ref=e99] [cursor=pointer]:
            - /url: /c/babies-kids
            - img [ref=e100]
            - generic [ref=e103]: ህጻናት እና ልጆች
        - listitem [ref=e104]:
          - link "ውበት እና የግል እንክብካቤ" [ref=e105] [cursor=pointer]:
            - /url: /c/beauty-personal-care
            - img [ref=e106]
            - generic [ref=e109]: ውበት እና የግል እንክብካቤ
        - listitem [ref=e110]:
          - link "ግብርና እና እርሻ" [ref=e111] [cursor=pointer]:
            - /url: /c/agriculture-farming
            - img [ref=e112]
            - generic [ref=e115]: ግብርና እና እርሻ
        - listitem [ref=e116]:
          - link "የንግድ መሳሪያዎች" [ref=e117] [cursor=pointer]:
            - /url: /c/commercial-equipment
            - img [ref=e118]
            - generic [ref=e121]: የንግድ መሳሪያዎች
```
```

## admin-translations.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e335]:
            - generic [ref=e336]: ስለ እኛ
          - listitem [ref=e337]:
            - generic [ref=e338]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e339]:
        - heading "እገዛ" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: ደህንነት
          - listitem [ref=e344]:
            - generic [ref=e345]: ያግኙን
      - navigation "ሕጋዊ" [ref=e346]:
        - heading "ሕጋዊ" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - generic [ref=e350]: ውሎች
          - listitem [ref=e351]:
            - generic [ref=e352]: ግላዊነት
    - paragraph [ref=e354]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
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
