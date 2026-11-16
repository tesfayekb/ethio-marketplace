# CI Status (auto-generated — do not edit by hand)

- Commit: `a7d1b1ca971d6e19798561ff5b585cd3381f003d` (short `a7d1b1c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T13:00:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43870690450
- Lanes: skipped — the code tree was proven by run 43867687998 (pull_request, cursor/lovable-guard-patchless, head 53877d2)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Scope (docs-only push, DEC-365) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| Semgrep (enforcing on ERROR) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
