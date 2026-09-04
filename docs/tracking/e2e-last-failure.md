# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33833219383
- Commit: `4c78579453500ee18a3500f536b447e90de42125`
- Attempt: 1
- Written (UTC): 2026-09-04T03:40:48.966Z
- Passed: 449 · Skipped: 77 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "3/3"
Received string:    "Generating 0/3"
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
Error: expect(received).toContain(expected) // indexOf

Expected substring: "3/3"
Received string:    "Generating 0/3"
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
