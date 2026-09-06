# CI Status (auto-generated — do not edit by hand)

- Commit: `d0492b2a83c220c0edc0382a39fd8362c7a18331` (short `d0492b2`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-06T03:32:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34009217793

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Gitleaks secrets scan | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Component tests | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
