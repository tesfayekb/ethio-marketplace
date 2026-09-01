# CI Status (auto-generated — do not edit by hand)

- Commit: `ff0f1193cb85673ef24388e58d1cc0dab9c84818` (short `ff0f119`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-01T13:36:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33513615863

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E smoke tier | failure |
| E2E changed specs (fast lane) | success |
| E2E email (serial, quota-bound) | failure |
| E2E shard 3/4 | success |
| E2E shard 4/4 | success |
| E2E shard 1/4 | failure |
| E2E shard 2/4 | success |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
