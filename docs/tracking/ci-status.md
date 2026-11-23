# CI Status (auto-generated — do not edit by hand)

- Commit: `4af9f0dc88c2fb48ca9ef9c924377eb718a85cb7` (short `4af9f0d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-23T23:10:06Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45285028082
- Lanes: skipped — the code tree was proven by run 45226805289 (pull_request, cursor/bundle-5, head 9b179de)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Scope (docs-only push, DEC-365) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Component tests | success |
| Semgrep (enforcing on ERROR) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
