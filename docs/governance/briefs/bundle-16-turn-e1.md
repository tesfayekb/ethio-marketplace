# Bundle 16 — turn E1: a single-pick question made multi-pick keeps every ad's answer: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN E1 (2026-10-15). ONE SHORT TURN: ONE MIGRATION, ONE NEW TEST WRITTEN BY YOU, DOCS. No strings, no screen change, no package change.
Base: dev 565b19bc (turn R3). The census below proves every file and the database by content. This file is public: it is written as build instructions.
Tier A: the migration (a trigger that rewrites ads' answers). Tier B: the test. Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn R3 is verified on dev 565b19bc: the 4 carrier paths equal the supervisor's copy byte for byte, and the brief is 1b26129e…, as written.
- CI: GitHub replaced turn R2's queued run with the run on 565b19bc, which tests R2 and R3 together. That run and the one on 92b359aa (turn R1) were still running when this brief was written. MLP-6 on desktop-1280 is expected green from 565b19bc on.

WHY THIS TURN — INC-632
- The operator (2026-10-15): Payment Plan is a single pick, but a seller may offer full payment, installment and a bank loan at once; other questions may have the same problem. The catalogue curator is checking every single-pick question; the ones the operator rules will be changed to multi-pick by the catalogue import.
- Today such a change would break the ads that already answered the question. A multi-pick answer is a list (`validate_listing_attributes`, migration 20261007222234, the select branch: anything but an array is refused 'badType multi_select'), and the posting form ticks only what a list holds (`chosenList`, src/features/posting/reset-scope.ts). So an ad holding one plain answer would be refused at its next save and would show nothing ticked. The import (`attr_import_plan`, INC-200's type change) changes the type and leaves the answers as they are.
- The fix is in the database, so every path is covered (the import, the attribute editor, a migration): when a question's type goes from single_select to multi_select, the same statement rewrites every held answer as a one-answer list. No screen changes: every reader already reads a list.

WHAT THIS TURN BUILDS
- The migration (the appendix):
  A. `attributes_type_lists()` (NEW trigger function; SECURITY INVOKER, search_path public; revoked from PUBLIC, anon and authenticated) and its trigger `attributes_type_lists`: AFTER UPDATE OF attr_type ON public.attributes, FOR EACH ROW, WHEN the old type is single_select and the new one multi_select. On every ad that is not deleted and holds the question's key: a pick "a" becomes ["a"]; an "Other" with its words {"value":"other","text":…} becomes a one-item list holding it; an empty answer "" becomes []. A list already held, and an ad without the key, are left as they are. One audit row: action 'attribute.type_to_multi', entity_type 'attribute', entity_id the question's id, meta {attr_key, listings: <how many ads changed>}.
  P. Proofs: the function's header and privileges; the trigger's definition. No proof writes a row.
- The docs (attributes.md, a section for this turn), the roadmap (E1 done; turn 4 next) and the changelog, in the carrier.
- THE TEST (below): you write AT-82.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The fix is a trigger in the database rather than a change to every reader, so no path that changes a question's type can leave the old answers behind.
- Only single-pick → multi-pick is handled: it loses nothing. Other type changes keep bundle 7's rule (the attribute editor names the holders and does not block the save). A multi-pick → single-pick change is refused by the supervisor's audit of every catalogue batch while any ad holds the question.
- Deleted ads are left as they are; drafts and every other status are rewritten.

THE TEST — you write it this turn, from the description below (Tier B).
- It goes in e2e/admin-attributes-safety.spec.ts, in the file's own `test.describe`, after the file's last test, titled exactly as below. Reuse the file's own helpers: `Fixture`, `seedLeaf`, `attrKey`, `seedSelect`, `seedLink`, `holdAnswer`, `reap`. One helper change is allowed: `holdAnswer`'s `answers` parameter becomes `Record<string, unknown>` (an "Other" answer is an object); nothing else in the helpers changes.
- Every row is a scratch row (J3, G27): the leaf, the two questions, their links and the two listings come from the helpers and are removed by `reap` in the test's `finally`. At most two leased accounts (DEC-174): `holdAnswer` leases one per listing, and this test makes two listings.
- G38: no assertion loosened, no timeout raised, no retry added.

AT-82 "AT-82 a single-pick question made multi-pick: every ad's answer becomes a one-answer list in the same change; other questions and other changes are untouched (INC-632)" (e2e/admin-attributes-safety.spec.ts; no page is opened — `bandOnly(page, "any")` as the file's other service-only tests do, or no page at all)
- A scratch leaf; two single-pick questions K and K2 (`seedSelect`, options a1 and a2), both linked to the leaf.
- Listing L1 holds { [K]: "a1", [K2]: "a1" }; listing L2 holds { [K]: { "value": "other", "text": "own words" } } (`holdAnswer`).
- Through the service client: `update({ attr_type: "multi_select" })` on K's row (by its id). No error.
- Read both listings through the service client: L1's attributes equal { [K]: ["a1"], [K2]: "a1" }; L2's equal { [K]: [{ "value": "other", "text": "own words" }] }.
- Read `audit_log` through the service client for action "attribute.type_to_multi" and entity_id K's id: exactly one row; its meta's `attr_key` is K and its `listings` is 2.
- Through the service client: `update({ name_en: <K> + " renamed" })` on K's row: no new audit row for K, and L1 and L2 are unchanged (the trigger fires only on a type change to multi-pick).
- Through the service client: `update({ attr_type: "single_select" })` on K2's row (it is already single-pick, so nothing changes type): no audit row for K2; L1's K2 answer is still "a1".
- `finally`: `reap`.

After writing it: `node_modules/.bin/prettier --write e2e/admin-attributes-safety.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 565b19bc with this turn's carrier files)
- The migration on a local PostgreSQL 16 over stand-in tables: applied cleanly, its proofs passed, with LF and with CRLF line endings. Behaviour: a pick, an "Other" with words and an empty answer rewritten; another key, an ad without the key and a deleted ad untouched; a list already held not wrapped again; a name change and a change back to single-pick did not fire; one audit row with the count. A copy that granted the function to signed-in users was refused by P1.
- `scripts/check-migrations.sh` with this migration as 20261016000000_b16e1-check.sql: "Migration guard OK".
- Format clean on the carrier's files. No src change, so the unit tests, the usage maps and the build are as turn R3 left them.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-e1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below), files and database. If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn R3, name the difference and go on;
  4. the carrier, then the hashes;
  5. THE TEST;
  6. the checks;
  7. the migration LAST, then its read-back;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. Nothing changes for any visitor: the trigger fires only when a question's type changes.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 3 paths of the hash table, the brief, e2e/admin-attributes-safety.spec.ts and the one new migration file (the database tool names it). The database: ethio-prod through your tools — SELECT only, except the migration itself. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-e1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 3 files → each equal to:
  ac2623c840bc9fc73f4ec04b026fe6a0d305d2cff6883dad59bd24c45f83d95f  docs/_changelog.md
  593d98d62953105a1bd0086950b315abc266bad09846509ff5c0291140deff7e  docs/features/attributes.md
  48670433a76acd006233ede0a0e2e8ff42442fd6f25b215e6044f575018d8ef3  roadmap.md
- (c) `sha256sum e2e/admin-attributes-safety.spec.ts` → 8591658022a5f9b40f2f87e569f5caf0c5e938dff6f65366bc67c7c7c62f4168; `ls supabase/migrations | tail -1` → 20261015081040_5d969342-dc7d-4eb6-8bc6-4ba2a48747e9.sql (turn R2's; no migration since).
- (d) ethio-prod, your query tool (SELECT only):
  - `select max(version) from public.migration_marks;` → 20261015230000;
  - `select to_regprocedure('public.attributes_type_lists()') is null, (select count(*) from pg_trigger where tgname = 'attributes_type_lists'), (select count(*) from information_schema.columns where table_schema = 'public' and table_name = 'audit_log' and column_name in ('actor_id', 'action', 'entity_type', 'entity_id', 'meta'));` → t | 0 | 5.

THE CARRIER — B16E1-TURN-CARRIER-2026-10-15.md (2,505 bytes; sha256 32d60ec8f41285beb6f1949aaca1bb5c51272975945acf0654f4b1863c1b669d; 4 sections)
- Its first line starts "B16E1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 3 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  1186cb8e1fb5a734283344c9d7b9643cf5af21b3b0227e7631f65e6621e1c83b  docs/_changelog.md
  01c57d4cb1142e86b5d4b81a4e6b77ebb86ad574f1b6838c0d1000f0280f8e84  docs/features/attributes.md
  e03ba148902a9f82077aba33a71ce3fc773c0d66b921c280c2c952c30ac8b778  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line:
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your test is fixed, not left;
- `grep -n 'test("AT-82' e2e/*.spec.ts` → one line, in e2e/admin-attributes-safety.spec.ts;
- Not run by you: the typecheck, the build and the browser tests. CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 13211b212b5ca486682d89148812fe98622b1d6501eafb6ca6ab0d146171a31f (4,637 bytes, 83 lines, ending with a newline).
- Check it in a scratch folder first (after the checks):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261016000000_b16e1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - if the result is below 20261016000000, use 20261016000000 (above 20261015230000, turn R2's mark, and equal to the scratch check's stamp);
  - the mark must also be later than the saved file's own stamp.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.prosecdef, p.proconfig, has_function_privilege('anon', p.oid, 'EXECUTE'), has_function_privilege('authenticated', p.oid, 'EXECUTE') from pg_proc p where p.oid = 'public.attributes_type_lists()'::regprocedure;` → f | {search_path=public} | f | f;
- `select pg_get_triggerdef(t.oid) from pg_trigger t where t.tgname = 'attributes_type_lists';` → CREATE TRIGGER attributes_type_lists AFTER UPDATE OF attr_type ON public.attributes FOR EACH ROW WHEN (((old.attr_type = 'single_select'::text) AND (new.attr_type = 'multi_select'::text))) EXECUTE FUNCTION attributes_type_lists()

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 3 sha256sum lines and the brief's; the sha256sum and line count of e2e/admin-attributes-safety.spec.ts, and `git diff <START> -- e2e/admin-attributes-safety.spec.ts`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 3 paths, the brief, the test file and the one migration file.
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each NEW warning, and the total count.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging: open the new migration file on GitHub (Raw), paste it into the ethio-staging SQL editor and run it; read back its mark with the line the report gives. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 16 turn E1 (2026-10-15). Tier A. INC-632 — a single-pick question made multi-pick keeps every ad's answer.
-- e2e-areas: admin-attributes
--
-- A. attributes_type_lists() (NEW trigger function; SECURITY INVOKER, search_path public; revoked from every client role)
--    and its trigger attributes_type_lists (AFTER UPDATE OF attr_type ON public.attributes, FOR EACH ROW, only when the
--    type goes from single_select to multi_select). A multi-pick answer is a list (validate_listing_attributes, the
--    select branch), so an ad that answered the question with one pick would be refused at its next save and the
--    posting form would show nothing ticked. In the same statement as the type change, every ad (any status, not
--    deleted) that holds the question's key with one answer gets it as a one-answer list: a pick "a" becomes ["a"], an
--    "Other" with its words {"value":"other","text":…} becomes [{"value":"other","text":…}], an empty answer "" becomes [].
--    A list already held, or no answer, is left as it is. One audit row ('attribute.type_to_multi') names the question
--    and how many ads changed. Whatever makes the change — the catalogue import, the attribute editor, a migration — the
--    trigger runs. Other type changes are untouched (bundle 7: the editor names the holders an option removal affects
--    and does not block the save).
-- P. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): the function's header and privileges; the
--    trigger's event, timing, level, column and condition. No proof writes a row. The behaviour is proven by AT-82
--    (e2e/admin-attributes-safety.spec.ts) on scratch rows.

-- ===== A — attributes_type_lists =====
CREATE OR REPLACE FUNCTION public.attributes_type_lists()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  v_key   text := NEW.attr_key;
  v_count integer;
BEGIN
  UPDATE public.listings l
     SET attributes = jsonb_set(
           l.attributes, ARRAY[v_key],
           CASE WHEN jsonb_typeof(l.attributes -> v_key) = 'string' AND btrim(l.attributes ->> v_key) = ''
                THEN '[]'::jsonb
                ELSE jsonb_build_array(l.attributes -> v_key) END)
   WHERE l.deleted_at IS NULL
     AND l.attributes ? v_key
     AND jsonb_typeof(l.attributes -> v_key) IN ('string', 'object');
  GET DIAGNOSTICS v_count = ROW_COUNT;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (auth.uid(), 'attribute.type_to_multi', 'attribute', NEW.id::text,
          jsonb_build_object('attr_key', v_key, 'listings', v_count));
  RETURN NULL;
END $function$;
REVOKE ALL ON FUNCTION public.attributes_type_lists() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS attributes_type_lists ON public.attributes;
CREATE TRIGGER attributes_type_lists
  AFTER UPDATE OF attr_type ON public.attributes
  FOR EACH ROW
  WHEN (OLD.attr_type = 'single_select' AND NEW.attr_type = 'multi_select')
  EXECUTE FUNCTION public.attributes_type_lists();

-- ===== P — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_n   integer;
  v_def text;
BEGIN
  -- P1. The function: SECURITY INVOKER, search_path public, no client role may call it.
  SELECT count(*) INTO v_n FROM pg_proc
   WHERE oid = 'public.attributes_type_lists()'::regprocedure
     AND NOT prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_n <> 1 THEN RAISE EXCEPTION 'B16E1 P1: attributes_type_lists is not SECURITY INVOKER with search_path public'; END IF;
  IF has_function_privilege('anon', 'public.attributes_type_lists()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.attributes_type_lists()', 'EXECUTE') THEN
    RAISE EXCEPTION 'B16E1 P1: a client role may call attributes_type_lists';
  END IF;

  -- P2. The trigger: AFTER UPDATE OF attr_type, row by row, only from single_select to multi_select.
  SELECT pg_get_triggerdef(t.oid) INTO v_def
    FROM pg_trigger t
   WHERE t.tgrelid = 'public.attributes'::regclass AND t.tgname = 'attributes_type_lists' AND NOT t.tgisinternal;
  IF v_def IS NULL
     OR position('AFTER UPDATE OF attr_type ON public.attributes FOR EACH ROW' IN v_def) = 0
     OR position('''single_select''' IN v_def) = 0
     OR position('''multi_select''' IN v_def) = 0
     OR position('EXECUTE FUNCTION attributes_type_lists()' IN v_def) = 0 THEN
    RAISE EXCEPTION 'B16E1 P2: the trigger is not as declared: %', coalesce(v_def, 'missing');
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
