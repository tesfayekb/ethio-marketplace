# CI Status (auto-generated — do not edit by hand)

- Commit: `07f2bb6802bb369045b972e5a7f0e6d9db715cf1` (short `07f2bb6`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-01T19:40:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33550797429

## Jobs

| Job | Conclusion |
| --- | ---------- |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| Promote to main (fast-forward on green) | skipped |
