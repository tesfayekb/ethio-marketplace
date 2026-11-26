# CI Status (auto-generated — do not edit by hand)

- Commit: `ec88bb1f05142f5061b1cc2795ac396cd2054544` (short `ec88bb1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-26T21:32:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45898062077
- Lanes: skipped — the code tree was proven by run 45894289368 (pull_request, cursor/bundle-8a, head e2ed49f)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Scope (docs-only push, DEC-365) | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Semgrep (enforcing on ERROR) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Component tests | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
