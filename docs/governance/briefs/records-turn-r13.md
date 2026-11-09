# Records turn R13 — brief (sha256 739fd9a4fb86ba6b96502cdd613efb4366814f8e0e2defbf889dd4c3045f50c1)

````text
RECORDS TURN R13 — the records of block S88 brought into the repository (G41): the decisions DEC-347 → DEC-360 and D319 → D321, INC-1068 → INC-1093 and INC-1066's later word (the Records sections of docs/governance/reports/f1-doors-1.report.md, p2-promote.report.md, p2-fold-c1.report.md, p2-fold-c2a.report.md, p2-fold-c2b.report.md and p2-fold-c3.report.md imported word for word, each under its heading with the supervisor's later word), slips S541 → S566, the rules in force since instructions v1.16 (the new lines), system-state, the handoff of 2026-11-09, the register rows 119 → 131 and row 73's live half, the roadmap and the changelog. Records only — no code, no migration, no plan phase. This turn is the ONE lane that edits the shared ledgers (DEC-346); no other lane is open while it runs.

Base: dev 68347c94c

THE DATA: the folder the operator named in the first line of this message (the unzipped `r13-data.zip`): nine record files, `r13_apply.py` (the supervisor's script — read it, change nothing in it), `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the eight sha256 lines step 4 must print).

THE TURN, IN THIS ORDER
1. `git fetch origin && git switch -c cursor/records-r13 origin/dev`; `git rev-parse --short=9 HEAD` must print 68347c94c. If dev has moved, STOP and say so: every sha256 below assumes 68347c94c unchanged.
2. STEP 0: save this brief — the text between the message's BEGIN BRIEF and END BRIEF lines, with its final newline — byte for byte as docs/governance/briefs/records-turn-r13.md, in one fenced block (four backticks, as R12's brief docs/governance/briefs/records-turn-r12.md), by a scripted copy (never retyped), and prove its sha256 equals the value printed after END BRIEF. Roadmap line 3 is written by the script in step 4, not by hand.
3. In the data folder run `sha256sum -c data-shas.txt`: every line OK. A mismatch is a STOP (the unzip is damaged; nothing is applied).
4. From the repository root run `python3 <data folder>/r13_apply.py <data folder> .` once. It changes or creates exactly eight paths (roadmap line 3 included) and prints one sha256 line per path. Every line must equal EXPECTED below. A mismatch is a STOP: report the differing path and `git diff` of it; change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting; a defect you notice in them (a number used twice, a path that does not exist, a wrong date or sha) goes in the report's FINDINGS section, unchanged in the files.
6. `bun run checks`; paste its last line. A red is fixed only if it is this turn's own (a formatting of a record is NOT yours to make — report it as a STOP; the computer-class reds are named under Limits as before). `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md` must pass (the supervisor ran prettier 3.8.3 on the simulated result: clean).
7. Commit with the first line `records turn R13: block S88, INC-1068 → INC-1093, the handoff` and the detail in the body (block S88, DEC-347 → DEC-360, D319 → D321, S541 → S566, the register rows 119 → 131, the handoff of 2026-11-09; G41), with the attribution the rules require; push; open the pull request into dev (`gh pr create`, title "Records turn R13"); `gh pr checks --watch`; when every check is green, the "every check green" comment per rule 00. Do not merge: the operator merges with a merge commit after the supervisor's verification. No report-only re-push: the report commit rides with this commit's run or is read without a run of its own.
8. END with the report saved as docs/governance/reports/records-turn-r13.report.md: step 2's sha256; the eight printed sha256 lines; the checks' last line; `git diff --name-only 68347c94c` (expected: the eight paths, this brief and this report — ten); the pull request's link and its CI line; FINDINGS (anything major noticed, file:line — or "none"); K2 (expected "none — records only").

EXPECTED (step 4)
21f8fdd586d4d5a5dd695915ecaaab842c04c59bdf5f4692d144bd5fc146d6f6 docs/tracking/incidental-findings.md
dda91af30fbd0b562dc623962331c2c974461a42e2c27eefaa94d01df19dacc3 docs/spec/spec-ledger.md
578836e1b0141188b48fc8c3100519c6ff1944fbac4a29377bcd6a6b16c46652 docs/governance/instructions-amendments.md
7ef0b460cff068f7f352bc0090a2eece0c7e83edb04f720496a5a1261aa7d6b9 docs/governance/system-state.md
5b79343b19cd1413bbd27be165d0a0e2fba5ac9e963ed77d778fa1b86da209a6 docs/governance/handoffs/2026-11-09-p2c-close-handover.md
32a5802abc5ba8af6aabb991881f7617943d3c692b949c39e8eb9e2fc57ab21c docs/governance/mechanisms.md
0dc489cc9f4a94add14e5fb22fcdf86d485b4ee6074d9d24216f125214839d0f roadmap.md
62a98c4e0b81dbff6b164e7d24c7be2c207d20f3dd46285be20aeecf9d82ad3c docs/_changelog.md
````
