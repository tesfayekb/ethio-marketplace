# HANDOVER — 2026-10-05 — bundle 4 closed on green; the records turn; what comes next

Written 2026-10-05 at about 06:30 UTC (02:30 America/New_York), by the supervisor thread that ran the project from 2026-09-27 to 2026-10-05, for the supervisor thread that follows it. The reader holds the installed supervisor instructions v1.13 and the repository, and nothing else: no memory of the chat. Every label is defined where it first appears. Every fact below restates a source — the supervisor's running notes of 2026-10-04/05, the records package compiled for this handover, the repository at `48d3c53b`, and the `ci-evidence` branch; where a fact could not be confirmed it says "unconfirmed" and names the source. The operator is named by his first name only.

## 1. READ THIS FIRST

### 1.1 What this document is

- This is the handover file of the supervisor thread that closed bundle 4. A "bundle" is one large piece of executor work described by one brief saved in the repository under `docs/governance/briefs/`; bundle 4 was the posting wizard's step order, price page, title, picture, lifetime, contact step and catalogue engine.
- It is one file of a records package. The same executor turn that lands this file lands the ledger entries DEC-081 to DEC-131 and INC-308 to INC-437, the session blocks from S44 onward, the legal drafts, the rulebook records, the specs archive, the curator record, the open-items master list, and the updated `system-state.md`, root `roadmap.md`, `launch-gate.md`, `tos-privacy-source.md`, `action-tracker.md` and `AGENTS.md`. The map is in section 10.
- The stop point it was written at: dev = main = `48d3c53b` ("Fixed CT-19 constant row refs", pushed 2026-10-05 05:42:29Z). CI run 37268978090 on it: SUCCESS, completed 2026-10-05 06:04:07Z, 25 jobs, promoted. Bundle 4 is CLOSED on that green.
- The published site (`https://ethio-market-dawn.lovable.app`) runs `70e16ea5` (bundle 4 turn 11, published by the operator at about 05:45Z). Turn 12 (`48d3c53b`) changed a test file, the changelog and the roadmap only, so no Publish follows it.
- The records turn — the documents-only executor turn that imports this package word for word — is the NEXT executor turn after this stop point.
- Roles in one line each (section 2 has the detail): "the supervisor" is the Claude thread (you); "the operator" is Tesfaye, the owner; "the executor" is the Lovable platform agent that alone writes code and database changes; "the curator" is a separate Claude Project that writes catalogue files.

### 1.2 The ritual for the first message of the new thread

Run these in order before saying anything of substance (instructions §2 and its v1.13 addendum).

1. Fresh clone of the working branch and the evidence branch:
   `cd /tmp && rm -rf ethio && git clone --branch dev https://github.com/tesfayekb/ethio-marketplace.git ethio && cd ethio && git fetch origin main ci-evidence && git rev-parse origin/dev origin/main && git branch -r | grep lovable-`
   - Steady state is main = dev. Since DEC-098 no workflow commits to dev, so every commit by which main trails is substantive: a run unfinished, red, or cancelled by a newer push.
   - Eleven `lovable-*` side branches are known and left in place (the list is in section 2.3); a twelfth is a stranded executor turn.
2. Read, in this order:
   - this file;
   - `docs/governance/system-state.md` — rewritten by the records turn to the 2026-10-05 position; if it still reads "Current position 2026-09-25" and "Claude supervisor v1.10 · Knowledge v3.8", the records turn has not landed (section 11, item 1);
   - the tail of `docs/spec/spec-ledger.md` from session block S44 onward: `grep -n "^S44" docs/spec/spec-ledger.md`, then read to the end; the last line names the next free numbers;
   - the root `roadmap.md` — line 3 names the bundle brief in force; its bundle 4 block is ticked through INC-437;
   - `docs/governance/briefs/bundle-4.md` — the brief bundle 4 was built from; its HOW TO WORK block (lines 12 to 25) is the executor's standing way of working until a bundle 5 brief replaces it;
   - the tail of `docs/tracking/incidental-findings.md` — INC-432 to INC-437 are the newest; the last line names next free INC-438;
   - `docs/governance/handoffs/2026-10-05-open-items-master.md` — every open, queued, planned, promised, parked or awaiting item, deduplicated; its bracketed ids such as [2.8] are cited below.
3. Read CI from the evidence branch, never from the copies on dev or main (those are frozen pre-DEC-098 text):
   - `git show origin/ci-evidence:docs/tracking/ci-status.md` — two steps: the conclusion, then that the SHA equals `git rev-parse origin/dev`;
   - then `e2e-last-failure.md`, `guards-last-failure.md`, `flake-ledger.md`, `nightly-status.md` and `nightly-last-failure.md` the same way;
   - then `git log --oneline -15 origin/dev` — unexplained HEAD movement, a brief step the diff does not show, or a side branch nobody named ⇒ pause and reconcile before new work.
4. Check the record's age against the head. If the newest handoff, `system-state.md` or the ledger is older than the newest bundle close, the records debt is the first documents-only turn before any new work (instructions G41). If the records turn has landed, verify its files by sha256 (section 11, item 1) before trusting them.
5. State to the operator, as a short list (instructions G44), and ask for confirmation before proceeding (§2 step 3):
   - HEAD SHA of dev and of main, and whether they are equal;
   - CI on dev's head: conclusion, run id, completed time;
   - the bundle and turn in flight: bundle 4 CLOSED at `48d3c53b`; the records turn landed or not (sha256 verified or not); no code turn open;
   - whether the executor or the curator is mid-task: the executor is idle after the records turn; the curator is building the C30 rows on fresh exports (section 4);
   - the operator steps owed: forward the curator's C30 files when they arrive; no staging apply, Publish, import or Translations approval is outstanding at the stop point;
   - the last closed step: bundle 4 turn 12 (INC-437) green and promoted; C29 and c29b imported on ethio-prod; turn 11 published and walked;
   - the next planned step: audit C30 when it arrives; then the engine curator batch; then L1 (section 5);
   - the first three things to do (section 11).
6. If the operator opens with a task, run steps 1 to 4 first anyway, then the task, grounded (§2 step 4).

## 2. WHO IS WHO AND HOW WORK FLOWS

### 2.1 The operator

- Tesfaye (GitHub account `tesfayekb`). He is the owner and the final authority on every product decision.
- He approves specs and scope, pastes prompts into the executor and the curator, and brings their reports and files back.
- He applies migrations on ethio-staging by hand, imports catalogue files through the admin console, approves Amharic names in Admin › Translations, presses Publish, and walks the published site against a short numbered list.
- He holds every secret.
- He is not an engineer: every step he takes is written as a numbered list naming the system (instructions G9 addendum, G12). His standing directives on how to work with him are in section 6.

### 2.2 The supervisor

- The Claude thread bound to the claude.ai Project "Ethio marketplace", governed by the supervisor instructions (v1.13 after the records turn; v1.12 was live until then).
- It authors specs and prompts, verifies every executor result by fresh clone and diff, audits every curator delivery by script, keeps the records, reads CI and security, and asks instead of assuming.
- It never edits, creates, renames or commits a repository file and has read-only clone access. The repository is public, which is the only reason the clone works: the GitHub connector answers 403 for this repository.
- Its tools: a read-only clone at `/tmp/ethio` and `git show origin/ci-evidence:<path>`; the repository's Actions index and the unauthenticated runs API (run pages and annotations are readable; job logs are not); a session scratchpad for audit scripts and catalogue snapshots (session-local — it may not survive the thread); the project memory files; scheduled check-ins and reminders; helper agents for read-only studies (they run in the foreground and are killed by any incoming message, so a quiet window is asked for first). The operator's attachments land under `/root/.claude/uploads/<session>/`.
- What it lacks: any write to the repository or the databases; any direct database read (database truth comes from the executor's pasted read-backs on ethio-prod and the operator's SQL-editor results on ethio-staging); a lock-exact install (`bun install --frozen-lockfile` cannot reach the executor platform's private npm cache, so its own lint, typecheck and build runs are "not lock-exact"); fetching ethio.com pages (the live site's robots file timed out five times on 2026-10-04).

### 2.3 The executor (Lovable)

- The only agent that writes to the repository and the production database, always from prompts the operator pastes.
- Its connected branch is `dev` and it commits direct to dev. `main` is advanced only by the fast-forward promote job at the end of a fully green CI run (DEC-020).
- The platform commits and pushes when the executor's turn ends, and also pushes intermediate "Changes" commits during a long turn, so a commit can exist before its tests ran. The executor cannot commit at a chosen point, cannot withhold a commit, and cannot give a commit hash in its report.
- Sending it any message can cause a push, and a push cancels the CI run in flight. After a commit that must get a full verdict, the operator sends nothing for about 25 minutes.
- Its connected Supabase project is ethio-prod. Its migration tool applies a NEW migration file to ethio-prod the moment the file is saved, after the operator allows the "Modify Supabase database — skip or allow" dialog (which can sit for hours). The tool takes SQL inline only, reports success or failure (never NOTICE output), cannot apply a file that already exists in the repository (it would write a second copy under a new stamp — M6 was pasted by the operator instead), and has no connection to ethio-staging.
- Staging is always the operator's hand: he pastes the raw file into the ethio-staging SQL editor and reads back the mark (section 8.2).
- The executor's query tool connects as a client role and cannot call service-role-only functions.
- It reads CI only at the raw GitHub addresses of the `ci-evidence` branch: `https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md`, then `e2e-last-failure.md` and `guards-last-failure.md` at the same address.
- It cannot `git fetch origin ci-evidence`: its remote is its own mirror and carries only `dev`, `main` and `lovable-backup-dev-*` (confirmed 2026-10-05 01:50Z: "couldn't find remote ref"). `AGENTS.md` line 21 at `48d3c53b` still gives the git form; the records turn corrects it to the raw-address form. It never reads `origin/main`'s `ci-status.md` (the stale pre-DEC-098 copy).
- It cannot read CI job logs, cannot sign in to the published site or a preview link as an admin, cannot boot the Cloudflare build the published site runs, and `bun audit` cannot reach the advisory service from its sandbox.
- The bundle-brief way of working: a brief is delivered to the operator as an attached file with a one-line paste; the executor's step 0 saves it unchanged as `docs/governance/briefs/bundle-N.md` inside one fenced text block, names that path at the top of `roadmap.md`, and re-reads it first on every turn (a pasted brief is readable only in the turn it arrives).
- A "turn" is one executor session inside a bundle, ended so CI runs on its last commit. The executor stops only for a migration's "apply <uuid-fragment> → expect mark <value>" line, a question the brief cannot answer, or the end. When the platform's turn limit ends a turn early it stops at a clean point and says in three lines what is done, what is left, and CI; the operator sends "continue".
- Between turns the supervisor sends short numbered rulings titled "RULING — bundle N, turn M", each with its base commit.
- Reports: one full report at the end of a bundle and one short report at each migration stop; changed files are listed from `git diff --name-only <turn start>`. The decision and incident ledgers are not written inside a bundle; `docs/features/*` and `docs/_changelog.md` are. The rules are in section 8.
- Side-branch stranding: when dev moved while a turn ran, the platform pushed the turn to a side branch `lovable-sync-<number>` or `lovable-backup-dev-<number>` instead of dev, silently. The cause (bot commits on dev) was removed by DEC-098 stage 1 on 2026-10-01. The eleven branches on the remote: `lovable-backup-dev-1788419378`, `lovable-sync`, `lovable-sync-1788322342`, `lovable-sync-1788764600`, `lovable-sync-1789741128`, `lovable-sync-1790153551`, `lovable-sync-1790668701`, `lovable-sync-1790806349`, `lovable-sync-1790807903`, `lovable-sync-1790881191`, `lovable-sync-1790889145`. Ruling: "leave the branch in place". The supervisor lists them on every verification; the signal-only detector (DEC-096) is not built. Recovery of stranded work is a short executor turn that copies the files back byte for byte from the named commit, never a rebuild from memory.
- Publish is the operator's button on the executor platform: it puts the built dev tree on the public address. Code changes need Publish before a walk; catalogue imports are live at once without it (browser option lists can lag an import by about five minutes). Because the executor applies a migration on prod during its turn, the published screens can disagree with the live database until the next Publish.
- The executor's own rulebook is the Lovable Project Knowledge (live v3.10, capped at 10,000 characters; the repository mirror `docs/governance/lovable-knowledge.md` was v3.8 until the records turn lands the v3.10 text the operator handed over on 2026-10-05) and `AGENTS.md`.

### 2.4 The curator

- A separate Claude Project, "ethio.com — Catalog curation", opened 2026-09-08; a "Locations curator" thread inside it since 2026-09-16. It sees neither the repository nor the database; the operator carries every message and every file both ways.
- It researches and writes the catalogue files the operator imports. It never writes code, runs migrations, edits the database or prompts the executor.
- Its work is numbered in cycles: C27 was the whole-catalogue pass, delivered as "batches" 1 to 19; C28 the catering research; C29 the catering rows; C30 the Cooked Food redesign now in progress. Deliveries arrive as uploads with a hash prefix (for example `3093d28f-c29-categories.csv`).
- A delivery is: a categories file; a definitions file (changed rows only); a links file (the WHOLE catalogue, about 1,488 rows); an optional `-pass2` file; a translations key-names file (the names to approve in Admin › Translations); a form-path dispositions file; a help census; a settled-to-Other scan; and a change note that states the base exports, the import order, the expected preview line per file, the Translations step and a short walk. Before files, a new root or study gets a review note or plan with no rows.
- The loop: the supervisor writes one prompt per batch; the operator pastes it with fresh exports attached (categories, definitions, links from Admin); the curator delivers; the supervisor audits with a script before anything is imported (section 7); the operator imports on the supervisor's numbered steps (Admin › Categories › Import first, then Admin › Attributes › Import with the definitions and links slots, then Translations), pasting each preview line before Confirm — any refusal or count that differs from the expected line ⇒ Discard and send the line; then, only for form behaviour not walked before, a short walk; then fresh exports back to the curator as the next base.
- Standing curator rules the operator set: one curator message per batch, and only after the previous batch's walk has passed; no new prompt while the curator is mid-task (held items are folded into the next message as addendums; a message that replaces an earlier one says so); every prompt names the export files to attach; a prompt covers the whole class across the whole catalogue, never only the categories the operator named; catalogue effort follows real trade (the 29-leaf priority tier and the 100-ad rule); the supervisor finds catalogue inconsistencies itself before the operator's walk.

