# CI Status (auto-generated — do not edit by hand)

- Commit: `86c56d4dbb2a70cf489c5b8265bde70b3847f309` (short `86c56d4`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-29T05:06:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33235357475

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
