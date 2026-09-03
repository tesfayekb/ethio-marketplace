# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33713834469
- Commit: `961633b452204be00c420598258e1ca2002b1cb3`
- Attempt: 1
- Written (UTC): 2026-09-03T04:17:06.551Z
- Passed: 403 · Skipped: 66 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: locator.fill: Error: Malformed value
Call log:
  - waiting for getByTestId('category-window-from')
    - locator resolved to <input value="" type="date" id="category-window-from" data-testid="category-window-from" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"/>
    - fill("2030-01-01T00:00")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Visibility window" [ref=e2]:
    - heading "Visibility window" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Visibility window
      - paragraph [ref=e6]: Leave a date empty to remove that bound. Times are UTC.
      - generic [ref=e7]:
        - generic [ref=e8]: Visible from
        - textbox "Visible from" [active] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]: Visible until
        - textbox "Visible until" [ref=e12]
      - generic [ref=e13]:
        - button "Cancel" [ref=e14] [cursor=pointer]
        - button "Save" [ref=e15] [cursor=pointer]
    - button "Close" [ref=e16] [cursor=pointer]:
      - img [ref=e17]
      - generic [ref=e20]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: locator.fill: Error: Malformed value
Call log:
  - waiting for getByTestId('category-window-from')
    - locator resolved to <input value="" type="date" id="category-window-from" data-testid="category-window-from" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"/>
    - fill("2030-01-01T00:00")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Visibility window" [ref=e2]:
    - heading "Visibility window" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Visibility window
      - paragraph [ref=e6]: Leave a date empty to remove that bound. Times are UTC.
      - generic [ref=e7]:
        - generic [ref=e8]: Visible from
        - textbox "Visible from" [active] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]: Visible until
        - textbox "Visible until" [ref=e12]
      - generic [ref=e13]:
        - button "Cancel" [ref=e14] [cursor=pointer]
        - button "Save" [ref=e15] [cursor=pointer]
    - button "Close" [ref=e16] [cursor=pointer]:
      - img [ref=e17]
      - generic [ref=e20]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `changed`
- Project: `mobile-360`

```text
Error: locator.fill: Error: Malformed value
Call log:
  - waiting for getByTestId('category-window-from')
    - locator resolved to <input value="" type="date" id="category-window-from" data-testid="category-window-from" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"/>
    - fill("2030-01-01T00:00")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Visibility window" [ref=e2]:
    - heading "Visibility window" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Visibility window
      - paragraph [ref=e6]: Leave a date empty to remove that bound. Times are UTC.
      - generic [ref=e7]:
        - generic [ref=e8]: Visible from
        - textbox "Visible from" [active] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]: Visible until
        - textbox "Visible until" [ref=e12]
      - generic [ref=e13]:
        - button "Cancel" [ref=e14] [cursor=pointer]
        - button "Save" [ref=e15] [cursor=pointer]
    - button "Close" [ref=e16] [cursor=pointer]:
      - img [ref=e17]
      - generic [ref=e20]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `changed`
- Project: `desktop-1280`

```text
Error: locator.fill: Error: Malformed value
Call log:
  - waiting for getByTestId('category-window-from')
    - locator resolved to <input value="" type="date" id="category-window-from" data-testid="category-window-from" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"/>
    - fill("2030-01-01T00:00")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Visibility window" [ref=e2]:
    - heading "Visibility window" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Visibility window
      - paragraph [ref=e6]: Leave a date empty to remove that bound. Times are UTC.
      - generic [ref=e7]:
        - generic [ref=e8]: Visible from
        - textbox "Visible from" [active] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]: Visible until
        - textbox "Visible until" [ref=e12]
      - generic [ref=e13]:
        - button "Cancel" [ref=e14] [cursor=pointer]
        - button "Save" [ref=e15] [cursor=pointer]
    - button "Close" [ref=e16] [cursor=pointer]:
      - img [ref=e17]
      - generic [ref=e20]: Close
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
