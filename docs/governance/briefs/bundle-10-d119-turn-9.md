# Bundle 10 follow-up — turn 9: D106 part 1, the browsing place on the account (the database): brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 9 (2026-10-10). ONE TURN, ONE MIGRATION. Tier A (identity, RLS and grants, a rate dial).
Base: dev 270ee85f. This file is public: it is written as build instructions.
No new string, no package change, no screen change. The screens come in turn 10, once this door is on both databases.

ANSWERS TO TURN 8
- Verified by diff of 255d5401..270ee85f: the five carrier paths and the brief byte-identical to the supervisor's copy; the migration file equals the appendix with <MARK> = 20261010180000, apart from the final newline (the tool's norm).
- CI on 270ee85f (run 38029368030): attempt 2 GREEN after the operator's staging apply, promoted (main = dev). PR-43 passed. Turn 8 is CLEAN.
- Census (a) printed nothing because the platform had already committed the brief. That is accepted; this brief's census (a) allows it.

WHAT THIS TURN BUILDS (D106, approved by the operator on 2026-10-10)
- The place picked in the location row is kept on the account for signed-in people, so it follows them to every device. Visitors keep the per-browser save. The IP guess is never saved. When a device and the account disagree at sign-in, the newest pick wins.
- This turn is the database half:
  - profiles.viewing_location_id (→ locations, ON DELETE SET NULL) and profiles.viewing_location_at (when it was picked). No client role can write either column (INC-535 holds);
  - the dial viewing_place: 60 an hour per account;
  - user_set_viewing_location(p_location uuid) — the only writer: the caller's own row, rate-gated, the place must be shown in an open market's tree (it reuses get_location_tree), NULL clears;
  - my_viewing_location() — the owner's read: {id, country, at, usable};
  - both doors on scripts/public-surface-allowlist.txt, each with its reason.
