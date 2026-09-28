# CI Status (auto-generated — do not edit by hand)

- Commit: `394162bb3a3fdb68ba3288a64d55463c9c04f067` (short `394162b`)
- Conclusion: **CANCELLED**
- Completed (UTC): 2026-09-28T05:49:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36383469726

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | cancelled |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Component tests | cancelled |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | cancelled |
