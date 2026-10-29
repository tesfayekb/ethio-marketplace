# Foundations turn N1b-3 — stop 3 (CI /admin/ai budget; N1b-3b M3 applied)

## CI line

ci-evidence (raw, read 11:0xZ): ci-status.md names **`69339baf` FAILURE** (run 40858084623, 10:58:20Z): the first-paint budget only. Every lane ran, and 2,399 E2E tests passed with 0 failed. `/account`, `/admin/attributes` and `/admin/listings` were fixed by C1 at stop 2. This commit fixes `/admin/ai`. Not judged until the run on this commit.

## CI item — /admin/ai

- `scripts/route-budgets.mjs`: `/admin/ai` raised 333 → **334** (measured 333.8). The comment names the cause: N1b-3a A1 (INC-987) put the shared Filters blocks (FiltersButton, FilterChips) on the AI calls table. No other line moved.
- **Shared chunk or own copy:** shared. The newest build in the sandbox (`dist/client/assets`, built 10:14Z by the platform harness, not by me) has one `filter-chips-DIrVi88T.js` chunk (2,027 B gzip). It is imported by 13 chunks: `admin.ai`, `admin.audit`, `admin.categories`, `admin.countries`, `admin.listings`, `admin.places`, `admin.screening`, `admin.translations_._lang`, `admin.users`, `my-listings`, `dev.style`, `index` and itself. `filter-choices-C7RIE-Sb.js` (973 B gzip) is likewise one shared chunk, used by 13 chunks. Together they are about 3.0 KiB gzip; `/admin/ai`'s first download now includes them, which accounts for the +0.8 KiB increase together with what the page already shared. **No copy, so no K2 line.** Limit: this build is from before 69339baf's final commit; I did not rebuild it (A6).

## Ruling recorded

Clear's reason stays optional, the same as Rename (`admin_update_profile`'s `p_reason DEFAULT NULL`). M2 already has that form; no change.

## M3 — applied on ethio-prod

**apply 2a2066ed → expect mark 20261030040000**

File `supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql`, 10,434 B (estimate ~6 KB; the proof is the excess).

