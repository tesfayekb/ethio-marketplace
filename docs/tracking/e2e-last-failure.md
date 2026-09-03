# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33812059203
- Commit: `7555ef4dc7fb9fb09b126beeb5abd8c3de86cccb`
- Attempt: 1
- Written (UTC): 2026-09-03T22:24:44.024Z
- Passed: 451 · Skipped: 75 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · category-nav.spec.ts › category selection navigates › C-1: clicking a category changes the URL and survives reload — Error: expect(locator).toHaveText(expected) failed

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e957]:
            - generic [ref=e958]: About
          - listitem [ref=e959]:
            - generic [ref=e960]: How it works
      - navigation "Help" [ref=e961]:
        - heading "Help" [level=2] [ref=e962]
        - list [ref=e963]:
          - listitem [ref=e964]:
            - generic [ref=e965]: Safety
          - listitem [ref=e966]:
            - generic [ref=e967]: Contact
      - navigation "Legal" [ref=e968]:
        - heading "Legal" [level=2] [ref=e969]
        - list [ref=e970]:
          - listitem [ref=e971]:
            - generic [ref=e972]: Terms
          - listitem [ref=e973]:
            - generic [ref=e974]: Privacy
    - paragraph [ref=e976]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e957]:
            - generic [ref=e958]: About
          - listitem [ref=e959]:
            - generic [ref=e960]: How it works
      - navigation "Help" [ref=e961]:
        - heading "Help" [level=2] [ref=e962]
        - list [ref=e963]:
          - listitem [ref=e964]:
            - generic [ref=e965]: Safety
          - listitem [ref=e966]:
            - generic [ref=e967]: Contact
      - navigation "Legal" [ref=e968]:
        - heading "Legal" [level=2] [ref=e969]
        - list [ref=e970]:
          - listitem [ref=e971]:
            - generic [ref=e972]: Terms
          - listitem [ref=e973]:
            - generic [ref=e974]: Privacy
    - paragraph [ref=e976]: © 2026 ethio.com — All rights reserved.
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
