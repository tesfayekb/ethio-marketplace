# CI Status (auto-generated — do not edit by hand)

- Commit: `af5998e0c97f2407d723797028917156f3043674` (short `af5998e`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-15T02:58:39Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38671571434

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Migration linter (with self-test) | success |
| Semgrep (enforcing on ERROR) | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
