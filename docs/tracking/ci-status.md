# CI Status (auto-generated — do not edit by hand)

- Commit: `f7f0073fe9f091ec5ee40bb0ac46c22e95d5fb4c` (short `f7f0073`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-16T07:39:47Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/31934274039

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
