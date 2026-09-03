# CI Status (auto-generated — do not edit by hand)

- Commit: `a9275e72215678d94c161794193f83d4a5611f3d` (short `a9275e7`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-03T02:27:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33707641881

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
