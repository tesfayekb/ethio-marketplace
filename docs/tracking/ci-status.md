# CI Status (auto-generated — do not edit by hand)

- Commit: `fe60005cbb4aac98a83c5e5ee92669da0275667a` (short `fe60005`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-09T03:49:44Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34308564906

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
