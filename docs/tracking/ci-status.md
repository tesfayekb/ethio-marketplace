# CI Status (auto-generated — do not edit by hand)

- Commit: `2448f6207f0d6c33b546e605b09ce241363b0ca5` (short `2448f62`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-03T03:37:30Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33711985191

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Component tests | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| Promote to main (fast-forward on green) | skipped |
