# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33534679679
- Commit: `1532e9941d0574feb749840a3637a0eaf3d83590`
- Attempt: 2
- Written (UTC): 2026-09-01T17:09:57.943Z
- Passed: 402 · Skipped: 71 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4f — publication gate governs language choice › TR-17: switcher options equal the DB public list; a non-public ?lang falls back

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: switcher options never matched the gate's public list

expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
    "am",
    "en",
+   "zxx-mo",
  ]

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate

[INC-113] url: http://127.0.0.1:4173/
[INC-113] html lang: en
[INC-113] provider publicLanguages: {"gateReady":true,"active":"en","codes":["en","am","zxx-mo"]}
[INC-113] rendered options: en,am,zxx-mo
```

Context: context file not found for `admin-translations-U4f-publication-gate-governs-language-choice-TR-17-switcher-options-equal-the-DB-public-list-a-non-public-lang-falls-back-desktop-1280`

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeEnabled() failed

Locator:  getByTestId('approve-all-start')
Expected: enabled
Received: disabled
Timeout:  20000ms

Call log:
  - Expect "toBeEnabled" with timeout 20000ms
  - waiting for getByTestId('approve-all-start')
    24 × locator resolved to <button disabled type="button" data-testid="approve-all-start" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 p…>Approve all reviewed (0)</button>
       - unexpected value "disabled"


[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-de
[INC-112] testids: strings-coverage=1 strings-search=1 strings-unavailable=0 approve-all-bar=1 approve-all-start=1 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
  ["auth-derived","admin","translations","languages"] status=success error=none dataUpdatedAt=1788282506150 dataLength=14
  ["auth-derived","admin","translations","stats","zxy-de"] status=success error=none dataUpdatedAt=1788282506166 dataLength=1
  ["auth-derived","admin","translations","my-scope"] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","rows",{"lang":"zxy-de","status":"all","search":"","limit":25,"offset":0,"orphaned":false}] status=success error=none dataUpdatedAt=1788282506169 dataLength=keys:2
```

Context:

```text
          - listitem [ref=e721]:
            - generic [ref=e722]: About
          - listitem [ref=e723]:
            - generic [ref=e724]: How it works
      - navigation "Help" [ref=e725]:
        - heading "Help" [level=2] [ref=e726]
        - list [ref=e727]:
          - listitem [ref=e728]:
            - generic [ref=e729]: Safety
          - listitem [ref=e730]:
            - generic [ref=e731]: Contact
      - navigation "Legal" [ref=e732]:
        - heading "Legal" [level=2] [ref=e733]
        - list [ref=e734]:
          - listitem [ref=e735]:
            - generic [ref=e736]: Terms
          - listitem [ref=e737]:
            - generic [ref=e738]: Privacy
    - paragraph [ref=e740]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
