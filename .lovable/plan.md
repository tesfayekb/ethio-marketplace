# Foundations N1b (INC-977 second half + INC-979) — plan

Base dev 07cfcf15. This is a plan only. The facts below come from reads done on 29 Oct. Anything marked "census at build" has not been read yet and is not claimed.

## 0. CI first (build turn)
- Read the ci-evidence run on 07cfcf15 before anything else. Any red is fixed first, at its root.
- Watch /admin/listings: it measured 353.0 against its 353 line. If CI turns it red, raise the line to its measured value rounded up, with the cause named. No other line moves.

## 1. Census by definition

### A. Scheduled server task (new mechanism)
- New route: `src/routes/api/public/jobs/$job.ts`.
  - It goes through `defineRoute`, with a strict schema shape for the job name and the body.
  - It is registered in routes.test.ts.
- New module `src/server/jobs/`:
  - `secret.ts`: a constant-time compare of the job secret.
  - `registry.ts`: one row per job.
  - `name-check-catchup.ts`: the job's core.
- New guard `scripts/conformance/jobs.test.ts`, wired through wired.test.ts. It checks two things:
  - every handler under the jobs prefix calls `checkJobSecret` before any other await. A planted file must fail.
  - every `cron.schedule` that reaches `net.http_post` does so only through `public.job_call(text)`.
- Existing heartbeat pattern, read from the database: the per-job `*_runs` tables (ai_calls_prune_runs, catalog_find_sweep_runs, seller_name_sweep_runs, …). There are 7 cron jobs today and all are SQL-only. No shared heartbeat table exists. I propose one `job_runs` table for every called-out job, recorded as a new register row in mechanisms.md. Ruling R1 decides between that and one more per-job `*_runs` table.

### B. The catch-up
- Reuses:
  - `aiCall("name_check")` in tasks.ts:287, with judgesPerson.
  - `name_check_mark`, extended by a state argument (see M5).
  - the switch and budget in ai_features/ai_spend_days.
- Existing name logic, to be read whole at build: `seller_name_sweep()` (daily at 02:23) and `alias_verdict`. If the sweep overlaps this job, that goes in the report as K2; it is not merged.

### C. Public reads of a seller's name
These come from the database: functions whose body mentions seller_alias, with their EXECUTE grants.

**Public or reachable by any signed-in person:**
- `public_listing_json` (service_role only). It builds the ad page's JSON. The seller line is at line 220 of migration 20261028225001.
- `seller_feed_page`: granted to anon and authenticated. It serves the seller page.
- `my_seller_line`: authenticated. This is the owner's own line, so it is not hidden; it carries the notice.
- `check_seller_alias` and `suggest_seller_aliases`: authenticated. Both are name tools; whether either exposes another person's name gets checked at build.

**Staff only, gated:** admin_get_user, admin_list_listings, admin_list_users, admin_listing_detail, admin_screening_facts, impersonated_get_profile. These stay unhidden.

**Internal (no browser grant):** alias_taken, alias_verdict, legal_acceptance_guard, validate_listing_draft, save_posting_identity, seller_name_sweep.

