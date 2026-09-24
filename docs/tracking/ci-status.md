# CI Status (auto-generated — do not edit by hand)

- Commit: `db13e9a5e43cd6daffb8270a66675242937821a4` (short `db13e9a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-24T22:02:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36064995954

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
