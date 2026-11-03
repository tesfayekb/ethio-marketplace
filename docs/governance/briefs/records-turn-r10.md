# Records turn R10 — brief (sha256 c56f05534bbe0f2e82bc0fb7b2928ac668dd676cf3a690addfbd77a091d6cb84)

````text
RECORDS TURN R10 — the records of block S85 brought into the repository (G41): the decisions DEC-304 → DEC-321 and D261 → D312, INC-1019 → INC-1043 with the later words of INC-951, INC-952 and INC-826, slips S499 → S514, the rules in force since instructions v1.16, system-state, the handoff of 2026-11-02, the register rows 93 → 99, the roadmap and the changelog. No app code. Records only — no plan phase.

Base: dev af312ca2

THE DATA: the folder the operator named in the first line of this message (the unzipped `r10-data.zip`): ten record files, `r10_apply.py` (the supervisor's script — read it, change nothing in it), `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the eight sha256 lines step 4 must print).

THE TURN, IN THIS ORDER
1. `git fetch origin && git switch -c cursor/records-r10 origin/dev`; `git rev-parse --short HEAD` must print af312ca2. If dev has moved, STOP and say so: every sha256 below assumes af312ca2 unchanged.
2. STEP 0: save this brief — the text between the message's BEGIN BRIEF and END BRIEF lines, with its final newline — byte for byte as docs/governance/briefs/records-turn-r10.md, in one fenced block, by a scripted copy (never retyped), and prove its sha256 equals the value printed after END BRIEF.
3. In the data folder run `sha256sum -c data-shas.txt`: every line OK. A mismatch is a STOP (the unzip is damaged; nothing is applied).
4. From the repository root run `python3 <data folder>/r10_apply.py <data folder> .` once. It changes or creates exactly eight paths (roadmap line 3 included, which it writes itself) and prints one sha256 line per path. Every line must equal EXPECTED below. A mismatch is a STOP: report the differing path and `git diff` of it; change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting; a defect you notice in them (a number used twice, a path that does not exist, a wrong date) goes in the report's FINDINGS section, unchanged in the files.
6. `bun run checks` on the tree (no app code changed: format, the laws step and the guards are the judges); paste its last line. A red is fixed only if it is this turn's own (a formatting of a record is NOT yours to make — report it as a STOP).
7. Commit `records turn R10: block S85, INC-1019 → INC-1043, S499 → S514, the handoff of 2026-11-02 (G41)` with the attribution the rules require; push; open the pull request into dev (`gh pr create`, title "Records turn R10"); `gh pr checks --watch`; when every check is green, the "every check green" comment per rule 00.
8. END with the report saved as docs/governance/reports/records-turn-r10.report.md: step 2's sha256; the eight printed sha256 lines; the checks' last line; `git diff --name-only af312ca2` (expected: the eight paths, this brief and this report); the pull request's link and its CI line; FINDINGS (anything major noticed, file:line — or "none"); K2 (expected "none — records only").

EXPECTED (step 4)
971a281339bede69b23fe3462eece82fc9b17cc6d5c883ae76ace63a6cb0ceb4 docs/tracking/incidental-findings.md
3c0da85a3a313913421bb3b61852be072681f70ca5989fa06e39beb10041b195 docs/spec/spec-ledger.md
21966cb6040783751945bd6e9153154602daef3a72c3234938f6c63a716d51fb docs/governance/instructions-amendments.md
1252ca8f86821cf8da8e1a1810c36efa854fbc0163e543cf25ece0d77ea55be2 docs/governance/system-state.md
4d418b09f7739be4a541fb99ce6a5c7a04ac558a0c54ece133cefb4661186f01 docs/governance/handoffs/2026-11-02-p1-close-handover.md
056d4010f6a8856d09c57c4afa5a622d713aeb66b191c70cbeda9ca9e783a692 docs/governance/mechanisms.md
97db158f552a8fde4fcc06eb4c80cdd7ab99e6c691c6f75112472101afc2851b roadmap.md
10778ff96a0a491d7e8161afd23cbc0aded29f74d76ed0ea07e1f7e4688be515 docs/_changelog.md
````
