# CI Status (auto-generated — do not edit by hand)

- Commit: `1d66501181c1f11dd02da150deb22bf90c49b8c9` (short `1d66501`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T08:28:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43830806620
- Lanes: skipped — the code tree was proven by run 43828673900 (pull_request, cursor/tests-ci, head a76305d)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Semgrep (enforcing on ERROR) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| Component tests | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Scope (docs-only push, DEC-365) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | success |
| E2E (Playwright, ethio-staging) | success |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| E2E lanes | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
