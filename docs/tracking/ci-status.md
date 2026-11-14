# CI Status (auto-generated — do not edit by hand)

- Commit: `b26e3b34f373285d99fee9cf2a8425639f1f6f73` (short `b26e3b3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T03:54:17Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43553591107
- Lanes: skipped — the code tree was proven by run 43528965654 (pull_request, cursor/ci-time, head 70dc4f6)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Scope (docs-only push, DEC-365) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Migration linter (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Listing-write seam guard (with self-test) | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
