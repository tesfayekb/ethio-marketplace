# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33531691023
- Commit: `a90f48fbddeb525f0b17419c6a71482a7711e6db`
- Attempt: 1
- Written (UTC): 2026-09-01T16:32:16.690Z
- Passed: 404 · Skipped: 65 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: moving up never changed the roster order

expect(received).toBe(expected) // Object.is equality

Expected: 9
Received: 10

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e647]:
            - generic [ref=e648]: About
          - listitem [ref=e649]:
            - generic [ref=e650]: How it works
      - navigation "Help" [ref=e651]:
        - heading "Help" [level=2] [ref=e652]
        - list [ref=e653]:
          - listitem [ref=e654]:
            - generic [ref=e655]: Safety
          - listitem [ref=e656]:
            - generic [ref=e657]: Contact
      - navigation "Legal" [ref=e658]:
        - heading "Legal" [level=2] [ref=e659]
        - list [ref=e660]:
          - listitem [ref=e661]:
            - generic [ref=e662]: Terms
          - listitem [ref=e663]:
            - generic [ref=e664]: Privacy
    - paragraph [ref=e666]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4f — publication gate governs language choice › TR-17: switcher options equal the DB public list; a non-public ?lang falls back

- Source: `changed`
- Project: `desktop-1280`

```text
Error: the admin-only fence language zxx-mo is never public

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

Context: context file not found for `admin-translations-U4f-publication-gate-governs-language-choice-TR-17-switcher-options-equal-the-DB-public-list-a-non-public-lang-falls-back-desktop-1280`

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
