# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33569252582
- Commit: `c294e728cc047c2ecc6f83f144cd476db7062dd8`
- Attempt: 2
- Written (UTC): 2026-09-01T23:14:57.692Z
- Passed: 397 · Skipped: 98 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `smoke`
- Project: `mobile-360`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e75]:
            - generic [ref=e76]: ስለ እኛ
          - listitem [ref=e77]:
            - generic [ref=e78]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e79]:
        - heading "እገዛ" [level=2] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]:
            - generic [ref=e83]: ደህንነት
          - listitem [ref=e84]:
            - generic [ref=e85]: ያግኙን
      - navigation "ሕጋዊ" [ref=e86]:
        - heading "ሕጋዊ" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: ውሎች
          - listitem [ref=e91]:
            - generic [ref=e92]: ግላዊነት
    - paragraph [ref=e94]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none)

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "am"
Received: "en"
Timeout:  15000ms

Call log:
  - [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) with timeout 15000ms
  - waiting for locator('html')
    19 × locator resolved to <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded">…</html>
       - unexpected value "en"

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "am",
    "en",
    "x-default",
  ]
```

Context:

```text
          - listitem [ref=e71]:
            - generic [ref=e72]: About
          - listitem [ref=e73]:
            - generic [ref=e74]: How it works
      - navigation "Help" [ref=e75]:
        - heading "Help" [level=2] [ref=e76]
        - list [ref=e77]:
          - listitem [ref=e78]:
            - generic [ref=e79]: Safety
          - listitem [ref=e80]:
            - generic [ref=e81]: Contact
      - navigation "Legal" [ref=e82]:
        - heading "Legal" [level=2] [ref=e83]
        - list [ref=e84]:
          - listitem [ref=e85]:
            - generic [ref=e86]: Terms
          - listitem [ref=e87]:
            - generic [ref=e88]: Privacy
    - paragraph [ref=e90]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e183]:
            - generic [ref=e184]: ስለ እኛ
          - listitem [ref=e185]:
            - generic [ref=e186]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e187]:
        - heading "እገዛ" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: ደህንነት
          - listitem [ref=e192]:
            - generic [ref=e193]: ያግኙን
      - navigation "ሕጋዊ" [ref=e194]:
        - heading "ሕጋዊ" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - generic [ref=e198]: ውሎች
          - listitem [ref=e199]:
            - generic [ref=e200]: ግላዊነት
    - paragraph [ref=e202]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none)

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "am"
Received: "en"
Timeout:  15000ms

Call log:
  - [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) with timeout 15000ms
  - waiting for locator('html')
    19 × locator resolved to <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded">…</html>
       - unexpected value "en"

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

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "am",
    "en",
    "x-default",
  ]
```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: How it works
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Legal" [ref=e190]:
        - heading "Legal" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Terms
          - listitem [ref=e195]:
            - generic [ref=e196]: Privacy
    - paragraph [ref=e198]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e75]:
            - generic [ref=e76]: ስለ እኛ
          - listitem [ref=e77]:
            - generic [ref=e78]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e79]:
        - heading "እገዛ" [level=2] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]:
            - generic [ref=e83]: ደህንነት
          - listitem [ref=e84]:
            - generic [ref=e85]: ያግኙን
      - navigation "ሕጋዊ" [ref=e86]:
        - heading "ሕጋዊ" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: ውሎች
          - listitem [ref=e91]:
            - generic [ref=e92]: ግላዊነት
    - paragraph [ref=e94]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none)

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "am"
Received: "en"
Timeout:  15000ms

Call log:
  - [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) with timeout 15000ms
  - waiting for locator('html')
    19 × locator resolved to <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded">…</html>
       - unexpected value "en"

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "am",
    "en",
    "x-default",
  ]
```

Context:

