# Security scanning (DEC-132)

The security scanning program, as built. Layers A–D; the rules at the end.

## Layer A — GitHub switches (facts)

GitHub-native, switched on by the operator on 2026-10-05 and free while the repository is public: Dependabot alerts (alerts only, no Dependabot pull requests), CodeQL default setup, secret scanning, private vulnerability reporting (`SECURITY.md` points reporters to it). Push protection stays off until the supervisor's call. In our own CI since before this program: Gitleaks on every push; the dependency audit, failing on high and critical advisories.

## Layer B — scanners in our own CI

### Semgrep CE (`semgrep` job in `.github/workflows/ci.yml`, "Semgrep (enforcing on ERROR)")

- Version: Semgrep `1.179.0`, installed by `pip install "semgrep==1.179.0"`.
- Rules: a clone of `https://github.com/semgrep/semgrep-rules` checked out at commit `a84ff9cc2453ca91d581380de4b8b3f272f6f4be`; no registry fetch, no `--config p/…`.
- Rule directories: `javascript`, `typescript`, `generic/secrets`. Excluded rule: `i18next-key-format` (304 noise results in the 2026-10-05 baseline; i18n is enforced by the string scan and usage map).
- Scope: `src/`, `e2e/`, `scripts/`.
- What fails: any ERROR-severity finding. The job prints counts only — `Semgrep counts: ERROR=n WARNING=m` — never a path, a line or a rule id: the job log and the ci-evidence files are public. A finding's body is read in Security → Code scanning (choose branch dev, tool Semgrep) or reproduced locally with the pinned version and rules. INFO-level results are not collected.
- SARIF is uploaded to code scanning (`github/codeql-action/upload-sarif`; job permissions `contents: read`, `security-events: write`).
- Self-test first: `scripts/fixtures/semgrep/bad-example.js` plants one ERROR finding (`jwt-none-alg`); the job fails unless it is found. The fixture directory is excluded from the enforcing scan.
- Also excluded: `scripts/fixtures/e2e-results-sample.json` — a captured reporter fixture (INC-083, bytes not edited) carrying a planted synthetic JWT (`{"alg":"HS256"}`/`{"sub":"123"}`) that the failure reporter's redaction self-test must strip; it is a guard input, not a credential.
- The job is a `promote` dependency.

### OWASP ZAP baseline (`.github/workflows/zap-baseline.yml`)

- `workflow_dispatch` only, `zaproxy/action-baseline` v0.15.0 pinned by commit, target the published site, report kept as a job artifact (never on ci-evidence).
- Off by design: DISABLED until the repository is private (DEC-116) — a public DAST report is a public map. Nothing dispatches it.

### Database security lints — census only (Bundle 6, B2)

- CI holds two secrets: `E2E_SUPABASE_SERVICE_ROLE_KEY` (staging) and `GITHUB_TOKEN`; no Supabase Management API token.
- Option (i), the Management API advisors endpoint, needs a personal access token CI does not hold and that reaches every project of the account.
- Option (ii), a `public.security_lints()` SECURITY DEFINER function embedding splinter queries (RLS disabled on a public table, SECURITY DEFINER views, functions executable by anon, mutable search_path), returning name, level and count only, EXECUTE to service_role only, called by the nightly over the service-role REST the E2E global setup already uses.
- Recommended: option (ii). Open design; the build is a later bundle's, by the supervisor's ruling.

## Layer C — weekly reviewer

A weekly read-only security review (Mondays): a diff review of the week's migrations, routes, dependencies and tracked files, Semgrep and Gitleaks run locally, the ci-evidence files read. It writes a dated report to the supervisor's Project and never writes to the repository.

## Layer D — at launch

At launch: Cloudflare in front of the site (Bot Fight Mode, the free managed WAF ruleset, a rate rule on the sign-in and posting paths, Security Events read weekly); Supabase auth rate limits and logs; the app's own security heartbeats; the ZAP baseline workflow enabled once the repository is private (DEC-116); a paid penetration test weighed at the Ethiopia-entity milestone.

## Rules

- What blocks CI: Semgrep ERROR findings, Gitleaks findings, high/critical dependency advisories, the migration guard (including the public-surface and real-row checks).
- Counts are public; finding bodies stay private while the repository is public.
- A finding is an INC the same day it is seen.

## Bundle 7 note

`listing_locations` is written through the posting doors only (M10 removed signed-in write privileges). The lints and DEC-148's rule land with Part E.

## Database lints (DEC-132 layer B, option ii; DEC-148)

`public.security_lints()` (service role only) answers five counts and nothing else: `rls_disabled_in_public` ERROR, `security_definer_view` ERROR, `function_executable_by_anon` ERROR, `function_search_path_mutable` WARN, `table_writable_by_client` WARN (a table any client role can insert, update, delete or truncate — and, since INC-535, a table with a column grant of INSERT or UPDATE to a client role). The nightly runs `scripts/security-lints.ts` against ethio-staging and compares with `scripts/security-lints-baseline.json`: an ERROR count above baseline fails the run; a WARN count above baseline prints a warning; a count below baseline prints "baseline can be lowered"; a missing or unknown name fails. The baseline changes only in a commit whose changelog line says why. Counts only in the log. The admin tables, the places table and the profiles table are written through their doors only.

## The workflow token and the scan's rule set (DEC-153)

- The token's default is read-only: `.github/workflows/ci.yml` and `nightly-e2e.yml` declare `permissions: contents: read` at the top. Jobs that hold more say so and why: the Semgrep job `security-events: write` (the SARIF upload); the secrets scan `pull-requests: read` (Gitleaks reads the pull request it runs on); the E2E job and the promote job `contents: write` (the evidence publish to ci-evidence; the fast-forward of main); the nightly job `contents: write` (its evidence publish).
- The scan's rule set is the pinned clone less three removed rule files. `scripts/semgrep-sarif-filter.py` runs its self-test, then filters the SARIF before upload: a suppressed result is dropped, an ERROR is kept anywhere, a WARNING in test code (e2e/, `*.test.ts(x)`) is dropped; it prints counts only and fails on any ERROR.
- Suppression form: a reason line, then `// nosemgrep: <rule>` on the line above the reviewed site. The reviewed sites are found by searching the tree for `nosemgrep:`.
- The scan on 518da704 as the supervisor read it: ERROR=0, WARNING kept 0, WARNING dropped as test code 13, suppressed 9.
- The code-scanning status page follows the CI workflow's last result on the branch.