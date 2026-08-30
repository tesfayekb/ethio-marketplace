# CI Status (auto-generated — do not edit by hand)

- Commit: `4a5a2611f7a7a68ac6a8108d16292cbbc466c07b` (short `4a5a261`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-30T08:14:41Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33301079718

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/4 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
