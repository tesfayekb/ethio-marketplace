# Turn N1 — INC-977: a seller name saved unchecked is AI-checked later (PLAN)

Base: dev 31d5fb6b. Plan only; nothing changed. Claims below were read at 31d5fb6b unless marked **(read at build)**.

## 0. CI first (build turn)
Read the run on 31d5fb6b at the raw ci-evidence addresses before anything. 7063a727's three reds (format:check on `__root.tsx` / `first-screen.test.ts`, U4i ② used-on map, first-paint budget) are fixed first if 31d5fb6b still shows them. STEP 0 adds the roadmap line for INC-974's K2 list: the other `useCategoryTree` readers still wait on the browser read.

## 1. What the concern touches (found by its definition)

**Paths that save a seller name or business name**
- `src/routes/api/listings/identity.ts`: `imitationOf` :68, `auditUnchecked` :84 (best-effort, written after the save), `unchecked = !imitated.checked` :158, door `save_posting_identity` :200, audit :204–211. Its test: `identity.test.ts`.
- `src/routes/api/listings/alias.ts` (+ `alias.test.ts`) and `src/routes/api/seller.ts` also name `alias`. **(read at build)** whether either saves a name without `name_check`. Any that does is K2 and joins the same state write, because one state means every writer.
- Staff writer `admin_update_profile` → `user.alias_assigned`. A staff-assigned name counts as checked by a person: it clears the state and is never queued.
- SQL: `save_posting_identity`, `admin_update_profile`, `seller_name_sweep()` (only definition: 20261004011235). Each is redeclared whole from **live** `pg_get_functiondef` on ethio-prod (G39), never from the file.

**Readers of the check's state**
- Today none: `alias.unchecked` has no reader (INC-977). New readers: the catch-up, the staff count, and the screening queue.

**AI path**
- `src/server/ai/tasks.ts` `name_check` (`judgesPerson: true`), `gateway.ts` (audit before verdict), `meter.ts` (switch, budget), plus the `gateway.census.test.ts`, `meter.test.ts` and `ai-service` tests.

**Censuses and allowlists a new name must join**
- `scripts/public-surface-allowlist.txt`: one line per new public function or table grant.
- `scripts/acceptance-doors-allowlist.txt`: only if a new signed-in write door appears. None is planned.
- The caller-gates census for VOLATILE signed-in doors.
- The routes census (`routes.test.ts`: `defineRoute` plus a `src/lib/schemas` `.strict()` shape).
- The GWC census (AI calls only via `aiCall`).
- `DIALS` (`src/lib/dials.ts`) for the per-run cap.
- `scripts/migration-real-row-allowlist.txt`: only if the proof needs an IF EXISTS check, with a reason and an until date.
- i18n maps (EN+AM) and the string layers (admin).
- Register rows 11/12 (`docs/governance/mechanisms.md`), plus a new row if option T1 below is chosen.

## 2. Where the state lives

**Recommended: a table of its own, `public.name_checks`.**
- Columns: `profile_id uuid PK → profiles ON DELETE CASCADE`, `subject text CHECK (subject IN ('alias'))`. The subject is a parameter, so the business name joins it when D222 lands. With a subject column the key becomes (`profile_id`, `subject`), and the PK is `(profile_id, subject)` from birth.
- More columns: `checked_text text`, `state text CHECK (state IN ('unchecked','clean','imitates'))`, `since timestamptz`, `attempts int`, `last_attempt_at timestamptz`, `home_country_code` (E3, copied from the profile).
- Why not a column on profiles:
  - profiles already has 27 columns and its own policies;
  - a separate table keeps the catch-up's writes off the hot profile row;
  - closed RLS is simpler on a service-only table.

**Door change: `save_posting_identity`, redeclared whole.**
- When `p_alias` is given and differs from the stored alias, the door upserts `name_checks(profile_id, 'alias', checked_text = lower(alias), state = p_name_state)` in the same transaction.
- New argument `p_name_state text`, either `'clean'` or `'unchecked'`. The route passes it from `imitated.checked`.
- The argument list changes, so the function is DROPped and recreated. Its closers are restated: REVOKE PUBLIC, anon; GRANT EXECUTE authenticated; GRANT ALL service_role.
- An argument outside the allowed set raises. So "cannot record the state" means the save is refused (behaviour 1), never saved as checked.
- `auditUnchecked` is deleted from the route. Its audit line moves into the door, in the same transaction, so the audit has no hole.
- The door body is over 10 KB, so it is built by computed insertion **(size read at build)**.

**ACL and RLS on `name_checks`**
- Born closed: REVOKE ALL FROM PUBLIC, anon, authenticated; GRANT ALL service_role.
- RLS enabled, with deny policies for the four operations (the 20261004011235 house form).
- No browser grant, so no public-surface line for the table.

