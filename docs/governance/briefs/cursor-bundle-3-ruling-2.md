RULING — cursor-bundle-3, stop 2: Parts 1 to 4 are accepted; the records part of this bundle (four files, by the supervisor's script); then the final push waits for one release. Base: cursor/bundle-3 6282bd722.

STEPS 7 and 8 run in the same chat (Claude Sonnet 5.5, DEC-414).

PREVENTION (G70)
- CLASS A — two lanes coupled by a law and its fix, with the order of their merges left open. This lane lands DG-11 with two allowlist lines; Lovable's lane lands the fix that makes those lines stale. A Lovable branch cannot take dev in, so whichever lane merges second meets a red it cannot repair on its own tree. The brief's SIDE BY SIDE said who owns each finding and not which lane merges first.
  - These instructions — in force at once: when one of two lanes lands a law and the other its fix, the GO names the order of the merges and who removes the stale lines.
  - Repository — the weekly records: the GO template's SIDE BY SIDE sentence gains it.
  - Cursor rules — not needed. Knowledge and AGENTS.md — not needed.
- CLASS B — a ruling that names a test's place without reading the file. Ruling 1, answer 8, placed DP-U24 at the mechanism; your census found it in a consumer's test. (G3: the supervisor's slip, recorded.)
  - Repository — this records part writes the right ids into the feature doc and the roadmap line.
  - These instructions — already say it (a claim about the code is read fresh). Cursor rules, Knowledge and AGENTS.md — not needed.
- CLASS C — a records part promised as "the weekly records" before its package existed. The weekly block (the ledgers, the register rows, the changelog, the handoff, your §14) is not compiled; the operator's rule is that records land at most weekly (DEC-414), and the last block landed on 2026-11-19.
  - These instructions — in force at once: a GO promises a records part only by what its package already holds; the weekly block is named with its date, never as a step of a bundle that may end before it is ready.
  - Repository, Cursor rules, Knowledge and AGENTS.md — not needed.

THE RULINGS
1. PARTS 1 TO 4 ARE ACCEPTED AS BUILT, read in a fresh fetch of `cursor/bundle-3` at 6282bd722. The run on that commit is green: 45038904160, every lane ran.
2. YOUR DEPARTURES, each accepted: 3 (the four planted tests filter by their own rule), 4 (ONE allowlist line for the style board's three specimens: the key form decides), 5 (the guard reads the base checkout's own file; its tests run on a fixture), 6 ("the four exceptions"), 7 (`rosterDump` and `lifecycleDump` name the failed read in their own text: a throw would replace the failure they explain), 8 (the type gains `error`), 9 (the two usage maps).
3. THE FIRST DOWNLOAD is accepted as measured: no page higher, no ceiling moved. CI's budget job is the judge of the merged tree.
4. DP-U24 (Class B): the held-only subject is held at the mechanism by DP-U20 and DP-U21; DP-U24 is a consumer's test. The records part writes it so. No new number.
5. THE TRIAL MERGE of the two lanes' heads (yours at 6282bd722; Lovable's at 59f7d0d5a with the supervisor's spec patch), on the supervisor's clone: the type check, every folder under `src`, ESLint, prettier and the build pass. The guard suite passes but for ONE finding, the expected one: the guard reports the table panel's DG-11 line as a stale allowance. On the merged tree DG-11 finds no site, so your two allowlist lines are stale there (STEP 8). CF-OV-7, CF-OV-8, DG-8, DG-9, DG-10, CF-LVB-17 and CF-LVB-18 find nothing there, and CF-HELPERS-10 finds nothing: the specs the supervisor's patch edits keep their counts.

STEP 7 — THE RECORDS PART OF THIS BUNDLE (the scope widens by this ruling to four files: `docs/features/design-foundation.md`, `roadmap.md`, `docs/governance/go-template.md`, `.cursor/rules/00-protocol.mdc`). The package's folder holds this ruling, `records_part_apply.py` and `expected.txt`.
- WHAT IT WRITES, by exact text: the two sentences of the feature doc this bundle makes untrue (ruling 1, answer 7); one roadmap line for the tests and CI turn — the four left laws with the tests that hold them, the allowlisted reads of INC-1245, DG-10's limit (answers 5 and 8); the template's `queued` item searching `docs/features` too (ruling 1, Class A); the template's STEP 0 and rule 00's "Record" step saying a brief is saved bare (ruling 1, Class C). Rule 00 changes only in a rules turn: this step is that turn's form for one sentence — the supervisor's exact text, by script, proven by sha256. `roadmap.md` line 3 is not touched.
- HOW: from the repository's root, `python3 <folder>/records_part_apply.py --check` prints `CHECK OK: 4 files, 6 edits` and changes nothing; `python3 <folder>/records_part_apply.py` prints `APPLIED: 4 files, 6 edits`; then `shasum -a 256 -c <folder>/expected.txt` prints OK for each of the four files. An `ANCHOR` line is a STOP: nothing was written.
- THEN `bunx vitest run scripts --maxWorkers=2` and `bunx prettier --check docs/features/design-foundation.md roadmap.md`. ONE commit: `cursor-bundle-3: the records part (four files, by script)`. NOT pushed.
- THE WEEKLY BLOCK IS NOT THIS STEP (Class C): the ledgers, the register rows, the changelog, the handoff and your report's §14 land as the last part of the next Cursor bundle, by 2026-11-26 (DEC-414). Until then your final report's §14 is their record, word for word (DEC-346). Name this under Departures with this ruling as its reason.

STEP 8 — THE FINAL PUSH WAITS FOR ONE RELEASE (Class A). Lovable's bundle 3 merges FIRST. When the supervisor sends "RELEASE — Lovable bundle 3 is merged at <sha>":
- remove the two lines you added to `scripts/conformance/dialogs-allowlist.txt` (read by `scripts/conformance/dialogs.test.ts`) — the two whose keys end in `#DG-11`, the table panel's and the style board's: on dev they are stale. The comment line you added above them stays (DEC-426);
- THE EXPECTED RED ON YOUR OWN TREE, named here: your lane does not hold Lovable's bundle, so DG-11 finds its four sites there once the lines are gone. That red, and no other, is expected on your tree. The pull request's run judges the merge with dev, where the law finds none; the supervisor proves the same on its own trial merge and states the result in the release;
- every other check as STEP 6 wrote it; ONE final push; `gh pr checks 94 --watch --interval 60`; the report (rule 60's headings; §14 word for word, with INC-1245, INC-1248, INC-1249, DEC-425, DEC-426 and the status of each). The pull request stays a DRAFT until the supervisor says the run is green.
A red on that run whose failure names a path this bundle changed is a STOP; any other red is named under Limits.

WHAT YOU DO NEXT: STEP 7 now, its one commit, not pushed; then wait for the release.
