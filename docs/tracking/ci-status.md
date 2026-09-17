# CI Status (auto-generated — do not edit by hand)

- Commit: `368652e101fb53b83d7aa835c1981c93ceb102e3` (short `368652e`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-17T00:09:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35165292681

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
