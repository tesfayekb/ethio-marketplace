# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/31999710563
- Commit: `e185042e12ddfeedf41868b3d0b25fa846f57427`
- Written (UTC): 2026-08-17T06:07:57.780Z
- Passed: 159 · Skipped: 34 · Failed: 6

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Deactivated"
Received: "Active"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" data-tsd-source="/src/features/admin/users/user-detail.tsx:126:15" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Active</div>
       - unexpected value "Active"

```

## admin-users.spec.ts › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered

- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-chip-moderator')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('role-chip-moderator')

```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Deactivated"
Received: "Active"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" data-tsd-source="/src/features/admin/users/user-detail.tsx:126:15" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Active</div>
       - unexpected value "Active"

```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Deactivated"
Received: "Active"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" data-tsd-source="/src/features/admin/users/user-detail.tsx:126:15" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Active</div>
       - unexpected value "Active"

```

## admin-users.spec.ts › U1 admin users › AU-4 roles: assign and remove, super_admin/user never offered

- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-chip-moderator')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('role-chip-moderator')

```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Deactivated"
Received: "Active"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" data-tsd-source="/src/features/admin/users/user-detail.tsx:126:15" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Active</div>
       - unexpected value "Active"

```
