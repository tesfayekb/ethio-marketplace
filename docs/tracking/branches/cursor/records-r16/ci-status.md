# CI Status (auto-generated — do not edit by hand)

- Commit: `1f53d22695a29e90c2f42b6060c10a34fb1a05fa` (short `1f53d22`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T05:46:35Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43811602046
- Lanes: skipped — the code tree was proven by run 43800810345 (pull_request, cursor/f1-doors-5a, head 12eecca)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Migration linter (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Gitleaks secrets scan | success |
| Scope (docs-only push, DEC-365) | success |
| Hardcoded string scan (enforcing) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Component tests | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
