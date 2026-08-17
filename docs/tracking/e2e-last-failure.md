# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32003876394
- Commit: `d98df0a698745e340971013e7790a8d8a4b25e05`
- Written (UTC): 2026-08-17T07:12:03.909Z
- Passed: 168 · Skipped: 35 · Failed: 2

## auth-signout.spec.ts › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI

- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: auth-derived queries survived the hard reset

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "[\"auth-derived\",\"my-permissions\"]",
+ ]
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI

- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Sign in' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('link', { name: 'Sign in' })

```
