# CI Status (auto-generated — do not edit by hand)

- Commit: `8ab9fd61586e5bf271bde51556fdf6d8058a0487` (short `8ab9fd6`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T06:53:20Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33365958196

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | failure |
| E2E preflight (migration parity, staging) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
