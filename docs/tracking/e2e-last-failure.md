# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34188197597
- Commit: `6199f0baab7354b111250d44b2676790870ce736`
- Attempt: 1
- Written (UTC): 2026-09-08T04:55:51.377Z
- Passed: 567 · Skipped: 67 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 4
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-20 a real-export round trip is a no-op — Error: AT-20 Discard wrote a batch
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 1052 rows for a 1053-row catalog
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-13 a scratch attribute appears in the Data scope roster as pending — Error: expect(received).toHaveLength(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-20 a real-export round trip is a no-op — Error: AT-20 Discard wrote a batch

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-18 Discard wrote a batch

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 2
Received array:  [{"id": "06a2c85f-f59f-4707-a3f7-5a6d77403791"}, {"id": "2be1f8e0-27fb-4a9a-ba6e-648dd0f5ff19"}]
```

Context:

```text
          - listitem [ref=e1170]:
            - generic [ref=e1171]: About
          - listitem [ref=e1172]:
            - generic [ref=e1173]: How it works
      - navigation "Help" [ref=e1174]:
        - heading "Help" [level=2] [ref=e1175]
        - list [ref=e1176]:
          - listitem [ref=e1177]:
            - generic [ref=e1178]: Safety
          - listitem [ref=e1179]:
            - generic [ref=e1180]: Contact
      - navigation "Legal" [ref=e1181]:
        - heading "Legal" [level=2] [ref=e1182]
        - list [ref=e1183]:
          - listitem [ref=e1184]:
            - generic [ref=e1185]: Terms
          - listitem [ref=e1186]:
            - generic [ref=e1187]: Privacy
    - paragraph [ref=e1189]: © 2026 ethio.com — All rights reserved.
```
```

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
