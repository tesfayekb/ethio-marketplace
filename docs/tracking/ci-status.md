# CI Status (auto-generated — do not edit by hand)

- Commit: `3dc448dc347f653df4b980a1a56e45af7a097b21` (short `3dc448d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-28T10:15:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46133508679
- Lanes: skipped — the code tree was proven by run 46131049264 (pull_request, cursor/bundle-8c-3a, head b0b2e10)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Scope (docs-only push, DEC-365) | success |
| E2E preflight (migration parity, staging) | success |
| Listing-write seam guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | success |
