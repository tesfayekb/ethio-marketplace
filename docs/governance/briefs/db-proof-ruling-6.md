# db-proof — ruling 6 (re-land on a fresh branch; replaces ruling 5)

Base: dev d40ab0c26

```text
RULING 6 — db-proof: re-land on a fresh branch (replaces ruling 5). Base: origin/dev as fetched (d40ab0c26 or newer).
MODEL — Opus 5.5 High.

Your stop 3 was right: rule 00 §Git forbids `merge`, and says "When origin/dev moves during your task, you do not merge or rebase: finish, push, and say so in the report; the supervisor rules." This is that ruling: no merge — a re-land, with only the commands rule 00 allows (fetch, switch -c from origin/dev, add, commit, push, status, diff, log, show, rev-parse, ls-files). Ruling 5's merge step was the supervisor's slip (S540).

NEW STANDING RULE (supervisor; in force now; the next Cursor-rules turn installs it in rule 00): while two lanes are open, a lane's pull request does not edit the four shared ledgers — docs/tracking/incidental-findings.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md. Its records go, verbatim and complete, into a "Records" section of its own report; the records turn lands them. When a lane needs dev's changes, it re-lands as below.

1. `git fetch origin dev`; `git switch -c cursor/db-proof-2 origin/dev`.
2. Every file your branch changed EXCEPT the four ledgers (`git diff --name-only c89271ca2 28f762bc2`): write it from your old head — `git show 28f762bc2:<path> > <path>` — and restore the executable bit on scripts/db-proof.sh and scripts/db-proof-docker.sh (`chmod +x`; `git ls-files -s` shows 100755 once added). Proof: `git diff --stat 28f762bc2 -- <those paths>` is empty.
3. The four ledgers stay exactly as on dev. Your records move into the report's new "Records" section, verbatim: INC-1063's and INC-1064's entries as written, your register row with its number 117 (assigned — P-2 holds 109–116 on dev), your changelog lines and roadmap lines, every citation of your row as 117. Add a "Re-landed" section: why, the old branch's head 28f762bc2, and that rulings 2–4 and the stop reports cite the row as 109 (verbatim records, unchanged; S538).
4. Save this ruling as docs/governance/briefs/db-proof-ruling-6.md.
5. The cheap guards, the laws suite, `bun run db:proof --fresh` → its last line. Push; open a NEW pull request from cursor/db-proof-2, ready, its body naming PR #23 as replaced; END. Report: the copied-file list with the empty stat, the two 100755 lines, the db:proof line.
```
