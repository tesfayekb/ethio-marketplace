RULING — cursor-bundle-3, the release: RELEASE — Lovable bundle 3 is merged at 84b6b89e1. STEP 7 is accepted; STEP 8 runs as ruling 2 wrote it, with ONE more edit by the supervisor's script (the stylesheet's limit, 23 to 24). Base: cursor/bundle-3 deaed4d9a.

STEP 8 runs in the same chat (Claude Sonnet 5.5, DEC-414).

PREVENTION (G70)
- CLASS A — a shared limit that the first lane's merge leaves in its near band, while only the second lane may move it. With Lovable's bundle 3 the stylesheet measures 22.65 KiB on dev, inside the local near band of its limit of 23. A Lovable pull request cannot carry that line until this lane lands the exception (DEC-425).
  - Repository — this ruling, 4: the line moves in your final push, by exact text.
  - These instructions — in force at once: when two lanes run side by side, the GO names who moves a shared limit, beside the order of the merges (ruling 2, Class A). The weekly records: the GO template's SIDE BY SIDE sentence gains it.
  - Cursor rules — not needed. Knowledge and AGENTS.md — not needed.
- CLASS B — a trial merge that left out the other lane's ruled step. The supervisor's trial merges read your pushed head and not STEP 7; one line of `docs/features/design-foundation.md` was changed by both lanes. Found before either merge: Lovable's sentence was moved, and the three-way merge of that file with your STEP 7 is clean.
  - These instructions — in force at once: a trial merge includes every ruled edit of the other lane, pushed or not.
  - Repository — not needed: nothing of yours changes for it. Cursor rules, Knowledge and AGENTS.md — not needed.

THE RULINGS
1. STEP 7 IS ACCEPTED AS REPORTED (commit deaed4d9a: the four files by sha256, the roadmap's one added line, the guard suite, prettier). The saved ruling file in the same commit: accepted, one commit was asked. It is read in a fresh fetch at your final push.
2. THE RELEASE: Lovable bundle 3 (pull request #95) is merged into dev at 84b6b89e1. Dev's run 45078883307 on that commit is green; its lanes were skipped by design, because the code tree was proven by run 45053440887 on the pull request. main stands at the same commit.
3. THE TRIAL MERGE of dev at that commit with your lane AS IT WILL BE PUSHED — your pushed head, STEP 7 by the same script, the two DG-11 lines removed, the stylesheet line of ruling 4 — on the supervisor's clone: no conflict; the type check clean; the guard suite passes whole, DG-11 finding nothing; prettier clean; the build passes; the budget passes with no near-band note; the usage maps unchanged.
4. THE STYLESHEET'S LIMIT (Class A). The scope widens by this ruling to one more file, `scripts/check-bundle-size.mjs`. The package's folder holds this ruling, `css_limit_apply.py` and `expected.txt`.
   - HOW: from the repository's root, `python3 <folder>/css_limit_apply.py --check` prints `CHECK OK: 1 file, 1 edit` and changes nothing; `python3 <folder>/css_limit_apply.py` prints `APPLIED: 1 file, 1 edit`; then `shasum -a 256 -c <folder>/expected.txt` prints OK. An `ANCHOR` line is a STOP: nothing was written.
   - WHAT IT WRITES: one DEC-296 comment line before the `js:` line, and the stylesheet's limit 23 to 24. The comment names the cause: seven classes of the tables' filter rows.
   - ON YOUR OWN TREE the stylesheet is smaller (you do not hold Lovable's bundle): your budget check passes either way. The number in the comment is the merged tree's, measured by the supervisor.
5. STEP 8, AS RULING 2 WROTE IT: remove the two DG-11 lines from `scripts/conformance/dialogs-allowlist.txt` (read by `scripts/conformance/dialogs.test.ts`); the comment line above them stays. The expected red on your own tree is DG-11's four sites, and no other. Every other check as STEP 6 wrote it; ONE final push; `gh pr checks 94 --watch --interval 60`; the report. The pull request stays a DRAFT until the supervisor says the run is green.
6. NAME UNDER DEPARTURES: the stylesheet line (this ruling, 4) and Class B.

WHAT YOU DO NEXT: rulings 4 and 5 now, then the one final push.
