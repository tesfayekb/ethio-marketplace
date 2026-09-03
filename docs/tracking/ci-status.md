# CI Status (auto-generated — do not edit by hand)

- Commit: `b5a2635ed0a5d1b7825a8bc2673a35f41257d594` (short `b5a2635`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-03T11:03:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33747587966

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| i18n used-on map is fresh (U4i ②) | failure |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
