# CI Status (auto-generated — do not edit by hand)

- Commit: `8bba8dcfaef0d3a34e60e698d4c1758a90b817ff` (short `8bba8dc`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-23T07:10:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35830271910

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
