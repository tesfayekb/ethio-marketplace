# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32019119115
- Commit: `474364877e6036b7a77fb8efed28d0ff0970975e`
- Written (UTC): 2026-08-18T11:03:57.998Z
- Passed: 251 · Skipped: 65 · Failed: 1
- Sources without results: none

## auth-signup.spec.ts › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle

- Source: `shard 1`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Check your email' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'Check your email' })

```
