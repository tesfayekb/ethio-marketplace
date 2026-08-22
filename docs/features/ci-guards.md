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

**U1g-3 note (2026-08-17).** The purge root (`AUTH_DERIVED_ROOT` / `authKey`,
INC-078) briefly lived inside the seam, which made every legitimate consumer —
the shell and `src/features/admin/users/use-admin-users.ts` — an importer of
`features/permissions` and turned the guard red. Query keys are inert strings,
so they now live in the neutral `src/lib/query-keys.ts`, which imports nothing
from `features/*`. LAW: shared, behaviour-free constants never travel through a
guarded seam; put them in `src/lib`.

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

## E2E sharding, cancellation, and the smoke tier (2026-08-17)

The E2E stage is four jobs instead of one:

```text
e2e-preflight  →  e2e-smoke   ┐
               →  e2e-shard 1..4 (fail-fast: false)  ┘ → e2e ("E2E (Playwright, ethio-staging)")
```

- `e2e-preflight` runs the migration-parity probe ONCE (INC-074) so four
  runners cannot each pay for it.
- `e2e-smoke` runs the smoke, shell-gate and sign-out specs (a file list, not a
  title grep — tagging those specs would edit files outside the task that
  introduced this tier). It fails fast in ~1–2 min; the shards run regardless.
- `e2e-shard N/4` runs `playwright test --shard=N/4` and uploads its JSON
  reporter output as `e2e-results-N`, pass or fail.
- `e2e` downloads all shard artifacts and MERGES them by JSON concatenation
  (suites appended, `stats.expected`/`stats.skipped` summed) via
  `E2E_RESULTS_DIR` in `scripts/e2e-failure-report.ts`, so the published
  `docs/tracking/e2e-last-failure.md` lists EVERY shard's failures — not the
  first red shard's. It keeps the historical job name, so the status reporter's
  table row and every downstream read are unchanged. Its own conclusion is the
  E2E verdict: red if any shard or the smoke tier was not `success`.

### Every red source is quoted (INC-081, 2026-08-17)

Run 32013538511 was red on the smoke tier while the published report said
"0 failed": the smoke job uploaded no `results.json`, so the merged report
never saw it. Closed in both directions:

- The smoke job now uploads `test-results/results.json` as `e2e-results-smoke`
  (`if: always()`), exactly like the shards; the report job's existing
  `e2e-results-*` download pattern matches it.
- Every source (`smoke`, `1`..`4`) tees its Playwright output to a log file and
  uploads it as `e2e-log-<source>` on failure. The report job downloads
  `e2e-log-*` into `E2E_LOGS_DIR`.
- `scripts/e2e-failure-report.ts` walks `E2E_EXPECTED_SOURCES` (default
  `smoke,1,2,3,4`), labels every failure with `- Source: \`smoke\``/`\`shard 3\``, and for any expected source with no results file writes
  "<source>: no results file — the process failed outside test results
  (setup/teardown/preflight)" followed by the last 40 log lines (redacted).

LAW: the merged verdict quotes every red source; a red job with no test
failures shows its log tail. The reporter may never print "0 failed" while a
job is red without quoting WHY. The self-test proves both shapes (a labelled
shard failure and a results-less smoke source with its log tail).

Caches: the Playwright browser cache is keyed on `runner.os` + the resolved
`@playwright/test` version; bun's install cache is keyed on `bun.lock`. Both
jobs echo `cache-hit` so a silently-missing cache is visible in the log rather
than inferred from a slow run.

### G18 — cancel superseded runs

`concurrency: { group: ci-<ref>, cancel-in-progress: true }` at the top of
`ci.yml`. The platform pushes several commits per task; without it, an older
HEAD's run can finish after a newer one and overwrite the status file. With it,
the only surviving run is the newest push's, so `docs/tracking/ci-status.md`
and `e2e-last-failure.md` always describe HEAD.

### Fixture ownership under sharding (INC-080, 2026-08-17)

