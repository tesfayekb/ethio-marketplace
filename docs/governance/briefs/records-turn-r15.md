# Records turn R15 — brief (sha256 fc2252c044838694e4b03818bf2515962d66de692c933cd5d34142a3e90b87b8)

````text
RECORDS TURN R15 — the records of block S90 brought into the repository (G41): the decisions DEC-380 → DEC-390, INC-1150 → INC-1169 and the later words for earlier findings (the Records sections of the five reports docs/governance/reports/forms-kit.report.md, f1-doors-2.report.md, f1-doors-3.report.md, f1-doors-4a.report.md and f1-doors-4b.report.md imported word for word, each line under its number with the supervisor's later word; Lovable's two turns L1 and L2 from the supervisor's record), slips S611 → S634, the rules in force since instructions v1.18, the repository copy of instructions v1.18 and its amendments note, the Knowledge mirror at v3.13, system-state, the handoff of 2026-11-15, the register rows 160 → 163 and the amendment lines, the roadmap (the door and form-kit turns' lines; the lists of DEC-379) and the changelog; two INC headings of records turn R14 corrected (S611). Records only — no code, no migration, no plan phase. This turn is the ONE lane that edits the shared ledgers (DEC-346); no other lane is open while it runs.

Base: dev 453487452

THE DATA: the folder the operator named in the first line of this message (the unzipped `r15-data.zip`): this brief as `records-turn-r15.md`, thirteen record files, `r15_apply.py` (the supervisor's script — read it, change nothing in it), `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the ten sha256 lines step 4 must reproduce). Every file sits in that one folder.

THE TURN, IN THIS ORDER
1. `git fetch origin && git switch -c cursor/records-r15 origin/dev`; `git rev-parse --short=9 HEAD` must print 453487452. If dev has moved, STOP and say so: every sha256 below assumes 453487452 unchanged.
2. STEP 0: save this brief — the file `records-turn-r15.md` of the data folder — byte for byte as docs/governance/briefs/records-turn-r15.md, in one fenced block (four backticks, under the heading line, as docs/governance/briefs/records-turn-r14.md has it), by a scripted copy (never retyped), and prove the fenced text's sha256 equals the value the operator's message gives. Roadmap line 3 is written by the script in step 4, not by hand. Do not push this commit alone (rule 00).
3. In the data folder run `sha256sum -c data-shas.txt` (on macOS `shasum -a 256 -c data-shas.txt`): every line OK. A mismatch is a STOP (the unzip is damaged; nothing is applied).
4. From the repository root run `python3 <data folder>/r15_apply.py <data folder> .` once. It changes or creates exactly ten paths (roadmap line 3 included; two are new files — docs/governance/claude-supervisor-instructions-v1.18.md, the operator's installed text byte for byte, and the handoff) and prints one sha256 line per path; `scripts/conformance/briefs-allowlist.txt` (the list `scripts/conformance/briefs.test.ts` reads) holds no line keyed to a brief and the script only asserts so. Then, from the repository root, `sha256sum -c <data folder>/expected.txt` (or `shasum -a 256 -c`): every line OK. A mismatch is a STOP: report the differing path and `git diff` of it; change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting; a defect you notice in them (a number used twice, a path that does not exist, a wrong date or sha) goes in the report's FINDINGS section, unchanged in the files.
6. The gate (rule 00 step 6): `bun run checks`; paste its fast line and its last line. A red is fixed only if it is this turn's own — a formatting of a record is NOT yours to make: report it as a STOP. `bunx prettier --check roadmap.md docs/_changelog.md docs/tracking/incidental-findings.md docs/governance/mechanisms.md docs/governance/system-state.md` must pass (the supervisor ran the repository's prettier on the simulated result of every changed file: clean).
7. The self-review, before the push (rule 00 step 8), for a records turn: `git diff --name-only 453487452` lists the ten paths and this brief, nothing else; no file under `src/`, `supabase/`, `e2e/`, `.github/` or `scripts/` changed.
8. Commit with the first line `records turn R15: block S90, INC-1150 → INC-1169, v1.18, the handoff` and the detail in the body (block S90, DEC-380 → DEC-390, S611 → S634, the register rows 160 → 163, instructions v1.18's copy, the Knowledge mirror at v3.13, the handoff of 2026-11-15; G41), with the attribution the rules require. Push ONCE; open the pull request into dev (`gh pr create --base dev`, title "Records turn R15"); `gh pr checks <number> --watch --interval 60`. The push changes records only, so its run reuses dev's proven code tree and runs no browser lane (DEC-375 a).
9. END with the report saved as docs/governance/reports/records-turn-r15.report.md, written while CI runs and pushed on its own when every check is green: step 2's sha256; the ten sha256 lines; the gate's two lines; `git diff --name-only 453487452` (expected: the ten paths, this brief and this report — twelve); the pull request's link and its CI line; FINDINGS (anything major noticed, file:line — or "none"); K2 (expected "none — records only"). Then the "every check green" comment per rule 00. Do not merge: the operator merges with a merge commit after the supervisor's verification.

EXPECTED (step 4)
3a4f9fdbf183ad4267826bacabcf2ffb6c97e39b0f5583c849ba79006a11bbaf docs/tracking/incidental-findings.md
d1709eaa84843f97993b007a7ec94a44173decfc0acfd63d9c38335af569a1e5 docs/spec/spec-ledger.md
9ed0df29b48c90e91f5832a7cee7e12715c879cb1d9210a1116c301abb9fa778 docs/governance/instructions-amendments.md
d968f848369808be1a8892f0192e56c7b0ab4e7c9256d908ca04807842855e9d docs/governance/system-state.md
a2b1da86f705ee5b23b5c7a520d9fe377c7ad47972501c30cf1d8aac92b10dfd docs/governance/handoffs/2026-11-15-l2-close-handover.md
afe7f501d39b608af39c2afc9878f558f6967d11479aae5a622d03f4dc2e269a docs/governance/mechanisms.md
35bdc43b94a816dc994b873c6654c4b19fc2cfdbd0ad8dce8e398db58a21c5a0 roadmap.md
179fc3ef5eb1a06ff864dae334f88ade5af9307ff823219264a2f7b260eb9906 docs/_changelog.md
f4e2446b7b2b91736abe4e3cec21359e9c5bcaeceb6ce17db53240339714931f docs/governance/claude-supervisor-instructions-v1.18.md
6ce0759a3fd514df90fcaef784fc8990c95a7cc3c134b09bc7759ffeacb3d7f0 docs/governance/lovable-knowledge.md
````
