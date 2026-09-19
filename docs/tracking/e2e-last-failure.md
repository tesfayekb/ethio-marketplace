# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35424748594
- Commit: `e70ff0273d1620ae4992a3674aefef9b66672193`
- Attempt: 2
- Written (UTC): 2026-09-19T06:12:44.761Z
- Passed: 841 · Skipped: 72 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): smoke, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — TimeoutError: locator.click: Timeout 10000ms exceeded.

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 42 user(s) owned by process 35424748594-smoke
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 25 user(s) owned by process 35424748594-changed
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `smoke`
- Project: `mobile-360`

```text
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: 'E2E-Scratch-XK-smoke-0', exact: true })
    - locator resolved to <div tabindex="-1" role="menuitem" data-orientation="vertical" data-radix-collection-item="" class="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">E2E-Scratch-XK-smoke-0</div>
  - attempting click action
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

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

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).
