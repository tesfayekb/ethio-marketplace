# CI Status (auto-generated — do not edit by hand)

- Commit: `137bf41f0f18c29018556c76b2e344d31665f562` (short `137bf41`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T05:08:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33293988345

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
