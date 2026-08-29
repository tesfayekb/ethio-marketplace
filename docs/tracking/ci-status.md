# CI Status (auto-generated — do not edit by hand)

- Commit: `ed86533353bfc8a28c1a95a2b9309a804cf32957` (short `ed86533`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-29T06:06:57Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33237679218

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| Promote to main (fast-forward on green) | skipped |
