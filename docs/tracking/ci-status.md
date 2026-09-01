# CI Status (auto-generated — do not edit by hand)

- Commit: `6f6ddf5c9ee2d6f2684c0efa7a16199ca0b4e36b` (short `6f6ddf5`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-01T18:29:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33543828406

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
