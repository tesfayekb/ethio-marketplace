# CI Status (auto-generated — do not edit by hand)

- Commit: `1870e77077f0cc1be82952042bc83ac74e9f5838` (short `1870e77`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-07T03:47:35Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34080792528

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
