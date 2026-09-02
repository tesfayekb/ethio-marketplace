# CI Status (auto-generated — do not edit by hand)

- Commit: `713664a525e86218c6a5b3d7291b3b112e62f3b2` (short `713664a`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-02T03:25:26Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33586933652

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E preflight (migration parity, staging) | failure |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Component tests | success |
| Listing-write seam guard (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
