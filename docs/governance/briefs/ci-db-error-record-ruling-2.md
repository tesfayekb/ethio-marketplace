# ci-db-error-record — ruling 2 ("commit 2": the capture admitted; the real fixture)

Base: dev 6aa073a58

````text
RULING — ci-db-error-record, ruling 2: "commit 2". Base: 6aa073a58. Save as docs/governance/briefs/ci-db-error-record-ruling-2.md.
**MODEL — Claude Fable 5.1 (High)**

Run 41966759770 met DEC-340's frozen rule: every lane's "## Migration/start failure" shows "Server record (DEC-340, stream):" with the ERROR, DETAIL, HINT, the three CONTEXT frames naming dec340_planted_raise and the STATEMENT line cut ("(4 statement lines dropped)"). The capture is ADMITTED. The real fixture: ci-evidence commit e6a15b73b, docs/tracking/local-backend-proof.md :90–:100 (lane smoke; merge sha 6c398a79), and the lane artifacts e2e-log-<lane> of that run.

1. Remove the planted migration 20261105041444_94668649.
2. The excerpt test gains SXC-5 (the real record: section, failure and server all carry the ERROR line, the CONTEXT frame naming dec340_planted_raise and each tab-led frame byte for byte; one STATEMENT line ≤ 201 chars; no statement body line; length ≤ 83) and SXC-6 (the same log minus its last record → the "none" one-liner with its counts; no directory → "not captured"); the reporter's INC-973 self-test fixture gains the real local-backend-start-failure.txt lines and asserts the CONTEXT frame reaches "## Backend start failure (INC-973)". Fixtures are the captured text, redacted as captured — never retyped.
3. INC-1053, its own commit in this PR, named in the PR body: ci.yml's preflight job has timeout-minutes 15 (:467) while its wait loop runs 50 × 30 s (:502–:512), so a behind staging ends "cancelled" by the timeout, never as the named STAGING BEHIND failure (run 41969678989, attempt 30 of 50). Fix: the loop sized under the deadline — 28 attempts — and the step's comment ("up to 25 minutes", "after 25 minutes") corrected to 14; nothing else in that job. A defect fix under this lane, G22 noted.
4. Docs: docs/features/ci-local-backend.md — the DEC-340 paragraph under CI-4 naming the excerpt it extends and the two channels; docs/_changelog.md one line. The register row waits: after P-2 (a) merges, `git merge origin/dev` into this branch (never rebase) and add the row with the then-free number — I will say when.
5. Tests, when I say the Mac is free (P-2's checks run first): `bun test scripts/ci/start-failure-excerpt.test.ts` and the reporter's self-test (the command the e2e job runs for it — read ci.yml, do not guess), nothing else; then push ONCE, PR body updated (no planted red remains; the preflight's STAGING BEHIND still expected on dev-based runs? — no: this branch has no unapplied migration, so every job should be green), END THE TURN.
````
