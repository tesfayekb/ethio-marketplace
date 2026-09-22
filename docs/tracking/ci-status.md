# CI Status (auto-generated — do not edit by hand)

- Commit: `8b958ae50d411694f3e5ddbe54de98326038d6f4` (short `8b958ae`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-22T12:21:56Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35726608625

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
