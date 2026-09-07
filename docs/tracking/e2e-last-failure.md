# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34074383685
- Commit: `8c8e03c528c85e485422e0844f8bacbde1b9ce88`
- Attempt: 1
- Written (UTC): 2026-09-07T01:59:36.522Z
- Passed: 428 · Skipped: 67 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## category-nav.spec.ts › category selection navigates › C-1: clicking a category changes the URL and survives reload

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('breadcrumb-category')
Expected: "E2E Scratch Basket"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('breadcrumb-category')

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

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: window target at 1024

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 43
Received:    42.69950866699219
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
