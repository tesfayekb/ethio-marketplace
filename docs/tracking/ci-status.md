# CI Status (auto-generated — do not edit by hand)

- Commit: `97950fafe61c4afd3d039d8dee0d9a7de18b7394` (short `97950fa`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-11T22:33:48Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34654498095

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | failure |
| Listing-write seam guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| Import gate guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Build, typecheck, lint | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Hardcoded string scan (enforcing) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E build (shared dist) | skipped |
| Promote to main (fast-forward on green) | skipped |
