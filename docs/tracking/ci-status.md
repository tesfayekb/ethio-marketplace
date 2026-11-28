# CI Status (auto-generated — do not edit by hand)

- Commit: `b6a2945c5c84c5c951549c4a33d6a17712aac9d6` (short `b6a2945`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-28T03:03:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46100047891
- Lanes: skipped — the code tree was proven by run 46098160058 (pull_request, lovable/next, head 9944262)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Scope (docs-only push, DEC-365) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Component tests | failure |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Semgrep (enforcing on ERROR) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
