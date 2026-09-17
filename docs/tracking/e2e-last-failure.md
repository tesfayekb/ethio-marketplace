# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35237218728
- Commit: `a96b5dae009428e9ca279d577be31d7b516e8b9d`
- Attempt: 1
- Written (UTC): 2026-09-17T15:12:36.371Z
- Passed: 802 · Skipped: 70 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 3, shard 4, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 54 user(s) owned by process 35237218728-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 33 user(s) owned by process 35237218728-4
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 54 user(s) owned by process 35237218728-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 39 user(s) owned by process 35237218728-changed
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-mobile-360`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: meta.png: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: upload 1: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 180000ms exceeded.
```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: window target at 1240

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 43
Received:    42.69871520996094
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: meta.png: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e237]:
            - generic [ref=e238]: About
          - listitem [ref=e239]:
            - generic [ref=e240]: How it works
      - navigation "Help" [ref=e241]:
        - heading "Help" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Safety
          - listitem [ref=e246]:
            - generic [ref=e247]: Contact
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - generic [ref=e252]: Terms
          - listitem [ref=e253]:
            - generic [ref=e254]: Privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: upload 1: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: How it works
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
          - listitem [ref=e274]:
            - generic [ref=e275]: Contact
      - navigation "Legal" [ref=e276]:
        - heading "Legal" [level=2] [ref=e277]
        - list [ref=e278]:
          - listitem [ref=e279]:
            - generic [ref=e280]: Terms
          - listitem [ref=e281]:
            - generic [ref=e282]: Privacy
    - paragraph [ref=e284]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: How it works
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Legal" [ref=e250]:
        - heading "Legal" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Terms
          - listitem [ref=e255]:
            - generic [ref=e256]: Privacy
    - paragraph [ref=e258]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-mobile-360`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `changed`
- Project: `mobile-360`

```text
Error: meta.png: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `changed`
- Project: `mobile-360`

```text
Error: upload 1: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `changed`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-desktop-1280`

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `changed`
- Project: `desktop-1280`

```text
Error: meta.png: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e237]:
            - generic [ref=e238]: About
          - listitem [ref=e239]:
            - generic [ref=e240]: How it works
      - navigation "Help" [ref=e241]:
        - heading "Help" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Safety
          - listitem [ref=e246]:
            - generic [ref=e247]: Contact
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - generic [ref=e252]: Terms
          - listitem [ref=e253]:
            - generic [ref=e254]: Privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `changed`
- Project: `desktop-1280`

```text
Error: upload 1: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: How it works
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
          - listitem [ref=e274]:
            - generic [ref=e275]: Contact
      - navigation "Legal" [ref=e276]:
        - heading "Legal" [level=2] [ref=e277]
        - list [ref=e278]:
          - listitem [ref=e279]:
            - generic [ref=e280]: Terms
          - listitem [ref=e281]:
            - generic [ref=e282]: Privacy
    - paragraph [ref=e284]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `changed`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: How it works
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
          - listitem [ref=e248]:
            - generic [ref=e249]: Contact
      - navigation "Legal" [ref=e250]:
        - heading "Legal" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Terms
          - listitem [ref=e255]:
            - generic [ref=e256]: Privacy
    - paragraph [ref=e258]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/upload/photo Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud. | at createSupabaseAdminClient (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/client.server-BDFkinc6.mjs:48:13) ×8
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/upload/photo Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud. | at createSupabaseAdminClient (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/client.server-BDFkinc6.mjs:48:13) ×8
```

## Client errors: shard 6

```text
[client-error] console.error: [client-error] gate fetch threw ×2
console.error: [client-error] gate fetch threw ×2
```

## Server errors: changed

```text
[WebServer] [ssr-error] /api/upload/photo Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY. Connect Supabase in Lovable Cloud. | at createSupabaseAdminClient (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/client.server-BDFkinc6.mjs:48:13) ×16
```

## Client errors: changed

```text
[client-error] console.error: [client-error] gate fetch threw ×4
console.error: [client-error] gate fetch threw ×4
```
