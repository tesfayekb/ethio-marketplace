# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33166409697
- Commit: `1e2cbaa380e0814da2e9f81bf55d83f61ffb08de`
- Written (UTC): 2026-08-28T11:23:31.407Z
- Passed: 275 · Skipped: 66 · Failed: 12
- Sources without results: none

## shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: rail bottom must be min(viewport bottom, footer top)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    28
```

Context:

```text
          - listitem [ref=e198]:
            - generic [ref=e199]: About
          - listitem [ref=e200]:
            - generic [ref=e201]: How it works
      - navigation "Help" [ref=e202]:
        - heading "Help" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - generic [ref=e206]: Safety
          - listitem [ref=e207]:
            - generic [ref=e208]: Contact
      - navigation "Legal" [ref=e209]:
        - heading "Legal" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Terms
          - listitem [ref=e214]:
            - generic [ref=e215]: Privacy
    - paragraph [ref=e217]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## auth-callback.spec.ts › C-1: a fresh confirmation link signs the user in

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## auth-callback.spec.ts › C-3: an already-confirmed user gets the honest already-confirmed surface

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## settings.spec.ts › S-2: settings renders all three sections and guards the only method

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## settings.spec.ts › S-4: the password renders as its own method and cannot be removed alone

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-menu-sign-out')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-menu-sign-out')

```

Context:

```text
# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page didn't load" [level=1] [ref=e4]
  - paragraph [ref=e5]: Something went wrong on our end. You can try refreshing or head back home.
  - generic [ref=e6]:
    - button "Try again" [ref=e7]
    - link "Go home" [ref=e8] [cursor=pointer]:
      - /url: /
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Error: Minified React error #185; visit https://react.dev/errors/185 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at getRootForUpdatedFiber (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1788:90) at enqueueConcurrentHookUpdate (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1774:10) at dispatchSetStateInternal (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3641:13) at dispatchSetState (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3620:3) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:24285:4 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21379:20 at Array.map (<anonymous>) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21378:25 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) ×3
[client-error] console.error: Error: Minified React error #185; visit https://react.dev/errors/185 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at getRootForUpdatedFiber (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1788:90) at enqueueConcurrentHookUpdate (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1774:10) at dispatchSetStateInternal (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3641:13) at dispatchSetState (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3620:3) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:22054:63 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21379:20 at Array.map (<anonymous>) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21378:25 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) ×6
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Error: Minified React error #185; visit https://react.dev/errors/185 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at getRootForUpdatedFiber (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1788:90) at enqueueConcurrentHookUpdate (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1774:10) at dispatchSetStateInternal (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3641:13) at dispatchSetState (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3620:3) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:22054:63 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21379:20 at Array.map (<anonymous>) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21378:25 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) ×12
[client-error] console.error: Error: Minified React error #185; visit https://react.dev/errors/185 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at getRootForUpdatedFiber (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1788:90) at enqueueConcurrentHookUpdate (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1774:10) at dispatchSetStateInternal (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3641:13) at dispatchSetState (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3620:3) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:24285:4 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21379:20 at Array.map (<anonymous>) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21378:25 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) ×3
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: Error: Minified React error #185; visit https://react.dev/errors/185 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at getRootForUpdatedFiber (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1788:90) at enqueueConcurrentHookUpdate (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1774:10) at dispatchSetStateInternal (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3641:13) at dispatchSetState (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3620:3) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:22054:63 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21379:20 at Array.map (<anonymous>) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21378:25 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) ×6
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
[client-error] console.error: Error: Minified React error #185; visit https://react.dev/errors/185 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at getRootForUpdatedFiber (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1788:90) at enqueueConcurrentHookUpdate (http://127.0.0.1:4173/assets/index-1aM9aupH.js:1774:10) at dispatchSetStateInternal (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3641:13) at dispatchSetState (http://127.0.0.1:4173/assets/index-1aM9aupH.js:3620:3) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:22054:63 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21379:20 at Array.map (<anonymous>) at http://127.0.0.1:4173/assets/index-1aM9aupH.js:21378:25 at setRef (http://127.0.0.1:4173/assets/index-1aM9aupH.js:21372:40) ×3
```
