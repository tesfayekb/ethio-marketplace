# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32131146452
- Commit: `b76e76b480d09b8206b6e51586265e4a2b257496`
- Written (UTC): 2026-08-18T11:25:05.678Z
- Passed: 248 · Skipped: 66 · Failed: 3
- Sources without results: none

## shell.spec.ts › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e)

- Source: `smoke`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('dialog').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByRole('dialog').getByTestId('panel-header-title')

```

## shell.spec.ts › panel header band (U0d) › the desktop rail switcher NAVIGATES to the panel's home (U0e)

- Source: `smoke`
- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Test timeout of 60000ms exceeded.
```

## auth-signup.spec.ts › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle

- Source: `shard 1`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: sign-up surfaced an error instead of check-email

expect(received).toBe(expected) // Object.is equality

Expected: "ok"
Received: "Something went wrong. Please try again."

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```
