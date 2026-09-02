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

### Zero-test results are NO results (INC-086, 2026-08-22)

Run 32564655998: six failed jobs, report read
"Passed 0 · Failed 0 · Sources without results: none", nothing quoted. Each job
HAD uploaded a `results.json` — one that parsed perfectly and contained
`"suites": []`, because the runner died in `webServer`/global setup before a
single test executed. "File exists" was mistaken for "source reported".

Classification per source is now three-way:

- (a) results with **>= 1 recorded test** — normal path (failures, contexts);
- (b) **no parseable results file** — existing "no results file" block;
- (c) **results parse, total tests == 0** — "SOURCE PRODUCED NO TESTS — the
  runner died before executing (webServer/setup)", followed by the last 40 log
  lines and any `[ssr-error]` lines from that source's log.

`Sources without results` in the header counts (b) **and** (c). The count is
structural — `countTests()` walks the suite tree, it does not trust `stats` —
so a reporter-shape change surfaces as a loud miscount, never a fake zero.

Fixture: `scripts/fixtures/e2e-results-empty.json`, captured by running
Playwright locally with an impossible `--grep` (CLASS RULE: reporter fixtures
are captured from real output, never authored from assumption). The self-test
adds the **wipeout case** — every source zero-test — asserting the log tails
are quoted and the header names both sources instead of "none".

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

- **Slug law (INC-084g).** Playwright names a failure's output directory from
  the whole `titlePath` — spec base, every enclosing `describe` title, then the
  test title — middle-truncated with a five-hex-digit hash when long. The
  reporter's matcher builds its core the same way (the file suite is skipped: it
  already supplies the spec base). Reporter fixtures must cover BOTH shapes:
  describe-less (`scripts/fixtures/e2e-context-sample`) and describe-nested
  (`scripts/fixtures/e2e-context-sample-describe`), both captured from real
  Playwright output. The self-test fails if a describe-nested failure cannot
  resolve its `error-context.md`.

- **SSR error page instrumentation (INC-085c).** The SSR error page is
  instrumented: the server logs `[ssr-error]` with the true exception (request
  path, message, first stack lines) so shard log tails carry the cause; DEV
  builds embed it in the page (`<!-- ssr-error: … -->` plus `data-ssr-error` on
  the card) so Playwright snapshots record it; `gotoReady` retries the error
  page once and then fails NAMED (`SSR error page twice for <url>: <cause>`).
  Durable candidate registered: CI serves a production build (requires an E2E
  build mode for the DEV hooks) — ACT when the named evidence justifies it.

