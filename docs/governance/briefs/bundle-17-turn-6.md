# Bundle 17 — turn 6: the records turn with two fixes (INC-671 the closed Next's contrast; INC-672 PW-162 part (d)): brief, version 1 (saved unchanged, 2026-10-16)

```text
BUNDLE 17 — TURN 6 (2026-10-16). ONE TURN: TWO FIXES BY CARRIER AND BY YOU, THEN THE RECORDS BY CARRIER. No migration. No new string. No package change. No file deleted. Its green closes bundle 17.
Base: dev ae3ce4e0 (turn 5). The census below proves every file by content. This file is public: it is written as build instructions.
Tier C: the records (the supervisor's text, imported word for word — G11) and the closed Next's classes. Tier B: the test.

ANSWERS TO THE LAST TURN
- Turn 5 is verified on dev ae3ce4e0 ("Executed Turn 5 bundle"): the 12 carrier paths byte for byte, the brief saved, PW-191, PW-192, MLA-17 and the four changed tests read whole — as asked; your two "not foreseen" (the `not.toHaveAttribute(…, /.*/)` form; MLA-17's wording check) are right. Run 963 was RED on two causes, both this turn's: A11Y-2's colour contrast on the closed Next (INC-671 — the supervisor's styling, not your work) and PW-162 part (d) (INC-672 — a test that needed Next to send with a required answer empty); everything else green, D193 itself green across the suite. Run 962 (turn 4) was green and promoted; INC-667 and INC-668 are closed. The operator Published turn 5 and walked the bundle: eight lines passed.

WHY THIS TURN
- INC-671 (run 963's smoke tier, A11Y-2 "wizard steps 1, 3 and 5", wizard-5, color-contrast ×1, both projects, both attempts): turn 5 drew the closed Next as the primary button at 60 % opacity. A disabled control is exempt from the audit's contrast rule; a closed one is a live button, so white on blue at 60 % was judged and failed. The closed Next is now drawn in the secondary tokens (the Back-to-review button's set, which the audit passes); the behaviour is unchanged.
- INC-672 (run 963, shards 3 and 6; the fast lane the same): PW-162 part (d) clicks Next on the price page with the basis unanswered and expects the draft route to be called once (a transport failure it simulates with `page.route`). Under D193 the step's mirror closes Next and nothing is sent, so its wait ran out. Parts (a)–(c) pass: the test's purpose — a refusal on the price page never stands on Specifications — holds. Part (d) is re-described below.
- The records of bundle 17's close (G41): spec-ledger block S69; the incidents INC-663…INC-674 with the later word and the watch list; system-state's current position; the handover, the condensed running record and the manifest; the roadmap; the changelog; the posting doc's later word.

WHAT THIS TURN BUILDS (the carrier)
- src/features/posting/wizard.tsx — the closed Next's classes: `data-[closed=1]:border data-[closed=1]:border-input data-[closed=1]:bg-secondary data-[closed=1]:text-secondary-foreground data-[closed=1]:hover:bg-secondary/80` in place of `data-[closed=1]:opacity-60`, with its comment (INC-671).
- docs/spec/spec-ledger.md (APPEND: block S69), docs/tracking/incidental-findings.md (the tail from "Numbering: next free INC-663." replaced: INC-663…INC-674, the later word, "Numbering: next free INC-675.", the watch list), docs/governance/system-state.md (the bundle-17 current position inserted; the bundle-16 one marked superseded), roadmap.md (line 3; turn 5's line extended; turn 6 and bundle 18 added; the flaky-test and open-with-operator lines), docs/governance/handoffs/2026-10-16-bundle17-close-handover.md, -running-record.md and -records-manifest.md (NEW), docs/_changelog.md (APPEND), docs/features/posting.md (APPEND).
- The usage maps do not change (no key change): `bun run i18n:map-guard` proves it.

THE TEST (yours; Claude writes none; by hand)
1. e2e/post-wizard-pricing.spec.ts, PW-162 ("a refusal left on the price page never stands on specifications, and names the question (INC-455)"), part (d) only (the block that begins `// (d) the Price Next answered by a transport failure once.`): before the `page.route("**/api/listings/draft", …)` line, make the price page's required answers present so that Next sends — choose the basis (`specControl(page, basis.basisKey).selectOption("hourly")` — the first token of `seedBasisSet`, as PW-63 chooses it; an hourly basis derives the period and keeps the fixed type) and give a figure (`post-price-amount` filled with "150"; the mode starts on fixed) — and assert `post-next` has no `data-closed` attribute (`not.toHaveAttribute("data-closed", /.*/)`); keep the route interception as it is; click `post-next`; the existing `expect.poll(() => aborted …).toBe(true)` stands; then assert `post-next-unreachable` is visible (D58's "Not saved yet" — the refusal that stands on the price page now) and `post-step-4` still visible; then `toSpecs("back")` and `judge("d")` as before (no summary on Specifications; Next reaches Photos) and `page.unroute` as before. The Amharic part that follows (d) clicks `post-next` on the price page and expects the summary to name the basis: because the basis is now answered, first clear it again (`specControl(page, basis.basisKey).selectOption("")`) so the mirror closes Next and the tap's mark names the basis as before; nothing else in PW-162 changes. Its comment for (d) says: the transport failure is simulated on a real send, because a closed Next sends nothing (D193).
RULE: a test never locates a real row by page position (G28); every fixture is scratch (G27); no assertion is loosened — (d) keeps its route interception and its wait.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-671: the closed Next in the secondary tokens — the same look as the Back-to-review button beside it; no new token, no new string.
- INC-672: PW-162 (d) keeps its purpose (a refusal shown on the price page never stands on Specifications) with the refusal that D193 leaves reachable there — D58's "Not saved yet" from a transport failure on a real send.
- The records are the supervisor's text (G11); any wording question is reported, never edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev ae3ce4e0 with this turn's carrier files)
- Clean: typecheck, format (the records included), lint (0 errors, 33 warnings), 932 unit tests (161 files), the map guard, the hardcoded-strings guard (0 findings); the carrier split on a clean copy of the base: the tree equals the supervisor's file for file.
- Not run by the supervisor: the browser tests (PW-162 and A11Y-2 are judged by CI on this turn's commit).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-17-turn-6.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (run 963 on ae3ce4e0: FAILURE — the two causes above, both fixed here). Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then the hashes;
  5. the test (1 above), by hand;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. Check each written file's sha256 against the table before you go on. The records files are long (the ledger over 1 MB): write them by script, never by hand, and never retype a line.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 10 paths of the hash table, the brief, and e2e/post-wizard-pricing.spec.ts (the test). No database change. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.
- THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on this commit runs every spec; the supervisor reads PW-162, A11Y-2 and the whole board on that run.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-17-turn-6.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 7 files → each equal to:
  214684c988fd5c6a8adae50cf449f16c54e7099a96adc791a24893ffabfee467  docs/_changelog.md
  27a77c9179cd69cf90b264a3c38371d8337233feb930c5eaa4ad0ec15000ea5b  docs/features/posting.md
  d94aba075062c1bd6882c7a521a78debfca2fee8ab4d83194f63bb4880c8ce1f  docs/governance/system-state.md
  d69785455d7db578eda9a80eee3cb1ff0a87b68a64757871aa8d7de99b782ba9  docs/spec/spec-ledger.md
  ba5f180af93a8a2c28fb340620ced01d0d42cb8b005553e7feee5a6506a7d0c9  docs/tracking/incidental-findings.md
  e59f355f468e364e9ac139445e9c423992e0eb5fe1bc08b9487eb5f00bb0f85b  roadmap.md
  8c37ef903a1e9bcb88e14b2f0b0a1756993e060fcc68fc6bd45012a3a6ecbd8d  src/features/posting/wizard.tsx
- (c) `sha256sum e2e/post-wizard-pricing.spec.ts` → 1435a1f860769958ccfacacfbd09afcd50d2a25b82944a2263f27ee42af5c0b8; `ls supabase/migrations | tail -1` → 20261016150556_19d4f9d4-882a-4812-82ca-abd412070915.sql (turn 4's; no migration this turn).
- (d) No database census: this turn touches no door.

THE CARRIER — B17T6-TURN-CARRIER-2026-10-16.md (61,967 bytes; sha256 7c7e7f67059c244225e8cdf0673ee7465679a40f9d84e47dfb54aba99d2cb734; 14 sections)
- Its first line starts "B17T6 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  45341a61ae1e07f96a5ed71b75331fe7262802474fc3f3ebba358949a3a39a68  docs/_changelog.md
  265ee7e0584ba9e4e1515e186b4ba72b73de04e0cf626c75ae5c4abf2a4d0373  docs/features/posting.md
  b89d1cae9f3b8f72fa074b614592756d6c31859581095117df957df0b8f3a034  docs/governance/handoffs/2026-10-16-bundle17-close-handover.md
  0b485d1a33ea0a10c718bc671888b21ea62f67a41b0242c43e2547fad0545985  docs/governance/handoffs/2026-10-16-bundle17-close-records-manifest.md
  498514d6f97c3e4518a0512422425afb672ca0d89b3551e7005ca33af0be7de5  docs/governance/handoffs/2026-10-16-bundle17-close-running-record.md
  b19c9eda1ed495253629e4ee206fbc799eb1ff2f4afc7df60424cc6eaa6900a7  docs/governance/system-state.md
  201730add9dbb11a6839fbd569e994d39060fb3df4c4a5291cbef79cd894a7c6  docs/spec/spec-ledger.md
  533232ceb5f307df9649c99104f774b4c05f35f22670e4b617a6279052062ed8  docs/tracking/incidental-findings.md
  6e395dcc335a012337248518251d7a861774d37c0efa105320db9c389a6c7769  roadmap.md
  61361461f2c6edc7b31a64493e86d86f9413185bd8a658fd330d1feceb02d6cb  src/features/posting/wizard.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean (the records and the spec file included);
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b17t6.log` — 932 passed (161 files); paste the count;
- `bun run i18n:map-guard` "usage maps match the tree";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 10 sha256sum lines and the brief's; the sha256sum and line count of e2e/post-wizard-pricing.spec.ts, and `git diff <START> -- e2e/` whole.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`; `git ls-files` proof that the three new handoff files are tracked (G20). If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 10 paths, the brief and the one test file.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. Do not wait for CI (DEC-181).
2. On this turn's green: Publish (no Sync keys needed), then the one-line re-walk from the supervisor; the bundle is closed; bundle 18's spec list follows.
```
