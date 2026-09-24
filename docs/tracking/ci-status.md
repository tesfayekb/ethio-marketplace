# CI Status (auto-generated — do not edit by hand)

- Commit: `67478fd526dfc26fdc4cd6dea826c233e4afeda8` (short `67478fd`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-24T08:59:26Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35978404404

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Component tests | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | failure |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
