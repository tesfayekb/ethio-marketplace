# CI Status (auto-generated — do not edit by hand)

- Commit: `fc6fd745ab5b376a3c92129e0113fa44497b77cc` (short `fc6fd74`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-08-16T05:13:49Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/31928349460

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E (Playwright, ethio-staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
