# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36296146076 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36296146076
- Commit: `3955339b1cbd0864fcb9553c5cdcfb88d02b4124`
- Attempt: 2
- Written (UTC): 2026-09-27T05:23:43.277Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node — Error: [e2e:l2b] destroying QQ failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l2b] destroying QQ failed at country row: update or delete on table "countries" violates foreign key constraint "locations_country_code_fkey" on table "locations"
```

Context: context file not found for `shell-L4b-location-picker-LS-11-picking-a-second-market-renders-its-own-tree-and-saves-its-own-node-mobile-360`
