# CI Status (auto-generated — do not edit by hand)

- Commit: `3cb27dee355beeea5a24e0c9e6187132d6c1374f` (short `3cb27de`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T10:20:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33381892963

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
