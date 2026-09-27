# CI Status (auto-generated — do not edit by hand)

- Commit: `43e1b2f8eb084896701c953719dee5095ecfcec7` (short `43e1b2f`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-27T01:44:44Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36286417751

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Import gate guard (with self-test) | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | failure |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Component tests | success |
| Gitleaks secrets scan | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
