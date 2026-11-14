# Records turn R14 — brief (sha256 de200428d878beda5a7c94b6aa65883ed04fc2f702690acd474afd8fa0b23c27)

````text
RECORDS TURN R14 — the records of block S89 brought into the repository (G41): the decisions DEC-361 → DEC-379, INC-1094 → INC-1149 and the later words for earlier findings (the Records sections of the fourteen reports from docs/governance/reports/rules-3.report.md to docs/governance/reports/ci-time.report.md imported word for word, each line under its number with the supervisor's later word), slips S567 → S610, the rules in force since instructions v1.17, system-state, the handoff of 2026-11-13, the register rows 132 → 159 and the amendment lines, the roadmap (the lists of DEC-379) and the changelog. Records only — no code, no migration, no plan phase. This turn is the ONE lane that edits the shared ledgers (DEC-346); no other lane is open while it runs.

Base: dev 50ee2e698

THE DATA: the folder the operator named in the first line of this message (the unzipped `r14-data.zip`): this brief as `records-turn-r14.md`, eleven record files, `r14_apply.py` (the supervisor's script — read it, change nothing in it), `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the nine sha256 lines step 4 must reproduce). Every file sits in that one folder.

THE TURN, IN THIS ORDER
1. `git fetch origin && git switch -c cursor/records-r14 origin/dev`; `git rev-parse --short=9 HEAD` must print 50ee2e698. If dev has moved, STOP and say so: every sha256 below assumes 50ee2e698 unchanged.
2. STEP 0: save this brief — the file `records-turn-r14.md` of the data folder — byte for byte as docs/governance/briefs/records-turn-r14.md, in one fenced block (four backticks, under the heading line, as docs/governance/briefs/records-turn-r13.md has it), by a scripted copy (never retyped), and prove the fenced text's sha256 equals the value the operator's message gives. Roadmap line 3 is written by the script in step 4, not by hand. Do not push this commit alone (rule 00).
3. In the data folder run `sha256sum -c data-shas.txt` (on macOS `shasum -a 256 -c data-shas.txt`): every line OK. A mismatch is a STOP (the unzip is damaged; nothing is applied).
4. From the repository root run `python3 <data folder>/r14_apply.py <data folder> .` once. It changes or creates exactly nine paths (roadmap line 3 included; the ninth is `scripts/conformance/briefs-allowlist.txt`, the list `scripts/conformance/briefs.test.ts` reads, whose two lines keyed to the previous brief's ruling leave with line 3 — CF-BRIEF-13) and prints one sha256 line per path. Then, from the repository root, `sha256sum -c <data folder>/expected.txt` (or `shasum -a 256 -c`): every line OK. A mismatch is a STOP: report the differing path and `git diff` of it; change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting; a defect you notice in them (a number used twice, a path that does not exist, a wrong date or sha) goes in the report's FINDINGS section, unchanged in the files.
6. The gate (rule 00 step 6): `bun run checks`; paste its fast line and its last line. A red is fixed only if it is this turn's own — a formatting of a record is NOT yours to make: report it as a STOP. `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md` must pass (the supervisor ran the repository's prettier on the simulated result: clean).
7. The self-review, before the push (rule 00 step 8), for a records turn: `git diff --name-only 50ee2e698` lists the nine paths and this brief, nothing else; no file under `src/`, `supabase/`, `e2e/` or `.github/` changed, and under `scripts/` only the brief allowlist.
8. Commit with the first line `records turn R14: block S89, INC-1094 → INC-1149, the handoff` and the detail in the body (block S89, DEC-361 → DEC-379, S567 → S610, the register rows 132 → 159, the lists of DEC-379, the handoff of 2026-11-13; G41), with the attribution the rules require. Push ONCE; open the pull request into dev (`gh pr create --base dev`, title "Records turn R14"); `gh pr checks <number> --watch --interval 60`. The push changes records only, so its run reuses dev's proven code tree and runs no browser lane (DEC-375 a).
9. END with the report saved as docs/governance/reports/records-turn-r14.report.md, written while CI runs and pushed on its own when every check is green: step 2's sha256; the nine sha256 lines; the gate's two lines; `git diff --name-only 50ee2e698` (expected: the nine paths, this brief and this report — eleven); the pull request's link and its CI line; FINDINGS (anything major noticed, file:line — or "none"); K2 (expected "none — records only"). Then the "every check green" comment per rule 00. Do not merge: the operator merges with a merge commit after the supervisor's verification.

EXPECTED (step 4)
31b8c289f258ee52983917a908fdd8ceabfea605f9aa87ce347fd8d9ab9b7866 docs/tracking/incidental-findings.md
cc73f025fb7516a2dedf9f58dca6cac3c1c5b243ecdee710afa4de7448a264d0 docs/spec/spec-ledger.md
3b16f84b5412227832ff82c0cf4a56ff95d8691f8cc0378ce732276245c70ca9 docs/governance/instructions-amendments.md
8e806fb3ec0327bbb06322338be3d56f1c2a6ee6a794b956c19859cc163202cd docs/governance/system-state.md
348f7c0a70a2b98e64da56bf8dccd9c3b6155ff568c6e5a846afc1888bdf2993 docs/governance/handoffs/2026-11-13-ci-turn-close-handover.md
f75e91c63e26bcbd17682d3db95e84ac68c10c0166fca05d20af8f43fa68ba4c docs/governance/mechanisms.md
ab88e7927902ff06ee3e1290b7dcd814e37f775ec340400f423ae88b6cd31ac7 roadmap.md
111233a05f584826c1232cca23e7f52d468b4b4d1e9d13b0650265ec658361c8 docs/_changelog.md
60f6f3016543acd1dbae8e6bf553e06c0492f3fd40e0f7ed2689bb1ca08fdb97 scripts/conformance/briefs-allowlist.txt
````
