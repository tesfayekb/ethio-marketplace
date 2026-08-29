# CI Status (auto-generated — do not edit by hand)

- Commit: `ad2720e1db4e9050a5b2fd34a7a8704f24bc1370` (short `ad2720e`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-29T08:49:55Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33244043884

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
