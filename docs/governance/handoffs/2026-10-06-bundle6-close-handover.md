# HANDOVER — 2026-10-06 — bundle 6 closed; the order of work from here; what is in flight

Written by the supervisor thread that wrote the 2026-10-05 evening handover, at the close of bundle 6. It SUPPLEMENTS `docs/governance/handoffs/2026-10-05-bundle5-close-handover.md` and, through it, `2026-10-05-bundle4-close-handover.md` (who is who; what the operator has ruled; the curator): those sections still hold and are not repeated. Everything that changed between 2026-10-05 23:50Z and 2026-10-06 11:50Z is here, and spec-ledger block S55 carries the full narrative. The successor reads, in this order: this file → `docs/governance/system-state.md` (the position of 2026-10-06) → the tail of `docs/spec/spec-ledger.md` (block S55; its NUMBERING line) → the root `roadmap.md` → `docs/governance/handoffs/2026-10-06-order-of-work-and-cross-check.md` → the ci-evidence branch → the tail of `docs/tracking/incidental-findings.md` — and asks nothing the record answers.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = `d6632174` (bundle 6 turn 10, "Verified CI, lint, checks", 2026-10-06 11:41:12Z); main = `d766520f` (turn 9; CI run 37448727855 SUCCESS on its second attempt at 11:23:34Z, promoted). CI run 37458061985 on `d6632174` was in flight when this record was written: its build job — the changed workflow-lint step, typecheck, format check, lint, build — and every guard job were green at 11:44Z; its E2E jobs were still running on app and test code identical to `d766520f`. This records turn's own run is the full proof for both commits. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 6 (`docs/governance/briefs/bundle-6.md`; the saved copy is version 5, sha256 `4a33a4a4…`) CLOSED: eleven executor turns, 2026-10-06 00:31Z → 11:50Z; turns 7 to 10 were short rulings delivered inline (their texts are in block S55). Every step verified against the diff (G30).
- Published site: `a284bc55` (published 2026-10-06 before turn 7). The Publish of `d766520f` (turn 9's save-hook fix) was given to the operator as a step at 11:3xZ and is not confirmed in this record; turns 7, 8 and 10 changed no app file.
- The close's walk (three lines on one Other Food & Beverages draft, on `a284bc55`): all yes. Turns 7 to 10 have nothing to walk.
- Highest test ids: PW-163, PR-33, AT-72, CT-37, LT-15, TR-35, IG-5, CO-8, LS-13. New files this bundle: `e2e/posting-routes-dials.spec.ts` (PR-27–PR-33), `src/lib/read-all-pages.ts`, `e2e/helpers/chunk-by-length.ts`, `e2e/helpers/attribute-reap-plan.ts`, `e2e/helpers/app-target.ts`, `src/server/door-error.ts` with their unit tests; `scripts/check-promote-needs.sh`; `SECURITY.md`; `.github/workflows/zap-baseline.yml` (dispatch only, disabled until the private switch); `docs/features/security-scanning.md`.

### 1.2 Databases

- ethio-prod and ethio-staging both hold M9a `20261006005138_b11e2482` (mark `20261007120000`; the `revise` dial, 120 per hour) and M9b `20261006010039_22ac0b2a` (mark `20261007130000`; six owner doors redeclared whole with the gate). The newest mark by value is `20261007130000`: the next migration's mark is chosen above it and above the current time (G39).
- Staging holds about 215 attribute definitions (205 real, the rest young scratch rows); the setup's maintenance block now reaps scratch definitions older than three hours (DEC-142).
- Production read-back of 2026-10-06 (the executor's query tool; counts only): 141 listings — 133 drafts and 8 in screening, none live (nothing moves an ad out of screening until stage 2); one draft holds an answer to `imei_registered`.

### 1.3 Catalogue

- 169 categories · 569 definitions · 1,500 link rows. Imported and walked on 2026-10-06: C31 (engine features, pass 1), C32 (36 Amharic unit words), C33 (the question order on Smartwatches & Wearables).
- The curator is building C34 from the message of 2026-10-06 (version 2): one definitions file, five definitions (`condition-vehicles`, `fulfilment`, `service_type-education-training`, `level`, `series-phones`), expected preview added 0 · changed 5 · unchanged 0. The supervisor audits it on fresh definitions and links exports (owed by the operator) before the import.
- Held for the curator's next message: D76 (the phone question becomes "Unlocked (works with any SIM card)" — a NEW definition replacing `imei_registered` on three leaves; one production draft holds the old answer, so the old question is unlinked only after INC-467 is fixed in bundle 7; the curator proposes the Amharic and the help texts first, with the C34 result message, and the operator reads them before any row). Held until the form changes: `product_origin` and `origin-food` (D75); any `active: false` (INC-466); any merge (INC-467). Waiting: the Tigrinya finder words; the two cubic-metre wordings; the rent and hire periods.
- Rules the curator now carries: parent first (R1); narrow, never write upward (R2); the form's reset rule (DEC-144); `{country}` with no Amharic prefix (D73).

### 1.4 Security (DEC-132)

- Layer A on; push protection OFF until the supervisor's call of 2026-10-09 (on the operator's Security-tab read).
- Layer B live in CI: the Semgrep job (pinned 1.179.0, rules at a pinned commit, gating on ERROR, counts only in the log, a planted fixture proves it), `SECURITY.md`, the disabled ZAP workflow. NOT built: the database lints (`public.security_lints()` and a nightly step) — bundle 7.
- Layer C: the weekly reviewer's first scheduled run is 2026-10-12 10:41Z; its baseline's seven findings are all fixed (INC-442 in bundle 5; INC-443–448 in bundle 6 — their full entries are now in the incident ledger, one half of INC-446 excepted: a provider-side safeguard that is the operator's optional step).
- INC-464 (a test run aimed at production) is closed by DEC-146: Playwright is started only with `bun run e2e:local` or `bun run e2e:changed`; the setup refuses anything else.

### 1.5 CI and platform

- Every `runs-on` is pinned to `ubuntu-24.04` (DEC-133). Every job gates promotion unless named signal-only (DEC-137, guard script). A workflow file is linted in CI and before every push that edits one (DEC-140, DEC-141); the lint's download retries (DEC-147). The failure report prints a timed-out test's further errors (DEC-143). Shard 1's teardown reads "ran out: 0" (DEC-138).
- The server-error census carries one message off the allowlist: "listing not found" (INC-398, 4 to 8 lines a run) → the tidy-up round.
- Flaky tests at or near the DEC-030 threshold are in the incident ledger's watch list; INC-439 (the nightly's aborted-request lines) stays on the watch.
- DEC-083's census-gate date is 2026-10-12; the gate is not built and nothing fires on the lines seen.

### 1.6 Records

- This landing: spec-ledger block S55 (DEC-136–147; D73–D76; the operator's sixteen answers; the three owed requirement amendments; slips S98–S112; the class rules), incidental-findings INC-450–472 with the security entries in full and the status amendments, `system-state.md`, `AGENTS.md` (two lines), `docs/tracking/action-tracker.md` (ACT-012, ACT-013 and the status lines), both roadmaps in the new order, `docs/governance/handoffs/2026-10-06-order-of-work-and-cross-check.md`, this handover and its manifest, one changelog line.
- Numbering after this landing: next free INC-473; DEC-148; D-rulings D77; slips S113.
- Project docs (private, the supervisor's): `claude/running-record-2026-10-05-thread2-part2.md` and `…-part3.md` (the source of block S55; they also hold what was kept out of the public repository), `claude/marketplace-feature-review-2026-10.md` (the research report), `claude/security-review-2026-10-05.md`, `claude/2026-10-05-open-items-master.md`; the plan document "ethio.com — what to build next, and why" is a Claude Docs document of the operator's account (its two tabs are in the repository as the order-of-work file).

## 2. IN FLIGHT AT HANDOVER

- Executor: idle after this records turn. Nothing is addressed to it until this turn is verified and the bundle 7 brief is delivered — and that brief is written only after the supervisor has explained bundle 7 to the operator part by part (his standing directive).
- Curator: building C34 (mid-task; nothing goes to it — G32).
- Operator steps owed (none blocks the executor): the fresh definitions and links exports for the C34 audit; Publish `d766520f` if not yet done (turn 9's fix; nothing to walk); optional — the Claude GitHub App install (alert feeds for the weekly reviewer), a usage budget or alert at the map provider, the mailboxes legal@ and privacy@ and a native reader of the Amharic legal text before stage 1's texts go live, the sending domain for e-mail before stage 6.
- Supervisor scheduled check-ins live at handover: 2026-10-09 13:30Z (push protection); the weekly reviewer 2026-10-12 10:41Z (its own task).

## 3. THE PLAN AHEAD, IN ORDER

1. This records turn (documents only) → verified by sha256 against the manifest → CI green.
2. Bundle 7, the posting-form round — explained to the operator part by part, then one brief (Tier A where it touches the draft door or the catalogue doors): DEC-144's reset rule with its test census; previously used categories; INC-451; the category-door items; `public.security_lints()`; INC-459; INC-463's seeders; INC-466; INC-467 (with the unlink case and the executor's census of turn 10); the built title and the `{country}` token; a refused autosave is not dropped silently; the Unit-of-Sale order test; three code checks first.
3. Stage 1, the rules — the Pass-2 spec of L1 (spec v2 approved 2026-10-04) with its "checked against" list; the lines owed in `docs/spec/tos-privacy-source.md`; the banned-items and safety pages; three answers the operator owes at that stage (store the IP address with each acceptance? 14 or 30 days' notice of a change? publish the banned-items page before counsel?).
4. The tidy-up round (ACT-009), run while stage 2 is planned.
5. Stage 2, automatic screening (DEC-145) — the screening spec, read against `docs/governance/moderation-design.md` first: a stronger second layer; a first-pass refusal also goes to the second layer; messages screened; people as the exception.
6. Stages 3 to 7, the posting-form extras between 4 and 5, the launch round with the operator's launch checklist, opening, stage 8 — as in the order-of-work file.
7. Beside the executor's turns: the curator track (C34 → D76's question → the rent and hire periods); the rulebooks (the next instructions version and the next Knowledge version, delivered whole — they carry section 4 below); the dated duties (2026-10-09, 2026-10-12, the account pool before 2026-11-01).

## 4. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- The operator's two standing directives: every bundle or stage is explained to him part by part before its brief; every new order of work is cross-checked against every open list, and an item without a place stops the plan.
- His pace directive: the executor is not held for a CI run that is likely green; a red is read job by job on the next commit; a fix travels with the next turn.
- Each stage plan and proposal opens with a "checked against" list (the decisions, requirements and design documents it touches, each read at its file and line).
- The curator audit executes every engine rule it cites; statements about the catalogue come from resolved rows, and the resolver first reproduces the export; the audit reports parent-first violations.
- Every CI read names the census's off-allowlist messages with their change from the run before, and reads the post-test transport line.
- A paged read is reviewed for a second writer; a tool added to CI is read for what it borrows; a brief's local-run list comes from which specs exercise the changed screen; an owed census is a condition of the report.
- A door's range and a console door's function are read before a value is aimed at them or their use is told to an agent.
- A question of fact is put to the operator on its own; an answer that reads two ways is resolved before it enters an agent's message; a fact he may not hold is researched.
- Playwright only through `bun run e2e:local` or `bun run e2e:changed` (DEC-146; now in `AGENTS.md`). Scanner output in public logs is counts only (DEC-132 rule 2; now in `AGENTS.md`).
- No merge and no inactive answer in a curator plan until INC-466 and INC-467 are fixed; an unlink of a question ads may hold waits for a production read-back of zero holders.

## 5. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S55 has each at its time)

- "I dont think we have to spend that much time waiting for ci which is likley going to br green. we need to continue work … benefit of working outweighs risk of ci red at this step."
- "in the future before giving the full bundle to lovable, on each step or bundle explain to me in detail what it does, and anything that i need to comment or update then we will do final one"
- On resets: "an answer that will depend on the other answer, we need to make sure the parent answer should come first, because its confusing when a question or choice lower in list resets earlier answer … yes definately brand resets model, on the other hand if i select for example a toy, and if we know a toy can not be made in home, there should never be an option for home made after selecting a toy."
- On screening: "what i really want this site is to be fully automatic with ai reviewing and instantly approving all ads … minimal human involvement is the plan. So stage 4 needs to come earlier." and "ai first from get go and train as wel go."
- "when we get there we will discuss each in detail and should make sure each decion doesnt cause friction or issiues with previous deciosn that are already decided."
- "Please make sure when we are coming up a new order of doing things, we need to make sure we dont drop or miss items that we previously identified as needing to be fixed or done, making sure all have been addressed."
- On the phone question: "PLEASE RESEARCH IN DETAIL IF THIS IS REQUIRED. i AM NOT SURE ABOUT THIS. PEASE REASERCH FIRST, SEE HOW OTHERS HANDLING IT" — then "A is the answer- unlocked".
