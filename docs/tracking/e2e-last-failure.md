# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33839348080
- Commit: `66c9ae87e3039a4f2232db2fdf7f872caf9015d0`
- Attempt: 2
- Written (UTC): 2026-09-04T05:27:47.687Z
- Passed: 441 · Skipped: 74 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · auth-signout.spec.ts › U0k session policy › SP-2 stay signed in extends past the original deadline — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller — Error: [e2e:users] admin.createUser failed for e2e+33839348080-1-0-10-9eqpw2@ethio-e2e.invalid: A user with this email address has already been registered
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · settings.spec.ts › S-2: settings renders all three sections and guards the only method — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-users.spec.ts › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › panel follows the route › admin panel is absent for a normal signed-in user — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Error: expect(locator).toBeVisible() failed

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `smoke`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e88]:
            - generic [ref=e89]: About
          - listitem [ref=e90]:
            - generic [ref=e91]: How it works
      - navigation "Help" [ref=e92]:
        - heading "Help" [level=2] [ref=e93]
        - list [ref=e94]:
          - listitem [ref=e95]:
            - generic [ref=e96]: Safety
          - listitem [ref=e97]:
            - generic [ref=e98]: Contact
      - navigation "Legal" [ref=e99]:
        - heading "Legal" [level=2] [ref=e100]
        - list [ref=e101]:
          - listitem [ref=e102]:
            - generic [ref=e103]: Terms
          - listitem [ref=e104]:
            - generic [ref=e105]: Privacy
    - paragraph [ref=e107]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   6218
```

Context:

```text
          - listitem [ref=e89]:
            - generic [ref=e90]: About
          - listitem [ref=e91]:
            - generic [ref=e92]: How it works
      - navigation "Help" [ref=e93]:
        - heading "Help" [level=2] [ref=e94]
        - list [ref=e95]:
          - listitem [ref=e96]:
            - generic [ref=e97]: Safety
          - listitem [ref=e98]:
            - generic [ref=e99]: Contact
      - navigation "Legal" [ref=e100]:
        - heading "Legal" [level=2] [ref=e101]
        - list [ref=e102]:
          - listitem [ref=e103]:
            - generic [ref=e104]: Terms
          - listitem [ref=e105]:
            - generic [ref=e106]: Privacy
    - paragraph [ref=e108]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).
