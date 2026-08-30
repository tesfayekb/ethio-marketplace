# CI Status (auto-generated — do not edit by hand)

- Commit: `e9c73d7b65cdb5ea6185964513325a28bba3dbc9` (short `e9c73d7`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T09:16:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33303625018

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
