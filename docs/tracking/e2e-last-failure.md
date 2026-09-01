# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33513615863
- Commit: `ff0f1193cb85673ef24388e58d1cc0dab9c84818`
- Attempt: 1
- Written (UTC): 2026-09-01T13:36:38.141Z
- Passed: 398 · Skipped: 66 · Failed: 3
- Sources without results: none

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   7181
```

Context:

```text
          - listitem [ref=e210]:
            - generic [ref=e211]: About
          - listitem [ref=e212]:
            - generic [ref=e213]: How it works
      - navigation "Help" [ref=e214]:
        - heading "Help" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: Safety
          - listitem [ref=e219]:
            - generic [ref=e220]: Contact
      - navigation "Legal" [ref=e221]:
        - heading "Legal" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - generic [ref=e225]: Terms
          - listitem [ref=e226]:
            - generic [ref=e227]: Privacy
    - paragraph [ref=e229]: © 2026 ethio.com — All rights reserved.
```
```

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

## admin-users.spec.ts › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('activity-role.assign').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('activity-role.assign').first()

```

Context: context file not found for `admin-users-U1-admin-users-AU-4-roles-assign-and-remove-super_admin-user-never-offered-mobile-360`

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2F127.0.0.1%3A4173%2Fauth%2Fcallback ({"code":"unexpected_failure","message":"Error sending confirmation email"})
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
