# CI Status (auto-generated — do not edit by hand)

- Commit: `ca4c4581d2b5b8ad3f8ef75c9651dafa186deb2f` (short `ca4c458`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T12:21:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44903049086
- Lanes: skipped — the code tree was proven by run 44900066596 (pull_request, cursor/tests-ci-2, head c692533)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| i18n used-on map is fresh (U4i ②) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Scope (docs-only push, DEC-365) | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
