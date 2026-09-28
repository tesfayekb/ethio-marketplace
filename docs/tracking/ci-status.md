# CI Status (auto-generated — do not edit by hand)

- Commit: `6d23c2055baf7a839a79242b8c53fbb400449215` (short `6d23c20`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-28T14:02:07Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36432795298

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| Import gate guard (with self-test) | success |
| Migration linter (with self-test) | failure |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
