# CI Status (auto-generated — do not edit by hand)

- Commit: `be930caf4ed3c07b8a065a2133109eea5a48b0a4` (short `be930ca`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-17T22:15:52Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35278532165

## Jobs

| Job | Conclusion |
| --- | ---------- |
| E2E preflight (migration parity, staging) | failure |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Import gate guard (with self-test) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
