# CI Status (auto-generated — do not edit by hand)

- Commit: `714a5d7ef3fd7d4868709050f1f13f2620aa1a11` (short `714a5d7`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-19T10:42:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44507268175
- Lanes: skipped — the code tree was proven by run 44492338156 (pull_request, lovable/translations-columns, head 4016049)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Scope (docs-only push, DEC-365) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
