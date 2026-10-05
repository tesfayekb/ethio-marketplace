Source: supervisor thread, turn 1083, 1087 (the first DEC-097 prompt of turn 1083 was not sent; this combined version replaced it), Thu 2026-10-01 16:05 to Thu 2026-10-01 16:14 New York.
Status at 2026-10-05: DEC-097 built as (a) census 5f8d0b60, (b)/(c) on the stranded branch then re-landed as 44e8eb85 and fixed in b26bb0b3 (2026-10-01); DEC-099 added the per-lease reaper; the adoption rule (three consecutive green runs with the signed-in count ≤ pool + fresh) was tracked to 2 of 3 and never recorded as closed; the TURN SIZE rule governed every later executor turn; the repo holds the pool in docs/features/e2e-harness.md and AGENTS.md (DEC-097 lines), not this text.
Related: DEC-097, DEC-099, INC-372, INC-373, TURN SIZE rule, Supabase Fair Use 2026-11-01, DEC-023.

You don't need to pay anything or turn off the spend cap. The 117,247 "monthly active users" are almost certainly our own automated test accounts, not real people.

- **Why I think so:** the test suite creates a brand-new account for nearly every test (`e2e/helpers/users.ts`, `createUser`, about 140 places in the tests). Those accounts sign in on the staging project, which sits in the same Supabase organisation as prod. A full run creates roughly 500–1,000 accounts (my estimate). Every push, the nightly run and Lovable's own local runs each do this, so it adds up to about 117k a month.
- **The real risk:** the fair-use rule applies to the whole organisation. If restrictions came, they could hit the live site too.
- **The lean fix:** the tests reuse a fixed pool of test accounts instead of making new ones.
  - Monthly active users drop to a few hundred, at no cost.
  - Only the tests that need a brand-new account keep making one (sign-up, email confirmation and similar).
  - This changes the test setup, which is a closed area, so it gets its own decision (DEC-097), with a rule set in advance for adopting or reverting it.
  - It goes ahead of everything else in Lovable's queue.
- **The paid alternative:** turn off the spend cap and pay the overage (about $55 a month now, my estimate, and growing). I don't recommend it.
- **Timing:** this month is covered by Supabase's grace period, and the fix should land well before November 1.

**Your steps**
1. In Supabase, open organisation **ethio** → **Usage** → **Monthly Active Users**, and check it per project (ethio-staging, then ethio-prod).
   - Expected: almost all on ethio-staging, and only a handful on ethio-prod (you and your testers).
   - If ethio-prod shows thousands, tell me right away. That would mean real sign-ups or abuse, not tests.
2. Keep the spend cap **on**.
3. Paste this into Lovable and send it now. It queues behind the item Lovable is working on:

---
```
DEC-097 — E2E ACCOUNT POOL (do this NEXT, right after the item you are on now; it goes ahead of the rest of the queue).

Why: Supabase reports organisation ethio at 117,247 monthly active users against ~110,000 (Fair Use from 2026-11-01; restrictions would hit the whole org, prod included). The source is the harness: e2e/helpers/users.ts createUser() mints a fresh staging user for nearly every test (about 140 call sites), on every CI push, the nightly and every local run. This opens the closed harness surface under G22; the decision rule is below.

1 · Census first, in the report: every createUser call site, sorted into
(a) tests that need a brand-new identity (sign-up, email confirmation, unconfirmed state, first-login and home-country capture, sign-in doors and linking, account deletion, any deny proof that needs a never-used account) — these keep minting;
(b) tests that only need "a signed-in seller/user" — these move to the pool.

2 · The pool (staging only):
- Fixed confirmed accounts, e2e-pool-<lane>-<NNN>@ethio-e2e.invalid, created idempotently by global-setup when missing. Teardown never deletes them.
- Lanes never share accounts: one set per CI shard, one for the nightly, one for local runs (one local suite at a time already holds).
- Each run sets fresh random passwords for its own lane's accounts through the admin API and keeps them in memory, so no new secret is needed.
- A test leases one account per worker slot. Before each lease, that account's listings, drafts, photos, pins, sessions and profile changes are reaped to a clean state (reuse the existing reaper by user id).
- Size the pool to the maximum concurrent leases per lane, not to the number of tests.

3 · Measurement: the E2E report gains one line per run: "accounts signed in this run: <n> (pool <p>, fresh <f>)", counted from auth.users last_sign_in_at inside the run window.

Decision rule (pre-committed): ADOPT if three consecutive full green runs on the pool add no flake-ledger entry traceable to a shared account, and each run's signed-in count is ≤ pool size + the (a) tests' count. Otherwise REVERT to per-test minting and report.

Then continue the queue as before. Report once at the end unless blocked or red.
```
---

