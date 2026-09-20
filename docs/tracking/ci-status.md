# CI Status (auto-generated — do not edit by hand)

- Commit: `a1d91ef735df1f93604e1eb6e18923f5c530904f` (short `a1d91ef`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-20T07:55:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35498102136

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Import gate guard (with self-test) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
