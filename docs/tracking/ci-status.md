# CI Status (auto-generated — do not edit by hand)

- Commit: `77ffcec86c1d7d7102024e7d3cea2558fb781b21` (short `77ffcec`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-09T04:55:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34312805983

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