**Index:** a partial index `(since) WHERE state = 'unchecked'` for the catch-up's batch and for the staff count. It is kept only if EXPLAIN on the proof shows it is used (index decision pasted).

## 3. The catch-up trigger

**Existing mechanisms that run code on a schedule**
- pg_cron SQL jobs (eight listed; SQL only, so they cannot reach the TypeScript gateway).
- GitHub Actions (CI only; no scheduled workflow calls the app today **(confirm at build)**).
- `src/routes/api/public/`: does not exist at 31d5fb6b, so no route a scheduler can call exists.
- No owner-visit hook runs a catch-up.

| Option | How | Security cost |
|---|---|---|
| T1 | pg_cron + pg_net calls `POST /api/public/jobs/name-check-catchup` with a shared secret (Vault → header; route checks it with a timing-safe compare) | The first public job route and the first pg_net callback. The secret lives in Vault and in server env. The platform's managed schedule path does not cover a user-managed Supabase, so the HTTP callback SQL would be hand-authored (Lovable guidance discourages this). That needs a DEC. |
| T2 | A scheduled GitHub workflow (cron) calls the same route with a secret from repo secrets | The secret sits in GitHub plus the server. The repository is public, but the workflow keeps the secret masked. The job's runs are visible in CI, and its deadline comes via `with-deadline.sh`. It depends on GitHub's scheduler (delays of 15+ minutes, and schedules are disabled after 60 days without repo activity). |
| T3 | Catch-up on the owner's next signed-in request, plus a staff "Check now" action (`services:manage`, existing permission **(confirm id at build)**) that runs a capped batch | No new public surface and no secret. On its own it fails behaviour 2 for an owner who never returns, unless staff press the button. |

**Recommendation: T2 + T3's staff action.**
- T2 gives the automatic cover for an owner who never returns, with no hand-written pg_net SQL and no Vault plumbing.
- Its secret is one server env value (`NAME_CHECK_JOB_SECRET`, added by the operator in the secrets dialog).
- The route rejects any call without the secret, including a signed-in person's.
- The staff action is the same capped core behind a gated door, so staff are never stuck waiting for the scheduler.
- T1 is the fallback if the operator prefers the job inside the database. It costs a DEC for the pg_net callback.
- Either way:
  - one server core (`src/server/name-check-catchup.ts`) carries the subject parameter;
  - its lease row gives single-flight;
  - each run is capped, idempotent per row and has a circuit breaker on 402/403/repeated 429;
  - each run writes a heartbeat row in `name_check_runs` (ran_at, asked, clean, imitates, failed, paused_reason), so "ran with nothing to do" differs from "never ran".
- Register: a new row, "a scheduled server task", with its guard: a census that every `/api/public/jobs/*` route verifies the secret before any read.

## 4. Where an "imitates" answer goes

**Queue: Admin › Screening (`src/features/admin-screening`).** It is the queue staff already work for verdicts about a person's content.
- Staff see: the name, since when, the model's bounded answer (`of`, max 200 characters, INC-866), and the ai_calls time.
- Staff can do:
  - Clear: the name is marked clean;
  - Rename via the existing `admin_update_profile` (staff act, audited).
- The model never renames anyone.

**Product choice for the operator:**
- (a) **Leave the name live while staff review.** The seller is unaffected until a person decides. A brand imitation stays public for the review window.
- (b) **Hide the name from public view until staff decide.** The listing shows a neutral seller label. This protects the brand and the buyers, but it is a model-triggered effect on a person, so DEC-280 needs it stated.
- (c) **Hold the seller's new listings** (existing listings unchanged) until staff decide.

Recommended: (a), because the verdict "never acts alone" (behaviour 3). (b) is offered for the operator.

**Fallback:** if Screening's shape cannot carry a profile row without a new mechanism **(read at build)**, the queue is a section in Admin › Users. The plan stops for a ruling before building it.

## 5. K2 sibling (not built)
- `businessName` is never asked the imitation question. It is passed straight to the door at `identity.ts:186` (`p_business_name: text(body.businessName)`). D222 bundle 23 owns that rule. The `subject` column and parameter are ready for it.
- `auditUnchecked`'s best-effort post-save write (`identity.ts:84`, :211) is removed by this turn.
- The other `useCategoryTree` readers (INC-974 K2) get their roadmap line only.

