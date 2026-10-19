# Bundle 22 — Stage 1, turn 2: ruling 2 — run 1040's reds and M2 v2 (2026-10-19)

```text
RULING 2 — bundle 22, turn 2 (v2): run 1040's reds; M2 v2 replaces M2. Base: dev ba263b88.

0. Save this file unchanged as docs/governance/briefs/bundle-22-turn-2-ruling-2.md (the text M2 v2 is submitted from). It replaces ruling 1's item 2 sentence "No door change in this turn: M2 stays exactly as the brief gives it."; everything else of ruling 1 and of the v2 brief stands.

1. Run 1040 (0c7d5c75; 47 gating failures), read whole by the supervisor:
   (a) 32 are the staging outage around 07:30Z — 520, 521, 525 and 502 pages from Cloudflare, 503 "Could not query the database for the schema cache" (PGRST002), pool accounts that could not be created or reaped, and timeouts during it — in the posting, My listings, attributes, audit, locations and shell specs, and LG-5, LG-6 and LG-7 in shard 5. Infrastructure: no fix (run 1041's smoke passed afterwards). One of them, PW-75 in shard 6 (post-step-2 not shown), carries no outage mark in its body; the same test failed in shard 3 at a pool account the outage blocked; it is watched, not changed.
   (b) RL-1 (smoke, shard 3, fast lane): fixed by turn 1b.
   (c) LG-1 (four sources) and LG-5 (three): legal_in_force and my_legal_status leave out every e2e- kind, so a test's own scratch document is never answered (INC-761). Reading my_legal_status also showed two more defects: it lists every published version in force instead of the one in force, and its acceptance threshold counts a material version that is still ahead, so a person who accepted the version in force would be asked again until that version arrives (INC-761, the same entry).
   (d) LG-6 (three sources): admin_set_legal_settings writes the row before it checks the numbers, so 400 for the notice period is refused by the table's CHECK constraint instead of as badValue (INC-762).
   (e) i18n-coverage "the roles permission matrix renders" (both projects): turn 1's resource legal and the actions edit and publish have no label keys, so the Amharic matrix shows them in English (INC-763).

2. M2 v2. Submit the SQL below by the tool, exactly, in place of the brief's M2 — once, LAST, after `bash scripts/check-migrations.sh` with the text in place (paste its "Migration guard OK." line). It re-declares four doors whole, each with only its named change: admin_legal_documents (as the brief's M2), legal_in_force (a named scratch kind is answered), my_legal_status (one row per document — its version in force; a named scratch kind is answered; the threshold counts only material versions in force) and admin_set_legal_settings (every number checked before the row is written, refused as badValue:<key>). The mark stays 20261019220000. The supervisor applied turn 1's two migrations and this text to a scratch PostgreSQL 16 and checked: the proofs pass; legal_in_force('e2e-x') answers its version 2; my_legal_status gives one row per document (global and the home country's, not another country's), empties once the version in force is accepted, re-lists when a material version comes into force, and stays empty while it is still ahead; admin_set_legal_settings refuses notice 400, notice "x", answer 0 and liability -5 as badValue:<key> and a bad e-mail as badValue:email, and saves notice 14 (rolled back). The repository's migration guards pass with it. sha256 of the SQL between the markers: 26d2e8a11e9a273ef01f7442ceee3a072784be98a0c9159c38db1cdeb6865bf3 (16711 bytes).
   H1's read-back adds, for each of the four doors, `select provolatile, prosecdef, proconfig from pg_proc where oid = '<signature>'::regprocedure;` with the signatures public.admin_legal_documents(), public.legal_in_force(text, character), public.my_legal_status(text[]), public.admin_set_legal_settings(jsonb) — s/s/s/v, true, {search_path=public}.

3. The three strings (INC-763), in en.ts and am.ts beside their neighbours of the same prefix, character for character:
  "admin.roles.perm.action.edit": en "Edit" / am "ማስተካከል"
  "admin.roles.perm.action.publish": en "Publish" / am "ማተም"
  "admin.roles.perm.resource.legal": en "Legal documents" / am "ሕጋዊ ሰነዶች"
   Census, in the report: every resource and action that turn 1's migration inserted (resource legal; actions view, edit, publish) has its admin.roles.perm.* key in both files.

4. Tests. LG-1 and LG-6 stay as written (M2 v2 makes them pass). LG-5 gains three checks on its own scratch rows (service-client fixtures, published inserts as LG-1 makes them): (i) with two published versions in force, my_legal_status lists the document once, with the newer version; (ii) after the person accepts the version in force, a material version published with an effective time ahead does not list the document again; (iii) the existing check — a material version whose time has passed lists it again — stays. Part I runs e2e/legal-doors.spec.ts whole as already planned.

5. docs/features/legal.md: one paragraph under the turn's section naming M2 v2's four changes and INC-761, INC-762, INC-763. docs/_changelog.md: the turn's line ends "…; LG-10, LGA-1…LGA-7; M2 also corrects legal_in_force and my_legal_status (named scratch kinds answered; one row per document; only material versions in force count) and admin_set_legal_settings (numbers checked before the write), and the roles matrix gains the legal labels (INC-761–INC-763)."

6. Then: the checks; Part H with M2 v2; THE STOP REPORT with the apply line; STOP. Quote this ruling's number at the top of the report.
```

