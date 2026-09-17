# CI Status (auto-generated — do not edit by hand)

- Commit: `2b4622e4cfed47c664d2f64c238e606378a8b43f` (short `2b4622e`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-17T21:09:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35274975693

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