Every parallel test process derives
`PROCESS_ID = ${GITHUB_RUN_ID ?? local<rand>}-${E2E_SHARD ?? "solo"}`.
`ci.yml` sets `E2E_SHARD: ${{ matrix.shard }}` on the shard matrix and
`E2E_SHARD: smoke` on the smoke tier; `nightly-e2e.yml` sets `E2E_SHARD: nightly`.

- Minted fixtures are
  `e2e+<PROCESS_ID>-<workerTag>-<n>-<rand6>@ethio-e2e.invalid`, where
  `workerTag` is `TEST_WORKER_INDEX` (Playwright sets it per worker) falling
  back to `process.pid`, and `rand6` is 6 random base36 chars. ONE job may run N
  workers (projects x parallelism) that share PROCESS_ID, so ids must be unique
  per worker, not per job; uniqueness is by construction and never depends on a
  counter shared across processes (INC-080 addendum).
- `global-teardown.ts` deletes ONLY emails containing `+${PROCESS_ID}-`, and
  still refuses, per user, to delete anything outside `@ethio-e2e.invalid`.
- The namespace-wide sweep (`sweepStaleUsers()`, users older than 24h) runs only
  in the single-process nightly job. Standing proof fixtures
  (`proof-base@staging.test`, `proof-third@staging.test`) are on another domain
  and are excluded by the namespace check.

**Law:** parallel test processes own their fixtures by process id; namespace-wide
sweeps run only in single-process jobs.

## Flake class: transient UI-open timing (2026-08-17)

Two isolated mobile reds (SO-2 smoke, SO-4 shard 1) failed at
`getByRole('dialog')` not visible while the same helper passed 245× in the same
run: the hamburger click landed before the drawer opened under parallel-runner
load. Flake class: transient UI-open timing under parallel runners → helpers own
a bounded retry; assertions never get looser timeouts as a substitute.

`openRailScope` (e2e/helpers/ui.ts) is the ONE drawer-open contract:
hydration + `toBeEnabled` gate, click, 3s visibility poll, then at most ONE
retry (only from a genuinely closed state, logging `[e2e] drawer open retried`
so retries are countable in the log tail), and it returns only once the drawer's
`panel-header-title` has settled. Callers that opened the drawer themselves
(`signOutViaUi`, `auth-signout.spec.ts` SO-4, `category-nav.spec.ts`) all route
through it.

## Email quota tier: `email-serial` (INC-082, 2026-08-17)

Supabase Auth enforces a **per-project, per-hour email/signup rate limit**. Every
sign-up and every resend in the suite spends from that one quota, so those specs
may never run in parallel processes.

- Playwright project `email-serial` (one viewport, `test.describe.configure({
mode: "serial" })`, `--workers=1`) owns `e2e/auth-signup.spec.ts`; the nightly
  resend-exhaustion spec already runs single-process in `nightly-e2e.yml`.
- `mobile-360` / `desktop-1280` `testIgnore` the file, and the smoke and shard
  jobs pass explicit `--project=mobile-360 --project=desktop-1280`, so the
  email tier can never be picked up twice.
- CI job **"E2E email (serial, quota-bound)"** runs it once per push, uploads
  `e2e-results-email` and (on red) `e2e-log-email`; `E2E_EXPECTED_SOURCES` is
  `smoke,email,1,2,3,4` and the merged `e2e` verdict includes it.

**Operational constants.** Staging Auth defaults: 4 emails/hour project-wide
(`Rate limit for sending emails`), 30 OTP/verification requests per hour, plus
the app's own 60s per-address resend cooldown (INC-017).

**OPERATOR NOTE — if the limit bites repeatedly:** raise it in the Supabase
Dashboard for **ethio-staging** → Authentication → Rate Limits, fields:
`Rate limit for sending emails` (per hour), `Rate limit for token refreshes`,
`Rate limit for token verifications`, and `Rate limit for sign ups and sign ins`
(per 5 minutes, per IP). Raise only staging; ethio-prod keeps defaults. Tests
never retry past the limit — a red that names the quota is the correct outcome.

