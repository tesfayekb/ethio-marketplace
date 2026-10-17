# Bundle 19 — turn 20: the records of bundle 19 (docs only, by carrier): brief, version 1 (saved unchanged, 2026-10-17)

```text
BUNDLE 19 — TURN 20 (2026-10-17). ONE TURN, DOCS ONLY: THE RECORDS OF BUNDLE 19, BY CARRIER. No migration. No new string. No package change. No file deleted. No code, test or workflow change. Base: dev 130586d0 (bundle 19 turn 19). The census below proves every file by content. Tier C: the records are the supervisor's text, imported word for word (G11).

ANSWERS TO THE LAST TURN
- Turn 19 verified on dev 130586d0: the 23 files as scoped; the brief saved exact; the four strings byte-exact in both locales; the reveal by the visitor's own tap through the tab-only intent (reveal-intent.ts), `?reveal=1` gone; `hydrated` gone; the measured top on the article and the aside's `calc(… + 1rem)`; the in-page bar on a sold ad; the half-empty row; Posted, Read more, the Maps links, the h1; the drawings renamed .webp. Noted: AP-40 builds its address with `["reveal", "1"].join("=")` so the brief's grep census does not see it — a census grep is about the app's code; a test may hold the literal it proves.
- Run 996 on 130586d0 was still running when this brief was written; the supervisor reads it with turn 21.

WHY THIS TURN
- G41: a bundle's records land in the repository before the next bundle — the decisions, incidents, slips and rulings of bundle 19 (spec-ledger block S71; INC-678…INC-712 with the later word and the watch list), system-state's current position, the handover (with D201 mapped to the turns that built it — the class rule of S274), the condensed running record and the manifest, the roadmap, the changelog. The bundle's Publish, walk and walk fixes follow; this turn records turns 1–19 so that no record waits longer than one turn.

WHAT THIS TURN BUILDS (the carrier, 8 paths)
- docs/spec/spec-ledger.md (APPEND: block S71); docs/tracking/incidental-findings.md (the tail from "Numbering: next free INC-678." replaced: INC-678…INC-712, the later word, "Numbering: next free INC-713.", the watch list); docs/governance/system-state.md (the bundle-19 current position inserted; the bundle-18 one marked superseded); roadmap.md (line 3; the bundle-19 block's turn 20 line and the close's line); docs/_changelog.md (APPEND); NEW: docs/governance/handoffs/2026-10-17-bundle19-records-handover.md, -running-record.md and -records-manifest.md.
- The usage maps do not change (no key change): `bun run i18n:map-guard` proves it.
- Add no line to AGENTS.md (INC-677).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 130586d0 with this turn's carrier files)
- Clean: prettier --check on every touched file; the carrier split on a clean copy of the base: the tree equals the supervisor's file for file.
- Not run by the supervisor: the unit, lint and E2E suites (no code changes; CI on this commit runs them).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-19-turn-20.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on. The records files are long (the ledger over 1 MB): write them by script, never by hand, and never retype a line.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 8 paths of the hash table and the brief. No database change. No AGENTS.md change. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — not this turn (no code); the local browser does not start anyway (INC-506). CI on this commit runs every spec.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-19-turn-20.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  a79df5f8365b05d48a627d24d27f1e104cd3c95d2bded2a232eb8ff00744a4d6  docs/_changelog.md
  5253d8a851714ae0eae93ee1efc9d3cc18aa36a24d6d955e37b4a6141eb603cb  docs/governance/system-state.md
  3a993a458c052df6580e80a8f6ad6684cec61d932b949fe3c9de0b7738f569ae  docs/spec/spec-ledger.md
  1bc5d255cf89686ca582e472eff83140f99756cdcd92a571122410c4a0fcbd3c  docs/tracking/incidental-findings.md
  90ad86511a900c3027db607cf0e59dc58e46d4d948de08012a36342bed9ca662  roadmap.md
- (c) `ls supabase/migrations | tail -1` → 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql (turn 18's M9; no migration this turn). `ls docs/governance/handoffs | tail -3` → the three bundle-18 close files (none of this turn's three exists yet).
- (d) No database census: this turn touches no door.

THE CARRIER — B19T20-TURN-CARRIER-2026-10-17.md (131,186 bytes; sha256 0746a3b8b54d1dfaf56179e53b38243c144dece6c67df43902dc2804f96b4d81; 11 sections)
- Its first line starts "B19T20 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's text to the end of the base file; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- After the carrier, `sha256sum` of these 8 files → each equal to:
  40f3c3db8b40325b20cfa0e1dc2b2c074c34f9626c2b508c26396cc9287a2e74  docs/_changelog.md
  aea9b16c15d834c249d1b11d4ada2a1718e19a76811813ef93481ed10a407f62  docs/governance/handoffs/2026-10-17-bundle19-records-handover.md
  036d7dccdc2a460a71f22488246fa1c205633f8b450d8b041ec3eed22f00967e  docs/governance/handoffs/2026-10-17-bundle19-records-manifest.md
  f55ea9ec012ca2d93fdd8abeffc0e8feaecf52f5e7cbedf758a69956b42a1a4e  docs/governance/handoffs/2026-10-17-bundle19-records-running-record.md
  146184fd86261900124f9e830aadb4d2ec33c0141ca28a1cba1f25621143a147  docs/governance/system-state.md
  f34c364faf72480c06249b768ac3e7be8741e5c55e455812c905f1e4ec4612fe  docs/spec/spec-ledger.md
  48f5d31518a95834aaec00959b18f27e3e5d38840565506b5d1823f61d059ad8  docs/tracking/incidental-findings.md
  daa11f184e43fdf3831e663f6053f1e2253a7de366859081dc59985a0e3f5a5f  roadmap.md
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

THE CHECKS (whole; paste the last line): `bun run format:check` clean; `bun run lint` 0 errors / 35 warnings; `bun run test:unit` — 1,043 passed (181 files); `bun run i18n:map-guard` "usage maps match the tree"; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK.

THE REPORT: the six ci-status lines and <START>; the census (a)–(d); the carrier applied — the 8 hashes as `sha256sum` printed them; `git diff --stat <START>`; `git diff --name-only <START>` (the 8 paths and the brief, nothing else); `git ls-files docs/governance/handoffs/2026-10-17-bundle19-records-handover.md docs/governance/handoffs/2026-10-17-bundle19-records-running-record.md docs/governance/handoffs/2026-10-17-bundle19-records-manifest.md` (G20: three tracked paths); the checks; anything not foreseen. Then END THE TURN.
REVERT: `git revert <commit>` (forward only).
```
