# CI Status (auto-generated — do not edit by hand)

- Commit: `e75828ad92314ba4ce7a06d9b5d76a51bc36abc2` (short `e75828a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-22T05:10:34Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32553625654

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E email (serial, quota-bound) | skipped |
