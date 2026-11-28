# CI Status (auto-generated — do not edit by hand)

- Commit: `8474f91d7a693cb8c2be227d0c1345988c277e56` (short `8474f91`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-28T09:28:03Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46129685622
- Lanes: skipped — the code tree was proven by run 46128146011 (pull_request, lovable/next, head a1a02bc)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E preflight (migration parity, staging) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Build, typecheck, lint | success |
| Scope (docs-only push, DEC-365) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Migration linter (with self-test) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
