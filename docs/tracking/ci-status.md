# CI Status (auto-generated — do not edit by hand)

- Commit: `b8a02eb7a7bc06766038c09670743a739421e9eb` (short `b8a02eb`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-17T11:36:41Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35216455983

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
