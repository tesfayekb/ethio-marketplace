# Foundations turn N1b-3 — the brief

## The plan (at c8410ef2)

````markdown
# Foundations turn N1b-3 — the staff queue for held seller names, the job's health, and two fixes first (INC-987, INC-989)

Base: dev 7a95706a. Plan only; nothing has been changed.

## CI first

ci-evidence (read 10:0xZ) still names `3ee69785` as the newest completed run: SUCCESS, with no guard failure and no E2E failure. The run on `7a95706a` had not completed when I read it. The build reads it first: any red, including EXH-4/5 or AAN-1 in the unit job, goes ahead of Part A.

## Part A1 — INC-987: the search slot holds one search input

Census:
- 20 files under src/ draw `TableToolbar`.
- 15 of them pass `search=`. 14 pass one `Input`, or the page's own box (data-scope.tsx). One, `ai-calls.tsx:116–151`, passes two `NativeSelect` in a fragment.
- The toolbar's search box (`table-toolbar.tsx:44–51`) is one `relative md:max-w-80` box with an absolute magnifier. That is why the two selects stack under it.

Fix:
- `ai-calls.tsx`: the feature and outcome choices move into `FiltersButton`, with `FilterChips` under the toolbar, in the form `audit-page.tsx` uses.
- The table has no text search, so its `search` slot is left empty. The chips' clear resets the keyset history (`setHistory([null])`), as the selects did.

