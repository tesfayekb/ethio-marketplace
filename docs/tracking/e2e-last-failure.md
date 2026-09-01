# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33522883531
- Commit: `88aa7da5ac2b5aac0ab269d8ccf55ce96135b151`
- Attempt: 1
- Written (UTC): 2026-09-01T15:06:11.506Z
- Passed: 335 · Skipped: 65 · Failed: 3
- Sources without results: none

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-tse35p-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-tse35p-card')

```

Context:

```text
          - listitem [ref=e12099]:
            - generic [ref=e12100]: About
          - listitem [ref=e12101]:
            - generic [ref=e12102]: How it works
      - navigation "Help" [ref=e12103]:
        - heading "Help" [level=2] [ref=e12104]
        - list [ref=e12105]:
          - listitem [ref=e12106]:
            - generic [ref=e12107]: Safety
          - listitem [ref=e12108]:
            - generic [ref=e12109]: Contact
      - navigation "Legal" [ref=e12110]:
        - heading "Legal" [level=2] [ref=e12111]
        - list [ref=e12112]:
          - listitem [ref=e12113]:
            - generic [ref=e12114]: Terms
          - listitem [ref=e12115]:
            - generic [ref=e12116]: Privacy
    - paragraph [ref=e12118]: © 2026 ethio.com — All rights reserved.
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


[INC-109] url: http://127.0.0.1:4173/admin/users/8b98515c-b094-42cf-abe6-7216cd633a97
[INC-109] testids: admin-user-detail=1 user-detail-error=0 user-detail-loading=0
[INC-109] queries:
  ["auth-derived","admin","users","detail","8b98515c-b094-42cf-abe6-7216cd633a97"] status=success error=none dataUpdatedAt=1788275004235 dataLength=non-array
  ["auth-derived","admin","users","activity","8b98515c-b094-42cf-abe6-7216cd633a97"] status=success error=none dataUpdatedAt=1788275004341 dataLength=0
  ["auth-derived","admin","users","roles"] status=success error=none dataUpdatedAt=1788275004242 dataLength=1000
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

## admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-row-e2e-custom-wutkyt')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-row-e2e-custom-wutkyt')

```

Context:

```text
          - listitem [ref=e16197]:
            - generic [ref=e16198]: About
          - listitem [ref=e16199]:
            - generic [ref=e16200]: How it works
      - navigation "Help" [ref=e16201]:
        - heading "Help" [level=2] [ref=e16202]
        - list [ref=e16203]:
          - listitem [ref=e16204]:
            - generic [ref=e16205]: Safety
          - listitem [ref=e16206]:
            - generic [ref=e16207]: Contact
      - navigation "Legal" [ref=e16208]:
        - heading "Legal" [level=2] [ref=e16209]
        - list [ref=e16210]:
          - listitem [ref=e16211]:
            - generic [ref=e16212]: Terms
          - listitem [ref=e16213]:
            - generic [ref=e16214]: Privacy
    - paragraph [ref=e16216]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
