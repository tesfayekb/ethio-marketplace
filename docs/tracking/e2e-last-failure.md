# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33296389104
- Commit: `cd40bf5e74c2e68a6f4b7d0bda2b821d263bf3cd`
- Written (UTC): 2026-08-30T06:21:35.830Z
- Passed: 312 · Skipped: 67 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4c] revision read failed: column ui_translation_revisions.created_at does not exist
```

Context:

```text
          - listitem [ref=e142]:
            - generic [ref=e143]: About
          - listitem [ref=e144]:
            - generic [ref=e145]: How it works
      - navigation "Help" [ref=e146]:
        - heading "Help" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Safety
          - listitem [ref=e151]:
            - generic [ref=e152]: Contact
      - navigation "Legal" [ref=e153]:
        - heading "Legal" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Terms
          - listitem [ref=e158]:
            - generic [ref=e159]: Privacy
    - paragraph [ref=e161]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] revision read failed: column ui_translation_revisions.created_at does not exist
```

Context:

```text
          - listitem [ref=e247]:
            - generic [ref=e248]: About
          - listitem [ref=e249]:
            - generic [ref=e250]: How it works
      - navigation "Help" [ref=e251]:
        - heading "Help" [level=2] [ref=e252]
        - list [ref=e253]:
          - listitem [ref=e254]:
            - generic [ref=e255]: Safety
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Terms
          - listitem [ref=e263]:
            - generic [ref=e264]: Privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
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
