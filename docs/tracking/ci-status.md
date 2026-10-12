# CI Status (auto-generated — do not edit by hand)

- Commit: `e1c251c1fc9aaff4d051abc71c6f1c8e1615290a` (short `e1c251c`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-12T04:48:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38203524897

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Migration linter (with self-test) | success |
| Hardcoded string scan (enforcing) | success |
| Import gate guard (with self-test) | success |
| Build, typecheck, lint | success |
| i18n used-on map is fresh (U4i ②) | success |
| Semgrep (enforcing on ERROR) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/8 | skipped |
| Promote to main (fast-forward on green) | skipped |
