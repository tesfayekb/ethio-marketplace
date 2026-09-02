# CI Status (auto-generated — do not edit by hand)

- Commit: `872a361f0ffd498951ef5f0d29d53d7de711c253` (short `872a361`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-02T00:12:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33574332982

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | failure |
| Hardcoded string scan (enforcing) | success |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
