# Records turn R17 — brief (sha256 9472417764ea84fb41388b814da8e64065790d15dbfc4383b0d8fe6e00fe9991)

````text
RECORDS TURN R17 — the records of block S92 brought into the repository (G41): the decisions DEC-393 → DEC-407 and D322, and the later words of DEC-333, DEC-377, DEC-379 and DEC-387; INC-1174 → INC-1211; the later words for INC-786, INC-821, INC-1015, INC-1038, INC-1111, INC-1148, INC-1155, INC-1158, INC-1161, INC-1165, INC-1168, INC-1169, INC-1170 and INC-1173. The Records sections of the reports of `tests-ci`, `lovable-guard-allowlists`, `lovable-guard-patchless`, F1-5b, F1-6a, `pkg-picomatch`, `tci-overlay-guards` and F1-6b are imported word for word, each line under its number with the supervisor's later word. Also: slips S643 → S671; the rules in force since instructions v1.19, continued; system-state; the handoff of 2026-11-19; the register rows 165 → 170 and the amendment lines; the Knowledge mirror at v3.14 (the live text, read back on 2026-11-16); the roadmap (F1-5b, F1-6a and F1-6b DONE, the order of work from 2026-11-19, the findings and requests attached under DEC-379, the reports' lines) and the changelog. Records only — no code, no migration, no plan phase. This turn is the ONE lane that edits the shared ledgers (DEC-346); no other lane is open while it runs.

Base: dev 7e7630f90

THE DATA: the folder the operator named in the first line of this message (the unzipped `r17-data.zip`). It holds this brief as `records-turn-r17.md`, 13 record files, `r17_apply.py` (the supervisor's script — read it, change nothing in it), `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the nine sha256 lines step 4 must reproduce). Every file sits in that one folder.

THE TURN, IN THIS ORDER
1. `git fetch origin && git switch -c cursor/records-r17 origin/dev`; `git rev-parse --short=9 HEAD` must print 7e7630f90. If dev has moved, STOP and say so: every sha256 below assumes 7e7630f90 unchanged.
2. STEP 0: save this brief — the file `records-turn-r17.md` of the data folder — byte for byte as docs/governance/briefs/records-turn-r17.md.
   - Put it in one fenced block (four backticks, under the heading line, as docs/governance/briefs/records-turn-r16.md has it), by a scripted copy, never retyped.
   - Prove the fenced text's sha256 equals the value the operator's message gives.
   - Roadmap line 3 is written by the script in step 4, not by hand.
   - Do not push this commit alone (rule 00).
3. In the data folder run `shasum -a 256 -c data-shas.txt` (on Linux `sha256sum -c data-shas.txt`). Every line must read OK. A mismatch is a STOP: the unzip is damaged and nothing is applied.
4. From the repository root, run `python3 <data folder>/r17_apply.py <data folder> .` once.
   - It changes or creates exactly nine paths, roadmap line 3 included. One is a new file, the handoff. It prints one sha256 line per path.
   - `scripts/conformance/briefs-allowlist.txt` (the list `scripts/conformance/briefs.test.ts` reads) holds no line keyed to a brief; the script only asserts so.
   - Then, from the repository root, run `shasum -a 256 -c <data folder>/expected.txt` (or `sha256sum -c`). Every line must read OK. A mismatch is a STOP: report the differing path and its `git diff`, and change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting. A defect you notice in them (a number used twice, a path that does not exist, a wrong date or sha) goes in the report's FINDINGS section, unchanged in the files.
6. The gate (rule 00 step 6): run `bun run checks` and paste its fast line and its last line.
   - A red is fixed only if it is this turn's own. A formatting of a record is NOT yours to make: report it as a STOP.
   - `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md docs/governance/mechanisms.md docs/governance/system-state.md docs/governance/instructions-amendments.md docs/spec/spec-ledger.md docs/governance/lovable-knowledge.md docs/governance/handoffs/2026-11-19-f1-6-close-handover.md` must pass. The supervisor ran the repository's prettier on the simulated result of every changed file: clean.
   - `bunx vitest run scripts/conformance/briefs.test.ts` must pass with this brief saved. The supervisor ran it on the simulated tree.
7. The self-review, before the push (rule 00 step 8), for a records turn: `git diff --name-only 7e7630f90` lists the nine paths and this brief, nothing else. No file under `src/`, `supabase/`, `e2e/`, `.github/` or `scripts/` changed.
8. Commit with the first line `records turn R17: block S92, INC-1174 → INC-1211, the handoff`, and put the detail in the body (block S92, DEC-393 → DEC-407, D322, S643 → S671, the register rows 165 → 170, the Knowledge mirror at v3.14, the handoff of 2026-11-19; G41).
   - Push ONCE.
   - Open the pull request into dev (`gh pr create --base dev`, title "Records turn R17").
   - Run `gh pr checks <number> --watch --interval 60`.
   - The push changes records only, so its run reuses dev's proven code tree and runs no browser lane (DEC-375 a).
9. END with the report saved as docs/governance/reports/records-turn-r17.report.md, written while CI runs and pushed on its own when every check is green. It holds:
   - step 2's sha256;
   - the nine sha256 lines;
   - the gate's two lines;
   - `git diff --name-only 7e7630f90` (expected: the nine paths, this brief and this report — eleven);
   - the pull request's link and its CI line;
   - FINDINGS (anything major noticed, file:line — or "none");
   - K2 (expected "none — records only").
   Then post the "every check green" comment per rule 00. Do not merge: the operator merges with a merge commit after the supervisor's verification.

EXPECTED (step 4)
72d74614bf9fd7fa2961ce7111f633c3e0ad60339f082644d0060cead05afae4  docs/tracking/incidental-findings.md
82e14f505c033c1ee1c6da64fe33e05e991a0bb6fad52b37aa3133eddd3b2cc3  docs/spec/spec-ledger.md
e4976e05eb19eb30f4f155d57934f3890ed6d5ca34ba007b2a729bd91b2ac598  docs/governance/instructions-amendments.md
64ab5d819360bc9e725c01391a94caed95c6c2e68b7e8ca45547c3fac0ca7a99  docs/governance/system-state.md
6c06c911123d1016148eb8187894a6b7516484e8efd756c913fb9ac39c64894f  docs/governance/handoffs/2026-11-19-f1-6-close-handover.md
58c6f3e13b691a2f792816d3c6bddded717599506ece7a8d7d4620e8b123635b  docs/governance/mechanisms.md
ba9056e5ca7f4260af2ac50f31740813f6d133bcd0195ffb28c0aa7d69805289  docs/governance/lovable-knowledge.md
d219d2fbf5a0b35c30d2ad5f86e7ca77e8ad1387c8e80d78e468726e678955c5  roadmap.md
d5ae0e54f4b85d47bcb37eb8178b973225aa75b5f609152e28a2040431d4834b  docs/_changelog.md
````
