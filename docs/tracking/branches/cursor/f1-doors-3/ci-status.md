# CI Status (auto-generated — do not edit by hand)

- Commit: `1cf30f743f9a3969625dd1b9641cadc93184b0fe` (short `1cf30f7`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T10:48:17Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43586415019
- Lanes: skipped — the code tree was proven by run 43581123466 (pull_request, cursor/f1-doors-2, head 76b12f2)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Component tests | success |
| Scope (docs-only push, DEC-365) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E preflight (migration parity, staging) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
