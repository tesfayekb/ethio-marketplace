-- e2e-areas: legal
-- Bundle 22 turn 20 — M16 (mark 20261022090000): the legal review dates (DEC-219) and INC-812.
--  1. legal_settings gains review_months (default 6, 1 to 24): how often each legal document is reviewed. It is a
--     fact like the others: the facts card edits it and each published version freezes it.
--  2. legal_reviews: one row per "Reviewed — no change" (the document, who, the reviewer's home country — Knowledge E3 —,
--     when, a note of 1 to 2000 characters).
--     Final: no UPDATE, except the foreign key's own SET NULL when the reviewer's profile is deleted; removed with
--     its document (scratch cleanup); closed to the browser roles (deny policies, no grants).
--  3. legal_review_due(document): the later of the document's newest publish and newest review, plus review_months;
--     NULL while it has no published version. Internal: no browser grant.
--  4. admin_mark_legal_reviewed(document, note): legal:edit and the step-up; refuses a document with no published
--     version (nothingToReview) and an empty or long note (badValue:note); writes the review and audits
--     legal.reviewed.
--  5. legal_review_overdue(): true when a real document (terms, privacy, publishing — any country) or the caller's
--     own e2e-rev-u<id> scratch document is due; false for a caller without legal:view. The admin menu reads it.
--  6. admin_legal_documents(), re-declared whole from M14 (20261021053239 :61-:103); one change: each document
--     carries 'review' — the newest publish or review (at, kind, by_name, note) and due_at — or null.
--  7. admin_set_legal_settings, re-declared whole from M15 (20261021070531 :36-:184); one change: the key
--     review_months (1 to 24) — in the key list, the number list with its bound, and the assignments.
--  8. INC-812: legal_versions_finality, re-declared whole from M1 (20261019063500 :142-:166); one change: the
--     foreign key's SET NULL of published_by or created_by passes, so a person who published or drafted a legal
--     version can have the account deleted.
-- Proofs: each function's volatility, security and grants, the table's policies, review_months, both doors' new text,
-- and scratch rows (removed) for the due date, the review's finality, the version's finality and the cascade.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261021210000') THEN
    RAISE EXCEPTION 'bundle 22 turn 19 M15 (mark 20261021210000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the review period =====
ALTER TABLE public.legal_settings
  ADD COLUMN review_months integer NOT NULL DEFAULT 6
    CONSTRAINT legal_settings_review_months_check CHECK (review_months BETWEEN 1 AND 24);

-- ===== 2 — the reviews =====
CREATE TABLE public.legal_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.legal_documents(id) ON DELETE CASCADE,
  reviewed_by uuid NULL REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  home_country_code char(2) NULL REFERENCES public.countries(code),
  reviewed_at timestamptz NOT NULL DEFAULT now(),
  note text NOT NULL CONSTRAINT legal_reviews_note_check CHECK (length(btrim(note)) BETWEEN 1 AND 2000)
);
CREATE INDEX legal_reviews_document ON public.legal_reviews(document_id, reviewed_at DESC);
REVOKE ALL ON public.legal_reviews FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.legal_reviews TO service_role;
ALTER TABLE public.legal_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY legal_reviews_deny_select ON public.legal_reviews FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY legal_reviews_deny_insert ON public.legal_reviews FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY legal_reviews_deny_update ON public.legal_reviews FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY legal_reviews_deny_delete ON public.legal_reviews FOR DELETE TO anon, authenticated USING (false);

