# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36283321647 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36283321647
- Commit: `21a430a3557f825d301d4e9004bf785fbe97eb95`
- Attempt: 1
- Written (UTC): 2026-09-27T00:55:45.526Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 3

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name — Error: [e2e:u4d] scratch location insert failed: TypeError: fetch failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · import-security.spec.ts › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole — TypeError: fetch failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-7 a verification older than the window re-prompts — Error: [e2e:u1f] granting admin failed: TypeError: fetch failed

## Flaky bodies (DEC-078)

### admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:u4d] scratch location insert failed: TypeError: fetch failed
```

Context: context file not found for `admin-translations-data-U4b-translations-console-TR-14-the-Data-scope-edits-and-approves-a-location-name-mobile-360`

### import-security.spec.ts › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole

- Source: `shard 2`
- Project: `mobile-360`

```text
TypeError: fetch failed
```

Context: context file not found for `import-security-IMPORT-GATE-locations-locations-IG-1-locations-locations-malformed-foreign-oversized-and-unreadable-files-are-refused-whole-mobile-360`

### mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-7 a verification older than the window re-prompts

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:u1f] granting admin failed: TypeError: fetch failed
```

Context: context file not found for `mfa-stepup-U1f-4-step-up-freshness-MF-7-a-verification-older-than-the-window-re-prompts-mobile-360`
