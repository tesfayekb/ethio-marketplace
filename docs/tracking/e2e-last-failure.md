# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32303998421
- Commit: `2295a79c716cfb9ef85be869ebbe003d03c9439d`
- Written (UTC): 2026-08-19T22:06:59.517Z
- Passed: 253 · Skipped: 63 · Failed: 1
- Sources without results: none

## auth-signup.spec.ts › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle

- Source: `email`
- Project: `email-serial`
- Failed step: (none recorded)

```text
Error: sign-up surfaced an error instead of check-email

expect(received).toBe(expected) // Object.is equality

Expected: "ok"
Received: "Something went wrong. Please try again."

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```
