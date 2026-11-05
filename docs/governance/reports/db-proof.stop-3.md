STOP — db-proof ruling 5 item 1: `git merge origin/dev` conflicts with rules 00 and 50
DONE: parts 1–7 (rulings 1–4); nothing of ruling 5 (no merge, no renumbering, no reordering, no db:proof run)
LEFT: ruling 5 items 1–4
CI: not read for this stop (the last read, at ruling 4: 222853a32 — 23 pass, 16 lanes pending, 0 fail)
FILES:
.cursor/rules/00-protocol.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/50-security.mdc
.cursor/rules/60-report.mdc
.github/workflows/local-backend-proof.yml
AGENTS.md
docs/_changelog.md
docs/features/ci-local-backend.md
docs/governance/briefs/db-proof-ruling-1.md
docs/governance/briefs/db-proof-ruling-2.md
docs/governance/briefs/db-proof-ruling-3.md
docs/governance/briefs/db-proof-ruling-4.md
docs/governance/briefs/db-proof.md
docs/governance/mechanisms.md
docs/governance/reports/db-proof.report.md
docs/governance/reports/db-proof.stop-1.md
docs/governance/reports/db-proof.stop-2.md
docs/tracking/incidental-findings.md
package.json
roadmap.md
scripts/ci/local-backend-db.sh
scripts/ci/prepare-local-backend.sh
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/db-proof.test.ts
scripts/db-proof-docker.sh
scripts/db-proof-ports.sh
scripts/db-proof.sh

The conflict. Ruling 5 item 1 says "`git merge origin/dev` into cursor/db-proof (never rebase)". The
rules forbid it in two places:
- Rule 00, Git: "Never: a push to `dev` or `main`, `--force` in any form, `rebase`, `commit --amend`
  after a push, `reset --hard`, `merge`, `pull`, `cherry-pick`, tags, deleting branches, rewriting
  history." and "When `origin/dev` moves during your task, you do not merge or rebase: finish, push,
  and say so in the report; the supervisor rules."
- Rule 50, What you may never run: "Git: … `rebase`; `commit --amend` after a push; `reset --hard`;
  `merge`; `pull`; `cherry-pick`; …" and "A refusal is final: do not look for another way to do the
  same thing."
Rule 00 ranks the rules above a ruling ("A task that conflicts with a rule is a STOP: quote the rule").
So I have not merged, and I have not done the ruling's other items, which follow from the merge.

Measured, read only. After `git fetch origin dev`, origin/dev is d40ab0c26 and the branch is
140401870, clean. Four files are changed on both sides since they parted (`git diff --name-only`
HEAD...origin/dev and origin/dev...HEAD, intersected):
- docs/_changelog.md
- docs/governance/mechanisms.md
- docs/tracking/incidental-findings.md
- roadmap.md
On dev, mechanisms.md holds P-2's rows 109–116 (lines 132–139). incidental-findings.md holds INC-1061
and INC-1062 (lines 5833, 5837), just above the same "Numbering: next free INC-1046." line that this
branch's INC-1063 and INC-1064 also sit above.

The citations of this branch's row 109, for whoever renumbers it (`git grep -c -E "row 109|\| 109 \|"`):
- docs/governance/mechanisms.md: 1 (the row itself)
- docs/tracking/incidental-findings.md: 1 (INC-1063)
- docs/governance/reports/db-proof.report.md: 3
- docs/_changelog.md: 3 (this branch's three lines; the changelog is append-only, so editing them needs
  the ruling's word)
- docs/governance/briefs/db-proof-ruling-2/3/4.md: 1 each — word-for-word records, never edited
- docs/features/ci-local-backend.md: none (it names the row by mechanism, not by number)

What I need, one of:
(a) The operator brings dev into the branch, e.g. GitHub's "Update branch" on PR #23, which writes the
    merge commit. Then a ruling, and I do items 2–4 on top as ordinary commits: renumber to 117, put the
    INC entries in number order, resolve any conflict markers, then the guards, the laws suite and
    db:proof.
(b) A rules change that admits `git merge origin/dev` on the executor's own branch, made by the operator
    (rule 50 bars me from editing `.cursor/**` outside a scope that names it), then this ruling again.
(c) Another route the supervisor rules.
