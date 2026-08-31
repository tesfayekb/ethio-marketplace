# CI Status (auto-generated — do not edit by hand)

- Commit: `8ab9fd61586e5bf271bde51556fdf6d8058a0487` (short `8ab9fd6`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T07:05:24Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33365958196

## Jobs

| Job | Conclusion |
| --- | ---------- |
| E2E preflight (migration parity, staging) | success |
| Migration linter (with self-test) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| E2E email (serial, quota-bound) | success |
| E2E changed specs (fast lane) | failure |
| E2E shard 4/4 | success |
| E2E shard 3/4 | failure |
| E2E smoke tier | success |
| E2E shard 1/4 | failure |
| E2E shard 2/4 | success |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
