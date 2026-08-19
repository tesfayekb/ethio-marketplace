# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32303998421
- Commit: `2295a79c716cfb9ef85be869ebbe003d03c9439d`
- Written (UTC): 2026-08-19T22:24:00.024Z
- Passed: 253 · Skipped: 63 · Failed: 1
- Sources without results: none

## auth-signup.spec.ts › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle

- Source: `email`
- Project: `email-serial`
- Failed step: (none recorded)

```text
Error: AUTH RATE LIMIT hit — staging email quota exhausted; retry after the window. Raw: 429 over_email_send_rate_limit: For security purposes, you can only request this after 57 seconds.

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```
