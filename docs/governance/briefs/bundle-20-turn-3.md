# Bundle 20 — turn 3: PR-57's pass name (INC-734) and the records of bundle 20's close (by carrier): brief (saved unchanged, 2026-10-18)

```text
BUNDLE 20 — TURN 3 (2026-10-18). ONE TURN: ONE TEST LINE (INC-734) AND THE RECORDS OF BUNDLE 20'S CLOSE, BY CARRIER. No migration. No new string. No package change. No file deleted. No code or workflow change. Base: dev 114537ea (bundle 20 turn 2b). The census below proves every file by content. Tier C: the records are the supervisor's text, imported word for word (G11).

ANSWERS TO THE LAST TURN
- Bundle 20 turn 2b: verified at 114537ea — PR-59 and PR-60 exactly as Part D's table (the three Amharic names byte-equal to the saved brief), the posting.md paragraph and the changelog line word for word, S2a and S2b byte-equal; the COPY RULE ruling recorded as asked. Run 1016 (`8a51af34`) failed PR-57 alone, on both projects ({"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}) — the v4 list reached staging during the run; run 1020 on `114537ea`, queued behind it, is expected to fail PR-57 the same way and nothing else.. Nothing to correct.

WHY THIS TURN
- INC-734 (the CI red to fix first): PR-57 (e2e/posting-routes.spec.ts :1664) asserts that the alias `us_embassy` passes, but the v4 list this bundle loaded reserves that very handle (row 659, "U.S. Embassy in Ethiopia") — so PR-57 fails on any staging holding S2a. The name becomes `ke_embassy` (it passes before and after the seed; PR-57's point stands — a two-letter code beside an institution word is no country). The supervisor ran every literal name in the tests through the rules on its copy of the database with the full list: this is the only unintended change. Run 1016 (`8a51af34`) failed PR-57 alone, on both projects ({"ok":false,"refusals":[{"field":"alias","reason":"aliasReserved"}]}) — the v4 list reached staging during the run; run 1020 on `114537ea`, queued behind it, is expected to fail PR-57 the same way and nothing else.
- G41: a bundle's records land in the repository before the next bundle. Bundle 20 changed no screen, so no Publish or walk is owed for it; this turn's own run judges the close. This turn records bundle 19's turn 34 and bundle 20 — spec-ledger block S73 (D204–D214, D135 = Look B, slips S289–S294), INC-730…INC-734 with the later word and the watch list, system-state's current position, the close's handover, condensed running record and manifest, the roadmap (bundle 19 turn 34 and bundle 20 ticked; bundle 21's line with the approved design; D207–D210), the changelog.

WHAT THIS TURN BUILDS (the carrier, 9 paths)
- e2e/posting-routes.spec.ts (REPLACE-LINES: PR-57's line — `us_embassy` → `ke_embassy`); docs/spec/spec-ledger.md (APPEND: block S73); docs/tracking/incidental-findings.md (the tail from "Numbering: next free INC-730." replaced: INC-730…INC-734, the later word of bundle 20's close, "Numbering: next free INC-735.", the watch list); docs/governance/system-state.md (the close's current position inserted; the previous one marked superseded); roadmap.md (line 3; bundle 19 turn 34 ticked; bundle 20 ticked closed with turn 3's line; bundle 21's line and D207–D210 after D190 — bundle 21's line holds the Amharic short label for Post listing, copied as bytes); docs/_changelog.md (APPEND); NEW: docs/governance/handoffs/2026-10-18-bundle20-close-handover.md, -running-record.md and -manifest.md.
- The usage maps do not change (no key change): `bun run i18n:map-guard` proves it.
- Add no line to AGENTS.md (INC-677).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 114537ea with this turn's carrier files)
- Clean: prettier --check on every touched file; the carrier split on a clean copy of the base: the tree equals the supervisor's file for file.
- Not run by the supervisor: the unit, lint and E2E suites (no code changes; CI on this commit runs them — PR-57 against staging).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-20-turn-3.md (roadmap.md line 3 comes from the carrier).

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
- Scope — these files only: the 9 paths of the hash table and the brief. No database change. No AGENTS.md change. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — PR-57 by id if your browser starts; it does not (INC-506) — say so once. CI on this commit runs every spec.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-20-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 6 files → each equal to:
  15e904b15bdc20ee9f0e8fa24d19ba595de86d1acee9b44f9231516ec1f52c2f  docs/_changelog.md
  017da69993e20175d19b608497784722bcdba9bd649e1d04557499967ae9ab02  docs/governance/system-state.md
  ccba566b45c6680b1bfcd7f90dbef83d1a013f540bad455dc06c169d2d53583c  docs/spec/spec-ledger.md
  92dbfc7baa36ff86eac0da9e647ba5cb9d40df5a20856417b3227a453a6537a4  docs/tracking/incidental-findings.md
  acb19807765882f977d0066fc0d7e0f9fecba2ffe45c303d21c139e8a1701741  e2e/posting-routes.spec.ts
  8b2d89d87165803a9f1d0320132f619aa17e0afcc03d2ed03cd86f2c1f4f6906  roadmap.md
- (c) `ls supabase/migrations | tail -1` → 20261018165354_7dce9a57-93a9-4c10-a5d7-ff36e88fde91.sql (turn 2b's S2b; no migration this turn). `ls docs/governance/handoffs | tail -3` → the three files of 2026-10-18 bundle 19's close (none of this turn's three exists yet).
- (d) No database census: this turn touches no door.

THE CARRIER — B20T3-TURN-CARRIER-2026-10-18.md (44,891 bytes; sha256 c0bf227d87206bccebad44b945e233ce521149635b23e84018523cbc39dae355; 14 sections)
- Its first line starts "B20T3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's text to the end of the base file; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- After the carrier, `sha256sum` of these 9 files → each equal to:
  d9977b10c3246f55a389db736d486cc5e50c4966c104fc8493a1d324679845a4  docs/_changelog.md
  867c25dbe3d01bff7f32b21ccb29f87cf84e4fc71d2b29d21fa3d90c88405427  docs/governance/handoffs/2026-10-18-bundle20-close-handover.md
  608ddb2de4c421db603266e893c79f43867ccdca5294ad96064a06ae603b4520  docs/governance/handoffs/2026-10-18-bundle20-close-manifest.md
  aac3ff2ac333482fc847e67e37c45a5f7310ed3f35036cc88e32fe95b7280fad  docs/governance/handoffs/2026-10-18-bundle20-close-running-record.md
  436c1fbd5f542914ff96b821cb51a87523c9dc4b770876a12fc9dd67858ae8ef  docs/governance/system-state.md
  2969296f078556ce931400b5a40e92c23a22d9280d6381739518ae28e309f831  docs/spec/spec-ledger.md
  0986c307a0d6eb8ccfcf9a2df20733ea62d33b8916ddcaa852994361197add13  docs/tracking/incidental-findings.md
  e5b0a85c1dcd5e7d18266d4661e9f9148b89fb8b041ab266b8fe534ccaa79319  e2e/posting-routes.spec.ts
  c3ab0d5d7ed9da3d00a5e69d281b76a2b7118d58426b9bdc0bd2201930a61295  roadmap.md
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

THE CHECKS (whole; paste the last line): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` — the real count (no unit test changes since bundle 19 turn 34); `bun run i18n:map-guard` "usage maps match the tree"; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK.

THE REPORT: the six ci-status lines and <START>; the census (a)–(d); the carrier applied — the 9 hashes as `sha256sum` printed them; `git diff --stat <START>`; `git diff --name-only <START>` (the 9 paths and the brief, nothing else); `git ls-files docs/governance/handoffs/2026-10-18-bundle20-close-handover.md docs/governance/handoffs/2026-10-18-bundle20-close-running-record.md docs/governance/handoffs/2026-10-18-bundle20-close-manifest.md` (G20: three tracked paths); the checks; anything not foreseen. Then END THE TURN.
REVERT: `git revert <commit>` (forward only).
```
