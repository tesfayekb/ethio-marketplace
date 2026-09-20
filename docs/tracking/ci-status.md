# CI Status (auto-generated — do not edit by hand)

- Commit: `aeaf92e7f08a1c4949ee778aaba97aaa6e9c0a15` (short `aeaf92e`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-20T08:28:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35499612827

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Gitleaks secrets scan | success |
| Component tests | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Build, typecheck, lint | failure |
| Migration linter (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
