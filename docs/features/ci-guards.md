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

## browse-path-guard (added 2026-08-09, Phase R3)

`scripts/check-browse-imports.sh` fails the build when anything outside the
allowlist imports `src/features/permissions` — the RBAC seam must not sit on
the marketplace browse path. Allowlist: the seam itself, `src/routes/admin.tsx`,
and `src/components/app-shell.tsx` (the Admin-tab gate; see
`docs/features/rbac-client-seam.md`). CI runs it in both directions: PASS on
`src/`, and it must FAIL on `scripts/fixtures/bad-permission-import-example.ts.txt`.

## Definer-restatement law (INC-074, 2026-08-16)

`scripts/check-migrations.sh` also fails any migration (timestamp >=
`20260810000000`) that declares a `SECURITY DEFINER` function without an
in-file `REVOKE` naming it. This includes **re-declarations**: re-declaring an
existing SECURITY DEFINER function requires restating its `REVOKE`/`GRANT`
lines in the same file. `CREATE OR REPLACE` preserves live grants, but the file
must be self-describing — a reader of one migration must be able to see the
privilege posture of every function it declares. Corrections are forward-only
riders (migrations are append-only), e.g. the grant restatement for
`submit_listing` / `transition_listing` re-declared in `20260816120338`.

## Migration parity preflight (INC-074, 2026-08-16)

`scripts/e2e-migration-preflight.ts` runs as its own CI step
("Migration parity preflight (staging)") before Playwright, and again from
`e2e/global-setup.ts` for local runs. It compares `supabase/migrations/*.sql`
against ethio-staging using the service-role client the harness already holds:

1. Ledger path — reads `supabase_migrations.schema_migrations` (`version` =
   the 14-digit filename prefix) through PostgREST.
2. Fallback probe — when that schema is not exposed, it parses the newest local
   migration for `CREATE [OR REPLACE] FUNCTION` / `CREATE TABLE` names and
   checks them on staging (`PGRST202` = function absent, `42P01` = table
   absent). No SECURITY DEFINER helper is required.

When staging is behind it exits non-zero with:

```
STAGING BEHIND: apply <filename> to ethio-staging before E2E can pass
```

followed by every missing file. `bun scripts/e2e-migration-preflight.ts --dry`
prints applied-vs-local for the operator and always exits 0.
