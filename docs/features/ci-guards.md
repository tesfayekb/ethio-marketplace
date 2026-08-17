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

1. Ledger path (PRIMARY, U1f-2) — `supabase_migrations.schema_migrations` is
   NOT exposed to PostgREST, so the ledger is read through
   `public.e2e_migration_ledger()`: a `SECURITY DEFINER` SQL function returning
   `SETOF text` (the `version` column, ordered). `EXECUTE` is revoked from
   PUBLIC/anon/authenticated and granted to `service_role` ONLY — the harness
   holds that key; no client role can call it. This is the only path that sees
   seed-only migrations (they declare no function or table to probe).
2. Object probe (DEGRADED FALLBACK) — used only when the ledger RPC errors. It
   parses the newest local migration for `CREATE [OR REPLACE] FUNCTION` /
   `CREATE TABLE` names and checks them on staging (`PGRST202` without a
   name-matching hint = function absent; a hint naming the function means it
   exists with a different signature, i.e. PRESENT; `42P01` = table absent).

**No silent fallback (law).** Degraded mode always prints
`::warning::PREFLIGHT DEGRADED: object-probe only (seed-only migrations
invisible) — <error>` on stderr and appends the same line to
`$GITHUB_STEP_SUMMARY`. The preflight never reports a check it did not make; in
degraded mode a missing object still fails loudly with the filename.

When staging is behind it exits non-zero with:

```
STAGING BEHIND: apply <filename> to ethio-staging before E2E can pass
```

followed by every missing file. `bun scripts/e2e-migration-preflight.ts --dry`
prints applied-vs-local for the operator and always exits 0.

## E2E failure reporter (U1e, 2026-08-17)

Playwright's CI reporter list now includes `["json", { outputFile:
"test-results/results.json" }]` alongside `html` and `list`.
`scripts/e2e-failure-report.ts` reads that file and writes
`docs/tracking/e2e-last-failure.md`:

- run id/url, commit, write timestamp, passed/skipped/failed counts;
- per FAILED test: project · full title · innermost failed step ·
  ANSI-stripped error message truncated to 40 lines.

Redaction is unconditional (law F1): anything matching `sb-*-auth-token` or a
JWT-shaped triple is replaced before it reaches the file. `SELF_TEST=1 bun
scripts/e2e-failure-report.ts` renders `scripts/fixtures/e2e-results-sample.json`
(two failures) and exits non-zero unless both titles, both step names and the
redactions are present — a reporter that only ever prints "no failures" proves
nothing.

CI wiring (`.github/workflows/ci.yml`, job `e2e`): on `failure()` the self-test
runs, then the report; on `success()` the same file is rewritten with
`last E2E run <id> passed`, so the file ALWAYS reflects the latest run. Both
paths commit through the regenerate-after-fetch retry loop copied from
`ci-status-report.yml` (message `ci: e2e failure report [skip ci]`); a failed
push is a `::warning`, never a red. The supervisor now reads E2E evidence by
clone — the artifact courier model is retired.

## No-unexplained-deletions guard (INC-076, ratified 2026-08-17)

`scripts/check-deletions.sh` lists files deleted between the previous main SHA
(`github.event.before`, falling back to `HEAD^` when missing or all-zero) and
`HEAD`. If any file was deleted, some commit message in the range must contain
`[intentional-delete]`; otherwise the step fails and prints every removed path.
This is the CI half of INC-076's class rule: a stale-checkout push that erases
work can no longer be green.

`docs/tracking/*.md` reporters need no exemption: they REGENERATE their files
(modification), never delete them, so a deletion there is a genuine finding.

Self-test (`SELF_TEST=1 bash scripts/check-deletions.sh`) builds a synthetic
repo with git plumbing and proves all three directions: undeclared deletion
fails, declared deletion passes, addition-only range passes. CI runs the
self-test and then the guard in the step "No unexplained deletions (with
self-test)", first in `build-and-check` (which now checks out with
`fetch-depth: 0` so the previous SHA is present).

## Self-marking law + parity ledger (U1f-3, 2026-08-17)

`supabase_migrations.schema_migrations` only exists where the migration TOOL ran
(ethio-prod). ethio-staging is applied by hand through the SQL editor and has no
tool ledger, so the U1f-2 RPC could not even be created there. The ledger is now
`public.migration_marks` (version text PK, marked_at), created by
`20260817054246`, RLS-enabled with an explicit deny-all policy for
`anon`/`authenticated`, granted to `service_role` only, and read through the
unchanged definer `public.e2e_migration_ledger()`.

**Law:** every migration's LAST statement is
`INSERT INTO public.migration_marks(version) VALUES ('<own version>') ON CONFLICT
DO NOTHING;`. `scripts/check-migrations.sh` fails any migration with version >=
`20260817054246` that lacks a `INSERT INTO public.migration_marks` carrying its
OWN version string, and self-tests that rule against
`scripts/fixtures/bad-unmarked-migration-example.sql` (no mark) before scanning.
`20260817055252` back-fills a mark for every migration that existed when it was
written, so both environments start complete the moment it runs.

The preflight's degraded mode now has exactly one cause: the ledger RPC is absent
(the ledger migration has not been applied to staging). The warning names that
migration.