4. Tell me what the usage page shows. When Lovable reports, I'll check that the count actually dropped.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

I checked Lovable's work: the undo of the framework upgrade is now on dev (d9506a9c), and those three files match the last good version exactly. CI's tests all passed this time, including AT-58, the test the upgrade had broken.

The new red is small. Only the formatting check failed, on Lovable's task-list file `roadmap.md`, which it edited without running the formatter. The combined message below fixes that and puts the test-account pool (DEC-097) first.

Lovable also said it runs out of room each turn. So the message tells it to finish every turn in a clean, green state with a short report, instead of promising to do the whole queue in one go. You'll just send "continue" after each report.

**Your steps**
1. Paste this into Lovable and send it:

---
```
CI on d9506a9c: the revert is VERIFIED — package.json, bun.lock and src/routeTree.gen.ts equal 2f600496, typecheck is clean, and every E2E job (AT-58 included) is green. The run is red on ONE check only:
- format:check — prettier flags roadmap.md (docs/tracking/guards-last-failure.md: "[warn] roadmap.md · Code style issues found").
Fix first: run prettier --write roadmap.md.
Rule: every turn ends with the DEC-023 checks on what it touched: typecheck, lint, format:check (roadmap.md included), i18n map guard, unit tests, and the specs for what changed. Report only when those are green.

TURN SIZE: when a turn runs out of room, stop at a clean point, with everything touched passing the checks above. Send a short report (done · verified · next) and continue from roadmap.md on the next "continue".

1 · DEC-097 — E2E ACCOUNT POOL. Do this NEXT, before D+L+M.
Why: Supabase reports organisation ethio at 125,442 monthly active users against 100,000 included (fair-use limits from 2026-11-01; restrictions would hit the whole org, prod included). ethio-staging accounts for 125,442 of them, prod for 4. The source is the harness: e2e/helpers/users.ts createUser() mints a fresh staging user for nearly every test (about 140 call sites), on every CI push, the nightly and every local run, about 4,000 a day. Deleting users does not remove them from the count. This opens the closed harness surface under G22; the decision rule is below.
a) Census first, in the report: every createUser call site, sorted into
   (i) tests that need a brand-new identity (sign-up, email confirmation, unconfirmed state, first login and home-country capture, sign-in doors and linking, account deletion, any deny proof that needs a never-used account) — these keep minting;
   (ii) tests that only need "a signed-in seller/user" — these move to the pool.
b) The pool (staging only):
   - fixed confirmed accounts, e2e-pool-<lane>-<NNN>@ethio-e2e.invalid, created idempotently by global-setup when missing; teardown never deletes them;
   - lanes never share accounts: one set per CI shard, one for the nightly, one for local runs (one local suite at a time already holds);
   - each run sets fresh random passwords for its own lane's accounts through the admin API and keeps them in memory, so no new secret is needed;
   - a test leases one account per worker slot; before each lease, that account's listings, drafts, photos, pins, sessions and profile changes are reaped to a clean state (reuse the existing reaper by user id);
   - size the pool to the maximum concurrent leases per lane, not to the number of tests.
c) Measurement: the E2E report gains one line per run: "accounts signed in this run: <n> (pool <p>, fresh <f>)", counted from auth.users last_sign_in_at inside the run window.
Decision rule (pre-committed): ADOPT if three consecutive full green runs on the pool add no flake-ledger entry traceable to a shared account, and each run's signed-in count is ≤ pool size + the (i) tests' count. Otherwise REVERT to per-test minting and report.

2 · Then the queue, unchanged: D+L+M (S2's DB changes + Part O's migration, census first) → re-time search against ≤ 300 ms (stop and report timings if still over) → S3 → DEC-096 → T (with T4) → A → B → C → Part O → Part P → INC-371 → the E census → the final full DEC-023 run.
For the E census: the two "[ssr-error] … commit_failed duplicate key … card_rank_unique" lines from AT-58 are an expected refusal logged as a server error, the INC-368 class. Fix them there.
```
---

2. After each report, bring it to me. I'll check CI and dev, then you send "continue".
