# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34087376860
- Commit: `7cef11455ef4f352eba9d59cf5dce90fdd43c582`
- Attempt: 2
- Written (UTC): 2026-09-07T05:46:23.993Z
- Passed: 480 · Skipped: 67 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate — Error: [INC-113] url: http://127.0.0.1:4173/
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag — Error: expect(locator).toBeVisible() failed

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
          - listitem [ref=e1162]:
            - generic [ref=e1163]: About
          - listitem [ref=e1164]:
            - generic [ref=e1165]: How it works
      - navigation "Help" [ref=e1166]:
        - heading "Help" [level=2] [ref=e1167]
        - list [ref=e1168]:
          - listitem [ref=e1169]:
            - generic [ref=e1170]: Safety
          - listitem [ref=e1171]:
            - generic [ref=e1172]: Contact
      - navigation "Legal" [ref=e1173]:
        - heading "Legal" [level=2] [ref=e1174]
        - list [ref=e1175]:
          - listitem [ref=e1176]:
            - generic [ref=e1177]: Terms
          - listitem [ref=e1178]:
            - generic [ref=e1179]: Privacy
    - paragraph [ref=e1181]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e1162]:
            - generic [ref=e1163]: About
          - listitem [ref=e1164]:
            - generic [ref=e1165]: How it works
      - navigation "Help" [ref=e1166]:
        - heading "Help" [level=2] [ref=e1167]
        - list [ref=e1168]:
          - listitem [ref=e1169]:
            - generic [ref=e1170]: Safety
          - listitem [ref=e1171]:
            - generic [ref=e1172]: Contact
      - navigation "Legal" [ref=e1173]:
        - heading "Legal" [level=2] [ref=e1174]
        - list [ref=e1175]:
          - listitem [ref=e1176]:
            - generic [ref=e1177]: Terms
          - listitem [ref=e1178]:
            - generic [ref=e1179]: Privacy
    - paragraph [ref=e1181]: © 2026 ethio.com — All rights reserved.
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
