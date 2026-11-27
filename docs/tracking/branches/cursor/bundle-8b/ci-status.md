# CI Status (auto-generated — do not edit by hand)

- Commit: `f4d674354eff46c19764d565ecc17f842b8272f6` (short `f4d6743`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T15:06:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46020737540
- Lanes: skipped — the code tree was proven by run 46000329861 (pull_request, cursor/bundle-8b, head 6ab3ae3)

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | success |
| Semgrep (enforcing on ERROR) | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | success |
| Scope (docs-only push, DEC-365) | success |
| Listing-write seam guard (with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | success |
| E2E lanes | skipped (proven tree) |
| First-paint bundle budget (gzipped ceiling) | skipped (proven tree) |
| Promote to main (fast-forward on green) | skipped |
