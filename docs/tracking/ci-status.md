# CI Status (auto-generated — do not edit by hand)

- Commit: `3955339b1cbd0864fcb9553c5cdcfb88d02b4124` (short `3955339`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-27T05:05:34Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36296146076

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Import gate guard (with self-test) | success |
| Build, typecheck, lint | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
