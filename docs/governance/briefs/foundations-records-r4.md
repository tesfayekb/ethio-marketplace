# Foundations — records turn R4: the block applier's fixes (records turn R3's reviewer), the slips S379–S454, the roadmap's owed lines, INC-938, INC-939 and INC-940 (G41): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — RECORDS TURN R4 (2026-10-27; G41; register row 58; anchors located at b70505f5427e11de86b9eb552a41a28b4149b655). First, the block applier's fixes from records turn R3's reviewer: its MAJOR — `writeAllUnder` stages a fresh file and renames it over the target, so an edited 0755 script comes back 0644 — and two MINORs — the rename step was not all-or-nothing (a directory at a FILE block's path left the earlier file placed, a staged file behind and a raw stack trace), and BA-6 looked only for the EDIT markers. Now an existing file keeps its mode, a directory at a target's path is refused before anything is placed, a rename that fails is a refusal naming what was placed with no staged file left, and BA-6 also names a parser of FILE blocks; red first. Then the records. The instructions record's §Slips (docs/governance/instructions-amendments.md) ends at S378; the supervisor's running record holds S379–S454. The running record also queued roadmap lines the roadmap does not yet carry (G41: an item queued under a short code has its line in the repository, or it is lost), and registered INC-938, INC-939 and INC-940 after records turn R2's import. This turn appends the slips word for word — each with the guardrail it names and its corrective, then the "also logged, not numbered" line — imports INC-938, INC-939 and INC-940 before the ledger's numbering line ("Numbering: next free INC-941."), writes the owed roadmap lines, and gives the old roadmap line "Turn 34 — the sign-in and sign-up test suite" back its own name (the number belongs to speed turn S11). With it the records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4). Every block is applied by the block applier. Tier B (a tooling script with its tests; records). No migration. No string. No package change. No product or workflow file. AGENTS.md unchanged. No file deleted. Base: dev b70505f5427e11de86b9eb552a41a28b4149b655 (records turn R3's landing; CI SUCCESS on b70505f5 (run 40504157476, completed 12:56:20Z; main promoted; no failing job)). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0 (the brief and roadmap line 3); B — the applier, red first; C — the slips, the three incidents, the register, the roadmap and the changelog (by the fixed applier); THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: b70505f5427e11de86b9eb552a41a28b4149b655
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/governance/instructions-amendments.md
docs/tracking/incidental-findings.md
scripts/brief/apply-blocks.test.ts
scripts/brief/apply-blocks.ts
SCOPE-END

