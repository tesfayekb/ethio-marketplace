# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33511926950
- Commit: `1b49a4c996752e93fbb0b85f92d2e7d699481880`
- Attempt: 1
- Written (UTC): 2026-09-01T13:18:58.037Z
- Passed: 334 · Skipped: 67 · Failed: 2
- Sources without results: none

## auth-signup.spec.ts › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle

- Source: `email`
- Project: `email-serial`

```text
Error: sign-up surfaced an error instead of check-email

expect(received).toBe(expected) // Object.is equality

Expected: "ok"
Received: "Something went wrong. Please try again."

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e75]:
            - generic [ref=e76]: About
          - listitem [ref=e77]:
            - generic [ref=e78]: How it works
      - navigation "Help" [ref=e79]:
        - heading "Help" [level=2] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]:
            - generic [ref=e83]: Safety
          - listitem [ref=e84]:
            - generic [ref=e85]: Contact
      - navigation "Legal" [ref=e86]:
        - heading "Legal" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: Terms
          - listitem [ref=e91]:
            - generic [ref=e92]: Privacy
    - paragraph [ref=e94]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('activity-user.status_change').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('activity-user.status_change').first()

```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: How it works
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
          - listitem [ref=e157]:
            - generic [ref=e158]: Contact
      - navigation "Legal" [ref=e159]:
        - heading "Legal" [level=2] [ref=e160]
        - list [ref=e161]:
          - listitem [ref=e162]:
            - generic [ref=e163]: Terms
          - listitem [ref=e164]:
            - generic [ref=e165]: Privacy
    - paragraph [ref=e167]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