- **Built-app E2E (DEC-018, INC-085d).** CI no longer serves the Vite dev server.
  Every E2E job runs `bun run build:e2e` (a normal production build with
  `VITE_E2E=1`) and Playwright's `webServer` serves `dist/` through
  `bunx wrangler dev -c dist/server/wrangler.json` — the same Cloudflare worker
  runtime production uses. Locally the loop is unchanged (`vite dev`); the built
  path is selected by `E2E_SERVE_BUILT=1`, set in the workflows only. Each job
  builds its own `dist/` (seconds, and the build needs that job's `VITE_*` env);
  no build artifact is shared. Test-only instruments (`__ethioSupabase`,
  `__ethioQueryClient`, `__ethioSessionPolicy`, `__ethioStepUp`, the `/dev/*`
  fixture routes, the SSR error page's visible cause) are gated on
  `isE2E` from `src/lib/env-flags.ts` — `import.meta.env.DEV ||
import.meta.env.VITE_E2E === "1"` — so they exist in dev and in the E2E build
  and are compiled out of the production build (verified: a plain `bun run build`
  contains none of the window hooks).
  `src/lib/error-page.ts` stays dependency-free and inlines the same condition
  rather than importing the flag module.

- **Pinned build target + build-output verify (INC-085e).** The e2e build's
  server target is PINNED (never environment-detected); the verify step fails the
  job at build time with the emitted tree if the shape drifts — a serve step may
  never discover a missing build. Mechanism: `@lovable.dev/vite-tanstack-config`
  forces `preset: "cloudflare-module"`, the `dist/{server,client}` output layout
  and `cloudflare.deployConfig` ONLY when it detects a Lovable sandbox
  (`LOVABLE_SANDBOX`/`SANDBOX`); outside it, nitro receives just
  `defaultPreset: "cloudflare-module"` and emits its own default layout with no
  `dist/server/wrangler.json`. `vite.config.ts` now passes those same values
  through the wrapper's supported `nitro: { ... }` option, so CI and the sandbox
  resolve identically. Every job that builds for E2E runs, immediately after the
  build, `Verify e2e build output` — `test -f dist/server/wrangler.json` or an
  `::error::` plus `find dist .output -maxdepth 3 -type f | head -60`.

- **Document-response guard (DEC-018).** `e2e/fixtures.ts` exports the extended
  `test`/`expect` that every spec imports. An auto-fixture watches every document
  response: a 5xx or the SSR error page's marker triggers ONE automatic reload,
  and a second occurrence fails the test NAMED, quoting the cause the page
  carries. `gotoReady` delegates to that guard instead of keeping its own retry,
  so there is exactly one retry policy in the harness.

- **Server errors in the failure report.** `scripts/e2e-failure-report.ts` reads
  the full log of EVERY failed source (not only sources that produced no
  results) and quotes every `[ssr-error]` line under `## Server errors: <source>`;
  a source with none says so explicitly. The context matcher gained a
  CONTAINMENT fallback: when Playwright's truncation leaves no clean
  `-<5 hex>-` seam (apostrophes collapse into the hash), a candidate directory
  is accepted if its non-hash tokens are an order-preserving subsequence of the
  expected slug's tokens; the self-test proves it matches the switcher slug and
  refuses a foreign directory.

- **Hydration contract (INC-085f).** The app declares its own readiness:
  `RootComponent` sets `data-app-ready="1"` on `<html>` in a root effect, only
  after React has successfully hydrated. `waitForHydration` polls that
  attribute and, on a 15 s timeout, throws the NAMED error
  `app never declared ready — SSR marker <present/absent>, likely client crash;
see [client-error] lines`. Readiness is never inferred from framework
  internals (the old gate polled React's dev-era `__reactProps$` markers, which
  made "not yet hydrated" and "crashed during hydration" indistinguishable
  under the production build).

- **Client errors in the failure report (INC-085f).** The `e2e/fixtures.ts`
  auto-fixture buffers the last 20 `pageerror` throws and console errors per
  test; when the test fails it attaches them as `client-errors` AND prints each
  as a `[client-error]` line. The reporter greps both channels with ONE shared
  helper (`grepTag`) and renders `## Client errors: <source>` beside
  `## Server errors: <source>`; a source with none says so explicitly. Every
  runtime error channel — server log, browser console, page error — has a
  capture path into the evidence file.

## DEC-020 — CI on dev, fast-forward promote to main

CI's push trigger targets `dev` only. A final `promote` job
("Promote to main (fast-forward on green)") needs EVERY job in the workflow —
`build-and-check`, `secrets-scan`, `migration-lint`, `string-scan`,
`listing-write-seam`, `browse-path-guard`, `marketplace-weight`,
`bundle-budget`, `dependency-audit`, `e2e-preflight`, `e2e-smoke`,
`e2e-shard`, `e2e-email`, `e2e` — and runs only when
`github.ref == 'refs/heads/dev' && success()`. It fetches `origin/main`,
refuses with a named `::error::` unless `origin/main` is an ancestor of the
tested HEAD (`git merge-base --is-ancestor`), and then pushes
`HEAD:main`. Fast-forward is the only allowed motion: never a merge, never a
rebase — a divergence is a manual reconcile, per the decision record.

Known mechanics:

- The reporters' `[skip ci]` tracking commits (`ci-status.md`,
  `e2e-last-failure.md`) land on dev AFTER the tested SHA, so dev may sit
  ahead of main by tracking commits until the next promote. That gap is
  always fast-forwardable — the ancestry guard passes and the promote carries
  the tracking commits along.
- main hosts no push-triggered CI BY DESIGN: its greenness is certified by
  dev's run at the identical SHA. The `paths-ignore` list is irrelevant
  there; the promote push never triggers a run.
- Nightly follows the repository DEFAULT branch — the operator flips the
  default to dev after the first green promote, or nightly keeps testing
  stale main.
- EVERY committing workflow targets dev. `ci-status-report.yml` checks out dev
  and pushes `HEAD:dev`; `nightly-e2e.yml`'s heartbeat fetches, resets and
  pushes dev; ci.yml's e2e report job already did. No workflow but `promote`
  writes to main.

### sync-main — the only sanctioned non-fast-forward path

`ci-status-report.yml` carries a second job, `sync-main — DEC-020 divergence
repair`, gated to `workflow_dispatch` (the `report` job is gated to
`workflow_run`, so a dispatch never writes a status file). It checks out dev,
echoes both directions of the divergence — commits on main that will be
DISCARDED and commits on dev that will be ADOPTED — and then force-pushes dev
onto main with `--force-with-lease` pinned to the SHA it just read.

It is operator-triggered ONLY, and it is used in exactly one situation: the
promote guard failed with `MAIN DIVERGED`, whose message now appends "run the
sync-main dispatch after confirming main's extra commits are tracking-only".
The operator confirms from the guard output that main's extra commits are
tracking commits (`ci-status.md`, `e2e-last-failure.md`, `[skip ci]`) and
nothing else, then dispatches. Any other divergence — real work stranded on
main — is a manual reconcile, never this button.

## DEC-023-B — the changed-spec fast lane (signal only)

`ci.yml`'s `e2e-changed` job ("E2E changed specs (fast lane)") runs after
`e2e-preflight`. It computes the spec files this branch touched with
`git diff --name-only <merge-base origin/main HEAD>...HEAD -- 'e2e/*.spec.ts'`,
caps the set at 5 files, and skips cleanly when the set is empty, over the cap,
or when no merge-base exists. When it has work it runs those files in ONE job,
both viewport projects, `--workers=2`, with the same staging env, built-app
serve and `E2E_FAKE_TRANSLATE=1` as the matrix, uploading `e2e-results-changed`
and `e2e-log-changed`.

WHY: it is a plan-gated substitute for the local authenticated runs required by
DEC-023 (A6/A7) that the executor cannot perform — its environment holds no
staging credentials. A spec edit therefore gets an authenticated verdict in
minutes instead of one full matrix cycle.

AUTHORITY: none. The merged verdict job ("E2E (Playwright, ethio-staging)")
`needs:` exactly `e2e-smoke`, `e2e-shard`, `e2e-email`, and its `E2E_GREEN`
expression reads those three results only. The fast lane cannot turn a red
matrix green or a green matrix red; it only adds a labelled source to the
merged report. The job is marked `continue-on-error: true` so a lane-only
red while the full matrix is green cannot block promotion.

REPORTER: `E2E_EXPECTED_SOURCES` gained an OPTIONAL-id suffix. `changed?` is
read and labelled exactly like any other source when the lane uploaded results,
and omitted silently when it skipped — a skipped signal lane must never render
as a missing-source alarm. Required ids are unchanged: their absence is still
reported with the log tail.

AUTO-RETIRE: if executor-side staging secrets ever arrive (DEC-023 proper),
delete this job — local runs then carry the same signal at zero CI cost.

## DEC-024 — shard capacity knob (2 workers)

The four `e2e-shard` matrix jobs export `E2E_WORKERS: "2"`;
`playwright.config.ts` honors `E2E_WORKERS` when set and otherwise stays at
`workers: 1`. This is safe by construction: mutable-fixture identity enumerates
every parallelism axis — run id × job (`E2E_SHARD`) × worker × project × test
(INC-096f-c) — so two workers in one shard process can never share a scratch
key, and the global-setup stale-scratch reaper (INC-096g) heals any mid-test
death.

Smoke (`e2e-smoke`) and the email-serial job are untouched and stay serial by
design: the smoke spec's pass bar is flake-measured at `retries: 0`, and the
Auth email/signup rate limit is per-project per-hour (INC-082).

REVERT RULE: if any cross-worker interference class appears, the knob returns
to `1` BEFORE the class is even diagnosed — capacity is a convenience, never a
thing to defend.

## INC-100 — the re-run artifact contract (2026-08-31)

`actions/upload-artifact@v4` REFUSES a same-named artifact that already exists,
so a re-run job's evidence was dropped and the merged reporter either read
attempt 1's artifacts or nothing at all. Run 33367384491 attempt 2 published
"Passed 0 · Skipped 0 · Failed 0" while shards 1/3 and the changed lane were
visibly red.

LAW, in two halves:

1. **Evidence artifacts are overwrite-on-rerun.** Every E2E upload in
   `ci.yml` and `nightly-e2e.yml` — results, log tails, error contexts, HTML
   reports, changed lane — carries `overwrite: true`.
2. **The report names its attempt.** `scripts/e2e-failure-report.ts` renders
   `- Attempt: N` (from `GITHUB_RUN_ATTEMPT`, default `1`) in the header of
   every report shape: sources, green and REPORTER ERROR. The merged job's
   "Verify the downloaded artifacts belong to this attempt" step prints the
   attempt, lists the downloaded `results.json` files, and annotates any e2e
   artifact whose `updated_at` predates the attempt's first job start — plus a
   zero-download on attempt >= 2 — as an `INC-100 BROKEN ARTIFACT CONTRACT`
   error. It is `continue-on-error` on purpose: the reporter must still publish.

READING RULE: a wipeout on attempt >= 2 with a green preflight now reads as
"artifact contract broken", never as "no tests ran".

## DEC-019-B — the worker compatibility date is pinned (2026-09-01)

Nitro resolves an unset `compatibilityDate` to `"latest"`, i.e. the BUILD DAY,
and the cloudflare preset writes it into `dist/server/wrangler.json` as
`compatibility_date`. The pinned `wrangler` in `serve:e2e:built:cloudflare`
runs a workerd binary whose newest supported date is never newer than its
release day, so the nightly cloudflare-parity smoke refused to boot on every
calendar boundary (nightly run 33516364647: "requires compatibility date
2026-09-01, newest supported 2026-08-27") and the parity signal was, in
practice, permanently absent.

PIN: `vite.config.ts` sets `nitro.compatibilityDate: "2026-08-27"` (option name
censused on the installed nitro 3.0.260603-beta: `compatibilityDate` on
`NitroConfig`, string or per-platform object). The Lovable sandbox branch of
the config wrapper re-applies the same constants for preset/output/cloudflare;
the pin passes through verbatim, so both environments resolve identically.

BUMP RULE: raise the pin ONLY when the pinned wrangler supports the newer date,
and land the pin and the wrangler version TOGETHER in one change. A parity
refusal is no longer an excused runtime class — it is a gating failure whose
remedy is exactly that bump.

## DEC-028 — global-state specs are serial-only and non-gating (2026-09-01)

Tests that mutate shared global state (`@global-state`) never run in the
parallel matrix or the fast lane; they run in the serial nightly only.
Quarantined failures are reported, labeled, and non-gating until DEC-026
component coverage lands; un-quarantining requires a green nightly streak of 7
and a DEC note.

MECHANICS:

- `.github/workflows/ci.yml` — the smoke tier, the four-way shard matrix and
  the changed-spec fast lane all pass `--grep-invert "@global-state"`, so a
  tagged spec cannot execute next to a sibling mutating the same surface.
- `.github/workflows/nightly-e2e.yml` — after the real-elapsed-time cases, one
  step runs the FULL suite (`--workers=1`, both projects) including the tagged
  specs. Its results are collected as the reporter source `full` alongside
  `nightly` (the first run's `results.json` is stashed before the second
  overwrites it).
- `scripts/e2e-failure-report.ts` — `isQuarantined()` / `classifyFailures()`
  split the failures; the report header carries
  `- Gating failures: N · Quarantined (@global-state, INC-117, non-gating): M`
  and each quarantined block keeps its `Class:` label. With
  `E2E_VERDICT_PATH` set, the reporter writes `gating=`/`quarantined=`/`silent=`
  for the workflow to read. A source that produced NO results is never
  quarantinable — the runner died, which gates on its own (law F4).
- The nightly heartbeat conclusion and the final "Report test outcome" step
  read `gating` only. A quarantined red therefore appears in
  `docs/tracking/nightly-last-failure.md` with its INC-117 label while
  `docs/tracking/nightly-status.md` stays SUCCESS; a MISSING verdict file is
  treated as gating, never as green.

## DEC-030 — flake ledger: retries are evidence, not concealment (2026-09-01)

The parallel matrix (smoke tier, four-way shard matrix, changed-spec fast lane)
runs with `retries: 1` so ONE infrastructural blip does not red a whole push.
The serial nightly keeps `retries: 0` — acceptance measurement needs the
unretried truth. LAW: **a test flaky 3× in 7 days gets an INC and root-cause
work; retries are evidence, not concealment.**

MECHANICS:

- `playwright.config.ts` — `retries: E2E_RETRIES ?? (CI ? 1 : 0)`; the nightly
  workflow exports `E2E_RETRIES: "0"` for both of its runs.
- `scripts/e2e-failure-report.ts` — `collect()` splits Playwright's `flaky`
  status out of the failure list into its own `flaky[]`. The evidence file
  carries `- Flaky (passed on retry, DEC-030, non-gating): N` in the header and
  a `## Flake ledger (DEC-030)` section naming every one of them, and the
  verdict file gains a `flaky=` field. A flaky test NEVER gates.
- `docs/tracking/flake-ledger.md` — one appended line per flaky test
  (`ledgerLines()`): date, project, title, lane, run URL, commit, first error
  line. Append-only; CI commits it with `[skip ci]` on the same `dev` push as
  the evidence file, re-appending after the fetch/reset so a concurrent run's
  lines are never overwritten.
- LEDGER-ONLY PASS — a run whose only anomaly was a retry-recovered test is
  GREEN, so the green branch would hide it. CI runs the reporter a second time
  with `E2E_FLAKE_ONLY=1`: same sources, ledger appended, no evidence file and
  no verdict written.
- SELF-TEST — `SELF_TEST=1` proves the split in both directions on the REAL
  captured `results.json` with one test's status flipped to `flaky`: the flaky
  test leaves the failure list, the ledger section and header line render, one
  ledger line is produced, and an ordinary red renders NO ledger section.

## DEC-029 — E2E wall-clock: session injection, one build, six shards

Three levers, landed together; each is independently revertible.

1. **SESSION INJECTION** (`e2e/helpers/session.ts`). Specs whose subject is not
   the auth door no longer drive the sign-in form. `signIn()` / `switchUser()`
   keep their signatures; internally they do a node-side password grant against
   staging (cached per persona per WORKER process), inject the exact bytes
   supabase-js persists — `sb-<ref>-auth-token` in `localStorage`, plain JSON of
   the GoTrue token response — via `addInitScript` BEFORE the first navigation,
   then make the same signed-in assertion the UI path ended on.
   - **LAW: auth specs never inject.** `isAuthSpec()` matches
     `e2e/auth-*.spec.ts` by path, so sign-in, sign-up, sign-out, callback,
     reset, Google and step-up enrolment keep the real UI flows. Opting in is
     impossible; opting out is automatic.
   - `stepUpIfPrompted` and the TOTP helpers are untouched everywhere.
   - **REVERT KNOB (pre-committed): `E2E_UI_LOGIN=1`** restores the UI path
     globally; the old code path is kept intact, not deleted. Any auth-derived
     flake class after this landing FLIPS THE KNOB FIRST and diagnoses second.
2. **ONE SHARED BUILD** — job `e2e-build` (after `e2e-preflight`) runs
   `bun run build:e2e` once and uploads `dist` as artifact `e2e-dist`
   (`overwrite: true`, INC-100's re-run contract). `e2e-smoke`, `e2e-changed`,
   `e2e-shard` and `e2e-email` download it instead of building; each keeps its
   `Verify e2e build output` step. The build was invoked as an explicit CI step
   in those four jobs and nowhere else — `scripts/serve-e2e-node.ts` only
   executes `dist/server/index.mjs`, so serving a downloaded dist needs no
   change. `VITE_E2E=1` and the staging `VITE_SUPABASE_*` pair are identical for
   every consumer, which is what makes one artifact legitimate; runtime env
   (`E2E_FAKE_TRANSLATE`, `E2E_SHARD`, …) stays per-job.
3. **SIX SHARDS** — the matrix is `[1..6]` and the split flag is
   `--shard=${{ matrix.shard }}/6` (Playwright's flag; `E2E_SHARD` remains the
   fixture-ownership axis and still carries the same id). The reporter's
   expected sources are `smoke,email,1,2,3,4,5,6,changed?` (default
   `smoke,1,2,3,4,5,6`), so a missing shard 5/6 is reported as a dead source
   rather than silently dropped. Smoke, email and the nightly are untouched.

### DEC-029-B — the knob is ENGAGED (INC-120)

Run 33560575803 produced 16 failures that all share one shape: a P0009
`step-up required` 500 on a step-up-gated RPC, with no client prompt beforehand.
Injection was therefore taken **off in CI** for that landing — every E2E job set
`E2E_UI_LOGIN: "1"`. Levers 2 and 3 (the `e2e-build` artifact and the six
shards) STAYED: they are unrelated to the seam and are the measured win.

**MEASURED (this run vs the last pre-DEC-029 green).** Build-once and six shards
are already live: smoke 1.1m, shards ~2m each, plus a one-off `e2e-build` of
~1.5m shared by all eight consumers — against the pre-029 shape where each of
four shards paid its own ~1.5m build on top of a ~4m spec run. Exact per-job
wall-clocks for THIS push are only readable from the Actions run it triggers;
the numbers above are the observed shape, not a projection.

### DEC-029-E — injection is PARKED; the knob remains the standing rollback

`E2E_UI_LOGIN: "1"` is set in all four E2E jobs (`e2e-smoke`, `e2e-changed`,
`e2e-shard`, `e2e-email`) per the pre-committed DEC-029 rule: two successive
injection-seam fixes (INC-120, INC-120b) each cured one persona shape and
exposed another, so the lever is parked rather than chased. Levers 2 and 3 stay
LIVE: the shared `e2e-build` artifact and the six-shard matrix are the measured
win and are unchanged.

The variable itself is NOT removed from the harness: removing `E2E_UI_LOGIN`
from a job env (or unsetting it locally) would re-engage injection, and setting
`E2E_UI_LOGIN=1` anywhere still short-circuits every caller back to the UI path.
That remains the first move for any auth-derived flake class, diagnosis second.

**The law, unchanged.** `e2e/auth-*.spec.ts` never inject (`isAuthSpec()`
enforces it by file path). Credential-lifecycle tests — password rotation,
signed-out assertions, factor enrolment — pass `{ uiLogin: true }` explicitly,
because their subject IS the credential: S-3 (`e2e/settings.spec.ts`) carries it
on both of its sign-in calls.

**The verdict is CI, not this document.** The step-up families are the proof
surface: TR-11 / 13 / 16 / 23 / 26, RP-1 / 4 / 5 / 11, IMP-1 / 2, AU-10, S-3.
A P0009 `step-up required` 500 with no preceding modal is the INC-120 shape
returning — flip the knob, then diagnose.

**When injection returns.** Re-engaging lever 1 requires a green CI run with
`E2E_UI_LOGIN` removed from a feature branch, plus a DEC note naming the
component-layer change (DEC-026) that makes the client step-up gate safe under
injected sessions. Until that note exists, the knob stays engaged in `dev`.

## DEC-025 — typed Supabase clients (2026-09-02)

**Rule.** Every `createClient` in `src/**` passes the generated schema:
`createClient<Database>(url, key, …)`. An ESLint rule
(`no-restricted-syntax`, selector
`CallExpression[callee.name='createClient']:not([typeArguments])`, censused
against the installed `@typescript-eslint` — v6+ hangs the generic list off
`typeArguments`) errors on any call without one; the message cites DEC-025.

**Rationale.** An untyped client types every table, column and RPC argument as
`any`, so the compiler cannot see a misspelled argument name.

**The INC it would have prevented.** INC-096d — `_user_id` compiled and shipped
against a function declaring `p_user_id`; PostgREST answered
function-not-found at runtime instead of the build failing.

**Scope note (honest).** The rule covers `src/**` only, as specified. The
`e2e/` service client and the `scripts/` clients are left untyped and
un-linted: they read tables the generated `Database` type also covers, but
typing them is not in this landing's scope. `src/routes/api/translate.ts`
(both caller-context clients) and `src/features/auth/auth-service.ts` (the
password verifier) are the two call sites this landing typed.

## DEC-026 — component tests (2026-09-02)

**Rule.** `bun run test:unit` (vitest + Testing Library + jsdom, setup in
`src/test/setup.ts`) runs as the gating CI job **Component tests**. Data seams
are mocked at their `*-service.ts` boundary — a component test never reaches
Supabase, the network, or the build pipeline.

**LAW.** Every NEW component ships a states test (loading / empty / error /
populated) in the SAME landing. A6 gains "test:unit ✓" for any
component-touching work.

**Rationale.** The presentation defects this project paid the most for were all
observable in a single render; they were caught instead by a 20-minute
Playwright shard, or by an operator's walk.

**The seed suite, one test per past expensive class.**

| File                                                      | Class                                                                                  | The INC it would have prevented |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------- |
| `src/features/admin/translations/approve-bar.test.tsx`    | zero-state renders the caption BESIDE the control, never instead of it                 | INC-095l                        |
| `src/components/language-switcher.test.tsx`               | options come from the gate's own list (incl. a DB-only language), ordered (sort, code) | INC-098 / INC-107 / INC-099b    |
| `src/features/admin/translations/ai-bulk-bar.test.tsx`    | a pending/errored count never renders as "(0)"                                         | INC-119                         |
| `src/features/admin/translations/history-drawer.test.tsx` | all four C4 states render and are translated                                           | C4                              |

## DEC-027 — spec lint (2026-09-02)

**Rule.** An `e2e/**` ESLint override errors on three constructs:

```js
{
  files: ["e2e/**/*.ts"],
  rules: {
    "no-restricted-syntax": [
      "error",
      { selector: "CallExpression[callee.property.name='first']", message: "twin helpers per J5" },
      {
        selector: "MemberExpression[object.name='test'][property.name='only']",
        message: "test.only never lands: it silently green-washes the whole file",
      },
      {
        selector: "CallExpression[callee.property.name='waitForTimeout']",
        message: "poll on truth, never sleep",
      },
    ],
  },
}
```

**Rationale.** `.first()` picks whichever twin the responsive layout happened
to render, `test.only` green-washes a whole file, and a sleep asserts the
clock instead of the truth.

**The INC each would have prevented.** INC-095/INC-119c (bare-prefix `.first()`
resolving to the hidden twin) and the timeout-shaped flakes behind DEC-030.

**Grandfathering census (38 lines, all carrying a per-line disable that says
why).** `.first()` — `shell.spec.ts` ×15, `helpers/ui.ts` ×2,
`admin-audit.spec.ts` ×2, `fixtures.ts` ×1, `admin-roles.spec.ts` ×1,
`admin-users.spec.ts` ×1, `auth-signup.spec.ts` ×1, `category-nav.spec.ts` ×1,
`settings.spec.ts` ×1, `nightly/auth-resend-exhaustion.spec.ts` ×1.
`waitForTimeout` — `shell.spec.ts` ×2, `helpers/ui.ts` ×3,
`auth-signout.spec.ts` ×2, `nightly/auth-resend-exhaustion.spec.ts` ×3,
`fixtures.ts` ×1, `mfa-stepup.spec.ts` ×1. `test.only` — zero occurrences. The
disables are grandfathering, not absolution: each is a tracked sweep candidate,
and NEW code cannot add one without saying why on the line.

## A6 addendum (U4i-5) — the usage map is generated, never hand-kept

**LAW.** Key-adding landings run `bun run i18n:usage` and COMMIT the map
(`docs/generated/i18n-usage.json` + the byte-identical `public/i18n-usage.json`).
The freshness guard (`git diff --exit-code` after a regen) going red on a
key-adding landing is the guard being CORRECT, not flaky: new keys landed
without a regen. Fix is the regen and the commit, never a guard relaxation.
