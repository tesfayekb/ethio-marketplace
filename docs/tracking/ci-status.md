# CI Status (auto-generated — do not edit by hand)

- Commit: `4374fc4e954a8ef984a15167b8fbd5c63763ce5f` (short `4374fc4`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-05T17:02:04Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37345241607

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Listing-write seam guard (with self-test) | success |
| Import gate guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
