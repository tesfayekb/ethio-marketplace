# CI Status (auto-generated — do not edit by hand)

- Commit: `b5029bcea89cc5184ee9f8e821d27430bde9e17b` (short `b5029bc`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-03T04:55:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33716772949

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing, with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | failure |
| Build, typecheck, lint | failure |
| Gitleaks secrets scan | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
