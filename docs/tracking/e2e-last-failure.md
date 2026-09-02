# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33582884559
- Commit: `c9035cfaa17b5524c2449dfd87db202d19bd0603`
- Attempt: 2
- Written (UTC): 2026-09-02T02:34:36.135Z
- Passed: 386 · Skipped: 70 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller — Test timeout of 60000ms exceeded.

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('lang-row-zzq-3602tr31')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('lang-row-zzq-3602tr31')
    20 × locator resolved to <tr data-testid="lang-row-zzq-3602tr31" class="border-b border-border last:border-0">…</tr>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e609]:
            - generic [ref=e610]: About
          - listitem [ref=e611]:
            - generic [ref=e612]: How it works
      - navigation "Help" [ref=e613]:
        - heading "Help" [level=2] [ref=e614]
        - list [ref=e615]:
          - listitem [ref=e616]:
            - generic [ref=e617]: Safety
          - listitem [ref=e618]:
            - generic [ref=e619]: Contact
      - navigation "Legal" [ref=e620]:
        - heading "Legal" [level=2] [ref=e621]
        - list [ref=e622]:
          - listitem [ref=e623]:
            - generic [ref=e624]: Terms
          - listitem [ref=e625]:
            - generic [ref=e626]: Privacy
    - paragraph [ref=e628]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('lang-delete-zzq-2801tr31') resolved to 2 elements:
    1) <button type="button" data-testid="lang-delete-zzq-2801tr31" class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 min-h-11 shrink-…>Delete language…</button> aka getByTestId('lang-row-zzq-2801tr31-actions').getByTestId('lang-delete-zzq-2801tr31')
    2) <button type="button" data-testid="lang-delete-zzq-2801tr31" class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 min-h-11 shrink-…>Delete language…</button> aka getByTestId('lang-row-zzq-2801tr31-actions-cell').getByTestId('lang-delete-zzq-2801tr31')

Call log:
  - waiting for getByTestId('lang-delete-zzq-2801tr31')

```

Context:

```text
          - listitem [ref=e799]:
            - generic [ref=e800]: About
          - listitem [ref=e801]:
            - generic [ref=e802]: How it works
      - navigation "Help" [ref=e803]:
        - heading "Help" [level=2] [ref=e804]
        - list [ref=e805]:
          - listitem [ref=e806]:
            - generic [ref=e807]: Safety
          - listitem [ref=e808]:
            - generic [ref=e809]: Contact
      - navigation "Legal" [ref=e810]:
        - heading "Legal" [level=2] [ref=e811]
        - list [ref=e812]:
          - listitem [ref=e813]:
            - generic [ref=e814]: Terms
          - listitem [ref=e815]:
            - generic [ref=e816]: Privacy
    - paragraph [ref=e818]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('lang-row-zzq-3600tr31')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('lang-row-zzq-3600tr31')
    21 × locator resolved to <tr data-testid="lang-row-zzq-3600tr31" class="border-b border-border last:border-0">…</tr>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e609]:
            - generic [ref=e610]: About
          - listitem [ref=e611]:
            - generic [ref=e612]: How it works
      - navigation "Help" [ref=e613]:
        - heading "Help" [level=2] [ref=e614]
        - list [ref=e615]:
          - listitem [ref=e616]:
            - generic [ref=e617]: Safety
          - listitem [ref=e618]:
            - generic [ref=e619]: Contact
      - navigation "Legal" [ref=e620]:
        - heading "Legal" [level=2] [ref=e621]
        - list [ref=e622]:
          - listitem [ref=e623]:
            - generic [ref=e624]: Terms
          - listitem [ref=e625]:
            - generic [ref=e626]: Privacy
    - paragraph [ref=e628]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-31 a scratch language deletes with a typed confirm and leaves no rows

- Source: `changed`
- Project: `desktop-1280`

```text
Error: locator.click: Error: strict mode violation: getByTestId('lang-delete-zzq-2801tr31') resolved to 2 elements:
    1) <button type="button" data-testid="lang-delete-zzq-2801tr31" class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 min-h-11 shrink-…>Delete language…</button> aka getByTestId('lang-row-zzq-2801tr31-actions').getByTestId('lang-delete-zzq-2801tr31')
    2) <button type="button" data-testid="lang-delete-zzq-2801tr31" class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 min-h-11 shrink-…>Delete language…</button> aka getByTestId('lang-row-zzq-2801tr31-actions-cell').getByTestId('lang-delete-zzq-2801tr31')

Call log:
  - waiting for getByTestId('lang-delete-zzq-2801tr31')

```

Context:

```text
          - listitem [ref=e799]:
            - generic [ref=e800]: About
          - listitem [ref=e801]:
            - generic [ref=e802]: How it works
      - navigation "Help" [ref=e803]:
        - heading "Help" [level=2] [ref=e804]
        - list [ref=e805]:
          - listitem [ref=e806]:
            - generic [ref=e807]: Safety
          - listitem [ref=e808]:
            - generic [ref=e809]: Contact
      - navigation "Legal" [ref=e810]:
        - heading "Legal" [level=2] [ref=e811]
        - list [ref=e812]:
          - listitem [ref=e813]:
            - generic [ref=e814]: Terms
          - listitem [ref=e815]:
            - generic [ref=e816]: Privacy
    - paragraph [ref=e818]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_audit ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_audit_facets ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
