# CI Status (auto-generated — do not edit by hand)

- Commit: `3eab92883d83bb3a766a38f9d3291e75d372ebe3` (short `3eab928`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-02T03:02:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33585445853

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Migration linter (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Build, typecheck, lint | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Component tests | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
