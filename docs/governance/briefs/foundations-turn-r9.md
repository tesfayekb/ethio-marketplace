RECORDS TURN R9 — the records of redesign Part 1 and the Cursor pilot brought into the repository (G41): block S84 (DEC-302, DEC-303, D244 → D260), INC-1007 → INC-1018 with later words, slips S491 → S498, system-state and the handoff. Base: dev 8c48bb2a. Documents only: no app code, no migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r9.md.

P0 VERIFIED (dev 8c48bb2a, fresh clone): step 0's sha256 58fdb49e… matches; the nineteen files equal EXPECTED; the diff is those nineteen paths, the brief and the report; no secret; the side branches are the known eleven; checks 34 PASS · 0 FAIL. CLEAN pending CI on 8c48bb2a. If its lane 5 again cannot pull its images from Docker Hub, that is INC-1018's watch, not yours.

THE TURN, IN THIS ORDER
1. STEP 0: save this brief (the text between the message's BEGIN BRIEF and END BRIEF lines) byte for byte as docs/governance/briefs/foundations-turn-r9.md, in one fenced block, and prove its sha256 equals the value after END BRIEF. Do not edit roadmap.md, docs/_changelog.md or any other record yourself: step 4's script writes them, roadmap line 3 included.
2. Read CI (the last completed run) and note it. A red is fixed after step 4, never before it: the sha256 values below assume dev 8c48bb2a unchanged.
3. Write each data file below to /tmp/r9/<name>, outside the repository, exactly: its content is every byte after the newline that ends its FILE line, up to the start of its END line — blank lines at its start or end included. Copy by script from this message; never retype. Check each file's sha256 and byte count against its FILE line; a mismatch is a STOP.
4. From the repository root run: `python3 /tmp/r9/r9_apply.py /tmp/r9 .` It changes or creates exactly seven paths, roadmap line 3 included. Every sha256 it prints must equal the EXPECTED list. A mismatch is a STOP: report the printed line and the expected one, and change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text or reformat them.
6. Then fix any CI red at its root.

EXPECTED (step 4)
eea59f9d85fd52e6198b1ef5a010188d167a47d85c4a7def16c44e4e6bad2fca docs/tracking/incidental-findings.md
da3871e3fe6039d00cb3efe4591bd52443cf540e762f772554fc9197d8c66a07 docs/spec/spec-ledger.md
7559560058bffc477f2ee2dc69474e83d8d237f44783831708de56d102165ae0 docs/governance/instructions-amendments.md
6f3857a70fcc0d01c8850ac52c7c4510c6b82cebd73fb0a00ee9bb5ddfa76d0a docs/governance/system-state.md
dd197615b5c71f2419a3d7291160c957c4718d784bb4b9265179ea85e42a6ac1 docs/governance/handoffs/2026-10-30-foundations-r1-handover.md
5b177bd0f103b1cbc69f2d54d4a9d2457b2689954ffc2141ad2d2b0d2232f3ce roadmap.md
683ca3b0579c58340b0bb7b458a2b2d7507832ea0aeb28bef0a4815c39d4b86b docs/_changelog.md

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r9.report.md:
- step 0's sha256;
- the CI line;
- the seven printed sha256 lines;
- the checks' last line;
- K2;
- git diff --name-only 8c48bb2a.
