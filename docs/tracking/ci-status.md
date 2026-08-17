# CI Status (auto-generated — do not edit by hand)

- Commit: `5aa0280070f0b689f2b51a0e38b8468836b42e43` (short `5aa0280`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-17T04:52:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/31995451742

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| E2E (Playwright, ethio-staging) | failure |