## 6. Conflicts and existing mechanisms
- **Reused:**
  - `aiCall` (audit before verdict, switch and budget via the meter);
  - `spend`/`DIALS` for the run cap;
  - `defineRoute` + strict schema;
  - `doorCall`, `readFailure` and `DataTable` (the staff count and queue);
  - the existing admin identity reader;
  - `ai_calls` (spend shows in Admin › Services › AI with no new code, since the feature is `name_check`'s).
- **Conflicts:**
  - Knowledge says "Do NOT use Edge Functions" / public routes bypass auth: handled by the secret check plus a deny proof.
  - Knowledge's schedule guidance discourages hand-written pg_net HTTP callbacks: this is why T1 needs a DEC and T2 is recommended.
  - The background-jobs skill's five requirements (bound, lease, idempotent marking, circuit breaker, paused guard) are met by the core.
  - A new public route needs an AGENTS.md rule for the jobs prefix.
  - No new dependency.
- **Open question for the supervisor:** whether `alias.unchecked` audit rows stay as well as the state row. Proposed: yes, written by the door, so the audit trail keeps its existing action name.

## 7. Tests (ids NCU-*, grep-checked free in src/, e2e/, scripts/ at 31d5fb6b; rechecked at build)

| Id | Behaviour | Proof |
|---|---|---|
| NCU-1 | 1: unchecked is written with the save | The door call with `p_name_state = 'unchecked'` saves the alias and the `name_checks` row in one transaction. A bad state value refuses the save: the alias is unchanged and no row exists. |
| NCU-2 | 1: the route passes the state | `identity.test.ts`: gateway `unavailable` → door args carry `unchecked`. Clean → `clean`. No post-save audit insert happens. |
| NCU-3 | 2: catch-up asks unchecked names | Core with a stub gateway: N unchecked rows, cap K → K asked, oldest first. Switch off, budget spent or provider down → rows still unchecked, attempts +1, no rename. |
| NCU-4 | 3: imitates → the screening queue, never a rename | The ai_calls row exists before the queue row. The alias is unchanged, the profile status is unchanged, and the bounded `of` is ≤ 200 characters. |
| NCU-5 | 3: audit write failure → no queue row | The marked task answers `unavailable`, so no verdict is stored and no queue row is written (G38). |
| NCU-6 | 4: clean is never asked again | The row is clean, and a second run asks 0. A changed alias resets to unchecked. |
| NCU-7 | 5: staff count and since | The gated door returns the count and the oldest `since`. Without the permission it is refused (deny). |
| NCU-8 | 6: cap, lease, heartbeat | A second concurrent run exits on the lease. Every run writes a heartbeat, including an empty run. 402 → paused_reason is stored and the next run stops before any call. |
| NCU-9 | Route security | `/api/public/jobs/name-check-catchup`: no secret, a wrong secret, or a signed-in person's bearer → 401, with no read and no spend. |
| NCU-10 | Census | Every `/api/public/jobs/*` route checks the secret first (planted file fails). |
| e2e `name-check-catchup.spec.ts` | Staff view | Staff see the count and an imitates row in Screening. Both projects, whole file, 0 retries. |

## 8. Migrations (each its own stop, G39; proofs create their own scratch `e2e-n1-<hex>` rows and roll back whole)
- **M1:** `name_checks` + `name_check_runs` + lease, ACL/RLS, index; `save_posting_identity` redeclared with `p_name_state`. Proofs: NCU-1, deny for anon/authenticated on the tables.
- **M2:** service-only `name_check_catchup_batch(p_subject, p_limit)` (claims rows FOR UPDATE SKIP LOCKED with a lease), `name_check_record(...)` (writes the answer and the queue row); the gated staff doors `admin_name_check_summary` and `admin_name_check_run` (staff "Check now"). Proofs: NCU-4/6/7/8 at the SQL level.
- **M3 (only if T1 is chosen):** the pg_cron + pg_net job. With T2 there is no M3; the GitHub workflow lands instead, linted with actionlint and run via with-deadline.
- `seller_name_sweep()` stays rule-only. Its "unchecked" count is read from `name_checks` by the staff summary, so a second sweep is not forked.

**Sizing (G37):** split into two turns.
- **N1a:** state + door + route (behaviour 1) + the staff count (5).
- **N1b:** the catch-up core, trigger, queue and heartbeat (2, 3, 4, 6).
- N1a alone already closes the hole of a name saved without a mark.

## 9. Estimate
- 2 turns (N1a, N1b), band 2–3. The third turn arrives if the operator picks T1 (a DEC plus pg_net) or option (b) hide-from-public, which touches public seller reads.

## Five lenses
- **Security:**
  - the answer is parsed against `name_check`'s schema and bounded (INC-866), with user text as data;
  - the job route is secret-gated, with deny proofs (NCU-9);
  - staff doors are gated, with deny proofs (NCU-7);
  - no browser grant on the new tables.
- **Performance:** the save path gains one upsert. The catch-up is capped per run, uses an indexed partial scan, and runs single-flight.
- **Failure modes:**
  - provider down, budget spent or switch off → the row stays unchecked and visible to staff;
  - each run is logged with a heartbeat;
  - a paused reason is persisted and shown.
- **Consistency:** one state table, one catch-up core, one queue (Screening).
- **Future growth:** the business name and Stage 2's judge join through `subject`, a parameter, not a fork.
