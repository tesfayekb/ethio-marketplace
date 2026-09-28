# CI Status (auto-generated — do not edit by hand)

- Commit: `98d2cd2c1a5eb616520ae7300ffd4695da3d1882` (short `98d2cd2`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-28T00:27:39Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36362240778

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| Component tests | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
