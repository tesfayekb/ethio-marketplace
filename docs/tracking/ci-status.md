# CI Status (auto-generated — do not edit by hand)

- Commit: `f98455b40501e5123e813e0da8046c812c98b8cd` (short `f98455b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-24T09:30:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35981525989

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
