# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33309613163
- Commit: `efe9d1c456369f6ccc29cf42d13368c57f346016`
- Written (UTC): 2026-08-30T11:54:48.424Z
- Passed: 347 · Skipped: 67 · Failed: 3
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "edited:አዲስ አበባ 33309613163-1"
Received: "approved:አዲስ አበባ"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: How it works
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
          - listitem [ref=e157]:
            - generic [ref=e158]: Contact
      - navigation "Legal" [ref=e159]:
        - heading "Legal" [level=2] [ref=e160]
        - list [ref=e161]:
          - listitem [ref=e162]:
            - generic [ref=e163]: Terms
          - listitem [ref=e164]:
            - generic [ref=e165]: Privacy
    - paragraph [ref=e167]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `changed`
- Project: `mobile-360`

```text
Error: the restore captured no revision

expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 4

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
      - listitem [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: Machine write
          - generic [ref=e35]: Machine
          - generic [ref=e36]: Machine
        - paragraph [ref=e37]: 10 seconds ago · e2e+33309613163-3-1-30-iq17wc
        - paragraph [ref=e38]: ⟪am⟫ History source
        - generic [ref=e39]:
          - paragraph [ref=e40]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e41] [cursor=pointer]
      - listitem [ref=e42]:
        - generic [ref=e43]:
          - generic [ref=e44]: Machine write
          - generic [ref=e45]: Untranslated
          - generic [ref=e46]: Human
        - paragraph [ref=e47]: 11 seconds ago · e2e+33309613163-changed-0-19-4jo0zr
        - paragraph [ref=e48]: (no value)
        - button "Clear instead" [ref=e49] [cursor=pointer]
    - status [ref=e50]: Restored.
```
```

## admin-translations.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `changed`
- Project: `desktop-1280`

```text
Error: the restore captured no revision

expect(received).toBe(expected) // Object.is equality

Expected: 3
Received: 4

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
      - listitem [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: Machine write
          - generic [ref=e35]: Machine
          - generic [ref=e36]: Machine
        - paragraph [ref=e37]: 11 seconds ago · e2e+33309613163-changed-1-19-vgkiqz
        - paragraph [ref=e38]: ⟪am⟫ History source
        - generic [ref=e39]:
          - paragraph [ref=e40]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e41] [cursor=pointer]
      - listitem [ref=e42]:
        - generic [ref=e43]:
          - generic [ref=e44]: Machine write
          - generic [ref=e45]: Untranslated
          - generic [ref=e46]: Human
        - paragraph [ref=e47]: 12 seconds ago · e2e+33309613163-3-1-30-iq17wc
        - paragraph [ref=e48]: (no value)
        - button "Clear instead" [ref=e49] [cursor=pointer]
    - status [ref=e50]: Restored.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
