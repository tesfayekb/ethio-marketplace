# 40 — CI and evidence: what counts as proof

CI is the judge. Your local checks make a commit green-shaped; only a completed CI run on a commit
proves it. You never write "CI green" from a local run.

## Where the evidence lives

CI writes its evidence to branch `ci-evidence` (DEC-098). Read it with git, never from the dev/main
copies (those are frozen pre-DEC-098 text):

```
git fetch origin ci-evidence
git show origin/ci-evidence:docs/tracking/ci-status.md | head -6
git show origin/ci-evidence:docs/tracking/e2e-last-failure.md
git show origin/ci-evidence:docs/tracking/guards-last-failure.md
git show origin/ci-evidence:docs/tracking/flake-ledger.md
```

The two-step read, always both: (1) the conclusion; (2) the reported commit equals the commit you are
judging. A mismatch means that commit's run is unfinished, queued or superseded — STALE, never current.
To see a run that has not reported yet: `gh run list --branch dev --limit 3` and `gh run view <id>`
(read-only) when `gh` is available.

## Reading a red (classify first)

(a) Preflight-only red "STAGING BEHIND: apply <file>" — the supervisor's staging apply is pending (expected after a MIGRATION landing); not yours.
(b) A 522 in global-setup or "fetch failed" — staging down or transport; not a code finding.
(c) A red the report names as expected (a door landed, its screens not yet) — expected; any OTHER red
    in that window is fixed first.
(d) A run cancelled or superseded — no verdict; the shards that finished are still read.
(e) Everything else is yours: read the failure body in `e2e-last-failure.md` / `guards-last-failure.md`
    BEFORE touching code (the body is the brief); fix the cause, not the symptom; a guard failure
    (migration linter, i18n map, format, deletions) is never answered with a re-run.
A flaky pass (DEC-030) is ledgered; it is never your proof. Infrastructure failures in a lane with no
tests run are reported, not fixed.

## What each job proves

`build-and-check` (format:check, lint, typecheck, build, workflow lint, guard self-tests, deletions
guard, root-route names, promote-needs), `component-tests` (vitest incl. every `scripts/conformance`
census), `i18n-usage-map`, `migration-lint` (`check-migrations.sh` with self-tests), `string-scan`,
`listing-write-seam`, `import-gate`, `browse-path-guard`, `marketplace-weight`, `bundle-budget`,
`secrets-scan` (gitleaks), `dependency-audit`, `semgrep`, `e2e-preflight` (migration parity with
staging), 16 numbered E2E lanes + smoke + e-mail on temporary backends built from the repository's
migrations, `e2e` (the merged verdict, server-error census, a11y), `promote` (dev → main, fast-forward
on full green). The pass bar: both viewport projects green at `retries: 0`; no secret
in any log; zero residual `e2e+%` users.

## What you may and may not say

- "CI green on <sha>" only after the two-step read of a completed run on that sha.
- A report's CI line is the first six lines of `ci-status.md` for the last commit you can read.
- Never request a re-run to make a red go away; never ask the operator to paste a log.
- Runs queue (DEC-181): a landing never cancels a running run; GitHub keeps one waiting run per ref and
  replaces it with a newer landing's. Every landing is judged by the next completed run.
- You never wait for CI inside a turn: land, end the turn; the supervisor reads the run and rules.
