# CI Status (auto-generated — do not edit by hand)

- Commit: `a1fe1f101617649cee6507fcaf0b2e92391e0ff8` (short `a1fe1f1`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-24T00:28:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35938459564

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Build, typecheck, lint | success |
| Import gate guard (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Listing-write seam guard (with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| i18n used-on map is fresh (U4i ②) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
