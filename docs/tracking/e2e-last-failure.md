# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32553625654
- Commit: `e75828ad92314ba4ce7a06d9b5d76a51bc36abc2`
- Written (UTC): 2026-08-22T05:24:25.728Z
- Passed: 263 · Skipped: 63 · Failed: 7
- Sources without results: none

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

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('role-row-admin')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('role-row-admin')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

## shell.spec.ts › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e)

- Source: `shard 2`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Test timeout of 60000ms exceeded.
```

## shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `shard 2`
- Project: `mobile-360`
- Failed step: (none recorded)

```text
Test timeout of 60000ms exceeded.
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 3`
- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByText('super_admin').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('super_admin').first()
    14 × locator resolved to <span title="super_admin" class="block truncate font-medium text-foreground" data-tsd-source="/src/features/admin/roles/roles-list.tsx:36:9">super_admin</span>
       - unexpected value "hidden"

```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out

- Source: `shard 4`
- Project: `desktop-1280`
- Failed step: (none recorded)

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'Sign out' })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('menuitem', { name: 'Sign out' })

```
