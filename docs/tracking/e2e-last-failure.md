# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33361751405
- Commit: `b8704662853ff43b6a1c61b237b42575e46c3426`
- Written (UTC): 2026-08-31T05:54:06.694Z
- Passed: 425 · Skipped: 95 · Failed: 1
- Sources without results: none

## shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('dialog').getByTestId('rail-scroll').locator('li').last()
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByRole('dialog').getByTestId('rail-scroll').locator('li').last()
    2 × locator resolved to <li aria-hidden="true" data-testid="rail-category-skeleton">…</li>
      - unexpected value "viewport ratio 0"
    12 × locator resolved to <li>…</li>
       - unexpected value "viewport ratio 0"

```

Context:

```text
              - generic [ref=e106]: Babies & Kids
          - listitem [ref=e107]:
            - link "Beauty & Personal Care" [ref=e108] [cursor=pointer]:
              - /url: /c/beauty-personal-care
              - img [ref=e109]
              - generic [ref=e112]: Beauty & Personal Care
          - listitem [ref=e113]:
            - link "Agriculture & Farming" [ref=e114] [cursor=pointer]:
              - /url: /c/agriculture-farming
              - img [ref=e115]
              - generic [ref=e118]: Agriculture & Farming
          - listitem [ref=e119]:
            - link "Commercial Equipment" [ref=e120] [cursor=pointer]:
              - /url: /c/commercial-equipment
              - img [ref=e121]
              - generic [ref=e124]: Commercial Equipment
      - button "Sign out" [ref=e126]:
        - img [ref=e127]
        - generic [ref=e130]: Sign out
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).
