# CI Status (auto-generated — do not edit by hand)

- Commit: `42d7f785d2d9af351002e086dfcadab2d0e78830` (short `42d7f78`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T06:14:01Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33363319629

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Gitleaks secrets scan | failure |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| Promote to main (fast-forward on green) | skipped |
