# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36375370211 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36375370211
- Commit: `6ebe04ea34d28918b7fddfbc421cc64f7439be71`
- Attempt: 1
- Written (UTC): 2026-09-28T04:07:54.200Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes — Error: [e2e:users] admin.createUser failed for e2e+36375370211-2-1-23-i5jenc@ethio-e2e.invalid: fetch failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · import-security.spec.ts › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole — TypeError: fetch failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state — Error: [e2e:u1f] granting admin failed: TypeError: fetch failed

## Flaky bodies (DEC-078)

### admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+36375370211-2-1-23-i5jenc@ethio-e2e.invalid: fetch failed
```

Context: context file not found for `admin-users-U1-admin-users-AU-10-edit-a-duplicate-alias-is-refused-inline-and-nothing-changes-mobile-360`

### import-security.spec.ts › IMPORT-GATE categories › IG-1 categories: malformed, foreign, oversized and unreadable files are refused whole

- Source: `shard 2`
- Project: `mobile-360`

```text
TypeError: fetch failed
```

Context: context file not found for `import-security-IMPORT-GATE-categories-IG-1-categories-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-mobile-360`

### mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:u1f] granting admin failed: TypeError: fetch failed
```

Context: context file not found for `mfa-stepup-U1f-4-step-up-freshness-MF-6-unenrolling-the-only-factor-drops-the-stepped-up-state-mobile-360`
