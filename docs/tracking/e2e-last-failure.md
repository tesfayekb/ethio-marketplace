# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33563901040
- Commit: `320dded0eb23f6f7f5aeca2b81969513ed8fb138`
- Attempt: 1
- Written (UTC): 2026-09-01T22:07:22.806Z
- Passed: 321 · Skipped: 66 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-audit')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-audit')

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "super-admin only"
Received string:    ""
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-roles')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-roles')

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-translations')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-translations')

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('user-row-6eaffb46-bb8c-439a-a1d3-63333dfedd07-card')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('user-row-6eaffb46-bb8c-439a-a1d3-63333dfedd07-card')

```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-deactivated-banner')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-deactivated-banner')

```

Context:

```text
          - listitem [ref=e139]:
            - generic [ref=e140]: About
          - listitem [ref=e141]:
            - generic [ref=e142]: How it works
      - navigation "Help" [ref=e143]:
        - heading "Help" [level=2] [ref=e144]
        - list [ref=e145]:
          - listitem [ref=e146]:
            - generic [ref=e147]: Safety
          - listitem [ref=e148]:
            - generic [ref=e149]: Contact
      - navigation "Legal" [ref=e150]:
        - heading "Legal" [level=2] [ref=e151]
        - list [ref=e152]:
          - listitem [ref=e153]:
            - generic [ref=e154]: Terms
          - listitem [ref=e155]:
            - generic [ref=e156]: Privacy
    - paragraph [ref=e158]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "not your listing"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')

```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /step-up required/i
Received string:  "permission denied"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-audit')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-audit')

```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self, super-admin target, and a non-super caller

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "super-admin only"
Received string:    ""
```

Context:

```text
          - listitem [ref=e216]:
            - generic [ref=e217]: About
          - listitem [ref=e218]:
            - generic [ref=e219]: How it works
      - navigation "Help" [ref=e220]:
        - heading "Help" [level=2] [ref=e221]
        - list [ref=e222]:
          - listitem [ref=e223]:
            - generic [ref=e224]: Safety
          - listitem [ref=e225]:
            - generic [ref=e226]: Contact
      - navigation "Legal" [ref=e227]:
        - heading "Legal" [level=2] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - generic [ref=e231]: Terms
          - listitem [ref=e232]:
            - generic [ref=e233]: Privacy
    - paragraph [ref=e235]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-roles')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-roles')

```

Context:

```text
          - listitem [ref=e134]:
            - generic [ref=e135]: About
          - listitem [ref=e136]:
            - generic [ref=e137]: How it works
      - navigation "Help" [ref=e138]:
        - heading "Help" [level=2] [ref=e139]
        - list [ref=e140]:
          - listitem [ref=e141]:
            - generic [ref=e142]: Safety
          - listitem [ref=e143]:
            - generic [ref=e144]: Contact
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: Terms
          - listitem [ref=e150]:
            - generic [ref=e151]: Privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-translations')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-translations')

```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('user-row-70b4be0a-94c8-48f9-b47b-0f7a13407f3e')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('user-row-70b4be0a-94c8-48f9-b47b-0f7a13407f3e')

```

Context:

```text
          - listitem [ref=e134]:
            - generic [ref=e135]: About
          - listitem [ref=e136]:
            - generic [ref=e137]: How it works
      - navigation "Help" [ref=e138]:
        - heading "Help" [level=2] [ref=e139]
        - list [ref=e140]:
          - listitem [ref=e141]:
            - generic [ref=e142]: Safety
          - listitem [ref=e143]:
            - generic [ref=e144]: Contact
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - generic [ref=e149]: Terms
          - listitem [ref=e150]:
            - generic [ref=e151]: Privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-deactivated-banner')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-deactivated-banner')

```

Context:

```text
          - listitem [ref=e227]:
            - generic [ref=e228]: About
          - listitem [ref=e229]:
            - generic [ref=e230]: How it works
      - navigation "Help" [ref=e231]:
        - heading "Help" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Safety
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Legal" [ref=e238]:
        - heading "Legal" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Terms
          - listitem [ref=e243]:
            - generic [ref=e244]: Privacy
    - paragraph [ref=e246]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "not your listing"
```

Context:

```text
          - listitem [ref=e216]:
            - generic [ref=e217]: About
          - listitem [ref=e218]:
            - generic [ref=e219]: How it works
      - navigation "Help" [ref=e220]:
        - heading "Help" [level=2] [ref=e221]
        - list [ref=e222]:
          - listitem [ref=e223]:
            - generic [ref=e224]: Safety
          - listitem [ref=e225]:
            - generic [ref=e226]: Contact
      - navigation "Legal" [ref=e227]:
        - heading "Legal" [level=2] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - generic [ref=e231]: Terms
          - listitem [ref=e232]:
            - generic [ref=e233]: Privacy
    - paragraph [ref=e235]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')

```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /step-up required/i
Received string:  "permission denied"
```

Context:

```text
          - listitem [ref=e212]:
            - generic [ref=e213]: About
          - listitem [ref=e214]:
            - generic [ref=e215]: How it works
      - navigation "Help" [ref=e216]:
        - heading "Help" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Safety
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Terms
          - listitem [ref=e228]:
            - generic [ref=e229]: Privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×18
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×8
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×14
```
