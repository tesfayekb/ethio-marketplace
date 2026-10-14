# Bundle 13 — photos, turn 15: tests only — a burst stays in one window (INC-617), CT-18 names the cell that moved (INC-497), PR-26's status line (INC-616): brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 13 — PHOTOS (D154–D166) — TURN 15 (2026-10-14). ONE TURN, NO MIGRATION. No new string. No package change.
Base: dev 825f4f6f (turn 14's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: browser tests and one new browser-test helper (e2e/). Tier C: the docs, the roadmap and the changelog. Nothing under src/ and no database change.

ANSWERS TO THE LAST TURN
- Turn 14 verified: dev 825f4f6f equals the supervisor's tree with the saved brief (sha256 7197783c…, equal) and the migration (mark 20261014140000); your read-back matched; the operator applied it on ethio-staging. Your note that census (d) and (e) were read after the carrier is logged: the values were as expected.
- CI: turn 12's run (08095c33) and turn 14's run (825f4f6f, which also judges turn 13) are green and promoted — main = dev = 825f4f6f. Turn 14's run retried 7 tests, all on a degraded ethio-staging (502 answers, statement timeouts): no code finding.
- This turn: the class fixes of three retried passes the supervisor read (INC-617, INC-497, INC-616). Tests and docs only.

WHY THIS TURN
- INC-617 (2026-10-14): PR-9 spends the category finder's test dial (two calls an hour on the test's own key) and expects the third call refused with 429; on run 38540279452 the third call was answered 200. The dial counts in fixed windows floored to the clock (`consume_rate_limit`: floor(epoch / window) * window, supabase/migrations/20260917000149_7145d6e9-….sql), so a burst that crosses the hour starts a fresh count. INC-572 (PR-33, 2026-10-12) was the same class, fixed with its own wait: this is the class's second occurrence (G29: every test of the class, one helper).
- INC-497 (reopened): its judge allowed one CT-18 "changed" line after bundle 12 turn T5 (run 38394886154, "15 changed", the expected compaction). A second came on 2026-10-14 (run 38493145138: "0 added · 16 changed · 0 retired · 0 reactivated · 0 deleted · 137 unchanged · 0 refused"), so the cause is not the whole story. CT-18 reads only the counts line; the preview's own answer already names each changed row (`items`: op "update", slug, the changed cells and their names — `cat_import_plan`, supabase/migrations/20261005165621_78683470-….sql). The next red must name the cell and the rows alive while it moved.
- INC-616: PR-26 passed on retry three times in seven days. Two first-attempt bodies were read: a 504 from staging at sign-in (2026-10-11), and a 503 from the identity route (the door never reached) with an afterEach timeout in turn 7's staging outage (2026-10-14). The third was overwritten unread. Its status assertion names nothing.

