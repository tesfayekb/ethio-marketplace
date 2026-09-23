# CI Status (auto-generated — do not edit by hand)

- Commit: `889d838e281d733c942efac9eff74438aed23a9d` (short `889d838`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-23T07:27:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35831707201

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Import gate guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
