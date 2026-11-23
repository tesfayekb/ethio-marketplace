# CI Status (auto-generated — do not edit by hand)

- Commit: `a14f032b6a5047ae0f5bd7e58e6a7b2fc64bec6e` (short `a14f032`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-23T10:53:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45159199801
- Lanes: skipped — the code tree was proven by run 45154868271 (pull_request, lovable/next, head 38686a4)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Scope (docs-only push, DEC-365) | success |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
