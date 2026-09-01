# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33536756842
- Commit: `bb3bf1127dff97a8ae408ea8c03035cee5dd8ca8`
- Attempt: 1
- Written (UTC): 2026-09-01T17:23:27.076Z
- Passed: 334 · Skipped: 71 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the strings list never rendered all four seeded TR-19 rows

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-mo
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=1 approve-all-start=1 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
(no __ethioQueryClient — not an E2E build?)
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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: the strings list never rendered all four seeded TR-19 rows

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-de
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
  (no matching queries)
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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
