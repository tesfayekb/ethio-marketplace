# CI Status (auto-generated — do not edit by hand)

- Commit: `50ee2e6987fe338a01349f5e2ddc6acc98784d27` (short `50ee2e6`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T00:34:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43534468973
- Lanes: skipped — the code tree was proven by run 43528965654 (pull_request, cursor/ci-time, head 70dc4f6)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Scope (docs-only push, DEC-365) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Listing-write seam guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
