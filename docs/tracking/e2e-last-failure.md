# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33230993452
- Commit: `88ef0689fa384b9df1083ccecb2e2184d90be1d7`
- Written (UTC): 2026-08-29T03:23:35.317Z
- Passed: 288 · Skipped: 64 · Failed: 1
- Sources without results: none

## admin-audit.spec.ts › U3 audit & security › AS-2 filters: an action filter narrows the list

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-testid^="audit-expand-"]').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid^="audit-expand-"]').first()
    14 × locator resolved to <button type="button" data-testid="audit-expand-7716a37e-d5c9-4bcf-9974-638b62f980d7" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accen…>Details</button>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e697]:
            - generic [ref=e698]: About
          - listitem [ref=e699]:
            - generic [ref=e700]: How it works
      - navigation "Help" [ref=e701]:
        - heading "Help" [level=2] [ref=e702]
        - list [ref=e703]:
          - listitem [ref=e704]:
            - generic [ref=e705]: Safety
          - listitem [ref=e706]:
            - generic [ref=e707]: Contact
      - navigation "Legal" [ref=e708]:
        - heading "Legal" [level=2] [ref=e709]
        - list [ref=e710]:
          - listitem [ref=e711]:
            - generic [ref=e712]: Terms
          - listitem [ref=e713]:
            - generic [ref=e714]: Privacy
    - paragraph [ref=e716]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
