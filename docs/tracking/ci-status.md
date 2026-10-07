# CI Status (auto-generated — do not edit by hand)

- Commit: `bd9a7032d804238fd13c6f45ee489be051ade9d9` (short `bd9a703`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-07T14:39:15Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37638282428

## Jobs

| Job | Conclusion |
| --- | ---------- |
| i18n used-on map is fresh (U4i ②) | success |
| Semgrep (enforcing on ERROR) | success |
| Hardcoded string scan (enforcing) | success |
| Import gate guard (with self-test) | success |
| Build, typecheck, lint | success |
| Migration linter (with self-test) | success |
| Dependency vulnerability audit (enforcing on high/critical) | success |
| Marketplace weight guard (no heavy deps on the first-paint path) | success |
| Gitleaks secrets scan | success |
| Component tests | success |
| E2E preflight (migration parity, staging) | failure |
| First-paint bundle budget (gzipped ceiling) | success |
| Listing-write seam guard (with self-test) | success |
| Browse-path guard (no RBAC seam on the marketplace path, with self-test) | success |
| E2E build (shared dist) | skipped |
| E2E (Playwright, ethio-staging) | failure |
| E2E email (serial, quota-bound) | skipped |
| E2E changed specs (fast lane) | skipped |
| E2E shard ${{ matrix.shard }}/6 | skipped |
| E2E smoke tier | skipped |
| Promote to main (fast-forward on green) | skipped |
