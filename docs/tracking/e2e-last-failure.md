# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33538054776
- Commit: `1b34449e8edbddd950ea5a723f8b70588c264995`
- Attempt: 1
- Written (UTC): 2026-09-01T17:40:56.990Z
- Passed: 385 · Skipped: 71 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Sources without results: none

## shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('account-menu-identity')
Expected substring: "e2e+33538054776-smoke-1-11-fnbk2p"
Received string:    "Signed in"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('account-menu-identity')
    14 × locator resolved to <div data-testid="account-menu-identity" class="px-2 py-1.5 text-sm font-semibold">Signed in</div>
       - unexpected value "Signed in"

```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Account menu" [active] [ref=e1]:
    - generic [ref=e2]: Signed in
    - separator [ref=e3]
    - menuitem "Profile" [ref=e4]:
      - img [ref=e5]
      - text: Profile
    - menuitem "Settings" [ref=e8]:
      - img [ref=e9]
      - text: Settings
    - separator [ref=e12]
    - menuitem "Sign out" [ref=e13]:
      - img [ref=e14]
      - text: Sign out
```
```

## admin-roles.spec.ts › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permission-locked-roles:update')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('role-permission-locked-roles:update')

```

Context:

```text
          - listitem [ref=e95]:
            - generic [ref=e96]: About
          - listitem [ref=e97]:
            - generic [ref=e98]: How it works
      - navigation "Help" [ref=e99]:
        - heading "Help" [level=2] [ref=e100]
        - list [ref=e101]:
          - listitem [ref=e102]:
            - generic [ref=e103]: Safety
          - listitem [ref=e104]:
            - generic [ref=e105]: Contact
      - navigation "Legal" [ref=e106]:
        - heading "Legal" [level=2] [ref=e107]
        - list [ref=e108]:
          - listitem [ref=e109]:
            - generic [ref=e110]: Terms
          - listitem [ref=e111]:
            - generic [ref=e112]: Privacy
    - paragraph [ref=e114]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e478]:
            - generic [ref=e479]: ስለ እኛ
          - listitem [ref=e480]:
            - generic [ref=e481]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e482]:
        - heading "እገዛ" [level=2] [ref=e483]
        - list [ref=e484]:
          - listitem [ref=e485]:
            - generic [ref=e486]: ደህንነት
          - listitem [ref=e487]:
            - generic [ref=e488]: ያግኙን
      - navigation "ሕጋዊ" [ref=e489]:
        - heading "ሕጋዊ" [level=2] [ref=e490]
        - list [ref=e491]:
          - listitem [ref=e492]:
            - generic [ref=e493]: ውሎች
          - listitem [ref=e494]:
            - generic [ref=e495]: ግላዊነት
    - paragraph [ref=e497]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
