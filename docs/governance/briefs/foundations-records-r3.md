# Foundations — records turn R3: the block applier hardened (records turn R1's reviewer), and the decision ledger's block S77 and system-state.md's position (G41): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — RECORDS TURN R3 (2026-10-27; G41; register row 58; anchors located at 8898525cce8d7542e84f218beedb192d29fda03e). Two things. (1) Records turn R1's reviewer found the block applier (scripts/brief/apply-blocks.ts) skips a malformed last block instead of refusing it — its own probe printed `applied 1 block(s)` for a brief whose last EDIT never ended — and five lesser gaps: no census names a second parser of brief blocks, a path's EDIT numbers are not checked, the wrapper is proven by its text, writes are made file by file, and no docs page describes it. This turn fixes all six, red first. (2) The decision ledger (docs/spec/spec-ledger.md) ends with block S76 (2026-10-23, "NUMBERING after this block: next free DEC-243, D234, INC-847, S379, ACT-021."), and system-state.md's current position is still bundle 22's records turn of 2026-10-23. The hardened applier applies block S77 — 2026-10-23 12:0xZ → the cut of this turn: bundle 22's last turns, the Foundations bundle to turn 34d, records turns R1 and R2, D234–D238, DEC-243–DEC-275, the operator's words, the supervisor's rulings, the executor drift, the rules in force, the steps owed by the operator, the judges open, the numbering — word for word, and system-state.md's position of 2026-10-27 (the previous position kept as written, a line above it marking it superseded), its standing reads' versions brought level (supervisor v1.14, Knowledge v3.11, both live since 2026-10-23). The slips S379–S454 follow in records turn R4. Tier B (a tooling script with its tests; records). No migration. No string. No package change. AGENTS.md unchanged. No file deleted. Base: dev 8898525cce8d7542e84f218beedb192d29fda03e (records turn R2's landing; CI SUCCESS on 8898525c (run 40496361455, completed 11:54:00Z; main promoted; no failing job)). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0 (the brief and roadmap line 3); B — the applier, red first; C — the ledger, the position, the register, the roadmap and the changelog (by the hardened applier); THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: 8898525cce8d7542e84f218beedb192d29fda03e
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/governance/system-state.md
docs/spec/spec-ledger.md
scripts/brief/apply-blocks.test.ts
scripts/brief/apply-blocks.ts
SCOPE-END

