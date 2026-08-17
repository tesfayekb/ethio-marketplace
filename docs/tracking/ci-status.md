# CI Status (auto-generated — do not edit by hand)

- Commit: `d98df0a698745e340971013e7790a8d8a4b25e05` (short `d98df0a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-17T07:12:11Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32003876394

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | failure |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E (Playwright, ethio-staging) | failure |
