# CI Status (auto-generated — do not edit by hand)

- Commit: `1532e9941d0574feb749840a3637a0eaf3d83590` (short `1532e99`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-01T16:56:00Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33534679679

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
