# CI Status (auto-generated — do not edit by hand)

- Commit: `80eed9f7e3a20d435a9ef8aedc3d8492f275a223` (short `80eed9f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T23:36:54Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44962204804
- Lanes: skipped — the code tree was proven by run 44957024871 (pull_request, cursor/bundle-1, head 9d74f80)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| i18n used-on map is fresh (U4i ②) | success |
| Semgrep (enforcing on ERROR) | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| Scope (docs-only push, DEC-365) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
