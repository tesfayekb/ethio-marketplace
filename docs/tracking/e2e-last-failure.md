# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33368858450
- Commit: `102463e2cf40453728dbca5d4c3ebc4b0cba1326`
- Attempt: 1
- Written (UTC): 2026-08-31T07:43:10.811Z
- Passed: 423 · Skipped: 97 · Failed: 13
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-33368858450-1-1-mobile-360-0-tr8').getByTestId('string-saved-e2e-scratch-33368858450-1-1-mobile-360-0-tr8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-33368858450-1-1-mobile-360-0-tr8').getByTestId('string-saved-e2e-scratch-33368858450-1-1-mobile-360-0-tr8')

```

Context:

```text
          - listitem [ref=e117]:
            - generic [ref=e118]: About
          - listitem [ref=e119]:
            - generic [ref=e120]: How it works
      - navigation "Help" [ref=e121]:
        - heading "Help" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Safety
          - listitem [ref=e126]:
            - generic [ref=e127]: Contact
      - navigation "Legal" [ref=e128]:
        - heading "Legal" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Terms
          - listitem [ref=e133]:
            - generic [ref=e134]: Privacy
    - paragraph [ref=e136]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: bulk AI never landed for e2e.scratch.33368858450-1-1-mobile-360-2-tr12-b1

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true"
Received: "approved|true|true"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e498]:
            - generic [ref=e499]: About
          - listitem [ref=e500]:
            - generic [ref=e501]: How it works
      - navigation "Help" [ref=e502]:
        - heading "Help" [level=2] [ref=e503]
        - list [ref=e504]:
          - listitem [ref=e505]:
            - generic [ref=e506]: Safety
          - listitem [ref=e507]:
            - generic [ref=e508]: Contact
      - navigation "Legal" [ref=e509]:
        - heading "Legal" [level=2] [ref=e510]
        - list [ref=e511]:
          - listitem [ref=e512]:
            - generic [ref=e513]: Terms
          - listitem [ref=e514]:
            - generic [ref=e515]: Privacy
    - paragraph [ref=e517]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## settings.spec.ts › S-2: settings renders all three sections and guards the only method

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('account-menu-identity')
Expected substring: "e2e+33368858450-2-1-6-avzles"
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

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('account-menu-identity')
Expected substring: "e2e+33368858450-3-2964-1-qzdgcn"
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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e377]:
            - generic [ref=e378]: About
          - listitem [ref=e379]:
            - generic [ref=e380]: How it works
      - navigation "Help" [ref=e381]:
        - heading "Help" [level=2] [ref=e382]
        - list [ref=e383]:
          - listitem [ref=e384]:
            - generic [ref=e385]: Safety
          - listitem [ref=e386]:
            - generic [ref=e387]: Contact
      - navigation "Legal" [ref=e388]:
        - heading "Legal" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - generic [ref=e392]: Terms
          - listitem [ref=e393]:
            - generic [ref=e394]: Privacy
    - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## rbac.spec.ts › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/admin"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin"

```

Context:

```text
          - listitem [ref=e110]:
            - generic [ref=e111]: About
          - listitem [ref=e112]:
            - generic [ref=e113]: How it works
      - navigation "Help" [ref=e114]:
        - heading "Help" [level=2] [ref=e115]
        - list [ref=e116]:
          - listitem [ref=e117]:
            - generic [ref=e118]: Safety
          - listitem [ref=e119]:
            - generic [ref=e120]: Contact
      - navigation "Legal" [ref=e121]:
        - heading "Legal" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Terms
          - listitem [ref=e126]:
            - generic [ref=e127]: Privacy
    - paragraph [ref=e129]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33368858450-changed-changed-mobile-360-0-tr11-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33368858450-changed-changed-mobile-360-0-tr11-card')

```

Context:

```text
          - listitem [ref=e117]:
            - generic [ref=e118]: About
          - listitem [ref=e119]:
            - generic [ref=e120]: How it works
      - navigation "Help" [ref=e121]:
        - heading "Help" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Safety
          - listitem [ref=e126]:
            - generic [ref=e127]: Contact
      - navigation "Legal" [ref=e128]:
        - heading "Legal" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Terms
          - listitem [ref=e133]:
            - generic [ref=e134]: Privacy
    - paragraph [ref=e136]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33368858450-changed-changed-desktop-1280-2-tr4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33368858450-changed-changed-desktop-1280-2-tr4')

```

Context:

```text
          - listitem [ref=e204]:
            - generic [ref=e205]: About
          - listitem [ref=e206]:
            - generic [ref=e207]: How it works
      - navigation "Help" [ref=e208]:
        - heading "Help" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - generic [ref=e212]: Safety
          - listitem [ref=e213]:
            - generic [ref=e214]: Contact
      - navigation "Legal" [ref=e215]:
        - heading "Legal" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - generic [ref=e219]: Terms
          - listitem [ref=e220]:
            - generic [ref=e221]: Privacy
    - paragraph [ref=e223]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-33368858450-changed-changed-desktop-1280-3-tr11').getByTestId('string-saved-e2e-scratch-33368858450-changed-changed-desktop-1280-3-tr11')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-33368858450-changed-changed-desktop-1280-3-tr11').getByTestId('string-saved-e2e-scratch-33368858450-changed-changed-desktop-1280-3-tr11')

```

Context:

```text
          - listitem [ref=e204]:
            - generic [ref=e205]: About
          - listitem [ref=e206]:
            - generic [ref=e207]: How it works
      - navigation "Help" [ref=e208]:
        - heading "Help" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - generic [ref=e212]: Safety
          - listitem [ref=e213]:
            - generic [ref=e214]: Contact
      - navigation "Legal" [ref=e215]:
        - heading "Legal" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - generic [ref=e219]: Terms
          - listitem [ref=e220]:
            - generic [ref=e221]: Privacy
    - paragraph [ref=e223]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e377]:
            - generic [ref=e378]: About
          - listitem [ref=e379]:
            - generic [ref=e380]: How it works
      - navigation "Help" [ref=e381]:
        - heading "Help" [level=2] [ref=e382]
        - list [ref=e383]:
          - listitem [ref=e384]:
            - generic [ref=e385]: Safety
          - listitem [ref=e386]:
            - generic [ref=e387]: Contact
      - navigation "Legal" [ref=e388]:
        - heading "Legal" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - generic [ref=e392]: Terms
          - listitem [ref=e393]:
            - generic [ref=e394]: Privacy
    - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/admin"
Timeout: 8000ms

Call log:
  - Expect "toHaveURL" with timeout 8000ms
    12 × unexpected value "http://127.0.0.1:4173/admin"

```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
