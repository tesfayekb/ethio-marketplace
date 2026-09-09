# CI Status (auto-generated — do not edit by hand)

- Commit: `97c722c2f9d2912f4bed9a8cba954eedc4fa7056` (short `97c722c`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-09T03:58:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34309111602

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Component tests | success |
| i18n used-on map is fresh (U4i ②) | success |
| Hardcoded string scan (enforcing) | success |
| Migration linter (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
