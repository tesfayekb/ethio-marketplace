# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33241376354
- Commit: `769e3e61f0d02781c19fda65954da72530be2844`
- Written (UTC): 2026-08-29T08:18:23.776Z
- Passed: 307 · Skipped: 64 · Failed: 2
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
    12 × locator resolved to <button value="on" type="button" role="switch" aria-checked="false" data-state="unchecked" data-testid="lang-public-om" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-prim…>…</button>
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

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
