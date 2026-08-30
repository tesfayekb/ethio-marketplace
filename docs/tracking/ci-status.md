# CI Status (auto-generated — do not edit by hand)

- Commit: `8c4240a2fa04318951e86928fd154dfb580de2e9` (short `8c4240a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T04:20:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33292251196

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| Promote to main (fast-forward on green) | skipped |
