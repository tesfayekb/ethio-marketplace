# CI Status (auto-generated — do not edit by hand)

- Commit: `33db2ea06aaabe361289de87003e529f5a408475` (short `33db2ea`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-14T09:57:11Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34830577279

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Build, typecheck, lint | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
