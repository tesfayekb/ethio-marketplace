# CI Status (auto-generated — do not edit by hand)

- Commit: `88c6ed8cc56b99fc6ad762962a2532e4ada0239a` (short `88c6ed8`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-11T13:12:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38140549121

## Jobs

| Job | Conclusion |
| --- | ---------- |
| Component tests | success |
| Gitleaks secrets scan | success |
| Import gate guard (with self-test) | success |
| Migration linter (with self-test) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Hardcoded string scan (enforcing) | success |
| Semgrep (enforcing on ERROR) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| E2E preflight (migration parity, staging) | failure |
| Listing-write seam guard (with self-test) | success |
| First-paint bundle budget (gzipped ceiling) | success |
| i18n used-on map is fresh (U4i ②) | success |
| Build, typecheck, lint | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E smoke tier | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/8 | skipped |
| E2E email (serial, quota-bound) | skipped |
| Promote to main (fast-forward on green) | skipped |
