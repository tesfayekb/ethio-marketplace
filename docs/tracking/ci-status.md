# CI Status (auto-generated — do not edit by hand)

- Commit: `073f1a8146dfb7943d97f2e85d666ef015ec2208` (short `073f1a8`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-16T22:04:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35155684382

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