CREATE FUNCTION public.legal_reviews_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
BEGIN
  -- Deleting the reviewer's profile sets reviewed_by to NULL (the foreign key); that update, and only that one,
  -- passes (INC-812's rule).
  IF NEW.reviewed_by IS NULL AND OLD.reviewed_by IS NOT NULL
     AND (to_jsonb(NEW) - 'reviewed_by') = (to_jsonb(OLD) - 'reviewed_by') THEN
    RETURN NEW;
  END IF;
  RAISE EXCEPTION 'reviewIsFinal';
END;
$$;
REVOKE ALL ON FUNCTION public.legal_reviews_finality() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER legal_reviews_finality
BEFORE UPDATE ON public.legal_reviews
FOR EACH ROW EXECUTE FUNCTION public.legal_reviews_finality();

-- ===== 3 — the due date =====
CREATE FUNCTION public.legal_review_due(p_document_id uuid)
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT greatest(
           (SELECT max(v.published_at) FROM public.legal_versions v
             WHERE v.document_id = p_document_id AND v.status = 'published'),
           (SELECT max(r.reviewed_at) FROM public.legal_reviews r WHERE r.document_id = p_document_id))
         + make_interval(months => (SELECT s.review_months FROM public.legal_settings s WHERE s.id))
   WHERE EXISTS (SELECT 1 FROM public.legal_versions v
                  WHERE v.document_id = p_document_id AND v.status = 'published');
$$;
REVOKE ALL ON FUNCTION public.legal_review_due(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_review_due(uuid) TO service_role;

-- ===== 4 — "Reviewed — no change" =====
CREATE FUNCTION public.admin_mark_legal_reviewed(p_document_id uuid, p_note text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid  uuid := auth.uid();
  v_note text := btrim(coalesce(p_note, ''));
  v_row  public.legal_reviews%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_document_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.legal_versions v
                                           WHERE v.document_id = p_document_id AND v.status = 'published') THEN
    RAISE EXCEPTION 'nothingToReview';
  END IF;
  IF length(v_note) < 1 OR length(v_note) > 2000 THEN RAISE EXCEPTION 'badValue:note'; END IF;
  INSERT INTO public.legal_reviews (document_id, reviewed_by, home_country_code, note)
  VALUES (p_document_id, v_uid,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid), v_note)
  RETURNING * INTO v_row;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.reviewed', 'legal_document', p_document_id::text,
          jsonb_build_object('review_id', v_row.id, 'note', v_note));
  RETURN jsonb_build_object('reviewed_at', v_row.reviewed_at, 'due_at', public.legal_review_due(p_document_id));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_mark_legal_reviewed(uuid, text) TO service_role;

-- ===== 5 — the admin menu's mark =====
CREATE FUNCTION public.legal_review_overdue()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL OR NOT public.has_permission(v_uid, 'legal', 'view') THEN RETURN false; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.legal_documents d
     WHERE (d.kind IN ('terms', 'privacy', 'publishing')
            OR d.kind = 'e2e-rev-u' || replace(v_uid::text, '-', ''))
       AND public.legal_review_due(d.id) <= now());
END;
$$;
REVOKE ALL ON FUNCTION public.legal_review_overdue() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.legal_review_overdue() TO authenticated;
GRANT ALL ON FUNCTION public.legal_review_overdue() TO service_role;

-- ===== 6 — the documents list (re-declared whole; one change: 'review') =====
CREATE OR REPLACE FUNCTION public.admin_legal_documents()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'document_id', d.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'review', (SELECT jsonb_build_object('at', e.at, 'kind', e.kind, 'by_name', p.display_name,
                                                  'note', e.note, 'due_at', public.legal_review_due(d.id))
                          FROM (SELECT v.published_at AS at, 'publish'::text AS kind, v.published_by AS who,
                                       NULL::text AS note
                                  FROM public.legal_versions v
                                 WHERE v.document_id = d.id AND v.status = 'published'
                                UNION ALL
                                SELECT r.reviewed_at, 'review', r.reviewed_by, r.note
                                  FROM public.legal_reviews r
                                 WHERE r.document_id = d.id) e
                          LEFT JOIN public.profiles p ON p.user_id = e.who
                         ORDER BY e.at DESC, (e.kind = 'review') DESC
                         LIMIT 1),
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id,
                        'version', v.version,
                        'status', v.status,
                        'label', v.label,
                        'material', v.material,
                        'effective_at', v.effective_at,
                        'published_at', v.published_at,
                        'published_by_name', p.display_name,
                        'acceptances', (SELECT count(*) FROM public.legal_acceptances a
                                         WHERE a.version_id = v.id),
                        'signed_in_unaccepted', public.legal_signed_in_unaccepted(v.id),
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v
                 LEFT JOIN public.profiles p ON p.user_id = v.published_by
                WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY array_position(ARRAY['terms', 'privacy', 'publishing'], d.kind) NULLS LAST,
                    d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_documents() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_documents() TO service_role;

