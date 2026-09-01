# CI Status (auto-generated — do not edit by hand)

- Commit: `ca970d695822fa4edbe249fdc336e6f88216a7c2` (short `ca970d6`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-01T14:34:37Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33520274915

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
