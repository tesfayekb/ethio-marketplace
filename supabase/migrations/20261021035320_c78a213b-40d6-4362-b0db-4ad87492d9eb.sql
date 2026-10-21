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
