# CI Status (auto-generated — do not edit by hand)

- Commit: `a90b26c8bf8c8ce815d940d568f195a6b33351aa` (short `a90b26c`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-17T03:46:49Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/31991623929

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Gitleaks secrets scan | success |
