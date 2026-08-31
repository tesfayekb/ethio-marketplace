# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33384995267
- Commit: `42f949b5fe0659f088c32cd918a71a54de955698`
- Attempt: 2
- Written (UTC): 2026-08-31T11:20:05.234Z
- Passed: 331 · Skipped: 66 · Failed: 4
- Sources without results: none

## admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('users-role-filter')
Expected: "e2e-custom-89vofi"
Received: "all"
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('users-role-filter')
    14 × locator resolved to <select id="admin-users-role" data-testid="users-role-filter" class="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground mt-1">…</select>
       - unexpected value "all"

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the fence's up control must be enabled before the move

expect(locator).toBeEnabled() failed

Locator: getByTestId('data-table-cards').getByTestId('lang-row-zxx-card').getByTestId('lang-up-zxx')
Expected: enabled
Timeout: 20000ms
Error: element(s) not found

Call log:
  - the fence's up control must be enabled before the move with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-row-zxx-card').getByTestId('lang-up-zxx')

```

Context:

```text
          - listitem [ref=e278]:
            - generic [ref=e279]: About
          - listitem [ref=e280]:
            - generic [ref=e281]: How it works
      - navigation "Help" [ref=e282]:
        - heading "Help" [level=2] [ref=e283]
        - list [ref=e284]:
          - listitem [ref=e285]:
            - generic [ref=e286]: Safety
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Legal" [ref=e289]:
        - heading "Legal" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Terms
          - listitem [ref=e294]:
            - generic [ref=e295]: Privacy
    - paragraph [ref=e297]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the absent key carries the orphan flag

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e279]:
            - generic [ref=e280]: About
          - listitem [ref=e281]:
            - generic [ref=e282]: How it works
      - navigation "Help" [ref=e283]:
        - heading "Help" [level=2] [ref=e284]
        - list [ref=e285]:
          - listitem [ref=e286]:
            - generic [ref=e287]: Safety
          - listitem [ref=e288]:
            - generic [ref=e289]: Contact
      - navigation "Legal" [ref=e290]:
        - heading "Legal" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Terms
          - listitem [ref=e295]:
            - generic [ref=e296]: Privacy
    - paragraph [ref=e298]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: the absent key carries the orphan flag

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

Context:

```text
          - listitem [ref=e408]:
            - generic [ref=e409]: About
          - listitem [ref=e410]:
            - generic [ref=e411]: How it works
      - navigation "Help" [ref=e412]:
        - heading "Help" [level=2] [ref=e413]
        - list [ref=e414]:
          - listitem [ref=e415]:
            - generic [ref=e416]: Safety
          - listitem [ref=e417]:
            - generic [ref=e418]: Contact
      - navigation "Legal" [ref=e419]:
        - heading "Legal" [level=2] [ref=e420]
        - list [ref=e421]:
          - listitem [ref=e422]:
            - generic [ref=e423]: Terms
          - listitem [ref=e424]:
            - generic [ref=e425]: Privacy
    - paragraph [ref=e427]: © 2026 ethio.com — All rights reserved.
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
