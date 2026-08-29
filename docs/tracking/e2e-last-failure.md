# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33231488343
- Commit: `c14dd99a8cfbf22a04a7a90851f2f0dafb9dc1df`
- Written (UTC): 2026-08-29T03:37:05.375Z
- Passed: 285 · Skipped: 67 · Failed: 1
- Sources without results: none

## admin-audit.spec.ts › U3 audit & security › AS-2 filters: an action filter narrows the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').locator('[data-testid^="audit-expand-"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').locator('[data-testid^="audit-expand-"]').first()

```

Context:

```text
          - listitem [ref=e485]:
            - generic [ref=e486]: About
          - listitem [ref=e487]:
            - generic [ref=e488]: How it works
      - navigation "Help" [ref=e489]:
        - heading "Help" [level=2] [ref=e490]
        - list [ref=e491]:
          - listitem [ref=e492]:
            - generic [ref=e493]: Safety
          - listitem [ref=e494]:
            - generic [ref=e495]: Contact
      - navigation "Legal" [ref=e496]:
        - heading "Legal" [level=2] [ref=e497]
        - list [ref=e498]:
          - listitem [ref=e499]:
            - generic [ref=e500]: Terms
          - listitem [ref=e501]:
            - generic [ref=e502]: Privacy
    - paragraph [ref=e504]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
