# Last E2E failure (auto-generated — do not edit by hand)

last E2E run local passed

- Run: local
- Commit: `local`
- Attempt: 1
- Written (UTC): 2026-09-28T22:47:43.193Z
- Post-test warnings: 1
- Flaky (passed on retry, DEC-030, non-gating): 0

## Server errors — census (DEC-083, non-gating)

Logs read: smoke · unavailable: shard 1

`shard 1`: log unavailable.

2 line(s), 1 message(s): 1 off the allowlist, 0 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 2 | smoke |

Quiet (allowlisted): none

Off the allowlist:

### listing not found

- Count: 2 · Sources: smoke

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke · unavailable: shard 1

`shard 1`: log unavailable.

10 page×project check(s): serious=1 critical=0 — home desktop-1280 serious=0 critical=0 · home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 mobile-360 serious=1 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0
