# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33239557221
- Commit: `d2721b3234a5d2a27435ed527fc57fb74c2f7025`
- Written (UTC): 2026-08-29T07:03:01.554Z
- Passed: 301 · Skipped: 66 · Failed: 6
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: locator.fill: Error: strict mode violation: getByTestId('string-input-admin-translations-title') resolved to 2 elements:
    1) <textarea rows="3" id="string-input-admin-translations-title" data-testid="string-input-admin-translations-title" class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">ትርጉሞች</textarea> aka getByTestId('data-table-cards').getByTestId('string-input-admin-translations-title')
    2) <textarea rows="3" id="string-input-admin-translations-title" data-testid="string-input-admin-translations-title" class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">ትርጉሞች</textarea> aka getByTestId('string-row-admin-translations-title-expanded-row').getByTestId('string-input-admin-translations-title')

Call log:
  - waiting for getByTestId('string-input-admin-translations-title')

```

Context:

```text
          - listitem [ref=e138]:
            - generic [ref=e139]: About
          - listitem [ref=e140]:
            - generic [ref=e141]: How it works
      - navigation "Help" [ref=e142]:
        - heading "Help" [level=2] [ref=e143]
        - list [ref=e144]:
          - listitem [ref=e145]:
            - generic [ref=e146]: Safety
          - listitem [ref=e147]:
            - generic [ref=e148]: Contact
      - navigation "Legal" [ref=e149]:
        - heading "Legal" [level=2] [ref=e150]
        - list [ref=e151]:
          - listitem [ref=e152]:
            - generic [ref=e153]: Terms
          - listitem [ref=e154]:
            - generic [ref=e155]: Privacy
    - paragraph [ref=e157]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByText('ትርጉሞች').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ትርጉሞች').first()
    14 × locator resolved to <span class="truncate md:[html[data-rail=collapsed]_&]:hidden">ትርጉሞች</span>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e216]:
            - generic [ref=e217]: ስለ እኛ
          - listitem [ref=e218]:
            - generic [ref=e219]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e220]:
        - heading "እገዛ" [level=2] [ref=e221]
        - list [ref=e222]:
          - listitem [ref=e223]:
            - generic [ref=e224]: ደህንነት
          - listitem [ref=e225]:
            - generic [ref=e226]: ያግኙን
      - navigation "ሕጋዊ" [ref=e227]:
        - heading "ሕጋዊ" [level=2] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - generic [ref=e231]: ውሎች
          - listitem [ref=e232]:
            - generic [ref=e233]: ግላዊነት
    - paragraph [ref=e235]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

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

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId(/^string-editor-/).first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId(/^string-editor-/).first()
    14 × locator resolved to <div class="min-w-0 space-y-3" data-testid="string-editor-account-deactivatedBanner">…</div>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e724]:
            - generic [ref=e725]: About
          - listitem [ref=e726]:
            - generic [ref=e727]: How it works
      - navigation "Help" [ref=e728]:
        - heading "Help" [level=2] [ref=e729]
        - list [ref=e730]:
          - listitem [ref=e731]:
            - generic [ref=e732]: Safety
          - listitem [ref=e733]:
            - generic [ref=e734]: Contact
      - navigation "Legal" [ref=e735]:
        - heading "Legal" [level=2] [ref=e736]
        - list [ref=e737]:
          - listitem [ref=e738]:
            - generic [ref=e739]: Terms
          - listitem [ref=e740]:
            - generic [ref=e741]: Privacy
    - paragraph [ref=e743]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: locator.fill: Error: strict mode violation: getByTestId('string-input-admin-translations-title') resolved to 2 elements:
    1) <textarea rows="3" id="string-input-admin-translations-title" data-testid="string-input-admin-translations-title" class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">ትርጉሞች</textarea> aka getByTestId('data-table-cards').getByTestId('string-input-admin-translations-title')
    2) <textarea rows="3" id="string-input-admin-translations-title" data-testid="string-input-admin-translations-title" class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">ትርጉሞች</textarea> aka getByTestId('string-row-admin-translations-title-expanded-row').getByTestId('string-input-admin-translations-title')

Call log:
  - waiting for getByTestId('string-input-admin-translations-title')

```

Context:

```text
          - listitem [ref=e243]:
            - generic [ref=e244]: About
          - listitem [ref=e245]:
            - generic [ref=e246]: How it works
      - navigation "Help" [ref=e247]:
        - heading "Help" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Safety
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
