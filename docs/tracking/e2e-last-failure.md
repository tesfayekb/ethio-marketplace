# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32303998421
- Commit: `2295a79c716cfb9ef85be869ebbe003d03c9439d`
- Written (UTC): 2026-08-19T21:57:18.082Z
- Passed: 118 · Skipped: 32 · Failed: 5
- Sources without results: shard 1, shard 2, shard 4

## auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface

- Source: `smoke`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Test timeout of 60000ms exceeded.
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI

- Source: `smoke`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Test timeout of 60000ms exceeded.
```

## shell.spec.ts › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e)

- Source: `smoke`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Test timeout of 60000ms exceeded.
```

## shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `smoke`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog').getByTestId('rail-scroll')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('dialog').getByTestId('rail-scroll')

```

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

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
