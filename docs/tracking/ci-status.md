# CI Status (auto-generated — do not edit by hand)

- Commit: `7317616dd3c1889fba92ba8d31598417f29576dd` (short `7317616`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-04T14:44:54Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37210348504

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Build, typecheck, lint | success |
| Import gate guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| Migration linter (with self-test) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Hardcoded string scan (enforcing) | success |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
