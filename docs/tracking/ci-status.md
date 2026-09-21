# CI Status (auto-generated — do not edit by hand)

- Commit: `e75d4a31b9be132e8fa3e23ddf07b029eb99bb8e` (short `e75d4a3`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-21T09:24:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35583002527

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Component tests | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E build (shared dist) | skipped |
| Promote to main (fast-forward on green) | skipped |
