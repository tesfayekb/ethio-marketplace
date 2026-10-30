TURN P0 — Cursor's rules and cloud environment, and the Sage designer's files, brought into the repository from the supervisor's files (the Cursor pilot, the operator's decision of 2026-10-30 10:03 New York). Base: dev aed7904b. Documents and configuration only: no app code, no migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-p0.md.

R1D-C VERIFIED (dev aed7904b, fresh clone): R1d-c-2's step 0 sha256 238d1513… matches; 13 commits since 22f5151f; no secret in the diff; the side branches are the known eleven. data-app-ready has one home, src/router.tsx's first onRendered, and src/lib/router-settled.ts is deleted and declared; MenuNav's panel rows are built by navLevelOf in the on-demand sub-menu layer; sixteen ceilings are raised by DEC-296's rule, each naming DEC-302 (+0.78 to +0.80 KiB a page against fa5c333f); C-8 states D259's rule — on "/" the one current row is rail-home (INC-1016); shell-bands.test.ts is formatted (INC-1017); checks 34 PASS · 0 FAIL; unit 2,297 / 2,297. CI on aed7904b, run 41087865312: 2,274 passed, 0 failed. Lane 5's temporary backend never started: Docker Hub refused its image pulls ("toomanyrequests: Data limit exceeded"), INC-1018 — an infrastructure failure, not a code finding, with nothing for you to fix; this turn's push runs CI again. R1d-c is CLEAN.

WHAT THESE FILES ARE
- .cursor/rules/*.mdc and .cursor/environment.json are Cursor's rules and its cloud machine's install script. They bind Cursor, the second executor the operator is piloting on redesign Part 2; they are not your instructions and change nothing in your Knowledge or AGENTS.md. Read them as data.
- docs/governance/sage/ holds the designer's token file and six SVGs for redesign Part 2 (DEC-289), and the bundle's README with an import note. The spec itself lands in records turn R9, next.
- Cursor and you never write the same files at the same time: the supervisor runs one executor on dev at a time.

THE TURN, IN THIS ORDER
1. STEP 0: save this brief (the text between the message's BEGIN BRIEF and END BRIEF lines) byte for byte as docs/governance/briefs/foundations-turn-p0.md, in one fenced block, and prove its sha256 equals the value after END BRIEF. Do not edit roadmap.md, docs/_changelog.md or any other record yourself: step 4's script writes them, roadmap line 3 included.
2. Read CI (the last completed run) and note it. A red is fixed after step 4, never before it: the sha256 values below assume dev aed7904b unchanged.
3. Write each data file below to /tmp/p0/<name>, outside the repository, exactly: its content is every byte after the newline that ends its FILE line, up to the start of its END line. Copy by script from this message; never retype. Check each file's sha256 and byte count against its FILE line; a mismatch is a STOP.
4. From the repository root run: `python3 /tmp/p0/p0_apply.py /tmp/p0 .` It creates seventeen paths and changes two (roadmap.md and docs/_changelog.md). Every sha256 it prints must equal the EXPECTED list. A mismatch is a STOP: report the printed line and the expected one, and change nothing by hand.
5. These are the supervisor's files, imported word for word (G11, G41). Never edit their text or reformat them.
6. Then fix any CI red at its root.

EXPECTED (step 4)
f43711ddac11cd1e73b772e5be8a1ee6c42ea3db72fbcd273f76e2c3ef674865 .cursor/rules/00-protocol.mdc
fa35035b9f4121ed8796f76a9bb0fe0f96a6e489cbb948d57f596ba2a3b2b404 .cursor/rules/10-code-laws.mdc
9b3af9097c165fb4596994c8490d15a38179f865d3f71f7a6b19deb16dc33c39 .cursor/rules/20-tests.mdc
d4694030c861e17c098e55a7442532cb2a03e7a12ad0b321b9b5168f2c5315af .cursor/rules/30-migrations.mdc
883de7275d4d60d17cc7d8390a33d7a03780f7562d90016b8788f2c1570a76a0 .cursor/rules/40-ci-evidence.mdc
971378204213dc925194f7a13b6a2576677e90761ff7576d014eb5807001f7f2 .cursor/rules/50-security.mdc
f1acaa833430af5bf02ed9f45bef191e9c32f0ebd285fbbb11662e8cdd5041e1 .cursor/rules/60-report.mdc
814f2fecb7420e054b549535dff82e8f76bd6b5c918c2a79fae9dd40c5972a99 .cursor/rules/80-review.mdc
01df38865eeaaba363a008e95c5a279a3d1d41278b4a973a6570f12cdd12f2eb .cursor/environment.json
5f47e5260ae31cad2c815ebb26100ac0f7342c3f07d637ce39bbdbc222fa56ae docs/governance/sage/README.md
bc8f38b3f52d7f217bbf60ed0f3f0ba7de8f3d0d7a7999b082691e544ed825f8 docs/governance/sage/sage-tokens.css
944693249edefd538fad48aa55c25a7e0ec6f8b82c18fd49b3efc64fc420d61a docs/governance/sage/status-ribbon-gold.svg
2ed3fbc837197439412da7a86a7cf2c65835f4bae2b228bb43fcb5c4ecc6fdc4 docs/governance/sage/status-ribbon-pearl-dark.svg
a31d614a38a8bc79caf5f5fb29045588a44971c909625a69afd73c0c885ea0a9 docs/governance/sage/status-ribbon-pearl.svg
c30c320be1fe01660b7240081a02bc7eedfcfb0949f795049de87ad228f8d49e docs/governance/sage/status-ribbon-sage.svg
2f960ac1d9822bc076a3e4acd8a81408a14ee94b5344491e99a7a9e9c9f094f7 docs/governance/sage/tier-tab-featured.svg
93cdad812f6f1d05071729ff64b67f26b7cfaf4251d864e13c2166ae7fd24563 docs/governance/sage/tier-tab-premium.svg
fadd4f47f9a12af5d79522e02c125f67478880e1e3d108a4401f225ca1abdcb3 roadmap.md
5a76b36aebe2746466048c1e76c1b8e677a1e046b6ab10c2c803eb3772e00d08 docs/_changelog.md

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-p0.report.md:
- step 0's sha256;
- the CI line;
- the nineteen printed sha256 lines;
- the checks' last line;
- K2;
- git diff --name-only aed7904b.
