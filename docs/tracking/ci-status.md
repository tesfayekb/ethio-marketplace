# CI Status (auto-generated — do not edit by hand)

- Commit: `48164709ddb6c1f58b82949e4b1ed9574120dbe7` (short `4816470`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-07T05:12:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34085834188

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | failure |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Migration linter (with self-test) | failure |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Listing-write seam guard (with self-test) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
