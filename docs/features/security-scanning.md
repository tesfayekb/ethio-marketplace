# Security scanning (DEC-132)

The security scanning program, as built. Layers A–D; the rules at the end.

## Layer A — GitHub switches (facts)

- Private vulnerability reporting is enabled on the repository (verified 2026-10-06); `SECURITY.md` at the root directs reporters to it.
- Gitleaks runs on every CI push (`secrets-scan` job); the dependency audit (`dependency-audit`, `scripts/audit-gate.sh`) fails on high/critical advisories.

## Layer B — scanners in our own CI

### Semgrep CE (`semgrep` job in `.github/workflows/ci.yml`, "Semgrep (enforcing on ERROR)")

- Version: Semgrep `1.179.0`, installed by `pip install "semgrep==1.179.0"`.
- Rules: a clone of `https://github.com/semgrep/semgrep-rules` checked out at commit `a84ff9cc2453ca91d581380de4b8b3f272f6f4be`; no registry fetch, no `--config p/…`.
- Rule directories: `javascript`, `typescript`, `generic/secrets`. Excluded rule: `i18next-key-format` (304 noise results in the 2026-10-05 baseline; i18n is enforced by the string scan and usage map).
- Scope: `src/`, `e2e/`, `scripts/`.
- What fails: any ERROR-severity finding (printed as `file:line rule-id`). WARNING findings are printed as one count line, never bodies.
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

A weekly reviewer exists and writes its findings to the supervisor's Project, read-only to the repository.

## Layer D — at launch

External review and the ZAP baseline enabled once the repository is private.

## Rules

- What blocks CI: Semgrep ERROR findings, Gitleaks findings, high/critical dependency advisories, the migration guard (including the public-surface and real-row checks).
- Counts are public; finding bodies stay private while the repository is public.
- A finding is an INC the same day it is seen.
