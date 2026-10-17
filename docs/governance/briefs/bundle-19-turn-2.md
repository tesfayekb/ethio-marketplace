# Bundle 19 — turn 2: the records of bundle 18 (docs only, by carrier): brief, version 1 (saved unchanged, 2026-10-17)

```text
BUNDLE 19 — TURN 2 (2026-10-17). ONE TURN, DOCS ONLY: THE RECORDS OF BUNDLE 18'S CLOSE, BY CARRIER. No migration. No new string. No package change. No file deleted. No code, test or workflow change. Base: dev 732b933d (bundle 19 turn 1). The census below proves every file by content. Tier C: the records are the supervisor's text, imported word for word (G11).

ANSWERS TO THE LAST TURN
- Turn 1 verified on dev 732b933d: the thirteen scoped files as asked; the generator escaped the dot (`/l/$id/qr.svg`); the A2 census accepted (qrcode-generator 2.0.4 — addData, make, getModuleCount, isDark, createSvgTag present; the smoke SVG an `<svg … viewBox="0 0 124 124">`). Your two maps (docs/generated/i18n-usage.json, public/i18n-usage.json) and the skipped `bun run typecheck` are accepted as reported; CI's build job is the typecheck. AGENTS.md: your added line and the four shortened lines were read whole — meaning kept — and from this turn the rule is: no new AGENTS.md line unless a brief asks (INC-677).
- Run 969 (de5197e7, turn 5) GREEN; run 970 (732b933d) was queued behind it. The operator's Flake check (group 1) is running on turn 5's workflow — its files will appear on ci-evidence.

WHY THIS TURN
- G41: a bundle's records land in the repository at its close — the decisions, incidents, slips and rulings of bundle 18 (spec-ledger block S70; INC-675…INC-677 with the later word and the watch list), system-state's current position, the handover, the condensed running record and the manifest, the D201 spec and study, the roadmap, the changelog. They follow bundle 19's turn 1 at the operator's word (no idle waiting for CI), so no record waits longer than one turn.

WHAT THIS TURN BUILDS (the carrier, 10 paths)
- docs/spec/spec-ledger.md (APPEND: block S70); docs/tracking/incidental-findings.md (the tail from "Numbering: next free INC-675." replaced: INC-675…INC-677, the later word, "Numbering: next free INC-678.", the watch list); docs/governance/system-state.md (the bundle-18-closed / bundle-19-open current position inserted; the bundle-17 one marked superseded); roadmap.md (line 3; bundle 18 closed with its turns 2–5; the flaky-tests line); docs/_changelog.md (APPEND); NEW: docs/governance/handoffs/2026-10-17-bundle18-close-handover.md, -running-record.md and -records-manifest.md; docs/governance/product-detail-page-spec.md (the D201 spec v1); docs/governance/plans/product-detail-page-study-2026-10-16.md (the D201 study).
- The usage maps do not change (no key change): `bun run i18n:map-guard` proves it.
- The AGENTS.md rule of INC-677 applies from this turn: add no line to AGENTS.md; a rule you want recorded goes to docs/conventions.md or the feature doc, named in the report (this turn needs none).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 732b933d with this turn's carrier files)
- Clean: prettier --check on every touched file; the carrier split on a clean copy of the base: the tree equals the supervisor's file for file.
- Not run by the supervisor: the unit, lint and E2E suites (no code changes; CI on this commit runs them).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-19-turn-2.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (run 969 on de5197e7 was green; run 970 on 732b933d may still be running). Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on. The records files are long (the ledger over 1 MB): write them by script, never by hand, and never retype a line.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 10 paths of the hash table and the brief. No database change. No AGENTS.md change. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — not this turn (no code); the local browser does not start anyway (INC-506). CI on this commit runs every spec.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-19-turn-2.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  dc2cb48b393a2645ff1fb62e1ae8876ff085d91a5f78ed8df2d63aa47c0ea15c  docs/_changelog.md
  b19c9eda1ed495253629e4ee206fbc799eb1ff2f4afc7df60424cc6eaa6900a7  docs/governance/system-state.md
  201730add9dbb11a6839fbd569e994d39060fb3df4c4a5291cbef79cd894a7c6  docs/spec/spec-ledger.md
  533232ceb5f307df9649c99104f774b4c05f35f22670e4b617a6279052062ed8  docs/tracking/incidental-findings.md
  b3a762b6457352739e462cdfbe40c0387772e2a8eddc26747fa1ddf3572f361f  roadmap.md
- (c) `ls supabase/migrations | tail -1` → 20261016183525_b3716a85-778a-4bf6-9428-dda122539269.sql (bundle 18 turn 1's; no migration this turn). `ls docs/governance/handoffs | tail -3` → the three bundle-17 close files (none of this turn's three exists yet). `test -e docs/governance/product-detail-page-spec.md && echo EXISTS || echo new` → new; the same for docs/governance/plans/product-detail-page-study-2026-10-16.md → new.
- (d) No database census: this turn touches no door.

THE CARRIER — B19T2-TURN-CARRIER-2026-10-17.md (112,727 bytes; sha256 34b6addebec278fe4a52823573c6bafe0d17eb41034cbf130f21af623d8489b7; 15 sections)
- Its first line starts "B19T2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's text to the end of the base file; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- After the carrier, `sha256sum` of these 10 files → each equal to:
  9aa556e51ee6cd7b31c5d0a8d6740c6ea91903f739e1d776435138aafd0c5c89  docs/_changelog.md
  eeb18d52c3dd5c0fd684b7db32c719e87ec45102a118ea5c7d59d258887a6507  docs/governance/handoffs/2026-10-17-bundle18-close-handover.md
  e46f513250ab22de2560d61d4a62fcc5072fccd0dc86d476df06bfb95dd9ee21  docs/governance/handoffs/2026-10-17-bundle18-close-records-manifest.md
  c403ae2ef2ac03e3f0e1eb6776819511de2a37c401440c7871096b5bd7c22d8f  docs/governance/handoffs/2026-10-17-bundle18-close-running-record.md
  c6180bffc679f366fe61f565993453b05094fe97b8a147596e563e90d47235a0  docs/governance/plans/product-detail-page-study-2026-10-16.md
  0b361fb74613e29df6acb59f23321baab2c4ff78b7473418d44d04454b673b00  docs/governance/product-detail-page-spec.md
  5253d8a851714ae0eae93ee1efc9d3cc18aa36a24d6d955e37b4a6141eb603cb  docs/governance/system-state.md
  3a993a458c052df6580e80a8f6ad6684cec61d932b949fe3c9de0b7738f569ae  docs/spec/spec-ledger.md
  1bc5d255cf89686ca582e472eff83140f99756cdcd92a571122410c4a0fcbd3c  docs/tracking/incidental-findings.md
  5f75cd2ba4e84465a378974c94042e9db6167e3069f78e08518a112949d71e5b  roadmap.md
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

THE CHECKS (whole; paste the last line): `bun run format:check` clean; `bun run lint` 0 errors / 33 warnings; `bun run test:unit` — 936 passed (162 files); `bun run i18n:map-guard` "usage maps match the tree"; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK.

THE REPORT: the six ci-status lines and <START>; the census (a)–(d); the carrier applied — the 10 hashes as `sha256sum` printed them; `git diff --stat <START>`; `git diff --name-only <START>` (the 10 paths and the brief, nothing else); `git ls-files docs/governance/handoffs/2026-10-17-bundle18-close-handover.md docs/governance/handoffs/2026-10-17-bundle18-close-running-record.md docs/governance/handoffs/2026-10-17-bundle18-close-records-manifest.md docs/governance/product-detail-page-spec.md docs/governance/plans/product-detail-page-study-2026-10-16.md` (G20: five tracked paths); the checks; anything not foreseen. Then END THE TURN.
REVERT: `git revert <commit>` (forward only).
```
