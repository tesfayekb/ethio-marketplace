# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34319598201
- Commit: `fa023bcab7fccdc34d80a4414caec390bf0b8813`
- Attempt: 1
- Written (UTC): 2026-09-09T07:28:17.839Z
- Passed: 439 · Skipped: 40 · Failed: 4
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 4
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories-images.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e208]:
            - generic [ref=e209]: About
          - listitem [ref=e210]:
            - generic [ref=e211]: How it works
      - navigation "Help" [ref=e212]:
        - heading "Help" [level=2] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]:
            - generic [ref=e216]: Safety
          - listitem [ref=e217]:
            - generic [ref=e218]: Contact
      - navigation "Legal" [ref=e219]:
        - heading "Legal" [level=2] [ref=e220]
        - list [ref=e221]:
          - listitem [ref=e222]:
            - generic [ref=e223]: Terms
          - listitem [ref=e224]:
            - generic [ref=e225]: Privacy
    - paragraph [ref=e227]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `mobile-360`

```text
Error: the strings list never rendered all four seeded TR-19 rows

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-mo
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
(no __ethioQueryClient — not an E2E build?)
```

Context:

```text
          - listitem [ref=e506]:
            - generic [ref=e507]: About
          - listitem [ref=e508]:
            - generic [ref=e509]: How it works
      - navigation "Help" [ref=e510]:
        - heading "Help" [level=2] [ref=e511]
        - list [ref=e512]:
          - listitem [ref=e513]:
            - generic [ref=e514]: Safety
          - listitem [ref=e515]:
            - generic [ref=e516]: Contact
      - navigation "Legal" [ref=e517]:
        - heading "Legal" [level=2] [ref=e518]
        - list [ref=e519]:
          - listitem [ref=e520]:
            - generic [ref=e521]: Terms
          - listitem [ref=e522]:
            - generic [ref=e523]: Privacy
    - paragraph [ref=e525]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: the strings list never rendered all four seeded TR-19 rows

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-de
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
(query cache read threw: page.evaluate: Execution context was destroyed, most likely because of a navigation)
```

Context:

```text
          - listitem [ref=e739]:
            - generic [ref=e740]: About
          - listitem [ref=e741]:
            - generic [ref=e742]: How it works
      - navigation "Help" [ref=e743]:
        - heading "Help" [level=2] [ref=e744]
        - list [ref=e745]:
          - listitem [ref=e746]:
            - generic [ref=e747]: Safety
          - listitem [ref=e748]:
            - generic [ref=e749]: Contact
      - navigation "Legal" [ref=e750]:
        - heading "Legal" [level=2] [ref=e751]
        - list [ref=e752]:
          - listitem [ref=e753]:
            - generic [ref=e754]: Terms
          - listitem [ref=e755]:
            - generic [ref=e756]: Privacy
    - paragraph [ref=e758]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('lang-public-zxa')
Expected: visible
Error: strict mode violation: getByTestId('lang-public-zxa') resolved to 2 elements:
    1) <button disabled value="on" type="button" role="switch" data-disabled="" aria-checked="false" data-state="unchecked" data-testid="lang-public-zxa" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 d…>…</button> aka getByTestId('lang-row-zxa-card').getByTestId('lang-public-zxa')
    2) <button disabled value="on" type="button" role="switch" data-disabled="" aria-checked="false" data-state="unchecked" data-testid="lang-public-zxa" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 d…>…</button> aka getByTestId('lang-row-zxa').getByTestId('lang-public-zxa')

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('lang-public-zxa')

```

Context:

```text
          - listitem [ref=e797]:
            - generic [ref=e798]: About
          - listitem [ref=e799]:
            - generic [ref=e800]: How it works
      - navigation "Help" [ref=e801]:
        - heading "Help" [level=2] [ref=e802]
        - list [ref=e803]:
          - listitem [ref=e804]:
            - generic [ref=e805]: Safety
          - listitem [ref=e806]:
            - generic [ref=e807]: Contact
      - navigation "Legal" [ref=e808]:
        - heading "Legal" [level=2] [ref=e809]
        - list [ref=e810]:
          - listitem [ref=e811]:
            - generic [ref=e812]: Terms
          - listitem [ref=e813]:
            - generic [ref=e814]: Privacy
    - paragraph [ref=e816]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
