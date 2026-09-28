# CI Status (auto-generated — do not edit by hand)

- Commit: `a441db3f483edb75cae7223c5772d00ea09e7b6d` (short `a441db3`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-28T01:40:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36366774220

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Component tests | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Import gate guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| Gitleaks secrets scan | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
