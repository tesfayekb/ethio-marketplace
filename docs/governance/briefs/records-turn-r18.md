# Records turn R18 — brief (sha256 1d3eb0bb6db4929c2a1eff77b7275604ce0fa01ad900e688a72d995859412415)

````text
RECORDS TURN R18 — the records of block S93 brought into the repository (G41), run by Lovable from the supervisor's package (DEC-432): the decisions DEC-408 → DEC-474, ACT-026 → ACT-033, and the later words of DEC-333, DEC-379, DEC-387 and DEC-416; INC-1212 → INC-1303; the later words of 37 older findings. The Records sections of the reports of F1-7a, F1-7b, F1-7c, F1-7d, the tests and CI turn 2 and Cursor bundles 1 → 6 are imported word for word, each line under its number with the supervisor's later word. Also: the slips S672 → S793; a section of the rules in force since instructions v1.19; system-state; the handoff of 2026-11-25; the register rows 171 → 184 and the lanes' amendment lines; the Stage 2 spec (DEC-458) as docs/governance/stage2-spec.md; the launch gate's lines of 2026-11-25; the roadmap (the work of block S93 ticked, the order of work from 2026-11-25) and the changelog. Records only — no code, no migration, no plan phase. Cursor's lane `cursor/bundle-7a-2` is open beside it on disjoint files: this turn leaves roadmap line 3 and `scripts/conformance/briefs-allowlist.txt` exactly as they stand (that lane changes them) and touches nothing of the lane (a deviation from DEC-346's one-lane rule, recorded in block S93).

Base: dev 3123c75e4

THE DATA: the zip `r18-data.zip` attached to the supervisor's message. Unzip it into a scratch folder OUTSIDE the repository (for example `/tmp/r18-data/`); it holds one folder, `r18-data/`, with this brief as `records-turn-r18.md`, the record files, `r18_apply.py` (the supervisor's script — read it, change nothing in it), `records-list.sha256`, `data-shas.txt` (the sha256 of each file as shipped) and `expected.txt` (the sha256 lines step 3 must reproduce).

THE TURN, IN THIS ORDER (your branch is `lovable/next`; your sandbox's `edit/<id>` name is never a stop)
1. Check the base: `git rev-parse --short=9 HEAD` must print 3123c75e4 (a platform commit of your own made before you start counts as dev's head only if `git diff --stat 3123c75e4` shows no record path). If it does not, STOP and say so: every sha256 below assumes that base.
2. In the data folder run `sha256sum -c data-shas.txt`. Every line must read OK. A mismatch is a STOP: nothing is applied.
3. From the repository root run `python3 /tmp/r18-data/r18-data/r18_apply.py /tmp/r18-data/r18-data .` once. It saves this brief as docs/governance/briefs/records-turn-r18.md, writes the records and the records list (roadmap line 3 is not touched), and prints one sha256 line per path. Then run `sha256sum -c /tmp/r18-data/r18-data/expected.txt` from the repository root. Every line must read OK. A mismatch is a STOP: report the differing path and change nothing by hand.
4. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text, their numbering or their formatting. A defect you notice in them goes in your reply under FINDINGS, unchanged in the files.
5. Run `bunx prettier --check` on every path step 3 printed, and `bunx vitest run scripts/conformance/briefs.test.ts scripts/ci/docs-only.test.ts --maxWorkers=2`. Both must pass; the supervisor ran them on the simulated result. A red is a STOP, never fixed by hand.
6. As your last step, write back from 3123c75e4 every path outside the ones step 3 printed that the platform changed (`.lovable/**`, `package.json`, `bun.lock`, `src/integrations/supabase/**`) — INC-1168.
7. Your reply: the step 2 and step 3 results, the list of `git diff --name-only 3123c75e4` (exactly the paths step 3 printed), the step 5 last lines, FINDINGS (or "none").

The supervisor then reads the diff, opens the pull request into dev with the body line `Records list: docs/governance/briefs/records-turn-r18.records.sha256 sha256 6da0513eb297e84969076bd2cfec97ec8b657640400c0fd1fa5866a819fd7a43` (the Lovable branch guard's records exception, DEC-432), and the operator merges after CI is green.

EXPECTED (step 3)
c040bb749a72cdf2d706c2eba73b4e58e6abd21440918b5401762b2c0a5efec7  docs/tracking/incidental-findings.md
409d42225fd19962016393ad5ff6d05cdd4fca91805a0026f0eacf2ae96c4d47  docs/spec/spec-ledger.md
abe8f9cb36b09cc9f08bd815cc73337cd1f66a1370702c6834c35def0fdd9d54  docs/governance/instructions-amendments.md
82a44a695d1dcebeb173f52105c46ee9b23324cc311031221af7676ec29541ef  docs/governance/system-state.md
2ea1c1c1c1a542e032d736f127aa942c1e342e499271d1b55dc3313b3799765f  docs/governance/handoffs/2026-11-25-foundations-doors-account-security-handover.md
a2dc70d6f3d3314a2e0f114a58f2f8df868d01199155f777f10159f94b5c0fcf  docs/governance/mechanisms.md
7b6f06b39604b3a747ffbae1c3d2420ecde68bac556af7d99c4e25bcf3f8f2ca  docs/governance/stage2-spec.md
410270f2b4b6bada874562d5632ea63e0db7e99cb11eac2d295e6d89ee3ab804  docs/governance/launch-gate.md
7f172fcfd65b5654bb70570292aab117bead074a0feac9035de9fe01840b86a9  roadmap.md
df4a31f54997dc2c563b681c56fb54a54ac52c11f79b5a5fc68cb5be42aff370  docs/_changelog.md
6da0513eb297e84969076bd2cfec97ec8b657640400c0fd1fa5866a819fd7a43  docs/governance/briefs/records-turn-r18.records.sha256
````
