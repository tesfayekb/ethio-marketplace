# CI Status (auto-generated — do not edit by hand)

- Commit: `e9ec689cb6963314406239cf5d8434c4e07903a7` (short `e9ec689`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-17T08:00:37Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/32007306254

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
