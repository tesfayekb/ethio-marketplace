# CI Status (auto-generated — do not edit by hand)

- Commit: `d0644eef4e752452452a972538efc86e02bb9d9c` (short `d0644ee`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-16T14:29:52Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38905533461

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E preflight (migration parity, staging) | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Listing-write seam guard (with self-test) | success |
| E2E build (shared dist) | success |
| E2E changed specs (fast lane) | failure |
| E2E smoke tier | success |
| E2E email (serial, quota-bound) | success |
| E2E shard 5/6 | failure |
| E2E shard 1/6 | failure |
| E2E shard 4/6 | failure |
| E2E shard 3/6 | success |
| E2E shard 2/6 | failure |
| E2E shard 6/6 | success |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