WHAT THIS TURN BUILDS
- e2e/helpers/rate-window.ts (NEW): `inOneWindow(windowSeconds, needMs, tag)` — when fewer than needMs remain in the current window by the runner's clock, it polls the clock until the next window has begun, and the test's own budget grows by that wait (`test.info().setTimeout`); otherwise it returns at once.
- It is called just before the first counted call of every test that spends a real dial and expects a refusal (the census of 2026-10-14): PR-9 and PR-7 (e2e/posting-routes.spec.ts), PR-26 (e2e/posting-routes-identity.spec.ts), PW-41 (e2e/post-wizard-place.spec.ts), PP-9 (e2e/photo-pipeline.spec.ts), VP-4 (e2e/viewing-place.spec.ts), PR-27 to PR-32 through `twice`, and PR-33, whose own inline wait it replaces (e2e/posting-routes-dials.spec.ts).
- e2e/admin-categories-lifecycle.spec.ts: CT-18 reads the top-level rows after its export, keeps the preview's answer, and when any count is not zero its failure message carries `[ct18-dump]` lines (the top-level rows at the export and now; up to ten changed rows, each with its changed cells, its line in the file sent and its line in a second export read at once). Its assertions are unchanged.
- e2e/posting-routes-identity.spec.ts: PR-26's status assertion carries the call's number and the answer.
- docs/features/e2e-harness.md (three sections); the changelog; the roadmap (line 3 and the turn-15 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The fix is in the tests: the windows are the product's rule and stay as they are.
- Each test's need: 20 s for PR-9, VP-4 and `twice`; 30 s for PR-7, PP-9 and PR-33 (as before); 60 s for PW-41 (62 calls); 120 s, the whole budget, for PR-26 (21 calls in a UTC-day window).
- The wait grows the test's budget by exactly the time it waits (its named cause, G38); no other timeout changes.
- CT-18 prints at most ten changed rows: the evidence file keeps the first 40 lines of a failure's message.
- No new test id.

TESTS
- No new test. Edited, with every assertion unchanged: PR-7, PR-9, PR-26, PR-27..PR-32 (through `twice`), PR-33, PW-41, PP-9, VP-4, CT-18.
- Unit: unchanged, 840 in all.
- Red first: not run — the window edge cannot be provoked on demand, and CT-18's dump prints only on a red; both are proven by the next run that meets them (said so, S186).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 825f4f6f with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 840 unit tests (146 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-15.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 12's or 14's commit, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no retry added; the only budget change is the one `inOneWindow` makes when it waits. A test this brief does not name is not edited.
- Scope — these files only: the 11 carrier paths and the brief. No migration; no database read or write. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-15.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  d8507388f0b2cb3d655913c4438eafa8ddad12dc3888686b896293bb4217c680  docs/_changelog.md
  a5f586bb5708929571c27ba9ceaba7c4f2e4212cf82e4b16e90affd8bca498a9  docs/features/e2e-harness.md
  f431a488e4d0643e4f2218b2bf72e5d7074f58a662a06627573fc544b5814a17  e2e/admin-categories-lifecycle.spec.ts
  e01e3c905a1a331df1557cb672c2b1c62dbda53fb17ffce8f04d12d1c20e614c  e2e/photo-pipeline.spec.ts
  2264cae26ec1866964b134afce0ffae2d01c4cdf3292f4009deb5bf1e0108099  e2e/post-wizard-place.spec.ts
  fc09f7870a95b1546dbb38836eb094f28faebb01f311fa7331fc37ad16da16f3  e2e/posting-routes-dials.spec.ts
  9fc0c2a7e00de0e8ca5a0094403d8b4dd1dcf47e2efdb951bbe43b364f74a683  e2e/posting-routes-identity.spec.ts
  c8dfbcdcd52e0f830d8d0a47460882e00d4094ddf0434774dc9ab242bc525ecd  e2e/posting-routes.spec.ts
  b919d9d4da13de59dce0175bb43f32856cf8b1c1395e9eb5611235aa96d1a500  e2e/viewing-place.spec.ts
  281cc21f742d9a81fdb029ed0c346452f50a07733eca8eccdfeff205d88184dd  roadmap.md
- (c) `ls e2e/helpers/rate-window.ts` → no such file.
- (d) `grep -rl "inOneWindow\|ct18-dump" e2e | wc -l` → 0.

THE CARRIER — B13T15-TURN-CARRIER-2026-10-14.md (14,822 bytes; sha256 4043db032c8973c5f5969493688b883e2921f4b33af9e5dff77bafb77ef8b319; 25 sections)
- Its first line starts "B13T15 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 11 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  71fc5f56b8c4d8cd7df947714834254831bcfee4ac48c1bc76d8f6ad634e97e1  docs/_changelog.md
  504e306aed3a07208c94dfab94a2098bf5a065421d491bceed87b87ed8938ed6  docs/features/e2e-harness.md
  3139825838ffe9943677b692cbfded4cf4f5fb817b72f96b6774ebcaf567ffc7  e2e/admin-categories-lifecycle.spec.ts
  bdb4cce88561ee0ebc1d2d1409bbeed51148c07a13e7d366c394c533335f6553  e2e/helpers/rate-window.ts
  82d1f11a54fb780833cbdc9c2ac04f8cb1c082f35aa62defb88f07ae82714907  e2e/photo-pipeline.spec.ts
  d246328f7d0cdd2f4b26912e7cd73e5e622c9b2f24ddb4987ff42083f9648500  e2e/post-wizard-place.spec.ts
  65e660ad8b6f0b8ffad25934e2cf63f744791141679af730769fa96622c5dc76  e2e/posting-routes-dials.spec.ts
  3b2991eea3c396a7435994438c8a8ae59a096b3435c48441f088bbf8bb5296e9  e2e/posting-routes-identity.spec.ts
  74da11091218340e7351596b3ecca4a823432fbdf510e3828f49620e5b6e768c  e2e/posting-routes.spec.ts
  7f1554fb788244f1f0b4672a1263c850f603b74a7cb7a678e259cc9d52b2f020  e2e/viewing-place.spec.ts
  fb285cd3cb4da101facee65cedf7e7f2393ea2684d3027b922379b1c21f9c30c  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t15.log` — 840 passed (146 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `grep -rl "inOneWindow" e2e | sort` → the helper and the six spec files: e2e/helpers/rate-window.ts, e2e/photo-pipeline.spec.ts, e2e/post-wizard-place.spec.ts, e2e/posting-routes-dials.spec.ts, e2e/posting-routes-identity.spec.ts, e2e/posting-routes.spec.ts, e2e/viewing-place.spec.ts;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 11 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 11 carrier paths and the brief, and no migration file. `git ls-files e2e/helpers/rate-window.ts`, so the new file is shown tracked (G20).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle.
```
