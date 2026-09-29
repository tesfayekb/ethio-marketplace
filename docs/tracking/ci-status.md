# CI Status (auto-generated — do not edit by hand)

- Commit: `0e4adb229fdac936ffce30279713a9d0840c351b` (short `0e4adb2`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-29T20:27:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36626287215

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Import gate guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Component tests | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