THE SYSTEM (G0) — one concern, and a records import.
CONCERN: a brief's exact text reaches the tree exactly — every FILE block and every EDIT block lands byte for byte, in the order written, or nothing lands (register row 58).
MECHANISM: scripts/brief/apply-blocks.ts (records turn R1) — `parseBlocks` now also refuses a marker line no whole block holds (a block that runs on, never ends or lacks an end line; the line named) and a path's EDIT numbers out of order (1, 2, 3 … in the order written); `applyBlocks` hands every new text to `io.writeAll` at once; `writeAllUnder` stages each file beside its target (`<file>.apply-blocks-staged`) and renames all into place only when all are staged, clearing the staged ones on a failure.
CONSUMERS: every brief's HOW TO WORK, both executors. Code that parses brief blocks at BASE: scripts/brief/apply-blocks.ts alone (`git grep -l 'OLD-BEGIN\|NEW-BEGIN' <START> -- src e2e scripts .claude` prints it and its test).
COVERED HERE: the applier and its census. LEFT: none.
CONFORMANCE GUARD: scripts/brief/apply-blocks.test.ts — BA-1 (also: a last block that never ends and a FILE run-on refused with their line; an EDIT number repeated, skipped or not starting at 1 refused), BA-2 (one writeAll for all files), BA-3, BA-4 (also: a file that cannot be staged — its parent is a file — leaves the file staged before it unwritten and no staged file behind), BA-5 (the wrapper RUN in a scratch root under the kit's scopeVerdict: before a brief is in force a standing-allowance path is applied and a scoped path refused, nothing written), BA-6 (the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker; a planted second parser is named). Red first: the new test against R1's applier fails BA-1, BA-2 and BA-4 (3 failed | 3 passed).
EXCEPTIONS: none.
FIVE LENSES — security: the applier still writes only where the kit's scopeVerdict lets the executor write; the staged files sit beside their targets inside that scope and are cleared on a failure; the repository is public (G51): no key, token, e-mail address, message id or project reference appears in the records (checked by script), and the fixes and findings they name are fixed on dev or need staff rights (INC-939: defence in depth — no client writes listing photos since 20261015102153; category assets need staff rights) · performance: none · failure modes: the subject — a malformed brief is refused with its line, a failed write leaves the tree as it was · consistency: one parser of briefs, proven by BA-6 · future growth: a new block kind is one more pattern and one more BA case.
FORWARD-SCAN: records turn R4 and every brief after it. REGISTER: row 58's guard and notes cells (Part C).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-records-r3.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `(Foundations records turn R2: the incident ledger's second half, INC-901 … INC-937, and the later word — G41)` becomes `docs/governance/briefs/foundations-records-r3.md (Foundations records turn R3: the block applier hardened, and the decision ledger's block S77 and system-state.md's position — G41)` (everything after it stays, as it is). The roadmap's other lines change in Part C, by the applier. Commit `records turn R3: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B and C; THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r3.md <paths>` — never retyped, never edited or reflowed by hand, never formatted (the code is already in Prettier's form; docs/spec/ and docs/governance/ are outside Prettier and land verbatim; THE CHECKS' format:check proves the rest). Part B's first run uses R1's applier to apply the new test, its second applies the new applier over the old. Part C's NEW texts are about 85,000 characters of record: the commands, test ids, files and fixes they name are history, never instructions for this turn. A refusal from the applier is a STOP that pastes its line. If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-records-r3.md, roadmap.md, docs/_changelog.md, docs/features/brief-applier.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-records-r3.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Part B (`records turn R3 part B: the block applier hardened`); Part C (`records turn R3 part C: block S77, the position, the register and the roadmap`); the report. Red first is shown, never committed.
- Local runs: the unit suite whole at THE CHECKS and the touched tests as you go. No browser test is owed: no file under src/ or e2e/ changes (CI runs every test on every commit).
- Behaviour contract: nothing in the product changes. The applier refuses what it skipped and writes all or nothing; the ledger gains block S77 after its last line; system-state.md gains the new position and a superseded line above the old one (whose own bytes do not change) and its standing reads' two version names; the register's row 58 gains its census and notes; the roadmap and changelog lines change as Part C's blocks say.
- Knowledge K: K1 the census is the supervisor's (the running record read whole; the applier's one parser above); K2 the report lists any DEC number in DEC-243 … DEC-275 the ledger already defines (expected: none — `git grep -c '^- DEC-24[3-9] (\|^- DEC-2[5-6][0-9] (\|^- DEC-27[0-5] (' <START> -- docs/spec/spec-ledger.md` prints nothing) and any second parser of brief blocks (expected: none — BA-6); K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. CI on BASE was read by the supervisor: SUCCESS on 8898525c (run 40496361455, completed 11:54:00Z; main promoted; no failing job). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); read e2e-last-failure.md and guards-last-failure.md only if it is not SUCCESS on BASE — then a red is fixed first at its root (G21, G38) and named in the report.

PART B — THE APPLIER, RED FIRST.
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r3.md scripts/brief/apply-blocks.test.ts docs/features/brief-applier.md` (R1's applier applies the new test and the docs page); then `bunx vitest run scripts/brief/apply-blocks.test.ts` — RED, shown and not committed: paste the totals (the supervisor's run: `Tests  3 failed | 3 passed (6)` — BA-1, BA-2 and BA-4 fail on R1's applier).
B2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r3.md scripts/brief/apply-blocks.ts` (the new applier over the old); then `bunx vitest run scripts/brief/apply-blocks.test.ts scripts/conformance/wired.test.ts scripts/conformance/non-null.test.ts` — paste the totals (the supervisor's run: 3 files, 10 tests, all passed). Commit Part B.

PART C — THE LEDGER, THE POSITION, THE REGISTER, THE ROADMAP AND THE CHANGELOG (by the hardened applier).
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r3.md --dry docs/spec/spec-ledger.md docs/governance/system-state.md docs/governance/mechanisms.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/spec/spec-ledger.md #1` · `EDIT docs/governance/system-state.md #1` · `EDIT docs/governance/system-state.md #2` · `EDIT docs/governance/mechanisms.md #1` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT docs/_changelog.md #1` · `applied 7 block(s) to 5 file(s)`). The blocks:
EDIT docs/spec/spec-ledger.md #1
OLD-BEGIN
NUMBERING after this block: next free DEC-243, D234, INC-847, S379, ACT-021.
OLD-END
NEW-BEGIN
NUMBERING after this block: next free DEC-243, D234, INC-847, S379, ACT-021.

S77 · 2026-10-23 12:0xZ → 2026-10-27 11:55Z · BUNDLE 22 CLOSED (TURN 30 JUDGED; TURN 31, THE RECORDS; TURN 32, ONE "AGREE TO A DOCUMENT" COMPONENT AND THE LANDING AFTER SIGN-IN; TURN 33, THE DOCUMENT NAMED IN A SENTENCE IS THE LINK (D235); TURN 33b, THE PACKAGES) AND THE FOUNDATIONS BUNDLE (DEC-237) BUILT TO TURN 34c-5: THE CONFORMANCE KIT, THE SIGNED-IN DOOR-STEP, THE ROUTE BOUNDARY AND ITS FIVE WAVES (INC-859–INC-863), THE DIAL REGISTRY, THE ROUTE CLIENT, THE AI GATEWAY, THE VENDOR-SEAMS FREEZE (DEC-249/250), SERVER FUNCTIONS ON VALIDATORS, THE LINT COMPOSITION; THE SPEED WORK (D234 — THE PERF LAB AND ITS BASELINE, PER-PAGE BUDGETS, loadOnce, THE AD'S PHOTO LINKS SIGNED BY THE SERVER, THE FIRST READS PRELOADED, THE SERVER'S FIRST FEED PAGE AND CARDS, THE STRINGS LAYERS, OVERLAYS AND DIALOGS ON DEMAND, THE DEVICE'S OWN FONTS, THE DATABASE CLIENT OFF EVERY PAGE'S FIRST DOWNLOAD — 254.0 → 204.1 KiB); THE REVIEW GATE (K1); A FAILED DOWNLOAD SURFACED; THE SIGN-OUT MADE FINAL (DEC-268, DEC-271); THE SESSION READ; THE NON-NULL GUARD (K2); THE LOVABLE CONNECTOR (DEC-245), STAGING APPLIES BY CONNECTOR (DEC-246), THE CLAUDE CODE EXECUTOR AND THE HYBRID (DEC-255–DEC-257) · BUNDLE 22 TURNS 30–33b; FOUNDATIONS TURNS 1–34 (WITH 32b AND 34's RULINGS 1–3), K1 (RULINGS 1–5), K2, 34b-1–34b-4, 34w, 34w-2, 34c-1–34c-3, 34c-5; THE EXECUTOR KIT v1–v1.2 AND THREE CLAUDE CODE SMOKE SESSIONS; TURN 34d (THE CLAUDE CODE EXECUTOR) AND RECORDS TURNS R1–R2 (THE BLOCK APPLIER, REGISTER ROW 58); TURN 34e BUILT, WAITING FOR LOVABLE CREDITS · SEVEN MIGRATION FILES (MARKS 20261024030000 → 20261025150000) · D234–D238 · DEC-243–DEC-275 · INC-847–INC-939 · SLIPS S379–S454

What landed (at 2026-10-26 22:5xZ — the record's end is under AFTER 22:5xZ below: dev = main = `a9f033a9` (turn 34c-5) — run 40406394089 SUCCESS (22:12:48Z; every job green, 0 flaky, 18 of 18 results read; it carries turns 34c-2, 34c-3, K2 and 34c-5); every turn verified in a fresh clone by diff against its brief (G30), every saved brief checked by sha256 at STEP 0; seven migration files, each applied on ethio-prod by the executor's tool and on ethio-staging by the operator or by the supervisor through the Supabase connector (DEC-246) — the newest mark `20261025150000`; runs queue and a newer push replaces only a QUEUED run (DEC-181); the last Publish `c1b6b4e5` (2026-10-26 14:0xZ); Lovable's workspace out of credits from 21:45Z, turns 34d and 34e unsent):

BUNDLE 22'S LAST TURNS
- Turn 30 (judged) — run 39946538904 on `4de3d08d` (12:0xZ 2026-10-23): 35 jobs, 1,977 passed · 0 failed · 0 flaky in the 17 testing lanes (CG-1…CG-4 green in both projects); the only red the smoke lane's step "Database security lints (DEC-240)" (INC-846) and the Verdict job. CLEAN on its code and migration; INC-845 and the step's conversion rode turn 31; main stayed `29101960`.
- Turn 31 — the records (carrier B22T31-TURN-CARRIER-2026-10-23.md, 824 KB, 24 sections, sha256 fbd0ba01…; brief bundle-22-turn-31.md sha256 78dd7df0…; base `4de3d08d`; `4a6d353d` "Started bundle 22 turn 31 process") — 17 paths, each equal to the supervisor's tree by sha256 (block S76; INC-781…INC-846; the handover package; mechanisms.md, 25 rows; the amendments record with v1.14 and S331–S378; Knowledge v3.11's mirror; roadmap; changelog; four feature-doc appends; the lint step continue-on-error with its ::warning); the executor's splitter wrote mechanisms.md with an extra newline and the hash table caught it. INC-846's production census: ethio-prod holds exactly the nineteen allowlisted anon-executable functions. Run 39950938203 attempt 1 FAILURE (lane 3's backend start, class (b); lane 15 PW-153 hard on both attempts — INC-809 read again, S379); attempt 2 (the operator's re-run, 13:15:10Z) SUCCESS, 2,163 passed, the lint step passing; main = `4a6d353d`. CLEAN.
- Turn 32 (Tier A; brief sha256 7377ce6b…, 147 lines; base `4a6d353d`; ESTIMATE 3 turns, band 3–4 — three) — one AgreeToDocument component (NEW src/features/legal/agree-to-document.tsx, its census test) for the sign-up tick (D230), the acceptance screen and the publish certification (DEC-236), the three actions drawn closed, never disabled, with one message legal.agree.required; landAfterSignIn (use-legal-gate.ts) at the six sign-in landings — INC-823's registered fix replaced (G10, written into legal.md); the auth door's mail-send word (MAIL_SEND_FAILED — INC-822); awaitDraftSaved (e2e/helpers/ui.ts) as PW-153's wait (INC-809, a census of 152 sites); INC-825's View and Add translation on the card; **M21** supabase/migrations/20261023144720_55ed5bb4-3823-46a3-9020-f4ad79ddd4a7.sql (125 lines, mark `20261024030000`: the sign-up trigger records the acceptance from the sign-up's metadata; malformed metadata a RAISE WARNING, never a refusal). Executor turn 1 `7afd1d20` "Fixed draft save class for M21" (an empty diff from the report's HEAD; 6 files; the operator's staging apply proven by run 39974322055's preflight); turn 2 `53191533` (32 files) — run 39980672474 red by the email lane alone (A-1+A-2 drove the form without the tick — S382) → ruling 3: one form helper, signUpThroughForm (e2e/helpers/auth-form.ts), for both signUpFresh copies and SU-1…SU-5; turn 3 `65dec9e6` (13 files; 49 since `4a6d353d`). Run 40008732750 SUCCESS (19:34:14Z): 2,175 passed, the email lane 6 of 6 (SU-4 proves M21's record end to end), 339/339 migrations; main = `65dec9e6`. CLEAN; INC-822, INC-823, INC-825 fixed (INC-825 fixed again in turn 33 after the walk); INC-809 FIXED-WATCH; register row 26; F7's sign-in/sign-up scenario census received (its NONE rows the later scenario suite). Records drift: roadmap line 3 still named turn 31's brief.
- Turn 33 (Tier A; brief sha256 2202d5f0…, 31,623 B; base `65dec9e6`; ESTIMATE 2 turns) — stopped before STEP 0 asking for the AGENTS.md exception (S384) → granted, AGENTS.md replaced from AGENTS-turn-33.md (sha256 5556c6ae…); first landing `53aa4e76` (27 files; stopped at C2 — S385): D235's translator-placed link tokens `[text](role)` (the seven new keys legal.agree.first.{both,terms,privacy}, legal.agree.updated.{both,terms,privacy}, legal.agree.certify, the old keys retired), the certification's one link to /legal/publishing, INC-846's fixture line (`ALTER DEFAULT PRIVILEGES … REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated, service_role`), INC-847's readerFailure/ReaderError; run 40057679164 red (LGC-1 owed; first paint 305.5/305 KiB — S386; the audit's two new advisories) — INC-846 FIXED (the lint step passed); **M22** 20261024041937_d4858894 (mark `20261024180000`: admin_legal_documents() names each version's languages; `40203955` "Applied M22 to production", with an unasked roadmap working line, absorbed); continuation 1 `34c0fa5a` (18 files; reader-failure.ts split off the first paint; LGA-21 exposed a design defect → **M23** 20261024045415_fce0ec68 (mark `20261024190000`: both legal admin doors answer `missing_languages`); INC-849 (S387)); the first-paint ceiling to 306; the executor's pause on the editor's reader → INC-850; continuation 2 + Part F `aece54b7` (12 files). Run 40065323076 on `aece54b7`: every lane green, 2,175 passed, 341/341 migrations, the budget at 306; the only red the dependency audit (turn 33b). CLEAN; INC-822/823/825/846/849 fixed; INC-847 instrumented (open); INC-848 to the before-launch list. A3's timing of the published site (TTFB 0.2–0.7 s; ~1.1 s cold) fed D234.
- Turn 33b — the package turn (DEC-243; `31f7b7f2`, 3 files: package.json, bun.lock, docs/features/dependency-audit.md). Run 40065701217 SUCCESS (05:48Z 2026-10-24), the dependency audit green; main = `31f7b7f2`. CLEAN; DEC-243 KEEP. Bundle 22 is closed.

THE FOUNDATIONS BUNDLE (DEC-237; its turns are numbered from 1, so turns 32 and 33 exist twice — bundle 22's above and the bundle's below; the speed turns are 24–34; the executor is Lovable unless Claude Code is named; every Lovable brief carried inline with its sha256 and checked at STEP 0)
- Turn 1 (Tier A; brief foundations-turn-1.md sha256 e4531c25…, AGENTS.md d957f52e…; base `31f7b7f2`) — the conformance kit scripts/conformance/kit.ts (walkFiles, codeOf, visitTs, readAllowlist `key | reason | until`, report) with wired.test.ts and kit-adoption.test.ts (DEC-244); requireSignedIn (src/lib/signed-in-route.ts) for ten hand-rolled door-steps with its census CF-SIR (INC-852); D236 — NEW src/routes/legal.publishing.tsx (signed in, noindex) and **M24** supabase/migrations/20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql (mark `20261024200000`: public.legal_kind_signed_in_only; legal_in_force and legal_scheduled refuse a publishing kind to a visitor with 42501); D237 — the language menu one radio group whose pick is the device's and the account's. The M24 stop `4addd8a1` (run 40072128056 red by exactly LGC-6 ×2 and LGP-4 ×2 — the window named in advance); continuations `52f0faba` (S388) and `93176317` (LGC-6 reads 401 + body 42501 — S390); run 40075831535 red by the first paint alone (306.2/306 — INC-864, S391); the second turn `e50fa844` (S392) and continuation 3 `79f002d6` (MUST_STAY_LAZY; BB-1 restores the shared account's language). Run 40079535915 red by the new lazy-only guard alone, fixed at the root by turn 2's A1. Walked 2026-10-24 13:15Z: both lines pass. Filed: INC-852 and INC-855 (fixed here), INC-853, INC-854, INC-856–INC-858.
- Turn 2 (the route boundary; brief sha256 e7efca0b…, AGENTS.md 9c156cd8…; base `79f002d6`) — defineRoute (src/server/route.ts), answer.ts, upstream.ts, src/lib/schemas/primitives.ts, the census scripts/conformance/routes.test.ts with routes-allowlist.txt (53) and its ESLint block; publish.ts the first consumer. The first turn `ee0cdc56` ended early with the tree red and A1 undone (S393); the second `eefd1141` (A1 at the root: a loader's page-only reader is imported on demand); an E2E-only turn (80 passed; no file changed). Run 40084153912 red by two guards (the deletion guard — S395; the first paint — INC-867), every lane green: DRIFT, fixed as turn 3's A1. Filed INC-859–INC-863 (the waves), INC-865, INC-866, INC-867.
- Turn 3 (brief sha256 5dcdf64b…, AGENTS.md b4711479…; base `eefd1141`) — INC-865's order (the caller before the body is read), refuseAs, bytes(), doorCall (door.ts), ownListing; draft, identity (INC-866's answer bounded), alias, assist, photos.$id, share and view on defineRoute (allowlist 46). `3db3fd46` (S396, S397) — run 40087352763: 129 failures of one cause (INC-868, S398), the budget and build jobs green; `9aaf7db3` "Ruled departure 3" (INC-868 fixed by the executor; INC-869 found and fixed; S399). Run 40093106582's verdict is not in the record; the operator Published `9aaf7db3` and walked turns 1–3.
- Turn 4 (brief sha256 a5a644e1…) — upload/photo, background and media/photo-links on defineRoute, four media deadlines under upstream() (40); `4b52c14b`. Run 40096288722 green (PW-54 flaky once). Departures accepted (S400). INC-859 closed (10 of 10).
- Turn 5 (brief sha256 4daa4373…, AGENTS.md b61f0544…) — the readers' additions (auth "none", a per-route badShape, headers on ok, conditional/notModified, redirect, plain, versionCache, cursor.ts; a reader's database error 503/500, 502 retired; public GET queries non-strict — the recorded exception); `7ba93fc3`. Run 40098552487 SUCCESS. CLEAN.
- Turn 6 (brief sha256 e5c74495…) — the four cached readers onto defineRoute with versionCache and conditional (36). The first send's work was lost by the platform (INC-870; the turn-end check made standing); the redo `fbe94cd6`. Run 40103803977 SUCCESS. CLEAN.
- Turn 7 (brief sha256 ee28dba2…) — readFailure (answer.ts), readFailed (reader-failure.ts); feed, seller and options on defineRoute (33); PR-51 the only spec edit (S401); `f81cfc79`. Run 40107677718 SUCCESS. CLEAN.
- Turn 8 (brief sha256 b8cf5d76…, AGENTS.md 0fec5e27…) — the dial registry (src/lib/dials.ts, 22 entries; src/server/dials.ts spend, peek, dialLimit); `faff8589` (36 files). Run 40112628540 CANCELLED by GitHub after a queue, its E2E report complete (2,177 passed, 0 failed) — judged with turn 9 (G10). K2: the doors' own counters (the database-side dial concern, a later wave). Filed INC-871, INC-872.
- Turn 9 (brief sha256 70732a96…, AGENTS.md f02e1832…) — INC-871 part 1 (`[client-aborted]`, 499), the geocoder seam (one versionCache, upstream()), geo/search/reverse/outline on defineRoute (28); a stop at its question `0d95c0dd` (S403) → ruling; `7c05e7ce`. Run 40120074214 red on typecheck alone (the brief's coordinate schema — S404), every lane green; main to `0d95c0dd`.
- Turn 10 (brief sha256 33a34f79…, AGENTS.md cff26fdb…) — the coordinate fix first; INC-872 (appliedLanguage drives lang/dir), INC-871 part 2 (clientAborted), catalog find, tiles, the ad photo and QR on defineRoute (23); `126fbb4c`. Run 40124077650 SUCCESS; main = `126fbb4c` (turns 8–10). CLEAN; INC-862 (15 of 15) and INC-871 closed; INC-872 fixed (closes after a Flake check or a clean week).
- Turn 11 (brief sha256 1108d7b6…, AGENTS.md 7412ba7f…) — INC-873: authorizeImport before the body in the four imports, the three exports on staff auth (20); `abbd3419` (the platform's title "Completed turn 11 & 12"). Run 40130051349 green, 35/35. CLEAN; INC-874 filed.
- Turn 12 (brief sha256 48577c0c…, AGENTS.md 5f66ba6b…) — defineImportRoute, IMPORT_REFUSALS, the four import dials in the registry (15; INC-860 closed); `258db949`. Run 40134574429 red on Typecheck alone (route.ts :225/:227), every lane green; fixed as turn 13's A2. S405; K2 → INC-875.
- Turn 13 (brief sha256 2e94dc39…, AGENTS.md 9af222be…) — the typecheck fix; INC-874's migration supabase/migrations/20261024220534_7aba0b1c-b2a2-455c-9aec-7c711a41034e.sql (mark `20261025120000`; on ethio-prod by the tool with no approval pause reaching the connector; on ethio-staging by the supervisor under DEC-246, the function's md5 equal on both); the route client src/lib/route-client.ts with RCG-1…3 (INC-875). The stop `5766952f` — run 40137193652 SUCCESS; `eb5ae864` — run 40139100931 red by lane 16's backend start alone (infrastructure). CLEAN; INC-874 closed; departure (d) a small DRIFT fixed in turn 14.
- Turn 14 (brief sha256 55279ba3…) — the route client's additions, posting-service through doorAnswerOf, 14 readers (23 → 10, RCG-4); `0f3a42fe` (typecheck red), `202f5e27` (fixed at the root; a disclosed `bunx tsgo` — S407), `a9c73292`. The two runs' verdicts are not in the record; the next recorded green, `cef6361e`, carries the code. INC-875 closed.
- Turn 15 (the AI gateway, part 1; brief 0f7e364b… stopped on two platform rules — S409; replacement f2f1173a…) — aiCall (src/server/ai/gateway.ts) and ai_calls kept 90 days (DEC-247): supabase/migrations/20261025005245_f5f6c8fb-4cf3-49f7-872f-43f50851aa9c.sql (mark `20261025140000`; the supervisor's connector apply "cancelled", the operator applied it on staging) and 20261025011447_71ad0a58-9d87-4e98-a83e-8f4e07951230.sql (mark `20261025150000`; ai_record_call's optional arguments trailing — S410); two stops on the Lovable AI Gateway SDK rule → DEC-248 (the executor quoted its source and withdrew the scope); `cef6361e` SUCCESS; closed `4d68fb71` with six items carried into turn 16 (AI allowlist 5 — INC-876). INC-878 found beside it (DEC-251's census).
- Turn 16 (brief sha256 cec10dc1…, AGENTS.md 4b95db86…) — the gateway part 2 and the vendor-seams freeze guard (DEC-250; 71 allowances, VS-1…3); `40c2687e`. Run 40156424801 SUCCESS. CLEAN.
- Turn 17 (brief sha256 b1d887ad…) — photo screening and background removal onto aiCall; the Photoroom adapter; `75f9954c`. Run 40160443757 red: PP-30 ×2 (the stand-in cut-out's base64 retyped by the executor — INC-879) and PPOL-19 (a unit test reading the runner's environment — INC-880). DRIFT, reconciled in turn 18.
- Turn 18 (brief sha256 2f8eb67c…; four stops, each the brief's — S411–S415) — category images onto the gateway; INC-879 restored by script and pinned by decoded sha256 (BGR-13); INC-880's census and AIG-36; `830e3de8` — run 40164439959 SUCCESS; `faad2766` (manifest and roadmap) promoted. CLOSED. Turn 19 held for the Claude Code setup (the operator, 01:33 ET 2026-10-25).
- The executor kit (Lovable, docs only; brief executor-kit-install.md sha256 3a69c487…) — `37f691b4` (23 kit files byte for byte: CLAUDE.md, .claude/rules, the hooks — scope-guard, bash-guard, land.ts the landing door, stop-gate, session-setup —, settings, the reviewer agent, EXH-0…15). Run 40180337027 SUCCESS. CLEAN; INC-881 filed. Three Claude Code smoke sessions: the first STOPPED at A1 on the kit's PR-era denies (INC-882; S417, S418) → kit v1.1 `22584e33` (run 40183382027 SUCCESS; INC-881 reopened); the second STOPPED at A1 on a stale local dev (INC-883; its stop report parked on hold/executor-kit-install); the third LANDED `1993fbf6`, the first Claude Code landing (four guard probes refused; no usable browser — INC-884), run 40185248201 SUCCESS; kit v1.2 `f326ab98` (the fast-forward fetch, the browser probe, hermetic git — INC-881 fixed in code), run 40186261499 SUCCESS. Cost: $250 → $246.
- Turn 19 (Claude Code; v1 62b85803… — STOP 1 `7b3633cb`, a correct stop on a test outside SCOPE (S416), run 40187325610 SUCCESS; v2 b61d1a8c…) — translations onto the gateway (translate.ts 586 → 219 lines; routes 11→10, has-permission 1→0, route-client 9→8, AI 1→0); the executor's reviewer 0 BLOCKER, 1 MAJOR fixed; `454b5849`. Run 40193823379 red by lane 8's backend start alone (infrastructure), superseded by 40195508736 on `1aeb2c8f` SUCCESS. CLEAN; INC-861 and INC-876 closed; INC-885–INC-889 filed; the recorded K4 exception `?target=en`. Cost ≈ $26 (measured).
- Turn 20 (Lovable under DEC-257; brief sha256 e90ef835…) — the six createServerFn sites onto `.validator(<schema>)` (NEW src/lib/schemas/server-fns.ts; CF-RT-8 refuses `.inputValidator(`) and the root's language read through upstream() (INC-863); two STEP 0 stops (the saved brief split one line — repaired by one edit, sha-checked); a third copy of the scratch-kind pattern (S420); `88bfbc1b` (allowlist 10 → 4). Run 40198835862 SUCCESS. CLEAN; INC-890–INC-893 filed.
- Turn 21 (brief sha256 26ba0de9…) — one exported selector list per lint concern, composed by every block, CF-LINT-1…3 (INC-891); upstream()'s success lines at info (INC-892); INC-893 classified; `a48a2171`. Run 40201962164 green. CLEAN.
- Turn 22 (brief sha256 aa6ef5e1…; a STEP 0 stop on a dropped final newline) — src/lib/uuid.ts and the six INC-857 walkers on the kit (routes allowlist 4 → 1); `7633438d`. Run 40205286807 SUCCESS. CLEAN; INC-857 closed; INC-894 filed.
- Turn 23 (brief sha256 c718f22a…; ended early by the platform at `0f542851` — S421) — the perf lab scripts/perf/lab.ts and the published site's baseline; error-capture tags a stream render error `[ssr-error] render` (INC-894) and an aborted request one `[aborted]` warning (INC-893); `a5627d66`. Run 40211402692 SUCCESS. CLEAN.
- Turn 24 — speed S1 (sent three times: 1ddb9725… stopped on a raw `<button>` (S422, INC-899), b91bd394… on `map[key]` (S423), 82deddfc…) — per-page budgets over 50 pages, loadOnce, the on-demand-import census; `f3fc6f79`. Run 40217525625 SUCCESS. CLEAN; INC-895–INC-897 named with it.
- Turn 25 — speed S2 (2db9be03…) — the ad page signs its photo links in the server read; fetchpriority on the main photo; new category pictures WebP, cached a year; `6eb3576e`. Run 40220690758 SUCCESS. CLEAN; INC-900 filed.
- Turn 26 — speed S3 (d3cb555b…) — resilientLazy at every React.lazy site, the catalogue loaders on loadOnce, the admin crumbs moved; `a025b400` (S424). Run 40224308814 SUCCESS. CLEAN; INC-897 closed.
- Turn 27 — speed S4a (36eb852e…) — firstReadLinks: the head preloads the page's first reads; `7460ca06`. Run 40227242752 SUCCESS. CLEAN.
- Turn 28 — speed S5 (1e9c481b… stopped on `baseURL!` — S425; 94497124…) — the server reads the feed's first page into the stream (readFirstFeedPage, deriveInitialArea); `e50648f1`. Run 40231475359 SUCCESS. CLEAN.
- Turn 29 — speed S6 (ade421c8…) — the server draws the first cards (HeldFirstPage and its serialization adapter); `c9da2fd9`; AP-54 red in the executor's sandbox only (INC-904). Run 40234419925 SUCCESS. CLEAN; INC-901 fixed (FSP-7).
- Turn 30 — the strings layers (DEC-258; 928ff747… stopped on a raw `<button>` in a test — S426; a2cbf85e…) — `1990ac5d`. Run 40241386426 red on the deletion guard alone (INC-905, S427), every other job green. INC-902, INC-903, INC-906 filed; judged with turn 31's runs.
- Turn 31 — overlays on demand (DEC-259; 524bc10e… stopped on `MAY_REACH[key]` — S428; 9a45e7d9…) — `d0ba6c1b`: code CLEAN, five docs written from the executor's own summary (INC-907, DRIFT) → reconciled by script `2b8160c9`. Runs 40248221261 and 40248987616 SUCCESS. CLEAN.
- Turn 32 (Claude Code; the dialogs on demand — DEC-260; 6bae6b37…) — `c38e9535`, entry 260.0 → 254.1 KiB. Run 40255222082 SUCCESS. CLEAN; the reviewer's majors → INC-908 (S429).
- Turn 33 (Claude Code; the device's own fonts — DEC-262; ba0c65d1…) — `fe0ceeea`. Run 40259346793 red by TR-31 alone (the E2E colour reader — INC-910); the reviewer's MAJOR (no proof Ge'ez draws in an Ethiopic face) answered by the operator's iPhone walk; INC-909 filed. Closed with 32b's run.
- Turn 32b (Claude Code; INC-908; dbffb3ff…) — stop 1 `ba37841d` (the plant outside SCOPE — S431); ruling 1 as a brief (b449165e…; the plant moved; INC-910's one colour reader); `34641828`. Run 40265155741 SUCCESS. CLEAN; INC-911 filed. The operator Published `34641828` and walked the fonts (04:10Z 2026-10-26: Kefa, no boxes).
- Turn 34 (Claude Code; DEC-261; 9d59722d…, 123,096 B) — the door src/lib/supabase-door.ts (getSupabase on loadOnce, the stored-session reader, rpc's anonymous path). Stop 1 `3b680c1a` (the saved copy five bytes off — INC-912; ruling 1: it stands); stop 2 `b58aa884` (AP-54 on the door's code; the reviewer NOT READY, 2 BLOCKER) → INC-913, DEC-266, INC-914–INC-917, ruling 2; stop 3 `b5240baa` (SCOPE widened in prose — S432) → ruling 2 as a brief (762a86c4…): stop `b98e4346` (S433; DEC-267) → ruling 3 as a brief (25a9c183…): `e024c36e`. Run 40296745791 SUCCESS. CLOSED by DEC-261's rule (254.0 → 204.1 KiB entry; every sign-in/sign-up/callback/session test green; AP-54 holding). The reviewer's MAJORs: 1, 2 → 34c; 3 → 34b (INC-922); 4 → DEC-268 (S434).
- Turn K1 — the review gate (Lovable; aa5412ac…; base `e024c36e`) — land.ts refuses a final report without "Review: READY|NOT READY · n BLOCKER · n MAJOR · n MINOR · on <sha>"; the reviewer in the foreground; INC-889 (command position), INC-890 (GIT_HEAVY_MS). `91ca9f47` stopped on the reviewer's MAJOR, a regression (INC-920; S435); five rulings as briefs — `bb4a1ebb` (S436), `7e9206e6` (S437), r3 stopped on non-null assertions (S438) and rebuilt → `9a3f8713` (S439; its run red on settings S-1 → INC-923), `6c445a3e` (S440–S442; lane 7 infrastructure red), r5 `a8a7a207` (DEC-269 narrowed by DEC-270; the reviewer READY 0/0/0). Run 40326085964 SUCCESS. CLOSED by its rule; INC-920 fixed; INC-921 filed.
- Turn 34b-1 (6fd16375…) — DEC-268 (the door's forgetStoredSession; ASC-3/4/5, SBD-18/19, SO-11), INC-922 (only a page's first failed download reloads it), INC-923 (/settings on requireSignedIn); `c1b6b4e5` (S443). Run 40333117660 SUCCESS. CLOSED; Published by the operator and walked (INC-924, INC-925, D238).
- Turn 34b-2 (5a2c87dd… stopped on a bordered card — S444; 71236dd6…) — INC-911's mechanism (src/lib/on-demand-failure.ts, the shell's notice, LoadFailedHere, common.loadFailed) and its census ODC-1…3; `bc963938`. Run 40345497360 red: R-2, R-4 (an always-present role="status" — S446). CLEAN on its diff; the reviewer's census MAJORs to 34b-3.
- Turn 34w (bbf8f375…; S447) — INC-925 (one list of signed-in pages, SIGNED_IN_PAGES, read by the shell's guard), DEC-271, D238 (the phone menu's × removed), INC-924 (the peek's clock), the notice's role (ODN-2); `a8c025ef`. NOT READY (SO-12 — S448); run 40358294719 red by SO-12 ×3, SO-11 green. INC-926–INC-930 and DEC-272 followed.
- Turn 34b-3 (0679c983… stopped on `DEFINERS[definer]` — S449, S450; d080b9a6…) — the remaining on-demand consumers, INC-918, INC-919, INC-909, the census tightened; `f09ec2a9`. Run 40374691120 red by 34w's SO-12 alone. CLEAN (G10: 34w's red left standing one turn).
- Turn 34w-2 (8aba9586…) — DEC-272 (RRO-1), INC-926, INC-928, INC-929; `1346a1be`. Run 40382950832 SUCCESS. CLEAN; 34w closed.
- Turn 34b-4 (e9f342ec…) — the census's silent handlers (ODC-5); `eb95b9e4`. Run 40384938946 SUCCESS. CLEAN.
- Turn 34c-1 (6ef39fbc…) — the session read: a refresh the server refused is signed out, one that never reached it is "failed" (SBD-20, ASC-6); `0d8d4f28`. Run 40391189707 SUCCESS. CLEAN; its K2 → INC-933.
- Turn 34c-2 (d058f2b5…; first sent not byte-equal — S451; stop `cd3e00dd`; resent byte-equal) — the project's address and storage names read in one place, the door (register row 55; CF-PROJECT-1/2); INC-931 (DEC-273, ASC-7); `9eeb83cc`. Run 40397087967 red by infrastructure alone (lane 10's backend start; lane 16's "Install Chromium" hung 58 minutes — INC-935): 2,004 passed, 0 failed. CLEAN by run 40406394089.
- Turn 34c-3 (9495916b…) — the overlay facades number their asks (OVF-19/21/22), useStringsLayers answers its state only (PSL-3), the colour reader reads alpha (EC-6); `83badbba`. Its run 40400996498 CANCELLED while queued (INC-935); CLEAN by 40406394089. INC-934 filed (ODE-1's helper).
- Turn K2 (42a20c4c…) — the kit's 22 non-null assertions to zero; the census CF-NN-1/2 with a 143-line ratchet allowlist (INC-932); `6b3a461d`. Run 40403849904 CANCELLED while queued; CLEAN by 40406394089.
- Turn 34c-5 (e5000c6d…) — every browser session read through the door's currentSession() (INC-933; CF-SESSION-3/4; DEC-274); `a9f033a9`. Run 40406394089 SUCCESS (22:12:48Z). CLEAN.
- Turn 34d — built and simulated (INC-934's route guard e2e/helpers/route-guard.ts with CF-RG-1/2; the non-null census counts a definite-assignment mark; brief 3767d18b…, 40,209 B), NOT SENT: Lovable's workspace out of credits from 21:45Z (retried 22:1xZ and 22:3xZ, refused; the next try at 00:05Z, the likely credit reset — an ESTIMATE, not read).
- Turn 34e — built (DEC-275; INC-935's mechanism: scripts/ci/with-deadline.sh — a step deadline on the process group and one announced retry — through every install; timeout-minutes on every job but ci.yml's e2e-lanes and on the 19 steps that reach outside; each lane reserves the CLI's host ports 54320–54329 from the ephemeral range; CF-CID-1/2, red on BASE with 61 findings; WDL-1…4; register row 58; DEC-240's lint step gating again; the dry-run brief simulated 15/15 on the 34d dry base, re-cut on 34d's landing), NOT SENT. The order decided (G17): 34d → 34e → the records turns R1 (INC-847…INC-900) and R2 (INC-901…INC-936 with the later word, "next free INC-937" and the watch list), both simulated as dry runs and render-verified → block S77 and the slips → system-state.

THE WALKS (G31; on https://my-market-dawn.lovable.app after each Publish)
- 2026-10-23 22:29 local (bundle 22 turn 32): line 1 yes with a correction (D235); 2 yes with a new finding; 3 "as above"; 4 yes with a performance complaint; 5 no — INC-825 stayed open; from it D234 and INC-847.
- 2026-10-24 02:11 local (turns 32–33b): 1 yes (the inline links); 2 yes — the Amharic page's link opens the new tab in English (INC-851 → D237); 3 yes, with D236; 4 yes (INC-825); 5 My listings loads quickly — INC-847 not reproduced.
- 2026-10-24 09:15 local (Foundations turns 1–3, `9aaf7db3`): both lines pass (D236, D237).
- 2026-10-26 04:10Z (`34641828`, the device fonts, the operator's iPhone in Safari): Amharic draws in Kefa with no boxes; every screen sits as before (Android and Windows not walked).
- 2026-10-26 10:04 local (`c1b6b4e5`): "menue on left took few seconds to open" → INC-924; his video read most likely as the peek, the ☰ itself fast (a hypothesis); the seven-line walk at 11:07 local: the ☰ fast but its × jumps (D238); line 4 FAIL — a signed-out /settings landed on Home (INC-925); the offline sign-out showed Safari's "cannot open" page (DEC-271); the rest pass. Nothing landed after `c1b6b4e5` is published or walked.

THE SPEED WORK (D234; measurement first — G49): the baseline of turn 23 (Lighthouse mobileSlow4G, 360 px, the median of three cold loads): home TTFB 1,236 ms and LCP 3,260 ms (the footer — the feed was not on the first paint), the ad page's LCP 6,008 ms (a category PNG — INC-900), 510–894 KB a page with 340–395 KB of script and two render-blocking Google Fonts stylesheets; the research's targets: LCP ≤ 2.5 s at p75, ≤ 150 KB of compressed first-paint script for the feed, ad and seller pages, no web fonts. The first download (the entry closure, gzip) fell 302.2 → 289.9 (turn 24) → 287.3 (26) → 287.9 (28) → 280.2 (30, DEC-258) → 260.0 (31, DEC-259) → 254.1 (32, DEC-260) → 204.1 KiB (34, DEC-261); every page has a ratcheted ceiling. Saved to the Project: claude/speed-plan-2026-10-25.md, claude/supabase-off-first-paint-study-2026-10-25.md, claude/supabase-door-spec-v1.md and -v2.md, claude/category-pictures-convert-spec-v1.md (DEC-265), claude/card-photos-stable-links-study-v1.md (DEC-264), claude/edge-caching-study-v1.md (DEC-263). Not done: the speed study before turns 35–37 (the time to data-app-ready, DEC-266's REVISIT), turns 35–37 (the anonymous reference reads behind cached routes) and the items after 37 (roadmap :524–:526 at `a9f033a9`).

THE EXECUTORS: from 2026-10-24 07:1xZ the supervisor sends Lovable's briefs, rulings and "continue" through the Lovable connector (DEC-245), each brief inline with its sha256 and byte count and read back by list_messages; from 14:0xZ the same day it applies staging migrations through the Supabase connector (DEC-246). From 2026-10-25 the Claude Code executor (DEC-255) works from the kit (CLAUDE.md, .claude/rules, the hooks, land.ts the landing door, the reviewer subagent), each session started by the operator in the Claude app (DEC-255 item 7's deviation); the hybrid (DEC-257) gave Claude Code turns 19, 32, 33, 32b and 34 and Lovable the rest. Claude Code's cloud credit read $220 of $250 at 2026-10-25 14:19Z (turn 19 ≈ $26, measured). The Foundation fixes tracker (a Claude Doc) was updated after every verified turn — rev 106 at its last mention (22:2xZ).

THE OPERATOR'S WORDS (local time unless marked Z or ET, as the record gives them)
- 2026-10-23 07:59 — "ci is red" (turn 30's lint step) → the one known step. 22:29 (the turn-32 walk) — "clicking seller center initially says unable to load, error message with try again but after few seconds able to load" → INC-847; "loading takes few seconds, and that becomes an issue as performance is affected, and not instant, so we need to look the whole application to review" → D234; the inline link, "applies to any design from now on", "should have looked best implementation" → D235. 22:52 — "where is the brief? also as said earlier any fix, should not be a patch, should improve the way our system work, memorized as well whole system reviewed." (G0 restated).
- 2026-10-24 01:18 — a living progress document, "a visual guide for me, also helps us so we dont miss it" → the Foundation fixes tracker, updated after every verified turn; 05:12 — "i dont see the foundation fixes updated yet … if you can show the tick box in different color for the one ongoing work, likly orange color" → its status board. 02:11 (the walk) — "this page should only be accessible for someone about to publish, not open to public unlike terms and privacy" → D236; "yes is my answer. keep fevorite languages in all tabs same device" → D237. 02:19 — "Is it possible that lovable and claude could be connected …"; 02:56 the connector connected; 03:07 — "the purpose was for you to post prompt like the above to Lovable … are you not able to give that prompt directly to Lovable?" → DEC-245. 03:38 — "i see lovable is done but you seems to have stoped giving it a prompt … do you need ongoing check say every one minute and while lovable working you can prepare the next step ahead?" → S389. 10:03 — "make sure the task that we're doing right now is all gold standard and all prevents future problems, is all the best in its class, and the structure, the design, everything is best to make it lightweight, secure, performant, and very hard to break at this stage … That way we don't have to go back and redo anything … Continue working with Lovable." (the launch-readiness items — pen test, load test, monitoring, accessibility audit, legal review — deferred by him to their own time). 10:07 — "Use Supabase for this" → DEC-246. 19:13 — Lovable's commit title read as turn 9 → every update names the turn by its brief. 20:12 — "90 days" → DEC-247. 21:0x — "Keep Gemini (Recommended)" → DEC-248. 21:27 → DEC-251; 21:52 ET → DEC-252; the question cards → DEC-253, DEC-254 ("block signup using vpn"). Recorded 2026-10-25 01:12Z — "in any part of this development we dont want to have a permanet association with lovable or services provided by lovable … same with any other providers including supabase etc etc" → DEC-249; "I agree with your recomendations" → DEC-250.
- 2026-10-25 01:33 ET — "a gold standard executor … hold turn 19 until we setup claude code properly". 02:51 ET — "we will do exactly how lovable has been working and doing- no change in all steps compared to what lovable has been doing"; "Max 20 is ok"; "not planning to retire lovable agent, sometime i will work on lovable and sometime on claude code"; "you drive excutor" → DEC-255. 09:37Z — "Yes, start it" (the smoke turn). 07:38–07:42 ET — "i want you to work with excutor when i am away … Lovable will continue to work with you so you can send it prompts directly on times i may be away … other times I am around, we can continue with claude code"; "agree with your hybrid plan" → DEC-257. 08:19 ET — away: "follow by CI report and once done, proceed with posting turn 20". 09:19 ET — "lovable gives a quick response but you schedule your check for very long time and miss the lovable stopes sitting for long time" → S419. 10:03 and 10:42 — "Ci green", "CI GREEN". 10:19 — "$220 of $250 left". 10:51 — "CAN YOU UPDATE FOUNDATION FIXES TRACKER". 10:59 — "CONTINUE WORKING ON LOVABLE AS I AM AWAY FOR SOME TIME. COVER AS MUCH AREA AS POSSIBLE WITH BEST GOLD STANDARD WORK. … YES ITS ONE OF THE PRIORITIES WHEN I SAID LIGHTWEIGHT. I SHOULD BE THE FASTEST, LIGHWEIGHT AND WE SHOULD DO EVERYTHING TO MAKE IT THAT WAY. WHAT GOOD DOES IT DO WE BUILD THE SITE BUT USERS CANT USE BECAUSE ITS SLOW? VERY IMPORTANT" → D234 a top priority; the speed study.
- 2026-10-26 00:22Z — "the best and gold standard recommendation that will improve performance without affecting how it functions"; 00:24Z — "all as recommended" → DEC-261–DEC-265 (DEC-258–DEC-260 stand). 01:23–01:26Z — the Sage 3D redesign: "i dont want that work to start now, but i want to make that consideration"; "if there are foundational changes of that that need to be done now, we can add, but i want to make our work focused so we dont end up being all over the place. I want to finish foundation work, then updating the design before stage 2."; "continue planning and designing next steps/turns in detail on the background". 00:12 — "I thought its reviewer report are good. can you instruct it to wait for reviewer report each time, may be in its rule block so it does get independent reviewer report?" → K1. 01:19 — "last turn had red in ci lane 5. please review and prepare for the next prompt in detail, also make sure all previously noted issues addressed step by step". 02:40Z — "I kept telling you even if pushed, it will be queued, not cancel earlier ci run" → S430. 03:01 — "please prepare for the next turn while code is finishing work"; 04:30 — "please prepare the next turn while the above fix is being completed by code". 04:17 — which "incorrect" sign-in behaviours exist → a sign-up with a taken e-mail queued for the scenario suite. 05:39 — "ci is green, please give me the next prompt". 07:50 — "are we done with speed update" → not done. 07:53 — "please work directly with lovable from now on, read its update frequently and respond directly. I will be away from computer" (bound by DEC-245 and DEC-256). 10:04 — "On small iPhone screen it looks like some items very slow to open. I noticed menue on left took few seconds to open. A real defect. Not sure what else. Tell me the exact walk steps" → INC-924. 11:07 — "I don't think we need it in small screens and can remove" → D238. 11:17 — "YES" → DEC-271. 11:46 — "WHY IS IT TAKING SO LONG AND WHY DID WE NOT DO THIS INBETWEEN WHILE LOVABLE IS WORKING … Its been almost 30 mins with lovable not doing anything" → S447. 12:52 — "What is the reason k 1 took so many turns? I'm questioning if it's worth having Claude code do stuff" → answered (keep the hybrid; no decision taken). 15:44 — "Why are there very few turns since earlier today?" → answered: the next brief built before the current lands, local browser runs at G37's minimum, fewer and bigger turns (ESTIMATE 1.5–2 turns an hour).

DECISIONS — THE OPERATOR'S (D) AND THE DEC ENTRIES
- D234 (the operator, standing; his turn-32 walk, 2026-10-23 22:29 local) — a whole-application performance review: measurement first (G49), then the plan; saved to project memory; raised to a top priority 2026-10-25 10:59 local → the perf lab (turn 23), the speed study and speed turns 24–34.
- D235 (the operator, standing — "applies to any design from now on"; the same walk) — a document named in a sentence is itself the link, inline ("I am 18 or older. I have read and agree to the Terms of Service and the Privacy Policy." with both names linked; "I certify the publishing statement." with the statement linked), never a separate line or list of links; every design starts from the best known implementation of its pattern. Saved to project memory. Built in bundle 22 turn 33 (translator-placed tokens `[text](role)`, seven new keys, the old keys retired); walked yes 2026-10-24.
- D236 (the operator, 2026-10-24 02:11 local, the walk) — /legal/publishing is not a public page, only for someone about to publish; it reverses DEC-236's "a public page like the Terms" for the statement alone. Read under G17 (overridable) as "signed in". Built in Foundations turn 1 (requireSignedIn; M24); walked 09:15 local.
- D237 (the operator, 2026-10-24 02:11 local; INC-851's question under G49) — option (b): the language picked in the menu becomes the device's favourite and the account's, every tab follows, the ★ folds into the pick (a menuitemradio — G17). Built in Foundations turn 1; walked 09:15 local. Consequence: a test that picks a language while signed in on a shared account restores it before it ends (a harness-doc rule owed).
- D238 (the operator, 2026-10-26 11:07 local, the walk) — the phone menu has no ×; ☰ and a tap outside close it (bundle 21 turn 3's × retired). Built in turn 34w.
- DEC-243 (the supervisor, 2026-10-24 04:3xZ; G42 and DEC-126 — a package change in its own turn, the rule frozen before its run) — zod ^3.24.2 → ^4.6.6 (the direct dependency unused in src) with the override "zod": "^4.6.6" for the router's copies, and the undici override ^8.10.2 → ^8.12.2, answering two new high advisories (GHSA-mrhx-c7xc-m3w5, GHSA-xjj6-f33q-929c). Rule: keep on green; revert when a failure names zod, the router generator, the start plugin, jsdom or the build. Run 40065701217 SUCCESS — KEEP.
- DEC-244 (the supervisor, 2026-10-24 06:4xZ; G17, overridable by the paste) — the conformance kit is the one walker, allowlist reader and reporter of every census guard; enumerators that are not guards stand outside it, each named in kit-adoption-allowlist.txt `until DEC-244`; `until` takes a date (expires), an INC (retired with it) or a DEC (standing).
- DEC-245 (the operator, 2026-10-24 03:07 local) — the supervisor sends Lovable's prompts itself through the Lovable connector. The restrictions he accepted: query_database never; send_message only what he would paste — a brief, a ruling, "continue" — one per Lovable turn, never while it works (G32); a "Modify Supabase database" pause answered only on his yes; Publish stays his; Knowledge and AGENTS.md only through an approved brief; a reserved decision by his explicit "go". Saved to project memory. His 2026-10-26 07:53 local "please work directly with lovable from now on" works inside these rules (no migration brief while he is away).
- DEC-246 (the operator, 2026-10-24 10:07 local: "Use Supabase for this") — the supervisor applies migrations to ethio-staging through the Supabase connector. The connector reaches the whole organisation, so the supervisor is bound: every write names ethio-staging's project, re-checked by name the same turn; ethio-prod read-only (mark read-backs, advisors) — production migrations stay with the executor's tool and his approval; only a migration file on dev, sha-checked against the repository blob, applied whole, then the specific mark read back (G39); no hand-written statement on staging data (INC-405); no project, branch, edge-function or secret operations; every apply recorded. A separate organisation for staging was offered and not chosen. First use: turn 13's migration (the function's md5 equal on both projects); turn 15's apply returned "cancelled" and he applied it himself.
- DEC-247 (the operator, 2026-10-24 20:12 local: "90 days") — ai_calls rows kept 90 days, purged daily with a heartbeat (cron ai-calls-prune 17 4 * * * UTC); in turn 15.
- DEC-248 (the operator, 2026-10-24 21:0x local, "Keep Gemini (Recommended)", at turn 15's second stop) — the project keeps its own provider (Google Gemini on its own key with the D158 meter); no Lovable AI Gateway package; ai-gateway.md says the module is distinct from Lovable's SDK.
- DEC-249 (the operator's standing directive, recorded 2026-10-25 01:12Z) — no permanent association with Lovable or its services, nor with any provider, Supabase included: the project can move to its own providers. Applied: every brief's future-growth lens names the vendor seam; no Lovable-hosted service adopted; a register row for vendor seams. INC-420's update: CI installs from Lovable's package cache (the lockfile's addresses) — DEC-249 debt, its own package turn.
- DEC-250 (the operator, "I agree with your recomendations", recorded 2026-10-25 01:23Z) — the full vendor-seams refactor deferred; a freeze guard now (today's direct users allowlisted as they stand, every new file through a seam, an exit note per Lovable package). Built in turn 16 (71 allowances — INC-877; VS-1…3).
- DEC-251 (the operator, 2026-10-24 21:27 local) — the country-home guard and a gold-standard study of the whole data-residency design (web research and a code census, delivered as the Claude Doc "Data residency — gold-standard review"; the census found INC-878).
- DEC-252 (the operator, 2026-10-24 21:52 ET) — residency generic per country (a region registry, Ethiopia its first row, no country literal in code); the residency country observed by the server from the IP at sign-up and shown with its basis; the declared home country a preference that never moves data; a change only on evidence over 30 days or a recorded staff decision, through the move operation. ESTIMATE six turns (5–8).
- DEC-253 (the operator, question card, recorded 2026-10-25 02:00Z) — a conversation with any Ethiopian party is stored in Ethiopia, otherwise in the seller's region, the other party told; supersedes REQ-033.4's seller-partition rule.
- DEC-254 (the operator, question card on his "block signup using vpn", recorded 02:00Z) — sign-up allowed through a VPN, but the residency country never read through one ("not yet confirmed" until a visit without it; posting and messaging wait); detection behind one networkRisk seam. Open: which edge and plan production runs.
- DEC-255 (the operator, 2026-10-25 02:51 ET, the plan's seven decisions; "we will do exactly how lovable has been working and doing") — the Claude Code executor: (1) Claude Max 20x; Lovable kept at its smallest tier for preview, Publish and hosting; (2) no merge step — the executor lands on dev through land.ts (scope, deletions, flags, report, lint → typecheck → unit → i18n maps → build → migration guard → format, then a fast-forward push; a moved dev parks the commits on hold/<brief>); (3) rulesets — dev: no force push, no deletion; main: no deletion; no PR requirement; (4) migrations as with Lovable: the executor applies on ethio-prod through the supabase-prod tool on his Allow, staging first by the supervisor; (5) the executor's web access off and a custom network list (the supervisor's call, G17); (6) every turn reviewed by fresh clone, the reviewer subagent inside the executor; (7) the supervisor drives the sessions — deviation (G10, 2026-10-25 09:40Z): the workspace cannot start a cloud session, so he starts each in the Claude app and pastes the carrier (S417).
- DEC-256 (the supervisor's rule for the Claude Code channel, 2026-10-25 07:05Z; in force, not yet installed — G46) — one message per executor turn, never while it works; only a brief, a numbered ruling, "continue" or an apply on ethio-prod after the staging read-back and his yes; the supervisor never answers the executor's permission prompts; a session only for a brief he approved, ended when the brief closes.
- DEC-257 (the operator, 2026-10-25 07:38–07:42 ET, "agree with your hybrid plan") — Claude Code when he is present (he starts and relays), Lovable through the connector when he is away; never both at once (a turn finishes on the executor that started it); one brief in two forms; dev read before Lovable takes a turn; Lovable's database approvals stay his; a Claude Code stop with a question waits for him unless its remainder is re-issued as a new brief with no reserved decision (G17). Pre-committed judge (07:39 ET): over three turns on each executor — executor-caused CI reds, stops of its own error, report claims that did not hold, supervisor rework, cost a turn — the better becomes the default; the verdict is not in the record (2026-10-26 12:52 local: answered, no decision taken).
- DEC-258 (the supervisor, 2026-10-25 22:1xZ; G17 inside D234; covered by "all as recommended") — the strings layers: DEC-231's admin layer becomes named layers (admin, member); a route declares the layers its screens show; one gate (StringsLayerGate) draws a declaring route once its layers are in; the census scripts/conformance/strings-layers.ts replaces admin-layer.test.ts. Entry 287.9 → 280.2 KiB; three admin pages heavier (INC-902). Built in turn 30.
- DEC-259 (the supervisor, 2026-10-25 23:34Z; G17, listed) — the tooltip and the dropdown menu as facades over the Radix code fetched on the first intent or at idle (overlay-loader.ts, loadOnce), the real root drawn beside the trigger and the intent replayed on the consumer's own element; chosen over a remounting facade and an in-house tooltip. Entry 280.2 → 260.0 KiB. Built in turn 31.
- DEC-260 (the supervisor, proposed 2026-10-26 00:10Z; stands under "all as recommended") — the dialog, sheet and alert dialog join the facades (ModalRoot / ModalTrigger / ModalPart, drawn around the children at the first opening). Built by Claude Code in turn 32 (260.0 → 254.1 KiB); its failure path for controlled roots: INC-908, turn 32b.
- DEC-261 (the operator, Tier A, 2026-10-26 00:24Z: "all as recommended") — the Supabase client leaves every page's first download, the study adopted as written: one door getSupabase() on loadOnce, a stored-session reader for the first render, the language bundles behind defineRoute, signed-in calls awaiting the door, MUST_STAY_LAZY and a census guard; no change to sign-in, sign-up, sign-out, the callback or refresh. Frozen rule: adopt the whole when the entry closure drops by ≥ 45 KiB, every sign-in/sign-up/callback/session test is green in CI and AP-54 holds. Built by Claude Code in turn 34; met on `e024c36e` (254.0 → 204.1 KiB).
- DEC-262 (the operator, the same answer) — the device's own font stack for every script; the two render-blocking Google Fonts stylesheets removed; Amharic in the phone's Ethiopic face; its own turn (G42's class). Built by Claude Code in turn 33; walked on his iPhone.
- DEC-263 (the same answer) — signed-out public pages cached at the edge at the DNS cutover (stale-while-revalidate, a short shared max-age, a purge on every staff publish, only answers with no account data and no cookie, the key carrying the language). Spec owed before the cutover (study v1: a zone Worker with its own key).
- DEC-264 (the same answer; D151 amended; Tier A) — card-size copies of a live ad's photos at stable public addresses, cached for good; originals, drafts and every ad not live stay private; the copies deleted and purged the moment the ad leaves live. Spec owed (study v1: a public R2 origin at the cutover, an outbox from the state machine's doors).
- DEC-265 (the same answer) — INC-900: the 171 stored category PNGs re-cut to WebP at card size by a one-time staff action (Admin › Images), the same pictures, cached for good under new names. Spec v1: a new door admin_convert_category_pictures; a migration turn. The order by gain per visitor: turn 32 → 33 → DEC-261's turns → DEC-265 → DEC-264 → DEC-263 at the cutover.
- DEC-266 (the supervisor, 2026-10-26 05:5xZ; G17, in turn 34's ruling 2) — the browser hydrates once the server's first screen is placed (src/client.tsx waits through whenFirstScreenPlaced() in src/lib/hydrate-when-placed.ts, a 1.5-s deadline then a [client-error] line; HWP-1…6). Frozen judge: KEEP when over the next 10 completed CI runs after turn 34's final landing AP-54 and SBE-3 never fail and no INC-913-shaped duplicate enters the flake ledger, else REVISIT (the first page inline — a speed study). Ruling 3 corrected the cost (the shell inert up to ~2.3 s on a slow listings page); the speed study carries the REVISIT measure (> 300 ms median time to data-app-ready).
- DEC-267 (the supervisor, 2026-10-26 08:2xZ; G17, in ruling 3) — the two sign-outs discard their answers on purpose; allowlisted in auth-answers-allowlist.txt; the reset and callback screens' reading of a failed download to turn 34c. Narrowed by DEC-268.
- DEC-268 (the supervisor, 2026-10-26 09:3xZ; G17, listed in 34b-1's brief; a Tier A security design) — a sign-out ends the session on this device whatever the server answers: the door's forgetStoredSession() clears the stored session when the client's sign-out reports an error or the client did not load, and the shell's hard reset loads "/" afresh on a failure (read in auth-js 2.110.9's own sign-out). Proofs ASC-3, SBD-18/19, SO-11, red first. Landed in 34b-1 (`c1b6b4e5`), live from the operator's Publish of that commit; DEC-267's shell allowance retired.
- DEC-269 (the supervisor, 2026-10-26 11:4xZ; G17, in K1's ruling 3) — the kit's scheduling rule refuses when either reader finds a scheduler: programsOf, or the pre-K1 word pattern over blankInertData (only provably inert data blanked) — "a hand-written shell reader as the ONLY reader is a whack-a-mole; four rounds prove it". Narrowed by DEC-270.
- DEC-270 (the supervisor, 2026-10-26 12:3xZ; G17, in K1's ruling 5) — data is inert only where its consumer never runs it: the text rule blanks data only when every program of the command is in a DATA_ONLY set; one heredoc-delimiter reading (POSIX quote removal, measured against bash); a program named by a substitution, a variable or a glob refused as unreadable. K1 closed; INC-920 fixed.
- DEC-271 (the operator, 2026-10-26 11:17 local: "YES"; Tier A, his call under G17) — a sign-out the server could not confirm while the device is offline keeps the app on screen, signed out for good, and loads "/" afresh when the connection returns; online, DEC-268's fresh load stands. Built in 34w, closed in 34w-2; known limit INC-930.
- DEC-272 (the supervisor, 2026-10-26 16:5xZ; G17, technical) — the root's facts are read once per page load (`shouldReload: false`; only the error view's Try again reads them again); guard RRO-1; built in 34w-2.
- DEC-273 (the supervisor, 2026-10-26 19:4xZ; G17, in 34c-2's brief) — the sign-in and reset screens' mount read drops an expired session only on a refresh the server refused; one that never reached it keeps it and answers "unavailable" (INC-931; ASC-7). Built in 34c-2.
- DEC-274 (the supervisor, 2026-10-26 20:5xZ; G17, in 34c-5's brief) — the password proof (auth-service's currentPasswordProof) keeps `auth.getUser()` — the server's own answer of the account's e-mail, which an e-mail confirmed on another device has not yet put in this device's session — the one read around the door that CF-SESSION-3 allows (its allowlist line). Built in 34c-5.
- DEC-275 (the supervisor, 2026-10-26 22:4xZ; G17, overridable; G22's named decision for the CI workflow graph; drafted in turn 34e's brief, not yet sent) — INC-935's mechanism: every install through scripts/ci/with-deadline.sh (a step deadline, one retry announced as a ::warning, the last try's exit code the step's); timeout-minutes on every job (but ci.yml's e2e-lanes, a reusable-workflow caller) and on every step that reaches outside; each lane's first step reserves ports 54320–54329 from the ephemeral range; a failed start appends the port holders to its log; the guard CF-CID-1/2; and DEC-240's lint step gates again (its `continue-on-error` removed — INC-846 fixed on `53aa4e76`, the step `success` on every run read since). Frozen judge (in the brief): KEEP when, over the next 20 completed CI runs on dev, no lane fails its start by a port "already in use" and no step outruns its deadline unseen; a step that needs its retry in 3 or more of those runs is an incident (the retry hides a cause); otherwise REVISIT (the backend's ports moved below 32768 in the lanes' working config instead of reserved).

THE SUPERVISOR'S RULINGS (G17; each listed to the operator as overridable — his paste, or his "all as recommended", approved them)
- Bundle 22 turn 32: INC-823's registered fix replaced by the landing helper (G10, written into legal.md); one agree message for every tick, the three actions drawn closed, never disabled; M21's trigger warns on malformed metadata and never refuses a sign-up; the links under the sentence (reversed by D235 — S383); ruling 3: one sign-up form helper; the wizard's Next disabled in the error state too.
- Bundle 22 turn 33: the AGENTS.md exception granted (the file whole); M22 and M23 (the doors answer the languages and the missing ones); the draft editor keeps its reader (INC-850); the first-paint ceiling to 306 only after the split.
- Foundations turn 1: "about to publish" read as "signed in"; the acceptance screen's visitor sent to /auth with the way back; the ★ folded into the pick; DEC-244; GW-3's local skip accepted, CI to show it passing; LGC-6's 401 with the 42501 body the observed contract.
- The route boundary (turns 2–14): a loader's page-only reader imported on demand; badShape a verdict at 200 for the posting contract, clientError 400 for readers; share and view `auth: "optional"` (VW-3 rewritten); expected refusals never logged as server errors (doorCall translates first — INC-368); a reader's database error 503/500, 502 retired; public GET queries non-strict (the recorded exception); the conditional dials left in their handlers until the door turn (recorded bypasses); the departures of each turn ruled one by one.
- The executors: a ruling cannot widen a saved brief's SCOPE — a ruling that adds a file is a brief (land.ts reads SCOPE from the brief in force; S432); turn 19's R1–R5 (`gate: true`; a first-chunk network failure answers 200 with that chunk's keys providerUnavailable); undeclared throws answer the route boundary's 500 with an incident; `?target=en` the recorded K4 exception; turn 21's success lines at info, not suppressed; turn 22's prefill lower-cases an upper-case id.
- The speed and session decisions DEC-258–DEC-260, DEC-266–DEC-270 and DEC-272–DEC-274 (the supervisor's); turn 34b split into 34b-1/2/3 (the connector's 100,000-character message and the order G0.10 sets); INC-924's fix after the operator's timings, the overlay warm-up change dropped for want of a measured cause (G3).
- The reviewer's findings: turn 34's MAJORs 1–2 to 34c, 3 to 34b (INC-922), 4 to DEC-268; 34b-2's census MAJORs to 34b-3 and 34b-3's to 34b-4; K1 closed by its rule at ruling 5, later kit findings listed for a kit turn; turn 34c-1's review question answered with no change (the two "Try again" controls refetch a query, not a download — INC-918's rule does not apply).

INCIDENTS — INC-847 … INC-936 are in docs/tracking/incidental-findings.md (the records turns' import), each as registered, with one later-word paragraph, the numbering line and the watch list (the flake ledger read whole at 2026-10-26 22:14Z: no test at three matrix-lane lines in seven days without an INC). Closures written there by §11's rule (the fix verified on dev and judged by a green run): FIXED INC-852, INC-856, INC-860, INC-864–INC-867, INC-873, INC-876, INC-879, INC-880, INC-882–INC-884, INC-889 (with INC-920), INC-894–INC-896, INC-901, INC-904, INC-905, INC-907–INC-911, INC-914–INC-919, INC-922–INC-929, INC-931, INC-933; not closed INC-855, INC-890, INC-913, INC-921, INC-930, INC-932, INC-934, INC-935 — the others keep their own status (instrumented, owed, watched). INC-876 is defined only in a numbering line, INC-877 never defined, INC-895, INC-896 and INC-898 named in passing — each written as such; INC-872 and INC-827 name one flaky test (to be joined). INC-935 widened at 22:2xZ: the four lane backend-start failures of 10-24 → 10-26 (lanes 16, 8, 7, 10) have one cause — the CLI's fixed host ports sit inside Linux's ephemeral range — and no job in the workflows carried timeout-minutes (turn 34e, DEC-275). INC-936 (22:4xZ): the nightly has been red every night since 2026-10-19 and its evidence went unread (S452). The later word on earlier numbers: INC-809 reclassified to a test defect (S379) and FIXED-WATCH after awaitDraftSaved (the later ledger reads label it two ways); INC-822, INC-823 (its fix replaced by the landing helper), INC-825 and INC-846 (fixed on `53aa4e76`) fixed; INC-845 fixed by turn 31; INC-840–INC-842 closed by the mechanisms; INC-420 — CI installs from Lovable's package cache (DEC-249 debt).

SLIPS — S379 … S452 (the supervisor's, with the guardrail each names) are in docs/governance/instructions-amendments.md §Slips (this block's import). The classes that recurred: a brief against the executor's own rules (S384, S409, S422, S423, S425, S426, S428, S438, S444, S449 — each now a check-brief.py rule); an expectation written, not executed (S390, S393, S403, S404, S412, S424, S434, S435, S443); a census narrower than its concern (S382, S387, S392, S413, S420, S433, S445, S446); a schema from one caller (S398, S399); an idle executor (S389, S419, S421, S447, S450); a deletion without its manifest line (S395, S414, S427); the stale CI rule (S406, S430); the nightly left unread for a week (S452); K1's shell-reader rounds (S436, S437, S439–S442); exact text retyped (S451).

EXECUTOR DRIFT (G30), logged
- Platform commit titles naming nothing of the turn or claiming what did not happen: "Fixed draft save class for M21" and "Continued legal E2/strings" (empty diffs, bundle 22 turn 32), "Applied M22 to production" (with an unasked roadmap working line, absorbed), "Completed turn 11 & 12" (turn 11 only), "Solved timeo w/ timeout arg" (24 — no timeout argument added), "Repaired AP-54 ad page test" (29 — no repair), the title Fixed "key" typo in brief (30 — the brief byte-exact), "Fixed quotes in substitution", "Added R3 non-null assertions" (nothing added), "Fixed heredoc refusal bugs" (a stop landing), "Validated audit hashes" (K1), "Verified build hashes match" (34b-1), "Fixed review findings" (34b-2 — its report says they were left); "Fixed look-law test timeout" (turn 5, look-law unchanged) noted, not counted. Many are no-op merges over the executor's last "Changes" commit.
- Records: roadmap line 3 still named turn 31's brief after bundle 22 turn 32 (folded into turn 33); turn 30's changelog entry a heading with bullets (put back by turn 31); turn 31's five docs written from the executor's own summary and checked against remembered hashes, its report claiming an AGENTS.md mismatch against a value the brief never held, the completion report unwritten (INC-907 — reconciled by script).
- Exact text not kept: the stand-in cut-out's base64 retyped (turn 17 — INC-879); the platform's writer split one line of turn 20's saved brief and dropped turn 22's final newline; turn 34's saved copy five bytes off (INC-912) — each caught by the STEP 0 hash.
- Outside scope or a platform rule, disclosed: types.ts regenerated by the tool (turn 1); `bunx tsgo` against the platform rule (turn 14 — accepted, then withdrawn, S409); STEP 0's roadmap edits by scratchpad scripts after the guard refused two commands (Claude Code turn 19 — INC-889); rulings 1–2's non-null assertions applied without flagging (K1); a formatter's escape in 34c-2's roadmap line (reported). Turn 2's first turn left A1 undone; turn 15's two stops overstated the AI Gateway SDK rule's scope (the executor said so).
- Honest conduct accepted: LGC-6 left red and named (turn 1); an AGENTS.md byte count not forced to the supervisor's miscount (turn 1); AP-54's sandbox red named without a weakened assertion (turn 29); 34w ended NOT READY with nothing changed past the hashes; every report's departures and K2 list. The executor's sandbox limits, recorded and not drift: timeouts under a full run (EXH-4/11/12/17/19/21, LL-1, AAN-1, CF-SL-1/3/6 — INC-890, INC-921), AP-54's separate server-HTML request (INC-904), the 600-s command ceiling, the git shim, no typecheck by hand.

RULES IN FORCE, ADOPTED IN THIS BLOCK (each dated by its slip or the operator's word; not yet in the instructions — the next version's debt, G46)
- The operator's: the Foundation fixes tracker updated after every verified turn (2026-10-24 01:18 local); every Foundations brief checked against every consumer by definition, its guard in the same landing, every CHANGE line with its pinning tests, every schema from the caller census, the five lenses true of the order as written, no recorded bypass without a dated plan to retire it (10:03 local); every brief's future-growth lens names the vendor seam (DEC-249); Foundations (the speed turns included), then the Sage redesign and the rail, then Stage 2 (2026-10-26 01:26Z); the executor waits for its independent reviewer (K1).
- The channels: DEC-245, DEC-246, DEC-256, DEC-257; after every send to Lovable a poll at about 2–3 minutes and then at least every 10 minutes until the turn ends, reading the message, never the branch head (S389, S419, S421, S450); after agentFinished an edit must exist before a report is trusted (INC-870); the next brief built before the current lands and sent within minutes of the landing, a red's fix folded in first, new work built beside the running turn (S447; 2026-10-26 15:44 local); fewer, bigger turns, local browser runs at G37's minimum; every update names the turn by its brief, never by Lovable's titles; every brief carried with its sha256, byte count and final newline and read back byte-equal (S451); THE CHECKS run `sha256sum -c` from the saved brief, re-read after a compaction (INC-907); a ruling that changes SCOPE is a brief, tried with the kit's scopeVerdict (S432); a capability promised to the operator tested first or called untested (S417).
- Brief content: the prototype's whole diff read line by line against AGENTS.md and every platform rule the executor has quoted — check-brief.py's raw-button (tests included), non-null-assertion, own-key (a hit), card-border, agents-line-missing, deletion-without-manifest (the imperative too) and new-test-ids-free; every schema a brief spells compiled first (S404) and derived from every caller in src/** and e2e/** (S398, S399); a CHANGE line names its pinning tests (S400) and quotes the lines it relies on (S401, S403); an anchor naming a line's role read ±5 lines (S405); every "expected" line produced by running the command (S424); a browser red-first line names the test ids it reads (S434); a new shared helper names its chunk, and the performance lens says for every touched file whether it is in the first-paint closure — a loader's page-only reader imported on demand (S386, S391); the ORDER checked against the five lenses (S394); a failure-mode lens enumerates the consumer kinds with a failure test each (S429); a contract change carries the census of its callers and of every test that drives the form or queries the role, e2e/nightly included (S382, S387, S392, S433, S446); a census greps the literal, not its local name (S420, S445); a planted proof sits in a SCOPE file (S431); an offline-path change reads every loader the navigation runs (S448); a brief is composed from a settled design (S380).
- Tests and evidence: a CI number is a cause only after two runs agree or the names are read (S381); a moved binary fixture copied by script and pinned by its decoded sha256 (INC-879); a unit test sets every environment variable it relies on (INC-880); a test that picks a language signed in on a shared account restores it (D237); an always-drawn live region carries aria-live and no role (INC-929); null→throw lists every caller and each lands its catch (S387); record appends through the Write tool (S402).
- CI and records: runs queue and a push never cancels the running run (DEC-181; S406, S430) — G36's and §8's "a push cancels the run in flight" are stale until v1.15; every CI read includes nightly-status.md's date and conclusion, and a red or a date older than a day is read the same turn (S452); a record imported under Prettier's Markdown glob (docs/tracking/, docs/features/) is escaped outside code spans (`_x_` and `$`), formatted by the pinned Prettier 3.8.3 and render-checked; docs/spec/ and docs/governance/ are outside Prettier and land verbatim (2026-10-26 22:2xZ–22:4xZ).

OPERATOR STEPS OWED (at the record's end, 2026-10-26 22:5xZ)
1. Lovable: the workspace has been out of credits since 21:45Z (three sends refused, the last 22:3xZ); turn 34d (built, simulated on `a9f033a9`) goes out at the first send that succeeds, then turn 34e (DEC-275). Spend is his (G17, G52).
2. Publish `a9f033a9` (the last Publish `c1b6b4e5`, 14:0xZ), then one walk of what changed since — the on-demand failure notice (34b-2/34b-3), the phone menu without its × (D238), a signed-out /settings sent to sign in (INC-925), the offline sign-out (DEC-271), the peek (INC-924), the session read (34c-1 → 34c-5); the walk's lines are not yet written in the record.
3. INC-930: (a) stay on the page offline, signed out, or (b) fetch the marketplace's code ahead for a signed-in visitor (measured: at most 13.5 KiB gz) — the supervisor recommends (b).
4. Claude Code: SUPABASE_PROD_MIGRATE_TOKEN before its first migration turn (deferred 2026-10-25); its cloud credit expires 2026-11-04 23:59 PT; DEC-257's comparison — no decision taken.
5. Before Stage 2: the Sage 3D look-and-feel change and the left rail's new behaviour (his design files of 2026-10-25; the display face decided then — a DEC owed); the UI-redesign reminder stands.
6. Carried from block S76, not confirmed in this block's record: the Privacy Policy v2 and publishing statement v2 import; the Afaan Oromo texts' import; the real legal phone number and the copyright agent's details (the reminders of 2026-10-29); the DMCA registration; the MAU figure weekly until 31 Oct (INC-782; the grace period ends 31 Oct 2026); GitHub → Insights → Traffic (G51); the PROMOTE_TOKEN renewal before 2027-01-18; code scanning #419's dismissal; a native speaker's read of the Amharic and Afaan Oromo legal texts before launch. No other Amharic read is owed by him in this block's record (new strings were built by script from the app's own words and checked against the catalogue).

JUDGES OPEN AT THE CLOSE OF THIS BLOCK: DEC-266's ten-run judge after `e024c36e` — read at 22:4xZ: the first ten completed runs (40304914912 … 40345497360) and every completed run since name AP-54 and SBE-3 in no failure or flaky line, and no INC-913-shaped duplicate entered the flake ledger after 04:00Z — KEEP by its CI half; its timing half (REVISIT when the wait adds > 300 ms at the median on "/" or a category page) rides the speed study before turns 35–37; INC-913 stays open for it. DEC-261's frozen rule held at turn 34's close (closed). DEC-257's three-turn comparison — the verdict not in the record. DEC-240's lint step gates again after the second consecutive match since INC-846's fix; its `continue-on-error: true` still stands at `a9f033a9` (local-backend-proof.yml :480, read in the clone) — turn 34e removes it (the step `success` on runs 40391189707, 40392505916 and 40406394089). INC-809 FIXED-WATCH (seven days without a retried PW-153 line from 2026-10-23); INC-872 fixed — closes after a Flake check or a clean ledger week; SO-12 and PW-54 at two lines each — a third is an INC; INC-906 (ML-4, MLA-6, CO-4) watched; DEC-234's reopen rule. INC-847 instrumented; INC-930 the operator's choice; INC-935 → turn 34e (DEC-275, built, unsent); INC-936 — the bodies of AP-41 (three nights running) and LG-21 read whole and each class dispositioned in a ruling, and the nightly's length (280–358 minutes against GitHub's 360) and its heartbeat on a cancelled run sized in a spec; DEC-263 and DEC-264 specs owed (the cutover), DEC-265 a migration turn; DEC-252–DEC-254's residency waves (ESTIMATE six turns) not begun; the Foundations bundle's ESTIMATE of 28–38 executor turns (DEC-237) — the measured count is not stated in the record. Next: turn 34d, turn 34e, the records turns R1 and R2, then block S77, the slips and system-state; then 34c-4 (the E2E side of the storage name), the speed study, turns 35–37 and the items after 37 (roadmap :521–:526), then the remaining mechanisms of DEC-237's order (the form kit, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals), the sign-in/sign-up scenario suite (its old "turn 34" line to renumber), bundle 23 and Stage 1's last part.

RECORDS OWED (the running record's list for this and the next records turn; R1 and R2 — the INC import — built as dry runs; the INC import escaped outside code spans for Prettier, as above): roadmap lines for INC-878, INC-885–INC-889, INC-898, INC-899, INC-902, INC-903, INC-843, INC-837 and INC-786/INC-821; the two register rows numbered 13 (G41); the old roadmap line "Turn 34 — the sign-in and sign-up test suite" renumbered; G36 and §8's "a push cancels" corrected (v1.15); "Lovable poll" and DEC-256 installed as G-rules (G46); the harness doc's shared-account language rule; CF-LINT-1/2's non-empty floor; INC-910's docs line; the `null as unknown as string` reads in category-images-service and the asset service (an INC); turn 33's minors (a "CF-FT allowlist" named before it exists; the census missing the `font:` shorthand); the guard debts of INC-907, INC-921 and INC-929; check-brief's planted-proof-outside-SCOPE rule (S431).

CURATOR STATE AT THE CLOSE OF THIS BLOCK: no curator message or delivery is recorded in this block; the state stands as block S76 left it; bundle 23 (D222's business-name rule) and Stage 1's last part (the banned-items and safety pages) follow the Foundations bundle (DEC-237).

AFTER 22:5xZ (2026-10-26 22:5xZ → 2026-10-27 11:55Z, the cut of records turn R3; times Z unless marked local)
- 23:19Z (19:19 local) — the operator: "I will start working in Claude code. Please give me the code for Claude code instead of lovable". Lovable's workspace stays out of credits; every turn since runs in the Claude Code executor (DEC-257), each session started by the operator. Turn 34d was re-cut in the kit's form (brief 7e8de655…, 41,782 B) and handed over; turn 34e stays Lovable's — it edits .github/workflows/**, which the kit's NEVER_EDIT closes to Claude Code.
- 01:46Z (21:46 local) — the operator: "ok, claude code is working on it. going from now on, can we make our prompts and the work each excutor does very smart in a way to avoid using extra credits than needed, but still do the task the best with completeness, and higest quality, but avoid duplicate tasks, such as tasks that can be done by ci run, etc etc? just saying to cut down unnessary tasks. more over as the lovable thread grown non stop, will that keep consuming more and more credits, is it worth to start a new "draft" which it has a button at top saying draft that oseems to open a new contect. please do detailed reaserch". Researched (Lovable's Credits and usage, Plans and credits, Drafts and Chats pages; Claude Code's "Manage costs effectively"): Lovable prices a build message by "the complexity of the request and the work completed", the chat's length not among its factors, and the measured turns fell from 22–45 credits (turns 2–4) to 7–11 (turns 24, 25 and 30) as the briefs became exact; a Draft has its own chat at the same price per message but no Git sync (its code reaches GitHub only on Accept: no CI on it, nothing for the supervisor to verify), so it is not for executor turns; a Claude Code session sends its whole context again on every request, so each brief starts a new session; the whole unit suite ran up to six times a turn (after each part, at THE CHECKS, in land.ts — whose markers only land.ts writes —, in CI, and the supervisor's prototype and verification). Applied by the supervisor from then (G17): Part A trimmed to the six status lines when the brief states CI on BASE; one check-in per landing, no polling; a landing verified by hash equality and the touched tests, CI being the full-suite proof; short reports for records turns. Put to the operator, not answered at the cut: (1) the executor on Sonnet for records and exact-copy turns, on Opus where a brief leaves reasoning to it; (2) the kit cleanup in turn 34e — the full checks once a turn (a checks mode of land.ts writing its markers), rules loaded by path, the reviewer on Sonnet and skipped on records-only turns; (3) executor turns back to Lovable when the Claude Code credit ends (2026-11-04 23:59 PT), so the executor does not draw on the weekly plan limit the supervisor uses.
- 02:01Z — turn 34d landed by the Claude Code executor (`e9ee79f7`; every file byte-equal to the brief, red first on BASE as expected, unit 326 files / 1996 tests, ODE-1 2 passed); run 40436029815 SUCCESS (02:22:53Z, 0 flaky, main promoted). Its reviewer READY with seven MINORs: 1 kept (a unit test's fake route); 2–5 to turn 34c-4; 6 and 7 to records turn R1. INC-937 registered (a caught error's text read by hand in e2e/ and scripts/, outside its census); S453.
- 02:2xZ (22:2x local) — the operator stopped the supervisor's whole-suite run on the R1 prototype: read as the lean rule applied to the supervisor too (the prototype runs lint, typecheck, format and the touched tests; land.ts and CI run the whole suite).
- 03:0xZ — records turn R1 landed (`c33d0cb5`): the block applier — scripts/brief/apply-blocks.ts, run through scripts/brief/apply-blocks.sh (register row 58; BA-1…5) — and, applied by it, INC-847 … INC-900; the executor saved its brief by a scripted copy, not a retyped one (accepted). Run 40441158707 SUCCESS (03:13:10Z, 0 flaky, main promoted). Its reviewer READY with 2 MAJOR and 6 MINOR — a malformed last block skipped instead of refused, no census for a second parser, EDIT numbers unchecked, the wrapper proven by text, writes made file by file, no docs page — all fixed in records turn R3; its MINOR 4 is INC-938 (the typecheck covers neither scripts/ nor .claude/hooks/). INC-939 registered on the reviewer's G51 note: the two storage buckets carry no type or size allowlist — defence in depth only (no client writes listing photos since 20261015102153; category assets need staff rights).
- 11:20Z — records turn R2 landed (`8898525c`) after one stop — v1's first roadmap block ran backwards (S454), and v2 went out in a new session: INC-901 … INC-937, the later word on INC-847 … INC-937 (its closures by §11's rule), "Numbering: next free INC-938." and the watch list of 2026-10-27, applied by the block applier; run 40496361455 SUCCESS (11:54:00Z, main promoted).
- The Foundation fixes tracker updated after each verified turn and opened for the operator at his ask (22:29 local).
- Operator steps owed at the cut, beside the list above: Lovable credits (turn 34e); the three credit decisions; a Publish of `8898525c` and one walk of everything since `c1b6b4e5`; INC-930's choice.

NUMBERING after this block: next free DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S455, ACT-021.
NEW-END
EDIT docs/governance/system-state.md #1
OLD-BEGIN

Governing instructions: Claude supervisor v1.13 (installed in the Project 2026-10-05) · Lovable Project Knowledge v3.10. Canonical truth: this file + /docs/spec/spec-ledger.md. Evidence channels: docs/tracking/ci-status.md (two-step SHA check), docs/tracking/e2e-last-failure.md, nightly-last-failure.md, flake-ledger.

OLD-END
NEW-BEGIN

Governing instructions: Claude supervisor v1.14 (installed in the Project 2026-10-23) · Lovable Project Knowledge v3.11 (2026-10-23). Canonical truth: this file + /docs/spec/spec-ledger.md. Evidence channels: docs/tracking/ci-status.md (two-step SHA check), docs/tracking/e2e-last-failure.md, nightly-last-failure.md, flake-ledger.

NEW-END
EDIT docs/governance/system-state.md #2
OLD-BEGIN

Current position 2026-10-23, bundle 22 after the close — the records turn (turn 31; dev = `4de3d08d` (turn 30) before it, main = `29101960` (turn 29; run 39925232560 SUCCESS at 2026-10-23T08:49:42Z, promoted); the run on `4de3d08d` read by turn 31's Part A — its smoke lane reds on the new lint step's backend difference (INC-846) until this turn's warning conversion; its other 24 jobs judge turn 30): STAGE 1, THE LEGAL SECTION — BUILT, PUBLISHED AND WALKED, AND THE SYSTEMS TURN BEGUN (block S76): after bundle 22's close (block S75) thirty-one more executor turns — Admin › Legal made usable with its exports (D226; turns 12–13); CI moved off ethio-staging onto temporary Supabase backends built from the migrations on every commit (D228 → DEC-209 → DEC-211 → DEC-214; sixteen numbered lanes, one worker each, plus the smoke and e-mail lanes; ~14–22 minutes a run; the promote token DEC-210); the acceptance enforced on the tables (DEC-215/216, M13) and the signed-in-not-accepted count (M14); the Terms and Privacy v2 approved (DEC-221) with their Amharic and Afaan Oromo written and reviewed, the legal facts (M15), the review cadence (DEC-219, M16), one text per language (DEC-228, M17a/b), the one-language rule (DEC-229), answer options per language (DEC-233, M18/M19); the admin strings out of the first paint (DEC-231); the CodeQL alerts cleared; the flake-and-cleanup turn's first part (turn 27) and INC-809's producer (turn 28); the operator's walk of 2026-10-22 (five lines; its findings D231, INC-822–INC-825, DEC-235, DEC-236, D230); the systems audit of 2026-10-23 → instructions v1.14 (G0 SYSTEMS, NOT PATCHES) and Knowledge v3.11, both live; its first fixes — the photo route behind its door, stand-ins only in the test build, the key in a header (turn 29); one gate for a deactivated caller at every door with its census guard (DEC-241), the password-removal proof (DEC-242), three stale doors closed, the migration guard reading whole files and the shell-pipe rule, the database lints on every commit and the nightly's honest verdict (DEC-240), Knowledge J in the harness doc (DEC-238) (turn 30, M20). Ten migration files M12 → M20 on ethio-prod and ethio-staging; the newest mark `20261023150000`. This turn (31) lands the records: block S76, INC-781…INC-846 with the later word and the watch list, docs/governance/mechanisms.md (the register of concerns, G0.9), docs/governance/instructions-amendments.md (v1.14; the slip record and version history moved from the instructions — DEC-239; slips S331–S378), docs/governance/claude-supervisor-instructions-v1.14.md, docs/governance/lovable-knowledge.md at v3.11, the handover package, the roadmap, the changelog, the feature-doc rows turn 30 owed (INC-845), and DEC-240's rule applied to the smoke-lane lint step (INC-846). Decided, not built: turn 32 — the one "agree to a document" component (D230 the sign-up tick, the acceptance screen, DEC-236 the publish certification as a link form and the public statement page), INC-822 (a clear message when a confirmation e-mail fails), INC-823 (no page before the gate decides), INC-825 (Admin › Legal's Open and Add translation on the card), INC-809's context file read first, and the sign-in/sign-up scenario census shown to the operator; then the Foundations bundle (DEC-237; nine mechanisms in order — the conformance kit, the route boundary, the form kit, the AI gateway, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals; ESTIMATE 28–38 executor turns); then bundle 23 (D222's business-name rule) and Stage 1's last part (the banned-items and safety pages); the major UI redesign before Stage 2 (the operator's standing reminder). OPEN: INC-846 (the anon count on the temporary backend — the census decides whether nine grants are unlisted on production or the backend's default-privilege fixture is incomplete); INC-809 (reopened); INC-827 and the flake-and-cleanup rest (INC-783, INC-786/INC-821, INC-793, INC-843, the J3 afterEach files); INC-826, INC-834, INC-838, INC-840–INC-842, INC-844 (the Foundations bundle); INC-810, INC-811 (the strings turn); INC-801 (js-yaml, moderate); D229 (the privacy-request inbox — peer research first); D232/D233 (the previews and the admin statistics — the Foundations bundle and Stage 2); the Afaan Oromo texts' import and a native read; the real legal phone number, the copyright agent and the DMCA registration before launch; INC-782 (the organisation's MAU grace period ends 31 Oct 2026). NEXT: Publish once the run on `4de3d08d` is read; turn 32; the Foundations bundle. Next free: DEC-243, D234, INC-847, S379, ACT-021.
OLD-END
NEW-BEGIN

Current position 2026-10-27, the Foundations bundle built to turn 34d — the records turns (dev = main = `8898525c` (records turn R2; run 40496361455 SUCCESS at 11:54:00Z); turn 34d `e9ee79f7` and records turn R1 `c33d0cb5` each judged green; the last Publish `c1b6b4e5` (2026-10-26 14:0xZ); Lovable's workspace out of credits from 2026-10-26 21:45Z — every turn since runs in the Claude Code executor (DEC-257); turn 34e built and waiting for Lovable, its workflow files being closed to Claude Code): STAGE 1 — THE LEGAL SECTION CLOSED WITH BUNDLE 22, AND THE FOUNDATIONS BUNDLE (DEC-237) BUILT TO TURN 34c-5 (block S77): bundle 22's last turns — the records (31), one "agree to a document" component and the landing after sign-in (32, M21), the document named in a sentence is the link (33, D235, M22/M23), the packages (33b, DEC-243); then the Foundations bundle — the conformance kit, requireSignedIn, the signed-in publishing page (D236, M24) and the language pick (D237) (turn 1); the route boundary with its five waves closed (INC-859–INC-863; turns 2–14 and 19–20: defineRoute, answer.ts, upstream.ts, the dial registry, the import doors, the route client, server functions on validators); the AI gateway with ai_calls kept 90 days (DEC-247, DEC-248; turns 15–19) and the vendor-seams freeze (DEC-249, DEC-250); the lint composition (21); the UUID module and the kit's walkers (22); the perf lab and the published site's baseline (23); the speed turns 24–34 — per-page budgets, loadOnce, the ad's photo links signed by the server, the first reads preloaded, the server's first feed page and cards, the strings layers (DEC-258), overlays and dialogs on demand (DEC-259, DEC-260), the device's own fonts (DEC-262), the database client off every page's first download (DEC-261; the entry closure 302.2 → 204.1 KiB gz); the review gate (K1; DEC-269, DEC-270); a failed download surfaced and the sign-out made final (34b-1…34b-4; DEC-268); one list of signed-in pages, the offline sign-out (DEC-271), the root's facts once a page load (DEC-272) and the phone menu without its × (D238) (34w, 34w-2); the session read and the project's address in one place (34c-1…34c-5; DEC-273, DEC-274); the non-null guard (K2); a test's interception ends with its page and the non-null census sees the definite-assignment mark (34d, INC-934); the block applier — a brief's FILE and EDIT blocks applied by one script, never retyped (records turn R1, register row 58; hardened in R3). The executors: Lovable through the connector (DEC-245), staging applies by the Supabase connector (DEC-246), the Claude Code executor and the hybrid (DEC-255–DEC-257; turns 19, 32, 33, 32b and 34; and, from 2026-10-26 23:19Z, every turn — 34d, R1, R2, R3). Seven migration files (M21–M24, turn 13's import-audit fix, turn 15's ai_calls and its M2) on ethio-prod and ethio-staging; the newest mark `20261025150000`. The order decided: the records turns R1 (the block applier; INC-847…INC-900) and R2 (INC-901…INC-937 with the later word, its closures, the numbering and the watch list) — landed → R3 (block S77, this position and the applier's hardening) → R4 (the slips S379–S454 in docs/governance/instructions-amendments.md §Slips, the roadmap's owed lines, INC-938 and INC-939 into the ledger) → turn 34e when Lovable has credits; the INC ledger's import escaped outside code spans for Prettier (`_x_`, `$`; docs/spec and docs/governance are outside Prettier and land verbatim). Decided, not built: turn 34e (DEC-275 — INC-935: a deadline and one retry on every CI install, timeout-minutes on every job and outside step, the lanes' host ports reserved from the ephemeral range) — built, waiting for Lovable; turn 34c-4 (the E2E side of the storage name, with the route guard's follow-ups — turn 34d's reviewer MINORs 2–5); INC-937 (a caught error's text through errorText in e2e/ and scripts/, its census over the whole tree); INC-938 (the typecheck over scripts/ and .claude/hooks/); INC-939 (the storage buckets' type and size allowlists — a migration turn, Tier A); the speed study before turns 35–37 (the time to data-app-ready — DEC-266's REVISIT); turns 35–37 (the anonymous reference reads behind cached routes, DEC-261 continued); after 37: DEC-265 (the category pictures re-cut to WebP — a migration turn), DEC-264 (stable addresses for a live ad's card photos — Tier A, spec owed), DEC-263 (edge caching at the DNS cutover — spec owed), the remaining overlays; the remaining mechanisms in DEC-237's order (the form kit, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals); the residency waves (DEC-252–DEC-254; ESTIMATE six turns); the sign-in/sign-up scenario suite (bundle 22 turn 32's F7 census — its old "turn 34" roadmap line to renumber); then bundle 23 (D222's business-name rule) and Stage 1's last part (the banned-items and safety pages); the Sage 3D look and the left rail before Stage 2 (the operator's standing reminder). OPEN: INC-936 (the nightly red every night since 2026-10-19 and unread — AP-41 and LG-21 to read whole, its length near GitHub's 360 minutes to size; S452); INC-935 (turn 34e); INC-937, INC-938, INC-939; the three credit decisions put to the operator on 2026-10-26 21:5x local (the executor's model per turn, the kit cleanup in 34e, Lovable again after the Claude Code credit); INC-930 (the operator's choice — stay on the page offline, or fetch the marketplace's code ahead; the supervisor recommends the latter); INC-913 (DEC-266's judge: KEEP by its CI half, read 2026-10-26 22:4xZ; its timing half rides the speed study); INC-855 (GW-3's pass line from CI owed); INC-890 and INC-921 (the known sandbox timeouts); INC-932 (the ratchet's allowlist expiry); INC-847 (instrumented); INC-809 FIXED-WATCH; INC-872 (fixed — closes after a Flake check or a clean ledger week); INC-906 and the SO-12 and PW-54 lines (watched); INC-848 (before launch); INC-850 (the next legal turn); INC-853, INC-854 (the e2e-helpers wave); INC-878 (the residency work); INC-885–INC-888, INC-893, INC-898 (the gateway and log items); INC-899 (raw buttons — the form kit); INC-902, INC-903; INC-420 (CI installs from Lovable's cache — DEC-249 debt); DEC-257's comparison (no decision taken); DEC-240's lint step still `continue-on-error` (turn 34e removes it). OWED BY THE OPERATOR: Lovable credits (turn 34e waits); the three credit decisions; a Publish of `8898525c` and one walk of everything since `c1b6b4e5`; INC-930's choice; SUPABASE_PROD_MIGRATE_TOKEN before Claude Code's first migration turn (its cloud credit expires 2026-11-04 23:59 PT); from block S76, not confirmed since: the Privacy Policy v2 and publishing statement v2 import, the Afaan Oromo texts' import, the real legal phone number and the copyright agent, the DMCA registration, the MAU figure weekly until 31 Oct (INC-782), GitHub → Insights → Traffic, the PROMOTE_TOKEN renewal before 2027-01-18, code scanning #419's dismissal, a native speaker's read of the Amharic and Afaan Oromo legal texts. NEXT: records turn R4 → turn 34c-4 (Claude Code) → turn 34e when Lovable has credits; the Publish and walk when the operator is back; then the speed study and turns 35–37. Next free: DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S455, ACT-021.

(Superseded 2026-10-27 by the position above; the paragraph below stands as written on 2026-10-23, the record of bundle 22's records turn.)

Current position 2026-10-23, bundle 22 after the close — the records turn (turn 31; dev = `4de3d08d` (turn 30) before it, main = `29101960` (turn 29; run 39925232560 SUCCESS at 2026-10-23T08:49:42Z, promoted); the run on `4de3d08d` read by turn 31's Part A — its smoke lane reds on the new lint step's backend difference (INC-846) until this turn's warning conversion; its other 24 jobs judge turn 30): STAGE 1, THE LEGAL SECTION — BUILT, PUBLISHED AND WALKED, AND THE SYSTEMS TURN BEGUN (block S76): after bundle 22's close (block S75) thirty-one more executor turns — Admin › Legal made usable with its exports (D226; turns 12–13); CI moved off ethio-staging onto temporary Supabase backends built from the migrations on every commit (D228 → DEC-209 → DEC-211 → DEC-214; sixteen numbered lanes, one worker each, plus the smoke and e-mail lanes; ~14–22 minutes a run; the promote token DEC-210); the acceptance enforced on the tables (DEC-215/216, M13) and the signed-in-not-accepted count (M14); the Terms and Privacy v2 approved (DEC-221) with their Amharic and Afaan Oromo written and reviewed, the legal facts (M15), the review cadence (DEC-219, M16), one text per language (DEC-228, M17a/b), the one-language rule (DEC-229), answer options per language (DEC-233, M18/M19); the admin strings out of the first paint (DEC-231); the CodeQL alerts cleared; the flake-and-cleanup turn's first part (turn 27) and INC-809's producer (turn 28); the operator's walk of 2026-10-22 (five lines; its findings D231, INC-822–INC-825, DEC-235, DEC-236, D230); the systems audit of 2026-10-23 → instructions v1.14 (G0 SYSTEMS, NOT PATCHES) and Knowledge v3.11, both live; its first fixes — the photo route behind its door, stand-ins only in the test build, the key in a header (turn 29); one gate for a deactivated caller at every door with its census guard (DEC-241), the password-removal proof (DEC-242), three stale doors closed, the migration guard reading whole files and the shell-pipe rule, the database lints on every commit and the nightly's honest verdict (DEC-240), Knowledge J in the harness doc (DEC-238) (turn 30, M20). Ten migration files M12 → M20 on ethio-prod and ethio-staging; the newest mark `20261023150000`. This turn (31) lands the records: block S76, INC-781…INC-846 with the later word and the watch list, docs/governance/mechanisms.md (the register of concerns, G0.9), docs/governance/instructions-amendments.md (v1.14; the slip record and version history moved from the instructions — DEC-239; slips S331–S378), docs/governance/claude-supervisor-instructions-v1.14.md, docs/governance/lovable-knowledge.md at v3.11, the handover package, the roadmap, the changelog, the feature-doc rows turn 30 owed (INC-845), and DEC-240's rule applied to the smoke-lane lint step (INC-846). Decided, not built: turn 32 — the one "agree to a document" component (D230 the sign-up tick, the acceptance screen, DEC-236 the publish certification as a link form and the public statement page), INC-822 (a clear message when a confirmation e-mail fails), INC-823 (no page before the gate decides), INC-825 (Admin › Legal's Open and Add translation on the card), INC-809's context file read first, and the sign-in/sign-up scenario census shown to the operator; then the Foundations bundle (DEC-237; nine mechanisms in order — the conformance kit, the route boundary, the form kit, the AI gateway, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals; ESTIMATE 28–38 executor turns); then bundle 23 (D222's business-name rule) and Stage 1's last part (the banned-items and safety pages); the major UI redesign before Stage 2 (the operator's standing reminder). OPEN: INC-846 (the anon count on the temporary backend — the census decides whether nine grants are unlisted on production or the backend's default-privilege fixture is incomplete); INC-809 (reopened); INC-827 and the flake-and-cleanup rest (INC-783, INC-786/INC-821, INC-793, INC-843, the J3 afterEach files); INC-826, INC-834, INC-838, INC-840–INC-842, INC-844 (the Foundations bundle); INC-810, INC-811 (the strings turn); INC-801 (js-yaml, moderate); D229 (the privacy-request inbox — peer research first); D232/D233 (the previews and the admin statistics — the Foundations bundle and Stage 2); the Afaan Oromo texts' import and a native read; the real legal phone number, the copyright agent and the DMCA registration before launch; INC-782 (the organisation's MAU grace period ends 31 Oct 2026). NEXT: Publish once the run on `4de3d08d` is read; turn 32; the Foundations bundle. Next free: DEC-243, D234, INC-847, S379, ACT-021.
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…5: blocks in order, a block inside a FILE block is that file's text, a run-on block refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope — writes nothing; the command line and `--dry`; the wrapper and the scope) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK |
OLD-END
NEW-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md |
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
  - [x] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn. Final HEAD 6b3a461d; CI run 40403849904: queued when turn 34c-5's brief was sent (the supervisor reads it).
OLD-END
NEW-BEGIN
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
  - [ ] INC-938 — every TypeScript file is type-checked: `bun run typecheck` (tsconfig.json's include) covers neither scripts/ nor .claude/hooks/, so the conformance censuses, the CI scripts, the kit and the block applier are type-checked by nobody (vitest transpiles without types; records turn R1's reviewer, MINOR 4) — a typecheck over both (Bun's globals typed for the kit), its first run's errors fixed or listed.
  - [ ] INC-939 — each storage bucket allows only what its door allows: listing-photos and category-assets carry no allowed_mime_types or file_size_limit — defence in depth only (no client writes listing photos since 20261015102153; category assets need staff rights) — a migration turn (Tier A): the image types and the media pipeline's byte caps set on each bucket, proven on staging.
  - [x] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn. Final HEAD 6b3a461d; CI run 40403849904: queued when turn 34c-5's brief was sent (the supervisor reads it).
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [x] Records turn R1 (docs/governance/briefs/foundations-records-r1.md; no migration; the Claude Code executor; G41) — the block applier: scripts/brief/apply-blocks.ts, run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]` (register row 58: a brief's FILE and EDIT blocks applied by one script in the order written, never retyped; one refusal writes nothing; BA-1…5); and, applied by it, the incident ledger's first half of the Foundations bundle, INC-847 … INC-900, word for word from the supervisor's running record. INC-901 … INC-937, the later word and the watch list follow in records turn R2, then the decision ledger's block S77, system-state.md's position and the slips. Final HEAD c33d0cb5; CI run 40441158707: SUCCESS.
  - [ ] Records turn R2 (docs/governance/briefs/foundations-records-r2.md, v2 after one stop — v1's first roadmap block ran backwards, S454; no migration; the Claude Code executor; G41) — the incident ledger's second half, applied by the block applier: INC-901 … INC-937 imported word for word, the later word on INC-847 … INC-937 (the closures written by §11's rule), "Numbering: next free INC-938." and the watch list of 2026-10-27; then the decision ledger's block S77 and system-state.md's position (R3), and the slips and the owed roadmap lines (R4).
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [x] Records turn R1 (docs/governance/briefs/foundations-records-r1.md; no migration; the Claude Code executor; G41) — the block applier: scripts/brief/apply-blocks.ts, run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]` (register row 58: a brief's FILE and EDIT blocks applied by one script in the order written, never retyped; one refusal writes nothing; BA-1…5); and, applied by it, the incident ledger's first half of the Foundations bundle, INC-847 … INC-900, word for word from the supervisor's running record. INC-901 … INC-937, the later word and the watch list follow in records turn R2, then the decision ledger's block S77, system-state.md's position and the slips. Final HEAD c33d0cb5; CI run 40441158707: SUCCESS.
  - [x] Records turn R2 (docs/governance/briefs/foundations-records-r2.md, v2 after one stop — v1's first roadmap block ran backwards, S454; no migration; the Claude Code executor; G41) — the incident ledger's second half, applied by the block applier: INC-901 … INC-937 imported word for word, the later word on INC-847 … INC-937 (the closures written by §11's rule), "Numbering: next free INC-938." and the watch list of 2026-10-27; then the decision ledger's block S77 and system-state.md's position (R3), and the slips and the owed roadmap lines (R4). Final HEAD 8898525c; CI run 40496361455: SUCCESS.
  - [ ] Records turn R3 (docs/governance/briefs/foundations-records-r3.md; no migration; the Claude Code executor; G41) — the block applier hardened from records turn R1's reviewer (a block that runs on, never ends or is numbered out of order refused; writes staged, all or none; BA-6, its census: one parser of briefs; the wrapper proven by running it; docs/features/brief-applier.md); and, applied by it, the decision ledger's block S77 (2026-10-23 → 2026-10-27) and system-state.md's position of 2026-10-27, the one of 2026-10-23 kept and marked superseded. The slips S379 … S454, the roadmap's owed lines and INC-938 and INC-939's entries follow in records turn R4.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations records turn R2 (2026-10-27; G41) — the incident ledger is level with the supervisor's running record: INC-901 … INC-937 imported word for word by the block applier; the later word on INC-847 … INC-937 (what became of each, the closures written by §11's rule — a fix verified on dev and judged by a green run); "Numbering: next free INC-938."; the watch list of 2026-10-27.
OLD-END
NEW-BEGIN
- Foundations records turn R2 (2026-10-27; G41) — the incident ledger is level with the supervisor's running record: INC-901 … INC-937 imported word for word by the block applier; the later word on INC-847 … INC-937 (what became of each, the closures written by §11's rule — a fix verified on dev and judged by a green run); "Numbering: next free INC-938."; the watch list of 2026-10-27.

- Foundations records turn R3 (2026-10-27; G41; register row 58) — the block applier hardened from records turn R1's reviewer: a block marker no whole block holds (a block that runs on or never ends) and a path's EDIT numbers out of order are refused; every file is staged beside its target and renamed into place only when all are staged; BA-6 names any other code that parses the markers; the wrapper is proven by running it under the kit's scopeVerdict; docs/features/brief-applier.md describes it. Applied by it: the decision ledger's block S77 (2026-10-23 → 2026-10-27: bundle 22's close, the Foundations bundle to turn 34d, records turns R1 and R2, D234–D238, DEC-243–DEC-275) and system-state.md's position of 2026-10-27, the earlier one kept and marked superseded, its standing reads at supervisor v1.14 and Knowledge v3.11.
NEW-END
C2. `grep -n '^S77 · \|^NUMBERING after this block' docs/spec/spec-ledger.md | tail -2 | cut -c1-80` — the S77 header and the last numbering line ("next free DEC-276 (DEC-275 drafted in turn 34e), D239, INC-940, S454, ACT-021."); `grep -n '^Current position 2026-10-27\|^(Superseded 2026-10-27' docs/governance/system-state.md | cut -c1-60` — two lines, in that order; paste both. Commit Part C.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-records-r3.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals); `bun run i18n:usage` (no change to either map); `bun run build`; `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
f082ee16360c92f0c748a93fb6283c7cc9e12e03acf11f0700658414ce463e80  docs/_changelog.md
1580d32d19d1dd4e7f84a512bededc8b4de9a5e536d2fbebd4c9a4eb0e7c036b  docs/features/brief-applier.md
8c3d20d55b09087eb9db19b0733d4e42f7e1b182c645bf05212bbb4954205314  docs/governance/mechanisms.md
fe947d57f39a43f208fb6bfc3fc77eefdd2dd413f78d7b2073a210031d7d5f66  docs/governance/system-state.md
b78277d1f8c3752ef556d9b0fd5fe507f2db220146da5b3b053901f953ef36f7  docs/spec/spec-ledger.md
322711974d98bf12279511ddecb25a856521f075d79bdcb98a97cdbb1d41520a  scripts/brief/apply-blocks.test.ts
fa36bc90b2f3a6f379249a7edebc76a7dda0088060297f203e7963605fe7c2bc  scripts/brief/apply-blocks.ts

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its answer and say so in the report); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR is fixed inside SCOPE when this brief's text allows it — never in the imported record, which is the supervisor's — otherwise listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-records-r3.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract (3); the applier's one parser re-located at <START> (4); B1's red totals, B2's and the unit totals (5); the K2 lines (6); BA-1…6 and wired lines (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12); the reviewer's last line. Commit it (`records turn R3: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): every finding of R1's reviewer on the applier is fixed here except its MINOR 4 (the typecheck's reach, INC-938 — its own turn, because it may surface errors across scripts/); the census lives in the applier's own test file, as the applier's guard; block S77 runs to this turn's cut so the ledger's last numbering line is the record's own; the slips travel in records turn R4, so each carrying message stays small.

BLOCK 1 — scripts/brief/apply-blocks.ts:
FILE-BEGIN scripts/brief/apply-blocks.ts
/**
 * Register row 58 (Foundations records turn R1, 2026-10-27; hardened in records turn R3; INC-907's class) —
 * A BRIEF'S EXACT TEXT REACHES THE TREE EXACTLY. A brief carries every new or rewritten file as a FILE block
 * and every change as an EDIT block (its OLD text, found exactly once in the file, and its NEW text). The
 * executor applies them with this one script, never by retyping them:
 *
 *   bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
 *
 * — every block of the brief in the order it is written, or only the blocks of the paths named. Every
 * block is checked before anything is written: a block marker outside a whole block (a block that runs on
 * or never ends), a path's EDIT numbers out of order, a path outside the repository or outside the
 * brief's scope (the kit's own `scopeVerdict`), an OLD text found zero times or more than once, a brief
 * with no block for a named path. One refusal writes nothing: every file is staged beside its target
 * first and renamed into place only when all are staged. Each block prints one line; `--dry` writes
 * nothing. docs/features/brief-applier.md describes it; BA-6 names any second parser of the markers.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PROJECT_DIR, scopeVerdict } from "../../.claude/hooks/lib";
import { errorText } from "../../src/lib/error-text";

export type Block =
  | { kind: "file"; path: string; text: string }
  | { kind: "edit"; path: string; n: number; old: string; next: string };

/** The answer of a scope check: the kit's `Verdict` shape. */
export type Allow = (path: string) => { ok: true } | { ok: false; reason: string };

export type Io = {
  read: (path: string) => string | null;
  /** Writes every file or none (it throws ApplyRefused when it cannot). */
  writeAll: (texts: ReadonlyMap<string, string>) => void;
  allow: Allow;
};

export class ApplyRefused extends Error {}

const BLOCK_RX =
  /^FILE-BEGIN (\S+)\n([\s\S]*?)\nFILE-END \1$|^EDIT (\S+) #(\d+)\nOLD-BEGIN\n([\s\S]*?)\nOLD-END\nNEW-BEGIN\n([\s\S]*?)\nNEW-END$/gm;

const MARKER_SOURCE =
  "^(OLD-BEGIN|OLD-END|NEW-BEGIN|NEW-END|FILE-BEGIN \\S+|FILE-END \\S+|EDIT \\S+ #\\d+)$";
const MARKER_RX = new RegExp(MARKER_SOURCE, "m");

function lineOf(text: string, at: number): number {
  return text.slice(0, at).split("\n").length;
}

/**
 * Every FILE and EDIT block of a brief, in the order written (a block inside a FILE block is that file's
 * text). A marker line no whole block holds, or a path's EDIT numbers that do not run 1, 2, 3 … in order,
 * is a refusal: a block that runs on, never ends or is missing is never skipped.
 */
export function parseBlocks(brief: string): Block[] {
  const blocks: Block[] = [];
  const spans: Array<[number, number]> = [];
  const nextNumber = new Map<string, number>();
  for (const m of brief.matchAll(BLOCK_RX)) {
    const [whole, filePath, fileText, editPath, n, old, next] = m;
    spans.push([m.index, m.index + whole.length]);
    if (filePath !== undefined && fileText !== undefined) {
      blocks.push({ kind: "file", path: filePath, text: `${fileText}\n` });
    } else if (
      editPath !== undefined &&
      n !== undefined &&
      old !== undefined &&
      next !== undefined
    ) {
      // A marker line inside an EDIT's text means a block ran into the next one (an empty NEW is one blank line).
      if (MARKER_RX.test(old) || MARKER_RX.test(next)) {
        throw new ApplyRefused(
          `EDIT ${editPath} #${n}: malformed — a block marker inside its OLD or NEW text`,
        );
      }
      const expected = nextNumber.get(editPath) ?? 1;
      if (Number(n) !== expected) {
        throw new ApplyRefused(
          `EDIT ${editPath} #${n}: out of order — the path's next EDIT is #${String(expected)}`,
        );
      }
      nextNumber.set(editPath, expected + 1);
      blocks.push({ kind: "edit", path: editPath, n: Number(n), old, next });
    }
  }
  for (const marker of brief.matchAll(new RegExp(MARKER_SOURCE, "gm"))) {
    const at = marker.index;
    if (!spans.some(([from, to]) => at >= from && at < to)) {
      throw new ApplyRefused(
        `malformed — the marker "${marker[0]}" on line ${String(lineOf(brief, at))} belongs to no whole block`,
      );
    }
  }
  return blocks;
}

function occurrences(text: string, part: string): number {
  if (part === "") return 0;
  let count = 0;
  for (let at = text.indexOf(part); at !== -1; at = text.indexOf(part, at + 1)) count += 1;
  return count;
}

function label(block: Block): string {
  return block.kind === "file" ? `FILE ${block.path}` : `EDIT ${block.path} #${String(block.n)}`;
}

/**
 * Applies the blocks (all, or those of `only`) in order. Nothing is written unless every block applies:
 * the files' new texts are built in memory first and handed to `io.writeAll` together. Returns one line per
 * block.
 */
export function applyBlocks(blocks: Block[], io: Io, only: string[] = []): string[] {
  for (const path of only) {
    if (!blocks.some((b) => b.path === path))
      throw new ApplyRefused(`the brief has no block for ${path}`);
  }
  const chosen = only.length === 0 ? blocks : blocks.filter((b) => only.includes(b.path));
  if (chosen.length === 0) throw new ApplyRefused("the brief has no FILE or EDIT block");
  const texts = new Map<string, string>();
  const lines: string[] = [];
  for (const block of chosen) {
    const { path } = block;
    if (path.startsWith("/") || path.split("/").includes("..")) {
      throw new ApplyRefused(`${label(block)}: the path is not inside the repository`);
    }
    const verdict = io.allow(path);
    if (!verdict.ok) throw new ApplyRefused(`${label(block)}: ${verdict.reason}`);
    if (block.kind === "file") {
      texts.set(path, block.text);
      lines.push(`${label(block)} (${String(Buffer.byteLength(block.text))} bytes)`);
      continue;
    }
    const current = texts.has(path) ? texts.get(path) : io.read(path);
    if (current === undefined || current === null) {
      throw new ApplyRefused(`${label(block)}: the file does not exist`);
    }
    const found = occurrences(current, block.old);
    if (found !== 1) {
      throw new ApplyRefused(
        `${label(block)}: its OLD text is found ${String(found)} times in the file (exactly once is required)`,
      );
    }
    const at = current.indexOf(block.old);
    texts.set(path, current.slice(0, at) + block.next + current.slice(at + block.old.length));
    lines.push(label(block));
  }
  io.writeAll(texts);
  lines.push(`applied ${String(chosen.length)} block(s) to ${String(texts.size)} file(s)`);
  return lines;
}

const STAGED = ".apply-blocks-staged";

/** Writes every file or none: each text is staged beside its target, then all are renamed into place. */
export function writeAllUnder(root: string, texts: ReadonlyMap<string, string>): void {
  const staged: Array<[string, string]> = [];
  try {
    for (const [path, text] of texts) {
      const abs = join(root, path);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(`${abs}${STAGED}`, text);
      staged.push([`${abs}${STAGED}`, abs]);
    }
  } catch (error) {
    for (const [temp] of staged) rmSync(temp, { force: true });
    throw new ApplyRefused(`staging the files failed, nothing written: ${errorText(error)}`);
  }
  for (const [temp, abs] of staged) renameSync(temp, abs);
}

/** The command line: the saved brief, then `--dry` and the paths to apply (none: every block). */
export function main(argv: string[], root = PROJECT_DIR, allow: Allow = scopeVerdict): number {
  const [briefPath, ...rest] = argv;
  if (briefPath === undefined) {
    process.stderr.write(
      "usage: bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]\n",
    );
    return 2;
  }
  const dry = rest.includes("--dry");
  const only = rest.filter((a) => a !== "--dry");
  const io: Io = {
    read: (path) => {
      const abs = join(root, path);
      return existsSync(abs) ? readFileSync(abs, "utf8") : null;
    },
    writeAll: (texts) => {
      if (!dry) writeAllUnder(root, texts);
    },
    allow,
  };
  try {
    const brief = readFileSync(join(root, briefPath), "utf8");
    const lines = applyBlocks(parseBlocks(brief), io, only);
    process.stdout.write(`${lines.join("\n")}${dry ? "\n(dry run: nothing written)" : ""}\n`);
    return 0;
  } catch (error) {
    if (error instanceof ApplyRefused) {
      process.stderr.write(`APPLY REFUSED (nothing written): ${errorText(error)}\n`);
      return 1;
    }
    throw error;
  }
}

if (import.meta.main) process.exit(main(process.argv.slice(2)));
FILE-END scripts/brief/apply-blocks.ts

BLOCK 2 — scripts/brief/apply-blocks.test.ts:
FILE-BEGIN scripts/brief/apply-blocks.test.ts
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it, vi } from "vitest";
import { errorText } from "../../src/lib/error-text";
import { walkFiles } from "../conformance/kit";
import { applyBlocks, ApplyRefused, main, parseBlocks, type Allow, type Io } from "./apply-blocks";

/**
 * Register row 58 (Foundations records turn R1; hardened in records turn R3) — a brief's FILE and EDIT
 * blocks reach the tree exactly, through scripts/brief/apply-blocks.sh (apply-blocks.ts): in order, all or
 * none. The planted briefs are built line by line, so this file holds no block of its own.
 */
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const roots: string[] = [];
const scratch = () => {
  const root = mkdtempSync(join(tmpdir(), "apply-blocks-"));
  roots.push(root);
  return root;
};
afterAll(() => {
  for (const root of roots) rmSync(root, { recursive: true, force: true });
});

const fileBlock = (path: string, ...body: string[]) => [
  `FILE-BEGIN ${path}`,
  ...body,
  `FILE-END ${path}`,
];
const editBlock = (path: string, n: number, old: string[], next: string[]) => [
  `EDIT ${path} #${String(n)}`,
  "OLD-BEGIN",
  ...old,
  "OLD-END",
  "NEW-BEGIN",
  ...(next.length === 0 ? [""] : next),
  "NEW-END",
];
const brief = (...blocks: string[][]) =>
  ["# a brief", "", "```text", "prose", ...blocks.flatMap((b) => [...b, ""]), "```", ""].join("\n");

const everywhere: Allow = () => ({ ok: true });
type Memory = Io & { files: Map<string, string>; writes: () => number };
function memory(files: Record<string, string>, allow: Allow = everywhere): Memory {
  const state = new Map(Object.entries(files));
  let writes = 0;
  return {
    files: state,
    writes: () => writes,
    read: (path) => state.get(path) ?? null,
    writeAll: (texts) => {
      writes += 1;
      for (const [path, text] of texts) state.set(path, text);
    },
    allow,
  };
}
const refusal = (run: () => unknown): string => {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(ApplyRefused);
    return errorText(error);
  }
  return "no refusal";
};

/** Code that names a block marker, other than the applier and this test: a second parser of briefs. */
function secondParsers(files: Array<{ path: string; text: string }>): string[] {
  const own = new Set(["scripts/brief/apply-blocks.ts", "scripts/brief/apply-blocks.test.ts"]);
  return files
    .filter((f) => !own.has(f.path) && /\b(OLD|NEW)-BEGIN\b/.test(f.text))
    .map((f) => f.path);
}

describe("the block applier (register row 58)", () => {
  it("BA-1 reads FILE and EDIT blocks in the order written; a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order is refused", () => {
    const inner = editBlock("b.txt", 1, ["x"], ["y"]);
    const blocks = parseBlocks(
      brief(
        fileBlock("a.txt", "one", "two"),
        editBlock("a.txt", 1, ["two"], []),
        fileBlock("c.md", ...inner),
      ),
    );
    expect(blocks).toEqual([
      { kind: "file", path: "a.txt", text: "one\ntwo\n" },
      { kind: "edit", path: "a.txt", n: 1, old: "two", next: "" },
      { kind: "file", path: "c.md", text: `${inner.join("\n")}\n` },
    ]);
    const runOn = ["EDIT a.txt #1", "OLD-BEGIN", "two", "OLD-END", "NEW-BEGIN", "NEW-END"];
    expect(refusal(() => parseBlocks(brief(runOn, editBlock("a.txt", 2, ["x"], ["y"]))))).toBe(
      "EDIT a.txt #1: malformed — a block marker inside its OLD or NEW text",
    );
    const lastNeverEnds = ["EDIT a.txt #1", "OLD-BEGIN", "x", "OLD-END", "NEW-BEGIN", "y"];
    expect(refusal(() => parseBlocks(brief(fileBlock("ok.txt", "z"), lastNeverEnds)))).toBe(
      'malformed — the marker "EDIT a.txt #1" on line 9 belongs to no whole block',
    );
    expect(refusal(() => parseBlocks(brief(["FILE-BEGIN b.txt", "text"])))).toBe(
      'malformed — the marker "FILE-BEGIN b.txt" on line 5 belongs to no whole block',
    );
    const twice = brief(editBlock("a.txt", 1, ["a"], ["b"]), editBlock("a.txt", 1, ["b"], ["c"]));
    expect(refusal(() => parseBlocks(twice))).toBe(
      "EDIT a.txt #1: out of order — the path's next EDIT is #2",
    );
    const gap = brief(editBlock("a.txt", 1, ["a"], ["b"]), editBlock("a.txt", 3, ["b"], ["c"]));
    expect(refusal(() => parseBlocks(gap))).toBe(
      "EDIT a.txt #3: out of order — the path's next EDIT is #2",
    );
    expect(refusal(() => parseBlocks(brief(editBlock("b.txt", 2, ["a"], ["b"]))))).toBe(
      "EDIT b.txt #2: out of order — the path's next EDIT is #1",
    );
  });

  it("BA-2 applies every block in order — a FILE, then EDITs on the text it left — or only the paths named", () => {
    const blocks = parseBlocks(
      brief(
        fileBlock("new.ts", "export const a = 1;", "export const b = 2;"),
        editBlock("new.ts", 1, ["export const b = 2;"], ["export const b = 3;"]),
        editBlock("old.md", 1, ["alpha"], ["alpha", "beta"]),
        editBlock("old.md", 2, ["beta"], ["gamma"]),
      ),
    );
    const io = memory({ "old.md": "# t\nalpha\nend\n" });
    expect(applyBlocks(blocks, io)).toEqual([
      "FILE new.ts (40 bytes)",
      "EDIT new.ts #1",
      "EDIT old.md #1",
      "EDIT old.md #2",
      "applied 4 block(s) to 2 file(s)",
    ]);
    expect(io.writes()).toBe(1);
    expect(Object.fromEntries(io.files)).toEqual({
      "old.md": "# t\nalpha\ngamma\nend\n",
      "new.ts": "export const a = 1;\nexport const b = 3;\n",
    });
    const some = memory({ "old.md": "# t\nalpha\nend\n" });
    applyBlocks(blocks, some, ["old.md"]);
    expect(Object.fromEntries(some.files)).toEqual({ "old.md": "# t\nalpha\ngamma\nend\n" });
  });

  it("BA-3 one refusal writes nothing: an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a named path with no block", () => {
    const refuses = (
      b: string,
      files: Record<string, string>,
      only: string[] = [],
      allow: Allow = everywhere,
    ) => {
      const io = memory(files, allow);
      const message = refusal(() => applyBlocks(parseBlocks(b), io, only));
      expect(io.writes()).toBe(0);
      expect(Object.fromEntries(io.files)).toEqual(files);
      return message;
    };
    const first = fileBlock("ok.txt", "fine");
    expect(refuses(brief(first, editBlock("a.md", 1, ["gone"], ["x"])), { "a.md": "here\n" })).toBe(
      "EDIT a.md #1: its OLD text is found 0 times in the file (exactly once is required)",
    );
    expect(
      refuses(brief(first, editBlock("a.md", 1, ["twice"], ["x"])), { "a.md": "twice twice\n" }),
    ).toBe("EDIT a.md #1: its OLD text is found 2 times in the file (exactly once is required)");
    expect(refuses(brief(first, editBlock("none.md", 1, ["a"], ["b"])), {})).toBe(
      "EDIT none.md #1: the file does not exist",
    );
    expect(refuses(brief(first, fileBlock("../out.txt", "x")), {})).toBe(
      "FILE ../out.txt: the path is not inside the repository",
    );
    expect(refuses(brief(fileBlock("/etc/x", "x")), {})).toBe(
      "FILE /etc/x: the path is not inside the repository",
    );
    const outOfScope: Allow = (path) =>
      path === "ok.txt"
        ? { ok: true }
        : { ok: false, reason: `${path} is outside the brief's SCOPE` };
    expect(refuses(brief(first, fileBlock("src/x.ts", "x")), {}, [], outOfScope)).toBe(
      "FILE src/x.ts: src/x.ts is outside the brief's SCOPE",
    );
    expect(refuses(brief(first), {}, ["other.txt"])).toBe("the brief has no block for other.txt");
    expect(refuses("# no blocks\n", {})).toBe("the brief has no FILE or EDIT block");
  });

  it("BA-4 the command line writes the tree, writes nothing on --dry, a refusal or a file it cannot stage, and asks for a brief", () => {
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const err = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    try {
      const root = scratch();
      mkdirSync(join(root, "docs"), { recursive: true });
      writeFileSync(join(root, "docs/a.md"), "start\n");
      writeFileSync(
        join(root, "b.md"),
        brief(
          fileBlock("docs/sub/new.md", "made"),
          editBlock("docs/a.md", 1, ["start"], ["changed"]),
        ),
      );
      expect(main(["b.md", "--dry"], root, everywhere)).toBe(0);
      expect(existsSync(join(root, "docs/sub/new.md"))).toBe(false);
      expect(readFileSync(join(root, "docs/a.md"), "utf8")).toBe("start\n");
      expect(main(["b.md"], root, everywhere)).toBe(0);
      expect(readFileSync(join(root, "docs/sub/new.md"), "utf8")).toBe("made\n");
      expect(readFileSync(join(root, "docs/a.md"), "utf8")).toBe("changed\n");
      writeFileSync(
        join(root, "c.md"),
        brief(fileBlock("docs/c.md", "c"), editBlock("docs/a.md", 1, ["start"], ["x"])),
      );
      expect(main(["c.md"], root, everywhere)).toBe(1);
      expect(existsSync(join(root, "docs/c.md"))).toBe(false);
      // docs/a.md is a file, so docs/a.md/x.md cannot be staged: docs/ok.md, staged first, is not written either.
      writeFileSync(
        join(root, "d.md"),
        brief(fileBlock("docs/ok.md", "ok"), fileBlock("docs/a.md/x.md", "x")),
      );
      expect(main(["d.md"], root, everywhere)).toBe(1);
      expect(existsSync(join(root, "docs/ok.md"))).toBe(false);
      expect(existsSync(join(root, "docs/ok.md.apply-blocks-staged"))).toBe(false);
      expect(main([], root, everywhere)).toBe(2);
    } finally {
      out.mockRestore();
      err.mockRestore();
    }
  });

  it("BA-5 the wrapper runs the applier with its arguments under the kit's scopeVerdict: before a brief is in force only the standing allowance may change", () => {
    const root = scratch();
    writeFileSync(
      join(root, "b.md"),
      brief(fileBlock("docs/features/x.md", "allowed"), fileBlock("src/x.ts", "scoped")),
    );
    const wrapper = (...args: string[]) =>
      spawnSync("bash", [join(HERE, "apply-blocks.sh"), ...args], {
        cwd: root,
        env: { ...process.env, CLAUDE_PROJECT_DIR: root },
        encoding: "utf8",
      });
    const refused = wrapper("b.md");
    expect(refused.status).toBe(1);
    expect(refused.stderr).toContain("FILE src/x.ts: src/x.ts: no brief in force yet");
    expect(existsSync(join(root, "docs/features/x.md"))).toBe(false);
    const applied = wrapper("b.md", "docs/features/x.md");
    expect(applied.status).toBe(0);
    expect(applied.stdout).toContain("applied 1 block(s) to 1 file(s)");
    expect(readFileSync(join(root, "docs/features/x.md"), "utf8")).toBe("allowed\n");
  });

  it("BA-6 the applier is the one parser of brief blocks: no other code names a block marker (a planted second parser is named)", () => {
    expect(
      secondParsers([
        { path: "scripts/brief/apply-blocks.ts", text: "OLD-BEGIN" },
        { path: "scripts/other.ts", text: 'const at = brief.indexOf("NEW-BEGIN");' },
        { path: "src/x.ts", text: "no markers" },
      ]),
    ).toEqual(["scripts/other.ts"]);
    const files = walkFiles(
      ["src", "e2e", "scripts", ".claude"].map((d) => join(ROOT, d)),
      { ext: ["ts", "tsx", "mjs", "js", "cjs", "sh"] },
    ).map((file) => ({
      path: relative(ROOT, file).split(sep).join("/"),
      text: readFileSync(file, "utf8"),
    }));
    expect(files.length).toBeGreaterThan(500);
    expect(secondParsers(files)).toEqual([]);
  });
});
FILE-END scripts/brief/apply-blocks.test.ts

BLOCK 3 — docs/features/brief-applier.md:
FILE-BEGIN docs/features/brief-applier.md
# The block applier (register row 58)

A brief carries every new or rewritten file as a FILE block and every change as an EDIT block. The executor — Claude Code or Lovable — applies them with one script, never by retyping them:

```
bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
```

With no path it applies every block of the brief in the order written; with paths, only their blocks. `--dry` checks and prints, and writes nothing.

## What a block is

- `FILE-BEGIN <path>` … `FILE-END <path>`: the file's whole text (the script adds the final newline).
- `EDIT <path> #<n>`, then `OLD-BEGIN` … `OLD-END` and `NEW-BEGIN` … `NEW-END`: the OLD text, found exactly once in the file, becomes the NEW text. An empty NEW is one blank line. A path's EDITs are numbered 1, 2, 3 … in the order written.
- Each marker stands alone on its line. A block written inside a FILE block is that file's text.

## What it refuses — and then writes nothing

- A marker line that no whole block holds: a block that runs on, never ends or lacks an end line.
- A path's EDIT numbers out of order.
- A path outside the repository, or outside the brief's scope — the kit's own `scopeVerdict` (.claude/hooks/lib.ts), the answer the editing tools get.
- An OLD text found zero times or more than once, or an EDIT to a file that does not exist.
- A path named on the command line that has no block.

Every file is staged beside its target (`<file>.apply-blocks-staged`) and renamed into place only when all are staged, so a file that cannot be written leaves the others as they were.

## Its tests

scripts/brief/apply-blocks.test.ts — BA-1…6. BA-6 names any other code that parses the markers: there is one parser of briefs.
FILE-END docs/features/brief-applier.md
```
