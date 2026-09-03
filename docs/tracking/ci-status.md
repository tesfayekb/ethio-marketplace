# CI Status (auto-generated — do not edit by hand)

- Commit: `548e9c5d34679bc66a2e0a5de76d67ddd04e47d0` (short `548e9c5`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-03T08:08:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33731695045

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
