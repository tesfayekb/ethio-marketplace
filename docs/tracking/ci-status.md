# CI Status (auto-generated — do not edit by hand)

- Commit: `470135181dc85182ef3df38a40ed47422093d438` (short `4701351`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-19T12:18:15Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44521459021
- Lanes: skipped — the code tree was proven by run 44507310797 (pull_request, cursor/f1-doors-6b, head cb857a2)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Build, typecheck, lint | success |
| Scope (docs-only push, DEC-365) | success |
| Gitleaks secrets scan | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Component tests | success |
| Import gate guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
