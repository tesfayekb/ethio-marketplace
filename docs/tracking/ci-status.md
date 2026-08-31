# CI Status (auto-generated — do not edit by hand)

- Commit: `3e61d0d4f4d4a74576af29ebfaf3e19c61d5a41b` (short `3e61d0d`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-31T07:13:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33367384491

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
