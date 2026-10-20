# Bundle 22 — Stage 1, turn 11: turn 10 concluded from CI; the records of bundle 22's close (by carrier): brief (saved unchanged, 2026-10-20)

```text
BUNDLE 22 — STAGE 1, TURN 11 (2026-10-20). DOCS ONLY: THE RECORDS OF BUNDLE 22'S CLOSE, BY CARRIER. Tier C. NO MIGRATION. No string. No package change. No file deleted. No new module. No AGENTS.md change. No product or test file changes. Base: dev 522e0ed5 (bundle 22 turn 10). Parts, IN THIS ORDER: A — CI first, and the conclusion of turn 10; STEP 0; the census; B — the records by carrier, then the hashes; the checks; THE REPORT.

WHY
- G41: a bundle's records land in the repository before the next bundle. Bundle 22 (Stage 1 — the legal section) is built; this turn records it. The carrier records bundle 21 turn 18's run and bundle 22 turns 1 to 11 — spec-ledger block S75 (DEC-204, DEC-205, D225; slips S310 to S328), INC-759 to INC-780 with the later word and the watch list (PW-30 becomes INC-780), system-state's current position, the close's handover, condensed running record and manifest, the roadmap (bundle 22 ticked closed with its turn lines and this turn's line; four lines after the lawyer's point: Terms and Privacy v2, the banned-items and safety pages, reserved-names v5.2, the flake-and-cleanup turn), the changelog.
- After this turn: CI green on its commit, the operator Publishes and walks the bundle once.

STEP 0 — save this file (the attached bundle-22-turn-11.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-11.md and paste its sha256sum. roadmap.md comes from the carrier (its line 3 names this brief); do not edit it by hand.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; the census; Part B; the checks; THE REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"): this turn changes no screen, no door and no test. Its central flow is the carrier applied exactly, proven end to end by the hash table (every path's sha256 equal to the supervisor's) and by the checks. CI's full run on your commit is the suite's proof, read by the supervisor. No local browser run is owed in this turn.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git status`, `git diff` and `git rev-parse` are fine.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, AND THE CONCLUSION OF TURN 10.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1056 on 522e0ed5 (turn 10's last commit), in progress or finished; run 1055 on 9c3a9696 (the half-landed turn) was cancelled by the operator.
A2. When ci-status.md names 522e0ed5 with its run finished, read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md and https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md and write "TURN 10 — FINAL REPORT" as the first section of this turn's report: ci-status.md's six lines; the lines of e2e-last-failure.md that name AP-37 or e2e/ad-page.spec.ts, or its "passed" line; guards-last-failure.md's lines for lint and the unit tests, or that no job failed; your verdict. This turn is docs only: a failure is read (its body and its cause) and reported, not fixed here; the supervisor rules on it. If 522e0ed5's run has not been published when you reach THE REPORT, read it once more then; still not published: say so in one line (the supervisor reads it).

THE CENSUS (paste each result; any result that differs from what it expects is a STOP: write nothing else and report)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-22-turn-11.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  75447c1c8a64b58eccbf46b6a9a2fa4da9c4510b953a9189be13d4535bbfc5af  docs/_changelog.md
  db1fd4b419296e759c837a47625c404d7c3cabc5b3b30e57788c51eafa3172b0  docs/governance/system-state.md
  ec4da1175221fc37f87b6707a034a00971da17275e2103c48103031209b6bbed  docs/spec/spec-ledger.md
  abee82d9a27d3981c4df18dc10d4bfd74adc0e4c3bf9964054f9e206fad7578c  docs/tracking/incidental-findings.md
  4a2382349c6ba7b7a015e4405aed73fa011295f1ff382fe536ec3bcc444a278c  roadmap.md
- (c) `ls supabase/migrations | tail -1` → 20261019232513_2240482e-4359-4f8d-b926-24411bd13096.sql. `ls docs/governance/handoffs | tail -3` → the three files of 2026-10-19 bundle 21's close (none of this turn's three exists yet).
- (d) No database census: this turn touches no door.

PART B — THE RECORDS, BY CARRIER (8 paths)
- docs/spec/spec-ledger.md (APPEND: block S75); docs/tracking/incidental-findings.md (the tail from "Numbering: next free INC-759." replaced: INC-759 to INC-780, the later word of bundle 22's close, "Numbering: next free INC-781.", the watch list); docs/governance/system-state.md (the close's current position inserted; the previous one marked superseded); roadmap.md (line 3; bundle 22 ticked closed with its turn lines and this turn's line; appends to three lines; four new lines after the lawyer's point); docs/_changelog.md (APPEND — one line); NEW: docs/governance/handoffs/2026-10-20-bundle22-close-handover.md, -running-record.md and -manifest.md. No Amharic in any of them.
- The usage maps do not change (no key change): `bun run i18n:map-guard` proves it. Add no line to AGENTS.md (INC-677).
- WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 522e0ed5 with the carrier's files): prettier --check on every carrier file, clean (prettier 3.8.3, the pinned version); the carrier split on a clean copy of the base: the result equals the supervisor's tree file for file. Not run by the supervisor: the suites (CI on your commit runs them).

THE CARRIER — B22T11-TURN-CARRIER-2026-10-20.md (95,336 bytes; sha256 3c05e7279ba0a2840a269e01642ee3605e2f387b0898e224e6fd155484d565be; 12 sections)
- Its first line starts "B22T11 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's text to the end of the base file; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. The records files are long (the ledger over 1 MB): write them by script, never by hand, and never retype a line.
- After the carrier, `sha256sum` of these 8 files → each equal to:
  df749e909086ae225d01742595d149ebe0944d8758ca9385ab0fe68a42002a30  docs/_changelog.md
  04e530d4fe5f87a8541b2da9d8973e01fe77c6ce52782d841dc088476e747d7d  docs/governance/handoffs/2026-10-20-bundle22-close-handover.md
  13c8c9ac81b1c354622e9f991087bbb24c007328b41cf91ebd2b5461cbbf9783  docs/governance/handoffs/2026-10-20-bundle22-close-manifest.md
  23c09101f972e9f608bb340aa86acfa31f3d10ec1e0cc79ca441f16d3e08c187  docs/governance/handoffs/2026-10-20-bundle22-close-running-record.md
  8f103f189af938476c435662436e8dd20aa9077e96bdd297ba13c62b78059647  docs/governance/system-state.md
  5880bfb9e363a9e6bf9d80612dba6c035d23db40f982eae17e19ae3f4ac6e4fa  docs/spec/spec-ledger.md
  60e94b3ee6b96cc02598f9bcc60227a06112e7fe6300319c27181150186db1aa  docs/tracking/incidental-findings.md
  4fa21ba85c7886b36190cbf680791ae9cf4fe0fc223e7d5d984e859fce69b224  roadmap.md
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; LAST, `bun run i18n:map-guard` "usage maps match the tree".
SCOPE — these files only: the brief; the 8 paths of the hash table. Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change. No migration.
THE REPORT: "TURN 10 — FINAL REPORT" first (A2); done or not done by part; A1's six lines with the run's number and commit; <START>; the census (a) to (d); the carrier applied — the 8 hashes as `sha256sum` printed them; `git diff --stat <START>`; `git diff --name-only <START>`; `git ls-files docs/governance/handoffs/2026-10-20-bundle22-close-handover.md docs/governance/handoffs/2026-10-20-bundle22-close-running-record.md docs/governance/handoffs/2026-10-20-bundle22-close-manifest.md` (G20: three tracked paths); the checks; anything not foreseen. Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: git revert of this turn's commits (forward only); no database change to undo.
```
