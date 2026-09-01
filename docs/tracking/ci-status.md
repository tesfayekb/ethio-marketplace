# CI Status (auto-generated — do not edit by hand)

- Commit: `c294e728cc047c2ecc6f83f144cd476db7062dd8` (short `c294e72`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-09-01T23:04:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33569252582

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Migration linter (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Gitleaks secrets scan | success |
| Hardcoded string scan (enforcing) | success |
| E2E preflight (migration parity, staging) | failure |
| Build, typecheck, lint | success |
| Component tests | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