## M2 v2 — the SQL to submit (between the markers, exactly)

-----BEGIN M2 v2-----
-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 2 — M2 (v2, ruling 2): four doors re-declared whole, each with only its named
-- change; headers, grants and every other line as applied in turn 1.
--  1. admin_legal_documents: each version also carries the publisher's display name and its number of
--     acceptances; scratch documents (e2e-...) are listed; the real kinds first, global before country.
--  2. legal_in_force: a scratch kind the caller names is answered (INC-761).
--  3. my_legal_status: one row per document (its version in force); a scratch kind named is answered; the
--     acceptance threshold counts only material versions already in force (INC-761).
--  4. admin_set_legal_settings: numbers are checked before the row is written, refused as badValue:<key>
--     (INC-762).
-- Gated on bundle 22 turn 1 part 2's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019210000') THEN
    RAISE EXCEPTION 'bundle 22 turn 1 part 2 (mark 20261019210000) must be applied first';
  END IF;
END $$;

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

-- The version in force: the highest published version of the document for this kind and country whose
-- effective time has passed. The change log is never returned. Any kind the caller names is answered,
-- scratch kinds (e2e-...) included: on production none exists (INC-761).
CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at <= now()
     ORDER BY v.version DESC
     LIMIT 1);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_in_force(text, char) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_in_force(text, char) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_in_force(text, char) TO service_role;

