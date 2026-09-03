# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33766836180
- Commit: `56656102080fe9debedf255f500371cf16cbf2a0`
- Attempt: 1
- Written (UTC): 2026-09-03T14:38:53.349Z
- Passed: 447 · Skipped: 78 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations.spec.ts › U4b translations console › TR-5 filters live in the URL and survive a reload — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate overwrites — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e983]:
            - generic [ref=e984]: About
          - listitem [ref=e985]:
            - generic [ref=e986]: How it works
      - navigation "Help" [ref=e987]:
        - heading "Help" [level=2] [ref=e988]
        - list [ref=e989]:
          - listitem [ref=e990]:
            - generic [ref=e991]: Safety
          - listitem [ref=e992]:
            - generic [ref=e993]: Contact
      - navigation "Legal" [ref=e994]:
        - heading "Legal" [level=2] [ref=e995]
        - list [ref=e996]:
          - listitem [ref=e997]:
            - generic [ref=e998]: Terms
          - listitem [ref=e999]:
            - generic [ref=e1000]: Privacy
    - paragraph [ref=e1002]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).not.toBeNull()

Received: null

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e983]:
            - generic [ref=e984]: About
          - listitem [ref=e985]:
            - generic [ref=e986]: How it works
      - navigation "Help" [ref=e987]:
        - heading "Help" [level=2] [ref=e988]
        - list [ref=e989]:
          - listitem [ref=e990]:
            - generic [ref=e991]: Safety
          - listitem [ref=e992]:
            - generic [ref=e993]: Contact
      - navigation "Legal" [ref=e994]:
        - heading "Legal" [level=2] [ref=e995]
        - list [ref=e996]:
          - listitem [ref=e997]:
            - generic [ref=e998]: Terms
          - listitem [ref=e999]:
            - generic [ref=e1000]: Privacy
    - paragraph [ref=e1002]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed stage=persist category not found
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed stage=persist category not found ×2
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
