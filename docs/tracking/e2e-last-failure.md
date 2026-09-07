# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34090812857
- Commit: `9fc2db7ccbe95c64c435768743aa3510bf80e23d`
- PLATFORM-ORIGIN? the head commit's subject is `Work in progress` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-09-07T06:34:04.839Z
- Passed: 481 · Skipped: 67 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e781]:
            - generic [ref=e782]: About
          - listitem [ref=e783]:
            - generic [ref=e784]: How it works
      - navigation "Help" [ref=e785]:
        - heading "Help" [level=2] [ref=e786]
        - list [ref=e787]:
          - listitem [ref=e788]:
            - generic [ref=e789]: Safety
          - listitem [ref=e790]:
            - generic [ref=e791]: Contact
      - navigation "Legal" [ref=e792]:
        - heading "Legal" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Terms
          - listitem [ref=e797]:
            - generic [ref=e798]: Privacy
    - paragraph [ref=e800]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: window target at 1240

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 43
Received:    42.701141357421875
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

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e1159]:
            - generic [ref=e1160]: About
          - listitem [ref=e1161]:
            - generic [ref=e1162]: How it works
      - navigation "Help" [ref=e1163]:
        - heading "Help" [level=2] [ref=e1164]
        - list [ref=e1165]:
          - listitem [ref=e1166]:
            - generic [ref=e1167]: Safety
          - listitem [ref=e1168]:
            - generic [ref=e1169]: Contact
      - navigation "Legal" [ref=e1170]:
        - heading "Legal" [level=2] [ref=e1171]
        - list [ref=e1172]:
          - listitem [ref=e1173]:
            - generic [ref=e1174]: Terms
          - listitem [ref=e1175]:
            - generic [ref=e1176]: Privacy
    - paragraph [ref=e1178]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e781]:
            - generic [ref=e782]: About
          - listitem [ref=e783]:
            - generic [ref=e784]: How it works
      - navigation "Help" [ref=e785]:
        - heading "Help" [level=2] [ref=e786]
        - list [ref=e787]:
          - listitem [ref=e788]:
            - generic [ref=e789]: Safety
          - listitem [ref=e790]:
            - generic [ref=e791]: Contact
      - navigation "Legal" [ref=e792]:
        - heading "Legal" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Terms
          - listitem [ref=e797]:
            - generic [ref=e798]: Privacy
    - paragraph [ref=e800]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e1159]:
            - generic [ref=e1160]: About
          - listitem [ref=e1161]:
            - generic [ref=e1162]: How it works
      - navigation "Help" [ref=e1163]:
        - heading "Help" [level=2] [ref=e1164]
        - list [ref=e1165]:
          - listitem [ref=e1166]:
            - generic [ref=e1167]: Safety
          - listitem [ref=e1168]:
            - generic [ref=e1169]: Contact
      - navigation "Legal" [ref=e1170]:
        - heading "Legal" [level=2] [ref=e1171]
        - list [ref=e1172]:
          - listitem [ref=e1173]:
            - generic [ref=e1174]: Terms
          - listitem [ref=e1175]:
            - generic [ref=e1176]: Privacy
    - paragraph [ref=e1178]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