-- The caller's standing per kind: the version in force is listed while he has accepted no version at or
-- above the newest material one in force (or version 1). One row per document: its version in force. Any
-- kind the caller names is answered, scratch kinds included; a material version still ahead never re-lists
-- a document before it takes effect (INC-761).
CREATE OR REPLACE FUNCTION public.my_legal_status(p_kinds text[] DEFAULT ARRAY['terms','privacy'])
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
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'kind', x.kind,
             'country_code', x.country_code,
             'version_id', x.version_id,
             'version', x.version,
             'label', x.label,
             'material', x.material,
             'effective_at', x.effective_at)
           ORDER BY x.kind, x.country_code NULLS FIRST)
      FROM (
        -- the version in force of each document that applies to the caller: one row per document
        SELECT DISTINCT ON (d.id)
               d.id AS document_id, d.kind, d.country_code,
               v.id AS version_id, v.version, v.label, v.material, v.effective_at
          FROM public.legal_documents d
          JOIN public.legal_versions v ON v.document_id = d.id
         WHERE d.kind = ANY (p_kinds)
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.country_code IS NULL
                OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = v_uid))
         ORDER BY d.id, v.version DESC
      ) x
     WHERE NOT EXISTS (
       -- accepted: a version at or above the newest material version in force (or version 1)
       SELECT 1
         FROM public.legal_acceptances a
         JOIN public.legal_versions va ON va.id = a.version_id
        WHERE a.user_id = v_uid
          AND va.document_id = x.document_id
          AND va.version >= (
                SELECT max(v3.version) FROM public.legal_versions v3
                 WHERE v3.document_id = x.document_id
                   AND v3.status = 'published'
                   AND v3.effective_at <= now()
                   AND (v3.material OR v3.version = 1)))), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_status(text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_status(text[]) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_status(text[]) TO service_role;

-- Set the legal settings: a full row; every field is validated, an unknown key is a refusal.
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
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years') THEN
      v_text := p_settings ->> v_key;
      IF v_text IS NULL OR v_text !~ '^[0-9]{1,7}$' THEN RAISE EXCEPTION 'badValue:%', v_key; END IF;
      v_num := v_text::integer;
      IF (v_key = 'liability_limit_usd' AND v_num > 1000000)
         OR (v_key = 'notice_days' AND v_num > 365)
         OR (v_key = 'response_days' AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'response_extra_days' AND v_num > 90)
         OR (v_key = 'deleted_ad_keep_months' AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'dispute_keep_years' AND v_num > 20) THEN
        RAISE EXCEPTION 'badValue:%', v_key;
      END IF;
    END IF;
  END LOOP;
  SELECT to_jsonb(s) - 'id' - 'updated_by' INTO v_before FROM public.legal_settings s WHERE s.id FOR UPDATE;
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

-- Proofs, with no caller and on scratch rows only (G39; the e2e-mig- kind is created and rolled back here):
-- every door refuses or answers as declared; headers and grants as declared. Answers that need a person
-- (my_legal_status, admin_set_legal_settings, admin_legal_documents) are proven by LG-5, LG-6 and LG-10.
DO $$
DECLARE
  v_doc  uuid;
  v_ans  jsonb;
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  BEGIN
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-mig-m2-proof') RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '2 days', now(), '{}'::jsonb),
           (v_doc, 2, 'published', 'v2', 'e', 'a', 'c', false, now() - interval '1 day', now(), '{}'::jsonb),
           (v_doc, 3, 'published', 'v3', 'e', 'a', 'c', true, now() + interval '30 days', now(), '{}'::jsonb);
    v_ans := public.legal_in_force('e2e-mig-m2-proof');
    IF v_ans IS NULL OR (v_ans ->> 'version')::int <> 2 OR v_ans ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_in_force on a named scratch kind answered %', v_ans;
    END IF;
    RAISE EXCEPTION '__m2_proof_rollback__';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> '__m2_proof_rollback__' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.legal_documents WHERE kind = 'e2e-mig-m2-proof') THEN
    RAISE EXCEPTION 'proof failed: the scratch document survived the rollback';
  END IF;
  FOR r IN SELECT * FROM (VALUES
      ('public.admin_legal_documents()', 'my_legal_status'),
      ('public.my_legal_status(text[])', 'my_legal_status'),
      ('public.admin_set_legal_settings(jsonb)', 'admin_set_legal_settings')) AS t(sig, name) LOOP
    BEGIN
      IF r.sig = 'public.admin_legal_documents()' THEN PERFORM public.admin_legal_documents();
      ELSIF r.sig = 'public.my_legal_status(text[])' THEN PERFORM public.my_legal_status(ARRAY['terms']);
      ELSE PERFORM public.admin_set_legal_settings('{"notice_days": 400}'::jsonb);
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.sig;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.admin_legal_documents()', 's'::"char", false),
      ('public.legal_in_force(text, character)', 's'::"char", true),
      ('public.my_legal_status(text[])', 's'::"char", false),
      ('public.admin_set_legal_settings(jsonb)', 'v'::"char", false)) AS t(sig, vol, anon_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header changed (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok THEN
      RAISE EXCEPTION 'proof failed: % anon EXECUTE is not %', r.sig, r.anon_ok;
    END IF;
    IF NOT has_function_privilege('authenticated', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: authenticated may not execute %', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261019220000') ON CONFLICT (version) DO NOTHING;
-----END M2 v2-----
