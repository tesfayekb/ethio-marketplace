# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33726689483
- Commit: `f8e1976812d2f7d4069d074aa8d84ef2034a3e00`
- Attempt: 1
- Written (UTC): 2026-09-03T07:24:10.320Z
- Passed: 438 · Skipped: 76 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(page).toHaveURL(expected) failed

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-12 the reactivated row is still on the roster — [e2e:c2] lifecycle e2e-cat-4-2-3u3e0w: dom={"dialogs":["category-edit-dialog","category-verb-bar","category-dialog-cancel"],"openDialogs":1} db={"id":"1c6f3324-0d62-4009-9388-23fc6f46f6ab","slug":"e2e-cat-4-2-3u3e0w","is_active":true} clientErrors=[]
```

Context:

```text
        - generic [ref=e29]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e30]:
          - /placeholder: No expiry
      - generic [ref=e31]:
        - checkbox "Accepts listings" [checked] [ref=e32] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e33]:
        - checkbox "Price field enabled" [checked] [ref=e34] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Error: CT-12 the reactivated row is still on the roster — [e2e:c2] lifecycle e2e-cat-changed-2-cdxsc5: dom={"dialogs":["category-edit-dialog","category-verb-bar","category-dialog-cancel"],"openDialogs":1} db={"id":"bd18ac3b-f2eb-4fa3-8971-1dd515e8b913","slug":"e2e-cat-changed-2-cdxsc5","is_active":true} clientErrors=[]
```

Context:

```text
        - generic [ref=e29]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e30]:
          - /placeholder: No expiry
      - generic [ref=e31]:
        - checkbox "Accepts listings" [checked] [ref=e32] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e33]:
        - checkbox "Price field enabled" [checked] [ref=e34] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
