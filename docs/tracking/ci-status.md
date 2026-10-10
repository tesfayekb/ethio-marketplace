# CI Status (auto-generated — do not edit by hand)

- Commit: `0160270fd2942e3cbee15df1a484c5d9e9b3442b` (short `0160270`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-10T14:57:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38061577911

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| Import gate guard (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
