# CI Status (auto-generated — do not edit by hand)

- Commit: `42f949b5fe0659f088c32cd918a71a54de955698` (short `42f949b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T11:01:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33384995267

## Jobs

| Job | Conclusion |
| --- | ---------- |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
