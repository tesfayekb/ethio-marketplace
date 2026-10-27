# Handover — 2026-10-27: the Foundations bundle after turn 34e (supervisor thread → a fresh supervisor thread)

Written by the supervisor at records turn R5 (G53; the operator's approval of 2026-10-27 07:43 local: "a fresh supervisor thread after the records land, with tools saved to the Project first"). Times are UTC unless marked local (the operator's local time is UTC−4). The repository is the record; this file accelerates the session-start ritual, it does not replace it.

## 1. Read first, in this order

1. This file.
2. docs/governance/claude-supervisor-instructions-v1.15.md — the instructions to install (it carries every rule of v1.14; the text it dropped is in docs/governance/instructions-amendments.md under "Moved from the instructions at v1.15"). Until the operator pastes it into the Project, v1.14 governs.
3. docs/governance/system-state.md (the position of 2026-10-27, the handover), the tail of docs/spec/spec-ledger.md (block S78, then S77), roadmap.md (line 3 names the brief in force; the Foundations bundle's list), the brief line 3 names, the ci-evidence branch (ci-status, e2e-last-failure, guards-last-failure, flake-ledger whole, nightly-status), the tail of docs/tracking/incidental-findings.md.
4. The Project doc claude/supervisor-tools-2026-10-27.md — the supervisor's scripts (check-brief, the brief generators, the rehearsal and finalize scripts, the CI wait, the v1.15 builder and proof). A new thread writes each back to disk before it uses it.
5. docs/governance/handoffs/2026-10-27-foundations-running-record.md — the running record from 2026-10-23 to this handover, word for word (Lovable message ids, the Supabase project references and the Lovable project id replaced by bracketed labels — G51). Read it when a question needs the detail behind a ledger line.

## 2. Where things stand

- dev = `a308c6b3` (turn 34e) before records turn R5; main = `52965564` (records turn R4; run 40512047787 SUCCESS, promoted). Run 40519893778 on `a308c6b3`: FAILURE (14:41:16Z) — every test that ran passed (1,715 passed, 0 failed, 1 flaky: PW-30, shard 6), but lanes 3, 5 and 12 lost to the browser install's 300 s deadline (INC-943 — fixed in records turn R5) and lane 7 to a deadlock in its backend start (INC-944); main stays `52965564`.
- Turn 34e's first run (40519893778) was red on its own install deadline — lanes 3, 5 and 12 (INC-943: the supervisor's unmeasured 300 s, S456) — and lane 7 deadlocked in its start (INC-944, unrelated); every test that ran passed. Records turn R5 carries the fix first (DEC-276); its run is the first to read.
- Stage: Stage 1's legal section closed with bundle 22; the Foundations bundle (DEC-237 — before bundle 23) is built through turn 34e: the conformance kit, the route boundary (turns 2–14, 20), the AI gateway (turns 15–19), the dial registry, the speed turns S1–S11 (turns 23–34), the on-demand failure notice and the session door (34b, 34c, 34w), the executor kit for Claude Code (K1, K2), records turns R1–R4 and turn 34e (every CI job and outside call carries a deadline).
- The last Publish: `c1b6b4e5` (2026-10-26 14:0xZ). Everything since is unpublished (see §6).
- The newest migration: supabase/migrations/20261025011447_71ad0a58-….sql (turn 15's M2), declared mark `20261025150000`; none since (turns 16 → 34e and R1–R4 carry no migration). Its applies are recorded in block S77 (turn 15).
- The Foundation fixes tracker (a Claude Doc, "Foundation fixes — progress tracker", doc id a34bb5c9-ce31-48ea-a91d-5025edf0be56) is updated after every verified turn (the operator's standing rule, 2026-10-24) and opened for him when he asks.

## 3. The executors and their channels (G56)

- Lovable (DEC-006, DEC-020): writes to dev; its Knowledge v3.11 (mirror: docs/governance/lovable-knowledge.md). Its workspace ran out of credits on 2026-10-26 21:45Z and had credits again by 2026-10-27 11:43Z (07:43 local; turn 34e ran there). Price to the operator: $0.20 a credit on the annual plan, $0.28 as a top-up; an exact-copy turn costs about 7–11 credits (measured on turns 24, 25 and 30).
- The Claude Code executor (DEC-255–DEC-257): the kit — CLAUDE.md, .claude/rules, the hooks, `bun .claude/hooks/land.ts` (the one landing door, which re-runs every check), the reviewer subagent (it starts in the background whatever the call asks; the executor waits for it). `.github/workflows/**` and `.claude/**` are closed to it: workflow and kit changes go to Lovable. Every brief starts a NEW session, started by the operator, who pastes the carrier and brings back the final report. Its cloud credit: $127 of $250 left at 2026-10-27 11:06Z (the operator's usage page), expiring 2026-11-05 02:59 EST; records turns R2 v2, R3 and R4 ran on it since (ESTIMATE about $13 a turn — no measurement). When the credit ends, executor turns return to Lovable (G59).
- One executor works at a time: each landing rewrites roadmap line 3, which the other's scope reads.
- Channels: the Lovable connector (DEC-245 — briefs, rulings and "continue" only, one message per Lovable turn, never while it works; never query_database, enable_database, deploy_project, knowledge, visibility, project create/remix/move, skills, add_connector or Project progress; a "Modify Supabase database" pause is answered only on the operator's yes; Publish is his). The Supabase connector (DEC-246 — writes only on ethio-staging, only migration files already on dev, sha-checked and applied whole, the specific mark read back; ethio-prod read-only at most). Claude Code (DEC-256 — one message per executor turn; the supervisor never answers its permission prompts). When the operator is present he pastes a long brief himself: it is exact and costs the supervisor's plan nothing (a 69,000-character brief retyped through a connector call costs about 35,000 output tokens and risks S451's corruption).

## 4. How a turn is built and closed (G57–G59; the tools doc has the scripts)

1. Prototype: clone dev at the base, make the turn's whole end state in the working tree by scripts — STEP 0's hand edits included (S454) — and run the touched tests and red first there. The operator's lean rule binds the supervisor too: the prototype runs lint, typecheck, format and the touched tests; land.ts and CI run the whole suite.
2. Generate the brief from the prototype (EDIT blocks with unique OLD texts, FILE blocks, the hash list); every generator asserts roadmap line 3 names the brief at the end and no roadmap block touches line 3.
3. Rehearse it on a fresh clone of the base exactly as the executor will — the repository's block applier (`bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`, register row 58) — and compare every file with the prototype; run check-brief.py (`--cc` for Claude Code) and read every hit; scan for secrets.
4. Carry it: Claude Code — a head line with sha256 and bytes, then BRIEF-BEGIN … BRIEF-END; Lovable — at most 100,000 characters per message, a larger file attached and copied by cp, every file proven by the hash list. For the applier to work in a Lovable turn, STEP 0 changes line 3 first and every FILE/EDIT marker starts its line (turn 34e could not use it: its scope was named in Part D and its FILE markers followed "BLOCK n —" on the same line; it copied the blocks by a one-off script, the hashes proving every file — accepted).
5. Verify the landing (brief sha, hash list, files against SCOPE and the prototype, line 3, side branches — eleven lovable-* plus hold/executor-kit-install —, secrets), then read CI on the landing's head: a background command polls the Actions API at no model cost and wakes the supervisor once (G57). No scheduled check for a Claude Code turn — the operator brings its report; a Lovable turn gets checks only when he says he is away. CI runs queue (DEC-181): a newer push replaces only a queued run.
6. Update the tracker; record the turn in the running record; build the next brief before the current lands (the operator's D234 directive).
7. Quality is never traded for cost (G59; the operator, 2026-10-27 07:10 and 07:43 local: "we dont want to compromize on quality of work we do"; "I dont want claude or lovable to compromize quality"). Briefs are prototype-exact by default; while the Claude Code credit lasts a lower-risk turn (tests, tooling, screens) may be spec-built with exact tests, the full consumer census, the reviewer, CI and the supervisor's full diff review — never a turn that touches sign-in, permissions, migrations or personal data.

## 5. The work queue, in order

The operator's order (block S77): the Foundations bundle (the speed turns included), then the Sage redesign and the left rail, then Stage 2; bundle 23 (D222's business-name rule) and Stage 1's last part follow the Foundations bundle. Fewer, bigger turns.

0. Read records turn R5's run: the browser installs split (DEC-276's judge starts there — 20 runs, no install step failing by its deadline), main promoted.
1. INC-940 — AP-36 ("the layout follows the article's width", e2e/ad-page.spec.ts) failed then passed on retry four times in seven days, all desktop-1280 on shard 9: read the four bodies first (G21), then fix at the root with its proof (the Flake check workflow, DEC-184 — never a local repeat run).
2. Turn 34c-4 — the E2E side of the storage name and the client hand-off: e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` onto the door's names; turn 34d's reviewer MINORs 2–5 on the route guard; INC-937's site in the route guard.
3. INC-937 — a caught error's text read through `errorText` in e2e/ and scripts/ as in src/: the census reads all three folders; the 40 hand reads move onto it.
4. INC-938 — `bun run typecheck` covers scripts/ and .claude/hooks/ (a Lovable turn for the kit's files, or split); with it the block applier's two MINORs from records turn R4's reviewer — the placing-failure message says what was placed (repository paths) and that branch gets a test.
5. INC-941 (Lovable — workflows) — the CI deadline census enumerates by its definition: pip, git clone and git fetch through scripts/ci/with-deadline.sh and every downloading `uses:` step with a step timeout, CF-CID naming each, a planted bypass for each.
6. INC-944 — lane 7's start deadlock: on its next occurrence the start's evidence names the second database session (read before the CLI stops its containers, or the start re-run once with `--debug`); then fixed at its root, never retried away. INC-936 — the nightly's red nights read whole (AP-41 three nights running, LG-21) and every class dispositioned in a ruling; its length (280–358 minutes against GitHub's 360) and the heartbeat on a cancelled run.
7. INC-939 (a migration — Tier A, Lovable or the Claude Code executor with the operator's SUPABASE_PROD_MIGRATE_TOKEN; never spec-built) — each storage bucket allows only what its door allows (allowed_mime_types and file_size_limit on listing-photos and category-assets).
8. The speed study (DEC-266's REVISIT branch) before turns 35–37; then turns 35–37 (speed S11 continued, DEC-261/DEC-263); then the speed items after turn 37 (DEC-265, INC-900).
9. The remaining Foundations mechanisms (roadmap line 3's "Next"): the form kit, the door mechanism, locale/format, QueryState/Button/Picture/a11y, one ListingDetail + safeHref, t(key, values) + plurals; the sign-in and sign-up scenario suite (turn 32's census plus a sign-up with an already-registered e-mail); the owed lines under the bundle (INC-849, INC-850, INC-878, INC-885–INC-888, INC-898, INC-899, INC-902, INC-903, INC-786/INC-821, INC-843, INC-942, the records-owed lines of R5).
10. Before Stage 2: the operator's Sage 3D redesign and the left rail's new behaviour (his design files of 2026-10-25; the display face's DEC owed) — the supervisor reminds him before the stage starts.

## 6. The operator's steps owed

1. Install v1.15: replace the Project's instructions with docs/governance/claude-supervisor-instructions-v1.15.md (the file the supervisor sent), then start the fresh supervisor thread with the one line the supervisor gave him.
2. INC-930: an offline sign-out from a page whose marketplace code never downloaded — (a) stay on that page, signed out, until the connection returns, or (b) fetch the marketplace's code ahead for a signed-in visitor (measured: at most 13.5 KiB compressed). The supervisor recommends (b).
3. Publish dev's head (the last Publish `c1b6b4e5`), then one walk of everything since — the walk's lines are the new supervisor's to write (G31), from the code as landed: the on-demand failure notice (34b-2/34b-3), the phone menu without its × (D238), a signed-out /settings sent to sign in (INC-925), the offline sign-out (DEC-271), the peek (INC-924), the session read (34c-1 → 34c-5), the speed turns' visible changes (the phone's own fonts, turn 33).
4. Per Claude Code session: the model (Sonnet for records and exact-copy turns, Opus when a brief leaves reasoning to the executor).
5. Before the first migration turn in Claude Code: SUPABASE_PROD_MIGRATE_TOKEN in its environment (typed only into that dialog, never in chat).
6. Carried from blocks S76–S77: the Privacy Policy v2 and publishing statement v2 import; the Afaan Oromo texts' import; the real legal phone number and the copyright agent's details; the DMCA registration; the MAU figure weekly until 31 Oct (INC-782); GitHub → Insights → Traffic (G51); the PROMOTE_TOKEN renewal before 2027-01-18; code scanning #419's dismissal; a native speaker's read of the Amharic and Afaan Oromo legal texts before launch.

## 7. Open incidents and watches (the ledger has each in full)

INC-936 (the nightly), INC-937, INC-938, INC-939, INC-940, INC-941, INC-942, INC-943 (fixed in R5 — closes on DEC-276's judge), INC-944 (the start deadlock), PW-30 at two flake lines in seven days (the `null as unknown as T` casts on RPC arguments — eleven in five files), INC-930 (the operator's choice), INC-921 (census tests without TREE_SCAN_MS time out under a full local load; CI passes them — CF-SL-1 did so again in turn 34e), INC-913 (DEC-266's timing half rides the speed study), INC-906 (ML-4, MLA-6, CO-4 watched), SO-12 and PW-54 at two flake lines each (a third is an INC), INC-837 (an allowlist expiry), INC-849 (null on a door error). The flake ledger is read whole at every CI read (§8); the nightly's status and date at every read (S452).

## 8. Records — where each lives and the numbers

- Decisions and the session log: docs/spec/spec-ledger.md (blocks S77, S78). Incidents: docs/tracking/incidental-findings.md. Slips: docs/governance/instructions-amendments.md §Slips (S379–S456). Mechanisms: docs/governance/mechanisms.md (rows 1–59; row 13 is numbered twice — a records-owed line). The queue: roadmap.md. Briefs and reports: docs/governance/briefs/, docs/governance/reports/.
- Next free numbers after this handover: DEC-277, D239, INC-945, S457, ACT-021.
- The Project keeps: these instructions v1.14 and v1.15, Knowledge v3.11, the tools doc, the systems audit, the specs and studies, and the running-record parts.

## 9. Pitfalls this thread paid for

- Every deadline, ceiling or size a brief sets is computed from CI's own history — the Actions API's step times, the median, the 99th percentile and the maximum over at least 300 runs of the step, shown in the brief — and a retry is put only where re-running is safe (S456, INC-943, DEC-276: turn 34e's unmeasured 300 s install deadline cost its green).
- A brief's expected result is produced by running it on the turn's true end state, STEP 0 included (S454); a brief's own sentences agree with its blocks (S455).
- A long text is never retyped into a send call (S451); a long brief is pasted by the operator or carried as a file and saved by a scripted copy.
- A Lovable turn's applier use needs line 3 changed at STEP 0 and markers at line start (turn 34e).
- The nightly is read at every CI read (S452).
- The supervisor's sandbox: `git clone` copies commits only (a prototype's uncommitted changes are copied with `cp -a`); a script is never run from a directory it deletes; `pkill -f` never with a pattern that matches its own shell; foreground sleep is blocked (background commands are fine); the network proxy refuses supabase.co, fonts, the published site and storage.googleapis.com; the Actions API and raw.githubusercontent.com are reachable unauthenticated; the session's GitHub connection answers 403 for this repository (G51 — attach and test before the repository goes private).
- Estimates wear their label and wrong ones are recorded (G5): the supervisor estimated v1.15 about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules.

## 10. The fresh thread's first turn

Read-only: the §2 ritual of v1.15 (this file first), the tools written back to disk from the Project doc, then a short list to the operator — dev and main, CI on dev's head, the turn in flight (none at this handover), the operator steps owed (§6), the next planned turn (§5 item 1) — and ask him to confirm before any brief is sent. Nothing the record answers is asked (G40).
