# CI Status (auto-generated — do not edit by hand)

- Commit: `3c9086dc06f388418a2da20552eb18837e3951cf` (short `3c9086d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-28T00:04:39Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46084947152
- Lanes: skipped — the code tree was proven by run 46081846257 (pull_request, cursor/bundle-8c-1, head 67812ba)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Build, typecheck, lint | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Scope (docs-only push, DEC-365) | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Listing-write seam guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
