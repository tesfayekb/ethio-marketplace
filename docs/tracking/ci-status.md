# CI Status (auto-generated — do not edit by hand)

- Commit: `8ccc34afeee9b687cd31d1aaea8dae0bb2dedf6e` (short `8ccc34a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T04:59:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33293657404

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| Promote to main (fast-forward on green) | skipped |
