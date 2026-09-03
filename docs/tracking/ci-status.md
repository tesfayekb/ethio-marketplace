# CI Status (auto-generated — do not edit by hand)

- Commit: `b24a61db17b35ede920a1277ffe2e4ec93bcb32a` (short `b24a61d`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-03T11:50:03Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33751773924

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