- Tests: e2e/viewing-place.spec.ts (new) — VP-1 a shown place is saved with its time and read back; VP-2 a retired place, a place under a retired region and an unknown id are refused, the saved place stays; VP-3 a saved place that stops being shown reads as not usable, NULL clears; VP-4 the dial refuses the call past a lowered limit (a rate_overrides row for the test's own account); VP-5 no session reaches either door, and the owner's client cannot write the two columns.
- scripts/e2e-select.ts lists the new spec under the shell and feed areas (the migration's e2e-areas line names both).
- Docs: location-scoping.md (a D106 section), identity-schema.md, the changelog, the roadmap.
The supervisor ran the migration text on a local Postgres 16 mirror (profiles after INC-535, places, markets, the tree function, the dial tables and rate_gate as declared in the repository):
- every proof passes, and a re-run passes;
- the doors behave as VP-1..VP-5 expect (a shown city saved and read back usable; a closed market's place, an unknown id and a place under a retired region refused; read not usable once retired; NULL clears; the dial refuses past the limit; a direct column write refused; anon refused);
- six variants each fail their proof: CASCADE for SET NULL (E1), another dial size (E2), anon allowed to run the writer (E3), a writer not keyed by auth.uid() alone (E4), a client column grant (E5), a read without the session check (E6);
- scripts/check-migrations.sh on the repository's migrations plus this text, with the two allowlist lines: every guard OK.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-9.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 270ee85 SUCCESS). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration file exists runs VP-1..VP-5 against a staging database without the doors, so they fail there. That is expected and is not fixed. CI on the final commit stops at its preflight until the operator applies the migration on ethio-staging; then "Re-run failed jobs" judges the turn.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it); the seven carrier paths; the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-9.md`, or nothing if the platform has already committed the brief.
- On ethio-prod with your query tool (SELECT only):
- (b) `select count(*) from pg_attribute where attrelid = 'public.profiles'::regclass and attname in ('viewing_location_id', 'viewing_location_at') and not attisdropped;` → 0
- (c) `select count(*) from pg_proc where proname in ('user_set_viewing_location', 'my_viewing_location');` → 0
- (d) `select proname, pg_get_function_identity_arguments(oid), prosecdef from pg_proc where proname in ('get_location_tree', 'rate_gate') order by 1;` → get_location_tree | p_country_code text | t (true); rate_gate | p_action text | t (true)
- (e) `select string_agg(attname, ', ' order by attname) from pg_attribute where attrelid = 'public.profiles'::regclass and attnum > 0 and not attisdropped and has_column_privilege('authenticated', attrelid, attnum, 'UPDATE');` → NULL (INC-535)
- (f) `select max(version) from public.migration_marks;` → 20261010180000

THE CARRIER — D106-TURN9-CARRIER-2026-10-10.md (60,233 bytes; sha256 eed54a3b82912a4e266339db593fbaf05866f7b108f0e4642d92f346422e5e1f; 7 sections)
- Its first line starts "D106 TURN 9 CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes: REPLACE (the whole file); NEW (a file that must not exist yet); APPEND (added at the end of the file).
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 7 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  30181fe90b57ee7793a790925f5e9ebddd6903ed63d1a4d9fec3d235ba043646  scripts/public-surface-allowlist.txt
  8ea1a8a97119b6e52d22c66dcaf5eb1f70ac0b02990e16aee58ad6d97bdd0a9d  scripts/e2e-select.ts
  65d5cf3d01a2148eb838481fae0114e3755ab67747f3217d284a3997eaaf8d1f  e2e/viewing-place.spec.ts
  c30562c9dd1fd5b9b7fec74f55e54e5de30cdb07a44c4b448617fae10eda5449  docs/features/location-scoping.md
  ca1ddf1dd03828b5a3f695c2847d253f5fb257960a63d662d3f95111643b42eb  docs/features/identity-schema.md
  2bb3c7b115853f07ca715f250e1bbc59b32aa3a6e5e9f90da849daef476268ff  roadmap.md
  ddaff8c593907936f6060b9e76143cf5298e3d5689fca9dbfa24c5608da6cb3d  docs/_changelog.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 595 passed;
- `bun run i18n:map-guard` "usage maps match the tree." on the first run (no key changes);
- `bun run scripts/e2e-select.ts --self-test` OK (the new spec is reachable);
- `bun run build` clean.

THE BROWSER RUN — not this turn. VP-1..VP-5 need the doors on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 728aa77c34f8ca470d72fe27891683c80e5566ec4a0c3803d336ceddd5d061a1 (8,377 bytes, 190 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist holds the two doors):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under a name of the form 20261010000000_d106-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp and above 20261010180000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- census (b) again → 2;
- `select proname, prosecdef, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where proname in ('user_set_viewing_location', 'my_viewing_location') order by 1;` → my_viewing_location | t | f | t; user_set_viewing_location | t | f | t;
- census (e) again → NULL.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(f).
- The 7 sha256sum lines and the brief's.
- `git diff --name-only 270ee85f` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 270ee85f HEAD` too. Expect the seven carrier paths, the brief and the one migration file (and types.ts if regenerated).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark, then "Re-run failed jobs" on the CI run (its E2E preflight waits for staging); send the executor nothing until CI on the final commit is read.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- D106, part 1 (2026-10-10; bundle 10 follow-up, turn 9). Tier A. The chosen browsing place is kept on the account.
-- e2e-areas: shell, feed
-- A. profiles.viewing_location_id (the place) and profiles.viewing_location_at (when it was picked, so the newest
--    pick wins between a device and the account). The untyped legacy column viewing_location stays, unread.
--    No client role may write either column (INC-535): the door below is the only writer.
-- B. The dial viewing_place: 60 an hour per account (the operator, 2026-10-10).
-- C. user_set_viewing_location(p_location uuid): own row only, rate-gated, the place must be visible in an open
--    market's tree (the rule of get_location_tree, reused), NULL clears. A browsing preference, not identity:
--    no audit line, updated_at untouched.
-- D. my_viewing_location(): the owner's read — the place, its market, when it was picked, and whether it is
--    still visible.
-- E. Proofs: catalogue reads and calls with no session only; the doors' behaviour is proven by VP-1..VP-6.

-- ===== A — the place and its time =====
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS viewing_location_id uuid REFERENCES public.locations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS viewing_location_at timestamptz;

-- ===== B — the dial =====
INSERT INTO public.rate_dials (action, max_count, window_seconds) VALUES ('viewing_place', 60, 3600)
  ON CONFLICT (action) DO UPDATE SET max_count = EXCLUDED.max_count, window_seconds = EXCLUDED.window_seconds;

-- ===== C — the writer =====
CREATE OR REPLACE FUNCTION public.user_set_viewing_location(p_location uuid)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_rate    jsonb;
  v_country text;
  v_at      timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;

  v_rate := public.rate_gate('viewing_place');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;

  IF p_location IS NOT NULL THEN
    SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = p_location;
    IF v_country IS NULL
       OR NOT EXISTS (SELECT 1 FROM public.get_location_tree(v_country) t WHERE t.id = p_location) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'placeNotOpen');
    END IF;
    v_at := now();
  END IF;

  UPDATE public.profiles p
     SET viewing_location_id = p_location,
         viewing_location_at = v_at
   WHERE p.user_id = v_uid;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no profile row';
  END IF;

  RETURN jsonb_build_object('ok', true, 'id', p_location, 'country', v_country, 'at', v_at);
END $$;

REVOKE ALL ON FUNCTION public.user_set_viewing_location(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_set_viewing_location(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.user_set_viewing_location(uuid) TO service_role;

-- ===== D — the owner's read =====
CREATE OR REPLACE FUNCTION public.my_viewing_location()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_id      uuid;
  v_at      timestamptz;
  v_country text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;

  SELECT p.viewing_location_id, p.viewing_location_at INTO v_id, v_at
    FROM public.profiles p
   WHERE p.user_id = v_uid;
  IF v_id IS NULL THEN
    RETURN jsonb_build_object('id', NULL, 'country', NULL, 'at', NULL, 'usable', false);
  END IF;

  SELECT l.country_code INTO v_country FROM public.locations l WHERE l.id = v_id;
  RETURN jsonb_build_object(
    'id', v_id,
    'country', v_country,
    'at', v_at,
    'usable', v_country IS NOT NULL
              AND EXISTS (SELECT 1 FROM public.get_location_tree(v_country) t WHERE t.id = v_id));
END $$;

REVOKE ALL ON FUNCTION public.my_viewing_location() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_viewing_location() TO authenticated;
GRANT ALL ON FUNCTION public.my_viewing_location() TO service_role;

-- ===== E — proofs =====
DO $proof$
DECLARE
  v_fn   text;
  v_ok   boolean;
BEGIN
  -- E1: the two columns, and the place's delete rule (a deleted place leaves no dangling id).
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_schema = 'public' AND table_name = 'profiles'
                    AND column_name = 'viewing_location_id' AND data_type = 'uuid')
     OR NOT EXISTS (SELECT 1 FROM information_schema.columns
                     WHERE table_schema = 'public' AND table_name = 'profiles'
                       AND column_name = 'viewing_location_at' AND data_type = 'timestamp with time zone') THEN
    RAISE EXCEPTION 'D106 E1: the columns';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_constraint c
                  WHERE c.conrelid = 'public.profiles'::regclass AND c.contype = 'f'
                    AND c.confrelid = 'public.locations'::regclass AND c.confdeltype = 'n'
                    AND c.conkey = ARRAY[(SELECT a.attnum FROM pg_catalog.pg_attribute a
                                           WHERE a.attrelid = 'public.profiles'::regclass
                                             AND a.attname = 'viewing_location_id')]) THEN
    RAISE EXCEPTION 'D106 E1: the place reference';
  END IF;

  -- E2: the dial.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials
                  WHERE action = 'viewing_place' AND max_count = 60 AND window_seconds = 3600) THEN
    RAISE EXCEPTION 'D106 E2: the dial';
  END IF;

  -- E3: both doors are definers with a fixed search path; the signed-in role runs them, anon and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY['public.user_set_viewing_location(uuid)', 'public.my_viewing_location()'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, unnest(p.proconfig) cfg
                       WHERE p.oid = v_fn::regprocedure AND cfg LIKE 'search_path=%') THEN
      RAISE EXCEPTION 'D106 E3: % is not a definer with a search path', v_fn;
    END IF;
    IF pg_catalog.has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT pg_catalog.has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'D106 E3: % privileges', v_fn;
    END IF;
  END LOOP;

  -- E4: own row by construction — one argument at most, and the row is found by auth.uid() alone.
  IF (SELECT p.pronargs FROM pg_catalog.pg_proc p
       WHERE p.oid = 'public.user_set_viewing_location(uuid)'::regprocedure) <> 1
     OR pg_get_functiondef('public.user_set_viewing_location(uuid)'::regprocedure) NOT LIKE '%WHERE p.user_id = v_uid;%'
     OR pg_get_functiondef('public.my_viewing_location()'::regprocedure) NOT LIKE '%WHERE p.user_id = v_uid;%' THEN
    RAISE EXCEPTION 'D106 E4: a door is not keyed by auth.uid()';
  END IF;

  -- E5: no client role writes the new columns (INC-535 holds).
  IF pg_catalog.has_column_privilege('authenticated', 'public.profiles', 'viewing_location_id', 'UPDATE')
     OR pg_catalog.has_column_privilege('authenticated', 'public.profiles', 'viewing_location_at', 'UPDATE')
     OR pg_catalog.has_any_column_privilege('anon', 'public.profiles', 'UPDATE')
     OR pg_catalog.has_any_column_privilege('authenticated', 'public.profiles', 'UPDATE') THEN
    RAISE EXCEPTION 'D106 E5: a client role can write profiles';
  END IF;

  -- E6: with no session, both doors refuse.
  v_ok := false;
  BEGIN
    PERFORM public.user_set_viewing_location(NULL);
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'D106 E6: the writer did not refuse a call with no session';
  END IF;
  v_ok := false;
  BEGIN
    PERFORM public.my_viewing_location();
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'D106 E6: the read did not refuse a call with no session';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
