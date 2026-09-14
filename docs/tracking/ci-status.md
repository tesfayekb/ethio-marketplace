# CI Status (auto-generated — do not edit by hand)

- Commit: `89b92bdd752c7b5f9fb4da42685a875a3023b66d` (short `89b92bd`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-14T14:11:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34853889967

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
