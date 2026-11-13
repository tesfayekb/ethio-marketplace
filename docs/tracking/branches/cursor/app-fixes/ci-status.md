# CI Status (auto-generated — do not edit by hand)

- Commit: `0bea41aaec346557a53b9c4bfc2259a31339a765` (short `0bea41a`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-13T17:55:08Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43475544434
- Lanes: skipped — the code tree was proven by run 43473208330 (pull_request, cursor/app-fixes, head 872824a)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Scope (docs-only push, DEC-365) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Semgrep (enforcing on ERROR) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Listing-write seam guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
