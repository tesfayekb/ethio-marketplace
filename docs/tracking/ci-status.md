# CI Status (auto-generated — do not edit by hand)

- Commit: `31020961e4ebef32fed95fc171c0847242f5f522` (short `3102096`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-12T00:29:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34661755560

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| E2E preflight (migration parity, staging) | failure |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Import gate guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
