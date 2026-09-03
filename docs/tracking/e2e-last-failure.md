# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33736131036
- Commit: `eaa0e46e3d09f5e2ab30cf8a8fa085ba4c160ad2`
- Attempt: 2
- Written (UTC): 2026-09-03T09:10:31.924Z
- Passed: 442 · Skipped: 73 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Retire category" [ref=e2]:
    - heading "Retire category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Retire category
      - paragraph [ref=e6]: The category is deactivated and its listings move to the category you choose.
      - paragraph [ref=e7]: No listings to move — the category will simply be hidden from browse and posting.
      - generic [ref=e8]:
        - button "Cancel" [active] [ref=e9] [cursor=pointer]
        - button "Retire" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Retire category" [ref=e2]:
    - heading "Retire category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Retire category
      - paragraph [ref=e6]: The category is deactivated and its listings move to the category you choose.
      - paragraph [ref=e7]: No listings to move — the category will simply be hidden from browse and posting.
      - generic [ref=e8]:
        - button "Cancel" [active] [ref=e9] [cursor=pointer]
        - button "Retire" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-12 the reactivated row is still on the roster — [e2e:c2] lifecycle e2e-cat-4-4-t7pk5k: dom={"dialogs":["category-edit-dialog","category-verb-bar","category-dialog-cancel"],"openDialogs":1} db={"id":"6f71470a-5626-4f89-b1a4-da707f71f587","slug":"e2e-cat-4-4-t7pk5k","is_active":true} clientErrors=[]
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

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Retire category" [ref=e2]:
    - heading "Retire category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Retire category
      - paragraph [ref=e6]: The category is deactivated and its listings move to the category you choose.
      - paragraph [ref=e7]: No listings to move — the category will simply be hidden from browse and posting.
      - generic [ref=e8]:
        - button "Cancel" [active] [ref=e9] [cursor=pointer]
        - button "Retire" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Retire category" [ref=e2]:
    - heading "Retire category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Retire category
      - paragraph [ref=e6]: The category is deactivated and its listings move to the category you choose.
      - paragraph [ref=e7]: No listings to move — the category will simply be hidden from browse and posting.
      - generic [ref=e8]:
        - button "Cancel" [active] [ref=e9] [cursor=pointer]
        - button "Retire" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Error: CT-12 the reactivated row is still on the roster — [e2e:c2] lifecycle e2e-cat-changed-6-i0epzu: dom={"dialogs":["category-edit-dialog","category-verb-bar","category-dialog-cancel"],"openDialogs":1} db={"id":"cf780aff-ba4f-4137-ab7a-dbfb497e03ad","slug":"e2e-cat-changed-6-i0epzu","is_active":true} clientErrors=[]
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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
