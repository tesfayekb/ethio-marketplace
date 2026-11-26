# CI Status (auto-generated — do not edit by hand)

- Commit: `87aa8bfc32a3cd9c1f9343b7418a8b1d6d20bb14` (short `87aa8bf`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-26T00:20:35Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45727250754
- Lanes: skipped — the code tree was proven by run 45720941766 (pull_request, lovable/next, head d3368bf)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Build, typecheck, lint | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Migration linter (with self-test) | success |
| Scope (docs-only push, DEC-365) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
