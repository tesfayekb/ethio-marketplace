# CI Status (auto-generated — do not edit by hand)

- Commit: `270ee85f5fa0097e75a60d08165a3a13208ebca0` (short `270ee85`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-10T06:01:17Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38029368030

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Build, typecheck, lint | success |
| Listing-write seam guard (with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Component tests | success |
| Import gate guard (with self-test) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Semgrep (enforcing on ERROR) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| E2E preflight (migration parity, staging) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E build (shared dist) | skipped |
| E2E email (serial, quota-bound) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| Promote to main (fast-forward on green) | skipped |