-- ===== 7 — the settings door (re-declared whole; one change: review_months) =====
CREATE OR REPLACE FUNCTION public.admin_set_legal_settings(p_settings jsonb)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_before jsonb;
  v_after  public.legal_settings%ROWTYPE;
  v_key    text;
  v_text   text;
  v_num    integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years',
                     'operator_details','legal_phone','security_email','listed_ad_keep_months',
                     'account_keep_months','technical_keep_months','sold_visible_days',
                     'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days',
                     'review_months') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days',
                 'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days',
                 'review_months') THEN
      v_text := p_settings ->> v_key;
      IF v_text IS NULL OR v_text !~ '^[0-9]{1,7}$' THEN RAISE EXCEPTION 'badValue:%', v_key; END IF;
      v_num := v_text::integer;
      IF (v_key = 'liability_limit_usd' AND v_num > 1000000)
         OR (v_key = 'notice_days' AND v_num > 365)
         OR (v_key = 'response_days' AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'response_extra_days' AND v_num > 90)
         OR (v_key = 'deleted_ad_keep_months' AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'dispute_keep_years' AND v_num > 20)
         OR (v_key IN ('listed_ad_keep_months','account_keep_months','technical_keep_months')
             AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'sold_visible_days' AND (v_num < 1 OR v_num > 365))
         OR (v_key = 'appeal_months' AND (v_num < 1 OR v_num > 24))
         OR (v_key = 'claims_limit_months' AND (v_num < 1 OR v_num > 60))
         OR (v_key IN ('talk_first_days','complaint_ack_days') AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'review_months' AND (v_num < 1 OR v_num > 24)) THEN
        RAISE EXCEPTION 'badValue:%', v_key;
      END IF;
    END IF;
  END LOOP;
  -- The new texts are checked before anything is written as well (M3).
  IF p_settings ? 'operator_details' AND length(coalesce(p_settings ->> 'operator_details', '')) > 2000 THEN
    RAISE EXCEPTION 'badValue:operator_details';
  END IF;
  IF p_settings ? 'legal_phone' AND coalesce(p_settings ->> 'legal_phone', '') <> ''
     AND (p_settings ->> 'legal_phone') !~ '^\+?[0-9][0-9 ()-]{4,37}[0-9]$' THEN
    RAISE EXCEPTION 'badValue:legal_phone';
  END IF;
  IF p_settings ? 'security_email'
     AND coalesce(p_settings ->> 'security_email', '') !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  IF p_settings ? 'security_email' AND length(p_settings ->> 'security_email') > 320 THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  SELECT to_jsonb(s) - 'id' - 'updated_by' INTO v_before FROM public.legal_settings s WHERE s.id FOR UPDATE;
  -- The proof of acceptance must outlive the window for claims (rev 108 item 2): a closed account's identity is
  -- kept at least as long as the claims limit, checked here so it is refused as badValue:<key>, never by the CHECK.
  IF (CASE WHEN p_settings ? 'account_keep_months' THEN (p_settings ->> 'account_keep_months')::integer
           ELSE (v_before ->> 'account_keep_months')::integer END)
     < (CASE WHEN p_settings ? 'claims_limit_months' THEN (p_settings ->> 'claims_limit_months')::integer
             ELSE (v_before ->> 'claims_limit_months')::integer END) THEN
    RAISE EXCEPTION 'badValue:account_keep_months';
  END IF;
  UPDATE public.legal_settings SET
    operator_name = CASE WHEN p_settings ? 'operator_name' THEN p_settings ->> 'operator_name' ELSE operator_name END,
    operator_address = CASE WHEN p_settings ? 'operator_address' THEN p_settings ->> 'operator_address' ELSE operator_address END,
    legal_email = CASE WHEN p_settings ? 'legal_email' THEN p_settings ->> 'legal_email' ELSE legal_email END,
    privacy_email = CASE WHEN p_settings ? 'privacy_email' THEN p_settings ->> 'privacy_email' ELSE privacy_email END,
    governing_law = CASE WHEN p_settings ? 'governing_law' THEN p_settings ->> 'governing_law' ELSE governing_law END,
    providers = CASE WHEN p_settings ? 'providers' THEN p_settings ->> 'providers' ELSE providers END,
    copyright_agent = CASE WHEN p_settings ? 'copyright_agent'
                           THEN NULLIF(p_settings ->> 'copyright_agent', '') ELSE copyright_agent END,
    liability_limit_usd = CASE WHEN p_settings ? 'liability_limit_usd'
                               THEN (p_settings ->> 'liability_limit_usd')::integer ELSE liability_limit_usd END,
    notice_days = CASE WHEN p_settings ? 'notice_days'
                       THEN (p_settings ->> 'notice_days')::integer ELSE notice_days END,
    response_days = CASE WHEN p_settings ? 'response_days'
                         THEN (p_settings ->> 'response_days')::integer ELSE response_days END,
    response_extra_days = CASE WHEN p_settings ? 'response_extra_days'
                               THEN (p_settings ->> 'response_extra_days')::integer ELSE response_extra_days END,
    deleted_ad_keep_months = CASE WHEN p_settings ? 'deleted_ad_keep_months'
                                  THEN (p_settings ->> 'deleted_ad_keep_months')::integer ELSE deleted_ad_keep_months END,
    dispute_keep_years = CASE WHEN p_settings ? 'dispute_keep_years'
                              THEN (p_settings ->> 'dispute_keep_years')::integer ELSE dispute_keep_years END,
    operator_details = CASE WHEN p_settings ? 'operator_details'
                            THEN NULLIF(btrim(coalesce(p_settings ->> 'operator_details', '')), '') ELSE operator_details END,
    legal_phone = CASE WHEN p_settings ? 'legal_phone'
                       THEN NULLIF(btrim(coalesce(p_settings ->> 'legal_phone', '')), '') ELSE legal_phone END,
    security_email = CASE WHEN p_settings ? 'security_email' THEN p_settings ->> 'security_email' ELSE security_email END,
    listed_ad_keep_months = CASE WHEN p_settings ? 'listed_ad_keep_months'
                                 THEN (p_settings ->> 'listed_ad_keep_months')::integer ELSE listed_ad_keep_months END,
    account_keep_months = CASE WHEN p_settings ? 'account_keep_months'
                               THEN (p_settings ->> 'account_keep_months')::integer ELSE account_keep_months END,
    technical_keep_months = CASE WHEN p_settings ? 'technical_keep_months'
                                 THEN (p_settings ->> 'technical_keep_months')::integer ELSE technical_keep_months END,
    sold_visible_days = CASE WHEN p_settings ? 'sold_visible_days'
                             THEN (p_settings ->> 'sold_visible_days')::integer ELSE sold_visible_days END,
    appeal_months = CASE WHEN p_settings ? 'appeal_months'
                         THEN (p_settings ->> 'appeal_months')::integer ELSE appeal_months END,
    claims_limit_months = CASE WHEN p_settings ? 'claims_limit_months'
                               THEN (p_settings ->> 'claims_limit_months')::integer ELSE claims_limit_months END,
    talk_first_days = CASE WHEN p_settings ? 'talk_first_days'
                           THEN (p_settings ->> 'talk_first_days')::integer ELSE talk_first_days END,
    complaint_ack_days = CASE WHEN p_settings ? 'complaint_ack_days'
                              THEN (p_settings ->> 'complaint_ack_days')::integer ELSE complaint_ack_days END,
    review_months = CASE WHEN p_settings ? 'review_months'
                         THEN (p_settings ->> 'review_months')::integer ELSE review_months END,
    updated_at = now(),
    updated_by = v_uid
   WHERE id
  RETURNING * INTO v_after;
  -- Per-field validation after assignment so the CHECK bounds and the text rules share one refusal shape.
  FOREACH v_text IN ARRAY ARRAY[v_after.legal_email, v_after.privacy_email] LOOP
    IF v_text IS NULL OR v_text !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'badValue:email'; END IF;
  END LOOP;
  IF v_after.operator_name IS NULL OR length(btrim(v_after.operator_name)) = 0
     OR length(v_after.operator_name) > 2000 THEN RAISE EXCEPTION 'badValue:operator_name'; END IF;
  IF v_after.operator_address IS NULL OR length(btrim(v_after.operator_address)) = 0
     OR length(v_after.operator_address) > 2000 THEN RAISE EXCEPTION 'badValue:operator_address'; END IF;
  IF v_after.governing_law IS NULL OR length(btrim(v_after.governing_law)) = 0
     OR length(v_after.governing_law) > 2000 THEN RAISE EXCEPTION 'badValue:governing_law'; END IF;
  IF v_after.providers IS NULL OR length(btrim(v_after.providers)) = 0
     OR length(v_after.providers) > 2000 THEN RAISE EXCEPTION 'badValue:providers'; END IF;
  IF v_after.copyright_agent IS NOT NULL AND length(v_after.copyright_agent) > 2000 THEN
    RAISE EXCEPTION 'badValue:copyright_agent';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.settings_set', 'legal_settings', 'settings',
          jsonb_build_object('before', v_before, 'after', to_jsonb(v_after) - 'id' - 'updated_by'));
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_legal_settings(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_legal_settings(jsonb) TO service_role;

-- ===== 8 — INC-812: the version finality (re-declared whole; one change: the foreign key's SET NULL) =====
CREATE OR REPLACE FUNCTION public.legal_versions_finality()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $$
DECLARE
  v_scratch boolean;
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status = 'published'
     -- INC-812: deleting a person's profile makes the foreign key set published_by or created_by to NULL;
     -- that update, and only that one, passes.
     AND NOT ((to_jsonb(NEW) - 'published_by' - 'created_by') = (to_jsonb(OLD) - 'published_by' - 'created_by')
              AND (NEW.published_by IS NULL OR NEW.published_by = OLD.published_by)
              AND (NEW.created_by IS NULL OR NEW.created_by = OLD.created_by)
              AND (NEW.published_by IS DISTINCT FROM OLD.published_by
                   OR NEW.created_by IS DISTINCT FROM OLD.created_by)) THEN
    RAISE EXCEPTION 'publishedIsFinal';
  END IF;
  IF TG_OP = 'DELETE' AND OLD.status = 'published' THEN
    SELECT d.kind ~ '^e2e-' INTO v_scratch FROM public.legal_documents d WHERE d.id = OLD.document_id;
    IF NOT (coalesce(v_scratch, false) AND auth.role() = 'service_role') THEN
      RAISE EXCEPTION 'publishedIsFinal';
    END IF;
  END IF;
  IF TG_OP = 'UPDATE' THEN
    NEW.updated_at := now();
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_versions_finality() FROM PUBLIC, anon, authenticated;

-- ===== 9 — proofs (a failure raises; a clean apply is the pass) =====
DO $$
DECLARE
  v_def_docs text := pg_get_functiondef('public.admin_legal_documents()'::regprocedure);
  v_def_set  text := pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure);
  v_months   integer;
  v_doc      uuid;
  v_version  uuid;
  v_review   uuid;
  v_pub      timestamptz := date_trunc('second', now()) - interval '2 months';
  v_at       timestamptz;
  v_refused  boolean;
BEGIN
  -- Headers.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_mark_legal_reviewed(uuid,text)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: admin_mark_legal_reviewed header';
  END IF;
  IF (SELECT count(*) FROM pg_proc p
       WHERE p.oid IN ('public.legal_review_overdue()'::regprocedure, 'public.admin_legal_documents()'::regprocedure)
         AND p.prosecdef AND p.provolatile = 's' AND p.proconfig @> ARRAY['search_path=public']) <> 2 THEN
    RAISE EXCEPTION 'proof: legal_review_overdue or admin_legal_documents header';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.legal_review_due(uuid)'::regprocedure
                    AND NOT p.prosecdef AND p.provolatile = 's' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: legal_review_due header';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_set_legal_settings(jsonb)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings header changed';
  END IF;
  -- Grants: two signed-in doors; the due date and both trigger functions closed to the browser roles.
  IF has_function_privilege('anon', 'public.admin_mark_legal_reviewed(uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_mark_legal_reviewed(uuid,text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.legal_review_overdue()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.legal_review_overdue()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.legal_review_due(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_review_due(uuid)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_reviews_finality()', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.legal_versions_finality()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_legal_documents()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: a function grant is wrong';
  END IF;
  -- The table: RLS on, four deny policies, no browser privilege.
  IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = 'public.legal_reviews'::regclass)
     OR (SELECT count(*) FROM pg_policy p WHERE p.polrelid = 'public.legal_reviews'::regclass) <> 4
     OR has_table_privilege('authenticated', 'public.legal_reviews', 'SELECT')
     OR has_table_privilege('anon', 'public.legal_reviews', 'SELECT') THEN
    RAISE EXCEPTION 'proof: legal_reviews is not closed';
  END IF;
  -- The column and both doors' new text.
  IF (SELECT pg_get_expr(d.adbin, d.adrelid) FROM pg_attrdef d
        JOIN pg_attribute a ON a.attrelid = d.adrelid AND a.attnum = d.adnum
       WHERE d.adrelid = 'public.legal_settings'::regclass AND a.attname = 'review_months') IS DISTINCT FROM '6'
     OR NOT EXISTS (SELECT 1 FROM pg_constraint c WHERE c.conrelid = 'public.legal_settings'::regclass
                     AND c.conname = 'legal_settings_review_months_check') THEN
    RAISE EXCEPTION 'proof: review_months default or bound';
  END IF;
  IF position('review_months = CASE' IN v_def_set) = 0
     OR position('''review_months'' AND (v_num < 1 OR v_num > 24)' IN v_def_set) = 0 THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings does not take review_months';
  END IF;
  IF position('''review'', (SELECT jsonb_build_object' IN v_def_docs) = 0
     OR position('''signed_in_unaccepted'', public.legal_signed_in_unaccepted(v.id)' IN v_def_docs) = 0 THEN
    RAISE EXCEPTION 'proof: admin_legal_documents lost the count or lacks the review';
  END IF;
  -- Scratch rows (removed at the end): the due date follows the newest publish, then the newest review.
  SELECT s.review_months INTO v_months FROM public.legal_settings s WHERE s.id;
  INSERT INTO public.legal_documents (kind, country_code)
  VALUES ('e2e-m16-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 12), NULL)
  RETURNING id INTO v_doc;
  IF public.legal_review_due(v_doc) IS NOT NULL THEN
    RAISE EXCEPTION 'proof: a document with no published version has a due date';
  END IF;
  INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog, material,
                                     effective_at, published_at, settings_snapshot)
  VALUES (v_doc, 1, 'published', 'v1', 'M16 proof', 'M16 proof', 'M16 proof', false,
          v_pub, v_pub, '{"seed": "M16 proof"}'::jsonb)
  RETURNING id INTO v_version;
  IF public.legal_review_due(v_doc) IS DISTINCT FROM v_pub + make_interval(months => v_months) THEN
    RAISE EXCEPTION 'proof: the due date does not follow the publish';
  END IF;
  INSERT INTO public.legal_reviews (document_id, reviewed_by, note)
  VALUES (v_doc, NULL, 'M16 proof')
  RETURNING id, reviewed_at INTO v_review, v_at;
  IF public.legal_review_due(v_doc) IS DISTINCT FROM v_at + make_interval(months => v_months) THEN
    RAISE EXCEPTION 'proof: the due date does not follow the review';
  END IF;
  -- A review is final.
  v_refused := false;
  BEGIN
    UPDATE public.legal_reviews SET note = 'changed' WHERE id = v_review;
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'reviewIsFinal';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: a review can be changed'; END IF;
  -- A published version stays final: a text change and an update that changes nothing are refused.
  v_refused := false;
  BEGIN
    UPDATE public.legal_versions SET body_en = 'changed' WHERE id = v_version;
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'publishedIsFinal';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: a published text can be changed'; END IF;
  v_refused := false;
  BEGIN
    UPDATE public.legal_versions SET published_by = NULL WHERE id = v_version;
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'publishedIsFinal';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: an update that changes nothing passes the finality rule'; END IF;
  -- No caller: the menu's mark is false and the door refuses.
  IF public.legal_review_overdue() THEN RAISE EXCEPTION 'proof: the mark is true for no caller'; END IF;
  v_refused := false;
  BEGIN
    PERFORM public.admin_mark_legal_reviewed(v_doc, 'M16 proof');
  EXCEPTION WHEN raise_exception THEN
    v_refused := SQLERRM = 'not authenticated';
  END;
  IF NOT v_refused THEN RAISE EXCEPTION 'proof: the review door does not refuse a missing caller'; END IF;
  -- Cleanup; the review goes with its document.
  DELETE FROM public.legal_versions WHERE id = v_version;
  DELETE FROM public.legal_documents WHERE id = v_doc;
  IF EXISTS (SELECT 1 FROM public.legal_reviews WHERE id = v_review) THEN
    RAISE EXCEPTION 'proof: a review outlived its document';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261022090000') ON CONFLICT DO NOTHING;