THE SYSTEM (G0) — the applier, then the records.
APPLIER — CONCERN: a brief's exact text reaches the tree exactly, every file as it was meant to be — its bytes and its mode — or nothing lands (register row 58). MECHANISM: scripts/brief/apply-blocks.ts `writeAllUnder` (records turns R1, R3): a file that exists is staged with its mode (`chmodSync(staged, mode & 0o7777)`), a directory at a target's path is refused in the staging loop, the renames are guarded — a failure is an ApplyRefused naming the files already placed, every staged file cleared. CONSUMERS: every brief, both executors; the six tracked executable scripts are files a brief may edit. CONFORMANCE GUARD: scripts/brief/apply-blocks.test.ts — BA-4 also: a directory at a FILE block's path refused with nothing placed and nothing staged; an edited 0755 script still 0755; BA-6 also: a planted parser of FILE blocks named. Red first: the new test against R3's applier fails BA-4 (1 failed | 5 passed). EXCEPTIONS: none — BA-6 stays the applier's own census (R3's decision, the reviewer's MINOR noted). FIVE LENSES — security: a script keeps exactly its mode, never gains one · performance: none · failure modes: the subject · consistency: one writer · future growth: none.
RECORDS — CONCERN: every supervisor slip, every registered incident and every queued item is in the repository within one bundle (G41, G46; a successor reads the slips' correctives, the ledger and the roadmap, never chat).
MECHANISM: docs/governance/instructions-amendments.md §Slips (one bullet per slip: the guardrail, what happened, the corrective), docs/tracking/incidental-findings.md (one entry per incident, then the numbering line and the watch list) and roadmap.md (one line per queued item); applied by scripts/brief/apply-blocks.ts (register row 58).
CONSUMERS: the supervisor's session start and its rule work (G46: a rule adopted between versions is listed and carried into the next version), every brief's queue and INC references, the handover (G53).
COVERED HERE: S379–S454; INC-938, INC-939 and INC-940; the owed lines of INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843; the scenario suite's line. LEFT: the other "records owed" of block S77 (the two register rows numbered 13, INC-910's docs line, the guard debts named there) — the next records turn.
CONFORMANCE GUARD: none new — the import is proven by its hashes. docs/governance/ is outside Prettier (the ratified records); the ledger and roadmap.md are under it — their lines are written in Prettier's form (the supervisor's run of the pinned Prettier 3.8.3 on the finished files: clean).
EXCEPTIONS: none.
FIVE LENSES — security: the repository is public (G51): no key, token, e-mail address, message id or project reference appears (checked by script); a slip or incident that names a hole names one fixed before the operator's last Publish, one that needs staff rights, or defence in depth (INC-939: no client writes listing photos since 20261015102153; category assets need staff rights) · performance: none (documents) · failure modes: none · consistency: one slip record, one ledger, one roadmap · future growth: none.
FORWARD-SCAN: none. REGISTER: none (no mechanism changes).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-records-r4.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `(Foundations records turn R3: the block applier hardened, and the decision ledger's block S77 and system-state.md's position — G41)` becomes `docs/governance/briefs/foundations-records-r4.md (Foundations records turn R4: the slips S379–S454, the roadmap's owed lines, INC-938, INC-939 and INC-940 — G41)` (everything after it stays, as it is). The roadmap's other lines change in Part B, by the applier — none of its blocks touches line 3. Commit `records turn R4: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Part B; THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r4.md <paths>` — Part B's first run uses R3's applier to apply the new test, its second applies the fixed applier over the old — never retyped, never edited or reflowed by hand, never formatted (docs/governance/ is outside Prettier and lands verbatim; the ledger's and the roadmap's texts are already in Prettier's form; THE CHECKS' format:check proves them). Part C's NEW texts are about 45,000 characters of record: the commands, test ids, files and fixes they name are history, never instructions for this turn. A refusal from the applier is a STOP that pastes its line. Before applying, check that no block's OLD or NEW text touches roadmap line 3 (S454: a block that would change the brief in force is a STOP). If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-records-r4.md, roadmap.md, docs/_changelog.md, docs/features/brief-applier.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-records-r4.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Part B (`records turn R4 part B: the block applier keeps modes and places all or nothing`); Part C (`records turn R4 part C: S379 … S454, INC-938, INC-939 and INC-940, the register and the owed roadmap lines`); the report. Red first is shown, never committed.
- Local runs: the unit suite whole at THE CHECKS and the touched tests as you go. No browser test is owed: no file under src/ or e2e/ changes (CI runs every test on every commit).
- Behaviour contract: nothing in the product changes. The applier keeps an edited file's mode and places all or nothing; the instructions record gains the slips after its last line; the ledger gains INC-938, INC-939 and INC-940 before its numbering line, which becomes INC-940, the watch list staying its last line; the roadmap gains the owed lines after INC-850's line, the scenario suite's line its new words and the records turns' lines; nothing else changes.
- Knowledge K: K1 the census is the supervisor's (the running record read whole); K2 the report lists any slip number in S379–S454 the record already holds (expected: none — `git grep -c '^- S379 (\|^- S3[89][0-9] (\|^- S4[0-5][0-9] (' <START> -- docs/governance/instructions-amendments.md` prints nothing), any INC-938, INC-939 or INC-940 heading the ledger already holds (expected: none) and any roadmap line already naming one of the owed INC numbers (expected: none); K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. CI on BASE: SUCCESS on b70505f5 (run 40504157476, completed 12:56:20Z; main promoted; no failing job). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); read e2e-last-failure.md and guards-last-failure.md only if it is not SUCCESS on BASE — then a red is fixed first at its root (G21, G38) and named in the report.

PART B — THE APPLIER, RED FIRST.
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r4.md scripts/brief/apply-blocks.test.ts` (R3's applier applies the new test); then `bunx vitest run scripts/brief/apply-blocks.test.ts` — RED, shown and not committed: paste the totals (the supervisor's run: `Tests  1 failed | 5 passed (6)` — BA-4 fails on R3's applier).
B2. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r4.md scripts/brief/apply-blocks.ts` (the fixed applier over the old); then `bunx vitest run scripts/brief/apply-blocks.test.ts scripts/conformance/wired.test.ts scripts/conformance/non-null.test.ts` — paste the totals (the supervisor's run: 3 files, 10 tests, all passed). Commit Part B.

PART C — THE SLIPS, THE THREE INCIDENTS, THE REGISTER, THE ROADMAP AND THE CHANGELOG (by the fixed applier).
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r4.md --dry docs/governance/instructions-amendments.md docs/tracking/incidental-findings.md docs/features/brief-applier.md docs/governance/mechanisms.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/governance/instructions-amendments.md #1` · `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/features/brief-applier.md #1` · `EDIT docs/governance/mechanisms.md #1` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT roadmap.md #3` · `EDIT docs/_changelog.md #1` · `applied 8 block(s) to 6 file(s)`). The blocks:
EDIT docs/governance/instructions-amendments.md #1
OLD-BEGIN
- S378 (G16 addendum) — two expectations in one brief were never executed: B8 expected service_role EXECUTE on all three revoked doors (two never had it), and CG-5 assumed refused calls count toward a dial (rate_gate's increment rolls back with the door's RAISE — INC-844). Corrective: ruling 3 withdrew CG-5 and registered the class; a brief's proof lines about grants are read from the live catalogue before they are written.
OLD-END
NEW-BEGIN
- S378 (G16 addendum) — two expectations in one brief were never executed: B8 expected service_role EXECUTE on all three revoked doors (two never had it), and CG-5 assumed refused calls count toward a dial (rate_gate's increment rolls back with the door's RAISE — INC-844). Corrective: ruling 3 withdrew CG-5 and registered the class; a brief's proof lines about grants are read from the live catalogue before they are written.

SLIPS (the supervisor's, with the guardrail each names) — S379 … S452, the Foundations bundle (2026-10-23 12:0xZ → 2026-10-26 22:5xZ)
- S379 (G23; 2026-10-23 13:0xZ) — the turn-28 brief took the executor's attributed sequence as PW-153's cause without reading the debounce (use-draft.ts `DEBOUNCE_MS = 2000`); turn 28's producer fix stands as a real improvement but was not PW-153's cause; INC-809 reclassified back to TEST. Corrective: bundle 22 turn 32 Part A carries the test's wait (awaitDraftSaved — `post-save-state` data-state="saved") with its G29 census.
- S380 (G16 — a draft brief written with inline self-corrections; 2026-10-23 13:5xZ) — the first draft of the turn-32 brief (09:03) carried "No — …" and "STOP: do not invent one" inside D3, C1 and F1 — thinking left in the executor's text; caught on the re-read after compaction and rewritten whole. Corrective: a brief is composed from a settled design, never drafted while deciding (G16's scan now also greps for "No —", "STOP:" and "?" inside a step).
- S381 (G3 — INC-846's cause asserted from one run; 2026-10-23 13:5xZ) — the 12:4xZ entry wrote the PUBLIC-default cause as decided; attempt 2's green lint step on the same code showed it was a hypothesis. Corrective: a CI number is a cause only after two runs agree or the names are read. (Confirmed later: the turn-32 PUBLIC line "was aimed at the wrong grantee (S381's lesson: the names decide)", 2026-10-24 02:3xZ.)
- S382 (G37 — the owed-test census after a contract change; 2026-10-23 18:3xZ) — the turn-32 brief named SU-3 and the new SU-4/SU-5 but not the file's other form drivers (A-1+A-2 via signUpFresh, SU-1, SU-2) nor the nightly's own copy of signUpFresh (e2e/nightly/auth-resend-exhaustion.spec.ts :15-:27 — a duplicated helper, K2); run 39980672474 on `53191533` red by the email lane only (class (c), named late). Corrective: a contract change on a form lists every test that drives that form by grep of its test ids/buttons across e2e/ AND e2e/nightly/, and a duplicated helper moves onto one (ruling turn 3: e2e/helpers/auth-form.ts signUpThroughForm).
- S383 (G49/D235; 2026-10-24 02:3xZ) — turn 32's brief chose links UNDER the sentence to dodge Amharic's inflected names instead of the standard rich-text link-token pattern (a translator-controlled `[text](role)` token per language — react-intl's `<link>` tags, GOV.UK's inline links); the operator had to flag it. Corrective: the component takes link tokens in the sentence; the existing sentences get NEW keys with tokens (D5 — the Translations store's approved rows outrank the file, so the old keys cannot be edited in place), the old keys retired (bundle 22 turn 33).
- S384 (G34 — second occurrence of the class, turn 30's M20 stop the first; 2026-10-24 03:1xZ) — a brief that lands a mechanism (a token renderer, readerFailure) said "No AGENTS.md change"; the executor's rule ("record or replace its rule in AGENTS.md before finishing") stops the turn every time — turn 33 stopped before STEP 0. Corrective: class rule → check-brief.py "agents-line-missing" (a brief with "No AGENTS.md change" that also carries MECHANISM: NONE YET / a new shared export is a hit; proven on the turn-33 brief); ruling: AGENTS.md replaced byte for byte from AGENTS-turn-33.md (sha256 5556c6ae…). (The rule caught the same class before sending on 34b-2, 2026-10-26 14:2xZ — "no slip".)
- S385 (G3 addendum 2 — a partial read; 2026-10-24 04:1xZ) — bundle 22 turn 33's C2 said "the admin documents list carries each version's `texts` — legal-service.ts :13"; that line belongs to the version-detail type; admin_legal_documents() omits texts; the executor stopped correctly (G34). Corrective: a field claimed on a door's answer is read in the door's SQL (the jsonb_build_object), never in a client type by line number (M22 added `'languages'`).
- S386 (G0.6 PERFORMANCE lens; 2026-10-24 04:1xZ) — turn 33's Part D placed readerFailure in error-text.ts, which is in the entry's closure, so ~0.5 KiB rode the first paint (run 40057679164: JS 305.5/305 KiB); the lens named "one regex" and forgot the module's position. Corrective: a new shared helper names its chunk — entry or lazy — in THE SYSTEM header (the split into reader-failure.ts; the ceiling to 306).
- S387 (G0.3 — a partial census of the callers at ruling time; 2026-10-24 04:4xZ) — the ruling named readSellerIdentity's "caller" in the singular; wizard.tsx :386 and step-review.tsx :271 call it with `void …then(...)` and no catch (INC-849). Corrective: class rule — null→throw lists every caller by grep and each lands its catch; both callers catch in the same turn.
- S388 (G3/G16 addendum; 2026-10-24 07:1xZ) — the Foundations turn-1 enumerator census counted e2e/post-wizard-where.spec.ts :83 on the word `glob` (`for (const glob of ["**/api/listings/**", …])`) without reading the line — an unexecuted expectation; the executor stopped at C4 (the seventh non-guard allowance would be stale). Corrective: a census line in a brief is read at the cited line, never matched by word (21 allowances).
- S389 (G36/G44 and the operator's standing rule of 2026-10-11; 2026-10-24 07:4xZ) — the first connector-era check-in was set at 30 minutes, so Lovable sat idle after finishing (the operator, 03:38 local: "i see lovable is done but you seems to have stoped giving it a prompt …"). Corrective, in force: while Lovable works, a poll every 3 minutes (get_message), the next ruling sent in the minute it finishes, the next brief prepared between polls; the stale 30-minute check-in could not be deleted (the harness denies the delete) and fires harmlessly.
- S390 (G16 addendum / G3; 2026-10-24 07:5xZ) — the continuation-2 ruling stated "HTTP 403 … PostgREST's mapping" as an expectation without executing it; the executor's probe showed 401 with body `{"code":"42501",…}` for the anonymous role and corrected it in the same breath (G3 addendum) — the second unexecuted expectation of the Foundations turn-1 brief (S388 the first). Corrective: LGC-6 asserts 401 + body.code "42501" with a comment naming the mapping (the observed contract, not a loosening).
- S391 (G0.6 performance lens — S386's class, second occurrence; 2026-10-24 08:2xZ) — the Foundations turn-1 brief (D4, D5) put page-only code into two first-paint modules (legal-reader.ts, legal-kinds.ts; both imported by use-legal-gate.ts :6-:7) without checking their place in the closure; run 40075831535 red on the budget (306.2/306) — INC-864. Corrective: THE SYSTEM header's performance lens names, for every file the brief touches, whether it is in the first-paint closure (bundle-closure.mjs's entry closure), and a page-only export never enters a first-paint module (MUST_STAY_LAZY).
- S392 (G37; 2026-10-24 08:2xZ) — the Foundations turn-1 owed-test census after a role/contract change (E5) listed TR-41/27/37 and the unit tests but not shell.spec.ts :300, whose locator `getByRole("menuitem", { name })` names the role a plain menu item has (a DropdownMenuRadioItem is role menuitemradio). Corrective: the owed-test census after a role/contract change greps e2e/ for the role name, not only the test ids.
- S393 (G16 addendum — an unlocated anchor; second occurrence with S392 = anchors in test files; 2026-10-24 09:32Z) — Foundations turn 2's B3 gave the new upstream tests the ids UP-1…UP-3, which src/server/supabase/upstream.test.ts :89/:123/:136 (INC-574) already carries — not grepped before the brief was sent (the test-ids guard TI-1 exists for exactly this). Corrective: every test id a brief assigns is grepped against the repository before delivery; check-brief.py rule new-test-ids-free; corrected in the ruling: UPS-1…3.
- S394 (G0.6 lenses vs the order; 2026-10-24 09:55Z) — the turn-2 brief's B4 placed the counting reader in step (2), before the caller — the brief's own order put a read before the authority while its security lens claimed the opposite; the executor built what was written (INC-865). Corrective: a mechanism brief's ORDER is checked against its own five lenses line by line before delivery (each lens sentence must be true of the order as written) — added to the pre-flight.
- S395 (the INC-076 deletion guard; 2026-10-24 10:2xZ) — the 09:32Z ruling moved legal-page-data.test.ts's tests to legal-kinds.test.ts without naming the deletion manifest (docs/tracking/intentional-deletions.txt); CI on `eefd1141` (run 40084153912) failed the deletion guard; the executor cannot write a commit marker (the platform commits). Corrective: class rule — a brief, ruling or prompt that removes, empties or moves a file whole names the manifest line in the same sentence; check-brief.py rule deletion-without-manifest; turn 3 A1(a) adds the path line.
- S396 (G16; 2026-10-24 10:5xZ) — Foundations turn 3's range "RT-1…RT-14" kept an id (RT-13) whose test was removed in editing. Corrective: class rule — after any edit that removes a test, the brief's id ranges are re-derived from the test list; check-brief to gain a range-vs-definitions rule.
- S397 (INC-388 — a "risk noted", numbered as such; 2026-10-24 10:5xZ) — the turn-3 continue did not re-carry the AGENTS.md text inline (an attachment is readable only in the turn it arrives); "if F1 stops for it, resend". The record does not show F1 stopping for it: turn 3 closed on `9aaf7db3` with AGENTS.md sha b4711479… equal.
- S398 (the schema from one caller; 2026-10-24 11:1xZ) — Foundations turn 3's C1 stated "sent by use-draft.ts bodyFor :234-:269 with EVERY key present" and wrote `listingId` without `.optional()`; the e2e helpers were not grepped; the executor's local Part-C run covered unit tests only (the brief put the E2E check at the END of the turn), so the defect reached CI (run 40087352763: 129 gating E2E failures, one cause — INC-868). Corrective: class rule for briefs — a schema's required keys are derived from EVERY caller found by grep of the path string (src/** and e2e/**).
- S399 (S398's class, two in one brief; 2026-10-24 12:2xZ) — Foundations turn 3's assist schema (`period` enum, `listingId` non-null) and photos.$id (`position` int schema answering badShape where PP-17 pins badValue) were written from reading the handlers, not the callers and the tests. Corrective: class rule in turn 4's HOW TO WORK — every schema begins from a caller census of src/** and e2e/**; the brief's schemas are drafts.
- S400 (CHANGE lines vs their pins — the third such class rule in one session with S398/S399; 2026-10-24 13:1xZ) — Foundations turn 4's D1 CHANGE (background malformed id → badShape) contradicted PP-31's pinned `badValue`; the brief did not grep the E2E pins for the answers it changed. Corrective: a brief's CHANGE line is written only after grepping e2e/** and src/**/*.test.ts for the answer it changes; the pinning tests are named on the CHANGE line (done by hand at drafting; check-brief gains no rule).
- S401 (G3 addendum 2 — a claim about code written without the decisive lines read verbatim; 2026-10-24 15:50Z) — turn 7's CHANGE (4) said the options route served a fresh cache hit before the caller check (:128-:129); the executor read :118-:129 and showed the caller check already ran first (the security property held before and after). Corrective: a CHANGE line that asserts today's order quotes the lines it relies on.
- S402 ("a repeat of an earlier one"; 2026-10-24 16:52Z) — a `cat >> file` with no stdin hung a shell for 2 minutes again. Corrective: record appends go through the Write tool and a single cat of that file.
- S403 (G3 addendum 2; 2026-10-24 18:00Z) — turn 9's CHANGE (2) said geocode entries would live "until the next UTC bucket"; versionCache skips the version read within ttlMs (version-cache.ts :33-:34), so with ttlMs = 24 h and a 24-hour bucket the lifetime stays exactly 24 h from insertion; the executor caught it before writing code. Corrective: a cache CHANGE line is derived from version-cache.ts's read path, quoted, not from the version function alone (ruling: CHANGE (2) corrected to the bound only; GEC-4 added).
- S404 (an unexecuted schema; 2026-10-24 18:50Z) — the `coordinate` schema was written into turn 9's brief and never typechecked (in zod 4, z.coerce.number() has unknown input); the executor's local checks don't typecheck (the platform rule leaves that to the harness), so CI was the first typecheck (run 40120074214: primitives.ts(50,33) TS2345). Corrective, standing: every schema a brief spells is compiled by the supervisor first (tsc --strict against zod 4.6.7 in the scratchpad).
- S405 (G3 addendum 2 / G16 addendum — an anchor read by grep hit; 2026-10-24 21:45Z) — turn 12's CHANGE (6) called e2e/import-security.spec.ts :121/:181/:234/:250 request bodies; they are the `Family` table's `digest: true` configuration flags (read at :819 `if (family.digest === true)`); the executor correctly removed only the two body keys (IG-5/IG-6). Corrective: brief anchors that name a line's role are read with ±5 lines before the role is stated.
- S406 (G36 / §8 PROMOTE STATE — a stale rule source; 2026-10-24 23:16Z) — the supervisor told the operator a push cancels the CI run in progress; ci.yml :31-:33 at `eb5ae864` reads `cancel-in-progress: false` — a running run always finishes and the next waits (a newer push replaces a waiting run, never the running one); the operator had said so repeatedly. Corrective: the next prompt goes out as soon as the turn is verified on dev; the previous run is read when it lands and a red is fixed first in the next prompt; amendment owed to G36 at the next instructions version.
- S407 (G37 — local E2E sizing; 2026-10-25 00:27Z) — turn 14's THE END-TO-END CHECK asked two whole spec files plus up to five more — beyond G37 (at most three spec files locally) and the 600 s sandbox ceiling; it cost two continuation segments. Corrective: briefs size local E2E to the moved surface within the ceiling (≤ 3 files), and allow one `bunx tsgo --noEmit` at THE CHECKS (applied in turn 15; that allowance is the first half of S409 — the replacement brief: harness log only + CI judges types).
- S408 (caught before sending; 2026-10-25 00:42Z) — compose.py replaced the placeholder DATE inside "UPDATE" (UP2026-10-25 ×3 in turn 15). Corrective: the composer replaces whole words only; turns 11–14 checked clean.
- S409 (the executor's platform rules; 2026-10-25 00:45Z) — (1) the supervisor turned a one-off accepted departure (`bunx tsgo`) into a standing exception against a platform rule; (2) wrote an auth.users FK (ai_calls.actor_id) without reading the repository precedent (public.profiles(user_id) ON DELETE SET NULL ×5); turn 15 stopped on both. Corrective: replacement brief — harness log only + CI judges types; actor_id → public.profiles(user_id) ON DELETE SET NULL; check-brief.py should gain a rule: no "auth.users" reference in a new table (follow-up).
- S410 (the generated types; 2026-10-25 01:15Z) — ai_record_call's parameter list was specified without checking how the generated client types render nullable SQL parameters (they are optional only when defaulted and trailing); turn 15's fourth STOP (TS2322). Corrective: M2 redeclares ai_record_call with p_actor and p_provider_status trailing DEFAULT NULL (mark 20261025150000).
- S411 (G34 — the scope list must contain every file its steps require; 2026-10-25 04:17Z) — turn 18's brief named the rule's shape requirement (src/lib/schemas, .strict()) but not its file; the executor stopped on scope. Corrective: ruling — NEW src/lib/schemas/category-image.ts authorized (turn-16 precedent).
- S412 (G16 addendum — every expected value located in the clone; 2026-10-25 04:38Z) — turn 18's Part D expected route-client.test.ts's INC set to be INC-861 only, written without reading the allowlist's third line (the tile-host probe, leaflet.ts, INC-875, stays); the executor's second STOP. Corrective: ruling — the set stays [INC-861, INC-875].
- S413 (G34/G0.3; 2026-10-25 04:53Z) — turn 18's retirement census missed the third copy of the route allowlist (eslint.config.js :111–113 ROUTES-BOUNDARY-IGNORES) — the brief named two allowlists and the census grep did not cover eslint.config.js; the executor's third STOP. Corrective: ruling authorizing the three ESLint lines; vendor count corrected 71 → 69; owed: one source (the allowlist) feeding the lint ignores, or a test that the two agree (CF-RT-5 later named in turn 20's brief).
- S414 (the INC-076 deletion guard — S395's class; 2026-10-25 05:10Z) — turn 18's brief named the four retired files' deletions but not the declaration in docs/tracking/intentional-deletions.txt (the interim runs on `36c6b9fa`, `57d0fe58` red on the deletion guard; the executor's fourth STOP: the manifest out of scope). Corrective: ruling 4 — declare the four paths; owed in turn 19's HOW TO WORK: a deleted file's declaration line goes in the same edit as the deletion; check-brief's rule "exists but did not fire — check it".
- S415 (minor — brief wording; 2026-10-25 05:10Z) — turn 18's brief called callRoute's option `body`; it is `json` (a disclosed departure, accepted).
- S416 (G16 addendum; 2026-10-25 09:37Z) — turn 19's draft anchors were not re-executed when it was written; at `37f691b4` two had moved by one line (postTranslate :440, listProviderLanguages :504). Corrective: anchors re-located when the brief was rewritten for Claude Code.
- S417 (G7/G3; 2026-10-25 09:4xZ) — the supervisor told the operator "I start it from here" (the smoke question) without having tested `claude --cloud` from this workspace; the plan marked the channel "to test"; it needs a TTY and the workspace proxy refuses platform.claude.com. Rule: a capability promised to the operator is tested first, or labelled untested in the promise. (The channel deviation, G10: the operator starts the sessions.)
- S418 (G16 addendum / G0.4; 2026-10-25 09:4xZ) — kit v1 shipped with a permission list never checked against the protocol it serves; the dev-landing rewrite changed the protocol and the hooks but not settings.json's PR-era denies (INC-882). Corrective: EXH-16 is the guard (every protocol command through the permission rules and the guard).
- S419 (SECOND occurrence of S389's class — G36/G44 and the operator's rule of 2026-10-24 03:38 local; 2026-10-25 13:19Z) — after sending turn 20 the supervisor scheduled a 25-minute check-in, so Lovable's two quick STEP 0 stops sat until the operator relayed them (09:19 ET: "lovable gives a quick response but you schedule your check for very long time and miss the lovable stopes sitting for long time"). Corrective, in force, mechanical: after EVERY send_message to Lovable, a 3-minute timer (background sleep 180 → re-invoke) and get_message on each wake until the turn ends; the next ruling within the minute it finishes; the next brief prepared between polls. Class rule: the operator-rule list carries "Lovable poll = 3 minutes", checked before any connector send (to be installed in instructions v1.15 as a G-rule addendum).
- S420 (G0.3 — "a census enumerates by the concern's definition, never by the name"; 2026-10-25 13:3xZ) — the turn-20 pre-flight grepped `SCRATCH_KIND` (the name) and found two copies; the pattern literal had a third (legal-service.ts :105); the brief's own SFN-3 (a pattern grep) caught it before landing. Corrective: a pattern census greps the literal, not its local name (ruling R1: legal-service.ts joins the files).
- S421 (polling the branch head instead of the message; 2026-10-25 16:12Z) — dev's head moved at 15:57:34 and the supervisor did not read the executor's message then; the executor sat idle about 14 minutes until 16:11 (turn 23). Rule in force: every 3-minute poll reads get_message (the first poll of a brief turn reads only `.response` by jq from the saved file), and a moved head is read at once.
- S422 (G0.2 / G54 c at brief time — a new control written without reading how its siblings render; 2026-10-25 16:54Z) — turn 24's NEW calendar retry was a raw `<button>` while the shared Button primitive (src/components/ui/button.tsx) was in reach and the repository's own "Try again" controls (legal-accept-screen.tsx :108, certify-block.tsx :81) already use `<Button variant="outline">`; turn 24 stopped before STEP 0. Rule: the pre-flight reads the sibling census of every new UI element by its concern (here every `common.tryAgain` control) before the brief is generated; the form kit's Button census guard (INC-899) makes it mechanical.
- S423 (the S422 class twice in one hour; 2026-10-25 17:10Z) — turn 24's new code was not checked line by line against AGENTS.md before sending (B1's `routes[id]` / `budgets[id]` against "A map indexed by an outside key is read through `ownValue`, never `map[key]`"); two executor stops (5.7 credits, ~35 minutes). Rule in force: before any brief is generated, the prototype's whole diff is read against every line of AGENTS.md and the platform rules the executor has quoted (raw <button> → Button; map[key] → ownValue or a Map; no silent catch; e2e only through e2e:local), and the brief's header names the check.
- S424 (G16 addendum — an expected-output clause not executed against the prototype; 2026-10-25 19:05Z) — turn 26's brief said `bun run i18n:usage` "expected: no change" without running it; a new src module moves the map's scanned count (569 → 570); the executor reported it as a departure. Rule in force: every "expected" line of THE CHECKS is produced by running the command on the prototype, i18n:usage included.
- S425 (the S422/S423 class, third occurrence that day; 2026-10-25 20:10Z) — the S423 line-by-line read listed the rules quoted so far and missed one the platform has always had (no TypeScript non-null assertions); the repository's own e2e files carry `baseURL!` (shell.spec.ts :553, feed-screens.spec.ts :430/:503, post-wizard-where.spec.ts :1007), which made the copy look precedented; turn 28 stopped before STEP 0. Class rule, now a script: check-brief.py gains `non-null-assertion` (proven on the 20:09 brief: 3 hits, exactly the three); fix: `url: baseURL`.
- S426 (second occurrence of the raw-control class after turn 24's stop; 2026-10-25 22:14:41Z) — a raw `<button>` in a test FILE block (turn 30's C6 provider-layers.test.tsx Asker); the brief checker covered `!` but not raw buttons, and the supervisor's reading treated tests as outside the control rule; turn 30 stopped before STEP 0. Corrective: the Asker uses the shared Button; check-brief.py gains [raw-button] for every .tsx FILE block and EDIT NEW text, tests included.
- S427 (the S395 class, second occurrence; 2026-10-25 23:15Z) — the turn-30 brief (B8, "Delete src/i18n/locales/admin-layer.test.ts … and src/i18n/compiled-admin-loader.test.ts") deleted two files without the declaration line the deletion guard requires (run 40241386426 red — INC-905); check-brief.py's [deletion-without-manifest] existed but matched only "delete the file / is deleted / are removed …", not the imperative "Delete <path>"; sim30 did not model the guard. Fixed: the rule's pattern also matches delete/remove/git rm/rm followed by a repository path (backup check-brief.py.bak-s427); proven red on the turn-30 brief (line 1218).
- S428 (a header claim nothing checked; 2026-10-25 23:45Z) — turn 31's brief header said "Checked by script … no map read by an outside key", but nothing checked the new code for it (CF-OV-1's MAY_REACH[key] with an outside key); turn 31 stopped before STEP 0. Fix: overlays.test.ts reads `ownValue(MAY_REACH, key)`; check-brief.py gains WARN [own-key] (backup check-brief.py.bak-s428). (Promoted to a hit by S449.)
- S429 (G0.6 failure-modes lens; 2026-10-26 01:45Z) — the turn-32 brief's ModalRoot carried a failure path for uncontrolled roots only — the lens named OVF-16 (uncontrolled) and stopped; the prototype was never tried with a controlled root whose download fails, though 22 of 23 consumers are controlled (INC-908). Rule in force: a mechanism's failure-mode lens enumerates the consumer KINDS the census found (controlled, owner-opened, uncontrolled) and the brief carries a failure test per kind.
- S430 (G6 and G40 — read the record before stating CI behaviour; S406's class; 2026-10-26 02:40Z) — the supervisor told the operator that 32b would not push until turn 33's CI had finished, "so pasting it won't cancel that run"; DEC-181 already settles this: runs queue (cancel-in-progress: false; .claude/rules/40-ci-evidence.md), and a landing never cancels a running run. The operator: "I kept telling you even if pushed, it will be queued, not cancel earlier ci run". Corrective: the records turn and v1.15 correct G36 and §8's PROMOTE STATE line (G36's "a push cancels the run in flight" predates DEC-181).
- S431 (G34 — every step performable within its scope; 2026-10-26 03:25Z) — (1) the turn-32b brief planted its proof (`import "vaul"`) in src/components/app-shell.tsx, outside its own SCOPE, so the scope guard refused it; (2) it said vaul and cmdk have "no importer today", but drawer.tsx :2 and command.tsx :5 import them. The executor's correction accepted. Class rule: a planted proof goes in a SCOPE file; check-brief should flag a plant path outside SCOPE (guard debt for check-brief.py). Ruling 1 as a brief: the plant in overlay-facade.tsx.
- S432 (G33/G34 and G0; 2026-10-26 06:3xZ) — turn 34's ruling 2 widened SCOPE in prose instead of the brief form the kit reads (BASE, FLAGS, SCOPE block, roadmap line 3 — the form of foundations-turn-32b-r1.md, the supervisor's own precedent of the same night), and it carried no THE SYSTEM header; turn 34 STOP 3 (seven new files refused). Class: a ruling that changes SCOPE is a brief. Corrective: every ruling that adds a file is written as a brief in that form and its scope is checked with the kit's own scopeVerdict on a simulated STEP 0 before it is sent.
- S433 (G0.3 at brief time; 2026-10-26 08:2xZ) — ruling 2's R2-3 changed what requestPasswordReset answers without the census of the screens that read the answer (the reviewer's BLOCKER: auth.tsx :391-:397 → "a reset link is on its way" for a request that never left the browser). Corrective: a contract change carries the census of its callers, and now a guard (AAN — scripts/conformance/auth-answers.test.ts).
- S434 (G16 addendum — an expectation written, not executed; 2026-10-26 09:3xZ) — ruling 3's R3-1 said SBE-1…4 pass before R3-2, but BLOCK D's SBE-4 already looked for the `auth-error` test id that R3-2 adds (e2e cannot run in the supervisor's workspace, and the block was not read against the BASE screen). Corrective: a red-first line for a browser test names, for each test it says passes, the test ids it reads and where they exist at BASE. Addendum: 34b's stale-chunk test was first named SC-6, an id e2e/admin-screening.spec.ts :416 already uses — TI-1 caught it in the supervisor's full run; renamed STC-1 before the brief went out.
- S435 (minor — G16 addendum; 2026-10-26 10:3xZ) — K1's brief stated 23 hook tests where its exact blocks give 22 (EXH-0…21) — a count written, not run.
- S436 (G0.3; 2026-10-26 11:0xZ) — K1 ruling 1's substitution matcher counted parentheses without reading quotes, and the delimiter reading it relied on was never checked against the shell's quote removal — a fix written for the four spellings in hand, not for the concern's definition (the reviewer's two findings, reproduced). Corrective: ruling 2 (quote- and escape-aware substitution end; the delimiter after the shell's quote removal).
- S437 (a change that weakened what it was meant to tighten; 2026-10-26 11:4xZ) — ruling 2's fallback discarded the expanding-body read it replaced (`cat <<EOF\n'$(at now)'` went 2 → 0), missed because the supervisor tested the new spellings, not the old ones against the new code. Corrective: DEC-269 (two readers) in ruling 3; later the before/after corpus (123 cases) at ruling 5.
- S438 (the executor's no-non-null-assertion rule — S425's class; 2026-10-26 11:5xZ) — rulings 1–2 had already added two non-null assertions (`cur += cmd[i]!`, `heredocs.shift()!`), which Lovable applied without flagging, and ruling 3's R2 added three more (`cmd[i]!`, `cmd[k]!`, `pending.shift()!`); Lovable stopped before ruling 3's STEP 0. The supervisor wrote new code in the surrounding file's style instead of the executor's rule. Corrective: ruling 3 rebuilt — all five replaced (`cmd.charAt(…)`; `shift()` narrowed by an early-return guard); the 27 older assertion lines in lib.ts/land.ts left for a kit turn (named in K2; later INC-932 and turn K2).
- S439 (a second reader of one concern; 2026-10-26 12:1xZ) — ruling 3 wrote a second delimiter reader in blankInertData beside the tokenizer's, and it split a quoted word at its space (`cat <<'A B'\nfix at root\nA B` refused — a refusal of inert data ruling 3 introduced). Corrective: ruling 4 — ONE word reader `wordEnd` for both delimiter readers.
- S440 (minor — recorded after S441/S442 in the same entry; 2026-10-26 12:3xZ) — ruling 2's roadmap title held `")"`, so the next step 0's "up to its closing parenthesis" left a residue on roadmap line 3 (still there at r4; 34b-1's roadmap edit removes it).
- S441 (found by the supervisor's 123-case corpus; 2026-10-26 12:3xZ) — ruling 4's one word reader kept ruling 2's quote removal (every quote and backslash stripped), so `<<'A\ B'` ended at "A B" — later than the shell's `A\ B` — and `cat <<'A\ B' > /tmp/x\nhi\nA\ B\nat now\nA B` hid `at now` (refused before K1, allowed at r4). Corrective: DEC-270 — heredocDelimiter (POSIX 2.7.4 quote removal, measured against bash for nine spellings) as the one delimiter reading.
- S442 (guardrail not named in the record; 2026-10-26 12:3xZ) — DEC-269 called data "provably inert" without asking who consumes it — `bash <<'EOF'\nat now\nEOF` and `cat <<'EOF' | bash\nat now\nEOF` allowed from ruling 3 to ruling 4 (refused before K1). Corrective: DEC-270 — data is inert only where its consumer never runs it (DATA_ONLY).
- S443 (minor — G16 addendum; 2026-10-26 13:4xZ) — the 34b-1 brief expected S-1 and SO-11/R-9 "2 passed" on both projects; playwright.config.ts :66-:73 keeps settings, auth-signin-errors and auth-reset off the desktop project, so S-1 runs once — a count written, not read from the config.
- S444 (AGENTS.md's UI lines; 2026-10-26 14:2xZ) — the 34b-2 brief's new shell notice was drawn `rounded-md border border-neutral-soft bg-card … shadow-bar` against AGENTS.md :37 "Shell: cards take `CARD_SURFACE` (no 1-px border; state borders on top)"; 34b-2 stopped before STEP 0. Corrective: check-brief.py gains [card-border] (proven: hits the 10:20 brief, passes the corrected one; backup check-brief.py.bak-s444); the notice = `cn(CARD_SURFACE, …)`.
- S445 (G0.3 and G38; 2026-10-26 15:0xZ) — INC-923's census enumerated the routes' code, not every consumer of the concern — the shell's list (`ownSignIn`, app-shell.tsx :739-:773) is a second copy of "which pages send to sign in" (INC-925); and S-1 (e2e/settings.spec.ts :21) is a weak proof: waitForURL(/auth) passes on the transient /auth and expectSignedOut passes on Home (it must prove the page stays). Corrective: requireSignedIn gains one exported list of its pages (SIGNED_IN_PAGES), read by the shell, with a census both ways and a browser test over every page (turn 34w).
- S446 (G0.3 / owed-test census; 2026-10-26 15:3xZ) — 34b-2 added a page-wide element with a generic ARIA role to the shell (the OnDemandNotice wrapper `<div role="status" aria-live="polite">`, always drawn, empty) without a census of the tests that query that role (auth-reset.spec.ts :47, :144; settings.spec.ts :127 scoped to its form; legal-admin.spec.ts :989 filtered); run 40345497360 red on R-2 and R-4. Corrective (first part of turn 34w): the always-present live region keeps aria-live="polite" and drops role="status"; ODN-2. (Its class's second and third consumers: INC-929.)
- S447 (G50 / "executor turns come first"; 2026-10-26 15:5xZ) — Lovable sat idle from 34b-2's end (~15:03Z) to 34w's sending (~15:5xZ) — about 50 minutes — while the supervisor diagnosed the walk and CI, built 34w and re-ran units serially; 34b-3 was ready and could have gone at once with the red's one-line fix folded in, and 34w built beside it. The operator, 11:46 local: "WHY IS IT TAKING SO LONG AND WHY DID WE NOT DO THIS INBETWEEN WHILE LOVABLE IS WORKING … Its been almost 30 mins with lovable not doing anything". Corrective: when an executor turn ends, the next prepared brief goes within minutes (folding any red's fix in first); new work is built beside the running turn, never in front of an idle executor.
- S448 (G3 — the decisive line unread; 2026-10-26 16:21Z, recorded with the diagnosis at 16:5xZ) — turn 34w's brief changed hardReset's offline branch to keep the in-app `navigate({ to: "/" })` without reading what that navigation asks of the network (the root loader's server read on a same-href navigation — router-core's reload rule); the supervisor could not run SO-12 locally (no backend) and said so, but did not read the router's reload rule; 34w ended NOT READY (INC-927). Corrective: an offline-path change reads every loader the navigation runs (router-core's reload rule) before it is briefed; DEC-272.
- S449 (a WARN judged away; 2026-10-26 17:1xZ) — check-brief's own-key rule WARNed on 34b-3's `DEFINERS[definer] ?? []` and the supervisor "judged it" safe (the key comes from Object.keys) — the executor's rule has no such exception; 34b-3's first sending stopped before STEP 0 (16:34Z). Corrective: the own-key WARN is promoted to a hit in check-brief (Lovable mode): a WARN the executor's own rule would STOP on is a hit.
- S450 (S447's class again; 2026-10-26 17:1xZ) — the supervisor sent 34b-3 with wait=false and did not poll; the STOP sat unseen 16:34Z→17:10Z (~36 min idle executor). Corrective: after every send, poll at ~2 min and then at least every 10 min until it finishes.
- S451 (G43's class — S88's sibling; 2026-10-26 20:00Z) — turn 34c-2's message was NOT byte-equal: its last FILE-END line named scripts/conformance/project-reads.test.ts instead of src/features/session/session-policy.test.ts (one line; a long brief retyped into the send call); the read-back by list_messages caught it; the executor's STEP 0 sha check stopped it (saved 9cbbb95e…, 55,766 B vs d058f2b5…, 55,768 B; STOP 1 at `cd3e00dd`, 20:05Z). Corrective: the exact text resent at 20:08Z, byte-equal by list_messages.
- S452 (§8 — the nightly is read when it is the red; 2026-10-26 22:4xZ) — from 2026-10-19 to 10-26 no nightly evidence was read; seven red nights passed without a disposition, found only while sizing INC-935's job deadlines (INC-936). Corrective: the ritual and every CI read include nightly-status.md's date and conclusion (a red or a date older than a day is read the same turn); proposed as a check in the CI read tool (claude/ci-read-tool.md).
- S453 (G0.3 and G55 — the S422 class: a brief's new code checked against the rules before sending; 2026-10-27 02:1xZ) — turn 34d's brief wrote a new e2e helper (e2e/helpers/route-guard.ts :13) that read a caught error's text by hand, against .claude/rules/10-code-laws.md F4 ("A caught error's text is read through `errorText` / `errorWithStack`"); the brief's census covered the route concern but not "a caught error's text", which the new code also carried; found by the executor's reviewer (MINOR 3) and widened into INC-937. Corrective: check-brief.py --cc refuses a brief whose new code reads a caught error's text by hand ([error-text], proven on 34d's brief); the helper's site moves onto errorText in turn 34c-4.
- S454 (G16 addendum — an expected result is produced by running it, never by agreeing with itself; 2026-10-27 11:0xZ) — records turn R2's brief carried `EDIT roadmap.md #1` backwards: its OLD was line 3 as STEP 0 leaves it (naming R2), its NEW BASE's line 3 (naming R1), so applying it would have undone STEP 0 and made land.ts judge the landing against R1's brief. The cause: the roadmap script of the prototype left line 3 unchanged ("STEP 0's hand edit") while the generator diffed from a base with line 3 already changed, and the supervisor's simulation compared the turn's result with that same wrong prototype and passed. The executor dry-ran Part B, saw it and stopped (stop 1, 6bc50221) — the right call. R3's scripts carried the same defect. Corrective (mechanism, in the supervisor's tooling): every generator asserts that the prototype's roadmap line 3 names the brief being generated, and the roadmap scripts make STEP 0's line-3 edit themselves; R2 went out as v2 in a new session, and R3's scripts were fixed the same hour.
- Also logged, not numbered: records turn R3's step C2 expected the ledger's last numbering line to end "S454" while block S77's own text, updated when S454 was registered, ends "S455" (the block was brought level, its expectation line was not — the executor reported it as a departure and left the record as the block wrote it, which is right; 2026-10-27 12:5xZ); the supervisor's "pkill slip again (minor)" (2026-10-26 15:5xZ — `pkill -f "node dist/server/index.mjs"` matched its own shell's command line and killed it; servers since stopped by their saved pids); a full unit run edited mid-run and a second overlapping it in the same log (15:5xZ — both discarded: a full run starts after the last edit, one at a time, its own log); the generator lessons of 2026-10-25 16:50Z (a placeholder alternation matched AGENTSLINE before AGENTSLINEBYTES; a `printf "<the line>"` instruction would have run the line's backticks — both caught before sending, no repository harm); "caught before sending (not a slip)" — 34c-2's provider-test mocks (19:4xZ) and 34b-2's agents-line-missing (14:2xZ); the G5 record of a wrong prediction (2026-10-25 21:0xZ: the root loader does NOT re-run on a client navigation — the planned 'root-loader-no-rerun' item dropped); the supervisor's "04:10 answer" that credited B-3 for sign-up (2026-10-26 08:2xZ — corrected to the operator; a sign-up-with-a-taken-e-mail case queued); "My smoke estimate ($3–10 for the whole turn) had no data behind it" (2026-10-25; first measurement $2 for a ten-call stopped session); turn 34c-2's expected roadmap not run through Prettier, so the executor's formatter escaped `sb-\*-auth-token` (2026-10-26 20:36Z — a formatting-only difference it reported as a departure); the container restart of 2026-10-26 22:06–22:10Z lost the CI watcher and stopped a records helper (both restarted; no record harm).
NEW-END
EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-938.
OLD-END
NEW-BEGIN
## INC-938 — the typecheck covers neither scripts/ nor .claude/hooks/ (2026-10-27 03:3xZ; records turn R1's reviewer, MINOR 4)

Defect: `bun run typecheck` checks what tsconfig.json includes — src/, vite.config.ts, eslint.config.js, playwright.config.ts and e2e/ — so scripts/ (the conformance censuses, the CI scripts, the block applier) and .claude/hooks/ (the executor kit) are type-checked by nobody; vitest transpiles them without types. Evidence: tsconfig.json's `include` at `c33d0cb5`; the reviewer's standalone tsc run on scripts/brief/apply-blocks.ts (clean) and the supervisor's (the kit's `Bun` globals untyped). Fix: a typecheck that covers both (an include, or a second tsconfig the same script runs), Bun's globals typed for the kit, its first run's errors fixed or listed with their reasons. Class: concern "every TypeScript file is type-checked"; mechanism tsconfig.json and `bun run typecheck`. Status (2026-10-27): OPEN — a roadmap line (records turn R3).

## INC-939 — the two storage buckets allow any file type and size (2026-10-27 03:3xZ; records turn R1's reviewer, its G51 note on INC-900)

Defect: listing-photos and category-assets carry no allowed_mime_types and no file_size_limit. Defence in depth only: no client policy on storage.objects names listing-photos since 20261015102153 (the server's service role alone writes it, after the upload route's magic-byte check), and a signed-in user writes category-assets only with `has_permission(…, 'categories', 'assets')` (20260903114705). Evidence: the migrations named; INC-900's production read ("buckets have no mime restriction"). Fix: a migration turn (Tier A) setting each bucket's image types and the media pipeline's byte caps, proven on staging. Class: concern "a stored file is the type its door allowed" (G54 a); mechanism: the upload routes' checks — the buckets' own allowlists absent. Status (2026-10-27): OPEN — a roadmap line (records turn R3).

## INC-940 — AP-36 failed then passed on retry three times in seven days (2026-10-27 12:0xZ; the flake ledger read whole at records turn R2's run)

Defect: AP-36 (ad-page.spec.ts, "the layout follows the article's width") failed then passed on retry three times in seven days, all at desktop-1280 in shard 9 — on 2026-10-26 and twice on 2026-10-27 (a fourth line, 2026-10-17 at mobile-360, falls outside the window). DEC-030: three in seven days is an incident and root-cause work. Evidence: flake-ledger.md on ci-evidence at run 40496361455 (`8898525c`); its flaky body under e2e-last-failure.md's "Flaky bodies (DEC-078)". Fix: the bodies read whole first (G21), then the cause fixed at its root (G38: no assertion loosened, no timeout raised without a named cause). Class: concern "a layout test measures a layout that has settled" (INC-384's class — to be confirmed by the body). Status (2026-10-27): OPEN.

Numbering: next free INC-941.
NEW-END
EDIT docs/features/brief-applier.md #1
OLD-BEGIN
Every file is staged beside its target (`<file>.apply-blocks-staged`) and renamed into place only when all are staged, so a file that cannot be written leaves the others as they were.
OLD-END
NEW-BEGIN
Every file is staged beside its target (`<file>.apply-blocks-staged`) and renamed into place only when all are staged, so a file that cannot be written leaves the others as they were. A file that exists keeps its mode — an executable script stays executable. A directory standing at a target's path is refused before anything is placed. A rename that fails is a refusal naming the files already placed, and no staged file is left behind.
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md |
OLD-END
NEW-BEGIN
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…6: blocks in order, a block inside a FILE block is that file's text; a block that runs on, never ends or is numbered out of order refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a file that cannot be staged — writes nothing; the command line and `--dry`; the wrapper run under the kit's scopeVerdict; BA-6, the census: no other code in src/, e2e/, scripts/ or .claude/ names a block marker) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK. Hardened in records turn R3 from R1's reviewer (MAJORs 1–2, MINORs 1–3, 5–6): run-on and unended blocks refused, EDIT numbers checked, writes staged, BA-6, docs/features/brief-applier.md; in records turn R4 from R3's reviewer (its MAJOR and two MINORs): an edited file keeps its mode, a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks |
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [x] Package turn (DEC-243; 31f7b7f2) — zod ^4.6.6 direct + override, undici override ^8.12.2 (resolved zod@4.6.7, undici@8.12.3); green.
  - [ ] Turn 34 — the sign-in and sign-up test suite from turn 32's scenario census (every NONE row; the operator's rule of 2026-10-22)
  - [ ] Flake-and-cleanup rest — the hand-written post-save-state waits A2 listed as ALREADY WAITS move onto awaitDraftSaved (file:line list in turn 32's report), three spec files a turn
OLD-END
NEW-BEGIN
  - [x] Package turn (DEC-243; 31f7b7f2) — zod ^4.6.6 direct + override, undici override ^8.12.2 (resolved zod@4.6.7, undici@8.12.3); green.
  - [ ] The sign-in and sign-up scenario suite (its own turn — the Foundations bundle's turn 34 became speed turn S11) from turn 32's scenario census (every NONE row; the operator's rule of 2026-10-22); with it the sign-up with a taken e-mail answering as a new one (2026-10-26)
  - [ ] Flake-and-cleanup rest — the hand-written post-save-state waits A2 listed as ALREADY WAITS move onto awaitDraftSaved (file:line list in turn 32's report), three spec files a turn
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [x] Records turn R2 (docs/governance/briefs/foundations-records-r2.md, v2 after one stop — v1's first roadmap block ran backwards, S454; no migration; the Claude Code executor; G41) — the incident ledger's second half, applied by the block applier: INC-901 … INC-937 imported word for word, the later word on INC-847 … INC-937 (the closures written by §11's rule), "Numbering: next free INC-938." and the watch list of 2026-10-27; then the decision ledger's block S77 and system-state.md's position (R3), and the slips and the owed roadmap lines (R4). Final HEAD 8898525c; CI run 40496361455: SUCCESS.
  - [ ] Records turn R3 (docs/governance/briefs/foundations-records-r3.md; no migration; the Claude Code executor; G41) — the block applier hardened from records turn R1's reviewer (a block that runs on, never ends or is numbered out of order refused; writes staged, all or none; BA-6, its census: one parser of briefs; the wrapper proven by running it; docs/features/brief-applier.md); and, applied by it, the decision ledger's block S77 (2026-10-23 → 2026-10-27) and system-state.md's position of 2026-10-27, the one of 2026-10-23 kept and marked superseded. The slips S379 … S454, the roadmap's owed lines and INC-938 and INC-939's entries follow in records turn R4.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [x] Records turn R2 (docs/governance/briefs/foundations-records-r2.md, v2 after one stop — v1's first roadmap block ran backwards, S454; no migration; the Claude Code executor; G41) — the incident ledger's second half, applied by the block applier: INC-901 … INC-937 imported word for word, the later word on INC-847 … INC-937 (the closures written by §11's rule), "Numbering: next free INC-938." and the watch list of 2026-10-27; then the decision ledger's block S77 and system-state.md's position (R3), and the slips and the owed roadmap lines (R4). Final HEAD 8898525c; CI run 40496361455: SUCCESS.
  - [x] Records turn R3 (docs/governance/briefs/foundations-records-r3.md; no migration; the Claude Code executor; G41) — the block applier hardened from records turn R1's reviewer (a block that runs on, never ends or is numbered out of order refused; writes staged, all or none; BA-6, its census: one parser of briefs; the wrapper proven by running it; docs/features/brief-applier.md); and, applied by it, the decision ledger's block S77 (2026-10-23 → 2026-10-27) and system-state.md's position of 2026-10-27, the one of 2026-10-23 kept and marked superseded. The slips S379 … S454, the roadmap's owed lines and INC-938 and INC-939's entries follow in records turn R4. Final HEAD b70505f5; CI run 40504157476: SUCCESS.
  - [ ] Records turn R4 (docs/governance/briefs/foundations-records-r4.md; no migration; the Claude Code executor; G41) — the block applier's fixes from records turn R3's reviewer (an edited file keeps its mode; a directory at a target refused before anything is placed; a failed placing a refusal; BA-6 sees FILE blocks); the slips S379–S454 appended to docs/governance/instructions-amendments.md §Slips; INC-938, INC-939 and INC-940 into the incident ledger ("Numbering: next free INC-941."); the roadmap's owed lines (INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786 / INC-821, INC-843); the sign-in and sign-up scenario suite's line renamed (its old "Turn 34" number belongs to speed turn S11). With it the records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4).
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END
EDIT roadmap.md #3
OLD-BEGIN
  - [ ] INC-850 — the draft editor's optional-text languages come from a legal door, not admin_list_languages (translations:view); useLanguages then leaves src/features/admin/legal/ entirely; a legal-only editor test proves it
  - [ ] /sitemap.xml and robots.txt's Sitemap line (INC-848; the search-engine rules R1–R9)
OLD-END
NEW-BEGIN
  - [ ] INC-850 — the draft editor's optional-text languages come from a legal door, not admin_list_languages (translations:view); useLanguages then leaves src/features/admin/legal/ entirely; a legal-only editor test proves it
  - [ ] INC-878 — admin_update_profile writes profiles.home_country_code past the one writer (change_home_country): no user_directory update and no 30-day rule — onto the writer with the residency waves (DEC-251–DEC-254)
  - [ ] INC-885 — translate.ts's flag read-back turns a failed admin_list_translations read into `flagged: 0`: onto readFailure (no phantom success); one gateway-and-answers turn with INC-886–INC-888
  - [ ] INC-886 — answer.ts gains worded refusals for 422, 502 and 503; translate.ts, suggest-icon.ts and generate-image.ts leave `ok({ error }, { status })`
  - [ ] INC-887 — aiCall's audit hash covers the material of a task without fields (translation), so its audit rows tell inputs apart
  - [ ] INC-888 — one deadline classification exported by src/server/upstream.ts for gemini.ts, photoroom.ts and google-translate.ts (four copies today)
  - [ ] INC-898 — the bare `abort@[native code]` stacks from the server bundle during sign-out (INC-893's class, another emitter): read and classified, then answered at the emitter or allowlisted with its reason
  - [ ] INC-899 — every raw `<button>` outside src/components/ui onto the Button primitive, with a Button census guard (136 in 37 files at a5627d66; a field trigger styled as an input may be an allowlist line with its reason) — with the form kit (G54 c)
  - [ ] INC-902 — the three admin screens that import the whole catalogue to test or sync a key (admin-listings/listing-page.tsx :26, admin/roles/permission-matrix.tsx :7, admin/translations/languages-page.tsx :27-:28) read a generated key list instead
  - [ ] INC-903 — the 367 catalogue keys no source file names (81 in the base part, 286 in the admin part) removed in a cleanup turn, the strings console's sync considered
  - [ ] INC-786 / INC-821 — the counter doors select the live listing and insert its counter without holding the row, so a delete in between raises a foreign-key violation logged as a server error: the doors hold the row or answer a gone listing as a quiet refusal; the fix prompt reads the failure body first (G21)
  - [ ] INC-843 — e2e/helpers/photos.ts's cleanup and object listing surface every storage error (the flake-and-cleanup rest)
  - [ ] /sitemap.xml and robots.txt's Sitemap line (INC-848; the search-engine rules R1–R9)
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations records turn R3 (2026-10-27; G41; register row 58) — the block applier hardened from records turn R1's reviewer: a block marker no whole block holds (a block that runs on or never ends) and a path's EDIT numbers out of order are refused; every file is staged beside its target and renamed into place only when all are staged; BA-6 names any other code that parses the markers; the wrapper is proven by running it under the kit's scopeVerdict; docs/features/brief-applier.md describes it. Applied by it: the decision ledger's block S77 (2026-10-23 → 2026-10-27: bundle 22's close, the Foundations bundle to turn 34d, records turns R1 and R2, D234–D238, DEC-243–DEC-275) and system-state.md's position of 2026-10-27, the earlier one kept and marked superseded, its standing reads at supervisor v1.14 and Knowledge v3.11.
OLD-END
NEW-BEGIN
- Foundations records turn R3 (2026-10-27; G41; register row 58) — the block applier hardened from records turn R1's reviewer: a block marker no whole block holds (a block that runs on or never ends) and a path's EDIT numbers out of order are refused; every file is staged beside its target and renamed into place only when all are staged; BA-6 names any other code that parses the markers; the wrapper is proven by running it under the kit's scopeVerdict; docs/features/brief-applier.md describes it. Applied by it: the decision ledger's block S77 (2026-10-23 → 2026-10-27: bundle 22's close, the Foundations bundle to turn 34d, records turns R1 and R2, D234–D238, DEC-243–DEC-275) and system-state.md's position of 2026-10-27, the earlier one kept and marked superseded, its standing reads at supervisor v1.14 and Knowledge v3.11.

- Foundations records turn R4 (2026-10-27; G41; register row 58) — the block applier from records turn R3's reviewer: an edited file keeps its mode (an executable stays executable), a directory at a target's path is refused before anything is placed, a failed placing is a refusal with no staged file left, BA-6 also names a parser of FILE blocks. The slips S379–S454 appended word for word to docs/governance/instructions-amendments.md §Slips, each with the guardrail it names and its corrective; INC-938 (the typecheck's reach), INC-939 (the storage buckets' type and size allowlists) and INC-940 (AP-36's three retried passes in seven days) into the incident ledger, "Numbering: next free INC-941."; the roadmap's owed lines; the scenario suite's line renamed. The records of 2026-10-23 → 2026-10-27 are in the repository (R1–R4).
NEW-END
C2. `grep -c '^- S' docs/governance/instructions-amendments.md` — BASE's count plus 76; `grep -n '^- S379 \|^- S454 \|^- Also logged, not numbered' docs/governance/instructions-amendments.md | tail -3 | cut -c1-40` — three lines, in that order; `grep -n '^## INC-938 \|^## INC-940 \|^Numbering: next free INC-94' docs/tracking/incidental-findings.md | cut -c1-50` — three lines, in that order; `sed -n 3p roadmap.md | cut -c1-80` — names foundations-records-r4.md; paste all four. Commit Part C.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-records-r4.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals); `bun run i18n:usage` (no change to either map); `bun run build`; `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
16b8bc06e226901a0f704f794b23823d182a5e884eb11cfa169f9cd5184f5f69  docs/_changelog.md
1c8d1a60dbd3db6e14a638eb64a9b998cd0225856071fbfdfb13bb6e9be2ad25  docs/features/brief-applier.md
dd4e8a6c6db90817d74a48b94f5929b9359ca0bec047753608908520eec06c03  docs/governance/instructions-amendments.md
feb7191f2ee8ef91fb9980d3235ec12038f199381fdebf5f2af8b14b61bca8d3  docs/governance/mechanisms.md
82ed76bc16a7a4724587ef0fb1443de7a2023f2a3e32c0b6d462a627d06133db  docs/tracking/incidental-findings.md
c82fe65294b74e32f251eb50b86519a4e892cd97898521e0282497201c92fac9  scripts/brief/apply-blocks.test.ts
1c8c683c5ecd019d27454316b24f28e16a7a41a4a01859f2d2829654b85eedf1  scripts/brief/apply-blocks.ts

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its answer and say so in the report); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR in the imported text is never fixed here (the record is the supervisor's) — it is listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-records-r4.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract (3); the census — "the supervisor's" (4); B1's red totals, B2's, C2's lines and the unit totals (5); the K2 lines (6); BA-4, BA-6 and wired lines (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12); the reviewer's last line. Commit it (`records turn R4: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): each owed line is written as the incident's fix in one sentence, its turn left to the order already set (DEC-237, then the cleanup and gateway items as the queue reaches them); the scenario suite keeps its place in the queue and only loses the number; INC-938, INC-939 and INC-940 join the ledger here rather than wait for the next bundle's records; the applier's fixes ride this records turn because its own records are applied by it, and BA-6 stays in the applier's test (R3's decision).

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
 * first (a file keeps its mode) and renamed into place only when all are staged. Each block prints one line;
 * `--dry` writes nothing. docs/features/brief-applier.md describes it; BA-6 names any second parser of the markers.
 */
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
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

/**
 * Writes every file or none: each text is staged beside its target — a file that exists keeps its mode (an
 * executable script stays executable), a directory standing at a target's path is a refusal — and the staged
 * files are renamed into place only when all are staged. A rename that fails is a refusal naming the files
 * already placed, and no staged file is left behind.
 */
export function writeAllUnder(root: string, texts: ReadonlyMap<string, string>): void {
  const staged: Array<[string, string]> = [];
  const clear = () => {
    for (const [temp] of staged) rmSync(temp, { force: true });
  };
  try {
    for (const [path, text] of texts) {
      const abs = join(root, path);
      const existing = existsSync(abs) ? statSync(abs) : null;
      if (existing?.isDirectory() === true) {
        throw new ApplyRefused(`${path}: a directory stands at that path`);
      }
      mkdirSync(dirname(abs), { recursive: true });
      const temp = `${abs}${STAGED}`;
      writeFileSync(temp, text);
      staged.push([temp, abs]);
      if (existing !== null) chmodSync(temp, existing.mode & 0o7777);
    }
  } catch (error) {
    clear();
    throw new ApplyRefused(`staging the files failed, nothing written: ${errorText(error)}`);
  }
  const placed: string[] = [];
  try {
    for (const [temp, abs] of staged) {
      renameSync(temp, abs);
      placed.push(abs);
    }
  } catch (error) {
    clear();
    throw new ApplyRefused(
      `placing the files failed after ${String(placed.length)} of ${String(staged.length)} (${placed.join(", ") || "none"}): ${errorText(error)}`,
    );
  }
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
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
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
    .filter((f) => !own.has(f.path) && /\b(?:OLD|NEW)-BEGIN\b|\bFILE-(?:BEGIN|END)\b/.test(f.text))
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

  it("BA-4 the command line writes the tree, writes nothing on --dry, a refusal, a file it cannot stage or a directory at a target, keeps an edited file's mode, and asks for a brief", () => {
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
      // A directory standing at a FILE block's path is refused before anything is placed.
      mkdirSync(join(root, "docs/dir"));
      writeFileSync(
        join(root, "e.md"),
        brief(fileBlock("docs/ok.md", "ok"), fileBlock("docs/dir", "x")),
      );
      expect(main(["e.md"], root, everywhere)).toBe(1);
      expect(existsSync(join(root, "docs/ok.md"))).toBe(false);
      expect(existsSync(join(root, "docs/ok.md.apply-blocks-staged"))).toBe(false);
      // An edited script keeps its mode: an executable stays executable.
      writeFileSync(join(root, "docs/run.sh"), "echo one\n");
      chmodSync(join(root, "docs/run.sh"), 0o755);
      writeFileSync(
        join(root, "f.md"),
        brief(editBlock("docs/run.sh", 1, ["echo one"], ["echo two"])),
      );
      expect(main(["f.md"], root, everywhere)).toBe(0);
      expect(readFileSync(join(root, "docs/run.sh"), "utf8")).toBe("echo two\n");
      expect(statSync(join(root, "docs/run.sh")).mode & 0o777).toBe(0o755);
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

  it("BA-6 the applier is the one parser of brief blocks: no other code names a block marker, EDIT or FILE (planted second parsers are named)", () => {
    expect(
      secondParsers([
        { path: "scripts/brief/apply-blocks.ts", text: "OLD-BEGIN" },
        { path: "scripts/other.ts", text: 'const at = brief.indexOf("NEW-BEGIN");' },
        { path: "scripts/files-only.ts", text: 'const end = text.indexOf("FILE-END " + path);' },
        { path: "src/x.ts", text: "no markers" },
      ]),
    ).toEqual(["scripts/other.ts", "scripts/files-only.ts"]);
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
```
