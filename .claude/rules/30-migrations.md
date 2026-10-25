# 30 — Migrations: write the file, land it, apply on production only when told

Schema truth is `supabase/migrations/` (append-only). You WRITE migration files and land them with a
MIGRATION stop. The supervisor reviews the file and applies it on ethio-staging first (where its
proofs run against a real schema), reading back the specific mark. Then — and only when the
supervisor's message says `apply <fragment> on ethio-prod` — you apply that one file on ethio-prod
through the `supabase-prod` migration tool (`apply_migration`), with the file's exact text as the
query and the file's name (without the stamp) as the name. Claude Code asks the operator to approve
that call; it runs only on his yes — the same gate as Lovable's "Modify Supabase database" dialog.
You then report the tool's answer word for word; the supervisor reads the production mark back.
You never apply anything on ethio-staging, never apply a file you did not land, never apply a file
twice, never send SQL through any other tool (no `supabase` CLI, no `psql`, no SQL editor), and
never retry a refused or failed apply — a failure is a STOP with the tool's text.

## Order inside a turn

A migration comes as early as its part allows — the code that depends on the schema follows it. A
turn that lands a door and its screens writes the door migration first, STOPs for the applies, and
builds the screens after `continue` (the published site may disagree with the database between the
apply and the next Publish; say so in the report). Never an empty or placeholder migration.

## Content laws (E1, E2, G39)

- File name: the Supabase stamp form `YYYYMMDDHHMMSS_<uuid>.sql` (UTC now, a fresh uuid). One concern
  per file; a very large migration is split by concern into ordered parts, each with its own mark.
- APPEND-ONLY: corrections are new migrations; a landed file is never edited; destructive changes only
  when the brief says so in words.
- BORN CLOSED: `CREATE TABLE` → `REVOKE ALL ON <table> FROM PUBLIC, anon, authenticated;` →
  `GRANT ALL ON <table> TO service_role;` → `ALTER TABLE … ENABLE ROW LEVEL SECURITY;` →
  per-operation policies (a service-only table: four deny policies — SELECT `USING (false)`, INSERT
  `WITH CHECK (false)`, UPDATE, DELETE). A grant to anon/authenticated/PUBLIC needs its line in
  `scripts/public-surface-allowlist.txt` (`object | reason`). Every new sequence and function is born
  closed; every new function restates `REVOKE ALL ON FUNCTION … FROM PUBLIC, anon;` and its GRANTs
  (`GRANT EXECUTE … TO authenticated` where the app calls it; `GRANT ALL … TO service_role`).
  `SECURITY DEFINER` functions carry `SET search_path = public`.
- PERSONAL DATA: a column naming a person references `public.profiles(user_id)` (`ON DELETE SET NULL`
  or `CASCADE` as the brief says), never `auth.users` (only `profiles` and `user_roles` may);
  personal tables carry `home_country_code`; every table has `created_at` / `updated_at timestamptz
  NOT NULL DEFAULT now()` with the `public.update_updated_at_column()` trigger; money is never a float;
  a table with a person column gets its RESET or EXEMPT line in `e2e/helpers/pool-reset-map.ts`
  (`src/test/pool-reset-map.test.ts` fails until it does).
- FUNCTIONS: never patch a body by text anchor (INC-183). Redeclare WHOLE from the LIVE definition —
  the brief or the supervisor hands you `pg_get_functiondef` with `provolatile`, `prosecdef`,
  `proconfig` as read on ethio-prod; the new body is byte for byte the old one apart from the named
  change; `CREATE OR REPLACE`, no DROP unless the argument list or return shape changes (then DROP +
  CREATE and restate the dropped function's REVOKE and GRANTs); the generated client types
  (`src/integrations/supabase/types.ts`) make a nullable argument optional only when it is trailing
  with `DEFAULT NULL` — design signatures so.
- MARK: every migration inserts its own mark —
  `INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT DO NOTHING;` — where
  `<MARK>` is a 14-digit UTC stamp later than the file's own stamp and above every mark in the ledger
  (the brief gives the floor; choose now rounded UP to the next hour + 1 hour, + 12 hours when the
  apply may wait). A wrong mark is healed by a later migration's UPDATE, never by editing a landed file.
  A `-- e2e-areas:` header line names the spec areas the change selects (no line → ALL).
- PROOFS: one `DO $$ … $$` block that creates its own scratch rows (`e2e_mig_` tables, `e2e-` rows),
  removes them, runs as a scratch user or with no caller, never reads a real account or place, checks
  privileges with `has_table_privilege` / `has_function_privilege`, and `RAISE EXCEPTION`s on any
  failure — a clean apply is the pass; a proof that skips with a NOTICE is a weakened proof. A function
  a route calls is also proven by a route test (pg-safeupdate: no app-reachable function issues a
  DELETE or UPDATE without a WHERE — INC-432). List RPCs ship index + EXPLAIN in the proof.
- CLOSERS in-file, last: the REVOKE/GRANT lines, then the mark.
- Run `bash scripts/check-migrations.sh` and paste its guard lines ("Self-marking guard OK" among
  them) before you commit.

## The migration report (then STOP and land)

For each file: its name; `sha256sum`; the declared mark; the objects it creates or redeclares; the
proofs it carries; the guard lines; and the apply pairing line, exactly:
`apply <uuid-fragment of the file name> → expect mark <MARK>`. Write it as the stop report
`docs/governance/reports/<brief-stem>.stop-<n>.md` — first line `MIGRATION — turn NN part X:
<subject>`, then DONE / LEFT / CI / FILES, the per-file lines above and the pairing line — commit it
on its own, land (`bun .claude/hooks/land.ts`; the e2e preflight on that landing reports
"STAGING BEHIND" until the staging apply — expected, named in the report), and end the turn.

Then, in order, in the same session:
1. The supervisor applies the file on ethio-staging and reads back the mark (you do nothing).
2. The supervisor's message `apply <fragment> on ethio-prod`: you call `apply_migration` on the
   `supabase-prod` server with the landed file's exact text (read it with the Read tool from the
   committed file; no edits, no re-typing), wait for the operator's approval, and reply with the
   tool's answer word for word — success or error. An error is a STOP: you do not fix, retry or
   apply anything else.
3. The supervisor reads the production mark back and sends `continue`; the brief's next part begins.
   A test that needs the new schema is expected red only in the window the report named.
