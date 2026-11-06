# Records turn R12 — brief (sha256 ea762d940fb7e38af364ce89ed0f37743ccdf9964858c1f05b3f9607e6777b76)

````text
RECORDS TURN R12 — the records of block S87 brought into the repository (G41): the decisions DEC-328 → DEC-346 and D314 → D318, INC-1046 → INC-1060 and INC-1063 → INC-1067 (the Records sections of docs/governance/reports/db-proof.report.md and p2-proof-caps.report.md included, word for word), slips S519 → S540, the rules in force since instructions v1.16 (the new lines), system-state, the handoff of 2026-11-05, the register row 117, db-proof's superseded ruling 5 saved for the record, the roadmap and the changelog. Records only — no code, no migration, no plan phase. This turn is the ONE lane that edits the shared ledgers (DEC-346); no other lane is open while it runs.

Base: dev 7c5c29546

THE DATA: the folder the operator named in the first line of this message (the unzipped `r12-data.zip`): ten record files, `r12_apply.py` (the supervisor's script — read it, change nothing in it), `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the nine sha256 lines step 4 must print).

THE TURN, IN THIS ORDER
1. `git fetch origin && git switch -c cursor/records-r12 origin/dev`; `git rev-parse --short=9 HEAD` must print 7c5c29546. If dev has moved, STOP and say so: every sha256 below assumes 7c5c29546 unchanged.
2. STEP 0: save this brief — the text between the message's BEGIN BRIEF and END BRIEF lines, with its final newline — byte for byte as docs/governance/briefs/records-turn-r12.md, in one fenced block (four backticks, as R11's brief), by a scripted copy (never retyped), and prove its sha256 equals the value printed after END BRIEF. Roadmap line 3 is written by the script in step 4, not by hand.
3. In the data folder run `sha256sum -c data-shas.txt`: every line OK. A mismatch is a STOP (the unzip is damaged; nothing is applied).
4. From the repository root run `python3 <data folder>/r12_apply.py <data folder> .` once. It changes or creates exactly nine paths (roadmap line 3 included) and prints one sha256 line per path. Every line must equal EXPECTED below. A mismatch is a STOP: report the differing path and `git diff` of it; change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting; a defect you notice in them (a number used twice, a path that does not exist, a wrong date or sha) goes in the report's FINDINGS section, unchanged in the files.
6. `bun run checks`; paste its last line. A red is fixed only if it is this turn's own (a formatting of a record is NOT yours to make — report it as a STOP; the computer-class reds are named under Limits as before). `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md` must pass (the supervisor ran prettier 3.8.3 on the simulated result).
7. Commit with the first line `records turn R12: block S87, INC-1046 → INC-1067, the handoff` and the detail in the body (block S87, DEC-328 → DEC-346, D314 → D318, S519 → S540, the register row 117, the handoff of 2026-11-05, db-proof ruling 5; G41), with the attribution the rules require; push; open the pull request into dev (`gh pr create`, title "Records turn R12"); `gh pr checks --watch`; when every check is green, the "every check green" comment per rule 00. Do not merge: the operator merges with a merge commit after the supervisor's verification.
8. END with the report saved as docs/governance/reports/records-turn-r12.report.md: step 2's sha256; the nine printed sha256 lines; the checks' last line; `git diff --name-only 7c5c29546` (expected: the nine paths, this brief and this report — eleven); the pull request's link and its CI line; FINDINGS (anything major noticed, file:line — or "none"); K2 (expected "none — records only").

EXPECTED (step 4)
83a1f2bed10f287b2313cc65bccfd6a163de2d36ebee8812dd5f25a0c7a51fb4 docs/tracking/incidental-findings.md
8c3809702fe0f57df8e11860d7a4118bef1861f96184d8fc93729ae14177dd8d docs/spec/spec-ledger.md
94681ddae41342276ad6fd79253c7c6ff440290a9711dcb69a2ecd6874a37227 docs/governance/instructions-amendments.md
8383d43ebf7e9b68f86bc4d0ddc1fe7aa0d5416bdd6b1f9f90b22962ff676871 docs/governance/system-state.md
3383c0c7c5c9726a8f79d68d67811943a2f2e3ce4aaed61f26f4993a250d2330 docs/governance/handoffs/2026-11-05-p2a-close-handover.md
6b9b6885acca7211277a5c5fc05b31a03e90a8f480c64b841e9bd94c5cef54bf docs/governance/mechanisms.md
04512e5c2bac640ff31fdaa95aba7edffa1df483729069269b0aeabc08d32c85 docs/governance/briefs/db-proof-ruling-5.md
a9054508fb0064bf9888c19d6c5e124b1ce1fe1dad02b9ce9a5b182b06582a4e roadmap.md
fc4dc3b16b6c2260187dfc2d8d889c6f91783282329a54df3b1117d428700921 docs/_changelog.md
````
