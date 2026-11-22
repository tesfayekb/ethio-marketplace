# CI Status (auto-generated — do not edit by hand)

- Commit: `ce25a77513c7aed2ce500159dacb54f2c813545d` (short `ce25a77`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-22T23:44:00Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45084055511
- Lanes: skipped — the code tree was proven by run 45081574208 (pull_request, cursor/bundle-3, head ea68f89)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Scope (docs-only push, DEC-365) | success |
| Semgrep (enforcing on ERROR) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E preflight (migration parity, staging) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
