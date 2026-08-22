# CI Status (auto-generated — do not edit by hand)

- Commit: `c7347b3af491c25c38d98993a8dfe66b2e36a53d` (short `c7347b3`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-22T06:59:44Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32558384326

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
