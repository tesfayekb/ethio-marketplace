# CI Status (auto-generated — do not edit by hand)

- Commit: `a36ddba352054298e4430e8253beaf397ac24e0e` (short `a36ddba`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-05T02:14:30Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37254477338

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Import gate guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Build, typecheck, lint | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
