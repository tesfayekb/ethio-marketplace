# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34837657033
- Commit: `77c59aa247c055ea6d042b545dc8ef5db29755dc`
- Attempt: 1
- Written (UTC): 2026-09-14T11:31:08.268Z
- Passed: 699 · Skipped: 69 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 1, changed
- Sources without results: none

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 29 user(s) owned by process 34837657033-1
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 15 user(s) owned by process 34837657033-changed
```

## admin-attributes.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"server error","message":"duplicate key value violates unique constraint \"category_attribute_links_card_rank_unique\"","detail":"Key (category_id, card_rank)=(c2e7af2e-cd50-4943-9921-280e48725c7f, 3) already exists."}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"error":"server error","message":"duplicate key value violates unique constraint \"category_attribute_links_card_rank_unique\"","detail":"Key (category_id, card_rank)=(9ab43aee-916c-4057-97ee-dfcb3d91cea5, 3) already exists."}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"error":"server error","message":"duplicate key value violates unique constraint \"category_attribute_links_card_rank_unique\"","detail":"Key (category_id, card_rank)=(1a3f9c5c-c854-4ab5-a2a9-609b044de535, 3) already exists."}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e861]:
            - generic [ref=e862]: About
          - listitem [ref=e863]:
            - generic [ref=e864]: How it works
      - navigation "Help" [ref=e865]:
        - heading "Help" [level=2] [ref=e866]
        - list [ref=e867]:
          - listitem [ref=e868]:
            - generic [ref=e869]: Safety
          - listitem [ref=e870]:
            - generic [ref=e871]: Contact
      - navigation "Legal" [ref=e872]:
        - heading "Legal" [level=2] [ref=e873]
        - list [ref=e874]:
          - listitem [ref=e875]:
            - generic [ref=e876]: Terms
          - listitem [ref=e877]:
            - generic [ref=e878]: Privacy
    - paragraph [ref=e880]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
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
[WebServer] [ssr-error] /api/admin/attributes/import undo_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×2
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×4
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile ×2
[WebServer] [ssr-error] /api/admin/attributes/import undo_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique" ×4
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
