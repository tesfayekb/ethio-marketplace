# CI Status (auto-generated — do not edit by hand)

- Commit: `996b9b2e336819eef2005c987fa0401d1a47697c` (short `996b9b2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-25T22:27:24Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45712435050
- Lanes: skipped — the code tree was proven by run 45705204730 (pull_request, cursor/bundle-7a-2, head cb4313f)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| Semgrep (enforcing on ERROR) | success |
| Scope (docs-only push, DEC-365) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
