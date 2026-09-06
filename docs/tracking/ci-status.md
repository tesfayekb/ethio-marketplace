# CI Status (auto-generated — do not edit by hand)

- Commit: `a2901e21f6725ff36905239489952025d9d25419` (short `a2901e2`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-06T03:57:47Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34010258139

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| Component tests | success |
| First-paint bundle budget (gzipped ceiling) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
