# Bundle 22 — turn 17b v2 (after the close): the acceptance guard on the tables — no one changes what others see before accepting, and taking down is never held (D227, DEC-216, INC-807): brief (saved unchanged, 2026-10-21)

```text
BUNDLE 22 — TURN 17b v2 (2026-10-21; after the close). THIS BRIEF REPLACES bundle-22-turn-17b.md, stopped before STEP 0 on your rule "When you introduce or change a structural decision (a new module or the initial structure counts), record or replace its rule in `AGENTS.md` before finishing; replace the old rule, never add a second.": save nothing from it. Its one change: E4 replaces the acceptance rule in AGENTS.md, as you asked. Tier A. ONE MIGRATION BY THE TOOL (M13), FIRST — before any other change; then the STOP for the operator's staging apply; then the rest after his "continue". No string. No package change. AGENTS.md: the acceptance rule replaced (E4), and four lines shortened with their meaning kept so the part after the Lovable block stays within its 5,120 bytes. Base: dev 663ced85 (bundle 22 turn 17 v4). Parts, IN THIS ORDER: A — CI first; STEP 0; B — M13 by the tool, its read-backs, THE STOP REPORT and STOP; (after "continue") C — the write-door guard learns the table guard; D — the tests; E — the docs, the roadmap, the changelog; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT. Write the reports in English.

WHY
- Turn 17's census (B1, ethio-prod): 116 functions a signed-in person can call that write; 4 check the owed acceptance; 12 seller doors change what other people see without it (INC-807): edit_listing, mark_sold, move_listing_photo, relist_listing, remove_listing_photo, save_posting_identity, set_cover_photo, set_listing_photos_soon, set_listing_pin, set_listing_price, set_listing_reserved, transition_listing.
- DEC-216 (THE OPERATOR, 2026-10-20 23:3x New York, by the question card): one guard on the tables — ads, ad photos and seller names — not a check in each door, so it covers these twelve and every door added later; and a person who owes the new terms can ALWAYS take their own ads down ("removing content is never blocked").
- The guard (M13, below): a trigger function run before each row write on public.listings, public.listing_photos and the seller-identity columns of public.profiles. It holds only the person's own rows, only while an acceptance is owed, and only when the write would change what others see; it lets through drafts, every step down (to closed, removed, sold, expired or draft), a photo's removal (the cover moves, the row is stamped), staff acting on another person's rows, the service role and scheduled jobs. It raises 'acceptanceRequired', the word the doors and the screens already use. The supervisor ran M13 on a scratch PostgreSQL 16 with stub tables before writing this brief: it applies, its proofs pass, and each held and allowed write behaves as above.
- legal_acceptance_pending gains a seam for one person (a scratch kind e2e-acc-u<the user id without dashes>), so a test can make one person owe without publishing a real kind; none exists on production.
- What stays: the doors that check today (publish, edit_my_listing, renew, the photo route, the contact reveal) keep their own checks; Admin › Legal's per-version counts are turn 17c.

STEP 0 — save this file (the attached bundle-22-turn-17b-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-17b-v2.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Part B (M13, FIRST); THE STOP REPORT; STOP. After the operator's "continue": Parts C to E; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT; END THE TURN. Do not stop anywhere else. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- The migration (G39): written ONCE, by your database tool, as the final literal text of the block below — never a stub, a comment-only apply or a draft; the tool applies it on ethio-prod the moment it is saved (the operator allows the "Modify Supabase database" dialog). You cannot write or copy files under supabase/migrations/ yourself: the tool writes that file. ethio-staging is the operator's (his SQL editor).
- Run no stateful git command. Edits with your file-editing tool, in whatever form it takes; no authored scripts that rewrite files. Spec files are edited by hand (G37); shared helpers keep their defaults.
- Tests (G27, G38): scratch rows only, removed in an afterEach that survives a timeout; no real kind (terms, privacy) is ever published; no assertion loosened.
- Production reads are SELECT only, counts and definitions only — no row of a person.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Expected: run 1077 on 663ced85 (turn 17 v4), SUCCESS — 14 of 14 sources, 0 flaky, the guard's two steps green, main promoted. Paste the lines of guards-last-failure.md that name a failed job and of e2e-last-failure.md that name a failed or retried test (both at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/). Any gating failure: read its body and fix it at its root cause first (G21, G38), named with its fix.
A2. Paste the first 24 lines of https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/local-backend-proof.md.

PART B — M13, BY THE TOOL, FIRST.
B0. Before M13, from ethio-prod's read tool (SELECT only), paste: (1) `select pg_get_functiondef('public.legal_acceptance_pending(uuid,uuid)'::regprocedure);` — it must equal M13's section 1 except the one added array element (say so, or paste the difference and STOP); (2) every non-internal trigger on public.listings, public.listing_photos and public.profiles with its name, timing and events (`select c.relname, t.tgname, t.tgtype, t.tgenabled from pg_trigger t join pg_class c on c.oid = t.tgrelid where not t.tgisinternal and c.relname in ('listings','listing_photos','profiles') order by 1, 2;`) — no BEFORE row trigger may sort before "acceptance_guard" by name (M13's proof checks it again); (3) the newest mark: `select max(version) from public.migration_marks;` (expected 20261020200000).
B1. The mark 20261021180000 must be later than the stamp the tool gives the file: if the UTC time is past 2026-10-21 16:00 when you reach B1, STOP and ask for a new mark. Run `bash scripts/check-migrations.sh` after the file exists and paste its last lines ("Self-marking guard OK" and "Migration guard OK.").
B2. THE TEXT CHECK: write M13's block below — from its first line (the comment naming its e2e areas, the first line after "M13 — the text the tool writes, exactly:") through its last line (the INSERT of the mark, the line before the empty line that precedes PART C) — from the saved docs/governance/briefs/bundle-22-turn-17b-v2.md to a scratch file outside the repository with a script (never by hand), and run `diff -w <scratch file> <the saved migration file>`; paste the result (expected: no difference).
B3. Read back on ethio-prod: `select version from public.migration_marks where version = '20261021180000';` (one row); `select c.relname, t.tgname from pg_trigger t join pg_class c on c.oid = t.tgrelid where t.tgname = 'acceptance_guard' order by 1;` (three rows: listing_photos, listings, profiles); `select p.prosecdef, p.provolatile, p.proconfig from pg_proc p where p.oid = 'public.legal_acceptance_guard()'::regprocedure;` (t, v, {search_path=public}); `select position('e2e-acc-u' in pg_get_functiondef('public.legal_acceptance_pending(uuid,uuid)'::regprocedure)) > 0;` (t).
THE STOP REPORT (then STOP): <START>; A1's and A2's lines; the sha256sum; B0's three outputs; the migration file's path; B1's lines; B2's diff; B3's four read-backs; and the operator's line: "apply <the uuid fragment of the migration file's name> → expect mark 20261021180000".

M13 — the text the tool writes, exactly:
-- e2e-areas: legal
-- Bundle 22 turn 17b — M13 (mark 20261021180000): the acceptance guard on the tables (DEC-216; D227; INC-807).
-- The operator's decision (2026-10-20 23:3x New York): one guard on the tables, not a check in each door, and taking
-- an ad down is never held. A signed-in person who owes a Terms or Privacy acceptance cannot change what other
-- people see through ANY door, now or later:
--  1. legal_acceptance_pending(user, listing) — redeclared whole from M4a (20261019115742 :135-:166); one change: its
--     E2E seam gains a scratch kind for one person, e2e-acc-u<the user id without dashes> (none exists on production),
--     beside e2e-acc-<the listing id without dashes>.
--  2. legal_acceptance_guard() — one trigger function, run BEFORE each row write as the table owner:
--     listings (INSERT, UPDATE): the seller's own row is held while an acceptance is owed, unless it is a draft that
--       stays a draft, a step down (to closed, removed, sold, expired or draft), or a change of the cover and the
--       stamp alone (a photo's removal moves the cover);
--     listing_photos (INSERT, UPDATE): the seller's own photos of an ad that is not a draft are held; a removal
--       (DELETE) is never held;
--     profiles (UPDATE OF seller_alias, seller_type, business_name, contact_prefs): the person's public seller
--       identity is held when one of those changes.
--     A write by anyone else (staff, the service role, scheduled jobs: no caller or another caller) passes.
--  3. The triggers, named acceptance_guard so they run before every other BEFORE trigger of the three tables.
-- Proofs: the triggers and the function's header; the person seam answers for its person only (scratch rows,
-- removed). Behaviour through the doors is proven by LG-28…LG-31.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020200000') THEN
    RAISE EXCEPTION 'bundle 22 turn 12 M12 (mark 20261020200000) must be applied first';
  END IF;
END $$;

-- ===== 1 — an acceptance still owed (redeclared whole; the person seam added) =====
CREATE OR REPLACE FUNCTION public.legal_acceptance_pending(p_uid uuid, p_listing_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
      FROM (
        SELECT DISTINCT ON (d.id) d.id AS document_id
          FROM public.legal_documents d
          JOIN public.legal_versions v ON v.document_id = d.id
         WHERE d.kind = ANY (ARRAY['terms', 'privacy',
                                  'e2e-acc-' || replace(p_listing_id::text, '-', ''),
                                  'e2e-acc-u' || replace(p_uid::text, '-', '')])
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.country_code IS NULL
                OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_uid))
         ORDER BY d.id, v.version DESC
      ) x
     WHERE NOT EXISTS (
       SELECT 1
         FROM public.legal_acceptances a
         JOIN public.legal_versions va ON va.id = a.version_id
        WHERE a.user_id = p_uid
          AND va.document_id = x.document_id
          AND va.version >= (
                SELECT max(v3.version) FROM public.legal_versions v3
                 WHERE v3.document_id = x.document_id
                   AND v3.status = 'published'
                   AND v3.effective_at <= now()
                   AND (v3.material OR v3.version = 1))));
$$;
REVOKE ALL ON FUNCTION public.legal_acceptance_pending(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_acceptance_pending(uuid, uuid) TO service_role;

-- ===== 2 — the guard =====
CREATE FUNCTION public.legal_acceptance_guard()
RETURNS trigger
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_seller  uuid;
  v_status  text;
  v_changed text[];
BEGIN
  -- Staff acting on another person's rows, the service role and scheduled jobs pass.
  IF v_uid IS NULL THEN RETURN NEW; END IF;

  IF TG_TABLE_NAME = 'listings' THEN
    IF NEW.seller_id IS DISTINCT FROM v_uid THEN RETURN NEW; END IF;
    IF TG_OP = 'INSERT' THEN
      IF NEW.status = 'draft' THEN RETURN NEW; END IF;
    ELSE
      -- A draft is the seller's own while it stays a draft.
      IF OLD.status = 'draft' AND NEW.status = 'draft' THEN RETURN NEW; END IF;
      -- Taking an ad down is never held (DEC-216).
      IF NEW.status IN ('closed', 'removed', 'sold', 'expired', 'draft')
         AND NEW.status IS DISTINCT FROM OLD.status THEN
        RETURN NEW;
      END IF;
      -- A photo's removal moves the cover and stamps the row; nothing new is shown.
      SELECT array_agg(n.key) INTO v_changed
        FROM jsonb_each(to_jsonb(NEW)) n
        JOIN jsonb_each(to_jsonb(OLD)) o ON o.key = n.key
       WHERE n.value IS DISTINCT FROM o.value;
      IF v_changed IS NULL OR v_changed <@ ARRAY['cover_photo_id', 'updated_at'] THEN RETURN NEW; END IF;
    END IF;
    IF public.legal_acceptance_pending(v_uid, NEW.id) THEN RAISE EXCEPTION 'acceptanceRequired'; END IF;
    RETURN NEW;

  ELSIF TG_TABLE_NAME = 'listing_photos' THEN
    SELECT l.seller_id, l.status INTO v_seller, v_status FROM public.listings l WHERE l.id = NEW.listing_id;
    IF v_seller IS DISTINCT FROM v_uid OR v_status = 'draft' THEN RETURN NEW; END IF;
    IF public.legal_acceptance_pending(v_uid, NEW.listing_id) THEN RAISE EXCEPTION 'acceptanceRequired'; END IF;
    RETURN NEW;

  ELSIF TG_TABLE_NAME = 'profiles' THEN
    IF NEW.user_id IS DISTINCT FROM v_uid THEN RETURN NEW; END IF;
    IF NEW.seller_alias IS NOT DISTINCT FROM OLD.seller_alias
       AND NEW.seller_type IS NOT DISTINCT FROM OLD.seller_type
       AND NEW.business_name IS NOT DISTINCT FROM OLD.business_name
       AND NEW.contact_prefs IS NOT DISTINCT FROM OLD.contact_prefs THEN
      RETURN NEW;
    END IF;
    IF public.legal_acceptance_pending(v_uid, NULL) THEN RAISE EXCEPTION 'acceptanceRequired'; END IF;
    RETURN NEW;
  END IF;

  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.legal_acceptance_guard() FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_acceptance_guard() TO service_role;

-- ===== 3 — the triggers =====
CREATE TRIGGER acceptance_guard
  BEFORE INSERT OR UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.legal_acceptance_guard();
CREATE TRIGGER acceptance_guard
  BEFORE INSERT OR UPDATE ON public.listing_photos
  FOR EACH ROW EXECUTE FUNCTION public.legal_acceptance_guard();
CREATE TRIGGER acceptance_guard
  BEFORE UPDATE OF seller_alias, seller_type, business_name, contact_prefs ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.legal_acceptance_guard();

-- ===== 4 — proofs (a failure raises; a clean apply is the pass) =====
DO $$
DECLARE
  v_person  uuid := gen_random_uuid();
  v_other   uuid := gen_random_uuid();
  v_doc     uuid;
  v_version uuid;
  v_first   text;
BEGIN
  -- The three triggers exist, run before each row, and are enabled.
  IF (SELECT count(*) FROM pg_trigger t
       WHERE t.tgname = 'acceptance_guard' AND NOT t.tgisinternal AND t.tgenabled = 'O'
         AND t.tgfoid = 'public.legal_acceptance_guard()'::regprocedure
         AND t.tgrelid IN ('public.listings'::regclass, 'public.listing_photos'::regclass,
                           'public.profiles'::regclass)) <> 3 THEN
    RAISE EXCEPTION 'proof: the three acceptance_guard triggers are not all there';
  END IF;
  -- On each table, acceptance_guard is the first BEFORE row trigger by name.
  SELECT string_agg(c.relname || ':' || first_name, ', ') INTO v_first
    FROM (SELECT t.tgrelid, min(t.tgname) AS first_name
            FROM pg_trigger t
           WHERE NOT t.tgisinternal
             AND t.tgrelid IN ('public.listings'::regclass, 'public.listing_photos'::regclass,
                               'public.profiles'::regclass)
             AND (t.tgtype & 2) = 2 AND (t.tgtype & 1) = 1
           GROUP BY t.tgrelid) f
    JOIN pg_class c ON c.oid = f.tgrelid
   WHERE f.first_name <> 'acceptance_guard';
  IF v_first IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a BEFORE row trigger runs before acceptance_guard: %', v_first;
  END IF;
  -- The guard's header: definer, search_path pinned, closed to the browser roles.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p
                  WHERE p.oid = 'public.legal_acceptance_guard()'::regprocedure
                    AND p.prosecdef AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: legal_acceptance_guard is not SECURITY DEFINER with search_path public';
  END IF;
  IF has_function_privilege('anon', 'public.legal_acceptance_guard()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_acceptance_guard()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: legal_acceptance_guard is executable by a browser role';
  END IF;
  -- The person seam: a scratch document of kind e2e-acc-u<id> applies to that person only.
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-acc-u' || replace(v_person::text, '-', ''), NULL)
  RETURNING id INTO v_doc;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_doc, 1, 'published', 'v1', 'M13 proof', 'M13 proof', 'M13 proof', false,
          now() - interval '1 minute', now() - interval '1 minute', '{"seed": "M13 proof"}'::jsonb)
  RETURNING id INTO v_version;
  IF NOT public.legal_acceptance_pending(v_person, NULL) THEN
    RAISE EXCEPTION 'proof: the person seam does not apply to its person';
  END IF;
  IF public.legal_acceptance_pending(v_other, NULL) THEN
    RAISE EXCEPTION 'proof: the person seam applies to another person';
  END IF;
  DELETE FROM public.legal_versions WHERE id = v_version;
  DELETE FROM public.legal_documents WHERE id = v_doc;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261021180000') ON CONFLICT DO NOTHING;

PART C — THE WRITE-DOOR GUARD LEARNS THE TABLE GUARD (DEC-215 with DEC-216).
C1. scripts/acceptance-doors-allowlist.txt: two classes join the seven, described in its header in these words — "`guarded` — every write the door makes to public.listings, public.listing_photos or the seller columns of public.profiles passes the acceptance_guard trigger (DEC-216), which holds it while an acceptance is owed; the reason names DEC-216 and the test that proves it." and "`takedown` — the door takes content down (an ad closed, removed or sold, or a photo removed), which DEC-216 never holds; the reason names DEC-216 and the test that proves it." The twelve `owed` lines become: `guarded` for edit_listing, move_listing_photo, relist_listing, set_cover_photo, set_listing_photos_soon, set_listing_pin, set_listing_price, set_listing_reserved, transition_listing (its steps down pass; the others are held) — each naming LG-28 — and save_posting_identity naming LG-31; `takedown` for mark_sold and remove_listing_photo, each naming LG-29. No `owed` line remains. Each reason in one line, from the function's definition as read in turn 17.
C2. scripts/check-acceptance-doors.ts: the class list gains `guarded` and `takedown`; a `guarded` or `takedown` line must name DEC-216 and a test id (`LG-` and digits), or it fails naming the function. scripts/fixtures/acceptance-doors-bad.tsv gains one `guarded` allowance with no test id for a fixture function that is in its catalogue as VOLATILE and not checking (`e2e_acceptance_guarded()`), and the self-test requires three refusals, each by name.
C3. .github/workflows/local-backend-proof.yml, the smoke lane's step "Acceptance-doors guard (DEC-215)": after the catalogue check, one more check in the database container — `select count(*) from pg_trigger where tgname = 'acceptance_guard' and not tgisinternal and tgenabled = 'O' and tgrelid in ('public.listings'::regclass, 'public.listing_photos'::regclass, 'public.profiles'::regclass)` must print 3, or the step fails with "::error::the acceptance_guard triggers are not all there (DEC-216)". Rename the step "Acceptance-doors guard (DEC-215, DEC-216)".

PART D — THE TESTS (e2e/legal-certify.spec.ts, after LG-27; the file's own helpers; each scratch acceptance a `seedDocument` of kind `e2e-acc-<the listing id without dashes>` unless said otherwise).
D1. "LG-28 while an acceptance is owed, the table guard refuses the seller's own changes to a live ad and nothing is written" — an active ad with two photos (uploaded while it was a draft, then published and made active with the file's `makeState`), the seller through `asPerson`, the acceptance owed. Each of these calls answers an error containing "acceptanceRequired", and the ad's row and its photo rows (read through the service client before and after) are unchanged: set_listing_price, set_listing_pin, set_listing_reserved, set_listing_photos_soon, set_cover_photo (the second photo), move_listing_photo, edit_listing (its arguments as e2e/my-listings-doors.spec.ts :361-:375 builds them); then, on a second ad of the same seller that is sold (marked through the service client) and owes too, relist_listing — refused, still sold; and a third, closed by the seller's own transition_listing to "closed" BEFORE its acceptance is seeded (so the door keeps the status to reopen to) and then owing, transition_listing to "active" — refused, still closed. (Each door's own refusals — an illegal step, a missing field — come before the guard; every call here is one the door accepts when nothing is owed.) After `accept_legal` for the first ad's version, set_listing_price on it succeeds and the price reads back.
D2. "LG-29 taking an ad down is never held: while an acceptance is owed the seller marks one ad sold, closes one, removes one, and removes a photo" — four active ads of the seller (each with its own owed scratch acceptance; the photo one with two photos, the removed one its cover): mark_sold → status sold; transition_listing to "closed" → closed; transition_listing to "removed" → removed; remove_listing_photo → the photo row is gone and the cover is the other photo. Every call succeeds while the acceptance is still owed (read back through the service client).
D3. "LG-30 a draft stays the seller's own while an acceptance is owed: its price, pin and photo order change" — a draft with two photos and an owed scratch acceptance: set_listing_price, set_listing_pin and set_cover_photo succeed and read back.
D4. "LG-31 the seller's public name waits for the acceptance" — the seller's own scratch acceptance of kind `e2e-acc-u<the seller's user id without dashes>` (M13's person seam; one document, v1 in force, removed in the afterEach like the others): save_posting_identity with a new free name (the file's or the helpers' way of making one) answers an error containing "acceptanceRequired" and profiles.seller_alias is unchanged; save_posting_identity with the seller's current name and type passes; after `accept_legal` for that version, the new name lands and reads back.
D5. Census (G29): the twelve doors of WHY against these tests — paste a table door → test id (expected: each door in LG-28, LG-29 or LG-31).