**Browser code:**
- `src/features/ad-page/public-listing.ts:158` (sellerAlias from doc.seller.alias)
- `src/features/posting/preview/listing-detail.tsx:223/938`
- account-overview.tsx, my-listing-page.tsx, step-review.tsx (the owner's own views)
- the staff files listed by grep (admin-listings, admin/users, impersonation, admin-screening)

**Not carriers:** feed_index and catalog_find_index have no seller column (columns read), so the feed cards, search and similar ads carry no name unless they join profiles. Census at build: each feed function's body is read for a profiles join.

**Mechanism:** one SQL helper, `public.seller_public_alias(p_profile uuid) RETURNS text`. It returns NULL when name_checks.state is 'imitates', otherwise the alias. `public_listing_json` and `seller_feed_page` call it in place of the bare column, so the browser already draws its neutral label for a NULL alias. A guard fails on any anon- or authenticated-granted function, or any `public_*` function, that selects `seller_alias` without the helper (except my_seller_line, which has an allowlist line).

### D. Staff queue
- It extends `src/features/admin-screening/screening-page.tsx` and its service. It does not add a new page.
- Each queue row shows:
  - the name, which needs profiles:view
  - the model's bounded answer (INC-866), joined from ai_calls by the run's ids
  - since and attempts
- **Clear** is a new door, `admin_name_check_clear(p_profile)`, gated by listings:edit plus step-up as the screening actions are. It sets the state to 'clean' when the text still matches and audits `name_check.cleared`.
- **Rename** reuses `admin_update_profile`, which already marks the name 'clean' and audits.

## 2. Migrations, in order. One stop report each; staging apply by the supervisor.

**M1 — INC-979 backfill.**
- Inserts an 'unchecked' row for every profile with a seller_alias and no name_checks row: checked_text is the lower-cased alias, since is now(), and home_country_code comes from the profile.
- It is idempotent (ON CONFLICT DO NOTHING).
- The proof runs on its own scratch profiles and rolls back. The live count is read back after the apply (expected: 0 aliases without a row).
- After M1, markClean's "no row" log becomes a real anomaly, not the normal path.

**M2 — pg_net.**
- `CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions` (0.20.4 is available on prod and staging).
- REVOKE on the `net` schema from anon and authenticated.
- `public.job_call(p_job text)`: SECURITY DEFINER and service-only (REVOKE PUBLIC/anon/authenticated).
  - It reads the Vault entries `job_secret` and `job_base_url` from `vault.decrypted_secrets`.
  - If either is missing, it writes a `job_runs` row ('not_configured') and returns without calling. This is staging's path, and CI's.
  - Otherwise it calls `net.http_post(base_url || '/api/public/jobs/' || p_job, headers {x-job-secret}, timeout 10 s)` and records the request id.
- CI temporary backends: the Supabase local image ships pg_net, so the migration replays. With no Vault rows there, every run is not_configured. Census at build: confirm the CI image version.

**M3 — job_runs heartbeat** (or the per-job `*_runs` table, per R1).
- Columns: job, started_at, finished_at, outcome ('ok','not_configured','paused','switch_off','budget_spent','busy','failed'), asked, clean, imitates, unavailable, net_request_id.
- Born closed with deny policies.
- Writers: job_call (dispatch rows) and the route via a service-only `job_run_finish`.
- A 14-day prune is added to the existing rate_limits_prune pattern, as the ai-calls heartbeat history does.
- A lease row `job_leases(job, holder, expires_at)` gives single-flight runs, with a service-only `job_lease_take`/`release`.
- The breaker state `job_pauses(job, reason, since)` is shown to staff.

**M4 — the cron job.**
- `cron.schedule('name-check-catchup', '*/15 * * * *', 'SELECT public.job_call(''name-check-catchup'')')`.
- That is 96 calls a day. On a run with nothing waiting, the route ends after one indexed count. The cap is 20 names per run (an estimate: 5 legacy names today, low new-name volume). Worst-case delay is 15 minutes plus the queue depth divided by 20.

**M5 — hide helper and staff doors.**
- `seller_public_alias` (described in 1C).
- `public_listing_json` and `seller_feed_page` are redeclared whole from live pg_get_functiondef. The signatures don't change, so there is no DROP (G39).
- `name_check_mark` is extended to accept 'imitates' and 'unavailable'. 'unavailable' bumps attempts and last_attempt_at but leaves the state. The extension is a new overload or a whole redeclaration; it stays service-only and still requires the text to match.
- `my_seller_line` gains `name_review: boolean`.
- `admin_name_check_list` (keyset, listings:view + profiles:view) and `admin_name_check_clear`.
- The partial index `name_checks(since) WHERE state IN ('unchecked','imitates')` is added only if EXPLAIN uses it.
- M5 is split M5a (public reads) and M5b (staff doors) if it goes over about 25 KB, which is likely given two whole redeclarations.

Every migration carries:
- the closers
- read-back of the definitions and grants
- proofs on its own rows, rolled back whole and raising on failure
- public-surface allowlist lines for its grants
- a mark chosen at apply time, reported as `apply <fragment> → expect mark <value>`

## 3. The route: POST /api/public/jobs/$job
1. First statement: read `x-job-secret` and compare it to `process.env.JOB_SECRET` with a constant-time compare over equal-length buffers. If the server secret is missing, or the header is missing or wrong, the answer is `answer.refuse` 401 with a constant body. Nothing is read, spent, logged with its value, or leased.
2. Parse `$job` against the registry enum through the schema helper. An unknown job gets 404.
3. A person's session never opens it: the Authorization header is ignored, and only the secret counts.
4. The core:
   - Take the lease; if it is busy, the heartbeat says 'busy' and the run ends.
   - Read the pause; if paused (402/403), process one probe item only.
   - Check the switch and budget through the gateway's own preflight; if off or spent, the heartbeat says 'switch_off' or 'budget_spent', and nothing is marked or asked.
   - Select up to 20 'unchecked' rows, oldest since first. For each one, call `aiCall("name_check")` with the gateway's named deadline (`NAME_CHECK_DEADLINE_MS`, reused from the alias route), then call `name_check_mark(profile,'alias',checked_text, verdict)`.
   - If the text changed in between, the mark changes nothing, and that is counted.
   - The audit row is written before the verdict (DEC-280; the gateway already orders this).
   - On 402 or 403, or a third 429, stop, store the pause reason, and write the heartbeat.
   - Release the lease and write `job_run_finish`.
5. Answer `{ ok, outcome, asked, clean, imitates, unavailable }` with counts only. No names or texts.

## 4. The secret on both sides
- **Server secret `JOB_SECRET`.** The operator enters it in Lovable → Project Settings → Secrets (the secret dialog), as a value they generate themselves, for example with `openssl rand -hex 32`. It is a shared secret, so it is not generated by the tool.
- **Vault on ethio-prod, in the SQL editor:**
  - `select vault.create_secret('<same value>','job_secret');`
  - `select vault.create_secret('https://my-market-dawn.lovable.app','job_base_url');`
  - The URL could instead be the stable `project--b0521dfa-…lovable.app`. Ruling R2.
- **Staging:** no Vault rows. Every run is not_configured with a heartbeat, and nothing is called.
- **Rotation:** change both values, Vault first, then the server secret. Runs in between refuse, and the heartbeat shows 'failed' with a 401.

## 5. Tests (IDs grep-checked free at build; prefix NCJ-)
- NCJ-1: no secret → 401; no lease, no ai_calls, no mark (spies prove none were called).
- NCJ-2: wrong secret of the same length, and of a different length → 401, same proof of nothing done.
- NCJ-3: a valid session bearer with no secret → 401.
- NCJ-4: unknown job → 404 after the secret check.
- NCJ-5: catch-up clean, imitates and unavailable; at most 20 per run, oldest first.
- NCJ-6: a stale text marks nothing.
- NCJ-7: switch off / budget spent → heartbeat with the reason, zero model calls.
- NCJ-8: 402 → paused, then one probe next run; a third 429 → paused.
- NCJ-9: lease busy → 'busy', no calls.
- NCJ-10: empty queue → 'ok', asked 0.
- SQL proofs:
  - helper hides 'imitates' in public_listing_json and seller_feed_page, and shows 'clean'/'unchecked'
  - staff doors see the name
  - my_seller_line returns the name plus name_review
  - Clear: allowed, denied without the permission, and stale text
  - Rename through admin_update_profile
  - job_call writes not_configured with no Vault rows
- Unit tests:
  - the owner's notice renders
  - the ad page draws the neutral label for a NULL alias, extending the listing-detail tests
- Guards: the jobs secret-first census and the seller_alias-without-helper census, each with a planted failure.
- E2E: the existing admin-screening spec gains the queue row and Clear, both projects, whole file, 0 retries.
- The whole unit suite runs.

## 6. Conflicts
- **Platform guidance:**
  - The platform says not to hand-author pg_cron + pg_net HTTP callbacks for user-managed Supabase. Its alternatives are a SQL-only job or an external scheduler.
  - The operator chose T1, which goes against it. The platform needs nothing switched on, but its managed schedule and auth tools do not cover this project.
  - Our own route therefore owns authentication (the shared secret), and Vault plus job_call own the call.
  - The supervisor's ruling is the authority; this is recorded in the DEC.
- **Knowledge:**
  - "Born closed": pg_net's `net` schema grants are revoked explicitly.
  - "outside calls via `upstream()`" does not apply to the database's outgoing call. It applies to the route's model call, which goes through aiCall.
  - "no request.json/new Response": the route uses defineRoute and answer.ts.
- **Background-jobs skill:** bounded runs, a lease, idempotent marks, a breaker and a paused guard are all covered. The route lives under `/api/public/` as required.
- **AGENTS.md:** a new jobs rule is added, one line.

## 7. DEC facts (for the supervisor to draft)
- **New:**
  - the first outgoing HTTP call from the database (the pg_net extension, a SECURITY DEFINER job_call reading Vault)
  - the first scheduled-job route, with its secret-first mechanism and guard
  - the first verdict acted on automatically about a person (a name hidden from buyers)
- **Why:** the operator's choice to keep schedules in one place, with no dependency on GitHub Actions minutes once the repository is private.
- **Security cost:**
  - one internet-reachable route whose only protection is a 32-byte secret
  - the secret lives in two stores (Vault and server secrets), and anyone with database owner access can read it
  - pg_net can reach any URL, limited to the one SECURITY DEFINER caller with the URL from Vault
  - a false 'imitates' hides a real seller's name until staff act, softened by the owner's notice and the staff queue
- **Failure posture:** every failure leaves the state as it was and writes a heartbeat.

## 8. Sizing (G37)
1. **N1b-1:** CI first; M1 backfill, M2 pg_net + job_call, M3 heartbeat/lease/pause, M4 schedule; the route + secret + core; the jobs guard; NCJ-1…10. Stops after each migration.
2. **N1b-2:** M5a hide helper + public reads redeclared; the owner's notice (strings from the supervisor); the seller_alias guard; listing-detail tests.
3. **N1b-3:** M5b staff doors; queue + Clear/Rename UI with the model answer; E2E; docs, register row, DEC wiring, final report.

ESTIMATE: 3 turns, band 3–5 (more if the CI image lacks pg_net or the M5 redeclarations go over the size limit).

## Rulings needed
- R1: one shared `job_runs` table (recommended) or a per-job `name_check_runs` table, following the existing `*_runs` pattern.
- R2: Vault base URL: the published domain or the stable project URL (recommended: stable).
- R3: cap 20 per run and every 15 minutes (estimate) confirmed.
- R4: Clear's permission: listings:edit + step-up (recommended), or a new screening action.
