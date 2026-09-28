# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36494534782 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36494534782
- Commit: `4e2a9aadd25bcef675341457e6b21c485f367e09`
- Attempt: 1
- Written (UTC): 2026-09-28T23:08:58.159Z
- Post-test warnings: 9
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e470]:
            - generic [ref=e471]: About
          - listitem [ref=e472]:
            - generic [ref=e473]: How it works
      - navigation "Help" [ref=e474]:
        - heading "Help" [level=2] [ref=e475]
        - list [ref=e476]:
          - listitem [ref=e477]:
            - generic [ref=e478]: Safety
          - listitem [ref=e479]:
            - generic [ref=e480]: Contact
      - navigation "Legal" [ref=e481]:
        - heading "Legal" [level=2] [ref=e482]
        - list [ref=e483]:
          - listitem [ref=e484]:
            - generic [ref=e485]: Terms
          - listitem [ref=e486]:
            - generic [ref=e487]: Privacy
    - paragraph [ref=e489]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

206 line(s), 36 message(s): 6 off the allowlist, 30 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 102 | smoke, shard 2, shard 5, changed |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` | 4 | shard 1, shard 4 |
| `new row for relation <q> violates check constraint <q>` (quiet) | 4 | shard 3, shard 6, changed |
| `preview_failed permission denied` | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` | 2 | shard 1, shard 4 |
| `commit_failed step-up required: no verified factor` | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · new row for relation <q> violates check constraint <q> ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 102 · Sources: smoke, shard 2, shard 5, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### export_failed permission denied

- Count: 4 · Sources: shard 1, shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied
```

### preview_failed permission denied

- Count: 4 · Sources: shard 1, shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
```

### commit_failed duplicate key value violates unique constraint <q>

- Count: 2 · Sources: shard 1, shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

### commit_failed step-up required: no verified factor

- Count: 2 · Sources: shard 1, shard 4

```text
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
```

### strings emptyFile

- Count: 2 · Sources: shard 2, shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

20 page×project check(s): serious=2 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=1 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0 · home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=1 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0
