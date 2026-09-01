# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33527820740
- Commit: `6fb61183c4e9af8efefc58d3e3ce3ad49801965e`
- Attempt: 1
- Written (UTC): 2026-09-01T15:54:06.228Z
- Passed: 383 · Skipped: 64 · Failed: 2
- Sources without results: none

## admin-users.spec.ts › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('activity-user.profile_edit').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('activity-user.profile_edit').first()

```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones

- Source: `changed`
- Project: `mobile-360`

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
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy
[INC-112] testids: strings-coverage=1 strings-search=1 strings-unavailable=0 approve-all-bar=1 approve-all-start=1 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
  ["auth-derived","admin","translations","languages"] status=success error=none dataUpdatedAt=1788277871905 dataLength=6
  ["auth-derived","admin","translations","stats","zxy"] status=success error=none dataUpdatedAt=1788277871932 dataLength=1
  ["auth-derived","admin","translations","my-scope"] status=pending error=none dataUpdatedAt=0 dataLength=null
  ["auth-derived","admin","translations","rows",{"lang":"zxy","status":"all","search":"","limit":25,"offset":0,"orphaned":false}] status=success error=none dataUpdatedAt=1788277871915 dataLength=keys:2
```

Context:

```text
          - listitem [ref=e497]:
            - generic [ref=e498]: About
          - listitem [ref=e499]:
            - generic [ref=e500]: How it works
      - navigation "Help" [ref=e501]:
        - heading "Help" [level=2] [ref=e502]
        - list [ref=e503]:
          - listitem [ref=e504]:
            - generic [ref=e505]: Safety
          - listitem [ref=e506]:
            - generic [ref=e507]: Contact
      - navigation "Legal" [ref=e508]:
        - heading "Legal" [level=2] [ref=e509]
        - list [ref=e510]:
          - listitem [ref=e511]:
            - generic [ref=e512]: Terms
          - listitem [ref=e513]:
            - generic [ref=e514]: Privacy
    - paragraph [ref=e516]: © 2026 ethio.com — All rights reserved.
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
