# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33360837776
- Commit: `816e43eee79219a1bb21cce03992bab8bfe29616`
- Written (UTC): 2026-08-31T05:41:24.722Z
- Passed: 351 · Skipped: 66 · Failed: 4
- Sources without results: none

## admin-shell.spec.ts › Admin shell (U0) › A-3 regular user: /admin still redirects home

- Source: `shard 1`
- Project: `mobile-360`

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

## admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e492]:
            - generic [ref=e493]: About
          - listitem [ref=e494]:
            - generic [ref=e495]: How it works
      - navigation "Help" [ref=e496]:
        - heading "Help" [level=2] [ref=e497]
        - list [ref=e498]:
          - listitem [ref=e499]:
            - generic [ref=e500]: Safety
          - listitem [ref=e501]:
            - generic [ref=e502]: Contact
      - navigation "Legal" [ref=e503]:
        - heading "Legal" [level=2] [ref=e504]
        - list [ref=e505]:
          - listitem [ref=e506]:
            - generic [ref=e507]: Terms
          - listitem [ref=e508]:
            - generic [ref=e509]: Privacy
    - paragraph [ref=e511]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/(admin\/?)?$/
Received string:  "http://127.0.0.1:4173/admin/translations"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/translations"

```

Context:

```text
          - listitem [ref=e115]:
            - generic [ref=e116]: About
          - listitem [ref=e117]:
            - generic [ref=e118]: How it works
      - navigation "Help" [ref=e119]:
        - heading "Help" [level=2] [ref=e120]
        - list [ref=e121]:
          - listitem [ref=e122]:
            - generic [ref=e123]: Safety
          - listitem [ref=e124]:
            - generic [ref=e125]: Contact
      - navigation "Legal" [ref=e126]:
        - heading "Legal" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - generic [ref=e130]: Terms
          - listitem [ref=e131]:
            - generic [ref=e132]: Privacy
    - paragraph [ref=e134]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e716]:
            - generic [ref=e717]: About
          - listitem [ref=e718]:
            - generic [ref=e719]: How it works
      - navigation "Help" [ref=e720]:
        - heading "Help" [level=2] [ref=e721]
        - list [ref=e722]:
          - listitem [ref=e723]:
            - generic [ref=e724]: Safety
          - listitem [ref=e725]:
            - generic [ref=e726]: Contact
      - navigation "Legal" [ref=e727]:
        - heading "Legal" [level=2] [ref=e728]
        - list [ref=e729]:
          - listitem [ref=e730]:
            - generic [ref=e731]: Terms
          - listitem [ref=e732]:
            - generic [ref=e733]: Privacy
    - paragraph [ref=e735]: © 2026 ethio.com — All rights reserved.
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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
