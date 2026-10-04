# CI Status (auto-generated — do not edit by hand)

- Commit: `c65952658146f98b037c51bde1c2a08d13597274` (short `c659526`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-04T07:37:01Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37186280963

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Component tests | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
