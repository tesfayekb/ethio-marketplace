# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35426035675
- Commit: `a502431c421472e9eb6ca67e30fc9ffe24d089fc`
- Attempt: 2
- Written (UTC): 2026-09-19T06:29:19.900Z
- Passed: 842 · Skipped: 72 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 3, shard 6, changed
- Sources without results: none

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 72 user(s) owned by process 35426035675-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 54 user(s) owned by process 35426035675-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 25 user(s) owned by process 35426035675-changed
```

## post-wizard.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, comes back, and the plan bounds the rest

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-20: the region level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-region')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - PW-20: the region level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-region')

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 3`
- Project: `mobile-360`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-XS-3-0', exact: true })

```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 6`
- Project: `desktop-1280`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-XC-6-0', exact: true })
    - locator resolved to <div tabindex="-1" role="menuitem" data-orientation="vertical" data-radix-collection-item="" class="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">E2E-Scratch-XC-6-0</div>
  - attempting click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

```

Context:

```text
          - listitem [ref=e220]:
            - generic [ref=e221]: About
          - listitem [ref=e222]:
            - generic [ref=e223]: How it works
      - navigation "Help" [ref=e224]:
        - heading "Help" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: Safety
          - listitem [ref=e229]:
            - generic [ref=e230]: Contact
      - navigation "Legal" [ref=e231]:
        - heading "Legal" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Terms
          - listitem [ref=e236]:
            - generic [ref=e237]: Privacy
    - paragraph [ref=e239]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
