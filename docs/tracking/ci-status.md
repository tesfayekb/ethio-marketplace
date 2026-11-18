# CI Status (auto-generated — do not edit by hand)

- Commit: `a50ab28e2f65b573d8cef8fdac1aea159656c918` (short `a50ab28`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-18T23:03:03Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44416210214
- Lanes: skipped — the code tree was proven by run 44349776301 (pull_request, cursor/tci-overlay-guards, head 126373b)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Scope (docs-only push, DEC-365) | success |
| Component tests | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | success |
| Semgrep (enforcing on ERROR) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