### 2.5 Where secrets live, and what the supervisor must never do

- Secrets live only in the Supabase and Lovable secret stores, GitHub Actions secrets and the operator's password manager.
- The executor holds the four `E2E_*` staging credentials, `ESRI_API_KEY` and a Gemini key in its sandbox, entered through its in-chat secret dialog; production credentials never reach it.
- Publishable keys may appear in chat; service-role keys must not. The committed `.env` holds publishable values only (INC-000). Every verification includes a secrets sweep of the diff.
- The supervisor never edits or commits a repository file, and never writes to either database.
- It never asks the operator to paste a secret, or a job log (a log-paste request is a supervisor slip; the evidence files are the brief), or to "commit" (the platform commits).
- It never hands the executor or the curator a new prompt while that agent is mid-task, and never puts a process proposal in front of the operator to parse.
- It never declares a step CLEAN from the executor's report alone: every brief step is checked against the diff (INC-432 was missed by reading the report's list).
- It never writes a walk expectation from the catalogue file instead of the form's behaviour (INC-434, slip S92).
- It never retypes Amharic inline: a prompt carrying Amharic is built by script from a vetted file and delivered as a file (slip S88).
- It never accepts "runs in one project" as isolation for a real row (G27) or a page-position assertion on a shared roster (G28).

## 3. STATE AT HANDOVER

### 3.1 Repository

- dev = main = `48d3c53b` ("Fixed CT-19 constant row refs", 2026-10-05 05:42:29Z).
- CI run 37268978090: SUCCESS, completed 06:04:07Z, 25 jobs, promote job success. Read from `ci-evidence`: `ci-status.md`, and `e2e-last-failure.md` ("last E2E run 37268978090 passed"; 0 flaky; 24 post-test warnings; the server-error census shows 107 lines, 35 messages, 1 message off the allowlist — `listing not found`, 7 lines on shards 3 and 6; section 9).
- Published site `https://ethio-market-dawn.lovable.app` = `70e16ea5` (turn 11), published about 05:45Z; turn 10 (`a17b227c`) had been published about 03:35Z. Turn 12 is tests-only, so no Publish is owed.
- The `ci-evidence` branch head at this write was `d981ab51` (it moves with every run).
- Eleven `lovable-*` side branches (section 2.3).
- Root `roadmap.md`: the bundle 4 block is ticked through "INC-437 CT-19 stored-cell file rows", with one unticked line for the photo clean-up bundle. Its truth-pass block (lines 9 to 30) still marks the old one-letter lines S1, S2/S3, T, A, B, C, Part O, "Bundle 1", the E census, the final full DEC-023 run and DEC-098 stage 2 as not done — against the changelog and the tests (section 9, conflict [12.20]).
- Bundle 4 by turn: M5 `923dd4cb` (mark `20261004090000`) and its healer M5b `02084273` (mark `20261004160000`); screens A+B (turns 1 to 3, green at `72cc8102`); Parts C to F; M6 `20261004212627_e44f20e5` (mark `20261005100000`); Part G screens in turn 9 (`2b55ed15`, steps 26–27) and turn 9b (`0fc968e4`, steps 28–29; its red PW-129/PW-134 fixed forward in `24d401f5`); turn 10 `a17b227c` (Part H docs, INC-431, INC-432 with M7, lint 32 warnings); turn 11 `70e16ea5` (the LT-13 class fix closing INC-334, INC-434, INC-435, INC-436); turn 12 `48d3c53b` (INC-437).
- Every turn was verified CLEAN by diff. The three reds of turns 9b, 10 and 11 were each one test and each the executor's own defect or a test defect; none was platform-origin.

### 3.2 Databases

- Supabase organisation "ethio" (ID `ybebetcibfdqylsebqtl`); Pro plan as the environment record states (the launch-gate file still speaks of "the Pro upgrade" — unconfirmed which is current); spend cap ON.
- Projects: ethio-prod (dashboard ref `zwmvxvzzvjvtdcfcwiuf`) and ethio-staging (ref `jatpuhfdjfzctjipklmk`), both us-east-1, in the SAME organisation — a fair-use restriction would hit prod too.
- Staging is automation-only: no admin console is connected to it; nothing is written there outside the tests' scratch rows; a ledger mark is written only by a migration file.
- Migrations of bundles 3 and 4 (file fragment → declared mark; all on ethio-prod and ethio-staging):
  - M1 `20261003215007_b9aa66a4` → `20261003220000` (follow-up `20261003215042_bb808e1a`); M1b `2a467fcc`;
  - M2 `18556a32` → `20261004020000`;
  - M4 `2f361c07` → `20261004040000`; M4b `5118f016` went out without its mark and M4c `756bcd49` → `20261004070000` healed it;
  - M5 `923dd4cb` → `20261004090000`; M5b `02084273` → `20261004160000`;
  - M6 `e44f20e5` → `20261005100000` (operator-pasted on both databases because the tool cannot apply an existing file);
  - M7 `9347e038` → `20261005040000` (applied on prod by the executor's tool at save on 2026-10-05, on staging by the operator).
- An empty placeholder file `20261004072852_d59800cd` also exists (the executor's tool once sent it); the nightly of 2026-10-04 died on "STAGING BEHIND: apply 20261004072852_d59800cd" before the operator's staging apply.
- INC-433 (OPEN, low): M7's mark `20261005040000` is LOWER than M6's `20261005100000`, because M6's mark was chosen about eleven hours ahead of the brief's rule. So `select max(version) from public.migration_marks` reads `20261005100000` on both databases while the newest applied file is M7. CI is unaffected: `scripts/e2e-migration-preflight.ts` compares the SET of declared marks with the ledger (`missingAgainstLedger`, line 117).
- Rules from INC-433: a read-back asks for the specific row (`select version from public.migration_marks where version = '<mark>'`), never max; the mark rule in every brief gains "and above the ledger's current newest mark"; the next migration heals M7's mark upward with the UPDATE form the preflight understands (`UPDATE public.migration_marks SET version = '<new>' WHERE version = '20261005040000'` — the DEC-022 healer law in the preflight's comment at lines 76–80); the comment in `scripts/check-migrations.sh` lines 322–323 promises monotonic marks and should be made true again.
- The apply routine (section 8.2 has the full text): the executor writes the migration, runs `scripts/check-migrations.sh` ("Self-marking guard OK"), saves it — the tool applies it on ethio-prod — pastes the read-back and the line "apply <uuid-fragment> → expect mark <value>", and stops; the operator applies the same raw file in the ethio-staging SQL editor, reads back the specific mark, and sends "continue". CI's E2E preflight stops with "STAGING BEHIND: apply <file>" until staging holds the file's declared mark; that red is the staging step, not a defect.
- pg_cron on the live database: `catalog-find-sweep` every 5 minutes; `seller-name-sweep` at `23 2 * * *`; `name-folds-rebuild` hourly at `41 * * * *`; `listing-expiry-sweep` (M5). Every scheduled run writes a heartbeat row.
- Rate dials: six `rate_dials` rows after bundle 3 plus bundle 4's options dial (400 an hour); a test never raises a dial — it gets a `rate_overrides` row for its own user.

### 3.3 Catalogue

- Live on ethio-prod after C29 and c29b (imported 2026-10-05 about 03:35Z on the published site): 169 categories · 563 definitions · 1,488 link rows; 15 roots; zero live listings (the project is pre-launch).
- The import lines: categories added 1; definitions added 8 · changed 8; c29b changed 1; links added 20 · changed 3 · unchanged 1,465 (3 "origin" read-only rows ignored, as always); 10 names approved in Translations. The audit `audit_c29.py` passed with 0 issues before the import.
- The new leaf: Food & Beverages › Cooked Food to Order, slug `cooked-food-to-order`, under `food-drink` (order 11), secondary parent `services` (shown last under Services), icon `CookingPot`.
- Whether the secondary parent landed on prod is UNCONFIRMED: the categories importer drops `secondary_parents` on a create row (INC-314, open); the walk list expected the leaf "also shown last under Services"; the walk's line 1 reported only the Dishes finding (open-items [2.4], [7.13]). Read the categories export for `cooked-food-to-order`'s `secondary_parents` at the C30 audit. Until INC-314 is fixed a new leaf with guests is a two-pass delivery.
- C29's classification (Food Type = a dish such as "Doro Wot", with a Dishes tick list prefilled from the type) is superseded by the operator's C30 ruling of 2026-10-05 01:40 local ("Doro Wot → Doro Wot is duplication"; a diet-based Food Type). C29's rows are live until C30 replaces them; the leaf has no live ads, so C29 rows may be deleted or renamed. C30's plan ends at 169 · 569 · 1,500 (sections 4.1 and 7.3). INC-434 (list facts tick a tick list) was built for the C29 shape and remains correct engine behaviour.
- Standing catalogue limits: help text ≤ 240 characters (first sentence ≤ 60); ≤ 5 aliases per answer, each 1–32 characters, unique within the definition; an option's `allowed` list ≤ 5 targets and ≤ 150 values each (150 live since bundle 2's migration `7423f49a`, 2026-10-03 — the C29 prompt still said 50 and the curator has not been told); option lists ≤ 1,500 (DEC-103); `visible_when` ≤ 480 characters and ≤ 64 values; `facts` ≤ 20 entries.
- A specifications-page row never carries a condition on a price-page row. Price-page rows are chosen by key family (DEC-121): `^(pricing_type|unit_of_sale)(-|$)`; `^(pack_quantity|net_weight_g|volume_ml)(-|$)` when the category links a `unit_of_sale` key; `^quantity_available(-|$)`; `^(lease_term|payment_frequency|payment_plan|min_hire_days)(-|$)` or `term_*`.
- Engine mechanisms built in bundle 4 that NO live catalogue row uses yet: `settled` ranges (INC-374); two-pair conditions `k1=a|b&k2=c|d` (INC-381); the `{country}` and `{category:<slug>}` tokens (DEC-124); a second pricing basis under a condition (DEC-122). The curator has NOT been told any of them is live (section 7.4).

### 3.4 Legal

