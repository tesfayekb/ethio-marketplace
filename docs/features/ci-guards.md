# CI Guards

GitHub Actions workflow at `.github/workflows/ci.yml` runs on every push and
pull request targeting `main`. All jobs run in parallel.

## Jobs

| Job             | Purpose                                                                 | Status   |
| --------------- | ----------------------------------------------------------------------- | -------- |
| build-and-check | `bun install` → `bun run typecheck` → `bun run lint` → `bun run build`. | **FAIL** |
| bundle-report   | Prints total client JS output size after build (informational).         | log-only |
| secrets-scan    | `gitleaks/gitleaks-action@v2` — scans repo history for leaked secrets.  | **FAIL** |
| migration-lint  | Runs `scripts/check-migrations.sh` (see below).                         | **FAIL** |
| string-scan     | Runs `scripts/check-hardcoded-strings.sh`.                              | **WARN** |

"FAIL" jobs block merge on failure; "WARN" jobs print findings but always
exit 0 for now.

## Migration linter

`scripts/check-migrations.sh` scans every `.sql` file in
`supabase/migrations/`. Any file containing `CREATE TABLE` must also contain
`ENABLE ROW LEVEL SECURITY`, at least one `CREATE POLICY`, and at least one
`GRANT` (all case-insensitive). Violations exit 1 with the offending file
list.

### Self-test

Before scanning real migrations, the script runs itself against
`scripts/fixtures/bad-migration-example.sql` — a deliberately incomplete
migration (CREATE TABLE with no RLS, policy, or grant). If the guard fails
to flag that fixture, the script exits 1 with `GUARD SELF-TEST FAILED`. This
prevents a broken guard from silently passing every migration. The
`scripts/fixtures/` directory is excluded from the real scan.

## String scan (warn mode)

`scripts/check-hardcoded-strings.sh` scans `.tsx` files under `src/routes`
and `src/features` for JSX text content and common user-facing string props
(`title`, `label`, `placeholder`, `alt`, `aria-label`). Prints findings and
a final `findings: N` line. Always exits 0 until we flip to fail mode.

## dependency-audit (added 2026-08-03, P1-g)

Enforcing gate on high/critical npm advisories, with a separate red for an
unreachable advisory service. Details and accepted exceptions:
`docs/features/dependency-audit.md`.
