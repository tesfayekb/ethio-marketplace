# CI Status (auto-generated — do not edit by hand)

- Commit: `bcaa269d0739a7be2ce81d76d90522f752c99031` (short `bcaa269`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-22T11:54:08Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35723960793

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| Listing-write seam guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
