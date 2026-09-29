# CI Status (auto-generated — do not edit by hand)

- Commit: `d662a91fb11a9400de0387591632e43e266062eb` (short `d662a91`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-29T21:03:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36630568746

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Build, typecheck, lint | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Component tests | success |
| Import gate guard (with self-test) | success |
| Gitleaks secrets scan | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
