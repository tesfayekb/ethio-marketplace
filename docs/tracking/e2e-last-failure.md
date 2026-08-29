# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33238900206
- Commit: `88b231e31f9a74df8d4fb977ab37cba639cc02f0`
- Written (UTC): 2026-08-29T06:48:12.215Z
- Passed: 295 · Skipped: 66 · Failed: 12
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('lang-row-am')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-row-am')

```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-2 roster shows every language including admin-only ones

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('lang-row-en')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-row-en')

```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId(/^string-row-/).first()
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId(/^string-row-/).first()

```

Context:

```text
          - listitem [ref=e107]:
            - generic [ref=e108]: About
          - listitem [ref=e109]:
            - generic [ref=e110]: How it works
      - navigation "Help" [ref=e111]:
        - heading "Help" [level=2] [ref=e112]
        - list [ref=e113]:
          - listitem [ref=e114]:
            - generic [ref=e115]: Safety
          - listitem [ref=e116]:
            - generic [ref=e117]: Contact
      - navigation "Legal" [ref=e118]:
        - heading "Legal" [level=2] [ref=e119]
        - list [ref=e120]:
          - listitem [ref=e121]:
            - generic [ref=e122]: Terms
          - listitem [ref=e123]:
            - generic [ref=e124]: Privacy
    - paragraph [ref=e126]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e107]:
            - generic [ref=e108]: About
          - listitem [ref=e109]:
            - generic [ref=e110]: How it works
      - navigation "Help" [ref=e111]:
        - heading "Help" [level=2] [ref=e112]
        - list [ref=e113]:
          - listitem [ref=e114]:
            - generic [ref=e115]: Safety
          - listitem [ref=e116]:
            - generic [ref=e117]: Contact
      - navigation "Legal" [ref=e118]:
        - heading "Legal" [level=2] [ref=e119]
        - list [ref=e120]:
          - listitem [ref=e121]:
            - generic [ref=e122]: Terms
          - listitem [ref=e123]:
            - generic [ref=e124]: Privacy
    - paragraph [ref=e126]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-row-admin-translations-title')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-row-admin-translations-title')

```

Context:

```text
          - listitem [ref=e126]:
            - generic [ref=e127]: About
          - listitem [ref=e128]:
            - generic [ref=e129]: How it works
      - navigation "Help" [ref=e130]:
        - heading "Help" [level=2] [ref=e131]
        - list [ref=e132]:
          - listitem [ref=e133]:
            - generic [ref=e134]: Safety
          - listitem [ref=e135]:
            - generic [ref=e136]: Contact
      - navigation "Legal" [ref=e137]:
        - heading "Legal" [level=2] [ref=e138]
        - list [ref=e139]:
          - listitem [ref=e140]:
            - generic [ref=e141]: Terms
          - listitem [ref=e142]:
            - generic [ref=e143]: Privacy
    - paragraph [ref=e145]: © 2026 ethio.com — All rights reserved.
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

## admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId(/^string-row-/).first()
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId(/^string-row-/).first()

```

Context:

```text
          - listitem [ref=e195]:
            - generic [ref=e196]: About
          - listitem [ref=e197]:
            - generic [ref=e198]: How it works
      - navigation "Help" [ref=e199]:
        - heading "Help" [level=2] [ref=e200]
        - list [ref=e201]:
          - listitem [ref=e202]:
            - generic [ref=e203]: Safety
          - listitem [ref=e204]:
            - generic [ref=e205]: Contact
      - navigation "Legal" [ref=e206]:
        - heading "Legal" [level=2] [ref=e207]
        - list [ref=e208]:
          - listitem [ref=e209]:
            - generic [ref=e210]: Terms
          - listitem [ref=e211]:
            - generic [ref=e212]: Privacy
    - paragraph [ref=e214]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e195]:
            - generic [ref=e196]: About
          - listitem [ref=e197]:
            - generic [ref=e198]: How it works
      - navigation "Help" [ref=e199]:
        - heading "Help" [level=2] [ref=e200]
        - list [ref=e201]:
          - listitem [ref=e202]:
            - generic [ref=e203]: Safety
          - listitem [ref=e204]:
            - generic [ref=e205]: Contact
      - navigation "Legal" [ref=e206]:
        - heading "Legal" [level=2] [ref=e207]
        - list [ref=e208]:
          - listitem [ref=e209]:
            - generic [ref=e210]: Terms
          - listitem [ref=e211]:
            - generic [ref=e212]: Privacy
    - paragraph [ref=e214]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-6 coverage gate: an incomplete language cannot be published

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator:  getByRole('table').getByTestId('lang-public-om')
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('lang-public-om')
    11 × locator resolved to <button value="on" type="button" role="switch" aria-checked="false" data-state="unchecked" data-testid="lang-public-om" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-prim…>…</button>
       - unexpected value "enabled"

```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: How it works
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
          - listitem [ref=e340]:
            - generic [ref=e341]: Contact
      - navigation "Legal" [ref=e342]:
        - heading "Legal" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Terms
          - listitem [ref=e347]:
            - generic [ref=e348]: Privacy
    - paragraph [ref=e350]: © 2026 ethio.com — All rights reserved.
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
