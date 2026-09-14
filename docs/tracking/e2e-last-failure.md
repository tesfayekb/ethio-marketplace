# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34853889967
- Commit: `89b92bdd752c7b5f9fb4da42685a875a3023b66d`
- Attempt: 2
- Written (UTC): 2026-09-14T14:23:51.273Z
- Passed: 696 · Skipped: 69 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): shard 1, shard 4, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: TR-12 step 3: the bulk summary never rendered within 90 s (3 keys queued for scope zxx-de)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else — Error: expect(received).toBe(expected) // Object.is equality

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 29 user(s) owned by process 34853889967-1
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 29 user(s) owned by process 34853889967-4
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 15 user(s) owned by process 34853889967-changed
```

## admin-attributes.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-58 the swap undo behaved unexpectedly (INC-197 expects the one-pass collision until the undo is re-declared): {"batch_id":"05ad3ad6-4d3f-460f-b02f-bb657dc72d65","restored":2,"conflicted":0}

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 200
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

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-58 the swap undo behaved unexpectedly (INC-197 expects the one-pass collision until the undo is re-declared): {"batch_id":"4e04f369-1c51-4e53-abca-8e209b8f424f","restored":2,"conflicted":0}

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 200
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

## admin-attributes.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route

- Source: `changed`
- Project: `mobile-360`

```text
Error: AT-58 the swap undo behaved unexpectedly (INC-197 expects the one-pass collision until the undo is re-declared): {"batch_id":"bfd065bf-df87-45e3-a416-01f07de8b3a7","restored":2,"conflicted":0}

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 200
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
Error: AT-58 the swap undo behaved unexpectedly (INC-197 expects the one-pass collision until the undo is re-declared): {"batch_id":"bf7c9a5d-2017-41b1-8b8a-5459521487fd","restored":2,"conflicted":0}

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 200
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
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

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
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×4
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