Guard T2b — the design choice:
- **Chosen: an AST read** (the TypeScript compiler API, the way `kit.test.ts`'s `allowlistReaders` already reads calls). For every `<TableToolbar search={X}>`, X must be one JSX element, either `Input` or an identifier the census follows to the page's search-box prop. A fragment, `NativeSelect`, `Select`, or more than one element fails. Separately, any `NativeSelect` or `Select` inside a `TableToolbar`'s `search` or `columns` slot fails, with the rule "a choice that narrows the rows lives in Filters".
- Cost to consumers: none. All 14 already pass. `data-scope.tsx`'s `search={search}` is followed to its prop type, or else it becomes one allowlist line with a reason and an until.
- **Rejected: the toolbar owning its own search input by props** (`searchValue`, `onSearch`). It would change all 14 consumers and their tests, for the same protection.
- The census is shown red on the planted current shape (a fragment of two selects) and on a planted lone select.

Tests:
- **TBS-1:** T2b passes over the tree.
- **TBS-2:** the planted fragment and the planted select are refused.
- **TBS-3:** the AI calls table filters by feature and outcome through Filters, its chips show, and clearing resets to the first page.
- The existing admin-ai E2E locators (`ai-calls-feature`, `ai-calls-outcome`) move to the Filters panel. Those spec edits are in scope.

## Part A2 — INC-989: every table holding a person's id is reset or exempt

Census, read on prod:
- **By definition, 23 tables.** 20 have a foreign key to auth.users or profiles. The column names `user_id`, `profile_id`, `seller_id` and `actor_id` add `audit_log`, `impersonation_sessions`, `listing_revisions`, `seller_notices` and `translator_languages`.
- **Today's map:** 47 entries in `e2e/helpers/pool-reset-map.ts`.
- **The gap:** `name_checks`. Its column, `profile_id`, matches neither today's column pattern in `src/test/pool-reset-map.test.ts` nor any foreign-key read, because the census reads only `types.ts`.

Fix:
- `name_checks` joins `POOL_RESET_TABLES` ("profile_id rows deleted; a held name never carries into a later lease"), and `reapPoolAccount()` deletes them.
- The census is widened in two ways:
  1. `profile_id` joins the column pattern.
  2. A foreign-key reading: every table whose `Relationships` in `types.ts` reference `profiles` or `users`.

  Every table it finds is RESET or EXEMPT (EXEMPT lines keep their reason; new ones carry an until).

Tests:
- **PRM-1:** the census finds `name_checks`.
- **PRM-2:** a planted `Row` with a `profile_id` column, and a planted relationship to `profiles` under another column name, are both refused.
- **PRM-3:** the reset clears a scratch `name_checks` row. This is a unit test on the reap statement list; the existing pool E2E runs it live.

## Part B — the staff queue

### Who sees what

| Part | Gate |
| --- | --- |
| Queue list (`admin_name_check_list`) | `listings:view`; the name and the model's `of` only with `profiles:view` as well (otherwise null, and the row says "name hidden") |
| Clear (`admin_name_check_clear`) | `profiles:update` + fresh step-up (`step_up_if_needed('profiles','update')`), the same as Rename |
| Rename | existing `admin_update_profile`; staff names land clean, and M3b stamps the outgoing name `imitates` |
| Job health (`admin_job_health`) | `services:view` (the AI page's read gate) |
| Resume (`admin_job_resume`) | `services:manage` — the gate of `admin_set_ai_feature`, the AI switch's door |

### A row in the queue

The queue is a new section in Admin › Screening, `src/features/admin-screening/name-checks.tsx`, beside `photo-reviews.tsx`. It uses DataTable keyset mode, TableToolbar, ColumnsButton and RowActions. Each row shows:
- the name;
- since;
- attempts;
- the owner, as a link to `/admin/users/$userId`;
- "Model said it imitates: <of>" as plain text, never HTML or a link (G54 b).

Row actions are Clear (step-up gated) and Rename (a link to the user page's existing editor). Only `imitates` rows are listed, ordered by `since`, then `profile_id`.

### Keeping the model's `of`

- New column `name_checks.imitates_of text NULL`, with `CHECK (char_length(imitates_of) <= 80)`.
- Only `name_check_mark` writes it. The function is redeclared whole as `name_check_mark(p_profile, p_subject, p_text, p_state, p_of text DEFAULT NULL)`. A DROP and CREATE is needed because the argument list changes; the closers are restated (service-only).
- It is set only with `imitates`, cleared on `clean` and `unchecked`, and left unchanged on `unavailable`. Every door that resets a check row to `unchecked` (`save_posting_identity`, `admin_update_profile`) also nulls it — through a trigger on `name_checks`, not by redeclaring the two writers.
- The catch-up (`src/server/jobs/name-check-catchup.ts:121`) passes `answer.of`.
- **Rows from before this turn:** none are held today (0 rows read on prod). A held row without `of` shows "No reason recorded", a new key; never blank, never "0".

### The job's health line

- One read, `admin_job_health(p_job)`, uses the index `job_runs_job_started_idx` for the newest row, plus `job_pauses` by its primary key. It answers:
  - the last outcome and its time;
  - `dispatched_unclaimed` when the newest row is `dispatched`, has no `claimed_at`, and `started_at` is more than 2 minutes old;
  - the pause's reason and since.
- **Lines:**
  - "Last run: <outcome>, <time>";
  - "The site did not answer (sent <time>)";
  - "Paused: <reason> since <time>", with a Resume action;
  - "Not set up yet" for `not_configured`;
  - an error line when the read fails, never "healthy".
- Resume calls `admin_job_resume(p_job)`. It is gated by `services:manage`, calls `job_pause_clear` inside itself (the service door stays service-only), and audits `job.resumed` with the old reason.
- The health door takes its job by parameter, from the `job_runs` CHECK list, so the next scheduled job needs no new door.

### Clear

`admin_name_check_clear(p_profile, p_subject, p_text, p_reason)`. The order is gates → capture → mutate (F5):
1. permission;
2. step-up;
3. the row is `imitates` and `checked_text = lower(btrim(p_text))`. Otherwise the answer is `stale` and nothing is written.
4. Set `clean`, null `imitates_of`, and audit `name_check.cleared` (old state and `of`, new state, reason).

Afterwards the public reads show the name again through `seller_public_alias`, with no other change.

## Migrations (each its own stop; guard OK line pasted before each apply; no trial on ethio-prod)

| | Contents | Size estimate |
| --- | --- | --- |
| M1 | `imitates_of` column + CHECK; trigger nulling it on any state other than imitates/unavailable; `name_check_mark` redeclared | ~7 KB |
| M2 | `admin_name_check_list` + `admin_name_check_clear` (+ audit action registered, `admin.audit.action.*` keys) | ~10 KB |
| M3 | `admin_job_health` + `admin_job_resume` | ~6 KB |

- Each new function restates `REVOKE ALL FROM PUBLIC, anon`, `GRANT EXECUTE TO authenticated`, `GRANT ALL TO service_role`.
- Each grant to `authenticated` gets its line in `scripts/public-surface-allowlist.txt`. Each new staff door gets its seller-names allowlist line (SPA-10a), with a reason.
- Proofs run on their own scratch user and profile rows (the legacy mixed-case shape included), with mutation and readback in separate statements, raising on failure, rolled back whole. A whole-table read uses the id-scoped form. No proof assumes the Vault is empty or calls `job_call`, and job proofs use their own scratch job rows by id.
- Marks are chosen at apply time.

## Tests (ids grep-checked free: NCQ-, JHL-, TBS-, PRM-)

**NCQ — the queue doors** (SQL proofs; refusal proofs read back that nothing changed):
- NCQ-1: without `listings:view`, no list.
- NCQ-2: without `profiles:view`, name and `of` are null.
- NCQ-3: Clear without step-up is refused; state, audit and public read are unchanged.
- NCQ-4: Clear with stale text answers `stale`; nothing changes.
- NCQ-5: Clear restores the name on `public_listing_json` and `seller_feed_page`, and audits.
- NCQ-6: Rename through `admin_update_profile` lands clean and the history row is stamped `imitates`.
- NCQ-7: `of` is bounded at 80, written only with `imitates`, and nulled on reset.
- NCQ-8: `name_check_mark`'s ACL stays service-only.

**JHL — the job health doors** (SQL proofs):
- JHL-1…5: each health state — last run, unclaimed after 2 minutes, paused, not configured, no rows.
- JHL-6: Resume clears the pause and audits.
- JHL-7: Resume without `services:manage` is refused and the pause remains.

**Unit tests:**
- The queue section shows a failed read as an error, never "none".
- The health line's error never says healthy.
- `of` is drawn as text.
- The catch-up passes `of`.

**E2E:** `e2e/name-check-queue.spec.ts`, both projects:
- Clear: the hold is made through service `name_check_mark`; staff Clear under step-up; the ad shows the name again.
- Rename: the same hold; staff Rename; the new name shows.

Each spec restores its row in afterEach.

## Strings (new keys; the supervisor sends EN/AM)

`admin.screening.names.title`, `.help`, `.col.name`, `.col.since`, `.col.attempts`, `.col.owner`, `.col.imitates`, `.noReason`, `.nameHidden`, `.empty`, `.error`, `.clear`, `.clearHelp`, `.cleared`, `.stale`, `.rename`, `admin.screening.job.title`, `.lastRun`, `.outcome.<ok|failed|not_configured|paused|...>` (one per CHECK value), `.notAnswered`, `.paused`, `.notSetUp`, `.error`, `.resume`, `.resumed`, `admin.audit.action.name_check.cleared`, `admin.audit.action.job.resumed`, `admin.roles.perm.*` (none new: the existing permissions are reused). The AI table's filters reuse existing keys.

## K2

- **Business name (D222):** still not re-checked. The doors take `p_subject`.
- **INC-990:** English literals in the seller head. Roadmap line, with INC-985.
- **Duplicated status-note form:** `my-listing-info` and `SellerReviewNotice` share the plain-text note form with no primitive. Records turn.
- **`seller_name_sweep`** (the older SQL sweep) still exists beside the catch-up; reported, not touched.
- **Audit filters:** `admin_list_audit` facets need the two new actions; they are listed in M2.

## Conflicts

- **Wording:** none with Knowledge v3.12 or AGENTS.md.
- **`name_check_mark`:** it takes a DROP+CREATE because its argument list grows. E2 allows this for a changed shape; the brief's "no DROP" in N1b-2 applied to unchanged lists. This needs the supervisor's word.
- **Platform:** the step-up depends on the existing MFA flow, with no change.

## DEC facts (staff decision on an AI verdict about a person)

- A model verdict alone only hides a name. Showing it again or replacing it needs a person holding `profiles:update`, under a fresh step-up, audited with the model's stated reason.
- The model's text is kept bounded (80 characters) and is shown to staff with `profiles:view` only, as text.
- Resuming the job is a services decision, audited.

## Sizing (G37)

- N1b-3a: CI reds (if any), A1, A2.
- N1b-3b: M1, M2, M3, each a stop.
- N1b-3c: the UI section, health line, catch-up `of`, tests, E2E, docs, register, report.

**Estimate:** 3 turns plus 3 migration stops. Band: 3–5 sessions. The risk is the step-up E2E and the T2b AST read.
````

## The ruling

````text
RULING — Foundations turn N1b-3: the plan is approved with the rulings below. BUILD N1b-3a now, then N1b-3b (M1, M2, M3, each with its own stop), then N1b-3c. Base: dev c8410ef2.

CI FIRST: read the run on 7a95706a when it lands (the last completed run, 3ee69785, is SUCCESS). Any red goes first, EXH-4/5 or AAN-1 in the unit job included.

RULINGS
R1. A1 as planned: T2b as an AST read, the AI calls choices moved into FiltersButton and FilterChips (audit-page.tsx's form), TBS-1…3, and the admin-ai E2E locators moved in scope. The toolbar owning its search by props is rejected, for the cost you give.
R2. A2 as planned: name_checks joins POOL_RESET_TABLES; the census reads profile_id and the foreign keys in types.ts' Relationships; PRM-1…3.
R3. name_check_mark: DROP and CREATE is accepted, because the argument list grows (G39). Restate its REVOKE and GRANT exactly (service-only), and keep every header attribute and the text match. The route's existing four-argument call keeps working through p_of's DEFAULT; prove that in the proof.
R4. imitates_of — the invariant is declared, not only enforced:
   - CHECK (imitates_of IS NULL OR state = 'imitates') beside the length CHECK;
   - the BEFORE trigger nulls the column when a writer moves the row to any other state, so the two doors' existing upserts keep working.
   The proof shows all three: a door's reset nulls it, a direct write of imitates_of on a 'clean' row is refused by the CHECK, and 'unavailable' leaves both the state and imitates_of as they were.
R5. AUDIT ACTIONS: no admin.audit.action.* keys. The audit page draws the action code as it is (audit-page.tsx:185), so two translated labels would be a one-off. Translating action codes is a concern of its own, for later. Read admin_list_audit: if its facets come from the log's data, it needs no change; if it holds a fixed list, add the two actions there.
R6. Gates as planned: list on listings:view, with the name and `of` only with profiles:view; Clear on profiles:update plus step_up_if_needed('profiles','update'); health on services:view; Resume on services:manage, the gate of admin_set_ai_feature, with the step-up that door uses, if any.
R7. The health door reads the job by parameter, from the CHECK list, as planned. Each job proof uses its own scratch job rows by id, and none calls job_call.
R8. STRINGS: I send the English and Amharic for every new key by script, with my ruling at the M3 stop, before N1b-3c draws them. Name the final key list in the M3 stop report (R5 removes the two audit-action keys). "No reason recorded" stays a key.
R9. K2 noted as listed. seller_name_sweep stays untouched.
R10. Sizing accepted: 3 turns plus 3 migration stops, ESTIMATE, band 3–5.

STEP 0: save your plan (.lovable/plan.md at c8410ef2) and this ruling as docs/governance/briefs/foundations-turn-n1b-3.md, by scripted copy, each in its own fenced block. Set roadmap line 3 to name it. Add the INC-989 line (open, fixed in N1b-3a) and the INC-990 line (open, the locale and format work, with INC-985).

HOW TO WORK: as N1b-2 (CI FIRST; K1–K6; the whole unit suite; G39 in full; the migration guard run and its OK line pasted before every apply; no trial runs on ethio-prod; proofs on their own scratch rows; no weakened proof; a refusal proves the refused side effect did not happen; each migration stops after its prod apply with "apply <fragment> → expect mark <value>"; push, and END THE TURN at each stop).
````
