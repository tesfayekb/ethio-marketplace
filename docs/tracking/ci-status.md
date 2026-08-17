# CI Status (auto-generated — do not edit by hand)

- Commit: `e185042e12ddfeedf41868b3d0b25fa846f57427` (short `e185042`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-17T06:08:03Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/31999710563

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E (Playwright, ethio-staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Gitleaks secrets scan | success |
| Build, typecheck, lint | success |
