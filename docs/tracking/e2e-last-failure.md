# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32560854963
- Commit: `36df65bf1b3100a0498f980bd45001165bede691`
- Written (UTC): 2026-08-22T08:04:04.496Z
- Passed: 287 · Skipped: 63 · Failed: 3
- Sources without results: none

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

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

## auth-reset.spec.ts › R-3: a recovery link sets a new password, and the old one stops working

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
