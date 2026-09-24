# CI Status (auto-generated — do not edit by hand)

- Commit: `5847527f871fae350eab1df31381bab7f1331796` (short `5847527`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-24T10:45:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35988988393

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Component tests | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
