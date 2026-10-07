# CI Status (auto-generated — do not edit by hand)

- Commit: `e17fc72a86989a46dd0f4b42cab92cc2ec2de3c3` (short `e17fc72`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-07T03:42:06Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37567814016

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | failure |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Build, typecheck, lint | success |
| Hardcoded string scan (enforcing) | success |
| Gitleaks secrets scan | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Import gate guard (with self-test) | success |
| Listing-write seam guard (with self-test) | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| Semgrep (enforcing on ERROR) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| i18n used-on map is fresh (U4i ②) | success |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E build (shared dist) | skipped |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| Promote to main (fast-forward on green) | skipped |
