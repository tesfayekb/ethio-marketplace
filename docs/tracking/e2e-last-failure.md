# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33957249467
- Commit: `d2b6ace66793eb81371c39d861a89ecbdc0715ef`
- Attempt: 1
- Written (UTC): 2026-09-05T09:22:00.202Z
- Passed: 311 · Skipped: 71 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 6
- Sources without results: shard 1, shard 4

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › feed grid reflows without clipping and never overflows — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-users.spec.ts › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing — Error: [e2e:u1] granting admin failed: canceling statement due to statement timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · category-image-routes.spec.ts › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp — Error: {"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"}
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Error: expect(locator).toHaveText(expected) failed

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [ref=e52] [cursor=pointer]
    - button "Close" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
      - generic [ref=e57]: Close
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
