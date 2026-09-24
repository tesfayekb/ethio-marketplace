# CI Status (auto-generated — do not edit by hand)

- Commit: `28a4439e65fb0b3240de0077665ae9148af5fbbf` (short `28a4439`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-24T09:22:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35980518512

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | failure |
| E2E preflight (migration parity, staging) | success |
| Listing-write seam guard (with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E build (shared dist) | success |
| E2E smoke tier | failure |
| E2E changed specs (fast lane) | failure |
| E2E shard 6/6 | failure |
| E2E shard 2/6 | failure |
| E2E shard 4/6 | failure |
| E2E shard 3/6 | failure |
| E2E email (serial, quota-bound) | failure |
| E2E shard 5/6 | failure |
| E2E shard 1/6 | failure |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
