# CI Status (auto-generated — do not edit by hand)

- Commit: `e70ff0273d1620ae4992a3674aefef9b66672193` (short `e70ff02`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-19T05:45:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35424748594

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| Migration linter (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Import gate guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| Build, typecheck, lint | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