## Instrumentation law — timeouts must name themselves

**A test-level timeout with no failed step is an instrumentation gap: the
reporter prints the final step durations; helpers never exhaust silently.
Timeouts are never loosened as a substitute.**

Two mechanisms enforce it:

- **Reporter (`scripts/e2e-failure-report.ts`).** Every failure body carries the
  page snapshot Playwright wrote at the moment of death: each E2E job uploads
  `test-results/**/error-context.md` as `e2e-context-<source>`, the merged report
  job downloads `e2e-context-*`, and the reporter quotes the LAST 20 lines under
  `Context:` — or states `context file not found for <slug>`. Matching rule: the
  candidate directory ends with `-<sanitised project>` and its remainder either
  equals the sanitised `<spec-base>-<test title>` core or splits at a `-<5 hex>-`
  truncation marker into a prefix and a suffix of it. The bundled self-test runs
  on REAL captured fixtures (`scripts/fixtures/e2e-results-sample.json` +
  `scripts/fixtures/e2e-context-sample/`) and asserts both the quoted context and
  the missing-context branch.

  **RETIRED (INC-083 rule 2, 2026-08-22): the JSON-steps walker and the
  `Last steps before timeout:` block.** Playwright's JSON reporter emits no
  `steps` array — verified on real captured output (`steps: 0` on every result),
  so neither mechanism could ever fire. **CLASS RULE: reporter fixtures are
  captured from real output, never authored from assumption.**

- **Helper-wait law (`e2e/helpers/ui.ts`).** Every `catch` and manual polling
  loop throws a NAMED error on exhaustion, stating what it waited for and for
  how long: `fillUntilStable` rethrows its per-attempt assertion message,
  `openRailScope`'s mounted-but-waiting branch throws "drawer mounted but never
  became visible after 13s", and `expectAal2` names its 5s poll and last read.
  The one declared exception is `stepUpIfPrompted`, where exhaustion is a
  legitimate outcome (no gate opened because the session is already AAL2); the
  exception is commented in place.

- **Self-report law (INC-084e).** The failure reporter writes
  `docs/tracking/e2e-last-failure.md` on EVERY completed E2E run — green, red, or
  its own crash. `scripts/e2e-failure-report.ts` wraps `main` in a top-level
  catch that renders the run/commit header, `REPORTER ERROR: <message + first
stack line>` and a best-effort titles-only failure list, then exits non-zero;
  the workflow publishes that file first and re-raises the exit code afterwards,
  and all three artifact downloads are `continue-on-error` so a missing or
  partial artifact set can never kill the job before the reporter speaks. An
  unreadable `results.json` is a source without results (quoted verbatim), and a
  missing `E2E_CONTEXT_DIR` or unmatched slug is the ordinary
  `context file not found` branch — never a crash. **New CI plumbing rehearses
  the live runner layout in fixtures before first deploy:** both
  `actions/download-artifact@v4` shapes (per-artifact subdirectory with
  `merge-multiple:false`, merged flat) plus the zero-artifact directory are
  permanent self-test fixtures (`scripts/fixtures/e2e-context-layout-*`), as is
  the malformed-results case (`scripts/fixtures/e2e-results-malformed.json`).

- **Tracked-files law (INC-084f).** A fixture exists when `git ls-files` says so.
  Completion reports verify new files are TRACKED, not present; unanchored ignore
  patterns are anchored the moment they bite. `test-results/` in `.gitignore` is
  root-anchored (`/test-results/`) because Playwright's `outputDir` is the repo
  root and nothing else writes a nested `test-results/`; the reporter's layout
  fixtures deliberately mirror that inner path. When a context search finds zero
  files, the reporter prints the glob and every path it walked
  (`reportEmptySearch`), so the next environment gap names itself instead of
  reporting a bare "found 0".
