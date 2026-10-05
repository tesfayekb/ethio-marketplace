# CI Status (auto-generated — do not edit by hand)

- Commit: `365df2919620b0765a26fac6e210cea476fa325c` (short `365df29`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-05T17:29:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37348481625

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Import gate guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
