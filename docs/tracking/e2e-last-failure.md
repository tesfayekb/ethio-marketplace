# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33710526034
- Commit: `4e9087df88d3a596187ced45def3114764fd5660`
- Attempt: 1
- Written (UTC): 2026-09-03T03:24:27.423Z
- Passed: 346 · Skipped: 69 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · auth-signout.spec.ts › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f step-up authentication › MF-5 unenroll requires a fresh verification — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload — Error: expect(locator).toHaveAttribute(expected) failed

## admin-audit.spec.ts › U3 audit & security › AS-2 filters: an action filter narrows the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').locator('[data-testid^="audit-expand-"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').locator('[data-testid^="audit-expand-"]').first()

```

Context:

```text
          - listitem [ref=e130]:
            - generic [ref=e131]: About
          - listitem [ref=e132]:
            - generic [ref=e133]: How it works
      - navigation "Help" [ref=e134]:
        - heading "Help" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: Safety
          - listitem [ref=e139]:
            - generic [ref=e140]: Contact
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_audit ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_audit ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```
