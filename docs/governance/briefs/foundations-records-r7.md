# Records turn R7 — brief (sha256 118ead7835621e18356768ee9149bacf13598424adff6074c9add73fc169f1e5)

````text
RECORDS TURN R7 — the records of 28–29 October brought into the repository (G41). Base: dev abc6675e. Documents only: no migration, no src/ change. Lovable. Saved as docs/governance/briefs/foundations-records-r7.md.

CI-2 VERIFIED (dev abc6675e, fresh clone): the ruling is saved byte for byte (sha256 caea75e3…78f8, matched); `bun run checks` with TCK-1…5, its pins read from ci.yml, wired through package.json; useSectionNotice / SectionNotice and SNC-3; INC-998 fixed at the root (the NH zone pinned through NIGHTLY_ZONE, production unchanged; LL-1 parses only candidate files; EXH-4/5/7/21 at 60 s with the named cause); AGENTS.md's one checks line; register rows 75 and 76. Run 40893444336 on abc6675e is SUCCESS and main is promoted — the first green since 3ee69785. CLEAN.
Your K2 1: the supervisor scanned all of dev's history with the pinned gitleaks 8.24.3, redacted. It found 33 matches: three are the publishable anon key (allowed, INC-000) and thirty are false matches (attribute and place keys, fixture tokens, prose). There is no secret and nothing to do. Your K2 2–5 are noted; 5 is on the roadmap.

THE TURN
1. CI FIRST: read the run on abc6675e (SUCCESS). If a newer completed run is red, fix it first.
2. STEP 0: save this brief (the text between the message's BEGIN BRIEF and END BRIEF lines) byte for byte as docs/governance/briefs/foundations-records-r7.md, in one fenced block, and prove its sha256 equals the value after END BRIEF.
3. Write each data file below to /tmp/r7/<name>, outside the repository, exactly: its content is every byte after the newline that ends its FILE line, up to the start of its END line — blank lines at its start or end included. Check each file's sha256 and byte count against its FILE line, and write it again until both match; if a file still differs after a second write, STOP and report its name and the two values.
4. From the repository root run: `python3 /tmp/r7/r7_apply.py /tmp/r7 .` It changes or creates exactly nine paths. Every sha256 it prints must equal the EXPECTED list below. A mismatch is a STOP: report the path and the two values, and change nothing by hand.
5. Do not touch roadmap line 3 yourself: the script writes it. Do not edit any record text: these files are the supervisor's records, imported word for word (G11, G41).
6. Run `bun run checks`. Every FAIL is fixed only if it is in a file this turn did not write; if it is in one of the nine paths, STOP and report it. Paste the last line.
7. Push, and END THE TURN with the report:
   - the CI line;
   - the step 0 sha256;
   - the nine printed sha256 lines;
   - the last line of the checks;
   - git diff --name-only abc6675e, which must be the nine paths plus this brief.

EXPECTED (step 4)
cd019620a2a100cbc72cf684e26b5547bda53d3f571108c1e2ab8371f50fdb12 docs/governance/claude-supervisor-instructions-v1.16.md
992ae8a5528d4713e2e16c87d6a78c977ff4c6e882c91414fd3e89e3c9f00953 docs/tracking/incidental-findings.md
de7dba08705feb7907cfa0f8066d23c5a1728c2bdf29ba6dd6ce561b03cfa165 docs/spec/spec-ledger.md
8e929678dc87325ad3fcc624aa808f67ff8fb148e8ada692e217507d51ffe27d docs/governance/instructions-amendments.md
7ede108a2d14f7a7852c6f4d0c95c0a7a3e74d48e24a78996a8a304a2699a057 docs/governance/briefs/foundations-turn-ci-1.md
44a66ca9a1c7a55868e5051327a2524713db913c7b05e92e6e0c469239c19331 docs/governance/system-state.md
e65881aae00edad2aeb593a65effa43675860ecfee8f7069472d8362a222c22d docs/governance/handoffs/2026-10-29-foundations-n1-handover.md
81f81dbd23c665929ff3ce6a4a353c599d56d28a0d6f17c0c9031b2bf071dc49 roadmap.md
c7680a4998a28cbe001947b6cd4dbfdbf3fbed14fe68027c8ef143ba91a3164f docs/_changelog.md
(The script also prints one line for the v1.16 build itself: "115822 cd019620…". That line is the same file.)
````
