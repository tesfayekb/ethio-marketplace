# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32568376975
- Commit: `d01838ad261bd5dec57395c792109da8ddbd5115`
- Written (UTC): 2026-08-22T10:54:34.804Z
- Passed: 266 · Skipped: 63 · Failed: 24
- Sources without results: none

## auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface

- Source: `smoke`
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

## auth-signout.spec.ts › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI

- Source: `smoke`
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

## shell.spec.ts › app shell › mounts with header, rail slot and footer, logged out

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

```

Context:

```text
          - listitem [ref=e66]:
            - generic [ref=e67]: About
          - listitem [ref=e68]:
            - generic [ref=e69]: How it works
      - navigation "Help" [ref=e70]:
        - heading "Help" [level=2] [ref=e71]
        - list [ref=e72]:
          - listitem [ref=e73]:
            - generic [ref=e74]: Safety
          - listitem [ref=e75]:
            - generic [ref=e76]: Contact
      - navigation "Legal" [ref=e77]:
        - heading "Legal" [level=2] [ref=e78]
        - list [ref=e79]:
          - listitem [ref=e80]:
            - generic [ref=e81]: Terms
          - listitem [ref=e82]:
            - generic [ref=e83]: Privacy
    - paragraph [ref=e85]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › mounts with header, rail slot and footer, logged out

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: How it works
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Legal" [ref=e190]:
        - heading "Legal" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Terms
          - listitem [ref=e195]:
            - generic [ref=e196]: Privacy
    - paragraph [ref=e198]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › corner-block grid › the lockup's second line spans the wordmark exactly

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    17.015625
```

Context:

```text
          - listitem [ref=e120]:
            - generic [ref=e121]: About
          - listitem [ref=e122]:
            - generic [ref=e123]: How it works
      - navigation "Help" [ref=e124]:
        - heading "Help" [level=2] [ref=e125]
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e128]: Safety
          - listitem [ref=e129]:
            - generic [ref=e130]: Contact
      - navigation "Legal" [ref=e131]:
        - heading "Legal" [level=2] [ref=e132]
        - list [ref=e133]:
          - listitem [ref=e134]:
            - generic [ref=e135]: Terms
          - listitem [ref=e136]:
            - generic [ref=e137]: Privacy
    - paragraph [ref=e139]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e)

- Source: `smoke`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `shell-mobile-chrome-the-drawer-switcher-NAVIGATES-to-the-panel-s-home-U0e-mobile-360`

## shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `smoke`
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

- Source: `smoke`
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

## shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories

- Source: `smoke`
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

## shell.spec.ts › panel follows the route › admin panel is absent for a normal signed-in user

- Source: `smoke`
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

## shell.spec.ts › panel header band (U0d) › the desktop rail switcher NAVIGATES to the panel's home (U0e)

- Source: `smoke`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `shell-panel-header-band-U0d-the-desktop-rail-switcher-NAVIGATES-to-the-panel-s-home-U0e-desktop-1280`

## shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `smoke`
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

## shell.spec.ts › rail scroll regions (U0f) › footer never covers the rail's Sign out

- Source: `smoke`
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

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

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

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: How it works
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Legal" [ref=e190]:
        - heading "Legal" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Terms
          - listitem [ref=e195]:
            - generic [ref=e196]: Privacy
    - paragraph [ref=e198]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByText('ፈቃዶች').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ፈቃዶች').first()
    14 × locator resolved to <span class="truncate md:[html[data-rail=collapsed]_&]:hidden">ሚናዎች እና ፈቃዶች</span>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e376]:
            - generic [ref=e377]: ስለ እኛ
          - listitem [ref=e378]:
            - generic [ref=e379]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e380]:
        - heading "እገዛ" [level=2] [ref=e381]
        - list [ref=e382]:
          - listitem [ref=e383]:
            - generic [ref=e384]: ደህንነት
          - listitem [ref=e385]:
            - generic [ref=e386]: ያግኙን
      - navigation "ሕጋዊ" [ref=e387]:
        - heading "ሕጋዊ" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - generic [ref=e391]: ውሎች
          - listitem [ref=e392]:
            - generic [ref=e393]: ግላዊነት
    - paragraph [ref=e395]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

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

## shell.spec.ts › app shell › mounts with header, rail slot and footer, logged out

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

```

Context:

```text
          - listitem [ref=e66]:
            - generic [ref=e67]: About
          - listitem [ref=e68]:
            - generic [ref=e69]: How it works
      - navigation "Help" [ref=e70]:
        - heading "Help" [level=2] [ref=e71]
        - list [ref=e72]:
          - listitem [ref=e73]:
            - generic [ref=e74]: Safety
          - listitem [ref=e75]:
            - generic [ref=e76]: Contact
      - navigation "Legal" [ref=e77]:
        - heading "Legal" [level=2] [ref=e78]
        - list [ref=e79]:
          - listitem [ref=e80]:
            - generic [ref=e81]: Terms
          - listitem [ref=e82]:
            - generic [ref=e83]: Privacy
    - paragraph [ref=e85]: © 2026 ethio.com — All rights reserved.
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

## shell.spec.ts › app shell › mounts with header, rail slot and footer, logged out

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: How it works
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Legal" [ref=e190]:
        - heading "Legal" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Terms
          - listitem [ref=e195]:
            - generic [ref=e196]: Privacy
    - paragraph [ref=e198]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › panel follows the route › admin panel is absent for a normal signed-in user

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

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'ethio.com', exact: true })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'ethio.com', exact: true }) resolved to 3 elements:
    1) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active">…</a> aka getByTestId('shell-logo-cell').getByRole('link', { name: 'ethio.com' })
    2) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" class="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden active">…</a> aka locator('a').filter({ hasText: /^ethio\.com$/ })
    3) <a href="/" aria-current="page" data-status="active" aria-label="ethio.com" data-testid="topbar-wordmark" class="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex active">…</a> aka getByTestId('topbar-wordmark')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'ethio.com', exact: true })

```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: How it works
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Legal" [ref=e190]:
        - heading "Legal" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Terms
          - listitem [ref=e195]:
            - generic [ref=e196]: Privacy
    - paragraph [ref=e198]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: {"name":"Error"}
[client-error] console.error: Failed to load resource: the server responded with a status of 404 (Not Found)
```
