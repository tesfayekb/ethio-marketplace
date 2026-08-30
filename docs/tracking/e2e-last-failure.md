# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33290363499
- Commit: `fc916bd59ac9a8dfd8f50278164a5c05c833bbae`
- Written (UTC): 2026-08-30T03:38:33.806Z
- Passed: 304 · Skipped: 67 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translator-lang-am')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('translator-lang-am')

```

Context:

```text
          - listitem [ref=e172]:
            - generic [ref=e173]: About
          - listitem [ref=e174]:
            - generic [ref=e175]: How it works
      - navigation "Help" [ref=e176]:
        - heading "Help" [level=2] [ref=e177]
        - list [ref=e178]:
          - listitem [ref=e179]:
            - generic [ref=e180]: Safety
          - listitem [ref=e181]:
            - generic [ref=e182]: Contact
      - navigation "Legal" [ref=e183]:
        - heading "Legal" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Terms
          - listitem [ref=e188]:
            - generic [ref=e189]: Privacy
    - paragraph [ref=e191]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translator-lang-am')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('translator-lang-am')

```

Context:

```text
          - listitem [ref=e260]:
            - generic [ref=e261]: About
          - listitem [ref=e262]:
            - generic [ref=e263]: How it works
      - navigation "Help" [ref=e264]:
        - heading "Help" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Safety
          - listitem [ref=e269]:
            - generic [ref=e270]: Contact
      - navigation "Legal" [ref=e271]:
        - heading "Legal" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Terms
          - listitem [ref=e276]:
            - generic [ref=e277]: Privacy
    - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
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
