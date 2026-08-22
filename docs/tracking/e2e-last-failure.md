# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32556704220
- Commit: `5206f517862bfa4f8cc5381dbc6c327d54d5fab9`
- Written (UTC): 2026-08-22T06:28:49.697Z
- Passed: 271 · Skipped: 66 · Failed: 2
- Sources without results: none

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-roles-RP-8-Amharic-no-horizontal-overflow-mobile-360`

## shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `shard 2`
- Project: `mobile-360`

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

Context: context file not found for `shell-location-row-is-present-on-Marketplace-and-absent-on-Account-mobile-360`
