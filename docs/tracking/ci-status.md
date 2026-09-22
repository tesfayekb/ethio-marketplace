# CI Status (auto-generated — do not edit by hand)

- Commit: `13c7630a111e17a7f6c94efed1d45e20cddf433b` (short `13c7630`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-22T00:17:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35671252321

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
