# CI Status (auto-generated — do not edit by hand)

- Commit: `5cfe8b0c256664318de7c51ccff837b85159674c` (short `5cfe8b0`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T15:48:56Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46027232024
- Lanes: skipped — the code tree was proven by run 46000329861 (pull_request, cursor/bundle-8b, head 6ab3ae3)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Scope (docs-only push, DEC-365) | success |
| Build, typecheck, lint | success |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| Semgrep (enforcing on ERROR) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
