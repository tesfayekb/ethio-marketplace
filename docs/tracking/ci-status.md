# CI Status (auto-generated — do not edit by hand)

- Commit: `ce46278b558fd3c4751293ef6b5d98e98014b1d1` (short `ce46278`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-20T04:07:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35488287867

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Build, typecheck, lint | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Migration linter (with self-test) | failure |
| E2E preflight (migration parity, staging) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Import gate guard (with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
