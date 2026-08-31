# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33386871654
- Commit: `66a0ad4a0482932eca55824d661d224a16bba8f3`
- Attempt: 1
- Written (UTC): 2026-08-31T11:32:17.160Z
- Passed: 434 · Skipped: 97 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: the fence's up control must be enabled before the move

expect(locator).toBeEnabled() failed

Locator: getByRole('table').getByTestId('lang-row-zxx').getByTestId('lang-up-zxx')
Expected: enabled
Error: strict mode violation: getByRole('table').getByTestId('lang-row-zxx').getByTestId('lang-up-zxx') resolved to 2 elements:
    1) <button type="button" aria-label="Move E2E up" data-testid="lang-up-zxx" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground …>…</button> aka getByTestId('lang-up-zxx').nth(2)
    2) <button type="button" aria-label="Move E2E up" data-testid="lang-up-zxx" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground …>…</button> aka getByTestId('lang-row-zxx-actions-cell').getByTestId('lang-up-zxx')

Call log:
  - the fence's up control must be enabled before the move with timeout 20000ms
  - waiting for getByRole('table').getByTestId('lang-row-zxx').getByTestId('lang-up-zxx')

```

Context:

```text
          - listitem [ref=e414]:
            - generic [ref=e415]: About
          - listitem [ref=e416]:
            - generic [ref=e417]: How it works
      - navigation "Help" [ref=e418]:
        - heading "Help" [level=2] [ref=e419]
        - list [ref=e420]:
          - listitem [ref=e421]:
            - generic [ref=e422]: Safety
          - listitem [ref=e423]:
            - generic [ref=e424]: Contact
      - navigation "Legal" [ref=e425]:
        - heading "Legal" [level=2] [ref=e426]
        - list [ref=e427]:
          - listitem [ref=e428]:
            - generic [ref=e429]: Terms
          - listitem [ref=e430]:
            - generic [ref=e431]: Privacy
    - paragraph [ref=e433]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `changed`
- Project: `desktop-1280`

```text
Error: the fence's up control must be enabled before the move

expect(locator).toBeEnabled() failed

Locator: getByRole('table').getByTestId('lang-row-zxx').getByTestId('lang-up-zxx')
Expected: enabled
Error: strict mode violation: getByRole('table').getByTestId('lang-row-zxx').getByTestId('lang-up-zxx') resolved to 2 elements:
    1) <button type="button" aria-label="Move E2E up" data-testid="lang-up-zxx" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground …>…</button> aka getByTestId('lang-up-zxx').nth(2)
    2) <button type="button" aria-label="Move E2E up" data-testid="lang-up-zxx" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground …>…</button> aka getByTestId('lang-row-zxx-actions-cell').getByTestId('lang-up-zxx')

Call log:
  - the fence's up control must be enabled before the move with timeout 20000ms
  - waiting for getByRole('table').getByTestId('lang-row-zxx').getByTestId('lang-up-zxx')

```

Context:

```text
          - listitem [ref=e414]:
            - generic [ref=e415]: About
          - listitem [ref=e416]:
            - generic [ref=e417]: How it works
      - navigation "Help" [ref=e418]:
        - heading "Help" [level=2] [ref=e419]
        - list [ref=e420]:
          - listitem [ref=e421]:
            - generic [ref=e422]: Safety
          - listitem [ref=e423]:
            - generic [ref=e424]: Contact
      - navigation "Legal" [ref=e425]:
        - heading "Legal" [level=2] [ref=e426]
        - list [ref=e427]:
          - listitem [ref=e428]:
            - generic [ref=e429]: Terms
          - listitem [ref=e430]:
            - generic [ref=e431]: Privacy
    - paragraph [ref=e433]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
