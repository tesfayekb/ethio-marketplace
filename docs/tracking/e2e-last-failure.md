# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33837792845
- Commit: `899537b1e5c8f813ae1ec8abed79c71968c11064`
- Attempt: 1
- Written (UTC): 2026-09-04T04:56:40.377Z
- Passed: 450 · Skipped: 75 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e190]:
            - generic [ref=e191]: About
          - listitem [ref=e192]:
            - generic [ref=e193]: How it works
      - navigation "Help" [ref=e194]:
        - heading "Help" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - generic [ref=e198]: Safety
          - listitem [ref=e199]:
            - generic [ref=e200]: Contact
      - navigation "Legal" [ref=e201]:
        - heading "Legal" [level=2] [ref=e202]
        - list [ref=e203]:
          - listitem [ref=e204]:
            - generic [ref=e205]: Terms
          - listitem [ref=e206]:
            - generic [ref=e207]: Privacy
    - paragraph [ref=e209]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e190]:
            - generic [ref=e191]: About
          - listitem [ref=e192]:
            - generic [ref=e193]: How it works
      - navigation "Help" [ref=e194]:
        - heading "Help" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - generic [ref=e198]: Safety
          - listitem [ref=e199]:
            - generic [ref=e200]: Contact
      - navigation "Legal" [ref=e201]:
        - heading "Legal" [level=2] [ref=e202]
        - list [ref=e203]:
          - listitem [ref=e204]:
            - generic [ref=e205]: Terms
          - listitem [ref=e206]:
            - generic [ref=e207]: Privacy
    - paragraph [ref=e209]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
