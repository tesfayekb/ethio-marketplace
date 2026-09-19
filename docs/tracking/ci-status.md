# CI Status (auto-generated — do not edit by hand)

- Commit: `a502431c421472e9eb6ca67e30fc9ffe24d089fc` (short `a502431`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-19T06:15:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35426035675

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
