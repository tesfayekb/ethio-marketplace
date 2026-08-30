# CI Status (auto-generated — do not edit by hand)

- Commit: `efe9d1c456369f6ccc29cf42d13368c57f346016` (short `efe9d1c`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T11:43:26Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33309613163

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