- Six files land under `docs/spec/legal/` with the records turn: `README.md` (the publishing statement in English and Amharic, the tick "I certify the above." / «ከላይ ያለውን አረጋግጣለሁ።», the table of settled points, the not-built list, the lawyer's six points), `terms-of-service-v1.en.md`, `terms-of-service-v1.am.md`, `privacy-policy-v1.en.md`, `privacy-policy-v1.am.md`, `review-of-2020-documents.md`.
- Their source is the Claude Docs document "ethio.com legal drafts v1 (pre-counsel)", `https://claude.ai/artifact/Rdewscr3WciBsuKZUzTvhq` (id `c7797d19-0a19-440f-8289-c45c07d0c734`, six tabs). The English text is binding. The operator reviewed pre-counsel v1 and agreed ("i REVIEWED THE PRECOUNSEL v 1 DOCUMENT AND i AGREE"). The Amharic still needs a native speaker's read.
- DEC-128 (2026-10-04): 18 or older, confirmed with the single acceptance tick "I am 18 or older and I agree to the Terms and the Privacy Policy."; no date of birth collected; an "Under 18" preset reason on the admin's deactivate action; country-law notes to the source ledger and the Counsel item; the standing counsel ruling kept (a lawyer reviews at the Ethiopia-entity milestone and that does not block launch).
- DEC-129 (2026-10-04) — spec L1: legal documents (Terms, Privacy Policy, Publishing statement) managed and versioned in an admin "Legal" section, with immutable published versions in English and Amharic, a change summary and an effective date; acceptance at sign-in for all three doors, existing accounts and re-acceptance after a material change (default notice 30 days); the acceptance record (user, document, version, UTC time, language, sign-in method; no IP address) plus the latest accepted versions on the profile row (the operator's addition); the publishing certification above Publish (the global statement plus one per country where the ad shows and for the seller's home country; one required tick) on publish, edit and renew, recorded per ad per action — it replaces bundle 4 step 19's no-tick line and `listings.attested_at`.
- DEC-129, continued: "no fact is typed into the legal text" — the operator's name and address, contact e-mails, provider list, liability amount (100 US dollars), notice days, response time (30 days plus up to 60 more for complex requests) and retention periods are admin legal settings frozen into each published version; machine translation of each version into every active language, English binding; the acceptance screen shows three key lines above the tick; a fixed buyer safety line beside the seller's contact on every ad ("ethio.com does not verify sellers or ads. Inspect before you pay.").
- DEC-130 (2026-10-04) — retention (spec L2): a sold or no-longer-available ad keeps its page 30 days with a ribbon, then 12 months in My ads; an expired ad is gone from public view at once and stays 12 months in My ads; a seller-deleted ad is gone at once and a copy is kept out of sight 12 months, uniformly in every country; reported / enforced / held ads: case close + 3 years; a closed account's identity 12 months; messages follow their ad; technical records 12 months (the supervisor's call, a setting); periods are admin settings; a hold flag; a restricted, audited archive; a purge job with a heartbeat that also covers the Supabase auth session and audit rows that hold addresses.
- The operator's rulings on the legal text (in the S44+ session block and the README): the operating company is ethio.com LLC, organised in Georgia, USA, with the registered address the README carries (checking the spelling of "Ethio.com LLC" against the registration is owed); Georgia law and courts; mailboxes legal@ethio.com and privacy@ethio.com to be created by him (the drafts also name security@ethio.com; nobody was asked to create it); Resend and Lovable named as providers "for now", every such fact changeable from admin; no sale of data, no advertiser sharing, no marketing e-mail; the three added clauses kept; liability limit 100 US dollars "OK".
- More rulings: gambling, betting and lotteries "BAN THEM" (REQ-028 gains the line; a screening rule follows when moderation is built); no phone number printed for the copyright agent; the agent's registration with the United States Copyright Office "NOT YEST" (the supervisor guides him at launch-checklist time: 6 US dollars, renewed every three years; the form asks for a phone — a separate voicemail number); the right to act without notice declared (Terms 5) and a very strong disclaimer (Terms 12) — "OK, AGREE WITH IT. PROCEED."; ads will be posted automatically on ethio.com's OWN social channels with the permission in the Terms and no per-ad opt-out (the supervisor's reading of his words; not corrected — open question [8.27]).
- What is drafted versus built: NOTHING of L1 is built. At `48d3c53b` the app has no `/terms` or `/privacy` route (the footer carries labels only), no acceptance at sign-in, no age rule, no date-of-birth field, no legal section in the admin console, no general e-mail send path (only Supabase Auth e-mails; Resend is in test mode), no Report button, no "Your data" page, no My ads screen, no purge job. A published ad is left "In review" and nothing moves it to live.
- Bundle 4 step 19's no-tick line above Publish and `listings.attested_at` stand until L1. Before any legal text is published, every feature it describes must be live or its clause removed — the list is in the README and open-items [3.42].

### 3.5 Accounts and environment

- GitHub: `https://github.com/tesfayekb/ethio-marketplace`, PUBLIC until launch (DEC-116: CI on a public repository is free; private would cost ESTIMATE 300–600 US dollars a month at the current push rate).
- Before the repository is switched private: attach it to the supervisor's session first, test that the supervisor can read it, only then switch — otherwise the supervisor loses all reading of code and CI. The operator glances at GitHub → Insights → Traffic every week or two while it is public. No licence file (all rights reserved by default); the "all rights reserved" notice file was offered and not answered ([8.25]).
- CI: about 22–25 minutes wall per push; 25 jobs; six E2E shards at 2 workers plus smoke, email and the signal-only "changed" lane (DEC-023-B: a lane-only failure with a green matrix is contention noise); two Playwright projects (mobile-360, desktop-1280); 1,187 tests passed on run 37264070069 (turn 11, 2026-10-05). A newer push cancels the run on the previous commit. Nightly E2E at 06:00Z by cron (`.github/workflows/nightly-e2e.yml`), everything one at a time including `@global-state` tests.
- Supabase: spend cap ON and stays on. The Fair Use Policy applies from 2026-11-01; staging's monthly active users were 125,442 on 2026-10-01 against 100,000 included — the E2E account pool (DEC-097/DEC-099) is the fix and its adoption tally is unrecorded. Logs 41.8 GB against 20 GB included (not billed until early 2027; ESTIMATE about 11 US dollars a month at that volume). Staging compute Small. "Prevent use of leaked passwords" is ON in both projects (the launch-gate line still says "enable on upgrade").
- Restart path for an unhealthy Supabase project: Project Settings → General → "Fast database reboot" or "Restart project"; diagnostics Reports → Database first (INC-318).
- Executor platform (Lovable): published app at `https://ethio-market-dawn.lovable.app`, Lovable hosting fronted by Cloudflare, server code as a Worker; connected Supabase project ethio-prod; connected branch dev; Lovable Cloud is banned.
- The platform keeps proposing framework "security updates". Since DEC-126 (2026-10-04) a package or framework change is named first with its advisory or reason and gets its own turn and its own CI run; it is never declined by its label (INC-418 reversed the INC-372 habit). `bun.lock` resolves 188 packages to the platform's private npm cache (INC-420, a close-out census item).
- Project Knowledge v3.10 live (2026-09-17); the mirror file in the package carries its text; the proposed v3.11 is not installed.
- Domain: ethio.com is a DNS zone in the operator's own Cloudflare account (Free plan); Cloudflare's "Add visitor location headers" transform is ON. The domain STILL SERVES THE OLD WordPress site with its 2020 legal pages (`/terms-of-use/`, `/privacy-policy/`). The cutover is a launch-gate item (acceptance: `/api/geo` answers `source: "cf-visitor"` with city; rollback: grey-cloud both records).
- Google Search Console: ethio.com verified by the "Domain name provider" method — the DNS record in Cloudflare must stay; do not submit a sitemap until the browse phase. The first Performance export covered 30 May – 18 June 2025 only. The old site held four gambling pages (a likely compromise); the operator trashed them; changing or deleting the former developer account's password was advised and is not confirmed done.
- The scheduled reminder `trig_016JrUYr5YK4RotRufpxno5P` ("Search Console re-export reminder", run once at 2026-10-05T12:36:00Z, created 2026-10-02) is bound to the OLD supervisor session `session_011qnXgsftyRPnYgCb94TsYN` — confirmed by a read of the account's scheduled-task list at this write. It will fire into a session nobody reads. If the operator wants the reminder, the new thread re-creates it (its text: Search Console → ethio.com → Performance; date range 16 months; Export; send the file — to see whether the months after June 2025 filled in) or asks him for the export when he is ready.
- Maps: Esri (ArcGIS Location Platform) static basemap tiles on Leaflet, OpenStreetMap as the automatic fallback. The `ESRI_API_KEY` was created 2026-09-30 with the platform's maximum expiry of one year, and nothing warns before it expires (DEC-091's Admin › Services page is approved and not built). Esri refuses tiles on any origin but the published site and `*.ethio.com`, so preview, local and staging always show the fallback. Confirming business use on Esri's free tier is owed by the operator.
- AI: Gemini (`gemini-3.1-flash-image` for category images; the "Suggest icon" call to `gemini-3.5-flash-lite` returns a fallback icon since a 400 on 2026-10-02) and Google Cloud Translation v2. CI and local runs are fake mode (`GEMINI_FAKE=1`, `E2E_FAKE_TRANSLATE=1`).
- E-mail: production Resend in test mode (sends only to the operator's own address until a domain is verified); staging auth e-mail through Ethereal SMTP (ephemeral credentials; when they fail every push is red and main cannot promote — re-create them FIRST).
- Sign-in doors: email, Google, Telegram; the production Google OAuth client is in Testing mode.
- The claude.ai Project "Ethio marketplace" attached to the supervisor: its description is the v0.1 payments-era text; its three attached documents were `handoff-next-thread-2026-09-02.md`, `claude-supervisor-instructions-v1.8.md` and `lovable-knowledge-v3.6.md` until this handover and the v1.13 instructions were written there (section 10.2).
- The project memory files `governance-laws.md`, `ways-of-working.md`, `product-decisions.md` (full), `product-decisions-2.md`, `index.md`, `preferences.md` and `areas/ethio-domain-hosting.md` hold the operator's directives and rulings; several lines are out of date (listed in `rules-and-directives` 7.3 of the compile); the records package is the current record.

### 3.6 Records

- What the records turn lands, and where, is the map in section 10. Until it has landed and been verified by sha256, the repository's ledgers end at DEC-080 / INC-307 (2026-09-28), its newest handoff is 2026-09-28, `system-state.md` is at 2026-09-25, `instructions-amendments.md` stops at v1.9 and the Knowledge mirror is v3.8.
- Numbering after the records turn: next free INC-438; next free DEC-132 (DEC-131 is the price table); D-rulings (operator product rulings of the posting era, D19…D72) next free D73; supervisor slips next S93.
- Slips S60–S85 were numbered by the compile; S86–S92 are the slips of 2026-10-04/05: S86 the INC-432 verification miss; S87 the `git fetch origin ci-evidence` prompts; S88 the corrupted inline Amharic character; S89 searching the transcript for the Knowledge text instead of asking the operator; S90 "a prefill can tick a list" told from the docs; S91 "stop at the apply line" when the tool applies at save; S92 the walk line written from the catalogue file.
- Test ids at `48d3c53b`: PW-160, PR-25, AT-69, CT-35, LT-15 and TR-35 are the highest.
- Seven numbers have NO definition in any source and are recorded as "not defined in the record": DEC-090, DEC-101, DEC-102, INC-349, INC-352, INC-364, D67. Do not reuse them and do not invent a meaning.
- INC-392 and INC-394 are labels matched to events after the fact. "G29" meant two proposals before v1.13 fixed the numbers (G29 = fix the class, not the instance; G30 = verification on dev; G31 = walk lines).

## 4. IN FLIGHT RIGHT NOW

### 4.1 The curator: C30 rows

- The C30 plan (`e931c366-c30-cooked-food-plan-2026-10-05.md`) was received about 05:45Z and ruled by the operator at 01:40 local (05:40Z) on the supervisor's paste-ready recommendations: plan yes (the built title for the leaf becomes the diet alone); name proposal 1 (rename `event-venues` → "Hall & Venue Rental" / «የአዳራሽ ኪራይ»; Events & Catering keeps its name and takes the six dish rows); Food Type names A (Fasting Food / Non-fasting Food / Fasting & Non-fasting Food); a condition may read a tick-list answer.
- The tick-list condition is a first use. The supervisor checked the engine: `attr_visible_when_met` reads array answers through `attr_answer_tokens`; the link-cell refusal has no sibling-type rule; the screen's `pairMet` handles arrays. The curator's own calls were accepted (G17).
- The curator is building the rows on fresh exports the operator attaches.
- The plan's content: six dish rows (Starters & Finger Food, Fasting Dishes, Non-fasting Dishes, Includes Fish yes/no, Served With, Desserts; butter pairs Shiro / Shiro with Butter, Gomen / Gomen Kitfo, Firfir / Firfir with Meat); a `Per Agelgil` answer on `unit_of_sale-food` (Serves on card 3 required, Net Weight optional); `term_min_order_people` 1–1,000 on the price page for agelgil / package / tray / Other; an own Pickup & Shipping row scoped `pickup|local_delivery`; Delivery Included shown when `local_delivery` is ticked; a five-file import path; end state 169 · 569 · 1,500.
- Exact next action: when the files arrive (the operator forwards them and the exports they were built on), audit on the model of `audit_c29.py` with the checklist in section 7.3; then give the operator numbered import steps with the expected preview per file; approve the new names in Translations; decide whether a short walk follows (the rule since 2026-10-01: a data-only change the audit proves gets no walk line; C30 changes what the form shows, and the C29 import got a six-line walk).

### 4.2 The executor

- Nothing is in flight after the records turn. Bundle 4 is closed; no bundle 5 brief exists.
- The next executor work in order is the engine batch's executor half (section 5.2) or L1 (section 5.3), whichever the operator confirms first; neither has a prompt yet.
- If the records turn's report is in hand and not yet verified: verify every imported file byte for byte (sha256) against the package list in the import prompt (section 11, item 1).

### 4.3 The Search Console comparison

- The reminder fires at 12:36Z into the old session (section 3.5).
- When the second export arrives, compare it with the first (30 May – 18 June 2025; 306 clicks, 25,230 impressions; 76 % Ethiopia, 14 % US; 87 % phones) and update the redirect and visibility notes in `docs/governance/visibility-plan.md` (its section 3 and rule R9). If the data stays thin, the old site's top pages come from Cloudflare's traffic report instead.
- Leave the Search Console DNS record in Cloudflare; submit no sitemap until the browse phase.

### 4.4 Open operator questions (none blocks work; the stated default applies)

- [8.24] Store the IP address with each legal acceptance as evidence? Default: no (the spec leaves it out).
- [8.26] 14 or 30 days' notice before a material change to the legal documents? Default: 30.
- [8.27] Did "automatically post these in social medias … no opt out" mean ethio.com's own channels (the supervisor's reading, on which the Terms were written) or the sellers' accounts? Default: own channels.
- [8.23] Must a business also give a first and last name? Default: no (business name only).
- [8.29] The cheaper-CI offer (full suite only on the last push of each executor turn, or CI on the operator's machine) — wanted? No answer. It would make a private repository affordable and is a harness change needing its own DEC under G22.
- [8.25] A short "all rights reserved, no permission granted" notice file in the repository? Offered, unanswered.
- [8.28] Real flag images on Windows desktop browsers; "ethiopia" / "ethiopian" allowed in a seller name? Both treated as no.
- [8.30] Small checks never answered, each treated as settled: Teff Flour's "Made in"; the "25%" city-line width; Motorcycles with Model = Other and Fuel Type; Skincare › Moisturiser's Condition position; Wood & Timber card 3; commercial rent per m² "sooner?"; the Beauty import re-check; the reserved-names matching rulings of 2026-10-03; the Kirkland reading.

### 4.5 Conditions to read on the first message

- The nightly E2E run of 2026-10-04 (run 37188134063 on `c6595265`, 08:12Z) is red with zero tests parsed: the runner died in global setup on "STAGING BEHIND: apply 20261004072852_d59800cd" — the window before the operator's staging apply of that morning's bundle 3 migration (the half-landed window the instructions call PLATFORM-ORIGIN; it closes with the completed landing). No source rules on it.
- The nightly of 2026-10-05 (06:00Z) had not been reported on `ci-evidence` at this write — UNCONFIRMED; read `nightly-status.md` and rule.
- `listing not found` server lines: 8 on run 37264070069 (shards 3, 5, 6) and 7 on run 37268978090 (shards 3, 6) — the one message off the allowlist on both; the INC-323 target was 5 per run (INC-398). DEC-083 makes the server-error census gating from 2026-10-12 after five consecutive runs with zero off-allowlist SQL-class lines — no tally exists (section 9).

## 5. THE PLAN AHEAD, IN ORDER

The order is the supervisor's as stated on 2026-10-04/05 (open-items section 2); the operator has not re-ordered it. ESTIMATE marks a number not computed from data.

### 5.1 The records-import turn (documents only) — [2.3], [2.7]

- Scope: the executor imports the records package word for word; the supervisor verifies each file by sha256; no migration rides it, so no apply-pairing line; the `AGENTS.md` CI line is corrected from `git fetch origin ci-evidence && git show …` to the raw-address form.
- Contents: section 10. Owner: supervisor compiles (done), operator sends, executor imports. This is the turn that produced this file.

### 5.2 C30 audit and import, then the engine curator batch — [2.6], [2.5], [7.3], [6.7]

- C30: sections 4.1 and 7.3. Owner: curator → operator → the live thread.
- Then tell the curator that `settled` ranges, two-pair conditions, `{country}` and `{category:<slug>}` are accepted by the importer and drawn by the form; that the `allowed` ceiling is 150 (not 50); and whether INC-381 closes DEC-088 (section 7.4).
- Then write and send the engine batch prompt (one message, after the C30 import). Its contents, as the notes and the curator record state them:
  - `pricing_type-rent` (per_hour / day / month / year + flat) linked to the rent, lease and hire leaves with `visible_when` offer = rent|lease|hire, `allowed_options` and a default per group, following the price-periods note (17 leaves in the notes, 18 in the message to the operator — settle when the prompt is written);
  - short-term rentals: `pricing_type-travel` per_night | per_month, and `rental_duration` unlinked;
  - the `term_` rows (a minimum term with its own unit, advance, deposit);
  - the held INC-374 battery batch (`settled` on iPhone 18 Pro 4,056–4,288 mAh and 18 Pro Max 5,391–5,567; pins for iPhone 17 3,692 and iPhone Air 3,149; ranges for 17 Pro Max 4,823–5,088 and 17 Pro 3,988–4,252);
  - the INC-381 rows (the Pets Life-stage stand-in becomes a true hide and its informational notes go; Brand narrowed for bird, small-animal and fish food);
  - the `{country}` token rows (`product_origin` with `origin-food` merged into it — the merge is a console step —, `condition-vehicles`, `imei_registered`, the Services exam and level wording);
  - the 57 `{category:<slug>}` pointer lines (`c27-walk-pointer-lines-2026-10-01.csv`; "the conversion will be mechanical").
- The executor half of the engine batch (no prompt yet): the Amharic number-unit labels (words such as "people", "guests", "days" print in English on Amharic screens — seen live on the C29 rows); the INC-433 heal migration if no other migration comes first; any door change C30 or the rent/hire rows turn out to need (none is recorded as needed). Size: none stated.

### 5.3 L1 — the legal section (first build task after bundle 4) — [2.8], [6.1]

- Scope: DEC-128 and DEC-129 as summarised in section 3.4; test accounts accepted by default (a harness change that "carries its own decision record"); its first migration also heals M7's mark if nothing lands before.
- Tier A. Size: ESTIMATE four to six executor turns, two migrations. Numbers: DEC-128, DEC-129, REQ-034, REQ-028 (buyer banner), Q-018.
- Specs that exist: spec L1 version 2, approved in chat on 2026-10-04 ("approve. also make sure that we record in each user profile for the version agreeing terms of service"), its version 1, and five additions files — all verbatim in the specs archive (`docs/governance/specs-archive/2026-10-04-l1-legal-spec-v2-legal-documents-acceptance-publishing-certification.md` and its neighbours, section 10).
- Owed: the detailed Pass-2 spec (the admin screens; the tables for documents, versions, acceptances, certifications and legal settings; the doors and their deny cases; the three sign-in doors' flows; the harness change; the forward scan against later REQs) and its brief.
- Operator decisions still needed: [8.24] and [8.26] (carried as defaults otherwise); the pre-publication checks of open-items [3.37]–[3.41] (mailboxes, copyright agent, UK assessment, UAE re-check, native read and name spelling).
- Constraint: no legal text is published before every feature it describes is live or its clause removed ([3.42]).

### 5.4 L2 — My ads with retention (after L1) — [2.9], [6.2]

- Scope: DEC-130 as summarised in section 3.4, plus the seller's own list (mark sold, relist, renew, delete). It overlaps U6 steps E1 (My Listings) and E2 (expiry reminders, renew/relist) of the phase ladder and finalises clause B9 of `tos-privacy-source.md`, the "purge per retention rules" of REQ-022 and Q-012.
- Size: none stated.
- Spec: the research-and-proposal text approved in chat is in the archive (`2026-10-04-l2-retention-research-and-proposal.md`); the Pass-2 spec is owed (screens; the state machine for sold / expired / deleted / held; the archive and its access rule; the purge job with heartbeat covering auth session and audit rows; the settings rows; the tests).

### 5.5 The Report button and the "Your data" page (after L2) — [2.10], [6.3]

- Report: reasons include "appears to be under 18" and copyright; it replaces the address in Terms 15; until built, reports go to legal@ethio.com.
- Your data: request a copy or a deletion, identity confirmed by a fresh sign-in; a person who cannot sign in writes to privacy@ethio.com; until built, by hand.
- Numbers: REQ-026, REQ-012.4. Size: none stated. Specs owed; the Report flow must say where reports land (the admin inbox of [2.20] is the recorded candidate) and how they meet the moderation console (REQ-021).

### 5.6 The price table — DEC-131 — [2.11], [6.5]

- Up to six lines per ad, each a short label or "serves N" plus an amount; lists show "from" the lowest; one ad per size until then, the size typed into the title.
- Ruled 2026-10-04 ("AGREE ON ALL THREE"), "after the legal pages (L1) and My ads"; its position relative to 5.5 is not stated.
- Spec owed; it must say how the title rule (DEC-111, no price in the title) and the "from" display meet the feed and the review page, and what the curator's `pack_quantity-serves` row becomes.

### 5.7 The spec for posting ads on ethio.com's own social channels — [2.12], [6.4]

- Supervisor work, not started.
- First check each service's rules on automated posting (a Telegram bot can post to a channel only as its admin; Meta removed third-party posting to groups in 2024; posting to a Facebook Page or an Instagram business account needs Meta app review); note the EU and UK right to object.
- Design of record: `docs/governance/visibility-plan.md` §1 (own Telegram channels by category and city fed by a bot with every approved listing). Numbers: ACT-G2; row 12 of the legal README's table. Operator point [8.27] open.

### 5.8 The close-out bundle ("bundle 5", before the phase closes) — [2.13], [6.6]

- The seven older parked parts of bundles 1 to 3 (S1, S2/S3, T with T4, A, B, C, Part O with INC-369 and INC-370) plus the "Bundle 1" line, the D+L+M line and the S2 re-time list. The first task is to reconcile `roadmap.md`'s truth pass against the changelog and the tests, not to rebuild (conflict [12.20]).
- The search-timing ruling the supervisor owes (INC-363: warm p95 306 ms at the edge against 300 ms, the database at about 11 ms; edge caching is the candidate).
- The E census: the posting form's load time on a slow phone (INC-351); the `listing not found` lines (INC-398); the INC-368-class AT-58 lines.
- The final full DEC-023 run including whole-project lint.
- CI reporter fixes INC-419 (ESLint error lines not extracted) and INC-429 (no error-context file); the flaky-test items not yet closed; DEC-098 stage 2 (remove the six frozen evidence files from dev) with the DEC-096 detector; the account-pool adoption tally (DEC-097/099) and the DEC-104 trial; INC-420 (the private npm cache census).
- The security census: INC-409 (`has_permission` callable by any signed-in user for any target — needs a caller census of its 62 policies first); whether the seven helper functions M6 added to `scripts/public-surface-allowlist.txt` stay callable by signed-in users; the 161/163/164 older database-checker warnings.
- Size: ESTIMATE six to eight executor turns, one staging apply, no walk (stated 2026-10-03, before later additions). Brief owed.

### 5.9 Smaller items with a fixed place

- The e-mail announcing a material change to the legal documents: needs the notifications pipeline (REQ-031) and the Resend sending domain; live before the first material change after launch ([2.14]).
- The cheaper-CI offer, not accepted ([2.15], [8.29]).
- Later bundles named and not specified: the posting-limits bundle — D69 Platform Controls with D64 the AI switchboard: lifetime by plan level, sale and discount windows, photos per plan, on/off switches for every AI feature; AI-made seller-name suggestions wait for it ([2.16]).
- The photo clean-up bundle — D65 Photo Studio: camera capture, clean-up, optional AI improvement, AI screening, real photos on the public card; the only decision it needs is spend per background removal (ESTIMATE one or two cents per photo); the ribbon line in `roadmap.md` ([2.17]).
- The Settings bundle — profile, contact channels and home country outside an ad; the door `change_home_country` exists, no screen ([2.18]).
- Sizes and discounts — D68 price drops: a seller never types the "was" price ([2.19]); "request a missing place" with an admin inbox for structured messages ([2.20]); expiry notices and the "still available?" reminder ([2.21]); per-market presets, units and the Amharic number-unit labels ([2.22]).
- Outside the wizard ([2.23]): the screening step (REQ-021; today nothing moves an ad from "In review" to live); the public ad page with "Show contact" (the door `reveal_listing_contact` is built and tested; no screen), real photos on feed cards and share buttons (ACT-G1); messaging with e-mail notices (U8); store pages at ethio.com/<name> (DEC-108; the guard is built, the route is not); verified businesses.
- The phase ladder U6 → U7 → U8 → launch gate as `docs/governance/roadmap.md` (stale, 2026-09-02) states it ([2.24]).

### 5.10 The launch gate

- `docs/governance/launch-gate.md` (last changed 2026-09-17; the records turn adds the owed lines) — "pre-real-users; none blocking current dev".
- In file and NOT DONE: the Resend sending domain; Cloudflare Turnstile and the CAPTCHA toggle (the sign-up check is a seam only); the production Google OAuth client; Supabase redirect URLs at cutover; executor-platform settings (Hide-badge ON, Visitor-analytics OFF, Auto-fix-security OFF); Pro-upgrade session limits (ACT-U0-1); full act-as impersonation (ACT-U3-1); entity machine translation and SSR inlining (ACT-U4-1/2); the ops security review (INC-409; the linter warnings); the DNS cutover; the partition rehearsal (REQ-033, Q-014/Q-015); moderation go-live; the Counsel item (Q-014, DSA; gains the DEC-128 country-law notes); key rotation of every service-role key that transited tooling; the launch re-runs (D-8, D-10, `p1f-identity-unlink.ts --recheck`, the Guard Proof workflow — not dispatched since 2026-08-03, ACT-C3-1); native-speaker review of all Amharic copy; trademark clearance; the Lighthouse budget; visual-regression baselines; the translation era's carried items.
- DONE: EXIF strip (`src/server/media/strip.ts`); INC-389 (contact permissions, M1/M1b); the alias rules (DEC-107).
- Lines owed (added by the records turn): the repository goes private at launch in the stated order (DEC-116); the installable PWA before launch (REQ-039); keep or remove "We email you when a message arrives"; redirects from the old site (rule R9) and the six businesses to invite back first; the legal check of the contact-switch consent wording and the previous-seller-name display; the native proofread of the reserved-names Amharic column; the Cloudflare AI-bot block and rate rule; the legal pages and acceptance live; the change e-mail; the mailboxes; the copyright agent; the UK children's access assessment within three months of opening the UK; the UAE re-check before January 2027; the native read of the Amharic legal text and the company-name spelling; every described feature live; the Report button, Your data page and social posting on the roadmap; the two 2020 pages coming down at cutover; Esri business use and the key's expiry; the "Prohibited & Restricted Items" policy (draft `c25-prohibited-restricted-items-policy-DRAFT.md`, counsel review pending).
- The lawyer's review itself is NOT a launch blocker by standing ruling.

## 6. WHAT THE OPERATOR HAS RULED THAT IS NOT IN A DEC

### 6.1 Standing directives on how to work with him

Each is his, dated; his words are quoted where the record has them (typing as typed).

- Short replies, decision first: operator-facing messages lead with the decision made or the single action needed; detail lives in the repository. "short answer" (2026-09-28, 09-29, 10-01). Since 2026-10-05 01:40Z ("your work is taking too long") the supervisor answers in two lines and every long prompt goes as a file.
- Decide minor things yourself (G17): formatting, test granularity, cosmetic placement and tooling details within precedent are decided, logged and reported in one line as overridable ("say if you disagree"); only product scope, security trade-offs, spend, launch-gate items and spec approvals reach him.
- He does not want process proposals to parse: "fix it . i dont understand your porposal, just continue to fix appropriately. if there is any i have to do tell me explicetly." (2026-09-30).
- Ask clarifying questions before writing a spec when a product design could be built two ways: "ASK ME IF YOUY GAVE QUESTIONS FOR CLARIFICATIONS SO WE GET IT CORRECT." (2026-09-29).
- Research how peers do it first and bring the analysis: "please review how other websites implement that" (2026-09-28); "NEED TO REVIEW WHAT OTHER MARKELPLACE LIKE CRIAGELIST OR OTHERS SAY OR DO" (2026-10-04).
- Search the record before asking him whether an earlier step was done: "please review converstatio first and let me know the steps … its confusing to ask batch 15" (2026-10-02). When the record is silent, give a self-answering step (re-uploading an imported file previews nothing to change).
- Status on request as a short list, not prose: "just a summary list with remaining and completed tasks" (2026-10-04).
- Every turn that asks him to act ends with a numbered list, one concrete action per step, naming the system (the Supabase project and its ref, GitHub, the admin console, the executor). Never "commit it". Tell him beforehand to expect and allow the executor's "Modify Supabase database" dialog. When the executor stops, tell him the exact thing to send — the word "continue" or the block ("should i just send the above or say continue", 2026-10-02). Internal labels (step numbers, part letters) never reach him unexplained.
- Walks are short and selective: "to long of a walk to do , please be selective of inportant walks to do from now on" (2026-10-01). At most about eight steps (curator walks about six), each with its preconditions; only what the audit cannot prove (new questions or lists, show/hide changes, new prefills, anything visibly new); never a check walked recently ("did we not do this walk recently"); written click by click in English (Amharic only where the check needs it); on the published URL after Publish, phone width first; one walk per bundle, at the end.
- He stops a walk when defects pile up and re-walks after everything is fixed. Never ask him to confirm a home-country change on his own account (a 30-day clock starts — use Go back; a fresh state needs a test account). He does not want catalogue inconsistencies found by his walks: the supervisor reviews every category's attributes itself first.
- Prompts are delivered inline in one fenced block between horizontal rules (2026-07-29). A bundle brief, or any prompt carrying Amharic or exact text, goes as an attached file with a one-line paste. His paste of a brief is his approval, and the overridable decisions are listed in the reply that carries it. When a prompt replaces an earlier one, say so ("before i send to curator let me know if nthat if final prompt").
- He need not bring interim reports — only a ruling the executor asks for, a red still red after the executor's next turn, a report with a failure or question, a migration stop report, and the final report; otherwise he answers stops with "continue".
- Bundle the work: several items per executor turn, follow-ups folded into the next task — "can we make sure that we give lovable to fix multiple of those issues at a time, coz at times completing running a test for single turn takes more than 1 hr" (2026-10-03); "FROM NOW: BUNDLES, NOT SINGLE ITEMS" (2026-10-01).
- When CI is red, give the fix together with the next task in one prompt ("CI red, can give fix prompt together with the next step prompt next so we dont kill time") — unless he declares a green gate ("CI red, all need to be fixed before we move").
- One prompt per agent, never mid-task: "as said before both lovable and curator still working and i have not given the above prompt. it increases confusion to add more propts on work they do. let those finish and i will give you each of their work. once you verify all then you give me the above propmt with the necessary addendums." (2026-10-02). Curator review may run while the executor works, as long as this holds.
- CI as the proof: not fewer tests — "if a test is needed so it wont fail in future or no silent fails, then we need to implement it" — but the executor does not run the whole set every turn; its in-turn check runs the tests for the files it changed, CI keeps the full set on every commit, and no more tests move to nightly (DEC-114, DEC-115, DEC-119, 2026-10-03). "make sure everything is secure and doesnt cause further issues" is the condition on every speed-up.
- Every fix ships with tests covering security, performance, user-friendliness and weight. Root cause always, never a weakened assertion or a raised timeout; the time for deep analysis is granted.
- When an issue is found, fix the whole class everywhere, not the instance: "make sure not just fix one issue but reaserch wider issue and fix with detail review if similar problems exist other places" (2026-09-29; G29 in v1.13).
- The supervisor reads every CI run itself and never asks him to copy a log. It does not make him wait while it watches CI ("no more stops just to wait for CI"). CI time is reduced by design, not by cutting tests. After a push that needs a full verdict he sends the executor nothing for about 25 minutes.
- Where the executor can do a repository action, ask the executor, not him ("can you ask lovable to do that instead?", 2026-10-01). When the executor keeps stopping, restructure the work instead of asking him to keep pasting.
- Migrations: the executor applies on ethio-prod; only ethio-staging is his hand, with the step written as open the raw file → paste into the ethio-staging SQL editor → run → read back the specific mark. When a file already exists in the repository he pastes it on both (staging first). The supervisor says explicitly whether to apply on staging now or wait (he once applied before the review). Very large migrations are split into ordered parts.
- Rulebooks: an update of the supervisor instructions is handed to him as the FULL document to paste whole, never an amendments-only excerpt (2026-09-16). A Knowledge rewrite is a full replacement text within 10,000 characters that he pastes into the platform himself.
- Records: "keep in memory" saves a standing directive the same turn; "put in knowledge base" records a product rule where the executor and the curator read it (AGENTS.md through a prompt, the curator's rules, the project decisions); an agreed rule is saved as agreed and enters the ledger with the next brief; a future task he accepts is documented in the repository.
- Everything decided, planned and known goes into the repository so a handover loses nothing: "iT SHOULD BE EXTENSIVE AND COVER EVERYTHING PLANNED ABOUT PROJECT, EVERYTHING DONE, SO FAR, AND PLANS AND STEPS … NO LOSS OF INFORMATION OR DATA" (2026-10-04).
- Secrets and security: never ask him to paste a secret; the repository stays public while building and goes private at launch (DEC-116; "I dont want cost to rise while we are still building"); detail on an open security hole enters the repository only after the fix is live; every feature stays lightweight, secure, tested and performant; a security patch is never declined by its label.
- Costs: no cost increase while building; keep the Supabase spend cap on and reduce usage instead of paying overage; every outside resource is tracked for cost and health in an admin interface with a backup (DEC-091); every AI feature gets an on/off switch; for a paid service weigh performance and budget at scale and look for a free fast option first.
- Legal: answer with what the product does today, the legal framework per market and what peers do, each with sources, and read the ledger FIRST (the age question was answered without it and missed the 18+ decision of 2026-07-29). The standing counsel ruling is kept. Legal drafts are supervisor-tier "pre-counsel" texts he reviews. No fact is typed into legal text ("A MUST FOR ALL"). Legal discussion is parked the moment he says so ("nOW BACK TO LOVABLE WORK"). He wants business-legal advice as a recommendation plus peer practice plus the limit of the supervisor's knowledge, with the lawyer's points left for the counsel milestone. The supervisor guides the copyright-agent registration at launch-checklist time.
- Reminders: when he asks for one, set it ("remind me in 3 days", 2026-10-02). Housekeeping (deleting a check-in) needs no approval request from him.

### 6.2 Product rulings without a DEC number (highlights)

- Catalogue bans: alcohol and tobacco out (DEC-060; brewing ingredients such as gesho and bikil allowed as groceries); sexual wellness out ("keep sexual wellness as well as alcohol etc out", 2026-10-02); prescription medicines out; khat prohibited platform-wide; software and digital goods, social-media accounts, businesses for sale and work-abroad agents out; gambling, betting and lotteries "BAN THEM" (2026-10-04); wildlife and the Pets exclusions (DEC-061), no health guarantees anywhere; Kirkland out for good ("lets keep everything uniform rather than creating exception").
- Catalogue scope: Jobs and Tenders deferred to v2 (2026-07-19); Pets & Animals closed to further work (2026-10-01). Keeping a line out of the catalogue does not stop a post under an "Other" leaf — blocking at posting is the screening step's job, not built; the list is recorded for it.
- Catalogue principles: "better than Jiji in every aspect, never a copy of it"; no data or classification unless needed, every field sharp; catalogue effort follows real trade (the 29-leaf priority tier; the 100-ad rule); known products ask only what varies ("if a product have a known specification … we should just keep that opetion and dont even allow to change"); only card attributes are required (at least two must-fill cards, a third where every seller knows the answer); halal only where meat is sold ("NOT EVEN FISH"), fasting-friendly removed from injera and kept for pastry and cake; religious and dietary attestations are the seller's own statement; brand low unless it is the product's identity; "Made in" only where local versus imported is a real buyer divide; Unit of Sale before Quantity and every size question; help text short; every "Other" leaf asks what the product is; vehicle make and model lists alphabetical (brand lists alphabetical everywhere; phone and laptop model lists newest-first).
- The "ethio" name rule (inside DEC-107): no "ethio" anywhere in a seller name, "even if its ethio_coffee", also in the business name buyers see and in the Amharic spelling. Taken literally it also refuses "ethiopia", "ethiopian" and ኢትዮጵያ (the supervisor's reading, stated twice and not objected to). Aliases are not numbers; names under five letters are refused; one free correction within 24 hours; suggestions only from names typed in Latin letters. Reserved names are reservations for the real owner, not bans — the real organisation can request it and an admin assigns it. A verified business may later show a registered name that contains "ethio".
- Sharing: sellers share to their own Telegram, WhatsApp and Facebook from the last step and the public ad page; automatic posting into other people's accounts is "a bad idea and bad ask"; ethio.com posts on its OWN channels automatically with the Terms' permission and no opt-out (2026-10-04; the own-channels reading is the supervisor's — [8.27]).
- Languages: labels in the script of their language (Amharic labels in Ge'ez, product names transliterated, the Latin name as a search alias, nicknames aliases only); Ethiopians AND Eritreans are the community (Tigrinya shared; Tigrinya aliases held until a speaker checks); no wording hardcoded to Ethiopia ("it may be difficult to change hardcoded items … please put in knopwledge base" — DEC-094's `{country}` token); units follow the market (per-market units on the later list); legal documents dynamically translated into every site language, English binding; executor-written Amharic is read by the supervisor and guarded (INC-431).
- The catering direction (C28 → C30): occasion-food sellers "sell per the number of items they prepare and number of gusts"; a new leaf Cooked Food to Order under Food & Beverages, surfaced under Services; a price table as a later feature, one ad per size until then; no gluten-free tick ("gluten free" as a search alias on Teff Injera only); Food Type = fasting / non-fasting / mixed with fish set apart ("some consider as fasting and some don't") and the butter distinction (shiro with butter is non-fasting); agelgil as the unit with weight or persons served; a minimum order 1–1,000 persons; cooked food is not shipped internationally; "delivery included" only with delivery; the two "Event" names confuse (fixed by C30's rename).
- Markets and launch: ethio.com serves Ethiopians and Eritreans; every country the curator's dial recommended was opened (17 open markets at 2026-10-03: AE AU CA CH DE ET FR GB IL KE LB NO SA SD SE US ZA); Eritrea seeded closed pending a decision; expansion markets named: Kenya, Somalia, Djibouti, Eritrea; one database in the US at launch, in-country storage for Ethiopia "in a year or 2 depending on traffic"; no listing-date restriction (DEC-117, no end date by default); wider adverts become paid later; the free plan's coverage numbers stay 1 city / 1 region / 1 country.

## 7. THE CURATOR

### 7.1 How to prompt it

- One message per batch, after the previous batch's walk has passed and never while it is mid-task.
- The message format that settled: a title "Batch N — result and rulings (date)" or "C<n> — <topic>: <what>"; the import result of the previous batch; numbered rulings (one per curator question, each with what to build); NEXT (the scope of the next batch with its walk cap); WAITING (items held for the engine); the unchanged limits restated.
- State the base to build on ("the three fresh exports attached": categories, definitions, links) and ask for the expected preview per file.
- A research request is "research + plan only, no rows" (C28); rows follow only after the supervisor's corrections and the operator's rulings (C29).
- A prompt covers the whole class across the whole catalogue.
- Walk lines (at most about six, each with its preconditions) are run through the form simulator before they are sent.
- The curator's own instruction (its §7 dependency pass, §8 completeness pass, §9 pre-delivery audit, §10 seller-view review) lives in the curator Project and is in no source the supervisor holds. The curator's handoff of 2026-09-08 (`docs/governance/handoffs/2026-09-08-catalog-curation-thread-handoff.md`) is the written mission and file laws.

### 7.2 What it delivers, and the audit scripts

- Files: `c<cycle>-[b<batch>-]<topic>-categories.csv`; `-definitions.csv` (changed rows only, dependency order); `-links.csv` (the whole catalogue; untouched rows round-trip byte-identical); optional `-pass2`; `-translations-key-names-<date>.csv`; `-form-path-dispositions-<date>.csv`; `-help-census-<date>.csv` (empty = pass); `-settled-to-other-scan-<date>.csv` (the nine Food exception rows only); and the change note.
- Headers are the export's headers. The `options` cell holds one JSON record per option separated on `}|{`; option keys `value, label_en, label_am, parent, active, bounds, aliases, allowed, facts, swatch`.
- The supervisor's audit scripts lived in the old thread's session scratchpad and MUST BE REBUILT by the next thread. The scratchpad is session-local, and its snapshots (`merged_c27b19.pkl`, the state after batch 19) were reconstructions from the operator's export uploads, not live exports. Rebuild from the repository (`docs/features/attributes.md`, `imports.md`; the gate code `src/server/imports/registry.ts` and `gate.ts`; the migrations declaring `attr_option_shape` and `attr_cell_check`) and from the curator record (`docs/governance/curation/curator-record-2026-10-05.md`, PART 1 §1.4 and §1.5, which list every check).
- The scripts, by name and what each checked:
  - `audit_c29.py` (the C29 audit, 0 issues): option keys within the strict set; `label_en`/`label_am` present; aliases ≤ 5, unique, 1–32 characters; `allowed` ≤ 5 targets and every value present in the target's option list (it still used 50 as the per-target ceiling); `facts` values present in the target and inside the option's own `allowed`; help ≤ 240; number definitions with min, max, decimals and format; no unassigned (`\p{Cn}`) or Hanunoo-range (U+1700–U+177F) code point in `label_am`, `help_text_am` or `options`; changed cells and option diffs per definition; link rows added / removed / changed / unchanged against the base; the `action` column empty; per leaf (the new leaf, `events-services`, `injera-bakery`): the effective rows own plus inherited, duplicate card ranks, every condition key linked on the same leaf with existing values, no DETAILS row conditioned on a PRICE row (the DEC-121 key families), `allowed_options` within the definition and the default inside the scope, no required row without a card rank.
  - `importer_caps.py`: the importer's option gates mirrored on every definition (aliases 1–5 of 1–32 characters, no control characters, no duplicates; `allowed` ≤ 5 targets of 1–150 values; `facts` ≤ 20, list facts 1–20).
  - `alias_gate.py`: the alias rules on a delivered file (count, length, duplicate within the definition, case-insensitive).
  - `eff_checks.py`: per leaf — duplicate card rank; fewer than two unconditional cards; unknown key; scope value not in the definition; default outside the scope; condition over 480 characters, unparsed, over 64 values, key not linked, value outside the key's options or scope, unhider ordered after its dependent; dependent before its parent; INC-292 (a `facts`/`allowed` value outside the target's link scope at a leaf where the option is reachable); DEC-057b (owner and target share no leaf).
  - `audit_generic.py` (batches 10 onward) and `merge_b17.py`, `merge_b18.py`, `merge_b19.py`: every changed definition and link row against the base, and the next merged state.
  - `check_direct.py`: the whole-catalogue problem list before and after, printing only NEW and RESOLVED entries.
  - `b12sim.py` / `b13sim.py`: the form simulator — for a leaf and chosen answers, each row HIDDEN, CHOSEN, GONE (settled to one answer), WRITE-IN (settled to Other) or ASKED (with prefill and the offered answers); used to check every walk line.
  - `b13checks.py`: references to inactive options; duplicate card ranks; fewer than two unconditional cards; more than one price basis on a leaf; a basis that is not a card.
  - `form_path_audit.py` / `fpa2.py`: the form-path worklist (class A — a question left open by an identity path; class B — a question asked for every type with no condition or narrowing). `state_now.py`: the catalogue state rebuilt from exports plus files. `audit_b16.py` / `audit_b16b.py`: the vehicle make and model list rules (alphabetical, Other last, each model's parent a make).
- The first time the next thread needs one, it rebuilds the merged state from the operator's FRESH exports (ask him to attach categories, definitions and links; the curator receives the same three) and writes the C30 audit from the check list above. It proves the checker on a planted error before trusting a clean result, and states the limit of its audit when it worked from a rebuilt copy.

### 7.3 The C30 audit checklist

- Files expected: the curator's plan names a five-file import path; the prompt asked for categories, definitions, links (a links pass 2 if needed) and the translations key-names file, plus the change note, the form-path dispositions, the help census and the settled-to-Other scan. Which five the curator means is stated in its plan — read the plan and the change note first. The expected preview per file and the import order come from the change note (the walk list of 2026-10-05 is the model: file → preview line → commit).
- Verify in the files:
  - `event-venues` renamed "Hall & Venue Rental" / «የአዳራሽ ኪራይ» (a rename changes `name_en`/`name_am` only; the slug never changes);
  - Events & Catering keeps its name and gains the six dish rows;
  - the three Food Type names of option A; the six dish rows with the butter pairs and "Includes Fish yes/no";
  - `Per Agelgil` on `unit_of_sale-food` (its label starts with "Per " / "በ");
  - `term_min_order_people` as a `term_` key (a price-page row) with bounds 1–1,000, linked where the plan says;
  - the Pickup & Shipping row scoped `pickup|local_delivery`;
  - Delivery Included's condition `<pickup key>=local_delivery` — the first condition on a tick-list answer: check that the key is a `multi_select`, linked on the same leaf, with the value in its options;
  - which C29 rows are deleted, renamed or changed (the leaf has no live ads);
  - no details-page row conditioned on a price-page row;
  - aliases Latin-only where ruled ("Eid" alias Latin only); no fasting-friendly prefill on fasting types (ruled NO on 2026-10-05); Serves required when shown (ruled YES); Fish under the two fasting types (ruled YES, c29b); the party-tray label «በግብዣ ትሬይ» kept;
  - no alcohol options; no Tigrinya aliases; no unassigned or foreign code point in any Amharic cell; help ≤ 240; `allowed` ≤ 5 targets and ≤ 150 values (if the curator still obeys 50, that is fine); cards 1–3 unique per leaf; required only on cards;
  - `cooked-food-to-order`'s `secondary_parents` = `services` in the categories export (the INC-314 check);
  - the end state 169 · 569 · 1,500 recomputed from the files.
- Import: on the published site (no Publish needed for data); the order the change note states (categories first when there is a categories file; definitions and links together unless the note orders otherwise; `-pass2` after); each preview line pasted before Confirm; any refusal or differing count ⇒ Discard and send the line; then Translations (approve the new names the key-names file lists); then a walk only for behaviour not walked before (the live thread's call, section 4.1).
- The supervisor's open question [9.22]: whether the first tick-list condition gets a proof test in a rows turn ("it's data; the door already proves it with multi-select tokens").

### 7.4 After C30: what the curator has not been told, and the engine batch

- Not told: that `settled`, two-pair conditions, `{country}` and `{category:<slug>}` are live in the importer and on the screens (the C30 prompt keeps C29's section B, which excludes them); that the `allowed` ceiling is 150, not 50; whether INC-381 closes DEC-088 (hide Net Weight when the unit is per kg at Grains, Spices, Honey, Meat, Coffee & Tea, Beverages, Snacks, Frozen, Pantry and Other Food; Volume when per litre at Honey, Meat and Beverages — the supervisor must say in words).
- Held by the curator: the 12 yes/no fasting-friendly locks until "W4b" (a never-issued turn for locked yes/no facts) lands.
- The engine batch is the next curator prompt after the C30 import (contents in section 5.2). Settle the rent/hire leaf count (17 in the notes, 18 in the message to the operator) when writing it.
- The Tigrinya speaker check: six aliases from the curator's own knowledge (ጸብሒ ደርሆ, ቅልዋ, ሓምሊ, ጣይታ, ሕምባሻ, taita) stay out of every file until a speaker checks them — an operator action [8.13].
- Other curator items: the multi-size proposal asked 2026-09-29 and never answered; the native-reader checks of Food labels owed since 2026-09-29/30 and, by the same rule, the C29/C30 names; the curator's side products routed (the alcohol word list → the moderation spec; the three form requests not taken up — a delivery-fee row, an orders-close date, a starting-price tick); the Amharic number-unit labels are an executor item, not a curator file; per-market presets and Class B rows wait for a second market; the curator's site-approval friction on jiji.com.et (two fixes offered 2026-10-02, outcome unknown).

## 8. THE EXECUTOR

### 8.1 The bundle brief rules

- Until a bundle 5 brief replaces it, the standing rules are the HOW TO WORK block of `docs/governance/briefs/bundle-4.md`, lines 12 to 25. Read them in full; by reference they say:
  - read the Parts whole first and follow the stated order;
  - each turn starts by reading CI for the last commit of the turn before it at the raw addresses, pastes the first six lines, fixes a red first, and asks for a re-run only when the failed job shows no evidence lines;
  - the one expected-red window between a door migration and the screens that match it, with the expected-red tests named in the stop report;
  - census before editing, stated in the report;
  - red first only for the defect fixes;
  - local E2E per turn = the spec files changed or added (at most three), both projects, 2 workers; `bun run e2e:changed` only when it prints five files or fewer; no end-of-bundle local run — the bundle closes on CI green for the final commit (DEC-119);
  - before each commit the whole `bun run test:unit`, typecheck, lint and `format:check` over the whole tree;
  - stop only for a migration's apply line, a question the brief cannot answer, or the end;
  - the migration rules (section 8.2);
  - every new GRANT to anon or authenticated named in `scripts/public-surface-allowlist.txt` with a reason; a new table with a user-id column declared in `e2e/helpers/pool-reset-map.ts` and reaped; a new source file added to the area table in `scripts/e2e-select.ts` in the same turn;
  - DB truth for every saved value; scratch rows only (G27); no page-position assertion (G28); `settled(page)` after an overlay helper;
  - no hardcoded user-visible string; new keys in en and am; `bun run i18n:usage` with both maps and `i18n:map-guard`;
  - limitations and out-of-scope needs named BEFORE the commit; a package or framework change never inside another task;
  - the decision and incident ledgers are not written in a bundle.
- Added in bundle 4 by rulings, to carry into bundle 5's brief:
  - each touched spec file is run whole, alone, both projects, 2 workers, 0 retries, and a file that is not fully green is not committed; after changing a screen, run every spec that exercises it;
  - a shared helper never changes its default (new behaviour is an option); no search-and-replace on spec files; a file is restored only from the commit the turn started on, and after any restore or scripted rewrite the per-file test-count line and `git diff --stat <turn start>` are pasted; a removed or renamed test is named with its reason;
  - `leaseUser()` for a signed-in account, `createUser()` only for a brand-new identity; a fixture with a fixed slot removes its own stale scratch leftovers (the e2e namespace only, older than ten minutes, child rows first) before it seeds (INC-428);
  - a file row for an existing row carries the row's CURRENT stored cells read through the service client at build time, never a constant, and a test asserts its own rows' planned actions, not a shared roster's totals (INC-437);
  - a poll that compares a DB count with the page reads both in the same step with a reload (the LT-13 class rule, INC-334, in the `admin-locations` spec header);
  - Amharic the executor writes is listed key by key in its report, and `src/i18n/locales/am-script.test.ts` is the class's CI guard (INC-431);
  - a shape the door accepts is a shape every screen reads (INC-434);
  - every step of the brief is checked against the diff by the supervisor, not the report's list (INC-432).
- Every prompt repeats the raw CI addresses and "read CI first"; "commit" is never asked of the operator; "Push, and END THE TURN" when a commit needs a full CI verdict; a long prompt, or any prompt carrying Amharic, goes as a file built by script from a vetted source.

### 8.2 The stop and apply routine, with the mark rule corrected

- A migration redeclares every function WHOLE from the live definition (`pg_get_functiondef`), keeping every header attribute unless the brief changes one by name. Before applying, the executor pastes for each redeclared function its argument list, provolatile, prosecdef and proconfig, live beside file. No DROP unless the argument list changes; a dropped function's REVOKE and GRANT are restated.
- In-file closers: each function's REVOKE and GRANT beside it; the proofs in one DO block that removes its own rows, on scratch rows with a scratch user or no caller (never a real account: M4 and M5 borrowed the oldest real account, a recorded executor slip); proofs that RAISE EXCEPTION or ASSERT; the mark as the last statement.
- Each file carries `-- e2e-areas: <area>[, <area>]` ("none" only for a ledger-only file). `scripts/check-migrations.sh` is run and "Self-marking guard OK" pasted before applying. A landed file is never edited (a healer file corrects it).
- A function reachable from the app connection never issues DELETE or UPDATE without WHERE (pg-safeupdate refuses it; a DO-block proof does not exercise that connection — only a route test does; INC-432).
- THE MARK RULE, corrected after INC-433: `INSERT INTO public.migration_marks (version) VALUES ('<mark>') ON CONFLICT DO NOTHING;` where the mark is `now() AT TIME ZONE 'utc'` on ethio-prod rounded up to the next hour plus one hour, LATER than the file's own UTC stamp, AND ABOVE THE LEDGER'S CURRENT NEWEST MARK (`20261005100000` today, M6's). The next migration also heals M7's mark upward with `UPDATE public.migration_marks SET version = '<new>' WHERE version = '20261005040000'`.
- The stop: the executor saves the file — its tool applies it on ethio-prod at save, after the operator allows the dialog — pastes the prod read-back of the SPECIFIC mark (`select version from public.migration_marks where version = '<mark>'`), never `max(version)`, regenerates `src/integrations/supabase/types.ts`, states "apply <uuid-fragment> → expect mark <value>", and stops. "Stop at the apply line" can only mean this: the stop follows the prod apply (slip S91).
- The operator then opens the raw file on GitHub, pastes it into the ethio-staging SQL editor (project ref `jatpuhfdjfzctjipklmk`, named in the step), runs it, reads back the specific mark, and sends "continue". A file that already exists in the repository is pasted by the operator on both databases, staging first.
- CI's preflight red "STAGING BEHIND: apply <file>" is the staging step, not a defect, and its pass is the proof that staging holds the mark.
- A door and the screens that must match it land in one turn after the door's stop; between them CI is expected red on the tests the stop report names. Within a single turn that ships a door and its client, the door migration is written last.

### 8.3 Local runs, red-first, reports

- DEC-114 / DEC-115 / DEC-119 (2026-10-03): the executor's in-turn check runs the spec files it changed (at most three), both projects, 2 workers, plus by-id runs of tests that use a changed shared helper; CI keeps the full set on every commit and is the proof; no more tests move to nightly.
- Decision rules with no tally kept: DEC-115 — over the next ten CI runs after a local selector run, failures in specs the selector did not print: 0 or 1 keep, 2 or more widen or revert; DEC-119 — a CI red in a spec that was not run, still red after the next turn, sends that area back to the selector's full list.
- Local runs are always fake mode and 2 workers (4 trips staging's sign-in rate limit); one local suite at a time; "poll on truth, never sleep" (no `waitForTimeout`, lint-enforced); a flake fix is proven with `--repeat-each 12 --workers 8`.
- Red-first only for the defect fixes: a test that reproduces a defect is shown failing before the fix (against the previous commit's build, by restoring old code locally, never by committing reverted code); the red tests of a part run together once; a test for a new feature needs no red run; a test that can no longer be shown red carries a positive control.
- Reports: only on green; every changed file from `git diff --name-only <turn start>`; nothing outside scope; every limitation named before the turn ends; CI's first six lines for the last commit; "Logs read: … · unavailable: …" per section, never zero for a source it could not read; mid-work three lines (done, left, CI).
- A "correction to my last report" is treated as a finding. A commit title or report that claims something not done ("Applied M6 to ethio-prod", "Confirmed CI green") is logged as executor drift.

### 8.4 What to do on a red

- Read the evidence files on `ci-evidence` before anything else, in order: `ci-status.md` (conclusion; SHA = the newest non-status commit) → `e2e-last-failure.md` (per source: failure bodies, error-context quotes, `[ssr-error]`/`[client-error]` tag greps, the runner-death classification when a source parses zero tests) → `guards-last-failure.md` (every job the Playwright reporter does not cover: build, typecheck, format, lint, component tests, guards, gitleaks, preflight) → `nightly-last-failure.md` when the nightly is the red → the flake ledger WHOLE (the running seven-day record, not one run's flaky list).
- Never ask the operator for a log paste. When a file lags a run still executing, wait and re-read (G18).
- Classification: only the preflight ("STAGING BEHIND") and its dependents red ⇒ the staging step; a 522 in global setup or "fetch failed" ⇒ staging transport (restore staging, re-run; Reports → Database first); a lane-only ("changed") red with a green matrix ⇒ contention noise (DEC-023-B); a red inside a named expected-red window ⇒ expected; a red whose head commit message is "Lovable update" or "Work in progress", or whose evidence names a half-landed turn ⇒ PLATFORM-ORIGIN until diffed.
- Everything else is fixed first, at the root cause, from the failure body — never by weakening an assertion or raising a timeout without a named cause. A guard failure (migration linter, i18n map, format) is the executor's own defect. A red board is never left standing while other work proceeds; the fix rides in the same prompt as the next task unless the operator declares a green gate.
- Known reporter gaps: INC-419 (the guards file does not extract ESLint error lines — only the 60-line tail) and INC-429 (every failure body says "context file not found"); `scripts/e2e-failure-report.ts:514` still heads the accessibility section "non-gating" though it has gated since 2026-09-29.

### 8.5 Flaky tests and the DEC-030 rule

- DEC-030: a test flaky three times in seven days gets an INC and root-cause work; retries are evidence, not concealment. The automatic list of such tests in every CI report was proposed and never built — the report only prints the rule — so the supervisor reads the ledger itself (three slips, S41/S42/S69, came from not doing so).
- At three or more flakes in seven days WITHOUT an INC (ledger read 2026-10-05):
  - PW-76 (`post-wizard-place.spec.ts`, "a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)") — three times on 2026-10-04 (desktop shard 5 twice, the fast lane once);
  - CO-4 (`admin-countries.spec.ts`, "open and close: opening publishes the market's tree, closing takes it away") — 2026-09-28, 10-01, 10-04 (mobile shard 1; the last an INC-210 guarded-outcome wait on `countries.is_active = true for XW`);
  - LS-6 (`shell.spec.ts`, "the nearest curated metro wins by geometry") — eight lines since 2026-09-28 (five on 2026-10-04) under the reopened INC-285 / INC-428 (the fixture pre-clean landed in turn 6); no source closes INC-285.
  - Also three lines each: PW-55 (10-01 ×2, 10-04; INC-430's failure "never explained") and TR-29 (INC-345, parked). Register or rule on each.
- Parked for a flaky-test turn ("CI-T2", planned 2026-09-29/30, never issued): INC-333 (PW-61), INC-335 (PW-35), INC-339 (the Amharic drawer check), INC-345 (TR-29), INC-285/INC-428 (LS-6), PR-7, LS-11 (INC-218), PW-58, the 28 older fast-refresh lint warnings, INC-322 (PW-61 "Undo within ten seconds" fails most runs at 8 workers). INC-334 (LT-13) left the list, closed by turn 11.
- Residue facts behind many flakes: cancelled CI runs skip teardown and leave scratch rows (a scratch user holding the handle `awashbank` made AU-12 red once); the setup reaper window is 3 hours (`e2e/global-setup.ts:512`; its comment says 1); the nightly sweep removes scratch users only after 24 hours (`e2e/global-teardown.ts:9`).
- `fullyParallel: false`, so a spec file is the sharding unit and no spec file should exceed about 25 tests per project. `e2e/post-wizard-specs.spec.ts` holds 37 and `e2e/post-wizard-bundle2.spec.ts` 30 at `48d3c53b`; the rule "the next test added there splits the file first" was not applied.

## 9. KNOWN GAPS AND RISKS

### 9.1 Conflicts between sources (open-items section 12B; both statements kept; what the record uses)

- [12.20] The root `roadmap.md` truth pass marks bundle 1's parts (S1, "Bundle 1", S2/S3, T, A, B, C, Part O, INC-371, INC-375, the D+L+M line, the E census) not done; `docs/_changelog.md` (2026-10-02), the tests PW-93, PW-94, PW-101, PW-105–PW-109, PR-19 and `src/features/posting/answer-tokens.ts` say built. The record follows the changelog and the tests; one of the two needs correcting in the repository — the close-out bundle's first task.
- [12.21] INC-363 (category-search timing): "closed as recorded (missed by 6 ms, hop-bound)" on 2026-10-02 against `roadmap.md:10` "stopped for ruling, no ruling since" and the supervisor's own later note that a ruling is owed. Kept open.
- [12.22] DEC-098 "awaits ADOPT" on `roadmap.md:30`: stage 1 was adopted on 2026-10-01/02; stage 2 is not done; the ADOPT meant may be the account pool's, which has none.
- [12.23] DEC-128 / DEC-129: the notes write "L1 APPROVED (DEC-128/129)"; the records give the age rule to DEC-128 and spec L1 to DEC-129. The records' split is used.
- [12.24] Labels that mean two things or were assigned after the event: "G29" (two texts until v1.13); "R1" (four rule sets); DEC-083 (reserved for D66, used for the server-error census — the census is the meaning); INC-333/334/335 mapped to PW-61/LT-13/PW-35 by order of listing only; INC-339 without a test id; INC-392 and INC-394 labels matched after the fact; test ids moved between specification and build (PW-95 never used; PW-96, PW-101, PW-104, PW-106, PW-107 built as something else); "Batch 7" (curator) = "R1/R3 + Beauty" (supervisor).
- [12.25] INC-364 and INC-398 both name the `listing not found` lines; INC-364 has no definition; INC-398 is defined (2026-10-03). Two entries with a cross-reference; a later compiler may merge them.
- [12.26] The rent and hire leaf count: 17 (the notes) or 18 (the message to the operator).
- [12.27] M1's identity in the executor's final bundle 3 report ("M1 a35e45fa → mark 20261003215042") against the repository (M1 = `20261003215007_b9aa66a4`, mark `20261003220000`); the repository is used.
- [12.28] The older database-checker warnings: 161, 163, 164 — each figure quoted with its moment; no census explains the differences.
- [12.29] The `allowed` ceiling: 50 (the C29 prompt) against 150 (live since `7423f49a`); the repository wins; the curator has not been told.
- [12.30] Who applies a migration on prod: the executor's tool applies a NEW file at save; an EXISTING file is the operator's paste on both databases; staging is always the operator's (slip S91).
- [12.31] Where the executor reads CI: `AGENTS.md:21` says the git form, which fails in its sandbox; the raw addresses are used; `AGENTS.md` is corrected by the records turn. The 2026-10-01 statement that the fetch "works" is superseded.
- [12.32] / [12.33] "In flight with Lovable" against a commit already on dev — the platform pushes as it works. The published site ran two uncertified heads (`a17b227c`, `70e16ea5`) while main stayed at `24d401f5` until the run on `48d3c53b` promoted; no source rules on publishing from an uncertified head.
- [12.34] INC-431's count: "exactly the 33 post.pin.* strings" against 25 corrected keys — three of the 33 are gone from `am.ts`, 25 were replaced, five (`layerStreet`, `save`, `saved`, `removed`, `at`) were read and found correct; the guard then found two values outside the family (U+1444, U+1728), corrected.
- [12.35] Social posting: 2026-10-02 "sellers share themselves; posting into other people's accounts is a bad idea" against 2026-10-04 "WE WILL AUTOMATICALLY POST THESE IN SOCIAL MEDIAS … NO OPT OUT" — read as ethio.com's own channels; unconfirmed ([8.27]).
- [12.36] Listing lifetime: the code's `coalesce(expiry_days, 60)` and the 2026-09-17 draft-purge spec against "no end date by default" (DEC-117, built in bundle 4 with INC-400); for published ads the later ruling wins and is built.
- [12.37] Local test runs: the installed G24 / Knowledge A7 ("a DEC-023 local run before reporting") against practice since 2026-10-03 (changed specs only; CI the proof); v1.13 carries the addendum.
- [12.38] Rulebook versions: v1.12's header (instructions v1.12, Knowledge v3.10) against memory (v1.11, v3.9), the repository mirror (v3.8), `system-state.md` (v1.10 · v3.8), `instructions-amendments.md` (stops at v1.9) and the attached Project docs (v1.8, v3.6). The live Knowledge text confirms v3.10; the records turn brings the repository to v1.13 and v3.10.
- [12.39] A walk expectation written from the catalogue, not the form (S92; INC-422 the first of the class).
- [12.40] C29's classification superseded by C30 two hours after import.
- [12.41] M6's mark against the brief's rule (INC-433).
- [12.42] Dates: the operator's messages are America/New_York; commits, the changelog, CI and prompts written after 20:00 local carry the next UTC day (INC-407 to INC-413 are headed 2026-10-04 for a walk of 2026-10-03; the C30 rulings are 2026-10-05 01:40 local = 05:40Z).
- [12.43] Things no source settles: whether `buildTitle` covers the "What is it?" answer on Other leaves (E4); whether INC-343 (b) was fixed; the Shola milk lock, the Beauty import re-check, the INC-361 class count and the "no phone numbers" help census; whether the expiry sweeper's wiring was in `0ce87c13` or M5; whether any native-reader check of Amharic catalogue labels took place; which "seven dog breeds" the 2026-10-02 census ruling meant; why the local suite counts 1,022 tests while CI counts 1,142–1,187 passed; whether the operator used either Jiji fix; whether the executor's N2 test asserts Unit of Sale before Quantity.

### 9.2 The ten things most likely to be forgotten

1. INC-433: `max(version)` on both databases reads M6's `20261005100000` while the newest file is M7; every read-back names the specific mark; the next migration heals it; the brief's mark rule gains "above the ledger's current newest mark".
2. The Search Console reminder `trig_016JrUYr5YK4RotRufpxno5P` fires at 12:36Z into the OLD session; re-create it or ask the operator for the export.
3. `AGENTS.md:21` tells the executor to `git fetch origin ci-evidence`, which it cannot do; the records turn replaces it with the raw-address form — verify the line landed.
4. The curator has not been told that `settled`, two-pair conditions and the two tokens are live, nor that the `allowed` ceiling is 150; the engine batch cannot go out until it is told (one message, after the C30 import).
5. INC-314 (the categories importer drops `secondary_parents` on a create row) is open, and whether the new leaf `cooked-food-to-order` carries its secondary parent `services` on prod is unrecorded — read the export at the C30 audit; a new leaf with guests is a two-pass delivery until the fix.
6. PW-76, CO-4 and LS-6 have reached three flakes in seven days with no INC (DEC-030); PW-55's failure is "never explained".
7. Operator questions carried as defaults, not answers: no IP in the acceptance record; 30 days' notice; a business gives no first and last name; "social channels" = ethio.com's own.
8. Two things the operator was promised that no brief carries: the executor's report on whether a Cloudflare bot filter can sit in front of the published site ("Lovable will report"; an executor capability census under G25), and the alert "when one account opens an unusual number of categories in a day" (told twice on 2026-10-03 that the catalogue lock would include it; the brief as issued carries only the `schema_read` dial of 120 per hour).
9. Running decision rules with no tally anywhere: DEC-115 (ten CI runs after a local selector run); DEC-119; DEC-104 (the retrying test client's five-run trial); DEC-097/DEC-099 (three consecutive green runs for the account pool; two counted, then held for the reset-timing line); DEC-083 (gating from 2026-10-12 after five consecutive runs with zero off-allowlist SQL-class lines — `listing not found` is still off the allowlist; from that date a new allowlist entry needs a DEC); DEC-084 (the public ad page and the storefront join the accessibility roster when built).
10. The C29 rows live on prod are superseded by the C30 plan; INC-434 was built for the C29 shape and stays correct; the leaf has no live ads, so C30 may delete or rename C29's rows.

### 9.3 Other risks worth one line each

- The published site can disagree with the live database between a prod apply and the next Publish; there are zero live listings, so the exposure today is the operator's own drafts (8 drafts on ethio-prod that M5 moved from step 4 to step 3 pass the price page again on reopening; 10 listings with region-level places left as they are).
- INC-421 (every 5xx JSON answer lost its body after the framework update) is fixed in CI but was never probed on the Cloudflare build the published site runs; the "Cloudflare probe line" asked of the executor is not recorded as delivered.
- INC-409: `has_permission` is SECURITY DEFINER, executable by every signed-in user, and answers for any user id — a guard needs a census of its 62 policies first; queued in the close-out bundle; the launch-gate "Ops security review" line names it.
- The 2026-09-28 ruling that the definer-function linter warnings are "by design" rests on a read-only audit (no SECURITY DEFINER function skips its own permission check) that was promised and never run.
- Staging health: INC-318 (HTTP 522 in global setup) closes with no change; if "Unhealthy" returns, read Reports → Database first and decide the compute add-on or a lower E2E concurrency on that evidence; the Ethereal mail credentials are ephemeral.
- Supabase Fair Use from 2026-11-01; the account pool's adoption and its reset-timing line are unrecorded; staging's MAU count under the pool was never checked; log volume to trim before 2027.
- The Esri key expires at most one year after 2026-09-30 with no warning until Admin › Services exists.
- Helper agents run in the foreground of the supervisor's turn and are killed by any incoming message; ask for a quiet window (about 40 minutes) and delete check-ins that would fire inside it.
- The supervisor's own slips of the period are in the ledger as S86–S92, each with its guardrail in v1.13 — read them before repeating one.

## 10. WHERE EVERYTHING IS

### 10.0 The manifest is the truth

- The exact list of files this records turn writes — path, mode (REPLACE, NEW, APPEND), size and sha256 — is `docs/governance/handoffs/2026-10-05-records-turn-manifest.md`, committed by the same turn. Verify the landing against it: for a REPLACE or NEW path, `sha256sum <path>` equals the manifest; for an APPEND path, the file ends with the append text (the manifest hashes the appended bytes). Section 10.1 describes the same files in words; where the two differ, the manifest wins. Two items 10.1 mentions are NOT in this turn and are owed: the root `roadmap.md` tidy and the stale lines of `docs/tracking/action-tracker.md`.
- Source tags inside `2026-10-05-open-items-master.md` and `curation/curator-record-2026-10-05.md` of the form `records-A … records-D2 PART n` name the compile's slice drafts, which are not in the repository; their content landed as the ledger blocks S44–S45 (A), S46–S47 (B), S48–S49 (C), S50 (D1), S51–S52 (D2) and as the INC entries INC-308 to INC-431. `sweep-NNNN-NNNN` tags name transcript extracts that exist only in the old thread's session; the fact itself is in the ledger block of that period.
- Transport: the 110 specs-archive files travel as one carrier file `ALL-SPECS-2026-10-05.md` (not committed); the executor splits it at the `===== <file name> =====` separators and verifies each file's sha256 from the manifest.

### 10.1 The repository paths the records turn creates or changes

Verify each by sha256 against the import prompt's list (section 11, item 1). Paths are as the package names them; a path missing from the repository after the records turn is a DRIFT to reconcile, not a reason to rebuild from chat memory.

- `docs/spec/spec-ledger.md` — session blocks S44 onward (2026-09-27 → 2026-10-05: DEC-081 to DEC-131 with the D-rulings D63–D72, operator directives, curator cycles, walks, slips S60–S92); REQ-028 gains gambling, betting and lotteries; the REQ-007 / REQ-008 amendments (DEC-106, DEC-107, DEC-108; Q-008's answer and the store address at the root); the Open questions rows Q-018, Q-019, Q-020; a new NUMBERING line (next free INC-438, DEC-132, D73, S93).
- `docs/tracking/incidental-findings.md` — INC-308 to INC-437 appended in order (INC-349, INC-352 and INC-364 as "Definition not recovered from the record"); the watch list; next free INC-438.
- `docs/governance/system-state.md` — rewritten to the position of 2026-10-05 (bundle 4 closed; the open items by pointer to the open-items master list) and to "Claude supervisor v1.13 · Lovable Project Knowledge v3.10" in its standing-reads line (it read "v1.10 · v3.8" at `48d3c53b`).
- `roadmap.md` (root) — NOT changed by the records turn (owed to a later docs turn): the bundle 4 block tidied (the Part F proof list gains PW-147/148/151, which exist in `e2e/`; turn 10 wrote only PW-140/141/143/PR-25/PW-144); the lines L1, L2, Report button, Your data page and social-channel posting added; the photo clean-up line kept.
- `docs/governance/launch-gate.md` — the lines of section 5.10 marked "line owed".
- `docs/spec/tos-privacy-source.md` — A13 amended (DEC-128); new A15 (certification) and A16 (versions, notice, translation, settings); B9 final retention incl. messages and technical records; B13 (children); B2 corrected ("precise GPS not collected" is wrong — the map-pin tool reads the device position on "Use my location"); the clauses adopted from the 2020 documents.
- `docs/spec/legal/` — the six files of section 3.4.
- `docs/governance/lovable-knowledge.md` — the mirror at v3.10 (header line + the live text verbatim as handed over 2026-10-05). `docs/governance/knowledge-amendments.md` — the v3.9/v3.10 amendment records derived from the diff against v3.8 (the v3.9 text itself was never recovered), and the proposed v3.11 items (not installed).
- `docs/governance/instructions-amendments.md` — the amendment records brought forward from v1.9 (where the file stopped) to v1.13. `docs/governance/claude-supervisor-instructions-v1.13.md` — the FULL v1.13 document (106,213 characters; sha256 `9299c26cfc196a615093efc6b9e9cfb6d28fa4615af3b2aa477623bbc2c8629e` at compile; every v1.12 sentence kept verbatim and followed by its addendum; new guardrails G29–G53; the §2 ritual addendum; the §13 handover addendum). The operator installs it in the Project as a whole document.
- `AGENTS.md` — line 21's CI line corrected to the raw-address form (the DEC-098 reason kept). The market-neutral wording line (DEC-094) is still owed if not included.
- `docs/governance/specs-archive/` with `INDEX.md` — 110 verbatim extractions of the specs, plans, prompts and rulings of 2026-09-27 → 2026-10-05, each headed by three lines (Source / Status at date / Related) and then the text as written in the chat; the INDEX gives per file the turn, the date, the status word (built · carried out · walked · approved · ruled · recorded · issued · superseded · not built · research/proposal) and whether the repository holds any part of it. The INDEX also lists what is already in the repository and what is "mentioned but text not found" (CI-T2; W6b-3; the D63, D66, D65, D68 and D69 specs; the DEC-091 Services page; the DEC-096 detector; the DMCA registration guide; the engine-batch prompt; the bundle 5 brief; the L1, L2, Report, Your-data, price-table and social build prompts).
- The archive files the next thread will need first (names as the INDEX gives them):
  - `2026-10-04-l1-legal-spec-v2-legal-documents-acceptance-publishing-certification.md` (approved; not built) and `2026-10-04-l1-legal-spec-v1-terms-privacy-18plus-acceptance.md` (superseded by v2);
  - `2026-10-04-l2-retention-research-and-proposal.md` (approved, DEC-130; not built);
  - `2026-10-04-legal-settled-points-settings-rule-report-button-your-data-page.md`, `2026-10-04-legal-company-state-ethiopia-entity-and-l1-additions.md`, `2026-10-04-legal-act-without-notice-disclaimer-peer-comparison.md`, `2026-10-04-legal-review-of-2020-documents-summary-and-copyright-agent.md`, `2026-10-04-age-rule-research-and-recommendation.md` (DEC-128), `2026-10-04-l1-l2-supervisor-working-notes.md`;
  - `2026-10-04-c28-occasion-food-and-catering-research-brief.md`, `2026-10-04-c28-catering-note-review-and-three-decisions.md`, `2026-10-04-c29-catering-rows-curator-prompt.md`, `2026-10-04-c30-cooked-food-to-order-curator-prompt-plan-first.md`;
  - the bundle 4 turn rulings and prompts (`2026-10-04-bundle-4-turn-1-rulings-censuses-m5-and-next-turns.md` through `2026-10-05-bundle-4-turn-12-prompt-ct-19-constant-row-fix-inc-437.md`) and the walk lists (`2026-10-04-walk-bundle-4-and-c29-publish-import-and-walk-checklist.md`, `2026-10-04-walk-bundle-3-walk-fixes-contact-step.md`);
  - the decisions that still need a spec: `2026-09-28-d68-price-drops-and-sales-proposal.md`, `2026-09-28-d69-platform-controls-settings-registry.md`, `2026-09-27-d64-ai-switchboard-ruling-and-queue.md`, `2026-09-27-d62-price-page-spec-inc-308-investigation-prompt-and-d65-photo-studio-note.md`, `2026-09-29-dec-089-proposal-country-localised-catalogue.md`, `2026-09-30-w6b-2-prompt-price-entry-place-boxes-esri-map-and-dec-091-services-page-outline.md`;
  - the status lists (`2026-10-04-status-completed-and-remaining-work.md`, the ten-row list of 2026-10-04 19:06 local) and the handover plan (`2026-10-04-handover-plan-records-gap-and-stop-point.md`).
- `docs/governance/curation/curator-record-2026-10-05.md` — the curator record: PART 1 how the curator works (files, columns, importer caps, the audit scripts, the order of operations, standing rules, the never-do list); PART 2 the delivery log (80 entries, 2026-09-08 → C28); PART 3 the state at 2026-10-04 (counts, roots done, held items, the engine items and the rows waiting for each, C28/C29, scope rulings); PART 4 open items; PART 5 provenance and gaps.
- `docs/governance/handoffs/2026-10-05-open-items-master.md` — the deduplicated master list (12 sections; 350 items at compile). This file: `docs/governance/handoffs/2026-10-05-bundle4-close-handover.md`.
- `docs/tracking/action-tracker.md` — APPEND ONLY in this turn (ACT-002 … ACT-010 for the planned work; the stale lines of open-items [4.55] remain and are owed): the intent was that the stale lines be brought to the state ("D62 spec … NEXT" was built as DEC-081; "Turn C (INC-295)" was built as the sweep job `catalog_find_sweep` with its heartbeat table `catalog_find_sweep_runs`; the INC-298 ticket line stays open; the D63 and D53/D56 spec lines stay owed).
- `docs/_changelog.md` — the records turn's own line, as every landing carries one.
- Not changed by the records turn, still stale and to be fixed where named: `docs/governance/roadmap.md` (2026-09-02; storefront still "/@handle"); `docs/features/posting.md:1079` ("Yes/no pins are deferred to W4b"); `docs/features/*.md` has no section of its own for bundle 3's security part, contact step or seller-name rules; `docs/features/e2e-harness.md` says the account pool is "adopted provisionally".

### 10.2 The claude.ai Project documents and memory

- The Project "Ethio marketplace" receives this handover and the v1.13 instructions as Project documents (written there by the old thread at the hand-over). The three older documents (`handoff-next-thread-2026-09-02.md`, `claude-supervisor-instructions-v1.8.md`, `lovable-knowledge-v3.6.md`) and the v0.1 description are superseded by the repository record and should be replaced or removed by the operator when convenient.
- The project memory files hold the operator's directives and rulings as the old thread saved them; the compile found nine out-of-date lines (`rules-and-directives` 7.3). Treat the repository records as current where they differ.
- The legal drafts' source of truth stays the Claude Docs document named in section 3.4 until L1 lands them in the database; the repository copies are the exported text.

## 11. THE FIRST THREE THINGS TO DO

1. Verify the records turn, if not yet done.
   - If its report is in hand and the files are not yet checked: for every file in the import prompt's list, compute `sha256sum <path>` in the fresh clone and compare with the prompt's value. Any difference is DRIFT — a correction prompt, never a silent absorption (instructions §6).
   - Confirm `AGENTS.md:21` now gives the raw address; confirm the ledger's last line names next free INC-438, DEC-132, D73, S93; confirm `system-state.md` reads the 2026-10-05 position; confirm the six legal files, the specs archive with its INDEX, the curator record, the open-items master list and this file are present at the paths of section 10.1.
   - If the records turn has not landed, it is the first executor turn (documents only; no migration; sha256 per file in the prompt), before any new work (G41).
2. Audit C30 when the curator delivers.
   - Rebuild the audit from the operator's fresh exports first (section 7.2); run the checklist of section 7.3; prove the checker on a planted error.
   - Give the operator the numbered import steps with the expected preview per file, the Translations approvals, and the decision on a walk (section 4.1).
   - Then tell the curator the engine is live (section 7.4) and write the engine batch prompt (section 5.2) — one message, after the C30 import.
3. Ask the operator which open decisions he wants to take first, as one short list, and carry the defaults of section 4.4 until he answers:
   - [8.24] the IP address with each acceptance;
   - [8.26] 14 or 30 days' notice before a material change;
   - [8.27] whether "post automatically in social medias" meant ethio.com's own channels;
   - [8.23] whether a business also gives a first and last name;
   - [8.29] the cheaper-CI shape, and with it when the repository goes private;
   - and whether he wants the Search Console re-export reminder re-created (it fires into the old session at 12:36Z).
   Then confirm the next build in order: L1 (section 5.3), whose Pass-2 spec the supervisor writes while the curator builds C30.
