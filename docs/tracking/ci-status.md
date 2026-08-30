# CI Status (auto-generated — do not edit by hand)

- Commit: `48765c024e32ef2b87e0b0c44129a5767fba6887` (short `48765c0`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T03:44:28Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33290923302

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
