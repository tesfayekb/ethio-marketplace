# Bundle 21 — turn 18: run 1038's reds — the phone rail's rows 24 px (INC-756) and RL-1's read (INC-757) — and the records of bundle 21's close (by carrier): brief (saved unchanged, 2026-10-19)

```text
BUNDLE 21 — TURN 18 (2026-10-19). ONE TURN: TWO FIXES (INC-756 in the product, INC-757 in a test) AND THE RECORDS OF BUNDLE 21'S CLOSE, BY CARRIER. Tier B for the fixes, Tier C for the records. No migration. No new string. No package change. No file deleted. No new module. No AGENTS.md change. Base: dev d30646b0 (bundle 21 turn 17; run 1038 RED). Parts, IN THIS ORDER: A — the fixes; B — the records by carrier. Then the operator Publishes when CI is green and re-walks one line.

ANSWERS TO THE LAST TURN
- Bundle 21 turn 17: verified at d30646b0 — the 22 files of its scope exactly; the saved brief and the six strings byte-equal; B (every `min-h-0` on the nav-to-row path removed, the nav `min-h-full`), C (the drawing diamond while the reads run, the grey button gone, the note after), D (`shareable()` for the list and the ad's page; ShareAd's caller-held open; one ShareAd for the list) as briefed. The operator walked it on the published site (00:56 local): all three lines passed. Run 1038 on d30646b0 RED (05:37:51Z; 2241 passed, 13 gating): the rows 24 px (INC-756) and RL-1's read (INC-757) — Part A. Nothing else to correct.

WHY THIS TURN
- INC-756 (run 1038, 05:37:51Z; the smoke, the fast lane and shard 3, mobile-360): every row of the phone strip and of the opened menu measured 24 px — its icon's height — instead of 32–40 px. "the strip sits under the fixed bar" (e2e/shell.spec.ts :1006, "Expected: >= 31 Received: 24"), "the menu opens in place" (:1239, 24), "primary touch targets are at least 44px" (:1459, 24), FV-1 (:3810, the strip's and the menu's rows 33.17 px apart). Read at d30646b0: in the phone variants each row fills its list item with `h-full`, a percentage of the item's height — compactClass (src/components/shell/app-rail.tsx :222-:227, `"h-full min-h-0"`), CategoryNav's back row (:558 `compact && "h-full min-h-0 gap-3 pe-2"`) and its loading placeholders (:600 `compact && "h-full min-h-0"`); the category rows themselves are RailRows and take compactClass. A percentage height resolves only while every container above it has a definite height; turn 17 made the nav `min-h-full` (:544, :699) — a minimum, its height open-ended — so that the rail can scroll, and from then each `h-full` row fell to its content. The items still share the rail's height, so the operator's walk saw the rows spread as before; the tap area and the highlight shrank to 24 px.
- INC-757 (run 1038, the same three sources): RL-1 waits for `getByTestId("strip-scroll").getByRole("listitem")` (e2e/shell.spec.ts :1102 and :1114). The strip is aria-hidden by design (D205), and role queries skip hidden content, so the wait found 0 rows for 20 s. Its menu half reads `page.getByTestId("rail-scroll")` (:1108), which also matches the desktop rail's scroll box (:869, in the DOM and hidden on phones) — the other drawer tests read it inside the menu (`getByTestId("rail-menu").getByTestId("rail-scroll")`, e2e/shell.spec.ts :1791, e2e/helpers/ui.ts :311).
- G41: a bundle's records land in the repository before the next bundle. Bundle 21 is walked and passed (the operator, 2026-10-19 00:56 local); this turn's own run judges the close. The carrier records bundle 20 turn 3's run and bundle 21 — spec-ledger block S74 (D215–D224, D221 superseded by D222, slips S295–S309), INC-735…INC-758 with the later word and the watch list (INC-754's disposition; PW-128 → INC-758), system-state's current position, the close's handover, condensed running record and manifest, the roadmap (bundle 21 ticked closed with its turn lines and turn 18's; bundle 22's line, reserved-names v5, Terms v2 and the lawyer's point after D210), the changelog.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-21-turn-18.md (roadmap.md line 3 comes from the carrier).

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (run 1038 on d30646b0, FAILURE, is expected; if the newest run is another, say so). You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since the base, name the difference and go on (neither is in this turn);
  4. Part A — the fixes;
  5. Part B — the carrier, then the hashes;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done steps by number and `git diff --name-only <START>`; the operator sends "continue".
- The local browser does not start (INC-506) — say so once: the e2e tests are written by you and run by CI; unit tests run locally, whole. Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared component never changes its default.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-21-turn-18.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  12a4651b7907709a3cd1b9d16767cf81581240b7bf22cadb5b8764175340123e  docs/_changelog.md
  436c1fbd5f542914ff96b821cb51a87523c9dc4b770876a12fc9dd67858ae8ef  docs/governance/system-state.md
  2969296f078556ce931400b5a40e92c23a22d9280d6381739518ae28e309f831  docs/spec/spec-ledger.md
  0986c307a0d6eb8ccfcf9a2df20733ea62d33b8916ddcaa852994361197add13  docs/tracking/incidental-findings.md
  780b44df54d8b41002b2b592a19c7475d570b818e9726e63cfd40c496ae3c4ef  roadmap.md
- (c) `ls supabase/migrations | tail -1` → 20261018165354_7dce9a57-93a9-4c10-a5d7-ff36e88fde91.sql (no migration in bundle 21). `ls docs/governance/handoffs | tail -3` → the three files of 2026-10-18 bundle 20's close (none of this turn's three exists yet).
- (d) No database census: this turn touches no door.

PART A — THE FIXES.
A1 (INC-756). src/components/shell/app-rail.tsx, the phone variants only (`compact`): every row fills its list item by FLEX, never by a percentage height. Each compact list item that holds a row becomes a flex column (`flex flex-col` added to the leaf items' `min-h-8 max-h-10 flex-1` at :260, :299, :338, :402, :439, :467 and CategoryNav's back-row item :548, and kept on the group items, which are flex columns already), and each row inside takes `flex-1` in place of `h-full`: compactClass (:222-:227) becomes `"min-h-0 flex-1"` with its padding part unchanged; CategoryNav's back row (:558) the same; the loading placeholders (:592-:600) follow the same rule (their item a flex column, the placeholder `flex-1`). Turn 17's rule stands: the rail fills when its rows fit and scrolls when they do not; the rows keep their 32-px floor and 40-px ceiling; the nav stays `min-h-full`; the scroll boxes keep their `min-h-0`; the desktop rail is untouched. Comment at compactClass: "INC-756 — a phone row fills its item by flex: a percentage height (h-full) under the nav's min-h-full resolved to the row's content, 24 px (run 1038)." The census, in the report: every remaining `h-full` in app-rail.tsx with why it stays (the icon :242 sizes inside its own fixed box; the sign-out :766 is RailFoot's, which no phone variant renders — confirm; the drawer's scroll box :961).
A2 (INC-757). e2e/shell.spec.ts, RL-1 (:1014-:1123): wait for the strip's rows by their elements — `strip.locator("li")` not 0 — at :1102 and :1114 (the strip is aria-hidden, D205; the strip test at :987-:1004 reads it the same way); read the menu's box inside the menu — `page.getByTestId("rail-menu").getByTestId("rail-scroll")` — at :1108 and its Account half. Keep every assertion and every message as written.
A3. The census (G37), in the report: every test that measures the phone strip's or the menu's rows — the strip test (:963), "the menu opens in place", "primary touch targets are at least 44px", FV-1, RL-1, RM-1…RM-4, PK-1, B21SC-1…B21SC-3, BK-1 and any other you find — each named; the four failing tests and FV-1 need no change once the rows are 32–40 px again (say so for each, or name the change and its reason).
A4. Unit: `bun run test:unit` whole.

PART B — THE RECORDS, BY CARRIER (8 paths)
- docs/spec/spec-ledger.md (APPEND: block S74); docs/tracking/incidental-findings.md (the tail from "Numbering: next free INC-735." replaced: INC-735…INC-758, the later word of bundle 21's close, "Numbering: next free INC-759.", the watch list); docs/governance/system-state.md (the close's current position inserted; the previous one marked superseded); roadmap.md (line 3; bundle 21 ticked closed with its turn lines and turn 18's line; four lines after D210); docs/_changelog.md (APPEND — one line covering A and B); NEW: docs/governance/handoffs/2026-10-19-bundle21-close-handover.md, -running-record.md and -manifest.md. Block S74 holds one Amharic phrase (D217's hint), copied as bytes from am.ts's `shell.favouriteHint`.
- The usage maps do not change (no key change): `bun run i18n:map-guard` proves it. Add no line to AGENTS.md (INC-677).
- WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev d30646b0 with the carrier's files): prettier --check on every carrier file, clean (prettier 3.8.3, the pinned version); the carrier split on a clean copy of the base: the tree equals the supervisor's file for file. Not run by the supervisor: Part A (the executor's) and the suites (CI on this commit runs them).

THE CARRIER — B21T18-TURN-CARRIER-2026-10-19.md (89,610 bytes; sha256 a991c77ba80eaa746dc7f6626df35560e209abb6dcef56c0d3df24728b00acef; 12 sections)
- Its first line starts "B21T18 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes: `REPLACE-LINES a-b` — replace lines a to b (1-based, inclusive) of the base file with the section's text; `INSERT-AFTER n` — insert the section's text after line n of the base file (n = 0 means at the top); `APPEND` — add the section's text to the end of the base file; `NEW` — create the file with exactly the section's bytes; `REPLACE` — the file's whole new content. Apply every section of one file from the highest line number down, so earlier line numbers stay valid. Line numbers refer to the base's file.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header, reading each file whole before any file is opened for writing. The records files are long (the ledger over 1 MB): write them by script, never by hand, and never retype a line.
- After the carrier, `sha256sum` of these 8 files → each equal to:
  34cccfc2211d5902740df9f6c800f3dc045b964db78ce13fb7bc3eaa0fcb7a03  docs/_changelog.md
  83ff3dc3135e3d126740e03ed6dbf81c6bec90f45618d0b66604fa19ede0df72  docs/governance/handoffs/2026-10-19-bundle21-close-handover.md
  e961502f21bcbfe2b1caba869c6fcd225491378257e399ed2b1479039c386d25  docs/governance/handoffs/2026-10-19-bundle21-close-manifest.md
  8c1b35827cdec7c3f86c9daadc02c731a91138aa3e75a2f0f6cf3f70be82c17e  docs/governance/handoffs/2026-10-19-bundle21-close-running-record.md
  db1fd4b419296e759c837a47625c404d7c3cabc5b3b30e57788c51eafa3172b0  docs/governance/system-state.md
  ec4da1175221fc37f87b6707a034a00971da17275e2103c48103031209b6bbed  docs/spec/spec-ledger.md
  abee82d9a27d3981c4df18dc10d4bfd74adc0e4c3bf9964054f9e206fad7578c  docs/tracking/incidental-findings.md
  047e85e61e12ee6e19734f100603d52d56d5d48eb777cefb860a23fa8c00a909  roadmap.md
  A mismatch is a STOP: report the path, your hash and the expected one, and change nothing else.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bun run i18n:map-guard` "usage maps match the tree"; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; the preview harness's "build OK".
SCOPE — these files only: the brief; src/components/shell/app-rail.tsx; e2e/shell.spec.ts; the 8 paths of the hash table; any file A3's census must change (named with its test). Name any other file in the report's first lines with its reason. Delete no file. Do not use a patch tool.
THE REPORT: done or not done by part; the six ci-status lines and <START>; the census (a)–(d); A1's `h-full` census; A3's census; `git diff <START> -- src/components/shell/app-rail.tsx` whole; the carrier applied — the 8 hashes as `sha256sum` printed them; `git diff --stat <START>`; `git diff --name-only <START>`; `git ls-files docs/governance/handoffs/2026-10-19-bundle21-close-handover.md docs/governance/handoffs/2026-10-19-bundle21-close-running-record.md docs/governance/handoffs/2026-10-19-bundle21-close-manifest.md` (G20: three tracked paths); the checks; anything not foreseen. Then push and END THE TURN; the operator Publishes when CI is green and re-walks one line.
REVERT: `git revert <commit>` (forward only).
```