- `job_health_core(p_job, p_run uuid DEFAULT NULL)`: a service-only SECURITY INVOKER core. `p_job` must be in `job_runs`' CHECK list (`name-check-catchup`), else `badValue:job`. It reads the newest `job_runs` row (or the one run `p_run`), and returns `last {outcome, reason, started_at, finished_at}` or null, plus `dispatched_unclaimed` (the newest row is `dispatched`, has no `claimed_at`, and `started_at` is more than 2 minutes old). When unscoped, it also returns `paused {reason, since}` from `job_pauses` by primary key.
- `admin_job_health(p_job)`: a DEFINER door gated on `services:view` before any read (R6). The job comes in by parameter (R7).
- `admin_job_resume(p_job)`: a DEFINER door. The order is signed-in → `services:manage` → `require_step_up_if_needed('services','manage')` (the gate and step-up of `admin_set_ai_feature`) → the job check → capture the pause `FOR UPDATE`. With no pause it returns `{ok:false, reason:'notPaused'}` and writes nothing. Otherwise it calls `job_pause_clear` (still service-only; it runs as the door's owner), writes `log_audit('job.resumed','job',p_job,{old:{reason,since}})` and returns `{ok:true}`. I left out `admin_set_ai_feature`'s `staff_config` rate dial, because the brief names none. Say if Resume should spend it.
- Closers in the file: the core is revoked from PUBLIC, anon and authenticated, with ALL to service_role. Each door is revoked from PUBLIC and anon, with EXECUTE to authenticated and ALL to service_role.

Proof NJH-1…5. It used only its own scratch `job_runs` rows (by id, with negative scratch `ts`) and its own `e2e-mig-n1b3m3-` staff user and role. It never called `job_call` and never read the Vault. Everything was rolled back, followed by a check that nothing survived.
- NJH-1: a dispatch 10 minutes old with no claim → `dispatched_unclaimed` true. A dispatch 30 seconds old → false.
- NJH-2: a finished `failed` run answers its outcome, reason and times.
- NJH-3: an unknown run → `last` null. An unknown job → `badValue:job`.
- NJH-4 (refusals): with no permission, health and Resume are both refused. With `services:manage` but no factor, Resume is refused by step-up (P0009). No `job.resumed` row was written.
- NJH-5: ACLs, plus DEFINER/INVOKER headers. `job_pause_clear` is still closed to authenticated.
- **Limit:** `job_pauses`' key is the real job name (its CHECK), so a pause row cannot be scratch. Resume's success path and the health door's unscoped read (pause included) are therefore not run here. N1b-3c's E2E proves them on CI's temporary backend.

**First submission failed in its own proof, and nothing was applied** (mark still 20261030033000, core absent, read back). The error was `record "v_pause" is not assigned yet`: the scoped path never filled the pause record. That is a real defect, which the proof caught. The fix was a `query_patch` that holds the pause in two scalar variables, so the pause line now depends only on whether a reason was read. Proof unchanged.

Guard before the apply (a scratch copy in the tree, removed afterwards): **`Migration guard OK.`** After the apply, on the tree: **`Migration guard OK.`**

Prod readback: mark `20261030040000`. The core is not executable by authenticated. Health and Resume are not executable by anon; Resume is executable by authenticated. 0 pauses.
Linter: 2 new "signed-in users can execute SECURITY DEFINER" warnings — the two staff doors, gated inside (E7's form; WARN class). The other findings are unchanged.
Allowlists: `public-surface-allowlist.txt` (both doors) and `acceptance-doors-allowlist.txt` (`admin_job_resume(text) | staff`).

## Final key list for N1b-3c (R8)

Queue section (Admin › Screening):
- `admin.screening.names.title`
- `admin.screening.names.empty`
- `admin.screening.names.error`
- `admin.screening.names.col.name`
- `admin.screening.names.col.since`
- `admin.screening.names.col.attempts`
- `admin.screening.names.col.owner`
- `admin.screening.names.of` — "Model said it imitates: {of}"
- `admin.screening.names.noReason` — "No reason recorded"
- `admin.screening.names.nameHidden` — "name hidden"
- `admin.screening.names.action.clear`
- `admin.screening.names.action.rename`
- `admin.screening.names.clear.title`
- `admin.screening.names.clear.body`
- `admin.screening.names.clear.reason` (field label)
- `admin.screening.names.clear.reasonHelp` (optional, under the field)
- `admin.screening.names.clear.done`
- `admin.screening.names.clear.stale` — the name changed since it was listed

Job health line:
- `admin.screening.job.lastRun` — "Last run: {outcome}, {time}"
- `admin.screening.job.noAnswer` — "The site did not answer (sent {time})"
- `admin.screening.job.paused` — "Paused: {reason} since {time}"
- `admin.screening.job.notConfigured` — "Not set up yet"
- `admin.screening.job.error`
- `admin.screening.job.action.resume`
- `admin.screening.job.resume.done`
- `admin.screening.job.resume.notPaused`
- `admin.screening.job.outcome.ok`, `.busy`, `.paused`, `.switch_off`, `.budget_spent`, `.failed`, `.dispatched` — the `job_runs` outcomes the line can name (`not_configured` has its own line above)
- `admin.screening.job.pause.credits`, `.policy`, `.rate_limit` — the `job_pauses` reasons

That is 37 keys, all in the admin layer (en-admin / am-admin). No `admin.audit.action.*` keys (R5). Run-time failure messages reuse the existing permission, step-up and error keys; no new keys for those.

## Checks

- `scripts/check-migrations.sh`: OK (above). SPA-10a and the outbound-calls census still pass.
- No src or t() change this stop, so i18n:usage is not needed. The unit suite is unchanged since stop 2 except one budget line.
- prettier and eslint on touched files: see the landing.

## Files

scripts/route-budgets.mjs · supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql (new) · src/integrations/supabase/types.ts (regenerated) · scripts/public-surface-allowlist.txt · scripts/acceptance-doors-allowlist.txt · roadmap.md · this report.