PART E — THE DOCS, THE ROADMAP, THE CHANGELOG.
E1. docs/features/legal.md, a new section at its end, "## Turn 17b — the acceptance guard on the tables (DEC-216)": the operator's decision word for word; what the guard holds and lets through (WHY's list); the person seam; the two new classes and the allowlist's counts after C1 (owed 0); LG-28…LG-31.
E2. roadmap.md: line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-17b-v2.md (bundle 22 — turn 17b, after the close: the acceptance guard on the tables — no one changes what others see before accepting, and taking down is never held; D227, DEC-216, INC-807). Next: turn 17c (Admin › Legal's per-version counts);" and keeps the rest of the current line from " the Publish and the one walk of bundle 22;" on. The line that begins "  - [ ] Turn 17b (owed; one migration, Tier A)" is replaced whole by two lines:
  - [ ] Turn 17b (docs/governance/briefs/bundle-22-turn-17b-v2.md; one migration M13, mark 20261021180000; no string) — the acceptance guard on the tables (DEC-216): the seller's own changes to what others see are held while an acceptance is owed, taking down never is; the twelve owed doors classed `guarded` or `takedown` (INC-807 closed); LG-28…LG-31
  - [ ] Turn 17c (owed; one migration, Tier A; strings) — Admin › Legal shows per version how many accounts accepted it and how many signed in after it took effect without accepting (a staff door reading auth.users.last_sign_in_at, as the users door does)
E3. docs/_changelog.md APPEND one line: "- 2026-10-21 — Bundle 22 turn 17b, after the close (one migration, M13; no string): one guard on the ads, ad photos and seller names holds a person's own changes to what others see while a Terms or Privacy acceptance is owed — taking an ad or a photo down never is (DEC-216); the twelve doors that lacked a check are covered, with tests LG-28…LG-31 (INC-807)."

E4. AGENTS.md — five lines, each replaced whole (old text in full, then the new); the part after the Lovable block becomes 5,086 of 5,120 bytes; expected sha256 of the whole file after E4: 735e44a3cb83e65e43fb1cb800dcdc524dbae48e0bd6fd2781fd03f15737ba97 (paste yours; if it differs, paste `git diff AGENTS.md`). The first replaces turn 17's acceptance sentence with the rule for DEC-216 (the old rule replaced, not a second added); the other four are shortened only to make room.
  OLD: - A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8). A signed-in write door checks the owed acceptance or has its line in scripts/acceptance-doors-allowlist.txt (D227).
  NEW: - A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8). Owner writes to ads, photos and seller names pass the acceptance_guard trigger (DEC-216; takedowns pass); other signed-in write doors check acceptance or are in scripts/acceptance-doors-allowlist.txt (D227).
  OLD: - Lists read from the data API go through `readAllPages` (src/lib/read-all-pages.ts): ordered by a unique key, each page asked for after the last key it has; positional paging loses or repeats rows (INC-452).
  NEW: - Data-API lists go through `readAllPages` (src/lib/read-all-pages.ts): keyset paging on a unique key; positional paging loses or repeats rows (INC-452).
  OLD: - Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test`; targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`, https). CI gates on that backend: local-backend-proof.yml, called by ci.yml; never supabase/config.toml (D228). Why: plain launches use production `.env` (INC-464).
  NEW: - Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (it would use production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`, https), which CI gates on via local-backend-proof.yml; never supabase/config.toml (D228).
  OLD: - Button and action labels: two or three words, no article, no bracketed remark, every language; an explanation goes once in help text, never in a button (D81). A label the check flags (scripts/list-action-labels.test.ts) takes the brief's shorter text; the allowlist takes a key only with its reason.
  NEW: - Button and action labels: two or three words, no article, no bracketed remark, every language; an explanation goes once in help text, never in a button (D81). A label scripts/list-action-labels.test.ts flags takes the brief's shorter text; its allowlist takes a key only with a reason.
  OLD: - Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts) — no 1-px border, state borders on top (the look law); one ☰ per width, top-left: below 768 it opens rail-menu, from 768 it folds the menu; md tables use `tbl-md:`. Why: D135, D115, D204.
  NEW: - Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (below 768 it opens rail-menu, from 768 it folds the menu); md tables use `tbl-md:` (D135, D115, D204).
THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (expected 1285 passed); `SELF_TEST=1 bun scripts/check-acceptance-doors.ts` refusing all three fixture names; the guard on the live production list (turn 17's B1 query, run again after M13) → its OK line with owed 0; `actionlint -shellcheck= -pyflakes= .github/workflows/local-backend-proof.yml` clean; `bash scripts/check-migrations.sh` "Migration guard OK."; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; D5's table; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree".

THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it: sign in when it needs a session, run the flow with real input, and confirm the result reads back through the UI."). Where: ethio-staging, after the operator has applied M13 there (his "continue" says so), with your three staging credentials — never production. Through the UI a person who owes meets /legal/accept on every page (LAC-1), so the doors are reached only by direct calls, which LG-28…LG-31 make signed in, with real input, reading every result back. Run `bun run e2e:local -- e2e/legal-certify.spec.ts --retries=0` (the file whole, both projects — every test in it, LG-17…LG-31 included) and `bun run e2e:local -- e2e/legal-accept.spec.ts --grep "LAC-1 " --retries=0`. Paste each summary line and every failure body; a failure is read at its root cause and fixed in this turn (G21, G38). Also the guard on the live production list and its self-test (THE CHECKS). Nothing in this check is deferred; if a test cannot run, STOP and report why.

SCOPE — these files only: the brief; the migration file the tool writes (M13); src/integrations/supabase/types.ts if the tool regenerates it; scripts/acceptance-doors-allowlist.txt, scripts/check-acceptance-doors.ts, scripts/fixtures/acceptance-doors-bad.tsv (C1, C2); .github/workflows/local-backend-proof.yml (C3); e2e/legal-certify.spec.ts (D); docs/features/legal.md (E1); roadmap.md (E2); docs/_changelog.md (E3); AGENTS.md (E4); the files of an A1 fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No package change. No string.
THE CI WAIT REPORT: done or not done by part; C's diffs and the allowlist's counts per class; D's tests in full and D5's table; E4's AGENTS.md sha256; the checks; the end-to-end check's outputs; `git diff --stat <START>`; `git diff --name-only <START>` (count the files from this list); anything not foreseen; the line "The project's own check follows on GitHub: the CI run on <the commit this turn leaves> — the lanes replay M13 from scratch and run the guard and LG-28…LG-31; the next brief's Part A reads it." Then END THE TURN; send nothing after the report.
REVERT: a later migration that drops the three acceptance_guard triggers and the function legal_acceptance_guard() and restores legal_acceptance_pending from M4a's file (20261019115742) — never an edit of M13 — with git revert of this turn's other commits.
```