```text
          - listitem [ref=e71]:
            - generic [ref=e72]: About
          - listitem [ref=e73]:
            - generic [ref=e74]: How it works
      - navigation "Help" [ref=e75]:
        - heading "Help" [level=2] [ref=e76]
        - list [ref=e77]:
          - listitem [ref=e78]:
            - generic [ref=e79]: Safety
          - listitem [ref=e80]:
            - generic [ref=e81]: Contact
      - navigation "Legal" [ref=e82]:
        - heading "Legal" [level=2] [ref=e83]
        - list [ref=e84]:
          - listitem [ref=e85]:
            - generic [ref=e86]: Terms
          - listitem [ref=e87]:
            - generic [ref=e88]: Privacy
    - paragraph [ref=e90]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e183]:
            - generic [ref=e184]: ስለ እኛ
          - listitem [ref=e185]:
            - generic [ref=e186]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e187]:
        - heading "እገዛ" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: ደህንነት
          - listitem [ref=e192]:
            - generic [ref=e193]: ያግኙን
      - navigation "ሕጋዊ" [ref=e194]:
        - heading "ሕጋዊ" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - generic [ref=e198]: ውሎች
          - listitem [ref=e199]:
            - generic [ref=e200]: ግላዊነት
    - paragraph [ref=e202]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none)

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "am"
Received: "en"
Timeout:  15000ms

Call log:
  - [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) with timeout 15000ms
  - waiting for locator('html')
    19 × locator resolved to <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded">…</html>
       - unexpected value "en"

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

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `changed`
- Project: `mobile-360`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e75]:
            - generic [ref=e76]: ስለ እኛ
          - listitem [ref=e77]:
            - generic [ref=e78]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e79]:
        - heading "እገዛ" [level=2] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]:
            - generic [ref=e83]: ደህንነት
          - listitem [ref=e84]:
            - generic [ref=e85]: ያግኙን
      - navigation "ሕጋዊ" [ref=e86]:
        - heading "ሕጋዊ" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: ውሎች
          - listitem [ref=e91]:
            - generic [ref=e92]: ግላዊነት
    - paragraph [ref=e94]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `changed`
- Project: `mobile-360`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none)

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "am"
Received: "en"
Timeout:  15000ms

Call log:
  - [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) with timeout 15000ms
  - waiting for locator('html')
    19 × locator resolved to <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded">…</html>
       - unexpected value "en"

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "am",
    "en",
    "x-default",
  ]
```

Context:

```text
          - listitem [ref=e71]:
            - generic [ref=e72]: About
          - listitem [ref=e73]:
            - generic [ref=e74]: How it works
      - navigation "Help" [ref=e75]:
        - heading "Help" [level=2] [ref=e76]
        - list [ref=e77]:
          - listitem [ref=e78]:
            - generic [ref=e79]: Safety
          - listitem [ref=e80]:
            - generic [ref=e81]: Contact
      - navigation "Legal" [ref=e82]:
        - heading "Legal" [level=2] [ref=e83]
        - list [ref=e84]:
          - listitem [ref=e85]:
            - generic [ref=e86]: Terms
          - listitem [ref=e87]:
            - generic [ref=e88]: Privacy
    - paragraph [ref=e90]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `changed`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: getByRole('textbox', { name: /email/i })
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for getByRole('textbox', { name: /email/i })

```

Context:

```text
          - listitem [ref=e183]:
            - generic [ref=e184]: ስለ እኛ
          - listitem [ref=e185]:
            - generic [ref=e186]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e187]:
        - heading "እገዛ" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: ደህንነት
          - listitem [ref=e192]:
            - generic [ref=e193]: ያግኙን
      - navigation "ሕጋዊ" [ref=e194]:
        - heading "ሕጋዊ" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - generic [ref=e198]: ውሎች
          - listitem [ref=e199]:
            - generic [ref=e200]: ግላዊነት
    - paragraph [ref=e202]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › U4h device language star › TR-28 the account carries onto a starless device, and never over a star

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none)

expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "am"
Received: "en"
Timeout:  15000ms

Call log:
  - [INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","star":null,"codes":["en","am"]}
[INC-113] rendered options: (none) with timeout 15000ms
  - waiting for locator('html')
    19 × locator resolved to <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded">…</html>
       - unexpected value "en"

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

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
