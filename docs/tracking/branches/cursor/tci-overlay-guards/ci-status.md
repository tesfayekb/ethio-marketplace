# CI Status (auto-generated — do not edit by hand)

- Commit: `29e88d188037cbc7ef3a9e1c3b9d0d7c69d29ab9` (short `29e88d1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-18T19:24:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44378759245
- Lanes: skipped — the code tree was proven by run 44349776301 (pull_request, cursor/tci-overlay-guards, head 126373b)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Import gate guard (with self-test) | success |
| Build, typecheck, lint | success |
| Scope (docs-only push, DEC-365) | success |
| Component tests | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | success |
| Semgrep (enforcing on ERROR) | success |
| Gitleaks secrets scan | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
