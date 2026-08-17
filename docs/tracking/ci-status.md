# CI Status (auto-generated — do not edit by hand)

- Commit: `474364877e6036b7a77fb8efed28d0ff0970975e` (short `4743648`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-17T10:13:57Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32019119115

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
