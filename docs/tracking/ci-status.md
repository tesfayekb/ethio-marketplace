# CI Status (auto-generated — do not edit by hand)

- Commit: `816e43eee79219a1bb21cce03992bab8bfe29616` (short `816e43e`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T05:32:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33360837776

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| Promote to main (fast-forward on green) | skipped |
