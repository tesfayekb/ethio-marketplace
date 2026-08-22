# CI Status (auto-generated — do not edit by hand)

- Commit: `3ce44400653b139ec5f937fdeb33d695e687e689` (short `3ce4440`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-22T07:30:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32559757108

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | failure |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
